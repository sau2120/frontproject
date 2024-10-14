import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ServiceHead = styled.div`
  display: felx;
  align-item: center;
  justify-content: center;
  width: 580px;
`;

const Container = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
`;
const Containerin1 = styled.div`
  max-width: 580px;
  margin: 20px auto;
  padding: 20px;
<<<<<<< HEAD
  border: 1px solid black;
=======
  border: 1px solid #dd;
>>>>>>> 49286aec61ca3eee64acfa4c9bf935face83c640
  background-color: white;
  box-size: border-box;
`;

const Container2 = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin: 10px 0;
  font-weight: bold;
`;
const Label2 = styled.label`
  display: block;
  margin: 10px 0;
  font-weight: bold;
`;

const Input = styled.input`
  width: 515px;
  padding: 10px;
  margin: 5px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #22b8cf;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #3bc9db;
  }
`;
const InquiryListContainer = styled.div`
  margin-top: 30px;
  padding-top: 20px;
  border-bottom: 2px solid #ddd;
`;

const InquiryList = styled.ul`
  list-style: none;
  padding: 0;
`;

const InquiryItem = styled.li`
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  display: flex; /* Flexbox를 사용하여 요소 정렬 */
  justify-content: space-between; /* 요소 사이의 간격 조절 */
  align-items: center; /* 세로 중앙 정렬 */
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const RemoveButton = styled.button`
  padding: 5px;
  background-color: transparent; /* 배경을 투명으로 */
  border: none; /* 테두리 제거 */
  cursor: pointer; /* 커서 변경 */
  color: #ff6b6b; /* 텍스트 색상 */
  display: flex; /* Flexbox를 사용하여 아이콘 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
`;

const DateLabel = styled.p`
  margin: 0; /* 마진 제거 */
  font-size: 12px; /* 폰트 크기 조정 */
  color: #666; /* 텍스트 색상 조정 */
`;

function CustomerService() {
  const [inquiries, setInquiries] = useState([]);
  const [inquiry, setInquiry] = useState('');

  const handleChange = (e) => {
    setInquiry(e.target.value);
  };

  const saveInquiry = () => {
    if (inquiry === '') {
      alert('문의 내용을 입력해주세요.');
      return;
    }
    const newInquiry = {
      text: inquiry,
      date: new Date().toLocaleDateString(),
      id: inquiries.length + 1,
    };
    setInquiries([...inquiries, newInquiry]);
    setInquiry('');
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveInquiry();
    }
  };

  const removeInquiry = (id) => {
    setInquiries(inquiries.filter((inquiry) => inquiry.id !== id));
  };

  return (
    <ServiceHead>
      <Container>
        <Title>고객센터</Title>
        <div>
          <div>
            <Label2>자주 묻는 질문 BEST5</Label2>
            <Containerin1>
              <p>
                1.예매,모바일오더 결제 시 할인쿠폰 자동 적용 버튼은 무엇인가요?
              </p>
              <p>2.예매할 수 있는 횟수나 매수등의 제한이 있나요?</p>
              <p>3.영화 예매 시 포인트 선택이 되지않아요</p>
              <p>4.인터넷 예매시 부분환불/교환이 가능한가요?</p>
              <p>5.ARS 이용안내</p>
            </Containerin1>
          </div>
          <Label>문의 내용</Label>
          <Input
            type="text"
            value={inquiry}
            onChange={handleChange}
            placeholder="문의 내용을 입력하세요"
            onKeyDown={handleKeyDown}
          />
        </div>
        <ButtonContainer>
          <Button onClick={saveInquiry}>글쓰기</Button>
        </ButtonContainer>
      </Container>
      <Container2>
        <InquiryListContainer>
          <Label2>문의 목록</Label2>
          <InquiryList>
            {inquiries.map((inquiry) => (
              <InquiryItem key={inquiry.id}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox type="checkbox" />
                    <span>
                      {inquiry.id}. {inquiry.text}
                    </span>
                  </div>
                  <DateLabel>작성일: {inquiry.date}</DateLabel>
                </div>
                <RemoveButton onClick={() => removeInquiry(inquiry.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </RemoveButton>
              </InquiryItem>
            ))}
          </InquiryList>
        </InquiryListContainer>
      </Container2>
    </ServiceHead>
  );
}

export default CustomerService;
