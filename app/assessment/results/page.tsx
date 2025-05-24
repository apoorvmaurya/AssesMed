"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  ArrowRight,
  Download, 
  Share2, 
  AlertTriangle, 
  Clipboard,
  ChevronRight,
  Info
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
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

// Mock disease prediction results
const predictionResults = [
  { name: "Seasonal Allergies", probability: 0.82 },
  { name: "Common Cold", probability: 0.35 },
  { name: "Sinusitis", probability: 0.12 },
  { name: "Influenza", probability: 0.05 },
];

// Mock doctor recommendation data
const doctorRecommendations = [
  {
    specialty: "Allergist",
    urgency: "Within 2 weeks",
    reason: "To address potential seasonal allergy symptoms and consider treatment options"
  }
];

// Mock lifestyle recommendations
const lifestyleRecommendations = [
  "Increase water intake to stay hydrated",
  "Consider using air purifiers to reduce indoor allergens",
  "Monitor symptoms and note any patterns related to specific environments",
  "Avoid known allergens when possible",
  "Consider over-the-counter antihistamines after consulting with a healthcare provider"
];

// Mock follow-up recommendations
const followUpRecommendations = [
  "Track your symptoms daily for the next two weeks",
  "Note any changes in severity or new symptoms",
  "Schedule an appointment with an allergist",
  "Return for a follow-up assessment in 1 month"
];

// Mock detailed prediction data for charts
const detailedPredictionData = [
  { name: "Allergic Rhinitis", value: 82 },
  { name: "Common Cold", value: 35 },
  { name: "Sinusitis", value: 12 },
  { name: "Influenza", value: 5 },
];

// Symptom correlation data for bar chart
const symptomCorrelationData = [
  { symptom: "Nasal Congestion", correlation: 0.92 },
  { symptom: "Sneezing", correlation: 0.89 },
  { symptom: "Watery Eyes", correlation: 0.78 },
  { symptom: "Headache", correlation: 0.45 },
  { symptom: "Fatigue", correlation: 0.32 },
];

// Colors for pie chart
const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

export default function AssessmentResultsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  
  useEffect(() => {
    // Simulate loading and analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsLoading(false);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
    
    return () => clearInterval(progressInterval);
  }, []);

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

  // Function to handle sharing results
  const handleShareResults = () => {
    alert("Share functionality would be implemented here in a production app");
  };

  // Function to handle downloading results
  const handleDownloadResults = () => {
    alert("Download functionality would be implemented here in a production app");
  };

  if (isLoading) {
    return (
      <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <CardTitle>Analyzing Your Health Data</CardTitle>
            <CardDescription>
              Our ML algorithms are processing your assessment data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pb-8">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Analysis progress</span>
                <span>{analysisProgress}%</span>
              </div>
              <Progress value={analysisProgress} className="h-2" />
            </div>
            
            <div className="flex flex-col items-center justify-center space-y-3 pt-4">
              <div className="relative h-24 w-24">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {analysisProgress < 30 && "Processing your symptoms..."}
                {analysisProgress >= 30 && analysisProgress < 60 && "Analyzing medical history..."}
                {analysisProgress >= 60 && analysisProgress < 90 && "Generating predictions..."}
                {analysisProgress >= 90 && "Finalizing your results..."}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container relative flex flex-col py-8 md:py-12">
      <Button asChild variant="ghost" className="absolute left-4 top-4">
        <Link href="/assessment" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Assessment
        </Link>
      </Button>
      
      <div className="mx-auto w-full max-w-5xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Your Health Assessment Results</h1>
              <p className="text-muted-foreground">
                Based on your provided information, here are your personalized health insights
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleShareResults}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownloadResults}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Alert className="bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800">
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <AlertTitle>Important Disclaimer</AlertTitle>
              <AlertDescription>
                This assessment is not a medical diagnosis. The information provided is for educational purposes only and should not replace professional medical advice. Please consult with a healthcare provider for proper diagnosis and treatment.
              </AlertDescription>
            </Alert>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Prediction Results</CardTitle>
                <CardDescription>
                  Based on your symptoms and health information, our AI suggests the following possible conditions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-6">
                    {predictionResults.map((result, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{result.name}</span>
                          <span className="text-sm">{Math.round(result.probability * 100)}% match</span>
                        </div>
                        <Progress value={result.probability * 100} className="h-2" 
                          style={{
                            background: index === 0 ? 'hsl(var(--muted))' : '',
                            '--tw-bg-opacity': index === 0 ? 1 : 0.5
                          }} 
                        />
                        {index === 0 && (
                          <p className="text-sm text-muted-foreground mt-1">
                            Primary prediction based on symptom pattern analysis
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={detailedPredictionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {detailedPredictionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Summary</CardTitle>
                    <CardDescription>
                      Key findings from your health assessment
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium text-lg">Primary Prediction: Seasonal Allergies</h3>
                      <p className="text-muted-foreground">
                        Your reported symptoms of nasal congestion, sneezing, and watery eyes align strongly with seasonal allergies, particularly given your reported history and the timing of symptoms.
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium text-lg">Key Factors</h3>
                      <ul className="mt-2 space-y-2">
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span>Your reported symptoms have a strong correlation with allergic reactions</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span>The seasonal nature of your symptoms suggests environmental triggers</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span>Family history of allergies increases the likelihood of this condition</span>
                        </li>
                      </ul>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium text-lg">Recommended Next Steps</h3>
                      <ul className="mt-2 space-y-2">
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span>Consult with an allergist for proper testing and diagnosis</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span>Track your symptoms and note potential environmental triggers</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span>Consider lifestyle modifications to reduce exposure to allergens</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="detailed" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Analysis</CardTitle>
                    <CardDescription>
                      In-depth breakdown of your health assessment data
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium text-lg mb-4">Symptom Correlation Analysis</h3>
                      <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={symptomCorrelationData}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" domain={[0, 1]} tickFormatter={(tick) => `${(tick * 100).toFixed(0)}%`} />
                            <YAxis dataKey="symptom" type="category" />
                            <Tooltip formatter={(value) => `${(value * 100).toFixed(0)}%`} />
                            <Bar dataKey="correlation" fill="hsl(var(--primary))" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Correlation between your reported symptoms and predicted conditions
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium text-lg">Condition Specifics</h3>
                      <Accordion type="single" collapsible className="mt-2">
                        <AccordionItem value="allergies">
                          <AccordionTrigger>Seasonal Allergies (82% match)</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2">
                              <p>
                                Seasonal allergies, also known as allergic rhinitis or hay fever, occur when your immune system overreacts to airborne substances like pollen, resulting in symptoms such as sneezing, itchy eyes, and nasal congestion.
                              </p>
                              <div className="mt-2">
                                <h4 className="font-medium">Matching Factors:</h4>
                                <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                                  <li>Nasal congestion and sneezing (92% correlation)</li>
                                  <li>Watery eyes (78% correlation)</li>
                                  <li>Seasonal pattern of symptoms</li>
                                  <li>Family history of allergic conditions</li>
                                </ul>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="cold">
                          <AccordionTrigger>Common Cold (35% match)</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2">
                              <p>
                                The common cold is a viral infection of your nose and throat (upper respiratory tract). Many types of viruses can cause a common cold, which typically resolves within 7-10 days.
                              </p>
                              <div className="mt-2">
                                <h4 className="font-medium">Matching Factors:</h4>
                                <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                                  <li>Nasal congestion (moderate correlation)</li>
                                  <li>Fatigue (low correlation)</li>
                                </ul>
                              </div>
                              <div className="mt-2">
                                <h4 className="font-medium">Non-Matching Factors:</h4>
                                <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                                  <li>Lack of fever typically associated with colds</li>
                                  <li>Seasonal pattern (colds are more random)</li>
                                  <li>Duration of symptoms longer than typical cold</li>
                                </ul>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sinusitis">
                          <AccordionTrigger>Sinusitis (12% match)</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2">
                              <p>
                                Sinusitis is an inflammation of the tissue lining the sinuses, which can be caused by infection, allergies, or autoimmune issues.
                              </p>
                              <div className="mt-2">
                                <h4 className="font-medium">Matching Factors:</h4>
                                <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                                  <li>Nasal congestion (moderate correlation)</li>
                                  <li>Headache (low correlation)</li>
                                </ul>
                              </div>
                              <div className="mt-2">
                                <h4 className="font-medium">Non-Matching Factors:</h4>
                                <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                                  <li>Lack of facial pain or pressure</li>
                                  <li>No reported thick nasal discharge</li>
                                  <li>Symptoms pattern more consistent with allergies</li>
                                </ul>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium text-lg">Risk Factors Analysis</h3>
                      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-muted/30 rounded-lg p-4">
                          <h4 className="font-medium">Contributing Factors</h4>
                          <ul className="mt-2 space-y-2 text-sm">
                            <li className="flex items-start">
                              <Info className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                              <span>Family history of allergic conditions</span>
                            </li>
                            <li className="flex items-start">
                              <Info className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                              <span>Environmental exposure based on lifestyle</span>
                            </li>
                            <li className="flex items-start">
                              <Info className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                              <span>Seasonal pattern of symptoms</span>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-muted/30 rounded-lg p-4">
                          <h4 className="font-medium">Protective Factors</h4>
                          <ul className="mt-2 space-y-2 text-sm">
                            <li className="flex items-start">
                              <Info className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                              <span>Regular physical activity</span>
                            </li>
                            <li className="flex items-start">
                              <Info className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                              <span>Non-smoking status</span>
                            </li>
                            <li className="flex items-start">
                              <Info className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                              <span>Balanced diet with minimal processed foods</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="recommendations" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recommendations</CardTitle>
                    <CardDescription>
                      Personalized suggestions based on your assessment results
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium text-lg">Medical Consultation</h3>
                      {doctorRecommendations.map((rec, index) => (
                        <div key={index} className="mt-2 bg-muted/30 rounded-lg p-4">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                            <div>
                              <span className="font-medium">Recommended Specialist:</span>
                              <span className="ml-2">{rec.specialty}</span>
                            </div>
                            <div>
                              <span className="font-medium">Suggested Timeframe:</span>
                              <span className="ml-2">{rec.urgency}</span>
                            </div>
                          </div>
                          <div className="mt-2">
                            <span className="font-medium">Reason:</span>
                            <p className="mt-1 text-sm">{rec.reason}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium text-lg">Lifestyle Modifications</h3>
                      <ul className="mt-2 space-y-2">
                        {lifestyleRecommendations.map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium text-lg">Follow-up Recommendations</h3>
                      <ul className="mt-2 space-y-2">
                        {followUpRecommendations.map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium text-lg">Educational Resources</h3>
                      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Card className="card-hover">
                          <CardContent className="pt-6">
                            <h4 className="font-medium">Understanding Allergies</h4>
                            <p className="mt-1 text-sm text-muted-foreground">
                              Learn about seasonal allergies, their causes, and management strategies
                            </p>
                            <Button variant="link" className="mt-2 p-0 h-auto" asChild>
                              <Link href="#">
                                Read more
                                <ArrowRight className="ml-1 h-3 w-3" />
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                        <Card className="card-hover">
                          <CardContent className="pt-6">
                            <h4 className="font-medium">Allergy Testing Guide</h4>
                            <p className="mt-1 text-sm text-muted-foreground">
                              Information about allergy testing procedures and what to expect
                            </p>
                            <Button variant="link" className="mt-2 p-0 h-auto" asChild>
                              <Link href="#">
                                Read more
                                <ArrowRight className="ml-1 h-3 w-3" />
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/dashboard">
                <Clipboard className="mr-2 h-4 w-4" />
                Save to Dashboard
              </Link>
            </Button>
            <Button asChild>
              <Link href="/assessment">
                Start New Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}