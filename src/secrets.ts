import dotenv from 'dotenv';

dotenv.config();


const secrets = {
    jwtSecret: process.env.JWT_SECRET ?? '',
    jwtExpiration: process.env.JWT_EXPIRES_IN ?? '1d',
    googleClientId: process.env.GOOGLE_CLIENT_ID ?? '',
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    resend_api_key: process.env.RESEND_API_KEY ?? '',
};

export default secrets;