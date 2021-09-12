import {useRecoilBridgeAcrossReactRoots_UNSTABLE, useRecoilValue} from "recoil";
import React from "react";
import {Sky} from "drei";
import {Physics} from "use-cannon";
import {Ground} from "../components/Ground";
import {Player} from "../components/Player";
import Cube from "../components/Cube";
import {Canvas} from "react-three-fiber";
import {cubesState} from "../recoil/atoms";
import {setLocalStorage} from "../lib/helpers/localStorage";
import {useInterval} from "../lib/hooks/useInterval";
import {nanoid} from "nanoid";

const Bridge = () => {
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();
  const cubes = useRecoilValue(cubesState);

  useInterval(() => {
    setLocalStorage("world", cubes);
    console.log("saved")
  }, 10000)

  return (
    <Canvas shadowMap sRGB>
      <RecoilBridge>
        <Sky sunPosition={[100, 20, 100]}/>
        <ambientLight intensity={0.25}/>
        <pointLight castShadow intensity={0.7} position={[100, 100, 100]}/>
        <Physics gravity={[0, -30, 0]}>
          <Ground position={[0, 0.5, 0]}/>
          <Player position={[0, 3, 10]}/>
          {cubes && cubes.map((cube) =>
            <Cube key={nanoid()} position={cube.pos} texture={cube.texture}/>
          )}
        </Physics>
      </RecoilBridge>
    </Canvas>
  );
}

export default Bridge;
