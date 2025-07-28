import { Award, Heart, Users, Clock } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Award,
      title: "Quality",
      description: "Premium ingredients and exceptional preparation in every dish"
    },
    {
      icon: Heart,
      title: "Hospitality",
      description: "Warm service that makes every guest feel like family"
    },
    {
      icon: Users,
      title: "Legacy",
      description: "Building memories and traditions that last generations"
    },
    {
      icon: Clock,
      title: "Taste",
      description: "Flavors that transport you and create lasting impressions"
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Our Story
          </h2>
          <div className="w-24 h-1 bg-gradient-gold mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A culinary journey that began with passion and continues with purpose
          </p>
        </div>

        {/* Story Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="animate-fade-in">
            <h3 className="text-3xl font-serif font-semibold text-primary mb-6">
              Where Every Meal Becomes a Memory
            </h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Founded with a vision to create more than just a dining experience, The Legend Cafe and Restaurant 
              has been serving exceptional cuisine that bridges the gap between traditional flavors and contemporary innovation.
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Our commitment to excellence goes beyond the plate. We believe that great food brings people together, 
              creates lasting memories, and tells stories that span generations.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From our carefully curated menu featuring both beloved classics and exciting new creations, 
              to our warm and inviting atmosphere, every detail is designed to make your dining experience truly legendary.
            </p>
          </div>
          
          <div className="relative animate-scale-in">
            <div className="bg-gradient-card rounded-2xl p-8 shadow-elegant">
              <div className="text-center">
                <div className="text-6xl font-serif font-bold text-accent mb-2">15+</div>
                <p className="text-lg text-primary font-semibold mb-4">Years of Excellence</p>
                <div className="text-4xl font-serif font-bold text-accent mb-2">50,000+</div>
                <p className="text-lg text-primary font-semibold mb-4">Happy Customers</p>
                <div className="text-4xl font-serif font-bold text-accent mb-2">100+</div>
                <p className="text-lg text-primary font-semibold">Signature Dishes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="text-center bg-gradient-card rounded-xl p-8 shadow-card hover:shadow-elegant transition-all duration-500 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-gold">
                <value.icon className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-serif font-semibold text-primary mb-4">
                {value.title}
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;