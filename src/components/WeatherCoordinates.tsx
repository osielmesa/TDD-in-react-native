import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import Button from './Button';
import {Colors} from '../constants';

type FormValues = {
  latitude: string;
  longitude: string;
};

function WeatherCoordinates() {
  const navigation = useNavigation();

  const form = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues,
    mode: 'onChange',
  });

  const handleSubmit = form.handleSubmit(values => {
    // @ts-ignore
    navigation.navigate('Weather', values);
  });

  return (
    <View testID={'weather-coordinates'}>
      <View style={styles.inputs}>
        <Controller
          name={'latitude'}
          control={form.control}
          render={({field: {onChange, ...p}}) => (
            <TextInput
              testID={'weather-coordinates-latitude'}
              onChangeText={onChange}
              style={styles.input}
              placeholder={'Lat'}
              placeholderTextColor={Colors.GRAY}
              {...p}
            />
          )}
        />
        {form?.formState?.errors?.latitude && (
          <Text style={styles.error}>Latitude must be a valid number</Text>
        )}
        <Controller
          name={'longitude'}
          control={form.control}
          render={({field: {onChange, ...p}}) => (
            <TextInput
              testID={'weather-coordinates-longitude'}
              onChangeText={onChange}
              style={styles.input}
              placeholder={'Lon'}
              placeholderTextColor={Colors.GRAY}
              {...p}
            />
          )}
        />
        {form?.formState?.errors?.longitude && (
          <Text style={styles.error}>Longitude must be a valid number</Text>
        )}
      </View>
      <Button label={'find'} onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputs: {
    flexDirection: 'column',
    marginBottom: 15,
  },
  input: {
    backgroundColor: Colors.TRANSPARENT,
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    paddingHorizontal: 8,
    color: Colors.WHITE,
  },
  error: {
    marginHorizontal: 5,
    color: Colors.ERROR,
  },
});

const defaultValues: FormValues = {
  latitude: '',
  longitude: '',
};

const validationSchema = Yup.object().shape({
  latitude: Yup.number().min(-90).max(90),
  longitude: Yup.number().min(-180).max(180),
});

export default WeatherCoordinates;
