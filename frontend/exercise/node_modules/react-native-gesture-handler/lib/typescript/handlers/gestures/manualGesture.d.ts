import { ContinousBaseGesture } from './gesture';
export declare class ManualGesture extends ContinousBaseGesture<Record<string, never>> {
    constructor();
}
export declare type ManualGestureType = InstanceType<typeof ManualGesture>;
