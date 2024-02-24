import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import { CoinDivision, UserInfo } from "../../../model/schema";
import dbConfig from "../../../dbConfig/dbConfig"


dbConfig()
export async function POST(request: NextRequest) {
      try {
            const reqBody = await request.json()
            const entries = reqBody.user


            const cookieStore = cookies()
            const getCookies = cookieStore.get('token')?.value || ''

            const decodedToken: any = jwt.verify(getCookies, process.env.SECRET_KEY!)
            if (getCookies === undefined) {

                  return NextResponse.json({
                        message: 'didnt find any cookies', success: false
                  })
            } else {

                  const { email } = decodedToken


                  let user = await UserInfo.findOne({ email }) || await new UserInfo({ email })
                  // console.log('the user is -',user )
                  for (let entry in entries) {
                        // console.log('the entry is', entry)
                        if (entries[entry]) {
                              // console.log('the user entry is user',[entry])
                              user[entry].value = entries[entry];
                              await user.save();
                              if (!user[entry].coinsCredited) {
                                    const coin = await CoinDivision.findOne({ input: entry });
                                    if (coin) {
                                          user.totalCoin += coin.coinValue;
                                          await user.save();
                                    } else {

                                    }
                              }
                        }

                  }

                  const response = NextResponse.json({
                        message: "User Logged In",
                        success: true
                  })
                  return response

            }
      } catch (error) {
            return NextResponse.json({
                  message: error.message, success: false
            })
      }
}

