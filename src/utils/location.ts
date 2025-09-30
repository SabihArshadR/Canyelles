export interface POI {
    id: number;
    name: string;
    lat: number;
    lng: number;
    radius: number;
}

export const POIs: POI[] = [
    { id: 1, name: "POI1", lng: 2.549996, lat: 42.219238, radius: 5 },
    { id: 2, name: "POI2", lng: 2.5498370, lat: 42.2184680, radius: 5 },
    { id: 3, name: "POI3", lng: 2.5517330, lat: 42.2187250, radius: 5 },
    { id: 4, name: "POI4", lng: 2.5548110, lat: 42.2185920, radius: 5 },
    { id: 5, name: "POI5", lng: 2.5542180, lat: 42.2181270, radius: 5 },
    { id: 6, name: "POI6", lng: 2.5560840, lat: 42.2194170, radius: 5 },
    { id: 7, name: "POI7", lng: 2.554702, lat: 42.219812, radius: 5 },
    { id: 8, name: "POI8", lng: 2.553553, lat: 42.220911, radius: 5 },
    { id: 9, name: "POI9", lng: 2.549996, lat: 42.219238, radius: 5 }
    // { id: 1, name: "POI1", lng: 1.724675, lat: 41.214502, radius: 5 },
    // { id: 2, name: "POI2", lng: 1.725477, lat: 41.214584, radius: 5 },
    // { id: 3, name: "POI3", lng: 1.725301, lat: 41.214864, radius: 5 },
    // { id: 4, name: "POI4", lng: 1.725156, lat: 41.215096, radius: 5 },
    // { id: 5, name: "POI5", lng: 1.725007, lat: 41.215348, radius: 5 },
    // { id: 6, name: "POI6", lng: 1.724870, lat: 41.215550, radius: 5 },
    // { id: 7, name: "POI7", lng: 1.724686, lat: 41.215899, radius: 5 },
    // { id: 8, name: "POI8", lng: 1.724577, lat: 41.216091, radius: 5 },
    // { id: 9, name: "POI9", lng: 1.724400, lat: 41.216293, radius: 5 }
];
