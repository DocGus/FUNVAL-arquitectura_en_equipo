
import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import citasRouter from "./routers/citas.router";
import medicoRouter from "./routers/medico.router";
import pacientesRouter from "./routers/pacientesRouter";
import consultorioRouter from "./routers/consultorio.router";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(
  "/api-docs/pacientes",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec),
);
app.use("/api/citas", citasRouter);

app.use("/medicos", medicoRouter);

// Rutas de Pacientes
app.use("/api/pacientes", pacientesRouter);

// Rutas de Consultorios
app.use("/api/consultorios", consultorioRouter);

app.get("/", (_req, res) => {
  res.json({
    mensaje: "API del proyecto de arquitectura modular",
    estado: "funcionando",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});