import { useRoute } from "wouter";
import { Layout } from "@/components/layout";
import { useProduct } from "@/hooks/use-products";
import { useCart } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import { Loader2, Check, ShoppingCart, Info, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const id = parseInt(params?.id || "0");
  const { data: product, isLoading } = useProduct(id);
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
          <h1 className="text-4xl font-display font-bold text-muted-foreground">404</h1>
          <p>Product not found in database.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative rounded-3xl overflow-hidden border border-white/10 bg-card aspect-square group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-50" />
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            {/* Overlay tech specs design */}
            <div className="absolute inset-0 border-[1px] border-white/5 m-4 rounded-2xl pointer-events-none" />
            <div className="absolute bottom-8 left-8 bg-black/60 backdrop-blur px-4 py-2 rounded-lg border border-white/10">
              <span className="font-mono text-xs text-primary">ID: {product.id.toString().padStart(4, '0')}</span>
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className="border-primary/50 text-primary font-mono uppercase rounded-sm px-2">
                  In Stock
                </Badge>
                <Badge variant="secondary" className="bg-secondary/10 text-secondary hover:bg-secondary/20 font-mono uppercase rounded-sm px-2">
                  {product.category}
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 leading-tight">
                {product.name}
              </h1>
              
              <div className="text-3xl font-mono text-primary font-bold mb-6">
                ${(product.price / 100).toFixed(2)}
              </div>
              
              <p className="text-muted-foreground text-lg leading-relaxed border-l-2 border-white/10 pl-4">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-lg flex items-center gap-2">
                <Info className="w-4 h-4 text-primary" />
                Technical Specifications
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                    <div className="mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/10">
              <Button 
                size="lg"
                className={`
                  flex-1 h-14 text-lg font-display tracking-widest uppercase transition-all duration-300
                  ${added ? 'bg-green-500 hover:bg-green-600 text-black' : 'bg-primary hover:bg-primary/90 text-black shadow-[0_0_20px_rgba(0,243,255,0.3)]'}
                `}
                onClick={handleAddToCart}
                disabled={added}
              >
                {added ? (
                  <>
                    <Check className="mr-2 w-5 h-5" /> Added to System
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 w-5 h-5" /> Initialize Purchase
                  </>
                )}
              </Button>
              <Button size="lg" variant="outline" className="h-14 w-14 p-0 border-white/10 hover:border-primary/50 hover:bg-primary/10">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
