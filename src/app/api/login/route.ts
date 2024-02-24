import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import {User} from "../../../model/schema";
import dbConfig from "../../../dbConfig/dbConfig"
import { sendEmail } from "../../../helpers/mailer";
import mail from "@sendgrid/mail";


dbConfig()
export async function POST(request: NextRequest) {
      try {
            console.log('hello')
            const {email} = await request.json()
           
            console.log(email)
            console.log({email})

            const generateOtp = () => {
                  const min = 100000;
                  const max = 999999;
                  const randomNo = (Math.floor(Math.random() * (max - min + 1)) + min).toString()
                  console.log(randomNo);
                  return randomNo;
            };
            console.log(generateOtp())
            const otp = generateOtp()

            const newUser = await new User({
                  email,
                  otp
            })
            console.log(newUser)

            //Saving new member
            const savedUser = await newUser.save();
            console.log(savedUser)


            //Send verification email to mailtrap
            await sendEmail({email, otp})

            //SendGrid mail
            mail.setApiKey(process.env.SENDGRID_API_KEY);
            const message = `
            Name:Kapa Jobs \r\n
            Email: This email ${email} used to register with Kapa Jobs\r\n
            Message: You need this OTP- ${otp} to verify your account.
            `
            const data = {
                  to: `${email}`,
                  from: 'ashish0817tomer@gmail.com',
                  subject: 'Verification email !',
                  text: message,
                  html: message.replace(/\r\n/g,'<br>')
            }

            mail.send(data)


            const response = NextResponse.json({
                  message: "User Logged In",
                  success: true,
                  otp
            })
            return response

      } catch (error) {
            return NextResponse.json({
                  message: "the login server doesn't work as intended", success: false
            })
      }

} 