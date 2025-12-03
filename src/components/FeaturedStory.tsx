import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Shuffle, Clock, Star, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { stories, Story } from "@/data/stories";

export const FeaturedStory = () => {
  const [featured, setFeatured] = useState<Story | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);

  const getRandomStory = () => {
    const randomIndex = Math.floor(Math.random() * stories.length);
    return stories[randomIndex];
  };

  const shuffleStory = () => {
    setIsShuffling(true);
    // Quick shuffle animation
    let count = 0;
    const interval = setInterval(() => {
      setFeatured(getRandomStory());
      count++;
      if (count >= 8) {
        clearInterval(interval);
        setIsShuffling(false);
      }
    }, 100);
  };

  useEffect(() => {
    // Set initial featured story based on date (consistent for the day)
    const today = new Date().toDateString();
    const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = seed % stories.length;
    setFeatured(stories[index]);
  }, []);

  if (!featured) return null;

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-secondary" />
          <h2 className="text-lg font-serif font-bold text-foreground">Discover Today</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={shuffleStory}
          disabled={isShuffling}
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <Shuffle className={`h-4 w-4 ${isShuffling ? 'animate-spin' : ''}`} />
          Surprise Me
        </Button>
      </div>

      <div className={`relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 ${isShuffling ? 'scale-[0.99] opacity-80' : ''}`}>
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="md:w-1/3 relative">
            <div className="aspect-[16/10] md:aspect-auto md:absolute md:inset-0">
              <img
                src={featured.coverImage}
                alt={featured.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-card via-card/50 to-transparent" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 md:p-8 relative">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{featured.eraIcon}</span>
              <span className="text-xs font-medium uppercase tracking-wider text-primary">
                {featured.era} • {featured.subCategory}
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-3 line-clamp-2">
              {featured.title}
            </h3>

            <p className="text-muted-foreground text-sm mb-4 line-clamp-2 md:line-clamp-3">
              {featured.description}
            </p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {featured.readTime} min
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-secondary text-secondary" />
                {featured.rating}
              </span>
              <span>{featured.chapters.length} chapters</span>
            </div>

            <Link to={`/story/${featured.slug}`}>
              <Button className="gap-2 group">
                Start Reading
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
