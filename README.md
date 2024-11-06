Experimenting Association

# TypeScript Express PostgreSQL Backend Boilerplate

This project is a boilerplate setup for building a RESTful API using TypeScript, Express.js, and PostgreSQL, utilizing Sequelize as the ORM. It includes essential features such as JWT-based authentication, request validation, rate limiting for specific routes, and project structuring best practices.

## Table of Contents

- [Setup and Installation](#setup-and-installation)
- [PM2](#pm2)
- [SWAGGER](#swagger)

## Setup and Installation

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   pnpm install
   pnpm migrate
   ```
2. **Prepare TS environment**

   # Update packages

   ```bash
   sudo apt update -y
   sudo apt upgrade -y
   ```

   # Install Node.js (this will also install npm)

   ```bash
   curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt install -y nodejs
   ```

   # Install TypeScript globally

   ```bash
   sudo npm install -g typescript
   tsc -v
   ```

## PM2

Make sure to build before running pm2.

```bash
tsc
pm2 start ecosystem.config.json
```

## SWAGGER

For swagger visit http://localhost:4000/api/v1/docs , to create swagger just write swagger docs
