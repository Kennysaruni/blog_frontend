// import React, { useEffect, useState } from 'react';
// import { FaRegCommentDots } from 'react-icons/fa';
// import './Posts.css';

// function Posts() {
//   const [commentsOpen, setCommentsOpen] = useState(false);
//   const [commentText, setCommentText] = useState('');
//   const [posts,setPosts] = useState([])
  

//   useEffect(() => {
//     fetch('http://localhost:3000/posts')
//     .then(res => res.json())
//     .then(data => setPosts(data))
//   },[])

//   console.log(posts)



//   const toggleComments = () => {
//     setCommentsOpen(!commentsOpen);
//   };

//   const handleCommentSubmit = (e) => {
//     e.preventDefault();
//     if (commentText.trim()) {
//       console.log('Comment submitted:', commentText);
//       setCommentText(''); // Clear input after submission
//     }
//   };

//   return (
//     <div className="posts-cont">
//       {posts.map((post) => (
//       <div className="post">
//         <div className="post-details">
//           <h1 className="post-title">{post.title}</h1>
//           <p className="days-since">2d</p>
//           <p className="author">{post.user.name}</p>
//         </div>
//         <div className="post-text">
//           <p className="text">{post.body}</p>
//           <button className="activate-comments" onClick={toggleComments}>
//             <FaRegCommentDots/>
//           </button>
//         </div>
//         {commentsOpen && (
//           <div className="comments">
//             <div className="comments-input-div">
//               <form onSubmit={handleCommentSubmit}>
//                 <div className="comment-input-container">
//                   <input
//                     type="text"
//                     placeholder="Add a comment"
//                     className="comment-input"
//                     value={commentText}
//                     onChange={(e) => setCommentText(e.target.value)}
//                   />
//                   <button type="submit" className="comment-submit-btn">
//                     <FaRegCommentDots />
//                   </button>
//                 </div>
//               </form>
//             </div>
//             <h1 className="username">Kenny Latimore</h1>
//             <p className="days-since">2d</p>
//             <p className="text">This is very informative, Thank you.</p>
//           </div>
//         )}
//       </div>
//       ))}
//     </div>
//   );
// }

// export default Posts;


// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaRegCommentDots } from 'react-icons/fa';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './Posts.css';

// function Posts() {
//   const [commentsOpen, setCommentsOpen] = useState({});
//   const [commentText, setCommentText] = useState('');
//   const [posts, setPosts] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:3000/posts')
//       .then(res => {
//         if (!res.ok) throw new Error('Failed to fetch posts');
//         return res.json();
//       })
//       .then(data => setPosts(data || []))
//       .catch(err => {
//         setError(err.message);
//         console.error(err);
//       });
//   }, []);

//   const toggleComments = (postId) => {
//     setCommentsOpen(prev => ({
//       ...prev,
//       [postId]: !prev[postId]
//     }));
//   };

//   const handleCommentSubmit = async (e, postId) => {
//     e.preventDefault();
//     if (!commentText.trim()) return;

//     const userId = localStorage.getItem('user_id');
//     const userName = localStorage.getItem('userName')
//     if (!userId) {
//       toast.error('Please create a post or log in to comment');
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:3000/comments`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           body: commentText,
//           user_id: userId,
//           post_id: postId
//         })
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.errors?.join(', ') || errorData.error || 'Failed to add comment');
//       }
//       const newComment = await response.json();
//       setPosts(posts.map(post =>
//         post.id === postId
//           ? { ...post, comments: [...post.comments, newComment] }
//           : post
//       ));
//       setCommentText('');
//       setCommentsOpen(prev => ({ ...prev, [postId]: true }));
//       toast.success('Comment submitted successfully!', {
//         position: 'top-right',
//         autoClose: 2000,
//         hideProgressBar: true,
//         className: 'toast-custom'
//       });
//     } catch (err) {
//       toast.error(err.message, {
//         position: 'top-right',
//         autoClose: 3000,
//         hideProgressBar: true,
//         className: 'toast-custom'
//       });
//     }
//   };

//   console.log(posts)

//   return (
//     <div className="posts-cont">
//       <ToastContainer />
//       {error && <div className="text-red-600 text-center p-4">{error}</div>}
//       {posts.length === 0 && !error && <div className="text-gray-600 text-center p-4">No posts available</div>}
//       {posts.map(post => (
//         <div className="post" key={post.id}>
//           <div className="post-details">
//             <h1 className="post-title">
//               {post.title}
//             </h1>
//             <p className="days-since">
//               {Math.floor((new Date() - new Date(post.created_at)) / (1000 * 60 * 60 * 24))}d
//             </p>
//             <p className="author">{post.user.name}</p>
//           </div>
//           <div className="post-text">
//             <p className="text">
//               {post.body.length > 150 ? `${post.body.substring(0, 150)}...` : post.body}
//             </p>
//             <button className="activate-comments" onClick={() => toggleComments(post.id)}>
//               <FaRegCommentDots />
//             </button>
//           </div>
//           {commentsOpen[post.id] && (
//             <div className="comments">
//               <div className="comments-input-div">
//                 <form onSubmit={(e) => handleCommentSubmit(e, post.id)}>
//                   <div className="comment-input-container">
//                     <input
//                       type="text"
//                       placeholder="Add a comment"
//                       className="comment-input"
//                       value={commentText}
//                       onChange={(e) => setCommentText(e.target.value)}
//                     />
//                     <button type="submit" className="comment-submit-btn">
//                       <FaRegCommentDots />
//                     </button>
//                   </div>
//                 </form>
//               </div>
//               {post.comments.length > 0 ? (
//                 post.comments.map(comment => (
//                   <div key={comment.id}>
//                     <h1 className="username">{comment.user?.name || 'Anonymous'}</h1>
//                     <p className="days-since">
//                       {comment.created_at
//                         ? `${Math.floor((new Date() - new Date(comment.created_at)) / (1000 * 60 * 60 * 24))}d`
//                         : 'Unknown'}
//                     </p>
//                     <p className="text">{comment.body}</p>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-600 text-center">No comments yet</p>
//               )}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Posts;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegCommentDots } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import 'react-toastify/dist/ReactToastify.css';
import './Posts.css';

function Posts() {
  const [commentsOpen, setCommentsOpen] = useState({});
  const [commentText, setCommentText] = useState('');
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/posts')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch posts');
        return res.json();
      })
      .then(data => setPosts(data || []))
      .catch(err => {
        setError(err.message);
        console.error(err);
      });
  }, []);

  const toggleComments = (postId) => {
    setCommentsOpen(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const userId = localStorage.getItem('user_id');
    if (!userId) {
      toast.error('Please create a post or log in to comment');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          body: commentText,
          user_id: userId,
          post_id: postId
        })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors?.join(', ') || errorData.error || 'Failed to add comment');
      }
      const newComment = await response.json();
      setPosts(posts.map(post =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      ));
      setCommentText('');
      setCommentsOpen(prev => ({ ...prev, [postId]: true }));
      toast.success('Comment submitted successfully!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        className: 'toast-custom'
      });
    } catch (err) {
      toast.error(err.message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        className: 'toast-custom'
      });
    }
  };

  return (
    <div className="posts-cont">
      <ToastContainer />
      {error && <div className="text-red-600 text-center p-4">{error}</div>}
      {posts.length === 0 && !error && <div className="text-gray-600 text-center p-4">No posts available</div>}
      {posts.map(post => (
        <div className="post" key={post.id}>
          <div className="post-details">
            <h1 className="post-title">
                {post.title}
            </h1>
            <p className="days-since">
              {Math.floor((new Date() - new Date(post.created_at)) / (1000 * 60 * 60 * 24))}d
            </p>
            <p className="author">{post.user.name}</p>
          </div>
          <div className="post-text">
            <p className="text">
              {post.body.length > 150 ? `${post.body.substring(0, 150)}...` : post.body}
            </p>
            <button className="activate-comments" onClick={() => toggleComments(post.id)}>
              <FaRegCommentDots />
            </button>
            <button className="delete-post"><AiOutlineDelete /></button>
          </div>
          {commentsOpen[post.id] && (
            <div className="comments">
              <div className="comments-input-div">
                <form onSubmit={(e) => handleCommentSubmit(e, post.id)}>
                  <div className="comment-input-container">
                    <input
                      type="text"
                      placeholder="Add a comment"
                      className="comment-input"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button type="submit" className="comment-submit-btn">
                      <FaRegCommentDots />
                    </button>
                  </div>
                </form>
              </div>
              {post.comments.length > 0 ? (
                post.comments.map(comment => (
                  <div key={comment.id}>
                    <h1 className="username">{comment.user?.name || 'Anonymous'}</h1>
                    <p className="days-since">
                      {comment.created_at
                        ? `${Math.floor((new Date() - new Date(comment.created_at)) / (1000 * 60 * 60 * 24))}d`
                        : 'Unknown'}
                    </p>
                    <p className="text">{comment.body}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-center">No comments yet</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Posts;