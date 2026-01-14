import nodemailer from "nodemailer"
import User from "@/models/userModel"
import crypto from "crypto"

interface SendEmailParams {
  email: string
  emailType: "VERIFY" | "RESET"
  userId: string
}

export const sendEmail = async ({ email, emailType, userId }: SendEmailParams) => {
  try {
    const rawToken = crypto.randomBytes(32).toString("hex")

    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex")

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 saat
      })
    }

    if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 saat
      })
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER!,
        pass: process.env.MAILTRAP_PASS!,
      },
    })

    const link =
      emailType === "VERIFY"
        ? `${process.env.DOMAIN}/verifyemail?token=${rawToken}`
        : `${process.env.DOMAIN}/forgotpassword/${rawToken}`

    const mailOptions = {
      from: "no-reply@kayra.app",
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
        <p>
          Click <a href="${link}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }.
        </p>
        <p>${link}</p>
      `,
    }
    await transport.sendMail(mailOptions)
  } catch (error) {
    if(error instanceof Error){
        throw new Error(error.message)
    }
  }
}
