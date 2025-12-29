import { 
  Stethoscope, 
  Sparkles, 
  CircleDot, 
  Baby, 
  Clock,
  Heart,
  LucideIcon
} from 'lucide-react';

export interface ServiceProcedure {
  name: string;
  description: string;
  duration?: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceData {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: LucideIcon;
  heroImage: string;
  features: string[];
  procedures: ServiceProcedure[];
  benefits: string[];
  process: string[];
  faqs: ServiceFAQ[];
  duration?: string;
  priceRange?: string;
  featured?: boolean;
  category: 'preventif' | 'esthetique' | 'specialise' | 'urgence';
}

export const serviceCategories = [
  { id: 'all' as const, label: 'Tous les Services', icon: Stethoscope },
  { id: 'preventif' as const, label: 'Préventif', icon: Stethoscope },
  { id: 'esthetique' as const, label: 'Esthétique', icon: Sparkles },
  { id: 'specialise' as const, label: 'Spécialisé', icon: CircleDot },
  { id: 'urgence' as const, label: 'Urgence', icon: Clock },
];

export const servicesData: ServiceData[] = [
  {
    slug: 'soins-dentaires',
    title: 'Soins Dentaires',
    shortDescription: 'Examens complets, détartrages professionnels et traitements des caries pour maintenir votre santé bucco-dentaire.',
    fullDescription: 'Nos soins dentaires préventifs constituent le fondement d\'une santé bucco-dentaire optimale. Grâce à des examens réguliers et des traitements personnalisés, nous détectons et traitons les problèmes dentaires avant qu\'ils ne deviennent sérieux. Notre approche préventive vous assure un sourire sain pour les années à venir.',
    icon: Stethoscope,
    heroImage: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=1920',
    features: ['Examens annuels', 'Détartrage', 'Obturations'],
    category: 'preventif',
    duration: '30-60 min',
    priceRange: '50€ - 150€',
    procedures: [
      { name: 'Examen dentaire complet', description: 'Évaluation approfondie de votre santé bucco-dentaire avec radiographies si nécessaire.', duration: '30 min' },
      { name: 'Détartrage professionnel', description: 'Élimination du tartre et de la plaque dentaire pour des dents propres et saines.', duration: '45 min' },
      { name: 'Traitement des caries', description: 'Restauration des dents cariées avec des matériaux de haute qualité.', duration: '45-60 min' },
      { name: 'Polissage dentaire', description: 'Finition brillante pour des dents lisses et éclatantes.', duration: '15 min' },
    ],
    benefits: [
      'Prévention des maladies dentaires',
      'Détection précoce des problèmes',
      'Économies sur les traitements futurs',
      'Haleine fraîche et sourire éclatant',
      'Conseils personnalisés d\'hygiène',
    ],
    process: [
      'Accueil et installation confortable',
      'Examen visuel et radiographique',
      'Diagnostic et plan de traitement',
      'Réalisation des soins nécessaires',
      'Conseils de prévention personnalisés',
    ],
    faqs: [
      { question: 'À quelle fréquence dois-je faire un détartrage ?', answer: 'Nous recommandons un détartrage tous les 6 à 12 mois selon votre situation bucco-dentaire.' },
      { question: 'Le détartrage est-il douloureux ?', answer: 'Non, le détartrage est généralement indolore. Une légère sensibilité peut être ressentie mais disparaît rapidement.' },
      { question: 'Combien de temps dure un examen complet ?', answer: 'Un examen dentaire complet dure environ 30 minutes, incluant les radiographies si nécessaire.' },
    ],
  },
  {
    slug: 'esthetique-dentaire',
    title: 'Esthétique Dentaire',
    shortDescription: 'Blanchiment professionnel, facettes et corrections esthétiques pour un sourire éclatant et harmonieux.',
    fullDescription: 'Transformez votre sourire avec nos solutions d\'esthétique dentaire de pointe. Du blanchiment professionnel aux facettes sur mesure, nous créons des résultats naturels et durables qui mettent en valeur votre beauté unique. Chaque traitement est personnalisé pour correspondre parfaitement à vos attentes.',
    icon: Sparkles,
    heroImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1920',
    features: ['Blanchiment', 'Facettes', 'Composite'],
    category: 'esthetique',
    duration: '1-2 heures',
    priceRange: '200€ - 800€',
    procedures: [
      { name: 'Blanchiment professionnel', description: 'Éclaircissement de plusieurs teintes en une seule séance avec notre technologie avancée.', duration: '1h' },
      { name: 'Facettes céramique', description: 'Coquilles ultra-fines pour corriger forme, couleur et alignement des dents.', duration: '2 séances' },
      { name: 'Composite esthétique', description: 'Restaurations invisibles pour des dents parfaitement naturelles.', duration: '45 min' },
      { name: 'Contourage dentaire', description: 'Remodelage subtil pour harmoniser la forme de vos dents.', duration: '30 min' },
    ],
    benefits: [
      'Sourire plus blanc et lumineux',
      'Correction des imperfections',
      'Résultats naturels et durables',
      'Boost de confiance en soi',
      'Techniques non-invasives',
    ],
    process: [
      'Consultation esthétique personnalisée',
      'Simulation du résultat final',
      'Choix des matériaux et teintes',
      'Réalisation du traitement',
      'Suivi et ajustements si nécessaire',
    ],
    faqs: [
      { question: 'Combien de temps dure le blanchiment ?', answer: 'Les résultats du blanchiment durent de 1 à 3 ans selon votre hygiène de vie et vos habitudes alimentaires.' },
      { question: 'Les facettes abîment-elles les dents ?', answer: 'Nos facettes modernes nécessitent très peu de préparation dentaire et préservent la structure naturelle de vos dents.' },
      { question: 'Le blanchiment est-il douloureux ?', answer: 'Une légère sensibilité temporaire peut survenir, mais elle disparaît généralement en 24-48 heures.' },
    ],
  },
  {
    slug: 'implantologie',
    title: 'Implantologie',
    shortDescription: 'Implants dentaires de haute qualité pour remplacer les dents manquantes avec des résultats naturels et durables.',
    fullDescription: 'L\'implantologie représente la solution la plus avancée pour remplacer les dents manquantes. Nos implants en titane biocompatible s\'intègrent parfaitement à votre mâchoire, offrant une stabilité et un confort comparables à vos dents naturelles. Retrouvez le plaisir de manger, sourire et parler en toute confiance.',
    icon: CircleDot,
    heroImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920',
    features: ['Implants unitaires', 'All-on-4', 'Greffes osseuses'],
    category: 'specialise',
    featured: true,
    duration: '3-6 mois',
    priceRange: '1500€ - 3500€',
    procedures: [
      { name: 'Implant unitaire', description: 'Remplacement d\'une seule dent avec un implant et une couronne sur mesure.', duration: '3-4 mois' },
      { name: 'All-on-4', description: 'Restauration complète d\'une arcade avec seulement 4 implants.', duration: '1 journée' },
      { name: 'Greffe osseuse', description: 'Augmentation du volume osseux pour permettre la pose d\'implants.', duration: '4-6 mois' },
      { name: 'Sinus lift', description: 'Élévation du plancher sinusien pour implants maxillaires.', duration: '6 mois' },
    ],
    benefits: [
      'Solution permanente et stable',
      'Apparence naturelle identique',
      'Préservation de l\'os de la mâchoire',
      'Confort de mastication optimal',
      'Aucun entretien particulier',
    ],
    process: [
      'Scanner 3D et planification',
      'Pose chirurgicale de l\'implant',
      'Période de cicatrisation (ostéointégration)',
      'Pose du pilier et de la couronne',
      'Contrôles réguliers de suivi',
    ],
    faqs: [
      { question: 'Est-ce que la pose d\'implant fait mal ?', answer: 'La pose se fait sous anesthésie locale et est généralement indolore. Des antidouleurs simples suffisent après l\'intervention.' },
      { question: 'Quelle est la durée de vie d\'un implant ?', answer: 'Avec une bonne hygiène, les implants peuvent durer toute la vie. Le taux de succès est supérieur à 95%.' },
      { question: 'Suis-je éligible aux implants ?', answer: 'La plupart des adultes en bonne santé peuvent recevoir des implants. Un examen approfondi déterminera votre éligibilité.' },
    ],
  },
  {
    slug: 'pedodontie',
    title: 'Pédodontie',
    shortDescription: 'Soins dentaires adaptés aux enfants dans un environnement chaleureux et rassurant.',
    fullDescription: 'Notre service de pédodontie est spécialement conçu pour accueillir les plus jeunes dans un environnement ludique et bienveillant. Nos dentistes pédiatriques sont formés pour mettre les enfants à l\'aise et leur donner de bonnes habitudes dentaires dès le plus jeune âge, préparant le terrain pour une vie de sourires sains.',
    icon: Baby,
    heroImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1920',
    features: ['Prévention', 'Scellements', 'Suivi croissance'],
    category: 'preventif',
    duration: '20-45 min',
    priceRange: '40€ - 120€',
    procedures: [
      { name: 'Premier examen dentaire', description: 'Introduction douce au cabinet dentaire pour les tout-petits.', duration: '20 min' },
      { name: 'Scellement des sillons', description: 'Protection des molaires permanentes contre les caries.', duration: '30 min' },
      { name: 'Application de fluor', description: 'Renforcement de l\'émail dentaire des enfants.', duration: '15 min' },
      { name: 'Soins des dents de lait', description: 'Traitement adapté des caries sur dents temporaires.', duration: '30-45 min' },
    ],
    benefits: [
      'Approche ludique et rassurante',
      'Prévention des problèmes futurs',
      'Éducation à l\'hygiène dentaire',
      'Suivi de la croissance dentaire',
      'Création d\'habitudes saines',
    ],
    process: [
      'Accueil adapté aux enfants',
      'Explication ludique des soins',
      'Examen en douceur',
      'Traitement si nécessaire',
      'Récompense et conseils aux parents',
    ],
    faqs: [
      { question: 'À quel âge emmener mon enfant chez le dentiste ?', answer: 'Nous recommandons une première visite vers l\'âge de 1 an ou dès l\'apparition des premières dents.' },
      { question: 'Comment préparer mon enfant à sa visite ?', answer: 'Restez positif, évitez les mots effrayants et présentez la visite comme une aventure amusante.' },
      { question: 'Les soins sur dents de lait sont-ils vraiment nécessaires ?', answer: 'Oui ! Les dents de lait maintiennent l\'espace pour les dents permanentes et sont importantes pour la mastication et la parole.' },
    ],
  },
  {
    slug: 'orthodontie',
    title: 'Orthodontie',
    shortDescription: 'Alignement dentaire avec appareils traditionnels ou aligneurs invisibles pour tous les âges.',
    fullDescription: 'L\'orthodontie moderne offre des solutions discrètes et efficaces pour corriger l\'alignement de vos dents à tout âge. Que vous préfériez les bagues traditionnelles ou les aligneurs invisibles, nous créons un plan de traitement personnalisé pour vous offrir le sourire parfaitement aligné dont vous rêvez.',
    icon: Heart,
    heroImage: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=1920',
    features: ['Aligneurs', 'Bagues', 'Contention'],
    category: 'esthetique',
    duration: '12-24 mois',
    priceRange: '2000€ - 5000€',
    procedures: [
      { name: 'Aligneurs invisibles', description: 'Gouttières transparentes amovibles pour un traitement discret.', duration: '12-18 mois' },
      { name: 'Bagues métalliques', description: 'Solution classique efficace pour tous les cas.', duration: '18-24 mois' },
      { name: 'Bagues céramiques', description: 'Alternative esthétique aux bagues métalliques.', duration: '18-24 mois' },
      { name: 'Contention', description: 'Maintien des résultats après le traitement actif.', duration: 'À vie' },
    ],
    benefits: [
      'Sourire parfaitement aligné',
      'Amélioration de la mastication',
      'Facilitation de l\'hygiène dentaire',
      'Solutions adaptées à tous les âges',
      'Options discrètes disponibles',
    ],
    process: [
      'Bilan orthodontique complet',
      'Scan 3D et plan de traitement',
      'Pose de l\'appareil choisi',
      'Rendez-vous de suivi réguliers',
      'Phase de contention',
    ],
    faqs: [
      { question: 'Les aligneurs invisibles fonctionnent-ils vraiment ?', answer: 'Oui, ils sont très efficaces pour la plupart des cas de malocclusion légère à modérée.' },
      { question: 'Peut-on faire de l\'orthodontie à l\'âge adulte ?', answer: 'Absolument ! De plus en plus d\'adultes optent pour l\'orthodontie avec d\'excellents résultats.' },
      { question: 'Combien de temps dure un traitement orthodontique ?', answer: 'En moyenne 12 à 24 mois selon la complexité du cas. Les aligneurs peuvent parfois être plus rapides.' },
    ],
  },
  {
    slug: 'urgences-dentaires',
    title: 'Urgences Dentaires',
    shortDescription: 'Prise en charge rapide des urgences : douleurs aiguës, traumatismes et infections.',
    fullDescription: 'Les urgences dentaires n\'attendent pas. Notre équipe est disponible pour prendre en charge rapidement vos urgences : douleurs intenses, dents cassées, abcès ou tout autre problème nécessitant une intervention immédiate. Ne souffrez plus, contactez-nous pour un rendez-vous en urgence.',
    icon: Clock,
    heroImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1920',
    features: ['Disponibilité', 'Sans RDV', 'Soins immédiats'],
    category: 'urgence',
    duration: '30-90 min',
    priceRange: '80€ - 250€',
    procedures: [
      { name: 'Traitement de la douleur', description: 'Soulagement rapide des douleurs dentaires aiguës.', duration: '30-45 min' },
      { name: 'Réimplantation dentaire', description: 'Prise en charge urgente des dents expulsées par traumatisme.', duration: 'Immédiat' },
      { name: 'Drainage d\'abcès', description: 'Traitement des infections dentaires avec antibiotiques.', duration: '30-60 min' },
      { name: 'Réparation de fracture', description: 'Restauration d\'urgence des dents cassées.', duration: '45-90 min' },
    ],
    benefits: [
      'Prise en charge le jour même',
      'Soulagement rapide de la douleur',
      'Équipe formée aux urgences',
      'Équipement de pointe',
      'Suivi post-urgence assuré',
    ],
    process: [
      'Appel et évaluation téléphonique',
      'Rendez-vous en urgence',
      'Diagnostic rapide',
      'Traitement immédiat',
      'Prescription et suivi',
    ],
    faqs: [
      { question: 'Que faire si ma dent est tombée ?', answer: 'Récupérez la dent par la couronne (pas la racine), rincez-la sans frotter et conservez-la dans du lait ou votre salive. Appelez-nous immédiatement.' },
      { question: 'Êtes-vous disponibles le week-end ?', answer: 'Nous assurons une permanence téléphonique pour les urgences. Appelez notre numéro d\'urgence indiqué sur le répondeur.' },
      { question: 'Une douleur intense est-elle toujours une urgence ?', answer: 'Une douleur intense, un gonflement ou une fièvre constituent des urgences. N\'hésitez pas à nous contacter.' },
    ],
  },
];

export const getServiceBySlug = (slug: string): ServiceData | undefined => {
  return servicesData.find(service => service.slug === slug);
};

export const getServicesByCategory = (category: string): ServiceData[] => {
  if (category === 'all') return servicesData;
  return servicesData.filter(service => service.category === category);
};

export const getRelatedServices = (currentSlug: string, limit: number = 3): ServiceData[] => {
  const current = getServiceBySlug(currentSlug);
  if (!current) return servicesData.slice(0, limit);
  
  return servicesData
    .filter(service => service.slug !== currentSlug)
    .sort((a, b) => {
      // Prioritize same category
      if (a.category === current.category && b.category !== current.category) return -1;
      if (b.category === current.category && a.category !== current.category) return 1;
      return 0;
    })
    .slice(0, limit);
};
