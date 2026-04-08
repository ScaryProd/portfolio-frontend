export default function CV() {
  return (
    <div className="text-center py-16">
      <h1 className="text-4xl font-bold text-pico-header-text mb-4">My CV</h1>
      <p className="text-lg text-pico-text mb-6">Click to download.</p>
      <a
        href="/cv_Alvaro.pdf"
        download="Alvaro_Santana_CV.pdf"
        className="bg-pico-header text-pico-header-text px-6 py-3 rounded-lg font-semibold hover:opacity-80 transition"
      >
        Download CV
      </a>
    </div>
  );
}
