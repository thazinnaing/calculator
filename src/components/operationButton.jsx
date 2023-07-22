import { ACTIONS } from "../App";
import "../App.css"

const OperationButton=({operation,dispatch})=>{
    return(
        <>
        <button onClick={()=>{
            dispatch({
                type: ACTIONS.CHOOSE_OPERATION,
                payload: {operation}
            })
        }}>
            {operation}
        </button>
        </>
    )
}

export default OperationButton;