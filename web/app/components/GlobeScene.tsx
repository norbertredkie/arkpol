"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Line } from "@react-three/drei";
import * as THREE from "three";

const R = 1.6;
const NAVY = "#0d1b2a";
const STEEL = "#1b4f72";
const GOLD = "#c9a84c";

/* lat/lon (deg) → point on a sphere of radius r */
function ll(lat: number, lon: number, r = R) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

const ORIGIN = { name: "Warsaw", lat: 52.23, lon: 21.01 };
const CITIES = [
  { name: "Frankfurt", lat: 50.11, lon: 8.68 },
  { name: "Amsterdam", lat: 52.37, lon: 4.9 },
  { name: "New York", lat: 40.71, lon: -74.01 },
  { name: "Dubai", lat: 25.2, lon: 55.27 },
  { name: "Singapore", lat: 1.35, lon: 103.82 },
];

/* even dot distribution over the sphere (fibonacci) */
function DotSphere() {
  const geo = useMemo(() => {
    const N = 2600;
    const pts = new Float32Array(N * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const phi = i * golden;
      pts[i * 3] = Math.cos(phi) * rad * R;
      pts[i * 3 + 1] = y * R;
      pts[i * 3 + 2] = Math.sin(phi) * rad * R;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pts, 3));
    return g;
  }, []);
  return (
    <points geometry={geo}>
      <pointsMaterial color="#2f6da3" size={0.021} sizeAttenuation transparent opacity={0.85} />
    </points>
  );
}

/* rim-light atmosphere */
function Atmosphere() {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { glowColor: { value: new THREE.Color(GOLD) } },
        vertexShader: `varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: `varying vec3 vN; uniform vec3 glowColor; void main(){ float i = pow(0.62 - dot(vN, vec3(0.0,0.0,1.0)), 3.4); gl_FragColor = vec4(glowColor, 1.0) * clamp(i,0.0,1.0) * 0.85; }`,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
      }),
    []
  );
  return (
    <mesh scale={1.15} material={mat}>
      <sphereGeometry args={[R, 48, 48]} />
    </mesh>
  );
}

function Pin({ pos, size = 0.03 }: { pos: THREE.Vector3; size?: number }) {
  return (
    <mesh position={pos}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial color={GOLD} toneMapped={false} />
    </mesh>
  );
}

function Routes({ animate }: { animate: boolean }) {
  const start = useMemo(() => ll(ORIGIN.lat, ORIGIN.lon), []);
  const routes = useMemo(
    () =>
      CITIES.map((c, idx) => {
        const end = ll(c.lat, c.lon);
        const mid = start.clone().add(end).multiplyScalar(0.5);
        const lift = R + start.distanceTo(end) * 0.26;
        mid.normalize().multiplyScalar(lift);
        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        return { curve, points: curve.getPoints(70), end, offset: idx / CITIES.length };
      }),
    [start]
  );

  const pulses = useRef<(THREE.Mesh | null)[]>([]);
  useFrame((state) => {
    if (!animate) return;
    const t = state.clock.elapsedTime;
    routes.forEach((r, i) => {
      const m = pulses.current[i];
      if (!m) return;
      const u = (t * 0.16 + r.offset) % 1;
      m.position.copy(r.curve.getPointAt(u));
      const s = 0.6 + Math.sin(u * Math.PI) * 0.9;
      m.scale.setScalar(s);
    });
  });

  return (
    <group>
      <Pin pos={start} size={0.04} />
      {routes.map((r, i) => (
        <group key={i}>
          <Line points={r.points} color={GOLD} lineWidth={1.6} transparent opacity={0.75} />
          <Pin pos={r.end} size={0.026} />
          <mesh ref={(el) => { pulses.current[i] = el; }}>
            <sphereGeometry args={[0.022, 12, 12]} />
            <meshBasicMaterial color="#f4e3a8" toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Globe({ animate }: { animate: boolean }) {
  return (
    <group rotation={[0.15, 0, 0.41]}>
      {/* dark body occludes back-facing dots */}
      <mesh>
        <sphereGeometry args={[R * 0.985, 64, 64]} />
        <meshBasicMaterial color={NAVY} />
      </mesh>
      <DotSphere />
      <Routes animate={animate} />
      <Atmosphere />
    </group>
  );
}

export default function GlobeScene({ reduced = false }: { reduced?: boolean }) {
  // R3F can mount before its container is measured (esp. via dynamic import);
  // nudge a resize after mount so the canvas sizes to its box.
  useEffect(() => {
    const fire = () => window.dispatchEvent(new Event("resize"));
    const r1 = requestAnimationFrame(fire);
    const t = setTimeout(fire, 150);
    return () => {
      cancelAnimationFrame(r1);
      clearTimeout(t);
    };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0.6, 11], fov: 34 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <Stars radius={60} depth={40} count={1400} factor={3} saturation={0} fade speed={reduced ? 0 : 0.6} />
      <Globe animate={!reduced} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={!reduced}
        autoRotateSpeed={0.45}
        rotateSpeed={0.4}
        minPolarAngle={Math.PI * 0.28}
        maxPolarAngle={Math.PI * 0.72}
      />
    </Canvas>
  );
}
