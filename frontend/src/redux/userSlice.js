import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   userData : null,
   loading : false,
   error : null
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers:{
        start:(state)=>{
            state.loading = true
        },
        success:(state,action)=>{
            state.loading = false,
            state.userData = action.payload,
            state.error = null
        },
        failure:(state,action)=>{
            state.error = action.payload,
            state.loading = false
        },
 
        signoutstart:(state)=>{
            state.loading = true
        },
        signoutsuccess:(state,action)=>{
            state.loading = false,
            state.userData = null,
            state.error = null
        },
        signoutfailure:(state,action)=>{
            state.error = action.payload,
            state.loading = false
        },
    }
})

export default userSlice.reducer;
export const {start, success, failure, signoutstart, signoutfailure,signoutsuccess} = userSlice.actions