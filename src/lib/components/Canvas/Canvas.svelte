<script lang="ts">
	import * as THREE from 'three';

	import { onMount } from 'svelte';

	import vertex from './GLSL/menuVertex.glsl?raw';
	import fragment from './GLSL/menuFragment.glsl?raw';

	let canvas: HTMLDivElement;

	onMount(() => {
		/**
		 * Sizes
		 */
		const sizes = {
			width: canvas.offsetWidth,
			height: canvas.offsetHeight
		};

		const scene = new THREE.Scene();
		// Change Background Color
		// scene.background = new THREE.Color(0xff0000);
		// const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

		const material = new THREE.ShaderMaterial({
			transparent: true,
			extensions: {
				derivatives: true
			},
			uniforms: {
				scale: { value: 0.9 },
				size: { value: 0.2 },
				time: { value: 0.0 },
				density: { value: 6.0 },
				bg: { value: new THREE.Color('#9ca3af') },
				yellow: { value: new THREE.Color('#000000') },
				orange: { value: new THREE.Color('#ff0000') }
			},
			//vertex shader
			vertexShader: vertex,
			fragmentShader: fragment
		});

		const renderer = new THREE.WebGLRenderer({ alpha: true });
		renderer.setSize(sizes.width, sizes.height, true);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		//Mesh
		const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);

		quad.position.set(0, 0, 0);
		// Camera
		const fov = 45;
		// const fov = (180 * (2 * Math.atan(window.innerHeight / 2 / 800))) / Math.PI
		//const fov = 2*(180/Math.PI)*Math.atan(heightTool/(2*dist));
		// const aspect = width / height
		const aspect = sizes.width / sizes.height;
		const near = 1;
		const far = 100;
		const camera2 = new THREE.PerspectiveCamera(fov, aspect, near, far);

		const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
		// camera.position.set(0, 0, 10);
		// camera.lookAt(quad.position);

		//Add to scene
		scene.add(quad);

		/**
		 * Animate
		 */
		const clock = new THREE.Clock();

		const animate = () => {
			const elapsedTime: number = clock.getElapsedTime();
			quad.material.uniforms.time.value = Math.sin((2 * Math.PI * elapsedTime) / 100);
			requestAnimationFrame(animate);
			renderer.render(scene, camera);
		};

		const resize = () => {
			// Update sizes
			sizes.width = canvas.offsetWidth;
			sizes.height = canvas.offsetHeight;
			// Update camera
			// camera.aspect = sizes.width / sizes.height;
			camera.updateProjectionMatrix();

			// Update renderer
			renderer.setSize(sizes.width, sizes.height);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		};

		window.addEventListener('resize', () => {
			resize();
		});

		/**
		 * Setup
		 */
		canvas.appendChild(renderer.domElement);

		resize();
		animate();

		return () => {
			console.log('canvas unmount');
			quad.geometry.dispose();
			material.dispose();
			canvas.removeChild(renderer.domElement);
		};
	});
</script>

<div class="absolute top-0 left-0 outline-none m-0 w-full h-full" bind:this={canvas} />
