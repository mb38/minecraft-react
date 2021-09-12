import React from 'react';
import { usePlane } from 'use-cannon';
import {LinearMipMapLinearFilter, NearestFilter, RepeatWrapping, TextureLoader} from "three";

import grass from '../images/grass.jpg';
import {useRecoilValue, useSetRecoilState,} from "recoil";
import {cubesState, textureState} from "../recoil/atoms";

export const Ground = (props) => {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  const texture = new TextureLoader().load(grass);
  const activeTexture = useRecoilValue(textureState)
  const setCubes = useSetRecoilState( cubesState )

  texture.magFilter = NearestFilter;
  texture.minFilter = LinearMipMapLinearFilter;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(100, 100);
  return (
    <mesh
      ref={ref}
      receiveShadow
      onClick={(e) => {
        e.stopPropagation();
        const [x, y, z] = Object.values(e.point).map((coord) =>
          Math.ceil(coord),
        );
        setCubes((oldCubesState) => [
          ...oldCubesState,
          {pos: [x, y, z], texture: activeTexture}
        ])
      }}
    >
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial map={texture} attach="material" />
    </mesh>
  );
};
