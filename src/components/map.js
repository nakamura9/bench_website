import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"


export default function LeafletMap(props) {
    return (
        <div>
            <MapContainer center={[props.long, props.lat]} zoom={15} style={{width: "100%", height:"250px"}} >
            <TileLayer
                attribution={`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[props.long, props.lat]}>
                    
                </Marker>
            </MapContainer>
        </div>
    )
}