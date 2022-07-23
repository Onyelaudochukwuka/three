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
            OrbitControlsEl.current.setPolarAngle((y+1) * angleToRadians(90 - 30));
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
          
          {/* Ball */}
          <mesh position={[0,0.5,0]} castShadow>
              <sphereGeometry args={[0.5, 32, 32]} />
              <meshStandardMaterial color="#fff"/>
          </mesh>

          {/* Floor */}
          <mesh rotation={[-(angleToRadians(90)), 0, 0]} receiveShadow>
              <planeGeometry args={[7, 7]} />
              <meshPhongMaterial color="#1ea3d8"/>
          </mesh>

          {/* Ambient Light */}
          <ambientLight args={["#ffffff", 0.25]} />

          {/* SpotLight */}
          <spotLight args={["#ffffff", 1.5,7,angleToRadians(45),0.4]} position={[-3, 1, 0]} castShadow/>
      </>
  )
}

export default Three;