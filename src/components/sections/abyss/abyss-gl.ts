const VERTEX = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';

const FRAGMENT = `precision mediump float;
uniform vec2 r;uniform float t;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float motes(vec2 uv,float s,float sp,float th){vec2 g=uv*s+vec2(0.,t*sp);vec2 id=floor(g);vec2 f=fract(g)-.5;float k=h(id);
 vec2 o=vec2(h(id+3.1),h(id+7.7))-.5;o.x+=.18*sin(t*.4+k*30.);float d=length(f-o*.7);
 float tw=.55+.45*sin(t*1.3+k*50.);return step(th,k)*(smoothstep(.07,.0,d)+smoothstep(.45,.0,d)*.09)*tw;}
void main(){vec2 uv=gl_FragCoord.xy/r.y;vec2 q=gl_FragCoord.xy/r;
 vec3 col=vec3(0.);
 col+=vec3(.9,.91,.92)*(motes(uv,9.,.05,.86)*.55+motes(uv,15.,.08,.9)*.35+motes(uv,24.,.12,.93)*.22);
 float v=smoothstep(1.15,.25,length(q-vec2(.5,.45))*1.25);col*=.35+.65*v;
 gl_FragColor=vec4(col,1.);}`;

export type AbyssRenderer = { resize: () => void; draw: (seconds: number) => void };

export function createAbyssRenderer(canvas: HTMLCanvasElement): AbyssRenderer | null {
  const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false });
  if (!gl) return null;
  const compile = (type: number, src: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    return shader;
  };
  const vs = compile(gl.VERTEX_SHADER, VERTEX);
  const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT);
  const program = gl.createProgram();
  if (!vs || !fs || !program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(program, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const uRes = gl.getUniformLocation(program, 'r');
  const uTime = gl.getUniformLocation(program, 't');

  return {
    resize() {
      const scale = Math.min(devicePixelRatio || 1, 1.5) * 0.75;
      canvas.width = Math.round(innerWidth * scale);
      canvas.height = Math.round(innerHeight * scale);
      gl.viewport(0, 0, canvas.width, canvas.height);
    },
    draw(seconds) {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, seconds);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
  };
}
