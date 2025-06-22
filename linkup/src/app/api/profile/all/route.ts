import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Profile from "@/models/Profile"

export async function GET(req: NextRequest) {
  await connectToDatabase()
  const profiles = await Profile.find({})
  return NextResponse.json(profiles)
}