import { useState, useMemo } from "react";
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
  const [copySuccess, setCopySuccess] = useState(false);
  const [pasteSuccess, setPasteSuccess] = useState(false);

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
    try {
      const voyageRouteData = JSON.parse(data);
      const geoJSON = convertToGeoJSON(voyageRouteData);
      if (!geoJSON) return;
      setGeoJsonCode(geoJSON);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Invalid JSON input. Please check your data format.");
      }
    }
  };

  const handleCopy = async () => {
    if (!geoJsonCode) return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(geoJsonCode, null, 2));
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Failed to copy to clipboard");
      }
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setData(text);
      setPasteSuccess(true);
      setTimeout(() => setPasteSuccess(false), 2000);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Failed to paste from clipboard");
      }
    }
  };

  const formattedGeoJson = useMemo(() => {
    if (!geoJsonCode) return "";
    return JSON.stringify(geoJsonCode, null, 2);
  }, [geoJsonCode]);

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-bold text-white">Input JSON</h4>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 text-sm bg-gray-300 rounded-md hover:bg-gray-400 text-gray-800"
              onClick={handlePaste}
            >
              Paste from Clipboard
            </button>
            {pasteSuccess && (
              <span className="text-sm text-green-500">
                Pasted successfully!
              </span>
            )}
          </div>
        </div>
        <textarea
          rows={15}
          className="w-full p-5 font-mono text-sm border rounded-md bg-black"
          placeholder="Paste your VoyageRouteData JSON here..."
          value={data}
          onChange={(e) => setData(e.target.value)}
          spellCheck={false}
        ></textarea>
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          onClick={handleConvert}
        >
          Convert to GeoJSON
        </button>
      </div>

      {geoJsonCode && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-bold text-white">GeoJSON Output</h4>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 text-sm bg-gray-300 rounded-md hover:bg-gray-400 text-gray-800"
                onClick={handleCopy}
              >
                Copy to Clipboard
              </button>
              {copySuccess && (
                <span className="text-sm text-green-500">
                  Copied successfully!
                </span>
              )}
            </div>
          </div>
          <pre className="w-full p-5 bg-black text-white rounded-md overflow-auto font-mono text-sm border max-h-[500px]">
            {formattedGeoJson}
          </pre>
          <div className="flex items-center gap-4">
            <div className="mt-4">
              <h1 className="text-white">Invalid Coordinates Count</h1>
              {/* <pre>{findInvalidCoordinates()?.length}</pre> */}
            </div>
            <div className="mt-4">
              <h1 className="text-white">Duplicate Coordinates Count</h1>
              {/* <pre>{findDuplicateCoordinates()?.length}</pre> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
