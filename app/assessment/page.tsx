"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

// Define the steps in the assessment
const assessmentSteps = [
  {
    id: "personal",
    name: "Personal Information",
    fields: ["age", "gender", "height", "weight"],
  },
  {
    id: "medical",
    name: "Medical History",
    fields: ["existingConditions", "medications", "familyHistory"],
  },
  {
    id: "symptoms",
    name: "Current Symptoms",
    fields: ["mainSymptom", "symptomsIntensity", "symptomsFrequency", "additionalSymptoms"],
  },
  {
    id: "lifestyle",
    name: "Lifestyle Factors",
    fields: ["smokingStatus", "alcoholConsumption", "physicalActivity", "dietType"],
  },
  {
    id: "review",
    name: "Review & Submit",
  },
];

// Form schema for personal information
const personalSchema = z.object({
  age: z.string().min(1, { message: "Age is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  height: z.string().min(1, { message: "Height is required" }),
  weight: z.string().min(1, { message: "Weight is required" }),
});

// Form schema for medical history
const medicalSchema = z.object({
  existingConditions: z.array(z.string()).optional(),
  medications: z.string().optional(),
  familyHistory: z.array(z.string()).optional(),
});

// Form schema for symptoms
const symptomsSchema = z.object({
  mainSymptom: z.string().min(1, { message: "Main symptom is required" }),
  symptomsIntensity: z.string().min(1, { message: "Symptom intensity is required" }),
  symptomsFrequency: z.string().min(1, { message: "Symptom frequency is required" }),
  additionalSymptoms: z.array(z.string()).optional(),
});

// Form schema for lifestyle
const lifestyleSchema = z.object({
  smokingStatus: z.string().min(1, { message: "Smoking status is required" }),
  alcoholConsumption: z.string().min(1, { message: "Alcohol consumption is required" }),
  physicalActivity: z.string().min(1, { message: "Physical activity level is required" }),
  dietType: z.string().min(1, { message: "Diet type is required" }),
});

// Combined form schema
const formSchema = z.object({
  ...personalSchema.shape,
  ...medicalSchema.shape,
  ...symptomsSchema.shape,
  ...lifestyleSchema.shape,
});

type FormValues = z.infer<typeof formSchema>;

const commonConditions = [
  "Diabetes",
  "Hypertension",
  "Asthma",
  "Heart Disease",
  "Cancer",
  "Thyroid Disorder",
  "Arthritis",
  "None",
];

const commonSymptoms = [
  "Fever",
  "Headache",
  "Fatigue",
  "Nausea",
  "Dizziness",
  "Shortness of breath",
  "Chest pain",
  "Joint pain",
  "Rash",
  "Abdominal pain",
];

export default function AssessmentPage() {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(
      step === 0 ? personalSchema :
      step === 1 ? medicalSchema :
      step === 2 ? symptomsSchema :
      step === 3 ? lifestyleSchema :
      formSchema
    ),
    defaultValues: {
      age: "",
      gender: "",
      height: "",
      weight: "",
      existingConditions: [],
      medications: "",
      familyHistory: [],
      mainSymptom: "",
      symptomsIntensity: "",
      symptomsFrequency: "",
      additionalSymptoms: [],
      smokingStatus: "",
      alcoholConsumption: "",
      physicalActivity: "",
      dietType: "",
    },
  });

  function getStepSchema(step: number) {
    switch(step) {
      case 0: return personalSchema;
      case 1: return medicalSchema;
      case 2: return symptomsSchema;
      case 3: return lifestyleSchema;
      default: return formSchema;
    }
  }

  function onSubmit(values: FormValues) {
    if (step < assessmentSteps.length - 1) {
      const currentSchema = getStepSchema(step);
      const stepFields = assessmentSteps[step].fields;
      
      // Extract just the fields for the current step
      const stepValues = Object.fromEntries(
        Object.entries(values).filter(([key]) => stepFields?.includes(key))
      );

      // Validate just those fields
      const result = currentSchema.safeParse(stepValues);
      
      if (result.success) {
        setStep(step + 1);
        setProgress(((step + 1) / (assessmentSteps.length - 1)) * 100);
      }
    } else {
      // Final submission
      console.log("Form submitted", form.getValues());
      
      // Redirect to results page
      router.push("/assessment/results");
    }
  }

  function prevStep() {
    if (step > 0) {
      setStep(step - 1);
      setProgress(((step - 1) / (assessmentSteps.length - 1)) * 100);
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 }
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
    <div className="container relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-8 md:py-12">
      <Button asChild variant="ghost" className="absolute left-4 top-4">
        <Link href="/" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>
      
      <div className="mx-auto flex w-full max-w-3xl flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Health Assessment</h1>
          <p className="text-muted-foreground">Complete the form to receive your health insights</p>
          
          <div className="mt-6 space-y-1">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="mt-6 hidden md:flex justify-between">
            {assessmentSteps.map((assessmentStep, index) => (
              <div key={assessmentStep.id} className="flex flex-col items-center">
                <div 
                  className={`flex h-8 w-8 items-center justify-center rounded-full border text-center text-xs font-medium
                    ${index < step ? 'bg-primary text-primary-foreground border-primary' : 
                      index === step ? 'border-primary text-primary' : 
                      'border-muted-foreground text-muted-foreground'}`}
                >
                  {index < step ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                <span 
                  className={`mt-2 text-xs ${index === step ? 'text-primary font-medium' : 'text-muted-foreground'}`}
                >
                  {assessmentStep.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{assessmentSteps[step].name}</CardTitle>
            <CardDescription>
              {step === 0 && "Tell us a bit about yourself"}
              {step === 1 && "Information about your medical background"}
              {step === 2 && "Tell us about your current symptoms"}
              {step === 3 && "Information about your lifestyle habits"}
              {step === 4 && "Review your information before submission"}
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent>
                {/* Step 1: Personal Information */}
                {step === 0 && (
                  <motion.div
                    key="personal"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-4"
                  >
                    <motion.div variants={itemVariants}>
                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Age</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter your age" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div variants={itemVariants}>
                        <FormField
                          control={form.control}
                          name="height"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Height (cm)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="Enter your height" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>
                      
                      <motion.div variants={itemVariants}>
                        <FormField
                          control={form.control}
                          name="weight"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Weight (kg)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="Enter your weight" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
                
                {/* Step 2: Medical History */}
                {step === 1 && (
                  <motion.div
                    key="medical"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-4"
                  >
                    <motion.div variants={itemVariants}>
                      <FormField
                        control={form.control}
                        name="existingConditions"
                        render={({ field }) => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel>Do you have any existing medical conditions?</FormLabel>
                              <FormDescription>
                                Select all that apply
                              </FormDescription>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {commonConditions.map((condition) => (
                                <FormItem
                                  key={condition}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(condition)}
                                      onCheckedChange={(checked) => {
                                        const updatedValue = checked
                                          ? [...(field.value || []), condition]
                                          : field.value?.filter((value) => value !== condition) || [];
                                        field.onChange(updatedValue);
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {condition}
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <FormField
                        control={form.control}
                        name="medications"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Are you currently taking any medications?
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 ml-2 inline-block text-muted-foreground" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">Include prescription, over-the-counter medications, supplements, and vitamins</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="List medications separated by commas" {...field} />
                            </FormControl>
                            <FormDescription>
                              If none, leave blank or write "None"
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <FormField
                        control={form.control}
                        name="familyHistory"
                        render={({ field }) => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel>Family Medical History</FormLabel>
                              <FormDescription>
                                Select conditions that run in your immediate family
                              </FormDescription>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {commonConditions.map((condition) => (
                                <FormItem
                                  key={condition}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(condition)}
                                      onCheckedChange={(checked) => {
                                        const updatedValue = checked
                                          ? [...(field.value || []), condition]
                                          : field.value?.filter((value) => value !== condition) || [];
                                        field.onChange(updatedValue);
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {condition}
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  </motion.div>
                )}
                
                {/* Step 3: Current Symptoms */}
                {step === 2 && (
                  <motion.div
                    key="symptoms"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-4"
                  >
                    <motion.div variants={itemVariants}>
                      <FormField
                        control={form.control}
                        name="mainSymptom"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>What is your main symptom or concern?</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your main symptom" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {commonSymptoms.map((symptom) => (
                                  <SelectItem key={symptom} value={symptom}>{symptom}</SelectItem>
                                ))}
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <FormField
                        control={form.control}
                        name="symptomsIntensity"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>How severe is your main symptom?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="mild" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Mild - Noticeable but not interfering with daily activities
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="moderate" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Moderate - Some interference with daily activities
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="severe" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Severe - Significant interference with daily activities
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="very-severe" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Very severe - Unable to perform daily activities
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <FormField
                        control={form.control}
                        name="symptomsFrequency"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>How often do you experience this symptom?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="rarely" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Rarely (once a month or less)
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="occasionally" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Occasionally (few times a month)
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="frequently" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Frequently (few times a week)
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="constantly" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Constantly (daily)
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <FormField
                        control={form.control}
                        name="additionalSymptoms"
                        render={({ field }) => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel>Do you have any additional symptoms?</FormLabel>
                              <FormDescription>
                                Select all that apply
                              </FormDescription>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {commonSymptoms.map((symptom) => (
                                <FormItem
                                  key={symptom}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(symptom)}
                                      onCheckedChange={(checked) => {
                                        const updatedValue = checked
                                          ? [...(field.value || []), symptom]
                                          : field.value?.filter((value) => value !== symptom) || [];
                                        field.onChange(updatedValue);
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {symptom}
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  </motion.div>
                )}
                
                {/* Step 4: Lifestyle */}
                {step === 3 && (
                  <motion.div
                    key="lifestyle"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-4"
                  >
                    <motion.div variants={itemVariants}>
                      <FormField
                        control={form.control}
                        name="smokingStatus"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Do you smoke tobacco?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="never" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Never smoked
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="former" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Former smoker
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="current-light" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Current light smoker (less than 10 cigarettes/day)
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="current-heavy" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Current heavy smoker (10+ cigarettes/day)
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <FormField
                        control={form.control}
                        name="alcoholConsumption"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>How often do you consume alcoholic beverages?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="never" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Never
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="occasionally" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Occasionally (less than once a month)
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="monthly" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Monthly (1-4 times a month)
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="weekly" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Weekly (1-3 times a week)
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="daily" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Daily or almost daily
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <FormField
                        control={form.control}
                        name="physicalActivity"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>How would you describe your physical activity level?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="sedentary" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Sedentary (little or no exercise)
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="light" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Light (light exercise/sports 1-3 days/week)
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="moderate" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Moderate (moderate exercise/sports 3-5 days/week)
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="active" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Active (hard exercise/sports 6-7 days/week)
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="very-active" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Very active (very hard exercise, physical job, or training twice a day)
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <FormField
                        control={form.control}
                        name="dietType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>What best describes your diet?</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your diet type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="omnivore">Omnivore (meat and vegetables)</SelectItem>
                                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                                <SelectItem value="vegan">Vegan</SelectItem>
                                <SelectItem value="pescatarian">Pescatarian</SelectItem>
                                <SelectItem value="keto">Ketogenic</SelectItem>
                                <SelectItem value="paleo">Paleo</SelectItem>
                                <SelectItem value="gluten-free">Gluten-free</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  </motion.div>
                )}
                
                {/* Step 5: Review & Submit */}
                {step === 4 && (
                  <motion.div
                    key="review"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <motion.div variants={itemVariants}>
                      <h3 className="font-medium">Personal Information</h3>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Age</p>
                          <p>{form.getValues().age}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Gender</p>
                          <p>{form.getValues().gender}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Height</p>
                          <p>{form.getValues().height} cm</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Weight</p>
                          <p>{form.getValues().weight} kg</p>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <Separator />
                      <h3 className="font-medium mt-4">Medical History</h3>
                      <div className="mt-2 space-y-3 text-sm">
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Existing Conditions</p>
                          <p>{form.getValues().existingConditions?.length ? form.getValues().existingConditions?.join(", ") : "None"}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Medications</p>
                          <p>{form.getValues().medications || "None"}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Family History</p>
                          <p>{form.getValues().familyHistory?.length ? form.getValues().familyHistory?.join(", ") : "None"}</p>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <Separator />
                      <h3 className="font-medium mt-4">Current Symptoms</h3>
                      <div className="mt-2 space-y-3 text-sm">
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Main Symptom</p>
                          <p>{form.getValues().mainSymptom}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Symptom Intensity</p>
                          <p>{form.getValues().symptomsIntensity}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Symptom Frequency</p>
                          <p>{form.getValues().symptomsFrequency}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Additional Symptoms</p>
                          <p>{form.getValues().additionalSymptoms?.length ? form.getValues().additionalSymptoms?.join(", ") : "None"}</p>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <Separator />
                      <h3 className="font-medium mt-4">Lifestyle Factors</h3>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Smoking Status</p>
                          <p>{form.getValues().smokingStatus}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Alcohol Consumption</p>
                          <p>{form.getValues().alcoholConsumption}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Physical Activity</p>
                          <p>{form.getValues().physicalActivity}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Diet Type</p>
                          <p>{form.getValues().dietType}</p>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <Separator />
                      <div className="mt-4 text-sm text-muted-foreground">
                        <p>
                          By submitting this form, you acknowledge that this is not a medical diagnosis and should not replace professional medical advice.
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={prevStep}
                  disabled={step === 0}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button type="submit">
                  {step < assessmentSteps.length - 1 ? (
                    <>
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    "Submit Assessment"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}