import type { Container } from "./Container";
import type { Particle } from "./Particle";
export declare class Retina {
    private readonly container;
    bubbleModeDistance: number;
    bubbleModeSize?: number;
    connectModeDistance: number;
    connectModeRadius: number;
    grabModeDistance: number;
    repulseModeDistance: number;
    slowModeRadius: number;
    linksDistance: number;
    linksWidth: number;
    moveSpeed: number;
    sizeValue: number;
    sizeAnimationSpeed: number;
    pixelRatio: number;
    constructor(container: Container);
    init(): void;
    initParticle(particle: Particle): void;
}
