import completeGame from '../assets/quiz-complete.png';
import QUESTIONS from '../questions.js';

export default function Summary({ userAnswers }) {
    const skippedAnswers = userAnswers.filter(answer => answer === null);
    const correctAnswers = userAnswers.filter((answer,index) => answer === QUESTIONS[index].answers[0]);

    const skkipedper = Math.round((skippedAnswers.length / userAnswers.length) * 100);
    const correctper = Math.round((correctAnswers.length / userAnswers.length) * 100);
    const wrongAnswerper = Math.round(100 - skkipedper - correctper);
    return (
        <div id="summary">
            <img src={completeGame} alt="complete game" />
            <h2>Quiz Completed!!</h2>
            <div id='summary-stats'>
                <p>
                    <span className='number'>{skkipedper}%</span>
                    <span className='text'>Skipped</span>
                </p>
                <p>
                    <span className='number'>{correctper}%</span>
                    <span className='text'>answered Correctly</span>
                </p>
                <p>
                    <span className='number'>{wrongAnswerper}%</span>
                    <span className='text'>answered incorrectly</span>
                </p>
            </div>
            <ol>
                {userAnswers.map((answer,index) => {
                    let cssClass = 'user-answer';
                    if(answer === null){
                        cssClass += ' skipped';
                    }else if(answer === QUESTIONS[index].answers[0]){
                        cssClass += ' correct';
                    }else{
                        cssClass += ' wrong';
                    }
                    return (
                        <li key={index}>
                            <h3>{index + 1}</h3>
                            <p className='question'>{QUESTIONS[index].text}</p>
                            <p className={cssClass}>{answer ?? 'skipped'}</p>
                        </li>
                    );
                })}

            </ol>
        </div>
    );
}