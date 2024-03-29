import { createContext, ReactNode, useState } from 'react';
import { generateSimpleGUID } from '../util/generateGUID';

export interface Project {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
}

export interface Task {
  task: string;
  projectId: string | null | undefined;
  id: string;
}

interface ProjectsState {
  projects: Project[];
  tasks: Task[];
  selectedProjectId: string | undefined | null; // Either stores the id of the project that was selected, null if we want to add a new project, undefined if we're not adding a new project and also if we did not select any project
}

type ProjectContextType = ProjectsState & {
  addProject: (projectData: Project) => void;
  deleteProject: () => void;
  selectProject: (id: string) => void;
  startAddProject: () => void;
  cancelAddProject: () => void;
  addTask: (task: string) => void;
  deleteTask: (id: string) => void;
};

const initialProjectsState: ProjectContextType = {
  projects: [],
  tasks: [],
  selectedProjectId: undefined,
  addProject: () => {},
  deleteProject: () => {},
  selectProject: () => {},
  startAddProject: () => {},
  cancelAddProject: () => {},
  addTask: () => {},
  deleteTask: () => {},
};

export const ProjectContext =
  createContext<ProjectContextType>(initialProjectsState);

type ProjectContextProviderProps = {
  children: ReactNode;
};
function ProjectContextProvider({ children }: ProjectContextProviderProps) {
  const [projectsState, setProjectsState] = useState<ProjectsState>({
    projects: [],
    tasks: [],
    selectedProjectId: undefined,
  });

  function updateProjectState(selectedProjectId: string | undefined | null) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId,
      };
    });
  }

  function handleAddTask(task: string) {
    setProjectsState((prevState) => {
      const taskId = generateSimpleGUID();
      const newTask: Task = {
        task: task,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  function handleDeleteTask(id: string) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
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
    setProjectsState((prevState) => {
      const newProject: Project = {
        ...projectData,
      };
      return {
        ...prevState,
        selectedProjectId: undefined, // Go back to the fallback screen after clicking save
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  }

  const projectContextValue: ProjectContextType = {
    projects: projectsState.projects,
    tasks: projectsState.tasks,
    selectedProjectId: projectsState.selectedProjectId,
    addProject: handleAddProject,
    deleteProject: handleDeleteProject,
    selectProject: handleSelectProject,
    startAddProject: handleStartAddProject,
    cancelAddProject: handleCancelAddProject,
    addTask: handleAddTask,
    deleteTask: handleDeleteTask,
  };

  return (
    <ProjectContext.Provider value={projectContextValue}>
      {children}
    </ProjectContext.Provider>
  );
}

export default ProjectContextProvider;
