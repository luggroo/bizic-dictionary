import { Router, type IRouter } from "express";
import healthRouter from "./health";
import languagesRouter from "./languages";
import dialectsRouter from "./dialects";
import entriesRouter from "./entries";

const router: IRouter = Router();

router.use(healthRouter);
router.use(languagesRouter);
router.use(dialectsRouter);
router.use(entriesRouter);

export default router;
