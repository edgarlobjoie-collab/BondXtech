import { Layout } from "@/components/layout";
import { useCart } from "@/lib/cart-store";
import { useCreateOrder } from "@/hooks/use-orders";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertOrderSchema } from "@shared/schema";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, ShieldCheck, Lock } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

// Frontend validation schema (omit backend-only fields)
const checkoutSchema = insertOrderSchema.pick({
  name: true,
  email: true,
  address: true,
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { mutate: createOrder, isPending } = useCreateOrder();
  const [success, setSuccess] = useState(false);

  const form = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
    },
  });

  const onSubmit = (data: CheckoutForm) => {
    if (items.length === 0) return;

    createOrder({
      ...data,
      total: total(),
      items: items.map(item => ({ productId: item.id, quantity: item.quantity })),
    }, {
      onSuccess: () => {
        setSuccess(true);
        clearCart();
      }
    });
  };

  if (success) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="space-y-6 max-w-md w-full p-8 rounded-3xl bg-card border border-primary/20 shadow-[0_0_30px_rgba(0,243,255,0.1)]"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-display font-bold">Order Confirmed</h2>
            <p className="text-muted-foreground">
              Your transaction has been secured on the blockchain. Shipment protocols initiated.
            </p>
            <Button asChild className="w-full bg-primary text-black hover:bg-primary/90 font-bold uppercase tracking-widest">
              <Link href="/">Return to Base</Link>
            </Button>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-display font-bold mb-8">Secure Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-card border border-white/10 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6 text-primary/80 text-sm font-mono">
                <Lock className="w-4 h-4" />
                <span>256-BIT ENCRYPTION ACTIVE</span>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Identity Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="bg-background/50 border-white/10 focus:border-primary/50 h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Protocol (Email)</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" {...field} className="bg-background/50 border-white/10 focus:border-primary/50 h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Delivery Coordinates</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Neo Tokyo St." {...field} className="bg-background/50 border-white/10 focus:border-primary/50 h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full h-14 text-lg font-display tracking-widest uppercase bg-primary text-black hover:bg-primary/90 shadow-[0_0_20px_rgba(0,243,255,0.2)] mt-8"
                    disabled={isPending || items.length === 0}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 w-5 h-5 animate-spin" /> Processing...
                      </>
                    ) : (
                      "Confirm Transaction"
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>

          {/* Summary */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div className="bg-card/50 backdrop-blur border border-white/5 rounded-2xl p-6 md:p-8">
              <h3 className="font-display font-bold text-xl mb-6">Order Summary</h3>
              
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {items.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Cart is empty.</p>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex gap-4 py-2 border-b border-white/5 last:border-0">
                      <div className="w-16 h-16 rounded bg-background overflow-hidden shrink-0">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm text-white line-clamp-1">{item.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right font-mono text-sm">
                        ${((item.price * item.quantity) / 100).toFixed(2)}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${(total() / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Shipping</span>
                  <span className="text-primary">FREE</span>
                </div>
                <div className="flex justify-between text-xl font-bold font-mono text-white pt-4">
                  <span>Total</span>
                  <span className="text-primary">${(total() / 100).toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-8 flex items-start gap-3 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="text-xs text-muted-foreground">
                  <span className="text-primary font-bold block mb-1">Satisfaction Guaranteed</span>
                  If your tech doesn't meet the specs, return it within 30 cycles for a full refund.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
