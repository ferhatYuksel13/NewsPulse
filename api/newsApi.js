// /api/newsApi.js
import axios from 'axios';

const API_KEY = '62f5192c39f945f1b3c1aeceb471a8b6';
const BASE_URL = 'https://newsapi.org/v2';

export const fetchHeadlines = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines?country=us&apiKey=${API_KEY}`);
    return response.data.articles;
  } catch (error) {
    console.error('Haberler çekilemedi:', error);
    return [];
  }
};

export const fetchCategoryNews = async (category) => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines?category=${category}&country=us&apiKey=${API_KEY}`);
    return response.data.articles;
  } catch (error) {
    console.error('Kategori haberleri çekilemedi:', error);
    return [];
  }
};

export const searchNews = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/everything?q=${query}&apiKey=${API_KEY}`);
    return response.data.articles;
  } catch (error) {
    console.error('Arama hatası:', error);
    return [];
  }
};
