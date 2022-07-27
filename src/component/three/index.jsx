import { Environment, OrbitControls, PerspectiveCamera, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { angleToRadians } from "../../utils/angle";
import * as THREE from "three";
import gsap from "gsap";
import car from './car';
const Three = () => {
    const OrbitControlsEl = useRef();
    useFrame((state) => {
        if (OrbitControlsEl.current) {
            const { x, y } = state.mouse;
            OrbitControlsEl.current.setAzimuthalAngle(-x * angleToRadians(45));
            OrbitControlsEl.current.setPolarAngle((y + 1) * angleToRadians(90 - 30));
            OrbitControlsEl.current.update();
        }
    })

    // Animation

    const ballRef = useRef();
    useEffect(() => {
        if (ballRef.current) {

            //timeline
            const timeline = gsap.timeline();
            // x-axis motion
            timeline.to(ballRef.current.position, {
                x: 1,
                duration: 2,
                ease: "power2.in"
            });

            // y-axis motion
            timeline.to(ballRef.current.position, {
                y: 0.5,
                duration: 1,
                ease: "bounce.out"
            }, "<"),
                
            
            
            // Play
            timeline.play()
        } 
    },[ballRef.current])
  return (
      <>
          <PerspectiveCamera makeDefault position={[0, 1, 5]} />
          <OrbitControls ref={OrbitControlsEl} minPolarAngle={angleToRadians(60)} maxPolarAngle={angleToRadians(80)} />
          
          {/* Ball */}
          <mesh position={[-2,2.5,0]} castShadow ref={ballRef}>
              <sphereGeometry args={[0.5, 32, 32]} />
              <meshStandardMaterial color="#ffffff" metalness={0.75} roughness={0.3} />
          </mesh>

          {/* Floor */}
          <mesh rotation={[-(angleToRadians(90)), 0, 0]} receiveShadow>
              <planeGeometry args={[20, 20]} />
              <meshStandardMaterial color="#1ea3d8"/>
          </mesh>

          {/* Ambient Light */}
          <ambientLight args={["#ffffff", 0.35]} />

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