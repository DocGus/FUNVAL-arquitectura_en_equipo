import type { Request, Response } from 'express';
import { consultorios } from '../data/consultorio.data';
import type {
    Consultorio,
    NuevoConsultorio,
} from '../interfaces/consultorio.interface';
export const listarConsultorios = (
    _req: Request,
    res: Response
): void => {
    res.status(200).json(consultorios);
};
export const buscarConsultorioPorId = (
    req: Request,
    res: Response
): void => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({ mensaje: 'ID inválido.' });
        return;
    }
    const consultorio = consultorios.find((c) => c.id === id);
    if (!consultorio) {
        res.status(404).json({
            mensaje: 'Consultorio no encontrado.',
        });
        return;
    }
    res.status(200).json(consultorio);
};
export const crearConsultorio = (
    req: Request,
    res: Response
): void => {
    const datos = req.body as NuevoConsultorio;
    const nuevoId =
        consultorios.length > 0
            ? Math.max(...consultorios.map((c) => c.id)) + 1
            : 1;
    const nuevoConsultorio: Consultorio = {
        id: nuevoId,
        numeroSala: datos.numeroSala,
        piso: datos.piso,
        activo: datos.activo,
        tipoAtencion: datos.tipoAtencion.trim(),
    };
    consultorios.push(nuevoConsultorio);
    res.status(201).json({
        mensaje: 'Consultorio creado correctamente.',
        consultorio: nuevoConsultorio,
    });
};
export const actualizarConsultorio = (
    req: Request,
    res: Response
): void => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({ mensaje: 'ID inválido.' });
        return;
    }
    const indice = consultorios.findIndex((c) => c.id === id);
    if (indice === -1) {
        res.status(404).json({
            mensaje: 'Consultorio no encontrado.',
        });
        return;
    }
    const datos = req.body as NuevoConsultorio;
    const consultorioActualizado: Consultorio = {
        id,
        numeroSala: datos.numeroSala,
        piso: datos.piso,
        activo: datos.activo,
        tipoAtencion: datos.tipoAtencion.trim(),
    };
    consultorios[indice] = consultorioActualizado;
    res.status(200).json({
        mensaje: 'Consultorio actualizado correctamente.',
        consultorio: consultorioActualizado,
    });
};
export const eliminarConsultorio = (
    req: Request,
    res: Response
): void => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({ mensaje: 'ID inválido.' });
        return;
    }
    const indice = consultorios.findIndex((c) => c.id === id);
    if (indice === -1) {
        res.status(404).json({
            mensaje: 'Consultorio no encontrado.',
        });
        return;
    }
    const eliminado = consultorios.splice(indice, 1)[0];
    res.status(200).json({
        mensaje: 'Consultorio eliminado correctamente.',
        consultorio: eliminado,
    });
};