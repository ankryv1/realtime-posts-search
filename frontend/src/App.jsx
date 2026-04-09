import { useEffect, useState, useRef } from "react";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const wsRef = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/posts")
      .then(res => setPosts(res.data))
      .catch(err => console.log(err));
  }, []);

  
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000");
    wsRef.current = ws;

    ws.onopen = () => console.log(" WS Connected");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPosts(data);
    };

    ws.onerror = (err) => console.log("WS Error:", err);

    return () => ws.close();
  }, []);

  
  let timeout;

  const handleSearch = (e) => {
    const value = e.target.value;

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      if (wsRef.current && wsRef.current.readyState === 1) {
        wsRef.current.send(value);
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <h1 className="text-3xl font-bold text-center mb-6">
        Posts Search App
      </h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search posts..."
          onChange={handleSearch}
          className="w-full max-w-md p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition"
            >
              <h2 className="font-semibold text-lg mb-2 text-blue-600">
                {post.title}
              </h2>
              <p className="text-gray-700 text-sm">
                {post.body}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No posts found
          </p>
        )}
      </div>

    </div>
  );
}

export default App;