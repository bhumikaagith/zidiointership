import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [uploads, setUploads] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/users', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setUsers(res.data));

    axios.get('http://localhost:5000/api/admin/uploads', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setUploads(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">🧑‍💼 Admin Panel</h2>

      <h3 className="text-lg font-semibold">All Users</h3>
      <ul className="mb-6">
        {users.map(user => (
          <li key={user._id}>
            {user.name} - {user.email} ({user.role})
          </li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold">All Uploaded Files</h3>
      <ul>
        {uploads.map(file => (
          <li key={file._id}>
            {file.originalName} by {file.userId?.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;