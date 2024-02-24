import { NextRequest, NextResponse } from "next/server";
import { UserInfo } from "../../../model/schema";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"


export async function GET(request:NextRequest) {
      try {


            const cookieStore = cookies()
            const getCookies = cookieStore.get('token')?.value || ''

            const decodedToken: any = jwt.verify(getCookies, process.env.SECRET_KEY!)
            if (getCookies === undefined) {

                  return NextResponse.json({
                        message: "user is logged out/user doesn't exist", success: false
                  })
            } else {

                  const { email } = decodedToken
                  console.log({ email })
                  const user = await UserInfo.findOne({ email })
                  const totalCoin = user.totalCoin
                  return NextResponse.json({
                        coin: totalCoin, message: ' coin balance', success: true
                  })

            }
      } catch (error) {
            return NextResponse.json({
                  message: error.message, success: false
            })
      }
}