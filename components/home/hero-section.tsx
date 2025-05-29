"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.1,
        staggerChildren: 0.1
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
    <section className="w-full py-12 md:py-24 lg:py-32 hero-section overflow-hidden">
      <div className="container px-4 md:px-6">
        <motion.div
          className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.div className="flex flex-col justify-center space-y-4" variants={itemVariants}>
            <div className="space-y-2">
              <motion.h1 
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl gradient-heading"
                variants={itemVariants}
              >
                Advanced Health Prediction with AI
              </motion.h1>
              <motion.p 
                className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                variants={itemVariants}
              >
                AssessMed leverages cutting-edge machine learning algorithms to provide accurate disease prediction based on your symptoms and medical history.
              </motion.p>
            </div>
            <motion.div 
              className="flex flex-col sm:flex-row gap-3"
              variants={itemVariants}
            >
              <Button asChild className="animated-gradient-button bg-gradient-to-r from-primary to-secondary">
                <Link href="/assessment">Start Assessment</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/about">Learn More</Link>
              </Button>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-4 text-sm"
              variants={itemVariants}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-background overflow-hidden bg-muted">
                    <Image 
                      src={`/users/user${i}.png`} 
                      alt={`User ${i}`} 
                      width={32} 
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-muted-foreground">
                Trusted by <span className="font-medium text-foreground">10,000+</span> users
              </div>
            </motion.div>
          </motion.div>
          <motion.div 
            className="flex items-center justify-center lg:justify-end"
            variants={itemVariants}
          >
            <div className="rounded-lg overflow-hidden border bg-card shadow-lg">
              <Image
                src="https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Medical professional using AI diagnostic tool"
                width={600}
                height={400}
                className="aspect-video object-cover w-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}