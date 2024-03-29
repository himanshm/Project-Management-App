import { useContext } from 'react';
import { ProjectContext } from './context/ProjectContext.tsx';
import NoProjectSelected from './components/NoProjectSelected.tsx';
import ProjectSidebar from './components/ProjectSidebar.tsx';
import NewProject from './components/NewProject.tsx';
import SelectedProject from './components/SelectedProject.tsx';

function App() {
  const { selectedProjectId, projects } = useContext(ProjectContext);

  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId
  );

  return (
    <main className='h-screen my-8 flex gap-8'>
      <ProjectSidebar />
      {selectedProject && <SelectedProject project={selectedProject} />}
      {selectedProjectId === null && <NewProject />}
      {selectedProjectId === undefined && <NoProjectSelected />}
    </main>
  );
}

export default App;
