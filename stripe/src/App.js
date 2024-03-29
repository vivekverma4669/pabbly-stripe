import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route , Routes} from 'react-router-dom';
import Sucess from './Components/Sucess';
import Cancel from './Components/cancel';
import Shop from './Components/Shop';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route  path='/' element={<Shop/>}/>
        <Route  path='/sucess' element={<Sucess/>}/>
        <Route  path='/cancel' element={<Cancel/>}/>
       </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
