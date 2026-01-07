import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
export async function GET()
{
    const user =await getServerSession(authOptions)
    return NextResponse.json(user)
}