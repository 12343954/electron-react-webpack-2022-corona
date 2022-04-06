import React, { useRef, useState, } from "react";
// import { Canvas, useFrame } from 'react-three-fiber';
// import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, useGLTF } from "@react-three/drei";

// function Box(props) {
//     const box = useRef();
//     useFrame(() => { box.current.rotation.x += 0.01 });
//     const [hovered, setHover] = useState(false);

//     return (
//         <mesh ref={box} onPointerOver={() => setHover(true)} {...props}
//             onPointerLeave={() => setHover(false)}>
//             <boxGeometry args={[2, 2, 2]} />
//             <meshStandardMaterial color={hovered ? "orange" : "hotpink"} />
//         </mesh>
//     )
// }


export default function U3DRoom() {
    return (
        <div>
            {/* <Canvas style={{ background: "#171717" }}>
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                <Stars />
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Box position={[10, 0, 0]} />
            </Canvas> */}
        </div>
    );
}