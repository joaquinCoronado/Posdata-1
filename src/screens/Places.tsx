import React from 'react';
import {View, Text} from 'react-native';
import usePlaces from '../hooks/usePlaces';

const Places = () => {
  const {} = usePlaces();

  return (
    <View>
      <Text>Places</Text>
    </View>
  );
};

export default Places;
