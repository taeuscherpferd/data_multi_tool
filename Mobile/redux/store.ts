import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { applicationReducer } from './slices/application'

const rootReducer = combineReducers({
  applicationReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type ReduxStoreState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<ReduxStoreState>()