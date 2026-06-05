export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }
  if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  }

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const getTasksByColumn = (tasks, column) => {
  return tasks.filter(task => task.status === column).sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt);
  });
};

export const getPriorityColor = (priority) => {
  switch (priority?.toLowerCase()) {
    case 'high':
      return 'bg-red-500';
    case 'medium':
      return 'bg-yellow-500';
    case 'low':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
};

export const getPriorityTextColor = (priority) => {
  switch (priority?.toLowerCase()) {
    case 'high':
      return 'text-red-600';
    case 'medium':
      return 'text-yellow-600';
    case 'low':
      return 'text-green-600';
    default:
      return 'text-gray-600';
  }
};

export const isTaskOverdue = (dueDate) => {
  const due = new Date(dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  return due < today;
};

export const isTaskDueToday = (dueDate) => {
  const due = new Date(dueDate);
  const today = new Date();
  return due.toDateString() === today.toDateString();
};

export const filterTasks = (tasks, searchQuery, filterPriority) => {
  return tasks.filter(task => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPriority =
      filterPriority === 'all' || task.priority.toLowerCase() === filterPriority.toLowerCase();

    return matchesSearch && matchesPriority;
  });
};
