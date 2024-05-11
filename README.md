# Train Station Ticket Reservation API

Welcome to the Train Station Ticket Reservation API repository! This project provides a modern and efficient solution for booking train tickets at stations. The API is built using Node.js Express, with TypeScript, Zod, Prisma, MySQL, and Passport.js.

## Table of Contents

1. [Setup Instructions](#setup-instructions)
2. [Available Endpoints](#available-endpoints)
3. [Running the Project](#running-the-project)
4. [Security Considerations](#security-considerations)
5. [Model Routes](#model-routes)

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
PORT=3000
DB_URL="mysql://root:password@localhost:3306/train_station_ticket_reservation"
JWT_SECRET
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

- **Schedule**:
- `/schedule/schedules`: Get all schedules.
- `/schedule/:id`: Get details of a specific schedule.
- `/schedule`: Create a new schedule (Admin only).
- `/schedule/:id`: Update details of a schedule (Admin only).
- `/schedule/:id`: Delete a schedule (Admin only).

- **Route**:
- `/route/routes`: Get all routes.
- `/route/:id`: Get details of a specific route.
- `/route`: Create a new route (Admin only).
- `/route/:id`: Update details of a route (Admin only).
- `/route/:id`: Delete a route (Admin only)




