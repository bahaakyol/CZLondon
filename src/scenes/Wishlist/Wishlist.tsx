import { useTheme } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';

import { Card } from '../../components';
import { useAppSelector } from '../../hooks/hooks';
import { RootStackParamList } from '../../navigation/Navigation';
import { IRenderItem } from '../HomeScreen/HomeScreen';

type WishlistScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'Wishlist'>;

const WishlistScreen = ({ navigation }: WishlistScreenNavigationProp) => {
  const { colors } = useTheme();
  const favorites = useAppSelector((state) => state.product.favoriteProducts);
  const products = useAppSelector((state) => state.product.products);
  const data = products.filter((item) => favorites.includes(item.id));

  const renderItem = useCallback(
    ({ item }: IRenderItem) => <Card item={item} navigation={navigation} isWishlist />,
    []
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.flatlist}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={1}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  flatlist: {
    flex: 1,
    width: '100%',
  },
});

export default WishlistScreen;
