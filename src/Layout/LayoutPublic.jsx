import { Outlet  } from 'react-router-dom';

//Components
import Navegacion from '../components/Navegacion';
import Nav from '../components/Nav';

const LayoutPublic = () => {
  return (
    <div>
        {/* <Navegacion/> */}
        <Nav/>
        <main className="container mx-auto mt-12 gap-10 p-5 items-center">
          <Outlet/>
        </main>


        <footer className="fooster">
            <p>Ivan Castro Ruiz Freelancer</p>
        </footer>

    </div>
  )
}

export default LayoutPublic