import React from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  demoLink?: string;
  linkName?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  demoLink,
  linkName,
}) => {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden flex flex-col">
      {imageUrl && (
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      )}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700 flex-grow">{description}</p>
        <div className="mt-4 flex space-x-4">
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {linkName}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
