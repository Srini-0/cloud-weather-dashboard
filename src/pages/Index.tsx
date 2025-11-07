import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchBar } from "@/components/SearchBar";
import { WeatherCard } from "@/components/WeatherCard";
import { ForecastCard } from "@/components/ForecastCard";
import { fetchWeatherByCity, fetchForecast, fetchWeatherByCoords } from "@/lib/weatherApi";
import { Loader2, CloudOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [city, setCity] = useState("London");
  const { toast } = useToast();

  const { data: weather, isLoading: weatherLoading, error: weatherError } = useQuery({
    queryKey: ["weather", city],
    queryFn: () => fetchWeatherByCity(city),
    retry: 1,
  });

  const { data: forecast, isLoading: forecastLoading } = useQuery({
    queryKey: ["forecast", city],
    queryFn: () => fetchForecast(city),
    retry: 1,
    enabled: !!weather,
  });

  const handleSearch = (searchCity: string) => {
    setCity(searchCity);
  };

  const handleLocationClick = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const weatherData = await fetchWeatherByCoords(
              position.coords.latitude,
              position.coords.longitude
            );
            setCity(weatherData.name);
            toast({
              title: "Location detected",
              description: `Showing weather for ${weatherData.name}`,
            });
          } catch (error) {
            toast({
              title: "Error",
              description: "Could not fetch weather for your location",
              variant: "destructive",
            });
          }
        },
        () => {
          toast({
            title: "Location access denied",
            description: "Please enable location access to use this feature",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Location not supported",
        description: "Your browser doesn't support geolocation",
        variant: "destructive",
      });
    }
  };

  const isLoading = weatherLoading || forecastLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            CloudCast Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Real-time weather insights at your fingertips
          </p>
        </header>

        <div className="flex justify-center mb-8">
          <SearchBar
            onSearch={handleSearch}
            onLocationClick={handleLocationClick}
            isLoading={isLoading}
          />
        </div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading weather data...</p>
          </div>
        )}

        {weatherError && !isLoading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <CloudOff className="h-16 w-16 text-muted-foreground" />
            <p className="text-xl text-foreground font-semibold">City not found</p>
            <p className="text-muted-foreground">Please try searching for another city</p>
          </div>
        )}

        {weather && !isLoading && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <WeatherCard weather={weather} />
            {forecast && <ForecastCard forecast={forecast} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
