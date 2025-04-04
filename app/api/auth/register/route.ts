import { NextResponse } from "next/server"
import { hash } from "bcrypt"

// This is a mock implementation - in a real app, you would use a database
const users: any[] = []

export async function POST(req: Request) {
  try {
    const { name, email, password, userType } = await req.json()

    // Check if user already exists
    const userExists = users.find((user) => user.email === email)
    if (userExists) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Create user
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword,
      userType,
      createdAt: new Date(),
    }

    users.push(newUser)

    // Return success response
    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          userType: newUser.userType,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "An error occurred during registration" }, { status: 500 })
  }
}

