import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Mainpage from './pages/Mainpage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Mainpage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
