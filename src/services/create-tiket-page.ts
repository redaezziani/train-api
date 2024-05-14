import fs from 'fs';
import path from 'path';
import db from '../db';

/*

model Ticket {
   id        String    @id @default(uuid()) @db.VarChar(36)
  car        Car      @relation(fields: [carId], references: [id],onDelete: Cascade)
  carId      String
  seatNumber Int
  price      Float
  passenger  String
  trip       Trip     @relation(fields: [tripId], references: [id],onDelete: Cascade)
  tripId     String
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  user       Users    @relation(fields: [userId], references: [id],onDelete: Cascade)
  userId     String
  Seat       Seat?    @relation(fields: [seatId], references: [id],onDelete: SetNull)
  seatId     String?
}
*/
// tiket page is : src/pages/tiket.tsx

export const createTiketPage = async (ticket: any) => {
    const tiketPagePath = path.join(process.cwd(), 'src/pages/tiket.html');
    const user = await db.users.findUnique({
        where: {
            id: ticket.userId
        },
        select: {
            email: true,
            name: true
        }
    });

    const car = await db.car.findUnique({
        where: {
            id: ticket.carId
        },
        select: {
            name: true,
            type: true
        }
    });

    const trip = await db.trip.findUnique({
        where: {
            id: ticket.tripId
        },
        select: {
            departureDate: true,
            arrivalDate: true,
            from: true,
            to: true
        }
    });
    const formatDepartureDate = new Date(trip?.departureDate??'').toLocaleString();
    const formatArrivalDate = new Date(trip?.arrivalDate??'').toLocaleString();

        

    const seat = await db.seat.findFirst({
        where: {
            carId: ticket.carId,
            seatNumber: ticket.seatNumber
        }
    });
    const pageContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.2/css/fontawesome.min.css" rel="stylesheet">
        <title>Tiket</title>
        <style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
body {
    font-family: 'Roboto', sans-serif;
}
</style>
    </head>
    <body>
        <div class="container mt-5">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title
                    ">Tiket</h5>
                </div>
                <div class="card-body">
                    <p class="card-text">Name: ${user?.name}</p>
                    <p class="card-text">Email: ${user?.email}</p>
                    <p class="card-text">Car: ${car?.name}</p>
                    <p class="card-text">Seat Number: ${seat?.seatNumber}</p>
                    <p class="card-text">Price: ${ticket.price} DH</p>
                    <p class="card-text">Departure Date: ${formatDepartureDate}</p>
                    <p class="card-text">Arrival Date: ${formatArrivalDate}</p>
                    <p class="card-text">From: ${trip?.from}</p>
                    <p class="card-text">To: ${trip?.to}</p>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="button" class="btn d-flex gap-2 btn-warning">
                        Print tiket  <i class="fas fa-print"></i>
                    </button>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
    fs.writeFileSync(tiketPagePath, pageContent);
    return tiketPagePath;
}