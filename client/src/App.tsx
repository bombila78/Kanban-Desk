import React from 'react';
import Header from './components/Header'
import TaskDesk from './components/TaskDesk'
import './style.scss'

const App: React.FC = () => {
  return (
    <>
      <Header />
      <h2 className="desk-title">ToDo Desk</h2>
        <TaskDesk />
    </>
  ) 
}

export default App;
