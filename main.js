import * as THREE from './node_modules/three/build/three.module.js'
// import * as THREE from 'three';

const scene = new THREE.Scene();
const spaceTexture = new THREE.TextureLoader().load('img/29.jpg')
scene.background = spaceTexture;

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 0)
document.body.appendChild(renderer.domElement);



// Main light
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight)


// Cube
const cubeTexture = new THREE.TextureLoader().load('img/07.avif')
const cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial({ map: cubeTexture }));
cube.position.z = -2;
cube.rotation.y = 10;
cube.rotation.x = 10
scene.add(cube)

const earhtTexture = new THREE.TextureLoader().load('img/153.webp')
const earth = new THREE.Mesh(
    new THREE.SphereGeometry(2, 100, 100),
    new THREE.MeshStandardMaterial({
        map:earhtTexture,
    })
)
earth.position.z = -10
scene.add(earth)

// Setting 

function addStar() {
    const geometry = new THREE.SphereGeometry(0.1, 16, 16)
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material)


    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(90))

    star.position.set(x, y, z)
    scene.add(star)
}
Array(200).fill().forEach(addStar)
function animate() {
    requestAnimationFrame(animate)

    earth.rotation.y += 0.003
    earth.rotation.x += 0.002
    earth.rotation.z += 0.002

    renderer.render(scene, camera)
}

animate()

document.body.onscroll = handelerScroll;
function handelerScroll() {
    const t = document.body.getBoundingClientRect().top

    if (cube.rotation.y > 0 && cube.rotation.x > 0) {
        cube.rotation.y -= 0.01
        cube.rotation.x -= 0.01
    }

    if (camera.position.z < -1.4) {
        cube.rotation.y -= 0
        cube.rotation.x -= 0
        if (earth.position.x > -0.8) {
            earth.position.x -= 0.02
        }
    } else {
        earth.position.x = 0
    }

    camera.position.z = t * 0.001
}