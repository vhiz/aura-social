export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START"
})

export const LoginSucess = (user) => ({
    type: "LOGIN_SUCESS",
    payload: user
})

export const LoginFailure = (error) => ({
    type: "LOGIN_FAIL",
    payload: error
})

export const Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId
})

export const Unfollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId
})