<img
style="border-radius: 2%"
 src="cover.png" alt="Train Station Ticket Reservation API" align="center" />

## Train Station Ticket Reservation API

Welcome to the Train Station Ticket Reservation API repository! This project provides a modern and efficient solution for booking train tickets at stations. The API is built using Node.js Express, with TypeScript, Zod, Prisma, MySQL, and Passport.js.

## Table of Contents

1. [Setup Instructions](#setup-instructions)
2. [Available Endpoints](#available-endpoints)
3. [Running the Project](#running-the-project)
4. [Security Considerations](#security-considerations)
5. [Model Routes](#model-routes)
6. [Links](#links)

## Setup Instructions

1. **Clone the Repository**: 
    
 ```bash
git clone https://github.com/redaezziani/train-station-ticket-reservation-api.git
cd train-station-ticket-reservation-api
```

2. **Install Dependencies**:

```bash
npm install
```

3. **Set Environment Variables**:

    Create a `.env` file in the root directory and add the following environment variables:

```bash
# Rename this file to .env and fill in the values for your environment

# PostgreSQL Database URL
DATABASE_URL="postgresql://your_username:your_password@your_host/your_database?sslmode=require"

# Secret key for JWT token
JWT_SECRET="your_jwt_secret_key"

# JWT token expiration time
JWT_EXPIRES_IN="1d"

# Google OAuth2 Client ID
GOOGLE_CLIENT_ID="your_google_client_id"

# Google OAuth2 Client Secret
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# API key for resending service
RESEND_API_KEY="your_resend_api_key"

# Secret key for session
SESSION_SECRET="your_session_secret_key"

# Base URL of your application
HOST_URL="http://your_host:your_port"

# Port for your application
PORT=your_port

```

4. **Run Migrations**:

    Run the Prisma migrations to create the database schema:

```bash
npx prisma migrate dev
```
5. **Run generate**:

    Run the Prisma generate to generate the client:

```bash
npx prisma generate
```

6. **Seed the Database**:

    Seed the database with initial data:

```bash
npx prisma db seed
```

7. **Start the Server**:

    Start the development server:

```bash
npm run dev
```
The API provides the following endpoints:
## Available Endpoints

-you can visit the API documentation at `http://localhost:3000/api-docs` to see the available endpoints and their descriptions.

<img
style="border-radius: 2%"
 src="api-docs.png" alt="Train Station Ticket Reservation API" align="center" />


- **Authentication Routes**:
- `/auth/register`: Register a new user.
- `/auth/login`: Login with existing credentials.
- `/auth/forgot-password`: Request a password reset.
- `/auth/reset-password`: Reset password with a token.

- **Line Routes**:
- `/line/lines`: Get all train lines.
- `/line/:id`: Get details of a specific train line.
- `/line`: Create a new train line (Admin only).
- `/line/:id`: Update details of a train line (Admin only).
- `/line/:id`: Delete a train line (Admin only).

- **Car Routes**:
- `/car/cars`: Get all train cars.
- `/car/:id`: Get details of a specific train car.
- `/car`: Create a new train car (Admin only).
- `/car/:id`: Update details of a train car (Admin only).
- `/car/:id`: Delete a train car (Admin only).



## Running the Project

To run the project, follow the setup instructions above. After starting the server, you can access the API at `http://localhost:3000`.

## Security Considerations

The API uses JWT tokens for authentication and authorization. Make sure to keep the `JWT_SECRET` environment variable secure. The API also includes rate limiting to prevent abuse.

## Model Routes

The API provides the following routes for each model:

- **User**:
- `/user/users`: Get all users.
- `/user/:id`: Get details of a specific user.
- `/user`: Create a new user (Admin only).
- `/user/:id`: Update details of a user (Admin only).
- `/user/:id`: Delete a user (Admin only).

- **Ticket**:
- `/ticket/tickets`: Get all tickets.
- `/ticket/:id`: Get details of a specific ticket.
- `/ticket`: Create a new ticket.
- `/ticket/:id`: Update details of a ticket.
- `/ticket/:id`: Delete a ticket.

- **Reservation**:
- `/reservation/reservations`: Get all reservations.
- `/reservation/:id`: Get details of a specific reservation.
- `/reservation`: Create a new reservation.
- `/reservation/:id`: Update details of a reservation.
- `/reservation/:id`: Delete a reservation.

- **Station**:
- `/station/stations`: Get all stations.
- `/station/:id`: Get details of a specific station.
- `/station`: Create a new station (Admin only).
- `/station/:id`: Update details of a station (Admin only).
- `/station/:id`: Delete a station (Admin only).

- **Train**:
- `/train/trains`: Get all trains.
- `/train/:id`: Get details of a specific train.
- `/train`: Create a new train (Admin only).
- `/train/:id`: Update details of a train (Admin only).
- `/train/:id`: Delete a train (Admin only).
-and more...

## Links

- **API Documentation**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- **Google OAuth2 Console**: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)
- **Prisma Documentation**: [https://www.prisma.io/docs](https://www.prisma.io/docs)
- **Zod Documentation**: [https://zod.dev](https://zod.dev/docs)
- **Passport.js Documentation**: [http://www.passportjs.org/docs](http://www.passportjs.org/docs)
- **TypeScript Documentation**: [https://www.typescriptlang.org/docs](https://www.typescriptlang.org/docs)

## Badges

![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)
![Prisma](https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)