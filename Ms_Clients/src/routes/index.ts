import { Router } from "express";
import clientsRoutes from "./clients";

const routes = Router()

routes.use(clientsRoutes)


export default routes