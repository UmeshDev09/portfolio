import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

const renderer = new THREE.WebGLRenderer({

    canvas: document.querySelector('#bg'),

});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);


renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshBasicMaterial({ Color: 0xff0000 });
const torus = new THREE.Mesh(geometry, material);

torus.setColor = function(color) {
    torus.material.color.set(color);
}


torus.setColor(0xff6347) //change color using hex value or



scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)

const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);

scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);


function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('https://ik.imagekit.io/ziolnpqmph/portfolio/space_Oa7wx-qK3.jpg');
scene.background = spaceTexture;

//ava

const jeffTexture = new THREE.TextureLoader().load('https://ik.imagekit.io/ziolnpqmph/portfolio/um_LV11ey-Xu.jpeg');

const jeff = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial({ map: jeffTexture })


);

scene.add(jeff);


const mooonTexture = new THREE.TextureLoader().load('https://ik.imagekit.io/ziolnpqmph/portfolio/moon_5EJEfJryr.jpg');
const newTexture = new THREE.TextureLoader().load('https://ik.imagekit.io/ziolnpqmph/portfolio/normal_gvfPhccNFsP.jpg');


const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map: mooonTexture,
        normalMap: newTexture
    })

);

scene.add(moon);

moon.position.z = 30;

moon.position.setX(-10);




function moveCamera() {

    const t = document.body.getBoundingClientRect().top;


    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    jeff.rotation.y += 0.01;
    jeff.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;


}

document.body.onscroll = moveCamera





function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;



    controls.update();

    renderer.render(scene, camera);
}

animate();