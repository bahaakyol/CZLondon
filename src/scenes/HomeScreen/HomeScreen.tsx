import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

import { Card } from '../../components';
import { AuthContext } from '../../context/authContext';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { RootStackParamList } from '../../navigation/Navigation';
import productsService, { IProduct } from '../../services/productsService';
import { setProducts } from '../../store/reducer/productReducer';

export interface IRenderItem {
  item: IProduct;
}

type HomeScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenNavigationProp) => {
  const { colors } = useTheme();
  const [data, setData] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);

  useEffect(() => {
    console.log('currentUser:', currentUser);
  }, [currentUser]);

  const renderItem = useCallback(
    ({ item }: IRenderItem) => <Card item={item} navigation={navigation} />,
    []
  );

  useEffect(() => {
    setLoading(true);
    productsService.getProduct({}).then((res) => {
      setData(res);
      setLoading(false);
      dispatch(setProducts(res));
    });
  }, []);

  useEffect(() => {
    if (products !== data) {
      setData(products);
    }
  }, [products]);

  const navigateCart = () => {
    navigation.navigate('Cart');
  };

  const navigateWishlist = () => {
    navigation.navigate('Wishlist');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Ionicons
          name="exit"
          size={30}
          color="grey"
          onPress={() => {
            navigation.pop();
            setCurrentUser(null);
          }}
        />
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <Ionicons name="ios-heart-outline" size={30} color="red" onPress={navigateWishlist} />
          <Ionicons name="cart-outline" size={30} color="rgb(255,138,67)" onPress={navigateCart} />
        </View>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: colors.background, marginTop: Platform.OS === 'android' ? 35 : 0 },
      ]}>
      {loading && <ActivityIndicator size="large" color="red" style={styles.indicator} />}
      <View style={styles.divider} />
      <View style={styles.flatlist}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  title: {
    fontSize: 30,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#c2c2c2',
  },
  flatlist: {
    flex: 1,
    width: '100%',
  },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 80,
    marginRight: 8,
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

export default HomeScreen;
