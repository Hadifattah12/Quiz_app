import imglogo from '../assets/quiz-logo.png';

export default function Header(){
    return (
    <header>
    <img src={imglogo} alt='img logo'/>
    <h1>ReactQuiz</h1> 
    </header>
    );
}