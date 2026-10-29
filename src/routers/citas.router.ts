import { Router } from "express";
import {
  actualizarCita,
  crearCita,
  eliminarCita,
  listarCitas,
  obtenerCita
} from "../controllers/citas.controller";

const citasRouter = Router();

citasRouter.get("/", listarCitas);
citasRouter.get("/:id", obtenerCita);
citasRouter.post("/", crearCita);
citasRouter.put("/:id", actualizarCita);
citasRouter.delete("/:id", eliminarCita);

export default citasRouter;
