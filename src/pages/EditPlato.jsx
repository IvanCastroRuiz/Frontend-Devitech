import { useState, useEffect } from 'react';
import { Link, useParams, Navigate  } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'
import Spinner from '../components/Spinner';
import clienteAxios from '../config/axios';

const EditPlato = () => {
    const { register, handleSubmit } = useForm();
    const params = useParams();
    const { id } = params;
    const [ plato, setPlato ] = useState({});
    const [ spinner, setSpinner ] = useState(true);
    const [editado, setEditado ] = useState(false);


    useEffect( () =>{
        const consultarApi = async () =>{
          try {

            const { data } = await clienteAxios(`/platos/get/${id}`);  
            setPlato(data);
          } catch (error) {
              console.log("Error: " + error.message);
          }
        };
        consultarApi();
    }, []);  
    
    const updatePlato = async (datos) => {
          
        try {

          const { data } = await clienteAxios.put(`/platos/update/${id}`, datos);  
          setEditado(true);
        } catch (error) {
            console.log(error.message);
        }
        
    };

    const onSubmit = async (datos) => {

      Swal.fire({
        title: 'Quieres guardar los cambios?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        denyButtonText: `No Guardar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {

          const formData = new FormData();
          formData.append("id", id);
          formData.append("image", datos.file[0]);
          formData.append("nombre", datos.nombre);
          formData.append("description", datos.description);
          formData.append("precio", datos.precio);

          updatePlato(formData);
          Swal.fire('Guardado!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Los cambios no se guardaron', '', 'info')
        }
      })
    };

  const { _id, nombre, description, precio, image} = plato

  return (
    <main className='container mx-auto mt-10'>
       {editado && <Navigate to='/'/>} 
       {
          spinner
                    ?
                        <Spinner
                            spinner={spinner}
                            setSpinner={setSpinner}
                        />
                    :  
                      <>
                          {
                            _id 
                                  ?
                                    <>
                                      <div id="center">
                                          <section id="content" className='p-5 m-auto h-full'>
                                              <h2 className="text-gray-400 font-black text-6xl text-center">Editar {" "}<span className="text-black">Articulos</span></h2>
                                              <form 
                                                className="mid-form my-5 lg:w-4/6 mx-auto shadow-xl border rounded-lg p-5"
                                                onSubmit={handleSubmit(onSubmit)}
                                              >

                                                  
                                                  <div className="form-group mt-2">  
                                                            {
                                                              image
                                                                    ?
                                                                      <div >
                                                                        <img
                                                                            src={image.url}
                                                                            alt={nombre}
                                                                            className="object-containt h-52 m-auto rounded-md"
                                                                        />
                                                                      </div>
                                                                    :
                                                                      <div >
                                                                        <img
                                                                            src="https://res.cloudinary.com/drfppwpaq/image/upload/v1668152873/images_1_sjynjm.jpg"
                                                                            alt="sin imagen"
                                                                            className="object-containt h-52 m-auto rounded-md"
                                                                        />
                                                                      </div>
                                                            }
                                                  </div>


                                                  <div className="form-group mt-2">
                                                      <label htmlFor="title" className='font-medium text-xl block'>Titulo</label>
                                                      <input 
                                                        type="text" 
                                                        name="nombre" 
                                                        className='flex w-full border p-2 focus:outline-none placeholder:text-gray-300 text-xl' placeholder='Titulo' 
                                                        value={nombre || ''}
                                                        onChange={ e => setPlato({
                                                          ...plato, 
                                                          [e.target.name] : e.target.value
                                                        })}
                                                        {...register("nombre")}
                                                      />
                                                  </div>
                                                  <div className="form-group mt-4">
                                                      <label htmlFor="content" className="font-medium text-xl block">Contenido</label>
                                                      <textarea 
                                                        name="description" 
                                                        className='w-full border p-2 focus:outline-none placeholder:text-gray-300 h-52 text-xl' placeholder='Contenido'
                                                        value={description || ''}
                                                        onChange={ e => setPlato({
                                                          ...plato, 
                                                          [e.target.name] : e.target.value
                                                        })}
                                                        {...register("description")}
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
                                                            value={precio || ''}
                                                            onChange={ e => setPlato({
                                                              ...plato, 
                                                              [e.target.name] : e.target.value
                                                            })}
                                                            {...register("precio")}
                                                          ></input>
                                                      </div>
                                                  </div>
                                                  <div className="form-group mt-4">
                                                      <label htmlFor="file0" className='font-medium text-xl block'>Imagen</label>
                                                      En construccion
                                                      <input 
                                                        type="file" 
                                                        name="image" 
                                                        className='text-gray-400' 
                                                        {...register("file")}
                                                      /> 
                                                  </div>
                                                  <div className="form-group mt-4 flex justify-center">
                                                      <input 
                                                        type="submit" 
                                                        value="Editar" 
                                                        className="bg-green-900 text-white mt-4 p-2 uppercase rounded hover:cursor-pointer hover:bg-green-700 transition-colors" />
                                                  </div>
                                              </form>
                                          </section>
                                      </div>

                                      <div className="p-6 flex gap-5 justify-center flex-wrap">
                                        <Link
                                            className="btn bg-cyan-600 text-center text-xl text-white font-bold p-2 uppercase rounded-md"
                                            to="/"
                                        >
                                            Regresa
                                        </Link>            
                                    </div>

                                     </>                       
                                      
                                  :
                                    <p>Procesando</p>
                          }
                      </>
       }
    </main>
  )
}

export default EditPlato
