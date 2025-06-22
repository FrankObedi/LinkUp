import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Profile from "@/models/Profile"

export async function POST(req: NextRequest) {
  await connectToDatabase()
  const { userEmail, otherEmail } = await req.json()
  // Update both users' connections to accepted
  await Profile.updateOne(
    { email: userEmail, "connections.email": otherEmail },
    { $set: { "connections.$.status": "accepted" } }
  )
  await Profile.updateOne(
    { email: otherEmail, "connections.email": userEmail },
    { $set: { "connections.$.status": "accepted" } }
  )
  return NextResponse.json({ success: true })
}