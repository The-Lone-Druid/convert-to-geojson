// Define the interfaces
export interface VoyageRouteData {
  fromPort: FromPort;
  toPort: ToPort;
  intermediatePosition: IntermediatePosition[];
  projectedRoute: any[];
  vesselOnMapDetail: VesselOnMapDetail;
  intermediatePorts: IntermediatePort[];
}

export interface FromPort {
  portId: string;
  portName: string;
  portFunction: string;
  longitude: number;
  latitude: number;
}

export interface ToPort {
  portId: string;
  portName: string;
  portFunction: string;
  longitude: number;
  latitude: number;
}

export interface IntermediatePosition {
  reportedTime?: string;
  course?: number;
  routeType: number;
  isFromSeaRoute: boolean;
  speed: any;
  events: any[];
  longitude: number;
  latitude: number;
}

export interface VesselOnMapDetail {
  currentPosition: CurrentPosition;
  vessel: Vessel;
  fromPort: string;
  toPort: string;
  commenceDate: string;
  completeDate: string;
  speed: string;
  course: string;
  eta: string;
  events: any[];
  distributionPoolId: any;
  distributionPoolIds: string[];
  segment: string;
  pool: string;
  participantId: any;
  participant: string;
  country: string;
  countryCode: string;
  voyageId: string;
  voyageNumber: number;
  voyageCode: string;
  status: string;
  colorByPerformance: string;
  imoNumber: string;
  speedPercentage: number;
  lastPositionUpdateFromSeaRoute: string;
  draft: number;
}

export interface CurrentPosition {
  longitude: number;
  latitude: number;
}

export interface Vessel {
  vesselId: string;
  vesselName: string;
}

export interface IntermediatePort {
  portId: any;
  portName: string;
  portFunction: string;
  longitude: number;
  latitude: number;
}
