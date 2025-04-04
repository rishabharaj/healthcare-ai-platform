import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const data = await request.json()
    console.log('Received update data:', data);

    // In a real app, you would update the user data in your database
    // For demo purposes, we'll just return the updated data
    const updatedUser = {
      id: session.user.id,
      name: data.name ?? session.user.name,
      email: data.email ?? session.user.email,
      userType: session.user.userType,
      phone: data.phone ?? session.user.phone ?? "",
      age: data.age ?? session.user.age ?? "",
      gender: data.gender ?? session.user.gender ?? "",
      bloodGroup: data.bloodGroup ?? session.user.bloodGroup ?? "",
    }
    console.log('Updated user data:', updatedUser);

    return NextResponse.json({
      message: "Profile updated successfully",
      user: updatedUser,
    })
  } catch (error) {
    console.error("[USER_UPDATE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 