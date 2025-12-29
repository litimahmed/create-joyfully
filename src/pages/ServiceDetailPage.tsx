import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, ArrowRight, Phone, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { getServiceBySlug, getRelatedServices, type ServiceData } from '@/data/servicesData';
import { FloatingNav } from '@/components/shared/NavButtons';

const ServiceDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

      {/* Procedures Section */}
      <section className="relative py-24 bg-muted">
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

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {service.procedures.map((procedure, index) => (
              <div 
                key={procedure.name}
                className={`bg-card rounded-2xl p-8 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-xl flex-shrink-0">
                    <Check size={20} />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg text-foreground mb-2">{procedure.name}</h3>
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-3">
                      {procedure.description}
                    </p>
                    {procedure.duration && (
                      <div className="flex items-center gap-2 text-primary text-sm">
                        <Clock size={14} />
                        <span>{procedure.duration}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-24 bg-background">
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

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-primary hidden md:block" />
              
              {service.process.map((step, index) => (
                <div 
                  key={index}
                  className={`relative flex items-center gap-6 mb-8 last:mb-0 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Step Number */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading text-lg z-10">
                    {index + 1}
                  </div>
                  
                  {/* Content */}
                  <div className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="bg-card p-6 rounded-xl border border-border">
                      <p className="font-sans text-foreground">{step}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-24 bg-primary/5">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-primary mb-4">
              Pourquoi Nous Choisir
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
              Vos Avantages
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {service.benefits.map((benefit, index) => (
              <div 
                key={benefit}
                className="flex items-center gap-4 bg-card p-5 rounded-xl border border-border"
              >
                <div className="w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded-full flex-shrink-0">
                  <Check size={16} />
                </div>
                <span className="font-sans text-foreground">{benefit}</span>
              </div>
            ))}
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

export default ServiceDetailPage;
