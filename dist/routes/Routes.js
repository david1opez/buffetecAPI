"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Routes = {
    routes: [
        {
            route: "/createUser",
            method: "POST",
            description: "Crea un usuario",
            requestBody: {
                user: {
                    uid: "string",
                    nombre: "string",
                    genero: "string",
                    celular: "string",
                    email: "string",
                    fechaDeNacimiento: "Date",
                    tipo: "'abogado' | 'cliente' | 'admin'",
                },
            },
            responseFormat: {
                _id: "string",
                uid: "string",
                nombre: "string",
                genero: "string",
                celular: "string",
                email: "string",
                fechaDeNacimiento: "Date",
                tipo: "'abogado' | 'cliente' | 'admin'",
                createdAt: "Date",
                updatedAt: "Date",
            },
        },
        {
            route: "/getUser",
            method: "GET",
            description: "Obtiene un usuario con determinado UID",
            queryParameters: {
                uid: "string",
            },
            responseFormat: {
                uid: "string",
                nombre: "string",
                genero: "string",
                celular: "string",
                email: "string",
                fechaDeNacimiento: "Date",
                tipo: "'abogado' | 'cliente' | 'admin'",
            },
        },
        {
            route: "/updateUser",
            method: "PUT",
            description: "Actualiza un usuario existente",
            requestBody: {
                uid: "string",
                // Campos opcionales para actualizar
                nombre: "string?",
                genero: "string?",
                celular: "string?",
                email: "string?",
                fechaDeNacimiento: "Date?",
            },
            responseFormat: {
                uid: "string",
                nombre: "string",
                genero: "string",
                celular: "string",
                email: "string",
                fechaDeNacimiento: "Date",
                tipo: "'abogado' | 'cliente' | 'admin'",
                updatedAt: "Date",
            },
        },
        {
            route: "/getAttorneys",
            method: "GET",
            description: "Obtiene todos los abogados",
            queryParameters: {},
            responseFormat: [
                {
                    usuarioId: "string",
                    especialidad: "string",
                    descripcion: "string",
                    horarioSemanal: {
                        lunes: ["string"],
                        martes: ["string"],
                        miercoles: ["string"],
                        jueves: ["string"],
                        viernes: ["string"],
                        sabado: ["string"],
                        domingo: ["string"],
                    },
                    duracionCita: "number",
                    casosEjemplo: "string",
                    excepcionesFechas: [
                        {
                            fecha: "Date",
                            razon: "string",
                        },
                    ],
                },
            ],
        },
        {
            route: "/createAttorney",
            method: "POST",
            description: "Crea un perfil de abogado",
            requestBody: {
                usuarioId: "string",
                especialidad: "string",
                descripcion: "string",
                horarioSemanal: {
                    lunes: ["string"],
                    martes: ["string"],
                    miercoles: ["string"],
                    jueves: ["string"],
                    viernes: ["string"],
                    sabado: ["string"],
                    domingo: ["string"],
                },
                duracionCita: "number",
                casosEjemplo: "string",
                excepcionesFechas: [
                    {
                        fecha: "Date",
                        razon: "string",
                    },
                ],
            },
            responseFormat: {
                _id: "string",
                usuarioId: "string",
                especialidad: "string",
                descripcion: "string",
                horarioSemanal: "object",
                duracionCita: "number",
                casosEjemplo: "string",
                excepcionesFechas: "array",
                createdAt: "Date",
                updatedAt: "Date",
            },
        },
        {
            route: "/updateAttorney",
            method: "PUT",
            description: "Actualiza un perfil de abogado",
            requestBody: {
                _id: "string",
                // Campos opcionales para actualizar
                especialidad: "string?",
                descripcion: "string?",
                horarioSemanal: "object?",
                duracionCita: "number?",
                casosEjemplo: "string?",
                excepcionesFechas: "array?",
            },
            responseFormat: {
                _id: "string",
                usuarioId: "string",
                especialidad: "string",
                descripcion: "string",
                horarioSemanal: "object",
                duracionCita: "number",
                casosEjemplo: "string",
                excepcionesFechas: "array",
                updatedAt: "Date",
            },
        },
        {
            route: "/createClientCase",
            method: "POST",
            description: "Crea un nuevo caso de cliente",
            requestBody: {
                clienteId: "string",
                tipo: "'mercantil' | 'familiar' | 'penal' | 'laboral' | 'civil' | 'administrativo' | 'otro'",
                estado: "'no_visto' | 'en_proceso' | 'terminado'",
                descripcion: "string",
                citas: [
                    {
                        razon: "string",
                        fecha: "Date",
                        estado: "'pendiente' | 'completada'",
                    },
                ],
            },
            responseFormat: {
                _id: "string",
                clienteId: "string",
                tipo: "string",
                estado: "string",
                descripcion: "string",
                citas: "array",
                createdAt: "Date",
                updatedAt: "Date",
            },
        },
        {
            route: "/getClientCases",
            method: "GET",
            description: "Obtiene todos los casos de un cliente",
            queryParameters: {
                clienteId: "string",
            },
            responseFormat: [
                {
                    clienteId: "string",
                    tipo: "string",
                    estado: "string",
                    descripcion: "string",
                    citas: [
                        {
                            razon: "string",
                            fecha: "Date",
                            estado: "string",
                        },
                    ],
                },
            ],
        },
        {
            route: "/updateClientCase",
            method: "PUT",
            description: "Actualiza un caso de cliente",
            requestBody: {
                _id: "string",
                // Campos opcionales para actualizar
                tipo: "string?",
                estado: "string?",
                descripcion: "string?",
                citas: "array?",
            },
            responseFormat: {
                _id: "string",
                clienteId: "string",
                tipo: "string",
                estado: "string",
                descripcion: "string",
                citas: "array",
                updatedAt: "Date",
            },
        },
        {
            route: "/createAppointment",
            method: "POST",
            description: "Crea una nueva cita",
            requestBody: {
                abogadoId: "string",
                clienteId: "string",
                fecha: "Date",
                hora: "string",
                estado: "'pendiente' | 'confirmada' | 'cancelada' | 'completada'",
                notas: "string?",
            },
            responseFormat: {
                _id: "string",
                abogadoId: "string",
                clienteId: "string",
                fecha: "Date",
                hora: "string",
                estado: "string",
                notas: "string?",
                createdAt: "Date",
                updatedAt: "Date",
            },
        },
        {
            route: "/getAppointments",
            method: "GET",
            description: "Obtiene las citas de un usuario (abogado o cliente)",
            queryParameters: {
                userId: "string",
                userType: "'abogado' | 'cliente'",
            },
            responseFormat: [
                {
                    abogadoId: "string",
                    clienteId: "string",
                    fecha: "Date",
                    hora: "string",
                    estado: "string",
                    notas: "string?",
                },
            ],
        },
        {
            route: "/updateAppointment",
            method: "PUT",
            description: "Actualiza una cita existente",
            requestBody: {
                _id: "string",
                // Campos opcionales para actualizar
                fecha: "Date?",
                hora: "string?",
                estado: "string?",
                notas: "string?",
            },
            responseFormat: {
                _id: "string",
                abogadoId: "string",
                clienteId: "string",
                fecha: "Date",
                hora: "string",
                estado: "string",
                notas: "string?",
                updatedAt: "Date",
            },
        },
        {
            route: "/getNoticias",
            method: "GET",
            description: "Obtiene todas las noticias de la base de datos y de la API de noticias",
            queryParameters: {},
            responseFormat: {
                articles: [
                    {
                        title: "string",
                        description: "string",
                        urlToImage: "string",
                        date: "string",
                        url: "string",
                    },
                ],
            },
        },
        {
            route: "/crearNoticia",
            method: "POST",
            description: "Crea una noticia",
            requestBody: {
                news: {
                    title: "string",
                    description: "string",
                    image: "string",
                },
            },
            responseFormat: {
                acknowledged: "boolean",
                insertedId: "string",
            },
        },
    ],
};
exports.default = Routes;
//# sourceMappingURL=Routes.js.map