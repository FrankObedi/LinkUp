import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Profile from "@/models/Profile"

export async function POST(req: NextRequest) {
  await connectToDatabase()
  const { fromEmail, toEmail } = await req.json()
  if (!fromEmail || !toEmail) {
    return NextResponse.json({ error: "Missing emails" }, { status: 400 })
  }
  // Add to sender's connections (sent)
  await Profile.findOneAndUpdate(
    { email: fromEmail },
    { $addToSet: { connections: { email: toEmail, status: "pending", direction: "sent" } } }
  )
  // Add to receiver's connections (received)
  await Profile.findOneAndUpdate(
    { email: toEmail },
    { $addToSet: { connections: { email: fromEmail, status: "pending", direction: "received" } } }
  )
  return NextResponse.json({ success: true })
}