import { Link  } from 'react-router-dom';


const Nav = () => {

  return (
    <div className="nav-bg items-center">

        <img src="https://devitech.com.co/wp-content/uploads/2019/07/logo_completo.png" alt="device"/>

        <nav className="navegacion-principal contenedor">
              <Link to="/">Lista Platos</Link>
              <Link to="/create-plato">Crear Plato</Link>
        </nav>
    </div>
  )
}

export default Nav
