import React, { useEffect, useRef } from 'react';
import gsap from "gsap";
const Ball = (props) => {

    const ballRef = useRef();
    useEffect(() => {
        if (ballRef.current) {

            //timeline
            const timeline = gsap.timeline();
            // x-axis motion
            timeline.to(ballRef.current.position, {
                z: -60,
                duration: 7.5 * Math.pow(0.99,props.pow),
                ease: "power2.out"
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
    }, [ballRef.current])
  return (
      <mesh position={[0, 1, 60]} {...props} scale={4} castShadow ref={ballRef}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#ffffff" metalness={0.75} roughness={0.3} />
      </mesh>
  )
}

export default Ball;