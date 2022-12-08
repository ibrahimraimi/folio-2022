precision mediump float;

uniform vec3 uMouse;
uniform float uTime;
uniform bool uDark;
uniform bool uHovered;

varying vec2 vUv;

float n21(vec2 p) {
  return fract(sin(p.x * 100. + p.y * 6574.) * 5647. + uTime * 0.1);
}

float valueNoise(vec2 p) {
  //Make Grid
  vec2 localUv = fract(p * 1.0);
  //Cheap smoothstep
  localUv = localUv * localUv * (3. - 2. * localUv);
  //current GridCell
  vec2 id = floor(p * 1.0);

  //NoiseValues in Grid corners
  float bottomLeft = n21(id);
  float bottomRight = n21(id + vec2(1.0, 0.0));
  float topLeft = n21(id + vec2(0.0, 1.0));
  float topRight = n21(id + vec2(1.0));
  //Mix based on position in the cell represented by localUv
  float bottomMix = mix(bottomLeft, bottomRight, localUv.x);
  float topMix = mix(topLeft, topRight, localUv.x);

  return mix(bottomMix, topMix, localUv.y);
}

void main() {
  vec3 colour = vec3(0.5);

  float c = valueNoise(vUv * 2.);
  c += valueNoise(vUv * 4.) * .5;
  c += valueNoise(vUv * 8.) * .25;
  c += valueNoise(vUv * 16.) * .125;
  c += valueNoise(vUv * 32.) * .0625;

  c /= 2.;
  colour = vec3(c);
  colour = mix(uDark ? vec3(0.) : vec3(1.), vec3(1.0, 0.0, 0.0), c);

  if(length(uMouse.xy - vUv) < valueNoise(vUv * 10.) / 10.) {
    if(uMouse.z > 0.5) {
      colour = vec3(n21(vUv * 10.), 0., 0.);
    } else {
      colour = !uHovered ? vec3(valueNoise(vUv * 10.)) : vec3(valueNoise(vUv * 10.), valueNoise(vUv * 10.), 0.);
    }

  }
  // colour = mix(vec3(1.0), colour, uMouse.x);
  gl_FragColor = vec4(colour, 0.8);

}