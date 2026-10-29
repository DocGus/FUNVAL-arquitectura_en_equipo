
import express from "express";
import medicoRouter from "./routers/medico.router";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/medicos", medicoRouter);

app.get("/", (_req, res) => {
  res.json({
    mensaje: "API del proyecto de arquitectura modular",
    estado: "funcionando"
  });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
