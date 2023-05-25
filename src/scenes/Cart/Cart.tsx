import { useTheme } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { Button, Card } from '../../components';
import { useAppSelector } from '../../hooks/hooks';
import { RootStackParamList } from '../../navigation/Navigation';
import { IRenderItem } from '../HomeScreen/HomeScreen';

type CartScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'Cart'>;

const CartScreen = ({ navigation }: CartScreenNavigationProp) => {
  const { colors } = useTheme();
  // const [data, setData] = useState<IProduct[]>([]);
  const cartItems = useAppSelector((state) => state.product.cartProducts);
  const products = useAppSelector((state) => state.product.products);
  const data = products.filter((item) => cartItems.includes(item.id));

  const total = data.reduce((acc, item) => {
    if (cartItems.includes(item.id)) {
      return acc + item.price;
    }
    return acc;
  }, 0);

  const renderItem = useCallback(
    ({ item }: IRenderItem) => <Card item={item} navigation={navigation} />,
    []
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.flatlist}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
        />
      </View>
      <View style={styles.totalAmount}>
        <Text> Your Total is : ${total} </Text>
        <Button title="Buy Now! " onPress={() => {}} />
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
  totalAmount: {
    height: '20%',
    width: '90%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(255,138,67)',
  },
});

export default CartScreen;
