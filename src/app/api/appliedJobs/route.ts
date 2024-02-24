import { NextRequest, NextResponse } from "next/server";
import dbConfig from "../../../dbConfig/dbConfig"
import { hirerInfo } from "../../../model/schema";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"


dbConfig()
export async function GET(request: NextRequest) {
      try {
            console.log('hello')
            const reqBody = await request.json()

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
                  const hirerList = await hirerInfo.find({ email }).exec()

                  console.log(hirerList)
                  return NextResponse.json({
                        Headers: hirerList,
                        message: "don't have enough coin balance", success: false, statusCode: 399
                  })
            }

      } catch (error) {
            return NextResponse.json({
                  message: error.message, success: false, statusCode: 399
            })
      }

} 