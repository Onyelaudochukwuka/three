import { Environment, OrbitControls, PerspectiveCamera, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { angleToRadians } from "../../utils/angle";
import * as THREE from "three";
import Car from './car';
import Ball from "./ball";
const Three = () => {
    const [position, setPosition] = useState([3, 0.65, 0]);
    const [array, setArray] = useState([1]);
    const [score, setScore] = useState(0)

    const OrbitControlsEl = useRef();
    useFrame((state) => {
            const { x, y } = state.mouse;
            setPosition([-x * 10, 0.65, y * 10]);
    },[])
    useEffect(() => {
        const interval = setInterval(() => {
            setArray((prev) => [...prev, 1]);
            setScore((prev) => prev + 10);
        }, 5000);
        return () => clearInterval(interval);
    }, []);


  return (
      <>
          <Html style={{top:0,position:'absolute', display: 'flex', flex: 1, justifyContent: 'center', minHeight: '10vh', minWidth: '60vw' }}>
              <div style={{ fontSize: 50, fontWeight: 600, zIndex: -1,userSelect: 'none' }}>{score}</div>
          </Html>
          <PerspectiveCamera makeDefault position={[0, 15, -15]} />
          <OrbitControls ref={OrbitControlsEl} minPolarAngle={angleToRadians(60)} maxPolarAngle={angleToRadians(90)} />


          {/* Ball */}
          <group>
          {array.map((a,i) =>
              <Ball key={i} pow={i} position={position} />
              )}
          </group>
          {/* Car */}
          <Car position={position} castShadow/>
          {/* Floor */}
          <mesh rotation={[-(angleToRadians(90)), 0, 0]} scale={100} receiveShadow>
              <planeGeometry args={[20, 20]} />
              <meshStandardMaterial color="#1ea3d8"/>
          </mesh>

          {/* Ambient Light */}
          <ambientLight args={["#ffffff", 0.35]} />

          {/* SpotLight */}
          <spotLight args={["#ffffff", 3.5, 1590, angleToRadians(45), 0.4, -50]} position={[0, 1, 60]} castShadow />
          
          {/* Environment */}
          <Environment background>
              <mesh>
              <sphereGeometry args={[50, 100, 100]} />
                  <meshBasicMaterial side={THREE.BackSide} color="#2280cc" />
              </mesh>
          </Environment>
      </>
  )
}

export default Three;