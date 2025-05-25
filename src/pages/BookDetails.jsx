import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { getBookById } from '../services/bookService';
import { useAuth } from '../contexts/AuthContext';

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBookById(id);
        setBook(data);
      } catch (error) {
        console.error('Error fetching book:', error);
        toast.error('Failed to fetch book details');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }

    const cartItem = {
      id: book.id,
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors?.[0] || 'Unknown Author',
      price: book.saleInfo?.listPrice?.amount || 9.99,
      thumbnail: book.volumeInfo.imageLinks?.thumbnail,
      quantity: 1
    };

    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = currentCart.findIndex(item => item.id === book.id);
    
    if (existingItemIndex !== -1) {
      currentCart[existingItemIndex].quantity += 1;
      toast.success('Added another copy to cart!');
    } else {
      currentCart.push(cartItem);
      toast.success('Book added to cart!');
    }

    localStorage.setItem('cart', JSON.stringify(currentCart));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!book) {
    return <div>Book not found</div>;
  }

  const { volumeInfo, saleInfo } = book;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <img
          src={volumeInfo.imageLinks?.thumbnail || '/placeholder-book.png'}
          alt={volumeInfo.title}
          className="w-full max-w-md rounded-lg shadow-lg"
        />
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-4">{volumeInfo.title}</h1>
        <p className="text-xl text-gray-600 mb-4">
          by {volumeInfo.authors?.join(', ') || 'Unknown Author'}
        </p>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700">{volumeInfo.description}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Details</h2>
          <ul className="space-y-2 text-gray-700">
            <li>
              <span className="font-medium">Publisher:</span> {volumeInfo.publisher}
            </li>
            <li>
              <span className="font-medium">Published Date:</span>{' '}
              {volumeInfo.publishedDate}
            </li>
            <li>
              <span className="font-medium">Pages:</span> {volumeInfo.pageCount}
            </li>
            <li>
              <span className="font-medium">Categories:</span>{' '}
              {volumeInfo.categories?.join(', ')}
            </li>
          </ul>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">
            ${(saleInfo?.listPrice?.amount || 9.99).toFixed(2)}
          </div>
          <button
            onClick={handleAddToCart}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails; 