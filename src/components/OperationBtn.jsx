import { ACTIONS } from "./Action"
import "../App.css"
// eslint-disable-next-line react/prop-types
const OperationBtn=({operation,dispatch})=>{
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

export default OperationBtn;
