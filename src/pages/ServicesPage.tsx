import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Stethoscope, Sparkles, CircleDot, Clock, Phone } from "lucide-react";
import { servicesData, serviceCategories, getServicesByCategory } from "@/data/servicesData";
import PageHeader from "@/components/shared/PageHeader";
import dentalEquipment from "@/assets/gallery/dental-equipment.jpg";
import dentalCtaBanner from "@/assets/gallery/dental-cta-banner.jpg";

const ServicesPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsVisible(true);
  }, []);

  const currentServices = getServicesByCategory(activeCategory);

  const getCategoryIcon = (iconType: string) => {
    switch (iconType) {
      case 'preventif': return Stethoscope;
      case 'esthetique': return Sparkles;
      case 'specialise': return CircleDot;
      case 'urgence': return Clock;
      default: return Stethoscope;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end justify-center overflow-hidden bg-foreground pb-16">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url(${dentalEquipment})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground via-foreground/40 to-foreground" />
        
        {/* Decorative Elements */}
        <div className="absolute top-32 left-10 w-32 h-32 border border-primary/20 rotate-45 hidden md:block" />
        <div className="absolute bottom-24 right-16 w-24 h-24 border border-primary/30 rotate-12 hidden md:block" />
        
        {/* Hero Content */}
        <div className={`relative z-10 text-center px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="w-2 h-2 bg-primary rounded-full" />
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>
          
          <h1 className="font-heading text-5xl md:text-7xl tracking-wide text-background mb-4 drop-shadow-lg">
            Nos Services
          </h1>
          
          <p className="font-sans text-sm md:text-base text-background/80 tracking-[0.3em] uppercase drop-shadow-md">
            Excellence & Expertise Dentaire
          </p>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="bg-background py-6 sticky top-16 z-40 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex justify-center">
            <div className="inline-flex items-center bg-muted rounded-2xl p-1.5 gap-1 overflow-x-auto">
              {serviceCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`relative flex items-center gap-2 font-sans text-xs tracking-[0.1em] uppercase py-3 px-5 md:px-6 rounded-xl transition-all duration-300 whitespace-nowrap ${
                      activeCategory === category.id
                        ? 'text-foreground bg-background shadow-md shadow-foreground/10'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon size={16} className={`transition-colors duration-300 ${activeCategory === category.id ? 'text-primary' : ''}`} />
                    <span className="hidden sm:inline">{category.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-primary mb-4">
              Des Soins Personnalisés
            </p>
            <h2 className="font-heading text-4xl md:text-5xl text-foreground">
              {activeCategory === 'all' && 'Tous Nos Services'}
              {activeCategory === 'preventif' && 'Soins Préventifs'}
              {activeCategory === 'esthetique' && 'Esthétique Dentaire'}
              {activeCategory === 'specialise' && 'Soins Spécialisés'}
              {activeCategory === 'urgence' && 'Urgences Dentaires'}
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6" />
          </div>

          {/* Services Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className={`group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  } ${service.featured ? 'ring-2 ring-primary/20' : ''}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={service.heroImage}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    
                    {/* Featured Badge */}
                    {service.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium tracking-wide rounded-full shadow-md">
                          Spécialité
                        </span>
                      </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
                      <span className="font-sans text-xs text-muted-foreground uppercase tracking-wider">
                        {service.duration}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Icon & Title */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <Icon size={24} />
                      </div>
                      <div>
                        <h3 className="font-heading text-xl text-foreground group-hover:text-primary transition-colors duration-300 mb-1">
                          {service.title}
                        </h3>
                        {service.priceRange && (
                          <span className="font-sans text-sm text-primary font-medium">{service.priceRange}</span>
                        )}
                      </div>
                    </div>

                    <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                      {service.shortDescription}
                    </p>

                    {/* Features Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.features.slice(0, 3).map((feature) => (
                        <span key={feature} className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* See Details */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <span className="font-sans text-xs tracking-[0.1em] uppercase">En savoir plus</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${dentalCtaBanner})` }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-foreground/85" />
        
        {/* Background glow effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/[0.05] rounded-full blur-[150px]" />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-24 h-24 border border-primary/10 rotate-45 hidden lg:block" />
        <div className="absolute bottom-10 right-10 w-20 h-20 border border-primary/15 -rotate-12 hidden lg:block" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            {/* Decorative frame */}
            <div className="relative py-12">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
              
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-primary" />
                <div className="w-2 h-2 bg-primary rounded-full" />
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-primary" />
              </div>

              <h2 className="font-heading text-3xl md:text-4xl text-background mb-4">
                Prêt à Prendre Soin de Votre Sourire ?
              </h2>
              <p className="font-sans text-background/60 mb-10 max-w-md mx-auto">
                Prenez rendez-vous dès aujourd'hui et découvrez des soins dentaires d'exception.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/reservations"
                  onClick={() => window.scrollTo(0, 0)}
                  className="px-10 py-4 bg-primary text-primary-foreground font-sans text-xs tracking-[0.2em] uppercase hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 rounded-full"
                >
                  Prendre Rendez-vous
                </Link>
                <a
                  href="tel:+33123456789"
                  className="px-10 py-4 bg-transparent text-background font-sans text-xs tracking-[0.2em] uppercase border border-background/30 hover:border-primary hover:text-primary transition-all rounded-full inline-flex items-center gap-2"
                >
                  <Phone size={14} />
                  Nous Appeler
                </a>
              </div>

              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground border-t border-background/10 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="font-sans text-sm text-background/40 tracking-wider">
            © {new Date().getFullYear()} Sourire & Santé. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ServicesPage;
