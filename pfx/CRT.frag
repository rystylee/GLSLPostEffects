#version 150
precision mediump float;

uniform sampler2DRect fbo;
uniform vec2 u_resolution;
uniform float u_time;
uniform float shadeVal0;
uniform float u_level;

in vec2 vTexCoord;

out vec4 fragColor;

#define PIXELSIZE 3.0

void main(){
    
    vec2 cor;
    
    cor.x = gl_FragCoord.x / PIXELSIZE;
    cor.y = (gl_FragCoord.y + PIXELSIZE * 1.5 * mod(floor(cor.x), 2.0)) / (PIXELSIZE * 3.0);
    
    vec2 ico = floor(cor);
    vec2 fco = fract(cor);
    
    vec3 pix = step(1.5, mod(vec3(0.0, 1.0, 2.0) + ico.x, 3.0));
    vec3 ima = texture(fbo, PIXELSIZE * ico * vec2(1.0, 3.0)).xyz;
    
    vec3 col = pix * dot(pix, ima);
    
    col *= step(abs(fco.x - 0.5), 0.4);
    col *= step(abs(fco.y - 0.5), 0.4);
    
    col *= 1.2;
    fragColor = vec4(col, 1.0);
}
