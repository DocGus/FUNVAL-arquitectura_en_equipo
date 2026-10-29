"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const citas_router_1 = __importDefault(require("./routers/citas.router"));
const swagger_1 = require("./docs/swagger");
const swagger_2 = require("./swagger");
const medico_router_1 = __importDefault(require("./routers/medico.router"));
const pacientesRouter_1 = __importDefault(require("./routers/pacientesRouter"));
const consultorio_router_1 = __importDefault(require("./routers/consultorio.router"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
// Swagger de citas
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerDocument));
// Swagger de pacientes
app.use("/api-docs/pacientes", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_2.swaggerSpec));
// Rutas de la API
app.use("/api/citas", citas_router_1.default);
app.use("/medicos", medico_router_1.default);
app.use("/api/pacientes", pacientesRouter_1.default);
app.use("/api/consultorios", consultorio_router_1.default);
app.get("/", (_req, res) => {
    res.json({
        mensaje: "API del proyecto de arquitectura modular",
        estado: "funcionando",
    });
});
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map