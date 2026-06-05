import React from 'react';
import { AlertCircle } from 'lucide-react';

export const PriorityBadge = ({ priority }) => {
  const styles = {
    High: 'bg-red-100 text-red-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-green-100 text-green-800',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${styles[priority] || 'bg-gray-100 text-gray-800'}`}>
      {priority}
    </span>
  );
};

export const CategoryTag = ({ category }) => {
  return (
    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
      {category}
    </span>
  );
};

export const EmptyState = ({ columnName }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
      <div className="text-gray-300 mb-4">
        <AlertCircle size={48} />
      </div>
      <h3 className="text-gray-500 font-semibold mb-2">No tasks yet</h3>
      <p className="text-gray-400 text-sm">
        Add a task or drag one here to get started in {columnName}
      </p>
    </div>
  );
};

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
  );
};
