import { useTheme } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useState } from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';

import { IUser } from '../../../App';
import logo from '../../../assets/logo.png';
import { Button, Input } from '../../components';
import { AuthContext } from '../../context/authContext';
import { RootStackParamList } from '../../navigation/Navigation';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { users, setCurrentUser } = useContext(AuthContext);

  const onLoginHandler = () => {
    const user = users.find(
      (user) => user.username === username && user.password === password
    ) as IUser;
    if (!user) {
      Alert.alert('Error', 'Credentials are not correct', [{ text: 'Ok' }]);
      return;
    }
    setCurrentUser(user);
    navigation.navigate('Home');
  };
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.image}>
        <Image source={logo} />
      </View>
      <Input
        title="Username"
        placeholder="Enter your username"
        onChangeText={(text: React.SetStateAction<string>) => setUsername(text)}
        value={username}
      />
      <Input
        title="Password"
        placeholder="Enter your password"
        onChangeText={(text: React.SetStateAction<string>) => setPassword(text)}
        value={password}
        isPassword
      />
      <Button title="Login" onPress={onLoginHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginBottom: '30%',
  },
  image: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
