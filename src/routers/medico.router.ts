import { Router, Request, Response, NextFunction } from "express";
import {
  listarMedicos,
  buscarMedico,
  registrarMedico,
  modificarMedico,
  borrarMedico
} from "../controllers/medico.controller";
import { validarMedico } from "../middlewares/medico.middleware";

const router = Router();

function apiKeyValidator(
  req: Request,
  res: Response,
  next: NextFunction
): void {
const apiKey = req.headers["x-api-key"];

if (!apiKey || apiKey !== "Medico-2026-10") {
  res.status(401).json({
  ok: false,
  mensaje: "ACCESO NO AUTORIZADO!!!",
});
return;
}
  next();
}

router.use(apiKeyValidator);

router.get("/", listarMedicos);
router.get("/:id", buscarMedico);
router.post("/", validarMedico, registrarMedico);
router.put("/:id", validarMedico, modificarMedico);
router.delete("/:id", borrarMedico);

export default router;