import React, {useState} from 'react';

//사전 정의된 퀴즈 데이터
const questions = [
    {
        question: "What is the capital of France?",
        options:["Berlin", "London", "Paris", "Rome"],
        answer:"Paris",
    },
    {
        question: "What is 2 + 5?",
        options:["3", "5", "6", "7"],
        answer:"7",
    },
    //필요한 경우 추가 질문 추가할 수 있도록
];

const Quiz = ()=> {
    //현재 질문 인덱스를 관리하는 상태
    const [currentQuestion, setCurrentQuestion] = useState(0);
    //사용자의 점수를 관리하는 상태
    const [score, setscore] = useState(0);
    //사용자가 선택한 옵션을 관리하는 상태
    const [selectedOption, setSelectedOption] = useState("");
    //피드백 메시지를 관리하는 상태
    const [feedback, setFeedback] = useState("");
    //퀴즈 완료 여부를 관리하는 상태
    const [showScore, setShowScore] = useState(false);

    //라디오 버튼의 값이 변경될 때 호출되는 함수
    const handleOptionChange = (e)=> {
        setSelectedOption(e.target.value);
    };

    //"Submit" 버튼을 클릭할 때 호출되는 함수
    const handleSubmit = ()=> {
        //1. 정답 여부 확인 및 점수 업데이트
        if (selectedOption === questions[currentQuestion].answer){
            setscore(score + 1);
            setFeedback("Correct!");
        } else {
            setFeedback("Incorrect!");
        }
        
        //2. 다음 질문으로 이동하거나 퀴즈 완료 상태로 전환
        const nextQuestion = currentQuestion+1;
        if(nextQuestion < questions.length) {
            setTimeout(()=>{
                setCurrentQuestion(nextQuestion);
                setSelectedOption("");
                setFeedback("");
            }, 1000);
        } else {
            setTimeout(()=> setShowScore(true), 1000);
        }
    };
    return (
        <div>
            {showScore ? (
                <div>
                    Quiz Complete! You scored {score} out of {questions.length}!
                </div>
            ):(
                <div>
                    <h2>{questions[currentQuestion].question}</h2>
                    {questions[currentQuestion].options.map((option)=> (
                        <div key={option}>
                            <label>
                                <input
                                 type="radio"
                                 value={option}
                                 checked={selectedOption===option}
                                 onChange={handleOptionChange}
                                />
                                {option}
                            </label>
                        </div>
                    ))}
                    <button onClick={handleSubmit}>Submit</button>
                    {feedback && <div>{feedback}</div>}
                </div>
            )}
        </div>
    );
};

export default Quiz;