import React from 'react';
import { Image, View } from 'react-native';

const LoadingScreen = () => (
    <View>
        <Image
            source={require('../assets/gif.gif')}
        />
    </View>
);

export default LoadingScreen;