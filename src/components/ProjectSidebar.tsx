import Button from './Button.tsx';

type ProjectSidebarProps = {
  onStartAddProject: () => void;
};

function ProjectSidebar({ onStartAddProject }: ProjectSidebarProps) {
  return (
    <aside className='w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl'>
      <h2 className='mb-8 font-bold uppercase md:text-xl text-stone-200'>
        Your Projects
      </h2>
      <Button onClick={onStartAddProject}>+ Add Project</Button>

      <ul>// List of Projects</ul>
    </aside>
  );
}

export default ProjectSidebar;