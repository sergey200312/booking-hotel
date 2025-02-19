import { createSlice, PayloadAction } from "@reduxjs/toolkit"

 export interface IAuthState {
    token: string | null
    isAuthenticated: boolean
}

const initialState: IAuthState = {
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token')
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<{token: string}>) {
            state.token = action.payload.token,
            state.isAuthenticated = true
            localStorage.setItem('token', action.payload.token)
        },
        logout(state) {
            state.token = null,
            state.isAuthenticated = false,
            localStorage.removeItem('token')
        }
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;