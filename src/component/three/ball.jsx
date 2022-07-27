import React, { useEffect, useRef, useState } from 'react';
import gsap from "gsap";
const Ball = ({pow,position}) => {
    const ballRef = useRef();
    const [x, setX] = useState((Math.floor(Math.random()) % 2 == 0 ? -Math.random() * 5 : Math.random() * 5))
    useEffect(() => {
        if (ballRef.current) {
            //timeline
            const timeline = gsap.timeline();
            // x-axis motion
            timeline.to(ballRef.current.position, {
                z: -60,
                duration: 7.5 * Math.pow(0.99,pow),
                ease: "power2.out"
            });

            // y-axis motion
            timeline.to(ballRef.current.position, {
                y: 1.9,
                duration: 1,
                ease: "bounce.out"
            }, "<"),

                timeline.to(ballRef.current.position, {
                    x: x,
                    duration: 1,
                    ease: "bounce.out"
                }, "<"),
            


                // Play
                timeline.play()
        }
    }, [ballRef.current,position])
  return (
      <mesh position={[0, 2.5, 60]} scale={4} castShadow ref={ballRef}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#ffffff" metalness={0.75} roughness={0.3} />
      </mesh>
  )
}

export default Ball;