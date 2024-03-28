function ProjectSidebar() {
  return (
    <aside className='w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl'>
      <h2 className='text-xl font-bold text-stone-700 my-4'>Your Projects</h2>
      <button className='px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100'>
        + Add Project
      </button>

      <ul>// List of Projects</ul>
    </aside>
  );
}

export default ProjectSidebar;
