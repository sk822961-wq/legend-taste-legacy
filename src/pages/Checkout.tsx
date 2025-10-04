import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CreditCard, Smartphone, Wallet, Banknote, Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phone: z.string().regex(/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"),
  address: z.string().min(10, "Please enter a complete delivery address"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  paymentMethod: z.enum(["googlepay", "phonepe", "paytm", "cod"]),
  upiId: z.string().optional(),
}).refine((data) => {
  if (data.paymentMethod !== "cod" && !data.upiId) {
    return false;
  }
  return true;
}, {
  message: "UPI ID is required for UPI payments",
  path: ["upiId"],
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

// Initial cart data
const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Margherita Pizza",
    image: "/src/assets/pizza.jpg",
    price: 299,
    quantity: 2,
  },
  {
    id: 2,
    name: "Classic Burger",
    image: "/src/assets/burger.jpg",
    price: 199,
    quantity: 1,
  },
  {
    id: 3,
    name: "Chicken Noodles",
    image: "/src/assets/noodles.jpg",
    price: 249,
    quantity: 1,
  },
];

const Checkout = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      address: "",
      email: "",
      paymentMethod: "googlepay",
      upiId: "",
    },
  });

  const paymentMethod = form.watch("paymentMethod");

  const subtotal = getTotalPrice();
  const deliveryCharges = subtotal > 500 ? 0 : 50;
  const taxes = Math.round(subtotal * 0.05); // 5% tax
  const total = subtotal + deliveryCharges + taxes;

  const onSubmit = async (data: CheckoutFormData) => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "Please add items to your cart before placing an order.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (data.paymentMethod === "cod") {
      toast({
        title: "Order Placed Successfully!",
        description: "Your order has been placed. Please keep cash ready at delivery.",
        duration: 5000,
      });
    } else {
      toast({
        title: "Payment Successful!",
        description: "Your order has been placed successfully. You will receive a confirmation soon.",
        duration: 5000,
      });
    }
    
    clearCart();
    setIsLoading(false);
    form.reset();
  };

  const paymentOptions = [
    { value: "googlepay", label: "Google Pay", icon: Smartphone },
    { value: "phonepe", label: "PhonePe", icon: CreditCard },
    { value: "paytm", label: "Paytm", icon: Wallet },
    { value: "cod", label: "Cash on Delivery", icon: Banknote },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Menu</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8 text-center">Checkout</h1>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-card rounded-lg p-6 shadow-card border border-border/20 h-fit">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Order Summary</h2>
                <Link to="/#menu">
                  <Button variant="outline" size="sm" className="gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    Add More Items
                  </Button>
                </Link>
              </div>
              
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">Your cart is empty</p>
                  <Link to="/#menu">
                    <Button variant="outline">Add Items to Cart</Button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-3 bg-background/50 rounded-lg">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">{item.name}</h3>
                          <p className="text-muted-foreground">₹{item.price} each</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">₹{item.price * item.quantity}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive/80 p-1 h-auto"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border/20 pt-4 space-y-2">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Delivery Charges</span>
                      <span>{deliveryCharges === 0 ? "FREE" : `₹${deliveryCharges}`}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Taxes</span>
                      <span>₹{taxes}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-foreground border-t border-border/20 pt-2">
                      <span>Total</span>
                      <span>₹{total}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Checkout Form */}
            <div className="bg-card rounded-lg p-6 shadow-card border border-border/20">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Customer Details */}
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-4">Customer Details</h2>
                    
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter 10-digit phone number" 
                                type="tel"
                                {...field} 
                              />
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
                            <FormLabel>Delivery Address *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Enter complete delivery address with landmarks"
                                className="min-h-[100px]"
                                {...field} 
                              />
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
                            <FormLabel>Email (Optional)</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your email address" 
                                type="email"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Payment Options */}
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-4">Payment Method</h2>
                    
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="space-y-3"
                            >
                              {paymentOptions.map((option) => {
                                const Icon = option.icon;
                                return (
                                  <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg border border-border/20 hover:bg-background/50 transition-colors">
                                    <RadioGroupItem value={option.value} id={option.value} />
                                    <Icon className="w-5 h-5 text-primary" />
                                    <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                                      {option.label}
                                    </Label>
                                  </div>
                                );
                              })}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* UPI ID Field */}
                    {paymentMethod !== "cod" && (
                      <FormField
                        control={form.control}
                        name="upiId"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>UPI ID *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="yourname@upi" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full text-lg py-6"
                    disabled={isLoading || cartItems.length === 0}
                    variant="gold"
                  >
                    {isLoading ? "Processing..." : `Complete Order & Pay ₹${total}`}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;