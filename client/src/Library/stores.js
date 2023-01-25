import { configureStore} from "@reduxjs/toolkit";
import archiveSlice from "./archiveSlice";
import userSlice from "./userSlice"
import searchSlice from "./searchSlice"

const store = configureStore({
    reducer: {
        archive: archiveSlice.reducer,
        user: userSlice.reducer,
        search: searchSlice.reducer
    }
})

export default store;