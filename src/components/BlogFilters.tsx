interface BlogFiltersProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export default function BlogFilters({
  activeFilter,
  setActiveFilter,
}: BlogFiltersProps) {
  const categories = ["All", "Personal", "Professional"];

  return (
    <div className="flex justify-center space-x-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveFilter(cat)}
          className={`px-4 py-2 rounded ${
            activeFilter === cat ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
