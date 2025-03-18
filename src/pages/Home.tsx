export default function Home() {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">
        Welcome to My Portfolio
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        I’m a Frontend Developer passionate about creating beautiful and
        functional web experiences.
      </p>
      <a
        href="/projects"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
      >
        View My Work
      </a>
    </div>
  );
}
