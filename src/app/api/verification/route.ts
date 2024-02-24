import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import { User } from "../../../model/schema";
import dbConfig from "../../../dbConfig/dbConfig"


dbConfig()
export async function POST(request: NextRequest) {
      try {
            console.log('hello')
            const { otp } = await request.json()

            console.log(otp)
            console.log({ otp })

            const user = await User.findOne({ otp })
            console.log(user)
            if (user.otp === otp) {

                  const tokenData = {
                        email: user.email
                  }
                  const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "7d" })
                  cookies().set('token', token, { secure: true })
                  return NextResponse.json({
                        message: "OTP is correct nd token generated",
                        success: true
                  })
            }

            const response = NextResponse.json({
                  message: "OTP is wrong",
                  success: false
            })
            return response

      } catch (error) {
            return NextResponse.json({
                  message: "the login server doesn't work as intended", success: false
            })
      }

} 