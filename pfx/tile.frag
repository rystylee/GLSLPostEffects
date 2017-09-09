#version 150
precision mediump float;

uniform sampler2DRect fbo;
uniform vec2 u_resolution;
uniform float u_time;

in vec2 vTexCoord;

out vec4 fragColor;

float random(in vec2 uv){
    return fract(sin(dot(uv, vec2(12.9898,78.233))) * 43758.5453);
}

float randomTile(in vec2 uv){
    return random(floor(uv));
}

void main(){
    vec2 uv = (gl_FragCoord.xy * 2.0 -  u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    
    uv *= 8.0;
    
    vec3 color = texture(fbo, vTexCoord.xy).rgb;
    //color.r += random(floor(uv));
    //color.gb += sin(randomTile(uv) * u_time * 5.0);
    
    color.b += sin(randomTile(uv) * u_time * 5.0) * 0.6;
    
    fragColor = vec4(color, 1.0);
}
