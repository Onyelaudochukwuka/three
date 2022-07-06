import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { angleToRadians } from "../../utils/angle";
const Three = () => {
    const OrbitControlsEl = useRef();
    useFrame((state) => {
        if (OrbitControlsEl.current) {
            const { x, y } = state.mouse;
            OrbitControlsEl.current.setAzimuthalAngle(-x * angleToRadians(45));
            OrbitControlsEl.current.setPolarAngle((y+0.5) * angleToRadians(90 - 30));
            OrbitControlsEl.current.update();
        }
    })
    
    useEffect(() => {
        console.log()
    },[OrbitControlsEl.current])
  return (
      <>
          <PerspectiveCamera makeDefault position={[0, 1, 5]} />
          <OrbitControls ref={OrbitControlsEl} minPolarAngle={angleToRadians(40)} maxPolarAngle={angleToRadians(80)} />
          <mesh position={[0,0.5,0]}>
              <sphereGeometry args={[0.5, 32, 32]} />
              <meshStandardMaterial color="#222"/>
          </mesh>
          <mesh rotation={[-(angleToRadians(90)), 0, 0]} >
              <planeGeometry args={[7, 7]} />
              <meshStandardMaterial color="#eee"/>
      </mesh>
          <ambientLight args={["#ffffff", 1]} />
      </>
  )
}

export default Three;