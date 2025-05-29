"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Create an Account",
    description: "Sign up to get started and access the full range of AssessMed features.",
    points: [
      "Secure authentication with email or Google",
      "Personal health dashboard creation",
      "Privacy settings configuration"
    ]
  },
  {
    number: "02",
    title: "Complete Assessment",
    description: "Answer questions about your symptoms and medical history through our intuitive interface.",
    points: [
      "User-friendly symptom selection",
      "Comprehensive medical history input",
      "Real-time validation and guidance"
    ]
  },
  {
    number: "03",
    title: "Receive Predictions",
    description: "Our advanced ML algorithms analyze your data to generate potential disease predictions.",
    points: [
      "Probability-based prediction results",
      "Visual representation of findings",
      "Detailed explanation of analysis"
    ]
  },
  {
    number: "04",
    title: "Take Action",
    description: "Get personalized recommendations and next steps based on your prediction results.",
    points: [
      "Actionable health insights",
      "Recommended medical consultations",
      "Progress tracking and follow-ups"
    ]
  }
];

export function HowItWorksSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Simple Process</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              How AssessMed Works
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our streamlined process makes health assessment easy, accurate, and actionable.
            </p>
          </div>
        </div>
        
        <motion.div 
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 space-y-12"
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}
            >
              <div className="flex-1">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium mb-4">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground mb-6">{step.description}</p>
                <ul className="space-y-2">
                  {step.points.map((point, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 w-full md:w-auto">
                <div className="rounded-lg overflow-hidden border shadow-lg bg-card">
                  <Image
                    src={`/steps/step-${index}.webp`}
                    alt={`Step ${index + 1}: ${step.title}`}
                    width={600}
                    height={400}
                    className="aspect-video object-cover w-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}