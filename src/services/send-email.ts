import { Resend } from 'resend';
import secrets from '../secrets';

const resend = new Resend(secrets.resend_api_key);


export const sendFogotPasswordEmail = async (token: string) => {
    try {
        const { data, error } = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: ["klausdev2@gmail.com"],
            subject: "Reset your password",
            html: `<h1>Reset your password</h1>
            <p>Click
            <a href="http://localhost:3000/auth/reset-password/${token}">
            here
            </a>to reset your password
            </p><br/>
            <p>
            if not work just copy and paste this link in your browser
            </p>
            <p>
            ${token}
            </p>
            <h4>
            Note : this link will expire in 10 minutes
            </h4>
            `,
          });
        
        if (error) {
            return {
                status: 'error',
                error: error
            }
        }
        return {
            status: 'success',
            data: data
        }
        
    } catch (error) {
        return {
            status: 'error',
            error: error
        }
    }
}