"use client"
import { useState } from "react";

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
  title: string;
  summary: string;
  blocks: Block[];
  category: string;
  date: string;
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
    setBlocks(blocks => blocks.filter((_, i) => i !== idx));
  };

  // Blok yukarı/aşağı taşı
  const moveBlock = (idx: number, dir: -1 | 1) => {
    if ((dir === -1 && idx === 0) || (dir === 1 && idx === blocks.length - 1)) return;
    const newBlocks = [...blocks];
    const temp = newBlocks[idx];
    newBlocks[idx] = newBlocks[idx + dir];
    newBlocks[idx + dir] = temp;
    setBlocks(newBlocks);
  };

  // Blok içeriğini güncelle
  const handleBlockChange = (idx: number, value: Partial<Block>) => {
    setBlocks(blocks =>
      blocks.map((b, i) => (i === idx ? { ...b, ...value } as Block : b))
    );
  };

  // Yazı ekle
  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !category.trim() || blocks.length === 0) {
      setMessage("Title, category and at least one block are required.");
      return;
    }
    setPosts([
      {
        title,
        summary,
        blocks,
        category,
        date: new Date().toLocaleString(),
      },
      ...posts,
    ]);
    setTitle("");
    setSummary("");
    setBlocks([]);
    setCategory(CATEGORIES[0]);
    setMessage("Post added!");
  };

  // Kategorilere göre gruplama
  const postsByCategory = CATEGORIES.map(cat => ({
    category: cat,
    posts: posts.filter(p => p.category === cat),
  }));

  return (
    <div className="min-h-screen bg-[#18181b] pt-16 px-4">
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Admin Panel
        </h1>
        <form
          onSubmit={handleAddPost}
          className="bg-[#23272f] p-6 rounded-xl shadow-md mb-8 space-y-4"
        >
          <div>
            <label className="block text-gray-300 mb-1 font-semibold">Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-300 mb-1 font-semibold">Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter post title"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1 font-semibold">Summary</label>
            <input
              type="text"
              value={summary}
              onChange={e => setSummary(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Short summary (optional)"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1 font-semibold">Content Blocks</label>
            <div className="space-y-4">
              {blocks.map((block, idx) => (
                <div key={idx} className="bg-gray-900 p-4 rounded-lg border border-gray-700 relative">
                  <div className="absolute right-2 top-2 flex gap-1">
                    <button type="button" onClick={() => moveBlock(idx, -1)} disabled={idx === 0} className="text-gray-400 hover:text-blue-400 disabled:opacity-30">↑</button>
                    <button type="button" onClick={() => moveBlock(idx, 1)} disabled={idx === blocks.length - 1} className="text-gray-400 hover:text-blue-400 disabled:opacity-30">↓</button>
                    <button type="button" onClick={() => handleRemoveBlock(idx)} className="text-red-400 hover:text-red-600">✕</button>
                  </div>
                  <div className="mb-2">
                    <span className="text-xs text-blue-300 uppercase font-bold">{block.type}</span>
                  </div>
                  {block.type === "paragraph" && (
                    <textarea
                      value={block.content}
                      onChange={e => handleBlockChange(idx, { content: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      placeholder="Paragraph text..."
                    />
                  )}
                  {block.type === "heading" && (
                    <input
                      type="text"
                      value={block.content}
                      onChange={e => handleBlockChange(idx, { content: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl font-bold"
                      placeholder="Heading text..."
                    />
                  )}
                  {block.type === "image" && (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={block.url}
                        onChange={e => handleBlockChange(idx, { url: e.target.value })}
                        className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Image URL..."
                      />
                      <input
                        type="text"
                        value={block.alt || ""}
                        onChange={e => handleBlockChange(idx, { alt: e.target.value })}
                        className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Alt text (optional)"
                      />
                      {block.url && (
                        <img src={block.url} alt={block.alt || "image preview"} className="max-h-40 rounded border border-gray-700 mx-auto" />
                      )}
                    </div>
                  )}
                  {block.type === "code" && (
                    <div className="space-y-2">
                      <textarea
                        value={block.code}
                        onChange={e => handleBlockChange(idx, { code: e.target.value })}
                        className="w-full px-3 py-2 rounded bg-gray-800 text-green-200 font-mono border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                        placeholder="Code..."
                      />
                      <input
                        type="text"
                        value={block.language || ""}
                        onChange={e => handleBlockChange(idx, { language: e.target.value })}
                        className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Language (e.g. js, java, py)"
                      />
                    </div>
                  )}
                  {block.type === "quote" && (
                    <textarea
                      value={block.content}
                      onChange={e => handleBlockChange(idx, { content: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-gray-800 text-yellow-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 italic"
                      rows={2}
                      placeholder="Quote..."
                    />
                  )}
                </div>
              ))}
              <div className="flex flex-wrap gap-2 mt-2">
                {BLOCK_TYPES.map(bt => (
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
            <div className="mb-2 text-green-400 font-medium">{message}</div>
          )}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-colors duration-200"
          >
            Add Post
          </button>
        </form>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Posts by Category
        </h2>
        <div className="space-y-10">
          {postsByCategory.map(({ category, posts }) => (
            <div key={category}>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">{category}</h3>
              {posts.length === 0 ? (
                <div className="text-gray-500 mb-4">No posts in this category.</div>
              ) : (
                <div className="space-y-6">
                  {posts.map((post, idx) => (
                    <div
                      key={idx}
                      className="bg-[#23272f] p-4 rounded-xl shadow border border-gray-700"
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-lg font-semibold text-white">
                            {post.title}
                          </span>
                          <span className="text-xs text-gray-400">{post.date}</span>
                        </div>
                        {post.summary && (
                          <div className="text-gray-400 mb-1 italic">{post.summary}</div>
                        )}
                        <div className="space-y-2">
                          {post.blocks.map((block, bidx) => {
                            if (block.type === "heading")
                              return <div key={bidx} className="text-xl font-bold text-blue-200 mt-2">{block.content}</div>;
                            if (block.type === "paragraph")
                              return <div key={bidx} className="text-gray-200 whitespace-pre-line">{block.content}</div>;
                            if (block.type === "image")
                              return block.url ? (
                                <img key={bidx} src={block.url} alt={block.alt || "image"} className="max-h-60 rounded border border-gray-700 mx-auto" />
                              ) : null;
                            if (block.type === "code")
                              return (
                                <pre key={bidx} className="bg-gray-800 text-green-200 rounded p-2 overflow-x-auto font-mono text-sm">
                                  <code>{block.code}</code>
                                </pre>
                              );
                            if (block.type === "quote")
                              return <blockquote key={bidx} className="border-l-4 border-yellow-400 pl-4 italic text-yellow-200">{block.content}</blockquote>;
                            return null;
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 