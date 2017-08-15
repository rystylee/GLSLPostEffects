#version 150
precision mediump float;

uniform sampler2DRect fbo;
uniform vec2 u_resolution;
uniform float u_time;
uniform float shadeVal0;
uniform float u_level;

in vec2 vTexCoord;

out vec4 fragColor;

float rnd(vec3 scale, float seed){
    return fract(sin(dot(gl_FragCoord.stp + seed, scale)) * 43758.5453 + seed);
}

void main() {
    
    float tFrag = 1.0;
    float nFrag = 1.0 / 30.0;
    vec2  centerOffset = vec2(u_resolution * 0.5);
    
    vec3  destColor = vec3(0.0);
    float random = rnd(vec3(12.9898, 78.233, 151.7182), 0.0);
    vec2  fc = vec2(vTexCoord.xy);
    vec2  fcc = fc - centerOffset;
    float totalWeight = 0.0;
    
    for(float i = 0.0; i <= 30.0; i++){
        float percent = (i + random) * nFrag;
        float weight = percent - percent * percent;
        vec2  t = fc - fcc * percent * shadeVal0 * 0.1 * nFrag;
        //vec2  t = fc - fcc * percent * u_level * 0.01 * nFrag;
        destColor += texture(fbo, t * tFrag).rgb * weight;
        totalWeight += weight;
    }
    fragColor = vec4(destColor / totalWeight, 1.0);
}
