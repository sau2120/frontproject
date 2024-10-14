import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useFavorites } from '../pages/FavoritesContext';

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  margin: 0 10px;
  width: 580px;
  border-bottom: 0.2px solid #adb5bd;
`;

const TextContent = styled.h2`
  font-weight: bold;
  font-size: 36px;
  margin-left: 20px;
`;

const ButtonHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-top: 30px;
`;

const ButtonIcon = styled.button`
  margin: 0;
  width: 100px;
  height: 50px;
  border: 0;
  background-color: transparent;
`;

const ButtonLink = styled(Link)`
  text-decoration: none;
  color: black;

  &:hover {
    color: #e71a0f;
  }
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`;

const MovieItem = styled.div`
  width: 40%;
  margin: 10px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  background-color: #f9f9f9;
`;

const MovieImage = styled.img`
  width: 100%;
  height: auto;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  justify-content: left;
  align-items: center;
`;

const IconButton = styled.button`
  background-color: white;
  color: #bf3131;
  border: solid 1px;
  border-color: #bf3131;
  padding: 5px 25px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 5px;

  &:hover {
    color: white;
    background-color: #bf3131;
  }
`;

const Button = styled.button`
  background-color: white;
  color: #bf3131;
  border: solid 1px;
  border-color: #bf3131;
  padding: 5px 35px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 5px;

  &:hover {
    color: white;
    background-color: #bf3131;
  }
`;

const WeekMovie = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addFavorite, isFavorite } = useFavorites(); // favorites는 필요 없으므로 제거
  const API_KEY_KOFIC = '303756f624abaa433a616a1f01bf62c2'; // 영화진흥위원회 API 키 입력
  const API_KEY_TMDB = 'c46c5e36b91e0c3b8e75ebe785d68935'; // TMDB API 키 입력
  const date = '20241005'; // 원하는 날짜 (YYYYMMDD 형식)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=${API_KEY_KOFIC}&targetDt=${date}&weekGb=0`
        );
        const movieList = response.data.boxOfficeResult.weeklyBoxOfficeList;

        // TMDB API를 통해 각 영화의 포스터 가져오기
        const moviesWithPosters = await Promise.all(
          movieList.map(async (movie) => {
            const tmdbResponse = await axios.get(
              `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY_TMDB}&query=${encodeURIComponent(
                movie.movieNm
              )}`
            );
            const posterPath =
              tmdbResponse.data.results.length > 0
                ? tmdbResponse.data.results[0].poster_path
                : null;

            return {
              ...movie,
              poster_path: posterPath,
            };
          })
        );

        setMovies(moviesWithPosters);
        setLoading(false);
      } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [date]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleFavoriteClick = (movie) => {
    if (isFavorite(movie)) {
      // 이미 즐겨찾기에 있는 경우
      window.alert(`${movie.movieNm}은(는) 이미 즐겨찾기로 등록되어 있습니다.`);
    } else {
      // 즐겨찾기에 없는 경우 추가
      addFavorite(movie);
      window.alert(`${movie.movieNm}이(가) 즐겨찾기에 추가되었습니다.`);
    }
  };

  return (
    <>
      <Header>
        <TextContent>영화 순위</TextContent>
        <ButtonHead>
          <ButtonIcon>
            <ButtonLink to="/movie">일간 순위</ButtonLink>
          </ButtonIcon>
          <ButtonIcon>
            <ButtonLink to="/weekly">주간 순위</ButtonLink>
          </ButtonIcon>
        </ButtonHead>
      </Header>
      <MovieListContainer>
        {movies.map((movie) => (
          <MovieItem key={movie.movieCd}>
            {movie.poster_path ? (
              <>
                <MovieImage
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // TMDB에서 가져온 포스터 이미지 URL
                  alt={movie.movieNm}
                />
                <ButtonGroup>
                  <IconButton onClick={() => handleFavoriteClick(movie)}>
                    <FaStar /> 즐겨찾기
                  </IconButton>
                  <Button>예매하기</Button>
                </ButtonGroup>
              </>
            ) : (
              <p>포스터 없음</p>
            )}
            <p>
              {movie.rank}. {movie.movieNm} ({movie.openDt})
            </p>
            <p>관객수: {movie.audiCnt}</p>
          </MovieItem>
        ))}
      </MovieListContainer>
    </>
  );
};

export default React.memo(WeekMovie);
