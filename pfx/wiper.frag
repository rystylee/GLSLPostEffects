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
    
    //vec3 noise = vec3(shadeVal1, 0.0, u_time * 1.5);
    //vec3 noise = vec3(0.025, 0.0, shadeVal1*10.0 + u_time);
    vec3 noise = vec3(0.01, 0.0, u_time * 1.5);
    vec2 uv = vTexCoord;
    
    float r = snoise(vec3(noise.x * uv.x, noise.y * uv.y, noise.z));
    
    if(shadeVal1 > 0.06){
        col.r += r * 0.3;
        col.g += r * 0.3;
        col.b += r * 0.3;
    }
    
    fragColor = vec4(col);
}
