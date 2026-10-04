/**
 * REMOTE PLACEHOLDER MEDIA — the single swap point.
 *
 * Every image on the site is resolved through this map. To move to local
 * assets later, replace each `src` with a path such as
 * `/images/wedding/wedding-01.jpg` — no component changes are required.
 *
 * Unsplash/Pexels direct photo URLs are used with their permissive licences.
 * Do not reintroduce the deprecated `source.unsplash.com` endpoint.
 * Widths are pre-sized because `images.unoptimized` disables the responsive
 * srcset, so each URL is requested at (roughly) the size it is displayed.
 */

const unsplash = (id: string, width: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=75`;

export type Media = {
  src: string;
  alt: string;
  /** Natural pixel dimensions, when known. Used to preserve true aspect ratio. */
  width?: number;
  height?: number;
};

export type MediaKey =
  | "hero"
  | "wedding-01"
  | "wedding-02"
  | "wedding-03"
  | "wedding-04"
  | "wedding-05"
  | "wedding-06"
  | "couple-01"
  | "couple-02"
  | "couple-03"
  | "ceremony-01"
  | "ceremony-02"
  | "details-01"
  | "details-02"
  | "details-03"
  | "portrait-01"
  | "portrait-02"
  | "team-01"
  | "team-02"
  | "album-01"
  | "album-02"
  | "album-03"
  | "film-poster"
  | "film-mp4"
  | "film-thumb"
  | "highlight-01"
  | "highlight-02"
  | "highlight-03"
  | "philosophy-01"
  | "album-shot-01"
  | "album-shot-02"
  | "album-shot-03"
  | "selected-01"
  | "selected-02"
  | "selected-03"
  | "selected-04"
  | "featured-01"
  | "featured-02"
  | "featured-03"
  | "featured-04"
  | "featured-05"
  | "sequence-01"
  | "sequence-02"
  | "portfolio-01"
  | "portfolio-02"
  | "portfolio-03"
  | "portfolio-04"
  | "frame-01"
  | "frame-02"
  | "frame-03"
  | "frame-04"
  | "frame-05"
  | "frame-06"
  | "frame-07"
  | "frame-08"
  | "frame-09"
  | "frame-10"
  | "frame-11"
  | "frame-12"
  | "og-image";

export const media: Record<MediaKey, Media> = {
  hero: {
    src: unsplash("photo-1519741497674-611481863552", 1920),
    alt: "A bride and groom walk together beneath a canopy of marigolds at a Kerala wedding",
  },
  "wedding-01": {
    src: unsplash("photo-1511285560929-80b456fea0bc", 1400),
    alt: "A couple exchange garlands during a sunlit Kerala wedding ceremony",
  },
  "wedding-02": {
    src: unsplash("photo-1465495976277-4387d4b0b4c6", 1400),
    alt: "Guests showering flower petals over a newly married couple",
  },
  "wedding-03": {
    src: unsplash("photo-1519225421980-715cb0215aed", 1400),
    alt: "A long wedding table dressed with candles and tropical foliage",
  },
  "wedding-04": {
    src: unsplash("photo-1583939003579-730e3918a45a", 1400),
    alt: "A groom lifts his bride as the sun sets behind a palm grove",
  },
  "wedding-05": {
    src: unsplash("photo-1591604466107-ec97de577aff", 1400),
    alt: "Mehendi detail on a bride's hands resting on red silk",
  },
  "wedding-06": {
    src: unsplash("photo-1610030469983-98e550d6193c", 1400),
    alt: "A South Indian bride in a red and gold saree framed by jasmine garlands",
  },
  "couple-01": {
    src: unsplash("photo-1522673607200-164d1b6ce486", 1400),
    alt: "A couple walking hand in hand along a quiet beach at dusk",
  },
  "couple-02": {
    src: unsplash("photo-1529636798458-92182e662485", 1400),
    alt: "A couple sharing a private moment in a lantern-lit courtyard",
  },
  "couple-03": {
    src: unsplash("photo-1537633552985-df8429e8048b", 1400),
    alt: "A couple laughing together against a wall of monsoon green",
  },
  "ceremony-01": {
    src: unsplash("photo-1606800052052-a08af7148866", 1400),
    alt: "Family gathered around a traditional wedding ceremony under a decorated pandal",
  },
  "ceremony-02": {
    src: unsplash("photo-1604017011826-d3b4c23f8914", 1400),
    alt: "An Indian couple standing together during their wedding rituals",
  },
  "details-01": {
    src: unsplash("photo-1546032996-6dfacbacbf3f", 1200),
    alt: "Close-up of jasmine and rose garlands laid out before a wedding",
  },
  "details-02": {
    src: unsplash("photo-1519741497674-611481863552", 1200),
    alt: "Wedding bands and a folded vow card resting on ivory linen",
  },
  "details-03": {
    src: unsplash("photo-1511285560929-80b456fea0bc", 1200),
    alt: "Details of a bridal bouquet in soft afternoon light",
  },
  "portrait-01": {
    src: unsplash("photo-1507504031003-b417219a0fde", 900),
    alt: "Portrait of a bride adjusting her jewellery in a mirror",
  },
  "portrait-02": {
    src: unsplash("photo-1500648767791-00dcc994a43e", 900),
    alt: "Editorial portrait of a groom in a cream kurta",
  },
  "team-01": {
    src: unsplash("photo-1500648767791-00dcc994a43e", 1000),
    alt: "Arjun Menon, photographer and creative director, in soft window light",
  },
  "team-02": {
    src: unsplash("photo-1494790108377-be9c29b29330", 1000),
    alt: "Maya Thomas, photographer and filmmaker, holding a camera",
  },
  "album-01": {
    src: unsplash("photo-1519741497674-611481863552", 1200),
    alt: "A linen-bound wedding album open to a full-bleed spread",
  },
  "album-02": {
    src: unsplash("photo-1522673607200-164d1b6ce486", 1200),
    alt: "Hands turning the pages of a handcrafted wedding album",
  },
  "album-03": {
    src: unsplash("photo-1537633552985-df8429e8048b", 1200),
    alt: "A stack of cloth-bound albums with gold foil lettering",
  },
  "film-poster": {
    src: "/cta/IMG_8131.jpg",
    alt: "A newly married couple silhouetted against a golden backwater sunset",
  },
  "film-mp4": {
    src: "https://res.cloudinary.com/demo/video/upload/dog.mp4",
    alt: "",
  },
  "film-thumb": {
    src: "/film/film-16x9.jpg",
    alt: "A bride and groom standing together before an arched doorway",
  },
  "highlight-01": {
    src: "/highlight/IMG_8134.JPG.jpg",
    alt: "Ananya and Arjun in white, embracing on the lawn beside the Kumarakom backwaters",
  },
  "highlight-02": {
    src: "/highlight/DSC09480.webp",
    alt: "Diya and Akash smiling together under blossom trees in Goa",
  },
  "highlight-03": {
    src: "/highlight/DSC07291.webp",
    alt: "Meera and Adam in a black tuxedo and lace gown by a window in Fort Kochi",
  },
  "philosophy-01": {
    src: "/philosophy/DSC05443.webp",
    alt: "A bride in a lace gown sharing a quiet moment with her mother before the ceremony",
  },
  "album-shot-01": {
    src: "/album/DSC05509.webp",
    alt: "A bride holding a white rose bouquet beside a tall window",
  },
  "album-shot-02": {
    src: "/album/IMG_8132.JPG.webp",
    alt: "A couple spinning hand in hand on a clifftop terrace above the sea",
  },
  "album-shot-03": {
    src: "/album/IMG_7976.jpg",
    alt: "A bride in a floral gown pausing on a bright staircase",
  },
  "selected-01": {
    src: "/selected/01.webp",
    alt: "A couple exchange garlands during a sunlit Kerala wedding ceremony",
  },
  "selected-02": {
    src: "/selected/02.webp",
    alt: "A couple walking hand in hand along a quiet beach at dusk",
  },
  "selected-03": {
    src: "/selected/03.webp",
    alt: "A South Indian bride in a red and gold saree framed by jasmine garlands",
  },
  "selected-04": {
    src: "/selected/04.jpg",
    alt: "A groom lifts his bride as the sun sets behind a palm grove",
  },
  "featured-01": {
    src: "/featured/web/featured-01.jpg",
    alt: "Ananya and Arjun on the houseboat where they first met in Kumarakom",
  },
  "featured-02": {
    src: "/featured/web/featured-02.jpg",
    alt: "Jasmine, gold and morning calm before the Kerala wedding ceremony",
  },
  "featured-03": {
    src: "/featured/web/featured-03.jpg",
    alt: "Family gathered under the pandal during the wedding rituals",
  },
  "featured-04": {
    src: "/featured/web/featured-04.jpg",
    alt: "Ananya and Arjun walking alone together after the rituals",
  },
  "featured-05": {
    src: "/featured/web/featured-05.jpg",
    alt: "Ananya and Arjun in the last light of the Kumarakom backwaters",
  },
  "sequence-01": {
    src: "/featured/wide/web/sequence-01.jpg",
    alt: "Ananya and Arjun embracing on a high terrace above the sea in Kerala",
  },
  "sequence-02": {
    src: "/featured/wide/web/sequence-02.jpg",
    alt: "Ananya and Arjun holding each other on a clifftop terrace overlooking the ocean",
  },
  "portfolio-01": {
    src: "/work/portfolio/DSC01578.JPG_resized.jpg",
    alt: "A groom in a white kurta and mundu beside his bride in a red silk saree against a wall of tropical greenery",
  },
  "portfolio-02": {
    src: "/work/portfolio/IMG_8120.JPG.jpeg",
    alt: "A couple in white laughing as they run hand in hand through the shallows of a palm-fringed beach",
  },
  "portfolio-03": {
    src: "/work/portfolio/DSC06649.webp",
    alt: "A bride in a white lace gown holding her bouquet beside a friend in a blush pink lehenga",
  },
  "portfolio-04": {
    src: "/work/portfolio/IMG_7962.jpg",
    alt: "A bride in an embroidered floral gown leaning on a white stair railing, seen through a doorway",
  },
  "frame-01": {
    src: "/work/frames/DSC00079.JPG_resized (1).webp",
    alt: "A groom in white and his bride in a red saree with jasmine in her hair, pausing on a garden path beneath palm fronds",
    width: 1195,
    height: 1792,
  },
  "frame-02": {
    src: "/work/frames/DSC00349.JPG_resized.webp",
    alt: "A groom in a white kurta holding his bride in a red and gold saree as she closes her eyes",
    width: 1507,
    height: 2260,
  },
  "frame-03": {
    src: "/work/frames/DSC01479.JPG_resized.webp",
    alt: "A couple looking down at their joined hands against a wall of dense palm leaves",
    width: 1195,
    height: 1792,
  },
  "frame-04": {
    src: "/work/frames/DSC05298.webp",
    alt: "A bride in a white lace gown seated with a bouquet of white roses on a rattan bench",
    width: 1343,
    height: 2014,
  },
  "frame-05": {
    src: "/work/frames/DSC05404.webp",
    alt: "A bride in a lace-sleeved gown seated beneath a globe lamp, looking down at her dress",
    width: 1937,
    height: 2905,
  },
  "frame-06": {
    src: "/work/frames/DSC06407.webp",
    alt: "A bride reaching out to greet her bridesmaids in sage green by an arched doorway",
    width: 2937,
    height: 1958,
  },
  "frame-07": {
    src: "/work/frames/DSC06546.webp",
    alt: "A bride seated with her bouquet, surrounded by bridesmaids in sage green on a tiled floor",
    width: 1954,
    height: 2930,
  },
  "frame-08": {
    src: "/work/frames/DSC06766.webp",
    alt: "A bride and groom in a black tuxedo holding hands as bridesmaids lift her veil beneath an archway",
    width: 3131,
    height: 2088,
  },
  "frame-09": {
    src: "/work/frames/DSC08571.webp",
    alt: "A bride with her bouquet surrounded by her family in traditional dress against a cream wall",
    width: 1404,
    height: 2106,
  },
  "frame-10": {
    src: "/work/frames/IMG_8127.JPG.webp",
    alt: "A couple in white walking hand in hand on a coastal path beside the sea",
    width: 1351,
    height: 1689,
  },
  "frame-11": {
    src: "/work/frames/IMG_8128.JPG.webp",
    alt: "A woman resting her head on her partner's shoulder as they stand by the sea",
    width: 1899,
    height: 2373,
  },
  "frame-12": {
    src: "/work/frames/IMG_8131.webp",
    alt: "A couple in white laughing as they hold each other in bright backlight",
    width: 1697,
    height: 2122,
  },
  "og-image": {
    src: `${unsplash("photo-1519741497674-611481863552", 1200)}&h=630`,
    alt: "Vow & Frame — wedding photography and films in Kerala",
  },
};
