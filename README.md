# Movie app

영화를 검색하고 즐겨찾기로 등록할 수 있는 React 앱입니다.

## Deploy

https://movie-app-lazy-sky.vercel.app

## Project Tree

```
📦src
 ┣ 📂assets
 ┃ ┗ 📂images
 ┃ ┃ ┗ 📜no-image.jpg
 ┣ 📂components
 ┃ ┣ 📂AlertModal
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂GNB
 ┃ ┃ ┣ 📜gNB.module.scss
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂LoadingSpinner
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜loadingSpinner.module.scss
 ┃ ┣ 📂NoMovie
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜noMovie.module.scss
 ┃ ┗ 📂PageTitle
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜pageTitle.module.scss
 ┣ 📂hooks
 ┣ 📂routes
 ┃ ┣ 📂FavoritesPage
 ┃ ┃ ┣ 📂Favorites
 ┃ ┃ ┃ ┣ 📂FavoriteItem
 ┃ ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┃ ┣ 📜favorites.module.scss
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂SearchPage
 ┃ ┃ ┣ 📂SearchBar
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜searchBar.module.scss
 ┃ ┃ ┣ 📂SearchResults
 ┃ ┃ ┃ ┣ 📂MovieItem
 ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┗ 📜movieItem.module.scss
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜searchResults.module.scss
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📜index.tsx
 ┃ ┗ 📜routes.module.scss
 ┣ 📂services
 ┃ ┗ 📜movie.ts
 ┣ 📂store
 ┃ ┣ 📜atoms.ts
 ┃ ┗ 📜selectors.ts
 ┣ 📂styles
 ┃ ┣ 📂base
 ┃ ┃ ┣ 📜_fonts.scss
 ┃ ┃ ┣ 📜_more.scss
 ┃ ┃ ┗ 📜_reset.scss
 ┃ ┣ 📂constants
 ┃ ┃ ┣ 📜_breakpoints.scss
 ┃ ┃ ┣ 📜_colors.scss
 ┃ ┃ ┣ 📜_levels.scss
 ┃ ┃ ┣ 📜_positions.scss
 ┃ ┃ ┗ 📜_sizes.scss
 ┃ ┣ 📂mixins
 ┃ ┃ ┗ 📜_text.scss
 ┃ ┣ 📜index.js
 ┃ ┗ 📜index.scss
 ┣ 📂types
 ┃ ┗ 📜movie.ts
 ┣ 📜index.tsx
 ┣ 📜react-app-env.d.ts
 ┗ 📜reportWebVitals.ts
```


## 기능

### 기본 화면

![page](https://user-images.githubusercontent.com/47808461/168449601-8ca0fab3-903d-4511-8d64-1d619ce8953b.gif)

### 검색

![search](https://user-images.githubusercontent.com/47808461/168449610-0e325cd6-3a6c-4248-bfba-9d2955bc1117.gif)

### 스크롤

![scroll](https://user-images.githubusercontent.com/47808461/168449615-f38fad0f-cd13-4e24-8c2d-6cac7b853912.gif)

### 즐겨찾기 추가/제거 - Search 탭

![tofavorite](https://user-images.githubusercontent.com/47808461/168449629-52a063b7-6bda-4ce7-a9b7-41ad7070f5c8.gif)

### 즐겨찾기 제거 - Favorites 탭

![delete](https://user-images.githubusercontent.com/47808461/168449661-b0066ea8-c194-4b46-81b8-15c34a6d6d61.gif)

### 드래그 앤 드롭

![dnd](https://user-images.githubusercontent.com/47808461/168449762-f4480f23-de0e-4edc-abb1-0b608ea29ecc.gif)

### 별점

![rate](https://user-images.githubusercontent.com/47808461/168449774-94145c3f-bab8-48ba-a82a-11e70426969b.gif)

## Checklist

- [x] 두 개의 탭(검색, 즐겨찾기)
- [x] 검색창과 검색결과

- [x] 앱은 하단 탭바를 가지며 총 두개의 하단 탭으로 구성됩니다.
- [x] 첫번째 탭은 검색, 두번째 탭은 즐겨찾기 입니다.
- [x] 검색 탭은 상단에 검색 입력/검색 버튼 그리고 아래 부분은 검색 결과 화면이 노출됩니다.
- [x] 처음 검색 결과 영역은 "검색 결과가 없습니다."로 노출됩니다.
- [x] 검색어 입력박스 아래로 검색 결과가 노출됩니다.
- [x] 한 줄에 하나의 영화를 노출하는 리스트 형 목록입니다. 스크롤 중이더라도 검색어 입력 박스는 함께 스크롤되지 않고 고정되어있습니다.
- [x] 각 영화 아이템은 왼쪽에 영화 포스터 이미지, 오른쪽에 영화 제목, 연도, 타입이 표시됩니다.
- [x] 검색결과 목록을 최하단으로 내렸을 때 API를 이용하여 다음페이지를 불러와 노출해야 합니다.
- [x] 검색결과가 없는 경우 "검색 결과가 없습니다."로 노출됩니다.
- [x] 검색 결과 중 영화 클릭하면 선택 창이 뜨며 "즐겨찾기" or "취소" 를 선택 가능합니다.
- [x] "즐겨찾기"를 선택 시 해당 영화정보를 즐겨찾기 탭에서 조회할 수 있습니다.
- [x] "즐겨찾기"된 데이터는 로컬에 저장하여, 다음에 접속 했을 때, 즐겨찾기 조회가 되어야 합니다.
- [x] 이미 즐겨찾기 한 영화를 선택한 경우 "즐겨찾기" 대신 "즐겨찾기 제거"를 노출합니다.
- [x] 즐겨찾기 된 영화는 검색 목록에서 알아볼 수 있도록 아이콘 혹은 텍스트등을 노출해줍니다.
- [x] "내 즐겨찾기"라는 Title이 노출됩니다.
- [x] 현재까지 즐겨찾기한 영화들의 목록이 노출됩니다. 디자인은 검색결과 탭과 동일합니다.
- [x] 영화를 클릭 시 선택 창이 뜨며 "즐겨찾기 제거" or "취소"를 선택 가능합니다.
- [x] "즐겨찾기 해제"를 누르는 순간 해당 영화는 목록에서 즉시 제거됩니다.
- [x] 즐겨찾기 탭은 별도의 페이징 없이 한 번에 모든 데이터를 로딩합니다.

### 추가 사항

- [x] 즐겨찾기한 영화들의 순서를 드래그&드롭으로 조절 가능합니다.


### 그 외

- [x] 즐겨찾기 탭에서 별점 부여(localStorage와 연동)
- [x] 데이터 요청 시 로딩 컴포넌트 렌더링

### 이후 보완점

- [ ] Next.js를 이용한 SSR
- [ ] Firebase와 연동하여 회원가입, 로그인 및 회원 기능(댓글, 메모, 즐겨찾기 랭킹 등) 추가
- [ ] 더 엄밀한 반응형 디자인
- [ ] 무한 스크롤 UI 리팩토링 (SWR or react-query)
- [ ] 로딩 관련 관심사 분리 (완전히 React.Suspense로 일임)
- [ ] Optimistic UI 적용 (별점 매기기, 즐겨찾기 추가/제거 등)


## Design Reference

[그립 웹 사이트](https://www.grip.show/)

## Tech & Liabraries

- axios
- classnames
- eslint
- typescript
- react v18
- react-beautiful-dnd
  - Drag & Drop feature
- react-intersection-observer
  - Infinite scroll feature
- react-router-dom
- react-use
- recoil
- recoil-persist
  - localStorage
- scss
- sweetalert2
  - modal
