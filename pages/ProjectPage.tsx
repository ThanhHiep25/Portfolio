import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectDetail from '../components/ProjectDetail';

const ProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const projectId = id ? parseInt(id, 10) : null;

  const handleBack = () => {
    navigate('/');
    // Scroll to projects section after navigation
    setTimeout(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleSelectProject = (newProjectId: number) => {
    navigate(`/project/${newProjectId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!projectId) {
    return null;
  }

  return (
    <ProjectDetail
      projectId={projectId}
      onBack={handleBack}
      onSelectProject={handleSelectProject}
    />
  );
};

export default ProjectPage;
