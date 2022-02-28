import { useState, useEffect } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  //async function to use await keyword instead of using promises and then method
  const signup = async (email, password, displayName) => {
      setError(null)
      setIsPending(true)

      try {
          //sign up user
          const res = await projectAuth.createUserWithEmailAndPassword(email, password)
          

          if (!res) {
              throw new Error('Could not complete signup')
          }

          //add display name to user
          await res.user.updateProfile({ displayName })

          //dispatch login action, send action object to the reducer
          dispatch({ type: 'LOGIN', payload: res.user })

          //updater state
          if (!isCancelled) {
              setIsPending(false)
              setError(null)
          }

      }
      catch (err) {
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

  return { error, isPending, signup }
}