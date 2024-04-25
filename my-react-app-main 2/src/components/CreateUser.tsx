import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function CreateNewBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [pageCount, setPageCount] = useState('');
  const [publisher, setPublisher] = useState('');
  const [genre, setGenre] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e:any) => {
    e.preventDefault();

    axios.post('http://localhost:4001/api/books/createNewBook', { title, author, pageCount, publisher, genre })
      .then((result) => {
        console.log(result);
        navigate('/');
       
      })
      .catch((error) => {
        console.error('Error making POST request:', error);
      });

    // Reset form fields after submission
    // setTitle('');
    // setAuthor('');
    // setPageCount('');
    // setPublisher('');
    // setGenre('');
  };

  // Function to return the output data for the users' table

  return (
    <div className="flex h-screen bg-slate-200 justify-center items-center">
      <div className="w-1/2 bg-slate-500 rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl mb-3">Create Book</h2>
          <div className="mb-3">
            <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="author">
              Author
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="author"
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="pageCount">
              Page Count
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="pageCount"
              type="number"
              placeholder="Page Count"
              value={pageCount}
              onChange={(e) => setPageCount(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="publisher">
              Publisher
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="publisher"
              type="text"
              placeholder="Publisher"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="genre">
              Genre
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="genre"
              type="text"
              placeholder="Genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateNewBook;
