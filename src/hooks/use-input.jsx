import { useState } from "react"

const useInput = (validate) => {
    const [enteredValue, setEnteredValue] = useState('')
    const [isTouched, setIsTouched] = useState(false)

    const validInput = enteredValue;
    const hasError = isTouched && enteredValue

    const blurHandler = () => {
        setIsTouched(true)
    }

    return{
        value: enteredValue,
        isValid: validInput,
        hasError,
        blurHandler
    }
}

export default useInput