import React, { createContext, useContext, useReducer, useEffect } from 'react';

const BoardContext = createContext();

const initialState = {
  tasks: [],
  darkMode: false,
  searchQuery: '',
  filterPriority: 'all',
};

const boardReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, { ...action.payload, id: Date.now().toString() }],
      };

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? { ...task, ...action.payload.updates } : task
        ),
      };

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };

    case 'MOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? { ...task, status: action.payload.newStatus }
            : task
        ),
      };

    case 'REORDER_TASKS':
      return {
        ...state,
        tasks: action.payload,
      };

    case 'TOGGLE_DARK_MODE':
      return {
        ...state,
        darkMode: !state.darkMode,
      };

    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload,
      };

    case 'SET_FILTER_PRIORITY':
      return {
        ...state,
        filterPriority: action.payload,
      };

    case 'LOAD_TASKS':
      return {
        ...state,
        tasks: action.payload,
      };

    case 'LOAD_SETTINGS':
      return {
        ...state,
        darkMode: action.payload.darkMode,
      };

    default:
      return state;
  }
};

export const BoardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(boardReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('kanban-tasks');
    const savedSettings = localStorage.getItem('kanban-settings');

    if (savedTasks) {
      try {
        dispatch({ type: 'LOAD_TASKS', payload: JSON.parse(savedTasks) });
      } catch (error) {
        console.error('Failed to load tasks from localStorage:', error);
      }
    }

    if (savedSettings) {
      try {
        dispatch({ type: 'LOAD_SETTINGS', payload: JSON.parse(savedSettings) });
      } catch (error) {
        console.error('Failed to load settings from localStorage:', error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(state.tasks));
  }, [state.tasks]);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('kanban-settings', JSON.stringify({ darkMode: state.darkMode }));
  }, [state.darkMode]);

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoard must be used within BoardProvider');
  }
  return context;
};
