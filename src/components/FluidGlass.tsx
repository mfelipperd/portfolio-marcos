"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Environment, Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function GlassBlob() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Animação sutil flutuante
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <mesh ref={meshRef} scale={2.5}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={1024}
          transmission={1}
          roughness={0.15}
          thickness={0.5}
          ior={1.5}
          chromaticAberration={0.06}
          anisotropy={0.3}
          distortion={0.3}
          distortionScale={0.5}
          temporalDistortion={0.1}
          clearcoat={1}
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
          color="#ffffff"
        />
      </mesh>
    </Float>
  );
}

interface FluidGlassProps {
  className?: string;
}

export default function FluidGlass({ className = "" }: FluidGlassProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <color attach="background" args={["transparent"]} />
        
        {/* Iluminação ambiente */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {/* Environment para reflexões */}
        <Environment preset="city" />
        
        {/* Blob de vidro fluido */}
        <GlassBlob />
      </Canvas>
    </div>
  );
}
