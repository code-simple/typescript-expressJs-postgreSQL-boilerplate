import express, { Request, Response, Router } from "express";
import swaggerJsdoc, { Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerDefinition from "../../docs/swaggerDef";

const router: Router = express.Router();

const options: Options = {
  definition: swaggerDefinition,
  apis: ["src/docs/*.yml", "src/routes/v1/*.ts"], // Use .ts for TypeScript routes
};

const specs = swaggerJsdoc(options);

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(specs, { explorer: true }));

export default router;
