import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4 bg-card border-white/10 shadow-[0_0_30px_rgba(255,0,0,0.1)]">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2 text-destructive items-center">
            <AlertCircle className="h-8 w-8" />
            <h1 className="text-2xl font-bold font-display">404 Error</h1>
          </div>

          <p className="mt-4 text-muted-foreground mb-6">
            The requested data segment could not be located in the neural network.
          </p>

          <Button asChild className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10">
            <Link href="/">Return to Home Base</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
