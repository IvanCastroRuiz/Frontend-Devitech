import { 
  BrowserRouter, 
  Routes, 
  Route 
} from 'react-router-dom';

import LayoutPublic from './Layout/LayoutPublic';

import Home from './pages/Home';
import CreatePlato from './pages/CreatePlato';
import DetallePlato from './pages/DetallePlato';
import EditPlato from './pages/EditPlato';


function App() {


  return (

    <BrowserRouter>
      <Routes>
            <Route exact path="/" element={<LayoutPublic />}>
              <Route path="/" element={<Home/>}/>
              <Route path="create-plato" element={<CreatePlato/>}/>
              <Route path="detalle-plato/:id" element={<DetallePlato/>}/> 
              <Route path="edit-plato/:id" element={<EditPlato/>}/> 
            </Route>
      </Routes>  
    </BrowserRouter>


  )
}

export default App
