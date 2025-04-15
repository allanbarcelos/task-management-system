import { useMemo } from 'react';
import { TaskItem } from '../interfaces/TaskItem'; 

type SortKey = 'creationDate' | 'dueDate' | 'status';
type SortOrder = 'asc' | 'desc';

export function useTaskSorting(tasks: TaskItem[], sortBy: SortKey, order: SortOrder = 'asc') {
  return useMemo(() => {
    const sorted = tasks.slice().sort((t1, t2) => {
      let compareValue = 0;

      if (sortBy === 'creationDate') {
        compareValue = new Date(t1.createdAt).getTime() - new Date(t2.createdAt).getTime();
      } else if (sortBy === 'dueDate') {
        compareValue = new Date(t1.dueDate).getTime() - new Date(t2.dueDate).getTime();
      } else if (sortBy === 'status') {
        compareValue = t1.status.localeCompare(t2.status);
      }

      return order === 'asc' ? compareValue : -compareValue;
    });

    return sorted;
  }, [tasks, sortBy, order]);
}

/*
    To implement in TaskList.tsx page:
    
    imports:
      -import { useTaskSorting } from '@hooks/useTaskSorting';

    variables:
      -const sortedTasks = useTaskSorting(tasks, sortKey, sortOrder);
    
   *  Replace tasks with sortedTasks at implementation.
*/
