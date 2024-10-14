import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const MovieImage = styled.img`
  width: 100%;
  height: auto;
`;

const MovieDetail = () => {
  const { movieCd } = useParams();
  const [movieDetail, setMovieDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [posterPath, setPosterPath] = useState(null); // 포스터 경로 상태 추가
  const [movieOverview, setMvoieOverview] = useState('');

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const apiKeyKOBIS = '303756f624abaa433a616a1f01bf62c2';
        const response = await axios.get(
          `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${apiKeyKOBIS}&movieCd=${movieCd}`
        );
        console.log(response.data); // API 응답 데이터 확인
        const movieInfo = response.data.movieInfoResult.movieInfo;
        setMovieDetail(movieInfo);

        // TMDB API를 통해 포스터 정보 가져오기
        const apiKeyTMDB = 'c46c5e36b91e0c3b8e75ebe785d68935'; // TMDB API 키
        const tmdbResponse = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKeyTMDB}&query=${encodeURIComponent(
            movieInfo.movieNm
          )}&language=ko`
        );
        console.log('TMDB API 응답:', tmdbResponse.data); // 확인
        if (tmdbResponse.data.results.length > 0) {
          const tmdbMovie = tmdbResponse.data.results[0];

          setMvoieOverview(tmdbMovie.overview);
          setPosterPath(tmdbResponse.data.results[0].poster_path);
        }

        setLoading(false);
      } catch (error) {
        console.error('API 호출 중 에러 발생 : ', error);
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [movieCd]);

  if (loading) {
    return <div>로딩 중입니다 ...</div>;
  }

  if (!movieDetail || Object.keys(movieDetail).length === 0) {
    return <div>영화 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      {posterPath ? (
        <MovieImage
          src={`https://image.tmdb.org/t/p/w500${posterPath}`} // TMDB에서 가져온 포스터 이미지 URL
          alt={movieDetail.movieNm}
        />
      ) : (
        <p>포스터 없음</p>
      )}
      <h1>{movieDetail.movieNm}</h1>
      <p>
        감독 :{' '}
        {movieDetail.directors &&
          movieDetail.directors.map((director) => director.peopleNm).join(', ')}
      </p>
      <p>
        출연 배우 :{' '}
        {movieDetail.actors &&
          movieDetail.actors.map((actor) => actor.peopleNm).join(', ')}
      </p>
      <p>
        장르 :{' '}
        {movieDetail.genres &&
          movieDetail.genres.map((genre) => genre.genreNm).join(', ')}
      </p>
      <p>개봉일 : {movieDetail.openDt}</p>

      <p>
        <strong>영화 설명 : </strong> {movieOverview || '영화 설명 없음'}
      </p>
    </div>
  );
};

export default MovieDetail;
