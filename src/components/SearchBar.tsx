import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationClick: () => void;
  isLoading?: boolean;
}

export const SearchBar = ({ onSearch, onLocationClick, isLoading }: SearchBarProps) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-2xl">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={isLoading}
          className="pl-10 h-12 bg-card border-border shadow-sm"
        />
      </div>
      <Button 
        type="submit" 
        size="lg"
        disabled={isLoading || !city.trim()}
        className="h-12 px-6"
      >
        Search
      </Button>
      <Button
        type="button"
        variant="secondary"
        size="lg"
        onClick={onLocationClick}
        disabled={isLoading}
        className="h-12 px-4"
      >
        <MapPin className="h-5 w-5" />
      </Button>
    </form>
  );
};
