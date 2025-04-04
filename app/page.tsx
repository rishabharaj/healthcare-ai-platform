import type React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Brain, Shield, Activity, Hospital, FileCheck } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                AI-Powered Healthcare Platform
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Empowering healthcare with advanced AI for disease prediction, medical fact verification, and patient
                data analysis.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="/auth/register">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Brain className="h-10 w-10 text-blue-500" />}
              title="Disease Prediction"
              description="AI-powered analysis of symptoms, lab reports, and medical history to predict possible diseases with confidence scores."
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-green-500" />}
              title="Medical Fact Verification"
              description="Verify health-related claims against trusted medical sources like WHO, CDC, and PubMed."
            />
            <FeatureCard
              icon={<Activity className="h-10 w-10 text-red-500" />}
              title="Patient Data Analysis"
              description="Secure collection and analysis of patient data with visualizations for better healthcare decisions."
            />
            <FeatureCard
              icon={<Hospital className="h-10 w-10 text-purple-500" />}
              title="Hospital Integration"
              description="Seamless API integration with hospital systems for symptom checking, appointments, and medical reports."
            />
            <FeatureCard
              icon={<FileCheck className="h-10 w-10 text-amber-500" />}
              title="Secure & Compliant"
              description="HIPAA/GDPR compliant platform with end-to-end encryption for patient data protection."
            />
            <div className="flex flex-col items-center justify-center p-6 bg-blue-50 dark:bg-gray-900 rounded-lg">
              <div className="space-y-2 text-center">
                <h3 className="text-xl font-bold">Ready to transform healthcare?</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Join thousands of healthcare professionals using MediAI.
                </p>
                <Button asChild>
                  <Link href="/auth/register">Sign Up Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
      <div className="mb-4">{icon}</div>
      <div className="space-y-2">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </div>
  )
}

