import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Profile from "@/models/Profile"

export async function POST(req: NextRequest) {
  await connectToDatabase()
  const data = await req.json()
  const profile = await Profile.findOneAndUpdate(
    { email: data.email },
    data,
    { upsert: true, new: true }
  )
  return NextResponse.json(profile)
}

export async function GET(req: NextRequest) {
  await connectToDatabase()
  const email = req.nextUrl.searchParams.get("email")
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 })
  const profile = await Profile.findOne({ email })
  return NextResponse.json(profile)
}