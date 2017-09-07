#version 150
precision mediump float;

uniform sampler2DRect fbo;
uniform vec2 u_resolution;
uniform int mode;

in vec2 vTexCoord;

out vec4 fragColor;

void main(){
    
    // to -1.0 ~ 1.0
    vec2 p = (vTexCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    
    if(mode == 0){
        if (p.x > 0.0) p.x = - p.x;
    }else {
        if (p.y > 0.0) p.y = - p.y;
    }
    
    // to 0 ~ u_resolution
    vec2 newTexCoord = (min(u_resolution.x, u_resolution.y) * p + u_resolution) * 0.5;
    
    vec4 col = texture(fbo, newTexCoord);
    
    fragColor = col;
}
