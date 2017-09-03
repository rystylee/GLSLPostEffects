#version 150
precision mediump float;

uniform sampler2DRect fbo;
uniform vec2 u_resolution;

in vec2 vTexCoord;

out vec4 fragColor;

const float nFrag = 1.0 / 64.0;

void main(){
    
    vec4  destColor = vec4(0.0);
    vec2  fc = gl_FragCoord.xy;
    float offsetX = mod(fc.s, 8.0);
    float offsetY = mod(fc.t, 8.0);
    
    for(float x = 0.0; x <= 7.0; x += 1.0){
        for(float y = 0.0; y <= 7.0; y += 1.0){
            destColor += texture(fbo, (fc + vec2(x - offsetX, y - offsetY)));
        }
    }
    
    fragColor = destColor * nFrag;
}
