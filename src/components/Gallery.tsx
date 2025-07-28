import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Filter } from "lucide-react";
import galleryHero from "@/assets/gallery-hero.jpg";
import pizzaImage from "@/assets/pizza.jpg";
import burgerImage from "@/assets/burger.jpg";
import noodlesImage from "@/assets/noodles.jpg";
import restaurantHero from "@/assets/restaurant-hero.jpg";

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const galleryItems = [
    {
      id: 1,
      image: restaurantHero,
      category: "interior",
      title: "Elegant Dining Area"
    },
    {
      id: 2,
      image: pizzaImage,
      category: "food",
      title: "Artisan Pizza"
    },
    {
      id: 3,
      image: burgerImage,
      category: "food",
      title: "Signature Burger"
    },
    {
      id: 4,
      image: galleryHero,
      category: "ambiance",
      title: "Restaurant Atmosphere"
    },
    {
      id: 5,
      image: noodlesImage,
      category: "food",
      title: "Fresh Pasta"
    },
    {
      id: 6,
      image: restaurantHero,
      category: "interior",
      title: "Cozy Seating"
    }
  ];

  const filters = [
    { id: "all", label: "All" },
    { id: "food", label: "Food" },
    { id: "interior", label: "Interior" },
    { id: "ambiance", label: "Ambiance" }
  ];

  const filteredItems = activeFilter === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Gallery
          </h2>
          <div className="w-24 h-1 bg-gradient-gold mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Take a visual journey through our culinary creations and elegant atmosphere
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "gold" : "outline"}
              onClick={() => setActiveFilter(filter.id)}
              className="transition-all duration-300"
            >
              <Filter className="w-4 h-4 mr-2" />
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredItems.map((item, index) => (
            <div
              key={`${item.id}-${activeFilter}`}
              className="relative group overflow-hidden rounded-2xl shadow-card hover:shadow-elegant transition-all duration-500 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-lg font-serif font-semibold mb-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    <span className="text-sm capitalize">{item.category}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-card rounded-2xl p-12 shadow-elegant">
          <h3 className="text-3xl font-serif font-bold text-primary mb-4">
            Visit Us for the Full Experience
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Pictures tell a story, but nothing compares to experiencing our culinary artistry and warm hospitality in person.
          </p>
          <Button variant="gold" size="lg" className="text-lg px-8 py-4">
            Make a Reservation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;