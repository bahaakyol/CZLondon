import { Feather, FontAwesome } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { StarRating } from '../../components';
import { AuthContext } from '../../context/authContext';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { RootStackParamList } from '../../navigation/Navigation';
import {
  addCartProduct,
  addFavoriteProduct,
  removeCartProduct,
  removeFavoriteProduct,
} from '../../store/reducer/productReducer';

type ProductProps = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

const ProductDetail = ({ navigation, route }: ProductProps) => {
  const { colors } = useTheme();
  const { id } = route.params;
  const favorites = useAppSelector((state) => state.product.favoriteProducts);
  const cart = useAppSelector((state) => state.product.cartProducts);
  const products = useAppSelector((state) => state.product.products);
  const dispatch = useAppDispatch();
  const { currentUser } = useContext(AuthContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCart, setIsCart] = useState(false);

  const data = products.find((product) => product.id === id);

  const navigateEdit = () => {
    if (data) {
      console.log(data.id);
      navigation.navigate('EditScreen', { id: data.id });
    }
  };

  const icon = () => {
    if (currentUser?.type === 'admin' || currentUser?.type === 'manager') {
      return (
        <TouchableOpacity onPress={navigateEdit}>
          <Feather name="edit" size={24} color="green" style={{ marginRight: 10 }} />
        </TouchableOpacity>
      );
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: data?.title.slice(0, 20),
      headerRight: icon,
    });
  }, [data?.title, navigation]);

  useEffect(() => {
    const favoriteCheck = favorites.some((fav: number) => {
      return fav === data?.id;
    });
    setIsFavorite(favoriteCheck);
  }, [favorites, data?.id]);

  useEffect(() => {
    const cartCheck = cart.some((cart: number) => {
      return cart === data?.id;
    });
    setIsCart(cartCheck);
  }, [cart, data?.id]);

  const onPressHandler = () => {
    if (data) {
      if (isFavorite) {
        dispatch(removeFavoriteProduct(data.id));
      } else {
        dispatch(addFavoriteProduct(data.id));
      }
    }
  };

  const onCartHandler = () => {
    if (data) {
      if (isCart) {
        dispatch(removeCartProduct(data.id));
      } else {
        dispatch(addCartProduct(data.id));
      }
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.imageContainer}>
        <Text style={styles.price}>${data?.price}</Text>
        <Image source={{ uri: data?.image }} style={styles.image} />
      </View>
      <View style={styles.divider} />
      <ScrollView style={[styles.page, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>{data?.title} </Text>
        <Text style={[styles.text, { color: colors.text }]}>{data?.description} </Text>
        <View style={styles.ratings}>
          <StarRating showReviews rating={data?.rating.rate} numReviews={data?.rating.count} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addToCart} onPress={onCartHandler}>
            <Text style={styles.buttonText}>{isCart ? 'Remove from cart' : 'Add to Cart'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.heart} onPress={onPressHandler}>
            <FontAwesome name={isFavorite ? 'heart' : 'heart-o'} size={34} color="grey" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    overflow: 'scroll',
  },
  text: {
    fontSize: 14,
    padding: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imageContainer: {
    width: '100%',
    height: '40%',
    backgroundColor: 'white',
  },
  page: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  category: {
    fontSize: 22,
    fontStyle: 'italic',
    padding: 10,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'black',
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    color: 'green',
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 1,
  },
  ratings: {
    width: '100%',
    justifyContent: 'center',
    height: 40,
    alignItems: 'center',
    marginRight: 'auto',
    padding: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  addToCart: {
    width: '70%',
    height: '100%',
    backgroundColor: 'rgb(255,138,67)',
    marginHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heart: {
    width: '20%',
    height: '100%',
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
});

export default ProductDetail;
