import { Facebook, Instagram, Twitter, Heart } from "lucide-react";
const Footer = () => {
  const quickLinks = [{
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
  const socialLinks = [{
    icon: Facebook,
    href: "#",
    label: "Facebook"
  }, {
    icon: Instagram,
    href: "#",
    label: "Instagram"
  }, {
    icon: Twitter,
    href: "#",
    label: "Twitter"
  }];
  return <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-3xl font-serif font-bold text-accent mb-4">
              The Legend
            </h3>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Where every meal tells a story and every visit becomes a cherished memory. 
              Experience culinary excellence in an atmosphere of warmth and tradition.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(social => <a key={social.label} href={social.href} className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300" aria-label={social.label}>
                  <social.icon className="w-5 h-5" />
                </a>)}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-serif font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map(link => <li key={link.name}>
                  <a href={link.href} className="text-primary-foreground/80 hover:text-accent transition-colors duration-300 relative group">
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>)}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-serif font-semibold mb-6">Contact Info</h4>
            <div className="space-y-3 text-primary-foreground/80">
              <p>Padao, Near Tadwa Baba Mandir</p>
              <p>Chandauli, Uttar Pradesh, 221102</p>
              <p>Phone: +91 98765 43210</p>
              <p>Email: info@thelegendcafe.com</p>
              <p className="text-accent font-medium">Daily 11:00 AM - 11:00 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/60 text-sm">
            © 2024 The Legend Cafe & Restaurant. All rights reserved.
          </p>
          <p className="text-primary-foreground/60 text-sm flex items-center mt-4 md:mt-0">
            Made with <Heart className="w-4 h-4 mx-1 text-accent" /> for food lovers
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;