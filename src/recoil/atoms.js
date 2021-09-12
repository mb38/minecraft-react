import { atom } from "recoil";
import {getLocalStorage} from "../lib/helpers/localStorage";

export const cubesState = atom({
  key: "CubesState",
  default: getLocalStorage("world") || [
    {pos: [0, 1, 0], texture: "wood"},
    {pos: [1, 1, 0], texture: "dirt"},
    {pos: [2, 1, 0], texture: "grass"},
    {pos: [-1, 1, 0], texture: "glass"},
    {pos: [-2, 1, 0], texture: "log"}
  ],
});

export const textureState = atom({
  key: "TextureState",
  default: "dirt",
});
