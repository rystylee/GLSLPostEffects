#version 150
precision mediump float;

uniform sampler2DRect fbo;
uniform vec2 u_resolution;
uniform int sobelGray;
uniform float hCoef[9];
uniform float vCoef[9];

in vec2 vTexCoord;

out vec4 fragColor;

const float redScale   = 0.298912;
const float greenScale = 0.586611;
const float blueScale  = 0.114478;
const vec3  monochromeScale = vec3(redScale, greenScale, blueScale);

void main(){
    
    vec2 offset[9];
    offset[0] = vec2(-1.0, -1.0);
    offset[1] = vec2( 0.0, -1.0);
    offset[2] = vec2( 1.0, -1.0);
    offset[3] = vec2(-1.0,  0.0);
    offset[4] = vec2( 0.0,  0.0);
    offset[5] = vec2( 1.0,  0.0);
    offset[6] = vec2(-1.0,  1.0);
    offset[7] = vec2( 0.0,  1.0);
    offset[8] = vec2( 1.0,  1.0);
    
    vec2  fc = vec2(gl_FragCoord.x, gl_FragCoord.y);
    
    vec3  horizonColor = vec3(0.0);
    vec3  verticalColor = vec3(0.0);
    vec4  destColor = vec4(0.0);
    
    horizonColor += texture(fbo, (fc + offset[0])).rgb * hCoef[0];
    horizonColor += texture(fbo, (fc + offset[1])).rgb * hCoef[1];
    horizonColor += texture(fbo, (fc + offset[2])).rgb * hCoef[2];
    horizonColor += texture(fbo, (fc + offset[3])).rgb * hCoef[3];
    horizonColor += texture(fbo, (fc + offset[4])).rgb * hCoef[4];
    horizonColor += texture(fbo, (fc + offset[5])).rgb * hCoef[5];
    horizonColor += texture(fbo, (fc + offset[6])).rgb * hCoef[6];
    horizonColor += texture(fbo, (fc + offset[7])).rgb * hCoef[7];
    horizonColor += texture(fbo, (fc + offset[8])).rgb * hCoef[8];
    
    verticalColor += texture(fbo, (fc + offset[0])).rgb * vCoef[0];
    verticalColor += texture(fbo, (fc + offset[1])).rgb * vCoef[1];
    verticalColor += texture(fbo, (fc + offset[2])).rgb * vCoef[2];
    verticalColor += texture(fbo, (fc + offset[3])).rgb * vCoef[3];
    verticalColor += texture(fbo, (fc + offset[4])).rgb * vCoef[4];
    verticalColor += texture(fbo, (fc + offset[5])).rgb * vCoef[5];
    verticalColor += texture(fbo, (fc + offset[6])).rgb * vCoef[6];
    verticalColor += texture(fbo, (fc + offset[7])).rgb * vCoef[7];
    verticalColor += texture(fbo, (fc + offset[8])).rgb * vCoef[8];
    
    destColor = vec4(vec3(sqrt(horizonColor * horizonColor + verticalColor * verticalColor)), 1.0);
    
    if(sobelGray == 1){
        float grayColor = dot(destColor.rgb, monochromeScale);
        destColor = vec4(vec3(grayColor), 1.0);
    }
    
    fragColor = destColor;
}
