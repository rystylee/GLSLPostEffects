#version 150
precision mediump float;

uniform sampler2DRect fbo;
uniform vec2 u_resolution;
uniform float u_time;
uniform float shadeVal0;

in vec2 vTexCoord;

out vec4 fragColor;

float _PowerA = 10.0;
float _PowerB = 10.0;
float _PowerC = 10.0;

float rand(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    
    vec4 tex = texture(fbo, vTexCoord.xy);
    
    vec3 col;
    float time = u_time * 1.0;
    
    float ran = rand(vec2(1.0, 10.0));
    
    _PowerA = _PowerB = _PowerC = shadeVal0 * 0.3;
    
    col.r = texture(fbo, vTexCoord.xy).r;
    col.g = texture(fbo, vTexCoord.xy - vec2(cos(time) * 0.05 * _PowerA * rand(vec2(-50.0, 50.0)), sin(time) * 0.035) * _PowerC * rand(vec2(-25.0, 25.0))).g;
    col.b = texture(fbo, vTexCoord.xy - vec2(sin(time) * 0.06 * _PowerB * rand(vec2(-50.0, 50.0)), cos(time) * 0.025) * _PowerC * rand(vec2(-25.0, 25.0))).b;
    
    fragColor = vec4(col, 1.0);
}
