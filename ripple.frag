#version 150
precision mediump float;

uniform sampler2DRect fbo;
uniform vec2 u_resolution;
uniform float u_time;

in vec2 vTexCoord;

out vec4 fragColor;

void main(){
    
    // pixel position normalised to [-1, 1]
    vec2 cPos = -1.0 + 2.0 * (gl_FragCoord.xy / u_resolution.xy);
    
    // distance of current pixel from center
    float cLength = length(cPos);
    
    vec2 uv = gl_FragCoord.xy / u_resolution.xy + (cPos / cLength) * cos(cLength * 12.0 - u_time * 4.0) * 0.03;
    vec3 col = texture(fbo, uv * u_resolution.xy).xyz;
    
    fragColor = vec4(col,1.0);
}
