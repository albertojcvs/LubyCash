import { Router } from "express";

import { ClientsController } from "../../controllers/clients";
import { PrismaClientRepository } from "../../repositories/implementations/prismaImplementations/PrismaClientRepository";
import { PrismaTransactionRepository } from "../../repositories/implementations/prismaImplementations/PrismaTransactionRepository";

const clientRepository = new PrismaClientRepository();

const transactionRepository = new PrismaTransactionRepository();

const clientsController = new ClientsController(
  clientRepository,
  transactionRepository
);
const clientsRoutes = Router();

clientsRoutes.get("/clients", async (request, response) =>
  await clientsController.getAll(request, response)
);

export default clientsRoutes;
