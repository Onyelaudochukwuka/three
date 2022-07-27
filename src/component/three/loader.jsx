import { Html, useProgress } from '@react-three/drei'

export function Loader() {
    const { progress } = useProgress();
    console.log(progress)
    return <Html center style={{ backgroundColor: "#fff", display: 'flex', flex: 1, justifyContent: 'center', alignItems:'center', minHeight: '100vh', minWidth: '100vw', fontWeight:800}}>{progress} % loaded</Html>
}