import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

// Mock analytics data for demonstration
const analyticsData = {
  patientGrowth: [
    { month: "Jan", count: 65 },
    { month: "Feb", count: 78 },
    { month: "Mar", count: 90 },
    { month: "Apr", count: 81 },
    { month: "May", count: 86 },
    { month: "Jun", count: 94 },
  ],
  diseaseDistribution: [
    { name: "Hypertension", value: 35 },
    { name: "Diabetes", value: 25 },
    { name: "Asthma", value: 18 },
    { name: "Heart Disease", value: 15 },
    { name: "Others", value: 7 },
  ],
  weeklyActivity: [
    { day: "Mon", predictions: 12, verifications: 8 },
    { day: "Tue", predictions: 19, verifications: 11 },
    { day: "Wed", predictions: 15, verifications: 13 },
    { day: "Thu", predictions: 21, verifications: 18 },
    { day: "Fri", predictions: 25, verifications: 20 },
    { day: "Sat", predictions: 18, verifications: 15 },
    { day: "Sun", predictions: 14, verifications: 10 },
  ],
  predictionAccuracy: 87.5,
  verificationStats: {
    total: 2856,
    trueVerdict: 1245,
    falseVerdict: 982,
    partiallyTrue: 629,
  },
}

export async function GET(req: Request) {
  try {
    // Check authentication
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Get query parameters
    const url = new URL(req.url)
    const metric = url.searchParams.get("metric")
    const timeframe = url.searchParams.get("timeframe") || "month"

    if (metric) {
      // Return specific metric
      switch (metric) {
        case "patient_growth":
          return NextResponse.json({ data: analyticsData.patientGrowth })
        case "disease_distribution":
          return NextResponse.json({ data: analyticsData.diseaseDistribution })
        case "weekly_activity":
          return NextResponse.json({ data: analyticsData.weeklyActivity })
        case "prediction_accuracy":
          return NextResponse.json({ data: analyticsData.predictionAccuracy })
        case "verification_stats":
          return NextResponse.json({ data: analyticsData.verificationStats })
        default:
          return NextResponse.json({ message: "Invalid metric" }, { status: 400 })
      }
    } else {
      // Return all analytics data
      return NextResponse.json({ data: analyticsData })
    }
  } catch (error) {
    console.error("Analytics error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}

