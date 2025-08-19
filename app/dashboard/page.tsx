"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts"
import {
  Activity,
  Users,
  FileText,
  AlertCircle,
  Calendar,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  User,
  Stethoscope,
} from "lucide-react"
import Link from "next/link"

// Mock data for the dashboard
const patientData = [
  { name: "Jan", count: 65 },
  { name: "Feb", count: 78 },
  { name: "Mar", count: 90 },
  { name: "Apr", count: 81 },
  { name: "May", count: 86 },
  { name: "Jun", count: 94 },
]

const diseaseData = [
  { name: "Hypertension", value: 35 },
  { name: "Diabetes", value: 25 },
  { name: "Asthma", value: 18 },
  { name: "Heart Disease", value: 15 },
  { name: "Others", value: 7 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

const activityData = [
  { day: "Mon", predictions: 12, verifications: 8 },
  { day: "Tue", predictions: 19, verifications: 11 },
  { day: "Wed", predictions: 15, verifications: 13 },
  { day: "Thu", predictions: 21, verifications: 18 },
  { day: "Fri", predictions: 25, verifications: 20 },
  { day: "Sat", predictions: 18, verifications: 15 },
  { day: "Sun", predictions: 14, verifications: 10 },
]

const recentPredictions = [
  { id: 1, patient: "John Doe", disease: "Influenza", confidence: 87, date: "2023-06-15" },
  { id: 2, patient: "Jane Smith", disease: "Migraine", confidence: 92, date: "2023-06-14" },
  { id: 3, patient: "Robert Johnson", disease: "Allergic Rhinitis", confidence: 78, date: "2023-06-13" },
]

const upcomingAppointments = [
  { id: 1, patient: "Emily Wilson", time: "10:00 AM", date: "2023-06-18", type: "Follow-up" },
  { id: 2, patient: "Michael Brown", time: "2:30 PM", date: "2023-06-19", type: "Consultation" },
  { id: 3, patient: "Sarah Davis", time: "11:15 AM", date: "2023-06-20", type: "Check-up" },
]

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login?callbackUrl=/dashboard")
    }
  }, [user, loading, router])

  if (loading || !user) {
    return <div className="container py-8">Loading...</div>
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-medical-teal bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">Your healthcare analytics overview</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Welcome back,</div>
          <div className="font-semibold text-lg text-primary">
            {user.name}
            <span className="text-sm text-muted-foreground ml-2">({user.userType})</span>
          </div>
        </div>
      </div>

      {user.userType === "doctor" ? <DoctorDashboard /> : <PatientDashboard />}
    </div>
  )
}

function DoctorDashboard() {
  return (
    <>
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="health-card-hover border-l-4 border-l-medical-blue">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Total Patients</p>
              <div className="p-2 rounded-lg bg-medical-blue/10">
                <Users className="h-5 w-5 text-medical-blue" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-3xl font-bold text-medical-blue">1,248</h3>
              <div className="flex items-center text-sm text-health-success">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span className="font-semibold">12%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-health-success font-medium">+86</span> this month
            </p>
          </CardContent>
        </Card>

        <Card className="health-card-hover border-l-4 border-l-medical-teal">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Disease Predictions</p>
              <div className="p-2 rounded-lg bg-medical-teal/10">
                <Activity className="h-5 w-5 text-medical-teal" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-3xl font-bold text-medical-teal">3,427</h3>
              <div className="flex items-center text-sm text-health-success">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span className="font-semibold">8%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-health-success font-medium">+124</span> this week
            </p>
          </CardContent>
        </Card>

        <Card className="health-card-hover border-l-4 border-l-medical-green">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Fact Verifications</p>
              <div className="p-2 rounded-lg bg-medical-green/10">
                <FileText className="h-5 w-5 text-medical-green" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-3xl font-bold text-medical-green">2,856</h3>
              <div className="flex items-center text-sm text-health-success">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span className="font-semibold">15%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-health-success font-medium">+95</span> this week
            </p>
          </CardContent>
        </Card>

        <Card className="health-card-hover border-l-4 border-l-health-warning">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Appointments</p>
              <div className="p-2 rounded-lg bg-health-warning/10">
                <Calendar className="h-5 w-5 text-health-warning" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-3xl font-bold text-health-warning">42</h3>
              <div className="flex items-center text-sm text-health-error">
                <ArrowDownRight className="h-4 w-4 mr-1" />
                <span className="font-semibold">3%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-health-success font-medium">8</span> today
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card className="health-card-hover">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-medical-blue/10">
                <Users className="h-4 w-4 text-medical-blue" />
              </div>
              Patient Growth
            </CardTitle>
            <CardDescription>Number of new patients over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={patientData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--medical-blue))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="health-card-hover">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-medical-teal/10">
                <Activity className="h-4 w-4 text-medical-teal" />
              </div>
              Disease Distribution
            </CardTitle>
            <CardDescription>Most common diseases diagnosed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={diseaseData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="hsl(var(--medical-teal))"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {diseaseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Chart */}
      <Card className="mb-6 health-card-hover">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-medical-green/10">
              <Activity className="h-4 w-4 text-medical-green" />
            </div>
            Weekly Activity
          </CardTitle>
          <CardDescription>Disease predictions and fact verifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="predictions" 
                  stroke="hsl(var(--medical-blue))" 
                  strokeWidth={3}
                  activeDot={{ r: 6, fill: 'hsl(var(--medical-blue))' }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="verifications" 
                  stroke="hsl(var(--medical-green))"
                  strokeWidth={3}
                  activeDot={{ r: 6, fill: 'hsl(var(--medical-green))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity and Appointments */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="health-card-hover">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-medical-blue/10">
                <Activity className="h-4 w-4 text-medical-blue" />
              </div>
              Recent Predictions
            </CardTitle>
            <CardDescription>Latest disease predictions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPredictions.map((prediction) => (
                <div key={prediction.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 border border-transparent hover:border-primary/20">
                  <div>
                    <p className="font-medium text-foreground">{prediction.patient}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Activity className="h-3 w-3 mr-1 text-medical-blue" />
                      <span>{prediction.disease}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-medical-blue">{prediction.confidence}%</p>
                    <p className="text-xs text-muted-foreground">{prediction.date}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200" asChild>
                <Link href="/predictions">View All Predictions</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="health-card-hover">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-health-warning/10">
                <Calendar className="h-4 w-4 text-health-warning" />
              </div>
              Upcoming Appointments
            </CardTitle>
            <CardDescription>Scheduled patient appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 border border-transparent hover:border-primary/20">
                  <div>
                    <p className="font-medium text-foreground">{appointment.patient}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1 text-health-warning" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-health-warning">{appointment.type}</p>
                    <p className="text-xs text-muted-foreground">{appointment.date}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200" asChild>
                <Link href="/appointments">View All Appointments</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

function PatientDashboard() {
  // Mock data for patient dashboard
  const healthMetrics = [
    { date: "Jan", bloodPressure: 120, heartRate: 72 },
    { date: "Feb", bloodPressure: 118, heartRate: 70 },
    { date: "Mar", bloodPressure: 122, heartRate: 74 },
    { date: "Apr", bloodPressure: 119, heartRate: 71 },
    { date: "May", bloodPressure: 117, heartRate: 69 },
    { date: "Jun", bloodPressure: 116, heartRate: 68 },
  ]

  const recentPredictionsPatient = [
    { id: 1, date: "2023-06-15", disease: "Common Cold", confidence: 87, status: "Resolved" },
    { id: 2, date: "2023-05-22", disease: "Seasonal Allergies", confidence: 92, status: "Ongoing" },
  ]

  const upcomingAppointmentsPatient = [
    { id: 1, doctor: "Dr. Sarah Johnson", specialty: "General Practitioner", time: "10:00 AM", date: "2023-06-25" },
    { id: 2, doctor: "Dr. Michael Chen", specialty: "Cardiologist", time: "2:30 PM", date: "2023-07-10" },
  ]

  return (
    <>
      <div className="mb-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Welcome back! Your next appointment is scheduled for June 25th at 10:00 AM with Dr. Sarah Johnson.
          </AlertDescription>
        </Alert>
      </div>

      {/* Health Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Blood Pressure</p>
              <Activity className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold">116/75</h3>
              <div className="flex items-center text-sm text-green-500">
                <ArrowDownRight className="h-4 w-4 mr-1" />
                <span>Normal</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Last checked: Today</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Heart Rate</p>
              <Activity className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold">68 bpm</h3>
              <div className="flex items-center text-sm text-green-500">
                <ArrowDownRight className="h-4 w-4 mr-1" />
                <span>Resting</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Last checked: Today</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Upcoming Appointments</p>
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold">2</h3>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Next: June 25th</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Health Score</p>
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold">92/100</h3>
              <div className="flex items-center text-sm text-green-500">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>Good</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">+3 from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Health Metrics Chart */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Health Metrics History</CardTitle>
          <CardDescription>Blood pressure and heart rate over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="bloodPressure"
                  name="Blood Pressure (systolic)"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line yAxisId="right" type="monotone" dataKey="heartRate" name="Heart Rate (bpm)" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Predictions and Appointments */}
      <Tabs defaultValue="predictions" className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="predictions">Health Predictions</TabsTrigger>
          <TabsTrigger value="appointments">My Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions">
          <Card>
            <CardHeader>
              <CardTitle>Recent Health Predictions</CardTitle>
              <CardDescription>Based on your symptoms and health data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPredictionsPatient.map((prediction) => (
                  <div key={prediction.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{prediction.disease}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Activity className="h-3 w-3 mr-1" />
                        <span>Confidence: {prediction.confidence}%</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{prediction.status}</p>
                      <p className="text-xs text-muted-foreground">{prediction.date}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/disease-prediction">New Prediction</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Your scheduled doctor visits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointmentsPatient.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{appointment.doctor}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Stethoscope className="h-3 w-3 mr-1" />
                        <span>{appointment.specialty}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{appointment.time}</p>
                      <p className="text-xs text-muted-foreground">{appointment.date}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/appointments/schedule">Schedule Appointment</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Health Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Personalized Health Tips</CardTitle>
          <CardDescription>Based on your health profile and recent activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <h3 className="font-medium mb-2">Stay Hydrated</h3>
              <p className="text-sm text-muted-foreground">
                Based on your activity level, aim to drink at least 8 glasses of water daily to maintain optimal
                hydration.
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <h3 className="font-medium mb-2">Exercise Recommendation</h3>
              <p className="text-sm text-muted-foreground">
                Consider adding 20 minutes of moderate cardio exercise 3 times a week to improve your cardiovascular
                health.
              </p>
            </div>
            <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
              <h3 className="font-medium mb-2">Seasonal Allergy Alert</h3>
              <p className="text-sm text-muted-foreground">
                Pollen counts are high in your area. If you experience allergy symptoms, consider taking your prescribed
                antihistamine.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

