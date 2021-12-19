import { BaseGestureConfig, ContinousBaseGesture } from './gesture';
import { ForceTouchGestureConfig, ForceTouchGestureHandlerEventPayload } from '../ForceTouchGestureHandler';
export declare class ForceTouchGesture extends ContinousBaseGesture<ForceTouchGestureHandlerEventPayload> {
    config: BaseGestureConfig & ForceTouchGestureConfig;
    constructor();
    minForce(force: number): this;
    maxForce(force: number): this;
    feedbackOnActivation(value: boolean): this;
}
export declare type ForceTouchGestureType = InstanceType<typeof ForceTouchGesture>;
