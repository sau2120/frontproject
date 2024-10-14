import React from 'react';
import styled from 'styled-components';
import { useFavorites } from './FavoritesContext';
import { FaStar } from 'react-icons/fa';

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

// 영화 목록 스타일
const MovieContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
  gap: 30px 10px;
`;

// 영화 아이템 스타일
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

//즐겨찾기, 예매하기 버튼
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

// 즐겨찾기 빈 상태 문구 스타일
const EmptyMessage = styled.div`
  font-size: 25px;
  color: #666;
  text-align: center;
  margin-top: 200px;
  margin-bottom: 300px;
`;

const FavoriteMovies = () => {
  const { favorites, removeFavorite } = useFavorites(); // removeFavorite 가져오기

  const handleRemoveClick = (movie) => {
    removeFavorite(movie); // 즐겨찾기에서 영화 삭제
  };

  return (
    <>
      <Header>
        <TextContent>즐겨찾기 영화</TextContent>
      </Header>
      <div>
        {favorites.length === 0 ? (
          <EmptyMessage>즐겨찾기한 영화가 없어요.</EmptyMessage>
        ) : (
          <div>
            <MovieContainer>
              {favorites.map((movie) => (
                <MovieItem key={movie.id}>
                  <MovieTitle>
                    {movie.poster_path ? (
                      <MovieImage
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // TMDB에서 가져온 포스터 이미지 URL
                        alt={movie.movieNm}
                      />
                    ) : (
                      <MovieNoim>포스터 없음</MovieNoim>
                    )}
                    <h3>{movie.movieNm}</h3>
                  </MovieTitle>
                  <MovieInfo>
                    <p>개봉일: {movie.openDt}</p>
                    <p>관객수: {movie.audiCnt}</p>
                  </MovieInfo>
                  <ButtonGroup>
                    <IconButton onClick={() => handleRemoveClick(movie)}>
                      <FaStar /> 즐겨찾기
                    </IconButton>
                    <Button>예매하기</Button>
                  </ButtonGroup>
                </MovieItem>
              ))}
            </MovieContainer>
          </div>
        )}
      </div>
    </>
  );
};

export default FavoriteMovies;
