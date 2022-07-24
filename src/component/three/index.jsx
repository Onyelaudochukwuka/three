import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { angleToRadians } from "../../utils/angle";
import * as THREE from "three";
import gsap from "gsap";
const Three = () => {

    const OrbitControlsEl = useRef();
    useFrame((state) => {
        if (OrbitControlsEl.current) {
            const { x, y } = state.mouse;
            OrbitControlsEl.current.setAzimuthalAngle(-x * angleToRadians(180));
            OrbitControlsEl.current.setPolarAngle((y + 1) * angleToRadians(90 - 60));
            OrbitControlsEl.current.update();
        }
    })

    // Animation

    const ballRef = useRef();
    useEffect(() => {
        if (ballRef.current) {
            // x-axis motion
            gsap.to(ballRef.current.position, {
                x: 2,
                duration: 2,
                ease: "power1"
            })
        } 
    },[ballRef.current])
  return (
      <>
          <PerspectiveCamera makeDefault position={[0, 1, 5]} />
          <OrbitControls ref={OrbitControlsEl} minPolarAngle={angleToRadians(60)} maxPolarAngle={angleToRadians(80)} />
          
          {/* Ball */}
          <mesh position={[-2,0.5,0]} castShadow ref={ballRef}>
              <sphereGeometry args={[0.5, 32, 32]} />
              <meshStandardMaterial color="#fff" metalness={0.75} roughness={0.3} />
          </mesh>

          {/* Floor */}
          <mesh rotation={[-(angleToRadians(90)), 0, 0]} receiveShadow>
              <planeGeometry args={[90, 90]} />
              <meshStandardMaterial color="#1ea3d8"/>
          </mesh>

          {/* Ambient Light */}
          <ambientLight args={["#ffffff", 0.25]} />

          {/* SpotLight */}
          <spotLight args={["#ffffff", 1.5, 7, angleToRadians(45), 0.4]} position={[-3, 1, 0]} castShadow />
          
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