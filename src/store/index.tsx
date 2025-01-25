import { configureStore, Middleware } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import commonSlice from "./reducers/commonSlice";
import todoSlice from "./reducers/todoSlice";
import { api } from "./services/api";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist/es/constants";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistTodoConfig = {
  key: "todos",
  version: 1,
  storage: storage,
};

const persistedTodoReducer = persistReducer(persistTodoConfig, todoSlice);

const middlewareList: Middleware[] = [api.middleware];

export const store = configureStore({
  reducer: {
    commonSlice,
    todoSlice: persistedTodoReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    }).concat(middlewareList),
});

export const persistor = persistStore(store);
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
