import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

// Mock patient data for demonstration
const patientData = [
  {
    id: 1,
    name: "John Doe",
    age: 45,
    gender: "Male",
    conditions: ["Hypertension", "Type 2 Diabetes"],
    metrics: [
      { date: "2023-01-15", bloodPressure: "130/85", heartRate: 72, bloodSugar: 140 },
      { date: "2023-02-15", bloodPressure: "128/82", heartRate: 70, bloodSugar: 135 },
      { date: "2023-03-15", bloodPressure: "125/80", heartRate: 68, bloodSugar: 130 },
      { date: "2023-04-15", bloodPressure: "122/78", heartRate: 65, bloodSugar: 125 },
      { date: "2023-05-15", bloodPressure: "120/75", heartRate: 64, bloodSugar: 120 },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 38,
    gender: "Female",
    conditions: ["Asthma", "Allergic Rhinitis"],
    metrics: [
      { date: "2023-01-20", bloodPressure: "118/75", heartRate: 68, respiratoryRate: 16 },
      { date: "2023-02-20", bloodPressure: "120/76", heartRate: 70, respiratoryRate: 15 },
      { date: "2023-03-20", bloodPressure: "119/74", heartRate: 69, respiratoryRate: 14 },
      { date: "2023-04-20", bloodPressure: "117/73", heartRate: 67, respiratoryRate: 14 },
      { date: "2023-05-20", bloodPressure: "116/72", heartRate: 66, respiratoryRate: 13 },
    ],
  },
]

export async function GET(req: Request) {
  try {
    // Check authentication
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Get query parameters
    const url = new URL(req.url)
    const patientId = url.searchParams.get("patientId")

    if (patientId) {
      // Return data for a specific patient
      const patient = patientData.find((p) => p.id === Number.parseInt(patientId))
      if (!patient) {
        return NextResponse.json({ message: "Patient not found" }, { status: 404 })
      }
      return NextResponse.json({ patient })
    } else {
      // Return all patients (with limited data)
      const simplifiedData = patientData.map((p) => ({
        id: p.id,
        name: p.name,
        age: p.age,
        gender: p.gender,
        conditions: p.conditions,
      }))
      return NextResponse.json({ patients: simplifiedData })
    }
  } catch (error) {
    console.error("Patient data error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    // Check authentication
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { action, patientId, data } = await req.json()

    switch (action) {
      case "add_metric":
        // In a real app, this would add a new health metric to the database
        return NextResponse.json({
          success: true,
          message: "Health metric added successfully",
        })

      case "update_patient":
        // In a real app, this would update patient information
        return NextResponse.json({
          success: true,
          message: "Patient information updated successfully",
        })

      default:
        return NextResponse.json({ message: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Patient data error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}

