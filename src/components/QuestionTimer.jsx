import { useState, useEffect } from "react"

export default function QuestionTimer({timeout, onTimeout, mode}){

    const [remainingTime, setRemainingTime] = useState(timeout)
    useEffect(() => {
        //console.log('Setting up timer')
        const timer = setTimeout(onTimeout, timeout )

        // cleanup the timeout when the component unmounts
        return  ()=> {
            clearTimeout(timer)
        }
    }, [timeout, onTimeout])
    

    useEffect(() => { 
        //console.log('Setting interval')
        const interval = setInterval( () => {
            setRemainingTime((prevRemainingTime) => prevRemainingTime - 100)
        }, 100);

        // cleanup the interval when the component unmounts
        return ()=> {
            clearInterval(interval)
        }
    }, [])
    

    return(
        <progress 
            id="question-timer" 
            max={timeout} 
            value={remainingTime}
            className={mode}
        />
    )
}