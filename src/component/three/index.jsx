import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { angleToRadians } from "../../utils/angle";
const Three = () => {
    useFrame((state) => {
        
    })
  return (
      <>
          <PerspectiveCamera makeDefault position={[0, 1, 5]} />
          <OrbitControls />
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