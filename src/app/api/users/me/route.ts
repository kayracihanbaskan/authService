import { getDataFromToken } from "@/helpers/getDataFromToken";
import connectDb from "@/db/db";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";

connectDb()

export async function GET(request:NextRequest) {
    try {
        const userID = getDataFromToken(request)
        const user = await User.findById(userID).select("-password")
        return NextResponse.json({
            message:"User Found",
            success:true,
            data:user
        })

    } catch (error) {
        return NextResponse.json({
            error:error
        },{
            status:500
        })
    }
}