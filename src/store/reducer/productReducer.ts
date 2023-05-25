import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IProduct } from '../../services/productsService';

interface ProductState {
  favoriteProducts: Product[];
  cartProducts: Product[];
  products: IProduct[];
}
type Product = number;
const initialState: ProductState = {
  favoriteProducts: [1, 3, 4],
  cartProducts: [1, 2, 3],
  products: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addFavoriteProduct: (state, action: PayloadAction<Product>) => {
      state.favoriteProducts.push(action.payload);
    },
    addCartProduct: (state, action: PayloadAction<Product>) => {
      state.cartProducts.push(action.payload);
    },
    removeCartProduct: (state, action: PayloadAction<number>) => {
      state.cartProducts = state.cartProducts.filter((product) => product !== action.payload);
    },
    removeFavoriteProduct: (state, action: PayloadAction<number>) => {
      state.favoriteProducts = state.favoriteProducts.filter(
        (product) => product !== action.payload
      );
    },
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
  },
});

export const {
  addFavoriteProduct,
  removeFavoriteProduct,
  addCartProduct,
  removeCartProduct,
  setProducts,
} = productSlice.actions;
export default productSlice.reducer;
