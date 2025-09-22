import { useEffect } from "react";

const VisitorCounter = () => {
  useEffect(() => {
    // Load the auth script
    const authScript = document.createElement('script');
    authScript.type = 'text/javascript';
    authScript.src = 'https://www.freevisitorcounters.com/auth.php?id=9a930772b69f2e8e2023536efc164e470f548927';
    document.head.appendChild(authScript);

    // Load the counter script
    const counterScript = document.createElement('script');
    counterScript.type = 'text/javascript';
    counterScript.src = 'https://www.freevisitorcounters.com/en/home/counter/1394168/t/5';
    document.head.appendChild(counterScript);

    return () => {
      // Cleanup scripts on unmount
      document.head.removeChild(authScript);
      document.head.removeChild(counterScript);
    };
  }, []);

  return (
    <div className="text-center text-sm text-muted-foreground mt-5">
      <a href='http://www.freevisitorcounters.com' className="text-accent hover:text-accent/80 transition-colors">Free Counters</a>
    </div>
  );
};

export default VisitorCounter;