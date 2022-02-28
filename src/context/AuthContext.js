import { useEffect } from "react";
import { createContext, useReducer } from "react";
import { projectAuth } from "../firebase/config";

export const AuthContext = createContext()

//check type of action and update the state depending on the action type
//if action doesn't match any listed action type, just return the state
export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload}
        case 'LOGOUT':
            return { ...state, user: null }
        case 'AUTH_IS_READY':
            return { ...state, user: action.payload, authIsReady: true }
        default:
            return state
    }
}

//create an AuthContextProvider to wrap the component the AuthContext.Provider context
//authReducer is for updating our state
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false //only start rendering component when this is true
    })

    useEffect(() => {
        //function fires whenever there is an authentication change
        const unsub = projectAuth.onAuthStateChanged((user) => {
            dispatch({ type: 'AUTH_IS_READY', payload: user })
            unsub()
        })
    }, [])

    console.log("AuthContext state:", state)

    return (
        <AuthContext.Provider value={{ ...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}