import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import gsap from 'gsap'


/** Textures */
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load(
    '/textures/door/laminate_floor_diff_1k.jpg',
    ()=>{
        console.log("Image Loaded");
    },
    ()=>{
        console.log("Progress");
    },
    ()=>{
        console.log("Error");
    }
)

/**  Debug  */

const gui = new dat.GUI({width:400})


const parameters = {
    color: 0xff0000,
    spin: () =>{
        gsap.to(mesh.rotation,{
            duration: 1, // These are seconds, so it happens per second
            x: mesh.rotation.x + Math.PI * 2,
        })
    }
}

gui.addColor(parameters, 'color').onChange(()=>{
    material.color.set(parameters.color)
})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1,2,2,2)
// const geometry = new THREE.BoxBufferGeometry(1,1,1)

const geometry = new THREE.TorusGeometry(5,2,16,100)
// const geometry = new THREE.SphereGeometry( 1, 32, 16 );
const material = new THREE.MeshBasicMaterial({ map: texture})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

gsap.to(mesh.rotation, {
    duration: 40,  // Adjust the duration as per your desired speed
    y: Math.PI * 2,  // Rotates the mesh 360 degrees around the X-axis
    repeat: -1,  // Infinitely repeats the animation
    ease: "linear"  // Uses a linear easing for a constant rotation speed
  });
  

// Debug

gui.add(mesh.position,"y").min(-3).max(3).step(0.01).name("Elevation")
gui.add(mesh,'visible')
gui.add(mesh.material,'wireframe')
gui.add(parameters,"spin")


// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})



// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


// Axes helper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()









// import './style.css'
// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import gsap from 'gsap'
// import * as lil from 'lil-gui'

// const gui = new lil.GUI()
// const parameters = {
//     color: 0xff0000,
//     spin: () => {
//         gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + 10 })
//     }
// }

// gui.add(parameters, 'spin')

// gui.addColor(parameters, 'color').onChange((color) => {
//     material.color.set(color)
// })

// const canvas = document.querySelector('canvas.webgl')

// const scene = new THREE.Scene()

// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

// // Debug
// gui.add(mesh.position, 'x').min(-3).max(3).step(0.01)
// gui.add(mesh.position, 'y').min(-3).max(3).step(0.01)
// gui.add(mesh.position, 'z').min(-3).max(3).step(0.01)

// gui.add(mesh.material, 'wireframe')

// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// }

// window.addEventListener('resize', () =>
// {
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     camera.aspect = sizes.width / sizes.height
//     camera.updateProjectionMatrix()

//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })

// window.addEventListener('keydown', (event) => {
//     if(event.key === 'g') {
//         if(gui._hidden) return gui.show()
//         gui.hide()
//     }
// })

// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// camera.position.z = 3
// scene.add(camera)

// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas
// })
// renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// const clock = new THREE.Clock()

// const tick = () =>
// {
//     controls.update()

//     renderer.render(scene, camera)

//     window.requestAnimationFrame(tick)
// }

// tick()





// import './style.css'
// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// /* const image = new Image()
// const texture = new THREE.Texture(image)

// image.onload = ()  => {
//     texture.needsUpdate = true
// }
// image.src = '/textures/door/color.jpg' */

// const loadingManager = new THREE.LoadingManager()

// const textureLoader = new THREE.TextureLoader(loadingManager)
// const colorTexture = textureLoader.load('/textures/minecraft.png')

// /* colorTexture.repeat.x = 5
// colorTexture.repeat.y = 5
// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.wrapT = THREE.MirroredRepeatWrapping

// colorTexture.offset.y = 0.5
// colorTexture.offset.x = 0.5

// colorTexture.rotation = Math.PI / 4 */

// colorTexture.generateMipmaps = false
// colorTexture.minFilter = THREE.NearestFilter
// colorTexture.magFilter = THREE.NearestFilter
// /**
//  * Base
//  */
// // Canvas
// const canvas = document.querySelector('canvas.webgl')

// // Scene
// const scene = new THREE.Scene()

// /**
//  * Object
//  */
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ map: colorTexture })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

// /**
//  * Sizes
//  */
// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// }

// window.addEventListener('resize', () =>
// {
//     // Update sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     // Update camera
//     camera.aspect = sizes.width / sizes.height
//     camera.updateProjectionMatrix()

//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })

// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// camera.position.x = 1
// camera.position.y = 1
// camera.position.z = 3
// scene.add(camera)

// // Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas
// })
// renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// /**
//  * Animate
//  */
// const clock = new THREE.Clock()

// const tick = () =>
// {
//     const elapsedTime = clock.getElapsedTime()

//     // Update controls
//     controls.update()

//     // Render
//     renderer.render(scene, camera)

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()