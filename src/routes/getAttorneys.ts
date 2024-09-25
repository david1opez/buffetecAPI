import { collection } from '../mongo/mongo';

// TYPES
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

type availableDay = {
    dia: 'lun' | 'mar' | 'mie' | 'jue' | 'vie' | 'sab' | 'dom';
    horasDisponibles: string[];
};

type Attorney = {
    _id: ObjectId;
    uid: string;
    nombre: string;
    descripcion: string;
    horario: string;
    casosEjemplo: string;
    diasDisponibles: availableDay[];
};

export default async function GetAttorneys(req: Request, res: Response) {
    const attorneys: Attorney[] = (
        await collection('abogados').find().toArray()).map(doc => ({
            _id: doc._id,
            uid: doc.uid,
            nombre: doc.nombre,
            descripcion: doc.descripcion,
            horario: doc.horario,
            casosEjemplo: doc.casosEjemplo,
            diasDisponibles: doc.diasDisponibles
        })
    );

    if(!attorneys || attorneys.length === 0) {
        return res.status(404).send('No attorneys found');
    }

    res.status(200).send(attorneys);
}
