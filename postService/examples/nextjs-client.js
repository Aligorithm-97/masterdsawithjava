// Next.js gRPC-Web client örneği
// pages/api/posts.js veya app/api/posts/route.js

import { PostServiceClient } from "./post_grpc_web_pb";
import {
  CreatePostRequest,
  ListPostsRequest,
  GetPostRequest,
  UpdatePostRequest,
  DeletePostRequest,
} from "./post_pb";

// gRPC-Web client oluştur
const client = new PostServiceClient("http://localhost:8080");

// API Route Handler (App Router)
export async function POST(request) {
  try {
    const body = await request.json();

    // CreatePostRequest oluştur
    const createRequest = new CreatePostRequest();
    createRequest.setTitle(body.title);
    createRequest.setSummary(body.summary);
    createRequest.setCategory(body.category);
    createRequest.setSubscriberOnly(body.subscriberOnly || 0);

    // Blocks ekle
    if (body.blocks) {
      body.blocks.forEach((block) => {
        const blockProto = new Block();
        blockProto.setType(block.type);
        blockProto.setContent(block.content);
        blockProto.setUrl(block.url || "");
        blockProto.setAlt(block.alt || "");
        blockProto.setCode(block.code || "");
        blockProto.setLanguage(block.language || "");
        createRequest.addBlocks(blockProto);
      });
    }

    // gRPC çağrısı yap
    const response = await new Promise((resolve, reject) => {
      client.createPost(createRequest, {}, (err, response) => {
        if (err) reject(err);
        else resolve(response);
      });
    });

    return Response.json({
      success: true,
      data: {
        id: response.getPost().getId(),
        title: response.getPost().getTitle(),
        message: response.getMessage(),
      },
    });
  } catch (error) {
    console.error("gRPC Error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// ListPosts API
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    const listRequest = new ListPostsRequest();
    listRequest.setPage(page);
    listRequest.setLimit(limit);

    const response = await new Promise((resolve, reject) => {
      client.listPosts(listRequest, {}, (err, response) => {
        if (err) reject(err);
        else resolve(response);
      });
    });

    const posts = response.getPostsList().map((post) => ({
      id: post.getId(),
      title: post.getTitle(),
      summary: post.getSummary(),
      category: post.getCategory(),
      date: post.getDate().toDate(),
      subscriberOnly: post.getSubscriberOnly(),
      blocks: post.getBlocksList().map((block) => ({
        type: block.getType(),
        content: block.getContent(),
        url: block.getUrl(),
        alt: block.getAlt(),
        code: block.getCode(),
        language: block.getLanguage(),
      })),
    }));

    return Response.json({
      success: true,
      data: {
        posts,
        total: response.getTotal(),
        page: response.getPage(),
        limit: response.getLimit(),
      },
    });
  } catch (error) {
    console.error("gRPC Error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// React Component örneği
// components/PostList.jsx
export function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/posts?page=1&limit=10");
      const data = await response.json();
      if (data.success) {
        setPosts(data.data.posts);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData) => {
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      const data = await response.json();
      if (data.success) {
        fetchPosts(); // Listeyi yenile
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <h2>{post.title}</h2>
          <p>{post.summary}</p>
          <span className="category">{post.category}</span>
        </div>
      ))}
    </div>
  );
}
