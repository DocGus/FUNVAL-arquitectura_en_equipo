
import express from "express";
import pacientesRouter from "./routers/pacientesRouter";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    mensaje: "API del proyecto de arquitectura modular",
    estado: "funcionando",
  });
});

app.use("/api/pacientes", pacientesRouter);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
