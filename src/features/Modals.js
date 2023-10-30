import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    menu: false,
    search:false,
    categoriesModal:false,
    brandsModal: false,
    imageSearch:false
}
const modalsSlice = createSlice({
    name:"modals",
    initialState,
    reducers:{
        setMenuBar:(state,action)=>{
            if (action.payload) {
                state.brandsModal=false
                state.categoriesModal=false
                state.search=false
                state.imageSearch=false
            }
            state.menu=action.payload
        },
        setSearchModal:(state,action)=>{
            if (action.payload) {
                state.brandsModal=false
                state.categoriesModal=false
                state.menu=false
                state.imageSearch=false
            }
            state.search=action.payload
        },
        setCategoriesModal:(state,action)=>{
            if (action.payload) {
                state.brandsModal=false
                // state.menu=false
                state.search=false
                state.imageSearch=false
            }
            state.categoriesModal=action.payload
        },
        setBrandsModal:(state,action)=>{
            if (action.payload) {
                state.categoriesModal=false
                // state.menu=false
                state.search=false
                state.imageSearch=false
            }
            state.brandsModal=action.payload
        },
        setImageSearch:(state,action)=>{
            if (action.payload) {
                state.brandsModal=false
                state.menu=false
                state.search=false
                state.categoriesModal=false
            }
            state.imageSearch=action.payload
        },
        closeAll:(state)=>{
            state.brandsModal=false
            state.menu=false
            state.search=false
            state.categoriesModal=false
            state.imageSearch = false
        }
    }
});

export default modalsSlice.reducer
export const {setBrandsModal,setMenuBar,setCategoriesModal,setImageSearch,setSearchModal,closeAll}  = modalsSlice.actions