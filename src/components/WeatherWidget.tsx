import { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, CloudSnow, CloudFog, Moon, Loader2 } from "lucide-react";

interface WeatherData {
  temperature: number;
  weatherCode: number;
  tomorrowTemp: number;
  tomorrowCode: number;
}

// Faifa coordinates
const FAIFA_LAT = 17.2580;
const FAIFA_LNG = 43.1130;

const isNightTime = (): boolean => {
  // Get current hour in Faifa's timezone (Asia/Riyadh, UTC+3)
  const now = new Date();
  const faifaTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Riyadh" }));
  const hour = faifaTime.getHours();
  // Night is between 6 PM (18:00) and 6 AM (06:00)
  return hour >= 18 || hour < 6;
};

const getWeatherInfo = (code: number, isNight: boolean): { icon: typeof Sun; description: string } => {
  // WMO Weather interpretation codes with Arabic descriptions
  // Clear conditions - time-aware
  if (code === 0) {
    return isNight 
      ? { icon: Moon, description: "ليلة صافية" }
      : { icon: Sun, description: "مشمس" };
  }
  if (code === 1) {
    return isNight 
      ? { icon: Moon, description: "ليل هادئ" }
      : { icon: Sun, description: "صافٍ" };
  }
  if (code === 2) return { icon: Cloud, description: "غائم جزئياً" };
  if (code === 3) return { icon: Cloud, description: "غائم" };
  if (code >= 45 && code <= 48) return { icon: CloudFog, description: "ضبابي" };
  if (code >= 51 && code <= 55) return { icon: CloudRain, description: "رذاذ" };
  if (code >= 56 && code <= 57) return { icon: CloudRain, description: "رذاذ متجمد" };
  if (code >= 61 && code <= 65) return { icon: CloudRain, description: "ممطر" };
  if (code >= 66 && code <= 67) return { icon: CloudRain, description: "مطر متجمد" };
  if (code >= 71 && code <= 77) return { icon: CloudSnow, description: "ثلجي" };
  if (code >= 80 && code <= 82) return { icon: CloudRain, description: "زخات مطر" };
  if (code >= 95 && code <= 99) return { icon: CloudRain, description: "عاصفة رعدية" };
  return { icon: Cloud, description: "غائم" };
};

// For tomorrow's forecast, always show daytime description
const getTomorrowWeatherDescription = (code: number): string => {
  if (code === 0) return "مشمس";
  if (code === 1) return "صافٍ";
  if (code === 2) return "غائم جزئياً";
  if (code === 3) return "غائم";
  if (code >= 45 && code <= 48) return "ضبابي";
  if (code >= 51 && code <= 55) return "رذاذ";
  if (code >= 56 && code <= 57) return "رذاذ متجمد";
  if (code >= 61 && code <= 65) return "ممطر";
  if (code >= 66 && code <= 67) return "مطر متجمد";
  if (code >= 71 && code <= 77) return "ثلجي";
  if (code >= 80 && code <= 82) return "زخات مطر";
  if (code >= 95 && code <= 99) return "عاصفة رعدية";
  return "غائم";
};

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${FAIFA_LAT}&longitude=${FAIFA_LNG}&current=temperature_2m,weather_code&daily=temperature_2m_max,weather_code&timezone=Asia/Riyadh&forecast_days=2`
        );
        
        if (!response.ok) throw new Error("Weather fetch failed");
        
        const data = await response.json();
        
        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          weatherCode: data.current.weather_code,
          tomorrowTemp: Math.round(data.daily.temperature_2m_max[1]),
          tomorrowCode: data.daily.weather_code[1],
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

  const isNight = isNightTime();
  const weatherInfo = getWeatherInfo(weather.weatherCode, isNight);
  const WeatherIcon = weatherInfo.icon;
  const tomorrowDescription = getTomorrowWeatherDescription(weather.tomorrowCode);

  return (
    <div className="flex flex-col items-end gap-1 text-white/90">
      <div className="flex items-center gap-2 backdrop-blur-sm bg-white/5 rounded-full px-3 py-1.5 border border-white/10">
        <WeatherIcon className="w-4 h-4" strokeWidth={1.5} />
        <span className="text-sm font-light tracking-wide">
          {weather.temperature}°C
        </span>
        <span className="text-xs font-light opacity-90">
          {weatherInfo.description}
        </span>
      </div>
      <div className="text-[10px] font-light text-white/70 px-3">
        توقعات الغد: {tomorrowDescription} {weather.tomorrowTemp}°C
      </div>
    </div>
  );
};

export default WeatherWidget;
