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
      {/* Cover Image */}
      <Link to={`/story/${slug}`} className="block relative aspect-[3/2] overflow-hidden">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Era Badge */}
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <span className="text-lg">{eraIcon}</span>
          <span className="uppercase tracking-wider text-xs">{era}</span>
        </div>

        {/* Title */}
        <Link to={`/story/${slug}`}>
          <h3 className="font-serif text-xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{readTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            <span>{rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            <span>{chapters} chapters</span>
          </div>
        </div>

        {/* CTA Button */}
        <Link to={`/story/${slug}`} className="block">
          <Button className="w-full bg-primary hover:bg-primary-light text-primary-foreground transition-colors">
            Read Story →
          </Button>
        </Link>
      </div>
    </Card>
  );
};
