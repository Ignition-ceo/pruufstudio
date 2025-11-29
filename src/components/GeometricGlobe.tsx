import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface GlobeProps {
  color?: string;
}

function Globe({ color = "#ffffff" }: GlobeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group>
      {/* Main wireframe sphere */}
      <Sphere ref={meshRef} args={[1, 16, 16]}>
        <meshBasicMaterial color={color} wireframe opacity={0.4} transparent />
      </Sphere>
      
      {/* Inner sphere */}
      <Sphere args={[0.7, 12, 12]}>
        <meshBasicMaterial color={color} wireframe opacity={0.3} transparent />
      </Sphere>
      
      {/* Outer glow sphere */}
      <Sphere args={[1.1, 8, 8]}>
        <meshBasicMaterial color={color} wireframe opacity={0.2} transparent />
      </Sphere>
      
      {/* Node points */}
      {Array.from({ length: 8 }).map((_, i) => {
        const phi = Math.acos(-1 + (2 * i) / 8);
        const theta = Math.sqrt(8 * Math.PI) * phi;
        const x = Math.cos(theta) * Math.sin(phi);
        const y = Math.sin(theta) * Math.sin(phi);
        const z = Math.cos(phi);
        
        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color={color} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function GeometricGlobe({ color = "#ffffff" }: GlobeProps) {
  return (
    <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-40 h-40 opacity-30 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Globe color={color} />
      </Canvas>
    </div>
  );
}
