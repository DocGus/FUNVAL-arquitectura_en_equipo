export const swaggerDocument = {
  openapi: "3.0.3",
  info: {
    title: "API de citas médicas",
    version: "1.0.0",
    description: "Documentación del módulo de citas médicas."
  },
  servers: [{ url: "http://localhost:3000" }],
  tags: [{ name: "Citas", description: "Gestión de citas médicas" }],
  paths: {
    "/api/citas": {
      get: {
        tags: ["Citas"],
        summary: "Lista las citas médicas",
        parameters: [
          {
            name: "estado",
            in: "query",
            schema: { type: "string", enum: ["pendiente", "atendido"] }
          },
          {
            name: "pacienteId",
            in: "query",
            schema: { type: "integer", minimum: 1 }
          },
          {
            name: "medicoId",
            in: "query",
            schema: { type: "integer", minimum: 1 }
          }
        ],
        responses: {
          "200": {
            description: "Lista de citas",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/CitaMedica" }
                }
              }
            }
          },
          "400": { $ref: "#/components/responses/Error400" }
        }
      },
      post: {
        tags: ["Citas"],
        summary: "Crea una cita médica",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CrearCitaInput" }
            }
          }
        },
        responses: {
          "201": {
            description: "Cita creada",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CitaMedica" }
              }
            }
          },
          "400": { $ref: "#/components/responses/Error400" }
        }
      }
    },
    "/api/citas/{id}": {
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "integer", minimum: 1 }
        }
      ],
      get: {
        tags: ["Citas"],
        summary: "Obtiene una cita por ID",
        responses: {
          "200": {
            description: "Cita encontrada",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CitaMedica" }
              }
            }
          },
          "404": { $ref: "#/components/responses/Error404" }
        }
      },
      put: {
        tags: ["Citas"],
        summary: "Actualiza una cita",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ActualizarCitaInput" }
            }
          }
        },
        responses: {
          "200": {
            description: "Cita actualizada",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CitaMedica" }
              }
            }
          },
          "400": { $ref: "#/components/responses/Error400" },
          "404": { $ref: "#/components/responses/Error404" }
        }
      },
      delete: {
        tags: ["Citas"],
        summary: "Elimina una cita",
        responses: {
          "204": { description: "Cita eliminada" },
          "404": { $ref: "#/components/responses/Error404" }
        }
      }
    }
  },
  components: {
    schemas: {
      CitaMedica: {
        type: "object",
        required: ["id", "pacienteId", "medicoId", "fechaHora", "estado"],
        properties: {
          id: { type: "integer", example: 1 },
          pacienteId: { type: "integer", example: 101 },
          medicoId: { type: "integer", example: 201 },
          fechaHora: {
            type: "string",
            format: "date-time",
            example: "2026-11-02T08:00:00.000Z"
          },
          estado: { type: "string", enum: ["pendiente", "atendido"] }
        }
      },
      CrearCitaInput: {
        type: "object",
        required: ["pacienteId", "medicoId", "fechaHora"],
        properties: {
          pacienteId: { type: "integer", minimum: 1 },
          medicoId: { type: "integer", minimum: 1 },
          fechaHora: { type: "string", format: "date-time" },
          estado: { type: "string", enum: ["pendiente", "atendido"] }
        }
      },
      ActualizarCitaInput: {
        allOf: [{ $ref: "#/components/schemas/CrearCitaInput" }]
      },
      Error: {
        type: "object",
        properties: { error: { type: "string", example: "Cita médica no encontrada" } }
      }
    },
    responses: {
      Error400: {
        description: "Datos de entrada inválidos",
        content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } }
      },
      Error404: {
        description: "Cita no encontrada",
        content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } }
      }
    }
  }
};
