import axios from 'axios'



export const loginCall = async(userCredentials, dispatch)=>{
dispatch({type:"LOGIN_START"})
try {
    const res = await axios.post("http://localhost:3001/auth/login", userCredentials)
    await dispatch({type: "LOGIN_SUCESS", payload: res.data})
} catch (error) {
    dispatch({type:"LOGIN_FAIL", payload:error})
}
}