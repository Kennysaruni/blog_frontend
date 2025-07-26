// import React, { useState } from 'react'
// import './CreatePost.css'
// import { FaArrowUp } from "react-icons/fa";

// function CreatePost() {
//   const [title,setTitle] = useState('')
//   const [body, setBody] = useState('')

//   const handleSubmit = async() => {
//     try{
//       await fetch('http://localhost:3000/posts',{
//         method: 'POST',
//         headers: {
//           'Content-Type' : 'application/json'
//         },
//         body: JSON.stringify({
//           title: title,
//           body: body
//         })
//       }),
//       alert('Your post has been created')
//     }
//     catch(error){
//       console.error
//     }

//   }
//   return (
//     <div className='container'>
//       <div className="form-container">
//         <p className='create-blog-title'>Create your blog</p>
//         <form action="">
//             <input type="text" placeholder='Enter your title' className='blog-title' />
//             <input type="text" placeholder='Write your blog' className='blog-text' />

//             <div className="btn-cont">
//                 <button className='submit-button'><FaArrowUp/></button>
//             </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default CreatePost


import React, { useState } from 'react';
import './CreatePost.css';
import { FaArrowUp } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreatePost() {
  // const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [name, setName] = useState(localStorage.getItem('userName') || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          body,
          name
        })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors?.join(', ') || 'Failed to create post');
      }
      const data = await response.json();
      console.log(data)
      localStorage.setItem('userName', name);
      localStorage.setItem('user_id', data.post.user.id)
      toast.success('Your post has been created!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        className: 'toast-custom'
      });
      // setTimeout(() => , 2000);
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        className: 'toast-custom'
      });
    }
  };

  return (
    <div className='container'>
      <ToastContainer />
      <div className="form-container">
        <p className='create-blog-title'>Create your blog</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder='Enter your name'
            className='blog-title'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{marginBottom: '10px'}}
          />
          <input
            type="text"
            placeholder='Enter your title'
            className='blog-title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder='Write your blog'
            className='blog-text'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
          <div className="btn-cont">
            <button type="submit" className='submit-button'>
              <FaArrowUp />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;