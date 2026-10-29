
import express from "express";
import pacientesRouter from "./routers/pacientesRouter";
import consultorioRouter from "./routers/consultorio.router";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    mensaje: "API del proyecto de arquitectura modular",
    estado: "funcionando",
  });
});

// Rutas de Pacientes
app.use("/api/pacientes", pacientesRouter);

// Rutas de Consultorios
app.use("/api/consultorios", consultorioRouter);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
