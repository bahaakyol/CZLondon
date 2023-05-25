import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface IStarRating {
  rating: number | undefined;
  numReviews: number | undefined;
  showReviews: boolean;
}

const Stars = ({ rating, numReviews, showReviews }: IStarRating) => {
  const { colors } = useTheme();
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (rating === undefined) {
      return <FontAwesome name="star-o" size={24} color="grey" key={i} />;
    }
    const starColor = i < rating ? 'gold' : 'grey';
    const starIcon = i < rating ? 'star' : 'star-o';

    return <FontAwesome name={starIcon} size={24} color={starColor} key={i} />;
  });
  return (
    <View style={styles.container}>
      {stars}
      {showReviews && <Text style={{ color: colors.text }}>({numReviews})</Text>}
    </View>
  );
};

const StarRating = ({ rating, numReviews, showReviews }: IStarRating) => {
  return (
    <View style={styles.container}>
      <Stars rating={rating} numReviews={numReviews} showReviews={showReviews} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default React.memo(StarRating);
