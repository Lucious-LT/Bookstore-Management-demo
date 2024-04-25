import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4001/api/books')
      .then(result => setUsers(result.data))
      .catch(err => console.log(err));
  }, []);
  
  return (
    <div className="flex h-screen bg-slate-200 justify-center items-center">
      <div className="w-1/2 bg-slate-500 rounded p-3">
        <Link to="/createNewBook" className="btn btn">
          Add+
        </Link>
        <div className='mt-4'></div>
        <table className="table">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Author</th>
              <th className="px-4 py-2 border">Page Count</th>
              <th className="px-4 py-2 border">Publisher</th>
              <th className="px-4 py-2 border">Genre</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
  {users.map((user: any) => (
    <tr key={user._id}>
      <td className="px-4 py-2 border">{user.title}</td>
      <td className="px-4 py-2 border">{user.author}</td>
      <td className="px-4 py-2 border">{user.pageCount}</td>
      <td className="px-4 py-2 border">{user.publisher}</td>
      <td className="px-4 py-2 border">{user.genre}</td>
      <td className="px-4 py-2 border">
        <Link to={`/updateUser/${user._id}`} className="bg-blue-500 mb-10 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
          Update
        </Link>
      </td>
      <td className="px-4 py-2 border">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
}

export default Users;
