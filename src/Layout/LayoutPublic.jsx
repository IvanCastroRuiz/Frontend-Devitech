import { Outlet  } from 'react-router-dom';

//Components
import Navegacion from '../components/Navegacion';

const LayoutPublic = () => {
  return (
    <div>
        <Navegacion/>
        <Outlet/>
    </div>
  )
}

export default LayoutPublic