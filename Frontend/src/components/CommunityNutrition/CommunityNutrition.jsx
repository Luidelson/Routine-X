import React, { useState, useEffect } from "react";
import "./CommunityNutrition.css";

// Initialize posts as an empty array
export default function CommunityNutrition() {
  const role = localStorage.getItem("role");
  const [posts, setPosts] = useState([]); // Always start as array
  const [showModal, setShowModal] = useState(false);
  const [newRecipe, setNewRecipe] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch("http://localhost:5000/api/nutrition-posts");
      const data = await res.json();
      setPosts(data.posts);
    }
    fetchPosts();
  }, []);

  const handleAddPost = async () => {
    const userId = localStorage.getItem("username");
    const res = await fetch("http://localhost:5000/api/nutrition-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        recipe: newRecipe,
        description: newDescription,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setPosts([data.post, ...posts]);
      setShowModal(false);
      setNewRecipe("");
      setNewDescription("");
    }
  };

  const handleDeletePost = async (id) => {
    console.log(id);
    await fetch(`http://localhost:5000/api/nutrition-post/${id}`, {
      method: "DELETE",
    });
    const res = await fetch("http://localhost:5000/api/nutrition-posts");
    const data = await res.json();

    setPosts(Array.isArray(data.posts) ? data.posts : []);
  };

  const handleLike = (id) => {
    setPosts((posts) =>
      posts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleCommentChange = (id, value) => {
    setCommentInputs((inputs) => ({ ...inputs, [id]: value }));
  };

  const handleAddComment = (id) => {
    const comment = commentInputs[id];
    if (comment && comment.trim()) {
      setPosts((posts) =>
        posts.map((post) =>
          post.id === id
            ? {
                ...post,
                comments: [...post.comments, { user: "You", text: comment }],
              }
            : post
        )
      );
      setCommentInputs((inputs) => ({ ...inputs, [id]: "" }));
    }
  };

  return (
    <div className="nutrition-feed-container">
      <div className="nutrition-feed-header">
        <h1>🥗 Nutrition & Recipes Feed</h1>
        <p>See what others are sharing and add your own healthy recipe!</p>
        <button
          className="nutrition-add-btn"
          onClick={() => setShowModal(true)}
        >
          + Add Recipe
        </button>
      </div>
      <div className="nutrition-feed-list">
        {posts.map((post) => (
          <div className="nutrition-feed-card" key={post._id}>
            {role === "admin" && (
              <button
                onClick={() => handleDeletePost(post._id || post.id)}
                className="delete-btn"
              >
                Delete Post
              </button>
            )}
            <div className="nutrition-feed-user">{post.user}</div>
            <div className="nutrition-feed-title">{post.recipe}</div>
            <div className="nutrition-feed-desc">{post.description}</div>
            <div className="nutrition-feed-actions">
              <button
                className="nutrition-like-btn"
                onClick={() => handleLike(post.id)}
              >
                👍 Like ({post.likes})
              </button>
            </div>
            <div className="nutrition-feed-comments">
              <div className="nutrition-comments-list">
                {post.comments.map((comment, idx) => (
                  <div className="nutrition-comment" key={idx}>
                    <span className="nutrition-comment-user">
                      {comment.user}:
                    </span>{" "}
                    {comment.text}
                  </div>
                ))}
              </div>
              <div className="nutrition-comment-input-row">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentInputs[post.id] || ""}
                  onChange={(e) => handleCommentChange(post.id, e.target.value)}
                  className="nutrition-comment-input"
                />
                <button
                  className="nutrition-comment-btn"
                  onClick={() => handleAddComment(post.id)}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="nutrition-modal-overlay">
          <div className="nutrition-modal-content">
            <h2>Add Your Recipe</h2>
            <input
              type="text"
              placeholder="Recipe Title"
              value={newRecipe}
              onChange={(e) => setNewRecipe(e.target.value)}
              className="nutrition-modal-input"
            />
            <textarea
              placeholder="Description / Ingredients"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="nutrition-modal-input"
              rows={3}
            />
            <button className="nutrition-modal-save" onClick={handleAddPost}>
              Post
            </button>
            <button
              className="nutrition-modal-close"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
