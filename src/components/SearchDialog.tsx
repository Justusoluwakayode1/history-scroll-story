import { useState, useMemo } from "react";
import { Search, X, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { searchStories, searchStoriesMultiWord } from "@/lib/search-utils";
import { stories } from "@/data/stories";

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

  // Smart search results
  const searchResults = useMemo(() => {
    if (!searchQuery || searchQuery.trim() === "") {
      return [];
    }
    // Use multi-word search for better results
    return searchStoriesMultiWord(searchQuery, stories);
  }, [searchQuery]);

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
              placeholder="Search stories, topics, chapters, or keywords..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>

          {/* Smart Search Results */}
          {searchQuery && searchQuery.trim() !== "" && searchResults.length > 0 && (
            <div className="space-y-3 border-t border-b border-border py-4">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                Smart Search Results ({searchResults.length})
              </div>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {searchResults.slice(0, 5).map((result) => (
                  <Link
                    key={result.story.id}
                    to={`/story/${result.story.slug}`}
                    onClick={() => setOpen(false)}
                    className="block p-3 rounded-lg border border-border hover:bg-muted transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-12 h-16 rounded overflow-hidden bg-muted">
                        <img
                          src={result.story.coverImage}
                          alt={result.story.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-semibold text-sm text-foreground line-clamp-1 mb-1">
                          {result.story.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-1">
                          {result.matchType === 'chapter' && result.matchedChapter
                            ? `Chapter: ${result.matchedChapter.title}`
                            : result.matchType === 'content'
                            ? 'Content match'
                            : result.matchType === 'title'
                            ? 'Title match'
                            : result.matchType === 'tag'
                            ? 'Tag match'
                            : 'Match found'}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {result.story.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <span>{result.story.era}</span>
                          <span>•</span>
                          <span>{result.story.readTime} min</span>
                          <span>•</span>
                          <span className="text-primary">Score: {Math.round(result.score)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              {searchResults.length > 5 && (
                <p className="text-xs text-muted-foreground text-center">
                  +{searchResults.length - 5} more results
                </p>
              )}
            </div>
          )}

          {searchQuery && searchQuery.trim() !== "" && searchResults.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <BookOpen className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No results found for "{searchQuery}"</p>
              <p className="text-xs mt-1">Try different keywords or check your spelling</p>
            </div>
          )}

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
