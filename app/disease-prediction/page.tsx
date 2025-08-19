"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, AlertCircle, Info, Upload, Trash2, Activity, FileText } from "lucide-react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface PredictionResult {
  disease: string
  confidence: number
  description: string
  recommendations: string[]
  precautions: string[]
}

export default function DiseasePredictionPage() {
  const [symptoms, setSymptoms] = useState("")
  const [medicalHistory, setMedicalHistory] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [results, setResults] = useState<PredictionResult[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // In a real app, you would upload files and process them
      // For this demo, we'll simulate AI prediction using the AI SDK

      // Construct the prompt with symptoms and medical history
      const prompt = `
        As a medical AI assistant, analyze the following patient information and provide disease predictions with confidence scores:
        
        Symptoms: ${symptoms}
        
        Medical History: ${medicalHistory}
        
        Files Uploaded: ${files.map((f) => f.name).join(", ") || "None"}
        
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
      const predictions = JSON.parse(text) as PredictionResult[]
      setResults(predictions)
    } catch (error) {
      console.error("Error during prediction:", error)
      setError("An error occurred during disease prediction. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-4xl py-8 mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-medical-teal bg-clip-text text-transparent mb-4">
          Disease Prediction
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          AI-powered analysis of symptoms and medical history for disease prediction
        </p>
      </div>

      <div className="mb-8">
        <Alert className="border-health-warning/20 bg-health-warning/5">
          <Info className="h-4 w-4 text-health-warning" />
          <AlertTitle className="text-health-warning">Important Notice</AlertTitle>
          <AlertDescription>
            This tool is for educational purposes only and not a substitute for professional medical advice. Always
            consult with a healthcare professional for medical concerns.
          </AlertDescription>
        </Alert>
      </div>

      <Tabs defaultValue="symptoms">
        <TabsList className="grid w-full grid-cols-2 h-12 p-1 bg-muted/50">
          <TabsTrigger value="symptoms">Input Information</TabsTrigger>
          <TabsTrigger value="results" disabled={results.length === 0}>
            Prediction Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="symptoms">
          <Card className="health-card-hover border-l-4 border-l-medical-teal">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <div className="p-2 rounded-lg bg-medical-teal/10">
                  <Activity className="h-5 w-5 text-medical-teal" />
                </div>
                Enter Your Health Information
              </CardTitle>
              <CardDescription>
                Provide your symptoms, medical history, and any relevant medical reports for analysis.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-3">
                  <Label htmlFor="symptoms" className="text-sm font-medium flex items-center gap-2">
                    <div className="p-1 rounded bg-medical-blue/10">
                      <Activity className="h-3 w-3 text-medical-blue" />
                    </div>
                    Symptoms
                  </Label>
                  <Textarea
                    id="symptoms"
                    placeholder="Describe your symptoms in detail (e.g., fever, headache, cough for 3 days)"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="medical-history" className="text-sm font-medium flex items-center gap-2">
                    <div className="p-1 rounded bg-medical-green/10">
                      <FileText className="h-3 w-3 text-medical-green" />
                    </div>
                    Medical History
                  </Label>
                  <Textarea
                    id="medical-history"
                    placeholder="Any pre-existing conditions, allergies, or medications you're currently taking"
                    value={medicalHistory}
                    onChange={(e) => setMedicalHistory(e.target.value)}
                    className="min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-medical-green/20 focus:border-medical-green"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <div className="p-1 rounded bg-health-warning/10">
                      <Upload className="h-3 w-3 text-health-warning" />
                    </div>
                    Upload Medical Reports (Optional)
                  </Label>
                  <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 text-center hover:border-primary/40 transition-colors duration-200">
                    <Input
                      type="file"
                      className="hidden"
                      id="file-upload"
                      onChange={handleFileChange}
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center gap-3">
                        <div className="p-3 rounded-full bg-primary/10">
                          <Upload className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Click to upload or drag and drop</p>
                          <p className="text-xs text-muted-foreground mt-1">PDF, JPG or PNG (max 10MB)</p>
                        </div>
                      </div>
                    </Label>
                  </div>

                  {files.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <p className="text-sm font-medium">Uploaded Files:</p>
                      <div className="space-y-2">
                        {files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-muted/50 border border-primary/10 p-3 rounded-lg">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-primary" />
                              <span className="text-sm truncate max-w-[80%]">{file.name}</span>
                            </div>
                            <Button variant="ghost" size="icon" className="hover:bg-destructive/10 hover:text-destructive" onClick={() => removeFile(index)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-6">
                <Button 
                  type="submit" 
                  disabled={isLoading || !symptoms} 
                  className="w-full health-gradient text-white hover:scale-105 transition-all duration-200 h-12 text-base font-semibold"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing Health Information...
                    </>
                  ) : (
                    <>
                      <Activity className="mr-2 h-5 w-5" />
                      Predict Possible Diseases
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          <Card>
            <CardHeader>
              <CardTitle>Prediction Results</CardTitle>
              <CardDescription>
                Based on the information provided, here are the potential diseases with confidence scores.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {results.map((result, index) => (
                <div key={index} className="space-y-4 border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{result.disease}</h3>
                    <div className="text-sm font-medium">Confidence: {result.confidence}%</div>
                  </div>

                  <Progress value={result.confidence} className="h-2" />

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{result.description}</p>

                    <div>
                      <h4 className="text-sm font-semibold mt-2">Recommendations:</h4>
                      <ul className="list-disc pl-5 text-sm">
                        {result.recommendations.map((rec, i) => (
                          <li key={i}>{rec}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold mt-2">Precautions:</h4>
                      <ul className="list-disc pl-5 text-sm">
                        {result.precautions.map((prec, i) => (
                          <li key={i}>{prec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Medical Disclaimer</AlertTitle>
                <AlertDescription>
                  These predictions are based on the information provided and are not a definitive diagnosis. Please
                  consult with a healthcare professional for proper medical advice and treatment.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setResults([])
                  document
                    .querySelector('[data-value="symptoms"]')
                    ?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
                }}
                className="w-full"
              >
                Start New Prediction
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

