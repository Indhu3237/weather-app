import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Search, Loader2 } from "lucide-react";

interface WeatherSearchProps {
  onSearch: (city: string) => Promise<void>;
  isLoading: boolean;
}

export function WeatherSearch({ onSearch, isLoading }: WeatherSearchProps) {
  const [city, setCity] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      await onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div className="relative">
        <Input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="pl-10 h-12 text-lg bg-white/95 backdrop-blur-sm border-white/20 focus:border-primary"
          disabled={isLoading}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      </div>
      <Button 
        type="submit" 
        disabled={!city.trim() || isLoading}
        className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-weather"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Searching...
          </>
        ) : (
          <>
            <Search className="mr-2 h-5 w-5" />
            Get Weather
          </>
        )}
      </Button>
    </form>
  );
}
