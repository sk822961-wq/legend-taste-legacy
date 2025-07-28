import { Button } from "@/components/ui/button";
import { ChefHat, MapPin, Clock } from "lucide-react";
import restaurantHero from "@/assets/restaurant-hero.jpg";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${restaurantHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
        <div className="mb-6">
          <ChefHat className="w-16 h-16 mx-auto text-accent mb-4 animate-float" />
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-primary-foreground mb-6 leading-tight">
          Where Taste Meets{" "}
          <span className="text-accent">Tradition</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-primary-foreground/90 mb-4 font-light">
          The Legend Lives Here
        </p>
        
        <p className="text-lg text-primary-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed">
          Experience culinary excellence in an atmosphere where every meal tells a story. 
          From traditional favorites to contemporary creations, savor the legend bite by bite.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button variant="gold" size="lg" className="text-lg px-8 py-6">
            Explore Our Menu
          </Button>
          <Button variant="hero" size="lg" className="text-lg px-8 py-6">
            Reserve a Table
          </Button>
        </div>

        {/* Quick Info */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-primary-foreground/80">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-accent" />
            <span>Downtown Location</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-accent" />
            <span>Open Daily 11AM - 11PM</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent rounded-full flex justify-center">
          <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;