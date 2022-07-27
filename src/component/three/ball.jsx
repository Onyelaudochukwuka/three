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
    }, [ballRef.current])
  return (
      <mesh position={[-2, 2.5, 0]} {...props} castShadow ref={ballRef}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#ffffff" metalness={0.75} roughness={0.3} />
      </mesh>
  )
}

export default Ball;