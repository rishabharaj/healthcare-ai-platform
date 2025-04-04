import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Brain, Activity, Lock, Server, Globe } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About MediAI</h1>

        <div className="prose dark:prose-invert max-w-none mb-8">
          <p className="text-lg">
            MediAI is an advanced healthcare platform that leverages artificial intelligence to provide disease
            prediction, medical fact verification, and patient data analysis. Our mission is to empower both healthcare
            professionals and patients with accurate, evidence-based medical information.
          </p>
        </div>

        <Tabs defaultValue="features" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="features">Key Features</TabsTrigger>
            <TabsTrigger value="technology">Technology</TabsTrigger>
            <TabsTrigger value="security">Security & Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="features">
            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
                <CardDescription>Discover how MediAI can transform healthcare delivery</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Disease Prediction</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Our AI analyzes symptoms, lab reports, and medical history to predict possible diseases with
                    confidence scores, providing recommendations and precautions.
                  </p>
                </div>

                <div className="flex flex-col space-y-2">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Medical Fact Verification</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Verify health-related claims against trusted medical sources like WHO, CDC, and PubMed to combat
                    misinformation and make informed decisions.
                  </p>
                </div>

                <div className="flex flex-col space-y-2">
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Patient Data Analysis</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Securely collect and analyze patient data to identify trends and generate insights, helping
                    healthcare providers make better decisions.
                  </p>
                </div>

                <div className="flex flex-col space-y-2">
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Hospital Integration</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Seamlessly integrate with hospital systems through our API, enabling features like symptom checking,
                    appointment booking, and medical report analysis.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technology">
            <Card>
              <CardHeader>
                <CardTitle>Technology Stack</CardTitle>
                <CardDescription>The cutting-edge technologies powering MediAI</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Artificial Intelligence</h3>
                  <p className="text-sm text-muted-foreground">
                    MediAI uses advanced large language models and machine learning algorithms trained on vast amounts
                    of medical literature, clinical guidelines, and research papers. Our models are continuously updated
                    to reflect the latest medical knowledge.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Data Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    Our platform employs sophisticated data processing techniques to analyze medical reports, images,
                    and patient data. We use natural language processing to extract meaningful insights from
                    unstructured medical text.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Security Infrastructure</h3>
                  <p className="text-sm text-muted-foreground">
                    MediAI is built on a secure, scalable cloud infrastructure with end-to-end encryption, regular
                    security audits, and compliance with healthcare data protection standards.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Integration Capabilities</h3>
                  <p className="text-sm text-muted-foreground">
                    Our API and integration tools allow seamless connection with existing hospital management systems,
                    electronic health records, and other healthcare software.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security & Privacy</CardTitle>
                <CardDescription>How we protect your sensitive medical information</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Data Encryption</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    All patient data is encrypted both in transit and at rest using industry-standard encryption
                    protocols, ensuring your information remains secure.
                  </p>
                </div>

                <div className="flex flex-col space-y-2">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Compliance</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    MediAI is fully compliant with HIPAA, GDPR, and other relevant healthcare data protection
                    regulations, with regular compliance audits.
                  </p>
                </div>

                <div className="flex flex-col space-y-2">
                  <div className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Secure Infrastructure</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Our platform is hosted on secure, redundant servers with regular security updates, penetration
                    testing, and vulnerability assessments.
                  </p>
                </div>

                <div className="flex flex-col space-y-2">
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Access Controls</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Strict role-based access controls ensure that only authorized personnel can access sensitive patient
                    information, with comprehensive audit logs.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              At MediAI, we believe that artificial intelligence can transform healthcare by making accurate medical
              information more accessible, helping healthcare professionals make better decisions, and empowering
              patients to take control of their health. Our mission is to develop AI-powered tools that enhance
              healthcare delivery while maintaining the highest standards of accuracy, privacy, and security.
            </p>
            <p className="text-muted-foreground mt-4">
              We are committed to continuous improvement, regularly updating our AI models with the latest medical
              research and expanding our capabilities to address the evolving needs of the healthcare community.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

