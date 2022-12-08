<script lang="ts">
	import * as THREE from 'three';

	import { onMount } from 'svelte';

	import vertex from './GLSL/homeVertex.glsl?raw';
	import fragment from './GLSL/homeFragment.glsl?raw';

	//Check if dark
	import { darkMode } from '$lib/context/darkMode';

	export let hovered: boolean;

	const material = new THREE.ShaderMaterial({
		transparent: true,
		uniforms: {
			uHovered: { value: hovered },
			uTime: { value: 0.0 },
			uMouse: { value: new THREE.Vector3() },
			uDark: { value: $darkMode }
		},
		//vertex shader
		vertexShader: vertex,
		fragmentShader: fragment
	});

	const changeHover = (hovered: boolean) => {
		console.log(hovered);
		material.uniforms.uHovered.value = hovered;
	};

	$: changeHover(hovered);

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

		darkMode.subscribe((value) => {
			material.uniforms.uDark.value = value;
		});

		const renderer = new THREE.WebGLRenderer({ alpha: true });
		renderer.setSize(sizes.width, sizes.height, true);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		//Mesh
		const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);

		quad.position.set(0, 0, 0);

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
			quad.material.uniforms.uTime.value = elapsedTime;
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

		document.addEventListener('mousedown', () => {
			quad.material.uniforms.uMouse.value.z = 1;
		});

		document.addEventListener('mouseup', () => {
			quad.material.uniforms.uMouse.value.z = 0;
		});

		document.addEventListener('mousemove', (e) => {
			window.addEventListener('resize', resize, false);
			quad.material.uniforms.uMouse.value.x = (e.clientX - 112) / sizes.width;
			quad.material.uniforms.uMouse.value.y = (sizes.height - e.clientY) / sizes.height;
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
