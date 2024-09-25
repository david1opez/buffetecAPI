"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            response: {
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
            response: {
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
            response: [
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
            response: {}
        },
    ]
};
exports.default = Routes;
//# sourceMappingURL=Routes.js.map