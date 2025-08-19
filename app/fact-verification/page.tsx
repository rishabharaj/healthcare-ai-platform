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
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-medical-green bg-clip-text text-transparent mb-4">
          Medical Fact Verification
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Verify health claims with AI-powered analysis against trusted medical sources
        </p>
      </div>

      <div className="mb-8">
        <Alert className="border-medical-blue/20 bg-medical-blue/5">
          <Info className="h-4 w-4 text-medical-blue" />
          <AlertTitle className="text-medical-blue">How It Works</AlertTitle>
          <AlertDescription>
            Enter a medical claim or health-related statement, and our AI will verify it against trusted medical sources
            like WHO, CDC, and PubMed.
          </AlertDescription>
        </Alert>
      </div>

      <Card className="mb-8 health-card-hover border-l-4 border-l-medical-green">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <div className="p-2 rounded-lg bg-medical-green/10">
              <Search className="h-5 w-5 text-medical-green" />
            </div>
            Verify a Medical Claim
          </CardTitle>
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

            <div className="space-y-3">
              <Label htmlFor="claim" className="text-sm font-medium">Medical Claim</Label>
              <div className="flex gap-3">
                <Input
                  id="claim"
                  placeholder="Enter a health-related claim (e.g., 'Vitamin C prevents colds')"
                  value={claim}
                  onChange={(e) => setClaim(e.target.value)}
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-medical-green/20 focus:border-medical-green"
                />
                <Button 
                  type="submit" 
                  disabled={isLoading || !claim.trim()}
                  className="health-gradient text-white hover:scale-105 transition-all duration-200 px-6"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {recentClaims.length > 0 && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">Recent Claims</Label>
                <div className="flex flex-wrap gap-2">
                  {recentClaims.map((recentClaim, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-medical-blue/10 hover:border-medical-blue/40 transition-all duration-200 px-3 py-1"
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
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Loader2 className="h-10 w-10 animate-spin text-medical-blue" />
              <div className="absolute inset-0 rounded-full border-2 border-medical-blue/20"></div>
            </div>
            <p className="text-sm text-muted-foreground font-medium">Verifying claim against medical sources...</p>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-medical-blue animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-medical-blue animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 rounded-full bg-medical-blue animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      )}

      {result && (
        <Card className="health-card-hover border-l-4 border-l-medical-green">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <div className="p-2 rounded-lg bg-medical-green/10">
                  <CheckCircle2 className="h-5 w-5 text-medical-green" />
                </div>
                Verification Result
              </CardTitle>
              <Badge className={`${getVerdictColor(result.verdict)} text-white font-semibold px-3 py-1`}>
                <div className="flex items-center gap-2">
                  {getVerdictIcon(result.verdict)}
                  <span>{result.verdict}</span>
                </div>
              </Badge>
            </div>
            <CardDescription className="text-base mt-2">
              <span className="font-medium">Claim:</span> "{result.claim}"
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 rounded-lg bg-muted/30 border border-primary/10">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-medical-blue/10">
                  <Info className="h-4 w-4 text-medical-blue" />
                </div>
                Explanation
              </h3>
              <p className="text-muted-foreground leading-relaxed">{result.explanation}</p>
            </div>

            <div className="p-4 rounded-lg bg-muted/30 border border-primary/10">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-medical-green/10">
                  <ExternalLink className="h-4 w-4 text-medical-green" />
                </div>
                Trusted Sources
              </h3>
              <ul className="space-y-3">
                {result.sources.map((source, index) => (
                  <li key={index} className="p-3 rounded-lg bg-background border hover:border-primary/20 transition-colors duration-200">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 flex items-center gap-2 font-medium transition-colors duration-200"
                    >
                      <ExternalLink className="h-4 w-4" />
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

