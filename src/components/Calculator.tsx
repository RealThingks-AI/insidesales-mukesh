import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Operation = "+" | "-" | "×" | "÷" | null;

export const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<Operation>(null);
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const handleNumber = (num: string) => {
    if (shouldResetDisplay) {
      setDisplay(num);
      setShouldResetDisplay(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (shouldResetDisplay) {
      setDisplay("0.");
      setShouldResetDisplay(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOperation = (op: Operation) => {
    const currentValue = parseFloat(display);
    
    if (previousValue !== null && operation && !shouldResetDisplay) {
      calculate();
    } else {
      setPreviousValue(currentValue);
    }
    
    setOperation(op);
    setShouldResetDisplay(true);
  };

  const calculate = () => {
    if (previousValue === null || operation === null) return;

    const currentValue = parseFloat(display);
    let result = 0;

    switch (operation) {
      case "+":
        result = previousValue + currentValue;
        break;
      case "-":
        result = previousValue - currentValue;
        break;
      case "×":
        result = previousValue * currentValue;
        break;
      case "÷":
        result = previousValue / currentValue;
        break;
    }

    setDisplay(result.toString());
    setPreviousValue(null);
    setOperation(null);
    setShouldResetDisplay(true);
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setShouldResetDisplay(false);
  };

  const handlePercentage = () => {
    const value = parseFloat(display) / 100;
    setDisplay(value.toString());
  };

  const handleToggleSign = () => {
    const value = parseFloat(display) * -1;
    setDisplay(value.toString());
  };

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        handleNumber(e.key);
      } else if (e.key === ".") {
        handleDecimal();
      } else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
        const op = e.key === "*" ? "×" : e.key === "/" ? "÷" : e.key as Operation;
        handleOperation(op);
      } else if (e.key === "Enter" || e.key === "=") {
        calculate();
      } else if (e.key === "Escape" || e.key === "c" || e.key === "C") {
        handleClear();
      } else if (e.key === "%") {
        handlePercentage();
      }
    };

    window.addEventListener("keydown", handleKeyboard);
    return () => window.removeEventListener("keydown", handleKeyboard);
  }, [display, previousValue, operation, shouldResetDisplay]);

  return (
    <Card className="w-full max-w-sm p-6 bg-card shadow-[var(--shadow-elegant)] backdrop-blur-sm animate-fade-in">
      <div className="mb-6 rounded-2xl bg-secondary/50 p-6 text-right backdrop-blur-sm">
        <div className="text-sm text-muted-foreground mb-2 h-5">
          {previousValue !== null && operation && (
            <span>
              {previousValue} {operation}
            </span>
          )}
        </div>
        <div className="text-5xl font-light text-card-foreground tracking-tight break-all">
          {display}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <Button
          variant="ghost"
          className="h-16 text-lg font-medium bg-calc-function text-calc-function-foreground hover:bg-calc-function/80 transition-all active:animate-press"
          onClick={handleClear}
        >
          AC
        </Button>
        <Button
          variant="ghost"
          className="h-16 text-lg font-medium bg-calc-function text-calc-function-foreground hover:bg-calc-function/80 transition-all active:animate-press"
          onClick={handleToggleSign}
        >
          +/-
        </Button>
        <Button
          variant="ghost"
          className="h-16 text-lg font-medium bg-calc-function text-calc-function-foreground hover:bg-calc-function/80 transition-all active:animate-press"
          onClick={handlePercentage}
        >
          %
        </Button>
        <Button
          variant="ghost"
          className="h-16 text-lg font-medium bg-calc-operator text-calc-operator-foreground hover:bg-calc-operator/90 transition-all active:animate-press shadow-[var(--shadow-button)]"
          onClick={() => handleOperation("÷")}
        >
          ÷
        </Button>

        {/* Row 2 */}
        {["7", "8", "9"].map((num) => (
          <Button
            key={num}
            variant="ghost"
            className="h-16 text-xl font-medium bg-calc-number text-calc-number-foreground hover:bg-calc-number/80 transition-all active:animate-press"
            onClick={() => handleNumber(num)}
          >
            {num}
          </Button>
        ))}
        <Button
          variant="ghost"
          className="h-16 text-lg font-medium bg-calc-operator text-calc-operator-foreground hover:bg-calc-operator/90 transition-all active:animate-press shadow-[var(--shadow-button)]"
          onClick={() => handleOperation("×")}
        >
          ×
        </Button>

        {/* Row 3 */}
        {["4", "5", "6"].map((num) => (
          <Button
            key={num}
            variant="ghost"
            className="h-16 text-xl font-medium bg-calc-number text-calc-number-foreground hover:bg-calc-number/80 transition-all active:animate-press"
            onClick={() => handleNumber(num)}
          >
            {num}
          </Button>
        ))}
        <Button
          variant="ghost"
          className="h-16 text-lg font-medium bg-calc-operator text-calc-operator-foreground hover:bg-calc-operator/90 transition-all active:animate-press shadow-[var(--shadow-button)]"
          onClick={() => handleOperation("-")}
        >
          -
        </Button>

        {/* Row 4 */}
        {["1", "2", "3"].map((num) => (
          <Button
            key={num}
            variant="ghost"
            className="h-16 text-xl font-medium bg-calc-number text-calc-number-foreground hover:bg-calc-number/80 transition-all active:animate-press"
            onClick={() => handleNumber(num)}
          >
            {num}
          </Button>
        ))}
        <Button
          variant="ghost"
          className="h-16 text-lg font-medium bg-calc-operator text-calc-operator-foreground hover:bg-calc-operator/90 transition-all active:animate-press shadow-[var(--shadow-button)]"
          onClick={() => handleOperation("+")}
        >
          +
        </Button>

        {/* Row 5 */}
        <Button
          variant="ghost"
          className="col-span-2 h-16 text-xl font-medium bg-calc-number text-calc-number-foreground hover:bg-calc-number/80 transition-all active:animate-press"
          onClick={() => handleNumber("0")}
        >
          0
        </Button>
        <Button
          variant="ghost"
          className="h-16 text-xl font-medium bg-calc-number text-calc-number-foreground hover:bg-calc-number/80 transition-all active:animate-press"
          onClick={handleDecimal}
        >
          .
        </Button>
        <Button
          variant="ghost"
          className="h-16 text-lg font-medium bg-calc-operator text-calc-operator-foreground hover:bg-calc-operator/90 transition-all active:animate-press shadow-[var(--shadow-button)]"
          onClick={calculate}
        >
          =
        </Button>
      </div>
    </Card>
  );
};
