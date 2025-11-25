import { Calculator } from "@/components/Calculator";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="text-center">
        <h1 className="mb-2 text-4xl font-bold text-foreground tracking-tight animate-fade-in">
          Calculator
        </h1>
        <p className="mb-8 text-muted-foreground animate-fade-in" style={{ animationDelay: "0.1s" }}>
          A sleek, modern calculator with keyboard support
        </p>
        <div style={{ animationDelay: "0.2s" }}>
          <Calculator />
        </div>
      </div>
    </div>
  );
};

export default Index;
