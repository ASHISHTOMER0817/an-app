import nodemailer from 'nodemailer'
import {User} from '../model/schema'


export const sendEmail = async ({email, otp}:{email:string, otp: string}) => {
      try {
            const user = await User.findOne({email})


            const transport = nodemailer.createTransport({
                  host: "sandbox.smtp.mailtrap.io",
                  port: 2525,
                  auth: {
                    user: "92bf0080cc328c",
                    pass: "f161e22398acc0"
                  }
                });


                const mailOptions = {
                  from: 'ashish0817tomer@gmail.com',
                  to: email,
                  subject: "Verification OTP",
                   html: `hello Sir/Mam, here is your OTP to verify your account ${otp}`
                }
                const mailresponse = await transport.sendMail(mailOptions);
                return mailresponse;

      }catch(error:any){
        console.log("failed to send email")
      }
}