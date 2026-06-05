import React from 'react';
import { Search, Moon, Sun } from 'lucide-react';
import { useBoard } from '../context/BoardContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { state, dispatch } = useBoard();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg sticky top-0 z-40"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo/Title */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-blue-600 font-bold">
              K
            </div>
            <h1 className="text-2xl font-bold hidden sm:block">Kanban Board</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-blue-200" size={20} />
              <input
                type="text"
                placeholder="Search tasks..."
                value={state.searchQuery}
                onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-blue-500 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
            className="p-2 hover:bg-blue-500 rounded-lg transition-colors"
            aria-label="Toggle dark mode"
          >
            {state.darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
