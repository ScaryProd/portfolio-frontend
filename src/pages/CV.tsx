export default function CV() {
  return (
    <div className="text-center py-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">My CV</h1>
      <p className="text-lg text-gray-600 mb-6">Click to download.</p>
      <a
        href="/cv.pdf"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Download CV
      </a>
    </div>
  );
}
