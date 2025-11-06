export type Attraction = {
  slug: string;
  title: string;
  images: string[];
  rating: number;
  reviews: number;
  description: string;
  badges?: string[];
  citeUrl?: string;
};

export const attractions: Attraction[] = [
  {
    slug: 'lake-elementaita',
    title: 'Lake Elementaita',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/2/2e/Lake_Elmenteita%2C_Kenya.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/c/ca/Y1A1869_Elmenteita%2C_Kenya.jpg'
    ],
    rating: 4.6,
    reviews: 120,
    description:
      'A shallow alkaline lake in Kenya’s Great Rift Valley and part of the Kenya Lake System UNESCO World Heritage Site. Known for large flocks of flamingos and as Kenya’s only breeding site of the Great White Pelican, with rich birdlife along the Soysambu Conservancy shoreline.',
    badges: ['More than 3 hours', 'Good for birding'],
    citeUrl: 'https://en.wikipedia.org/wiki/Lake_Elmenteita'
  },
  {
    slug: 'sleeping-warrior',
    title: 'Sleeping Warrior',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/8/86/The_%27sleeping_warrior%27_and_Lake_Elmenteita.jpg'
    ],
    rating: 4.5,
    reviews: 65,
    description:
      'A volcanic ridge inside Soysambu Conservancy whose profile resembles a reclining warrior. A popular day hike with sweeping views over Lake Elementaita, the rift escarpments, and nearby wildlife plains.',
    badges: ['Hiking', 'Scenic views'],
    citeUrl: 'https://soysambuconservancy.org/'
  },
  {
    slug: 'lake-nakuru',
    title: 'Lake Nakuru National Park',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/5/5a/Flamingos_at_lake_Nakuru.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/a/a5/Large_number_of_flamingos_at_Lake_Nakuru.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/9/9b/Lake-Nakuru-Baboon-Hill-View.JPG'
    ],
    rating: 4.7,
    reviews: 310,
    description:
      'Renowned alkaline lake and national park famous for millions of flamingos (seasonal), rhinos, and viewpoints like Baboon Cliff. Game drives offer chances to see buffalo, giraffe, zebra, and numerous raptors.',
    badges: ['Wildlife viewing', 'Scenic lookouts'],
    citeUrl: 'https://en.wikipedia.org/wiki/Lake_Nakuru'
  },
  {
    slug: 'maji-moto-elementaita-hot-springs',
    title: 'Maji Moto (Elementaita Hot Springs)',
    images: [],
    rating: 4.3,
    reviews: 40,
    description:
      'Natural hot springs near Elementaita frequented by locals. Warm, mineral-rich water bubbles through volcanic ground; access can involve rough tracks depending on conditions.',
    badges: ['Hot springs & geysers'],
    citeUrl: 'https://www.tripadvisor.com/Attraction_Review-g317067-d15664576-Reviews-Lake_Elementaita_Hot_Springs-Gilgil_Rift_Valley_Province.html'
  },
  {
    slug: 'utamaduni-nature-park-gilgil',
    title: 'Utamaduni Nature Park (Gilgil)',
    images: [],
    rating: 4.2,
    reviews: 25,
    description:
      'A small family‑friendly park near Elementaita featuring crocodiles, snakes, tortoises, ostriches and cultural exhibits. Popular for picnics and educational visits.',
    badges: ['Good for Kids', 'Free parking'],
    citeUrl: 'https://nation.africa/kenya/life-and-style/saturday-magazine/fun-affordable-activities-to-do-in-elementaita-3745076'
  },
  {
    slug: 'table-mountain-elementaita',
    title: 'Table Mountain (Elementaita)',
    images: [],
    rating: 4.4,
    reviews: 55,
    description:
      'A flat‑topped hill offering panoramic views across Lake Elementaita and the Sleeping Warrior. Commonly hiked routes are ~14 km with moderate gradients, suitable for beginners with basic fitness.',
    badges: ['Hiking', 'Great viewpoints'],
    citeUrl: 'https://cushyadventures.co/product/table-mountain-elementaita-hike/'
  },
  {
    slug: 'soysambu-game-sanctuary',
    title: 'Soysambu Game Sanctuary',
    images: [
      'https://soysambuconservancy.org/wp-content/uploads/2019/12/giraffes.jpg',
      'https://soysambuconservancy.org/wp-content/uploads/2019/09/flamingosflying2.jpg'
    ],
    rating: 4.6,
    reviews: 60,
    description:
      'A 48,000‑acre conservancy on the eastern shores of Lake Elementaita protecting endangered Rothschild’s giraffes, plains game, and 450+ bird species. Offers game drives, guided walks, and birding.',
    badges: ['Nature & Wildlife Areas'],
    citeUrl: 'https://soysambuconservancy.org/'
  },
  {
    slug: 'lake-elementaita-wildlife-sanctuary',
    title: 'Lake Elementaita Wildlife Sanctuary',
    images: [
      'https://www.kws.go.ke/sites/default/files/aa/DSC_5988.jpg',
      'https://www.kws.go.ke/sites/default/files/aa/Copy%20of%20DSC_4792.jpg'
    ],
    rating: 4.6,
    reviews: 75,
    description:
      'KWS‑managed sanctuary safeguarding the lake’s shoreline and hot springs. A key refuge for flamingos, pelicans and other waterbirds within the UNESCO‑listed Kenya Lake System.',
    badges: ['Birdwatching', 'Protected area'],
    citeUrl: 'https://www.kws.go.ke/lake-elementaita-wildlife-sanctuary'
  },
  {
    slug: 'menengai-crater',
    title: 'Menengai Crater',
    images: [
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fsamburunationalreservekenya.com%2Finformation%2Fmenengai-crater%2F&psig=AOvVaw2HUOttp4DavbU7xJucAsdA&ust=1762506748962000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCOCq6riX3ZADFQAAAAAdAAAAABAE'
    ],
    rating: 4.5,
    reviews: 48,
    description:
      'A large dormant volcanic caldera northwest of Nakuru with dramatic cliffs and panoramic views. Popular for scenic drives, short hikes and photography of the rift valley landscape.',
    badges: ['Scenic views', 'Short hikes'],
    citeUrl: 'https://en.wikipedia.org/wiki/Menengai_Crater'
  },
  {
    slug: 'lord-egerton-castle',
    title: 'Lord Egerton Castle',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/6/6b/Egerton_Castle.jpg'
    ],
    rating: 4.4,
    reviews: 32,
    description:
      'A historic mansion built in the early 20th century as a private residence. The castle features extensive gardens, elegant interiors and a fascinating story about its builder, Lord Maurice Egerton.',
    badges: ['Historic site', 'Gardens'],
    citeUrl: 'https://en.wikipedia.org/wiki/Lord_Egerton_of_Torwood'
  }
];

export function getAttractions() {
  return attractions;
}

export function getAttractionBySlug(slug: string) {
  return attractions.find(a => a.slug === slug) || null;
}
