import { useState, useEffect } from "react";

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    // Start from 5000 if no count exists or if current count is less than 5000
    let count = parseInt(localStorage.getItem("visitor-count") || "0");
    if (!count || count < 5000) {
      count = 5000;
    }
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