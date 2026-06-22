import { storeInfo } from '../data/storeInfo.js';

export const getStoreInfo = async (req, res, next) => {
  try {
    res.json({ store: storeInfo });
  } catch (err) {
    next(err);
  }
};
