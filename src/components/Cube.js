import React, {useState} from 'react';
import {useBox} from 'use-cannon'
import * as textures from "../textures"
import {useRecoilState, useRecoilValue} from "recoil";
import {cubesState, textureState} from "../recoil/atoms";

const Cube = ({position, texture, ...props}) => {
  const color = texture === 'glass' ? 'skyblue' : 'white';
  const [hover, setHover] = useState(null)
  const [cubes, setCubes] = useRecoilState(cubesState)
  const textureActive = useRecoilValue(textureState)
  const [ref] = useBox(() => ({
    type: "Static",
    position,
    ...props,
  }))

  const addCube = (x, y, z) => {
    setCubes((oldCubesState) => [
      ...oldCubesState,
      {pos: [x, y, z], texture: textureActive}
    ])
  }

  const removeCube = (x, y, z) => {
    setCubes(cubes.filter(({ pos }) =>
      pos[0] !== x ||
      pos[1] !== y ||
      pos[2] !== z
    ))
  }

  return <mesh
    castShadow
    ref={ref}
    onPointerMove={(e) => {
      e.stopPropagation();
      setHover(Math.floor(e.faceIndex / 2));
    }}
    onPointerOut={() => {
      setHover(null)
    }}
    onClick={(e) => {
      e.stopPropagation();
      const clicked = Math.floor(e.faceIndex / 2);
      const {x, y, z} = ref.current.position;

      if (clicked === 0) {
        e.altKey ? removeCube(x, y, z) : addCube(x + 1, y, z);
        return;
      }
      if (clicked === 1) {
        e.altKey ? removeCube(x, y, z) : addCube(x - 1, y, z);
        return;
      }
      if (clicked === 2) {
        e.altKey ? removeCube(x, y, z) : addCube(x, y + 1, z);
        return;
      }
      if (clicked === 3) {
        e.altKey ? removeCube(x, y, z) : addCube(x, y - 1, z);
        return;
      }
      if (clicked === 4) {
        e.altKey ? removeCube(x, y, z) : addCube(x, y, z + 1);
        return;
      }
      if (clicked === 5) {
        e.altKey ? removeCube(x, y, z) : addCube(x, y, z - 1);
        return;
      }
    }}
  >
    {[...Array(6)].map((_, index) => (
        <meshStandardMaterial
          key={index}
          attachArray="material"
          map={textures[texture]}
          color={hover != null ? 'gray' : color}
          opacity={texture === "glass" ? 0.7 : 1}
          transparent={true}
        />
      ))}
    <boxBufferGeometry attach="geometry"/>
  </mesh>
};

export default Cube;
