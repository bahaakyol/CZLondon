import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface IInput {
  title: string;
  placeholder: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  isPassword?: boolean;
}

const Input = ({ title, placeholder, onChangeText, value, isPassword }: IInput) => {
  const { colors } = useTheme();
  const [isShown, setIsShown] = useState(false);
  const [icon, setIcon] = useState('eye');
  type name = keyof typeof FontAwesome.glyphMap;

  const onIconPress = () => {
    setIsShown(!isShown);
    setIcon(icon === 'eye' ? 'eye-slash' : 'eye');
  };

  return (
    <>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <TouchableOpacity style={styles.icon} onPress={onIconPress}>
          {isPassword && <FontAwesome name={icon as name} size={24} color={colors.background} />}
        </TouchableOpacity>
        <Text style={[styles.text, { color: colors.text }]}>{title}</Text>
        <View style={[styles.input, { backgroundColor: colors.text }]}>
          <TextInput
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={value}
            placeholderTextColor={colors.text}
            secureTextEntry={isPassword && !isShown}
            style={{ color: colors.background, fontSize: 18 }}
            autoCapitalize="none"
          />
        </View>
      </View>
    </>
  );
};

export default React.memo(Input);
const styles = StyleSheet.create({
  container: {
    height: 100,
    width: '100%',
    justifyContent: 'flex-start',
    margin: 10,
  },
  text: {
    fontSize: 22,
    alignSelf: 'flex-start',
    marginLeft: '5%',
  },
  input: {
    height: '50%',
    width: '95%',
    margin: '2.5%',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: '45%',
    marginRight: '5%',
    zIndex: 10,
  },
});
