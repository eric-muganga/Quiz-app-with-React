import { useState, useCallback } from "react"
import QUESTIONS from  '../questions.js';
import quizIsCompleteImg from '../assets/quiz-complete.png';
import Question from "./Question.jsx";

import Summary from "./Summary.jsx";

 
export default function Quiz(){
    
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length;

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    
    const handleSelectedAnswer = useCallback(function handleSelectedAnswer(selectedAnswer){
        // Add the selected answer to the  list of users answers
        setUserAnswers((prevAnswers) => {
            return [...prevAnswers, selectedAnswer];
        });
    }, []);

    const handleSkipAnswer = useCallback(() => handleSelectedAnswer(null), [handleSelectedAnswer]); 

    if(quizIsComplete){
        return(
            <Summary userAnswers={userAnswers} />
        );
    }
    return(
        <div id="quiz" >
            <Question 
                key={activeQuestionIndex}
                index={activeQuestionIndex}
                onSelectAnswer={handleSelectedAnswer}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
        
    )
}