import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Mock checkout process
    setTimeout(() => {
      setLoading(false);
      localStorage.removeItem('cart'); // Clear cart after successful purchase
      toast.success('Thank you for your purchase!');
      navigate('/');
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black cursor-text"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black cursor-text"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                id="address"
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black cursor-text"
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black cursor-text"
              />
            </div>
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                ZIP Code
              </label>
              <input
                type="text"
                id="zipCode"
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black cursor-text"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold">Total</p>
                <p className="text-lg font-bold">${total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
          <p className="text-gray-600 mb-2">
            (This is a mock checkout - no real payment will be processed)
          </p>
          <p className="text-gray-600">
            Your cart will be cleared after the mock purchase.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg shadow-lg transform hover:scale-[1.02] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
              <span>Processing...</span>
            </>
          ) : (
            'Complete Purchase'
          )}
        </button>
      </form>
    </div>
  );
};

export default Checkout; 