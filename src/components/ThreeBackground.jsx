import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Interactive neon particle background using Three.js
export default function ThreeBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    // Neon gradient fog feel
    scene.fog = new THREE.FogExp2(0x001a10, 0.08);

    // Points geometry
    const count = 1200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorA = new THREE.Color('#22c55e');
    const colorB = new THREE.Color('#34d399');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3 + 0] = (Math.random() - 0.5) * 24;
      positions[i3 + 1] = (Math.random() - 0.5) * 14;
      positions[i3 + 2] = (Math.random() - 0.5) * 18;

      const mix = Math.random();
      const c = colorA.clone().lerp(colorB, mix);
      colors[i3 + 0] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // Light sweep
    const light = new THREE.PointLight('#22c55e', 1.4, 40);
    light.position.set(5, 3, 6);
    scene.add(light);

    const ambient = new THREE.AmbientLight('#0ea5a4', 0.15);
    scene.add(ambient);

    // Mouse parallax
    const mouse = { x: 0, y: 0 };
    const onPointerMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width - 0.5;
      mouse.y = (e.clientY - rect.top) / rect.height - 0.5;
    };
    window.addEventListener('pointermove', onPointerMove);

    let raf;
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      points.rotation.y = t * 0.03;
      points.rotation.x = Math.sin(t * 0.2) * 0.05;

      camera.position.x += (mouse.x * 1.2 - camera.position.x) * 0.03;
      camera.position.y += (-mouse.y * 1.2 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      light.position.x = Math.sin(t * 0.7) * 6;
      light.position.y = Math.cos(t * 0.6) * 4;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
}
