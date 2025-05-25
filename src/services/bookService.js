import axios from 'axios';

const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';
const API_KEY = 'AIzaSyAMea_ut_ABkNYix8Lb9OTLHOAcDJfrRhU';
const MAX_RESULTS = 39;

export const searchBooks = async (query, startIndex = 0) => {
  try {
    const response = await axios.get(GOOGLE_BOOKS_API, {
      params: {
        q: query,
        startIndex,
        maxResults: MAX_RESULTS,
        key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const getBookById = async (id) => {
  try {
    const response = await axios.get(`${GOOGLE_BOOKS_API}/${id}`, {
      params: {
        key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error;
  }
}; 