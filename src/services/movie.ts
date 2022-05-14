import axios from 'axios';
import { IMovie } from 'types/movie';

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
  const { data } = await axios({
    method: 'GET',
    url: process.env.REACT_APP_API_URL,
    params: {
      apikey: process.env.REACT_APP_MOVIE_APP_ID,
      s: keyword,
      page,
    },
  });

  const { Search, Response } = data;

  if (Response === 'False') {
    return { Search: [] };
  }

  // memo: 영화가 중복으로 나오는 결과가 존재. 대체 왜...
  // e.g., resort로 검색시
  if (!Search) {
    const uniq = Search.reduce((acc: IMovie[], cur: IMovie) => {
      if (acc.findIndex(({ imdbID }) => imdbID === cur.imdbID) === -1) {
        acc.push(cur);
      }
      return acc;
    }, []);
    return { ...data, Search: uniq };
  }

  return data;
};
