import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default marker icon in Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
    iconUrl: markerIcon as any,
    iconRetinaUrl: markerIconRetina as any,
    shadowUrl: markerShadow as any,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

L.Marker.prototype.options.icon = DefaultIcon

interface MapComponentProps {
    position: [number, number]
    zoom?: number
    googleMapsUrl: string
}

export default function MapComponent({ position, zoom = 15, googleMapsUrl }: MapComponentProps) {
    return (
        <div className="relative w-full h-full group cursor-pointer" onClick={() => window.open(googleMapsUrl, '_blank')}>
            <MapContainer
                center={position}
                zoom={zoom}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%', borderRadius: '1rem' }}
                dragging={false}
                touchZoom={false}
                doubleClickZoom={false}
            >
                <TileLayer
                    attribution='&copy; Google Maps'
                    url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                />
                <Marker position={position}>
                    <Popup>
                        St. Pius X High School
                    </Popup>
                </Marker>
            </MapContainer>

            {/* Overlay to handle clicks and show "Open in Google Maps" */}
            <div className="absolute inset-0 z-[1000] bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300 font-semibold text-blue-600 flex items-center gap-2">
                    <span>Click to view in Google Maps</span>
                </div>
            </div>
        </div>
    )
}
