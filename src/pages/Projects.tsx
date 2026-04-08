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
        "Co-founded the largest game developer community in Nuevo Leon, Mexico focused networking, collaborating and teaching.",
      imageUrl: "/images/Meetup07_poster.png",
      demoLink: "https://encontrol.dev/",
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
    {
      id: 4,
      title: "IT COUNTS! Survivor",
      description: "Survive in your tv, and outside as well!",
      imageUrl: "/images/itcounts.png",
      demoLink: "https://alviedev.itch.io/it-counts-survivor",
      linkName: "Itch.io",
    },
    {
      id: 5,
      title: "antidle",
      description: "Idle game about ants!",
      imageUrl: "/images/antidle.png",
      demoLink: "https://alviedev.itch.io/ant-idle-pico-8",
      linkName: "Itch.io",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-pico-header-text">
        My Projects
      </h1>
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
