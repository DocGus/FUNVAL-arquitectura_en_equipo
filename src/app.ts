
import express from "express";
import medicoRouter from "./routers/medico.router";
import pacientesRouter from "./routers/pacientesRouter";
import consultorioRouter from "./routers/consultorio.router";

const app = express();
const PORT = 3000;

app.use(express.json());

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