import { useEffect, useState } from 'react';
import { Trash2, Mail, MailOpen } from 'lucide-react';
import { fetchContactMessages, markMessageRead, deleteContactMessage } from '../../api/contact.js';
import Loader from '../../components/common/Loader.jsx';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => fetchContactMessages().then((res) => setMessages(res.messages));

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, []);

  const handleMarkRead = async (msg) => {
    if (msg.status === 'read') return;
    await markMessageRead(msg.id);
    load();
  };

  const handleDelete = async (msg) => {
    if (!window.confirm(`Delete message from "${msg.name}"?`)) return;
    await deleteContactMessage(msg.id);
    load();
  };

  if (loading) return <Loader label="Loading messages..." />;

  return (
    <div>
      <h1 className="font-display text-3xl text-ink mb-8">
        Messages
        {messages.filter((m) => m.status === 'new').length > 0 && (
          <span className="ml-3 text-sm font-semibold text-rose-600 bg-rose-50 rounded-full px-3 py-1 align-middle">
            {messages.filter((m) => m.status === 'new').length} new
          </span>
        )}
      </h1>

      {messages.length === 0 ? (
        <p className="text-sm text-inkmuted">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`border rounded-xl p-5 ${
                msg.status === 'new' ? 'border-rose-300 bg-rose-50/40' : 'border-rose-100 bg-white'
              }`}
            >
              <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
                <div>
                  <p className="text-sm font-semibold text-ink flex items-center gap-2">
                    {msg.status === 'new' ? (
                      <Mail size={14} className="text-rose-600" />
                    ) : (
                      <MailOpen size={14} className="text-inkmuted" />
                    )}
                    {msg.name}
                  </p>
                  <a href={`mailto:${msg.email}`} className="text-xs text-rose-600 hover:underline">
                    {msg.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-inkmuted">
                    {new Date(msg.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                  <button
                    onClick={() => handleDelete(msg)}
                    aria-label="Delete message"
                    className="text-inkmuted hover:text-rose-600"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              <p className="text-sm text-ink leading-relaxed">{msg.message}</p>

              {msg.status === 'new' && (
                <button
                  onClick={() => handleMarkRead(msg)}
                  className="mt-3 text-xs font-medium text-rose-600 hover:underline"
                >
                  Mark as read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
