import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Shuffle, Clock, Star, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { stories, Story } from "@/data/stories";
import { motion, AnimatePresence } from "framer-motion";

export const FeaturedStory = () => {
  const [featured, setFeatured] = useState<Story | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);

  const getRandomStory = () => stories[Math.floor(Math.random() * stories.length)];

  const shuffleStory = () => {
    setIsShuffling(true);
    let count = 0;
    const interval = setInterval(() => {
      setFeatured(getRandomStory());
      count++;
      if (count >= 8) { clearInterval(interval); setIsShuffling(false); }
    }, 100);
  };

  useEffect(() => {
    const today = new Date().toDateString();
    const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    setFeatured(stories[seed % stories.length]);
  }, []);

  if (!featured) return null;

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-secondary" />
          <h2 className="text-lg font-serif font-semibold text-foreground">Discover Today</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={shuffleStory}
          disabled={isShuffling}
          className="gap-2 text-muted-foreground hover:text-foreground text-xs"
        >
          <Shuffle className={`h-3.5 w-3.5 ${isShuffling ? 'animate-spin' : ''}`} />
          Surprise Me
        </Button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={featured.id}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-card)]"
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 relative">
              <div className="aspect-[16/10] md:aspect-auto md:absolute md:inset-0">
                <img
                  src={featured.coverImage}
                  alt={featured.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-card via-card/60 to-transparent" />
              </div>
            </div>

            <div className="flex-1 p-6 md:p-8 relative">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">{featured.eraIcon}</span>
                <span className="text-[11px] font-medium uppercase tracking-wider text-secondary">
                  {featured.era} · {featured.subCategory}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-3 line-clamp-2">
                {featured.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-5 line-clamp-2 md:line-clamp-3 leading-relaxed">
                {featured.description}
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{featured.readTime} min</span>
                <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-secondary text-secondary" />{featured.rating}</span>
                <span>{featured.chapters.length} chapters</span>
              </div>
              <Link to={`/story/${featured.slug}`}>
                <Button size="sm" className="gap-2 group bg-primary hover:bg-primary-light">
                  Start Reading
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
