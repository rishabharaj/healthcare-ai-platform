import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { symptoms, medicalHistory, files = [] } = await req.json()

    // Construct the prompt with symptoms and medical history
    const prompt = `
      As a medical AI assistant, analyze the following patient information and provide disease predictions with confidence scores:
      
      Symptoms: ${symptoms}
      
      Medical History: ${medicalHistory}
      
      Files Uploaded: ${files.map((f: any) => f.name).join(", ") || "None"}
      
      For each potential disease, provide:
      1. Disease name
      2. Confidence score (0-100)
      3. Brief description
      4. Recommendations
      5. Precautions
      
      Format the response as JSON with this structure:
      [
        {
          "disease": "Disease Name",
          "confidence": 85,
          "description": "Brief description of the disease",
          "recommendations": ["Recommendation 1", "Recommendation 2"],
          "precautions": ["Precaution 1", "Precaution 2"]
        }
      ]
      
      Provide up to 3 potential diseases based on the information.
    `

    // Use AI SDK to generate prediction
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: prompt,
      system:
        "You are a medical AI assistant trained to analyze symptoms and medical history to predict possible diseases. Provide accurate, evidence-based information in the requested format. This is for educational purposes only and not a substitute for professional medical advice.",
    })

    // Parse the response
    const predictions = JSON.parse(text)

    return NextResponse.json({ predictions })
  } catch (error) {
    console.error("Disease prediction error:", error)
    return NextResponse.json({ message: "An error occurred during disease prediction" }, { status: 500 })
  }
}

