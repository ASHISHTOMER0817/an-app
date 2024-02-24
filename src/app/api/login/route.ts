import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import {User} from "../../../model/schema";
import dbConfig from "../../../dbConfig/dbConfig"
import { sendEmail } from "../../../helpers/mailer";


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


            //Send verification email
            await sendEmail({email, otp})



            const response = NextResponse.json({
                  message: "User Logged In",
                  success: true
            })
            return response

      } catch (error) {
            return NextResponse.json({
                  message: "the login server doesn't work as intended", success: false
            })
      }

} 