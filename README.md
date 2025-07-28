# Cjm Monorepo

This project is a monorepo containing a Next.js web application and a Nest.js API.

## Project Structure

The project is structured as a pnpm workspace. The applications are located in the `apps` directory:

-   `apps/web`: The Next.js frontend application.
-   `apps/api`: The Nest.js backend application.

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later)
-   [pnpm](https://pnpm.io/)

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Install the dependencies from the root of the project:
    ```bash
    pnpm install
    ```

## Running the Development Servers

You can run both the web and api servers concurrently from the root of the project.

### Running the Web App (Next.js)

To start the Next.js development server, run the following command from the root of the project:

```bash
pnpm --filter web dev
```

The web application will be available at [http://localhost:3000](http://localhost:3000).

### Running the API (Nest.js)

To start the Nest.js development server, run the following command from the root of the project:

```bash
pnpm --filter api start:dev
```

The API will be available at [http://localhost:3001](http://localhost:3001).

## Running with Docker

You can also run the development environment using Docker Compose.

### Prerequisites

-   [Docker](https://www.docker.com/)
-   [Docker Compose](https://docs.docker.com/compose/)

### Running the Application

1.  Build and start the containers:
    ```bash
    docker compose up --build
    ```
2.  The web application will be available at [http://localhost:3000](http://localhost:3000) and the API will be available at [http://localhost:3001](http://localhost:3001).

### Included Services

The Docker Compose setup includes the following services:

-   **web**: The Next.js frontend application, available at [http://localhost:3000](http://localhost:3000).
-   **api**: The Nest.js backend application, available at [http://localhost:3001](http://localhost:3001).
-   **redis**: A Redis instance, available at `redis:6379` from within the Docker network.
-   **Supabase**: A local Supabase stack, including:
    -   **Supabase Studio**: A web interface for managing your Supabase project, available at [http://localhost:8080](http://localhost:8080).
    -   **PostgreSQL Database**: The database for your project, available at `db:5432` from within the Docker network.
    -   **Kong API Gateway**: The API gateway for Supabase, available at [http://localhost:8000](http://localhost:8000).
    -   **And other Supabase services...**

Default credentials and keys for Supabase are located in the `.env` file.
