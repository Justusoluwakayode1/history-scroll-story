import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { EbookCard } from "@/components/EbookCard";
import { EbookCardSkeleton } from "@/components/EbookCardSkeleton";
import { FeaturedStory } from "@/components/FeaturedStory";
import { PageTransition } from "@/components/PageTransition";
import { stories } from "@/data/stories";
import { Button } from "@/components/ui/button";
import { SearchDialog } from "@/components/SearchDialog";
import { motion } from "framer-motion";

const Index = () => {
  const [selectedEra, setSelectedEra] = useState<string>("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const eras = [
    { id: "all", label: "All Eras", icon: "📚" },
    { id: "ancient", label: "Ancient", icon: "🏛️" },
    { id: "medieval", label: "Medieval", icon: "⚔️" },
    { id: "renaissance", label: "Renaissance", icon: "🎨" },
    { id: "modern", label: "Modern", icon: "🌍" },
  ];

  const regions = [
    { id: "all", label: "All Regions", icon: "🌍" },
    { id: "europe", label: "Europe", icon: "🇪🇺" },
    { id: "asia", label: "Asia", icon: "🌏" },
    { id: "africa", label: "Africa", icon: "🌍" },
    { id: "americas", label: "Americas", icon: "🌎" },
    { id: "middle east", label: "Middle East", icon: "🕌" },
  ];

  const topics = [
    { id: "all", label: "All Topics", icon: "📖" },
    { id: "empires & kings", label: "Empires & Kings", icon: "👑" },
    { id: "wars & battles", label: "Wars & Battles", icon: "⚔️" },
    { id: "arts & culture", label: "Arts & Culture", icon: "🎨" },
    { id: "science & tech", label: "Science & Tech", icon: "🔬" },
    { id: "religion & myth", label: "Religion & Myth", icon: "🙏" },
    { id: "disasters", label: "Disasters", icon: "🌋" },
  ];

  const filteredStories = stories.filter((story) => {
    const matchesEra = selectedEra === "all" || story.era.toLowerCase() === selectedEra;
    const matchesRegion = selectedRegion === "all" || story.region.toLowerCase() === selectedRegion;
    const matchesTopic = selectedTopic === "all" || story.topic.toLowerCase() === selectedTopic;
    const matchesSearch = searchQuery === "" ||
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesEra && matchesRegion && matchesTopic && matchesSearch;
  });

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1461360370896-922624d12a74?w=1920&q=80"
              alt="Historic manuscripts and ancient texts"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background/95" />
          </div>

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="max-w-3xl mx-auto text-center space-y-6"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground leading-tight">
                Read History Like
                <span className="block text-primary mt-1">Beautiful Ebooks</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Explore centuries of human achievement through beautifully crafted stories.
                No signup required — just dive in.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
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
                <Button
                  size="lg"
                  variant="outline"
                  className="border px-6 h-11 text-sm font-medium hover:bg-card"
                  onClick={() => document.getElementById("library")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Browse All →
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured */}
        <FeaturedStory />

        {/* Library Grid */}
        <section id="library" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
                Explore the Library
              </h2>
              <p className="text-sm text-muted-foreground">
                {selectedEra === "all"
                  ? `${stories.length} beautifully crafted historical stories`
                  : `${filteredStories.length} ${eras.find((e) => e.id === selectedEra)?.label} stories`}
              </p>
            </div>

            {filteredStories.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-3 sm:gap-4">
                {filteredStories.map((story, index) => (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.03, 0.4), duration: 0.4 }}
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
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No stories found. Try different filters.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="max-w-2xl mx-auto text-center space-y-5">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
                Want to Save Your Journey?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Create a free account to bookmark stories, track your reading progress,
                and get personalized recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
                <Link to="/auth">
                  <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 h-11 font-medium">
                    Create Free Account
                  </Button>
                </Link>
                <Link to="/auth" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Already have an account? <span className="text-secondary font-medium">Sign in</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="col-span-2 md:col-span-1 space-y-3">
                <h3 className="font-serif font-bold text-base text-foreground">HistoryHub</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Read history like beautiful ebooks. No signup required.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Library</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/library" className="text-muted-foreground hover:text-foreground transition-colors">All Stories</Link></li>
                  <li><Link to="/library" className="text-muted-foreground hover:text-foreground transition-colors">Ancient History</Link></li>
                  <li><Link to="/library" className="text-muted-foreground hover:text-foreground transition-colors">Medieval Times</Link></li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
                  <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
              © 2024 HistoryHub. Built with care for history lovers.
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default Index;
