import {configureStore} from "@reduxjs/toolkit";
import trainer from './slices/trainer.slice.js'
export default configureStore({
    reducer: {
        trainer
    }
})