import { NextRequest, NextResponse } from "next/server";
import { User } from "../../../model/schema";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"

export async function POST() {

      try {
            const cookieStore = cookies()
            const getCookies = cookieStore.get('token')?.value || ''

            const decodedToken: any = jwt.verify(getCookies, process.env.SECRET_KEY!)
            if (getCookies === undefined) {

                  return NextResponse.json({
                        message: "user is logged out/user doesn't exist", success: false, statusCode: 399
                  })
            } else {
                  const { email } = decodedToken
                  await User.findOneAndDelete({ email })

                  const response = NextResponse.json({
                        message: "Logout successful",
                        success: true
                  })
                  response.cookies.set("token", "", {
                        httpOnly: true, expires: new Date(0)
                  });
                  return response;
            }
      } catch (error) {
            return NextResponse.json({

                  message: "failed to logout",
                  success: false
            })
      }
}