import ProjectCard from "../components/ProjectCard";

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  demoLink?: string;
  linkName?: string;
}

export default function Projects() {
  const projects: Project[] = [
    {
      id: 1,
      title: "EnControl",
      description:
        "Co-founded a local game developer community for networking and collaborating.",
      imageUrl: "/images/meetup.png", // Replace with your image URL
      demoLink: "https://www.instagram.com/encontrol.mty/",
      linkName: "Link",
    },
    {
      id: 2,
      title: "Pyrohexnics",
      description: "Combine different ingredients to create explosive potions!",
      imageUrl: "/images/pyrohexnics.png",
      demoLink: "https://alviedev.itch.io/pyrohexnics",
      linkName: "Itch.io",
    },
    {
      id: 3,
      title: "Norterrestres",
      description:
        "Juggle a concert between dimensions using unique controls for each instrument",
      imageUrl: "/images/norterrestres.png",
      demoLink: "https://v3.globalgamejam.org/2022/games/norterrestres-4",
      linkName: "Global Game Jam",
    },
    // Add more projects as needed
  ];

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">My Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            imageUrl={project.imageUrl}
            demoLink={project.demoLink}
            linkName={project.linkName}
          />
        ))}
      </div>
    </div>
  );
}
