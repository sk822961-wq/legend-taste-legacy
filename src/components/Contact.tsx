import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Clock, Mail, MessageCircle } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      content: "Parao, Chandauli, Uttar Pradesh, India",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+91 7983853316",
    },
    {
      icon: Clock,
      title: "Hours",
      content: "Daily 11:00 AM - 11:00 PM",
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@thelegendcafe.com",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Contact Us
          </h2>
          <div className="w-24 h-1 bg-gradient-gold mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to create your next culinary memory? Get in touch with us
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="animate-fade-in">
            <h3 className="text-3xl font-serif font-semibold text-primary mb-8">
              Get in Touch
            </h3>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <div
                  key={info.title}
                  className="flex items-start gap-4 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center shadow-gold flex-shrink-0">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-primary mb-1">
                      {info.title}
                    </h4>
                    <p className="text-muted-foreground">{info.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <Button variant="gold" size="lg" className="w-full">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Us
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                <Phone className="w-5 h-5 mr-2" />
                Call for Reservation
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-8 shadow-elegant animate-scale-in">
            <h3 className="text-2xl font-serif font-semibold text-primary mb-6">
              Send us a Message
            </h3>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    First Name
                  </label>
                  <Input placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Last Name
                  </label>
                  <Input placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Email
                </label>
                <Input type="email" placeholder="john@example.com" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Phone
                </label>
                <Input type="tel" placeholder="+91 98765 43210" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Message
                </label>
                <Textarea
                  placeholder="Tell us about your dining preferences or special requirements..."
                  rows={5}
                />
              </div>
              
              <Button variant="gold" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          </Card>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card className="p-6 shadow-elegant">
            <h3 className="text-2xl font-serif font-semibold text-primary mb-6 text-center">
              Find Us
            </h3>
            <div className="bg-secondary/50 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-accent mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Interactive map will be integrated here
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Parao, Chandauli, Uttar Pradesh, India
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;