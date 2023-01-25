import { configureStore} from "@reduxjs/toolkit";
import archiveSlice from "./archiveSlice";
import userSlice from "./userSlice"

const store = configureStore({
    reducer: {
        archive: archiveSlice.reducer,
        user: userSlice.reducer
    }
})

export default store;