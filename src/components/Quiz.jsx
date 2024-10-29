import { useState, useCallback } from "react";
import QUESTIONS from '../questions.js';
import completeGame from '../assets/quiz-complete.png';
import QuestionTimer from "./QuestionTimer.jsx";


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

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);
    return (
        <div id='quiz'>
            <div id="question">
                <QuestionTimer timeout={10000} key={activeQuestionIndex} onTimeout={handleSkipAnswer} />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map((answer) => {
                        const isSelected = userAnswers[userAnswers.length - 1] === answer;

                        let cssClasses = '';
                        if (answerState === 'answered' && isSelected) {
                            cssClasses = 'selected';
                        }
                        if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                            cssClasses = answerState;
                        }
                        return (
                            <li key={answer} className="answer">
                                <button onClick={() => handleSelectAnswer(answer)} className={cssClasses} >{answer}</button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}