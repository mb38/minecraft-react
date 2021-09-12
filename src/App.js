import React from 'react';
import {RecoilRoot} from "recoil";
import Bridge from "./hoc/Bridge";

function App() {
  return (
    <RecoilRoot>
      <Bridge />
    </RecoilRoot>
    )
}

export default App;
