var gl;
var thetaLoc;
var theta;
var as = false;
var speed = 0.01;
var direction = true;
var delay = 0;
var uScale;
var uTranslationx,uTranslationy;
var x = 0.8,
    y = 0.8;
var r = 0,
    g = 0,  
    b = 0;
var a = 0,
    b = 0;
var colors = [r,g,b];
var colorr;    
var translationx = [a];
var translationy = [b];

window.onload = function main() {
  const canvas = document.querySelector("#glcanvas");
  gl = canvas.getContext("webgl");
  if (!gl) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it."
    );
    return;
  }

  var program = initShaders(gl, "vertex-shader", "fragment-shader");


  var myButton = document.getElementById("DirectionButton");
  myButton.addEventListener("click", function () {
    direction = !direction;
  });

  
  document.getElementById("rslide").onchange = function() { 
    r = this.value/255;
    var p1 = document.getElementById("p1").innerHTML = this.value;
  };
  document.getElementById("gslide").onchange = function() {
    g = this.value/255;
    var p2 = document.getElementById("p2").innerHTML = this.value;
  };
  document.getElementById("bslide").onchange = function() {
    b = this.value/255;
    var p3 = document.getElementById("p3").innerHTML = this.value;
  };


  
  document.addEventListener("keydown", function (event) {
    if (event.keyCode == 32) {
      if (as) as = false;
      else if (as == false) as = true;
    } else if (event.keyCode == 87) {
      if (speed < 0.4) speed += 0.01;
    } else if (event.keyCode == 83) {
      if (speed > 0) speed -= 0.01;
    } else if (event.keyCode == 65) {
      if (x > 0.2 && y > 0.2) {
        x -= 0.1;
        y -= 0.1;
        gl.uniform2f(uScale, x, y);
      }
    } else if (event.keyCode == 68) {
      if (x <= 0.8 && y <= 0.8) {
        x += 0.1;
        y += 0.1;
        gl.uniform2f(uScale, x, y);
      }
    }else if (event.keyCode == 81){
      direction =false;
    }else if (event.keyCode == 69){
      direction = true;
    }else if (event.keyCode == 37){
      a -= 0.05;
      gl.uniform1f(uTranslationx,[a]);
    }else if (event.keyCode == 38){
      b += 0.05;
      gl.uniform1f(uTranslationy,[b]);
    }else if (event.keyCode == 39){
      a += 0.05;
      gl.uniform1f(uTranslationx,[a]);

    }else if (event.keyCode == 40){
      b -= 0.05;
      gl.uniform1f(uTranslationy,[b]);
    }
  });

  gl.useProgram(program); 
  
  var vertices = [
    vec2(-0.75, 0.65),
    vec2(-0.7, 0.7),
    vec2(-0.4, 0.3),

    vec2(-0.7, 0.7),
    vec2(-0.4, 0.3),
    vec2(-0.3, 0.3),

    vec2(-0.4, 0.3),
    vec2(0.0, 0.7),
    vec2(0.05, 0.65),

    vec2(0.05, 0.65),
    vec2(-0.4, 0.3),
    vec2(-0.3, 0.3),

    vec2(-0.4, 0.35),
    vec2(-0.4, -0.4),
    vec2(-0.3, -0.4),

    vec2(-0.3, -0.4),
    vec2(-0.4, 0.35),
    vec2(-0.3, 0.35),
    
    vec2(0.2, 0.3),
    vec2(0.2, -0.4),
    vec2(0.3, 0.3),

    vec2(0.2, -0.4),
    vec2(0.3, 0.3),
    vec2(0.3, -0.4),

    vec2(0.2, -0.4),
    vec2(0.8, -0.4),
    vec2(0.2, -0.3),

    vec2(0.8, -0.4),
    vec2(0.2, -0.3),
    vec2(0.8, -0.3),

    vec2(0.8, -0.4),
    vec2(0.8, 0.3),
    vec2(0.7, -0.4),

    vec2(0.8, 0.3),
    vec2(0.7, -0.4),
    vec2(0.7, 0.3),
  ];


  var bufferId = gl.createBuffer(); 
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

  
  var vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  thetaLoc = gl.getUniformLocation(program, "theta");
  theta = 0;

  colorr = gl.getUniformLocation(program,"fragColor");
  gl.uniform3fv(colorr,colors);



  var uTranslationx = gl.getUniformLocation(program,"uTranslationx");
  var uTranslationy = gl.getUniformLocation(program,"uTranslationy");

  gl.uniform1f(uTranslationx,translationx);
  gl.uniform1f(uTranslationy,translationy);


  var uScale = gl.getUniformLocation(program, "uScale");
  gl.uniform1f(thetaLoc, theta);
  gl.uniform2f(uScale, x, y);
  render();
};

function render() {
 
  gl.clearColor(r,g,b, 0.6); 

  setTimeout(function () {
    requestAnimationFrame(render);

    gl.clear(gl.COLOR_BUFFER_BIT);
    if (as) {
      theta += direction ? -speed : speed;
    }
    colors =  [r,g,b];
    gl.uniform3fv(colorr,colors);
    gl.uniform1f(uTranslationx,translationx);
    gl.uniform1f(uTranslationy,translationy);  
    gl.uniform2f(uScale, x, y);
    gl.uniform1f(thetaLoc, theta);
    gl.drawArrays(gl.TRIANGLES, 0, 36);

  }, 100 - delay);
}
