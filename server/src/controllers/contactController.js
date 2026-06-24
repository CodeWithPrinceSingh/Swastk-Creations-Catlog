import { db } from '../data/store.js';
import ContactMessage from '../models/ContactMessage.js';
import { isMongoMode } from '../utils/dataSource.js';
import { serializeContactMessage } from '../utils/serialize.js';

// ---- Public: anyone can submit the contact form ----

export const submitContactMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are all required.' });
    }

    if (isMongoMode()) {
      const doc = await ContactMessage.create({
        name,
        email: email.toLowerCase(),
        message,
      });
      return res.status(201).json({ contactMessage: serializeContactMessage(doc) });
    }

    // ---- Mock mode ----
    const contactMessage = {
      id: db.uuid(),
      name,
      email: email.toLowerCase(),
      message,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    db.contactMessages.push(contactMessage);
    res.status(201).json({ contactMessage });
  } catch (err) {
    next(err);
  }
};

// ---- Admin only: view and manage submissions ----

export const listContactMessages = async (req, res, next) => {
  try {
    if (isMongoMode()) {
      const docs = await ContactMessage.find().sort({ createdAt: -1 });
      return res.json({ messages: docs.map(serializeContactMessage) });
    }

    // ---- Mock mode ----
    const messages = [...db.contactMessages].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    res.json({ messages });
  } catch (err) {
    next(err);
  }
};

export const markContactMessageRead = async (req, res, next) => {
  try {
    if (isMongoMode()) {
      const doc = await ContactMessage.findByIdAndUpdate(
        req.params.id,
        { status: 'read' },
        { new: true }
      );
      if (!doc) return res.status(404).json({ message: 'We could not find that message.' });
      return res.json({ contactMessage: serializeContactMessage(doc) });
    }

    // ---- Mock mode ----
    const msg = db.contactMessages.find((m) => m.id === req.params.id);
    if (!msg) return res.status(404).json({ message: 'We could not find that message.' });
    msg.status = 'read';
    res.json({ contactMessage: msg });
  } catch (err) {
    next(err);
  }
};

export const deleteContactMessage = async (req, res, next) => {
  try {
    if (isMongoMode()) {
      const doc = await ContactMessage.findByIdAndDelete(req.params.id);
      if (!doc) return res.status(404).json({ message: 'We could not find that message.' });
      return res.json({ message: 'Message deleted.' });
    }

    // ---- Mock mode ----
    const idx = db.contactMessages.findIndex((m) => m.id === req.params.id);
    if (idx === -1) return res.status(404).json({ message: 'We could not find that message.' });
    db.contactMessages.splice(idx, 1);
    res.json({ message: 'Message deleted.' });
  } catch (err) {
    next(err);
  }
};
