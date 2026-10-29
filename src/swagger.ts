
import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de pacientes",
      version: "1.0.0",
      description:
        "Documentación de los endpoints del módulo de pacientes.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
    ],
    tags: [
      {
        name: "Pacientes",
        description: "Operaciones para gestionar pacientes",
      },
    ],
    components: {
      schemas: {
        Paciente: {
          type: "object",
          required: ["id", "dni", "nombre", "edad", "telefono", "obraSocial"],
          properties: {
            id: { type: "integer", example: 1 },
            dni: { type: "string", example: "12345678" },
            nombre: { type: "string", example: "Ana López" },
            edad: { type: "integer", minimum: 0, example: 28 },
            telefono: { type: "string", example: "5512345678" },
            obraSocial: { type: "boolean", example: true },
          },
        },
        PacienteInput: {
          type: "object",
          required: ["dni", "nombre", "edad", "telefono", "obraSocial"],
          properties: {
            dni: { type: "string", example: "12345678" },
            nombre: { type: "string", example: "Ana López" },
            edad: { type: "integer", minimum: 0, example: 28 },
            telefono: { type: "string", example: "5512345678" },
            obraSocial: { type: "boolean", example: true },
          },
        },
        Mensaje: {
          type: "object",
          required: ["mensaje"],
          properties: {
            mensaje: { type: "string", example: "Paciente no encontrado." },
          },
        },
        ErroresValidacion: {
          type: "object",
          required: ["errores"],
          properties: {
            errores: {
              type: "array",
              items: { type: "string" },
              example: ["El DNI es obligatorio y debe ser texto."],
            },
          },
        },
        PacienteGuardado: {
          type: "object",
          required: ["mensaje", "paciente"],
          properties: {
            mensaje: { type: "string" },
            paciente: { $ref: "#/components/schemas/Paciente" },
          },
        },
      },
    },
  },
  apis: ["./src/routers/pacientesRouter.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
