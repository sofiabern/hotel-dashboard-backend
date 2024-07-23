import path from 'node:path';

export const ENV_VARS = {
    PORT: "PORT",
    MONGODB_USER: "MONGODB_USER",
    MONGODB_PASSWORD: "MONGODB_PASSWORD",
    MONGODB_URL: "MONGODB_URL",
    MONGODB_DB: "MONGODB_DB",
    JWT_SECRET: "JWT_SECRET"
};

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');
