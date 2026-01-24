import { Service, ConsultationType, Testimonial } from './types';

export const BRAND_NAME = "AstroSrijan";

export const ASTROLOGER_IMAGE = "/shrijan_photo.png";

export const SERVICES: Service[] = [
  {
    id: 'birth-chart',
    name: 'Birth Chart Analysis',
    description: 'Detailed analysis of your Janam Kundali to understand life strengths and challenges.',
    price: 2500,
    features: ['Planetary positions', 'Dasha periods', 'House analysis', 'Life predictions'],
    icon: 'fa-chart-pie',
    paymentLink: 'https://rzp.io/rzp/birthchart'
  },
  {
    id: 'marriage',
    name: 'Marriage Compatibility',
    description: 'Comprehensive Kundali matching for marriage to ensure harmonious life.',
    price: 3500,
    features: ['Guna Milan (36 pts)', 'Manglik Dosha', 'Nadi checking', 'Compatibility report'],
    icon: 'fa-heart',
    paymentLink: 'https://rzp.io/rzp/marriagecompatibility'
  },
  {
    id: 'career',
    name: 'Career Guidance',
    description: 'Analysis for career choices, job changes, and professional growth.',
    price: 2800,
    features: ['Suitable career paths', 'Timing for moves', 'Success prediction', 'Remedies'],
    icon: 'fa-briefcase',
    paymentLink: 'https://rzp.io/rzp/oqR8aPj'
  },
  {
    id: 'gemstone',
    name: 'Gemstone Analysis',
    description: 'Scientific analysis for recommending appropriate gemstones for weak planets.',
    price: 2200,
    features: ['Strength analysis', 'Gem identification', 'Metal/Weight spec', 'Wearing method'],
    icon: 'fa-gem',
    paymentLink: 'https://rzp.io/rzp/iJAsiqD8'
  },
  {
    id: 'vastu',
    name: 'Vastu Shastra',
    description: 'Vastu analysis for property to ensure positive energy and prosperity.',
    price: 4000,
    features: ['Energy analysis', 'Directional fixes', 'Vastu remedies', 'Site consultation'],
    icon: 'fa-home',
    paymentLink: 'https://rzp.io/rzp/4EN7a6l'
  },
  {
    id: 'numerology',
    name: 'Numerology Report',
    description: 'Analysis based on name and birth date for life path guidance.',
    price: 1800,
    features: ['Life path number', 'Destiny number', 'Name correction', 'Lucky numbers'],
    icon: 'fa-sort-numeric-up',
    paymentLink: 'https://rzp.io/rzp/YILZFaLR'
  }
];

export const CONSULTATIONS: ConsultationType[] = [
  {
    id: 'quick',
    title: 'Quick Session',
    description: 'Urgent questions or specific concerns.',
    price: 2100,
    duration: '10 Minutes',
    icon: 'fa-bolt',
    paymentLink: 'https://rzp.io/rzp/oqR8aPj'
  },
  {
    id: 'single',
    title: 'Single Question',
    description: 'Detailed answer to one specific question.',
    price: 1100,
    duration: 'Written/Audio',
    icon: 'fa-question-circle',
    paymentLink: 'https://rzp.io/rzp/iJAsiqD8'
  },
  {
    id: 'extended',
    title: 'Full Reading',
    description: 'Comprehensive session for multiple concerns.',
    price: 4500,
    duration: '30 Minutes',
    icon: 'fa-hourglass-half',
    paymentLink: 'https://rzp.io/rzp/birthchart'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    text: "The career guidance I received from Srijan Sharma was incredibly accurate. I followed the planetary transit advice and got a promotion within months.",
    author: "Rajesh Kumar",
    role: "Software Engineer, Bangalore",
    initials: "RK"
  },
  {
    id: 2,
    text: "Pandit Ji's Vastu advice for my new office in Chandigarh was a game-changer. The positive energy is palpable, and my business has grown significantly.",
    author: "Amit Verma",
    role: "Entrepreneur, Chandigarh",
    initials: "AV"
  },
  {
    id: 3,
    text: "The marriage matching service was thorough and insightful. We've been happily married for 2 years now thanks to Srijan Ji's detailed compatibility report.",
    author: "Priya Sharma",
    role: "Teacher, Delhi",
    initials: "PS"
  }
];