import { WeatherData, ForecastData } from "@/types/weather";

// ✅ Your AWS API Gateway URL
const BASE_URL = import.meta.env.VITE_API_BASE || "https://q3sti5pug5.execute-api.us-east-1.amazonaws.com";

// Generic helper
async function request<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    let msg = "";
    try {
      const data = JSON.parse(text);
      msg = data?.message || `${res.status} ${res.statusText}`;
    } catch {
      msg = text;
    }
    throw new Error(msg);
  }
  return res.json() as Promise<T>;
}

// ✅ Fetch current weather via Lambda (no API key exposed)
export const fetchWeatherByCity = async (city: string): Promise<WeatherData> => {
  const q = encodeURIComponent(city.trim());
  const url = `${BASE_URL}/weather?city=${q}`;
  return request<WeatherData>(url);
};

// ✅ Fetch forecast via Lambda (optional)
export const fetchForecast = async (city: string): Promise<ForecastData> => {
  const q = encodeURIComponent(city.trim());
  const url = `${BASE_URL}/forecast?city=${q}`;
  return request<ForecastData>(url);
};

// ✅ Fetch by coordinates via Lambda
export const fetchWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}`;
  return request<WeatherData>(url);
};
