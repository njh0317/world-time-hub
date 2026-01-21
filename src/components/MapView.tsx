import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import { useState, useRef, useEffect } from 'react';
import { getTimezoneInfoForLocation } from '../utils/coordinates';
import { formatTime } from '../utils/format';
import { useStore } from '../store';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface ClickedLocation {
  lat: number;
  lng: number;
  timezone: ReturnType<typeof getTimezoneInfoForLocation>;
}

function MapClickHandler({ onLocationClick }: { onLocationClick: (loc: ClickedLocation) => void }) {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      const timezone = getTimezoneInfoForLocation(lat, lng);
      onLocationClick({ lat, lng, timezone });
    },
  });
  return null;
}

function AutoOpenMarker({ location }: { location: ClickedLocation }) {
  const { settings } = useStore();
  const markerRef = useRef<L.Marker>(null);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [location]);

  return (
    <Marker ref={markerRef} position={[location.lat, location.lng]}>
      <Popup>
        <div className="text-sm">
          <p className="font-bold">{location.timezone.offsetString}</p>
          <p className="text-gray-600">{location.timezone.nearestCity}</p>
          {location.timezone.timezone && (
            <>
              <p>{location.timezone.timezone.name}</p>
              <p className="text-lg font-mono">{formatTime(new Date(), settings.timeFormat, location.timezone.timezone.id)}</p>
            </>
          )}
        </div>
      </Popup>
    </Marker>
  );
}

export function MapView() {
  const [clickedLocation, setClickedLocation] = useState<ClickedLocation | null>(null);

  return (
    <MapContainer center={[20, 0]} zoom={2} className="h-[300px] sm:h-[400px] md:h-[500px] w-full rounded-lg" scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler onLocationClick={setClickedLocation} />
      {clickedLocation && <AutoOpenMarker location={clickedLocation} />}
    </MapContainer>
  );
}
