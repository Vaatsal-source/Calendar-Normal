"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const Scene = ({ monthShader }) => {
  const meshRef = useRef();
  const { viewport } = useThree();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2() },
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
      meshRef.current.material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        key={monthShader} // Forces re-compile when month changes
        fragmentShader={monthShader}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export default function CosmicBackground({ monthIndex }) {
  const shader = getShaderForMonth(monthIndex);
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Scene monthShader={shader} />
      </Canvas>
    </div>
  );
}

// 2. The Shader Library (Mapping)
function getShaderForMonth(index) {
  const shaders = [
    pillarsOfCreation, 
    binaryHeartbeat,   
    protostellar,      
    ton618,             
    helixNebula,       
    solarMax,          
    blueHypergiant,    
    supernova,         
    spiralAndromeda,   
    pulsar,            
    darkNebula,        
    cosmicBackground
  ];   
  return shaders[index] || ton618;
}
const ton618 = `
  varying vec2 vUv;
  uniform float uTime;
  void main() {
    vec2 uv = vUv - 0.5;
    float dist = length(uv);
    float angle = atan(uv.y, uv.x);
    float ring = smoothstep(0.1, 0.12, dist) * smoothstep(0.25, 0.22, dist);
    float noise = sin(angle * 10.0 + uTime * 2.0 + dist * 50.0);
    vec3 color = mix(vec3(0.0), vec3(1.0, 0.4, 0.0), ring * noise);
    gl_FragColor = vec4(color, 1.0);
  }
`;
const pulsar = `
  varying vec2 vUv;
  uniform float uTime;
  void main() {
    vec2 uv = vUv - 0.5;
    float beam = smoothstep(0.02, 0.0, abs(uv.x * cos(uTime) - uv.y * sin(uTime)));
    float core = 0.01 / length(uv);
    vec3 color = vec3(0.5, 0.2, 1.0) * (beam + core);
    gl_FragColor = vec4(color, 1.0);
  }
`;
const solarMax = `
  varying vec2 vUv;
  uniform float uTime;
  void main() {
    vec2 uv = vUv - 0.5;
    float d = length(uv);
    float plasma = sin(d * 40.0 - uTime * 5.0) * 0.5 + 0.5;
    vec3 color = mix(vec3(0.8, 0.1, 0.0), vec3(1.0, 0.8, 0.0), plasma);
    color *= smoothstep(0.4, 0.2, d);
    gl_FragColor = vec4(color, 1.0);
  }
`;
// January - Pillars of Creation (Gas Clouds)
const pillarsOfCreation = `
  varying vec2 vUv;
  uniform float uTime;
  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    float n = sin(uv.x * 3.0 + uTime * 0.2) * cos(uv.y * 2.0 - uTime * 0.1);
    vec3 color = mix(vec3(0.05, 0.1, 0.1), vec3(0.4, 0.2, 0.1), n + 0.5);
    color += 0.01 / length(uv - vec2(0.2, 0.3)); // Distant star flicker
    gl_FragColor = vec4(color, 1.0);
  }
`;

// February - Binary Heartbeat
const binaryHeartbeat = `
  varying vec2 vUv;
  uniform float uTime;
  void main() {
    vec2 uv = vUv - 0.5;
    vec2 p1 = vec2(sin(uTime), cos(uTime)) * 0.2;
    vec2 p2 = vec2(sin(uTime + 3.14), cos(uTime + 3.14)) * 0.2;
    float s1 = 0.02 / length(uv - p1);
    float s2 = 0.02 / length(uv - p2);
    vec3 color = vec3(1.0, 0.4, 0.2) * s1 + vec3(0.2, 0.6, 1.0) * s2;
    gl_FragColor = vec4(color, 1.0);
  }
`;

// March - Protostellar Disk
const protostellar = `
  varying vec2 vUv;
  uniform float uTime;
  void main() {
    vec2 uv = vUv - 0.5;
    float d = length(uv);
    float ring = smoothstep(0.2, 0.21, d) * smoothstep(0.35, 0.34, d);
    float glow = 0.05 / abs(d - 0.25);
    vec3 color = vec3(1.0, 0.6, 0.2) * (ring + glow * 0.5);
    gl_FragColor = vec4(color, 1.0);
  }
`;

// May - Helix Nebula
const helixNebula = `
  varying vec2 vUv;
  uniform float uTime;
  void main() {
    vec2 uv = vUv - 0.5;
    float d = length(uv);
    float eye = smoothstep(0.1, 0.4, d) * smoothstep(0.6, 0.4, d);
    vec3 color = mix(vec3(0.0, 0.2, 0.2), vec3(0.8, 0.1, 0.0), eye);
    gl_FragColor = vec4(color, 1.0);
  }
`;

// July - Blue Hypergiant
const blueHypergiant = `
  varying vec2 vUv;
  uniform float uTime;
  void main() {
    vec2 uv = vUv - 0.5;
    float star = 0.05 / length(uv);
    float rays = pow(max(0.0, 1.0 - abs(uv.x) * abs(uv.y) * 1000.0), 2.0);
    vec3 color = vec3(0.3, 0.6, 1.0) * (star + rays);
    gl_FragColor = vec4(color, 1.0);
  }
`;

// August - Supernova Remnant
const supernova = `
  varying vec2 vUv;
  uniform float uTime;
  void main() {
    vec2 uv = vUv - 0.5;
    float d = length(uv);
    float noise = sin(atan(uv.y, uv.x) * 12.0 + uTime * 4.0);
    float burst = smoothstep(0.1, 0.5, d * (1.0 + noise * 0.2)) * smoothstep(0.6, 0.4, d);
    vec3 color = vec3(0.9, 0.3, 0.1) * burst;
    gl_FragColor = vec4(color, 1.0);
  }
`;

// September - Spiral Andromeda
const spiralAndromeda = `
  varying vec2 vUv;
  uniform float uTime;
  void main() {
    vec2 uv = vUv - 0.5;
    float r = length(uv);
    float theta = atan(uv.y, uv.x) - r * 10.0 + uTime * 0.5;
    float spiral = smoothstep(0.2, 0.0, abs(sin(theta * 2.0)));
    vec3 color = vec3(0.4, 0.2, 0.8) * spiral / (r + 0.1);
    gl_FragColor = vec4(color, 1.0);
  }
`;

// November - Dark Nebula
const darkNebula = `
  varying vec2 vUv;
  uniform float uTime;
  void main() {
    vec2 uv = vUv - 0.5;
    float stars = fract(sin(dot(uv, vec2(12.98, 78.23))) * 43758.54);
    float dust = smoothstep(0.2, 0.5, length(uv + vec2(sin(uTime*0.1)*0.2)));
    vec3 color = vec3(stars * 0.5) * dust;
    gl_FragColor = vec4(color, 1.0);
  }
`;

// December - Cosmic Microwave Background
const cosmicBackground = `
  varying vec2 vUv;
  uniform float uTime;
  void main() {
    vec2 uv = vUv;
    float noise = fract(sin(dot(uv + uTime*0.01, vec2(12.9, 78.2))) * 437.5);
    vec3 color = mix(vec3(0.05, 0.02, 0.1), vec3(0.2, 0.15, 0.05), noise);
    gl_FragColor = vec4(color, 1.0);
  }
`;