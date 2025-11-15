import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize(window.innerWidth*0.8, window.innerHeight*0.6);
document.getElementById('drone3d').appendChild(renderer.domElement);
const geom = new THREE.BoxGeometry(1.6,0.5,1);
const mat = new THREE.MeshStandardMaterial({color:0x00eaff, emissive:0x002233});
const drone = new THREE.Mesh(geom, mat);
scene.add(drone);
const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(5,10,7); scene.add(light);
camera.position.z = 6;
function animate(){ requestAnimationFrame(animate); drone.rotation.y += 0.01; renderer.render(scene,camera); }
animate();