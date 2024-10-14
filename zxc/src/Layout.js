import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom'; // useNavigate 추가
import styled from 'styled-components';
import { RiLockPasswordLine } from 'react-icons/ri';
import { RiCustomerService2Line } from 'react-icons/ri';
import { MdOutlineContactPage } from "react-icons/md";
import { FaSearch } from 'react-icons/fa';
import Footer from './foot/Footer';

// 색상 변수
const basicColor = '#e71a0f'; // CGV 레드
const textColor = '#333'; // 기본 텍스트 색상

// 전체 레이아웃 스타일
const LayoutHead = styled.div`
  display: flex;
  align-item: center;
  justify-content: center;
`;

const Head = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  width: 600px;
  border: 0.2px solid #ebebeb;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 10px 20px;
  margin: 0 auto;
  width: 90%;
`;

const Logo = styled.h1`
  font-size: 30px;
  font-weight: bold;

  a {
    text-decoration: none;
    color: ${basicColor};

    &:hover {
      color: #cc1710;
    }
  }
`;

const Info = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;

  li {
    margin-left: 15px;
    display: flex;
    align-items: center;

    a {
      text-decoration: none;
      display: flex;
      align-items: center;
      flex-direction: column;
      color: ${textColor};
      margin-right: 5px;

      span {
        font-size: 12px;
        color: ${textColor};
        margin-top: 5px;
      }

      &:hover {
        span {
          color: ${basicColor};
        }
      }
    }
  }
`;

const Menu = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.3px solid #ebebeb;
  border-bottom: 2px solid ${basicColor};
  width: 100%;
  list-style: none;
  text-decoration: none;

  .menucontent {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
  }

  .category {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input {
    margin-right: 10px;
  }

  .search {
    line-height: 10px;
  }

  li {
    margin: 8px 12px;
    font-weight: bold;
    font-size: 12px;
    color: #222;
    line-height: 1.5em;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  &:hover {
    li {
      color: ${basicColor};
    }
  }
`;

const Layout = ({ isLoggedIn }) => {
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 사용

  // 검색 핸들러 함수
  const handleSearch = (e) => {
    e.preventDefault(); // 기본 동작 방지
    if (searchTerm.trim() !== '') {
      navigate(`/search?q=${searchTerm}`); // 검색 페이지로 이동하면서 검색어 전달
    }
  };

  // 마이페이지 클릭 핸들러
  const handleMyPageClick = () => {
    if (!isLoggedIn) {
      alert("로그인 이후에 이용이 가능합니다.");
      navigate('/login'); // 로그인 페이지로 이동
    }
    // 로그인이 되어 있을 때는 별도 동작이 없거나, 다른 처리 가능
  };

  return (
    <LayoutHead>
      <Head>
        <HeaderContent>
          <Logo>
            <Link to="/">CGB</Link>
          </Logo>
          <Info>
            <li>
              <Link to="/login">
                <RiLockPasswordLine size="28px" />
                <span>로그인</span>
              </Link>
            </li>
            <li>
            <Link to="/login" onClick={handleMyPageClick}>
                <MdOutlineContactPage size="28px" />
                <span>마이 페이지</span>
              </Link>
            </li>
            <li>
              <Link to="/service">
                <RiCustomerService2Line size="28px" />
                <span>고객센터</span>
              </Link>
            </li>
          </Info>
        </HeaderContent>
        <Menu>
          <div className="menucontent">
            <div className="category">
              <NavLink to="/movie">
                <li>개봉작</li>
              </NavLink>
              <NavLink to="/newmovie">
                <li>상영 예정</li>
              </NavLink>
              <NavLink to="/bookmark">
                <li>즐겨찾기</li>
              </NavLink>
              <NavLink to="/movie">
                <li>영화 순위</li>
              </NavLink>
            </div>
            <div>
              <form onSubmit={handleSearch}>
                <input
                  placeholder="검색"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} // 검색어 입력
                />
                <button type="submit">
                  <FaSearch size="16px" className="search" />
                </button>
              </form>
            </div>
          </div>
        </Menu>
        <main>
          <Outlet />
        </main>
        <Footer />
      </Head>
    </LayoutHead>
  );
};

export default Layout;
