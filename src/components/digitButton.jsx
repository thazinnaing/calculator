import { ACTIONS } from "./Action"
import "../App.css"
// eslint-disable-next-line react/prop-types
const DigitButton=({digit,dispatch})=>{
    return(
        <>
        <button onClick={()=>{
            dispatch({type: ACTIONS.ADD_DIGIT, payload: {digit}})
        }}
        >
            {digit}
        </button>
        </>
    )
}

export default DigitButton;
