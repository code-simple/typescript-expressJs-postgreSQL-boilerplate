# TypeScript Express PostgreSQL Backend Boilerplate

This project is a boilerplate setup for building a RESTful API using TypeScript, Express.js, and PostgreSQL, utilizing Sequelize as the ORM. It includes essential features such as JWT-based authentication, request validation, rate limiting for specific routes, and project structuring best practices.

## Table of Contents

- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Documentation](#api-documentation)
- [Folder Structure Breakdown](#folder-structure-breakdown)

## Project Structure

## Setup and Installation

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   pnpm install
   pnpm migrate
   ```

## PM2

Make start.sh executable before using pm2

```bash
chmod +x start.sh
pm2 start ecosystem.config.json
```
