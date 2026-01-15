import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice(
    {
        name: 'user',
        initialState: {
            token: null,
            isLogining: false,
            expireTime: null,
            studentId : null,
            auth : null
        },
        reducers: {
            setToken: (state, action) => {
                state.token = action.payload;
                state.isLogining = true;
            },
            clearToken: (state) => {
                state.token = null;
                state.isLogining = false;
                state.studentId = null;
                state.auth = null
            },
            setInfo: (state, action) => {
                state.auth = action.payload.auth;
                state.studentId = action.payload.sub;
                state.expireTime = action.payload.exp;
            }
        }
    }
)
export const {setToken, clearToken, setInfo} = userSlice.actions
export default userSlice.reducer;