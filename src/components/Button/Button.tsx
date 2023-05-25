import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface IButton {
  title: string;
  onPress: () => void;
}

const Button = ({ title, onPress }: IButton) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, { backgroundColor: colors.primary }]}>
        <Text style={[styles.buttonText, { color: colors.card }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    fontSize: 20,
  },
});

export default React.memo(Button);
