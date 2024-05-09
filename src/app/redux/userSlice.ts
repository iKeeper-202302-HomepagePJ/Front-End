import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice(
    {
        name: 'user',
        initialState: {
            token: null,
            isLogining: false,
            expireTime: null,
            id: null
        },
        reducers: {
            setUserId: (state, action) => {
                state.id = action.payload;
                console.log
            },
            setToken: (state, action) => {
                state.token = action.payload;
                state.isLogining = true;
            },
            clearToken: (state) => {
                state.token = null;
                state.isLogining = false;
            }
        }
    }
)
export const {setToken, clearToken, setUserId} = userSlice.actions
export default userSlice.reducer;