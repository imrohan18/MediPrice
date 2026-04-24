"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Ensure leaflet css is applied even without globals depending on webpack

// Custom icons based on price
const createCustomIcon = (isCheapest: boolean) => {
  const color = isCheapest ? "#10b981" : "#ef4444"; // emerald-500 or red-500
  const size = isCheapest ? "40px" : "32px";
  const anchorY = isCheapest ? 40 : 32;

  const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="${size}" height="${size}">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>`;
  
  return L.divIcon({
    className: "custom-leaflet-icon bg-transparent border-none",
    html: svgIcon,
    iconSize: [parseInt(size), parseInt(size)],
    iconAnchor: [parseInt(size)/2, anchorY],
    popupAnchor: [0, -anchorY],
  });
};

// Component to dynamically fit bounds to all markers
const SetBounds = ({ prices }: { prices: any[] }) => {
  const map = useMap();
  useEffect(() => {
    if (prices.length > 0) {
      const bounds = L.latLngBounds(prices.map(p => [p.lat, p.lon]));
      map.fitBounds(bounds, { padding: [30, 30] });
    }
  }, [prices, map]);
  return null;
};

interface PriceMapProps {
  prices: any[];
}

export default function PriceMap({ prices }: PriceMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (!prices || prices.length === 0) return null;

  const center = [prices[0].lat, prices[0].lon] as [number, number];
  const minPrice = prices[0].total_price;

  return (
    <div className="w-full h-[400px] border border-border/50 rounded-3xl overflow-hidden shadow-sm relative z-0">
      <MapContainer center={center} zoom={13} scrollWheelZoom={false} className="w-full h-full z-0">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        <SetBounds prices={prices} />

        {prices.map((pharmacy, idx) => {
          const isCheapest = pharmacy.total_price === minPrice;
          return (
            <Marker 
              key={idx} 
              position={[pharmacy.lat, pharmacy.lon]} 
              icon={createCustomIcon(isCheapest)}
            >
              <Popup>
                <div className="text-sm font-sans flex flex-col p-1">
                  <strong className="text-base">{pharmacy.pharmacy_name}</strong>
                  <span className="text-muted-foreground mt-0.5 text-xs flex items-center">
                    {pharmacy.distance_km} km away
                  </span>
                  <div className="mt-2 pt-2 border-t border-border/50 flex justify-between items-center w-full">
                     <span className={`font-bold text-lg ${isCheapest ? 'text-emerald-600' : 'text-foreground'}`}>
                        ₹{pharmacy.total_price.toFixed(2)}
                     </span>
                     {isCheapest && <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.5 rounded-sm uppercase tracking-wide font-bold ml-3">Best</span>}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
