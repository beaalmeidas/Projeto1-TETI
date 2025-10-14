import { Router } from "express";
import helloRoute from "./hello.route"

const router = Router();

router.use("/hello", helloRoute);

export default router;