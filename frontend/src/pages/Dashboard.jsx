import { useEffect, useState } from 'react';
import axios from 'axios';
import ChartViewer from '../components/ChartViewer';

const Dashboard = () => {
  const [uploads, setUploads] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/excel/my-uploads', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setUploads(res.data);
    });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Uploaded Files</h2>
      <ul className="mb-4">
        {uploads.map(file => (
          <li key={file._id}>
            <button
              className="text-blue-600 underline"
              onClick={() => setSelectedFile(file)}
            >
              {file.originalName}
            </button>
          </li>
        ))}
      </ul>
      {selectedFile && <ChartViewer fileData={selectedFile} />}
    </div>
  );
};

export default Dashboard;