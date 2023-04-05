import { Asset } from 'expo-asset';

class Image {
    readonly module: string;
    readonly width: number;
    readonly height: number;

    constructor(module: string, width: number, height: number) {
        console.log(module);
        this.module = module;
        this.width = width;
        this.height = height;
        Asset.fromModule(this.module).downloadAsync();
    }
}

export const StartScreenImg = require('../../assets/images/Saly-12.png');
