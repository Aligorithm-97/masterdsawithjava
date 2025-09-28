// Next.js REST API client örneği (gRPC wrapper kullanarak)
// Bu dosyayı Next.js projenizde kullanabilirsiniz

// API Base URL
const API_BASE = "http://localhost:8090/api";

// Post oluşturma
export async function createPost(postData) {
  try {
    const response = await fetch(`${API_BASE}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

// Post listesi getirme
export async function getPosts(page = 1, limit = 10) {
  try {
    const response = await fetch(
      `${API_BASE}/posts?page=${page}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

// Tek post getirme
export async function getPost(id) {
  try {
    const response = await fetch(`${API_BASE}/posts/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
}

// Post güncelleme
export async function updatePost(id, postData) {
  try {
    const response = await fetch(`${API_BASE}/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}

// Post silme
export async function deletePost(id) {
  try {
    const response = await fetch(`${API_BASE}/posts/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}

// React Hook örneği
import { useState, useEffect } from "react";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async (page = 1, limit = 10) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPosts(page, limit);
      if (data.success) {
        setPosts(data.data.posts);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addPost = async (postData) => {
    try {
      const data = await createPost(postData);
      if (data.success) {
        // Listeyi yenile
        await fetchPosts();
      }
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    fetchPosts,
    addPost,
  };
}

// React Component örneği
export function PostList() {
  const { posts, loading, error, addPost } = usePosts();
  const [newPost, setNewPost] = useState({
    title: "",
    summary: "",
    category: "",
    blocks: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPost(newPost);
      setNewPost({ title: "", summary: "", category: "", blocks: [] });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>

      {/* Post oluşturma formu */}
      <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">Yeni Post Oluştur</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Başlık"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Kategori"
            value={newPost.category}
            onChange={(e) =>
              setNewPost({ ...newPost, category: e.target.value })
            }
            className="p-2 border rounded"
            required
          />
        </div>
        <textarea
          placeholder="Özet"
          value={newPost.summary}
          onChange={(e) => setNewPost({ ...newPost, summary: e.target.value })}
          className="w-full p-2 border rounded mt-4"
          rows="3"
          required
        />
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Post Oluştur
        </button>
      </form>

      {/* Post listesi */}
      <div className="grid gap-4">
        {posts.map((post) => (
          <div key={post.id} className="border rounded p-4 shadow">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p className="text-gray-600 mt-2">{post.summary}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                {post.category}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(post.date).toLocaleDateString("tr-TR")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
