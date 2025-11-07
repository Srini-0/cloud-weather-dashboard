import { Card, CardContent } from "@/components/ui/card";
import { WeatherData } from "@/types/weather";
import { Cloud, Droplets, Wind, Eye, Gauge, Sunrise, Sunset } from "lucide-react";

interface WeatherCardProps {
  weather: WeatherData;
}

export const WeatherCard = ({ weather }: WeatherCardProps) => {
  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const weatherDetails = [
    {
      icon: Droplets,
      label: "Humidity",
      value: `${weather.main.humidity}%`,
    },
    {
      icon: Wind,
      label: "Wind Speed",
      value: `${weather.wind.speed} m/s`,
    },
    {
      icon: Gauge,
      label: "Pressure",
      value: `${weather.main.pressure} hPa`,
    },
    {
      icon: Cloud,
      label: "Cloudiness",
      value: `${weather.clouds.all}%`,
    },
    {
      icon: Sunrise,
      label: "Sunrise",
      value: formatTime(weather.sys.sunrise),
    },
    {
      icon: Sunset,
      label: "Sunset",
      value: formatTime(weather.sys.sunset),
    },
  ];

  return (
    <Card className="shadow-[var(--shadow-card)] border-border bg-card">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl font-bold text-foreground mb-2">
              {weather.name}, {weather.sys.country}
            </h2>
            <p className="text-xl text-muted-foreground capitalize mb-6">
              {weather.weather[0].description}
            </p>
            
            <div className="flex items-center justify-center md:justify-start gap-4">
              <img
                src={getWeatherIcon(weather.weather[0].icon)}
                alt={weather.weather[0].description}
                className="w-32 h-32"
              />
              <div>
                <div className="text-7xl font-bold text-foreground">
                  {Math.round(weather.main.temp)}°
                </div>
                <div className="text-muted-foreground mt-2">
                  Feels like {Math.round(weather.main.feels_like)}°
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            {weatherDetails.map((detail) => (
              <div
                key={detail.label}
                className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50"
              >
                <detail.icon className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">{detail.label}</span>
                <span className="text-lg font-semibold text-foreground">{detail.value}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
