import { collection } from '../mongo/mongo';

// TYPES
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

type User = {
    _id: ObjectId;
    uid: string;
    nombre: string;
    genero: string;
    celular: string;
    email: string;
    fechaDeNacimiento: string;
    tipo: 'abogado' | 'cliente' | 'admin';
}

export default async function GetUser(req: Request, res: Response) {
    const { uid } = req.query as { uid: string };

    if(!uid) {
        return res.status(400).send('No user provided');
    }

    const user = await collection('usuarios').findOne({uid});
    res.status(200).send(user);
}
