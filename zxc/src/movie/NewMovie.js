import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Header = styled.div`
  display: flex;
  align-item: center;
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

const MovieListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
  gap: 30px 10px;
`;

const MovieItem = styled.div`
  width: 40%;
  margin: 10px;
  text-align: left;
  padding: 10px;
  background-color: white;
`;

//영화 포스터 이미지가 없을 때
const MovieNoim = styled.div`
  width: 100%;
  height: 330px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  color: #fofofo;
  font-size: 20px;
`;

const MovieImage = styled.img`
  width: 100%;
  height: 330px;
  object-fit: cover;
  border-radius: 5px;
`;

//영화 제목 꾸미기
const MovieTitle = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #333;
`;

//개봉일, 관객수 꾸미기
const MovieInfo = styled.div`
  margin-top: 10px;
  font-size: 14px;
  line-height: 10px;
  color: #333;
`;

//즐겨찾기, 예매하기 버튼 그룹
const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;
  align-items: center;
`;

//즐겨찾기 버튼
const IconButton = styled.button`
  background-color: white;
  color: #bf3131;
  border: solid 1px;
  border-color: #bf3131;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 5px;

  &:hover {
    color: white;
    background-color: #bf3131;
  }
`;

//예매하기 버튼
const Button = styled.button`
  background-color: white;
  color: #bf3131;
  border: solid 1px;
  border-color: #bf3131;
  padding: 8px 35px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 5px;

  &:hover {
    color: white;
    background-color: #bf3131;
  }
`;

const NewMovie = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY_TMDB = 'c46c5e36b91e0c3b8e75ebe785d68935'; // TMDB API 키
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMovies = async () => {
      let allMovies = [];
      let page = 1;
      let totalPages = 1;

      try {
        // 페이지를 순회하여 모든 영화 가져오기
        do {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY_TMDB}&language=ko-KR&page=${page}`
          );

          const movieList = response.data.results; // 영화 데이터
          allMovies = [...allMovies, ...movieList]; // 모든 영화 리스트에 추가
          totalPages = response.data.total_pages; // 총 페이지 수
          page++;
        } while (page <= totalPages);

        // 오늘 날짜 구하기
        const today = new Date();
        const todayString = today.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 변환

        // 영화 데이터를 필터링하여 오늘 이후 개봉 예정 영화만 남기기
        const upcomingMovies = allMovies.filter(
          (movie) => movie.release_date > todayString
        );

        // 영화 데이터를 포스터 URL과 함께 설정
        const moviesWithPosters = upcomingMovies.map((movie) => ({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
        }));

        setMovies(moviesWithPosters);
      } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.id}`); // 영화 ID를 사용하여 상세 페이지로 이동
  };

  return (
    <>
      <Header>
        <TextContent>상영 예정작</TextContent>
      </Header>
      <MovieListContainer>
        {movies.map((movie, index) => (
          <MovieItem
            key={`${movie.id}-${movie.release_date}-${index}`}
            onClick={() => handleMovieClick(movie)}
          >
            {movie.poster_path ? (
              <MovieImage
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // TMDB에서 가져온 포스터 이미지 URL
                alt={movie.title}
              />
            ) : (
              <MovieNoim>포스터 없음</MovieNoim>
            )}
            <MovieTitle>
              <h3>{movie.title}</h3> {/* 영화 제목 표시 */}
            </MovieTitle>
            <MovieInfo>
              <p>개봉일: {movie.release_date}</p>
            </MovieInfo>
            <ButtonGroup>
              <IconButton>
                <FaStar /> 즐겨찾기
              </IconButton>
              <Button>예매하기</Button>
            </ButtonGroup>
          </MovieItem>
        ))}
      </MovieListContainer>
    </>
  );
};

export default React.memo(NewMovie);
