"use client"
import { getAllProducts } from "@/lib/actions/product";
import Image from "next/image";
import { useState } from "react";

// Define a type for the product data, assuming it has id, title, and subtitle
interface Product {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
}

export default function BulkOrderPage() { // products will be passed as prop
  const [quantities, setQuantities] = useState<{ [key: string]: string }>({});
  const [showDialog, setShowDialog] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Array<{ id: string; title: string; quantity: string }>>([]);
  const [clientInfo, setClientInfo] = useState({
    email: '',
    address: '',
    contact: '',
    notes: '',
  });

  // Simulating products for client component
  const products: Product[] = [
    { id: "1", title: "Amber Oil", subtitle: "Pure Amber Essential Oil", imageUrl: "/oils/amber oil.png" },
    { id: "2", title: "Cardamom Oil", subtitle: "Spicy Cardamom Essential Oil", imageUrl: "/oils/cardamom oil.png" },
    { id: "3", title: "Cinnamon Oil", subtitle: "Warm Cinnamon Essential Oil", imageUrl: "/oils/cinnamon oil.png" },
    { id: "4", title: "Clove Oil", subtitle: "Rich Clove Essential Oil", imageUrl: "/oils/clove oil.png" },
    { id: "5", title: "Ginger Oil", subtitle: "Zesty Ginger Essential Oil", imageUrl: "/oils/ginger oil.png" },
    { id: "6", title: "Jasmine Oil", subtitle: "Floral Jasmine Essential Oil", imageUrl: "/oils/jasmine oil.png" },
    { id: "7", title: "Lavender Oil", subtitle: "Calming Lavender Essential Oil", imageUrl: "/oils/lavender oil.png" },
    { id: "8", title: "Musk Oil", subtitle: "Earthy Musk Essential Oil", imageUrl: "/oils/Musk oil.png" },
    { id: "9", title: "Oud Oil", subtitle: "Exotic Oud Essential Oil", imageUrl: "/oils/oud oil.png" },
    { id: "10", title: "Patchouli Oil", subtitle: "Earthy Patchouli Essential Oil", imageUrl: "/oils/patchouli oil.png" },
    { id: "11", title: "Peppermint Oil", subtitle: "Refreshing Peppermint Essential Oil", imageUrl: "/oils/peppermint oil.png" },
    { id: "12", title: "Rose Oil", subtitle: "Romantic Rose Essential Oil", imageUrl: "/oils/rose oil.png" },
    { id: "13", title: "Sandalwood Oil", subtitle: "Woody Sandalwood Essential Oil", imageUrl: "/oils/sandalwood oil.png" },
    { id: "14", title: "Tulsi Oil", subtitle: "Herbal Tulsi Essential Oil", imageUrl: "/oils/Tulsi oil.png" },
    { id: "15", title: "Ylang Ylang Oil", subtitle: "Sweet Ylang Ylang Essential Oil", imageUrl: "/oils/ylang yalng oil.png" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filledQuantities = Object.entries(quantities).filter(([, value]) => value.trim() !== '');

    if (filledQuantities.length > 0) {
      const productsWithQuantities = filledQuantities.map(([productId, quantity]) => {
        const product = products.find(p => p.id === productId);
        return {
          id: productId,
          title: product?.title || 'Unknown Product',
          quantity: quantity,
        };
      });
      setSelectedProducts(productsWithQuantities);
      setShowDialog(true);
    } else {
      alert("Please enter quantities for at least one product.");
    }
  };

  const handleClientInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClientInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleDialogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Collect all data
    const dataToSend = {
      ...clientInfo,
      selectedProducts,
    };

    try {
      const response = await fetch('/api/bulk-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        setShowDialog(false);
        // Optionally clear form fields
        setQuantities({});
        setClientInfo({ email: '', address: '', contact: '', notes: '' });
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Failed to submit bulk order:', error);
      alert('Failed to submit bulk order. Please try again later.');
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-heading-3 text-[var(--color-dark-900)] mb-6">Request a Bulk Order Quote</h1>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="flex items-center space-x-4 border-b pb-4 last:border-b-0">
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image
                  src={product.imageUrl ?? "/shoes/shoe-1.jpg"}
                  alt={product.title}
                  fill
                  sizes="80px"
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex-grow">
                <h2 className="text-lg font-medium text-[var(--color-dark-900)]">{product.title}</h2>
                <p className="hidden md:block text-sm text-[var(--color-dark-700)]">{product.subtitle}</p>
              </div>
              <input
                type="text"
                name={`quantity-${product.id}`}
                placeholder="(e.g., 1kg, 100ml)"
                maxLength={100}
                className="w-48 p-2 border border-[var(--color-light-300)] rounded-md text-[var(--color-dark-900)]"
                value={quantities[product.id] || ''}
                onChange={(e) => setQuantities({ ...quantities, [product.id]: e.target.value })}
              />
            </div>
          ))}
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full px-6 py-3 bg-[var(--color-dark-900)] text-[var(--color-light-100)] rounded-md hover:bg-[var(--color-dark-700)] transition-colors"
          >
            Submit Quote Request
          </button>
        </div>
      </form>

      {/* Placeholder for the dialog component */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full text-gray-100">
            <h2 className="text-xl font-semibold mb-4">Your Bulk Order Request</h2>
            <form onSubmit={handleDialogSubmit}> {/* Added onSubmit handler */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                <input type="email" id="email" name="email" required className="mt-1 block w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-gray-100" value={clientInfo.email} onChange={handleClientInfoChange} />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-300">Address</label>
                <textarea id="address" name="address" rows={3} required className="mt-1 block w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-gray-100" value={clientInfo.address} onChange={handleClientInfoChange}></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="contact" className="block text-sm font-medium text-gray-300">Contact Number (Optional)</label>
                <input type="tel" id="contact" name="contact" className="mt-1 block w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-gray-100" value={clientInfo.contact} onChange={handleClientInfoChange} />
              </div>
              <div className="mb-4">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-300">Additional Notes</label>
                <textarea id="notes" name="notes" rows={3} className="mt-1 block w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-gray-100" value={clientInfo.notes} onChange={handleClientInfoChange}></textarea>
              </div>

              <h3 className="text-lg font-semibold mb-2">Selected Products:</h3>
              <ul className="mb-4 max-h-40 overflow-y-auto border border-gray-700 p-2 rounded-md">
                {selectedProducts.map((item) => (
                  <li key={item.id} className="text-sm text-gray-200">{item.title}: {item.quantity}</li>
                ))}
              </ul>

              <div className="flex justify-end space-x-4">
                <button type="button" onClick={() => setShowDialog(false)} className="px-4 py-2 border border-gray-700 rounded-md text-gray-300 hover:bg-gray-800">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Submit Quote</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}