import type { Request, Response, NextFunction } from 'express';
export const validarConsultorio = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const body: unknown = req.body;
    if (
        typeof body !== 'object' ||
        body === null ||
        Array.isArray(body)
    ) {
        res.status(400).json({
            mensaje: 'El cuerpo debe ser un objeto válido.',
        });
        return;
    }
    const datos = body as Record<string, unknown>;
    const { numeroSala, piso, activo, tipoAtencion } = datos;
    if (
        typeof numeroSala !== 'number' ||
        !Number.isInteger(numeroSala) ||
        numeroSala <= 0
    ) {
        res.status(400).json({
            mensaje: 'numeroSala debe ser un entero positivo.',
        });
        return;
    }
    if (
        typeof piso !== 'number' ||
        !Number.isInteger(piso) ||
        piso <= 0
    ) {
        res.status(400).json({
            mensaje: 'piso debe ser un entero positivo.',
        });
        return;
    }
    if (typeof activo !== 'boolean') {
        res.status(400).json({
            mensaje: 'activo debe ser true o false.',
        });
        return;
    }
    if (
        typeof tipoAtencion !== 'string' ||
        tipoAtencion.trim().length === 0
    ) {
        res.status(400).json({
            mensaje: 'tipoAtencion no puede estar vacío.',
        });
        return;
    }
    next();
};