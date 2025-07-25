import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Lenis from 'lenis';
import { gsap } from 'gsap';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 3, 20);

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('glow-canvas'), alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 2;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xfff0dd, 1.5);
directionalLight.position.set(10, 20, 10);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
scene.add(directionalLight);

const loader = new GLTFLoader();
let model;

loader.load('/cdn/models/scene.gltf', (gltf) => {
    model = gltf.scene;

    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);

    model.scale.set(0.001, 0.001, 0.001);
    model.position.set(-5, -2, 0);
    model.rotation.y = Math.PI * 2;

    scene.add(model);

    gsap.to(model.position, {
        x: 0,
        duration: 1.5,
        ease: 'power2.out',
    });
}, undefined, function (error) {
    console.error('An error occurred while loading the model:', error);
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function scrollHandler(time) {
    lenis.raf(time);
    requestAnimationFrame(scrollHandler);
}
requestAnimationFrame(scrollHandler);

lenis.on('scroll', ({ scroll }) => {
    const progress = scroll / window.innerHeight;

    gsap.to(camera.position, {
        z: 20 - progress * 15,
        y: 3 - progress * 2,
        duration: 1,
        ease: 'power2.out',
    });

    gsap.to(model.rotation, {
        y: Math.PI * 2 - progress * Math.PI,
        duration: 1,
        ease: 'power2.out',
    });

    gsap.to('#scroll-text', {
        opacity: progress > 0.5 ? 1 : 0,
        x: progress > 0.5 ? 0 : 50,
        duration: 1,
        ease: 'power2.out',
    });

    if (progress <= 0) {
        gsap.to(camera.position, {
            z: 20,
            y: 3,
            duration: 1,
            ease: 'power2.out',
        });

        gsap.to(model.rotation, {
            y: Math.PI * 2,
            duration: 1,
            ease: 'power2.out',
        });

        gsap.to(model.position, {
            x: -5,
            duration: 1,
            ease: 'power2.out',
        });

        gsap.to('#scroll-text', {
            opacity: 0,
            x: 50,
            duration: 1,
            ease: 'power2.out',
        });
    }
});