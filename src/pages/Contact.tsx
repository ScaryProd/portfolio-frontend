import { FaLinkedin, FaItchIo } from "react-icons/fa";
import { SiBluesky } from "react-icons/si";

export default function Contact() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 text-center">
      <h1 className="text-4xl font-bold">Contact Me</h1>
      <p className="text-lg text-gray-600">Find me on these platforms:</p>

      <div className="flex space-x-6">
        {/* Bluesky */}
        <a
          href="https://bsky.app/profile/alviedev.bsky.social"
          target="Bluesky"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700 transition duration-300 text-3xl"
        >
          <SiBluesky />
        </a>

        {/* Itch.io */}
        <a
          href="https://alviedev.itch.io/"
          target="Itch.io"
          rel="noopener noreferrer"
          className="text-red-500 hover:text-red-700 transition duration-300 text-3xl"
        >
          <FaItchIo />
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/alvarofsantana/"
          target="Linkedin"
          rel="noopener noreferrer"
          className="text-blue-700 hover:text-blue-900 transition duration-300 text-3xl"
        >
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
}
