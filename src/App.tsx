import { useEffect, useState } from "react";
import "./App.css";
import { VoyageRouteData } from "./models";

interface GeoJSON {
  type: string;
  geometry: {
    type: string;
    coordinates: number[][];
  };
  properties: object;
}

function App() {
  const [geoJsonCode, setGeoJsonCode] = useState<GeoJSON>();
  const [data, setData] = useState<string>();

  // Function to convert VoyageRouteData to GeoJSON
  const convertToGeoJSON = (voyageRouteData: VoyageRouteData) => {
    if (
      !voyageRouteData ||
      !voyageRouteData.intermediatePorts ||
      !voyageRouteData.projectedRoute ||
      !voyageRouteData.intermediatePosition ||
      !voyageRouteData.fromPort ||
      !voyageRouteData.toPort
    )
      return;

    const coordinates: number[][] = [];

    // Add intermediatePosition coordinates
    voyageRouteData.intermediatePosition.forEach((position) => {
      coordinates.push([position.longitude, position.latitude]);
    });

    // Add intermediatePosition coordinates
    voyageRouteData.projectedRoute.forEach((position) => {
      coordinates.push([position.longitude, position.latitude]);
    });

    // Construct GeoJSON LineString
    const geoJSON = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: coordinates,
      },
      properties: {},
    };

    return geoJSON;
  };

  const handleConvert = () => {
    if (!data) return;
    const voyageRouteData = JSON.parse(data);
    const geoJSON = convertToGeoJSON(voyageRouteData);
    if (!geoJSON) return;
    setGeoJsonCode(geoJSON);
  };

  return (
    <div className="p-5">
      <h4 className="mb-2 text-lg font-bold">Input</h4>
      <textarea
        rows={10}
        className="w-full p-5"
        value={data}
        onChange={(e) => setData(e.target.value)}
      ></textarea>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={handleConvert}
      >
        Convert
      </button>

      {geoJsonCode && (
        <>
          <h4 className="mb-2 text-lg font-bold">Output</h4>
          <textarea
            rows={20}
            className="w-full p-5"
            value={JSON.stringify(geoJsonCode, null, 2)}
            onChange={(e) => setGeoJsonCode(JSON.parse(e.target.value))}
            readOnly
          ></textarea>
          <div className="flex items-center gap-4">
            <div className="mt-4">
              <h1>Invalid Coordinates Count</h1>
              {/* <pre>{findInvalidCoordinates()?.length}</pre> */}
            </div>
            <div className="mt-4">
              <h1>Duplicate Coordinates Count</h1>
              {/* <pre>{findDuplicateCoordinates()?.length}</pre> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
