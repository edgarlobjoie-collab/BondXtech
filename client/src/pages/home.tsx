import { Layout } from "@/components/layout";
import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/product-card";
import { motion } from "framer-motion";
import { Loader2, Zap, Shield, Cpu } from "lucide-react";

export default function Home() {
  const { data: products, isLoading, error } = useProducts();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background z-0" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.03] mix-blend-overlay z-0" />
        
        <div className="container relative z-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-mono text-primary border border-primary/30 bg-primary/5 rounded-full backdrop-blur-sm">
              NEXT GEN TECHNOLOGY ARRIVED
            </span>
            <h1 className="text-6xl md:text-8xl font-black font-display tracking-tighter mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                FUTURE
              </span>
              <span className="text-primary text-glow block md:inline md:ml-4">
                READY
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Equip yourself with elite cybernetics and high-tech gear designed for the next era of human evolution.
            </p>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-20" />
      </section>

      {/* Features Grid */}
      <section className="py-20 border-y border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Feature 
              icon={<Zap className="w-8 h-8 text-primary" />}
              title="Quantum Speed"
              desc="Delivery faster than neural transmission speeds."
            />
            <Feature 
              icon={<Shield className="w-8 h-8 text-secondary" />}
              title="Bio-Secured"
              desc="Military-grade encryption on all transactions."
            />
            <Feature 
              icon={<Cpu className="w-8 h-8 text-accent" />}
              title="Next-Gen Tech"
              desc="Curated selection of prototype-level hardware."
            />
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="shop">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-display font-bold mb-2">LATEST ARRIVALS</h2>
            <div className="h-1 w-20 bg-primary rounded-full shadow-[0_0_10px_rgba(0,243,255,0.5)]" />
          </div>
          <div className="hidden md:block text-sm font-mono text-muted-foreground">
            // CATALOG_V.2.0.77
          </div>
        </div>

        {isLoading ? (
          <div className="min-h-[400px] flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center text-destructive">
            Failed to load inventory. System Offline.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products?.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="p-6 rounded-2xl bg-card/30 border border-white/5 backdrop-blur-sm hover:bg-card/50 transition-colors">
      <div className="mb-4 p-3 bg-white/5 w-fit rounded-xl">{icon}</div>
      <h3 className="text-lg font-display font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
