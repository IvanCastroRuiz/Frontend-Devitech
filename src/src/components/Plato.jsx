import { Link } from 'react-router-dom';

const Plato = ({plato}) => {

    const { _id, nombre, precio, image  } = plato;


  return (
    <div key={_id} className="group relative shadow-2xl p-4">

        {
            image
                  ?
                    <div className=" aspect-w-1 aspect-h-1 w-full overflow-hidden group-hover:opacity-75 lg:aspect-none lg:h-44">
                            <img
                                src={image.url}
                                alt={nombre}
                                className="object-containt w-64 mx-auto h-44 rounded-md"
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
        

       <div className="mt-4 flex justify-between">
            <div>
                <h3 className="text-xl text-gray-900">
                <Link 
                    to={`/detalle-plato/${_id}`}
                >
                    <span aria-hidden="true" className="absolute inset-0" />
                    {nombre}
                </Link>
                </h3>
                {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
            </div>
            <p className="text-xl text-gray-900 font-bold">${precio}</p>
        </div> 
    </div>
  )
}

export default Plato
