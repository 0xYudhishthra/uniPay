import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const HomeView: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { connect, publicKey } = useWallet();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }

    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: "#888",
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);
    camera.position.z = 10;

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e: { clientX: any; clientY: any }) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      if (!isDragging) return;

      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y,
      };

      globe.rotation.y += deltaMove.x * 0.01; // Adjust as needed
      globe.rotation.x += deltaMove.y * 0.01; // Adjust as needed

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    const animate = () => {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.005;
      renderer.render(scene, camera);
    };

    animate();

    // Logic for the top banner scrolling text to the left
    const topBannerElement = document.querySelector(".top-banner-text");
    const moveText = (element: Element | null, direction = "left") => {
      let position = 0;
      const move = () => {
        if (element) {
          if (direction === "left") {
            position -= 2;
            if (position <= -element.clientWidth) {
              position = window.innerWidth;
            }
          } else {
            position += 2;
            if (position >= window.innerWidth) {
              position = -element.clientWidth;
            }
          }
          (
            element as HTMLElement
          ).style.transform = `translateX(${position}px)`;
        }
        requestAnimationFrame(move);
      };
      move();
    };

    moveText(topBannerElement, "left");
    moveText(document.querySelector(".bottom-banner-text"), "right");

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });
      material.dispose();
      geometry.dispose();
    };
  }, []);

  const handleSignIn = () => {
    connect();
  };

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 space-y-4">
        <h1 className="text-5xl font-extrabold text-white mb-2 hover:text-blue-500 transition-all duration-300 cursor-pointer shadow-md transform hover:scale-105">
          UniPay
        </h1>
        <p className="text-2xl text-gray-300 hover:text-gray-100 transition-all duration-300 cursor-pointer shadow-md transform hover:scale-105">
          Where Blockchain Meets User-Friendly POS
        </p>

        {publicKey ? (
          <p className="text-white">Connected as: {publicKey.toBase58()}</p>
        ) : (
          <button>
            <WalletMultiButton className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none shadow-xl transform hover:scale-110 transition-transform duration-300" />
          </button>
        )}
      </div>

      {/* Top Banner */}
      <div className="absolute top-0 left-0 w-full h-10 bg-black bg-opacity-70 flex items-center overflow-hidden">
        <span className="top-banner-text text-white text-lg flex items-center">
          POWERED BY SOLANA
          <img
            src="/solana-sol-logo.png"
            alt="Solana Logo"
            className="h-6 ml-2"
          />
        </span>
      </div>

      {/* Bottom Banner */}
      <div className="absolute bottom-0 left-0 w-full h-10 bg-black bg-opacity-70 flex items-center overflow-hidden">
        <span className="bottom-banner-text text-white text-lg flex items-center">
          POWERED BY SOLANA
          <img
            src="/solana-sol-logo.png"
            alt="Solana Logo"
            className="h-6 ml-2"
          />
        </span>
      </div>
    </div>
  );
};

export default HomeView;
