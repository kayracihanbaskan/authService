import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string
  email: string
  username: string
}

export const getDataFromToken = (request:NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || ''
        const decodedToken = jwt.verify(token,process.env.TOKEN_SECRET!) as JwtPayload

        return decodedToken.id
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            throw new Error("Unknown error")
        }
    }
}