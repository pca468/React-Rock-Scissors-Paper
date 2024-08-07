import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import GamePage from './pages/GamePage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />}/>
      <Route path='/gamepage' element={<GamePage />}/>
    </Routes>
  );
}

export default App;
