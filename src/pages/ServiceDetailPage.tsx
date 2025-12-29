import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, ArrowRight, Phone, ChevronDown, ChevronUp } from 'lucide-react';
import { getServiceBySlug, getRelatedServices, type ServiceData } from '@/data/servicesData';
import { FloatingNav } from '@/components/shared/NavButtons';

const ServiceDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [hoveredProcedure, setHoveredProcedure] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsVisible(false);
    setImageLoaded(false);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [slug]);

  const service = getServiceBySlug(slug || '');
  const relatedServices = getRelatedServices(slug || '', 3);

  if (!service) {
    return (
      <div className="min-h-screen bg-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl text-primary mb-4">Service non trouvé</h1>
          <Link to="/services" className="text-background/70 hover:text-primary transition-colors">
            Retour aux services
          </Link>
        </div>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <FloatingNav backTo="/services" backLabel="Nos Services" />

      {/* Hero Section */}
      <section className="relative h-screen bg-foreground">
        <div className={`absolute inset-0 transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <img
            src={service.heroImage}
            alt={service.title}
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/60 to-foreground/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/40 via-transparent to-foreground/40" />

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className={`max-w-4xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {/* Featured Badge */}
            {service.featured && (
              <div className="mb-6">
                <span className="px-4 py-2 bg-primary text-primary-foreground text-xs font-medium tracking-wide rounded-full">
                  Spécialité de la Clinique
                </span>
              </div>
            )}

            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 flex items-center justify-center bg-primary/20 text-primary rounded-2xl">
                <Icon size={32} />
              </div>
            </div>

            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-background mb-4">
              {service.title}
            </h1>
            <p className="font-sans text-lg md:text-xl text-background/60 mb-8 max-w-2xl">
              {service.shortDescription}
            </p>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-6">
              {service.duration && (
                <div className="flex items-center gap-2 text-background/50">
                  <Clock size={16} />
                  <span className="font-sans text-sm">{service.duration}</span>
                </div>
              )}
              {service.priceRange && (
                <div className="flex items-center gap-2">
                  <span className="font-heading text-2xl text-primary">{service.priceRange}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 animate-bounce hidden md:block">
          <div className="w-6 h-10 border border-primary/40 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-primary/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="relative py-24 md:py-32 bg-background">
        {/* Decorative corners */}
        <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-primary/30" />
        <div className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-primary/30" />

        <div className="container mx-auto px-6 lg:px-12">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-primary mb-4">
              À Propos du Service
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-8">
              Vue d'Ensemble
            </h2>
            
            <p className="font-sans text-lg text-muted-foreground leading-relaxed mb-10">
              {service.fullDescription}
            </p>

            {/* Features Pills */}
            <div className="flex flex-wrap justify-center gap-3">
              {service.features.map((feature) => (
                <span key={feature} className="px-5 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      </section>

      {/* Procedures Section - Bento Grid */}
      <section className="relative py-24 bg-muted overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-primary/20" />
        <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-primary/20" />
        
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-primary mb-4">
              Nos Soins
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
              Traitements Inclus
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {service.procedures.map((procedure, index) => {
              const ProcedureIcon = procedure.icon;
              const isLarge = index === 0;
              
              return (
                <div 
                  key={procedure.name}
                  className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                    isLarge ? 'md:col-span-2 md:row-span-2 aspect-square md:aspect-auto md:min-h-[400px]' : 'aspect-[4/3]'
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoveredProcedure(index)}
                  onMouseLeave={() => setHoveredProcedure(null)}
                >
                  {/* Background Image */}
                  <img
                    src={procedure.image}
                    alt={procedure.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                  
                  {/* Corner Accents */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/0 group-hover:border-primary/60 transition-all duration-500" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/0 group-hover:border-primary/60 transition-all duration-500" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    {/* Icon */}
                    <div className={`w-12 h-12 flex items-center justify-center bg-primary/20 backdrop-blur-sm text-primary rounded-xl mb-4 transition-all duration-500 ${hoveredProcedure === index ? 'scale-110 bg-primary text-primary-foreground' : ''}`}>
                      <ProcedureIcon size={24} />
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-heading text-xl md:text-2xl text-background mb-2 group-hover:text-primary transition-colors duration-300">
                      {procedure.name}
                    </h3>
                    
                    {/* Description - Shows on hover */}
                    <p className={`font-sans text-sm text-background/70 leading-relaxed transition-all duration-500 ${hoveredProcedure === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                      {procedure.description}
                    </p>
                    
                    {/* Duration Badge */}
                    {procedure.duration && (
                      <div className={`flex items-center gap-2 mt-3 text-primary text-sm transition-all duration-500 ${hoveredProcedure === index ? 'opacity-100' : 'opacity-60'}`}>
                        <Clock size={14} />
                        <span>{procedure.duration}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section - Horizontal Steps */}
      <section className="relative py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-primary mb-4">
              Notre Processus
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
              Comment Ça Fonctionne
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
          </div>

          {/* Desktop: Horizontal Steps */}
          <div className="hidden lg:block max-w-6xl mx-auto">
            <div className="relative flex items-start justify-between">
              {/* Connecting Line */}
              <div className="absolute top-12 left-12 right-12 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
              
              {service.process.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <div 
                    key={step.title}
                    className={`relative flex flex-col items-center text-center flex-1 px-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    {/* Step Number Badge */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading text-xs z-20">
                      {index + 1}
                    </div>
                    
                    {/* Icon Circle */}
                    <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-primary/10 group hover:shadow-xl hover:shadow-primary/20 transition-all duration-500">
                      <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-500">
                        <StepIcon size={28} className="text-primary" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <h3 className="font-heading text-lg text-foreground mb-2">{step.title}</h3>
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-[180px]">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile: Vertical Steps */}
          <div className="lg:hidden max-w-md mx-auto">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20" />
              
              {service.process.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <div 
                    key={step.title}
                    className={`relative flex gap-6 mb-8 last:mb-0 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {/* Icon Circle */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center shadow-lg">
                        <StepIcon size={24} className="text-primary" />
                      </div>
                      {/* Step Number */}
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading text-xs">
                        {index + 1}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="pt-3">
                      <h3 className="font-heading text-lg text-foreground mb-1">{step.title}</h3>
                      <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Professional Feature Cards */}
      <section className="relative py-24 bg-muted overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-primary mb-4">
              Pourquoi Nous Choisir
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
              Vos Avantages
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {service.benefits.map((benefit, index) => {
              const BenefitIcon = benefit.icon;
              const isFeatured = benefit.featured;
              
              return (
                <div 
                  key={benefit.title}
                  className={`group relative p-8 rounded-2xl transition-all duration-500 hover:-translate-y-2 ${
                    isFeatured 
                      ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-xl shadow-primary/20' 
                      : 'bg-card border border-border hover:border-primary/30 hover:shadow-xl'
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 ${
                    isFeatured 
                      ? 'bg-primary-foreground/20' 
                      : 'bg-primary/10'
                  }`}>
                    <BenefitIcon size={28} className={isFeatured ? 'text-primary-foreground' : 'text-primary'} />
                  </div>
                  
                  {/* Title */}
                  <h3 className={`font-heading text-xl mb-3 ${
                    isFeatured ? 'text-primary-foreground' : 'text-foreground'
                  }`}>
                    {benefit.title}
                  </h3>
                  
                  {/* Description */}
                  <p className={`font-sans text-sm leading-relaxed ${
                    isFeatured ? 'text-primary-foreground/80' : 'text-muted-foreground'
                  }`}>
                    {benefit.description}
                  </p>
                  
                  {/* Decorative corner for featured */}
                  {isFeatured && (
                    <>
                      <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-primary-foreground/30" />
                      <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-primary-foreground/30" />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-primary mb-4">
              Questions Fréquentes
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
              FAQ
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {service.faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-card rounded-xl border border-border overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
                >
                  <span className="font-heading text-lg text-foreground pr-4">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp size={20} className="text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown size={20} className="text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="font-sans text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="relative py-24 bg-muted">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-primary mb-4">
              Découvrez Aussi
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
              Services Associés
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {relatedServices.map((related) => {
              const RelatedIcon = related.icon;
              return (
                <Link
                  key={related.slug}
                  to={`/services/${related.slug}`}
                  onClick={() => window.scrollTo(0, 0)}
                  className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/40 transition-all duration-500 hover:shadow-xl"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={related.heroImage}
                      alt={related.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-lg">
                        <RelatedIcon size={20} />
                      </div>
                      <h3 className="font-heading text-lg text-foreground group-hover:text-primary transition-colors">
                        {related.title}
                      </h3>
                    </div>
                    <p className="font-sans text-sm text-muted-foreground line-clamp-2">
                      {related.shortDescription}
                    </p>
                    <div className="flex items-center gap-2 text-primary mt-4 opacity-0 group-hover:opacity-100 transition-all">
                      <span className="font-sans text-xs tracking-wider uppercase">Voir le service</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-foreground">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/[0.05] rounded-full blur-[150px]" />
        </div>
        
        <div className="absolute top-10 left-10 w-24 h-24 border border-primary/10 rotate-45 hidden lg:block" />
        <div className="absolute bottom-10 right-10 w-20 h-20 border border-primary/15 -rotate-12 hidden lg:block" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="relative py-12">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
              
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-primary" />
                <div className="w-2 h-2 bg-primary rounded-full" />
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-primary" />
              </div>

              <h2 className="font-heading text-3xl md:text-4xl text-background mb-4">
                Prêt à Commencer ?
              </h2>
              <p className="font-sans text-background/60 mb-10 max-w-md mx-auto">
                Prenez rendez-vous pour {service.title.toLowerCase()} et retrouvez un sourire en pleine santé.
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;
