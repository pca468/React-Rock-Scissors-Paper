import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Box from "../component/Box";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./GamePage.css";

// 다음에와서 해야할 것
// 1. 5판 3선승 code 생성 후 승리 시 user OR computer  승리하셨습니다 문구 만들기

const choice = {
  rock: {
    name: "Rock",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJkbY9OzMHSZB82QuLpwfO2zHQXgN8kfizfw&s",
  },
  scissors: {
    name: "Scissors",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZyR1f4cmbq6F0qS_xKVABuyBo-gI79sDaXw&s",
  },
  paper: {
    name: "Paper",
    img: "https://blog.kakaocdn.net/dn/bmjB2s/btqXHhp6kpG/TH14W4U612SxKo9uuR2sB0/img.png",
  },
};

const GamePage = (props) => {
  const [userSelect, setUserSelect] = useState(choice.rock); // img에서 null값을 넣는다면 에러가 발생 빈칸으로 넣어준다
  // 혹은 null을 작성하고 img 값에 가드 값을 넣어준다 ex) props.item && props.item.img
  const [computerSelect, setComputerSelect] = useState(choice.rock);
  // 컴퓨터가 랜덤하게 값을 선택하는 것은 유저가 아이템을 선택 시에 나오게 해야한다. 즉, play 함수에서 진행
  const [result, setResult] = useState("");
  // user 와 computer가 가위바위보를 냈을 때 결과가 바로 출력되야 하기 때문에 똑같이 play에 작성
  const [computerResult, setComputerResult] = useState("");

  const [isShaking, setIsShaking] = useState(false); // isShaking useState 호출 초기값 false
  // user가 choice하면 true값으로 설정

  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [winner, setWinner] = useState("");

  useEffect(() => {
    // 처음 rendering 될 때 항상 Rock로 설정
    setUserSelect(choice.rock);
    setComputerSelect(choice.rock);
  }, []);

  const play = (userChoice) => {
    // ui 값이 변경되게 하려면 set함수를 써야 한다.
    setUserSelect(choice.rock);
    let computerChoice = randomChoice(); // randomChoice() 함수 생성
    setComputerSelect(choice.rock);
    setIsShaking(true);

    setTimeout(() => {
      setIsShaking(false);
      setUserSelect(choice[userChoice]);
      setComputerSelect(computerChoice);
      const result = judgement(choice[userChoice], computerChoice);
      const computerResult = computerJudgement(
        choice[userChoice],
        computerChoice
      );
      setResult(result); // 유저와 컴퓨터 둘다 승패를 판단해야 함으로 두 가지 값을 전달
      setComputerResult(computerResult);
      if (result === "win") {
        setUserScore(userScore + 1);
        if (userScore + 1 === 3) {
          setWinner("User");
          setModalVisible(true);
        }
      } else if (result === "lose") {
        setComputerScore(computerScore + 1);
        if (computerScore + 1 === 3) {
          setWinner("Computer");
          setModalVisible(true);
        }
      }
    }, 1000);
  };

  const randomChoice = () => {
    // Math.random 생성
    let itemArray = Object.keys(choice); // chice 배열화

    let randomItem = Math.floor(Math.random() * itemArray.length); // Math.floor 을 통해 소수점 버리기 + itemArray.length 을 통해 길이 내에서 인덱스 번호 출력
    let final = itemArray[randomItem]; // itemArray에 randomItem을 넣으면 해당 배열 출력 즉, 숫자가 아님 이름으로 반환
    return choice[final];
  };

  const judgement = (user, computer) => {
    // 위 두 가지 값을 받을 수 있는 매개변수 2개 입력
    if (user.name == computer.name) {
      // if 및 else if 반복해서 쓰지 않고 삼항 연산식으로 간략하게 써주기
      return "tie";
    } else if (user.name === "Rock")
      return computer.name === "Scissors" ? "win" : "lose";
    else if (user.name === "Scissors")
      return computer.name === "Paper" ? "win" : "lose";
    else if (user.name === "Paper")
      return computer.name === "Rock" ? "win" : "lose";
  };

  const computerJudgement = (user, computer) => {
    if (computer.name == user.name) {
      return "tie";
    } else if (computer.name === "Rock")
      return user.name === "Scissors" ? "win" : "lose";
    else if (computer.name === "Scissors")
      return user.name === "Paper" ? "win" : "lose";
    else if (computer.name == "Paper")
      return user.name === "Rock" ? "win" : "lose";
  };

  const resetGame = () => {
    // 게임이 다시 시작되면 이전 기록 리셋 함수
    setUserScore(0);
    setComputerScore(0);
    setModalVisible(false);
    setWinner("");
    setUserSelect(choice.rock);
    setComputerSelect(choice.rock);
    setResult("");
    setComputerResult("");
  };

  return (
    // item에 userSelect 정보가 object 형태로 저장
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15rem",
          margin: "20px",
          fontSize: "24px",
        }}
      >
        <div className="fontStyle">User: {userScore}</div>
        <div className="fontStyle">Computer: {computerScore}</div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}
      >
        <Box title="You" item={userSelect} result={result} shake={isShaking} />
        <Box
          title="Computer"
          item={computerSelect}
          result2={computerResult}
          shake={isShaking}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1rem",
          gap: "1rem",
        }}
      >
        <button onClick={() => play("scissors")} className="buttonStyle">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZyR1f4cmbq6F0qS_xKVABuyBo-gI79sDaXw&s"
            style={{ width: 30, height: 30 }}
            className="buttonChoice"
          />
        </button>
        <button onClick={() => play("rock")} className="buttonStyle">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJkbY9OzMHSZB82QuLpwfO2zHQXgN8kfizfw&s"
            style={{ width: 30, height: 30 }}
            className="buttonChoice"
          />
        </button>
        <button onClick={() => play("paper")} className="buttonStyle">
          <img
            src="https://blog.kakaocdn.net/dn/bmjB2s/btqXHhp6kpG/TH14W4U612SxKo9uuR2sB0/img.png"
            style={{ width: 30, height: 30 }}
            className="buttonChoice"
          />
        </button>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <Link to={"/"} style={{ alignItems: "center" }}>
          <button
            style={{
              backgroundColor: "#4CAF50",
              border: "none",
              color: "white",
              padding: "15px 32px",
              textAlign: "center",
              textDecoration: "none",
              display: "inline-block",
              fontSize: "16px",
              margin: "4px 2px",
              transitionDuration: "0.4s",
              cursor: "pointer",
              borderRadius: "12px",
              boxShadow: "0 5px #98FB98",
            }}
          >
            처음으로 가기
          </button>
        </Link>
      </div>

      <Popup open={modalVisible}>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "5px",
              textAlign: "center",
            }}
          >
            <h2 style={{padding: "2rem", margin:"1rem"}}>{winner}가 <br/>
               승리하였습니다!</h2>
            <button
              onClick={resetGame}
              onClose={() => setModalVisible(false)}
              style={{
                backgroundColor: "#4CAF50",
                border: "none",
                color: "white",
                padding: "15px 32px",
                textAlign: "center",
                textDecoration: "none",
                display: "inline-block",
                fontSize: "16px",
                margin: "4px 2px",
                transitionDuration: "0.4s",
                cursor: "pointer",
                borderRadius: "12px",
                boxShadow: "0 5px #98FB98",
              }}
            >
              다시 시작하기
            </button>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default GamePage;
