export interface TaskItem {
  id: string;
  title: string;
  completed: boolean;
}

export const INITIAL_TASKS: TaskItem[] = [
  { id: '1', title: 'Install React Native & Setup SDK', completed: true },
  { id: '2', title: 'Configure Environment Variables', completed: true },
  { id: '3', title: 'Install React Native Paper UI', completed: true },
  { id: '4', title: 'Learn Navigation & State Management', completed: false },
  { id: '5', title: 'Build Full-stack Mobile App', completed: false },
];
