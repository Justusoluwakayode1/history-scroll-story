export interface Story {
  id: string;
  slug: string;
  title: string;
  era: string;
  eraIcon: string;
  coverImage: string;
  heroImage: string;
  description: string;
  author: string;
  readTime: number;
  rating: number;
  chapters: Chapter[];
  tags: string[];
  publishedDate: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface Chapter {
  id: string;
  title: string;
  content: string;
  readTime: number;
}

export const stories: Story[] = [
  {
    id: 'roman-empire',
    slug: 'roman-empire',
    title: 'The Rise and Fall of the Roman Empire',
    era: 'Ancient',
    eraIcon: '🏛️',
    coverImage: '/placeholder.svg',
    heroImage: '/placeholder.svg',
    description: 'From humble republic to mighty empire, discover how Rome shaped the ancient world and left a legacy that echoes through millennia.',
    author: 'HistoryHub',
    readTime: 15,
    rating: 4.8,
    chapters: [
      {
        id: 'chapter-1',
        title: 'The Founding of Rome',
        content: `According to ancient legend, Rome was founded in 753 BCE by Romulus and Remus, twin brothers raised by a she-wolf. While the myth is captivating, archaeological evidence suggests the city grew from small settlements on the Palatine Hill.

The early Romans were fierce warriors and shrewd politicians. Under the rule of seven legendary kings, Rome transformed from a collection of hilltop villages into a formidable city-state. The last king, Tarquin the Proud, was overthrown in 509 BCE, giving birth to the Roman Republic.

This new republic was governed by elected officials and a senate of aristocrats. It was a system that would endure for nearly 500 years and lay the foundation for Rome's extraordinary expansion across the Mediterranean world.`,
        readTime: 3
      },
      {
        id: 'chapter-2',
        title: 'The Republic Expands',
        content: `Through a combination of military might, strategic alliances, and political cunning, the Roman Republic began its relentless expansion. The Punic Wars against Carthage (264-146 BCE) marked a turning point, transforming Rome from a regional power into the dominant force of the Mediterranean.

General Hannibal Barca famously crossed the Alps with war elephants, shocking the Romans with his bold tactics. Yet Rome's resilience proved stronger. After decades of brutal warfare, Carthage was destroyed, and Rome claimed vast territories in North Africa, Spain, and beyond.

The spoils of conquest brought immense wealth but also social upheaval. The gap between rich and poor widened dramatically, setting the stage for the turbulent final century of the Republic.`,
        readTime: 4
      },
      {
        id: 'chapter-3',
        title: 'Caesar and the End of the Republic',
        content: `Julius Caesar emerged as one of history's most brilliant military commanders and controversial political figures. His conquest of Gaul (modern-day France) brought him glory and a loyal army, but his ambition threatened the traditional power structure of Rome.

In 49 BCE, Caesar crossed the Rubicon River with his legions—an act of war against the Roman Senate. "The die is cast," he allegedly declared, committing to a path that would end the Republic forever.

After defeating his rivals, Caesar became dictator. His reforms were progressive—reducing debt, expanding Roman citizenship, and reforming the calendar. But his concentration of power alarmed many. On the Ides of March, 44 BCE, Caesar was assassinated by senators who believed they were saving the Republic. Instead, they doomed it.`,
        readTime: 4
      },
      {
        id: 'chapter-4',
        title: 'The Age of Augustus',
        content: `From the chaos following Caesar's assassination emerged Octavian, Caesar's adopted heir. After defeating Mark Antony and Cleopatra at the Battle of Actium in 31 BCE, Octavian became the undisputed ruler of Rome.

He cleverly maintained the facade of the Republic while wielding absolute power. The Senate granted him the title "Augustus" (the exalted one), and he became Rome's first emperor in all but name.

Augustus's reign ushered in the Pax Romana—two centuries of relative peace and prosperity. He reformed the administration, built magnificent public works, and established a professional army. Under his rule, Rome flourished as never before, its influence extending from Britain to Egypt, from Spain to Syria.`,
        readTime: 4
      },
      {
        id: 'chapter-5',
        title: 'Decline and Transformation',
        content: `By the 3rd century CE, the Roman Empire faced mounting pressures. Economic troubles, political instability, and pressure from Germanic tribes along the frontiers weakened the once-mighty state.

Emperor Constantine made two momentous decisions: he embraced Christianity, transforming it from a persecuted sect to the empire's official religion, and he moved the capital to Constantinople (modern Istanbul), shifting Rome's center of gravity eastward.

In 476 CE, the last Western Roman Emperor was deposed by Germanic chieftain Odoacer. Yet Rome's legacy endured. The Eastern Roman Empire (Byzantium) survived another thousand years. Roman law, language, architecture, and political concepts profoundly influenced European civilization. In many ways, we still live in the shadow of Rome's achievements.`,
        readTime: 5
      }
    ],
    tags: ['rome', 'empire', 'caesar', 'ancient', 'republic'],
    publishedDate: '2024-01-15',
    difficulty: 'beginner'
  },
  {
    id: 'ancient-egypt',
    slug: 'ancient-egypt',
    title: 'Mysteries of Ancient Egypt',
    era: 'Ancient',
    eraIcon: '🏛️',
    coverImage: '/placeholder.svg',
    heroImage: '/placeholder.svg',
    description: 'Uncover the secrets of pharaohs, pyramids, and the Nile civilization that fascinated the world for over 3,000 years.',
    author: 'HistoryHub',
    readTime: 18,
    rating: 4.9,
    chapters: [
      {
        id: 'chapter-1',
        title: 'Gift of the Nile',
        content: `The ancient Greek historian Herodotus called Egypt "the gift of the Nile," and with good reason. This mighty river, flowing through an otherwise barren desert, created a ribbon of fertile land that sustained one of history's greatest civilizations.

Every year, the Nile flooded predictably, depositing rich silt that made the soil incredibly productive. Egyptian farmers grew wheat, barley, flax, and papyrus along its banks. The river also served as a highway, with boats carrying goods and people throughout the kingdom.

This agricultural abundance allowed Egypt to develop a complex society with specialized workers: priests, scribes, artisans, and builders who would create monuments that still amaze us today.`,
        readTime: 3
      },
      {
        id: 'chapter-2',
        title: 'The God-Kings',
        content: `Egyptian pharaohs were not merely rulers—they were considered living gods, intermediaries between the divine and mortal realms. This god-king ideology gave them absolute authority and inspired their subjects to build monuments of staggering ambition.

The pharaoh's responsibilities included maintaining ma'at (cosmic order), ensuring the Nile's flood, and protecting Egypt from chaos. Elaborate rituals and ceremonies reinforced their divine status.

Some pharaohs, like Hatshepsut, broke conventions. She ruled as a female pharaoh, depicting herself with a ceremonial beard. Others, like Akhenaten, revolutionized religion by promoting worship of a single god, the sun disk Aten—an experiment that ended with his death.`,
        readTime: 4
      },
      {
        id: 'chapter-3',
        title: 'Building for Eternity',
        content: `The pyramids stand as Egypt's most iconic achievements. The Great Pyramid of Giza, built for Pharaoh Khufu around 2560 BCE, was the world's tallest structure for nearly 4,000 years.

Contrary to popular belief, these monuments weren't built by slaves but by skilled workers who took pride in their craft. They organized into teams, left graffiti boasting of their efforts, and received wages in beer and bread.

The construction required sophisticated mathematics, astronomy, and engineering. Each massive limestone block (averaging 2.5 tons) was quarried, transported, and precisely positioned. The pyramid's sides align almost perfectly with the cardinal directions, demonstrating the Egyptians' astronomical knowledge.`,
        readTime: 4
      },
      {
        id: 'chapter-4',
        title: 'Journey to the Afterlife',
        content: `Ancient Egyptians were obsessed with death—or rather, with ensuring eternal life. They believed death was merely a transition to another existence, provided the body was preserved and proper rituals performed.

Mummification was a complex process taking 70 days. Embalmers removed internal organs (except the heart, considered the seat of intelligence), dried the body with natron salt, and wrapped it in linen. The brain was removed through the nose—deemed unimportant.

The tomb became a house for eternity, filled with everything needed in the afterlife: food, furniture, servants (represented by shabti figurines), and the Book of the Dead—a guide to navigating the dangerous journey through the underworld.`,
        readTime: 4
      },
      {
        id: 'chapter-5',
        title: 'Legacy and Mystery',
        content: `Ancient Egypt declined gradually, conquered by Persians, Greeks, and finally Romans. When Cleopatra VII died in 30 BCE, Egypt became a Roman province, ending three millennia of pharaonic civilization.

Yet Egypt's legacy endures. Its monumental architecture inspired countless later buildings. Egyptian mathematics and medicine advanced human knowledge. The concept of a 365-day calendar originated here.

Mysteries remain. How exactly were the pyramids built? What happened to Nefertiti's mummy? What secrets still lie buried beneath the desert sands? Modern archaeology continues to uncover surprises, ensuring that ancient Egypt remains as fascinating today as when Victorian explorers first entered the tombs.`,
        readTime: 3
      }
    ],
    tags: ['egypt', 'pharaohs', 'pyramids', 'ancient', 'nile'],
    publishedDate: '2024-01-16',
    difficulty: 'beginner'
  },
  {
    id: 'greek-mythology',
    slug: 'greek-mythology',
    title: 'Gods, Heroes, and Legends of Ancient Greece',
    era: 'Ancient',
    eraIcon: '🏛️',
    coverImage: '/placeholder.svg',
    heroImage: '/placeholder.svg',
    description: 'Journey through Mount Olympus and beyond, exploring the myths that shaped Western culture and still captivate imaginations.',
    author: 'HistoryHub',
    readTime: 16,
    rating: 4.7,
    chapters: [
      {
        id: 'chapter-1',
        title: 'The Creation and the Titans',
        content: `In the beginning was Chaos—a void of nothingness. From this emerged Gaia (Earth), Tartarus (the underworld), and Eros (love). Gaia gave birth to Uranus (sky), and together they created the Titans, powerful primordial deities.

Kronos, youngest of the Titans, overthrew his father Uranus with a sickle. Fearing the same fate, Kronos swallowed each of his children as they were born. But his wife Rhea tricked him, hiding their youngest son Zeus and giving Kronos a stone wrapped in swaddling clothes instead.

Zeus grew up in secret on the island of Crete. When he reached maturity, he returned to challenge his father, forcing Kronos to regurgitate his siblings. Together, these Olympian gods waged a ten-year war against the Titans—the Titanomachy—ultimately claiming dominion over the cosmos.`,
        readTime: 3
      }
    ],
    tags: ['greece', 'mythology', 'zeus', 'ancient', 'heroes'],
    publishedDate: '2024-01-17',
    difficulty: 'beginner'
  },
  {
    id: 'black-death',
    slug: 'black-death',
    title: 'The Black Death: Plague That Changed Europe',
    era: 'Medieval',
    eraIcon: '⚔️',
    coverImage: '/placeholder.svg',
    heroImage: '/placeholder.svg',
    description: 'The devastating pandemic that killed millions and transformed medieval society forever.',
    author: 'HistoryHub',
    readTime: 14,
    rating: 4.6,
    chapters: [
      {
        id: 'chapter-1',
        title: 'Arrival of Death',
        content: `In October 1347, twelve Genoese trading ships docked at the Sicilian port of Messina. What they carried would change history: the Black Death, a plague so deadly it would kill an estimated 30-60% of Europe's population.

The disease spread with terrifying speed. Victims developed painful swellings (buboes) in their lymph nodes, black spots from internal bleeding, and high fever. Most died within days of showing symptoms.

Medieval people had no understanding of bacteria or how disease spread. They blamed everything from bad air to divine punishment to conspiracies. In their desperation, some flagellants publicly whipped themselves, believing suffering would appease God's wrath.`,
        readTime: 3
      }
    ],
    tags: ['plague', 'medieval', 'pandemic', 'europe', 'disease'],
    publishedDate: '2024-01-18',
    difficulty: 'intermediate'
  },
  {
    id: 'samurai-warriors',
    slug: 'samurai-warriors',
    title: 'Way of the Samurai: Honor and the Blade',
    era: 'Medieval',
    eraIcon: '⚔️',
    coverImage: '/placeholder.svg',
    heroImage: '/placeholder.svg',
    description: 'Explore the code of bushido and the legendary warriors who shaped feudal Japan.',
    author: 'HistoryHub',
    readTime: 17,
    rating: 4.8,
    chapters: [
      {
        id: 'chapter-1',
        title: 'Birth of the Warrior Class',
        content: `The samurai emerged during the Heian period (794-1185 CE) as provincial warriors serving local lords. Originally, they were skilled horsemen and archers, not the sword-wielding figures of later legend.

As central government authority weakened, these warriors gained power and influence. The Genpei War (1180-1185) between the Taira and Minamoto clans marked a turning point, establishing the first shogunate—military government—under Minamoto no Yoritomo.

The samurai became Japan's ruling class, combining martial prowess with administrative duties. They were expected to be literate, cultured, and skilled in arts like calligraphy and tea ceremony, embodying the ideal of "bun bu ryodo" (the dual way of culture and martial arts).`,
        readTime: 4
      }
    ],
    tags: ['samurai', 'japan', 'bushido', 'medieval', 'warriors'],
    publishedDate: '2024-01-19',
    difficulty: 'intermediate'
  },
  {
    id: 'crusades',
    slug: 'crusades',
    title: 'The Crusades: Holy Wars and Cultural Exchange',
    era: 'Medieval',
    eraIcon: '⚔️',
    coverImage: '/placeholder.svg',
    heroImage: '/placeholder.svg',
    description: 'Religious warfare, political intrigue, and unexpected cultural connections between East and West.',
    author: 'HistoryHub',
    readTime: 19,
    rating: 4.5,
    chapters: [
      {
        id: 'chapter-1',
        title: 'Call to Arms',
        content: `In November 1095, Pope Urban II delivered a sermon at Clermont that would launch two centuries of holy war. He called upon Christian knights to reclaim Jerusalem and the Holy Land from Muslim control.

"Deus vult!" ("God wills it!") became the crusaders' battle cry. Tens of thousands took up the cross—nobles seeking glory, merchants seeking profit, peasants seeking salvation, and adventurers seeking fortune.

The First Crusade (1096-1099) succeeded against odds, capturing Jerusalem in 1099. But this victory came at tremendous cost, including the massacre of the city's Muslim and Jewish inhabitants—an atrocity that would poison Christian-Muslim relations for generations.`,
        readTime: 4
      }
    ],
    tags: ['crusades', 'medieval', 'jerusalem', 'knights', 'religious-war'],
    publishedDate: '2024-01-20',
    difficulty: 'advanced'
  },
  {
    id: 'leonardo-da-vinci',
    slug: 'leonardo-da-vinci',
    title: 'Leonardo da Vinci: Renaissance Genius',
    era: 'Renaissance',
    eraIcon: '🎨',
    coverImage: '/placeholder.svg',
    heroImage: '/placeholder.svg',
    description: 'Artist, inventor, scientist—discover the ultimate Renaissance man whose curiosity knew no bounds.',
    author: 'HistoryHub',
    readTime: 15,
    rating: 4.9,
    chapters: [
      {
        id: 'chapter-1',
        title: 'The Curious Child',
        content: `Leonardo di ser Piero da Vinci was born in 1452 in the Tuscan hill town of Vinci. As the illegitimate son of a notary, he couldn't attend university or follow his father's profession—a limitation that paradoxically freed him to pursue unconventional paths.

Young Leonardo displayed extraordinary talent for drawing and observation. At fourteen, he was apprenticed to Andrea del Verrocchio, one of Florence's leading artists. There he learned painting, sculpture, metalworking, and engineering.

According to legend, Leonardo's angel in Verrocchio's "Baptism of Christ" was so beautiful that the master never painted again. Whether true or not, the story captures Leonardo's remarkable gifts emerging even in youth.`,
        readTime: 3
      }
    ],
    tags: ['leonardo', 'renaissance', 'art', 'science', 'invention'],
    publishedDate: '2024-01-21',
    difficulty: 'beginner'
  },
  {
    id: 'printing-press',
    slug: 'printing-press',
    title: 'The Printing Press: Revolution in Communication',
    era: 'Renaissance',
    eraIcon: '🎨',
    coverImage: '/placeholder.svg',
    heroImage: '/placeholder.svg',
    description: 'How Gutenberg\'s invention transformed knowledge, religion, and society.',
    author: 'HistoryHub',
    readTime: 13,
    rating: 4.7,
    chapters: [
      {
        id: 'chapter-1',
        title: 'Before the Press',
        content: `In medieval Europe, books were rare and expensive treasures. Each manuscript was laboriously copied by hand, typically by monks in monastery scriptoriums. A single Bible might take years to complete.

This scarcity meant knowledge was controlled by the few—primarily the Church and aristocracy. Most people never owned a book or learned to read. Education remained the privilege of elites.

Various civilizations had invented printing—the Chinese used woodblock printing centuries earlier. But Johannes Gutenberg's innovation of movable metal type around 1440 would prove revolutionary, making mass production of texts finally practical in Europe.`,
        readTime: 3
      }
    ],
    tags: ['printing', 'gutenberg', 'renaissance', 'technology', 'books'],
    publishedDate: '2024-01-22',
    difficulty: 'intermediate'
  },
  {
    id: 'age-of-exploration',
    slug: 'age-of-exploration',
    title: 'Age of Exploration: Discovering the World',
    era: 'Renaissance',
    eraIcon: '🎨',
    coverImage: '/placeholder.svg',
    heroImage: '/placeholder.svg',
    description: 'Brave sailors, new continents, and the era that connected the globe forever.',
    author: 'HistoryHub',
    readTime: 20,
    rating: 4.6,
    chapters: [
      {
        id: 'chapter-1',
        title: 'Setting Sail into the Unknown',
        content: `In the 15th century, Europeans knew little of the world beyond their shores. Asia was a land of legend and luxury goods. Africa's interior was unmapped. The Americas were completely unknown to them.

Several factors drove exploration: desire for Asian spices and silks, religious zeal to spread Christianity, competition between emerging nation-states, and improvements in navigation technology like the magnetic compass and astrolabe.

Portugal led the way under Prince Henry the Navigator, who sponsored expeditions down Africa's coast. Each voyage pushed a little farther into unknown waters, gathering knowledge and establishing trading posts, gradually opening a sea route to the riches of the East.`,
        readTime: 4
      }
    ],
    tags: ['exploration', 'columbus', 'renaissance', 'discovery', 'ships'],
    publishedDate: '2024-01-23',
    difficulty: 'intermediate'
  },
  {
    id: 'world-war-one',
    slug: 'world-war-one',
    title: 'The Great War: World War I',
    era: 'Modern',
    eraIcon: '🌍',
    coverImage: '/placeholder.svg',
    heroImage: '/placeholder.svg',
    description: 'The war that ended empires, redrew borders, and changed warfare forever.',
    author: 'HistoryHub',
    readTime: 22,
    rating: 4.8,
    chapters: [
      {
        id: 'chapter-1',
        title: 'Shots That Shook the World',
        content: `On June 28, 1914, Archduke Franz Ferdinand of Austria-Hungary was assassinated in Sarajevo by Gavrilo Princip, a Serbian nationalist. This single act triggered a chain reaction through Europe's complex alliance system.

Austria-Hungary blamed Serbia and declared war. Russia mobilized to support Serbia. Germany supported Austria-Hungary and declared war on Russia and France. Britain entered to defend Belgium's neutrality when Germany invaded.

Within weeks, Europe's great powers were at war. What began as a regional conflict in the Balkans exploded into a global catastrophe. Millions marched off to battle, expecting a quick, glorious victory. Few imagined the horror that awaited them.`,
        readTime: 4
      }
    ],
    tags: ['wwi', 'war', 'modern', 'trenches', 'europe'],
    publishedDate: '2024-01-24',
    difficulty: 'advanced'
  },
  {
    id: 'space-race',
    slug: 'space-race',
    title: 'The Space Race: Reaching for the Stars',
    era: 'Modern',
    eraIcon: '🌍',
    coverImage: '/placeholder.svg',
    heroImage: '/placeholder.svg',
    description: 'Cold War rivalry that propelled humanity into the cosmos and to the Moon.',
    author: 'HistoryHub',
    readTime: 18,
    rating: 4.9,
    chapters: [
      {
        id: 'chapter-1',
        title: 'Cold War in the Cosmos',
        content: `After World War II, the United States and Soviet Union emerged as superpowers locked in an ideological struggle. Unable to fight directly without risking nuclear annihilation, they competed for superiority in technology, culture, and most dramatically, space exploration.

The Space Race began in earnest on October 4, 1957, when the Soviet Union launched Sputnik, the first artificial satellite. Its radio beeps shocked Americans, suggesting Soviet technological superiority and raising fears about national security.

President Eisenhower responded by creating NASA and dramatically increasing funding for science education and research. The space race was on, with both nations pouring resources into reaching milestones first—and demonstrating their system's superiority to the watching world.`,
        readTime: 4
      }
    ],
    tags: ['space', 'cold-war', 'modern', 'nasa', 'moon'],
    publishedDate: '2024-01-25',
    difficulty: 'beginner'
  },
  {
    id: 'digital-revolution',
    slug: 'digital-revolution',
    title: 'The Digital Revolution: Computing Changes Everything',
    era: 'Modern',
    eraIcon: '🌍',
    coverImage: '/placeholder.svg',
    heroImage: '/placeholder.svg',
    description: 'From room-sized computers to smartphones—the technology transformation of our era.',
    author: 'HistoryHub',
    readTime: 16,
    rating: 4.7,
    chapters: [
      {
        id: 'chapter-1',
        title: 'From Machines to Microchips',
        content: `The first electronic computers, built in the 1940s, were enormous machines filling entire rooms. ENIAC, completed in 1945, weighed 30 tons and consumed as much power as a small town. These early computers required specialized knowledge to operate and were accessible only to governments and large institutions.

The invention of the transistor in 1947 at Bell Labs began the miniaturization revolution. Transistors replaced bulky vacuum tubes, making computers smaller, more reliable, and less power-hungry. The integrated circuit (1958) and microprocessor (1971) continued this trend.

By the mid-1970s, computers small and affordable enough for individuals began appearing. The Altair 8800, Apple II, and Commodore PET brought computing power to enthusiasts and hobbyists, setting the stage for the personal computer revolution.`,
        readTime: 4
      }
    ],
    tags: ['technology', 'computers', 'modern', 'internet', 'digital'],
    publishedDate: '2024-01-26',
    difficulty: 'beginner'
  }
];
