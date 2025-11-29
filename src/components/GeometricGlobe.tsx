import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GlobeProps {
  color?: string;
}

function LowPolyGlobe({ color = "#ffffff" }: GlobeProps) {
  const meshRef = useRef<THREE.Group>(null);
  
  // Create icosahedron geometry for low-poly look
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1, 1), []);
  
  // Extract vertices for node points
  const nodePositions = useMemo(() => {
    const positions = geometry.attributes.position;
    const nodes: THREE.Vector3[] = [];
    const uniquePositions = new Set<string>();
    
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = positions.getZ(i);
      const key = `${x.toFixed(3)},${y.toFixed(3)},${z.toFixed(3)}`;
      
      if (!uniquePositions.has(key)) {
        uniquePositions.add(key);
        nodes.push(new THREE.Vector3(x, y, z));
      }
    }
    return nodes;
  }, [geometry]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Shadow/background mesh */}
      <mesh geometry={geometry} position={[0.05, -0.05, -0.1]}>
        <meshBasicMaterial color={color} wireframe opacity={0.15} transparent />
      </mesh>
      
      {/* Main wireframe mesh */}
      <mesh geometry={geometry}>
        <meshBasicMaterial color={color} wireframe opacity={0.6} transparent />
      </mesh>
      
      {/* Node points at vertices */}
      {nodePositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color={color} opacity={0.9} transparent />
        </mesh>
      ))}
      
      {/* Glowing central node */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color={color} opacity={1} />
      </mesh>
    </group>
  );
}

export default function GeometricGlobe({ color = "#ffffff" }: GlobeProps) {
  return (
    <div className="absolute -right-8 -bottom-8 w-32 h-32 opacity-40 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <LowPolyGlobe color={color} />
      </Canvas>
    </div>
  );
}
