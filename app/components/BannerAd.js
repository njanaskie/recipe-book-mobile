import React from 'react'
import { StyleSheet, View } from 'react-native'
import { TestIds, BannerAd as AdmobBannerAd, BannerAdSize} from '@react-native-firebase/admob';
import { ADMOB_APP_ID } from '@env'

const adUnitId = __DEV__ ? TestIds.BANNER : ADMOB_APP_ID;
console.log(__DEV__)

export default function BannerAd() {
    
    return (
        <View style={styles.container}>
            <AdmobBannerAd
                unitId={adUnitId}
                size={BannerAdSize.ADAPTIVE_BANNER}
                requestOptions={{
                requestNonPersonalizedAdsOnly: true,}}
                // onAdLoaded={() => {
                // console.log('Advert loaded');}}
                // onAdFailedToLoad={(error) => {
                // console.error('Advert failed to load: ', error);}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignContent: 'center'
        // position: 'absolute',
        // top: 0
    },
})
