"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  BarChart as BarChartIcon, 
  Calendar, 
  Clock, 
  FileText, 
  Plus, 
  Stethoscope,
  Activity,
  Filter,
  ChevronDown
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";

// Mock assessment history data
const assessmentHistory = [
  {
    id: "001",
    date: "2025-04-01",
    time: "10:23 AM",
    primaryPrediction: "Seasonal Allergies",
    probability: 0.82,
    status: "completed"
  },
  {
    id: "002",
    date: "2025-03-15",
    time: "3:45 PM",
    primaryPrediction: "Common Cold",
    probability: 0.76,
    status: "completed"
  },
  {
    id: "003",
    date: "2025-02-28",
    time: "9:12 AM",
    primaryPrediction: "Migraine",
    probability: 0.89,
    status: "completed"
  }
];

// Mock health metrics data for charts
const monthlySymptomData = [
  { name: "Jan", value: 3 },
  { name: "Feb", value: 4 },
  { name: "Mar", value: 2 },
  { name: "Apr", value: 5 },
  { name: "May", value: 3 },
  { name: "Jun", value: 1 },
  { name: "Jul", value: 0 },
  { name: "Aug", value: 2 },
  { name: "Sep", value: 4 },
  { name: "Oct", value: 6 },
  { name: "Nov", value: 3 },
  { name: "Dec", value: 2 },
];

const healthMetricsData = [
  { name: "Week 1", "Headache": 3, "Fatigue": 4, "Allergy": 2 },
  { name: "Week 2", "Headache": 2, "Fatigue": 3, "Allergy": 4 },
  { name: "Week 3", "Headache": 4, "Fatigue": 2, "Allergy": 5 },
  { name: "Week 4", "Headache": 1, "Fatigue": 3, "Allergy": 3 },
];

// Mock upcoming appointments
const upcomingAppointments = [
  {
    id: "appt1",
    doctor: "Dr. Sarah Chen",
    specialty: "Allergist",
    date: "2025-04-15",
    time: "10:30 AM",
    status: "confirmed"
  },
  {
    id: "appt2",
    doctor: "Dr. Michael Rodriguez",
    specialty: "General Practitioner",
    date: "2025-04-28",
    time: "2:15 PM",
    status: "pending"
  }
];

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("6m");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="container py-8 md:py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold">Health Dashboard</h1>
            <p className="text-muted-foreground">
              Track your health journey and assessment results
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/assessment">
                <Plus className="mr-2 h-4 w-4" />
                New Assessment
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>All Assessments</DropdownMenuItem>
                <DropdownMenuItem>Recent (30 days)</DropdownMenuItem>
                <DropdownMenuItem>High Priority</DropdownMenuItem>
                <DropdownMenuItem>Follow-ups Required</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-primary/5 dark:bg-primary/10 card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold">12</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  3 in the last 30 days
                </p>
              </CardContent>
            </Card>
            <Card className="bg-secondary/5 dark:bg-secondary/10 card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Doctor Visits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-secondary" />
                  <span className="text-2xl font-bold">4</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  2 upcoming appointments
                </p>
              </CardContent>
            </Card>
            <Card className="bg-accent/5 dark:bg-accent/10 card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Health Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-accent" />
                  <span className="text-2xl font-bold">82/100</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Improved by 5 points since last month
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Tabs defaultValue="history">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="history">Assessment History</TabsTrigger>
              <TabsTrigger value="metrics">Health Metrics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="history" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Your Assessment History</CardTitle>
                  <CardDescription>
                    View and manage your past health assessments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assessmentHistory.map((assessment) => (
                      <div 
                        key={assessment.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" />
                            <h3 className="font-medium">{assessment.primaryPrediction}</h3>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                              {Math.round(assessment.probability * 100)}% match
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(assessment.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{assessment.time}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-2 sm:mt-0">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/assessment/results?id=${assessment.id}`}>
                              View Details
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View All Assessments
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>
                    Manage your scheduled medical appointments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div 
                        key={appointment.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Stethoscope className="h-4 w-4 text-secondary" />
                            <h3 className="font-medium">{appointment.doctor}</h3>
                            <span className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">
                              {appointment.specialty}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(appointment.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{appointment.time}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-2 sm:mt-0">
                          <Button 
                            variant={appointment.status === "confirmed" ? "secondary" : "outline"} 
                            size="sm"
                          >
                            {appointment.status === "confirmed" ? "Confirmed" : "Confirm"}
                          </Button>
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Schedule Appointment
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="metrics" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <CardTitle>Symptom Frequency</CardTitle>
                      <CardDescription>
                        Track symptom occurrence over time
                      </CardDescription>
                    </div>
                    <div className="flex gap-1 bg-muted rounded-md p-1">
                      <Button 
                        variant={selectedPeriod === "3m" ? "secondary" : "ghost"} 
                        size="sm"
                        onClick={() => setSelectedPeriod("3m")}
                      >
                        3M
                      </Button>
                      <Button 
                        variant={selectedPeriod === "6m" ? "secondary" : "ghost"} 
                        size="sm"
                        onClick={() => setSelectedPeriod("6m")}
                      >
                        6M
                      </Button>
                      <Button 
                        variant={selectedPeriod === "1y" ? "secondary" : "ghost"} 
                        size="sm"
                        onClick={() => setSelectedPeriod("1y")}
                      >
                        1Y
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={monthlySymptomData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="hsl(var(--primary))" name="Symptom Episodes" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Symptom Trends</CardTitle>
                  <CardDescription>
                    Track specific symptoms over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={healthMetricsData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Headache" stroke="hsl(var(--primary))" />
                        <Line type="monotone" dataKey="Fatigue" stroke="hsl(var(--secondary))" />
                        <Line type="monotone" dataKey="Allergy" stroke="hsl(var(--accent))" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Health Insights</CardTitle>
                    <CardDescription>
                      Key observations from your health data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <BarChartIcon className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>Your allergy symptoms show a seasonal pattern, with peaks in April and October</span>
                      </li>
                      <li className="flex items-start">
                        <BarChartIcon className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>Headache frequency has decreased by 40% in the last 3 months</span>
                      </li>
                      <li className="flex items-start">
                        <BarChartIcon className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>Your overall health score has improved by 8% since you started tracking</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recommendations</CardTitle>
                    <CardDescription>
                      Personalized health suggestions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Stethoscope className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                        <span>Consider an allergy test before the spring season begins</span>
                      </li>
                      <li className="flex items-start">
                        <Stethoscope className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                        <span>Schedule a follow-up with your allergist in September</span>
                      </li>
                      <li className="flex items-start">
                        <Stethoscope className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                        <span>Track your water intake to help with your recurring headaches</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  );
}