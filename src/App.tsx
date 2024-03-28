import NoProjectSelected from './components/NoProjectSelected.tsx';
import ProjectSidebar from './components/ProjectSidebar.tsx';

function App() {
  return (
    <main className='h-screen my-8 flex gap-8'>
      <ProjectSidebar />
      <NoProjectSelected />
    </main>
  );
}

export default App;
