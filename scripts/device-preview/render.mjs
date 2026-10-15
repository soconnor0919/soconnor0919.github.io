const params = new URLSearchParams(location.search);
if (params.has("capture")) document.body.classList.add("capture");
const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl", {
  antialias: true,
  alpha: true,
  preserveDrawingBuffer: true,
});
if (!gl) throw new Error("WebGL unavailable");
function shader(type, source) {
  const result = gl.createShader(type);
  gl.shaderSource(result, source);
  gl.compileShader(result);
  if (!gl.getShaderParameter(result, gl.COMPILE_STATUS))
    throw new Error(gl.getShaderInfoLog(result));
  return result;
}
const program = gl.createProgram();
gl.attachShader(
  program,
  shader(
    gl.VERTEX_SHADER,
    `
attribute vec3 p,n; uniform vec2 angle; uniform float scale,aspect;
varying vec3 normal,local;
void main(){float a=angle.x,b=angle.y;
mat3 rx=mat3(1.,0.,0.,0.,cos(a),sin(a),0.,-sin(a),cos(a));
mat3 ry=mat3(cos(b),0.,-sin(b),0.,1.,0.,sin(b),0.,cos(b));
vec3 q=ry*rx*(p-vec3(0.,.95,4.75)); normal=ry*rx*n;local=p;
gl_Position=vec4(q.x/(scale*aspect),q.y/scale,-q.z/300.,1.);}`,
  ),
);
gl.attachShader(
  program,
  shader(
    gl.FRAGMENT_SHADER,
    `
precision highp float; uniform vec3 color; uniform float textured,finish;
uniform sampler2D screen; varying vec3 normal,local;
void main(){vec3 n=normalize(normal);if(!gl_FrontFacing)n=-n;
float key=max(dot(n,normalize(vec3(-.5,.65,1.))),0.);
float grain=fract(sin(dot(floor(local.xy*32.),vec2(12.9898,78.233)))*43758.5453)-.5;
vec3 c=color*(.64+.36*key);
if(finish>.5 && finish<1.5){c*=1.+grain*.09;}
if(finish>1.5){c=color*(.80+.20*key)+vec3(pow(key,20.)*.04);}
if(textured>.5){vec2 uv=vec2((local.x+25.8815)/51.84,(local.y+39.29)/86.4);c=texture2D(screen,uv).rgb*(.94+.06*key);}
gl_FragColor=vec4(c,1.);}`,
  ),
);
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS))
  throw new Error(gl.getProgramInfoLog(program));
gl.useProgram(program);
const uniforms = Object.fromEntries(
  ["angle", "scale", "aspect", "color", "textured", "finish", "screen"].map((key) => [
    key,
    gl.getUniformLocation(program, key),
  ]),
);
const attributes = {
  positions: gl.getAttribLocation(program, "p"),
  normals: gl.getAttribLocation(program, "n"),
};
const parts = await fetch("../../device-cad/build/meshes.json").then(
  (response) => {
    if (!response.ok) throw new Error("Build the CAD first");
    return response.json();
  },
);
for (const part of Object.values(parts)) {
  part.buffers = {};
  for (const key of Object.keys(attributes)) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(part[key]), gl.STATIC_DRAW);
    part.buffers[key] = buffer;
  }
}
const texture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, texture);
for (const key of [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T])
  gl.texParameteri(gl.TEXTURE_2D, key, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
const screen = new Image();
screen.src = `../../device-cad/build/screen-${params.get("screen") ?? "home"}.png`;
await screen.decode();
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, screen);
let angleX = -0.18,
  angleY = -0.32;
if (params.get("angle") === "front") {
  angleX = 0;
  angleY = 0;
}
function draw() {
  canvas.width = Math.round(canvas.clientWidth * devicePixelRatio);
  canvas.height = Math.round(canvas.clientHeight * devicePixelRatio);
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);
  gl.disable(gl.CULL_FACE);
  gl.uniform2f(uniforms.angle, angleX, angleY);
  gl.uniform1f(uniforms.scale, 62);
  gl.uniform1f(uniforms.aspect, canvas.width / canvas.height);
  gl.uniform1i(uniforms.screen, 0);
  for (const [name, part] of Object.entries(parts)) {
    for (const [key, index] of Object.entries(attributes)) {
      gl.bindBuffer(gl.ARRAY_BUFFER, part.buffers[key]);
      gl.enableVertexAttribArray(index);
      gl.vertexAttribPointer(index, 3, gl.FLOAT, false, 0, 0);
    }
    gl.uniform3fv(uniforms.color, part.color);
    gl.uniform1f(uniforms.finish, part.finish ?? 0);
    gl.uniform1f(uniforms.textured, name === "home-screen" ? 1 : 0);
    gl.drawArrays(gl.TRIANGLES, 0, part.positions.length / 3);
  }
}
let drag;
canvas.addEventListener("pointerdown", (event) => {
  drag = { x: event.clientX, y: event.clientY };
  canvas.setPointerCapture(event.pointerId);
});
canvas.addEventListener("pointermove", (event) => {
  if (!drag) return;
  angleY += (event.clientX - drag.x) * 0.008;
  angleX += (event.clientY - drag.y) * 0.008;
  drag = { x: event.clientX, y: event.clientY };
  draw();
});
canvas.addEventListener("pointerup", () => {
  drag = null;
});
canvas.addEventListener("pointercancel", () => {
  drag = null;
});
new ResizeObserver(draw).observe(canvas);
draw();
window.cadReady = true;
