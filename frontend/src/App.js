import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
//useState, useEffect를 사용하기 위해 react라이브러리에서 가져옵니다
import axios from 'axios'; 

function App() {

  useEffect(() => { //이곳에서 데이터베이스에 있는 값을 요청
    axios.get('/api/values') //데이터를 요청하기 위해 get Request 보내는 곳, Node서버에서 지정해준 경로대로
      .then(response => { //백엔드(Node)가 처리 후 송신한 데이터가 이곳(respose 파라미터)로 수신
        console.log(`response ${response.data}`) //어떤 값이 왔는지 콘솔로 확인
        setLists(response.data) //수신한 데이터를 이곳(setLists(38행))에 넣어줌
    })
  }, [])

  //changeHandler역할 : 56행 onChange컨트롤 = input박스에 입력을 할 때 onChangeEvent가 발생할 때 마다 value state를 변화시켜줌
  const changeHandler = (event) => {  //onChange핸들러 이벤트 발생시 다음 단계 수행
    setValue(event.currentTarget.value)
  }

  //submitHandler역할 : 값을 input 박스에 입력하고 확인 버튼을 누르면 데이터값이 DB에 저장
  const submitHandler = (event) => { //이벤트를 받아옵니다
    event.preventDefault(); //오동작 방지를 위해 기본 동작을 제거합니다
    axios.post('/api/value', //데이터 전달을 위해 백엔드에 POST request를 보냅니다
      { value: value }) //키값 : value / 데이터값 : value / 참조 : 40행 리스트의 0번 = value
      .then(response => { //백엔드에서 처리 후 회신받은 데이터를 response에 받아옴
        if (response.data.success) { //response가 성공했다면 <- server.js 42행 참고
          console.log(`response.data : ${response.data}`) //성공했을경우 결과값을 한 번 살펴봅니다
          setLists([...lists, response.data]) //38행 리스트[0] (lists)에 값을 넣어주기. 원래 리스트에 있던 데이터에 이어서 넣어주기 위해 ...lists(3번째)로 작성
          setValue(""); //데이터 입력 후 input 박스 내용은 삭제
        } else { //response가 실패했다면
          alert("DB에 데이터 넣기 실패")
      }
    })
  }

  const [lists, setLists] = useState([]) //기본state는 빈 배열
 // 데이터베이스에 저장된 값을 가져와서 화면에 보여주기전 이 State에 넣어둡니다
  const [value, setValue] = useState("") //기본state에 빈 스트링
  //Input박스에 입력한 값이 이 state에 들어갑니다

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <div className="container">
          {lists && lists.map((list, index) => ( //38행의 lists
            <li key={index}>{list.value}</li> //map메소드 사용시 key값 명시 필수
          ))}
          <form className="example" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="type something here"
              onChange={changeHandler}
              value={value} //40행과 매핑
            />
            <button type="submit">GO</button>
          </form>
        </div>        

      </header>
    </div>
  );
}

export default App;
