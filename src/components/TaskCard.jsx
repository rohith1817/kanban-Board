import React, { useState } from 'react';
import { Trash2, Edit2, Calendar, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { PriorityBadge, CategoryTag } from './UIComponents';
import { formatDate, isTaskOverdue } from '../utils/helpers';
import { useBoard } from '../context/BoardContext';
import { useToast } from '../hooks/useToast';
import TaskModal from './TaskModal';

const TaskCard = ({ task, columnStatus }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { dispatch } = useBoard();
  const { addToast } = useToast();

  const handleDelete = () => {
    dispatch({ type: 'DELETE_TASK', payload: task.id });
    addToast('Task deleted', 'success');
  };

  const handleEditOpen = () => {
    setIsEditing(true);
  };

  const handleEditClose = () => {
    setIsEditing(false);
  };

  const isOverdue = isTaskOverdue(task.dueDate);

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        whileHover={{ y: -4 }}
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 cursor-grab active:cursor-grabbing group ${
          isOverdue ? 'border-l-4 border-red-500' : ''
        }`}
        draggable
      >
        {/* Header with Priority and Actions */}
        <div className="flex items-start justify-between mb-3">
          <PriorityBadge priority={task.priority} />
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEditOpen}
              className="p-1 text-blue-600 hover:bg-blue-100 rounded"
              aria-label="Edit task"
            >
              <Edit2 size={16} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDelete}
              className="p-1 text-red-600 hover:bg-red-100 rounded"
              aria-label="Delete task"
            >
              <Trash2 size={16} />
            </motion.button>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 line-clamp-2">
          {task.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
          {task.description}
        </p>

        {/* Category Tag */}
        {task.category && (
          <div className="mb-3">
            <CategoryTag category={task.category} />
          </div>
        )}

        {/* Due Date */}
        <div className={`flex items-center gap-2 text-sm font-medium ${isOverdue ? 'text-red-600' : 'text-gray-600 dark:text-gray-400'}`}>
          <Calendar size={16} />
          <span>{formatDate(task.dueDate)}</span>
          {isOverdue && <AlertCircle size={16} />}
        </div>
      </motion.div>

      {/* Task Modal for Editing */}
      {isEditing && <TaskModal task={task} onClose={handleEditClose} />}
    </>
  );
};

export default TaskCard;
