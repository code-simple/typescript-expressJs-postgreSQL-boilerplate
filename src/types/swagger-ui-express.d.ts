declare module "swagger-ui-express" {
  import { RequestHandler } from "express";

  interface SwaggerUiOptions {
    explorer?: boolean;
  }

  function setup(
    swaggerDoc: object,
    options?: SwaggerUiOptions
  ): RequestHandler;
  const serve: RequestHandler;

  export { serve, setup };
}
