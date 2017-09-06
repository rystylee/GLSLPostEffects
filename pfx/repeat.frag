#version 150
precision mediump float;

uniform sampler2DRect fbo;
uniform vec2 u_resolution;
uniform float repeatNum;

in vec2 vTexCoord;

out vec4 fragColor;

void main(){
    
    float repeatX = u_resolution.x / repeatNum;
    
    vec2 tex = vTexCoord.xy;
    tex.x += repeatX;
    
    float newtexX = mod(tex.x, repeatX);
    
    vec4 col = texture(fbo, vec2(newtexX, tex.y));
    
    fragColor = col;
}
