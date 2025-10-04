import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Filter, Search, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Import high-quality food images
import burgerImage from "@/assets/menu-burger.jpg";
import pizzaImage from "@/assets/menu-pizza.jpg";
import pastaImage from "@/assets/menu-pasta.jpg";
import drinksImage from "@/assets/menu-drinks.jpg";
import dessertsImage from "@/assets/menu-desserts.jpg";

const MenuCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const { addToCart } = useCart();

  // Comprehensive menu with 100 items
  const menuItems = [
    // Burgers (25 items)
    { id: 1, name: "Classic Beef Burger", price: 320, category: "Burgers", image: burgerImage, description: "Juicy beef patty with fresh vegetables" },
    { id: 2, name: "Chicken Deluxe Burger", price: 280, category: "Burgers", image: burgerImage, description: "Grilled chicken with special sauce" },
    { id: 3, name: "Cheese Lover's Burger", price: 350, category: "Burgers", image: burgerImage, description: "Double cheese with beef patty" },
    { id: 4, name: "Veggie Supreme Burger", price: 250, category: "Burgers", image: burgerImage, description: "Plant-based patty with fresh veggies" },
    { id: 5, name: "BBQ Bacon Burger", price: 420, category: "Burgers", image: burgerImage, description: "Crispy bacon with BBQ sauce" },
    { id: 6, name: "Mushroom Swiss Burger", price: 380, category: "Burgers", image: burgerImage, description: "Sautéed mushrooms with Swiss cheese" },
    { id: 7, name: "Spicy Jalapeño Burger", price: 340, category: "Burgers", image: burgerImage, description: "Hot jalapeños with spicy mayo" },
    { id: 8, name: "Fish Fillet Burger", price: 300, category: "Burgers", image: burgerImage, description: "Crispy fish fillet with tartar sauce" },
    { id: 9, name: "Double Decker Burger", price: 480, category: "Burgers", image: burgerImage, description: "Two beef patties with all fixings" },
    { id: 10, name: "Chicken Ranch Burger", price: 290, category: "Burgers", image: burgerImage, description: "Grilled chicken with ranch dressing" },
    { id: 11, name: "Pulled Pork Burger", price: 360, category: "Burgers", image: burgerImage, description: "Slow-cooked pulled pork" },
    { id: 12, name: "Turkey Club Burger", price: 330, category: "Burgers", image: burgerImage, description: "Turkey patty with club toppings" },
    { id: 13, name: "Avocado Burger", price: 370, category: "Burgers", image: burgerImage, description: "Fresh avocado with beef patty" },
    { id: 14, name: "Hawaiian Burger", price: 390, category: "Burgers", image: burgerImage, description: "Pineapple and ham with beef" },
    { id: 15, name: "Mexican Burger", price: 350, category: "Burgers", image: burgerImage, description: "Spicy beef with Mexican flavors" },
    { id: 16, name: "Lamb Burger", price: 450, category: "Burgers", image: burgerImage, description: "Premium lamb patty with herbs" },
    { id: 17, name: "Buffalo Chicken Burger", price: 320, category: "Burgers", image: burgerImage, description: "Spicy buffalo chicken" },
    { id: 18, name: "Teriyaki Burger", price: 340, category: "Burgers", image: burgerImage, description: "Japanese-style teriyaki sauce" },
    { id: 19, name: "Onion Ring Burger", price: 380, category: "Burgers", image: burgerImage, description: "Crispy onion rings included" },
    { id: 20, name: "Breakfast Burger", price: 400, category: "Burgers", image: burgerImage, description: "Egg and bacon with beef patty" },
    { id: 21, name: "Blue Cheese Burger", price: 410, category: "Burgers", image: burgerImage, description: "Rich blue cheese topping" },
    { id: 22, name: "Slider Trio", price: 280, category: "Burgers", image: burgerImage, description: "Three mini burgers" },
    { id: 23, name: "Vegan Burger", price: 270, category: "Burgers", image: burgerImage, description: "100% plant-based burger" },
    { id: 24, name: "Gourmet Burger", price: 520, category: "Burgers", image: burgerImage, description: "Premium ingredients burger" },
    { id: 25, name: "Mini Burger Combo", price: 240, category: "Burgers", image: burgerImage, description: "Small burger with sides" },

    // Pizzas (25 items)
    { id: 26, name: "Margherita Pizza", price: 450, category: "Pizzas", image: pizzaImage, description: "Classic tomato and mozzarella" },
    { id: 27, name: "Pepperoni Supreme", price: 520, category: "Pizzas", image: pizzaImage, description: "Loaded with pepperoni" },
    { id: 28, name: "Veggie Deluxe Pizza", price: 480, category: "Pizzas", image: pizzaImage, description: "Fresh vegetables and cheese" },
    { id: 29, name: "BBQ Chicken Pizza", price: 550, category: "Pizzas", image: pizzaImage, description: "BBQ sauce with grilled chicken" },
    { id: 30, name: "Hawaiian Pizza", price: 500, category: "Pizzas", image: pizzaImage, description: "Ham and pineapple classic" },
    { id: 31, name: "Meat Lovers Pizza", price: 620, category: "Pizzas", image: pizzaImage, description: "Multiple meats and cheese" },
    { id: 32, name: "Four Cheese Pizza", price: 530, category: "Pizzas", image: pizzaImage, description: "Four different cheeses" },
    { id: 33, name: "Spicy Italian Pizza", price: 580, category: "Pizzas", image: pizzaImage, description: "Spicy salami and peppers" },
    { id: 34, name: "Mushroom Pizza", price: 460, category: "Pizzas", image: pizzaImage, description: "Fresh mushrooms and herbs" },
    { id: 35, name: "Seafood Pizza", price: 650, category: "Pizzas", image: pizzaImage, description: "Mixed seafood toppings" },
    { id: 36, name: "Buffalo Chicken Pizza", price: 570, category: "Pizzas", image: pizzaImage, description: "Spicy buffalo chicken" },
    { id: 37, name: "Spinach Feta Pizza", price: 490, category: "Pizzas", image: pizzaImage, description: "Spinach and feta cheese" },
    { id: 38, name: "Pesto Pizza", price: 510, category: "Pizzas", image: pizzaImage, description: "Basil pesto base" },
    { id: 39, name: "Mexican Pizza", price: 540, category: "Pizzas", image: pizzaImage, description: "Mexican spices and jalapeños" },
    { id: 40, name: "Bacon Ranch Pizza", price: 560, category: "Pizzas", image: pizzaImage, description: "Bacon with ranch dressing" },
    { id: 41, name: "Garlic Supreme Pizza", price: 480, category: "Pizzas", image: pizzaImage, description: "Roasted garlic and herbs" },
    { id: 42, name: "Truffle Pizza", price: 750, category: "Pizzas", image: pizzaImage, description: "Premium truffle topping" },
    { id: 43, name: "Chicken Tikka Pizza", price: 590, category: "Pizzas", image: pizzaImage, description: "Indian-style chicken tikka" },
    { id: 44, name: "White Sauce Pizza", price: 520, category: "Pizzas", image: pizzaImage, description: "Creamy white sauce base" },
    { id: 45, name: "Tandoori Pizza", price: 580, category: "Pizzas", image: pizzaImage, description: "Tandoori spiced chicken" },
    { id: 46, name: "Olive Supreme Pizza", price: 500, category: "Pizzas", image: pizzaImage, description: "Mixed olives and cheese" },
    { id: 47, name: "Breakfast Pizza", price: 550, category: "Pizzas", image: pizzaImage, description: "Eggs and bacon on pizza" },
    { id: 48, name: "Calzone", price: 450, category: "Pizzas", image: pizzaImage, description: "Folded pizza with fillings" },
    { id: 49, name: "Personal Pizza", price: 280, category: "Pizzas", image: pizzaImage, description: "Individual size pizza" },
    { id: 50, name: "Stuffed Crust Pizza", price: 600, category: "Pizzas", image: pizzaImage, description: "Cheese-stuffed crust" },

    // Pasta & Noodles (20 items)
    { id: 51, name: "Spaghetti Bolognese", price: 350, category: "Pasta", image: pastaImage, description: "Classic meat sauce pasta" },
    { id: 52, name: "Chicken Alfredo", price: 420, category: "Pasta", image: pastaImage, description: "Creamy alfredo with chicken" },
    { id: 53, name: "Penne Arrabbiata", price: 290, category: "Pasta", image: pastaImage, description: "Spicy tomato sauce pasta" },
    { id: 54, name: "Carbonara Pasta", price: 380, category: "Pasta", image: pastaImage, description: "Creamy bacon pasta" },
    { id: 55, name: "Lasagna", price: 450, category: "Pasta", image: pastaImage, description: "Layered pasta with cheese" },
    { id: 56, name: "Mac and Cheese", price: 250, category: "Pasta", image: pastaImage, description: "Cheesy macaroni pasta" },
    { id: 57, name: "Seafood Pasta", price: 550, category: "Pasta", image: pastaImage, description: "Mixed seafood pasta" },
    { id: 58, name: "Pesto Pasta", price: 320, category: "Pasta", image: pastaImage, description: "Basil pesto sauce" },
    { id: 59, name: "Chicken Noodles", price: 280, category: "Pasta", image: pastaImage, description: "Asian-style chicken noodles" },
    { id: 60, name: "Beef Ramen", price: 340, category: "Pasta", image: pastaImage, description: "Japanese ramen with beef" },
    { id: 61, name: "Veggie Pasta", price: 270, category: "Pasta", image: pastaImage, description: "Mixed vegetables pasta" },
    { id: 62, name: "Ravioli", price: 400, category: "Pasta", image: pastaImage, description: "Stuffed pasta parcels" },
    { id: 63, name: "Gnocchi", price: 380, category: "Pasta", image: pastaImage, description: "Potato pasta dumplings" },
    { id: 64, name: "Pad Thai", price: 320, category: "Pasta", image: pastaImage, description: "Thai-style noodles" },
    { id: 65, name: "Lo Mein", price: 300, category: "Pasta", image: pastaImage, description: "Chinese stir-fried noodles" },
    { id: 66, name: "Fettuccine Alfredo", price: 360, category: "Pasta", image: pastaImage, description: "Flat pasta with cream sauce" },
    { id: 67, name: "Spaghetti Aglio Olio", price: 250, category: "Pasta", image: pastaImage, description: "Garlic and olive oil pasta" },
    { id: 68, name: "Shrimp Scampi", price: 480, category: "Pasta", image: pastaImage, description: "Shrimp with garlic pasta" },
    { id: 69, name: "Tortellini", price: 420, category: "Pasta", image: pastaImage, description: "Ring-shaped stuffed pasta" },
    { id: 70, name: "Linguine Marinara", price: 310, category: "Pasta", image: pastaImage, description: "Seafood marinara sauce" },

    // Drinks (15 items)
    { id: 71, name: "Mango Shake", price: 120, category: "Drinks", image: drinksImage, description: "Fresh mango milkshake" },
    { id: 72, name: "Chocolate Shake", price: 130, category: "Drinks", image: drinksImage, description: "Rich chocolate milkshake" },
    { id: 73, name: "Strawberry Smoothie", price: 140, category: "Drinks", image: drinksImage, description: "Fresh strawberry smoothie" },
    { id: 74, name: "Vanilla Shake", price: 110, category: "Drinks", image: drinksImage, description: "Classic vanilla milkshake" },
    { id: 75, name: "Fresh Lime Soda", price: 80, category: "Drinks", image: drinksImage, description: "Refreshing lime soda" },
    { id: 76, name: "Orange Juice", price: 90, category: "Drinks", image: drinksImage, description: "Fresh orange juice" },
    { id: 77, name: "Iced Coffee", price: 100, category: "Drinks", image: drinksImage, description: "Cold brew coffee" },
    { id: 78, name: "Hot Chocolate", price: 110, category: "Drinks", image: drinksImage, description: "Rich hot chocolate" },
    { id: 79, name: "Green Tea", price: 70, category: "Drinks", image: drinksImage, description: "Healthy green tea" },
    { id: 80, name: "Lassi", price: 90, category: "Drinks", image: drinksImage, description: "Yogurt-based drink" },
    { id: 81, name: "Energy Drink", price: 120, category: "Drinks", image: drinksImage, description: "Refreshing energy boost" },
    { id: 82, name: "Coconut Water", price: 80, category: "Drinks", image: drinksImage, description: "Natural coconut water" },
    { id: 83, name: "Lemonade", price: 70, category: "Drinks", image: drinksImage, description: "Fresh lemonade" },
    { id: 84, name: "Masala Chai", price: 60, category: "Drinks", image: drinksImage, description: "Spiced Indian tea" },
    { id: 85, name: "Cold Coffee", price: 110, category: "Drinks", image: drinksImage, description: "Iced coffee with milk" },

    // Desserts (15 items)
    { id: 86, name: "Chocolate Brownie", price: 150, category: "Desserts", image: dessertsImage, description: "Rich chocolate brownie" },
    { id: 87, name: "Vanilla Ice Cream", price: 80, category: "Desserts", image: dessertsImage, description: "Classic vanilla ice cream" },
    { id: 88, name: "Cheesecake", price: 180, category: "Desserts", image: dessertsImage, description: "Creamy cheesecake slice" },
    { id: 89, name: "Tiramisu", price: 220, category: "Desserts", image: dessertsImage, description: "Italian coffee dessert" },
    { id: 90, name: "Apple Pie", price: 160, category: "Desserts", image: dessertsImage, description: "Classic apple pie slice" },
    { id: 91, name: "Chocolate Cake", price: 140, category: "Desserts", image: dessertsImage, description: "Rich chocolate cake" },
    { id: 92, name: "Kulfi", price: 100, category: "Desserts", image: dessertsImage, description: "Indian ice cream" },
    { id: 93, name: "Gulab Jamun", price: 120, category: "Desserts", image: dessertsImage, description: "Sweet Indian dessert" },
    { id: 94, name: "Ras Malai", price: 130, category: "Desserts", image: dessertsImage, description: "Creamy milk dessert" },
    { id: 95, name: "Fruit Salad", price: 90, category: "Desserts", image: dessertsImage, description: "Fresh fruit mix" },
    { id: 96, name: "Panna Cotta", price: 170, category: "Desserts", image: dessertsImage, description: "Italian cream dessert" },
    { id: 97, name: "Chocolate Mousse", price: 160, category: "Desserts", image: dessertsImage, description: "Light chocolate mousse" },
    { id: 98, name: "Crème Brûlée", price: 200, category: "Desserts", image: dessertsImage, description: "French vanilla custard" },
    { id: 99, name: "Donut Trio", price: 120, category: "Desserts", image: dessertsImage, description: "Three assorted donuts" },
    { id: 100, name: "Sundae Special", price: 140, category: "Desserts", image: dessertsImage, description: "Ice cream sundae" },
  ];

  const categories = ["All", "Burgers", "Pizzas", "Pasta", "Drinks", "Desserts"];

  const filteredAndSortedItems = useMemo(() => {
    let filtered = menuItems.filter((item) => {
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    filtered.sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

    return filtered;
  }, [selectedCategory, searchTerm, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-primary">
                Explore Our Menu
              </h1>
            </div>
            <div className="text-sm text-muted-foreground hidden md:block">
              "Apna favourite fast food choose kijiye – bas ek click aur swad ka maza lijiye!"
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filters and Search */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search for food items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price">Price</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results count */}
          <div className="text-muted-foreground">
            Showing {filteredAndSortedItems.length} items
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedItems.map((item, index) => (
            <div
              key={item.id}
              className="bg-card rounded-2xl shadow-card hover:shadow-elegant transition-all duration-500 overflow-hidden group animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
                    ₹{item.price}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-serif font-bold text-lg text-card-foreground mb-2 line-clamp-1">
                  {item.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                  <Button 
                    size="sm" 
                    variant="default" 
                    className="gap-2"
                    onClick={() => addToCart({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      image: item.image,
                      category: item.category
                    })}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAndSortedItems.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-serif font-bold text-muted-foreground mb-4">
              No items found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}>
              Clear Filters
            </Button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-16 py-8 bg-secondary/30 rounded-2xl">
          <h3 className="text-2xl font-serif font-bold text-primary mb-4">
            Ready to Order?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Add your favorite items to cart and enjoy delicious food delivered to your doorstep
          </p>
          <Link to="/cart">
            <Button size="lg" className="bg-gradient-gold hover:shadow-gold">
              <ShoppingCart className="w-4 h-4 mr-2" />
              View Cart & Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MenuCategories;