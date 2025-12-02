import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, Minus, Plus, Moon, Sun, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { stories } from "@/data/stories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StoryReader = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [currentChapter, setCurrentChapter] = useState(0);
  const [fontSize, setFontSize] = useState(17);
  const [darkMode, setDarkMode] = useState(false);

  const story = stories.find((s) => s.slug === slug);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  if (!story) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-serif font-bold text-foreground">Story Not Found</h1>
          <p className="text-muted-foreground">The story you're looking for doesn't exist.</p>
          <Link to="/">
            <Button>Return to Library</Button>
          </Link>
        </div>
      </div>
    );
  }

  const chapter = story.chapters[currentChapter];

  const handlePrevChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextChapter = () => {
    if (currentChapter < story.chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="hover:bg-muted"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="hidden sm:block">
              <h1 className="font-serif font-bold text-sm sm:text-base text-foreground line-clamp-1">
                {story.title}
              </h1>
              <p className="text-xs text-muted-foreground">
                Chapter {currentChapter + 1} of {story.chapters.length}
              </p>
            </div>
          </div>

          {/* Reading Tools */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setFontSize(Math.max(14, fontSize - 1))}
              className="hidden sm:flex"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="hidden sm:inline text-sm font-medium text-muted-foreground">
              {fontSize}px
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setFontSize(Math.min(24, fontSize + 1))}
              className="hidden sm:flex"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <div className="hidden sm:block w-px h-6 bg-border" />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[300px] sm:h-[400px] overflow-hidden border-b border-border">
        <img
          src={story.heroImage}
          alt={story.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center gap-2 mb-3 text-sm">
              <span className="text-2xl">{story.eraIcon}</span>
              <span className="uppercase tracking-wider text-xs text-muted-foreground font-medium">
                {story.era}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4 leading-tight">
              {story.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span>{story.chapters.length} chapters</span>
              <span>•</span>
              <span>{story.readTime} min read</span>
              <span>•</span>
              <span>⭐ {story.rating} rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter Selector (Mobile) */}
      <div className="sm:hidden border-b border-border bg-card p-4">
        <Select
          value={currentChapter.toString()}
          onValueChange={(value) => {
            setCurrentChapter(parseInt(value));
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue>
              Chapter {currentChapter + 1}: {chapter.title}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {story.chapters.map((ch, idx) => (
              <SelectItem key={ch.id} value={idx.toString()}>
                Chapter {idx + 1}: {ch.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Table of Contents - Desktop Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-2">
              <h3 className="font-serif font-bold text-lg mb-4 text-foreground">Chapters</h3>
              {story.chapters.map((ch, idx) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    setCurrentChapter(idx);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    idx === currentChapter
                      ? "bg-primary text-primary-foreground font-medium"
                      : "hover:bg-muted text-muted-foreground"
                  }`}
                >
                  <div className="text-xs uppercase tracking-wide mb-1 opacity-75">
                    Chapter {idx + 1}
                  </div>
                  <div className="text-sm line-clamp-2">{ch.title}</div>
                </button>
              ))}
            </div>
          </aside>

          {/* Chapter Content */}
          <main className="lg:col-span-9">
            <article className="max-w-3xl mx-auto">
              <div className="mb-8">
                <div className="text-sm uppercase tracking-wider text-muted-foreground mb-2 font-medium">
                  Chapter {currentChapter + 1} of {story.chapters.length}
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">
                  {chapter.title}
                </h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>{chapter.readTime} min read</span>
                </div>
              </div>

              {/* Chapter Text */}
              <div
                className="prose-reading space-y-6 text-foreground"
                style={{ fontSize: `${fontSize}px` }}
              >
                {chapter.content.split("\n\n").map((paragraph, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Chapter Navigation */}
              <div className="mt-12 pt-8 border-t border-border flex items-center justify-between gap-4">
                <Button
                  variant="outline"
                  onClick={handlePrevChapter}
                  disabled={currentChapter === 0}
                  className="flex-1 sm:flex-none gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Previous</span>
                </Button>

                <Link to="/">
                  <Button variant="ghost" className="hidden sm:flex gap-2">
                    <BookOpen className="h-4 w-4" />
                    Table of Contents
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  onClick={handleNextChapter}
                  disabled={currentChapter === story.chapters.length - 1}
                  className="flex-1 sm:flex-none gap-2"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Completion Message */}
              {currentChapter === story.chapters.length - 1 && (
                <div className="mt-12 p-6 rounded-xl border-2 border-primary/20 bg-primary/5 text-center space-y-4">
                  <h3 className="text-2xl font-serif font-bold text-foreground">
                    You've completed this story! 🎉
                  </h3>
                  <p className="text-muted-foreground">
                    Enjoyed {story.title}? Explore more stories in our library.
                  </p>
                  <Link to="/">
                    <Button size="lg" className="bg-primary hover:bg-primary-light">
                      Back to Library
                    </Button>
                  </Link>
                </div>
              )}
            </article>
          </main>
        </div>
      </div>
    </div>
  );
};

export default StoryReader;
