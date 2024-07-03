import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const initialPosition = [59.372972225392466, 18.69869029448855];

const MapPage = () => {
  const [markers, setMarkers] = useState([]);
  const [newMarker, setNewMarker] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addMarker = (e) => {
    setNewMarker(e.latlng);
  };

  const saveMarker = () => {
    setMarkers([...markers, { position: newMarker, title, description }]);
    setNewMarker(null);
    setTitle("");
    setDescription("");
  };

  const cancelMarker = () => {
    setNewMarker(null);
    setTitle("");
    setDescription("");
  };

  const MapEvents = () => {
    useMapEvents({
      click: addMarker,
    });
    return null;
  };

  return (
    <div className="relative h-full w-full">
      <MapContainer center={initialPosition} zoom={13} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position} icon={L.icon({ iconUrl: "/images/kayak-logo.png", iconSize: [25, 25] })}>
            <Popup>
              <h3>{marker.title}</h3>
              <p>{marker.description}</p>
            </Popup>
          </Marker>
        ))}
        {newMarker && (
          <Marker position={newMarker} icon={L.icon({ iconUrl: "/images/kayak-logo.png", iconSize: [25, 25] })}>
            <Popup>
              <div>
                <Input
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mb-2"
                />
                <Textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mb-2"
                />
                <Button onClick={saveMarker} className="mr-2">Save</Button>
                <Button variant="outline" onClick={cancelMarker}>Cancel</Button>
              </div>
            </Popup>
          </Marker>
        )}
        <MapEvents />
      </MapContainer>
    </div>
  );
};

export default MapPage;