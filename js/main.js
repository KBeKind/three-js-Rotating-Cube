import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();
let shibaModel;
loader.load(
  "threedmodels/shiba.glb",

  function (gltf) {
    shibaModel = gltf.scene;
    shibaModel.scale.multiplyScalar(2);
    shibaModel.position.set(0, 0.5, -1);
    scene.add(shibaModel);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  500
);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });

const points = [];
points.push(new THREE.Vector3(-10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));

const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(lineGeometry, lineMaterial);

scene.add(line);

const geometry = new THREE.BoxGeometry(5, 5, 5);
const material = new THREE.MeshBasicMaterial({
  color: 0xffca3a,
  wireframe: true,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const geometry2 = new THREE.BoxGeometry(5, 5, 5);
const material2 = new THREE.MeshBasicMaterial({
  color: 0x6a4c93,
  transparent: true,
  opacity: 0.5,
});
const cube2 = new THREE.Mesh(geometry2, material2);
scene.add(cube2);

camera.position.z = 25;

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube2.rotation.x += 0.01;
  cube2.rotation.y += 0.01;
  shibaModel.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();
