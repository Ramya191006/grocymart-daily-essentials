import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, MapPin, Package, Truck } from "lucide-react";

const TrackOrder = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [deliveryPosition, setDeliveryPosition] = useState({ lat: 40.7128, lng: -74.006 });
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchOrder();
    simulateDelivery();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const { data: orderData, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .single();

      if (error) throw error;
      setOrder(orderData);
    } catch (error) {
      console.error("Error fetching order:", error);
    } finally {
      setLoading(false);
    }
  };

  const simulateDelivery = () => {
    const interval = setInterval(() => {
      setDeliveryPosition(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001
      }));
    }, 3000);

    return () => clearInterval(interval);
  };

  // Simulated map display - in production, integrate with Google Maps or similar

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold">Track Your Order</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Map */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Live Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-video bg-accent rounded-lg overflow-hidden">
                  {/* Simulated Map */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent to-muted flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-primary mx-auto mb-2 animate-bounce" />
                      <p className="text-sm text-muted-foreground">
                        Delivery in progress
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Lat: {deliveryPosition.lat.toFixed(4)}, Lng: {deliveryPosition.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-accent rounded-lg">
                  <p className="text-sm">
                    <strong>Note:</strong> This is a simulated delivery tracking. In a production environment, 
                    this would show real-time GPS coordinates of your delivery driver.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-xs text-white font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold">Order Confirmed</p>
                      <p className="text-xs text-muted-foreground">We've received your order</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-xs text-white font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold">Preparing</p>
                      <p className="text-xs text-muted-foreground">Your items are being packed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center animate-pulse">
                      <Truck className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Out for Delivery</p>
                      <p className="text-xs text-muted-foreground">On the way to you</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 opacity-50">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs">-</span>
                    </div>
                    <div>
                      <p className="font-semibold">Delivered</p>
                      <p className="text-xs text-muted-foreground">Arriving soon</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Delivery Address:</p>
                  <p className="text-sm">{order?.delivery_address?.street}</p>
                  <p className="text-sm">
                    {order?.delivery_address?.city}, {order?.delivery_address?.state}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Phone: {order?.delivery_address?.phone}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
