import { useState, useEffect } from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext() //to dispatch logout action

    const logout = async () => {
        setError(null)
        setIsPending(true)

        //sign the user out
        try {
            //await until signOut is completed
            await projectAuth.signOut()

            //dispatch logout action
            //don't pass payload because we set the user to be null
            dispatch({ type: 'LOGOUT'})
            
            //updater state
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        }
        catch(err) {
            if (!isCancelled) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }

        }
    }

    //when the component is unmounted, fire the cleanup function to setIsCancelled to be true
    //when isCancelled is true, don't update state in that component
    //ex if somemobody clicks signup,but quickly clicks login before signup function is finished
    //cleanup function
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { logout, error, isPending }
}