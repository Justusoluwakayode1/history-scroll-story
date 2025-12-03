import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface FilterOption {
  id: string;
  label: string;
  icon: string;
}

interface SearchDialogProps {
  eras: FilterOption[];
  regions: FilterOption[];
  topics: FilterOption[];
  selectedEra: string;
  selectedRegion: string;
  selectedTopic: string;
  searchQuery: string;
  onEraChange: (era: string) => void;
  onRegionChange: (region: string) => void;
  onTopicChange: (topic: string) => void;
  onSearchChange: (query: string) => void;
  totalResults: number;
}

export const SearchDialog = ({
  eras,
  regions,
  topics,
  selectedEra,
  selectedRegion,
  selectedTopic,
  searchQuery,
  onEraChange,
  onRegionChange,
  onTopicChange,
  onSearchChange,
  totalResults,
}: SearchDialogProps) => {
  const [open, setOpen] = useState(false);

  const hasActiveFilters = selectedEra !== "all" || selectedRegion !== "all" || selectedTopic !== "all" || searchQuery !== "";

  const clearAllFilters = () => {
    onEraChange("all");
    onRegionChange("all");
    onTopicChange("all");
    onSearchChange("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="gap-2 bg-primary hover:bg-primary-light text-primary-foreground px-6 h-12 text-base font-medium shadow-lg hover:shadow-xl transition-all"
        >
          <Search className="h-5 w-5" />
          Search History
          {hasActiveFilters && (
            <span className="ml-1 bg-primary-foreground/20 px-2 py-0.5 rounded-full text-xs">
              {totalResults}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Search & Filter Stories</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search stories, topics, or keywords..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>

          {/* Era Filter */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-foreground">Era</h3>
            <div className="flex flex-wrap gap-2">
              {eras.map((era) => (
                <Button
                  key={era.id}
                  variant={selectedEra === era.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => onEraChange(era.id)}
                  className={`gap-1.5 transition-all ${
                    selectedEra === era.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <span>{era.icon}</span>
                  {era.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Region Filter */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-foreground">Region</h3>
            <div className="flex flex-wrap gap-2">
              {regions.map((region) => (
                <Button
                  key={region.id}
                  variant={selectedRegion === region.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => onRegionChange(region.id)}
                  className={`gap-1.5 transition-all ${
                    selectedRegion === region.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <span>{region.icon}</span>
                  {region.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Topic Filter */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-foreground">Topic</h3>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => (
                <Button
                  key={topic.id}
                  variant={selectedTopic === topic.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => onTopicChange(topic.id)}
                  className={`gap-1.5 transition-all ${
                    selectedTopic === topic.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <span>{topic.icon}</span>
                  {topic.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Active Filters & Clear */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">{totalResults}</span> stories
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-muted-foreground hover:text-foreground gap-1"
              >
                <X className="h-4 w-4" />
                Clear all
              </Button>
            </div>
          )}

          {/* Apply Button */}
          <Button
            className="w-full h-11 bg-primary hover:bg-primary-light text-primary-foreground"
            onClick={() => setOpen(false)}
          >
            View {totalResults} Stories
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
