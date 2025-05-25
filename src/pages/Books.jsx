import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { searchBooks } from '../services/bookService';
import { useAuth } from '../contexts/AuthContext';

const DEFAULT_QUERY = 'subject:literature';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [startIndex, setStartIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const { user } = useAuth();

  const fetchBooks = async (index, isLoadMore = false) => {
    try {
      setLoadingMore(isLoadMore);
      const searchQuery = query.trim() || DEFAULT_QUERY;
      const data = await searchBooks(searchQuery, index);
      setTotalItems(data.totalItems || 0);
      
      if (isLoadMore) {
        setBooks(prevBooks => [...prevBooks, ...(data.items || [])]);
      } else {
        setBooks(data.items || []);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to fetch books');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setStartIndex(0);
    fetchBooks(0);
  }, [query]);

  const handleLoadMore = () => {
    const nextIndex = startIndex + 39;
    setStartIndex(nextIndex);
    fetchBooks(nextIndex, true);
  };

  const addToCart = (book) => {
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

  const hasMoreBooks = books.length > 0 && startIndex + 39 < totalItems;

  return (
    <div>
      <div className="flex justify-center mb-8">
        <input
          type="text"
          value={query === DEFAULT_QUERY ? '' : query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books..."
          className="w-full max-w-xl px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col h-full"
          >
            <div className="p-4 flex-1 flex flex-col">
              <div className="aspect-w-3 aspect-h-4 mb-4">
                <img
                  src={book.volumeInfo.imageLinks?.thumbnail || '/placeholder-book.png'}
                  alt={book.volumeInfo.title}
                  className="object-cover w-full h-64 rounded"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2 flex-grow">{book.volumeInfo.title}</h3>
              <div className="mt-auto">
                <p className="text-sm text-gray-600 mb-2">
                  {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
                </p>
                <p className="text-black font-bold mb-4">
                  ${(book.saleInfo?.listPrice?.amount || 9.99).toFixed(2)}
                </p>
                <div className="flex space-x-2">
                  <Link
                    to={`/books/${book.id}`}
                    className="flex-1 px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 text-center cursor-pointer"
                  >
                    Details
                  </Link>
                  <button
                    onClick={() => addToCart(book)}
                    className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {hasMoreBooks && (
        <div className="flex justify-center mt-8 mb-8">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {loadingMore ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Loading...</span>
              </>
            ) : (
              'Load More Books'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Books; 