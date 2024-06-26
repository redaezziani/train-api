import dotenv from 'dotenv';

dotenv.config();


const secrets = {
    jwtSecret: process.env.JWT_SECRET ?? '',
    jwtExpiration: process.env.JWT_EXPIRES_IN ?? '1d',
    googleClientId: process.env.GOOGLE_CLIENT_ID ?? '',
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    resend_api_key: process.env.RESEND_API_KEY ?? '',
    sessionSecret: process.env.SESSION_SECRET?? '',
    host_url: process.env.HOST_URL ?? '',
    port : process.env.PORT ?? 3000
};

export default secrets;