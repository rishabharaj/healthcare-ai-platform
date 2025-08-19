import type React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Brain, Shield, Activity, Hospital, FileCheck } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-slate-900 dark:via-blue-950 dark:to-teal-950 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container px-4 md:px-6 mx-auto relative">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Trusted by Healthcare Professionals
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl/none bg-gradient-to-r from-primary via-medical-teal to-medical-green bg-clip-text text-transparent">
                AI-Powered Healthcare Platform
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl lg:text-2xl leading-relaxed">
                Empowering healthcare with advanced AI for disease prediction, medical fact verification, and patient
                data analysis.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="health-gradient text-white hover:shadow-lg hover:scale-105 transition-all duration-200">
                <Link href="/auth/register">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Comprehensive Healthcare AI Solutions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Discover how our advanced AI technology transforms healthcare delivery and patient outcomes
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Brain className="h-12 w-12 text-medical-blue" />}
              title="Disease Prediction"
              description="AI-powered analysis of symptoms, lab reports, and medical history to predict possible diseases with confidence scores."
            />
            <FeatureCard
              icon={<Shield className="h-12 w-12 text-medical-green" />}
              title="Medical Fact Verification"
              description="Verify health-related claims against trusted medical sources like WHO, CDC, and PubMed."
            />
            <FeatureCard
              icon={<Activity className="h-12 w-12 text-health-error" />}
              title="Patient Data Analysis"
              description="Secure collection and analysis of patient data with visualizations for better healthcare decisions."
            />
            <FeatureCard
              icon={<Hospital className="h-12 w-12 text-medical-teal" />}
              title="Hospital Integration"
              description="Seamless API integration with hospital systems for symptom checking, appointments, and medical reports."
            />
            <FeatureCard
              icon={<FileCheck className="h-12 w-12 text-health-warning" />}
              title="Secure & Compliant"
              description="HIPAA/GDPR compliant platform with end-to-end encryption for patient data protection."
            />
            <div className="health-card-hover flex flex-col items-center justify-center p-8 bg-gradient-to-br from-primary/5 to-medical-teal/5 border-primary/20">
              <div className="space-y-4 text-center">
                <h3 className="text-xl font-bold text-primary">Ready to transform healthcare?</h3>
                <p className="text-muted-foreground">
                  Join thousands of healthcare professionals using MediAI.
                </p>
                <Button asChild className="health-gradient text-white hover:scale-105 transition-all duration-200">
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
    <div className="health-card-hover flex flex-col items-center text-center p-8 group">
      <div className="mb-6 p-4 rounded-2xl bg-background border group-hover:border-primary/20 transition-all duration-200">{icon}</div>
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

