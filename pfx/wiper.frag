#version 150
precision mediump float;

#pragma include "noise3D.glsl"

uniform sampler2DRect fbo;
uniform vec2 u_resolution;
uniform float u_time;
uniform float shadeVal1;

in vec2 vTexCoord;

out vec4 fragColor;

void main() {
    
    vec4 col = texture(fbo, vTexCoord);
    
    vec3 noise = vec3(shadeVal1, 0.0, u_time * 1.5);
    vec2 uv = vTexCoord;
    
    float r = snoise(vec3(noise.x * uv.x, noise.y * uv.y, noise.z));
    
    fragColor = vec4(r + col);
}
