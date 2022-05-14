export interface IMovie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export interface IFavorite extends IMovie {
  ratingStar: number
}
