import { Router } from "express";
import {
  listarMedicos,
  buscarMedico,
  registrarMedico,
  modificarMedico,
  borrarMedico
} from "../controllers/medico.controller";
import { validarMedico } from "../middlewares/medico.middleware";

const router = Router();

router.get("/", listarMedicos);
router.get("/:id", buscarMedico);
router.post("/", validarMedico, registrarMedico);
router.put("/:id", validarMedico, modificarMedico);
router.delete("/:id", borrarMedico);

export default router;