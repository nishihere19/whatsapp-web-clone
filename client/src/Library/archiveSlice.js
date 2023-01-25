import {createSlice } from '@reduxjs/toolkit';

const archiveSlice = createSlice({
    name:'Archive',
    initialState: {
        archiveOpen:true
    },
    reducers:{
        toggleState(state){
            state.archiveOpen = !state.archiveOpen
        }
    }
})

export const archiveActions = archiveSlice.actions

export default archiveSlice