# TypeScript Express PostgreSQL Backend Boilerplate

This project is a boilerplate setup for building a RESTful API using TypeScript, Express.js, and PostgreSQL, utilizing Sequelize as the ORM. It includes essential features such as JWT-based authentication, request validation, rate limiting for specific routes, and project structuring best practices.

## Table of Contents

- [Setup and Installation](#setup-and-installation)
- [PM2](#pm2)
- [SWAGGER](#swagger)

## Setup and Installation

1. **Setup and Installation**

   # Setup for EC2

   [Prepare EC2](https://github.com/code-simple/nodejs-on-ec2)

   This will cover all of the following:

   - Node.js
   - npm
   - Git
   - PM2
   - Firewall
   - Nginx
   - SSL

   # Install TypeScript globally

   ```bash
   sudo npm install -g typescript
   tsc -v
   ```

2. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   pnpm install
   pnpm migrate
   ```
3. **PM2**

   Make sure to build before running pm2.

   ```bash
   tsc
   pm2 start ecosystem.config.json
   ```

4. **SWAGGER**

   For swagger visit http://localhost:4000/api/v1/docs , to create swagger just write swagger docs
