export interface Task {
  title: string;
  description?: string;
}

export interface Day {
  name: string; 
  date: string; 
  tasks: Task[][];
}
