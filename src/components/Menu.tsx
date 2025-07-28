import { Button } from "@/components/ui/button";
import { Star, Leaf, Flame } from "lucide-react";
import pizzaImage from "@/assets/pizza.jpg";
import burgerImage from "@/assets/burger.jpg";
import noodlesImage from "@/assets/noodles.jpg";

const Menu = () => {
  const menuItems = [
    {
      id: 1,
      name: "Margherita Supreme Pizza",
      description: "Fresh mozzarella, basil, tomato sauce on wood-fired crust",
      price: "₹450",
      image: pizzaImage,
      category: "Pizza",
      badges: ["vegetarian", "chef-special"]
    },
    {
      id: 2,
      name: "Legend Burger",
      description: "Juicy beef patty, cheese, lettuce, tomato, special sauce",
      price: "₹380",
      image: burgerImage,
      category: "Burgers",
      badges: ["chef-special"]
    },
    {
      id: 3,
      name: "Creamy Alfredo Pasta",
      description: "Fresh pasta in rich cream sauce with herbs and parmesan",
      price: "₹320",
      image: noodlesImage,
      category: "Pasta",
      badges: ["vegetarian"]
    },
    {
      id: 4,
      name: "Spicy Chicken Pizza",
      description: "Grilled chicken, jalapeños, onions, spicy sauce",
      price: "₹520",
      image: pizzaImage,
      category: "Pizza",
      badges: ["spicy", "chef-special"]
    },
    {
      id: 5,
      name: "Classic Cheeseburger",
      description: "Double cheese, beef patty, pickles, ketchup, mustard",
      price: "₹350",
      image: burgerImage,
      category: "Burgers",
      badges: []
    },
    {
      id: 6,
      name: "Penne Arrabbiata",
      description: "Spicy tomato sauce with garlic and red chili flakes",
      price: "₹290",
      image: noodlesImage,
      category: "Pasta",
      badges: ["vegetarian", "spicy"]
    }
  ];

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case "vegetarian":
        return <Leaf className="w-4 h-4 text-sage" />;
      case "spicy":
        return <Flame className="w-4 h-4 text-destructive" />;
      case "chef-special":
        return <Star className="w-4 h-4 text-accent" />;
      default:
        return null;
    }
  };

  const getBadgeLabel = (badge: string) => {
    switch (badge) {
      case "vegetarian":
        return "Veg";
      case "spicy":
        return "Spicy";
      case "chef-special":
        return "Chef's Special";
      default:
        return "";
    }
  };

  return (
    <section id="menu" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Our Menu
          </h2>
          <div className="w-24 h-1 bg-gradient-gold mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover our carefully crafted selection of dishes that blend traditional flavors with modern innovation
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {menuItems.map((item, index) => (
            <div
              key={item.id}
              className="bg-card rounded-2xl shadow-card hover:shadow-elegant transition-all duration-500 overflow-hidden animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {item.badges.map((badge) => (
                    <div
                      key={badge}
                      className="flex items-center gap-1 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1"
                    >
                      {getBadgeIcon(badge)}
                      <span className="text-xs font-medium">
                        {getBadgeLabel(badge)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-serif font-semibold text-card-foreground">
                    {item.name}
                  </h3>
                  <span className="text-2xl font-bold text-accent">
                    {item.price}
                  </span>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {item.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-primary bg-secondary px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                  <Button variant="menu" size="sm">
                    Order Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button variant="gold" size="lg" className="text-lg px-8 py-4">
            View Full Menu
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Menu;