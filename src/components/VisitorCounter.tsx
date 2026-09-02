import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

const SESSION_FLAG = "visitor-counted";

interface VisitorCounterProps {
  compact?: boolean;
}

const VisitorCounter = ({ compact }: VisitorCounterProps) => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const alreadyCounted = sessionStorage.getItem(SESSION_FLAG) === "true";

      if (!alreadyCounted) {
        const { data, error } = await supabase.rpc("increment_visitor_count");
        if (!error && typeof data === "number") {
          sessionStorage.setItem(SESSION_FLAG, "true");
          if (!cancelled) setVisitorCount(data);
          return;
        }
      }

      const { data } = await supabase
        .from("site_analytics")
        .select("visitor_count")
        .eq("id", 1)
        .maybeSingle();

      if (!cancelled && data) setVisitorCount(data.visitor_count);
    };

    run();

    const channel = supabase
      .channel("site-analytics")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "site_analytics" },
        (payload) => {
          const next = (payload.new as { visitor_count?: number })?.visitor_count;
          if (typeof next === "number") setVisitorCount(next);
        }
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className={`text-center text-sm text-muted-foreground ${compact ? "" : "mt-5"}`}>
      {t("عدد الزوار:", "Visitors:")}{" "}
      <span className="font-semibold">{visitorCount ?? "—"}</span>
    </div>
  );
};

export default VisitorCounter;
