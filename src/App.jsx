import { Canvas } from '@react-three/fiber'
import { Suspense } from "react";
import Three from './component/three'
import './App.css'
import { Loader } from "./component/three/loader";

function App() {
  return (
    <Canvas id="three-canvas-container" shadows>
        <Suspense fallback={<Loader />}>
        <Three />
        </Suspense>
    </Canvas>
  )
}

export default App
