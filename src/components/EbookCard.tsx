import { Link } from "react-router-dom";
import { Clock, Star, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface EbookCardProps {
  id: string;
  slug: string;
  title: string;
  era: string;
  eraIcon: string;
  coverImage: string;
  readTime: number;
  rating: number;
  chapters: number;
  description: string;
}

export const EbookCard = ({
  id,
  slug,
  title,
  era,
  eraIcon,
  coverImage,
  readTime,
  rating,
  chapters,
  description,
}: EbookCardProps) => {
  return (
    <Card className="group overflow-hidden border border-border bg-card shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:scale-[1.02] hover:-translate-y-1">
      {/* Cover Image - Smaller */}
      <Link to={`/story/${slug}`} className="block relative aspect-[4/3] overflow-hidden">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Content - More Compact */}
      <div className="p-3 space-y-2.5">
        {/* Era Badge */}
        <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
          <span className="text-base">{eraIcon}</span>
          <span className="uppercase tracking-wider text-[10px]">{era}</span>
        </div>

        {/* Title */}
        <Link to={`/story/${slug}`}>
          <h3 className="font-serif text-base font-bold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2 min-h-[2.5rem]">
            {title}
          </h3>
        </Link>

        {/* Meta Info - Condensed */}
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{readTime}m</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-gold text-gold" />
            <span>{rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            <span>{chapters}ch</span>
          </div>
        </div>

        {/* CTA Button - Smaller */}
        <Link to={`/story/${slug}`} className="block">
          <Button size="sm" className="w-full bg-primary hover:bg-primary-light text-primary-foreground transition-colors text-xs h-8">
            Read →
          </Button>
        </Link>
      </div>
    </Card>
  );
};
