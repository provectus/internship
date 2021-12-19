import { ContinousBaseGesture } from './gesture';
import { RotationGestureHandlerEventPayload } from '../RotationGestureHandler';
export declare class RotationGesture extends ContinousBaseGesture<RotationGestureHandlerEventPayload> {
    constructor();
}
export declare type RotationGestureType = InstanceType<typeof RotationGesture>;
