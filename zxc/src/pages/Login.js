import React, { Component } from 'react';
import styled from 'styled-components';

const Body = styled.div`
  margin: 30px 0;
  padding: 0;
  font-family: 'D2 Coding';
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
`;

const LoginBox = styled.div`
  // position: relative;
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 350px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 36px;
  color: #333;
`;

const SubTitle = styled.h2`
  margin-bottom: 10px;
  font-size: 12px;
  color: #333;
`;

const Text = styled.h3`
  margin-top: 20px;
  margin-bottom: 15px;
  font-size: 15px;
  cursor: pointer;
  color: #333;
`;

const LoginForm = styled.form`
  input {
    // position: relative;
    width: 80%;
    padding: 10px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 14px;

    &:focus {
      border-color: #4caf50;
      outline: none;
    }
  }

  button {
    width: 80%;
    margin-top: 15px;
    padding: 10px;
    background-color: #4caf50;
    border: none;
    color: white;
    font-size: 18px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #45a049;
    }
  }
`;

class Login extends Component {
  state = {
    message: '',
    isLoggedIn: false,
    kakaoLoded: false,
    userName: '',
  };

  componentDidMount() {
    const kakaoScript = document.createElement('script');
    kakaoScript.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
    kakaoScript.async = true;
    kakaoScript.onload = this.initializeKakao;
    document.body.appendChild(kakaoScript);
  }

  initializeKakao = () => {
    console.log(window.Kakao);
    if (window.Kakao) {
      window.Kakao.init('271a507c1a544e7c20791c0dbef7824a');
      this.setState({ kakaoLoded: true });
      console.log('KAKAO 초기화됨');
    } else {
      alert('Kakao SDK가 로드되지 않았습니다.');
    }
  };

  handleKakaoLogin = () => {
    if (!this.state.kakaoLoded) {
      alert('카카오 sdk가 로드되지 않았습니다.');
      return;
    }
    if (window.Kakao.Auth) {
      window.Kakao.Auth.login({
        success: (authObj) => {
          console.log(authObj);
          if (window.Kakao.API) {
            window.Kakao.API.request({
              url: '/v2/user/me',
              success: (res) => {
                console.log(res);
                const userName = res.kakao_account.profile.nickname;
                alert(`카카오 로그인 성공! ${userName}님 환영합니다.`);
                this.setState({ isLoggedIn: true, userName });
                // window.location.href = 'http://localhost:3000/movieList';
              },
              fail: (err) => {
                console.error(err);
                alert('사용자 정보 요청 실패');
              },
            });
          } else {
            alert('KAKAO API가 정의되지 않앗습니다.');
          }
        },
        fail: (err) => {
          console.error(err);
          alert('카카오 로그인 실패');
        },
      });
    } else {
      alert('KAKAO.AUTH가 정의되지 않았습니다.');
    }
  };

  hanldleKakaoLogout = () => {
    if (window.Kakao.Auth) {
      window.Kakao.Auth.logout(() => {
        alert('로그아웃됐습니다.');
        this.setState({ isLoggedIn: false, userName: '' });
      });
    }
  };

  render() {
    const { isLoggedIn, userName } = this.state;
    console.log(userName);
    return (
      <Body>
        <LoginBox>
          <Title>CGB</Title>
          <SubTitle>
            {isLoggedIn ? `${userName}님 환영합니다.` : '로그인 해주세요'}
            {/* 아이디 비밀번호를 입력하신 후, 로그인 버튼을 클릭해 주세요. */}
          </SubTitle>
          <LoginForm className="login-form">
            {!isLoggedIn ? (
              <>
                <input type="text" name="message" placeholder="아이디" />
                <br />
                <input type="password" name="message" placeholder="비밀번호" />
                <br />
                <button type="submit">로그인</button>
                <Text>ID/PW 찾기 | 회원가입 | 비회원 예매확인</Text>
                <button type="button" onClick={this.handleKakaoLogin}>
                  카카오 로그인
                </button>
              </>
            ) : (
              <>
                <Text>{`${userName}님 , 로그인 중입니다.`}</Text>
                <button type="button" onClick={this.hanldleKakaoLogout}>
                  로그아웃
                </button>
              </>
            )}
          </LoginForm>
        </LoginBox>
      </Body>
    );
  }
}

export default Login;
