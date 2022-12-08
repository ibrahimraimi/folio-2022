---
title: 'Conways Game Of Life - Intro to Cellular Automata and Renderbuffers in Three.js'
seoMetaDescription: 'Conways Game Of Life implemented as a Shader'
featuredImage: '../assets/gol.gif'
date: '2022-11-05'
published: false
---

<script>
  import ExternalLink from '$lib/components/UI/ExternalLink.svelte'
  //Assets
  import gif from './assets/gol.gif';
  import neighbourhood from './assets/neighbourhood.png';
</script>

<img class="mx-auto" alt="Game of Life GIF" src={gif} />

Simple rules can produce structured, complex systems. And beautiful images often follow. This is the core idea behind the Game of Life, a cellular automaton devised by british mathematician John Horton Conway in 1970. Often called just 'Life', it's probably one of the most popular and well known examples of cellular automata. There are many examples and tutorials on the web that go over implementing it, like this one by <ExternalLink ariaLabel="codingtrain" href="https://www.youtube.com/watch?v=FWSR_7kZuYg"> Daniel Shiffman. </ExternalLink>

But in many of these examples this computation runs on the CPU, limiting the possible complexity and amount of cells in the system. So this article will go over implemeting the Game of Life in WebGL which allows GPU-accelerated computations (= way more complex and detailed images). Writing WebGL on it's own can be very painful so it's going to be implemented using <ExternalLink ariaLabel="codingtrain" href="https://threejs.org/"> Three.js</ExternalLink>, a WebGL graphics library. This going to require some advanced rendering techniques, so some basic familiarity with Three.js and GLSL would be helpful in order to follow along.

**Cellular Automata**

Conways game of life is what’s called a cellular automaton and it makes sense to consider a more abstract view of what that means. This relates to automata theory in theoretical computer science, but really it’s just about creating some simple rules. A cellular automaton is a model of a system that consists of automata, called cells, that are interlinked via some simple logic which allows modelling rather complex behaviour. A cellular automaton is a discrete model, it has a defined starting state and a set of rules, with the following characteristics

<ol class="list-disc">
<li>Cells live on a grid which can be 1D or higher-dimensional (in our example it’s a 2D grid of pixels) </li>
<li>Each cell has only one current state with the number of states possible being finite. Our example only has two possibilities: 0 or 1 / dead  or alive</li>
<li>Each cell has a neighbourhood, usually a list of adjacent cells</li>
</ol>

The basic working principle of a cellular automaton usually involves the following steps:

- An initial (global) state is selected by assigning a state for each cell.
- A new generation is created, according to some fixed rule that determines the new state of each cell in terms of:
  - The current state of the cell
  - The states of cells in its neighbourhood

<img class="mx-auto" alt="Cellular Automaton Neighbourhood" src={neighbourhood} />

As already mentioned, the Game of Life is based on a 2D grid. In its initial state there are cells which are either alive or dead. We generate the next generation of cells according to only these rules.

- Any live cell with fewer than two live neighbours dies as if caused by underpopulation.
- Any live cell with two or three live neighbours lives on to the next generation.
- Any live cell with more than three live neighbours dies, as if by overpopulation.
- Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

Conway's Game of Life uses a Moore neighbourhood, which is composed of the current cell and the eight cells that surround it, so those are the ones we’ll be looking at in this example. There are many variations and possibilities to this, Life is actually Turing complete, but this post is about implementing it in WebGL with Three.js so it will stick to a rather basic version but feel free to research <ExternalLink ariaLabel="wikilink" href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life">more</ExternalLink>.

**THREE.JS**

Three.js is a pretty high-level WebGL library, but it let's you decide how deep you wanna go. So it provides a lot of options to control the way scenes are structured and rendered and allows users to get close to the WebGL API by writing custom shaders in GLSL and passing <ExternalLink ariaLabel="rendertarget" href="https://threejs.org/docs/#api/en/core/BufferAttributet">Buffer Attributes</ExternalLink>.

In the game of life each cell needs information about its neighbourhood. But in WebGL all fragments are processed simultaneously by the GPU, so when a fragment shader is in the midst of processing one pixel, there’s no way it can directly access information about any other fragments. But there’s a workaround. In a fragment shader, if we pass a texture, we can easily query the neighbouring pixels in the texture as long as we know its width and height. This idea allows all kinds of post-processing effects to be applied to scenes.

We’ll start with the initial state of the system. In order to get any interesting results, we need non-uniform starting-conditions. In this example we’ll place cells randomly on the screen, so we’ll feed a regular noise texture into our frame buffer for the first frame. Of course we could initialize with another type of noise but this is the easiest way to get started.

```js
/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight
};

/**
 * Scenes
 */
//Scene will be rendered to the screen
const scene = new THREE.Scene();

/**
 * Textures
 */
//The generated noise texture
const dataTexture = createDataTexture();

/**
 * Meshes
 */
// Geometry
const geometry = new THREE.PlaneGeometry(2, 2);

//Screen resolution
const resolution = new THREE.Vector3(sizes.width, sizes.height, window.devicePixelRatio);

//Screen Material
const quadMaterial = new THREE.ShaderMaterial({
	uniforms: {
		uTexture: { value: dataTexture },
		uResolution: {
			value: resolution
		}
	},
	vertexShader: document.getElementById('vertexShader').textContent,
	fragmentShader: document.getElementById('fragmentShader').textContent
});

// Meshes
const mesh = new THREE.Mesh(geometry, quadMaterial);
scene.add(mesh);

/**
 * Animate
 */

const tick = () => {
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
```

This code simply initialises a threejs scene and adds a 2D plane to fill the screen (left out a lot of the Three.js baisc boilerplate stuff). The plane is supplied with a Shader Material, that for now does nothing but display a texture in it’s fragment shader. In this code we generate a texture using three.js <ExternalLink ariaLabel="rendertarget" href="https://threejs.org/docs/#api/en/textures/DataTexture">DataTexture</ExternalLink>. It would be possible to load an image too but since the scene will take up the entire screen, creating a texture with the viewport dimensions seems like the simpler solution. Currently the scene will be rendered to the default framebuffer (the device screen).

<iframe height="300" style="width: 100%;" scrolling="no" title="Game of Life Init Texture" src="https://codepen.io/jasonandrewth/embed/Poaqyjp?default-tab=js%2Cresult&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/jasonandrewth/pen/Poaqyjp">
  Game of Life Init Texture</a> by Jason6 (<a href="https://codepen.io/jasonandrewth">@jasonandrewth</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

**Framebuffers**

When writing a WebGL application, whether using the vanilla API or a higher level library like Three.js, after setting up the scene the results are rendered to the default WebGL framebuffer, which is the device screen (as done above).
But there's also the option to create framebuffers that render off-screen, to image buffers on the GPU’s memory. Those can then be used just like a regular texture for whatever purpose. This idea is used in WebGL when it comes to creating advanced post-processing effects such as depth-of-field, bloom, etc. by applying different effects on the scene once rendered. In Three.js we can do that by using <ExternalLink ariaLabel="rendertarget" href="https://threejs.org/docs/#api/en/renderers/WebGLRenderTarget">THREE.WebGLRenderTarget</ExternalLink>. We’ll call our framebuffer renderBufferA.

```js
/**
 * Scenes
 */
//Scene will be rendered to the screen
const scene = new THREE.Scene();
//Create a second scene that will be rendered to the off-screen buffer
const bufferScene = new THREE.Scene();

/**
 * Render Buffers
 */
// Create a new framebuffer we will use to render to
// the video card memory
let renderBufferA = new THREE.WebGLRenderTarget(sizes.width, sizes.height, {
	// In this demo UV coordinates are float values in the range of [0,1].
	// Redering UV coordinates (float values in the range of [0,1]) into a 32bit RGBA buffer (a render target in format RGBA and type UnsignedByte), will lose precision since you can only store 8 bit (256 possible integer values) per color channel.
	// This loss is visible if you use the sampled uv coordinates for a texture fetch.
	// You can fix the issue if you add this parameter when creating the render target type: THREE.FloatType.
	// The underlying texture is now a float texture that can hold your uv coordinates and retain precision.
	minFilter: THREE.NearestFilter,
	magFilter: THREE.NearestFilter,
	format: THREE.RGBAFormat,
	type: THREE.FloatType,
	stencilBuffer: false
});

//off-screen Framebuffer will receive a new ShaderMaterial
// Buffer Material
const bufferMaterial = new THREE.ShaderMaterial({
	uniforms: {
		uTexture: { value: dataTexture },
		uResolution: {
			value: resolution
		}
	},
	vertexShader: document.getElementById('vertexShader').textContent,
	//For now this fragment shader does the same as the one used above
	fragmentShader: document.getElementById('fragmentShaderBuffer').textContent
});

/**
 * Animate
 */

const tick = () => {
	// Explicitly set renderBufferA as the framebuffer to render to
	//the output of this rendering pass will be stored in the texture associated with renderBufferA
	renderer.setRenderTarget(renderBufferA);
	// This will the off-screen texture
	renderer.render(bufferScene, camera);

	mesh.material.uniforms.uTexture.value = renderBufferA.texture;
	//This will set the default framebuffer (i.e. the screen) back to being the output
	renderer.setRenderTarget(null);
	//Render to screen
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
```

Now there’s nothing to be seen because, while the scene is rendered, it’s rendered to an off-screen buffer.

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/jasonandrewth/embed/KKedEgr?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/jasonandrewth/pen/KKedEgr">
  Untitled</a> by Jason6 (<a href="https://codepen.io/jasonandrewth">@jasonandrewth</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

We’ll need to access it as a texture in the animation loop to render the generated texture from the previous step to the fullscreen plane on our screen.

```js
//In the animation loop before rendering to the screen
mesh.material.uniforms.uTexture.value = renderBufferA.texture;
```

And that's all it takes to get back the noise, except now it's rendered off-screen and the output of that render is used as a texture in the framebuffer that renders on to the screen.

<iframe height="300" style="width: 100%;" scrolling="no" title="GOL 3" src="https://codepen.io/jasonandrewth/embed/eYKpagr?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/jasonandrewth/pen/eYKpagr">
  GOL 3</a> by Jason6 (<a href="https://codepen.io/jasonandrewth">@jasonandrewth</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### **Ping-Pong**

Now that there's data rendered to a texture, the shaders can be used to perform general computation using the texture data. Within GLSL, textures are read-only, and we can’t write directly to our input textures, we can only “sample” them. Using the off-screen framebuffer, however, we can use the output of the shader itself to write to a texture. Then, if we can chain together multiple rendering passes, the output of one rendering pass becomes the input for the next pass. So we create two off-screen buffers. This technique is called **ping pong buffering** , we create a kind of simple ring buffer, where after every frame we swap the off-screen buffer that is being read from with the off-screen buffer that is being written to. We can then use the off-screen buffer that was just written to, and display that to the screen. This lets us perform iterative computation on the GPU, which is useful for all kinds of effects.

To achieve it in three.js, first we need to create a second framebuffer. We will call it renderBufferB. Then the ping-pong technique is actually performed in the animation loop.

```js
//Add another framebuffer
let renderBufferB = new THREE.WebGLRenderTarget(
    sizes.width,
    sizes.height,
    {
        minFilter: THREE.NearestFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
        type: THREE.FloatType,
        stencilBuffer: false
    }

    //At the end of each animation loop

    // Ping-pong the framebuffers by swapping them
    // at the end of each frame render
    // Now prepare for the next cycle by swapping renderBufferA and renderBufferB
    // so that the previous frame's *output* becomes the next frame's *input*
    const temp = renderBufferA
    renderBufferA = renderBufferB
    renderBufferB = temp
    //output becomes input
    bufferMaterial.uniforms.uTexture.value = renderBufferB.texture;
)
```

Now the render buffers are swapped every frame, it’ll look the same but it’s possible to verify by logging out the textures that get passed to the on-screen plane each frame for example.

<iframe height="300" style="width: 100%;" scrolling="no" title="GOL fourth" src="https://codepen.io/jasonandrewth/embed/ZERbNoj?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/jasonandrewth/pen/ZERbNoj">
  GOL fourth</a> by Jason6 (<a href="https://codepen.io/jasonandrewth">@jasonandrewth</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

<ExternalLink ariaLabel="pinpongdetails" href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life](https://webglfundamentals.org/webgl/lessons/webgl-image-processing-continued.html">Here's a more in depth look at ping pong buffers in WebGL.</ExternalLink>

### **Game Of Life**

From here it’s about implementing the actual Game of Life. Since the rules are so simple, the resulting code isn’t very complicated either and there’s many good resources that go through coding it up, (Link art of code stream) so I’ll only go over the key ideas. All the Logic for this will happen in the fragment shader that gets rendered off-screen, which will provide the Texture for the next frame.

As described earlier we want to access neighbouring fragments (or pixels) via the texture that’s passed in. This is achieved in a nested for loop in the getNeighbours function. We skip our current cell and check the 8 surrounding pixels by sampling the texture at an offset. Then we check whether the pixels r value is above 0.5, which means it’s alive, and increment the count to represent the alive neighbours.

```c
//GLSL in fragment shader
precision mediump float;
//The input texture
uniform sampler2D uTexture;
//Screen resolution
uniform vec3 uResolution;

float GetNeighbours(vec2 p) {
    float count = 0.0;

    for(float y = -1.0; y <= 1.0; y++) {
        for(float x = -1.0; x <= 1.0; x++) {

            if(x == 0.0 && y == 0.0)
                continue;

            // Scale the offset down
            vec2 offset = vec2(x, y) / uResolution.xy;
            // Apply offset and sample texture
            vec4 lookup = texture2D(uTexture, p + offset);
             // Accumulate the result
            count += lookup.r > 0.5 ? 1.0 : 0.0;
        }
    }

    return count;
}
```

Based on this count we set the rules

```c
//In the main function
    vec3 color = vec3(0.0);

    float neighbors = 0.0;

    neighbors += GetNeighbours(vUvs);

    bool alive = texture2D(uTexture, vUvs).x > 0.5;

    //cell is alive
    if(alive && (neighbors == 2.0 || neighbors == 3.0)) {

      //Any live cell with two or three live neighbours lives on to the next generation.
      color = vec3(1.0, 0.0, 0.0);

      //cell is dead
      } else if (!alive && (neighbors == 3.0)) {
      //Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
        color = vec3(1.0, 0.0, 0.0);

      }

    //In all other cases cell remains dead or dies so color stays at 0
    gl_FragColor = vec4(color, 1.0);
```

And that’s basically it, a working game of life using only GPU shaders, written in three.js. The texture will get sampled every frame via the ping pong buffers, which creates the next generation in our cellular automaton, so no additional variable tracking the time or frames needs to be passed for it to animate.

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/jasonandrewth/embed/poKjXgQ?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/jasonandrewth/pen/poKjXgQ">
  Untitled</a> by Jason6 (<a href="https://codepen.io/jasonandrewth">@jasonandrewth</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
