
import express from "express";
import swaggerUi from "swagger-ui-express";

import citasRouter from "./routers/citas.router";
import { swaggerDocument } from "./docs/swagger";

import { swaggerSpec } from "./swagger";
import medicoRouter from "./routers/medico.router";
import pacientesRouter from "./routers/pacientesRouter";
import consultorioRouter from "./routers/consultorio.router";

const app = express();
const PORT = 3000;

app.use(express.json());

// Swagger de citas
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Swagger de pacientes
app.use(
  "/api-docs/pacientes",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec),
);

// Rutas de la API
app.use("/api/citas", citasRouter);
app.use("/medicos", medicoRouter);
app.use("/api/pacientes", pacientesRouter);
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

