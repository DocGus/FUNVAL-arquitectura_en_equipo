import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: "API Medicos",
        description: "Documentación del módulo de médicos",
        version: "1.0.0",
    },
    host: "localhost:3000",
    schemes: ["http"],
  securityDefinitions: {
    ApiKeyAuth: {
      type: "apiKey",
      in: "header",
      name: "x-api-key",
      description: "Clave de acceso a la API",
    },
  },
};

const outputFile = "./swagger-medicos-output.json";
const routes = ["./src/routers/medico.router.ts"];

swaggerAutogen()(outputFile, routes, doc);