import { version } from "../../package.json";
import { ENV } from "../config/config";

interface SwaggerDefinition {
  openapi: string;
  info: {
    title: string;
    version: string;
    license: {
      name: string;
      url: string;
    };
  };
  servers: Array<{
    url: string;
  }>;
  components?: {
    securitySchemes: {
      bearerAuth: {
        type: string;
        scheme: string;
        bearerFormat: string;
      };
    };
  };
  security?: Array<{ bearerAuth: [] }>;
}

const swaggerDef: SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Typescript ExpressJs PostgreSQL API documentation",
    version,
    license: {
      name: "MIT",
      url: "https://github.com/code-simple/Typescript-Express-PostgreSQL-Boilerplate/blob/main/LICENSE",
    },
  },
  servers: [
    {
      url: `http://localhost:${ENV.APP.PORT}/api/v1`,
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT", // JSON Web Token format
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

export default swaggerDef;
