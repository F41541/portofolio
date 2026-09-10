"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function LiveClock() {
  const [timeStr, setTimeStr] = React.useState<string>("");

  React.useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Jakarta",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(now);
        setTimeStr(formatted);
      } catch {
        setTimeStr(new Date().toTimeString().slice(0, 8));
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-3 rounded-xl bg-surface-card border border-border-subtle space-y-2">
      <div className="flex items-center justify-between text-xs text-text-muted">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-accent-emerald" />
          Cirebon, Jawa Barat (WIB)
        </span>
        <Badge variant="emerald" className="text-[10px] font-mono">
          UTC+7
        </Badge>
      </div>
      <div className="text-base font-semibold text-text-primary tracking-wider flex items-center justify-between">
        <span>{timeStr || "00:00:00"}</span>
        <Badge variant="emerald" className="text-[10px]">
          Online
        </Badge>
      </div>
    </div>
  );
}
