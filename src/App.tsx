import { ReactNode, useState } from 'react';
import NoProjectSelected from './components/NoProjectSelected.tsx';
import ProjectSidebar from './components/ProjectSidebar.tsx';
import NewProject from './components/NewProject.tsx';
import SelectedProject from './components/SelectedProject.tsx';
// import { generateSimpleGUID } from './util/generateGUID.ts';

export interface Project {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
}

interface ProjectsState {
  projects: Project[];
  selectedprojectId: string | undefined | null; // Either stores the id of the project that was selected, null if we want to add a new project, undefined if we're not adding a new project and also if we did not select any project
}
const initialProjectsState: ProjectsState = {
  projects: [],
  selectedprojectId: undefined,
};

function App() {
  const [projectsState, setProjectsState] = useState(initialProjectsState);

  function updateProjectState(selectedprojectId: string | undefined | null) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedprojectId,
      };
    });
  }

  function handleSelectProject(id: string) {
    updateProjectState(id);
  }

  function handleStartAddProject() {
    updateProjectState(null);
  }

  function handleCancelAddProject() {
    updateProjectState(undefined);
  }

  function handleAddProject(projectData: Project) {
    // const projectId = generateSimpleGUID();
    const newProject: Project = {
      ...projectData,
      // id: projectId,
    };
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedprojectId: undefined, // Go back to the fallback screen after clicking save
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedprojectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedprojectId
        ),
      };
    });
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedprojectId
  );

  let content: ReactNode;

  if (selectedProject) {
    content = (
      <SelectedProject
        project={selectedProject}
        onDelete={handleDeleteProject}
      />
    );
  }

  if (projectsState.selectedprojectId === null) {
    content = (
      <NewProject
        onAddProject={handleAddProject}
        onCancelProject={handleCancelAddProject}
      />
    );
  } else if (projectsState.selectedprojectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className='h-screen my-8 flex gap-8'>
      <ProjectSidebar
        onSelectProject={handleSelectProject}
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        selectedProjectId={projectsState.selectedprojectId}
      />
      {content}
    </main>
  );
}

export default App;
