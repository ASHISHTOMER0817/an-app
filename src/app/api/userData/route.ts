import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import { User, UserInfo } from "../../../model/schema";
import dbConfig from "../../../dbConfig/dbConfig"


dbConfig()
export async function GET(request: NextRequest) {
      try {


            const cookieStore = cookies()
            const getCookies = cookieStore.get('token')?.value || ''
            const decodedToken: any = jwt.verify(getCookies, process.env.SECRET_KEY!)


            if (getCookies === undefined) {

                  return NextResponse.json({
                        message: 'didnt find any cookies', success: false
                  })
            } else {

                  const { email } = decodedToken

                  const userDetails = await UserInfo.findOne({ email })
                  const response = NextResponse.json({
                        Headers: userDetails,
                        message: "User Logged In",
                        success: true
                  })
                  return response

            }
      } catch (error) {
            return NextResponse.json({
                  message: "didn't have user info from database", success: false
            })
      }

} 