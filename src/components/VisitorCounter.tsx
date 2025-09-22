import { useState, useEffect } from "react";

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    // Get count from localStorage or default to 0
    let count = parseInt(localStorage.getItem("visitor-count") || "0");
    count++;
    localStorage.setItem("visitor-count", count.toString());
    setVisitorCount(count);
  }, []);

  return (
    <div className="text-center text-sm text-muted-foreground mt-5">
      عدد الزوار: <span className="font-semibold">{visitorCount}</span>
    </div>
  );
};

export default VisitorCounter;