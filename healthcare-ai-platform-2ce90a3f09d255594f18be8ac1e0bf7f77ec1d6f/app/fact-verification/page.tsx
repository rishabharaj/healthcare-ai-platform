"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Loader2, AlertCircle, CheckCircle2, XCircle, Info, Search } from "lucide-react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface VerificationResult {
  claim: string
  verdict: "True" | "False" | "Partially True" | "Unverified"
  explanation: string
  sources: {
    name: string
    url: string
  }[]
}

export default function FactVerificationPage() {
  const [claim, setClaim] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState<VerificationResult | null>(null)
  const [recentClaims, setRecentClaims] = useState<string[]>([
    "Drinking lemon water every morning boosts your immune system",
    "Vaccines cause autism",
    "Vitamin C cures the common cold",
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!claim.trim()) return

    setIsLoading(true)
    setError("")
    setResult(null)

    try {
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
      const verification = JSON.parse(text) as VerificationResult
      setResult(verification)

      // Add to recent claims if not already there
      if (!recentClaims.includes(claim)) {
        setRecentClaims((prev) => [claim, ...prev.slice(0, 4)])
      }
    } catch (error) {
      console.error("Error during verification:", error)
      setError("An error occurred during fact verification. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case "True":
        return "bg-green-500"
      case "False":
        return "bg-red-500"
      case "Partially True":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case "True":
        return <CheckCircle2 className="h-5 w-5" />
      case "False":
        return <XCircle className="h-5 w-5" />
      case "Partially True":
        return <Info className="h-5 w-5" />
      default:
        return <AlertCircle className="h-5 w-5" />
    }
  }

  return (
    <div className="container max-w-4xl py-8 mx-auto">
      <h1 className="text-3xl font-bold mb-6">Medical Fact Verification</h1>

      <div className="mb-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>How It Works</AlertTitle>
          <AlertDescription>
            Enter a medical claim or health-related statement, and our AI will verify it against trusted medical sources
            like WHO, CDC, and PubMed.
          </AlertDescription>
        </Alert>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Verify a Medical Claim</CardTitle>
          <CardDescription>Enter a health-related claim or statement to check its accuracy</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="claim">Medical Claim</Label>
              <div className="flex gap-2">
                <Input
                  id="claim"
                  placeholder="Enter a health-related claim (e.g., 'Vitamin C prevents colds')"
                  value={claim}
                  onChange={(e) => setClaim(e.target.value)}
                  required
                />
                <Button type="submit" disabled={isLoading || !claim.trim()}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {recentClaims.length > 0 && (
              <div className="space-y-2">
                <Label>Recent Claims</Label>
                <div className="flex flex-wrap gap-2">
                  {recentClaims.map((recentClaim, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => setClaim(recentClaim)}
                    >
                      {recentClaim.length > 40 ? `${recentClaim.substring(0, 40)}...` : recentClaim}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </form>
      </Card>

      {isLoading && (
        <div className="flex justify-center items-center p-12">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Verifying claim against medical sources...</p>
          </div>
        </div>
      )}

      {result && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Verification Result</CardTitle>
              <Badge className={getVerdictColor(result.verdict)}>
                <div className="flex items-center gap-1">
                  {getVerdictIcon(result.verdict)}
                  <span>{result.verdict}</span>
                </div>
              </Badge>
            </div>
            <CardDescription>Claim: "{result.claim}"</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Explanation</h3>
              <p className="text-sm text-muted-foreground">{result.explanation}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Sources</h3>
              <ul className="space-y-2">
                {result.sources.map((source, index) => (
                  <li key={index} className="text-sm">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      {source.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">
                This verification is based on current medical knowledge and may change as new research emerges. Always
                consult healthcare professionals for medical advice.
              </AlertDescription>
            </Alert>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

