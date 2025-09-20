import { useState } from "react";
import { WeatherSearch } from "@/components/weather/WeatherSearch";
import { WeatherCard } from "@/components/weather/WeatherCard";
import { getWeatherForCity } from "@/services/weatherApi.ts";
import { useToast } from "@/hooks/use-toast";
import { Cloud, Sun } from "lucide-react";

interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  condition: string;
}

const Index = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (cityName: string) => {
    setIsLoading(true);
    try {
      const weatherData = await getWeatherForCity(cityName);
      setWeather(weatherData);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get weather data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-weather-clear relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 opacity-10">
        <Sun className="h-32 w-32 text-white" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-10">
        <Cloud className="h-40 w-40 text-white" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold text-white drop-shadow-lg">
              Weather Now
            </h1>
            <p className="text-xl text-white/90">
              Quick weather check for any city, perfect for outdoor adventures
            </p>
          </div>

          {/* Search */}
          <div className="flex justify-center">
            <WeatherSearch onSearch={handleSearch} isLoading={isLoading} />
          </div>

          {/* Weather Display */}
          {weather && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <WeatherCard weather={weather} />
            </div>
          )}

          {/* Welcome message when no weather data */}
          {!weather && !isLoading && (
            <div className="text-center py-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Welcome, Jamie! 👋
                </h2>
                <p className="text-white/90 text-lg">
                  Search for any city to get current weather conditions for your outdoor activities.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
