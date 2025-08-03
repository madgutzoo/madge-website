import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
export class ThreeService {
  constructor() {
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.loader = new GLTFLoader();
    this.canvas = null;
    this.geometry = null;
    this.mesh = null;
    this.material = null;
    this.lights = [];
    this.animationId = null;
    this.loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    this.loader.setDRACOLoader(dracoLoader);
  }

  init(canvas) {
    this.canvas = canvas;
    console.log(this.canvas, 'canvas in class');
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Set viewport
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    this.renderer.setSize(width, height);

    // Add camera
    this.camera = this.addCamera(width, height);
    this.camera.position.z = 2;

    // Create scene
    this.scene = new THREE.Scene();

    // Handle sizing
    window.addEventListener('resize', this.handleResize.bind(this));

    // Create geometry
    this.geometry = this.addGeometry();

    // Create material
    this.material = this.addMaterial();

    // Create mesh
    this.mesh = this.addMesh(this.geometry, this.material);
    this.scene.add(this.mesh);

    // Add lights
    this.addLights();

    // Animation loop
    this.runLoop();
  }

  addCamera(width, height) {
    const aspect = width / height;
    const zoom = 1; // Lower = more zoomed out
    return new THREE.OrthographicCamera(
      -aspect * zoom,
      aspect * zoom,
      zoom,
      -zoom,
      0.1,
      1000
    );
  }

  addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 3);
    this.scene.add(ambientLight);
    this.lights.push(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    this.scene.add(directionalLight);
    this.lights.push(directionalLight);
    return this.lights;
  }

  addGeometry() {
    return new THREE.BoxGeometry(1, 1, 1);
  }

  loadModel(url) {
    this.loader.load(
      url,
      (gltf) => {
        if (this.mesh) {
          this.scene.remove(this.mesh);
        }
        this.mesh = gltf.scene;
        this.mesh.scale.set(0.2, 0.2, 0.2);
        this.scene.add(this.mesh);
      },
      undefined,
      (err) => {
        console.error('Error loading model', err);
      }
    );
  }
  addMaterial() {
    const material = new THREE.MeshPhongMaterial({
      color: 'white',
    });
    material.shininess = 100;
    return material;
  }

  addMesh(geometry, material) {
    return new THREE.Mesh(geometry, material);
  }

  handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (this.camera) {
      // For orthographic camera, we need to update the frustum
      const aspect = width / height;
      const zoom = 1;

      this.camera.left = -aspect * zoom;
      this.camera.right = aspect * zoom;
      this.camera.top = zoom;
      this.camera.bottom = -zoom;

      this.camera.updateProjectionMatrix();
    }

    if (this.renderer) {
      this.renderer.setSize(width, height);
    }

    // Update shader resolution uniform
    if (
      this.customGlitchShader &&
      this.customGlitchShader.uniforms &&
      this.customGlitchShader.uniforms.resolution
    ) {
      this.customGlitchShader.uniforms.resolution.value.set(width, height);
    }
  }

  runAnimation() {
    if (this.mesh) {
      this.mesh.rotation.x += 0.01;
      this.mesh.rotation.y += 0.01;
    }
  }

  runLoop() {
    this.animationId = requestAnimationFrame(this.runLoop.bind(this));

    // Update animation state
    this.runAnimation();

    // Render updated scene
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  stopLoop() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  dispose() {
    this.stopLoop();

    if (this.renderer) {
      this.renderer.dispose();
    }

    if (this.geometry) {
      this.geometry.dispose();
    }

    if (this.material) {
      this.material.dispose();
    }

    if (
      this.customGlitchShader &&
      typeof this.customGlitchShader.dispose === 'function'
    ) {
      this.customGlitchShader.dispose();
    }
  }
}
