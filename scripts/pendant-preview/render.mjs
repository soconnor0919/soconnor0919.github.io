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
attribute vec3 p,n; uniform vec2 angle; uniform float scale,aspect,center;
varying vec3 normal,local;
void main(){float a=angle.x,b=angle.y;
mat3 rx=mat3(1.,0.,0.,0.,cos(a),sin(a),0.,-sin(a),cos(a));
mat3 ry=mat3(cos(b),0.,-sin(b),0.,1.,0.,sin(b),0.,cos(b));
vec3 q=ry*rx*(p-vec3(0.,center,0.)); normal=ry*rx*n;local=p;
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
if(finish>1.5 && finish<2.5){c=color*(.80+.20*key)+vec3(pow(key,20.)*.04);}
if(finish>2.5){float weave=sin(local.y*32.+local.x*19.)*sin(local.z*35.-local.x*22.);c*=.96+.04*weave;}
if(textured>.5){vec2 uv=vec2((local.x+13.5)/27.,(local.y+12.2)/27.);c=texture2D(screen,uv).rgb*(.94+.06*key);}
gl_FragColor=vec4(c,1.);}`,
  ),
);
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS))
  throw new Error(gl.getProgramInfoLog(program));
gl.useProgram(program);
const uniforms = Object.fromEntries(
  ["angle", "scale", "aspect", "color", "textured", "finish", "screen", "center"].map((key) => [
    key,
    gl.getUniformLocation(program, key),
  ]),
);
const attributes = {
  positions: gl.getAttribLocation(program, "p"),
  normals: gl.getAttribLocation(program, "n"),
};
const parts = await fetch("../../pendant-cad/build/meshes.json").then(
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
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
const screen = new Image();
screen.src = `../../pendant-cad/build/screen-${params.get("screen") ?? "card"}.png`;
await screen.decode();
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, screen);
let angleX = -0.13,
  angleY = -0.30;
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
  gl.uniform1f(uniforms.scale, params.has("necklace") ? 122 : 48);
  gl.uniform1f(uniforms.center, params.has("necklace") ? 86 : 15);
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

// Controls replay exact screens from the executable SD app capture bank.
const cardPages=["card","medications","contacts","preferences","conditions"];
let cardIndex=Math.max(0,cardPages.indexOf(params.get("screen")??"card"));
let pending=params.get("screen")==="request",holdTimer,controlGesture,loadId=0;
async function showCard(){
  const id=++loadId,name=pending?"request":cardPages[cardIndex],image=new Image();
  image.src=`../../pendant-cad/build/screen-${name}.png`;await image.decode();if(id!==loadId)return;
  gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);draw();
  canvas.setAttribute("aria-label",`Medscribe pendant: ${name}`);
  const status=document.querySelector("#preview-status");if(status)status.textContent=pending?"Waiting for phone · no delivery confirmed":`${cardIndex+1} / 5 · ${name}`;
}
function cancelHold(){clearTimeout(holdTimer);holdTimer=undefined;}
function startHelp(){if(!pending){cancelHold();holdTimer=setTimeout(()=>{pending=true;void showCard();},800);}}
function nextCard(){if(!pending){cardIndex=(cardIndex+1)%cardPages.length;void showCard();}}
function hitKey(event){
  const r=canvas.getBoundingClientRect(),x=event.clientX-r.left,y=event.clientY-r.top;
  const scale=params.has("necklace")?122:48,center=params.has("necklace")?86:15;
  for(const [kind,name] of [["upper","boot-button"],["lower","power-button"]]){
    const positions=parts[name].positions,sum=[0,0,0];for(let i=0;i<positions.length;i++)sum[i%3]+=positions[i]/(positions.length/3);
    const [xx,yy,zz]=[sum[0],sum[1]-center,sum[2]],z=Math.sin(angleX)*yy+Math.cos(angleX)*zz;
    const px=(Math.cos(angleY)*xx+Math.sin(angleY)*z)/(scale*r.width/r.height),py=(Math.cos(angleX)*yy-Math.sin(angleX)*zz)/scale;
    if(Math.abs(x-(px+1)*r.width/2)<22&&Math.abs(y-(1-py)*r.height/2)<24)return kind;
  }
}
canvas.addEventListener("pointerdown",event=>{
  const kind=hitKey(event);if(!kind)return;
  event.stopImmediatePropagation();canvas.setPointerCapture(event.pointerId);controlGesture={kind,wasPending:pending};if(kind==="upper")startHelp();
},true);
canvas.addEventListener("pointerup",event=>{
  if(!controlGesture)return;event.stopImmediatePropagation();cancelHold();
  if(controlGesture.kind==="lower")nextCard();
  if(controlGesture.kind==="upper"&&controlGesture.wasPending){pending=false;void showCard();}controlGesture=null;
},true);
canvas.addEventListener("pointercancel",()=>{cancelHold();controlGesture=null;});
const help=document.querySelector("#help"),next=document.querySelector("#next");let wasPending;
help?.addEventListener("pointerdown",event=>{help.setPointerCapture(event.pointerId);wasPending=pending;startHelp();});
help?.addEventListener("pointerup",()=>{cancelHold();if(wasPending){pending=false;void showCard();}});
help?.addEventListener("pointercancel",cancelHold);
help?.addEventListener("keydown",event=>{if(["Enter"," "].includes(event.key)){event.preventDefault();if(!event.repeat){wasPending=pending;startHelp();}}});
help?.addEventListener("keyup",event=>{if(["Enter"," "].includes(event.key)){event.preventDefault();cancelHold();if(wasPending){pending=false;void showCard();}}});
next?.addEventListener("click",nextCard);
