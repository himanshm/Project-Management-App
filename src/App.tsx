import { ReactNode, useState } from 'react';
import NoProjectSelected from './components/NoProjectSelected.tsx';
import ProjectSidebar from './components/ProjectSidebar.tsx';
import NewProject from './components/NewProject.tsx';
import { generateSimpleGUID } from './util/generateGUID.ts';

export interface Project {
  id?: string;
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

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedprojectId: null,
      };
    });
  }

  function handleAddProject(projectData: Project) {
    const newProject: Project = {
      ...projectData,
      id: generateSimpleGUID(),
    };
    setProjectsState((prevState) => {
      return {
        ...prevState,
        projects: [...prevState.projects, newProject],
      };
    });
  }
  console.log(projectsState);

  let content: ReactNode;

  if (projectsState.selectedprojectId === null) {
    content = <NewProject onAddProject={handleAddProject} />;
  } else if (projectsState.selectedprojectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className='h-screen my-8 flex gap-8'>
      <ProjectSidebar onStartAddProject={handleStartAddProject} />
      {content}
    </main>
  );
}

export default App;