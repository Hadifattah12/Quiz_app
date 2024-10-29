import { useState, useCallback} from "react";
import QUESTIONS from '../questions.js';
import completeGame from '../assets/quiz-complete.png';
import Question from "./Question.jsx";


export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const [answerState, setAnswerState] = useState('');

    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;
    const quizIsCompleted = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setAnswerState('answered');
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });
        setTimeout(() => {
            if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0])
                setAnswerState('correct');
            else
                setAnswerState('wrong');
            setTimeout(() => {
                setAnswerState('');
            }, 2000);
        }, 1000);
    }, [activeQuestionIndex]);
    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);
    if (quizIsCompleted) {
        return (
            <div id="summary">
                <img src={completeGame} alt="complete game" />
                <h2>the game completed!!</h2>
            </div>
        );
    }

    return (
        <div id='quiz'>
           <Question 
           key={activeQuestionIndex}
           questionText={QUESTIONS[activeQuestionIndex].text}
            answers={QUESTIONS[activeQuestionIndex].answers}
            answerState={answerState}
            selectedAnswer={userAnswers[userAnswers.length - 1]}
            onSelectAnswer={handleSelectAnswer}
            onSkipAnswer={handleSkipAnswer}
           />
        </div>
    );
}