"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Utils = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _MoveDirection = require("../../Enums/MoveDirection");

/* ---------- global functions - vendors ------------ */
var Utils = /*#__PURE__*/function () {
  function Utils() {
    (0, _classCallCheck2["default"])(this, Utils);
  }

  (0, _createClass2["default"])(Utils, null, [{
    key: "hexToRgb",

    /**
     * Converts hexadecimal string (HTML color code) in a [[IRgb]] object
     * @param hex the hexadecimal string (#f70 or #ff7700)
     */
    value: function hexToRgb(hex) {
      // By Tim Down - http://stackoverflow.com/a/5624139/3493650
      // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
      var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      var hexFixed = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
      });
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexFixed);
      return result ? {
        b: parseInt(result[3], 16),
        g: parseInt(result[2], 16),
        r: parseInt(result[1], 16)
      } : null;
    }
    /**
     * Converts a Hue Saturation Lightness ([[IHsl]]) object in a [[IRgb]] object
     * @param hsl
     */

  }, {
    key: "hslToRgb",
    value: function hslToRgb(hsl) {
      var result = {
        b: 0,
        g: 0,
        r: 0
      };

      if (hsl.s == 0) {
        result.b = hsl.l; // achromatic

        result.g = hsl.l;
        result.r = hsl.l;
      } else {
        var q = hsl.l < 0.5 ? hsl.l * (1 + hsl.s) : hsl.l + hsl.s - hsl.l * hsl.s;
        var p = 2 * hsl.l - q;
        result.r = Utils.hue2rgb(p, q, hsl.h + 1 / 3);
        result.g = Utils.hue2rgb(p, q, hsl.h);
        result.b = Utils.hue2rgb(p, q, hsl.h - 1 / 3);
      }

      result.r = Math.round(result.r * 255);
      result.g = Math.round(result.g * 255);
      result.b = Math.round(result.b * 255);
      return result;
    }
    /**
     * Generate a random RGBA color
     * @param min a minimum seed value for all 3 values
     */

  }, {
    key: "getRandomColorRGBA",
    value: function getRandomColorRGBA(min) {
      var fixedMin = min || 0;
      return {
        b: Math.floor(Math.random() * (255 * fixedMin) + fixedMin),
        g: Math.floor(Math.random() * (255 * fixedMin) + fixedMin),
        r: Math.floor(Math.random() * (255 * fixedMin) + fixedMin)
      };
    }
    /**
     * Clamps a number between a minimum and maximum value
     * @param num the source number
     * @param min the minimum value
     * @param max the maximum value
     */

  }, {
    key: "clamp",
    value: function clamp(num, min, max) {
      return Math.min(Math.max(num, min), max);
    }
    /**
     * Check if a value is equal to the destination, if same type, or is in the provided array
     * @param value the value to check
     * @param array the data array or single value
     */

  }, {
    key: "isInArray",
    value: function isInArray(value, array) {
      return value === array || array.indexOf(value) > -1;
    }
    /**
     * Extend destination object with source values
     * @param destination the object to extend
     * @param source the source providing new values
     */

  }, {
    key: "deepExtend",
    value: function deepExtend(destination, source) {
      for (var property in source) {
        if (source[property] && source[property].constructor && source[property].constructor === Object) {
          destination[property] = destination[property] || {};
          Utils.deepExtend(destination[property], source[property]);
        } else {
          destination[property] = source[property];
        }
      }

      return destination;
    }
    /**
     *
     * @param comp1
     * @param comp2
     * @param weight1
     * @param weight2
     */

  }, {
    key: "mixComponents",
    value: function mixComponents(comp1, comp2, weight1, weight2) {
      return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
    }
    /**
     * Prepares a rgba() css function from a [[IRgb]] object
     * @param color the [[IRgb]] color to convert
     */

  }, {
    key: "getStyleFromColor",
    value: function getStyleFromColor(color) {
      return "rgba(".concat(Math.floor(color.r), ", ").concat(Math.floor(color.g), ", ").concat(Math.floor(color.b), ", 0.4)");
    }
    /**
     * Get Particle base velocity
     * @param options the options to use for calculating the velocity
     */

  }, {
    key: "getParticleBaseVelocity",
    value: function getParticleBaseVelocity(options) {
      var velocityBase;

      switch (options.particles.move.direction) {
        case _MoveDirection.MoveDirection.top:
          velocityBase = {
            x: 0,
            y: -1
          };
          break;

        case _MoveDirection.MoveDirection.topRight:
          velocityBase = {
            x: 0.5,
            y: -0.5
          };
          break;

        case _MoveDirection.MoveDirection.right:
          velocityBase = {
            x: 1,
            y: -0
          };
          break;

        case _MoveDirection.MoveDirection.bottomRight:
          velocityBase = {
            x: 0.5,
            y: 0.5
          };
          break;

        case _MoveDirection.MoveDirection.bottom:
          velocityBase = {
            x: 0,
            y: 1
          };
          break;

        case _MoveDirection.MoveDirection.bottomLeft:
          velocityBase = {
            x: -0.5,
            y: 1
          };
          break;

        case _MoveDirection.MoveDirection.left:
          velocityBase = {
            x: -1,
            y: 0
          };
          break;

        case _MoveDirection.MoveDirection.topLeft:
          velocityBase = {
            x: -0.5,
            y: -0.5
          };
          break;

        default:
          velocityBase = {
            x: 0,
            y: 0
          };
          break;
      }

      return velocityBase;
    }
    /**
     * Gets the particles color
     * @param options the options to use for calculating the color
     * @param color the input color to convert in [[IRgb]] object
     */

  }, {
    key: "getParticleColor",
    value: function getParticleColor(options, color) {
      var res = null;

      if ((0, _typeof2["default"])(color.value) === "object") {
        if (color.value instanceof Array) {
          var arr = options.particles.color.value;
          var colorSelected = color.value[Math.floor(Math.random() * arr.length)];
          res = Utils.hexToRgb(colorSelected);
        } else {
          var rgbColor = color.value;

          if (rgbColor.r !== undefined) {
            res = rgbColor;
          }

          var hslColor = color.value;

          if (hslColor.h !== undefined) {
            res = Utils.hslToRgb(hslColor);
          }
        }
      } else {
        if (color.value === "random") {
          res = {
            b: Math.floor(Math.random() * 256),
            g: Math.floor(Math.random() * 256),
            r: Math.floor(Math.random() * 256)
          };
        } else {
          res = Utils.hexToRgb(color.value);
        }
      }

      return res;
    }
    /**
     * Gets the distance between two coordinates
     * @param pointA the first coordinate
     * @param pointB the second coordinate
     */

  }, {
    key: "getDistanceBetweenCoordinates",
    value: function getDistanceBetweenCoordinates(pointA, pointB) {
      var dx = pointA.x - pointB.x;
      var dy = pointA.y - pointB.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
    /**
     *
     * @param p
     * @param q
     * @param t
     */

  }, {
    key: "hue2rgb",
    value: function hue2rgb(p, q, t) {
      var tCalc = t;

      if (tCalc < 0) {
        tCalc += 1;
      }

      if (tCalc > 1) {
        tCalc -= 1;
      }

      if (tCalc < 1 / 6) {
        return p + (q - p) * 6 * tCalc;
      }

      if (tCalc < 1 / 2) {
        return q;
      }

      if (tCalc < 2 / 3) {
        return p + (q - p) * (2 / 3 - tCalc) * 6;
      }

      return p;
    }
  }]);
  return Utils;
}();

exports.Utils = Utils;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9DbGFzc2VzL1V0aWxzL1V0aWxzLnRzIl0sIm5hbWVzIjpbIlV0aWxzIiwiaGV4Iiwic2hvcnRoYW5kUmVnZXgiLCJoZXhGaXhlZCIsInJlcGxhY2UiLCJtIiwiciIsImciLCJiIiwicmVzdWx0IiwiZXhlYyIsInBhcnNlSW50IiwiaHNsIiwicyIsImwiLCJxIiwicCIsImh1ZTJyZ2IiLCJoIiwiTWF0aCIsInJvdW5kIiwibWluIiwiZml4ZWRNaW4iLCJmbG9vciIsInJhbmRvbSIsIm51bSIsIm1heCIsInZhbHVlIiwiYXJyYXkiLCJpbmRleE9mIiwiZGVzdGluYXRpb24iLCJzb3VyY2UiLCJwcm9wZXJ0eSIsImNvbnN0cnVjdG9yIiwiT2JqZWN0IiwiZGVlcEV4dGVuZCIsImNvbXAxIiwiY29tcDIiLCJ3ZWlnaHQxIiwid2VpZ2h0MiIsImNvbG9yIiwib3B0aW9ucyIsInZlbG9jaXR5QmFzZSIsInBhcnRpY2xlcyIsIm1vdmUiLCJkaXJlY3Rpb24iLCJNb3ZlRGlyZWN0aW9uIiwidG9wIiwieCIsInkiLCJ0b3BSaWdodCIsInJpZ2h0IiwiYm90dG9tUmlnaHQiLCJib3R0b20iLCJib3R0b21MZWZ0IiwibGVmdCIsInRvcExlZnQiLCJyZXMiLCJBcnJheSIsImFyciIsImNvbG9yU2VsZWN0ZWQiLCJsZW5ndGgiLCJoZXhUb1JnYiIsInJnYkNvbG9yIiwidW5kZWZpbmVkIiwiaHNsQ29sb3IiLCJoc2xUb1JnYiIsInBvaW50QSIsInBvaW50QiIsImR4IiwiZHkiLCJzcXJ0IiwidCIsInRDYWxjIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBTUE7O0FBR0E7SUFDYUEsSzs7Ozs7Ozs7QUFDVDs7Ozs2QkFJdUJDLEcsRUFBMEI7QUFDN0M7QUFDQTtBQUNBLFVBQU1DLGNBQWMsR0FBRyxrQ0FBdkI7QUFFQSxVQUFNQyxRQUFRLEdBQUdGLEdBQUcsQ0FBQ0csT0FBSixDQUFZRixjQUFaLEVBQTRCLFVBQUNHLENBQUQsRUFB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ckIsQ0FBTjtBQUNIO0FBQ0o7O0FBRUQsYUFBTzhCLEdBQVA7QUFDSDtBQUVEOzs7Ozs7OztrREFLNENVLE0sRUFBc0JDLE0sRUFBOEI7QUFDNUYsVUFBTUMsRUFBRSxHQUFHRixNQUFNLENBQUNuQixDQUFQLEdBQVdvQixNQUFNLENBQUNwQixDQUE3QjtBQUNBLFVBQU1zQixFQUFFLEdBQUdILE1BQU0sQ0FBQ2xCLENBQVAsR0FBV21CLE1BQU0sQ0FBQ25CLENBQTdCO0FBQ0EsYUFBTzlCLElBQUksQ0FBQ29ELElBQUwsQ0FBVUYsRUFBRSxHQUFHQSxFQUFMLEdBQVVDLEVBQUUsR0FBR0EsRUFBekIsQ0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs0QkFNdUJ0RCxDLEVBQVdELEMsRUFBV3lELEMsRUFBbUI7QUFDNUQsVUFBSUMsS0FBSyxHQUFHRCxDQUFaOztBQUVBLFVBQUlDLEtBQUssR0FBRyxDQUFaLEVBQWU7QUFDWEEsUUFBQUEsS0FBSyxJQUFJLENBQVQ7QUFDSDs7QUFFRCxVQUFJQSxLQUFLLEdBQUcsQ0FBWixFQUFlO0FBQ1hBLFFBQUFBLEtBQUssSUFBSSxDQUFUO0FBQ0g7O0FBRUQsVUFBSUEsS0FBSyxHQUFHLElBQUksQ0FBaEIsRUFBbUI7QUFDZixlQUFPekQsQ0FBQyxHQUFHLENBQUNELENBQUMsR0FBR0MsQ0FBTCxJQUFVLENBQVYsR0FBY3lELEtBQXpCO0FBQ0g7O0FBRUQsVUFBSUEsS0FBSyxHQUFHLElBQUksQ0FBaEIsRUFBbUI7QUFDZixlQUFPMUQsQ0FBUDtBQUNIOztBQUVELFVBQUkwRCxLQUFLLEdBQUcsSUFBSSxDQUFoQixFQUFtQjtBQUNmLGVBQU96RCxDQUFDLEdBQUcsQ0FBQ0QsQ0FBQyxHQUFHQyxDQUFMLEtBQVcsSUFBSSxDQUFKLEdBQVF5RCxLQUFuQixJQUE0QixDQUF2QztBQUNIOztBQUVELGFBQU96RCxDQUFQO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHtJQ29vcmRpbmF0ZXN9IGZyb20gXCIuLi8uLi9JbnRlcmZhY2VzL0lDb29yZGluYXRlc1wiO1xuaW1wb3J0IHtJSHNsfSBmcm9tIFwiLi4vLi4vSW50ZXJmYWNlcy9JSHNsXCI7XG5pbXBvcnQge0lSZ2J9IGZyb20gXCIuLi8uLi9JbnRlcmZhY2VzL0lSZ2JcIjtcbmltcG9ydCB7SUNvbG9yfSBmcm9tIFwiLi4vLi4vSW50ZXJmYWNlcy9JQ29sb3JcIjtcbmltcG9ydCB7TW92ZURpcmVjdGlvbn0gZnJvbSBcIi4uLy4uL0VudW1zL01vdmVEaXJlY3Rpb25cIjtcbmltcG9ydCB7SU9wdGlvbnN9IGZyb20gXCIuLi8uLi9JbnRlcmZhY2VzL09wdGlvbnMvSU9wdGlvbnNcIjtcblxuLyogLS0tLS0tLS0tLSBnbG9iYWwgZnVuY3Rpb25zIC0gdmVuZG9ycyAtLS0tLS0tLS0tLS0gKi9cbmV4cG9ydCBjbGFzcyBVdGlscyB7XG4gICAgLyoqXG4gICAgICogQ29udmVydHMgaGV4YWRlY2ltYWwgc3RyaW5nIChIVE1MIGNvbG9yIGNvZGUpIGluIGEgW1tJUmdiXV0gb2JqZWN0XG4gICAgICogQHBhcmFtIGhleCB0aGUgaGV4YWRlY2ltYWwgc3RyaW5nICgjZjcwIG9yICNmZjc3MDApXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBoZXhUb1JnYihoZXg6IHN0cmluZyk6IElSZ2IgfCBudWxsIHtcbiAgICAgICAgLy8gQnkgVGltIERvd24gLSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS81NjI0MTM5LzM0OTM2NTBcbiAgICAgICAgLy8gRXhwYW5kIHNob3J0aGFuZCBmb3JtIChlLmcuIFwiMDNGXCIpIHRvIGZ1bGwgZm9ybSAoZS5nLiBcIjAwMzNGRlwiKVxuICAgICAgICBjb25zdCBzaG9ydGhhbmRSZWdleCA9IC9eIz8oW2EtZlxcZF0pKFthLWZcXGRdKShbYS1mXFxkXSkkL2k7XG5cbiAgICAgICAgY29uc3QgaGV4Rml4ZWQgPSBoZXgucmVwbGFjZShzaG9ydGhhbmRSZWdleCwgKG0sIHIsIGcsIGIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiByICsgciArIGcgKyBnICsgYiArIGI7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IC9eIz8oW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkkL2kuZXhlYyhoZXhGaXhlZCk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdCA/IHtcbiAgICAgICAgICAgIGI6IHBhcnNlSW50KHJlc3VsdFszXSwgMTYpLFxuICAgICAgICAgICAgZzogcGFyc2VJbnQocmVzdWx0WzJdLCAxNiksXG4gICAgICAgICAgICByOiBwYXJzZUludChyZXN1bHRbMV0sIDE2KSxcbiAgICAgICAgfSA6IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBIdWUgU2F0dXJhdGlvbiBMaWdodG5lc3MgKFtbSUhzbF1dKSBvYmplY3QgaW4gYSBbW0lSZ2JdXSBvYmplY3RcbiAgICAgKiBAcGFyYW0gaHNsXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBoc2xUb1JnYihoc2w6IElIc2wpOiBJUmdiIHtcbiAgICAgICAgY29uc3QgcmVzdWx0OiBJUmdiID0ge2I6IDAsIGc6IDAsIHI6IDB9O1xuXG4gICAgICAgIGlmIChoc2wucyA9PSAwKSB7XG4gICAgICAgICAgICByZXN1bHQuYiA9IGhzbC5sOyAvLyBhY2hyb21hdGljXG4gICAgICAgICAgICByZXN1bHQuZyA9IGhzbC5sO1xuICAgICAgICAgICAgcmVzdWx0LnIgPSBoc2wubDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHEgPSBoc2wubCA8IDAuNSA/IGhzbC5sICogKDEgKyBoc2wucykgOiBoc2wubCArIGhzbC5zIC0gaHNsLmwgKiBoc2wucztcbiAgICAgICAgICAgIGNvbnN0IHAgPSAyICogaHNsLmwgLSBxO1xuXG4gICAgICAgICAgICByZXN1bHQuciA9IFV0aWxzLmh1ZTJyZ2IocCwgcSwgaHNsLmggKyAxIC8gMyk7XG4gICAgICAgICAgICByZXN1bHQuZyA9IFV0aWxzLmh1ZTJyZ2IocCwgcSwgaHNsLmgpO1xuICAgICAgICAgICAgcmVzdWx0LmIgPSBVdGlscy5odWUycmdiKHAsIHEsIGhzbC5oIC0gMSAvIDMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0LnIgPSBNYXRoLnJvdW5kKHJlc3VsdC5yICogMjU1KTtcbiAgICAgICAgcmVzdWx0LmcgPSBNYXRoLnJvdW5kKHJlc3VsdC5nICogMjU1KTtcbiAgICAgICAgcmVzdWx0LmIgPSBNYXRoLnJvdW5kKHJlc3VsdC5iICogMjU1KTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlIGEgcmFuZG9tIFJHQkEgY29sb3JcbiAgICAgKiBAcGFyYW0gbWluIGEgbWluaW11bSBzZWVkIHZhbHVlIGZvciBhbGwgMyB2YWx1ZXNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldFJhbmRvbUNvbG9yUkdCQShtaW4/OiBudW1iZXIpOiBJUmdiIHtcbiAgICAgICAgY29uc3QgZml4ZWRNaW4gPSBtaW4gfHwgMDtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGI6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgyNTUgKiBmaXhlZE1pbikgKyBmaXhlZE1pbiksXG4gICAgICAgICAgICBnOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMjU1ICogZml4ZWRNaW4pICsgZml4ZWRNaW4pLFxuICAgICAgICAgICAgcjogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDI1NSAqIGZpeGVkTWluKSArIGZpeGVkTWluKSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbGFtcHMgYSBudW1iZXIgYmV0d2VlbiBhIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWVcbiAgICAgKiBAcGFyYW0gbnVtIHRoZSBzb3VyY2UgbnVtYmVyXG4gICAgICogQHBhcmFtIG1pbiB0aGUgbWluaW11bSB2YWx1ZVxuICAgICAqIEBwYXJhbSBtYXggdGhlIG1heGltdW0gdmFsdWVcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNsYW1wKG51bTogbnVtYmVyLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgobnVtLCBtaW4pLCBtYXgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGEgdmFsdWUgaXMgZXF1YWwgdG8gdGhlIGRlc3RpbmF0aW9uLCBpZiBzYW1lIHR5cGUsIG9yIGlzIGluIHRoZSBwcm92aWRlZCBhcnJheVxuICAgICAqIEBwYXJhbSB2YWx1ZSB0aGUgdmFsdWUgdG8gY2hlY2tcbiAgICAgKiBAcGFyYW0gYXJyYXkgdGhlIGRhdGEgYXJyYXkgb3Igc2luZ2xlIHZhbHVlXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBpc0luQXJyYXk8VD4odmFsdWU6IFQsIGFycmF5OiBUW10gfCBUKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB2YWx1ZSA9PT0gYXJyYXkgfHwgKGFycmF5IGFzIFRbXSkuaW5kZXhPZih2YWx1ZSkgPiAtMTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeHRlbmQgZGVzdGluYXRpb24gb2JqZWN0IHdpdGggc291cmNlIHZhbHVlc1xuICAgICAqIEBwYXJhbSBkZXN0aW5hdGlvbiB0aGUgb2JqZWN0IHRvIGV4dGVuZFxuICAgICAqIEBwYXJhbSBzb3VyY2UgdGhlIHNvdXJjZSBwcm92aWRpbmcgbmV3IHZhbHVlc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZGVlcEV4dGVuZChkZXN0aW5hdGlvbjogYW55LCBzb3VyY2U6IGFueSk6IGFueSB7XG4gICAgICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gc291cmNlKSB7XG4gICAgICAgICAgICBpZiAoc291cmNlW3Byb3BlcnR5XSAmJiBzb3VyY2VbcHJvcGVydHldLmNvbnN0cnVjdG9yICYmIHNvdXJjZVtwcm9wZXJ0eV0uY29uc3RydWN0b3IgPT09IE9iamVjdCkge1xuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uW3Byb3BlcnR5XSA9IGRlc3RpbmF0aW9uW3Byb3BlcnR5XSB8fCB7fTtcblxuICAgICAgICAgICAgICAgIFV0aWxzLmRlZXBFeHRlbmQoZGVzdGluYXRpb25bcHJvcGVydHldLCBzb3VyY2VbcHJvcGVydHldKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb25bcHJvcGVydHldID0gc291cmNlW3Byb3BlcnR5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVzdGluYXRpb247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29tcDFcbiAgICAgKiBAcGFyYW0gY29tcDJcbiAgICAgKiBAcGFyYW0gd2VpZ2h0MVxuICAgICAqIEBwYXJhbSB3ZWlnaHQyXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBtaXhDb21wb25lbnRzKGNvbXAxOiBudW1iZXIsIGNvbXAyOiBudW1iZXIsIHdlaWdodDE6IG51bWJlciwgd2VpZ2h0MjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIChjb21wMSAqIHdlaWdodDEgKyBjb21wMiAqIHdlaWdodDIpIC8gKHdlaWdodDEgKyB3ZWlnaHQyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcmVwYXJlcyBhIHJnYmEoKSBjc3MgZnVuY3Rpb24gZnJvbSBhIFtbSVJnYl1dIG9iamVjdFxuICAgICAqIEBwYXJhbSBjb2xvciB0aGUgW1tJUmdiXV0gY29sb3IgdG8gY29udmVydFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0U3R5bGVGcm9tQ29sb3IoY29sb3I6IElSZ2IpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYHJnYmEoJHtNYXRoLmZsb29yKGNvbG9yLnIpfSwgJHtNYXRoLmZsb29yKGNvbG9yLmcpfSwgJHtNYXRoLmZsb29yKGNvbG9yLmIpfSwgMC40KWA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IFBhcnRpY2xlIGJhc2UgdmVsb2NpdHlcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyB0aGUgb3B0aW9ucyB0byB1c2UgZm9yIGNhbGN1bGF0aW5nIHRoZSB2ZWxvY2l0eVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UGFydGljbGVCYXNlVmVsb2NpdHkob3B0aW9uczogSU9wdGlvbnMpOiBJQ29vcmRpbmF0ZXMge1xuICAgICAgICBsZXQgdmVsb2NpdHlCYXNlOiBJQ29vcmRpbmF0ZXM7XG5cbiAgICAgICAgc3dpdGNoIChvcHRpb25zLnBhcnRpY2xlcy5tb3ZlLmRpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSBNb3ZlRGlyZWN0aW9uLnRvcDpcbiAgICAgICAgICAgICAgICB2ZWxvY2l0eUJhc2UgPSB7eDogMCwgeTogLTF9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBNb3ZlRGlyZWN0aW9uLnRvcFJpZ2h0OlxuICAgICAgICAgICAgICAgIHZlbG9jaXR5QmFzZSA9IHt4OiAwLjUsIHk6IC0wLjV9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBNb3ZlRGlyZWN0aW9uLnJpZ2h0OlxuICAgICAgICAgICAgICAgIHZlbG9jaXR5QmFzZSA9IHt4OiAxLCB5OiAtMH07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIE1vdmVEaXJlY3Rpb24uYm90dG9tUmlnaHQ6XG4gICAgICAgICAgICAgICAgdmVsb2NpdHlCYXNlID0ge3g6IDAuNSwgeTogMC41fTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTW92ZURpcmVjdGlvbi5ib3R0b206XG4gICAgICAgICAgICAgICAgdmVsb2NpdHlCYXNlID0ge3g6IDAsIHk6IDF9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBNb3ZlRGlyZWN0aW9uLmJvdHRvbUxlZnQ6XG4gICAgICAgICAgICAgICAgdmVsb2NpdHlCYXNlID0ge3g6IC0wLjUsIHk6IDF9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBNb3ZlRGlyZWN0aW9uLmxlZnQ6XG4gICAgICAgICAgICAgICAgdmVsb2NpdHlCYXNlID0ge3g6IC0xLCB5OiAwfTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTW92ZURpcmVjdGlvbi50b3BMZWZ0OlxuICAgICAgICAgICAgICAgIHZlbG9jaXR5QmFzZSA9IHt4OiAtMC41LCB5OiAtMC41fTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdmVsb2NpdHlCYXNlID0ge3g6IDAsIHk6IDB9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZlbG9jaXR5QmFzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwYXJ0aWNsZXMgY29sb3JcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyB0aGUgb3B0aW9ucyB0byB1c2UgZm9yIGNhbGN1bGF0aW5nIHRoZSBjb2xvclxuICAgICAqIEBwYXJhbSBjb2xvciB0aGUgaW5wdXQgY29sb3IgdG8gY29udmVydCBpbiBbW0lSZ2JdXSBvYmplY3RcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldFBhcnRpY2xlQ29sb3Iob3B0aW9uczogSU9wdGlvbnMsIGNvbG9yOiB7IHZhbHVlOiBzdHJpbmdbXSB8IElDb2xvciB8IHN0cmluZyB9KTogSVJnYiB8IG51bGwge1xuICAgICAgICBsZXQgcmVzOiBJUmdiIHwgbnVsbCA9IG51bGw7XG5cbiAgICAgICAgaWYgKHR5cGVvZiAoY29sb3IudmFsdWUpID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICBpZiAoY29sb3IudmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFyciA9IG9wdGlvbnMucGFydGljbGVzLmNvbG9yLnZhbHVlIGFzIHN0cmluZ1tdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yU2VsZWN0ZWQgPSBjb2xvci52YWx1ZVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhcnIubGVuZ3RoKV07XG5cbiAgICAgICAgICAgICAgICByZXMgPSBVdGlscy5oZXhUb1JnYihjb2xvclNlbGVjdGVkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmdiQ29sb3IgPSBjb2xvci52YWx1ZSBhcyBJUmdiO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJnYkNvbG9yLnIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICByZXMgPSByZ2JDb2xvcjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBoc2xDb2xvciA9IGNvbG9yLnZhbHVlIGFzIElIc2w7XG5cbiAgICAgICAgICAgICAgICBpZiAoaHNsQ29sb3IuaCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcyA9IFV0aWxzLmhzbFRvUmdiKGhzbENvbG9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoY29sb3IudmFsdWUgPT09IFwicmFuZG9tXCIpIHtcbiAgICAgICAgICAgICAgICByZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGI6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NiksXG4gICAgICAgICAgICAgICAgICAgIGc6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NiksXG4gICAgICAgICAgICAgICAgICAgIHI6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NiksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzID0gVXRpbHMuaGV4VG9SZ2IoY29sb3IudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHR3byBjb29yZGluYXRlc1xuICAgICAqIEBwYXJhbSBwb2ludEEgdGhlIGZpcnN0IGNvb3JkaW5hdGVcbiAgICAgKiBAcGFyYW0gcG9pbnRCIHRoZSBzZWNvbmQgY29vcmRpbmF0ZVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0RGlzdGFuY2VCZXR3ZWVuQ29vcmRpbmF0ZXMocG9pbnRBOiBJQ29vcmRpbmF0ZXMsIHBvaW50QjogSUNvb3JkaW5hdGVzKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgZHggPSBwb2ludEEueCAtIHBvaW50Qi54O1xuICAgICAgICBjb25zdCBkeSA9IHBvaW50QS55IC0gcG9pbnRCLnk7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHBcbiAgICAgKiBAcGFyYW0gcVxuICAgICAqIEBwYXJhbSB0XG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgaHVlMnJnYihwOiBudW1iZXIsIHE6IG51bWJlciwgdDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHRDYWxjID0gdDtcblxuICAgICAgICBpZiAodENhbGMgPCAwKSB7XG4gICAgICAgICAgICB0Q2FsYyArPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRDYWxjID4gMSkge1xuICAgICAgICAgICAgdENhbGMgLT0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0Q2FsYyA8IDEgLyA2KSB7XG4gICAgICAgICAgICByZXR1cm4gcCArIChxIC0gcCkgKiA2ICogdENhbGM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodENhbGMgPCAxIC8gMikge1xuICAgICAgICAgICAgcmV0dXJuIHE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodENhbGMgPCAyIC8gMykge1xuICAgICAgICAgICAgcmV0dXJuIHAgKyAocSAtIHApICogKDIgLyAzIC0gdENhbGMpICogNjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cbn1cbiJdfQ==