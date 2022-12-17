/* eslint-disable jsx-a11y/iframe-has-title */
import { Html, OrbitControls, useTexture } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import openSocket from "socket.io-client";
import { DoubleSide, Vector3 } from "three";
import image from "./assets/cinema360.jpg";

function Model(props) {
  const group = useRef();

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation-x={-0.525} position={[5, 4, -20]}>
        <group position={[-1, 1, -1]} rotation={[Math.PI / 2, 0, 0]}>
          <Html rotation-x={-20} position={[-5, 1, -1]} transform occlude>
            <iframe
              src="https://drive.google.com/file/d/1ORTDlrnqSrwE3nGa-i6HPN9YP9xSrS_0/preview" 
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
  // useState é um Hook do React que permite armazenar dados no estado do componente
  const [socket, setSocket] = useState(null); // armazena a conexão socket.io
  const [message, setMessage] = useState(""); // armazena a mensagem que será enviada

  // useEffect é um Hook do React que permite executar uma função quando determinado estado do componente mudar
  useEffect(() => {
    // cria uma nova conexão socket.io com o servidor
    const newSocket = openSocket(
      "https://297f-2804-954-636-1f00-4941-c19d-b476-ab13.ngrok.io"
    );

    newSocket.on("connection", () => {
      // console.log(data);
    });

    // define uma função que será chamada quando receber uma nova mensagem pelo websocket
    newSocket.on("message", (data) => {
      console.log(data);
    });

    // armazena a conexão socket no estado do componente para poder usá-la mais tarde
    setSocket(newSocket);
  }, []); // o segundo argumento do useEffect é uma lista de dependências, que determina quando a função será executada

  // função para enviar a mensagem armazenada no estado do componente pelo websocket
  const sendMessage = () => {
    socket.emit("message", message);
  };

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
