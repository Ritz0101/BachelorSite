import React, { createContext, useState, useContext } from 'react';

const TrainingContext = createContext();

export function TrainingProvider({ children }) {
  const [completedModules, setCompletedModules] = useState({
    '1.1': false, // Understanding Security Levels
    '1.2': false, // Identifying Sensitive Information
    '1.3': false, // Handling Classified Information
    '2.1': false, // ISMS Basics
    '2.2': false  // Risk Assessment
  });

  const markModuleComplete = (moduleId) => {
    setCompletedModules(prev => ({
      ...prev,
      [moduleId]: true
    }));
  };

  return (
    <TrainingContext.Provider value={{ completedModules, markModuleComplete }}>
      {children}
    </TrainingContext.Provider>
  );
}

export function useTraining() {
  return useContext(TrainingContext);
} 