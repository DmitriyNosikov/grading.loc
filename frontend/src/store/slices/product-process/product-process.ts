import { Namespace } from '@frontend/src/const';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CreateProductRDO, ProductWithPaginationRDO } from '@shared/product';
import { fetchProductsAction } from '../../actions/api-action';

type ProductDataProcess = {
  product: CreateProductRDO | null,
  paginated_products: ProductWithPaginationRDO,
  isProductsLoading: boolean
}

const initialState: ProductDataProcess = {
  product: null,
  paginated_products: {
    entities: [],
    totalPages: 0,
    totalItems: 0,
    currentPage: 1,
    itemsPerPage: 0
  },
  isProductsLoading: false,
};

export const productsDataProcess = createSlice({
  name: Namespace.PRODUCT,
  initialState,
  reducers: {
    // LIST
    setProductsAction: (state, action: PayloadAction<ProductWithPaginationRDO>) => {
      state.paginated_products = action.payload;
    },
    setProductsLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isProductsLoading = action.payload;
    },
    updateProductsListAction: (state, action: PayloadAction<CreateProductRDO>) => {
      const newProduct = action.payload;
      state.paginated_products.entities = state.paginated_products.entities
        .map((product: CreateProductRDO) => (product.id === product.id)
          ? newProduct
          : product);
    },

    // ITEM
    setProductItemAction: (state, action: PayloadAction<CreateProductRDO | null>) => {
      state.product = action.payload;
    },

    deleteProductItemAction: (state, action: PayloadAction<CreateProductRDO>) => {
      const deleteProduct =  action.payload;
      state.paginated_products.entities
        .filter((product) => product.id !== deleteProduct.id);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.pending, (state) => {
        state.isProductsLoading = true;
      })
      .addCase(fetchProductsAction.fulfilled, (state) => {
        state.isProductsLoading = false;
      })
      .addCase(fetchProductsAction.rejected, (state) => {
        state.isProductsLoading = false;
      });
  }
});

export const {
  setProductsAction,
  setProductsLoadingStatus,
  updateProductsListAction,
  setProductItemAction,
  deleteProductItemAction
} = productsDataProcess.actions;
