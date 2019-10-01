import { Recoder } from './recoder.model';

export class RecoderGroup {
  constructor(
    public location: string,
    public recoders: Recoder[]) {}
}