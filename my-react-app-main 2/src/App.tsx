import React from 'react';
import { BrowserRouter,   Route, Routes } from 'react-router-dom';
// import "boostrap/dist/css/boostrap.min.css";
import Users from './components/Users';
import CreateNewBook from './components/CreateUser';
import UpdateUser from './components/UpdateUsers';

// import BookState from '../src/state/BookState';

const App: React.FC = () => {
  return (
   <div>
    <BrowserRouter>
    
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/createNewBook" element={<CreateNewBook/>} />
      <Route path="/updateUser/:id" element={<UpdateUser />} />
     

     
    </Routes>
    </BrowserRouter>
   
   </div>
  );
  // Your component logic here
};

export default App;
