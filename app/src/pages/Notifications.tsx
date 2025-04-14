import { useEffect, useState } from 'react';
import axios from 'axios';

interface Notification {
  id: number;
  message: string;
  isRead: boolean;
  createdAt: string;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token'); // make sure your login stores token here

        const response = await axios.get('http://localhost:5000/notifications', {
          headers: {
            Authorization: Bearer ${token}
          }
        });

        setNotifications(response.data);
      } catch (error) {
        console.error('Failed to fetch notifications', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
      {loading ? (
        <p>Loading...</p>
      ) : notifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map(note => (
            <li
              key={note.id}
              className="bg-gray-100 p-3 rounded-md border border-gray-300 shadow-sm"
            >
              <div>{note.message}</div>
              <small className="text-gray-500">
                {new Date(note.createdAt).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;