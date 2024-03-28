import NewProject from './components/NewProject.tsx';
import ProjectSidebar from './components/ProjectSidebar.tsx';

function App() {
  return (
    <main className='h-screen my-8 flex gap-8'>
      <ProjectSidebar />
      <NewProject />
    </main>
  );
}

export default App;
