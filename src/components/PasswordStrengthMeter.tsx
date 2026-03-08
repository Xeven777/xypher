"use client";

import zxcvbn from "zxcvbn";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

export function PasswordStrengthMeter({ password }: { password: string }) {
  const [strength, setStrength] = useState(0);
  const [label, setLabel] = useState("");
  const [color, setColor] = useState("bg-red-500");

  useEffect(() => {
    if (!password) {
      setStrength(0);
      setLabel("");
      return;
    }

    const result = zxcvbn(password);
    const score = result.score; // 0-4

    setStrength(((score + 1) / 5) * 100);

    switch (score) {
      case 0:
        setLabel("Very Weak");
        setColor("bg-red-500");
        break;
      case 1:
        setLabel("Weak");
        setColor("bg-red-500");
        break;
      case 2:
        setLabel("Fair");
        setColor("bg-yellow-500");
        break;
      case 3:
        setLabel("Good");
        setColor("bg-blue-500");
        break;
      case 4:
        setLabel("Strong");
        setColor("bg-green-500");
        break;
      default:
        setLabel("");
        setColor("bg-red-500");
    }
  }, [password]);

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1">
      <div className="flex justify-between text-xs font-medium">
        <span>Password Strength</span>
        <span className={label === "Strong" ? "text-green-500" : ""}>{label}</span>
      </div>
      <Progress value={strength} className="h-1" />
    </div>
  );
}
