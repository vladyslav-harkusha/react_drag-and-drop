import { FC } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import { NavBar } from './components/NavBar';
import { StartPage } from './pages/StartPage';
import { SortCardsPage } from './pages/SortCardsPage';
import { TaskBoardPage } from './pages/TaskBoardPage';
import { DropFilesPage } from './pages/DropFilesPage';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/*" element={<Navigate to='/react_drag-and-drop/Start_Page' replace />} />
          <Route path="/" element={<StartPage />} />
          <Route path="/react_drag-and-drop/" element={<StartPage />} />
          <Route path="/react_drag-and-drop/Start_Page" element={<StartPage />} />
          <Route path="/react_drag-and-drop/Sort_Cards" element={<SortCardsPage />} />
          <Route path="/react_drag-and-drop/Task_Board" element={<TaskBoardPage />} />
          <Route path="/react_drag-and-drop/Drop_Files" element={<DropFilesPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
