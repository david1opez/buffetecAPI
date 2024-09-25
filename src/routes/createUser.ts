import { collection } from '../mongo/mongo';

// TYPES
import { Request, Response } from 'express';

type User = {
    uid: string;
    nombre: string;
    genero: string;
    celular: string;
    email: string;
    fechaDeNacimiento: string;
    tipo: 'abogado' | 'cliente' | 'admin';
}

export default async function CreateUser(req: Request, res: Response) {
    const {user}: {user: User} = req.body;

    if(!user) {
        return res.status(400).send('No user provided');
    } else if (!user.uid || !user.nombre || !user.genero || !user.celular || !user.email || !user.fechaDeNacimiento || !user.tipo) {
        return res.status(400).send('Missing user fields');
    } else if (user.tipo !== 'abogado' && user.tipo !== 'cliente' && user.tipo !== 'admin') {
        return res.status(400).send('Invalid user type');
    }

    const result = await collection('usuarios').insertOne(user);
    res.status(200).send(result);
}
