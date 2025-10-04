import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Heart, Users, Truck } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">
            About Grocy Mart
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Your trusted partner for fresh, quality groceries delivered right to your doorstep.
            We're committed to making daily shopping convenient, affordable, and sustainable.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="mb-4 inline-flex rounded-full bg-primary/10 p-4">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Fresh Quality</h3>
              <p className="text-muted-foreground">
                Sourced directly from trusted farmers and suppliers
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="mb-4 inline-flex rounded-full bg-secondary/10 p-4">
                <Heart className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Customer Care</h3>
              <p className="text-muted-foreground">
                Your satisfaction is our top priority
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="mb-4 inline-flex rounded-full bg-primary/10 p-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Community</h3>
              <p className="text-muted-foreground">
                Supporting local businesses and farmers
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="mb-4 inline-flex rounded-full bg-secondary/10 p-4">
                <Truck className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Quick and reliable service to your door
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Story Section */}
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="p-8">
              <h2 className="mb-4 text-2xl font-bold">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Grocy Mart was founded with a simple mission: to make grocery shopping easier 
                  and more convenient for busy families. We understand that finding time to shop 
                  for quality groceries can be challenging, which is why we've created a seamless 
                  online shopping experience.
                </p>
                <p>
                  Our carefully curated selection includes everything you need for your daily 
                  cooking - from premium oils and pulses to fresh vegetables and aromatic spices. 
                  We work directly with trusted suppliers to ensure every product meets our high 
                  standards of quality and freshness.
                </p>
                <p>
                  What sets us apart is our commitment to both quality and convenience. With our 
                  easy-to-use platform, you can browse products, add them to your cart, and have 
                  them delivered to your doorstep - all from the comfort of your home.
                </p>
                <p>
                  Thank you for choosing Grocy Mart. We're honored to be part of your daily life 
                  and look forward to serving you with the best grocery shopping experience possible.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
