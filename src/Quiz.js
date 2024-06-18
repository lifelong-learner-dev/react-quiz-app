import React, {useState} from 'react';

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
];

const Quiz = ()=> {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setscore] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const [feedback, setFeedback] = useState("");
    const [showScore, setShowScore] = useState(false);

    const handleOptionChange = (e)=> {
        setSelectedOption(e.target.value);
    };

    const handleSubmit = ()=> {
        if (selectedOption === questions[currentQuestion].answer){
            setscore(score + 1);
            setFeedback("Correct!");
        } else {
            setFeedback("Incorrect!");
        }
        
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