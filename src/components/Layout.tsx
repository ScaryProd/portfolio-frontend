import { Link } from "react-router-dom";
import PageTransition from "./PageTransition";

export default function Layout() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="w-full bg-pico-header text-pico-header-text p-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <h1 className="text-2xl font-bold tracking-widest uppercase">
            Alvaro Santana
          </h1>
          <nav>
            <ul className="flex flex-wrap justify-center gap-4 uppercase tracking-wider text-sm">
              <li>
                <Link to="/" className="hover:opacity-70 transition-opacity">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:opacity-70 transition-opacity"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="hover:opacity-70 transition-opacity"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:opacity-70 transition-opacity"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:opacity-70 transition-opacity"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/cv" className="hover:opacity-70 transition-opacity">
                  CV
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <div className="container mx-auto p-6">
          <PageTransition />
        </div>
      </main>

      <footer className="w-full bg-pico-header text-pico-header-text text-center p-4 text-sm tracking-widest uppercase">
        © {new Date().getFullYear()} Alvaro Santana
      </footer>
    </div>
  );
}
