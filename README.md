# Posts Search App

## Live URLs
Frontend: [https://your-app.vercel.app](https://realtime-posts-search-app.vercel.app/)
Backend: [https://your-backend.up.railway.app](https://realtime-posts-search-app.onrender.com)

## Tech Stack
- React (Vite)
- Node.js + Express
- MongoDB Atlas
- WebSocket (ws)

# Features
- Fetch posts from JSONPlaceholder Api
- Store in MongoDB
- REST APIs
- Real-time search using WebSocket

# Setup Locally

## Backend
cd backend
npm install
npm run dev

### Frontend
cd frontend
npm install
npm run dev

## Environment Variables

Backend:
MONGO_URI=...

Frontend:
VITE_API_URL=...
VITE_WS_URL=...

## Note
WebSocket server is deployed on Render as Vercel does not support WebSocket connection.
Frontend is deployed in Vercel
