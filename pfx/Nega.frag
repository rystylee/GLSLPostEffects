#version 150
precision mediump float;

uniform sampler2DRect fbo;

in vec2 vTexCoord;

out vec4 fragColor;

void main(){
    
    vec4 color = texture(fbo, vTexCoord);
    fragColor =  vec4(1.0 - color.x, 1.0 - color.y, 1.0 - color.z, 1.0);
    
}
