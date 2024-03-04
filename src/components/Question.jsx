import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import { useState } from 'react';

import QUESTIONS from  '../questions.js';

export default function Question({
    index,
    onSelectAnswer, 
    onSkipAnswer }) {

    const [ answer, setAnswer ] = useState({
        selectedAnswer: '',
        isCorrect: null
    });

    let timer = 10000; //  10 seconds in milliseconds
    if(answer.selectedAnswer){
        timer = 1000; // 1 second after an answer has been selected
    }

    if(answer.isCorrect !== null){
        timer = 2000; 
    }

    function handleSelectedAnswer(answer){
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        })

        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: QUESTIONS[index].answers[0] === answer
            })

            setTimeout(() => {
                onSelectAnswer(answer);
            }, 2000);
        }, 1000)
    }

    let answerState = ''
    if(answer.selectedAnswer && answer.isCorrect !== null) {
        answerState =  answer.isCorrect ? 'correct' : 'wrong'
    }else if(answer.selectedAnswer) {
        answerState = 'answered'
    }

    return(
        
        <div id="qustion">
            <QuestionTimer
                key={timer}
                timeout={timer} 
                onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
                mode={answerState}
            />
            <h2>{QUESTIONS[index].text}</h2>
            <Answers 
                answers={QUESTIONS[index].answers}
                selectedAnswer={answer.selectedAnswer}
                answerState={answerState}
                onSelect={handleSelectedAnswer}
            />
        </div>
    )
}