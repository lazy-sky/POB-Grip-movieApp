import axios from 'axios';

const BASE_URL = 'http://www.omdbapi.com';

interface Params {
  keyword: string
  page: number
}

export const getMovies = async ({ keyword, page }: Params) => {
  const { data } = await axios.get(`
    ${BASE_URL}/?apikey=${process.env.REACT_APP_MOVIE_APP_ID}&s=${keyword}&page=${page}
  `);

  return data;
};
