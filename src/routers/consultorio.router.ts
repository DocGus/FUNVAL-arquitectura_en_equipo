import { Router } from 'express';
import {
    listarConsultorios,
    buscarConsultorioPorId,
    crearConsultorio,
    actualizarConsultorio,
    eliminarConsultorio,
} from '../controllers/consultorio.controller';
import { validarConsultorio } from '../middlewares/consultorio.middleware';
const router = Router();
router.get('/', listarConsultorios);
router.get('/:id', buscarConsultorioPorId);
router.post('/', validarConsultorio, crearConsultorio);
router.put('/:id', validarConsultorio, actualizarConsultorio);
router.delete('/:id', eliminarConsultorio);
export default router;