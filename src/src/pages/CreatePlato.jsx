import { Navigate  } from 'react-router-dom';
import { useState } from 'react'
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2'

import Alerta from '../components/Alerta';


const CreatePlato = () => {
   
  const [ nombre, setNombre ] = useState('');  
  const [ description, setDescription ] = useState('');  
  const [ precio, setPrecio ] = useState('');  
  const [ image, setImage ] = useState({});  
  const [ alerta, setAlerta ] = useState({});  
  const [guardado, setGuardado ] = useState(false);


  const handleSudmit = async (e) =>{
    e.preventDefault();

    if([nombre, description, precio].includes('')){
        setAlerta({msg: "Hay campos vacios", error: true});
        return;
    };

    setAlerta({});

    try {
        // const form = document.getElementById('form');
        // const formData = new FormData(form);
        // formData.append(nombre);
        // console.log(formData);

        const { data } = await clienteAxios.post(`/platos/create`, {nombre, description, precio} );  
        console.log(data);

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
        })

        setTimeout(() => {
            setGuardado(true);
        }, 1500)
        
    } catch (error) {
        console.log(error.message);
    }
    
  }

  const { msg } = alerta;

  return (
          <div id="center">
              {guardado && <Navigate to="/"/>}  
              <section id="content" className='p-5 m-auto h-full'>
                  <h2 className="text-gray-400 font-black text-6xl text-center">Crear {" "}<span className="text-black">Platos Tipicos</span></h2>
                  <form 
                    id="form"
                    className="mid-form my-5 lg:w-4/6 mx-auto shadow-xl border rounded-lg p-5"
                    onSubmit={handleSudmit}
                  >
                      { msg &&  <Alerta 
                                    alerta={alerta}
                                    setAlerta={setAlerta}
                                />
                      }  

                      <div className="form-group mt-2">
                          <label htmlFor="title" className='font-medium text-xl block'>Nombre</label>
                          <input 
                            type="text" 
                            name="nombre" 
                            className='flex w-full border p-2 focus:outline-none placeholder:text-gray-300 text-xl' 
                            placeholder='Nombre Plato' 
                            value={nombre}
                            onChange={ e => setNombre(e.target.value) }
                          />
                      </div>
                      <div className="form-group mt-4">
                          <label htmlFor="content" className="font-medium text-xl block">Descripcion</label>
                          <textarea 
                            name="description" 
                            className='w-full border p-2 focus:outline-none placeholder:text-gray-300 h-52 text-xl' 
                            placeholder='Descripcion Plato'
                            value={description}
                            onChange={ e => setDescription(e.target.value) }
                          >

                          </textarea>
                      </div>
                      <div className="form-group mt-4">
                          <label htmlFor="content" className="font-medium text-xl block">Precio</label>
                          <div className='flex items-center'>
                              <span className='font-bold text-2xl mr-2'>$</span> 
                              <input 
                                name="precio" 
                                type="number" 
                                className='w-full border p-2 focus:outline-none placeholder:text-gray-300 text-xl' 
                                placeholder='100.00'
                                value={precio}
                                onChange={ e => setPrecio(e.target.value) }
                            />
                          </div>
                      </div>
                      <div className="form-group mt-4">
                          <label htmlFor="image" className='font-medium text-xl block '>Imagen</label>
                           En construccion
                          {/* <input 
                            type="file" 
                            name="image" 
                            className='text-gray-400' 
                            onChange={ e => setImage(e.target.files[0]) }
                           /> */}
                      </div>
                      <div className="form-group mt-4 flex justify-center">
                          <input type="submit" value="Guardar" className="bg-green-900 text-white mt-4 p-2 uppercase rounded hover:cursor-pointer hover:bg-green-700 transition-colors" />
                      </div>
                  </form>
              </section>
          </div>
      )
}

export default CreatePlato
