import axios from 'axios';

const API_KEY = 'MjpbRzYHGjK9UEhPOkf74trOngjiAPTD';
const BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';

export const getNewsFromAPI = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}?q=${query}&api-key=${API_KEY}`);
    return response.data.response.docs;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;  // Pastikan error dilempar kembali untuk penanganan di komponen
  }
};
