import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center py-20">
            <ShoppingBag className="w-24 h-24 text-muted-foreground mb-6" />
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Your Cart is Empty</h2>
            <p className="text-muted-foreground mb-8 text-center max-w-md">
              Looks like you haven't added any delicious items to your cart yet.
            </p>
            <Link to="/menu">
              <Button variant="gold" size="lg">
                Explore Our Menu
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link to="/menu" className="inline-flex items-center text-primary hover:text-accent transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Menu
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
            Shopping Cart
          </h1>
          <p className="text-muted-foreground mt-2">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-card rounded-xl shadow-card p-4 md:p-6 hover:shadow-elegant transition-all"
              >
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg md:text-xl font-serif font-semibold text-card-foreground">
                          {item.name}
                        </h3>
                        <span className="text-sm text-muted-foreground">{item.category}</span>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-destructive hover:text-destructive/80 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex justify-between items-end mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 bg-secondary rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-primary/10 rounded transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-primary/10 rounded transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-2xl font-bold text-accent">
                          ₹{item.price * item.quantity}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-muted-foreground">
                            ₹{item.price} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl shadow-card p-6 sticky top-24">
              <h2 className="text-2xl font-serif font-bold text-card-foreground mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{getTotalPrice()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery Charges</span>
                  <span>₹50</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>GST (5%)</span>
                  <span>₹{Math.round(getTotalPrice() * 0.05)}</span>
                </div>
                <div className="border-t border-border pt-3 mt-3">
                  <div className="flex justify-between text-lg font-bold text-card-foreground">
                    <span>Total</span>
                    <span className="text-accent">
                      ₹{getTotalPrice() + 50 + Math.round(getTotalPrice() * 0.05)}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                variant="gold"
                size="lg"
                className="w-full"
              >
                Proceed to Checkout
              </Button>

              <Link to="/menu" className="block mt-4">
                <Button variant="outline" size="lg" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
