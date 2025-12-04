import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { EbookCard } from "@/components/EbookCard";
import { SearchDialog } from "@/components/SearchDialog";
import { stories } from "@/data/stories";
import { BookOpen, Filter, Sparkles } from "lucide-react";

const eras = [
  { id: "all", label: "All Eras", icon: "📚" },
  { id: "ancient", label: "Ancient", icon: "🏛️" },
  { id: "medieval", label: "Medieval", icon: "⚔️" },
  { id: "renaissance", label: "Renaissance", icon: "🎨" },
  { id: "modern", label: "Modern", icon: "🏭" },
];

const regions = [
  { id: "all", label: "All Regions", icon: "🌍" },
  { id: "europe", label: "Europe", icon: "🏰" },
  { id: "asia", label: "Asia", icon: "🏯" },
  { id: "africa", label: "Africa", icon: "🌍" },
  { id: "americas", label: "Americas", icon: "🗽" },
  { id: "middleeast", label: "Middle East", icon: "🕌" },
];

const topics = [
  { id: "all", label: "All Topics", icon: "📖" },
  { id: "empires", label: "Empires & Kings", icon: "👑" },
  { id: "wars", label: "Wars & Battles", icon: "⚔️" },
  { id: "culture", label: "Arts & Culture", icon: "🎭" },
  { id: "science", label: "Science & Tech", icon: "🔬" },
  { id: "exploration", label: "Exploration", icon: "🧭" },
  { id: "religion", label: "Religion & Myth", icon: "🙏" },
];

const Library = () => {
  const [selectedEra, setSelectedEra] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      const matchesEra = selectedEra === "all" || story.era.toLowerCase() === selectedEra.toLowerCase();
      const matchesRegion = selectedRegion === "all" || story.region.toLowerCase() === selectedRegion.toLowerCase();
      const matchesTopic = selectedTopic === "all" || story.topic.toLowerCase() === selectedTopic.toLowerCase();
      const matchesSearch = searchQuery === "" || 
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesEra && matchesRegion && matchesTopic && matchesSearch;
    });
  }, [selectedEra, selectedRegion, selectedTopic, searchQuery]);

  const hasActiveFilters = selectedEra !== "all" || selectedRegion !== "all" || selectedTopic !== "all" || searchQuery !== "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(125,35%,20%)] via-[hsl(125,32%,25%)] to-[hsl(125,30%,22%)]">
      <Header />
      
      {/* Hero Section - Rich Green Theme */}
      <section className="relative overflow-hidden border-b border-[hsl(125,32%,30%)] bg-gradient-to-br from-[hsl(125,35%,25%)] via-[hsl(125,32%,28%)] to-[hsl(125,30%,26%)]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/image.jpg" 
            alt="Library" 
            className="w-full h-full object-cover opacity-30"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(125,35%,25%)] via-[hsl(125,32%,28%)] to-[hsl(125,30%,26%)]" />
        </div>
        <div className="absolute inset-0 opacity-20 z-0">
          <div className="absolute top-10 left-10 text-6xl">📚</div>
          <div className="absolute bottom-10 right-10 text-6xl">📖</div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl opacity-10">📜</div>
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="rounded-full bg-white/20 backdrop-blur p-3 border border-white/30">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white drop-shadow-lg">
                Story Library
              </h1>
            </div>
            <p className="text-lg text-white/90 max-w-2xl mx-auto drop-shadow">
              Explore {stories.length} beautifully crafted historical stories from every era and corner of the world.
            </p>
            {hasActiveFilters && (
              <div className="flex items-center justify-center gap-2 pt-2">
                <Filter className="h-4 w-4 text-[hsl(41,60%,70%)]" />
                <span className="text-sm text-white/90">
                  Showing <span className="font-semibold text-[hsl(41,60%,70%)]">{filteredStories.length}</span> stories
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[hsl(41,60%,70%)]" />
            <h2 className="text-xl font-serif font-bold text-white">Discover Stories</h2>
          </div>
          <SearchDialog
            eras={eras}
            regions={regions}
            topics={topics}
            selectedEra={selectedEra}
            selectedRegion={selectedRegion}
            selectedTopic={selectedTopic}
            searchQuery={searchQuery}
            onEraChange={setSelectedEra}
            onRegionChange={setSelectedRegion}
            onTopicChange={setSelectedTopic}
            onSearchChange={setSearchQuery}
            totalResults={filteredStories.length}
          />
        </div>

        {/* Stories Grid */}
        {filteredStories.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-3 md:gap-4 animate-fade-in">
            {filteredStories.map((story, index) => (
              <div
                key={story.id}
                className="animate-fade-up"
                style={{ animationDelay: `${Math.min(index * 0.02, 0.3)}s` }}
              >
                <EbookCard
                  id={story.id}
                  slug={story.slug}
                  title={story.title}
                  era={story.era}
                  eraIcon={story.eraIcon}
                  coverImage={story.coverImage}
                  readTime={story.readTime}
                  rating={story.rating}
                  chapters={story.chapters.length}
                  description={story.description}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/10 backdrop-blur rounded-xl border border-white/20">
            <div className="max-w-md mx-auto space-y-4">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-serif font-bold text-white">No Stories Found</h3>
              <p className="text-white/80">
                Try adjusting your filters or search terms to find what you're looking for.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Library;
