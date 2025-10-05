import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const addToCart = () => {
    const cart = localStorage.getItem("cart");
    const items = cart ? JSON.parse(cart) : [];
    
    const existingItem = items.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        quantity: 1
      });
    }
    
    localStorage.setItem("cart", JSON.stringify(items));
    window.dispatchEvent(new Event("cartUpdated"));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Card className="group overflow-hidden border-border transition-all hover:shadow-[--shadow-hover]">
      <div className="relative aspect-square overflow-hidden bg-accent">
        <img
          src={product.image_url || "/placeholder.svg"}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.stock < 20 && (
          <div className="absolute top-2 right-2 rounded-full bg-destructive px-2 py-1 text-xs font-semibold text-white">
            Low Stock
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="mb-1 text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {product.category}
        </div>
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            ₹{product.price.toFixed(2)}
          </span>
          <span className="text-xs text-muted-foreground">
            {product.stock} in stock
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={addToCart} 
          className="w-full"
          disabled={product.stock === 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
