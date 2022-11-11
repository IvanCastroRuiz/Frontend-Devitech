import { useState, useEffect }  from 'react'
import clienteAxios from '../config/axios';

import Spinner from '../components/Spinner';
import Plato from '../components/Plato';

const Home = () => {

  const [ platos, setPlatos] = useState([]);
  const [ spinner, setSpinner ] = useState(true);
  

  useEffect( () =>{
    const consultarApi = async () =>{
      try {

          const { data } = await clienteAxios('/platos/get');
          setPlatos(data);
  
      } catch (error) {
          console.log("Error: " + error.message);
      }
    };
    consultarApi();
  }, []);


  return (
    <>
        <main className='container mx-auto mt-10'>
          <div>
            <h1 className="text-gray-400 font-black text-6xl text-center">Nuestros {" "}<span className="text-black">Platos Tipicos</span></h1>
          </div>
          <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

              {
                spinner
                        ?
                          <Spinner
                            spinner={Spinner}
                            setSpinner={setSpinner}
                          />
                        :

                           platos.length > 0 
                                          ?
                                          <div className="bg-white">
                                            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                                             <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                                                 
                                                 {
                                                    platos.map( plato => (
                                                        <Plato 
                                                            key={plato._id}
                                                            plato={plato}
                                                        />
                                                    ))
                                                  }

                                              </div>
                                            </div>
                                          </div>
                                        : 
                                        
                                        <p>Cargando el listado de productos...</p>  
                          
              }
            
          </div>
        </main>
    </>
  )
}

export default Home