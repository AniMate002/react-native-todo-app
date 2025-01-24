import { GeolocationI } from '@/utils/types';
import React from 'react'
import { View, Text } from 'react-native'
import { LeafletView, WebviewLeafletMessage } from 'react-native-leaflet-view'

interface MapProps {
    handleAddMapMarker: (e: WebviewLeafletMessage) => void;
    geolocation: GeolocationI
}

const Map = React.memo(({ handleAddMapMarker, geolocation} : MapProps) => {
    return (
        <>
        {/* GEOLOCATION PICKER */}
            <View className='mt-2 h-[200px] rounded-xl overflow-hidden'>
                <LeafletView
                onMessageReceived={e => handleAddMapMarker(e)}
                doDebug={true}
                zoom={15}
                mapCenterPosition={geolocation}
                // mapCenterPosition={{ lat: geolocation.lat, lng: geolocation.lng }}
                mapMarkers={[
                    {
                        id: 'location-marker',
                        icon: 'https://cdn-icons-png.flaticon.com/64/2776/2776067.png',
                        size: [64, 64],
                        iconAnchor: [32, 64],
                        position: {
                        lat: geolocation.lat,
                        lng: geolocation.lng,
                        },
                    },
                    ]}
                    mapLayers={[
                    {
                        baseLayer: true,
                        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    },
                    ]}
                />
            </View>
        </>
    )
})

export default Map
