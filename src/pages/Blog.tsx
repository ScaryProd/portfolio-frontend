import React from "react";
import BlogFilters from "../components/BlogFilters";
import { blogPosts } from "../data/BlogPosts";
import { Link } from "react-router-dom";

export default function Blog() {
  const [activeFilter, setActiveFilter] = React.useState<string>("All");

  // Filter posts based on active filter
  const filteredPosts =
    activeFilter === "All"
      ? blogPosts
      : blogPosts.filter((blogPosts) => blogPosts.category === activeFilter);

  return (
    <div className="max-w-4xl mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-6">Blog</h1>
      <BlogFilters
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <div className="space-y-8">
        {filteredPosts.map((post) => (
          <div key={post.id} className="p-6 border rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <div className="text-sm text-gray-500 mb-4">
              {post.date} | {post.category}
            </div>
            <p className="text-gray-700">{post.content.substring(0, 100)}...</p>
            <Link
              to={`/blog/${post.id}`}
              className="text-blue-500 hover:underline"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
