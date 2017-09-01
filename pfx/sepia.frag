#version 150
precision mediump float;

uniform sampler2DRect fbo;

in vec2 vTexCoord;

out vec4 fragColor;

const float redScale   = 0.298912;
const float greenScale = 0.586611;
const float blueScale  = 0.114478;
const vec3  monochromeScale = vec3(redScale, greenScale, blueScale);

const float sRedScale   = 1.07;
const float sGreenScale = 0.74;
const float sBlueScale  = 0.43;
const vec3  sepiaScale = vec3(sRedScale, sGreenScale, sBlueScale);

void main(){
    
    vec4  smpColor  = texture(fbo, vTexCoord);
    float grayColor = dot(smpColor.rgb, monochromeScale);
    
    vec3 monoColor = vec3(grayColor) * sepiaScale;
    smpColor = vec4(monoColor, 1.0);
    
    fragColor = smpColor;
}
