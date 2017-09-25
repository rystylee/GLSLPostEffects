#version 150
precision mediump float;

uniform sampler2DRect fbo;
uniform vec2 u_resolution;
uniform float u_time;

in vec2 vTexCoord;

out vec4 fragColor;

const float vignetteStrength = 1.0;

void main() {
    
    float timeFactor = (1.0 + sin(u_time)) / 2.0;
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec4 color = texture(fbo, vTexCoord.xy);
    vec2 centeredCoord = uv - 0.5;
    
    float distance = sqrt(dot(centeredCoord, centeredCoord));
    
    fragColor = mix(color, vec4(0), distance * vignetteStrength * timeFactor);
}
