import { ContinousBaseGesture } from './gesture';
import { PinchGestureHandlerEventPayload } from '../PinchGestureHandler';
export declare class PinchGesture extends ContinousBaseGesture<PinchGestureHandlerEventPayload> {
    constructor();
}
export declare type PinchGestureType = InstanceType<typeof PinchGesture>;
