'use client';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

type MapItem = {
  recommendationId: string;
  title: string;
  category: string;
  city: string;
  country: string;
  addressLabel: string;
  description: string;
  approximateLatitude: number | null;
  approximateLongitude: number | null;
};

const markerIcon = L.divIcon({
  className: 'recommendation-map-marker',
  html: '<span style="display:block;width:14px;height:14px;border-radius:999px;background:#0f172a;border:2px solid white;box-shadow:0 0 0 2px #0f172a33;"></span>',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

export function SocialRecommendationsMap({ items }: { items: MapItem[] }) {
  const withCoordinates = items.filter(
    (item) => item.approximateLatitude !== null && item.approximateLongitude !== null,
  );

  const center: [number, number] = withCoordinates[0]
    ? [withCoordinates[0].approximateLatitude as number, withCoordinates[0].approximateLongitude as number]
    : [50.8798, 4.7005];

  return (
    <MapContainer center={center} zoom={12} style={{ height: '420px', width: '100%' }} className='rounded-xl'>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {withCoordinates.map((item) => (
        <Marker
          key={item.recommendationId}
          position={[item.approximateLatitude as number, item.approximateLongitude as number]}
          icon={markerIcon}
        >
          <Popup>
            <div className='space-y-1'>
              <p className='font-semibold'>{item.title}</p>
              <p className='text-xs'>{item.category} · {item.city}, {item.country}</p>
              <p className='text-xs'>{item.addressLabel}</p>
              <p className='text-xs'>{item.description}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
