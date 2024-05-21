import fs from 'fs';
import path from 'path';
import db from '../db';
import QRCode from 'qrcode'
import 'dayjs/locale/ar'
import dayjs from 'dayjs'

export const createTiketPage = async (ticket: any) => {
    const tiketPagePath = path.join(process.cwd(), 'src/pages/tiket.html');
   
    const user = await db.users.findUnique({
        where: {
            id: ticket.userId
        },
        select: {
            email: true,
            name: true,
            id: true
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
    // get the day and the month in arabic plus hours and minutes
    dayjs.locale('ar');
    const formatDepartureDate = dayjs(trip?.departureDate).format('HH:mm');
    const formatArrivalDate = dayjs(trip?.arrivalDate).format('HH:mm');
    
    const typeClass = car?.type === 'first_class' ? 'الدرجة الأولى' : 'الدرجة الثانية';
    const seat = await db.seat.findFirst({
        where: {
            carId: ticket.carId,
            seatNumber: ticket.seatNumber
        }
    });
    const qrData = {
        typeClass,
        seatNumber: seat?.seatNumber,
        from: trip?.from,
        to: trip?.to,
        departureDate: formatDepartureDate,
        arrivalDate: formatArrivalDate,
        carName: car?.name,
        userName: user?.name,
        userEmail: user?.email
    };

    const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));
    const pageContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com"></script>
        <title>Tiket</title>
        <style>
          @import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
          body {
            font-family: "Roboto", sans-serif;
            direction: rtl;
            text-align: right;
            overflow: hidden;
          }
    
        </style>
      </head>
      <body class="bg-slate-100 h-screen w-screen flex items-center justify-center">
        <div class="container mt-5">
          <div class="max-w-md w-full h-full mx-auto bg-salte-100 z-10 rounded-3xl">
            <div class="flex flex-col">
              <div class="bg-white relative rounded-xl p-1 m-4">
                <div class="flex-none sm:flex">
                  <div class="flex-auto justify-evenly">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center my-1">
                        <span class="ml-3 rounded-full bg-white w-8 h-8">
                          <img src="https://image.winudf.com/v2/image1/Y29tLmJldHMuYWlyaW5kaWEudWlfaWNvbl8xNTU0NTM4MzcxXzA0Mw/icon.png?w=&amp;fakeurl=1" class="h-8 p-1" />
                        </span>
                        <h2 class="font-medium">قطار</h2>
                      </div>
                      <div class="mr-auto text-blue-800">
                        ${seat?.seatNumber}
                      </div>
                    </div>
                    <div class="border-b border-dashed border-b-2 my-5"></div>
                    <div class="flex items-center">
                      <div class="flex flex-col">
                        <div class="flex-auto text-xs text-gray-400 my-1">
                          <span class="mr-1">المغادرة</span>
                        </div>
                        <div class="w-full flex-none text-lg text-blue-800 font-bold leading-none">
                          ${trip?.from} 
                        </div>
                      </div>
                      <div class="flex flex-col mx-auto">
                        <img src="https://image.winudf.com/v2/image1/Y29tLmJldHMuYWlyaW5kaWEudWlfaWNvbl8xNTU0NTM4MzcxXzA0Mw/icon.png?w=&amp;fakeurl=1" class="w-20 p-1" />
                      </div>
                      <div class="flex flex-col">
                        <div class="flex-auto text-xs text-gray-400 my-1">
                          <span class="mr-1">الوصول</span>
                        </div>
                        <div class="w-full flex-none text-lg text-blue-800 font-bold leading-none">
                          ${trip?.to}
                        </div>
                      </div>
                    </div>
                    <div class="border-b border-dashed border-b-2 my-5 pt-5">
                      <div class="absolute rounded-full w-5 h-5 bg-slate-100 -mt-2 -left-2"></div>
                      <div class="absolute rounded-full w-5 h-5 bg-slate-100 -mt-2 -right-2"></div>
                    </div>
                    <div class="flex items-center mb-5 p-5 text-sm">
                      <div class="flex flex-col">
                        <span class="text-sm">
                            
                            رقم العربة
    
                        </span>
                        <div class="font-semibold">
                        ${car?.name}
                        </div>
                      </div>
                      <div class="flex flex-col mr-auto">
                        <span class="text-sm">النوع</span>
                        <div class="font-semibold">
                        ${typeClass}
                        </div>
                      </div>
                    </div>
                    <div class="flex items-center mb-4 px-5">
                      <div class="flex flex-col text-sm">
                        <span class="">المغادرة</span>
                        <div class="font-semibold">
                        ${formatDepartureDate}
                        </div>
                      </div>
                      <div class="flex flex-col mr-auto text-sm">
                        <span class="">الوصول</span>
                        <div class="font-semibold">
                        ${formatArrivalDate}
                        </div>
                      </div>
                    </div>
                    <div class="flex-none sm:flex">
                        <div class="flex-auto justify-evenly">
                          
                          <div class="border-b border-dashed border-b-2 my-5"></div>
                          <div class="flex items-center">
                            <div class="flex flex-col">
                              <div class="flex-auto text-xs text-gray-400 my-1">
                                <span class="mr-1">الاسم</span>
                              </div>
                              <div class="w-full flex-none text-lg text-blue-800 font-bold leading-none">
                                 ${user?.name} 
                              </div>
                            </div>
                            <div class="flex flex-col mx-auto">
                              <img src="https://cdn-icons-png.flaticon.com/512/4296/4296808.png" class="w-20 p-1" />
                            </div>
                            <div class="flex flex-col">
                              <div class="flex-auto text-xs text-gray-400 my-1">
                                <span class="mr-1">الهوية</span>
                              </div>
                              <div class="w-full flex-none text-lg text-blue-800 font-bold leading-none">
                                GM2993883
                              </div>
                            </div>
                          </div>
                          <div class="border-b border-dashed border-b-2 my-5 pt-5">
                            <div class="absolute rounded-full w-5 h-5 bg-gray-100 -mt-2 -left-2"></div>
                            <div class="absolute rounded-full w-5 h-5 bg-gray-100 -mt-2 -right-2"></div>
                          </div>
                          <div class="flex items-center mb-5 p-5 text-sm">
                            <div class="flex flex-col">
                              <span class="text-sm">الهاتف</span>
                              <div class="font-semibold">123-456-789</div>
                            </div>
                            <div class="flex flex-col mr-auto">
                              <span class="text-sm">البريد الإلكتروني</span>
                              <div class="font-semibold">
                              ${user?.email}
                              </div>
                            </div>
                          </div>

                          <div class="flex justify-center pb-5">
                            <img
                            class="w-32 mx-auto"
                            src="${qrCode}" />
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
              
              <div class="flex justify-center pb-5">
                <button class="bg-blue-800 text-white py-2 px-4 rounded-xl">طباعة التذكرة</button>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
    </html>
        
    `;
    fs.writeFileSync(tiketPagePath, pageContent);
    return tiketPagePath;
};
