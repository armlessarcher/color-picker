import hsltohex from 'hsl-to-hex';

var withinCircle = function(num) {
  num = num > 360 ? num - 360 : num;
  num = num < 0 ? num + 360 : num;
  return num;
};

var RGBtoHSL = function(rgb) {

  var r = rgb[0] / 255;
  var g = rgb[1] / 255;
  var b = rgb[2] / 255;

  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h = (max + min) / 2;
  var s = (max + min) / 2;
  var l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
    case r:
      h = (g - b) / d + (g < b ? 6 : 0);
      break;
    case g:
      h = (b -
        r) / d + 2;
      break;
    case b:
      h = (r - g) / d + 4;
      break;
    }
    h /= 6;
  }
  h *= 360;
  s *= 100;
  l *= 100;
  return [Math.round(h),Math.round(s), Math.round(l)];
};


var rgbToHsl = function([r, g, b]){
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if(max == min){
      h = s = 0; // achromatic
  }else{
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max){
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
  }

  return [h * 100, s * 100, l * 100];
};

// console.log(RGBtoHSL([219, 39, 99]));

var HSLtoRGB = function(hsl) {
  var h = hsl[0] / 100;
  var s = hsl[1] / 100;
  var l = hsl[2] / 100;
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);

    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [r * 255, g * 255, b * 255];
};
// console.log(HSLtoRGB(193, 67, 28));

var componentToHex = function(c) {
  var hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
};

var RGBtoHex = function([r, g, b]) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

var HEXtoRGB = function(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  var r = parseInt(result[1], 16);
  var g = parseInt(result[2], 16);
  var b = parseInt(result[3], 16);

  return ([r, g, b]);
};

// console.log(HEXtoRGB('#FFFFF1'));

var complimentary = function(hsl) {
  var results = [];
  results.push(hsltohex(hsl[0], hsl[1], hsl[2]));
  // console.log(hsltohex(hsl[0), hsl[0), hsl[2))
  var h = hsl[0];

  h = withinCircle(h + 180);

  // results.push([h, hsl[1], hsl[2]]);
  results.push(hsltohex(h, hsl[1], hsl[2]));
  return results;
};

var triad = function(hsl) {
  var results = [];
  //takes [h,s,l]
  var h = hsl[0] - 120;
  var s = hsl[1];
  var l = hsl[2];
  h = withinCircle(h);

  results.push(
    hsltohex(h, s, l)
  );
  h += 120;
  results.push(hsltohex(h, s, l));

  h = withinCircle(h + 120);
  results.push(hsltohex(h, s, l));

  return results;
};
// console.log(triad([193, 67, 28]));
var analagous = function(hsl) {
  var results = [];
  //takes [h,s,l]
  var h = hsl[0];
  var s = hsl[1];
  var l = hsl[2];

  h = withinCircle(h - 30);
  results.push(hsltohex(h, s, l));
  h = withinCircle(h + 30);
  results.push(hsltohex(h,s,l));

  h = withinCircle(h + 30);
  results.push(hsltohex(h, s, l));
  return results;
};

var splitComplimentary = function(hsl) {
  var results = [];
  var h = hsl[0];
  var s = hsl[1];
  var l = hsl[2];
  var h1 = withinCircle(h - 150);
  var h2 = withinCircle(h + 150);

  results.push(hsltohex(h1, s, l));
  results.push(hsltohex(h, s, l));
  results.push(hsltohex(h2, s, l));
  return results;
};

var squareTetrad = function(hsl) {
  var results = [];
  var h = hsl[0];
  var s = hsl[1];
  var l = hsl[2];

  for (var i = 0; i < 4; i++) {
    h = withinCircle(h + 90);

    results.push(hsltohex(h, s, l));
  }
  return results;
};

var monochromatic = function(hsl) {
  var results = [];
  var h = hsl[0];
  var s = hsl[1];
  var l = hsl[2];

  for (var i = 0; i <= 100; i += 25) {
    results.push(hsltohex(h, i, l));
  }
  return results;
};

var rectangularTetrad = function(hsl) {
  //-30, + 150, + 180;
  var results = [];
  var h = hsl[0];
  var s = hsl[1];
  var l = hsl[2];

  var temp = withinCircle(h - 30);
  results.push(hsltohex(temp, s, l));

  results.push(hsltohex(hsl[0], hsl[1], hsl[2]));

  temp = withinCircle(h + 150);
  results.push(hsltohex(temp, s, l));

  temp = withinCircle(h + 180);
  results.push(hsltohex(temp, s, l));

  return results;
};

//May or may not do this   //probably not going to do this.
var cool = function(hsl) {
  var results = [];
  var h = hsl[0];
  var s = hsl[1];
  var l = hsl[2];
};

var warm = function(hsl) {
  var results = [];
  var h = hsl[0];
  var s = hsl[1];
  var l = hsl[2];
};

var convertMatrix = function(array){
  var results = [];
  for (var i = 0; i < array.length; i++) {
    var inner = [];
    for (var j = 0; j < array[i].length; j++) {
        inner.push(RGBtoHEX(HSLtoRGB(array[j][i])));
    }
    results.push(inner);
  }
};

var hexToGrayscale = function(hexColor) {
  var grayScaleConstants = [.3, .59, .11];
  var rgbArray = HEXtoRGB(hexColor);
  var sum = 0;
  for (let j = 0; j < rgbArray.length; j++) {
    sum += grayScaleConstants[j] * rgbArray[j];
  }
  var grayscale = (sum / 245);
  // console.log('grayscale color' + (i + 1).toString() + ' = ', grayscale);
  return grayscale;
};

export {RGBtoHex, HEXtoRGB, RGBtoHSL, rectangularTetrad, monochromatic, triad, complimentary, squareTetrad, analagous, splitComplimentary, convertMatrix, hexToGrayscale, HSLtoRGB};
