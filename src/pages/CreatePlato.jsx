import React from "react";
import { Navigate  } from 'react-router-dom';
import { useState } from 'react'
import { useForm } from "react-hook-form";
// import { useForm } from "@pankod/refine-react-hook-form";
// import { useSelect, useApiUrl } from "@pankod/refine-core";

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2'

import Alerta from '../components/Alerta';


const CreatePlato = () => {

    const { register, handleSubmit } = useForm();    
    const [ alerta, setAlerta ] = useState({});  
    const [ guardado, setGuardado ] = useState(false);


    const onSubmit = async (datos) => {

    setAlerta({});

    try {
        
        const formData = new FormData();
        formData.append("image", datos.file[0]);
        formData.append("nombre", datos.nombre);
        formData.append("description", datos.description);
        formData.append("precio", datos.precio);

        const { data } = await clienteAxios.post(`/platos/create`, formData );  
        // console.log(data);

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
  };

  const { msg } = alerta;

  return (
        <div id="center">
            {guardado && <Navigate to="/"/>}  
            <section id="content" className='p-5 m-auto h-full'>
                <h2 className="text-gray-400 font-black text-6xl text-center">Crear {" "}<span className="text-black">Platos Tipicos</span></h2>
                <form 
                    id="form"
                    className="mid-form my-5 lg:w-4/6 mx-auto shadow-xl border rounded-lg p-5"
                    onSubmit={handleSubmit(onSubmit)}
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
                        // value={nombre}
                        // onChange={ e => setNombre(e.target.value) }
                        {...register("nombre", { required: true })}
                        required
                        />
                    </div>
                    <div className="form-group mt-4">
                        <label htmlFor="content" className="font-medium text-xl block">Descripcion</label>
                        <textarea 
                            name="description" 
                            className='w-full border p-2 focus:outline-none placeholder:text-gray-300 h-52 text-xl' 
                            placeholder='Descripcion Plato'
                            // value={description}
                            // onChange={ e => setDescription(e.target.value) }
                            {...register("description", { required: true })}
                            required
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
                                // value={precio}
                                // onChange={ e => setPrecio(e.target.value) }
                                {...register("precio", { required: true })}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group mt-4">
                        <label htmlFor="image" className='font-medium text-xl block '>Imagen</label>
                        <input 
                            type="file" 
                            name="image" 
                            className='text-gray-400' 
                            {...register("file")}
                        />
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
