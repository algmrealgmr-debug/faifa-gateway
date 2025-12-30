import { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, CloudSnow, CloudFog, Wind, Loader2 } from "lucide-react";

interface WeatherData {
  temperature: number;
  weatherCode: number;
}

// Faifa coordinates
const FAIFA_LAT = 17.2580;
const FAIFA_LNG = 43.1130;

const getWeatherIcon = (code: number) => {
  // WMO Weather interpretation codes
  if (code === 0) return Sun; // Clear sky
  if (code >= 1 && code <= 3) return Cloud; // Partly cloudy
  if (code >= 45 && code <= 48) return CloudFog; // Fog
  if (code >= 51 && code <= 67) return CloudRain; // Drizzle/Rain
  if (code >= 71 && code <= 77) return CloudSnow; // Snow
  if (code >= 80 && code <= 82) return CloudRain; // Rain showers
  if (code >= 95 && code <= 99) return CloudRain; // Thunderstorm
  return Cloud;
};

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${FAIFA_LAT}&longitude=${FAIFA_LNG}&current=temperature_2m,weather_code&timezone=Asia/Riyadh`
        );
        
        if (!response.ok) throw new Error("Weather fetch failed");
        
        const data = await response.json();
        
        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          weatherCode: data.current.weather_code,
        });
        setLoading(false);
      } catch (err) {
        console.error("Weather fetch error:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchWeather();
    
    // Refresh every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (error || loading) {
    return (
      <div className="flex items-center gap-2 text-white/70">
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" strokeWidth={1.5} />
        ) : null}
      </div>
    );
  }

  if (!weather) return null;

  const WeatherIcon = getWeatherIcon(weather.weatherCode);

  return (
    <div className="flex items-center gap-2 text-white/90 backdrop-blur-sm bg-white/5 rounded-full px-3 py-1.5 border border-white/10">
      <WeatherIcon className="w-4 h-4" strokeWidth={1.5} />
      <span className="text-sm font-light tracking-wide">
        {weather.temperature}°C
      </span>
    </div>
  );
};

export default WeatherWidget;
