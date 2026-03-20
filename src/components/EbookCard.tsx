import { Link } from "react-router-dom";
import { Clock, Star } from "lucide-react";
import { motion } from "framer-motion";

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
}: EbookCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/story/${slug}`} className="group block">
        <div className="overflow-hidden rounded-sm border border-border bg-card shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]">
          <div className="relative aspect-[5/8] overflow-hidden bg-muted">
            <img
              src={coverImage}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/12 to-transparent opacity-80" />
          </div>

          <div className="p-1.5 space-y-0.5">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-[9px]">{eraIcon}</span>
              <span className="uppercase tracking-[0.18em] text-[6px] font-medium">{era}</span>
            </div>
            <h3 className="font-serif text-[10px] font-semibold leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {title}
            </h3>
            <div className="flex items-center gap-1 text-[7px] text-muted-foreground pt-0.5">
              <span className="flex items-center gap-0.5">
                <Clock className="h-2 w-2" />
                {readTime}m
              </span>
              <span className="flex items-center gap-0.5">
                <Star className="h-2 w-2 fill-secondary text-secondary" />
                {rating}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
