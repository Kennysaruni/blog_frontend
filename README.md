# Bloggr Frontend

A React frontend for the Bloggr application, providing a responsive UI for viewing posts, creating posts, and commenting. It interacts with the Bloggr Rails backend via API endpoints (`/api/posts`, `/api/comments`), using `user_id` stored in `localStorage` for user association. The app features toast notifications with `react-toastify` and clean styling, meeting internship test requirements for post/comment CRUD, author name display, and a responsive UI.

## Features
- Displays posts with title, body, author name, and days since creation.
- Toggles comment sections per post with a comment form.
- Creates comments via `POST /api/comments` using `user_id` from `localStorage`.
- Stores `user_id` and `userName` during post creation.
- Uses `react-toastify` for success/error notifications.
- Responsive design with `Posts.css` and `CreatePost.css`.

## Prerequisites
- Node.js 16.x or later
- npm 8.x or later
- Bloggr Rails backend running at `http://localhost:3000`
- A modern web browser (e.g., Chrome, Firefox)

## Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-dir>/app/javascript
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   npm install react-toastify react-router-dom react-icons
   ```

3. **Build and Run**:
   Ensure the Rails backend is running (`rails server`).
   ```bash
   npm run build
   ```
   Access the app at `http://localhost:3000` (served by Rails).

## Project Structure
- `components/Posts.jsx`: Displays posts, comments, and handles comment creation.
- `components/CreatePost.jsx`: Form for creating posts, stores `user_id`/`userName`.
- `components/Posts.css`: Styles for posts and comments.
- `components/CreatePost.css`: Styles for post creation form.
- `components/App.jsx`: Defines routes (`/`, `/posts/:id`, `/posts/new`).

## Usage
1. **Create a Post**:
   - Navigate to `/posts/new`.
   - Enter a username (e.g., "Sam"), title, and body.
   - Submit to create a post and store `user_id` and `userName` in `localStorage`.
2. **View Posts**:
   - Visit `/` to see posts with titles, author names, and truncated bodies.
   - Click a post title to view details (requires `PostShow.jsx`).
3. **Add a Comment**:
   - Click the comment icon to toggle the comment section.
   - Enter a comment and submit.
   - See a success toast; the comment appears with the user’s name (e.g., “Sam”).
4. **Error Handling**:
   - Missing `user_id`: Shows “Please create a post or log in to comment”.
   - Invalid `post_id`: Shows “Post not found”.

## Troubleshooting
- **Comment Lacks `user.name`**:
  - Check `POST /api/comments` response in DevTools network tab.
  - Ensure backend `CommentSerializer` includes `user`.
- **Posts Not Loading**:
  - Verify backend is running: `curl http://localhost:3000/api/posts`.
  - Check fetch URL in `Posts.jsx`: `http://localhost:3000/api/posts`.
- **No `user_id`**:
  - Create a post at `/posts/new` to set `localStorage.getItem('user_id')`.
  - Log: `console.log(localStorage.getItem('user_id'))` in DevTools.
- **Styling Issues**:
  - Ensure `Posts.css` and `CreatePost.css` are imported.
  - Run `npm run build` after CSS changes.

## Dependencies
- `react`
- `react-dom`
- `react-router-dom`
- `react-icons`
- `react-toastify`

## License
MIT License. See `LICENSE` for details.