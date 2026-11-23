import registrationImage from '@/assets/news/registration-vet.jpg';
import learningImage from '@/assets/news/continuing-education.jpg';
import oneHealthImage from '@/assets/news/one-health-livestock.jpg';

export const councilName = 'Council of Veterinary Surgeons of Zimbabwe';
export const verificationUnavailable = 'Live verification is not yet available. Please contact the Council for official confirmation.';

export interface CouncilArticle {
  slug: string;
  title: string;
  category: string;
  description: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  imageCredit: string;
  imageSourceUrl: string;
  imageLicense: string;
  imageLicenseUrl?: string;
}

export const articles: CouncilArticle[] = [
  {
    slug: 'why-registration-matters',
    title: 'Why registration with the Council matters',
    category: 'Professional standards',
    description: 'Registration supports professional accountability and helps the public confirm a veterinary surgeon’s standing.',
    paragraphs: [
      'The Council of Veterinary Surgeons of Zimbabwe regulates the veterinary profession and maintains a professional register. Registration is an important point of reference for employers, clients and members of the public who need to confirm a surgeon’s professional standing.',
      'For veterinary surgeons, registration connects professional practice with the Council’s standards and accountability processes. For animal owners, checking a surgeon’s status can help them make an informed choice and know where to seek guidance if a concern arises.',
      'Surgeons should contact the Council directly for current information about registration, renewals, eligibility and changes to their details. Requirements and procedures can change, so the Council is the authoritative source for up-to-date guidance.',
      'The verification form on this website is not connected to a live register. Until live verification is available, contact the Council to confirm a surgeon’s status rather than relying on an online result.',
    ],
    image: registrationImage,
    imageAlt: 'A veterinarian examines a small white dog with a stethoscope.',
    imageWidth: 1200,
    imageHeight: 801,
    imageCredit: 'Close-up of a veterinarian examining a Maltese dog — Nenad Stojkovic',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Close-up_of_a_veterinarian_examining_a_maltese_dog_with_a_stethoscope._(51687314898).jpg',
    imageLicense: 'CC BY 2.0',
    imageLicenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
  },
  {
    slug: 'keeping-veterinary-practice-current',
    title: 'Keeping veterinary practice current in a changing world',
    category: 'Professional development',
    description: 'Ongoing learning helps veterinary surgeons assess new evidence and use modern tools responsibly.',
    paragraphs: [
      'Veterinary medicine continues to develop. New evidence, diagnostic methods and digital tools can influence how animal health problems are identified and managed. Keeping knowledge current helps surgeons make thoughtful decisions and provide responsible care.',
      'Professional learning can include courses, conferences, journal reading, peer discussion and reflection on clinical outcomes. The goal is not to adopt every new product, but to assess the evidence, local availability and relevance to each animal and owner.',
      'Technology can support clinical work, but it does not replace professional judgement. When using digital records, imaging or remote consultations, surgeons should consider confidentiality, informed consent and appropriate follow-up.',
      'Veterinary surgeons should consult the Council’s current guidance for any applicable continuing-education or practice requirements. A habit of learning helps the profession respond to new challenges and maintain public confidence.',
    ],
    image: learningImage,
    imageAlt: 'Researchers share findings at a food and veterinary medicine science conference.',
    imageWidth: 1200,
    imageHeight: 796,
    imageCredit: 'Foods & Veterinary Medicine Science and Research Conference 2014 — U.S. FDA photo by Michael J. Ermarth',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Foods_%26_Veterinary_Medicine_Science_and_Research_Conference_2014_(2380)_(15293502268).jpg',
    imageLicense: 'Public domain',
  },
  {
    slug: 'one-health-shared-responsibility',
    title: 'One Health: a shared responsibility',
    category: 'One Health',
    description: 'Animal, human and environmental health are connected, making collaboration essential.',
    paragraphs: [
      'One Health recognises that the health of people, animals and the environment is closely connected. Veterinary surgeons contribute to this shared effort through animal health care, disease prevention, animal welfare and food safety.',
      'Good outcomes depend on communication across disciplines. Veterinary professionals, public-health teams, environmental specialists, farmers and animal owners each see different parts of a health issue and can help identify risks early.',
      'Responsible medicine use, timely professional advice and clear reporting of unusual animal-health concerns can support wider prevention efforts. Advice should be based on the circumstances at hand and coordinated with the appropriate professionals.',
      'A One Health approach is built through practical cooperation: sharing relevant information, respecting each discipline’s expertise and keeping animal welfare and community wellbeing in view.',
    ],
    image: oneHealthImage,
    imageAlt: 'A veterinary technician carries a young camel during livestock health work in Somalia.',
    imageWidth: 1200,
    imageHeight: 900,
    imageCredit: 'Somali veterinary technician with a camel calf — Cabdixamiid Xasan Cawad',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Somali_veterinary_technician_carrying_a_camel_calf_in_the_rural_of_Xudun_district,_Sool,_Somalia.jpg',
    imageLicense: 'CC BY-SA 4.0',
    imageLicenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
  },
];

export function validateSurgeon(name: string) {
  return name.trim().length > 0 ? null : "Please enter the surgeon’s full name.";
}
export function pageHead(title: string, description: string) {
  const fullTitle = `${title} | CVSZ`;
  return { meta: [
    { title: fullTitle }, { name: 'description', content: description },
    { property: 'og:title', content: fullTitle }, { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] };
}
export const officialNewsUrl = 'https://cvsz.org/index.php/news/';