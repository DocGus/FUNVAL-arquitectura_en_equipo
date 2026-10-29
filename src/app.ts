
import express from "express";
import swaggerUi from "swagger-ui-express";
import citasRouter from "./routers/citas.router";
import { swaggerDocument } from "./docs/swagger";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/citas", citasRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (_req, res) => {
  res.json({
    mensaje: "API del proyecto de arquitectura modular",
    estado: "funcionando"
  });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
