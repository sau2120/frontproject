import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const contactmenu = [
  {
    name: 'recommendmovie',
    text: '추천영화',
  },
  {
    name: 'soonmovie',
    text: '개봉예정',
  },
  {
    name: 'moving',
    text: '상영중',
  },
  {
    name: 'qna',
    text: '문의사항',
  },
];
const CategoriesBlock = styled.div`
  display: flex;
  padding: 1rem;
  width: 768px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
  }
`;

const Category = styled(NavLink)`
  font-size: 1.125rem;
  cursor: pointer;
  white-space: pre;
  text-decoration: none;
  color: inherit;
  padding-bottom: 0.25rem;

  &:hover {
    color: #495057;
  }

  &.active {
    font-weight: 600;
    border-bottom: 2px solid #22b8cf;
    color: #22b8cf;
    &:hover {
      color: #3bc9db;
    }
  }

  & + & {
    margin-left: 1rem;
  }
`;

const ContactMenu = () => {
  return (
    <CategoriesBlock>
      {categories.map((c) => (
        //카테고리는 지금 <NavLink 을 포함하고 있음.
        //<NavLink key=sports className='active' to=`/sports>스포츠</NavLink>
        <Category
          key={c.name}
          // active={category === c.name}
          // onClick={() => onSelect(c.name)}
          className={({ isActive }) => (isActive ? 'active' : undefined)}
          to={c.name === 'all' ? '/' : `/${c.name}`}
        >
          {c.text}
        </Category>
      ))}
    </CategoriesBlock>
  );
};
// function ContactMenu() {
//   // 상태 관리: 이름, 이메일, 메시지
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [submitted, setSubmitted] = useState(false);

//   // 폼 제출 처리
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("문의사항 제출:", { name, email, message });

//     // 실제 서버로 데이터를 전송할 수 있는 로직이 들어갈 수 있음
//     // 예: fetch() 또는 axios로 POST 요청

//     setSubmitted(true);
//     setName("");
//     setEmail("");
//     setMessage("");
//   };

//   return (
//     <div className="contact-menu">
//       {submitted ? (
//         <div className="thank-you-message">
//           <h2>문의가 접수되었습니다!</h2>
//           <p>빠른 시일 내에 답변 드리겠습니다.</p>
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="name">이름:</label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="email">이메일:</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="message">메시지:</label>
//             <textarea
//               id="message"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               required
//             ></textarea>
//           </div>

//           <button type="submit">문의하기</button>
//         </form>
//       )}
//     </div>
//   );
// }

export default ContactMenu;
