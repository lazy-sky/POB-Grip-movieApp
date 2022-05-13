import axios from 'axios';

const BASE_URL = 'http://www.omdbapi.com';

interface Params {
  keyword: string
  page: number
}

/*
  MEMO: 해당 API의 동작이 다소 비정상적으로 작동
  - 에러를 발생시키지 않는다.
    - 에러를 발생시켜야 하는 경우에도 status code가 200
    - 다만 {Response: 'False', Error: 'Movie not found!'} 를 반환
  - 그래서 컴포넌트 파일 내에서 에러 처리
*/
export const getMovies = async ({ keyword, page }: Params) => {
  const { data } = await axios.get(`
    ${BASE_URL}/?apikey=${process.env.REACT_APP_MOVIE_APP_ID}&s=${keyword}&page=${page}
  `);

  const { Response } = data;

  if (Response === 'False') {
    return { Search: [] };
  }

  return data;
};
