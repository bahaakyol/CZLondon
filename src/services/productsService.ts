import axios from 'axios';

export const API_URL = 'https://fakestoreapi.com/products';

interface IListProduct {
  limit?: number;
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const getProduct = async ({ limit = 0 }: IListProduct): Promise<IProduct[]> => {
  try {
    const response = await axios.get<IProduct[]>(API_URL, { params: { limit } });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getProductById = async (id: number): Promise<IProduct | null> => {
  try {
    const response = await axios.get<IProduct>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export interface IUpdateProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

const productsService = {
  getProduct,
  getProductById,
};

export default productsService;
