import { Request, Response } from "express";
import {
  obtenerMedicos,
  obtenerMedicoPorId,
  crearMedico,
  actualizarMedico,
  eliminarMedico
} from "../data/medico.data";
import { NuevoMedico } from "../interfaces/medico.interface";

export const listarMedicos = (_req: Request, res: Response): void => {
/*
  #swagger.tags = ['Médicos']
  #swagger.description = 'Endpoint para obtener la lista de todos los médicos registrados'
  #swagger.security = [{
    "ApiKeyAuth": []
  }]
*/
  res.json(obtenerMedicos());
};

export const buscarMedico = (req: Request, res: Response): void => {
  /*
  #swagger.tags = ['Médicos']
  #swagger.description = 'Endpoint para buscar un médico por su ID'
  #swagger.parameters['id'] = {
    description: 'Identificador único del médico',
    type: 'number',
    required: true,
    example: 1
  }
  #swagger.security = [{
    "ApiKeyAuth": []
  }]
  */
  const id = Number(req.params.id);
  const medico = obtenerMedicoPorId(id);

  if (medico === undefined) {
    res.status(404).json({
      mensaje: "Médico no encontrado"
    });
    return;
  }

  res.json(medico);
};

export const registrarMedico = (req: Request, res: Response): void => {
  /*
    #swagger.tags = ['Médicos']
    #swagger.description = 'Endpoint para registrar un nuevo médico'
    #swagger.security = [{
      "ApiKeyAuth": []
    }]
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Datos del médico que se desea registrar',
      required: true,
      schema: {
        matricula: 'MED-001',
        nombreCompleto: 'Juan Pérez',
        especialidad: 'Cardiología',
        aniosExperiencia: 10
      }
    }
  */
  const datos: NuevoMedico = req.body;
  const nuevoMedico = crearMedico(datos);

  res.status(201).json(nuevoMedico);
};

export const modificarMedico = (req: Request, res: Response): void => {
   /*
    #swagger.tags = ['Médicos']
    #swagger.description = 'Endpoint para modificar los datos de un médico'
    #swagger.parameters['id'] = {
      description: 'Identificador único del médico que se desea modificar',
      type: 'number',
      required: true,
      example: 1
    }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Nuevos datos del médico',
      required: true,
      schema: {
        matricula: 'MED-001',
        nombreCompleto: 'Juan Pérez',
        especialidad: 'Neurología',
        aniosExperiencia: 12
      }
    }
    #swagger.security = [{
      "ApiKeyAuth": []
    }]
  */
  const id = Number(req.params.id);
  const datos: NuevoMedico = req.body;
  const medicoActualizado = actualizarMedico(id, datos);

  if (medicoActualizado === undefined) {
    res.status(404).json({
      mensaje: "Médico no encontrado"
    });
    return;
  }

  res.json(medicoActualizado);
};

export const borrarMedico = (req: Request, res: Response): void => {
  /*
    #swagger.tags = ['Médicos']
    #swagger.description = 'Endpoint para eliminar un médico por su ID'
    #swagger.parameters['id'] = {
      description: 'Identificador único del médico que se desea eliminar',
      type: 'number',
      required: true,
      example: 1
    }
    #swagger.security = [{
      "ApiKeyAuth": []
    }]
  */
  const id = Number(req.params.id);
  const eliminado = eliminarMedico(id);

  if (!eliminado) {
    res.status(404).json({
      mensaje: "Médico no encontrado"
    });
    return;
  }

  res.json({
    mensaje: "Médico eliminado correctamente"
  });
};