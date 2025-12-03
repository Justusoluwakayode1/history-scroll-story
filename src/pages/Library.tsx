import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { EbookCard } from "@/components/EbookCard";
import { SearchDialog } from "@/components/SearchDialog";
import { stories } from "@/data/stories";

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
      const matchesEra = selectedEra === "all" || story.era === selectedEra;
      const matchesRegion = selectedRegion === "all" || story.region === selectedRegion;
      const matchesTopic = selectedTopic === "all" || story.topic === selectedTopic;
      const matchesSearch = searchQuery === "" || 
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesEra && matchesRegion && matchesTopic && matchesSearch;
    });
  }, [selectedEra, selectedRegion, selectedTopic, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Story Library</h1>
            <p className="text-muted-foreground">Browse all {stories.length} historical stories</p>
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

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-3 md:gap-4">
          {filteredStories.map((story) => (
            <EbookCard
              key={story.id}
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
          ))}
        </div>

        {filteredStories.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No stories found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Library;
