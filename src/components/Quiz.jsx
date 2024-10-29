import { useState,useCallback } from "react";
import QUESTIONS from '../questions.js';
import completeGame from '../assets/quiz-complete.png';
import QuestionTimer from "./QuestionTimer.jsx";


export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

   const handleSelectAnswer= useCallback( function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });
    },[]);

    const handleSkipAnswer = useCallback( () => handleSelectAnswer(null),[handleSelectAnswer]);
    const activeQuestionIndex = userAnswers.length;
    const quizIsCompleted = activeQuestionIndex === QUESTIONS.length;

    if (quizIsCompleted) {
        return (
            <div id="summary">
                <img src={completeGame} alt="complete game" />
                <h2>the game completed!!</h2>
            </div>
        );
    }
    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);
    return (
        <div id='quiz'>
            <div id="question">
                <QuestionTimer timeout={10000}  onTimeout={handleSkipAnswer}/>
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map((answer) => (
                        <li key={answer} className="answer">
                            <button onClick={() => handleSelectAnswer(answer)} >{answer}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}