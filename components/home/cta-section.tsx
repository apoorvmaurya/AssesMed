"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  
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
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div 
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <motion.div className="space-y-2" variants={itemVariants}>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Take Control of Your Health?
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Start your health assessment today and gain valuable insights about your well-being.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col sm:flex-row gap-3 min-[400px]:flex-row justify-center"
            variants={itemVariants}
          >
            <Button asChild className="animated-gradient-button bg-gradient-to-r from-primary to-secondary">
              <Link href="/assessment">
                Start Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/about">Learn More</Link>
            </Button>
          </motion.div>
          <motion.p 
            className="text-xs text-muted-foreground mt-4"
            variants={itemVariants}
          >
            No credit card required. Start with a free assessment.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}