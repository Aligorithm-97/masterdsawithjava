"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "../../lib/api";

import PostRenderer from "../../components/PostRenderer";

const CATEGORIES = [
  "Java Core",
  "DSA Solutions",
  "Advanced Java",
  "Algorithm Problems",
];

type Block =
  | { type: "paragraph"; content: string }
  | { type: "heading"; content: string }
  | { type: "image"; url: string; alt?: string }
  | { type: "code"; code: string; language?: string }
  | { type: "quote"; content: string };

interface Post {
  id?: string;
  title: string;
  summary: string;
  blocks: Block[];
  category: string;
  date: string;
  created_at?: string;
}

const BLOCK_TYPES = [
  { type: "paragraph", label: "Paragraph" },
  { type: "heading", label: "Heading" },
  { type: "image", label: "Image" },
  { type: "code", label: "Code" },
  { type: "quote", label: "Quote" },
];

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [user, setUser] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const POSTS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPosts, setTotalPosts] = useState(0);

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await apiFetch("/session");
        const data = await response.json();

        if (data.session) {
          setIsAuthenticated(true);
          setUser(data.session.user);
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("adminUser", data.session.user.email || "");
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Auth check error:", error);
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Load posts from PostgreSQL (with pagination and search)
  useEffect(() => {
    if (isAuthenticated) {
      loadPosts(currentPage, searchTerm);
    }
  }, [isAuthenticated, currentPage, searchTerm]);

  // Arama inputu değişince
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Pagination için toplam sayfa sayısı
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const loadPosts = async (page = 1, search = "") => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: POSTS_PER_PAGE.toString(),
        search: search,
      });

      const response = await apiFetch(`/posts?${params}`);
      const data = await response.json();

      if (response.ok) {
        setPosts(data.data || []);
        setTotalPosts(data.count || 0);
      } else {
        setMessage("Error loading posts: " + data.error);
      }
    } catch (error) {
      console.error("Error loading posts:", error);
      setMessage("Error loading posts");
    }
  };

  // Image upload function (placeholder - Supabase Storage removed)
  const uploadImage = async (file: File): Promise<string> => {
    // For now, return a placeholder URL
    // In production, you'd implement file upload to your server or cloud storage
    return `https://via.placeholder.com/400x300/2563eb/ffffff?text=Image+Upload+Disabled`;
  };

  // Handle image upload
  const handleImageUpload = async (file: File, blockIndex: number) => {
    setUploadingImage(true);
    try {
      const imageUrl = await uploadImage(file);
      handleBlockChange(blockIndex, { url: imageUrl });
      setMessage("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage("Error uploading image: " + (error as Error).message);
    } finally {
      setUploadingImage(false);
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      const response = await apiFetch("/logout", { method: "POST" });
      if (response.ok) {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("adminUser");
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#18181b] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Don't render admin content if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Blok ekle
  const handleAddBlock = (type: Block["type"]) => {
    let newBlock: Block;
    switch (type) {
      case "paragraph":
        newBlock = { type, content: "" };
        break;
      case "heading":
        newBlock = { type, content: "" };
        break;
      case "image":
        newBlock = { type, url: "", alt: "" };
        break;
      case "code":
        newBlock = { type, code: "", language: "" };
        break;
      case "quote":
        newBlock = { type, content: "" };
        break;
      default:
        return;
    }
    setBlocks([...blocks, newBlock]);
  };

  // Blok sil
  const handleRemoveBlock = (idx: number) => {
    setBlocks((blocks) => blocks.filter((_, i) => i !== idx));
  };

  // Blok yukarı/aşağı taşı
  const moveBlock = (idx: number, dir: -1 | 1) => {
    if ((dir === -1 && idx === 0) || (dir === 1 && idx === blocks.length - 1))
      return;
    const newBlocks = [...blocks];
    const temp = newBlocks[idx];
    newBlocks[idx] = newBlocks[idx + dir];
    newBlocks[idx + dir] = temp;
    setBlocks(newBlocks);
  };

  // Blok içeriğini güncelle
  const handleBlockChange = (idx: number, value: Partial<Block>) => {
    setBlocks((blocks) =>
      blocks.map((b, i) => (i === idx ? ({ ...b, ...value } as Block) : b))
    );
  };

  // Post sil
  const handleDeletePost = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await apiFetch(`/posts/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage("Post deleted successfully!");
        loadPosts(); // Reload posts
      } else {
        const data = await response.json();
        setMessage("Error deleting post: " + data.error);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      setMessage("Error deleting post");
    }
  };

  // Yazı ekle
  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !category.trim() || blocks.length === 0) {
      setMessage("Title, category and at least one block are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await apiFetch("/posts", {
        method: "POST",
        json: {
          title: title.trim(),
          summary: summary.trim(),
          blocks: blocks,
          category: category,
          date: new Date().toLocaleString(),
        },
      });

      const data = await response.json();

      if (response.ok) {
        setTitle("");
        setSummary("");
        setBlocks([]);
        setCategory(CATEGORIES[0]);
        setMessage("Post added successfully!");
        loadPosts(); // Reload posts
      } else {
        setMessage("Error adding post: " + data.error);
      }
    } catch (error) {
      console.error("Error adding post:", error);
      setMessage("Error adding post");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Post düzenleme için formu doldur
  const handleEditPost = (post: Post) => {
    setEditingPostId(post.id || null);
    setTitle(post.title);
    setSummary(post.summary);
    setBlocks(post.blocks);
    setCategory(post.category);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Postu güncelle
  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPostId) return;
    if (!title.trim() || !category.trim() || blocks.length === 0) {
      setMessage("Title, category and at least one block are required.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await apiFetch(`/posts/${editingPostId}`, {
        method: "PUT",
        json: {
          title: title.trim(),
          summary: summary.trim(),
          blocks: blocks,
          category: category,
          date: new Date().toLocaleString(),
        },
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Post updated successfully!");
        setEditingPostId(null);
        setTitle("");
        setSummary("");
        setBlocks([]);
        setCategory(CATEGORIES[0]);
        loadPosts();
      } else {
        setMessage("Error updating post: " + data.error);
      }
    } catch (error) {
      console.error("Error updating post:", error);
      setMessage("Error updating post");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Düzenlemeyi iptal et
  const handleCancelEdit = () => {
    setEditingPostId(null);
    setTitle("");
    setSummary("");
    setBlocks([]);
    setCategory(CATEGORIES[0]);
    setMessage("");
  };

  // Kategorilere göre gruplama
  const postsByCategory = CATEGORIES.map((cat) => ({
    category: cat,
    posts: posts.filter((p) => p.category === cat),
  }));

  return (
    <div className="min-h-screen bg-[#18181b] pt-16 px-4">
      <div className="max-w-2xl mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Admin Panel
            </h1>
            {user && (
              <p className="text-gray-400 text-sm mt-1">
                Logged in as: {user.email}
              </p>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-colors duration-200"
          >
            Logout
          </button>
        </div>

        <form
          onSubmit={editingPostId ? handleUpdatePost : handleAddPost}
          className="bg-[#23272f] p-6 rounded-xl shadow-md mb-8 space-y-4"
        >
          <div>
            <label className="block text-gray-300 mb-1 font-semibold">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-300 mb-1 font-semibold">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter post title"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1 font-semibold">
              Summary
            </label>
            <input
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Short summary (optional)"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1 font-semibold">
              Content Blocks
            </label>
            <div className="space-y-4">
              {blocks.map((block, idx) => (
                <div
                  key={idx}
                  className="bg-gray-900 p-4 rounded-lg border border-gray-700 relative"
                >
                  <div className="absolute right-2 top-2 flex gap-1">
                    <button
                      type="button"
                      onClick={() => moveBlock(idx, -1)}
                      disabled={idx === 0}
                      className="text-gray-400 hover:text-blue-400 disabled:opacity-30"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => moveBlock(idx, 1)}
                      disabled={idx === blocks.length - 1}
                      className="text-gray-400 hover:text-blue-400 disabled:opacity-30"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveBlock(idx)}
                      className="text-red-400 hover:text-red-600"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="mb-2">
                    <span className="text-xs text-blue-300 uppercase font-bold">
                      {block.type}
                    </span>
                  </div>
                  {block.type === "paragraph" && (
                    <textarea
                      value={block.content}
                      onChange={(e) =>
                        handleBlockChange(idx, { content: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      placeholder="Paragraph text..."
                    />
                  )}
                  {block.type === "heading" && (
                    <input
                      type="text"
                      value={block.content}
                      onChange={(e) =>
                        handleBlockChange(idx, { content: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl font-bold"
                      placeholder="Heading text..."
                    />
                  )}
                  {block.type === "image" && (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={block.url}
                          onChange={(e) =>
                            handleBlockChange(idx, { url: e.target.value })
                          }
                          className="flex-1 px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Image URL or upload file..."
                        />
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleImageUpload(file, idx);
                            }
                          }}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploadingImage}
                          className="px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded text-sm font-medium transition-colors duration-200"
                        >
                          {uploadingImage ? "Uploading..." : "Upload"}
                        </button>
                      </div>
                      <input
                        type="text"
                        value={block.alt || ""}
                        onChange={(e) =>
                          handleBlockChange(idx, { alt: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Alt text (optional)"
                      />
                      {block.url && (
                        <div className="relative">
                          <img
                            src={block.url}
                            alt={block.alt || "image preview"}
                            className="max-h-40 rounded border border-gray-700 mx-auto"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleBlockChange(idx, { url: "", alt: "" })
                            }
                            className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                          >
                            ✕
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  {block.type === "code" && (
                    <div className="space-y-2">
                      <textarea
                        value={block.code}
                        onChange={(e) =>
                          handleBlockChange(idx, { code: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded bg-gray-800 text-green-200 font-mono border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                        placeholder="Code..."
                      />
                      <input
                        type="text"
                        value={block.language || ""}
                        onChange={(e) =>
                          handleBlockChange(idx, { language: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Language (e.g. js, java, py)"
                      />
                    </div>
                  )}
                  {block.type === "quote" && (
                    <textarea
                      value={block.content}
                      onChange={(e) =>
                        handleBlockChange(idx, { content: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded bg-gray-800 text-yellow-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 italic"
                      rows={2}
                      placeholder="Quote..."
                    />
                  )}
                </div>
              ))}
              <div className="flex flex-wrap gap-2 mt-2">
                {BLOCK_TYPES.map((bt) => (
                  <button
                    key={bt.type}
                    type="button"
                    onClick={() => handleAddBlock(bt.type as Block["type"])}
                    className="bg-gray-800 text-blue-300 hover:bg-blue-900 hover:text-white px-3 py-1 rounded text-sm font-semibold border border-gray-700"
                  >
                    + {bt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {message && (
            <div
              className={`mb-2 font-medium ${
                message.includes("Error") ? "text-red-400" : "text-green-400"
              }`}
            >
              {message}
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-colors duration-200 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? editingPostId
                ? "Updating..."
                : "Adding Post..."
              : editingPostId
              ? "Güncelle"
              : "Add Post"}
          </button>
          {editingPostId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="ml-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-colors duration-200"
            >
              Vazgeç
            </button>
          )}
        </form>

        {/* Arama kutusu */}
        <div className="mb-6 flex items-center gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Başlık veya özet ara..."
            className="px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-xs"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="ml-2 text-gray-400 hover:text-red-400"
            >
              Temizle
            </button>
          )}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Posts by Category
        </h2>
        <div className="space-y-10">
          {postsByCategory.map(({ category, posts }) => (
            <div key={category}>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">
                {category}
              </h3>
              {posts.length === 0 ? (
                <div className="text-gray-500 mb-4">
                  No posts in this category.
                </div>
              ) : (
                <div className="space-y-6">
                  {posts.map((post, idx) => (
                    <div
                      key={post.id || idx}
                      className="bg-[#23272f] p-4 rounded-xl shadow border border-gray-700"
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-lg font-semibold text-white">
                            {post.title}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">
                              {post.date}
                            </span>
                            <button
                              onClick={() =>
                                post.id && handleDeletePost(post.id)
                              }
                              className="text-red-400 hover:text-red-600 text-sm px-2 py-1 rounded hover:bg-red-900/20"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => handleEditPost(post)}
                              className="text-blue-400 hover:text-blue-600 text-sm px-2 py-1 rounded hover:bg-blue-900/20 ml-2"
                            >
                              Düzenle
                            </button>
                          </div>
                        </div>
                        {post.summary && (
                          <div className="text-gray-400 mb-1 italic">
                            {post.summary}
                          </div>
                        )}
                        <div className="space-y-4">
                          <PostRenderer
                            blocks={post.blocks}
                            maxBlocks={3}
                            isPreview={true}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 my-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-40"
            >
              Önceki
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300"
                } font-semibold`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-40"
            >
              Sonraki
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
