import { Environment, OrbitControls, PerspectiveCamera, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { angleToRadians } from "../../utils/angle";
import * as THREE from "three";
import gsap from "gsap";
import Car from './car';
const Three = () => {
    const [position, setPosition] = useState([3, 0.65, 0])
    const OrbitControlsEl = useRef();
    useFrame((state) => {
        if (OrbitControlsEl.current) {
            const { x, y } = state.mouse;
            setPosition([-x * 10, 0.65, y * 10]);
            console.log(position)
        }
    })
useEffect(() => {
  


}, [position])

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

          {/* Car */}
          <Car position={position} castShadow/>
          {/* Floor */}
          <mesh rotation={[-(angleToRadians(90)), 0, 0]} receiveShadow>
              <planeGeometry args={[20, 20]} />
              <meshStandardMaterial color="#1ea3d8"/>
          </mesh>

          {/* Ambient Light */}
          <ambientLight args={["#ffffff", 0.35]} />

          {/* SpotLight */}
          <spotLight args={["#ffffff", 1.5, 15, angleToRadians(45), 0.4]} position={[-3, 1, 0]} castShadow />
          
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