import React from 'react'
import { StyleSheet, View } from 'react-native'
import { TestIds, BannerAd as AdmobBannerAd, BannerAdSize} from '@react-native-firebase/admob';
import { ADMOB_AD_UNIT_ID } from '@env'

const adUnitId = __DEV__ ? TestIds.BANNER : ADMOB_AD_UNIT_ID;

export default function BannerAd() {
    
    return (
        <View>
            <AdmobBannerAd
                unitId={adUnitId}
                size={BannerAdSize.ADAPTIVE_BANNER}
                requestOptions={{
                requestNonPersonalizedAdsOnly: true,}}
            />
        </View>
    )
}
