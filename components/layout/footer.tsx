import Link from "next/link";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col space-y-4">
            <Link href="/" className="text-2xl font-bold text-primary">
              AssessMed
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Using machine learning to provide accessible and reliable health insights
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium text-sm">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/assessment" className="text-muted-foreground hover:text-primary transition-colors">
                  Health Assessment
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium text-sm">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Health Blog
                </Link>
              </li>
              <li>
                <Link href="/research" className="text-muted-foreground hover:text-primary transition-colors">
                  Research
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium text-sm">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-muted-foreground hover:text-primary transition-colors">
                  Medical Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t">
          <p className="text-xs text-muted-foreground">
            © 2025 AssessMed. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-4 md:mt-0">
            <span>Made with</span>
            <Heart className="h-3 w-3 text-destructive fill-destructive" />
            <span>for better healthcare</span>
          </div>
        </div>
      </div>
    </footer>
  );
}