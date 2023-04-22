import React, {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import LocationService from '../services/LocationService';
import Button from './Button';
import {StyleSheet} from 'react-native';
import {Colors} from '../constants';

function WeatherCurrent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigation = useNavigation();

  const handleFetchWeather = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const position = await LocationService.getCurrentPosition();
      // @ts-ignore
      navigation.navigate('Weather', position);
    } catch (e) {
      setError(true);
      console.log('Error fetching position', e);
    }
    setLoading(false);
  }, [navigation]);

  return (
    <Button
      label={'Weather at my position'}
      onPress={handleFetchWeather}
      testID={'weather-current'}
      loading={loading}
      style={error && styles.error}
    />
  );
}

const styles = StyleSheet.create({
  error: {
    borderColor: Colors.ERROR,
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default WeatherCurrent;
