import './App.css';
import Invitaion from './component/Invitation';
import Thanks from './component/Thanks';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Invitaion />} />
      <Route path="/thanks" element={<Thanks />} />
    </Routes>

  );
}

export default App;
