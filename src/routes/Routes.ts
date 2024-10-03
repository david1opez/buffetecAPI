const Routes = {
    routes: [
        {
            route: '/crearUsuario',
            method: 'POST',
            description: 'Crea un usuario',
            requestBody: {
                user: {
                    uid: 'string',
                    nombre: 'string',
                    genero: 'string',
                    celular: 'string',
                    email: 'string',
                    fechaDeNacimiento: 'string',
                    tipo: "'abogado' | 'cliente' | 'admin'"
                }
            },
            responseFormat: {
                acknowledged: 'boolean',
                insertedId: 'string'
            }
        },
        {
            route: '/getUsuario',
            method: 'GET',
            description: 'Obtiene un usuario con determinado UID',
            queryParameters: {
                uid: 'string'
            },
            responseFormat: {
                _id: 'string',
                uid: 'string',
                nombre: 'string',
                genero: 'string',
                celular: 'string',
                email: 'string',
                fechaDeNacimiento: 'string',
                tipo: "'abogado' | 'cliente' | 'admin'"
            }
        },
        {
            route: '/getAbogados',
            method: 'GET',
            description: 'Obtiene todos los abogados',
            queryParameters: {},
            responseFormat: [
                {
                    _id: 'string',
                    uid: 'string',
                    nombre: 'string',
                    descripcion: 'string',
                    horario: 'string',
                    casosEjemplo: 'string',
                    diasDisponibles: [
                        {
                            dia: "'lun' | 'mar' | 'mie' | 'jue' | 'vie' | 'sab' | 'dom'",
                            horasDisponibles: ['string']
                        }
                    ]
                }
            ]
        },
        {
            route: '/crearAbogado',
            method: 'POST',
            description: 'Aún no hago este endpoint',
            requestBody: {},
            responseFormat: {}
        },
        {
            route: '/getNoticias',
            method: 'GET',
            description: 'Obtiene todas las noticias de la base de datos y de la API de noticias',
            queryParameters: {},
            responseFormat: {
                source: {
                    id: null,
                    name: 'string'
                },
                articles: [
                    {
                        title: 'string',
                        description: 'string',
                        urlToImage: 'string',
                        date: 'string',
                        url: 'string'
                    }
                ]
            }
        },
        {
            route: '/crearNoticia',
            method: 'POST',
            description: 'Crea una noticia',
            requestBody: {
                news: {
                    title: 'string',
                    description: 'string',
                    image: 'string'
                }
            },
            responseFormat: {
                acknowledged: 'boolean',
                insertedId: 'string'
            }
        }
    ]
}

export default Routes;
