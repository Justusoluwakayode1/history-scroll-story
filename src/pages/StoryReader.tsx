import { useState, useEffect, useMemo, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, Minus, Plus, Moon, Sun, BookOpen, Home, Type, ScrollText, FileText, Volume2, VolumeX } from "lucide-react";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { Button } from "@/components/ui/button";
import { loadStoryBySlug } from "@/data/story-loader";
import { cacheStoryForOffline } from "@/lib/offline-storage";
import { prepareForReading } from "@/utils/story-formatter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getYouTubeEmbedUrl } from "@/lib/wordpress-utils";

const StoryReader = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // Load story in unified format
  const story = useMemo(() => loadStoryBySlug(slug || ''), [slug]);

  // Check if story is hardcoded (chapters) or WordPress (paginated)
  const isHardcodedStory = story?.content.type === 'chapters';
  
  // Chapter-based state (for hardcoded stories)
  const [currentChapter, setCurrentChapter] = useState(0);
  const [fontSize, setFontSize] = useState(17);
  const [fontFamily, setFontFamily] = useState("Georgia");
  const [readingMode, setReadingMode] = useState<'scroll' | 'page' | 'audio'>('scroll');
  const [currentPage, setCurrentPage] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Page-based state (for WordPress stories)
  const [wordPressPage, setWordPressPage] = useState(0);
  const [wordPressFontSize, setWordPressFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  
  // Shared state
  const [darkMode, setDarkMode] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const fontOptions = [
    { value: "Georgia", label: "Georgia" },
    { value: "Times New Roman", label: "Times New Roman" },
    { value: "Garamond", label: "Garamond" },
    { value: "Book Antiqua", label: "Book Antiqua" },
    { value: "Palatino", label: "Palatino" },
    { value: "Arial", label: "Arial" },
    { value: "Helvetica", label: "Helvetica" },
    { value: "Verdana", label: "Verdana" },
    { value: "Inter", label: "Inter" },
  ];

  // For WordPress stories: convert to pages
  const formattedPages = useMemo(() => {
    if (!story || isHardcodedStory) return null;
    return prepareForReading(story, 2000);
  }, [story, isHardcodedStory]);

  // For hardcoded stories: chunk content into pages for page mode
  const chapterPages = useMemo(() => {
    if (!isHardcodedStory || !story || readingMode !== 'page') return [];
    const chapter = story.content.type === 'chapters' ? story.content.chapters[currentChapter] : null;
    if (!chapter) return [];
    
    const words = chapter.content.split(/\s+/);
    const wordsPerPage = 500;
    const pageArray: string[] = [];
    
    for (let i = 0; i < words.length; i += wordsPerPage) {
      pageArray.push(words.slice(i, i + wordsPerPage).join(' '));
    }
    
    return pageArray;
  }, [story, currentChapter, readingMode, isHardcodedStory]);

  // Load saved progress
  useEffect(() => {
    if (story) {
      if (isHardcodedStory) {
        const savedChapter = localStorage.getItem(`story-chapter-${story.id}`);
        if (savedChapter) {
          const chapter = parseInt(savedChapter, 10);
          if (chapter >= 0 && story.content.type === 'chapters' && chapter < story.content.chapters.length) {
            setCurrentChapter(chapter);
          }
        }
      } else {
        const savedPage = localStorage.getItem(`story-progress-${story.id}`);
        if (savedPage && formattedPages) {
          const page = parseInt(savedPage, 10);
          if (page >= 0 && page < formattedPages.totalPages) {
            setWordPressPage(page);
          }
        }
      }
    }
  }, [story, isHardcodedStory, formattedPages]);

  // Save progress
  useEffect(() => {
    if (story) {
      if (isHardcodedStory) {
        localStorage.setItem(`story-chapter-${story.id}`, currentChapter.toString());
      } else if (formattedPages) {
        localStorage.setItem(`story-progress-${story.id}`, wordPressPage.toString());
      }
    }
  }, [story, isHardcodedStory, currentChapter, wordPressPage, formattedPages]);

  // Dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Offline caching
  useEffect(() => {
    if (story) {
      cacheStoryForOffline(story);
    }
  }, [story]);

  // Audio reading mode
  const toggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in your browser');
      return;
    }

    if (isAudioPlaying) {
      speechSynthesis.cancel();
      setIsAudioPlaying(false);
      audioRef.current = null;
    } else {
      if (isHardcodedStory && story.content.type === 'chapters') {
        const chapter = story.content.chapters[currentChapter];
        if (chapter) {
          const utterance = new SpeechSynthesisUtterance(chapter.content);
          utterance.rate = 1;
          utterance.pitch = 1;
          utterance.volume = 1;
          
          utterance.onend = () => {
            setIsAudioPlaying(false);
            audioRef.current = null;
          };
          
          utterance.onerror = () => {
            setIsAudioPlaying(false);
            audioRef.current = null;
          };
          
          speechSynthesis.speak(utterance);
          audioRef.current = utterance;
          setIsAudioPlaying(true);
        }
      }
    }
  };

  // Cleanup audio
  useEffect(() => {
    return () => {
      if (isAudioPlaying) {
        speechSynthesis.cancel();
      }
    };
  }, [isAudioPlaying]);

  // Reset page when chapter changes
  useEffect(() => {
    setCurrentPage(0);
  }, [currentChapter, readingMode]);

  // Chapter navigation
  const handlePrevChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (isAudioPlaying) {
        speechSynthesis.cancel();
        setIsAudioPlaying(false);
      }
    }
  };

  const handleNextChapter = () => {
    if (isHardcodedStory && story.content.type === 'chapters') {
      if (currentChapter < story.content.chapters.length - 1) {
        setCurrentChapter(currentChapter + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (isAudioPlaying) {
          speechSynthesis.cancel();
          setIsAudioPlaying(false);
        }
      }
    }
  };

  // Page navigation for WordPress
  const handleNextPage = () => {
    if (formattedPages && wordPressPage < formattedPages.totalPages - 1) {
      setWordPressPage(wordPressPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (wordPressPage > 0) {
      setWordPressPage(wordPressPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Page navigation for chapter page mode
  const handleNextChapterPage = () => {
    if (currentPage < chapterPages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      handleNextChapter();
    }
  };

  const handlePrevChapterPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else {
      handlePrevChapter();
    }
  };

  // Swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const swipeThreshold = 50;
    const swipeDistance = touchStart - touchEnd;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > swipeThreshold) {
        if (isHardcodedStory) {
          if (readingMode === 'page' && currentPage < chapterPages.length - 1) {
            setCurrentPage(currentPage + 1);
          } else {
            handleNextChapter();
          }
        } else {
          handleNextPage();
        }
      } else if (swipeDistance < -swipeThreshold) {
        if (isHardcodedStory) {
          if (readingMode === 'page' && currentPage > 0) {
            setCurrentPage(currentPage - 1);
          } else {
            handlePrevChapter();
          }
        } else {
          handlePrevPage();
        }
      }
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  const fontSizeMap = {
    small: 16,
    medium: 18,
    large: 20,
  };

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

  // WordPress story rendering (paginated)
  if (!isHardcodedStory && formattedPages) {
    const currentPageData = formattedPages.pages[wordPressPage];
    const progressPercentage = ((wordPressPage + 1) / formattedPages.totalPages) * 100;

    return (
      <div className="min-h-screen bg-background transition-colors duration-300">
        <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
          <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="hover:bg-muted">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="hover:bg-muted">
                <Home className="h-5 w-5" />
              </Button>
              <div className="hidden sm:block">
                <h1 className="font-serif font-bold text-sm text-foreground line-clamp-1">{story.title}</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1 border rounded-lg p-1 bg-muted/50">
                <Button variant={wordPressFontSize === 'small' ? 'default' : 'ghost'} size="sm" onClick={() => setWordPressFontSize('small')} className="h-8 px-2 text-xs">A</Button>
                <Button variant={wordPressFontSize === 'medium' ? 'default' : 'ghost'} size="sm" onClick={() => setWordPressFontSize('medium')} className="h-8 px-2 text-xs">A</Button>
                <Button variant={wordPressFontSize === 'large' ? 'default' : 'ghost'} size="sm" onClick={() => setWordPressFontSize('large')} className="h-8 px-2 text-xs">A</Button>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
          <div className="h-1 bg-muted">
            <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progressPercentage}%` }} />
          </div>
        </header>

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
          <article className="w-full max-w-[800px] mx-auto">
            <div className="prose-reading text-foreground old-novel-page w-full" style={{ fontSize: `${fontSizeMap[wordPressFontSize]}px`, fontFamily: 'Georgia, serif' }} dangerouslySetInnerHTML={{ __html: currentPageData.content }} />
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex items-center justify-between gap-4 mb-4">
                <Button variant="outline" onClick={handlePrevPage} disabled={wordPressPage === 0} className="gap-2">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Previous Page</span>
                  <span className="sm:hidden">Previous</span>
                </Button>
                <div className="text-center">
                  <div className="text-sm font-medium text-foreground">Page {wordPressPage + 1} of {formattedPages.totalPages}</div>
                  <div className="text-xs text-muted-foreground mt-1">{Math.round(progressPercentage)}% complete</div>
                </div>
                <Button variant="outline" onClick={handleNextPage} disabled={wordPressPage === formattedPages.totalPages - 1} className="gap-2">
                  <span className="hidden sm:inline">Next Page</span>
                  <span className="sm:hidden">Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </article>
        </main>
      </div>
    );
  }

  // Hardcoded story rendering (chapter-based with all features)
  if (isHardcodedStory && story.content.type === 'chapters') {
    const chapter = story.content.chapters[currentChapter];

    return (
      <div className="min-h-screen bg-background transition-colors duration-300">
        <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
          <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="hover:bg-muted">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="hover:bg-muted">
                <Home className="h-5 w-5" />
              </Button>
              <div className="hidden sm:block">
                <h1 className="font-serif font-bold text-sm sm:text-base text-foreground line-clamp-1">{story.title}</h1>
                <p className="text-xs text-muted-foreground">Chapter {currentChapter + 1} of {story.content.chapters.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => setFontSize(Math.max(12, fontSize - 1))} className="hidden sm:flex">
                <Minus className="h-4 w-4" />
              </Button>
              <span className="hidden sm:inline text-sm font-medium text-muted-foreground min-w-[3rem] text-center">{fontSize}px</span>
              <Button variant="ghost" size="icon" onClick={() => setFontSize(Math.min(28, fontSize + 1))} className="hidden sm:flex">
                <Plus className="h-4 w-4" />
              </Button>
              <div className="hidden sm:block w-px h-6 bg-border" />
              <div className="hidden sm:block">
                <Select value={fontFamily} onValueChange={setFontFamily}>
                  <SelectTrigger className="w-[140px] h-9">
                    <Type className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map((font) => (
                      <SelectItem key={font.value} value={font.value}>{font.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="hidden sm:block w-px h-6 bg-border" />
              <div className="hidden sm:flex items-center gap-1 border rounded-lg p-1 bg-muted/50">
                <Button variant={readingMode === 'scroll' ? 'default' : 'ghost'} size="sm" onClick={() => { setReadingMode('scroll'); speechSynthesis.cancel(); setIsAudioPlaying(false); }} className="h-8 px-2">
                  <ScrollText className="h-4 w-4" />
                </Button>
                <Button variant={readingMode === 'page' ? 'default' : 'ghost'} size="sm" onClick={() => { setReadingMode('page'); speechSynthesis.cancel(); setIsAudioPlaying(false); }} className="h-8 px-2">
                  <FileText className="h-4 w-4" />
                </Button>
                <Button variant={readingMode === 'audio' ? 'default' : 'ghost'} size="sm" onClick={() => { setReadingMode('audio'); toggleAudio(); }} className="h-8 px-2">
                  {isAudioPlaying ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>
              <div className="hidden sm:block w-px h-6 bg-border" />
              <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </header>

        <section className="relative h-[120px] sm:h-[150px] overflow-hidden border-b border-border">
          <img 
            src={story.heroImage || story.coverImage || '/image.jpg'} 
            alt={story.title} 
            className="w-full h-full object-cover" 
            loading="eager" 
            onError={(e) => { 
              const target = e.target as HTMLImageElement;
              if (target.src.includes('/image.jpg')) {
                target.src = story.coverImage || '/placeholder.svg';
              } else if (!target.src.includes('placeholder')) {
                target.src = '/image.jpg';
              } else {
                target.src = '/placeholder.svg';
              }
            }} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
            <div className="container mx-auto max-w-4xl">
              <div className="flex items-center gap-2 mb-2 text-sm">
                <span className="text-xl">{story.eraIcon}</span>
                <span className="uppercase tracking-wider text-xs text-muted-foreground font-medium">{story.era}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-foreground leading-tight line-clamp-1">{story.title}</h1>
            </div>
          </div>
        </section>

        <div className="sm:hidden border-b border-border bg-card p-4 space-y-3">
          <Select value={currentChapter.toString()} onValueChange={(value) => { setCurrentChapter(parseInt(value)); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <SelectTrigger className="w-full">
              <SelectValue>Chapter {currentChapter + 1}: {chapter.title}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {story.content.chapters.map((ch, idx) => (
                <SelectItem key={ch.id} value={idx.toString()}>Chapter {idx + 1}: {ch.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setFontSize(Math.max(12, fontSize - 1))} className="flex-1">
              <Minus className="h-4 w-4 mr-1" />
              <span className="text-xs">Font</span>
            </Button>
            <span className="text-xs font-medium text-muted-foreground min-w-[2.5rem] text-center">{fontSize}px</span>
            <Button variant="ghost" size="sm" onClick={() => setFontSize(Math.min(28, fontSize + 1))} className="flex-1">
              <Plus className="h-4 w-4 mr-1" />
              <span className="text-xs">Font</span>
            </Button>
            <Select value={fontFamily} onValueChange={setFontFamily}>
              <SelectTrigger className="flex-1 min-w-[100px]">
                <Type className="h-4 w-4 mr-1" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontOptions.map((font) => (
                  <SelectItem key={font.value} value={font.value}>{font.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-1 border rounded-lg p-1 bg-muted/50">
            <Button variant={readingMode === 'scroll' ? 'default' : 'ghost'} size="sm" onClick={() => { setReadingMode('scroll'); speechSynthesis.cancel(); setIsAudioPlaying(false); }} className="flex-1 h-8 text-xs">
              <ScrollText className="h-3 w-3 mr-1" />
              Scroll
            </Button>
            <Button variant={readingMode === 'page' ? 'default' : 'ghost'} size="sm" onClick={() => { setReadingMode('page'); speechSynthesis.cancel(); setIsAudioPlaying(false); }} className="flex-1 h-8 text-xs">
              <FileText className="h-3 w-3 mr-1" />
              Page
            </Button>
            <Button variant={readingMode === 'audio' ? 'default' : 'ghost'} size="sm" onClick={() => { setReadingMode('audio'); toggleAudio(); }} className="flex-1 h-8 text-xs">
              {isAudioPlaying ? <VolumeX className="h-3 w-3 mr-1" /> : <Volume2 className="h-3 w-3 mr-1" />}
              Audio
            </Button>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24 space-y-2">
                <h3 className="font-serif font-bold text-lg mb-4 text-foreground">Chapters</h3>
                {story.content.chapters.map((ch, idx) => (
                  <button key={ch.id} onClick={() => { setCurrentChapter(idx); window.scrollTo({ top: 0, behavior: "smooth" }); }} className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${idx === currentChapter ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted text-muted-foreground"}`}>
                    <div className="text-xs uppercase tracking-wide mb-1 opacity-75">Chapter {idx + 1}</div>
                    <div className="text-sm line-clamp-2">{ch.title}</div>
                  </button>
                ))}
              </div>
            </aside>

            <main className="lg:col-span-9">
              <article className="max-w-3xl mx-auto">
                <div className="mb-8">
                  <div className="text-sm uppercase tracking-wider text-muted-foreground mb-2 font-medium">Chapter {currentChapter + 1} of {story.content.chapters.length}</div>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">{chapter.title}</h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    <span>{chapter.readTime} min read</span>
                    {readingMode === 'audio' && (
                      <Button variant="ghost" size="sm" onClick={toggleAudio} className="ml-2 gap-1">
                        {isAudioPlaying ? <><VolumeX className="h-4 w-4" /> Stop Audio</> : <><Volume2 className="h-4 w-4" /> Play Audio</>}
                      </Button>
                    )}
                  </div>
                </div>

                <div className="prose-reading space-y-6 text-foreground old-novel-page" style={{ fontSize: `${fontSize}px`, fontFamily: fontFamily }} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
                  {readingMode === 'page' && chapterPages.length > 0 ? (
                    <div className="space-y-6">
                      {chapterPages[currentPage].split("\n\n").map((paragraph, idx) => (
                        <p key={idx} className="leading-relaxed">{paragraph}</p>
                      ))}
                      <div className="flex items-center justify-between pt-6 border-t border-border mt-8">
                        <Button variant="outline" onClick={handlePrevChapterPage} disabled={currentPage === 0 && currentChapter === 0} className="gap-2">
                          <ChevronLeft className="h-4 w-4" />
                          Previous Page
                        </Button>
                        <span className="text-sm text-muted-foreground">{currentPage + 1} / {chapterPages.length}</span>
                        <Button variant="outline" onClick={handleNextChapterPage} disabled={currentPage === chapterPages.length - 1 && currentChapter === story.content.chapters.length - 1} className="gap-2">
                          Next Page
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {chapter.content.split("\n\n").map((paragraph, idx) => (
                        <p key={idx} className="leading-relaxed">{paragraph}</p>
                      ))}
                      {chapter.images && chapter.images.map((imageUrl, idx) => {
                        const normalizedUrl = imageUrl.startsWith('http') ? imageUrl : imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
                        return (
                          <img key={idx} src={normalizedUrl} alt={`Chapter illustration ${idx + 1}`} className="w-full max-w-2xl mx-auto my-8 rounded-lg shadow-lg" loading="lazy" onError={(e) => { const target = e.target as HTMLImageElement; target.style.display = 'none'; }} />
                        );
                      })}
                      {chapter.youtubeLinks && chapter.youtubeLinks.map((link, idx) => {
                        const embedSrc = getYouTubeEmbedUrl(link);
                        if (!embedSrc) return null;
                        return (
                          <div key={idx} className="my-8">
                            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                              <iframe className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg" src={embedSrc} title={`Video ${idx + 1}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>

                <div className="mt-12 pt-8 border-t border-border flex items-center justify-between gap-4">
                  <Button variant="outline" onClick={handlePrevChapter} disabled={currentChapter === 0} className="flex-1 sm:flex-none gap-2">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Previous</span>
                  </Button>
                  <Link to="/">
                    <Button variant="ghost" className="hidden sm:flex gap-2">
                      <BookOpen className="h-4 w-4" />
                      Table of Contents
                    </Button>
                  </Link>
                  <Button variant="outline" onClick={handleNextChapter} disabled={currentChapter === story.content.chapters.length - 1} className="flex-1 sm:flex-none gap-2">
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                {currentChapter === story.content.chapters.length - 1 && (
                  <div className="mt-12 p-6 rounded-xl border-2 border-[hsl(125,32%,25%)]/30 bg-gradient-to-br from-[hsl(125,32%,25%)]/10 via-[hsl(125,32%,30%)]/8 to-[hsl(125,32%,35%)]/10 text-center space-y-4">
                    <h3 className="text-2xl font-serif font-bold text-[hsl(125,32%,20%)]">You've completed this story! 🎉</h3>
                    <p className="text-[hsl(125,32%,25%)]/80">Enjoyed {story.title}? Explore more stories in our library.</p>
                    <Link to="/">
                      <Button size="lg" className="bg-[hsl(125,32%,25%)] hover:bg-[hsl(125,32%,30%)] text-white">Back to Library</Button>
                    </Link>
                  </div>
                )}
              </article>
            </main>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default StoryReader;
