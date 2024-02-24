import { NextRequest, NextResponse } from "next/server";
import dbConfig from "../../../dbConfig/dbConfig"
import { HirerInfo } from "../../../model/schema";
import { UserInfo } from "../../../model/schema";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"


dbConfig()
export async function POST(request: NextRequest) {
      try {
            // console.log('hello')
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
                  // console.log({ email })
                  const user = await UserInfo.findOne({ email })

                  const newHirer = await new HirerInfo({...reqBody.hirerDetails, email})
                  // console.log(newHirer)


                  if (user.totalCoin >= 50) {
                        await UserInfo.updateOne({ email }, { $set: { totalCoin: user.totalCoin - 50 } })

                        await newHirer.save()

                        return NextResponse.json({
                              message: "the hirer details have been saved", success: true, statusCode: 200, id : reqBody.hirerDetails.id, newCoinValue: user.totalCoin-50
                        })
                  } else {
                        return NextResponse.json({
                              message: "don't have enough coin balance", success: false, statusCode: 399
                        })
                  }

            }

      } catch (error) {
            return NextResponse.json({
                  message: error.message, success: false, statusCode: 399
            })
      }

}