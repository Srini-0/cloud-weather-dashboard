import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ForecastData } from "@/types/weather";
import { Calendar } from "lucide-react";

interface ForecastCardProps {
  forecast: ForecastData;
}

export const ForecastCard = ({ forecast }: ForecastCardProps) => {
  const dailyForecasts = forecast.list.filter((item, index) => index % 8 === 0).slice(0, 5);

  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  };

  return (
    <Card className="shadow-[var(--shadow-card)] border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Calendar className="h-6 w-6 text-primary" />
          5-Day Forecast
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {dailyForecasts.map((day, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <p className="font-semibold text-foreground">{formatDate(day.dt_txt)}</p>
              <img
                src={getWeatherIcon(day.weather[0].icon)}
                alt={day.weather[0].description}
                className="w-16 h-16"
              />
              <p className="text-sm text-muted-foreground capitalize">
                {day.weather[0].description}
              </p>
              <div className="flex gap-2 items-center">
                <span className="text-xl font-bold text-foreground">
                  {Math.round(day.main.temp_max)}°
                </span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(day.main.temp_min)}°
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
