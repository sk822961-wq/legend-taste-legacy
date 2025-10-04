import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getTotalItems } = useCart();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navItems = [{
    name: "Home",
    href: "#home"
  }, {
    name: "About",
    href: "#about"
  }, {
    name: "Menu",
    href: "#menu"
  }, {
    name: "Gallery",
    href: "#gallery"
  }, {
    name: "Contact",
    href: "#contact"
  }];
  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-primary/95 backdrop-blur-md shadow-elegant" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-accent">
              The Legend
            </h1>
            <span className="text-xl text-orange-600 font-semibold">
              Cafe & Restaurant
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map(item => <a key={item.name} href={item.href} className="text-primary-foreground hover:text-accent transition-colors duration-300 font-medium relative group">
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </a>)}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart">
              <Button variant="outline" size="sm" className="relative">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
            <Button variant="gold" size="sm">
              Reserve Table
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-primary-foreground hover:text-accent transition-colors">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && <div className="md:hidden mt-4 bg-primary/95 backdrop-blur-md rounded-lg shadow-elegant animate-slide-up">
            <nav className="flex flex-col space-y-4 p-6">
              {navItems.map(item => <a key={item.name} href={item.href} onClick={() => setIsMenuOpen(false)} className="text-primary-foreground hover:text-accent transition-colors duration-300 font-medium">
                  {item.name}
                </a>)}
              <div className="flex flex-col space-y-3 mt-4">
                <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full relative">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Cart
                    {getTotalItems() > 0 && (
                      <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {getTotalItems()}
                      </span>
                    )}
                  </Button>
                </Link>
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
                <Button variant="gold" size="sm">
                  Reserve Table
                </Button>
              </div>
            </nav>
          </div>}
      </div>
    </header>;
};
export default Header;