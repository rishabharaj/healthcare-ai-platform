import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { claim } = await req.json()

    // Use AI SDK to verify the claim
    const prompt = `
      Verify the following medical claim:
      "${claim}"
      
      Analyze this claim against trusted medical sources like WHO, CDC, NIH, and PubMed.
      
      Provide a response in JSON format with the following structure:
      {
        "claim": "The exact claim being verified",
        "verdict": "True/False/Partially True/Unverified",
        "explanation": "A detailed explanation of why the claim is true, false, or partially true",
        "sources": [
          {
            "name": "Source name (e.g., WHO, CDC, medical journal)",
            "url": "URL to the source"
          }
        ]
      }
    `

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: prompt,
      system:
        "You are a medical fact-checking AI assistant trained to verify health-related claims against trusted medical sources. Provide accurate, evidence-based information in the requested format. Always cite reputable sources.",
    })

    // Parse the response
    const verification = JSON.parse(text)

    return NextResponse.json({ verification })
  } catch (error) {
    console.error("Fact verification error:", error)
    return NextResponse.json({ message: "An error occurred during fact verification" }, { status: 500 })
  }
}

