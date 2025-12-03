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
  slug,
  title,
  era,
  eraIcon,
  coverImage,
  readTime,
  rating,
  chapters,
}: EbookCardProps) => {
  return (
    <Card className="group overflow-hidden border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
      {/* Cover Image - Tiny */}
      <Link to={`/story/${slug}`} className="block relative aspect-[3/2] overflow-hidden">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </Link>

      {/* Content - Ultra Compact */}
      <div className="p-2 space-y-1">
        {/* Era Badge */}
        <div className="flex items-center gap-1 text-muted-foreground">
          <span className="text-xs">{eraIcon}</span>
          <span className="uppercase tracking-wider text-[8px]">{era}</span>
        </div>

        {/* Title */}
        <Link to={`/story/${slug}`}>
          <h3 className="font-serif text-xs font-semibold leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>

        {/* Meta Info */}
        <div className="flex items-center gap-2 text-[8px] text-muted-foreground">
          <div className="flex items-center gap-0.5">
            <Clock className="h-2.5 w-2.5" />
            <span>{readTime}m</span>
          </div>
          <div className="flex items-center gap-0.5">
            <Star className="h-2.5 w-2.5 fill-gold text-gold" />
            <span>{rating}</span>
          </div>
          <div className="flex items-center gap-0.5">
            <BookOpen className="h-2.5 w-2.5" />
            <span>{chapters}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
