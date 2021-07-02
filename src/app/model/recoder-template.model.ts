import { StationInfo } from "./station-info";

export class RecoderTemplate {
    location: string;
    info: StationInfo;
    
    constructor(location: string, info: StationInfo) {
        this.location = location;
        this.info = info;
    }
}