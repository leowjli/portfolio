import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface FormData {
    fname: string;
    lname: string;
    email: string;
    phone: string;
    message: string;
}

export async function POST(req: NextRequest) {
    try {
        if (req.method === 'POST') {
            const { fname, lname, email, phone, message }: FormData = await req.json();

            const emailTest = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            const phoneTest = /^\+?[1-9]\d{1,14}$/;

            if (!email || !emailTest.test(email)) {
                return NextResponse.json({ success: false, message: 'Invalid email format.' }, { status: 400 });
            }

            if (!phone || !phoneTest.test(phone)) {
                return NextResponse.json({ success: false, message: 'Invalid phone number format.' }, { status: 400 });
            }

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });

            const mailOptions = {
                from: email,
                to: process.env.EMAIL_RECEIVER,
                subject: `New message from ${fname} ${lname} from Leo's website`,
                text: `
                    Name: ${fname} ${lname}
                    Email: ${email}
                    Phone: ${phone}
                    message: ${message}
                `,
                html: `<p>You have a new message from ${fname} ${lname}, (${email}):</p><p>${message}</p>`,
            };

            await transporter.sendMail(mailOptions);
            return NextResponse.json({ success: true, message: 'Message sent successfully!' }, { status: 200 });
        } else {
            return NextResponse.json({ success: false, message: 'Method Not Allowed' }, { status: 405 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Error sending message.' }, { status: 500 });
    }

}
