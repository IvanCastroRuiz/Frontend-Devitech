
import { Link, useParams, Navigate  } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import Spinner from '../components/Spinner';
import clienteAxios from '../config/axios';

const DetallePlato = () => {

    const params = useParams();
    const { id } = params;
    const [ plato, setPlato ] = useState({});
    const [ spinner, setSpinner ] = useState(true);  
    const [eliminado, setEliminado ] = useState(false);

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
    
    const { _id, nombre, description, precio, image} = plato


    const deletePlato = async (id) => {
        
        try {
           await clienteAxios.delete(`/platos/delete/${id}`);   
           setEliminado(true)
        } catch (error) {
            console.log(error.message);
        }
        
    };


    const handelClick = async (e) => {
        e.preventDefault();
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn bg-red-600 rounded-md text-white text-center p-2 font-bold mx-2',
                cancelButton: 'btn bg-green-600 rounded-md text-white text-center p-2 font-bold mx-2'
            },
            buttonsStyling: false
            })
            
            swalWithBootstrapButtons.fire({
                title: 'Estas seguro?',
                text: "Estas accion no se podra revertir!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si, eliminar!',
                cancelButtonText: 'Cancelar!',
                reverseButtons: true
            }).then((result) => {
            if (result.isConfirmed) {

                deletePlato(_id);

                swalWithBootstrapButtons.fire(
                    'Eliminado!',
                    'El plato se elimino',
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                'Cancelado',
                'No se elimino el Plato!!',
                'error'
                )
            }
            })
    };


  return (
    
    <main className='container mx-auto mt-10'>
        {eliminado && <Navigate to="/"/>}
        {
            spinner 
                    ?
                        <Spinner
                            spinner={Spinner}
                            setSpinner={setSpinner}
                        />
                    :
                        <>
                            <div className="flex flex-col md:flex-row">
    
                                {
                                    _id
                                        ?
                                        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                                            <h1 className="font-bold tracking-tight text-gray-900 uppercase text-center text-3xl md:text-5xl">{nombre}</h1>
                                            <div className="mt-6 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                                                {
                                                    image
                                                            ?
                                                                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:aspect-none lg:h-80 flex align-middle">
                                                                        <img
                                                                            src={image.url}
                                                                            alt={nombre}
                                                                            className="object-containt md:h-64 m-auto rounded-md"
                                                                        />
                                                                </div>    
                                                            :
                                                                <div className=" aspect-w-1 aspect-h-1 w-full overflow-hidden group-hover:opacity-75 lg:aspect-none lg:h-44">
                                                                    <img
                                                                        src="https://res.cloudinary.com/drfppwpaq/image/upload/v1668152873/images_1_sjynjm.jpg"
                                                                        alt="sin imagen"
                                                                        className="object-containt w-64 mx-auto h-44 rounded-md"
                                                                    />
                                                                </div>
                                                }
                                                <p className="mt-4 text-6xl text-center text-gray-900">$ {precio}</p>
                                                <p className="mt-4 text-xl text-justify text-gray-900"> {description}</p>
                                            </div>
                                        </div>      
                                        :
    
                                            <p>Cargando la informacion del producto...</p> 
                                }
    
                                
    
                            </div>  
    
                            <div className="p-6 flex gap-5 justify-center flex-wrap">
                                <Link
                                    className="btn bg-cyan-600 text-center text-xl text-white font-bold p-2 uppercase rounded-md"
                                    to="/"
                                >
                                    Regresa
                                </Link>
    
                                <Link
                                    className="btn bg-green-600 text-center text-xl text-white font-bold p-2 uppercase rounded-md"
                                    to={`/edit-plato/${_id}`}
                                >
                                    Editar
                                </Link>
    
    
                                <Link
                                    className="btn bg-red-600 text-center text-xl text-white font-bold p-2 uppercase rounded-md"
                                    to="#"
                                    onClick={handelClick}
                                >
                                    Eliminar
                                </Link>    
    
    
                            </div>
                        </>
                
                                         
        }
    </main>
  )
}

export default DetallePlato
