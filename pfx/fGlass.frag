#version 150
precision mediump float;

uniform sampler2DRect fbo;
uniform vec2 u_resolution;

in vec2 vTexCoord;

out vec4 fragColor;

float rand(vec2 co) {
    
    float a = fract(dot(co, vec2(2.067390879775102, 12.451168662908249))) - 0.5;
    float s = a * (6.182785114200511 + a * a * (-38.026512460676566 + a * a * 53.392573080032137));
    float t = fract(s * 43758.5453);
    return t;
}

void main(){
    
    float radius = 5.0;
    
    float x = vTexCoord.x + rand(vTexCoord / u_resolution) * radius * 2.0 - radius;
    float y = vTexCoord.y + rand(vec2(vTexCoord.y, vTexCoord.x) / u_resolution) * radius * 2.0 - radius;
    
    vec4 textureColor = texture(fbo, vec2(x,y));
    fragColor = textureColor;
}
