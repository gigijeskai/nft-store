import {createSlice} from "@reduxjs/toolkit";
import instance from "../../api";
import { getItemFromLocalStorage, setLocalStorageItem} from "../../utils/helpers";

const isQuerySaved = (action) => {
    return action.type.endsWith("/saveQuery");
}

const path = getItemFromLocalStorage("query")?.path || "";
    const itemPerPage = getItemFromLocalStorage("query")?.itemPerPage || 
    null;
    const type = getItemFromLocalStorage("query")?.type || "";
    const query = getItemFromLocalStorage("query")?.query || "";

const initialState = {
    query:{
        path: path,
        itemPerPage: itemPerPage,
        type: type,
        query: query,
    },
    loading: true,
    error: {
        status: false,
        message: "",
    },
    photos: [],
    rate_limit: {
        renaining: null,
        total: 50,
    },
    pagination: {
        hasNextPage: null,
        hasPrevPage: null,
        totalPages: null,
        currentPage: 1,
    }
    };

    

    const apiSlice = createSlice({
        name: "api",
        initialState: initialState,
        // in js se ha lo stesso nome della variabile si può anche richiamare scrivendo semplicemente il nome seguito da una virgola es: (initialState,)
        reducers:{
            startLoading: (state) => {
                state.loading = true;
                state.photos = [];
            },
            stopLoading: (state) => {
                state.loading = false;
            },
            saveData: (state, action) => {
                state.photos = action.payload;
            },
            saveQuery: (state, action) => {
                state.query = {...action.payload}
            },
            catchError: (state, action) => {
                state.error.status = true;
                state.error.message = action.payload;
                state.photos = [];
            },
            cleanError: (state) => {
                state.error.status = false;
                state.error.message = "";
            },
            checkRaterLimiter: (state, action) => {
state.rate_limit = {
  ...action.payload,
};
            },
            updatePage: (state, action) => {
                state.pagination.currentPage = action.payload;
            },
            checkPagination: (state, action) => {
                state.pagination.hasNextPage = action.payload.hasNextPage;
                state.pagination.hasPrevPage = action.payload.hasPrevPage;
                state.pagination.totalPages = action.payload.totalPage;
        },
    },
extraReducers: (builder) => {
    builder.addMatcher(isQuerySaved, state => {
        setLocalStorageItem("query", state.query)
    })
    }
});

    const {
        startLoading,
        saveData, 
        stopLoading, 
        cleanError,
        catchError, 
        checkRaterLimiter,
        saveQuery,
        updatePage,
        checkPagination,
    } = apiSlice.actions;

        export {cleanError, catchError, saveQuery, updatePage}
    
    
    const {reducer} = apiSlice;

    export const fetchData = (path) => async (dispatch,
         getState) => {
            // getSatate permette di raggiungere lo stato globale di tutti i reducer dell'app
        dispatch(startLoading());
        dispatch(cleanError());
        try {
            const response = await instance.get(path);
            dispatch(saveData(response.data));
            console.log(response);
            if(response?.data?.total === 0){
                dispatch(catchError(["Nessun risultato trovato"]));
            }
            if(response?.data?.total_pages){
const { currentPage } = getState().photos.pagination;
console.log(getState())
const paginationInfo = {
    hasNextPage: currentPage + 1 <= response?.data?.total_pages,
        hasPrevPage: currentPage > 1,
        totalPage: response?.data?.total_pages,
};

dispatch(checkPagination(paginationInfo));
            }
            dispatch(checkRaterLimiter({
               total:  response.headers["x-ratelimit-limit"],
               remaining: response.headers["x-ratelimit-remaining"],
           
            }) )
        } catch (error) {
            dispatch(catchError(error.errors));
        }
        dispatch(stopLoading());
    }

    export default reducer