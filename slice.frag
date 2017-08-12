#version 150
precision mediump float;

uniform sampler2DRect fbo;
uniform vec2 u_resolution;
uniform float u_time;

in vec2 vTexCoord;

out vec4 fragColor;

void main(){
    
    vec2 st = gl_FragCoord.xy;
    
    int gridH = 10;
    int h = int(u_resolution.y) / gridH;
    int hjudge = int(floor(st.y / h));

    if(hjudge % 2 == 0) st.x += sin(u_time * 3.0) * 30.0;
    else st.x -= sin(u_time * 3.0) * 30.0;
    
    vec4 smpColor = texture(fbo, st);
    
    fragColor = vec4(smpColor);
}
