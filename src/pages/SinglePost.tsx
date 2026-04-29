import { useParams } from "react-router-dom";
import { blogPosts } from "../data/BlogPosts";
import { Helmet } from "react-helmet-async";

export default function SinglePost() {
  const { id } = useParams(); // Get the post ID from the URL
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return <h2 className="text-center text-red-500">Post not found</h2>;
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | My Blog</title>
        <meta name="description" content={post.title} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.content.slice(0, 30)} />
        <meta
          property="og:url"
          content={`https://www.alvie.dev/blog/${post.id}`}
        />
      </Helmet>
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="mt-4 text-pico-header-text">
          {post.content.split("\n").map((i, key) => {
            return (
              <div className="blog-paragraph" key={key}>
                {i}
              </div>
            );
          })}
        </p>
      </div>
    </>
  );
}
