import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

import logo from '../../../assets/logo.png';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { IProduct } from '../../services/productsService';
import { addFavoriteProduct, removeFavoriteProduct } from '../../store/reducer/productReducer';

interface ICard {
  item: IProduct;
  navigation: NativeStackNavigationProp<any>;
  isWishlist?: boolean;
}

const Card = ({ item, navigation, isWishlist }: ICard) => {
  const favorites = useAppSelector((state) => state.product.favoriteProducts);
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const IMAGE_URL = item.image ? { uri: item.image } : logo;

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favoriteCheck = favorites.some((fav: number) => {
      return fav === item.id;
    });
    setIsFavorite(favoriteCheck);
  }, [favorites]);

  const onPressHandler = useCallback(() => {
    if (isFavorite) {
      dispatch(removeFavoriteProduct(item.id));
    } else {
      dispatch(addFavoriteProduct(item.id));
    }
  }, [isFavorite]);

  const onPressCardHandler = useCallback(() => {
    navigation.navigate('ProductDetail', { id: item.id });
  }, []);

  return (
    <TouchableOpacity
      onPress={onPressCardHandler}
      style={[styles.container, { borderColor: colors.text }]}>
      <TouchableOpacity style={styles.heart} onPress={onPressHandler}>
        <AntDesign name={isFavorite ? 'heart' : 'hearto'} size={24} color="red" />
      </TouchableOpacity>
      <Image
        source={IMAGE_URL}
        style={[styles.image, { resizeMode: isWishlist ? 'cover' : 'stretch' }]}
      />
      <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    marginHorizontal: 10,
    height: 200,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 2,
  },
  price: { marginLeft: 'auto', fontSize: 24, color: 'green' },
  heart: { position: 'absolute', top: 10, right: 10, zIndex: 10 },
  image: { width: '100%', height: 100, resizeMode: 'stretch' },
  title: {
    maxWidth: '100%',
    maxHeight: 50,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
});

export default React.memo(Card);
