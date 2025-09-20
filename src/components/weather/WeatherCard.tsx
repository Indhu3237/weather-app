import { Card } from "@/components/ui/card.tsx";
import { MapPin, Thermometer, Droplets, Wind } from "lucide-react";

interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  condition: string;
}

interface WeatherCardProps {
  weather: WeatherData;
}

export function WeatherCard({ weather }: WeatherCardProps) {
  const getBackgroundClass = (condition: string) => {
    const cond = condition.toLowerCase();
    if (cond.includes('sun') || cond.includes('clear')) return 'bg-weather-sunny';
    if (cond.includes('cloud')) return 'bg-weather-cloudy';
    if (cond.includes('rain') || cond.includes('storm')) return 'bg-weather-sky';
    return 'bg-weather-clear';
  };

  return (
    <Card className={`p-8 ${getBackgroundClass(weather.condition)} shadow-weather border-0 text-white transition-all duration-500`}>
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-2 text-white/90">
          <MapPin className="h-5 w-5" />
          <span className="text-lg font-medium">{weather.city}</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Thermometer className="h-8 w-8" />
            <span className="text-6xl font-bold">{Math.round(weather.temperature)}°</span>
          </div>
          <p className="text-xl text-white/90 capitalize">{weather.description}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/20">
          <div className="flex items-center gap-2 text-white/90">
            <Droplets className="h-5 w-5" />
            <div>
              <p className="text-sm opacity-80">Humidity</p>
              <p className="text-lg font-semibold">{weather.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <Wind className="h-5 w-5" />
            <div>
              <p className="text-sm opacity-80">Wind Speed</p>
              <p className="text-lg font-semibold">{weather.windSpeed} km/h</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
