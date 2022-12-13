/* eslint-disable jsx-a11y/iframe-has-title */
import { Html, OrbitControls, useTexture } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { DoubleSide, Vector3 } from "three";
import image from "./assets/test123.jpg";

function Model(props) {
  const group = useRef();

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation-x={-0.525} position={[5, 4, -20]}>
        <group position={[-1, 1, -1]} rotation={[Math.PI / 2, 0, 0]}>
          <Html rotation-x={-20} position={[-5, 1, -1]} transform occlude>
            <iframe
              src="https://drive.google.com/file/d/1Eqs790sK5--jrDyYPhWiiyOYmTZfllPA/preview"
              width="1480"
              height="940"
              allow="autoplay"
              style={{ border: "none" }}
            ></iframe>
          </Html>
        </group>
      </group>
    </group>
  );
}

const Scene = () => {
  const texture = useTexture(image);
  const camera = useThree(({ camera }) => camera);

  return (
    <>
      <OrbitControls camera={camera} minZoom={1} maxZoom={2} />

      <mesh scale={new Vector3(-1, 1, 1)}>
        <sphereBufferGeometry args={[500, 60, 40]} />
        <meshBasicMaterial map={texture} side={DoubleSide} />
      </mesh>
    </>
  );
};

function App() {
  return (
    <div style={{ width: "100vW", height: "100vH", background: "#723983" }}>
      <Canvas
        camera={{
          near: 1,
          far: 1100,
          aspect: 16 / 9,
          fov: 80,
        }}
      >
        <Suspense fallback={null}>
          <Scene />
          <group rotation={[0, Math.PI, 0]} position={[0, 1, 0]}>
            <Model />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
