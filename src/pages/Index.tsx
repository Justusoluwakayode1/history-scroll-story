import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { EbookCard } from "@/components/EbookCard";
import { FeaturedStory } from "@/components/FeaturedStory";
import { PageTransition } from "@/components/PageTransition";
import { stories } from "@/data/stories";
import { Button } from "@/components/ui/button";
import { SearchDialog } from "@/components/SearchDialog";
import { ScrollText, Compass, Landmark, Sword, Palette, Globe2 } from "lucide-react";
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

  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      const matchesEra = selectedEra === "all" || story.era.toLowerCase() === selectedEra;
      const matchesRegion = selectedRegion === "all" || story.region.toLowerCase() === selectedRegion;
      const matchesTopic = selectedTopic === "all" || story.topic.toLowerCase() === selectedTopic;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === "" ||
        story.title.toLowerCase().includes(q) ||
        story.description.toLowerCase().includes(q) ||
        story.subCategory.toLowerCase().includes(q) ||
        story.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesEra && matchesRegion && matchesTopic && matchesSearch;
    });
  }, [selectedEra, selectedRegion, selectedTopic, searchQuery]);

  const eraHighlights = [
    { icon: Landmark, label: "Ancient Archives", value: stories.filter((s) => s.era === "Ancient").length },
    { icon: Sword, label: "Medieval Chronicles", value: stories.filter((s) => s.era === "Medieval").length },
    { icon: Palette, label: "Renaissance Works", value: stories.filter((s) => s.era === "Renaissance").length },
    { icon: Globe2, label: "Modern Records", value: stories.filter((s) => s.era === "Modern").length },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />

        <section className="border-b border-border bg-card">
          <div className="grid lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="hidden lg:block border-r border-border bg-card/80">
              <div className="sticky top-14 p-6 space-y-8">
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Archive Index</p>
                  <h2 className="font-serif text-2xl text-foreground">Browse by era</h2>
                </div>

                <nav className="space-y-2">
                  {eras.slice(1).map((era) => {
                    const count = stories.filter((story) => story.era.toLowerCase() === era.id).length;
                    return (
                      <button
                        key={era.id}
                        onClick={() => setSelectedEra(era.id)}
                        className={`w-full rounded-md border px-4 py-3 text-left transition-all ${
                          selectedEra === era.id
                            ? "border-secondary bg-secondary/10 text-foreground"
                            : "border-border bg-background hover:bg-muted"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span>{era.icon}</span>
                            <span className="font-medium text-sm">{era.label}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{count}</span>
                        </div>
                      </button>
                    );
                  })}
                </nav>

                <div className="space-y-3 border-t border-border pt-6">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Collection Stats</p>
                  <div className="space-y-3">
                    {eraHighlights.map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-center justify-between rounded-md border border-border bg-background px-3 py-2">
                        <div className="flex items-center gap-2 text-sm text-foreground">
                          <Icon className="h-4 w-4 text-secondary" />
                          <span>{label}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            <div className="min-w-0">
              <section className="relative overflow-hidden border-b border-border">
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=1920&q=80"
                    alt="Historic manuscripts, antique maps, and archival documents"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-background via-background/88 to-background/60" />
                </div>

                <div className="relative px-4 sm:px-6 lg:px-10 py-14 sm:py-18 lg:py-24">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl"
                  >
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1.5 text-[11px] uppercase tracking-[0.25em] text-muted-foreground backdrop-blur">
                      <ScrollText className="h-3.5 w-3.5 text-secondary" />
                      Editorial History Library
                    </div>

                    <h1 className="max-w-3xl font-serif text-4xl leading-none text-foreground sm:text-5xl lg:text-6xl">
                      The world’s archive of history,
                      <span className="block text-secondary">read like collected volumes.</span>
                    </h1>

                    <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                      Move through empires, wars, myths, revolutions, and forgotten cultures in a premium digital archive built for deep reading.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
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
                        className="h-12 border-border bg-card/80 px-6 text-sm backdrop-blur hover:bg-card"
                        onClick={() => document.getElementById("book-wall")?.scrollIntoView({ behavior: "smooth" })}
                      >
                        Enter the archive
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </section>

              <FeaturedStory />

              <section id="book-wall" className="px-4 py-10 sm:px-6 lg:px-10 lg:py-12">
                <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Book Wall</p>
                    <h2 className="mt-2 font-serif text-3xl text-foreground">Browse the collection</h2>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="rounded-full border border-border bg-card px-3 py-1.5">{filteredStories.length} visible stories</span>
                    {selectedEra !== "all" && (
                      <button onClick={() => setSelectedEra("all")} className="rounded-full border border-border bg-card px-3 py-1.5 hover:bg-muted">
                        Era: {eras.find((e) => e.id === selectedEra)?.label} ×
                      </button>
                    )}
                    {selectedRegion !== "all" && (
                      <button onClick={() => setSelectedRegion("all")} className="rounded-full border border-border bg-card px-3 py-1.5 hover:bg-muted">
                        Region: {regions.find((r) => r.id === selectedRegion)?.label} ×
                      </button>
                    )}
                    {selectedTopic !== "all" && (
                      <button onClick={() => setSelectedTopic("all")} className="rounded-full border border-border bg-card px-3 py-1.5 hover:bg-muted">
                        Topic: {topics.find((t) => t.id === selectedTopic)?.label} ×
                      </button>
                    )}
                  </div>
                </div>

                {filteredStories.length > 0 ? (
                  <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10">
                    {filteredStories.map((story, index) => (
                      <motion.div
                        key={story.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: Math.min(index * 0.015, 0.2) }}
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
                  <div className="rounded-lg border border-border bg-card px-6 py-16 text-center">
                    <Compass className="mx-auto h-10 w-10 text-secondary" />
                    <h3 className="mt-4 font-serif text-2xl text-foreground">No matching volumes</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Try another era, region, topic, or search phrase.</p>
                  </div>
                )}
              </section>

              <section className="border-t border-border bg-card">
                <div className="px-4 py-14 text-center sm:px-6 lg:px-10">
                  <div className="mx-auto max-w-2xl">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Membership</p>
                    <h2 className="mt-3 font-serif text-3xl text-foreground sm:text-4xl">Save your shelf, progress, and discoveries.</h2>
                    <p className="mt-4 text-muted-foreground">
                      Reading is open to everyone. Create an account only if you want bookmarks, saved journeys, and personal recommendations.
                    </p>
                    <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                      <Link to="/auth">
                        <Button className="h-11 bg-secondary px-8 text-secondary-foreground hover:bg-secondary/90">
                          Create Free Account
                        </Button>
                      </Link>
                      <Link to="/auth" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                        Already have an account? <span className="font-medium text-secondary">Sign in</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Index;
