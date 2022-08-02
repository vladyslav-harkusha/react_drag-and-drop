import { FC } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import { NavBar } from './components/NavBar';
import { SortCardsPage } from './pages/SortCardsPage';
import { XXPage } from './pages/XXPage';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to='/react_drag-and-drop/sort_cards' replace />} />
          <Route path="/react_drag-and-drop/sort_cards" element={<SortCardsPage />} />
          <Route path="/react_drag-and-drop/xx_page" element={<XXPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
