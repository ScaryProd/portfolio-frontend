import { useParams } from "react-router-dom";
import { blogPosts } from "../data/BlogPosts";

export default function SinglePost() {
  const { id } = useParams(); // Get the post ID from the URL
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return <h2 className="text-center text-red-500">Post not found</h2>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="mt-4 text-gray-700">{post.content}</p>
    </div>
  );
}
