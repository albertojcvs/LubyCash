import { Router } from "express";

import { ClientsController } from "../../controllers/clients";
import { PrismaAccountReposiory } from "../../repositories/implementations/prismaImplementations/PrismaAccountRepository";
import { PrismaClientRepository } from "../../repositories/implementations/prismaImplementations/PrismaClientRepository";
import { PrismaTransactionRepository } from "../../repositories/implementations/prismaImplementations/PrismaTransactionRepository";

const clientRespository = new PrismaClientRepository();

const accountRepository = new PrismaAccountReposiory();
const transactionRepository = new PrismaTransactionRepository();

const clientsController = new ClientsController(
  clientRespository,
  accountRepository,
  transactionRepository
);
const clientsRoutes = Router();

clientsRoutes.get("/clients", (request,response) => clientsController.getAll(request,response));
clientsRoutes.get("/clients/:email", (request,response) => clientsController.getByEmail(request,response));

export default clientsRoutes;
