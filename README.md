# New Document![TypeScript](https://img.shields.io/badge/TypeScript-000?style=plastic&logo=typescript&logoColor=white&labelColor=000&color=000)

![Express.js](https://img.shields.io/badge/Express.js-efff4b?style=plastic&logo=express&logoColor=black&labelColor=efff4b)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=plastic&logo=postgresql&logoColor=white&labelColor=316192)
![Sequelize](https://img.shields.io/badge/Sequelize-1b469c?style=plastic&logo=sequelize&logoColor=white&labelColor=1b469c)
![JWT](https://img.shields.io/badge/JWT-000000?style=plastic&logo=JSON%20web%20tokens&logoColor=pink&labelColor=000000)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=plastic&logo=swagger&logoColor=black&labelColor=85EA2D)

# TypeScript Express PostgreSQL Boilerplate

This project is a boilerplate setup for building a RESTful API using TypeScript, Express.js, and PostgreSQL, utilizing Sequelize as the ORM. It includes essential features such as JWT-based authentication, request validation, rate limiting for specific routes, and project structuring best practices.

## Table of Contents

- [Setup and Installation](#setup-and-installation)
  - [Setup for EC2](#setup-for-ec2)
  - [Install TypeScript globally](#install-typescript-globally)
  - [Clone the Repository](#clone-the-repository)
- [PM2](#pm2)
- [Swagger](#swagger)
- [LOGGING](#logging)

1. ## Setup and Installation

   ### Setup for EC2

   [Prepare EC2](https://github.com/code-simple/nodejs-on-ec2)

   This will cover all of the following:

   - Node.js
   - npm
   - Git
   - PM2
   - Firewall
   - Nginx
   - SSL

   #### Install TypeScript globally

   ```bash
   sudo npm install -g typescript
   tsc -v
   ```

2. #### Clone the Repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   pnpm install
   pnpm migrate
   ```
3. #### PM2

   Make sure to build before running pm2.

   ```bash
   tsc
   pm2 start ecosystem.config.json
   ```

4. #### SWAGGER

   For swagger visit `/v1/docs` , to create swagger just write swagger docs.
   Its set to check for jsDocs inside /routes/\* , So any route having jsDocs will be added to swagger

5. #### LOGGING

   - Enhanced Logging using Morgan & Winston
   - Retaining logs of errors in /logs directory for 14 days or 100MB. [Can be adjusted]
   - Logs are created per each day , e.g `07-Nov-2024.log` makes it easier to track.

6. #### LINTING

   - Linting: with ESLint
   - Git hooks: with husky and lint-staged

7. #### EMAIL SERVICE

   - Nodemailer configured
   - EJS a powerful tool to use email templates.
     Note : use `<%= variable %>` inside template to replace Dynamic fields. E.g you want to greet new regisration just replace dummy email with `<%= email %>` in template

8. #### FILE UPLOADS TO AMAZON S3

   - Users can upload various file types (images, videos, or documents) to **Amazon S3** for secure and scalable storage.
   - The app ensures high availability, reliability, and cost-effective storage solutions for all uploaded files.

9. #### API VERSIONING

   - The API supports **versioning** to maintain backward compatibility across releases.
   - Currently, the API uses the `/v1` prefix for version 1 of the routes (e.g., `/v1/users`, `/v1/auth/login`).
   - Versioning ensures smooth updates without breaking existing functionality for users on older API versions.

10. #### PRECISE ERROR HANDLING

    - The app has a **global error handler** that handles both operational and uncaught errors.
    - **Operational Errors**: User-related issues (e.g., bad input, unauthorized access) are handled with clear error messages and appropriate HTTP status codes.
    - **Uncaught Errors**: Unhandled exceptions and rejections are caught to prevent the app from crashing. Errors are returned in a structured format for easy debugging.

11. #### ROLE-BASED ACCESS CONTROL (RBAC)

- **RBAC** is implemented to manage permissions based on user roles (e.g., **admin**, **user**, **moderator**).
- Each route and resource is protected based on the user's assigned role, ensuring secure access control to sensitive actions and data.
