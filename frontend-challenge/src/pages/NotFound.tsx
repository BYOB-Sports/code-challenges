import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-court flex items-center justify-center px-4">
      <div className="text-center animate-fade-in">
        <div className="text-8xl mb-6">🎾</div>
        <h1 className="text-6xl font-bold text-tennis-green mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Court Not Found</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the tennis court you're looking for. 
          Let's get you back to discovering amazing courts!
        </p>
        <Button 
          onClick={() => window.location.href = '/'}
          className="bg-gradient-tennis hover:bg-primary-hover text-white font-semibold px-8 py-3 text-lg"
        >
          <Home className="mr-2 h-5 w-5" />
          Back to Courts
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
