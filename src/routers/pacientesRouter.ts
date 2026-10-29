
import { Router } from "express";
import {
  listarPacientes,
  obtenerPacientePorId,
  crearPaciente,
  actualizarPaciente,
  eliminarPaciente,
} from "../controllers/pacientesController";
import { validarPaciente } from "../middlewares/validarPaciente";

const router = Router();

/**
 * @swagger
 * /api/pacientes:
 *   get:
 *     summary: Listar pacientes
 *     tags: [Pacientes]
 *     responses:
 *       200:
 *         description: Lista de pacientes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Paciente'
 */
router.get("/", listarPacientes);

/**
 * @swagger
 * /api/pacientes/{id}:
 *   get:
 *     summary: Obtener un paciente por ID
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del paciente.
 *     responses:
 *       200:
 *         description: Paciente encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       404:
 *         description: Paciente no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensaje'
 */
router.get("/:id", obtenerPacientePorId);

/**
 * @swagger
 * /api/pacientes:
 *   post:
 *     summary: Crear un paciente
 *     tags: [Pacientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PacienteInput'
 *     responses:
 *       201:
 *         description: Paciente creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PacienteGuardado'
 *       400:
 *         description: Datos del paciente inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroresValidacion'
 *       409:
 *         description: Ya existe un paciente con ese DNI.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensaje'
 */
router.post("/", validarPaciente, crearPaciente);

/**
 * @swagger
 * /api/pacientes/{id}:
 *   put:
 *     summary: Actualizar un paciente
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del paciente.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PacienteInput'
 *     responses:
 *       200:
 *         description: Paciente actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PacienteGuardado'
 *       400:
 *         description: Datos del paciente inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroresValidacion'
 *       404:
 *         description: Paciente no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensaje'
 *       409:
 *         description: Otro paciente ya utiliza ese DNI.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensaje'
 */
router.put("/:id", validarPaciente, actualizarPaciente);

/**
 * @swagger
 * /api/pacientes/{id}:
 *   delete:
 *     summary: Eliminar un paciente
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del paciente.
 *     responses:
 *       200:
 *         description: Paciente eliminado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensaje'
 *       404:
 *         description: Paciente no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensaje'
 */
router.delete("/:id", eliminarPaciente);

export default router;
