import { BaseGestureConfig, ContinousBaseGesture } from './gesture';
import { PanGestureConfig, PanGestureHandlerEventPayload } from '../PanGestureHandler';
export declare class PanGesture extends ContinousBaseGesture<PanGestureHandlerEventPayload> {
    config: BaseGestureConfig & PanGestureConfig;
    constructor();
    activeOffsetY(offset: number | number[]): this;
    activeOffsetX(offset: number | number[]): this;
    failOffsetY(offset: number | number[]): this;
    failOffsetX(offset: number | number[]): this;
    minPointers(minPointers: number): this;
    maxPointers(maxPointers: number): this;
    minDistance(distance: number): this;
    minVelocity(velocity: number): this;
    minVelocityX(velocity: number): this;
    minVelocityY(velocity: number): this;
    averageTouches(value: boolean): this;
    enableTrackpadTwoFingerGesture(value: boolean): this;
}
export declare type PanGestureType = InstanceType<typeof PanGesture>;
