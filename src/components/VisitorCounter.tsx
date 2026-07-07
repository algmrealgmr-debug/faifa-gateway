import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState(5078);
  const { t } = useLanguage();

  useEffect(() => {
    // نقرأ العدد من LocalStorage
    let countStr = localStorage.getItem("visitor-count");
    let count: number;

    if (!countStr) {
      // إذا ما فيه عدد محفوظ، نبدأ من 5078
      count = 5078;
    } else {
      count = parseInt(countStr);
      count++;
    }

    // نخزنه في LocalStorage عشان يبقى ثابت على نفس المتصفح
    localStorage.setItem("visitor-count", count.toString());

    // نعرض العدد
    setVisitorCount(count);
  }, []);

  return (
    <div className="text-center text-sm text-muted-foreground mt-5">
      {t("عدد الزوار:", "Visitors:")} <span className="font-semibold">{visitorCount}</span>
    </div>
  );
};

export default VisitorCounter;