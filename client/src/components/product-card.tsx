import { Link } from "wouter";
import type { Product } from "@shared/schema";
import { motion } from "framer-motion";
import { ShoppingBag, Zap } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative"
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative bg-card rounded-xl overflow-hidden border border-white/5 group-hover:border-primary/50 transition-colors duration-500 h-[420px] flex flex-col">
          {/* Image Container */}
          <div className="relative h-64 overflow-hidden bg-[#050505]">
            <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent z-10 opacity-60" />
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110 opacity-80"
            />
            <div className="absolute top-4 right-4 z-20">
              <span className="px-3 py-1 bg-black/50 backdrop-blur border border-white/10 rounded-full text-xs font-mono text-primary uppercase">
                {product.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 flex flex-col justify-between relative z-20">
            <div>
              <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-1">
                {product.name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4 font-light">
                {product.description}
              </p>
            </div>
            
            <div className="flex items-center justify-between mt-auto">
              <span className="text-xl font-mono text-white font-bold">
                ${(product.price / 100).toFixed(2)}
              </span>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="rounded-full border-primary/30 hover:bg-primary hover:text-black hover:border-primary transition-all duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addItem(product);
                  }}
                >
                  <ShoppingBag className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Hover Glow Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 pointer-events-none" />
        </div>
      </Link>
    </motion.div>
  );
}
