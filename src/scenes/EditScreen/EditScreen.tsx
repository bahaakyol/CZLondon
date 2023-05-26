import { useTheme } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, StyleSheet } from 'react-native';

import { Button, Input } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { RootStackParamList } from '../../navigation/Navigation';
import { API_URL, IProduct, IUpdateProduct } from '../../services/productsService';
import { setProducts } from '../../store/reducer/productReducer';

type ProductProps = NativeStackScreenProps<RootStackParamList, 'EditScreen'>;

interface IgetProduct {
  index: number;
}

const EditScreen = ({ route, navigation }: ProductProps) => {
  const { id } = route.params;
  const [product, setProduct] = useState<IProduct | null>(null);
  const { colors } = useTheme();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);

  const getProductByIndex = ({ index }: IgetProduct) => {
    return products[index];
  };

  useEffect(() => {
    setProduct(getProductByIndex({ index: id - 1 }));
    console.log('product: ', product);
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
      setDescription(product.description);
      setImage(product.image);
      setCategory(product.category);
    }
  }, [product]);

  const submitChangesHandler = async () => {
    try {
      await updateProduct({
        id,
        title,
        price,
        description,
        image,
        category,
      });
    } catch (error) {
      console.log('error: ', error);
      alert('Error updating product');
    }
    navigation.navigate('Home');
  };

  const updateProduct = async ({
    id,
    title,
    price,
    description,
    image,
    category,
  }: IUpdateProduct) => {
    try {
      axios
        .put(`${API_URL}/${id}`, {
          title,
          price,
          description,
          image,
          category,
        })
        .then((response) => {
          dispatch(
            setProducts(
              products.map((item) =>
                item.id === id
                  ? {
                      ...item,
                      category,
                      description,
                      price,
                      title,
                      id,
                      image,
                    }
                  : item
              )
            )
          );
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: colors.background, marginTop: Platform.OS === 'android' ? 30 : 0 },
      ]}>
      {product && (
        <>
          <Input
            title="Title"
            value={title}
            placeholder={title}
            onChangeText={(text) => setTitle(text)}
          />
          <Input
            title="Price"
            value={price.toString()}
            placeholder={price.toString()}
            onChangeText={(text) => setPrice(Number(text))}
          />
          <Input
            title="Description"
            value={description}
            placeholder={description}
            onChangeText={(text) => setDescription(text)}
          />
          <Input
            title="Image"
            value={image}
            placeholder={image}
            onChangeText={(text) => setImage(text)}
          />
          <Input
            title="Category"
            value={category}
            placeholder={category}
            onChangeText={(text) => setCategory(text)}
          />
          <Button title="Save" onPress={submitChangesHandler} />
        </>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 3,
  },
});

export default EditScreen;
