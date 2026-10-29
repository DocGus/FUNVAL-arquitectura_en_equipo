
import { Router } from "express";
import {
  listarPacientes,
  obtenerPacientePorId,
  crearPaciente,
  actualizarPaciente,
  eliminarPaciente,
} from "../controllers/pacientesController";
import { validarPaciente } from "../middlewares/validarPaciente";

const router = Router();

router.get("/", listarPacientes);
router.get("/:id", obtenerPacientePorId);
router.post("/", validarPaciente, crearPaciente);
router.put("/:id", validarPaciente, actualizarPaciente);
router.delete("/:id", eliminarPaciente);

export default router;

