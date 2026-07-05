var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/braces/lib/utils.js
var require_utils = __commonJS({
  "node_modules/braces/lib/utils.js"(exports) {
    "use strict";
    exports.isInteger = (num) => {
      if (typeof num === "number") {
        return Number.isInteger(num);
      }
      if (typeof num === "string" && num.trim() !== "") {
        return Number.isInteger(Number(num));
      }
      return false;
    };
    exports.find = (node, type) => node.nodes.find((node2) => node2.type === type);
    exports.exceedsLimit = (min, max, step = 1, limit) => {
      if (limit === false)
        return false;
      if (!exports.isInteger(min) || !exports.isInteger(max))
        return false;
      return (Number(max) - Number(min)) / Number(step) >= limit;
    };
    exports.escapeNode = (block, n = 0, type) => {
      const node = block.nodes[n];
      if (!node)
        return;
      if (type && node.type === type || node.type === "open" || node.type === "close") {
        if (node.escaped !== true) {
          node.value = "\\" + node.value;
          node.escaped = true;
        }
      }
    };
    exports.encloseBrace = (node) => {
      if (node.type !== "brace")
        return false;
      if (node.commas >> 0 + node.ranges >> 0 === 0) {
        node.invalid = true;
        return true;
      }
      return false;
    };
    exports.isInvalidBrace = (block) => {
      if (block.type !== "brace")
        return false;
      if (block.invalid === true || block.dollar)
        return true;
      if (block.commas >> 0 + block.ranges >> 0 === 0) {
        block.invalid = true;
        return true;
      }
      if (block.open !== true || block.close !== true) {
        block.invalid = true;
        return true;
      }
      return false;
    };
    exports.isOpenOrClose = (node) => {
      if (node.type === "open" || node.type === "close") {
        return true;
      }
      return node.open === true || node.close === true;
    };
    exports.reduce = (nodes) => nodes.reduce((acc, node) => {
      if (node.type === "text")
        acc.push(node.value);
      if (node.type === "range")
        node.type = "text";
      return acc;
    }, []);
    exports.flatten = (...args) => {
      const result = [];
      const flat = (arr) => {
        for (let i = 0; i < arr.length; i++) {
          const ele = arr[i];
          if (Array.isArray(ele)) {
            flat(ele);
            continue;
          }
          if (ele !== void 0) {
            result.push(ele);
          }
        }
        return result;
      };
      flat(args);
      return result;
    };
  }
});

// node_modules/braces/lib/stringify.js
var require_stringify = __commonJS({
  "node_modules/braces/lib/stringify.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = (ast, options = {}) => {
      const stringify = (node, parent = {}) => {
        const invalidBlock = options.escapeInvalid && utils.isInvalidBrace(parent);
        const invalidNode = node.invalid === true && options.escapeInvalid === true;
        let output = "";
        if (node.value) {
          if ((invalidBlock || invalidNode) && utils.isOpenOrClose(node)) {
            return "\\" + node.value;
          }
          return node.value;
        }
        if (node.value) {
          return node.value;
        }
        if (node.nodes) {
          for (const child of node.nodes) {
            output += stringify(child);
          }
        }
        return output;
      };
      return stringify(ast);
    };
  }
});

// node_modules/is-number/index.js
var require_is_number = __commonJS({
  "node_modules/is-number/index.js"(exports, module2) {
    "use strict";
    module2.exports = function(num) {
      if (typeof num === "number") {
        return num - num === 0;
      }
      if (typeof num === "string" && num.trim() !== "") {
        return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
      }
      return false;
    };
  }
});

// node_modules/to-regex-range/index.js
var require_to_regex_range = __commonJS({
  "node_modules/to-regex-range/index.js"(exports, module2) {
    "use strict";
    var isNumber = require_is_number();
    var toRegexRange = (min, max, options) => {
      if (isNumber(min) === false) {
        throw new TypeError("toRegexRange: expected the first argument to be a number");
      }
      if (max === void 0 || min === max) {
        return String(min);
      }
      if (isNumber(max) === false) {
        throw new TypeError("toRegexRange: expected the second argument to be a number.");
      }
      let opts = { relaxZeros: true, ...options };
      if (typeof opts.strictZeros === "boolean") {
        opts.relaxZeros = opts.strictZeros === false;
      }
      let relax = String(opts.relaxZeros);
      let shorthand = String(opts.shorthand);
      let capture = String(opts.capture);
      let wrap = String(opts.wrap);
      let cacheKey = min + ":" + max + "=" + relax + shorthand + capture + wrap;
      if (toRegexRange.cache.hasOwnProperty(cacheKey)) {
        return toRegexRange.cache[cacheKey].result;
      }
      let a = Math.min(min, max);
      let b = Math.max(min, max);
      if (Math.abs(a - b) === 1) {
        let result = min + "|" + max;
        if (opts.capture) {
          return `(${result})`;
        }
        if (opts.wrap === false) {
          return result;
        }
        return `(?:${result})`;
      }
      let isPadded = hasPadding(min) || hasPadding(max);
      let state = { min, max, a, b };
      let positives = [];
      let negatives = [];
      if (isPadded) {
        state.isPadded = isPadded;
        state.maxLen = String(state.max).length;
      }
      if (a < 0) {
        let newMin = b < 0 ? Math.abs(b) : 1;
        negatives = splitToPatterns(newMin, Math.abs(a), state, opts);
        a = state.a = 0;
      }
      if (b >= 0) {
        positives = splitToPatterns(a, b, state, opts);
      }
      state.negatives = negatives;
      state.positives = positives;
      state.result = collatePatterns(negatives, positives, opts);
      if (opts.capture === true) {
        state.result = `(${state.result})`;
      } else if (opts.wrap !== false && positives.length + negatives.length > 1) {
        state.result = `(?:${state.result})`;
      }
      toRegexRange.cache[cacheKey] = state;
      return state.result;
    };
    function collatePatterns(neg, pos, options) {
      let onlyNegative = filterPatterns(neg, pos, "-", false, options) || [];
      let onlyPositive = filterPatterns(pos, neg, "", false, options) || [];
      let intersected = filterPatterns(neg, pos, "-?", true, options) || [];
      let subpatterns = onlyNegative.concat(intersected).concat(onlyPositive);
      return subpatterns.join("|");
    }
    function splitToRanges(min, max) {
      let nines = 1;
      let zeros = 1;
      let stop = countNines(min, nines);
      let stops = /* @__PURE__ */ new Set([max]);
      while (min <= stop && stop <= max) {
        stops.add(stop);
        nines += 1;
        stop = countNines(min, nines);
      }
      stop = countZeros(max + 1, zeros) - 1;
      while (min < stop && stop <= max) {
        stops.add(stop);
        zeros += 1;
        stop = countZeros(max + 1, zeros) - 1;
      }
      stops = [...stops];
      stops.sort(compare);
      return stops;
    }
    function rangeToPattern(start, stop, options) {
      if (start === stop) {
        return { pattern: start, count: [], digits: 0 };
      }
      let zipped = zip(start, stop);
      let digits = zipped.length;
      let pattern = "";
      let count = 0;
      for (let i = 0; i < digits; i++) {
        let [startDigit, stopDigit] = zipped[i];
        if (startDigit === stopDigit) {
          pattern += startDigit;
        } else if (startDigit !== "0" || stopDigit !== "9") {
          pattern += toCharacterClass(startDigit, stopDigit, options);
        } else {
          count++;
        }
      }
      if (count) {
        pattern += options.shorthand === true ? "\\d" : "[0-9]";
      }
      return { pattern, count: [count], digits };
    }
    function splitToPatterns(min, max, tok, options) {
      let ranges = splitToRanges(min, max);
      let tokens = [];
      let start = min;
      let prev;
      for (let i = 0; i < ranges.length; i++) {
        let max2 = ranges[i];
        let obj = rangeToPattern(String(start), String(max2), options);
        let zeros = "";
        if (!tok.isPadded && prev && prev.pattern === obj.pattern) {
          if (prev.count.length > 1) {
            prev.count.pop();
          }
          prev.count.push(obj.count[0]);
          prev.string = prev.pattern + toQuantifier(prev.count);
          start = max2 + 1;
          continue;
        }
        if (tok.isPadded) {
          zeros = padZeros(max2, tok, options);
        }
        obj.string = zeros + obj.pattern + toQuantifier(obj.count);
        tokens.push(obj);
        start = max2 + 1;
        prev = obj;
      }
      return tokens;
    }
    function filterPatterns(arr, comparison, prefix, intersection, options) {
      let result = [];
      for (let ele of arr) {
        let { string } = ele;
        if (!intersection && !contains(comparison, "string", string)) {
          result.push(prefix + string);
        }
        if (intersection && contains(comparison, "string", string)) {
          result.push(prefix + string);
        }
      }
      return result;
    }
    function zip(a, b) {
      let arr = [];
      for (let i = 0; i < a.length; i++)
        arr.push([a[i], b[i]]);
      return arr;
    }
    function compare(a, b) {
      return a > b ? 1 : b > a ? -1 : 0;
    }
    function contains(arr, key, val) {
      return arr.some((ele) => ele[key] === val);
    }
    function countNines(min, len) {
      return Number(String(min).slice(0, -len) + "9".repeat(len));
    }
    function countZeros(integer, zeros) {
      return integer - integer % Math.pow(10, zeros);
    }
    function toQuantifier(digits) {
      let [start = 0, stop = ""] = digits;
      if (stop || start > 1) {
        return `{${start + (stop ? "," + stop : "")}}`;
      }
      return "";
    }
    function toCharacterClass(a, b, options) {
      return `[${a}${b - a === 1 ? "" : "-"}${b}]`;
    }
    function hasPadding(str) {
      return /^-?(0+)\d/.test(str);
    }
    function padZeros(value, tok, options) {
      if (!tok.isPadded) {
        return value;
      }
      let diff = Math.abs(tok.maxLen - String(value).length);
      let relax = options.relaxZeros !== false;
      switch (diff) {
        case 0:
          return "";
        case 1:
          return relax ? "0?" : "0";
        case 2:
          return relax ? "0{0,2}" : "00";
        default: {
          return relax ? `0{0,${diff}}` : `0{${diff}}`;
        }
      }
    }
    toRegexRange.cache = {};
    toRegexRange.clearCache = () => toRegexRange.cache = {};
    module2.exports = toRegexRange;
  }
});

// node_modules/fill-range/index.js
var require_fill_range = __commonJS({
  "node_modules/fill-range/index.js"(exports, module2) {
    "use strict";
    var util = require("util");
    var toRegexRange = require_to_regex_range();
    var isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
    var transform = (toNumber) => {
      return (value) => toNumber === true ? Number(value) : String(value);
    };
    var isValidValue = (value) => {
      return typeof value === "number" || typeof value === "string" && value !== "";
    };
    var isNumber = (num) => Number.isInteger(+num);
    var zeros = (input) => {
      let value = `${input}`;
      let index = -1;
      if (value[0] === "-")
        value = value.slice(1);
      if (value === "0")
        return false;
      while (value[++index] === "0")
        ;
      return index > 0;
    };
    var stringify = (start, end, options) => {
      if (typeof start === "string" || typeof end === "string") {
        return true;
      }
      return options.stringify === true;
    };
    var pad = (input, maxLength, toNumber) => {
      if (maxLength > 0) {
        let dash = input[0] === "-" ? "-" : "";
        if (dash)
          input = input.slice(1);
        input = dash + input.padStart(dash ? maxLength - 1 : maxLength, "0");
      }
      if (toNumber === false) {
        return String(input);
      }
      return input;
    };
    var toMaxLen = (input, maxLength) => {
      let negative = input[0] === "-" ? "-" : "";
      if (negative) {
        input = input.slice(1);
        maxLength--;
      }
      while (input.length < maxLength)
        input = "0" + input;
      return negative ? "-" + input : input;
    };
    var toSequence = (parts, options, maxLen) => {
      parts.negatives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
      parts.positives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
      let prefix = options.capture ? "" : "?:";
      let positives = "";
      let negatives = "";
      let result;
      if (parts.positives.length) {
        positives = parts.positives.map((v) => toMaxLen(String(v), maxLen)).join("|");
      }
      if (parts.negatives.length) {
        negatives = `-(${prefix}${parts.negatives.map((v) => toMaxLen(String(v), maxLen)).join("|")})`;
      }
      if (positives && negatives) {
        result = `${positives}|${negatives}`;
      } else {
        result = positives || negatives;
      }
      if (options.wrap) {
        return `(${prefix}${result})`;
      }
      return result;
    };
    var toRange = (a, b, isNumbers, options) => {
      if (isNumbers) {
        return toRegexRange(a, b, { wrap: false, ...options });
      }
      let start = String.fromCharCode(a);
      if (a === b)
        return start;
      let stop = String.fromCharCode(b);
      return `[${start}-${stop}]`;
    };
    var toRegex = (start, end, options) => {
      if (Array.isArray(start)) {
        let wrap = options.wrap === true;
        let prefix = options.capture ? "" : "?:";
        return wrap ? `(${prefix}${start.join("|")})` : start.join("|");
      }
      return toRegexRange(start, end, options);
    };
    var rangeError = (...args) => {
      return new RangeError("Invalid range arguments: " + util.inspect(...args));
    };
    var invalidRange = (start, end, options) => {
      if (options.strictRanges === true)
        throw rangeError([start, end]);
      return [];
    };
    var invalidStep = (step, options) => {
      if (options.strictRanges === true) {
        throw new TypeError(`Expected step "${step}" to be a number`);
      }
      return [];
    };
    var fillNumbers = (start, end, step = 1, options = {}) => {
      let a = Number(start);
      let b = Number(end);
      if (!Number.isInteger(a) || !Number.isInteger(b)) {
        if (options.strictRanges === true)
          throw rangeError([start, end]);
        return [];
      }
      if (a === 0)
        a = 0;
      if (b === 0)
        b = 0;
      let descending = a > b;
      let startString = String(start);
      let endString = String(end);
      let stepString = String(step);
      step = Math.max(Math.abs(step), 1);
      let padded = zeros(startString) || zeros(endString) || zeros(stepString);
      let maxLen = padded ? Math.max(startString.length, endString.length, stepString.length) : 0;
      let toNumber = padded === false && stringify(start, end, options) === false;
      let format = options.transform || transform(toNumber);
      if (options.toRegex && step === 1) {
        return toRange(toMaxLen(start, maxLen), toMaxLen(end, maxLen), true, options);
      }
      let parts = { negatives: [], positives: [] };
      let push = (num) => parts[num < 0 ? "negatives" : "positives"].push(Math.abs(num));
      let range = [];
      let index = 0;
      while (descending ? a >= b : a <= b) {
        if (options.toRegex === true && step > 1) {
          push(a);
        } else {
          range.push(pad(format(a, index), maxLen, toNumber));
        }
        a = descending ? a - step : a + step;
        index++;
      }
      if (options.toRegex === true) {
        return step > 1 ? toSequence(parts, options, maxLen) : toRegex(range, null, { wrap: false, ...options });
      }
      return range;
    };
    var fillLetters = (start, end, step = 1, options = {}) => {
      if (!isNumber(start) && start.length > 1 || !isNumber(end) && end.length > 1) {
        return invalidRange(start, end, options);
      }
      let format = options.transform || ((val) => String.fromCharCode(val));
      let a = `${start}`.charCodeAt(0);
      let b = `${end}`.charCodeAt(0);
      let descending = a > b;
      let min = Math.min(a, b);
      let max = Math.max(a, b);
      if (options.toRegex && step === 1) {
        return toRange(min, max, false, options);
      }
      let range = [];
      let index = 0;
      while (descending ? a >= b : a <= b) {
        range.push(format(a, index));
        a = descending ? a - step : a + step;
        index++;
      }
      if (options.toRegex === true) {
        return toRegex(range, null, { wrap: false, options });
      }
      return range;
    };
    var fill = (start, end, step, options = {}) => {
      if (end == null && isValidValue(start)) {
        return [start];
      }
      if (!isValidValue(start) || !isValidValue(end)) {
        return invalidRange(start, end, options);
      }
      if (typeof step === "function") {
        return fill(start, end, 1, { transform: step });
      }
      if (isObject(step)) {
        return fill(start, end, 0, step);
      }
      let opts = { ...options };
      if (opts.capture === true)
        opts.wrap = true;
      step = step || opts.step || 1;
      if (!isNumber(step)) {
        if (step != null && !isObject(step))
          return invalidStep(step, opts);
        return fill(start, end, 1, step);
      }
      if (isNumber(start) && isNumber(end)) {
        return fillNumbers(start, end, step, opts);
      }
      return fillLetters(start, end, Math.max(Math.abs(step), 1), opts);
    };
    module2.exports = fill;
  }
});

// node_modules/braces/lib/compile.js
var require_compile = __commonJS({
  "node_modules/braces/lib/compile.js"(exports, module2) {
    "use strict";
    var fill = require_fill_range();
    var utils = require_utils();
    var compile = (ast, options = {}) => {
      const walk = (node, parent = {}) => {
        const invalidBlock = utils.isInvalidBrace(parent);
        const invalidNode = node.invalid === true && options.escapeInvalid === true;
        const invalid = invalidBlock === true || invalidNode === true;
        const prefix = options.escapeInvalid === true ? "\\" : "";
        let output = "";
        if (node.isOpen === true) {
          return prefix + node.value;
        }
        if (node.isClose === true) {
          console.log("node.isClose", prefix, node.value);
          return prefix + node.value;
        }
        if (node.type === "open") {
          return invalid ? prefix + node.value : "(";
        }
        if (node.type === "close") {
          return invalid ? prefix + node.value : ")";
        }
        if (node.type === "comma") {
          return node.prev.type === "comma" ? "" : invalid ? node.value : "|";
        }
        if (node.value) {
          return node.value;
        }
        if (node.nodes && node.ranges > 0) {
          const args = utils.reduce(node.nodes);
          const range = fill(...args, { ...options, wrap: false, toRegex: true, strictZeros: true });
          if (range.length !== 0) {
            return args.length > 1 && range.length > 1 ? `(${range})` : range;
          }
        }
        if (node.nodes) {
          for (const child of node.nodes) {
            output += walk(child, node);
          }
        }
        return output;
      };
      return walk(ast);
    };
    module2.exports = compile;
  }
});

// node_modules/braces/lib/expand.js
var require_expand = __commonJS({
  "node_modules/braces/lib/expand.js"(exports, module2) {
    "use strict";
    var fill = require_fill_range();
    var stringify = require_stringify();
    var utils = require_utils();
    var append = (queue = "", stash = "", enclose = false) => {
      const result = [];
      queue = [].concat(queue);
      stash = [].concat(stash);
      if (!stash.length)
        return queue;
      if (!queue.length) {
        return enclose ? utils.flatten(stash).map((ele) => `{${ele}}`) : stash;
      }
      for (const item of queue) {
        if (Array.isArray(item)) {
          for (const value of item) {
            result.push(append(value, stash, enclose));
          }
        } else {
          for (let ele of stash) {
            if (enclose === true && typeof ele === "string")
              ele = `{${ele}}`;
            result.push(Array.isArray(ele) ? append(item, ele, enclose) : item + ele);
          }
        }
      }
      return utils.flatten(result);
    };
    var expand = (ast, options = {}) => {
      const rangeLimit = options.rangeLimit === void 0 ? 1e3 : options.rangeLimit;
      const walk = (node, parent = {}) => {
        node.queue = [];
        let p = parent;
        let q = parent.queue;
        while (p.type !== "brace" && p.type !== "root" && p.parent) {
          p = p.parent;
          q = p.queue;
        }
        if (node.invalid || node.dollar) {
          q.push(append(q.pop(), stringify(node, options)));
          return;
        }
        if (node.type === "brace" && node.invalid !== true && node.nodes.length === 2) {
          q.push(append(q.pop(), ["{}"]));
          return;
        }
        if (node.nodes && node.ranges > 0) {
          const args = utils.reduce(node.nodes);
          if (utils.exceedsLimit(...args, options.step, rangeLimit)) {
            throw new RangeError("expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.");
          }
          let range = fill(...args, options);
          if (range.length === 0) {
            range = stringify(node, options);
          }
          q.push(append(q.pop(), range));
          node.nodes = [];
          return;
        }
        const enclose = utils.encloseBrace(node);
        let queue = node.queue;
        let block = node;
        while (block.type !== "brace" && block.type !== "root" && block.parent) {
          block = block.parent;
          queue = block.queue;
        }
        for (let i = 0; i < node.nodes.length; i++) {
          const child = node.nodes[i];
          if (child.type === "comma" && node.type === "brace") {
            if (i === 1)
              queue.push("");
            queue.push("");
            continue;
          }
          if (child.type === "close") {
            q.push(append(q.pop(), queue, enclose));
            continue;
          }
          if (child.value && child.type !== "open") {
            queue.push(append(queue.pop(), child.value));
            continue;
          }
          if (child.nodes) {
            walk(child, node);
          }
        }
        return queue;
      };
      return utils.flatten(walk(ast));
    };
    module2.exports = expand;
  }
});

// node_modules/braces/lib/constants.js
var require_constants = __commonJS({
  "node_modules/braces/lib/constants.js"(exports, module2) {
    "use strict";
    module2.exports = {
      MAX_LENGTH: 1e4,
      // Digits
      CHAR_0: "0",
      /* 0 */
      CHAR_9: "9",
      /* 9 */
      // Alphabet chars.
      CHAR_UPPERCASE_A: "A",
      /* A */
      CHAR_LOWERCASE_A: "a",
      /* a */
      CHAR_UPPERCASE_Z: "Z",
      /* Z */
      CHAR_LOWERCASE_Z: "z",
      /* z */
      CHAR_LEFT_PARENTHESES: "(",
      /* ( */
      CHAR_RIGHT_PARENTHESES: ")",
      /* ) */
      CHAR_ASTERISK: "*",
      /* * */
      // Non-alphabetic chars.
      CHAR_AMPERSAND: "&",
      /* & */
      CHAR_AT: "@",
      /* @ */
      CHAR_BACKSLASH: "\\",
      /* \ */
      CHAR_BACKTICK: "`",
      /* ` */
      CHAR_CARRIAGE_RETURN: "\r",
      /* \r */
      CHAR_CIRCUMFLEX_ACCENT: "^",
      /* ^ */
      CHAR_COLON: ":",
      /* : */
      CHAR_COMMA: ",",
      /* , */
      CHAR_DOLLAR: "$",
      /* . */
      CHAR_DOT: ".",
      /* . */
      CHAR_DOUBLE_QUOTE: '"',
      /* " */
      CHAR_EQUAL: "=",
      /* = */
      CHAR_EXCLAMATION_MARK: "!",
      /* ! */
      CHAR_FORM_FEED: "\f",
      /* \f */
      CHAR_FORWARD_SLASH: "/",
      /* / */
      CHAR_HASH: "#",
      /* # */
      CHAR_HYPHEN_MINUS: "-",
      /* - */
      CHAR_LEFT_ANGLE_BRACKET: "<",
      /* < */
      CHAR_LEFT_CURLY_BRACE: "{",
      /* { */
      CHAR_LEFT_SQUARE_BRACKET: "[",
      /* [ */
      CHAR_LINE_FEED: "\n",
      /* \n */
      CHAR_NO_BREAK_SPACE: "\xA0",
      /* \u00A0 */
      CHAR_PERCENT: "%",
      /* % */
      CHAR_PLUS: "+",
      /* + */
      CHAR_QUESTION_MARK: "?",
      /* ? */
      CHAR_RIGHT_ANGLE_BRACKET: ">",
      /* > */
      CHAR_RIGHT_CURLY_BRACE: "}",
      /* } */
      CHAR_RIGHT_SQUARE_BRACKET: "]",
      /* ] */
      CHAR_SEMICOLON: ";",
      /* ; */
      CHAR_SINGLE_QUOTE: "'",
      /* ' */
      CHAR_SPACE: " ",
      /*   */
      CHAR_TAB: "	",
      /* \t */
      CHAR_UNDERSCORE: "_",
      /* _ */
      CHAR_VERTICAL_LINE: "|",
      /* | */
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: "\uFEFF"
      /* \uFEFF */
    };
  }
});

// node_modules/braces/lib/parse.js
var require_parse = __commonJS({
  "node_modules/braces/lib/parse.js"(exports, module2) {
    "use strict";
    var stringify = require_stringify();
    var {
      MAX_LENGTH,
      CHAR_BACKSLASH,
      /* \ */
      CHAR_BACKTICK,
      /* ` */
      CHAR_COMMA,
      /* , */
      CHAR_DOT,
      /* . */
      CHAR_LEFT_PARENTHESES,
      /* ( */
      CHAR_RIGHT_PARENTHESES,
      /* ) */
      CHAR_LEFT_CURLY_BRACE,
      /* { */
      CHAR_RIGHT_CURLY_BRACE,
      /* } */
      CHAR_LEFT_SQUARE_BRACKET,
      /* [ */
      CHAR_RIGHT_SQUARE_BRACKET,
      /* ] */
      CHAR_DOUBLE_QUOTE,
      /* " */
      CHAR_SINGLE_QUOTE,
      /* ' */
      CHAR_NO_BREAK_SPACE,
      CHAR_ZERO_WIDTH_NOBREAK_SPACE
    } = require_constants();
    var parse = (input, options = {}) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected a string");
      }
      const opts = options || {};
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      if (input.length > max) {
        throw new SyntaxError(`Input length (${input.length}), exceeds max characters (${max})`);
      }
      const ast = { type: "root", input, nodes: [] };
      const stack = [ast];
      let block = ast;
      let prev = ast;
      let brackets = 0;
      const length = input.length;
      let index = 0;
      let depth = 0;
      let value;
      const advance = () => input[index++];
      const push = (node) => {
        if (node.type === "text" && prev.type === "dot") {
          prev.type = "text";
        }
        if (prev && prev.type === "text" && node.type === "text") {
          prev.value += node.value;
          return;
        }
        block.nodes.push(node);
        node.parent = block;
        node.prev = prev;
        prev = node;
        return node;
      };
      push({ type: "bos" });
      while (index < length) {
        block = stack[stack.length - 1];
        value = advance();
        if (value === CHAR_ZERO_WIDTH_NOBREAK_SPACE || value === CHAR_NO_BREAK_SPACE) {
          continue;
        }
        if (value === CHAR_BACKSLASH) {
          push({ type: "text", value: (options.keepEscaping ? value : "") + advance() });
          continue;
        }
        if (value === CHAR_RIGHT_SQUARE_BRACKET) {
          push({ type: "text", value: "\\" + value });
          continue;
        }
        if (value === CHAR_LEFT_SQUARE_BRACKET) {
          brackets++;
          let next;
          while (index < length && (next = advance())) {
            value += next;
            if (next === CHAR_LEFT_SQUARE_BRACKET) {
              brackets++;
              continue;
            }
            if (next === CHAR_BACKSLASH) {
              value += advance();
              continue;
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              brackets--;
              if (brackets === 0) {
                break;
              }
            }
          }
          push({ type: "text", value });
          continue;
        }
        if (value === CHAR_LEFT_PARENTHESES) {
          block = push({ type: "paren", nodes: [] });
          stack.push(block);
          push({ type: "text", value });
          continue;
        }
        if (value === CHAR_RIGHT_PARENTHESES) {
          if (block.type !== "paren") {
            push({ type: "text", value });
            continue;
          }
          block = stack.pop();
          push({ type: "text", value });
          block = stack[stack.length - 1];
          continue;
        }
        if (value === CHAR_DOUBLE_QUOTE || value === CHAR_SINGLE_QUOTE || value === CHAR_BACKTICK) {
          const open = value;
          let next;
          if (options.keepQuotes !== true) {
            value = "";
          }
          while (index < length && (next = advance())) {
            if (next === CHAR_BACKSLASH) {
              value += next + advance();
              continue;
            }
            if (next === open) {
              if (options.keepQuotes === true)
                value += next;
              break;
            }
            value += next;
          }
          push({ type: "text", value });
          continue;
        }
        if (value === CHAR_LEFT_CURLY_BRACE) {
          depth++;
          const dollar = prev.value && prev.value.slice(-1) === "$" || block.dollar === true;
          const brace = {
            type: "brace",
            open: true,
            close: false,
            dollar,
            depth,
            commas: 0,
            ranges: 0,
            nodes: []
          };
          block = push(brace);
          stack.push(block);
          push({ type: "open", value });
          continue;
        }
        if (value === CHAR_RIGHT_CURLY_BRACE) {
          if (block.type !== "brace") {
            push({ type: "text", value });
            continue;
          }
          const type = "close";
          block = stack.pop();
          block.close = true;
          push({ type, value });
          depth--;
          block = stack[stack.length - 1];
          continue;
        }
        if (value === CHAR_COMMA && depth > 0) {
          if (block.ranges > 0) {
            block.ranges = 0;
            const open = block.nodes.shift();
            block.nodes = [open, { type: "text", value: stringify(block) }];
          }
          push({ type: "comma", value });
          block.commas++;
          continue;
        }
        if (value === CHAR_DOT && depth > 0 && block.commas === 0) {
          const siblings = block.nodes;
          if (depth === 0 || siblings.length === 0) {
            push({ type: "text", value });
            continue;
          }
          if (prev.type === "dot") {
            block.range = [];
            prev.value += value;
            prev.type = "range";
            if (block.nodes.length !== 3 && block.nodes.length !== 5) {
              block.invalid = true;
              block.ranges = 0;
              prev.type = "text";
              continue;
            }
            block.ranges++;
            block.args = [];
            continue;
          }
          if (prev.type === "range") {
            siblings.pop();
            const before = siblings[siblings.length - 1];
            before.value += prev.value + value;
            prev = before;
            block.ranges--;
            continue;
          }
          push({ type: "dot", value });
          continue;
        }
        push({ type: "text", value });
      }
      do {
        block = stack.pop();
        if (block.type !== "root") {
          block.nodes.forEach((node) => {
            if (!node.nodes) {
              if (node.type === "open")
                node.isOpen = true;
              if (node.type === "close")
                node.isClose = true;
              if (!node.nodes)
                node.type = "text";
              node.invalid = true;
            }
          });
          const parent = stack[stack.length - 1];
          const index2 = parent.nodes.indexOf(block);
          parent.nodes.splice(index2, 1, ...block.nodes);
        }
      } while (stack.length > 0);
      push({ type: "eos" });
      return ast;
    };
    module2.exports = parse;
  }
});

// node_modules/braces/index.js
var require_braces = __commonJS({
  "node_modules/braces/index.js"(exports, module2) {
    "use strict";
    var stringify = require_stringify();
    var compile = require_compile();
    var expand = require_expand();
    var parse = require_parse();
    var braces = (input, options = {}) => {
      let output = [];
      if (Array.isArray(input)) {
        for (const pattern of input) {
          const result = braces.create(pattern, options);
          if (Array.isArray(result)) {
            output.push(...result);
          } else {
            output.push(result);
          }
        }
      } else {
        output = [].concat(braces.create(input, options));
      }
      if (options && options.expand === true && options.nodupes === true) {
        output = [...new Set(output)];
      }
      return output;
    };
    braces.parse = (input, options = {}) => parse(input, options);
    braces.stringify = (input, options = {}) => {
      if (typeof input === "string") {
        return stringify(braces.parse(input, options), options);
      }
      return stringify(input, options);
    };
    braces.compile = (input, options = {}) => {
      if (typeof input === "string") {
        input = braces.parse(input, options);
      }
      return compile(input, options);
    };
    braces.expand = (input, options = {}) => {
      if (typeof input === "string") {
        input = braces.parse(input, options);
      }
      let result = expand(input, options);
      if (options.noempty === true) {
        result = result.filter(Boolean);
      }
      if (options.nodupes === true) {
        result = [...new Set(result)];
      }
      return result;
    };
    braces.create = (input, options = {}) => {
      if (input === "" || input.length < 3) {
        return [input];
      }
      return options.expand !== true ? braces.compile(input, options) : braces.expand(input, options);
    };
    module2.exports = braces;
  }
});

// node_modules/picomatch/lib/constants.js
var require_constants2 = __commonJS({
  "node_modules/picomatch/lib/constants.js"(exports, module2) {
    "use strict";
    var path = require("path");
    var WIN_SLASH = "\\\\/";
    var WIN_NO_SLASH = `[^${WIN_SLASH}]`;
    var DEFAULT_MAX_EXTGLOB_RECURSION = 0;
    var DOT_LITERAL = "\\.";
    var PLUS_LITERAL = "\\+";
    var QMARK_LITERAL = "\\?";
    var SLASH_LITERAL = "\\/";
    var ONE_CHAR = "(?=.)";
    var QMARK = "[^/]";
    var END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
    var START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
    var DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
    var NO_DOT = `(?!${DOT_LITERAL})`;
    var NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
    var NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
    var NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
    var QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
    var STAR = `${QMARK}*?`;
    var POSIX_CHARS = {
      DOT_LITERAL,
      PLUS_LITERAL,
      QMARK_LITERAL,
      SLASH_LITERAL,
      ONE_CHAR,
      QMARK,
      END_ANCHOR,
      DOTS_SLASH,
      NO_DOT,
      NO_DOTS,
      NO_DOT_SLASH,
      NO_DOTS_SLASH,
      QMARK_NO_DOT,
      STAR,
      START_ANCHOR
    };
    var WINDOWS_CHARS = {
      ...POSIX_CHARS,
      SLASH_LITERAL: `[${WIN_SLASH}]`,
      QMARK: WIN_NO_SLASH,
      STAR: `${WIN_NO_SLASH}*?`,
      DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
      NO_DOT: `(?!${DOT_LITERAL})`,
      NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
      NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
      START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
      END_ANCHOR: `(?:[${WIN_SLASH}]|$)`
    };
    var POSIX_REGEX_SOURCE = {
      __proto__: null,
      alnum: "a-zA-Z0-9",
      alpha: "a-zA-Z",
      ascii: "\\x00-\\x7F",
      blank: " \\t",
      cntrl: "\\x00-\\x1F\\x7F",
      digit: "0-9",
      graph: "\\x21-\\x7E",
      lower: "a-z",
      print: "\\x20-\\x7E ",
      punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
      space: " \\t\\r\\n\\v\\f",
      upper: "A-Z",
      word: "A-Za-z0-9_",
      xdigit: "A-Fa-f0-9"
    };
    module2.exports = {
      DEFAULT_MAX_EXTGLOB_RECURSION,
      MAX_LENGTH: 1024 * 64,
      POSIX_REGEX_SOURCE,
      // regular expressions
      REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
      REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
      REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
      REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
      REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
      REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
      // Replace globs with equivalent patterns to reduce parsing time.
      REPLACEMENTS: {
        __proto__: null,
        "***": "*",
        "**/**": "**",
        "**/**/**": "**"
      },
      // Digits
      CHAR_0: 48,
      /* 0 */
      CHAR_9: 57,
      /* 9 */
      // Alphabet chars.
      CHAR_UPPERCASE_A: 65,
      /* A */
      CHAR_LOWERCASE_A: 97,
      /* a */
      CHAR_UPPERCASE_Z: 90,
      /* Z */
      CHAR_LOWERCASE_Z: 122,
      /* z */
      CHAR_LEFT_PARENTHESES: 40,
      /* ( */
      CHAR_RIGHT_PARENTHESES: 41,
      /* ) */
      CHAR_ASTERISK: 42,
      /* * */
      // Non-alphabetic chars.
      CHAR_AMPERSAND: 38,
      /* & */
      CHAR_AT: 64,
      /* @ */
      CHAR_BACKWARD_SLASH: 92,
      /* \ */
      CHAR_CARRIAGE_RETURN: 13,
      /* \r */
      CHAR_CIRCUMFLEX_ACCENT: 94,
      /* ^ */
      CHAR_COLON: 58,
      /* : */
      CHAR_COMMA: 44,
      /* , */
      CHAR_DOT: 46,
      /* . */
      CHAR_DOUBLE_QUOTE: 34,
      /* " */
      CHAR_EQUAL: 61,
      /* = */
      CHAR_EXCLAMATION_MARK: 33,
      /* ! */
      CHAR_FORM_FEED: 12,
      /* \f */
      CHAR_FORWARD_SLASH: 47,
      /* / */
      CHAR_GRAVE_ACCENT: 96,
      /* ` */
      CHAR_HASH: 35,
      /* # */
      CHAR_HYPHEN_MINUS: 45,
      /* - */
      CHAR_LEFT_ANGLE_BRACKET: 60,
      /* < */
      CHAR_LEFT_CURLY_BRACE: 123,
      /* { */
      CHAR_LEFT_SQUARE_BRACKET: 91,
      /* [ */
      CHAR_LINE_FEED: 10,
      /* \n */
      CHAR_NO_BREAK_SPACE: 160,
      /* \u00A0 */
      CHAR_PERCENT: 37,
      /* % */
      CHAR_PLUS: 43,
      /* + */
      CHAR_QUESTION_MARK: 63,
      /* ? */
      CHAR_RIGHT_ANGLE_BRACKET: 62,
      /* > */
      CHAR_RIGHT_CURLY_BRACE: 125,
      /* } */
      CHAR_RIGHT_SQUARE_BRACKET: 93,
      /* ] */
      CHAR_SEMICOLON: 59,
      /* ; */
      CHAR_SINGLE_QUOTE: 39,
      /* ' */
      CHAR_SPACE: 32,
      /*   */
      CHAR_TAB: 9,
      /* \t */
      CHAR_UNDERSCORE: 95,
      /* _ */
      CHAR_VERTICAL_LINE: 124,
      /* | */
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
      /* \uFEFF */
      SEP: path.sep,
      /**
       * Create EXTGLOB_CHARS
       */
      extglobChars(chars) {
        return {
          "!": { type: "negate", open: "(?:(?!(?:", close: `))${chars.STAR})` },
          "?": { type: "qmark", open: "(?:", close: ")?" },
          "+": { type: "plus", open: "(?:", close: ")+" },
          "*": { type: "star", open: "(?:", close: ")*" },
          "@": { type: "at", open: "(?:", close: ")" }
        };
      },
      /**
       * Create GLOB_CHARS
       */
      globChars(win32) {
        return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
      }
    };
  }
});

// node_modules/picomatch/lib/utils.js
var require_utils2 = __commonJS({
  "node_modules/picomatch/lib/utils.js"(exports) {
    "use strict";
    var path = require("path");
    var win32 = process.platform === "win32";
    var {
      REGEX_BACKSLASH,
      REGEX_REMOVE_BACKSLASH,
      REGEX_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_GLOBAL
    } = require_constants2();
    exports.isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
    exports.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str);
    exports.isRegexChar = (str) => str.length === 1 && exports.hasRegexChars(str);
    exports.escapeRegex = (str) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
    exports.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, "/");
    exports.removeBackslashes = (str) => {
      return str.replace(REGEX_REMOVE_BACKSLASH, (match) => {
        return match === "\\" ? "" : match;
      });
    };
    exports.supportsLookbehinds = () => {
      const segs = process.version.slice(1).split(".").map(Number);
      if (segs.length === 3 && segs[0] >= 9 || segs[0] === 8 && segs[1] >= 10) {
        return true;
      }
      return false;
    };
    exports.isWindows = (options) => {
      if (options && typeof options.windows === "boolean") {
        return options.windows;
      }
      return win32 === true || path.sep === "\\";
    };
    exports.escapeLast = (input, char, lastIdx) => {
      const idx = input.lastIndexOf(char, lastIdx);
      if (idx === -1)
        return input;
      if (input[idx - 1] === "\\")
        return exports.escapeLast(input, char, idx - 1);
      return `${input.slice(0, idx)}\\${input.slice(idx)}`;
    };
    exports.removePrefix = (input, state = {}) => {
      let output = input;
      if (output.startsWith("./")) {
        output = output.slice(2);
        state.prefix = "./";
      }
      return output;
    };
    exports.wrapOutput = (input, state = {}, options = {}) => {
      const prepend = options.contains ? "" : "^";
      const append = options.contains ? "" : "$";
      let output = `${prepend}(?:${input})${append}`;
      if (state.negated === true) {
        output = `(?:^(?!${output}).*$)`;
      }
      return output;
    };
  }
});

// node_modules/picomatch/lib/scan.js
var require_scan = __commonJS({
  "node_modules/picomatch/lib/scan.js"(exports, module2) {
    "use strict";
    var utils = require_utils2();
    var {
      CHAR_ASTERISK,
      /* * */
      CHAR_AT,
      /* @ */
      CHAR_BACKWARD_SLASH,
      /* \ */
      CHAR_COMMA,
      /* , */
      CHAR_DOT,
      /* . */
      CHAR_EXCLAMATION_MARK,
      /* ! */
      CHAR_FORWARD_SLASH,
      /* / */
      CHAR_LEFT_CURLY_BRACE,
      /* { */
      CHAR_LEFT_PARENTHESES,
      /* ( */
      CHAR_LEFT_SQUARE_BRACKET,
      /* [ */
      CHAR_PLUS,
      /* + */
      CHAR_QUESTION_MARK,
      /* ? */
      CHAR_RIGHT_CURLY_BRACE,
      /* } */
      CHAR_RIGHT_PARENTHESES,
      /* ) */
      CHAR_RIGHT_SQUARE_BRACKET
      /* ] */
    } = require_constants2();
    var isPathSeparator = (code) => {
      return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
    };
    var depth = (token) => {
      if (token.isPrefix !== true) {
        token.depth = token.isGlobstar ? Infinity : 1;
      }
    };
    var scan = (input, options) => {
      const opts = options || {};
      const length = input.length - 1;
      const scanToEnd = opts.parts === true || opts.scanToEnd === true;
      const slashes = [];
      const tokens = [];
      const parts = [];
      let str = input;
      let index = -1;
      let start = 0;
      let lastIndex = 0;
      let isBrace = false;
      let isBracket = false;
      let isGlob = false;
      let isExtglob = false;
      let isGlobstar = false;
      let braceEscaped = false;
      let backslashes = false;
      let negated = false;
      let negatedExtglob = false;
      let finished = false;
      let braces = 0;
      let prev;
      let code;
      let token = { value: "", depth: 0, isGlob: false };
      const eos = () => index >= length;
      const peek = () => str.charCodeAt(index + 1);
      const advance = () => {
        prev = code;
        return str.charCodeAt(++index);
      };
      while (index < length) {
        code = advance();
        let next;
        if (code === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          code = advance();
          if (code === CHAR_LEFT_CURLY_BRACE) {
            braceEscaped = true;
          }
          continue;
        }
        if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
          braces++;
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (code === CHAR_LEFT_CURLY_BRACE) {
              braces++;
              continue;
            }
            if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (braceEscaped !== true && code === CHAR_COMMA) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (code === CHAR_RIGHT_CURLY_BRACE) {
              braces--;
              if (braces === 0) {
                braceEscaped = false;
                isBrace = token.isBrace = true;
                finished = true;
                break;
              }
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_FORWARD_SLASH) {
          slashes.push(index);
          tokens.push(token);
          token = { value: "", depth: 0, isGlob: false };
          if (finished === true)
            continue;
          if (prev === CHAR_DOT && index === start + 1) {
            start += 2;
            continue;
          }
          lastIndex = index + 1;
          continue;
        }
        if (opts.noext !== true) {
          const isExtglobChar = code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK;
          if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
            isGlob = token.isGlob = true;
            isExtglob = token.isExtglob = true;
            finished = true;
            if (code === CHAR_EXCLAMATION_MARK && index === start) {
              negatedExtglob = true;
            }
            if (scanToEnd === true) {
              while (eos() !== true && (code = advance())) {
                if (code === CHAR_BACKWARD_SLASH) {
                  backslashes = token.backslashes = true;
                  code = advance();
                  continue;
                }
                if (code === CHAR_RIGHT_PARENTHESES) {
                  isGlob = token.isGlob = true;
                  finished = true;
                  break;
                }
              }
              continue;
            }
            break;
          }
        }
        if (code === CHAR_ASTERISK) {
          if (prev === CHAR_ASTERISK)
            isGlobstar = token.isGlobstar = true;
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_QUESTION_MARK) {
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_LEFT_SQUARE_BRACKET) {
          while (eos() !== true && (next = advance())) {
            if (next === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              isBracket = token.isBracket = true;
              isGlob = token.isGlob = true;
              finished = true;
              break;
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
          negated = token.negated = true;
          start++;
          continue;
        }
        if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
          isGlob = token.isGlob = true;
          if (scanToEnd === true) {
            while (eos() !== true && (code = advance())) {
              if (code === CHAR_LEFT_PARENTHESES) {
                backslashes = token.backslashes = true;
                code = advance();
                continue;
              }
              if (code === CHAR_RIGHT_PARENTHESES) {
                finished = true;
                break;
              }
            }
            continue;
          }
          break;
        }
        if (isGlob === true) {
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
      }
      if (opts.noext === true) {
        isExtglob = false;
        isGlob = false;
      }
      let base = str;
      let prefix = "";
      let glob = "";
      if (start > 0) {
        prefix = str.slice(0, start);
        str = str.slice(start);
        lastIndex -= start;
      }
      if (base && isGlob === true && lastIndex > 0) {
        base = str.slice(0, lastIndex);
        glob = str.slice(lastIndex);
      } else if (isGlob === true) {
        base = "";
        glob = str;
      } else {
        base = str;
      }
      if (base && base !== "" && base !== "/" && base !== str) {
        if (isPathSeparator(base.charCodeAt(base.length - 1))) {
          base = base.slice(0, -1);
        }
      }
      if (opts.unescape === true) {
        if (glob)
          glob = utils.removeBackslashes(glob);
        if (base && backslashes === true) {
          base = utils.removeBackslashes(base);
        }
      }
      const state = {
        prefix,
        input,
        start,
        base,
        glob,
        isBrace,
        isBracket,
        isGlob,
        isExtglob,
        isGlobstar,
        negated,
        negatedExtglob
      };
      if (opts.tokens === true) {
        state.maxDepth = 0;
        if (!isPathSeparator(code)) {
          tokens.push(token);
        }
        state.tokens = tokens;
      }
      if (opts.parts === true || opts.tokens === true) {
        let prevIndex;
        for (let idx = 0; idx < slashes.length; idx++) {
          const n = prevIndex ? prevIndex + 1 : start;
          const i = slashes[idx];
          const value = input.slice(n, i);
          if (opts.tokens) {
            if (idx === 0 && start !== 0) {
              tokens[idx].isPrefix = true;
              tokens[idx].value = prefix;
            } else {
              tokens[idx].value = value;
            }
            depth(tokens[idx]);
            state.maxDepth += tokens[idx].depth;
          }
          if (idx !== 0 || value !== "") {
            parts.push(value);
          }
          prevIndex = i;
        }
        if (prevIndex && prevIndex + 1 < input.length) {
          const value = input.slice(prevIndex + 1);
          parts.push(value);
          if (opts.tokens) {
            tokens[tokens.length - 1].value = value;
            depth(tokens[tokens.length - 1]);
            state.maxDepth += tokens[tokens.length - 1].depth;
          }
        }
        state.slashes = slashes;
        state.parts = parts;
      }
      return state;
    };
    module2.exports = scan;
  }
});

// node_modules/picomatch/lib/parse.js
var require_parse2 = __commonJS({
  "node_modules/picomatch/lib/parse.js"(exports, module2) {
    "use strict";
    var constants = require_constants2();
    var utils = require_utils2();
    var {
      MAX_LENGTH,
      POSIX_REGEX_SOURCE,
      REGEX_NON_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_BACKREF,
      REPLACEMENTS
    } = constants;
    var expandRange = (args, options) => {
      if (typeof options.expandRange === "function") {
        return options.expandRange(...args, options);
      }
      args.sort();
      const value = `[${args.join("-")}]`;
      try {
        new RegExp(value);
      } catch (ex) {
        return args.map((v) => utils.escapeRegex(v)).join("..");
      }
      return value;
    };
    var syntaxError = (type, char) => {
      return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
    };
    var splitTopLevel = (input) => {
      const parts = [];
      let bracket = 0;
      let paren = 0;
      let quote = 0;
      let value = "";
      let escaped = false;
      for (const ch of input) {
        if (escaped === true) {
          value += ch;
          escaped = false;
          continue;
        }
        if (ch === "\\") {
          value += ch;
          escaped = true;
          continue;
        }
        if (ch === '"') {
          quote = quote === 1 ? 0 : 1;
          value += ch;
          continue;
        }
        if (quote === 0) {
          if (ch === "[") {
            bracket++;
          } else if (ch === "]" && bracket > 0) {
            bracket--;
          } else if (bracket === 0) {
            if (ch === "(") {
              paren++;
            } else if (ch === ")" && paren > 0) {
              paren--;
            } else if (ch === "|" && paren === 0) {
              parts.push(value);
              value = "";
              continue;
            }
          }
        }
        value += ch;
      }
      parts.push(value);
      return parts;
    };
    var isPlainBranch = (branch) => {
      let escaped = false;
      for (const ch of branch) {
        if (escaped === true) {
          escaped = false;
          continue;
        }
        if (ch === "\\") {
          escaped = true;
          continue;
        }
        if (/[?*+@!()[\]{}]/.test(ch)) {
          return false;
        }
      }
      return true;
    };
    var normalizeSimpleBranch = (branch) => {
      let value = branch.trim();
      let changed = true;
      while (changed === true) {
        changed = false;
        if (/^@\([^\\()[\]{}|]+\)$/.test(value)) {
          value = value.slice(2, -1);
          changed = true;
        }
      }
      if (!isPlainBranch(value)) {
        return;
      }
      return value.replace(/\\(.)/g, "$1");
    };
    var hasRepeatedCharPrefixOverlap = (branches) => {
      const values = branches.map(normalizeSimpleBranch).filter(Boolean);
      for (let i = 0; i < values.length; i++) {
        for (let j = i + 1; j < values.length; j++) {
          const a = values[i];
          const b = values[j];
          const char = a[0];
          if (!char || a !== char.repeat(a.length) || b !== char.repeat(b.length)) {
            continue;
          }
          if (a === b || a.startsWith(b) || b.startsWith(a)) {
            return true;
          }
        }
      }
      return false;
    };
    var parseRepeatedExtglob = (pattern, requireEnd = true) => {
      if (pattern[0] !== "+" && pattern[0] !== "*" || pattern[1] !== "(") {
        return;
      }
      let bracket = 0;
      let paren = 0;
      let quote = 0;
      let escaped = false;
      for (let i = 1; i < pattern.length; i++) {
        const ch = pattern[i];
        if (escaped === true) {
          escaped = false;
          continue;
        }
        if (ch === "\\") {
          escaped = true;
          continue;
        }
        if (ch === '"') {
          quote = quote === 1 ? 0 : 1;
          continue;
        }
        if (quote === 1) {
          continue;
        }
        if (ch === "[") {
          bracket++;
          continue;
        }
        if (ch === "]" && bracket > 0) {
          bracket--;
          continue;
        }
        if (bracket > 0) {
          continue;
        }
        if (ch === "(") {
          paren++;
          continue;
        }
        if (ch === ")") {
          paren--;
          if (paren === 0) {
            if (requireEnd === true && i !== pattern.length - 1) {
              return;
            }
            return {
              type: pattern[0],
              body: pattern.slice(2, i),
              end: i
            };
          }
        }
      }
    };
    var getStarExtglobSequenceOutput = (pattern) => {
      let index = 0;
      const chars = [];
      while (index < pattern.length) {
        const match = parseRepeatedExtglob(pattern.slice(index), false);
        if (!match || match.type !== "*") {
          return;
        }
        const branches = splitTopLevel(match.body).map((branch2) => branch2.trim());
        if (branches.length !== 1) {
          return;
        }
        const branch = normalizeSimpleBranch(branches[0]);
        if (!branch || branch.length !== 1) {
          return;
        }
        chars.push(branch);
        index += match.end + 1;
      }
      if (chars.length < 1) {
        return;
      }
      const source = chars.length === 1 ? utils.escapeRegex(chars[0]) : `[${chars.map((ch) => utils.escapeRegex(ch)).join("")}]`;
      return `${source}*`;
    };
    var repeatedExtglobRecursion = (pattern) => {
      let depth = 0;
      let value = pattern.trim();
      let match = parseRepeatedExtglob(value);
      while (match) {
        depth++;
        value = match.body.trim();
        match = parseRepeatedExtglob(value);
      }
      return depth;
    };
    var analyzeRepeatedExtglob = (body, options) => {
      if (options.maxExtglobRecursion === false) {
        return { risky: false };
      }
      const max = typeof options.maxExtglobRecursion === "number" ? options.maxExtglobRecursion : constants.DEFAULT_MAX_EXTGLOB_RECURSION;
      const branches = splitTopLevel(body).map((branch) => branch.trim());
      if (branches.length > 1) {
        if (branches.some((branch) => branch === "") || branches.some((branch) => /^[*?]+$/.test(branch)) || hasRepeatedCharPrefixOverlap(branches)) {
          return { risky: true };
        }
      }
      for (const branch of branches) {
        const safeOutput = getStarExtglobSequenceOutput(branch);
        if (safeOutput) {
          return { risky: true, safeOutput };
        }
        if (repeatedExtglobRecursion(branch) > max) {
          return { risky: true };
        }
      }
      return { risky: false };
    };
    var parse = (input, options) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected a string");
      }
      input = REPLACEMENTS[input] || input;
      const opts = { ...options };
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      let len = input.length;
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      }
      const bos = { type: "bos", value: "", output: opts.prepend || "" };
      const tokens = [bos];
      const capture = opts.capture ? "" : "?:";
      const win32 = utils.isWindows(options);
      const PLATFORM_CHARS = constants.globChars(win32);
      const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS);
      const {
        DOT_LITERAL,
        PLUS_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOT_SLASH,
        NO_DOTS_SLASH,
        QMARK,
        QMARK_NO_DOT,
        STAR,
        START_ANCHOR
      } = PLATFORM_CHARS;
      const globstar = (opts2) => {
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const nodot = opts.dot ? "" : NO_DOT;
      const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
      let star = opts.bash === true ? globstar(opts) : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      if (typeof opts.noext === "boolean") {
        opts.noextglob = opts.noext;
      }
      const state = {
        input,
        index: -1,
        start: 0,
        dot: opts.dot === true,
        consumed: "",
        output: "",
        prefix: "",
        backtrack: false,
        negated: false,
        brackets: 0,
        braces: 0,
        parens: 0,
        quotes: 0,
        globstar: false,
        tokens
      };
      input = utils.removePrefix(input, state);
      len = input.length;
      const extglobs = [];
      const braces = [];
      const stack = [];
      let prev = bos;
      let value;
      const eos = () => state.index === len - 1;
      const peek = state.peek = (n = 1) => input[state.index + n];
      const advance = state.advance = () => input[++state.index] || "";
      const remaining = () => input.slice(state.index + 1);
      const consume = (value2 = "", num = 0) => {
        state.consumed += value2;
        state.index += num;
      };
      const append = (token) => {
        state.output += token.output != null ? token.output : token.value;
        consume(token.value);
      };
      const negate = () => {
        let count = 1;
        while (peek() === "!" && (peek(2) !== "(" || peek(3) === "?")) {
          advance();
          state.start++;
          count++;
        }
        if (count % 2 === 0) {
          return false;
        }
        state.negated = true;
        state.start++;
        return true;
      };
      const increment = (type) => {
        state[type]++;
        stack.push(type);
      };
      const decrement = (type) => {
        state[type]--;
        stack.pop();
      };
      const push = (tok) => {
        if (prev.type === "globstar") {
          const isBrace = state.braces > 0 && (tok.type === "comma" || tok.type === "brace");
          const isExtglob = tok.extglob === true || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
          if (tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob) {
            state.output = state.output.slice(0, -prev.output.length);
            prev.type = "star";
            prev.value = "*";
            prev.output = star;
            state.output += prev.output;
          }
        }
        if (extglobs.length && tok.type !== "paren") {
          extglobs[extglobs.length - 1].inner += tok.value;
        }
        if (tok.value || tok.output)
          append(tok);
        if (prev && prev.type === "text" && tok.type === "text") {
          prev.value += tok.value;
          prev.output = (prev.output || "") + tok.value;
          return;
        }
        tok.prev = prev;
        tokens.push(tok);
        prev = tok;
      };
      const extglobOpen = (type, value2) => {
        const token = { ...EXTGLOB_CHARS[value2], conditions: 1, inner: "" };
        token.prev = prev;
        token.parens = state.parens;
        token.output = state.output;
        token.startIndex = state.index;
        token.tokensIndex = tokens.length;
        const output = (opts.capture ? "(" : "") + token.open;
        increment("parens");
        push({ type, value: value2, output: state.output ? "" : ONE_CHAR });
        push({ type: "paren", extglob: true, value: advance(), output });
        extglobs.push(token);
      };
      const extglobClose = (token) => {
        const literal = input.slice(token.startIndex, state.index + 1);
        const body = input.slice(token.startIndex + 2, state.index);
        const analysis = analyzeRepeatedExtglob(body, opts);
        if ((token.type === "plus" || token.type === "star") && analysis.risky) {
          const safeOutput = analysis.safeOutput ? (token.output ? "" : ONE_CHAR) + (opts.capture ? `(${analysis.safeOutput})` : analysis.safeOutput) : void 0;
          const open = tokens[token.tokensIndex];
          open.type = "text";
          open.value = literal;
          open.output = safeOutput || utils.escapeRegex(literal);
          for (let i = token.tokensIndex + 1; i < tokens.length; i++) {
            tokens[i].value = "";
            tokens[i].output = "";
            delete tokens[i].suffix;
          }
          state.output = token.output + open.output;
          state.backtrack = true;
          push({ type: "paren", extglob: true, value, output: "" });
          decrement("parens");
          return;
        }
        let output = token.close + (opts.capture ? ")" : "");
        let rest;
        if (token.type === "negate") {
          let extglobStar = star;
          if (token.inner && token.inner.length > 1 && token.inner.includes("/")) {
            extglobStar = globstar(opts);
          }
          if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
            output = token.close = `)$))${extglobStar}`;
          }
          if (token.inner.includes("*") && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
            const expression = parse(rest, { ...options, fastpaths: false }).output;
            output = token.close = `)${expression})${extglobStar})`;
          }
          if (token.prev.type === "bos") {
            state.negatedExtglob = true;
          }
        }
        push({ type: "paren", extglob: true, value, output });
        decrement("parens");
      };
      if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
        let backslashes = false;
        let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => {
          if (first === "\\") {
            backslashes = true;
            return m;
          }
          if (first === "?") {
            if (esc) {
              return esc + first + (rest ? QMARK.repeat(rest.length) : "");
            }
            if (index === 0) {
              return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : "");
            }
            return QMARK.repeat(chars.length);
          }
          if (first === ".") {
            return DOT_LITERAL.repeat(chars.length);
          }
          if (first === "*") {
            if (esc) {
              return esc + first + (rest ? star : "");
            }
            return star;
          }
          return esc ? m : `\\${m}`;
        });
        if (backslashes === true) {
          if (opts.unescape === true) {
            output = output.replace(/\\/g, "");
          } else {
            output = output.replace(/\\+/g, (m) => {
              return m.length % 2 === 0 ? "\\\\" : m ? "\\" : "";
            });
          }
        }
        if (output === input && opts.contains === true) {
          state.output = input;
          return state;
        }
        state.output = utils.wrapOutput(output, state, options);
        return state;
      }
      while (!eos()) {
        value = advance();
        if (value === "\0") {
          continue;
        }
        if (value === "\\") {
          const next = peek();
          if (next === "/" && opts.bash !== true) {
            continue;
          }
          if (next === "." || next === ";") {
            continue;
          }
          if (!next) {
            value += "\\";
            push({ type: "text", value });
            continue;
          }
          const match = /^\\+/.exec(remaining());
          let slashes = 0;
          if (match && match[0].length > 2) {
            slashes = match[0].length;
            state.index += slashes;
            if (slashes % 2 !== 0) {
              value += "\\";
            }
          }
          if (opts.unescape === true) {
            value = advance();
          } else {
            value += advance();
          }
          if (state.brackets === 0) {
            push({ type: "text", value });
            continue;
          }
        }
        if (state.brackets > 0 && (value !== "]" || prev.value === "[" || prev.value === "[^")) {
          if (opts.posix !== false && value === ":") {
            const inner = prev.value.slice(1);
            if (inner.includes("[")) {
              prev.posix = true;
              if (inner.includes(":")) {
                const idx = prev.value.lastIndexOf("[");
                const pre = prev.value.slice(0, idx);
                const rest2 = prev.value.slice(idx + 2);
                const posix = POSIX_REGEX_SOURCE[rest2];
                if (posix) {
                  prev.value = pre + posix;
                  state.backtrack = true;
                  advance();
                  if (!bos.output && tokens.indexOf(prev) === 1) {
                    bos.output = ONE_CHAR;
                  }
                  continue;
                }
              }
            }
          }
          if (value === "[" && peek() !== ":" || value === "-" && peek() === "]") {
            value = `\\${value}`;
          }
          if (value === "]" && (prev.value === "[" || prev.value === "[^")) {
            value = `\\${value}`;
          }
          if (opts.posix === true && value === "!" && prev.value === "[") {
            value = "^";
          }
          prev.value += value;
          append({ value });
          continue;
        }
        if (state.quotes === 1 && value !== '"') {
          value = utils.escapeRegex(value);
          prev.value += value;
          append({ value });
          continue;
        }
        if (value === '"') {
          state.quotes = state.quotes === 1 ? 0 : 1;
          if (opts.keepQuotes === true) {
            push({ type: "text", value });
          }
          continue;
        }
        if (value === "(") {
          increment("parens");
          push({ type: "paren", value });
          continue;
        }
        if (value === ")") {
          if (state.parens === 0 && opts.strictBrackets === true) {
            throw new SyntaxError(syntaxError("opening", "("));
          }
          const extglob = extglobs[extglobs.length - 1];
          if (extglob && state.parens === extglob.parens + 1) {
            extglobClose(extglobs.pop());
            continue;
          }
          push({ type: "paren", value, output: state.parens ? ")" : "\\)" });
          decrement("parens");
          continue;
        }
        if (value === "[") {
          if (opts.nobracket === true || !remaining().includes("]")) {
            if (opts.nobracket !== true && opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("closing", "]"));
            }
            value = `\\${value}`;
          } else {
            increment("brackets");
          }
          push({ type: "bracket", value });
          continue;
        }
        if (value === "]") {
          if (opts.nobracket === true || prev && prev.type === "bracket" && prev.value.length === 1) {
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          if (state.brackets === 0) {
            if (opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("opening", "["));
            }
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          decrement("brackets");
          const prevValue = prev.value.slice(1);
          if (prev.posix !== true && prevValue[0] === "^" && !prevValue.includes("/")) {
            value = `/${value}`;
          }
          prev.value += value;
          append({ value });
          if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) {
            continue;
          }
          const escaped = utils.escapeRegex(prev.value);
          state.output = state.output.slice(0, -prev.value.length);
          if (opts.literalBrackets === true) {
            state.output += escaped;
            prev.value = escaped;
            continue;
          }
          prev.value = `(${capture}${escaped}|${prev.value})`;
          state.output += prev.value;
          continue;
        }
        if (value === "{" && opts.nobrace !== true) {
          increment("braces");
          const open = {
            type: "brace",
            value,
            output: "(",
            outputIndex: state.output.length,
            tokensIndex: state.tokens.length
          };
          braces.push(open);
          push(open);
          continue;
        }
        if (value === "}") {
          const brace = braces[braces.length - 1];
          if (opts.nobrace === true || !brace) {
            push({ type: "text", value, output: value });
            continue;
          }
          let output = ")";
          if (brace.dots === true) {
            const arr = tokens.slice();
            const range = [];
            for (let i = arr.length - 1; i >= 0; i--) {
              tokens.pop();
              if (arr[i].type === "brace") {
                break;
              }
              if (arr[i].type !== "dots") {
                range.unshift(arr[i].value);
              }
            }
            output = expandRange(range, opts);
            state.backtrack = true;
          }
          if (brace.comma !== true && brace.dots !== true) {
            const out = state.output.slice(0, brace.outputIndex);
            const toks = state.tokens.slice(brace.tokensIndex);
            brace.value = brace.output = "\\{";
            value = output = "\\}";
            state.output = out;
            for (const t of toks) {
              state.output += t.output || t.value;
            }
          }
          push({ type: "brace", value, output });
          decrement("braces");
          braces.pop();
          continue;
        }
        if (value === "|") {
          if (extglobs.length > 0) {
            extglobs[extglobs.length - 1].conditions++;
          }
          push({ type: "text", value });
          continue;
        }
        if (value === ",") {
          let output = value;
          const brace = braces[braces.length - 1];
          if (brace && stack[stack.length - 1] === "braces") {
            brace.comma = true;
            output = "|";
          }
          push({ type: "comma", value, output });
          continue;
        }
        if (value === "/") {
          if (prev.type === "dot" && state.index === state.start + 1) {
            state.start = state.index + 1;
            state.consumed = "";
            state.output = "";
            tokens.pop();
            prev = bos;
            continue;
          }
          push({ type: "slash", value, output: SLASH_LITERAL });
          continue;
        }
        if (value === ".") {
          if (state.braces > 0 && prev.type === "dot") {
            if (prev.value === ".")
              prev.output = DOT_LITERAL;
            const brace = braces[braces.length - 1];
            prev.type = "dots";
            prev.output += value;
            prev.value += value;
            brace.dots = true;
            continue;
          }
          if (state.braces + state.parens === 0 && prev.type !== "bos" && prev.type !== "slash") {
            push({ type: "text", value, output: DOT_LITERAL });
            continue;
          }
          push({ type: "dot", value, output: DOT_LITERAL });
          continue;
        }
        if (value === "?") {
          const isGroup = prev && prev.value === "(";
          if (!isGroup && opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("qmark", value);
            continue;
          }
          if (prev && prev.type === "paren") {
            const next = peek();
            let output = value;
            if (next === "<" && !utils.supportsLookbehinds()) {
              throw new Error("Node.js v10 or higher is required for regex lookbehinds");
            }
            if (prev.value === "(" && !/[!=<:]/.test(next) || next === "<" && !/<([!=]|\w+>)/.test(remaining())) {
              output = `\\${value}`;
            }
            push({ type: "text", value, output });
            continue;
          }
          if (opts.dot !== true && (prev.type === "slash" || prev.type === "bos")) {
            push({ type: "qmark", value, output: QMARK_NO_DOT });
            continue;
          }
          push({ type: "qmark", value, output: QMARK });
          continue;
        }
        if (value === "!") {
          if (opts.noextglob !== true && peek() === "(") {
            if (peek(2) !== "?" || !/[!=<:]/.test(peek(3))) {
              extglobOpen("negate", value);
              continue;
            }
          }
          if (opts.nonegate !== true && state.index === 0) {
            negate();
            continue;
          }
        }
        if (value === "+") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("plus", value);
            continue;
          }
          if (prev && prev.value === "(" || opts.regex === false) {
            push({ type: "plus", value, output: PLUS_LITERAL });
            continue;
          }
          if (prev && (prev.type === "bracket" || prev.type === "paren" || prev.type === "brace") || state.parens > 0) {
            push({ type: "plus", value });
            continue;
          }
          push({ type: "plus", value: PLUS_LITERAL });
          continue;
        }
        if (value === "@") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            push({ type: "at", extglob: true, value, output: "" });
            continue;
          }
          push({ type: "text", value });
          continue;
        }
        if (value !== "*") {
          if (value === "$" || value === "^") {
            value = `\\${value}`;
          }
          const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
          if (match) {
            value += match[0];
            state.index += match[0].length;
          }
          push({ type: "text", value });
          continue;
        }
        if (prev && (prev.type === "globstar" || prev.star === true)) {
          prev.type = "star";
          prev.star = true;
          prev.value += value;
          prev.output = star;
          state.backtrack = true;
          state.globstar = true;
          consume(value);
          continue;
        }
        let rest = remaining();
        if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
          extglobOpen("star", value);
          continue;
        }
        if (prev.type === "star") {
          if (opts.noglobstar === true) {
            consume(value);
            continue;
          }
          const prior = prev.prev;
          const before = prior.prev;
          const isStart = prior.type === "slash" || prior.type === "bos";
          const afterStar = before && (before.type === "star" || before.type === "globstar");
          if (opts.bash === true && (!isStart || rest[0] && rest[0] !== "/")) {
            push({ type: "star", value, output: "" });
            continue;
          }
          const isBrace = state.braces > 0 && (prior.type === "comma" || prior.type === "brace");
          const isExtglob = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
          if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob) {
            push({ type: "star", value, output: "" });
            continue;
          }
          while (rest.slice(0, 3) === "/**") {
            const after = input[state.index + 4];
            if (after && after !== "/") {
              break;
            }
            rest = rest.slice(3);
            consume("/**", 3);
          }
          if (prior.type === "bos" && eos()) {
            prev.type = "globstar";
            prev.value += value;
            prev.output = globstar(opts);
            state.output = prev.output;
            state.globstar = true;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && !afterStar && eos()) {
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)");
            prev.value += value;
            state.globstar = true;
            state.output += prior.output + prev.output;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && rest[0] === "/") {
            const end = rest[1] !== void 0 ? "|$" : "";
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
            prev.value += value;
            state.output += prior.output + prev.output;
            state.globstar = true;
            consume(value + advance());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          if (prior.type === "bos" && rest[0] === "/") {
            prev.type = "globstar";
            prev.value += value;
            prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
            state.output = prev.output;
            state.globstar = true;
            consume(value + advance());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          state.output = state.output.slice(0, -prev.output.length);
          prev.type = "globstar";
          prev.output = globstar(opts);
          prev.value += value;
          state.output += prev.output;
          state.globstar = true;
          consume(value);
          continue;
        }
        const token = { type: "star", value, output: star };
        if (opts.bash === true) {
          token.output = ".*?";
          if (prev.type === "bos" || prev.type === "slash") {
            token.output = nodot + token.output;
          }
          push(token);
          continue;
        }
        if (prev && (prev.type === "bracket" || prev.type === "paren") && opts.regex === true) {
          token.output = value;
          push(token);
          continue;
        }
        if (state.index === state.start || prev.type === "slash" || prev.type === "dot") {
          if (prev.type === "dot") {
            state.output += NO_DOT_SLASH;
            prev.output += NO_DOT_SLASH;
          } else if (opts.dot === true) {
            state.output += NO_DOTS_SLASH;
            prev.output += NO_DOTS_SLASH;
          } else {
            state.output += nodot;
            prev.output += nodot;
          }
          if (peek() !== "*") {
            state.output += ONE_CHAR;
            prev.output += ONE_CHAR;
          }
        }
        push(token);
      }
      while (state.brackets > 0) {
        if (opts.strictBrackets === true)
          throw new SyntaxError(syntaxError("closing", "]"));
        state.output = utils.escapeLast(state.output, "[");
        decrement("brackets");
      }
      while (state.parens > 0) {
        if (opts.strictBrackets === true)
          throw new SyntaxError(syntaxError("closing", ")"));
        state.output = utils.escapeLast(state.output, "(");
        decrement("parens");
      }
      while (state.braces > 0) {
        if (opts.strictBrackets === true)
          throw new SyntaxError(syntaxError("closing", "}"));
        state.output = utils.escapeLast(state.output, "{");
        decrement("braces");
      }
      if (opts.strictSlashes !== true && (prev.type === "star" || prev.type === "bracket")) {
        push({ type: "maybe_slash", value: "", output: `${SLASH_LITERAL}?` });
      }
      if (state.backtrack === true) {
        state.output = "";
        for (const token of state.tokens) {
          state.output += token.output != null ? token.output : token.value;
          if (token.suffix) {
            state.output += token.suffix;
          }
        }
      }
      return state;
    };
    parse.fastpaths = (input, options) => {
      const opts = { ...options };
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      const len = input.length;
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      }
      input = REPLACEMENTS[input] || input;
      const win32 = utils.isWindows(options);
      const {
        DOT_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOTS,
        NO_DOTS_SLASH,
        STAR,
        START_ANCHOR
      } = constants.globChars(win32);
      const nodot = opts.dot ? NO_DOTS : NO_DOT;
      const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
      const capture = opts.capture ? "" : "?:";
      const state = { negated: false, prefix: "" };
      let star = opts.bash === true ? ".*?" : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      const globstar = (opts2) => {
        if (opts2.noglobstar === true)
          return star;
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const create = (str) => {
        switch (str) {
          case "*":
            return `${nodot}${ONE_CHAR}${star}`;
          case ".*":
            return `${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*.*":
            return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*/*":
            return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;
          case "**":
            return nodot + globstar(opts);
          case "**/*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;
          case "**/*.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "**/.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;
          default: {
            const match = /^(.*?)\.(\w+)$/.exec(str);
            if (!match)
              return;
            const source2 = create(match[1]);
            if (!source2)
              return;
            return source2 + DOT_LITERAL + match[2];
          }
        }
      };
      const output = utils.removePrefix(input, state);
      let source = create(output);
      if (source && opts.strictSlashes !== true) {
        source += `${SLASH_LITERAL}?`;
      }
      return source;
    };
    module2.exports = parse;
  }
});

// node_modules/picomatch/lib/picomatch.js
var require_picomatch = __commonJS({
  "node_modules/picomatch/lib/picomatch.js"(exports, module2) {
    "use strict";
    var path = require("path");
    var scan = require_scan();
    var parse = require_parse2();
    var utils = require_utils2();
    var constants = require_constants2();
    var isObject = (val) => val && typeof val === "object" && !Array.isArray(val);
    var picomatch = (glob, options, returnState = false) => {
      if (Array.isArray(glob)) {
        const fns = glob.map((input) => picomatch(input, options, returnState));
        const arrayMatcher = (str) => {
          for (const isMatch2 of fns) {
            const state2 = isMatch2(str);
            if (state2)
              return state2;
          }
          return false;
        };
        return arrayMatcher;
      }
      const isState = isObject(glob) && glob.tokens && glob.input;
      if (glob === "" || typeof glob !== "string" && !isState) {
        throw new TypeError("Expected pattern to be a non-empty string");
      }
      const opts = options || {};
      const posix = utils.isWindows(options);
      const regex = isState ? picomatch.compileRe(glob, options) : picomatch.makeRe(glob, options, false, true);
      const state = regex.state;
      delete regex.state;
      let isIgnored = () => false;
      if (opts.ignore) {
        const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
        isIgnored = picomatch(opts.ignore, ignoreOpts, returnState);
      }
      const matcher = (input, returnObject = false) => {
        const { isMatch: isMatch2, match, output } = picomatch.test(input, regex, options, { glob, posix });
        const result = { glob, state, regex, posix, input, output, match, isMatch: isMatch2 };
        if (typeof opts.onResult === "function") {
          opts.onResult(result);
        }
        if (isMatch2 === false) {
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (isIgnored(input)) {
          if (typeof opts.onIgnore === "function") {
            opts.onIgnore(result);
          }
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (typeof opts.onMatch === "function") {
          opts.onMatch(result);
        }
        return returnObject ? result : true;
      };
      if (returnState) {
        matcher.state = state;
      }
      return matcher;
    };
    picomatch.test = (input, regex, options, { glob, posix } = {}) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected input to be a string");
      }
      if (input === "") {
        return { isMatch: false, output: "" };
      }
      const opts = options || {};
      const format = opts.format || (posix ? utils.toPosixSlashes : null);
      let match = input === glob;
      let output = match && format ? format(input) : input;
      if (match === false) {
        output = format ? format(input) : input;
        match = output === glob;
      }
      if (match === false || opts.capture === true) {
        if (opts.matchBase === true || opts.basename === true) {
          match = picomatch.matchBase(input, regex, options, posix);
        } else {
          match = regex.exec(output);
        }
      }
      return { isMatch: Boolean(match), match, output };
    };
    picomatch.matchBase = (input, glob, options, posix = utils.isWindows(options)) => {
      const regex = glob instanceof RegExp ? glob : picomatch.makeRe(glob, options);
      return regex.test(path.basename(input));
    };
    picomatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);
    picomatch.parse = (pattern, options) => {
      if (Array.isArray(pattern))
        return pattern.map((p) => picomatch.parse(p, options));
      return parse(pattern, { ...options, fastpaths: false });
    };
    picomatch.scan = (input, options) => scan(input, options);
    picomatch.compileRe = (state, options, returnOutput = false, returnState = false) => {
      if (returnOutput === true) {
        return state.output;
      }
      const opts = options || {};
      const prepend = opts.contains ? "" : "^";
      const append = opts.contains ? "" : "$";
      let source = `${prepend}(?:${state.output})${append}`;
      if (state && state.negated === true) {
        source = `^(?!${source}).*$`;
      }
      const regex = picomatch.toRegex(source, options);
      if (returnState === true) {
        regex.state = state;
      }
      return regex;
    };
    picomatch.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
      if (!input || typeof input !== "string") {
        throw new TypeError("Expected a non-empty string");
      }
      let parsed = { negated: false, fastpaths: true };
      if (options.fastpaths !== false && (input[0] === "." || input[0] === "*")) {
        parsed.output = parse.fastpaths(input, options);
      }
      if (!parsed.output) {
        parsed = parse(input, options);
      }
      return picomatch.compileRe(parsed, options, returnOutput, returnState);
    };
    picomatch.toRegex = (source, options) => {
      try {
        const opts = options || {};
        return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
      } catch (err) {
        if (options && options.debug === true)
          throw err;
        return /$^/;
      }
    };
    picomatch.constants = constants;
    module2.exports = picomatch;
  }
});

// node_modules/picomatch/index.js
var require_picomatch2 = __commonJS({
  "node_modules/picomatch/index.js"(exports, module2) {
    "use strict";
    module2.exports = require_picomatch();
  }
});

// node_modules/micromatch/index.js
var require_micromatch = __commonJS({
  "node_modules/micromatch/index.js"(exports, module2) {
    "use strict";
    var util = require("util");
    var braces = require_braces();
    var picomatch = require_picomatch2();
    var utils = require_utils2();
    var isEmptyString = (v) => v === "" || v === "./";
    var hasBraces = (v) => {
      const index = v.indexOf("{");
      return index > -1 && v.indexOf("}", index) > -1;
    };
    var micromatch = (list, patterns, options) => {
      patterns = [].concat(patterns);
      list = [].concat(list);
      let omit = /* @__PURE__ */ new Set();
      let keep = /* @__PURE__ */ new Set();
      let items = /* @__PURE__ */ new Set();
      let negatives = 0;
      let onResult = (state) => {
        items.add(state.output);
        if (options && options.onResult) {
          options.onResult(state);
        }
      };
      for (let i = 0; i < patterns.length; i++) {
        let isMatch2 = picomatch(String(patterns[i]), { ...options, onResult }, true);
        let negated = isMatch2.state.negated || isMatch2.state.negatedExtglob;
        if (negated)
          negatives++;
        for (let item of list) {
          let matched = isMatch2(item, true);
          let match = negated ? !matched.isMatch : matched.isMatch;
          if (!match)
            continue;
          if (negated) {
            omit.add(matched.output);
          } else {
            omit.delete(matched.output);
            keep.add(matched.output);
          }
        }
      }
      let result = negatives === patterns.length ? [...items] : [...keep];
      let matches = result.filter((item) => !omit.has(item));
      if (options && matches.length === 0) {
        if (options.failglob === true) {
          throw new Error(`No matches found for "${patterns.join(", ")}"`);
        }
        if (options.nonull === true || options.nullglob === true) {
          return options.unescape ? patterns.map((p) => p.replace(/\\/g, "")) : patterns;
        }
      }
      return matches;
    };
    micromatch.match = micromatch;
    micromatch.matcher = (pattern, options) => picomatch(pattern, options);
    micromatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);
    micromatch.any = micromatch.isMatch;
    micromatch.not = (list, patterns, options = {}) => {
      patterns = [].concat(patterns).map(String);
      let result = /* @__PURE__ */ new Set();
      let items = [];
      let onResult = (state) => {
        if (options.onResult)
          options.onResult(state);
        items.push(state.output);
      };
      let matches = new Set(micromatch(list, patterns, { ...options, onResult }));
      for (let item of items) {
        if (!matches.has(item)) {
          result.add(item);
        }
      }
      return [...result];
    };
    micromatch.contains = (str, pattern, options) => {
      if (typeof str !== "string") {
        throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
      }
      if (Array.isArray(pattern)) {
        return pattern.some((p) => micromatch.contains(str, p, options));
      }
      if (typeof pattern === "string") {
        if (isEmptyString(str) || isEmptyString(pattern)) {
          return false;
        }
        if (str.includes(pattern) || str.startsWith("./") && str.slice(2).includes(pattern)) {
          return true;
        }
      }
      return micromatch.isMatch(str, pattern, { ...options, contains: true });
    };
    micromatch.matchKeys = (obj, patterns, options) => {
      if (!utils.isObject(obj)) {
        throw new TypeError("Expected the first argument to be an object");
      }
      let keys = micromatch(Object.keys(obj), patterns, options);
      let res = {};
      for (let key of keys)
        res[key] = obj[key];
      return res;
    };
    micromatch.some = (list, patterns, options) => {
      let items = [].concat(list);
      for (let pattern of [].concat(patterns)) {
        let isMatch2 = picomatch(String(pattern), options);
        if (items.some((item) => isMatch2(item))) {
          return true;
        }
      }
      return false;
    };
    micromatch.every = (list, patterns, options) => {
      let items = [].concat(list);
      for (let pattern of [].concat(patterns)) {
        let isMatch2 = picomatch(String(pattern), options);
        if (!items.every((item) => isMatch2(item))) {
          return false;
        }
      }
      return true;
    };
    micromatch.all = (str, patterns, options) => {
      if (typeof str !== "string") {
        throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
      }
      return [].concat(patterns).every((p) => picomatch(p, options)(str));
    };
    micromatch.capture = (glob, input, options) => {
      let posix = utils.isWindows(options);
      let regex = picomatch.makeRe(String(glob), { ...options, capture: true });
      let match = regex.exec(posix ? utils.toPosixSlashes(input) : input);
      if (match) {
        return match.slice(1).map((v) => v === void 0 ? "" : v);
      }
    };
    micromatch.makeRe = (...args) => picomatch.makeRe(...args);
    micromatch.scan = (...args) => picomatch.scan(...args);
    micromatch.parse = (patterns, options) => {
      let res = [];
      for (let pattern of [].concat(patterns || [])) {
        for (let str of braces(String(pattern), options)) {
          res.push(picomatch.parse(str, options));
        }
      }
      return res;
    };
    micromatch.braces = (pattern, options) => {
      if (typeof pattern !== "string")
        throw new TypeError("Expected a string");
      if (options && options.nobrace === true || !hasBraces(pattern)) {
        return [pattern];
      }
      return braces(pattern, options);
    };
    micromatch.braceExpand = (pattern, options) => {
      if (typeof pattern !== "string")
        throw new TypeError("Expected a string");
      return micromatch.braces(pattern, { ...options, expand: true });
    };
    micromatch.hasBraces = hasBraces;
    module2.exports = micromatch;
  }
});

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => NoteFlarePlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian11 = require("obsidian");

// src/api/githubApi.ts
var import_obsidian = require("obsidian");
async function doRequest(url, options = {}) {
  const resp = await (0, import_obsidian.requestUrl)({
    url,
    method: options.method || "GET",
    headers: options.headers,
    body: options.body,
    throw: false
  });
  return {
    ok: resp.status >= 200 && resp.status < 300,
    status: resp.status,
    json: async () => resp.json,
    text: async () => resp.text
  };
}
var GITHUB_API = "https://api.github.com";
var BATCH_SIZE = 10;
var RATE_LIMIT_WAIT_MS = 6e4;
var GitHubApi = class {
  constructor(token, owner, repo, branch = "") {
    this.token = token;
    this.owner = owner;
    this.repo = repo.trim().replace(/\s+/g, "-");
    this.branch = branch;
  }
  get headers() {
    return {
      Authorization: `token ${this.token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json"
    };
  }
  async getAuthenticatedUser() {
    const resp = await doRequest(`${GITHUB_API}/user`, { headers: this.headers });
    if (!resp.ok) {
      throw new Error("Invalid GitHub token or missing repo permission");
    }
    const data = await resp.json();
    return data == null ? void 0 : data.login;
  }
  /** The repo's default branch (e.g. `main`). */
  async getDefaultBranch() {
    const resp = await doRequest(`${GITHUB_API}/repos/${this.owner}/${this.repo}`, {
      headers: this.headers
    });
    if (!resp.ok) {
      throw new Error("Could not read repository info from GitHub. Check the token and repo name.");
    }
    const data = await resp.json();
    return (data == null ? void 0 : data.default_branch) || "main";
  }
  /**
   * Create an empty public repo, initialised with one commit on the default
   * branch (`main`). NoteFlare then commits the user's content plus a mdgarden
   * `package.json`/`mdgarden.config.json` on top — there's no template fork, so
   * there's no v4/v5 branch drift to manage. Idempotent: a 422 (already exists)
   * is treated as success so setup can be re-run.
   */
  async createRepo(privateRepo = false) {
    var _a, _b, _c;
    const resp = await doRequest(`${GITHUB_API}/user/repos`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: this.repo,
        private: privateRepo,
        auto_init: true,
        description: privateRepo ? "Private vault backup managed by NoteFlare" : "Published with NoteFlare (mdgarden)"
      })
    });
    if (resp.status === 422) {
      const errBody = await resp.json().catch(() => ({}));
      const ghMessage = (_a = errBody == null ? void 0 : errBody.message) != null ? _a : "";
      const errors = (_b = errBody == null ? void 0 : errBody.errors) != null ? _b : [];
      const alreadyExists = errors.some(
        (e) => {
          var _a2;
          return ((_a2 = e.message) != null ? _a2 : "").toLowerCase().includes("already exist");
        }
      ) || ghMessage.toLowerCase().includes("already exist");
      if (alreadyExists && await this.repoExists()) {
        return;
      }
      throw new Error(
        `A GitHub repository named "${this.repo}" already exists. Please choose a different site name and try again.`
      );
    }
    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      throw new Error(`Failed to create GitHub repo: ${(_c = err.message) != null ? _c : "Unknown error"}`);
    }
  }
  /** Thin JSON wrapper around the GitHub REST API; throws with .status on error. */
  async gh(path, method, body) {
    var _a;
    const resp = await doRequest(`${GITHUB_API}${path}`, {
      method,
      headers: this.headers,
      body: body === void 0 ? void 0 : JSON.stringify(body)
    });
    if (!resp.ok) {
      const errBody = await resp.json().catch(() => ({}));
      const err = new Error((_a = errBody == null ? void 0 : errBody.message) != null ? _a : `GitHub request failed (${resp.status})`);
      err.status = resp.status;
      throw err;
    }
    return await resp.json();
  }
  /**
   * Upload every file as a SINGLE git commit via the Git Data API
   * (blobs → tree → commit → move branch ref), instead of one Contents-API PUT
   * per file. One commit means Cloudflare runs exactly one build per publish,
   * and there are no per-file SHA conflicts (the new tree is layered on the
   * current tree with `base_tree`), which kills the 409/422 errors entirely.
   */
  async commitFiles(files, message, onProgress, onRateLimit, mirrorPrefix = "", options) {
    const result = { success: true, uploaded: 0, failed: 0, errors: [], fixed: 0, issues: [] };
    if (files.length === 0)
      return result;
    try {
      const exists = await this.repoExists();
      if (!exists) {
        const isPrivate = (options == null ? void 0 : options.isPrivate) || false;
        await this.createRepo(isPrivate);
        const ready = await this.waitForRepo(3e4);
        if (!ready) {
          result.success = false;
          result.errors.push("Timed out waiting for repository creation on GitHub.");
          return result;
        }
      }
    } catch (e) {
      result.success = false;
      result.errors.push(`Failed to check or create repository: ${e.message}`);
      return result;
    }
    if (!this.branch) {
      result.success = false;
      result.errors.push("No branch specified. Run setup to detect the repository default branch.");
      return result;
    }
    const branch = this.branch;
    const refPath = `/repos/${this.owner}/${this.repo}/git/refs/heads/${encodeURIComponent(branch)}`;
    let headSha = null;
    let baseTreeSha = null;
    let branchExists = true;
    try {
      if (!headSha) {
        const ref = await this.gh(refPath, "GET");
        headSha = ref.object.sha;
      }
      const headCommit = await this.gh(
        `/repos/${this.owner}/${this.repo}/git/commits/${headSha}`,
        "GET"
      );
      baseTreeSha = headCommit.tree.sha;
    } catch (err) {
      if (err.status === 404) {
        branchExists = false;
      } else {
        result.success = false;
        result.errors.push(`Could not read branch "${branch}": ${err.message}`);
        return result;
      }
    }
    const treeItems = [];
    let done = 0;
    for (let i = 0; i < files.length; i += BATCH_SIZE) {
      const batch = files.slice(i, i + BATCH_SIZE);
      await Promise.all(
        batch.map(async (file) => {
          try {
            if (file.content === null) {
              treeItems.push({ path: file.path, mode: "100644", type: "blob", sha: null });
            } else {
              const sha = await this.createBlobWithRetry(file.content, onRateLimit);
              treeItems.push({ path: file.path, mode: "100644", type: "blob", sha });
            }
            result.uploaded++;
          } catch (err) {
            result.failed++;
            result.errors.push(`${file.path}: ${err.message}`);
          }
          done++;
          onProgress(done, files.length);
        })
      );
      if (i + BATCH_SIZE < files.length) {
        await new Promise((r) => window.setTimeout(r, 100));
      }
    }
    if (result.uploaded === 0) {
      result.success = false;
      return result;
    }
    if (result.failed > 0) {
      for (let index = treeItems.length - 1; index >= 0; index--) {
        if (treeItems[index].sha === null)
          treeItems.splice(index, 1);
      }
      if (treeItems.length === 0) {
        result.success = false;
        return result;
      }
    }
    if (mirrorPrefix && result.failed === 0 && baseTreeSha) {
      try {
        const full = await this.gh(
          `/repos/${this.owner}/${this.repo}/git/trees/${baseTreeSha}?recursive=1`,
          "GET"
        );
        const keep = new Set(files.map((f) => f.path));
        for (const entry of full.tree) {
          if (entry.type === "blob" && entry.path.startsWith(mirrorPrefix) && !keep.has(entry.path)) {
            treeItems.push({ path: entry.path, mode: "100644", type: "blob", sha: null });
          }
        }
      } catch (e) {
      }
    }
    try {
      const tree = await this.gh(
        `/repos/${this.owner}/${this.repo}/git/trees`,
        "POST",
        baseTreeSha ? { base_tree: baseTreeSha, tree: treeItems } : { tree: treeItems }
      );
      const commit = await this.gh(
        `/repos/${this.owner}/${this.repo}/git/commits`,
        "POST",
        headSha ? { message, tree: tree.sha, parents: [headSha] } : { message, tree: tree.sha, parents: [] }
      );
      result.commitSha = commit.sha;
      if (branchExists) {
        await this.gh(refPath, "PATCH", { sha: commit.sha, force: false });
      } else {
        await this.gh(`/repos/${this.owner}/${this.repo}/git/refs`, "POST", {
          ref: `refs/heads/${branch}`,
          sha: commit.sha
        });
      }
    } catch (err) {
      result.success = false;
      result.errors.push(`Commit failed: ${err.message}`);
      return result;
    }
    if (result.failed > 0)
      result.success = false;
    return result;
  }
  async createBlobWithRetry(base64Content, onRateLimit) {
    let lastErr = null;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const blob = await this.gh(
          `/repos/${this.owner}/${this.repo}/git/blobs`,
          "POST",
          { content: base64Content, encoding: "base64" }
        );
        return blob.sha;
      } catch (err) {
        lastErr = err;
        const status = lastErr.status;
        const msg = lastErr.message.toLowerCase();
        const rateLimited = status === 429 || status === 403 && (msg.includes("rate limit") || msg.includes("abuse") || msg.includes("secondary"));
        if (status === 404 || status === 401 || status === 403 && !rateLimited) {
          throw lastErr;
        }
        if (rateLimited) {
          await this.waitWithCountdown(RATE_LIMIT_WAIT_MS, onRateLimit);
        } else if (attempt < 2) {
          await new Promise((r) => window.setTimeout(r, 1e3 * Math.pow(2, attempt)));
        }
      }
    }
    throw lastErr != null ? lastErr : new Error("Blob creation failed");
  }
  async waitWithCountdown(ms, onTick) {
    if (!onTick) {
      await new Promise((r) => window.setTimeout(r, ms));
      return;
    }
    let secsLeft = Math.ceil(ms / 1e3);
    const interval = window.setInterval(() => {
      secsLeft--;
      if (secsLeft >= 0)
        onTick(secsLeft);
    }, 1e3);
    await new Promise((r) => window.setTimeout(r, ms));
    window.clearInterval(interval);
  }
  async repoExists() {
    const resp = await doRequest(
      `${GITHUB_API}/repos/${this.owner}/${this.repo}`,
      { headers: this.headers }
    );
    return resp.ok;
  }
  async isRepoPrivate() {
    const resp = await doRequest(
      `${GITHUB_API}/repos/${this.owner}/${this.repo}`,
      { headers: this.headers }
    );
    if (!resp.ok) {
      throw new Error("Could not verify backup storage privacy.");
    }
    const data = await resp.json();
    return data.private === true;
  }
  async waitForRepo(maxWaitMs = 3e4) {
    const start = Date.now();
    while (Date.now() - start < maxWaitMs) {
      if (await this.repoExists())
        return true;
      await new Promise((r) => window.setTimeout(r, 2e3));
    }
    return false;
  }
  /**
   * Fetch the flat file tree for the repository's internal storage reference.
   * Returns an array of { path, sha, type } objects for all blobs (files).
   * Used by BackupEngine to avoid re-uploading unchanged files.
   */
  async listTree(branch) {
    var _a;
    const ref = branch || this.branch || "main";
    const data = await this.gh(
      `/repos/${this.owner}/${this.repo}/git/trees/${encodeURIComponent(ref)}?recursive=1`,
      "GET"
    );
    return ((_a = data.tree) != null ? _a : []).filter((item) => item.type === "blob");
  }
};

// src/api/cloudflareApi.ts
var import_obsidian2 = require("obsidian");
var CF_API = "https://api.cloudflare.com/client/v4";
var MDGARDEN_BUILD_COMMAND = "npm ci || npm install && npx mdgarden build";
var CloudflareApi = class {
  constructor(token, accountId) {
    this.token = token;
    this.accountId = accountId;
  }
  get headers() {
    return {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json"
    };
  }
  async request(path, method = "GET", body) {
    var _a, _b, _c, _d;
    try {
      const resp = await (0, import_obsidian2.requestUrl)({
        url: `${CF_API}${path}`,
        method,
        headers: this.headers,
        body: body ? JSON.stringify(body) : void 0,
        throw: false
      });
      const data = (_a = resp.json) != null ? _a : {};
      if (resp.status >= 400) {
        const message = (_d = (_c = (_b = data.errors) == null ? void 0 : _b[0]) == null ? void 0 : _c.message) != null ? _d : this.messageForStatus(resp.status);
        throw new Error(message);
      }
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      if (message.toLowerCase().includes("failed to fetch")) {
        throw new Error(
          "Could not reach Cloudflare. Check your internet connection, firewall, or proxy, then try again."
        );
      }
      throw err;
    }
  }
  messageForStatus(status) {
    if (status === 401 || status === 403) {
      return "Cloudflare rejected this token. Create an Account API Token with Cloudflare Pages: Edit (and Workers Scripts: Edit) permissions.";
    }
    if (status === 404) {
      return "Cloudflare account or Pages project not found. Double-check the Account ID and project name.";
    }
    if (status >= 500) {
      return "Cloudflare is temporarily unavailable. Please try again in a moment.";
    }
    return "Cloudflare request failed.";
  }
  /**
   * Lists the accounts this token can reach and returns the first id.
   * Lets the wizard auto-detect the Account ID so the user never has to copy
   * the 32-character value out of the dashboard by hand. Requires the token to
   * include Account Settings: Read (bundled into our token template link).
   */
  async getAccountId() {
    var _a, _b;
    const data = await this.request("/accounts");
    const accounts = (_a = data.result) != null ? _a : [];
    const id = (_b = accounts[0]) == null ? void 0 : _b.id;
    if (!id) {
      throw new Error(
        'Could not read any Cloudflare account from this token. Add the "Account Settings: Read" permission, or paste your Account ID manually.'
      );
    }
    return id;
  }
  async createProject(name, githubOwner, repo, branch, rootDir = "") {
    var _a, _b;
    const data = await this.request(
      `/accounts/${this.accountId}/pages/projects`,
      "POST",
      {
        name,
        source: {
          type: "github",
          config: {
            owner: githubOwner,
            repo_name: repo,
            // The repo's default branch (main). Building a non-existent branch
            // yields a blank site / 522.
            production_branch: branch,
            deployments_enabled: true
          }
        },
        build_config: {
          build_command: MDGARDEN_BUILD_COMMAND,
          destination_dir: "public",
          root_dir: rootDir
        }
      }
    );
    const result = (_a = data.result) != null ? _a : {};
    const rawSubdomain = (_b = result.subdomain) != null ? _b : name;
    const subdomain = rawSubdomain.replace(/\.pages\.dev$/, "");
    return `${subdomain}.pages.dev`;
  }
  /**
   * Repair the build settings on an EXISTING project so a re-publish self-heals
   * a project that was created with a bad build command or wrong branch — the
   * user never has to edit the Cloudflare dashboard. Called every publish.
   * - build_command must install deps before `npx mdgarden build` (see above).
   * - production_branch must be the repo's real default branch (main) or
   *   Cloudflare builds a non-existent branch → blank site / 522.
   */
  async configureBuild(name, githubOwner, repo, branch, rootDir = "") {
    await this.request(
      `/accounts/${this.accountId}/pages/projects/${name}`,
      "PATCH",
      {
        build_config: {
          build_command: MDGARDEN_BUILD_COMMAND,
          destination_dir: "public",
          root_dir: rootDir
        },
        source: {
          type: "github",
          config: {
            owner: githubOwner,
            repo_name: repo,
            production_branch: branch,
            deployments_enabled: true
          }
        }
      }
    );
  }
  /**
   * Forces a fresh production build. Content commits normally trigger a build
   * via the git webhook, but firing this explicitly guarantees the latest notes
   * actually get deployed. Best-effort — the caller treats failure as non-fatal.
   */
  async triggerDeployment(name, branch) {
    await this.request(
      `/accounts/${this.accountId}/pages/projects/${name}/deployments`,
      "POST",
      branch ? { branch } : void 0
    );
  }
  async getProject(name) {
    var _a;
    const data = await this.request(
      `/accounts/${this.accountId}/pages/projects/${name}`
    );
    const result = data.result;
    const rawSubdomain = (_a = result == null ? void 0 : result.subdomain) != null ? _a : name;
    const subdomain = rawSubdomain.replace(/\.pages\.dev$/, "");
    return `${subdomain}.pages.dev`;
  }
  async enableDeployment(name) {
    await this.request(
      `/accounts/${this.accountId}/pages/projects/${name}`,
      "PATCH",
      {
        deployment_configs: { production: { deployment_enabled: true } }
      }
    );
  }
  async deleteProject(name) {
    await this.request(
      `/accounts/${this.accountId}/pages/projects/${name}`,
      "DELETE"
    );
  }
};

// src/publish/fileCollector.ts
var import_obsidian3 = require("obsidian");
var import_micromatch = __toESM(require_micromatch());

// src/core/constants.ts
var ATTACHMENT_EXTS = /* @__PURE__ */ new Set([
  "png",
  "jpg",
  "jpeg",
  "gif",
  "svg",
  "webp",
  "pdf"
]);
var NODE_VERSION = "22";
var MDGARDEN_VERSION = "latest";
var GITHUB_ACTIONS_WORKFLOW = `name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '${NODE_VERSION}'
          cache: npm
      - run: npm ci || npm install
      - run: npx mdgarden build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: public

  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;

// src/publish/fileCollector.ts
var FileCollector = class {
  constructor(app, site) {
    this.app = app;
    this.site = site;
    this.publishScope = site.publishScope || "vault";
    this.publishPaths = (site.publishPaths || []).map((p) => p.trim().replace(/^\/+|\/+$/g, "")).filter(Boolean);
  }
  async collect() {
    const result = [];
    if (this.publishScope === "selected") {
      const explicitFiles = /* @__PURE__ */ new Set();
      for (const path of this.publishPaths) {
        const abstractFile = this.app.vault.getAbstractFileByPath(path);
        if (abstractFile instanceof import_obsidian3.TFile) {
          if (abstractFile.extension === "md" && !this.isExcluded(abstractFile.path)) {
            if (!result.some((f) => f.path === abstractFile.path)) {
              result.push(abstractFile);
              explicitFiles.add(abstractFile.path);
            }
          }
        } else if (abstractFile instanceof import_obsidian3.TFolder) {
          const folderPrefix = path + "/";
          for (const file of this.app.vault.getFiles()) {
            if (file.path.startsWith(folderPrefix) && !this.isExcluded(file.path)) {
              if (file.extension === "md") {
                if (!result.some((f) => f.path === file.path)) {
                  result.push(file);
                }
              } else if (this.site.includeAttachments && ATTACHMENT_EXTS.has(file.extension.toLowerCase())) {
                if (!result.some((f) => f.path === file.path)) {
                  result.push(file);
                }
              }
            }
          }
        }
      }
      if (this.site.includeAttachments) {
        const extraAttachments = [];
        for (const file of result) {
          if (explicitFiles.has(file.path)) {
            const cache = this.app.metadataCache.getCache(file.path);
            const linksAndEmbeds = [
              ...(cache == null ? void 0 : cache.links) || [],
              ...(cache == null ? void 0 : cache.embeds) || []
            ];
            for (const item of linksAndEmbeds) {
              const destFile = this.app.metadataCache.getFirstLinkpathDest(item.link, file.path);
              if (destFile && ATTACHMENT_EXTS.has(destFile.extension.toLowerCase())) {
                if (!this.isExcluded(destFile.path) && !result.some((f) => f.path === destFile.path) && !extraAttachments.some((f) => f.path === destFile.path)) {
                  extraAttachments.push(destFile);
                }
              }
            }
          }
        }
        result.push(...extraAttachments);
      }
      return result;
    }
    for (const file of this.app.vault.getFiles()) {
      if (this.isExcluded(file.path))
        continue;
      if (file.extension === "md") {
        result.push(file);
      } else if (this.site.includeAttachments && ATTACHMENT_EXTS.has(file.extension.toLowerCase())) {
        result.push(file);
      }
    }
    return result;
  }
  async readAsBase64(file) {
    const buffer = await this.app.vault.readBinary(file);
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
  isExcluded(path) {
    if (this.site.excludePatterns.length === 0)
      return false;
    return (0, import_micromatch.isMatch)(path, this.site.excludePatterns, { dot: true });
  }
};

// src/publish/transformer.ts
var import_obsidian5 = require("obsidian");

// src/publish/contentValidator.ts
var import_obsidian4 = require("obsidian");
var LEADING_BLOCK_RE = /^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(\r?\n|$)/;
function hasValidLeadingFrontmatter(raw) {
  const s = raw.replace(/^\ufeff/, "");
  const m = s.match(LEADING_BLOCK_RE);
  if (!m)
    return false;
  try {
    (0, import_obsidian4.parseYaml)(m[1]);
    return true;
  } catch (e) {
    return false;
  }
}
function looksLikeFrontmatterOpener(raw) {
  const stripped = raw.replace(/^\ufeff/, "").replace(/^[ \t\r\n]+/, "");
  return stripped.startsWith("---");
}
function inspectFrontmatter(raw) {
  if (hasValidLeadingFrontmatter(raw))
    return { status: "clean" };
  if (looksLikeFrontmatterOpener(raw)) {
    return { status: "fixed", reason: "stray or unparseable \u201C---\u201D at the top \u2014 would break the mdgarden build" };
  }
  return { status: "clean" };
}
function normalizeFrontmatter(raw, title) {
  if (hasValidLeadingFrontmatter(raw))
    return raw;
  const safeTitle = title.replace(/"/g, "'");
  return `---
title: "${safeTitle}"
---

${raw}`;
}

// src/publish/transformer.ts
var LEADING_BLOCK_RE2 = /^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(\r?\n|$)/;
var Transformer = class {
  transform(content, filePath, title) {
    var _a, _b;
    const noteTitle = (_b = title != null ? title : (_a = filePath.split("/").pop()) == null ? void 0 : _a.replace(/\.md$/, "")) != null ? _b : "Untitled";
    let result = normalizeFrontmatter(content, noteTitle);
    result = this.stripPrivateFrontmatter(result);
    return result;
  }
  /**
   * Remove `private`/`draft` keys from the leading frontmatter block. Parses the
   * block with Obsidian's YAML engine (robust against quoting/nesting) rather
   * than splitting lines. Assumes a valid leading block (guaranteed by
   * `normalizeFrontmatter` upstream); leaves content untouched otherwise.
   */
  stripPrivateFrontmatter(content) {
    var _a, _b;
    const m = content.match(LEADING_BLOCK_RE2);
    if (!m)
      return content;
    let data;
    try {
      data = (_a = (0, import_obsidian5.parseYaml)(m[1])) != null ? _a : {};
    } catch (e) {
      return content;
    }
    delete data.private;
    delete data.draft;
    const keys = Object.keys(data);
    const yaml = keys.length ? (0, import_obsidian5.stringifyYaml)(data).trimEnd() : "";
    const block = yaml ? `---
${yaml}
---` : `---
---`;
    const trailing = m[2] ? "\n" : "";
    return content.slice(0, m.index) + block + trailing + content.slice(((_b = m.index) != null ? _b : 0) + m[0].length);
  }
};

// src/publish/publisher.ts
var RECONNECT_HINT = `If the build can't start, reconnect Cloudflare to GitHub: install/authorize the "Cloudflare Workers and Pages" GitHub App for this repo.`;
function textToBase64(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
var Publisher = class {
  constructor(settings, site, app, onProgress) {
    this.settings = settings;
    this.site = site;
    this.app = app;
    this.onProgress = onProgress;
  }
  /** Determine the effective deploy target for this site. */
  get deployTarget() {
    if (this.site.deployTarget)
      return this.site.deployTarget;
    return this.settings.cloudflareToken ? "cloudflare" : "github-actions";
  }
  async publish() {
    var _a;
    const repo = this.settings.masterRepository;
    let branch = this.site.githubBranch || "main";
    try {
      const probe = new GitHubApi(
        this.settings.githubToken,
        this.settings.githubOwner,
        repo
      );
      branch = await probe.getDefaultBranch();
      this.site.githubBranch = branch;
    } catch (e) {
    }
    const github = new GitHubApi(
      this.settings.githubToken,
      this.settings.githubOwner,
      repo,
      branch
    );
    const collector = new FileCollector(this.app, this.site);
    const transformer = new Transformer();
    const uploadFilesMap = /* @__PURE__ */ new Map();
    const issues = [];
    let fixedCount = 0;
    const rootDir = `sites/${this.site.id}`;
    this.onProgress("Collecting files\u2026");
    const files = await collector.collect();
    for (const file of files) {
      let content;
      let repoPath;
      if (file.extension === "md") {
        const raw = await this.app.vault.read(file);
        const check = inspectFrontmatter(raw);
        if (check.status === "fixed") {
          fixedCount++;
          issues.push(`${file.path}: ${(_a = check.reason) != null ? _a : "frontmatter auto-fixed"}`);
        }
        const transformed = transformer.transform(raw, file.path, file.basename);
        content = textToBase64(transformed);
        repoPath = `${rootDir}/content/${file.path}`;
      } else {
        content = await collector.readAsBase64(file);
        repoPath = `${rootDir}/content/attachments/${file.name}`;
      }
      if (!uploadFilesMap.has(repoPath)) {
        uploadFilesMap.set(repoPath, { path: repoPath, content });
      }
    }
    uploadFilesMap.set(`${rootDir}/package.json`, {
      path: `${rootDir}/package.json`,
      content: textToBase64(this.buildPackageJson())
    });
    uploadFilesMap.set(`${rootDir}/mdgarden.config.json`, {
      path: `${rootDir}/mdgarden.config.json`,
      content: textToBase64(this.buildMdgardenConfig())
    });
    uploadFilesMap.set(`${rootDir}/.node-version`, {
      path: `${rootDir}/.node-version`,
      content: textToBase64(`${NODE_VERSION}
`)
    });
    if (this.deployTarget === "github-actions") {
      uploadFilesMap.set(".github/workflows/deploy.yml", {
        path: ".github/workflows/deploy.yml",
        content: textToBase64(GITHUB_ACTIONS_WORKFLOW)
      });
    }
    const uploadFiles = Array.from(uploadFilesMap.values());
    this.onProgress(`Uploading 0/${uploadFiles.length}...`);
    const result = await github.commitFiles(
      uploadFiles,
      `NoteFlare: publish ${uploadFiles.length} files`,
      (done, total) => this.onProgress(`Uploading ${done}/${total}...`),
      (secsLeft) => this.onProgress(`Rate limited \u2014 ${secsLeft}s...`),
      // Mirror content/ so notes removed or excluded from the vault disappear
      // from the published site too.
      `${rootDir}/content/`
    );
    result.fixed = fixedCount;
    result.issues = issues;
    if (this.deployTarget === "cloudflare") {
      const cloudflare = new CloudflareApi(
        this.settings.cloudflareToken,
        this.settings.cloudflareAccount
      );
      try {
        await cloudflare.enableDeployment(this.site.cloudflareProject);
      } catch (err) {
        const msg = err.message;
        if (msg.includes("Project not found")) {
          try {
            await cloudflare.createProject(
              this.site.cloudflareProject,
              this.settings.githubOwner,
              repo,
              branch,
              rootDir
            );
          } catch (createErr) {
            result.errors.push(`Cloudflare recovery failed: ${createErr.message}`);
            result.success = false;
          }
        } else {
          result.errors.push(`Cloudflare: ${msg}`);
          result.success = false;
        }
      }
      try {
        await cloudflare.configureBuild(
          this.site.cloudflareProject,
          this.settings.githubOwner,
          repo,
          branch,
          rootDir
        );
      } catch (err) {
        result.errors.push(`Cloudflare build config: ${err.message}`);
        result.success = false;
      }
      try {
        await cloudflare.triggerDeployment(this.site.cloudflareProject, branch);
      } catch (err) {
        result.errors.push(`Cloudflare build: ${err.message}. ${RECONNECT_HINT}`);
        result.success = false;
      }
    }
    return result;
  }
  /** package.json for the published repo so Cloudflare can `npx mdgarden build`. */
  buildPackageJson() {
    const pkg = {
      name: this.site.name || "my-mdgarden",
      private: true,
      scripts: { build: "mdgarden build" },
      dependencies: { mdgarden: MDGARDEN_VERSION }
    };
    return `${JSON.stringify(pkg, null, 2)}
`;
  }
  /** mdgarden.config.json generated from this site's profile (plugin-managed). */
  buildMdgardenConfig() {
    const vaultName = this.app.vault.getName();
    const host = this.site.siteUrl.replace(/^https?:\/\//, "");
    const config = {
      site: {
        title: this.site.sidebarTitle || this.site.name || vaultName,
        description: this.site.siteDescription || `Notes published from ${vaultName}`,
        baseUrl: host ? `https://${host}` : "",
        language: "en",
        author: this.site.authorName || ""
      },
      theme: { darkMode: "toggle" },
      nav: [
        { title: "Home", url: "/" },
        { title: "Tags", url: "/tags/" }
      ],
      features: {
        search: true,
        backlinks: true,
        tags: true,
        graph: true,
        math: true,
        syntaxHighlight: true,
        rss: true,
        sitemap: true
      },
      build: { contentDir: "content", outDir: "public" }
    };
    return `${JSON.stringify(config, null, 2)}
`;
  }
  async unpublish() {
    if (this.deployTarget === "cloudflare") {
      const cloudflare = new CloudflareApi(
        this.settings.cloudflareToken,
        this.settings.cloudflareAccount
      );
      await cloudflare.deleteProject(this.site.cloudflareProject);
    }
  }
};

// src/core/settings.ts
var DEFAULT_EXCLUDE_PATTERNS = ["private/**", "*.private.md", "Templates/**"];
var DEFAULT_BACKUP_SETTINGS = {
  repository: "",
  folder: "",
  backupOnChange: true,
  intervalMinutes: 60,
  lastBackupAttemptAt: "",
  lastBackupAt: "",
  lastBackupError: ""
};
var DEFAULT_SETTINGS = {
  githubOwner: "",
  githubToken: "",
  cloudflareAccount: "",
  cloudflareToken: "",
  sites: [],
  activeSiteId: "",
  setupComplete: false,
  enableBackup: false,
  enablePublish: true,
  backup: { ...DEFAULT_BACKUP_SETTINGS },
  masterRepository: "",
  defaultViewLocation: "left"
};
function createSiteProfile(partial = {}) {
  return {
    id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `site-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: "",
    githubRepo: "",
    githubBranch: "",
    cloudflareProject: "",
    siteUrl: "",
    publishScope: partial.publishScope || "vault",
    publishPaths: partial.publishPaths || [],
    authorName: "",
    sidebarTitle: "",
    siteDescription: "",
    excludePatterns: [...DEFAULT_EXCLUDE_PATTERNS],
    includeAttachments: true,
    isPublished: false,
    lastPublished: "",
    lastNoteCount: 0,
    deployTarget: "cloudflare",
    ...partial
  };
}

// src/ui/settings/settingsTab.ts
var import_obsidian8 = require("obsidian");

// src/ui/settings/siteModals.ts
var import_obsidian6 = require("obsidian");
var import_obsidian7 = require("obsidian");
function buildCloudflareTokenUrl() {
  const perms = encodeURIComponent(JSON.stringify([
    { key: "page", type: "edit" },
    { key: "workers_scripts", type: "edit" },
    { key: "account_settings", type: "read" }
  ]));
  return `https://dash.cloudflare.com/profile/api-tokens?permissionGroupKeys=${perms}&accountId=*&zoneId=all&name=NoteFlare`;
}
function slugify(value) {
  return value.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
}
function cloudflareSetupHint(rawMessage, repoSlug) {
  const lower = rawMessage.toLowerCase();
  if (lower.includes("rejected this token") || lower.includes("permission") || lower.includes("authentication")) {
    return "Cloudflare rejected this token. Make sure it has the Cloudflare Pages: Edit permission, then try again.";
  }
  return `Couldn't create the Pages project. Most likely the Cloudflare GitHub App isn't authorized for ${repoSlug} yet \u2014 use \u201CAuthorize Cloudflare on GitHub\u201D, grant access to that repo, then try again. (Cloudflare said: ${rawMessage})`;
}
async function provisionSite(plugin, name, profileParams, deployTarget = "cloudflare") {
  const slug = slugify(name);
  if (!slug)
    throw new Error("Please enter a site name.");
  const owner = plugin.settings.githubOwner;
  const repo = plugin.settings.masterRepository;
  if (!repo)
    throw new Error("Please configure a Master Repository in settings first.");
  const site = createSiteProfile({
    name,
    deployTarget,
    ...profileParams
  });
  const gh = new GitHubApi(plugin.settings.githubToken, owner, repo);
  await gh.createRepo();
  if (!await gh.waitForRepo(3e4)) {
    throw new Error("Repository creation timed out \u2014 please try again.");
  }
  let branch = "main";
  try {
    branch = await gh.getDefaultBranch();
  } catch (e) {
  }
  site.githubBranch = branch;
  let siteUrl = "";
  if (deployTarget === "cloudflare") {
    const cf = new CloudflareApi(plugin.settings.cloudflareToken, plugin.settings.cloudflareAccount);
    const rootDir = `sites/${site.id}`;
    const projectName = slugify(`${repo}-${slug}`);
    try {
      siteUrl = await cf.createProject(projectName, owner, repo, branch, rootDir);
      site.cloudflareProject = projectName;
    } catch (createErr) {
      try {
        siteUrl = await cf.getProject(projectName);
        site.cloudflareProject = projectName;
      } catch (e) {
        throw new Error(cloudflareSetupHint(createErr.message, `${owner}/${repo}`));
      }
    }
  } else {
    siteUrl = `${owner}.github.io/${repo}`;
  }
  site.siteUrl = siteUrl;
  return site;
}
var AddSiteModal = class extends import_obsidian6.Modal {
  constructor(app, plugin, onDone) {
    super(app);
    this.plugin = plugin;
    this.onDone = onDone;
  }
  onOpen() {
    this.titleEl.setText("Add a site");
    let name = "";
    let scope = "vault";
    let paths = [];
    let authorName = "";
    let sidebarTitle = "";
    let siteDescription = "";
    new import_obsidian6.Setting(this.contentEl).setName("Site name").setDesc("A new GitHub repo + Cloudflare project with this name.").addText((t) => {
      t.setPlaceholder("my-blog");
      t.onChange((v) => {
        name = v;
      });
    });
    new import_obsidian6.Setting(this.contentEl).setName("Publish scope").setDesc("Configure what to publish: the entire vault or selected files/folders.").addDropdown((d) => {
      d.addOption("vault", "Full Vault");
      d.addOption("selected", "Selected Files/Folders");
      d.setValue("vault");
      d.onChange((v) => {
        scope = v;
        updateVisibility();
      });
    });
    const pathsContainer = this.contentEl.createDiv("noteflare-paths-container");
    const renderPaths = () => {
      pathsContainer.empty();
      if (scope === "vault") {
        pathsContainer.setCssStyles({ display: "none" });
        return;
      }
      pathsContainer.setCssStyles({ display: "block" });
      if (paths.length === 0) {
        pathsContainer.createEl("p", { text: "No files or folders selected.", cls: "noteflare-muted" });
      } else {
        const list = pathsContainer.createEl("ul", { cls: "noteflare-path-list" });
        for (let i = 0; i < paths.length; i++) {
          const li = list.createEl("li");
          li.setCssStyles({ display: "flex" });
          li.setCssStyles({ justifyContent: "space-between" });
          li.setCssStyles({ alignItems: "center" });
          li.setCssStyles({ marginBottom: "4px" });
          li.createSpan({ text: paths[i] });
          const removeBtn = li.createEl("button", { text: "\u2715" });
          removeBtn.addEventListener("click", () => {
            paths.splice(i, 1);
            renderPaths();
          });
        }
      }
      const addRow = pathsContainer.createDiv("noteflare-add-path-row");
      addRow.setCssStyles({ marginTop: "8px" });
      const addBtn = addRow.createEl("button", { text: "Browse Vault..." });
      addBtn.setCssStyles({ width: "100%" });
      addBtn.addEventListener("click", () => {
        new PathSuggestModal(this.app, (selectedPath) => {
          if (selectedPath.trim() && !paths.includes(selectedPath.trim())) {
            paths.push(selectedPath.trim());
            renderPaths();
          }
        }).open();
      });
    };
    const updateVisibility = () => {
      renderPaths();
    };
    new import_obsidian6.Setting(this.contentEl).setName("Author name").setDesc("Author name written to site metadata (optional).").addText((t) => {
      t.setPlaceholder("Your Name");
      t.onChange((v) => {
        authorName = v.trim();
      });
    });
    new import_obsidian6.Setting(this.contentEl).setName("Sidebar title").setDesc("Title shown in the sidebar (optional, defaults to site name).").addText((t) => {
      t.setPlaceholder("My Digital Garden");
      t.onChange((v) => {
        sidebarTitle = v.trim();
      });
    });
    new import_obsidian6.Setting(this.contentEl).setName("Site description").setDesc("Description of your site (optional).").addText((t) => {
      t.setPlaceholder("Notes and thoughts\u2026");
      t.onChange((v) => {
        siteDescription = v.trim();
      });
    });
    updateVisibility();
    const errorEl = this.contentEl.createEl("p", { cls: "setting-item-description" });
    errorEl.setCssStyles({ color: "var(--text-error)" });
    errorEl.hide();
    new import_obsidian6.Setting(this.contentEl).addButton((b) => b.setButtonText("Cancel").onClick(() => this.close())).addButton(
      (b) => b.setButtonText("Create site").setCta().onClick(async () => {
        if (!slugify(name)) {
          errorEl.setText("Please enter a site name.");
          errorEl.show();
          return;
        }
        errorEl.hide();
        b.setDisabled(true).setButtonText("Creating\u2026");
        try {
          const site = await provisionSite(this.plugin, name, {
            publishScope: scope,
            publishPaths: paths,
            authorName,
            sidebarTitle,
            siteDescription
          });
          this.plugin.settings.sites.push(site);
          this.plugin.settings.activeSiteId = site.id;
          await this.plugin.saveSettings();
          this.close();
          new import_obsidian6.Notice(`Site \u201C${site.name}\u201D created.`);
          this.onDone();
        } catch (err) {
          errorEl.setText(err.message);
          errorEl.show();
          b.setDisabled(false).setButtonText("Create site");
        }
      })
    );
  }
  onClose() {
    this.contentEl.empty();
  }
};
var RemoveSiteModal = class extends import_obsidian6.Modal {
  constructor(app, plugin, site, onDone) {
    super(app);
    this.plugin = plugin;
    this.site = site;
    this.onDone = onDone;
    this.deleting = false;
  }
  onOpen() {
    this.titleEl.setText("Remove this site?");
    this.contentEl.createEl("p", {
      text: `"${this.site.name || this.site.githubRepo || "Unnamed site"}" will be removed from NoteFlare.`
    });
    const errorEl = this.contentEl.createEl("p", { cls: "setting-item-description" });
    errorEl.setCssStyles({ color: "var(--text-error)" });
    errorEl.hide();
    new import_obsidian6.Setting(this.contentEl).addButton((b) => b.setButtonText("Cancel").onClick(() => this.close())).addButton((b) => {
      b.setButtonText("Remove").setDestructive();
      b.onClick(async () => {
        var _a, _b;
        if (this.deleting)
          return;
        this.deleting = true;
        b.setDisabled(true).setButtonText("Removing...");
        errorEl.hide();
        try {
          if (this.site.isPublished) {
            try {
              if (this.site.deployTarget === "cloudflare" || this.site.deployTarget == null && this.plugin.settings.cloudflareToken) {
                const cloudflare = new CloudflareApi(this.plugin.settings.cloudflareToken, this.plugin.settings.cloudflareAccount);
                await cloudflare.deleteProject(this.site.cloudflareProject);
              }
            } catch (e) {
              console.warn("Could not unpublish site during removal:", e);
            }
          }
          const s = this.plugin.settings;
          s.sites = s.sites.filter((x) => x.id !== this.site.id);
          if (s.activeSiteId === this.site.id)
            s.activeSiteId = (_b = (_a = s.sites[0]) == null ? void 0 : _a.id) != null ? _b : "";
          await this.plugin.saveSettings();
          this.close();
          this.onDone();
        } catch (err) {
          errorEl.setText(err.message);
          errorEl.show();
          b.setDisabled(false).setButtonText("Remove");
          this.deleting = false;
        }
      });
    });
  }
  onClose() {
    this.contentEl.empty();
  }
};
var UnpublishModal = class extends import_obsidian6.Modal {
  constructor(app, plugin, onDone) {
    super(app);
    this.plugin = plugin;
    this.onDone = onDone;
  }
  onOpen() {
    this.titleEl.setText("Unpublish your site?");
    this.contentEl.createEl("p", {
      text: "Your site will go offline. Files in GitHub remain untouched \u2014 you can re-publish any time."
    });
    new import_obsidian6.Setting(this.contentEl).addButton((b) => b.setButtonText("Cancel").onClick(() => this.close())).addButton(
      (b) => b.setButtonText("Unpublish").setDestructive().onClick(async () => {
        this.close();
        await this.plugin.doUnpublish();
        this.onDone();
      })
    );
  }
  onClose() {
    this.contentEl.empty();
  }
};
var ResetModal = class extends import_obsidian6.Modal {
  constructor(app, plugin, onDone) {
    super(app);
    this.plugin = plugin;
    this.onDone = onDone;
  }
  onOpen() {
    this.titleEl.setText("Reset NoteFlare?");
    this.contentEl.createEl("p", {
      text: "This clears all NoteFlare settings (tokens and every site). Your GitHub repos and Cloudflare projects will NOT be deleted."
    });
    new import_obsidian6.Setting(this.contentEl).addButton((b) => b.setButtonText("Cancel").onClick(() => this.close())).addButton(
      (b) => b.setButtonText("Reset").setDestructive().onClick(async () => {
        this.close();
        Object.assign(this.plugin.settings, {
          ...DEFAULT_SETTINGS,
          sites: [],
          backup: { ...DEFAULT_SETTINGS.backup }
        });
        await this.plugin.saveSettings();
        this.onDone();
      })
    );
  }
  onClose() {
    this.contentEl.empty();
  }
};
var EditSiteModal = class extends import_obsidian6.Modal {
  constructor(app, plugin, site, onDone) {
    super(app);
    this.plugin = plugin;
    this.site = site;
    this.onDone = onDone;
  }
  onOpen() {
    const s = this.site;
    this.titleEl.setText(`Settings for ${s.name || s.cloudflareProject || "Site"}`);
    this.render();
  }
  render() {
    this.contentEl.empty();
    const s = this.site;
    new import_obsidian6.Setting(this.contentEl).setName("Publishing rules").setHeading();
    let updateVisibility;
    new import_obsidian6.Setting(this.contentEl).setName("Publish scope").setDesc("Configure what to publish: the entire vault or selected files/folders.").addDropdown((d) => {
      d.addOption("vault", "Full Vault");
      d.addOption("selected", "Selected Files/Folders");
      d.setValue(s.publishScope || "vault");
      d.onChange(async (v) => {
        s.publishScope = v;
        await this.plugin.saveSettings();
        updateVisibility();
      });
    });
    const pathsContainer = this.contentEl.createDiv("noteflare-paths-container");
    const renderPaths = () => {
      pathsContainer.empty();
      if ((s.publishScope || "vault") === "vault") {
        pathsContainer.setCssStyles({ display: "none" });
        return;
      }
      pathsContainer.setCssStyles({ display: "block" });
      const paths = s.publishPaths || [];
      if (paths.length === 0) {
        pathsContainer.createEl("p", { text: "No files or folders selected.", cls: "noteflare-muted" });
      } else {
        const list = pathsContainer.createEl("ul", { cls: "noteflare-path-list" });
        for (let i = 0; i < paths.length; i++) {
          const li = list.createEl("li");
          li.setCssStyles({ display: "flex" });
          li.setCssStyles({ justifyContent: "space-between" });
          li.setCssStyles({ alignItems: "center" });
          li.setCssStyles({ marginBottom: "4px" });
          li.createSpan({ text: paths[i] });
          const removeBtn = li.createEl("button", { text: "\u2715" });
          removeBtn.addEventListener("click", () => {
            void (async () => {
              var _a;
              (_a = s.publishPaths) == null ? void 0 : _a.splice(i, 1);
              await this.plugin.saveSettings();
              renderPaths();
            })();
          });
        }
      }
      const addRow = pathsContainer.createDiv("noteflare-add-path-row");
      addRow.setCssStyles({ marginTop: "8px" });
      const addBtn = addRow.createEl("button", { text: "Browse Vault..." });
      addBtn.setCssStyles({ width: "100%" });
      addBtn.addEventListener("click", () => {
        new PathSuggestModal(this.app, (selectedPath) => {
          void (async () => {
            if (selectedPath.trim()) {
              if (!s.publishPaths)
                s.publishPaths = [];
              if (!s.publishPaths.includes(selectedPath.trim())) {
                s.publishPaths.push(selectedPath.trim());
                await this.plugin.saveSettings();
                renderPaths();
              }
            }
          })();
        }).open();
      });
    };
    updateVisibility = () => {
      renderPaths();
    };
    updateVisibility();
    new import_obsidian6.Setting(this.contentEl).setName("Site Customization").setHeading();
    new import_obsidian6.Setting(this.contentEl).setName("Site name").setDesc("Internal name for this site.").addText((t) => {
      t.setValue(s.name || "");
      t.onChange(async (v) => {
        s.name = v.trim();
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian6.Setting(this.contentEl).setName("Author name").setDesc("The author name written to the site metadata.").addText((t) => {
      t.setPlaceholder("Your Name");
      t.setValue(s.authorName || "");
      t.onChange(async (v) => {
        s.authorName = v.trim();
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian6.Setting(this.contentEl).setName("Sidebar title").setDesc("Title shown in the sidebar. Defaults to the site name.").addText((t) => {
      t.setPlaceholder("My Digital Garden");
      t.setValue(s.sidebarTitle || "");
      t.onChange(async (v) => {
        s.sidebarTitle = v.trim();
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian6.Setting(this.contentEl).setName("Site description").setDesc("Description of your site.").addText((t) => {
      t.setPlaceholder("Notes and thoughts\u2026");
      t.setValue(s.siteDescription || "");
      t.onChange(async (v) => {
        s.siteDescription = v.trim();
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian6.Setting(this.contentEl).setName("Exclude patterns").setDesc("One glob per line. Matching files are not published (e.g. private/**, *.private.md).").addTextArea((area) => {
      area.setValue(s.excludePatterns.join("\n"));
      area.inputEl.rows = 4;
      area.onChange(async (v) => {
        s.excludePatterns = v.split("\n").map((x) => x.trim()).filter(Boolean);
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian6.Setting(this.contentEl).setName("Include attachments").setDesc("Upload images and PDFs alongside your notes.").addToggle((toggle) => {
      toggle.setValue(s.includeAttachments);
      toggle.onChange(async (v) => {
        s.includeAttachments = v;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian6.Setting(this.contentEl).addButton((b) => b.setButtonText("Done").setCta().onClick(() => {
      this.close();
      this.onDone();
    }));
  }
  display() {
    this.contentEl.empty();
    this.onOpen();
  }
  onClose() {
    this.contentEl.empty();
  }
};
var PathSuggestModal = class extends import_obsidian7.FuzzySuggestModal {
  constructor(app, onChoose) {
    super(app);
    this.onChoose = onChoose;
    this.setPlaceholder("Search for a file or folder...");
  }
  getItems() {
    return this.app.vault.getAllLoadedFiles().filter(
      (f) => f.path !== "/" && !f.path.startsWith(".") && !f.path.includes("/.") && (f instanceof import_obsidian6.TFolder || f instanceof import_obsidian7.TFile && f.extension === "md")
    );
  }
  getItemText(item) {
    return item.path;
  }
  onChooseItem(item, evt) {
    this.onChoose(item.path);
  }
};

// src/ui/settings/settingsTab.ts
var GITHUB_TOKEN_URL = "https://github.com/settings/tokens/new?scopes=repo,workflow&description=NoteFlare";
var CLOUDFLARE_APP_URL = "https://github.com/apps/cloudflare-workers-and-pages/installations/new";
var CLOUDFLARE_TOKEN_URL = buildCloudflareTokenUrl();
var NoteFlareSettingsTab = class extends import_obsidian8.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.wizardStep = "github";
    this.pendingName = "";
    this.pendingScope = "vault";
    this.pendingPaths = [];
    this.pendingDeployTarget = "github-actions";
    this.hasInitializedWizard = false;
    this.plugin = plugin;
  }
  display() {
    this.render();
  }
  render() {
    const { containerEl } = this;
    containerEl.empty();
    const hasCreds = !!this.plugin.settings.githubToken;
    const setupComplete = this.plugin.settings.setupComplete;
    const needsSetup = !setupComplete || !hasCreds || this.plugin.settings.enablePublish && this.plugin.settings.sites.length === 0;
    if (needsSetup || this.wizardStep === "done" && this.hasInitializedWizard) {
      if (!this.hasInitializedWizard) {
        this.wizardStep = this.getInitialWizardStep();
        this.hasInitializedWizard = true;
      }
      this.renderWizard(containerEl);
    } else {
      this.renderManagePanel(containerEl);
    }
  }
  // ─── Wizard (first run: collect credentials + create the first site) ────────
  renderWizard(el) {
    this.renderWizardHeader(el);
    if (this.wizardStep === "github")
      this.renderStep1(el);
    else if (this.wizardStep === "mode")
      this.renderStepMode(el);
    else if (this.wizardStep === "deploy-target")
      this.renderStepDeployTarget(el);
    else if (this.wizardStep === "cloudflare")
      this.renderStep2(el);
    else
      this.renderStep3(el);
  }
  renderStep1(el) {
    new import_obsidian8.Setting(el).setName("Connect your account").setHeading();
    el.createEl("p", {
      cls: "setting-item-description",
      text: "One secure connection powers publishing and optional private backups. Your token is encrypted with your operating system keychain."
    });
    let tokenValue = this.plugin.settings.githubToken;
    const tokenSetting = new import_obsidian8.Setting(el).setName("Access token");
    tokenSetting.descEl.appendText("Create a token with the ");
    tokenSetting.descEl.createEl("strong", { text: "repo" });
    tokenSetting.descEl.appendText(" and ");
    tokenSetting.descEl.createEl("strong", { text: "workflow" });
    tokenSetting.descEl.appendText(" scopes. Stored encrypted in your OS keychain, never logged. ");
    tokenSetting.descEl.createEl("a", {
      text: "Create token \u2197",
      href: GITHUB_TOKEN_URL,
      attr: { target: "_blank", rel: "noopener" }
    });
    tokenSetting.addText((text) => {
      text.setPlaceholder("ghp_\u2026");
      text.inputEl.type = "password";
      text.setValue(tokenValue);
      text.onChange((v) => {
        tokenValue = v.trim();
      });
    });
    const errorEl = this.createErrorEl(el);
    new import_obsidian8.Setting(el).addButton((btn) => {
      btn.setButtonText("Verify & continue").setCta();
      btn.onClick(async () => {
        if (!tokenValue)
          return this.showError(errorEl, "Please enter your GitHub token.");
        this.hideError(errorEl);
        this.busy(btn, "Verifying\u2026");
        try {
          const username = await new GitHubApi(tokenValue, "", "").getAuthenticatedUser();
          this.plugin.settings.githubToken = tokenValue;
          this.plugin.settings.githubOwner = username;
          await this.plugin.saveSettings();
          this.wizardStep = "mode";
          this.render();
        } catch (err) {
          const msg = err.message;
          this.showError(
            errorEl,
            /invalid/i.test(msg) ? "Token invalid or missing the repo scope. Check it and try again." : msg
          );
          this.idle(btn, "Verify & continue");
        }
      });
    });
  }
  /** Step 2: choose the outcomes NoteFlare should manage. */
  renderStepMode(el) {
    new import_obsidian8.Setting(el).setName("Choose your experience").setHeading();
    el.createEl("p", {
      cls: "setting-item-description",
      text: "Start with either feature or use both. You can change this later."
    });
    let enableBackup = this.plugin.settings.enableBackup;
    let enablePublish = this.plugin.settings.enablePublish;
    new import_obsidian8.Setting(el).setName("Automatic private backup").setDesc("Protect your vault quietly in the background with no manual steps or file selection.").addToggle((t) => {
      t.setValue(enableBackup);
      t.onChange((v) => {
        enableBackup = v;
      });
    });
    new import_obsidian8.Setting(el).setName("Publish a website").setDesc("Turn selected notes into a fast public site with one-click updates.").addToggle((t) => {
      t.setValue(enablePublish);
      t.onChange((v) => {
        enablePublish = v;
      });
    });
    const errorEl = this.createErrorEl(el);
    new import_obsidian8.Setting(el).addButton((back) => {
      back.setButtonText("Back");
      back.onClick(() => {
        this.wizardStep = "github";
        this.render();
      });
    }).addButton((btn) => {
      btn.setButtonText("Continue").setCta();
      btn.onClick(async () => {
        if (!enableBackup && !enablePublish) {
          return this.showError(errorEl, "Please enable at least one feature.");
        }
        this.hideError(errorEl);
        this.plugin.settings.enableBackup = enableBackup;
        this.plugin.settings.enablePublish = enablePublish;
        if (enableBackup && !this.plugin.settings.backup.repository) {
          this.plugin.settings.backup.repository = this.plugin.defaultBackupRepository();
        }
        if (enablePublish) {
          this.wizardStep = "deploy-target";
        } else {
          this.plugin.settings.setupComplete = true;
          await this.plugin.saveSettings();
          this.wizardStep = "done";
        }
        await this.plugin.saveSettings();
        this.render();
      });
    });
  }
  /** Step 3 (publish path): choose deploy target — GitHub Actions or Cloudflare. */
  renderStepDeployTarget(el) {
    new import_obsidian8.Setting(el).setName("Create your site").setHeading();
    el.createEl("p", {
      cls: "setting-item-description",
      text: "Choose what to publish and where NoteFlare should host it."
    });
    let siteName = this.pendingName || "noteflare-site";
    new import_obsidian8.Setting(el).setName("Site name").setDesc("Used for your site address. Lowercase letters, numbers, and dashes work best.").addText((text) => {
      text.setPlaceholder("my-notes");
      text.setValue(siteName);
      text.onChange((value) => {
        siteName = value;
      });
    });
    let scope = this.pendingScope;
    let paths = [...this.pendingPaths];
    let updateVisibility;
    new import_obsidian8.Setting(el).setName("Publish scope").setDesc("Configure what to publish: the entire vault or selected files/folders.").addDropdown((d) => {
      d.addOption("vault", "Full Vault");
      d.addOption("selected", "Selected Files/Folders");
      d.setValue(scope);
      d.onChange((v) => {
        scope = v;
        updateVisibility();
      });
    });
    const pathsContainer = el.createDiv("noteflare-paths-container");
    const renderPaths = () => {
      pathsContainer.empty();
      if (scope === "vault") {
        pathsContainer.setCssStyles({ display: "none" });
        return;
      }
      pathsContainer.setCssStyles({ display: "block" });
      if (paths.length === 0) {
        pathsContainer.createEl("p", { text: "No files or folders selected.", cls: "noteflare-muted" });
      } else {
        const list = pathsContainer.createEl("ul", { cls: "noteflare-path-list" });
        for (let i = 0; i < paths.length; i++) {
          const li = list.createEl("li");
          li.setCssStyles({ display: "flex" });
          li.setCssStyles({ justifyContent: "space-between" });
          li.setCssStyles({ alignItems: "center" });
          li.setCssStyles({ marginBottom: "4px" });
          li.createSpan({ text: paths[i] });
          const removeBtn = li.createEl("button", { text: "\u2715" });
          removeBtn.addEventListener("click", () => {
            paths.splice(i, 1);
            renderPaths();
          });
        }
      }
      const addRow = pathsContainer.createDiv("noteflare-add-path-row");
      addRow.setCssStyles({ marginTop: "8px" });
      const addBtn = addRow.createEl("button", { text: "Browse Vault..." });
      addBtn.setCssStyles({ width: "100%" });
      addBtn.addEventListener("click", () => {
        new PathSuggestModal(this.app, (selectedPath) => {
          if (!paths.includes(selectedPath)) {
            paths.push(selectedPath);
            renderPaths();
          }
        }).open();
      });
    };
    updateVisibility = () => {
      renderPaths();
    };
    updateVisibility();
    new import_obsidian8.Setting(el).setName("Hosting Provider").setHeading();
    new import_obsidian8.Setting(el).setName("Simple hosting (GitHub Pages)").setDesc("Free, automated hosting via GitHub Actions with no extra accounts. Perfect for a fast, simple setup.").addButton((btn) => {
      btn.setButtonText(this.pendingDeployTarget === "github-actions" ? "\u2713 Selected" : "Select");
      if (this.pendingDeployTarget === "github-actions")
        btn.setCta();
      btn.onClick(() => {
        this.pendingName = siteName;
        this.pendingScope = scope;
        this.pendingPaths = paths;
        this.pendingDeployTarget = "github-actions";
        this.render();
      });
    });
    new import_obsidian8.Setting(el).setName("Cloudflare hosting").setDesc("Premium features: global CDN, instant deployment toggles, and custom domains. Requires connecting a free Cloudflare account.").addButton((btn) => {
      btn.setButtonText(this.pendingDeployTarget === "cloudflare" ? "\u2713 Selected" : "Select");
      if (this.pendingDeployTarget === "cloudflare")
        btn.setCta();
      btn.onClick(() => {
        this.pendingName = siteName;
        this.pendingScope = scope;
        this.pendingPaths = paths;
        this.pendingDeployTarget = "cloudflare";
        this.render();
      });
    });
    const errorEl = this.createErrorEl(el);
    new import_obsidian8.Setting(el).addButton((back) => {
      back.setButtonText("Back");
      back.onClick(() => {
        this.wizardStep = "mode";
        this.render();
      });
    }).addButton((btn) => {
      btn.setButtonText("Continue").setCta();
      btn.onClick(() => {
        if (!slugify(siteName)) {
          this.showError(errorEl, "Please enter a site name.");
          return;
        }
        this.pendingName = siteName;
        this.pendingScope = scope;
        this.pendingPaths = paths;
        this.wizardStep = "cloudflare";
        this.render();
      });
    });
  }
  renderStep2(el) {
    const deployTarget = this.pendingDeployTarget;
    const repoSlug = `${this.plugin.settings.githubOwner}/${slugify(this.pendingName)}`;
    const cfRequired = deployTarget === "cloudflare";
    new import_obsidian8.Setting(el).setName(
      cfRequired ? "Connect Cloudflare" : "Launch your site"
    ).setHeading();
    el.createEl("p", {
      cls: "setting-item-description",
      text: cfRequired ? "Cloudflare hosts the site for free and lets NoteFlare take it online or offline without deleting content. Two one-time clicks in your browser:" : "NoteFlare will create a GitHub repo and push a GitHub Actions workflow that builds and deploys your site to GitHub Pages."
    });
    let cfToken = this.plugin.settings.cloudflareToken;
    let cfAccount = this.plugin.settings.cloudflareAccount;
    if (cfRequired) {
      const tokenStep = new import_obsidian8.Setting(el).setName("1. Create a Cloudflare API token");
      tokenStep.descEl.appendText("Opens with Pages, Workers and Account permissions pre-selected \u2014 click through to create it, then copy it. ");
      tokenStep.descEl.createEl("a", {
        text: "Create token \u2197",
        href: CLOUDFLARE_TOKEN_URL,
        attr: { target: "_blank", rel: "noopener" }
      });
      const appStep = new import_obsidian8.Setting(el).setName("2. Authorize Cloudflare on GitHub");
      appStep.descEl.appendText("Grant the \u201CCloudflare Workers and Pages\u201D app access to your ");
      appStep.descEl.createEl("code", { text: repoSlug });
      appStep.descEl.appendText(" repo \u2014 Cloudflare needs this to build the site. ");
      appStep.descEl.createEl("a", {
        text: "Authorize \u2197",
        href: CLOUDFLARE_APP_URL,
        attr: { target: "_blank", rel: "noopener" }
      });
      new import_obsidian8.Setting(el).setName("Cloudflare API token").setDesc("Stored encrypted in your OS keychain and never logged.").addText((text) => {
        text.setPlaceholder("Paste API token\u2026");
        text.inputEl.type = "password";
        text.setValue(cfToken);
        text.onChange((v) => {
          cfToken = v.trim();
        });
      });
      new import_obsidian8.Setting(el).setName("Cloudflare account ID").setDesc("Optional \u2014 NoteFlare detects this automatically from your token.").addText((text) => {
        text.setPlaceholder("Auto-detected");
        text.setValue(cfAccount);
        text.onChange((v) => {
          cfAccount = v.trim();
        });
      });
    } else {
      new import_obsidian8.Setting(el).setName("Ready to create").setDesc("NoteFlare will provision the site and prepare its first deployment automatically.");
    }
    const errorEl = this.createErrorEl(el);
    new import_obsidian8.Setting(el).addButton((back) => {
      back.setButtonText("Back");
      back.onClick(() => {
        this.wizardStep = "deploy-target";
        this.render();
      });
    }).addButton((btn) => {
      btn.setButtonText(cfRequired ? "Connect & create site" : "Create site").setCta();
      btn.onClick(async () => {
        if (cfRequired && !cfToken) {
          return this.showError(errorEl, "Please paste your Cloudflare API token.");
        }
        this.hideError(errorEl);
        this.busy(btn, cfRequired ? "Checking token\u2026" : "Creating your site\u2026");
        try {
          if (cfRequired) {
            let accountId = cfAccount;
            if (!accountId) {
              this.busy(btn, "Detecting account\u2026");
              accountId = await new CloudflareApi(cfToken, "").getAccountId();
            }
            this.plugin.settings.cloudflareToken = cfToken;
            this.plugin.settings.cloudflareAccount = accountId;
            await this.plugin.saveSettings();
          }
          this.busy(btn, "Creating your site\u2026");
          const site = await provisionSite(
            this.plugin,
            this.pendingName,
            {
              publishScope: this.pendingScope,
              publishPaths: this.pendingPaths
            },
            deployTarget
          );
          this.plugin.settings.sites.push(site);
          this.plugin.settings.activeSiteId = site.id;
          this.plugin.settings.setupComplete = true;
          await this.plugin.saveSettings();
          this.wizardStep = "done";
          this.render();
        } catch (err) {
          this.showError(errorEl, err.message);
          this.idle(btn, cfRequired ? "Connect & create site" : "Create site");
        }
      });
    });
  }
  renderStep3(el) {
    const site = this.plugin.getActiveSite();
    new import_obsidian8.Setting(el).setName("You\u2019re ready").setHeading();
    const done = new import_obsidian8.Setting(el).setName(
      site ? "Your site is ready to publish" : "Automatic backup is ready"
    );
    if (site == null ? void 0 : site.siteUrl) {
      done.descEl.appendText("Site: ");
      done.descEl.createEl("a", {
        text: `https://${site.siteUrl}`,
        href: `https://${site.siteUrl}`,
        attr: { target: "_blank", rel: "noopener" }
      });
    } else {
      done.setDesc("NoteFlare will protect your vault quietly using your chosen schedule.");
    }
    new import_obsidian8.Setting(el).addButton((later) => {
      later.setButtonText(site ? "I'll publish later" : "Open settings");
      later.onClick(async () => {
        this.plugin.settings.setupComplete = true;
        await this.plugin.saveSettings();
        this.hasInitializedWizard = false;
        if (site)
          this.closeSettings();
        else
          this.render();
      });
    }).addButton((btn) => {
      btn.setButtonText(site ? "Publish now" : "Back up now").setCta();
      btn.onClick(async () => {
        this.plugin.settings.setupComplete = true;
        await this.plugin.saveSettings();
        this.hasInitializedWizard = false;
        this.closeSettings();
        if (site)
          await this.plugin.doPublish();
        else
          await this.plugin.doBackup(false);
      });
    });
  }
  // ─── Manage panel (multi-site) ─────────────────────────────────────────────
  renderManagePanel(el) {
    const s = this.plugin.settings;
    const optsSetting = new import_obsidian8.Setting(el);
    optsSetting.setName("Options");
    optsSetting.setHeading();
    new import_obsidian8.Setting(el).setName("Open panel in").setDesc("Where the NoteFlare panel should open by default when clicking the ribbon icon or running the command.").addDropdown((d) => {
      var _a;
      d.addOption("left", "Left sidebar");
      d.addOption("right", "Right sidebar");
      d.addOption("tab", "Main workspace tab");
      d.setValue((_a = s.defaultViewLocation) != null ? _a : "left");
      d.onChange(async (v) => {
        s.defaultViewLocation = v;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian8.Setting(el).setName("Features").setHeading();
    new import_obsidian8.Setting(el).setName("Publish a website").setDesc("Keep one-click publishing available in the NoteFlare panel.").addToggle((toggle) => {
      toggle.setValue(s.enablePublish);
      toggle.onChange(async (value) => {
        s.enablePublish = value;
        await this.plugin.saveSettings();
        this.render();
      });
    });
    new import_obsidian8.Setting(el).setName("Automatic private backup").setDesc("Protect your vault in the background without manual version-control steps.").addToggle((toggle) => {
      toggle.setValue(s.enableBackup);
      toggle.onChange(async (value) => {
        s.enableBackup = value;
        if (value && !s.backup.repository) {
          s.backup.repository = this.plugin.defaultBackupRepository();
        }
        await this.plugin.saveSettings();
        this.render();
      });
    });
    if (s.enableBackup) {
      new import_obsidian8.Setting(el).setName("Backup").setHeading();
      new import_obsidian8.Setting(el).setName("After changes").setDesc("Run a backup 30 seconds after vault files change.").addToggle((toggle) => {
        toggle.setValue(s.backup.backupOnChange);
        toggle.onChange(async (value) => {
          s.backup.backupOnChange = value;
          await this.plugin.saveSettings();
        });
      });
      new import_obsidian8.Setting(el).setName("Schedule").setDesc("Periodic backups run while Obsidian is open.").addDropdown((dropdown) => {
        dropdown.addOption("0", "Off");
        dropdown.addOption("15", "Every 15 minutes");
        dropdown.addOption("30", "Every 30 minutes");
        dropdown.addOption("60", "Every hour");
        dropdown.addOption("360", "Every 6 hours");
        dropdown.addOption("1440", "Daily");
        dropdown.setValue(String(s.backup.intervalMinutes));
        dropdown.onChange(async (value) => {
          s.backup.intervalMinutes = Number(value);
          await this.plugin.saveSettings();
        });
      });
      const backupStatus = s.backup.lastBackupError ? `Needs attention: ${s.backup.lastBackupError}` : s.backup.lastBackupAt ? `Last backup: ${new Date(s.backup.lastBackupAt).toLocaleString()}` : "Your first backup has not run yet.";
      new import_obsidian8.Setting(el).setName("Backup status").setDesc(backupStatus).addButton((button) => {
        button.setButtonText("Back up now").setCta();
        button.onClick(async () => {
          button.setDisabled(true).setButtonText("Backing up\u2026");
          await this.plugin.doBackup(false);
          this.render();
        });
      });
    }
    if (!s.enablePublish) {
      this.renderDangerZone(el);
      return;
    }
    new import_obsidian8.Setting(el).setName("Global Configuration").setHeading();
    new import_obsidian8.Setting(el).setName("Master Repository").setDesc(`GitHub repository to host all your sites: ${s.githubOwner}/${s.masterRepository || "noteflare-sites"}`).addText((t) => {
      t.setPlaceholder("noteflare-sites");
      t.setValue(s.masterRepository || "noteflare-sites");
      t.onChange(async (v) => {
        s.masterRepository = v.trim();
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian8.Setting(el).setName("Your Sites").setHeading();
    if (s.sites.length === 0) {
      el.createEl("p", { cls: "setting-item-description", text: "No sites yet \u2014 add one to get started." });
    } else {
      for (const site of s.sites) {
        const isLive = site.isPublished;
        const statusText = site.lastPublished ? `Last published ${new Date(site.lastPublished).toLocaleString()} \xB7 ${site.lastNoteCount} notes` : "Not published yet";
        const siteSetting = new import_obsidian8.Setting(el).setName(site.name || site.cloudflareProject || "Site").setDesc(`${isLive ? "\u{1F7E2} Live" : "\u26AA Offline"} \u2014 ${statusText}`);
        if (site.siteUrl) {
          siteSetting.addExtraButton(
            (b) => b.setIcon("external-link").setTooltip("Open site").onClick(() => {
              window.open(`https://${site.siteUrl}`, "_blank");
            })
          );
        }
        siteSetting.addButton(
          (b) => b.setButtonText("Edit").onClick(() => {
            new EditSiteModal(this.app, this.plugin, site, () => this.render()).open();
          })
        );
        siteSetting.addButton(
          (b) => b.setButtonText("Remove").setDestructive().onClick(() => {
            new RemoveSiteModal(this.app, this.plugin, site, () => this.render()).open();
          })
        );
      }
    }
    new import_obsidian8.Setting(el).addButton((b) => b.setButtonText("Add site").setCta().onClick(() => {
      new AddSiteModal(this.app, this.plugin, () => this.render()).open();
    }));
    this.renderDangerZone(el);
  }
  renderDangerZone(el) {
    new import_obsidian8.Setting(el).setName("Danger zone").setHeading();
    new import_obsidian8.Setting(el).setName("Reset NoteFlare").setDesc("Clears all NoteFlare settings (tokens + every site) and restarts setup. Your GitHub repos and Cloudflare projects are NOT deleted.").addButton((b) => {
      b.setButtonText("Reset").setDestructive();
      b.onClick(() => new ResetModal(this.app, this.plugin, () => {
        this.wizardStep = "github";
        this.pendingName = "";
        this.pendingScope = "vault";
        this.pendingPaths = [];
        this.render();
      }).open());
    });
  }
  // ─── Helpers ─────────────────────────────────────────────────────────────
  renderWizardHeader(container) {
    const current = this.wizardStep === "github" ? 1 : this.wizardStep === "mode" ? 2 : this.wizardStep === "done" ? 4 : 3;
    const labels = ["Connect", "Choose", "Configure", "Ready"];
    new import_obsidian8.Setting(container).setName(`Setup: Step ${current} of 4 \u2014 ${labels[current - 1]}`).setHeading();
    container.createEl("p", {
      text: "Publish polished note sites and keep your vault protected from one focused workspace.",
      cls: "setting-item-description"
    });
  }
  createErrorEl(container) {
    const el = container.createEl("p", { cls: "setting-item-description" });
    el.setCssStyles({ color: "var(--text-error)" });
    el.hide();
    return el;
  }
  showError(el, msg) {
    el.setText(msg);
    el.show();
  }
  hideError(el) {
    el.hide();
  }
  busy(btn, label) {
    btn.setDisabled(true).setButtonText(label);
  }
  idle(btn, label) {
    btn.setDisabled(false).setButtonText(label);
  }
  getInitialWizardStep() {
    const s = this.plugin.settings;
    if (s.githubToken && s.githubOwner)
      return "mode";
    return "github";
  }
  closeSettings() {
    var _a;
    const setting = this.app.setting;
    (_a = setting == null ? void 0 : setting.close) == null ? void 0 : _a.call(setting);
  }
};

// src/ui/statusBar.ts
var StatusBar = class {
  constructor(el) {
    this.el = el;
  }
  setIdle() {
    this.set("NoteFlare: Not set up");
    this.el.title = "";
  }
  setUnpublished() {
    this.set("NoteFlare: Unpublished");
    this.el.title = "";
  }
  setPublishing(n, total) {
    this.set(`NoteFlare: Uploading ${n}/${total}...`);
  }
  setLive(noteCount, url) {
    this.set(`NoteFlare: Live \u2014 ${noteCount} notes \u2197`);
    this.el.title = url ? `https://${url}` : "";
  }
  setError(msg) {
    this.set(`NoteFlare: Error \u2014 ${msg}`);
  }
  setRateLimited(secsLeft) {
    this.set(`NoteFlare: Rate limited \u2014 ${secsLeft}s`);
  }
  setMessage(msg) {
    this.set(msg);
  }
  set(text) {
    this.el.textContent = text;
  }
};

// src/ui/noteflareView.ts
var import_obsidian9 = require("obsidian");
var VIEW_TYPE_NOTEFLARE = "noteflare-panel";
var CLOUDFLARE_APP_URL2 = "https://github.com/apps/cloudflare-workers-and-pages/installations/new";
var NoteFlareView = class extends import_obsidian9.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
  }
  getViewType() {
    return VIEW_TYPE_NOTEFLARE;
  }
  getDisplayText() {
    return "NoteFlare";
  }
  getIcon() {
    var _a;
    return ((_a = this.plugin.getActiveSite()) == null ? void 0 : _a.isPublished) ? "cloud-check" : "cloud-upload";
  }
  async onOpen() {
    await this.render();
  }
  async onClose() {
  }
  refresh() {
    void this.render();
  }
  async render() {
    const root = this.containerEl.children[1];
    root.empty();
    root.addClass("noteflare-view");
    const s = this.plugin.settings;
    if (!s.setupComplete) {
      root.createEl("p", {
        text: "Finish setup to publish your notes and protect your vault with automatic backups.",
        cls: "setting-item-description"
      });
      const setupBtn = root.createEl("button", { text: "Open setup", cls: "mod-cta" });
      setupBtn.setCssStyles({ marginTop: "10px" });
      setupBtn.addEventListener("click", () => this.plugin.openSettingsTab());
      return;
    }
    const content = root.createEl("div", { cls: "noteflare-tab-content" });
    if (s.enablePublish) {
      await this.renderPublish(content);
    } else {
      const backup = content.createEl("div");
      backup.createEl("h3", { text: "Your vault is protected" });
      backup.createEl("p", {
        text: s.backup.lastBackupAt ? `Last backup: ${new Date(s.backup.lastBackupAt).toLocaleString()}` : "Your first backup will run automatically.",
        cls: "setting-item-description"
      });
      const settingsButton = backup.createEl("button", { text: "Backup settings", cls: "mod-cta" });
      settingsButton.setCssStyles({ marginTop: "10px" });
      settingsButton.addEventListener("click", () => this.plugin.openSettingsTab());
    }
  }
  async renderPublish(root) {
    var _a;
    const s = this.plugin.settings;
    const site = this.plugin.getActiveSite();
    if (!site) {
      root.createEl("p", {
        text: "No publish sites configured.",
        cls: "noteflare-muted"
      });
      const createBtn = root.createEl("button", { text: "Quick create site", cls: "mod-cta" });
      createBtn.addEventListener("click", () => {
        new AddSiteModal(this.app, this.plugin, () => this.refresh()).open();
      });
      return;
    }
    const isLive = site.isPublished;
    new import_obsidian9.Setting(root).setName("Current Site").setDesc(`Status: ${isLive ? "\u{1F7E2} Live" : "\u26AA Offline"}`).addDropdown((d) => {
      for (const sp of s.sites) {
        d.addOption(sp.id, sp.name || sp.githubRepo);
      }
      d.setValue(site.id);
      d.onChange(async (id) => {
        s.activeSiteId = id;
        await this.plugin.saveSettings();
        void this.render();
      });
    }).addButton((b) => {
      b.setIcon("plus").setTooltip("Create another site").onClick(() => {
        new AddSiteModal(this.app, this.plugin, () => this.refresh()).open();
      });
    });
    let updateVisibility;
    new import_obsidian9.Setting(root).setName("Publish scope").setDesc("Configure what to publish: the entire vault or selected files/folders.").addDropdown((d) => {
      d.addOption("vault", "Full Vault");
      d.addOption("selected", "Selected Files/Folders");
      d.setValue(site.publishScope || "vault");
      d.onChange(async (v) => {
        site.publishScope = v;
        updateVisibility();
        await this.plugin.saveSettings();
      });
    });
    const pathsContainer = root.createDiv("noteflare-paths-container");
    pathsContainer.setCssStyles({
      paddingLeft: "1.5em",
      paddingRight: "1.5em",
      paddingBottom: "1em"
    });
    const renderPaths = () => {
      pathsContainer.empty();
      if ((site.publishScope || "vault") === "vault") {
        pathsContainer.setCssStyles({ display: "none" });
        return;
      }
      pathsContainer.setCssStyles({ display: "block" });
      const addRow = pathsContainer.createDiv("noteflare-add-path-row");
      addRow.setCssStyles({ marginTop: "8px" });
      const addBtn = addRow.createEl("button", { text: "Browse Vault..." });
      addBtn.setCssStyles({ width: "100%" });
      addBtn.addEventListener("click", () => {
        new PathSuggestModal(this.app, (selectedPath) => {
          void (async () => {
            if (!site.publishPaths)
              site.publishPaths = [];
            if (!site.publishPaths.includes(selectedPath)) {
              site.publishPaths.push(selectedPath);
              await this.plugin.saveSettings();
              renderPaths();
            }
          })();
        }).open();
      });
      const paths = site.publishPaths || [];
      if (paths.length === 0) {
        const p = pathsContainer.createEl("p", { text: "No files or folders selected.", cls: "setting-item-description" });
        p.setCssStyles({ marginTop: "12px" });
      } else {
        const chipContainer = pathsContainer.createDiv();
        chipContainer.setCssStyles({
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginTop: "12px",
          maxHeight: "150px",
          overflowY: "auto",
          padding: "4px 0"
        });
        for (let i = 0; i < paths.length; i++) {
          const chip = chipContainer.createDiv();
          chip.setCssStyles({
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "4px 8px",
            background: "var(--background-modifier-form-field)",
            border: "1px solid var(--background-modifier-border)",
            borderRadius: "var(--radius-s)",
            fontSize: "var(--font-ui-smaller)"
          });
          const iconSpan = chip.createSpan();
          const abstractFile = this.app.vault.getAbstractFileByPath(paths[i]);
          const isFolder = abstractFile && "children" in abstractFile;
          (0, import_obsidian9.setIcon)(iconSpan, isFolder ? "folder" : "file-text");
          iconSpan.setCssStyles({
            display: "flex",
            alignItems: "center",
            color: "var(--text-muted)",
            width: "14px",
            height: "14px"
          });
          chip.createSpan({ text: paths[i] });
          const removeBtn = chip.createSpan({ cls: "clickable-icon" });
          (0, import_obsidian9.setIcon)(removeBtn, "x");
          removeBtn.setCssStyles({
            display: "flex",
            alignItems: "center",
            padding: "0",
            width: "14px",
            height: "14px"
          });
          removeBtn.addEventListener("click", () => {
            void (async () => {
              var _a2;
              (_a2 = site.publishPaths) == null ? void 0 : _a2.splice(i, 1);
              await this.plugin.saveSettings();
              renderPaths();
            })();
          });
        }
      }
    };
    updateVisibility = () => {
      renderPaths();
    };
    updateVisibility();
    new import_obsidian9.Setting(root).setName("Advanced Settings").setDesc("Configure metadata, styling, and exclusions for this site.").addButton((b) => {
      b.setButtonText("Edit settings").onClick(() => {
        new EditSiteModal(this.app, this.plugin, site, () => this.refresh()).open();
      });
    });
    const deployTarget = (_a = site.deployTarget) != null ? _a : s.cloudflareToken ? "cloudflare" : "github-actions";
    const targetLabel = deployTarget === "cloudflare" ? "Cloudflare Pages" : "GitHub Actions";
    const deploySetting = new import_obsidian9.Setting(root).setName("Deployment Info").setDesc(`Deploy: ${targetLabel}`);
    if (site.siteUrl) {
      deploySetting.addButton((b) => {
        b.setIcon("external-link").setButtonText("Open Site").onClick(() => {
          window.open(`https://${site.siteUrl}`, "_blank");
        });
      });
    }
    if (deployTarget === "cloudflare") {
      new import_obsidian9.Setting(root).setName("GitHub Connection").setDesc('If Cloudflare says "Disconnected from Git", click here to grant access to your repository.').addButton((b) => b.setButtonText("Grant Access").onClick(() => {
        window.open(CLOUDFLARE_APP_URL2, "_blank");
      }));
    }
    const actionSetting = new import_obsidian9.Setting(root).setName("Actions");
    actionSetting.controlEl.setCssStyles({
      display: "flex",
      flexDirection: "row",
      gap: "8px",
      flexWrap: "wrap",
      justifyContent: "flex-end"
    });
    actionSetting.addButton((b) => {
      b.setButtonText("Publish").setCta().onClick(async () => {
        b.setDisabled(true);
        b.setButtonText("Publishing...");
        try {
          await this.plugin.doPublish();
        } finally {
          b.setDisabled(false);
          b.setButtonText("Publish");
        }
      });
    }).addButton((b) => {
      b.setButtonText("Unpublish");
      if (!site.isPublished)
        b.setDisabled(true);
      else
        b.setDestructive();
      b.onClick(() => {
        new UnpublishModal(this.app, this.plugin, () => this.refresh()).open();
      });
    }).addButton((b) => {
      b.setButtonText("Delete").setDestructive().onClick(() => {
        new RemoveSiteModal(this.app, this.plugin, site, () => {
          this.refresh();
        }).open();
      });
    });
  }
};

// src/core/secureStore.ts
function resolveSafeStorage() {
  var _a, _b, _c;
  try {
    const electron = require("electron");
    return (_c = (_b = electron.safeStorage) != null ? _b : (_a = electron.remote) == null ? void 0 : _a.safeStorage) != null ? _c : null;
  } catch (e) {
    return null;
  }
}
var safeStorage = resolveSafeStorage();
function isSecureStorageAvailable() {
  try {
    return !!safeStorage && safeStorage.isEncryptionAvailable();
  } catch (e) {
    return false;
  }
}
function encryptSecret(plain) {
  if (!plain)
    return "";
  if (!isSecureStorageAvailable()) {
    throw new Error("Secure storage is unavailable on this system.");
  }
  return safeStorage.encryptString(plain).toString("base64");
}
function decryptSecret(b64) {
  if (!b64)
    return "";
  if (!isSecureStorageAvailable())
    return "";
  try {
    return safeStorage.decryptString(Buffer.from(b64, "base64"));
  } catch (e) {
    return "";
  }
}

// src/backup/backupEngine.ts
var import_obsidian10 = require("obsidian");
var DEFAULT_IGNORE_PATTERNS = [
  ".DS_Store",
  "Thumbs.db",
  "desktop.ini",
  ".trash/",
  "node_modules/"
];
var BackupEngine = class {
  constructor(app, settings, onProgress = () => {
  }) {
    this.app = app;
    this.settings = settings;
    this.onProgress = onProgress;
  }
  async backup() {
    const result = { success: true, updated: 0, errors: [] };
    const { githubOwner, githubToken, backup } = this.settings;
    if (!githubToken || !githubOwner || !backup.repository) {
      return {
        success: false,
        updated: 0,
        errors: ["Backup is not configured. Open NoteFlare settings to finish setup."]
      };
    }
    try {
      let github = new GitHubApi(githubToken, githubOwner, backup.repository, "main");
      const repositoryExists = await github.repoExists();
      if (!repositoryExists) {
        this.onProgress("Preparing private backup storage\u2026");
        await github.createRepo(true);
        if (!await github.waitForRepo(3e4)) {
          throw new Error("Timed out while preparing private backup storage.");
        }
      } else if (!await github.isRepoPrivate()) {
        throw new Error(
          "Backup stopped because its storage location is public. Rename that repository in GitHub or make it private, then try again."
        );
      }
      let branch = "main";
      try {
        branch = await github.getDefaultBranch();
      } catch (e) {
      }
      github = new GitHubApi(githubToken, githubOwner, backup.repository, branch);
      const localFiles = await this.collectLocalFiles();
      const remoteFiles = await this.getRemoteFiles(github);
      const uploads = [];
      for (const [path, local] of localFiles) {
        if (remoteFiles.get(path) !== local.sha) {
          uploads.push({ path, content: local.content });
        }
        remoteFiles.delete(path);
      }
      for (const path of remoteFiles.keys()) {
        const existsButWasUnreadable = this.isInBackupScope(path) && this.app.vault.getAbstractFileByPath(path) !== null;
        if (!this.isIgnored(path) && !existsButWasUnreadable) {
          uploads.push({ path, content: null });
        }
      }
      if (uploads.length === 0)
        return result;
      const timestamp = (/* @__PURE__ */ new Date()).toLocaleString();
      const committed = await github.commitFiles(
        uploads,
        `NoteFlare backup \xB7 ${timestamp}`,
        (done, total) => this.onProgress(`Backing up ${done}/${total}\u2026`),
        void 0,
        "",
        { isPrivate: true }
      );
      result.success = committed.success;
      result.updated = committed.uploaded;
      result.errors = committed.errors;
    } catch (error) {
      result.success = false;
      result.errors.push(error instanceof Error ? error.message : "Backup failed.");
    }
    return result;
  }
  async collectLocalFiles() {
    const files = /* @__PURE__ */ new Map();
    const folder = this.settings.backup.folder ? (0, import_obsidian10.normalizePath)(this.settings.backup.folder) : "";
    for (const file of this.app.vault.getFiles()) {
      if (folder && file.path !== folder && !file.path.startsWith(`${folder}/`))
        continue;
      if (this.isIgnored(file.path))
        continue;
      try {
        const bytes = new Uint8Array(await this.app.vault.readBinary(file));
        files.set(file.path, {
          content: this.toBase64(bytes),
          sha: await this.computeGitBlobSha(bytes)
        });
      } catch (e) {
      }
    }
    return files;
  }
  async getRemoteFiles(github) {
    try {
      const tree = await github.listTree();
      return new Map(
        tree.filter((file) => !this.isIgnored(file.path)).map((file) => [file.path, file.sha])
      );
    } catch (error) {
      const status = error.status;
      if (status === 404 || error.message.includes("404"))
        return /* @__PURE__ */ new Map();
      throw error;
    }
  }
  isIgnored(path) {
    const configDir = this.app.vault.configDir;
    if (path === configDir || path.startsWith(`${configDir}/`))
      return true;
    return DEFAULT_IGNORE_PATTERNS.some((pattern) => {
      if (pattern.endsWith("/")) {
        return path === pattern.slice(0, -1) || path.startsWith(pattern);
      }
      return path === pattern || path.endsWith("/" + pattern);
    });
  }
  isInBackupScope(path) {
    const folder = this.settings.backup.folder ? (0, import_obsidian10.normalizePath)(this.settings.backup.folder) : "";
    return !folder || path === folder || path.startsWith(`${folder}/`);
  }
  toBase64(bytes) {
    let binary = "";
    const chunkSize = 32768;
    for (let offset = 0; offset < bytes.length; offset += chunkSize) {
      binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
    }
    return btoa(binary);
  }
  async computeGitBlobSha(content) {
    const header = new TextEncoder().encode(`blob ${content.byteLength}\0`);
    const payload = new Uint8Array(header.length + content.length);
    payload.set(header);
    payload.set(content, header.length);
    const hash = await crypto.subtle.digest("SHA-1", payload);
    return Array.from(new Uint8Array(hash)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
  }
};

// main.ts
var NoteFlarePlugin = class extends import_obsidian11.Plugin {
  constructor() {
    super(...arguments);
    this.ribbonEl = null;
    this.backupInProgress = false;
    this.backupDebounceTimer = null;
  }
  async onload() {
    await this.loadSettings();
    if (!isSecureStorageAvailable()) {
      new import_obsidian11.Notice(
        "NoteFlare: secure token storage is unavailable on this system. Your tokens will not be saved between sessions \u2014 you may need to re-enter them.",
        1e4
      );
    }
    const statusEl = this.addStatusBarItem();
    this.statusBar = new StatusBar(statusEl);
    this.updateStatusBar();
    this.registerView(VIEW_TYPE_NOTEFLARE, (leaf) => new NoteFlareView(leaf, this));
    this.ribbonEl = this.addRibbonIcon(
      this.isActiveLive() ? "cloud-check" : "cloud-upload",
      "NoteFlare",
      () => void this.activateView()
    );
    this.updateRibbonIcon();
    this.addCommand({
      id: "open-panel",
      name: "Open panel",
      callback: () => void this.activateView()
    });
    this.addCommand({
      id: "publish",
      name: "Publish active site",
      callback: () => void this.doPublish()
    });
    this.addCommand({
      id: "unpublish",
      name: "Unpublish active site",
      callback: () => void this.doUnpublish()
    });
    this.addCommand({
      id: "backup-now",
      name: "Back up vault now",
      callback: () => void this.doBackup(false)
    });
    this.addSettingTab(new NoteFlareSettingsTab(this.app, this));
    this.registerBackupAutomation();
  }
  /** The currently-selected site, or the first one, or null when none exist. */
  getActiveSite() {
    var _a, _b;
    const { sites, activeSiteId } = this.settings;
    return (_b = (_a = sites.find((s) => s.id === activeSiteId)) != null ? _a : sites[0]) != null ? _b : null;
  }
  isActiveLive() {
    var _a, _b;
    return (_b = (_a = this.getActiveSite()) == null ? void 0 : _a.isPublished) != null ? _b : false;
  }
  /** Reveal the NoteFlare panel (creating it if needed in the configured location). */
  async activateView() {
    var _a, _b;
    const { workspace } = this.app;
    let leaf = (_a = workspace.getLeavesOfType(VIEW_TYPE_NOTEFLARE)[0]) != null ? _a : null;
    if (!leaf) {
      const loc = (_b = this.settings.defaultViewLocation) != null ? _b : "left";
      if (loc === "right") {
        leaf = workspace.getRightLeaf(false);
      } else if (loc === "tab") {
        leaf = workspace.getLeaf("tab");
      } else {
        leaf = workspace.getLeftLeaf(false);
      }
      if (!leaf)
        return;
      await leaf.setViewState({ type: VIEW_TYPE_NOTEFLARE, active: true });
    }
    void workspace.revealLeaf(leaf);
  }
  refreshView() {
    this.app.workspace.getLeavesOfType(VIEW_TYPE_NOTEFLARE).forEach((leaf) => {
      const view = leaf.view;
      if (view instanceof NoteFlareView)
        view.refresh();
    });
  }
  async doBackup(background = false) {
    var _a;
    if (this.backupInProgress) {
      if (!background)
        new import_obsidian11.Notice("A backup is already running.");
      return;
    }
    if (!this.settings.setupComplete || !this.settings.enableBackup) {
      if (!background) {
        this.openSettingsTab();
        new import_obsidian11.Notice("Enable private backup in NoteFlare settings first.");
      }
      return;
    }
    if (!this.settings.backup.repository) {
      this.settings.backup.repository = this.defaultBackupRepository();
    }
    this.backupInProgress = true;
    this.settings.backup.lastBackupAttemptAt = (/* @__PURE__ */ new Date()).toISOString();
    const engine = new BackupEngine(this.app, this.settings, (message) => {
      if (!background)
        this.statusBar.setMessage(`NoteFlare: ${message}`);
    });
    try {
      const result = await engine.backup();
      if (!result.success)
        throw new Error((_a = result.errors[0]) != null ? _a : "Backup failed.");
      this.settings.backup.lastBackupAt = (/* @__PURE__ */ new Date()).toISOString();
      this.settings.backup.lastBackupError = "";
      await this.saveSettings();
      if (!background) {
        const message = result.updated > 0 ? `Backup complete \xB7 ${result.updated} file${result.updated === 1 ? "" : "s"} updated` : "Backup is already up to date";
        new import_obsidian11.Notice(message, 5e3);
      }
    } catch (error) {
      const message = this.toUserMessage(error, "Backup failed.");
      this.settings.backup.lastBackupError = message;
      await this.saveSettings();
      if (!background) {
        this.statusBar.setError(message);
        new import_obsidian11.Notice(message, 8e3);
      } else {
        console.error(`NoteFlare background backup failed: ${message}`);
      }
    } finally {
      this.backupInProgress = false;
      if (!background)
        this.updateStatusBar();
    }
  }
  async doPublish() {
    const site = this.getActiveSite();
    if (!this.settings.setupComplete || !site) {
      this.openSettingsTab();
      new import_obsidian11.Notice("Add a site before publishing.");
      return;
    }
    const publisher = new Publisher(this.settings, site, this.app, (message) => {
      this.syncStatusFromProgress(message);
    });
    try {
      const result = await publisher.publish();
      await this.applyPublishResult(site, result);
    } catch (err) {
      const message = this.toUserMessage(err, "Publishing failed. Review your setup and try again.");
      this.statusBar.setError(message);
      new import_obsidian11.Notice(message, 8e3);
    }
  }
  async doUnpublish() {
    const site = this.getActiveSite();
    if (!this.settings.setupComplete || !site) {
      this.openSettingsTab();
      new import_obsidian11.Notice("Add a site first.");
      return;
    }
    const publisher = new Publisher(this.settings, site, this.app, (message) => {
      this.statusBar.setMessage(`NoteFlare: ${message}`);
    });
    this.statusBar.setMessage("NoteFlare: Taking your site offline...");
    try {
      await publisher.unpublish();
      site.isPublished = false;
      await this.saveSettings();
      this.updateStatusBar();
      new import_obsidian11.Notice("Your site is now offline. You can publish again any time.");
    } catch (err) {
      const message = this.toUserMessage(err, "Unpublish failed. Check your Cloudflare settings and try again.");
      this.statusBar.setError(message);
      new import_obsidian11.Notice(message, 8e3);
    }
  }
  async loadSettings() {
    const loaded = await this.loadData();
    const { settings } = migrateSettings(loaded);
    this.settings = settings;
  }
  async saveSettings() {
    const { githubToken, cloudflareToken, ...rest } = this.settings;
    const persisted = { ...rest };
    if (isSecureStorageAvailable()) {
      persisted.githubTokenEnc = githubToken ? encryptSecret(githubToken) : "";
      persisted.cloudflareTokenEnc = cloudflareToken ? encryptSecret(cloudflareToken) : "";
    }
    await this.saveData(persisted);
    this.updateStatusBar();
    this.updateRibbonIcon();
    this.refreshView();
  }
  updateStatusBar() {
    if (!this.statusBar)
      return;
    const site = this.getActiveSite();
    if (!this.settings.setupComplete || !site) {
      this.statusBar.setIdle();
      return;
    }
    if (site.isPublished) {
      this.statusBar.setLive(site.lastNoteCount, site.siteUrl);
      return;
    }
    this.statusBar.setUnpublished();
  }
  updateRibbonIcon() {
    if (!this.ribbonEl)
      return;
    const live = this.isActiveLive();
    (0, import_obsidian11.setIcon)(this.ribbonEl, live ? "cloud-check" : "cloud-upload");
    this.ribbonEl.setAttribute(
      "aria-label",
      live ? "NoteFlare: Unpublish site" : "NoteFlare: Publish site"
    );
  }
  syncStatusFromProgress(message) {
    const uploadMatch = /Uploading (\d+)\/(\d+)/.exec(message);
    if (uploadMatch) {
      this.statusBar.setPublishing(Number(uploadMatch[1]), Number(uploadMatch[2]));
      return;
    }
    const rateMatch = /Rate limited(?:.*?)(\d+)s/.exec(message);
    if (rateMatch) {
      this.statusBar.setRateLimited(Number(rateMatch[1]));
      return;
    }
    this.statusBar.setMessage(`NoteFlare: ${message}`);
  }
  registerBackupAutomation() {
    const queueAfterChange = () => {
      if (!this.settings.enableBackup || !this.settings.backup.backupOnChange)
        return;
      if (this.backupDebounceTimer !== null)
        window.clearTimeout(this.backupDebounceTimer);
      this.backupDebounceTimer = window.setTimeout(() => {
        this.backupDebounceTimer = null;
        void this.doBackup(true);
      }, 3e4);
    };
    this.registerEvent(this.app.vault.on("create", queueAfterChange));
    this.registerEvent(this.app.vault.on("modify", queueAfterChange));
    this.registerEvent(this.app.vault.on("delete", queueAfterChange));
    this.registerEvent(this.app.vault.on("rename", queueAfterChange));
    this.register(() => {
      if (this.backupDebounceTimer !== null)
        window.clearTimeout(this.backupDebounceTimer);
    });
    this.registerInterval(window.setInterval(() => {
      void this.runScheduledBackupIfDue();
    }, 6e4));
    this.app.workspace.onLayoutReady(() => void this.runScheduledBackupIfDue());
  }
  async runScheduledBackupIfDue() {
    const { backup } = this.settings;
    if (!this.settings.setupComplete || !this.settings.enableBackup || backup.intervalMinutes <= 0) {
      return;
    }
    const lastAttempt = backup.lastBackupAttemptAt ? new Date(backup.lastBackupAttemptAt).getTime() : 0;
    const intervalMs = backup.intervalMinutes * 60 * 1e3;
    if (!lastAttempt || Date.now() - lastAttempt >= intervalMs) {
      await this.doBackup(true);
    }
  }
  defaultBackupRepository() {
    const vaultName = this.app.vault.getName().toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
    return `${vaultName || "obsidian-vault"}-backup`;
  }
  async applyPublishResult(site, result) {
    var _a;
    site.lastPublished = (/* @__PURE__ */ new Date()).toISOString();
    site.isPublished = site.isPublished || result.success;
    site.lastNoteCount = result.uploaded;
    await this.saveSettings();
    if (result.success) {
      this.statusBar.setLive(result.uploaded, site.siteUrl);
      const fixedNote = result.fixed > 0 ? ` (auto-fixed ${result.fixed} frontmatter issue${result.fixed === 1 ? "" : "s"})` : "";
      new import_obsidian11.Notice(`Published ${result.uploaded} files to ${site.siteUrl}${fixedNote}`, 6e3);
      return;
    }
    const firstError = (_a = result.errors[0]) != null ? _a : "Publishing failed. Review your setup and try again.";
    this.statusBar.setError(firstError);
    new import_obsidian11.Notice(`Failed to publish: ${firstError}`, 8e3);
  }
  openSettingsTab() {
    var _a, _b;
    const setting = this.app.setting;
    (_a = setting == null ? void 0 : setting.open) == null ? void 0 : _a.call(setting);
    (_b = setting == null ? void 0 : setting.openTabById) == null ? void 0 : _b.call(setting, this.manifest.id);
  }
  toUserMessage(err, fallback) {
    const message = err instanceof Error ? err.message : "";
    return message || fallback;
  }
};
function migrateSettings(loaded) {
  var _a, _b, _c, _d, _e, _f;
  const settings = {
    ...DEFAULT_SETTINGS,
    sites: [],
    backup: { ...DEFAULT_BACKUP_SETTINGS }
  };
  if (!loaded)
    return { settings };
  const str = (v) => typeof v === "string" ? v : "";
  settings.githubOwner = str(loaded.githubOwner);
  settings.cloudflareAccount = str(loaded.cloudflareAccount);
  settings.masterRepository = str(loaded.masterRepository) || "noteflare-sites";
  settings.setupComplete = loaded.setupComplete === true;
  settings.activeSiteId = str(loaded.activeSiteId);
  settings.enableBackup = loaded.enableBackup === true;
  settings.enablePublish = loaded.enablePublish !== false;
  const savedBackup = typeof loaded.backup === "object" && loaded.backup !== null ? loaded.backup : null;
  settings.backup = {
    ...DEFAULT_BACKUP_SETTINGS,
    ...savedBackup != null ? savedBackup : {},
    repository: (_a = savedBackup == null ? void 0 : savedBackup.repository) != null ? _a : "",
    folder: (_b = savedBackup == null ? void 0 : savedBackup.folder) != null ? _b : "",
    backupOnChange: (_c = savedBackup == null ? void 0 : savedBackup.backupOnChange) != null ? _c : true,
    lastBackupAt: (_d = savedBackup == null ? void 0 : savedBackup.lastBackupAt) != null ? _d : ""
  };
  if (loaded.githubTokenEnc) {
    settings.githubToken = decryptSecret(str(loaded.githubTokenEnc));
  }
  if (loaded.cloudflareTokenEnc) {
    settings.cloudflareToken = decryptSecret(str(loaded.cloudflareTokenEnc));
  }
  if (Array.isArray(loaded.sites)) {
    settings.sites = loaded.sites.map((s) => {
      let publishScope = s.publishScope;
      let publishPaths = s.publishPaths;
      if (publishScope === "folder" || publishScope === "page") {
        publishScope = "selected";
        const legacyPath = s.publishPath;
        if (legacyPath && !publishPaths) {
          publishPaths = [legacyPath];
        }
      }
      return createSiteProfile({
        ...s,
        publishScope: publishScope || "vault",
        publishPaths: publishPaths || []
      });
    });
  }
  if (!settings.sites.some((s) => s.id === settings.activeSiteId)) {
    settings.activeSiteId = (_f = (_e = settings.sites[0]) == null ? void 0 : _e.id) != null ? _f : "";
  }
  return { settings };
}
/*! Bundled license information:

is-number/index.js:
  (*!
   * is-number <https://github.com/jonschlinkert/is-number>
   *
   * Copyright (c) 2014-present, Jon Schlinkert.
   * Released under the MIT License.
   *)

to-regex-range/index.js:
  (*!
   * to-regex-range <https://github.com/micromatch/to-regex-range>
   *
   * Copyright (c) 2015-present, Jon Schlinkert.
   * Released under the MIT License.
   *)

fill-range/index.js:
  (*!
   * fill-range <https://github.com/jonschlinkert/fill-range>
   *
   * Copyright (c) 2014-present, Jon Schlinkert.
   * Licensed under the MIT License.
   *)
*/
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL2JyYWNlcy9saWIvdXRpbHMuanMiLCAibm9kZV9tb2R1bGVzL2JyYWNlcy9saWIvc3RyaW5naWZ5LmpzIiwgIm5vZGVfbW9kdWxlcy9pcy1udW1iZXIvaW5kZXguanMiLCAibm9kZV9tb2R1bGVzL3RvLXJlZ2V4LXJhbmdlL2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9maWxsLXJhbmdlL2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9icmFjZXMvbGliL2NvbXBpbGUuanMiLCAibm9kZV9tb2R1bGVzL2JyYWNlcy9saWIvZXhwYW5kLmpzIiwgIm5vZGVfbW9kdWxlcy9icmFjZXMvbGliL2NvbnN0YW50cy5qcyIsICJub2RlX21vZHVsZXMvYnJhY2VzL2xpYi9wYXJzZS5qcyIsICJub2RlX21vZHVsZXMvYnJhY2VzL2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9waWNvbWF0Y2gvbGliL2NvbnN0YW50cy5qcyIsICJub2RlX21vZHVsZXMvcGljb21hdGNoL2xpYi91dGlscy5qcyIsICJub2RlX21vZHVsZXMvcGljb21hdGNoL2xpYi9zY2FuLmpzIiwgIm5vZGVfbW9kdWxlcy9waWNvbWF0Y2gvbGliL3BhcnNlLmpzIiwgIm5vZGVfbW9kdWxlcy9waWNvbWF0Y2gvbGliL3BpY29tYXRjaC5qcyIsICJub2RlX21vZHVsZXMvcGljb21hdGNoL2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9taWNyb21hdGNoL2luZGV4LmpzIiwgIm1haW4udHMiLCAic3JjL2FwaS9naXRodWJBcGkudHMiLCAic3JjL2FwaS9jbG91ZGZsYXJlQXBpLnRzIiwgInNyYy9wdWJsaXNoL2ZpbGVDb2xsZWN0b3IudHMiLCAic3JjL2NvcmUvY29uc3RhbnRzLnRzIiwgInNyYy9wdWJsaXNoL3RyYW5zZm9ybWVyLnRzIiwgInNyYy9wdWJsaXNoL2NvbnRlbnRWYWxpZGF0b3IudHMiLCAic3JjL3B1Ymxpc2gvcHVibGlzaGVyLnRzIiwgInNyYy9jb3JlL3NldHRpbmdzLnRzIiwgInNyYy91aS9zZXR0aW5ncy9zZXR0aW5nc1RhYi50cyIsICJzcmMvdWkvc2V0dGluZ3Mvc2l0ZU1vZGFscy50cyIsICJzcmMvdWkvc3RhdHVzQmFyLnRzIiwgInNyYy91aS9ub3RlZmxhcmVWaWV3LnRzIiwgInNyYy9jb3JlL3NlY3VyZVN0b3JlLnRzIiwgInNyYy9iYWNrdXAvYmFja3VwRW5naW5lLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuaXNJbnRlZ2VyID0gbnVtID0+IHtcbiAgaWYgKHR5cGVvZiBudW0gPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIobnVtKTtcbiAgfVxuICBpZiAodHlwZW9mIG51bSA9PT0gJ3N0cmluZycgJiYgbnVtLnRyaW0oKSAhPT0gJycpIHtcbiAgICByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcihOdW1iZXIobnVtKSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBGaW5kIGEgbm9kZSBvZiB0aGUgZ2l2ZW4gdHlwZVxuICovXG5cbmV4cG9ydHMuZmluZCA9IChub2RlLCB0eXBlKSA9PiBub2RlLm5vZGVzLmZpbmQobm9kZSA9PiBub2RlLnR5cGUgPT09IHR5cGUpO1xuXG4vKipcbiAqIEZpbmQgYSBub2RlIG9mIHRoZSBnaXZlbiB0eXBlXG4gKi9cblxuZXhwb3J0cy5leGNlZWRzTGltaXQgPSAobWluLCBtYXgsIHN0ZXAgPSAxLCBsaW1pdCkgPT4ge1xuICBpZiAobGltaXQgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG4gIGlmICghZXhwb3J0cy5pc0ludGVnZXIobWluKSB8fCAhZXhwb3J0cy5pc0ludGVnZXIobWF4KSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gKChOdW1iZXIobWF4KSAtIE51bWJlcihtaW4pKSAvIE51bWJlcihzdGVwKSkgPj0gbGltaXQ7XG59O1xuXG4vKipcbiAqIEVzY2FwZSB0aGUgZ2l2ZW4gbm9kZSB3aXRoICdcXFxcJyBiZWZvcmUgbm9kZS52YWx1ZVxuICovXG5cbmV4cG9ydHMuZXNjYXBlTm9kZSA9IChibG9jaywgbiA9IDAsIHR5cGUpID0+IHtcbiAgY29uc3Qgbm9kZSA9IGJsb2NrLm5vZGVzW25dO1xuICBpZiAoIW5vZGUpIHJldHVybjtcblxuICBpZiAoKHR5cGUgJiYgbm9kZS50eXBlID09PSB0eXBlKSB8fCBub2RlLnR5cGUgPT09ICdvcGVuJyB8fCBub2RlLnR5cGUgPT09ICdjbG9zZScpIHtcbiAgICBpZiAobm9kZS5lc2NhcGVkICE9PSB0cnVlKSB7XG4gICAgICBub2RlLnZhbHVlID0gJ1xcXFwnICsgbm9kZS52YWx1ZTtcbiAgICAgIG5vZGUuZXNjYXBlZCA9IHRydWU7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gYnJhY2Ugbm9kZSBzaG91bGQgYmUgZW5jbG9zZWQgaW4gbGl0ZXJhbCBicmFjZXNcbiAqL1xuXG5leHBvcnRzLmVuY2xvc2VCcmFjZSA9IG5vZGUgPT4ge1xuICBpZiAobm9kZS50eXBlICE9PSAnYnJhY2UnKSByZXR1cm4gZmFsc2U7XG4gIGlmICgobm9kZS5jb21tYXMgPj4gMCArIG5vZGUucmFuZ2VzID4+IDApID09PSAwKSB7XG4gICAgbm9kZS5pbnZhbGlkID0gdHJ1ZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBhIGJyYWNlIG5vZGUgaXMgaW52YWxpZC5cbiAqL1xuXG5leHBvcnRzLmlzSW52YWxpZEJyYWNlID0gYmxvY2sgPT4ge1xuICBpZiAoYmxvY2sudHlwZSAhPT0gJ2JyYWNlJykgcmV0dXJuIGZhbHNlO1xuICBpZiAoYmxvY2suaW52YWxpZCA9PT0gdHJ1ZSB8fCBibG9jay5kb2xsYXIpIHJldHVybiB0cnVlO1xuICBpZiAoKGJsb2NrLmNvbW1hcyA+PiAwICsgYmxvY2sucmFuZ2VzID4+IDApID09PSAwKSB7XG4gICAgYmxvY2suaW52YWxpZCA9IHRydWU7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKGJsb2NrLm9wZW4gIT09IHRydWUgfHwgYmxvY2suY2xvc2UgIT09IHRydWUpIHtcbiAgICBibG9jay5pbnZhbGlkID0gdHJ1ZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBhIG5vZGUgaXMgYW4gb3BlbiBvciBjbG9zZSBub2RlXG4gKi9cblxuZXhwb3J0cy5pc09wZW5PckNsb3NlID0gbm9kZSA9PiB7XG4gIGlmIChub2RlLnR5cGUgPT09ICdvcGVuJyB8fCBub2RlLnR5cGUgPT09ICdjbG9zZScpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gbm9kZS5vcGVuID09PSB0cnVlIHx8IG5vZGUuY2xvc2UgPT09IHRydWU7XG59O1xuXG4vKipcbiAqIFJlZHVjZSBhbiBhcnJheSBvZiB0ZXh0IG5vZGVzLlxuICovXG5cbmV4cG9ydHMucmVkdWNlID0gbm9kZXMgPT4gbm9kZXMucmVkdWNlKChhY2MsIG5vZGUpID0+IHtcbiAgaWYgKG5vZGUudHlwZSA9PT0gJ3RleHQnKSBhY2MucHVzaChub2RlLnZhbHVlKTtcbiAgaWYgKG5vZGUudHlwZSA9PT0gJ3JhbmdlJykgbm9kZS50eXBlID0gJ3RleHQnO1xuICByZXR1cm4gYWNjO1xufSwgW10pO1xuXG4vKipcbiAqIEZsYXR0ZW4gYW4gYXJyYXlcbiAqL1xuXG5leHBvcnRzLmZsYXR0ZW4gPSAoLi4uYXJncykgPT4ge1xuICBjb25zdCByZXN1bHQgPSBbXTtcblxuICBjb25zdCBmbGF0ID0gYXJyID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZWxlID0gYXJyW2ldO1xuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShlbGUpKSB7XG4gICAgICAgIGZsYXQoZWxlKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChlbGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXN1bHQucHVzaChlbGUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIGZsYXQoYXJncyk7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxuY29uc3QgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKGFzdCwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGNvbnN0IHN0cmluZ2lmeSA9IChub2RlLCBwYXJlbnQgPSB7fSkgPT4ge1xuICAgIGNvbnN0IGludmFsaWRCbG9jayA9IG9wdGlvbnMuZXNjYXBlSW52YWxpZCAmJiB1dGlscy5pc0ludmFsaWRCcmFjZShwYXJlbnQpO1xuICAgIGNvbnN0IGludmFsaWROb2RlID0gbm9kZS5pbnZhbGlkID09PSB0cnVlICYmIG9wdGlvbnMuZXNjYXBlSW52YWxpZCA9PT0gdHJ1ZTtcbiAgICBsZXQgb3V0cHV0ID0gJyc7XG5cbiAgICBpZiAobm9kZS52YWx1ZSkge1xuICAgICAgaWYgKChpbnZhbGlkQmxvY2sgfHwgaW52YWxpZE5vZGUpICYmIHV0aWxzLmlzT3Blbk9yQ2xvc2Uobm9kZSkpIHtcbiAgICAgICAgcmV0dXJuICdcXFxcJyArIG5vZGUudmFsdWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gbm9kZS52YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAobm9kZS52YWx1ZSkge1xuICAgICAgcmV0dXJuIG5vZGUudmFsdWU7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUubm9kZXMpIHtcbiAgICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygbm9kZS5ub2Rlcykge1xuICAgICAgICBvdXRwdXQgKz0gc3RyaW5naWZ5KGNoaWxkKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfTtcblxuICByZXR1cm4gc3RyaW5naWZ5KGFzdCk7XG59O1xuXG4iLCAiLyohXG4gKiBpcy1udW1iZXIgPGh0dHBzOi8vZ2l0aHViLmNvbS9qb25zY2hsaW5rZXJ0L2lzLW51bWJlcj5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgSm9uIFNjaGxpbmtlcnQuXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG51bSkge1xuICBpZiAodHlwZW9mIG51bSA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gbnVtIC0gbnVtID09PSAwO1xuICB9XG4gIGlmICh0eXBlb2YgbnVtID09PSAnc3RyaW5nJyAmJiBudW0udHJpbSgpICE9PSAnJykge1xuICAgIHJldHVybiBOdW1iZXIuaXNGaW5pdGUgPyBOdW1iZXIuaXNGaW5pdGUoK251bSkgOiBpc0Zpbml0ZSgrbnVtKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuIiwgIi8qIVxuICogdG8tcmVnZXgtcmFuZ2UgPGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb21hdGNoL3RvLXJlZ2V4LXJhbmdlPlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNS1wcmVzZW50LCBKb24gU2NobGlua2VydC5cbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmNvbnN0IGlzTnVtYmVyID0gcmVxdWlyZSgnaXMtbnVtYmVyJyk7XG5cbmNvbnN0IHRvUmVnZXhSYW5nZSA9IChtaW4sIG1heCwgb3B0aW9ucykgPT4ge1xuICBpZiAoaXNOdW1iZXIobWluKSA9PT0gZmFsc2UpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd0b1JlZ2V4UmFuZ2U6IGV4cGVjdGVkIHRoZSBmaXJzdCBhcmd1bWVudCB0byBiZSBhIG51bWJlcicpO1xuICB9XG5cbiAgaWYgKG1heCA9PT0gdm9pZCAwIHx8IG1pbiA9PT0gbWF4KSB7XG4gICAgcmV0dXJuIFN0cmluZyhtaW4pO1xuICB9XG5cbiAgaWYgKGlzTnVtYmVyKG1heCkgPT09IGZhbHNlKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndG9SZWdleFJhbmdlOiBleHBlY3RlZCB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIGJlIGEgbnVtYmVyLicpO1xuICB9XG5cbiAgbGV0IG9wdHMgPSB7IHJlbGF4WmVyb3M6IHRydWUsIC4uLm9wdGlvbnMgfTtcbiAgaWYgKHR5cGVvZiBvcHRzLnN0cmljdFplcm9zID09PSAnYm9vbGVhbicpIHtcbiAgICBvcHRzLnJlbGF4WmVyb3MgPSBvcHRzLnN0cmljdFplcm9zID09PSBmYWxzZTtcbiAgfVxuXG4gIGxldCByZWxheCA9IFN0cmluZyhvcHRzLnJlbGF4WmVyb3MpO1xuICBsZXQgc2hvcnRoYW5kID0gU3RyaW5nKG9wdHMuc2hvcnRoYW5kKTtcbiAgbGV0IGNhcHR1cmUgPSBTdHJpbmcob3B0cy5jYXB0dXJlKTtcbiAgbGV0IHdyYXAgPSBTdHJpbmcob3B0cy53cmFwKTtcbiAgbGV0IGNhY2hlS2V5ID0gbWluICsgJzonICsgbWF4ICsgJz0nICsgcmVsYXggKyBzaG9ydGhhbmQgKyBjYXB0dXJlICsgd3JhcDtcblxuICBpZiAodG9SZWdleFJhbmdlLmNhY2hlLmhhc093blByb3BlcnR5KGNhY2hlS2V5KSkge1xuICAgIHJldHVybiB0b1JlZ2V4UmFuZ2UuY2FjaGVbY2FjaGVLZXldLnJlc3VsdDtcbiAgfVxuXG4gIGxldCBhID0gTWF0aC5taW4obWluLCBtYXgpO1xuICBsZXQgYiA9IE1hdGgubWF4KG1pbiwgbWF4KTtcblxuICBpZiAoTWF0aC5hYnMoYSAtIGIpID09PSAxKSB7XG4gICAgbGV0IHJlc3VsdCA9IG1pbiArICd8JyArIG1heDtcbiAgICBpZiAob3B0cy5jYXB0dXJlKSB7XG4gICAgICByZXR1cm4gYCgke3Jlc3VsdH0pYDtcbiAgICB9XG4gICAgaWYgKG9wdHMud3JhcCA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJldHVybiBgKD86JHtyZXN1bHR9KWA7XG4gIH1cblxuICBsZXQgaXNQYWRkZWQgPSBoYXNQYWRkaW5nKG1pbikgfHwgaGFzUGFkZGluZyhtYXgpO1xuICBsZXQgc3RhdGUgPSB7IG1pbiwgbWF4LCBhLCBiIH07XG4gIGxldCBwb3NpdGl2ZXMgPSBbXTtcbiAgbGV0IG5lZ2F0aXZlcyA9IFtdO1xuXG4gIGlmIChpc1BhZGRlZCkge1xuICAgIHN0YXRlLmlzUGFkZGVkID0gaXNQYWRkZWQ7XG4gICAgc3RhdGUubWF4TGVuID0gU3RyaW5nKHN0YXRlLm1heCkubGVuZ3RoO1xuICB9XG5cbiAgaWYgKGEgPCAwKSB7XG4gICAgbGV0IG5ld01pbiA9IGIgPCAwID8gTWF0aC5hYnMoYikgOiAxO1xuICAgIG5lZ2F0aXZlcyA9IHNwbGl0VG9QYXR0ZXJucyhuZXdNaW4sIE1hdGguYWJzKGEpLCBzdGF0ZSwgb3B0cyk7XG4gICAgYSA9IHN0YXRlLmEgPSAwO1xuICB9XG5cbiAgaWYgKGIgPj0gMCkge1xuICAgIHBvc2l0aXZlcyA9IHNwbGl0VG9QYXR0ZXJucyhhLCBiLCBzdGF0ZSwgb3B0cyk7XG4gIH1cblxuICBzdGF0ZS5uZWdhdGl2ZXMgPSBuZWdhdGl2ZXM7XG4gIHN0YXRlLnBvc2l0aXZlcyA9IHBvc2l0aXZlcztcbiAgc3RhdGUucmVzdWx0ID0gY29sbGF0ZVBhdHRlcm5zKG5lZ2F0aXZlcywgcG9zaXRpdmVzLCBvcHRzKTtcblxuICBpZiAob3B0cy5jYXB0dXJlID09PSB0cnVlKSB7XG4gICAgc3RhdGUucmVzdWx0ID0gYCgke3N0YXRlLnJlc3VsdH0pYDtcbiAgfSBlbHNlIGlmIChvcHRzLndyYXAgIT09IGZhbHNlICYmIChwb3NpdGl2ZXMubGVuZ3RoICsgbmVnYXRpdmVzLmxlbmd0aCkgPiAxKSB7XG4gICAgc3RhdGUucmVzdWx0ID0gYCg/OiR7c3RhdGUucmVzdWx0fSlgO1xuICB9XG5cbiAgdG9SZWdleFJhbmdlLmNhY2hlW2NhY2hlS2V5XSA9IHN0YXRlO1xuICByZXR1cm4gc3RhdGUucmVzdWx0O1xufTtcblxuZnVuY3Rpb24gY29sbGF0ZVBhdHRlcm5zKG5lZywgcG9zLCBvcHRpb25zKSB7XG4gIGxldCBvbmx5TmVnYXRpdmUgPSBmaWx0ZXJQYXR0ZXJucyhuZWcsIHBvcywgJy0nLCBmYWxzZSwgb3B0aW9ucykgfHwgW107XG4gIGxldCBvbmx5UG9zaXRpdmUgPSBmaWx0ZXJQYXR0ZXJucyhwb3MsIG5lZywgJycsIGZhbHNlLCBvcHRpb25zKSB8fCBbXTtcbiAgbGV0IGludGVyc2VjdGVkID0gZmlsdGVyUGF0dGVybnMobmVnLCBwb3MsICctPycsIHRydWUsIG9wdGlvbnMpIHx8IFtdO1xuICBsZXQgc3VicGF0dGVybnMgPSBvbmx5TmVnYXRpdmUuY29uY2F0KGludGVyc2VjdGVkKS5jb25jYXQob25seVBvc2l0aXZlKTtcbiAgcmV0dXJuIHN1YnBhdHRlcm5zLmpvaW4oJ3wnKTtcbn1cblxuZnVuY3Rpb24gc3BsaXRUb1JhbmdlcyhtaW4sIG1heCkge1xuICBsZXQgbmluZXMgPSAxO1xuICBsZXQgemVyb3MgPSAxO1xuXG4gIGxldCBzdG9wID0gY291bnROaW5lcyhtaW4sIG5pbmVzKTtcbiAgbGV0IHN0b3BzID0gbmV3IFNldChbbWF4XSk7XG5cbiAgd2hpbGUgKG1pbiA8PSBzdG9wICYmIHN0b3AgPD0gbWF4KSB7XG4gICAgc3RvcHMuYWRkKHN0b3ApO1xuICAgIG5pbmVzICs9IDE7XG4gICAgc3RvcCA9IGNvdW50TmluZXMobWluLCBuaW5lcyk7XG4gIH1cblxuICBzdG9wID0gY291bnRaZXJvcyhtYXggKyAxLCB6ZXJvcykgLSAxO1xuXG4gIHdoaWxlIChtaW4gPCBzdG9wICYmIHN0b3AgPD0gbWF4KSB7XG4gICAgc3RvcHMuYWRkKHN0b3ApO1xuICAgIHplcm9zICs9IDE7XG4gICAgc3RvcCA9IGNvdW50WmVyb3MobWF4ICsgMSwgemVyb3MpIC0gMTtcbiAgfVxuXG4gIHN0b3BzID0gWy4uLnN0b3BzXTtcbiAgc3RvcHMuc29ydChjb21wYXJlKTtcbiAgcmV0dXJuIHN0b3BzO1xufVxuXG4vKipcbiAqIENvbnZlcnQgYSByYW5nZSB0byBhIHJlZ2V4IHBhdHRlcm5cbiAqIEBwYXJhbSB7TnVtYmVyfSBgc3RhcnRgXG4gKiBAcGFyYW0ge051bWJlcn0gYHN0b3BgXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cblxuZnVuY3Rpb24gcmFuZ2VUb1BhdHRlcm4oc3RhcnQsIHN0b3AsIG9wdGlvbnMpIHtcbiAgaWYgKHN0YXJ0ID09PSBzdG9wKSB7XG4gICAgcmV0dXJuIHsgcGF0dGVybjogc3RhcnQsIGNvdW50OiBbXSwgZGlnaXRzOiAwIH07XG4gIH1cblxuICBsZXQgemlwcGVkID0gemlwKHN0YXJ0LCBzdG9wKTtcbiAgbGV0IGRpZ2l0cyA9IHppcHBlZC5sZW5ndGg7XG4gIGxldCBwYXR0ZXJuID0gJyc7XG4gIGxldCBjb3VudCA9IDA7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWdpdHM7IGkrKykge1xuICAgIGxldCBbc3RhcnREaWdpdCwgc3RvcERpZ2l0XSA9IHppcHBlZFtpXTtcblxuICAgIGlmIChzdGFydERpZ2l0ID09PSBzdG9wRGlnaXQpIHtcbiAgICAgIHBhdHRlcm4gKz0gc3RhcnREaWdpdDtcblxuICAgIH0gZWxzZSBpZiAoc3RhcnREaWdpdCAhPT0gJzAnIHx8IHN0b3BEaWdpdCAhPT0gJzknKSB7XG4gICAgICBwYXR0ZXJuICs9IHRvQ2hhcmFjdGVyQ2xhc3Moc3RhcnREaWdpdCwgc3RvcERpZ2l0LCBvcHRpb25zKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICBjb3VudCsrO1xuICAgIH1cbiAgfVxuXG4gIGlmIChjb3VudCkge1xuICAgIHBhdHRlcm4gKz0gb3B0aW9ucy5zaG9ydGhhbmQgPT09IHRydWUgPyAnXFxcXGQnIDogJ1swLTldJztcbiAgfVxuXG4gIHJldHVybiB7IHBhdHRlcm4sIGNvdW50OiBbY291bnRdLCBkaWdpdHMgfTtcbn1cblxuZnVuY3Rpb24gc3BsaXRUb1BhdHRlcm5zKG1pbiwgbWF4LCB0b2ssIG9wdGlvbnMpIHtcbiAgbGV0IHJhbmdlcyA9IHNwbGl0VG9SYW5nZXMobWluLCBtYXgpO1xuICBsZXQgdG9rZW5zID0gW107XG4gIGxldCBzdGFydCA9IG1pbjtcbiAgbGV0IHByZXY7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCByYW5nZXMubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgbWF4ID0gcmFuZ2VzW2ldO1xuICAgIGxldCBvYmogPSByYW5nZVRvUGF0dGVybihTdHJpbmcoc3RhcnQpLCBTdHJpbmcobWF4KSwgb3B0aW9ucyk7XG4gICAgbGV0IHplcm9zID0gJyc7XG5cbiAgICBpZiAoIXRvay5pc1BhZGRlZCAmJiBwcmV2ICYmIHByZXYucGF0dGVybiA9PT0gb2JqLnBhdHRlcm4pIHtcbiAgICAgIGlmIChwcmV2LmNvdW50Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgcHJldi5jb3VudC5wb3AoKTtcbiAgICAgIH1cblxuICAgICAgcHJldi5jb3VudC5wdXNoKG9iai5jb3VudFswXSk7XG4gICAgICBwcmV2LnN0cmluZyA9IHByZXYucGF0dGVybiArIHRvUXVhbnRpZmllcihwcmV2LmNvdW50KTtcbiAgICAgIHN0YXJ0ID0gbWF4ICsgMTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmICh0b2suaXNQYWRkZWQpIHtcbiAgICAgIHplcm9zID0gcGFkWmVyb3MobWF4LCB0b2ssIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIG9iai5zdHJpbmcgPSB6ZXJvcyArIG9iai5wYXR0ZXJuICsgdG9RdWFudGlmaWVyKG9iai5jb3VudCk7XG4gICAgdG9rZW5zLnB1c2gob2JqKTtcbiAgICBzdGFydCA9IG1heCArIDE7XG4gICAgcHJldiA9IG9iajtcbiAgfVxuXG4gIHJldHVybiB0b2tlbnM7XG59XG5cbmZ1bmN0aW9uIGZpbHRlclBhdHRlcm5zKGFyciwgY29tcGFyaXNvbiwgcHJlZml4LCBpbnRlcnNlY3Rpb24sIG9wdGlvbnMpIHtcbiAgbGV0IHJlc3VsdCA9IFtdO1xuXG4gIGZvciAobGV0IGVsZSBvZiBhcnIpIHtcbiAgICBsZXQgeyBzdHJpbmcgfSA9IGVsZTtcblxuICAgIC8vIG9ubHkgcHVzaCBpZiBfYm90aF8gYXJlIG5lZ2F0aXZlLi4uXG4gICAgaWYgKCFpbnRlcnNlY3Rpb24gJiYgIWNvbnRhaW5zKGNvbXBhcmlzb24sICdzdHJpbmcnLCBzdHJpbmcpKSB7XG4gICAgICByZXN1bHQucHVzaChwcmVmaXggKyBzdHJpbmcpO1xuICAgIH1cblxuICAgIC8vIG9yIF9ib3RoXyBhcmUgcG9zaXRpdmVcbiAgICBpZiAoaW50ZXJzZWN0aW9uICYmIGNvbnRhaW5zKGNvbXBhcmlzb24sICdzdHJpbmcnLCBzdHJpbmcpKSB7XG4gICAgICByZXN1bHQucHVzaChwcmVmaXggKyBzdHJpbmcpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFppcCBzdHJpbmdzXG4gKi9cblxuZnVuY3Rpb24gemlwKGEsIGIpIHtcbiAgbGV0IGFyciA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIGFyci5wdXNoKFthW2ldLCBiW2ldXSk7XG4gIHJldHVybiBhcnI7XG59XG5cbmZ1bmN0aW9uIGNvbXBhcmUoYSwgYikge1xuICByZXR1cm4gYSA+IGIgPyAxIDogYiA+IGEgPyAtMSA6IDA7XG59XG5cbmZ1bmN0aW9uIGNvbnRhaW5zKGFyciwga2V5LCB2YWwpIHtcbiAgcmV0dXJuIGFyci5zb21lKGVsZSA9PiBlbGVba2V5XSA9PT0gdmFsKTtcbn1cblxuZnVuY3Rpb24gY291bnROaW5lcyhtaW4sIGxlbikge1xuICByZXR1cm4gTnVtYmVyKFN0cmluZyhtaW4pLnNsaWNlKDAsIC1sZW4pICsgJzknLnJlcGVhdChsZW4pKTtcbn1cblxuZnVuY3Rpb24gY291bnRaZXJvcyhpbnRlZ2VyLCB6ZXJvcykge1xuICByZXR1cm4gaW50ZWdlciAtIChpbnRlZ2VyICUgTWF0aC5wb3coMTAsIHplcm9zKSk7XG59XG5cbmZ1bmN0aW9uIHRvUXVhbnRpZmllcihkaWdpdHMpIHtcbiAgbGV0IFtzdGFydCA9IDAsIHN0b3AgPSAnJ10gPSBkaWdpdHM7XG4gIGlmIChzdG9wIHx8IHN0YXJ0ID4gMSkge1xuICAgIHJldHVybiBgeyR7c3RhcnQgKyAoc3RvcCA/ICcsJyArIHN0b3AgOiAnJyl9fWA7XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG5mdW5jdGlvbiB0b0NoYXJhY3RlckNsYXNzKGEsIGIsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIGBbJHthfSR7KGIgLSBhID09PSAxKSA/ICcnIDogJy0nfSR7Yn1dYDtcbn1cblxuZnVuY3Rpb24gaGFzUGFkZGluZyhzdHIpIHtcbiAgcmV0dXJuIC9eLT8oMCspXFxkLy50ZXN0KHN0cik7XG59XG5cbmZ1bmN0aW9uIHBhZFplcm9zKHZhbHVlLCB0b2ssIG9wdGlvbnMpIHtcbiAgaWYgKCF0b2suaXNQYWRkZWQpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBsZXQgZGlmZiA9IE1hdGguYWJzKHRvay5tYXhMZW4gLSBTdHJpbmcodmFsdWUpLmxlbmd0aCk7XG4gIGxldCByZWxheCA9IG9wdGlvbnMucmVsYXhaZXJvcyAhPT0gZmFsc2U7XG5cbiAgc3dpdGNoIChkaWZmKSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuICcnO1xuICAgIGNhc2UgMTpcbiAgICAgIHJldHVybiByZWxheCA/ICcwPycgOiAnMCc7XG4gICAgY2FzZSAyOlxuICAgICAgcmV0dXJuIHJlbGF4ID8gJzB7MCwyfScgOiAnMDAnO1xuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHJldHVybiByZWxheCA/IGAwezAsJHtkaWZmfX1gIDogYDB7JHtkaWZmfX1gO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIENhY2hlXG4gKi9cblxudG9SZWdleFJhbmdlLmNhY2hlID0ge307XG50b1JlZ2V4UmFuZ2UuY2xlYXJDYWNoZSA9ICgpID0+ICh0b1JlZ2V4UmFuZ2UuY2FjaGUgPSB7fSk7XG5cbi8qKlxuICogRXhwb3NlIGB0b1JlZ2V4UmFuZ2VgXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSB0b1JlZ2V4UmFuZ2U7XG4iLCAiLyohXG4gKiBmaWxsLXJhbmdlIDxodHRwczovL2dpdGh1Yi5jb20vam9uc2NobGlua2VydC9maWxsLXJhbmdlPlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBKb24gU2NobGlua2VydC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmNvbnN0IHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG5jb25zdCB0b1JlZ2V4UmFuZ2UgPSByZXF1aXJlKCd0by1yZWdleC1yYW5nZScpO1xuXG5jb25zdCBpc09iamVjdCA9IHZhbCA9PiB2YWwgIT09IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkodmFsKTtcblxuY29uc3QgdHJhbnNmb3JtID0gdG9OdW1iZXIgPT4ge1xuICByZXR1cm4gdmFsdWUgPT4gdG9OdW1iZXIgPT09IHRydWUgPyBOdW1iZXIodmFsdWUpIDogU3RyaW5nKHZhbHVlKTtcbn07XG5cbmNvbnN0IGlzVmFsaWRWYWx1ZSA9IHZhbHVlID0+IHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgfHwgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUgIT09ICcnKTtcbn07XG5cbmNvbnN0IGlzTnVtYmVyID0gbnVtID0+IE51bWJlci5pc0ludGVnZXIoK251bSk7XG5cbmNvbnN0IHplcm9zID0gaW5wdXQgPT4ge1xuICBsZXQgdmFsdWUgPSBgJHtpbnB1dH1gO1xuICBsZXQgaW5kZXggPSAtMTtcbiAgaWYgKHZhbHVlWzBdID09PSAnLScpIHZhbHVlID0gdmFsdWUuc2xpY2UoMSk7XG4gIGlmICh2YWx1ZSA9PT0gJzAnKSByZXR1cm4gZmFsc2U7XG4gIHdoaWxlICh2YWx1ZVsrK2luZGV4XSA9PT0gJzAnKTtcbiAgcmV0dXJuIGluZGV4ID4gMDtcbn07XG5cbmNvbnN0IHN0cmluZ2lmeSA9IChzdGFydCwgZW5kLCBvcHRpb25zKSA9PiB7XG4gIGlmICh0eXBlb2Ygc3RhcnQgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBlbmQgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIG9wdGlvbnMuc3RyaW5naWZ5ID09PSB0cnVlO1xufTtcblxuY29uc3QgcGFkID0gKGlucHV0LCBtYXhMZW5ndGgsIHRvTnVtYmVyKSA9PiB7XG4gIGlmIChtYXhMZW5ndGggPiAwKSB7XG4gICAgbGV0IGRhc2ggPSBpbnB1dFswXSA9PT0gJy0nID8gJy0nIDogJyc7XG4gICAgaWYgKGRhc2gpIGlucHV0ID0gaW5wdXQuc2xpY2UoMSk7XG4gICAgaW5wdXQgPSAoZGFzaCArIGlucHV0LnBhZFN0YXJ0KGRhc2ggPyBtYXhMZW5ndGggLSAxIDogbWF4TGVuZ3RoLCAnMCcpKTtcbiAgfVxuICBpZiAodG9OdW1iZXIgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIFN0cmluZyhpbnB1dCk7XG4gIH1cbiAgcmV0dXJuIGlucHV0O1xufTtcblxuY29uc3QgdG9NYXhMZW4gPSAoaW5wdXQsIG1heExlbmd0aCkgPT4ge1xuICBsZXQgbmVnYXRpdmUgPSBpbnB1dFswXSA9PT0gJy0nID8gJy0nIDogJyc7XG4gIGlmIChuZWdhdGl2ZSkge1xuICAgIGlucHV0ID0gaW5wdXQuc2xpY2UoMSk7XG4gICAgbWF4TGVuZ3RoLS07XG4gIH1cbiAgd2hpbGUgKGlucHV0Lmxlbmd0aCA8IG1heExlbmd0aCkgaW5wdXQgPSAnMCcgKyBpbnB1dDtcbiAgcmV0dXJuIG5lZ2F0aXZlID8gKCctJyArIGlucHV0KSA6IGlucHV0O1xufTtcblxuY29uc3QgdG9TZXF1ZW5jZSA9IChwYXJ0cywgb3B0aW9ucywgbWF4TGVuKSA9PiB7XG4gIHBhcnRzLm5lZ2F0aXZlcy5zb3J0KChhLCBiKSA9PiBhIDwgYiA/IC0xIDogYSA+IGIgPyAxIDogMCk7XG4gIHBhcnRzLnBvc2l0aXZlcy5zb3J0KChhLCBiKSA9PiBhIDwgYiA/IC0xIDogYSA+IGIgPyAxIDogMCk7XG5cbiAgbGV0IHByZWZpeCA9IG9wdGlvbnMuY2FwdHVyZSA/ICcnIDogJz86JztcbiAgbGV0IHBvc2l0aXZlcyA9ICcnO1xuICBsZXQgbmVnYXRpdmVzID0gJyc7XG4gIGxldCByZXN1bHQ7XG5cbiAgaWYgKHBhcnRzLnBvc2l0aXZlcy5sZW5ndGgpIHtcbiAgICBwb3NpdGl2ZXMgPSBwYXJ0cy5wb3NpdGl2ZXMubWFwKHYgPT4gdG9NYXhMZW4oU3RyaW5nKHYpLCBtYXhMZW4pKS5qb2luKCd8Jyk7XG4gIH1cblxuICBpZiAocGFydHMubmVnYXRpdmVzLmxlbmd0aCkge1xuICAgIG5lZ2F0aXZlcyA9IGAtKCR7cHJlZml4fSR7cGFydHMubmVnYXRpdmVzLm1hcCh2ID0+IHRvTWF4TGVuKFN0cmluZyh2KSwgbWF4TGVuKSkuam9pbignfCcpfSlgO1xuICB9XG5cbiAgaWYgKHBvc2l0aXZlcyAmJiBuZWdhdGl2ZXMpIHtcbiAgICByZXN1bHQgPSBgJHtwb3NpdGl2ZXN9fCR7bmVnYXRpdmVzfWA7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gcG9zaXRpdmVzIHx8IG5lZ2F0aXZlcztcbiAgfVxuXG4gIGlmIChvcHRpb25zLndyYXApIHtcbiAgICByZXR1cm4gYCgke3ByZWZpeH0ke3Jlc3VsdH0pYDtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5jb25zdCB0b1JhbmdlID0gKGEsIGIsIGlzTnVtYmVycywgb3B0aW9ucykgPT4ge1xuICBpZiAoaXNOdW1iZXJzKSB7XG4gICAgcmV0dXJuIHRvUmVnZXhSYW5nZShhLCBiLCB7IHdyYXA6IGZhbHNlLCAuLi5vcHRpb25zIH0pO1xuICB9XG5cbiAgbGV0IHN0YXJ0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShhKTtcbiAgaWYgKGEgPT09IGIpIHJldHVybiBzdGFydDtcblxuICBsZXQgc3RvcCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoYik7XG4gIHJldHVybiBgWyR7c3RhcnR9LSR7c3RvcH1dYDtcbn07XG5cbmNvbnN0IHRvUmVnZXggPSAoc3RhcnQsIGVuZCwgb3B0aW9ucykgPT4ge1xuICBpZiAoQXJyYXkuaXNBcnJheShzdGFydCkpIHtcbiAgICBsZXQgd3JhcCA9IG9wdGlvbnMud3JhcCA9PT0gdHJ1ZTtcbiAgICBsZXQgcHJlZml4ID0gb3B0aW9ucy5jYXB0dXJlID8gJycgOiAnPzonO1xuICAgIHJldHVybiB3cmFwID8gYCgke3ByZWZpeH0ke3N0YXJ0LmpvaW4oJ3wnKX0pYCA6IHN0YXJ0LmpvaW4oJ3wnKTtcbiAgfVxuICByZXR1cm4gdG9SZWdleFJhbmdlKHN0YXJ0LCBlbmQsIG9wdGlvbnMpO1xufTtcblxuY29uc3QgcmFuZ2VFcnJvciA9ICguLi5hcmdzKSA9PiB7XG4gIHJldHVybiBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCByYW5nZSBhcmd1bWVudHM6ICcgKyB1dGlsLmluc3BlY3QoLi4uYXJncykpO1xufTtcblxuY29uc3QgaW52YWxpZFJhbmdlID0gKHN0YXJ0LCBlbmQsIG9wdGlvbnMpID0+IHtcbiAgaWYgKG9wdGlvbnMuc3RyaWN0UmFuZ2VzID09PSB0cnVlKSB0aHJvdyByYW5nZUVycm9yKFtzdGFydCwgZW5kXSk7XG4gIHJldHVybiBbXTtcbn07XG5cbmNvbnN0IGludmFsaWRTdGVwID0gKHN0ZXAsIG9wdGlvbnMpID0+IHtcbiAgaWYgKG9wdGlvbnMuc3RyaWN0UmFuZ2VzID09PSB0cnVlKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRXhwZWN0ZWQgc3RlcCBcIiR7c3RlcH1cIiB0byBiZSBhIG51bWJlcmApO1xuICB9XG4gIHJldHVybiBbXTtcbn07XG5cbmNvbnN0IGZpbGxOdW1iZXJzID0gKHN0YXJ0LCBlbmQsIHN0ZXAgPSAxLCBvcHRpb25zID0ge30pID0+IHtcbiAgbGV0IGEgPSBOdW1iZXIoc3RhcnQpO1xuICBsZXQgYiA9IE51bWJlcihlbmQpO1xuXG4gIGlmICghTnVtYmVyLmlzSW50ZWdlcihhKSB8fCAhTnVtYmVyLmlzSW50ZWdlcihiKSkge1xuICAgIGlmIChvcHRpb25zLnN0cmljdFJhbmdlcyA9PT0gdHJ1ZSkgdGhyb3cgcmFuZ2VFcnJvcihbc3RhcnQsIGVuZF0pO1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIC8vIGZpeCBuZWdhdGl2ZSB6ZXJvXG4gIGlmIChhID09PSAwKSBhID0gMDtcbiAgaWYgKGIgPT09IDApIGIgPSAwO1xuXG4gIGxldCBkZXNjZW5kaW5nID0gYSA+IGI7XG4gIGxldCBzdGFydFN0cmluZyA9IFN0cmluZyhzdGFydCk7XG4gIGxldCBlbmRTdHJpbmcgPSBTdHJpbmcoZW5kKTtcbiAgbGV0IHN0ZXBTdHJpbmcgPSBTdHJpbmcoc3RlcCk7XG4gIHN0ZXAgPSBNYXRoLm1heChNYXRoLmFicyhzdGVwKSwgMSk7XG5cbiAgbGV0IHBhZGRlZCA9IHplcm9zKHN0YXJ0U3RyaW5nKSB8fCB6ZXJvcyhlbmRTdHJpbmcpIHx8IHplcm9zKHN0ZXBTdHJpbmcpO1xuICBsZXQgbWF4TGVuID0gcGFkZGVkID8gTWF0aC5tYXgoc3RhcnRTdHJpbmcubGVuZ3RoLCBlbmRTdHJpbmcubGVuZ3RoLCBzdGVwU3RyaW5nLmxlbmd0aCkgOiAwO1xuICBsZXQgdG9OdW1iZXIgPSBwYWRkZWQgPT09IGZhbHNlICYmIHN0cmluZ2lmeShzdGFydCwgZW5kLCBvcHRpb25zKSA9PT0gZmFsc2U7XG4gIGxldCBmb3JtYXQgPSBvcHRpb25zLnRyYW5zZm9ybSB8fCB0cmFuc2Zvcm0odG9OdW1iZXIpO1xuXG4gIGlmIChvcHRpb25zLnRvUmVnZXggJiYgc3RlcCA9PT0gMSkge1xuICAgIHJldHVybiB0b1JhbmdlKHRvTWF4TGVuKHN0YXJ0LCBtYXhMZW4pLCB0b01heExlbihlbmQsIG1heExlbiksIHRydWUsIG9wdGlvbnMpO1xuICB9XG5cbiAgbGV0IHBhcnRzID0geyBuZWdhdGl2ZXM6IFtdLCBwb3NpdGl2ZXM6IFtdIH07XG4gIGxldCBwdXNoID0gbnVtID0+IHBhcnRzW251bSA8IDAgPyAnbmVnYXRpdmVzJyA6ICdwb3NpdGl2ZXMnXS5wdXNoKE1hdGguYWJzKG51bSkpO1xuICBsZXQgcmFuZ2UgPSBbXTtcbiAgbGV0IGluZGV4ID0gMDtcblxuICB3aGlsZSAoZGVzY2VuZGluZyA/IGEgPj0gYiA6IGEgPD0gYikge1xuICAgIGlmIChvcHRpb25zLnRvUmVnZXggPT09IHRydWUgJiYgc3RlcCA+IDEpIHtcbiAgICAgIHB1c2goYSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJhbmdlLnB1c2gocGFkKGZvcm1hdChhLCBpbmRleCksIG1heExlbiwgdG9OdW1iZXIpKTtcbiAgICB9XG4gICAgYSA9IGRlc2NlbmRpbmcgPyBhIC0gc3RlcCA6IGEgKyBzdGVwO1xuICAgIGluZGV4Kys7XG4gIH1cblxuICBpZiAob3B0aW9ucy50b1JlZ2V4ID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIHN0ZXAgPiAxXG4gICAgICA/IHRvU2VxdWVuY2UocGFydHMsIG9wdGlvbnMsIG1heExlbilcbiAgICAgIDogdG9SZWdleChyYW5nZSwgbnVsbCwgeyB3cmFwOiBmYWxzZSwgLi4ub3B0aW9ucyB9KTtcbiAgfVxuXG4gIHJldHVybiByYW5nZTtcbn07XG5cbmNvbnN0IGZpbGxMZXR0ZXJzID0gKHN0YXJ0LCBlbmQsIHN0ZXAgPSAxLCBvcHRpb25zID0ge30pID0+IHtcbiAgaWYgKCghaXNOdW1iZXIoc3RhcnQpICYmIHN0YXJ0Lmxlbmd0aCA+IDEpIHx8ICghaXNOdW1iZXIoZW5kKSAmJiBlbmQubGVuZ3RoID4gMSkpIHtcbiAgICByZXR1cm4gaW52YWxpZFJhbmdlKHN0YXJ0LCBlbmQsIG9wdGlvbnMpO1xuICB9XG5cbiAgbGV0IGZvcm1hdCA9IG9wdGlvbnMudHJhbnNmb3JtIHx8ICh2YWwgPT4gU3RyaW5nLmZyb21DaGFyQ29kZSh2YWwpKTtcbiAgbGV0IGEgPSBgJHtzdGFydH1gLmNoYXJDb2RlQXQoMCk7XG4gIGxldCBiID0gYCR7ZW5kfWAuY2hhckNvZGVBdCgwKTtcblxuICBsZXQgZGVzY2VuZGluZyA9IGEgPiBiO1xuICBsZXQgbWluID0gTWF0aC5taW4oYSwgYik7XG4gIGxldCBtYXggPSBNYXRoLm1heChhLCBiKTtcblxuICBpZiAob3B0aW9ucy50b1JlZ2V4ICYmIHN0ZXAgPT09IDEpIHtcbiAgICByZXR1cm4gdG9SYW5nZShtaW4sIG1heCwgZmFsc2UsIG9wdGlvbnMpO1xuICB9XG5cbiAgbGV0IHJhbmdlID0gW107XG4gIGxldCBpbmRleCA9IDA7XG5cbiAgd2hpbGUgKGRlc2NlbmRpbmcgPyBhID49IGIgOiBhIDw9IGIpIHtcbiAgICByYW5nZS5wdXNoKGZvcm1hdChhLCBpbmRleCkpO1xuICAgIGEgPSBkZXNjZW5kaW5nID8gYSAtIHN0ZXAgOiBhICsgc3RlcDtcbiAgICBpbmRleCsrO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMudG9SZWdleCA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiB0b1JlZ2V4KHJhbmdlLCBudWxsLCB7IHdyYXA6IGZhbHNlLCBvcHRpb25zIH0pO1xuICB9XG5cbiAgcmV0dXJuIHJhbmdlO1xufTtcblxuY29uc3QgZmlsbCA9IChzdGFydCwgZW5kLCBzdGVwLCBvcHRpb25zID0ge30pID0+IHtcbiAgaWYgKGVuZCA9PSBudWxsICYmIGlzVmFsaWRWYWx1ZShzdGFydCkpIHtcbiAgICByZXR1cm4gW3N0YXJ0XTtcbiAgfVxuXG4gIGlmICghaXNWYWxpZFZhbHVlKHN0YXJ0KSB8fCAhaXNWYWxpZFZhbHVlKGVuZCkpIHtcbiAgICByZXR1cm4gaW52YWxpZFJhbmdlKHN0YXJ0LCBlbmQsIG9wdGlvbnMpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBzdGVwID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGZpbGwoc3RhcnQsIGVuZCwgMSwgeyB0cmFuc2Zvcm06IHN0ZXAgfSk7XG4gIH1cblxuICBpZiAoaXNPYmplY3Qoc3RlcCkpIHtcbiAgICByZXR1cm4gZmlsbChzdGFydCwgZW5kLCAwLCBzdGVwKTtcbiAgfVxuXG4gIGxldCBvcHRzID0geyAuLi5vcHRpb25zIH07XG4gIGlmIChvcHRzLmNhcHR1cmUgPT09IHRydWUpIG9wdHMud3JhcCA9IHRydWU7XG4gIHN0ZXAgPSBzdGVwIHx8IG9wdHMuc3RlcCB8fCAxO1xuXG4gIGlmICghaXNOdW1iZXIoc3RlcCkpIHtcbiAgICBpZiAoc3RlcCAhPSBudWxsICYmICFpc09iamVjdChzdGVwKSkgcmV0dXJuIGludmFsaWRTdGVwKHN0ZXAsIG9wdHMpO1xuICAgIHJldHVybiBmaWxsKHN0YXJ0LCBlbmQsIDEsIHN0ZXApO1xuICB9XG5cbiAgaWYgKGlzTnVtYmVyKHN0YXJ0KSAmJiBpc051bWJlcihlbmQpKSB7XG4gICAgcmV0dXJuIGZpbGxOdW1iZXJzKHN0YXJ0LCBlbmQsIHN0ZXAsIG9wdHMpO1xuICB9XG5cbiAgcmV0dXJuIGZpbGxMZXR0ZXJzKHN0YXJ0LCBlbmQsIE1hdGgubWF4KE1hdGguYWJzKHN0ZXApLCAxKSwgb3B0cyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZpbGw7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBmaWxsID0gcmVxdWlyZSgnZmlsbC1yYW5nZScpO1xuY29uc3QgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbmNvbnN0IGNvbXBpbGUgPSAoYXN0LCBvcHRpb25zID0ge30pID0+IHtcbiAgY29uc3Qgd2FsayA9IChub2RlLCBwYXJlbnQgPSB7fSkgPT4ge1xuICAgIGNvbnN0IGludmFsaWRCbG9jayA9IHV0aWxzLmlzSW52YWxpZEJyYWNlKHBhcmVudCk7XG4gICAgY29uc3QgaW52YWxpZE5vZGUgPSBub2RlLmludmFsaWQgPT09IHRydWUgJiYgb3B0aW9ucy5lc2NhcGVJbnZhbGlkID09PSB0cnVlO1xuICAgIGNvbnN0IGludmFsaWQgPSBpbnZhbGlkQmxvY2sgPT09IHRydWUgfHwgaW52YWxpZE5vZGUgPT09IHRydWU7XG4gICAgY29uc3QgcHJlZml4ID0gb3B0aW9ucy5lc2NhcGVJbnZhbGlkID09PSB0cnVlID8gJ1xcXFwnIDogJyc7XG4gICAgbGV0IG91dHB1dCA9ICcnO1xuXG4gICAgaWYgKG5vZGUuaXNPcGVuID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gcHJlZml4ICsgbm9kZS52YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAobm9kZS5pc0Nsb3NlID09PSB0cnVlKSB7XG4gICAgICBjb25zb2xlLmxvZygnbm9kZS5pc0Nsb3NlJywgcHJlZml4LCBub2RlLnZhbHVlKTtcbiAgICAgIHJldHVybiBwcmVmaXggKyBub2RlLnZhbHVlO1xuICAgIH1cblxuICAgIGlmIChub2RlLnR5cGUgPT09ICdvcGVuJykge1xuICAgICAgcmV0dXJuIGludmFsaWQgPyBwcmVmaXggKyBub2RlLnZhbHVlIDogJygnO1xuICAgIH1cblxuICAgIGlmIChub2RlLnR5cGUgPT09ICdjbG9zZScpIHtcbiAgICAgIHJldHVybiBpbnZhbGlkID8gcHJlZml4ICsgbm9kZS52YWx1ZSA6ICcpJztcbiAgICB9XG5cbiAgICBpZiAobm9kZS50eXBlID09PSAnY29tbWEnKSB7XG4gICAgICByZXR1cm4gbm9kZS5wcmV2LnR5cGUgPT09ICdjb21tYScgPyAnJyA6IGludmFsaWQgPyBub2RlLnZhbHVlIDogJ3wnO1xuICAgIH1cblxuICAgIGlmIChub2RlLnZhbHVlKSB7XG4gICAgICByZXR1cm4gbm9kZS52YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAobm9kZS5ub2RlcyAmJiBub2RlLnJhbmdlcyA+IDApIHtcbiAgICAgIGNvbnN0IGFyZ3MgPSB1dGlscy5yZWR1Y2Uobm9kZS5ub2Rlcyk7XG4gICAgICBjb25zdCByYW5nZSA9IGZpbGwoLi4uYXJncywgeyAuLi5vcHRpb25zLCB3cmFwOiBmYWxzZSwgdG9SZWdleDogdHJ1ZSwgc3RyaWN0WmVyb3M6IHRydWUgfSk7XG5cbiAgICAgIGlmIChyYW5nZS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgcmV0dXJuIGFyZ3MubGVuZ3RoID4gMSAmJiByYW5nZS5sZW5ndGggPiAxID8gYCgke3JhbmdlfSlgIDogcmFuZ2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG5vZGUubm9kZXMpIHtcbiAgICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygbm9kZS5ub2Rlcykge1xuICAgICAgICBvdXRwdXQgKz0gd2FsayhjaGlsZCwgbm9kZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfTtcblxuICByZXR1cm4gd2Fsayhhc3QpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb21waWxlO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZmlsbCA9IHJlcXVpcmUoJ2ZpbGwtcmFuZ2UnKTtcbmNvbnN0IHN0cmluZ2lmeSA9IHJlcXVpcmUoJy4vc3RyaW5naWZ5Jyk7XG5jb25zdCB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxuY29uc3QgYXBwZW5kID0gKHF1ZXVlID0gJycsIHN0YXNoID0gJycsIGVuY2xvc2UgPSBmYWxzZSkgPT4ge1xuICBjb25zdCByZXN1bHQgPSBbXTtcblxuICBxdWV1ZSA9IFtdLmNvbmNhdChxdWV1ZSk7XG4gIHN0YXNoID0gW10uY29uY2F0KHN0YXNoKTtcblxuICBpZiAoIXN0YXNoLmxlbmd0aCkgcmV0dXJuIHF1ZXVlO1xuICBpZiAoIXF1ZXVlLmxlbmd0aCkge1xuICAgIHJldHVybiBlbmNsb3NlID8gdXRpbHMuZmxhdHRlbihzdGFzaCkubWFwKGVsZSA9PiBgeyR7ZWxlfX1gKSA6IHN0YXNoO1xuICB9XG5cbiAgZm9yIChjb25zdCBpdGVtIG9mIHF1ZXVlKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcbiAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgaXRlbSkge1xuICAgICAgICByZXN1bHQucHVzaChhcHBlbmQodmFsdWUsIHN0YXNoLCBlbmNsb3NlKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGVsZSBvZiBzdGFzaCkge1xuICAgICAgICBpZiAoZW5jbG9zZSA9PT0gdHJ1ZSAmJiB0eXBlb2YgZWxlID09PSAnc3RyaW5nJykgZWxlID0gYHske2VsZX19YDtcbiAgICAgICAgcmVzdWx0LnB1c2goQXJyYXkuaXNBcnJheShlbGUpID8gYXBwZW5kKGl0ZW0sIGVsZSwgZW5jbG9zZSkgOiBpdGVtICsgZWxlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHV0aWxzLmZsYXR0ZW4ocmVzdWx0KTtcbn07XG5cbmNvbnN0IGV4cGFuZCA9IChhc3QsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICBjb25zdCByYW5nZUxpbWl0ID0gb3B0aW9ucy5yYW5nZUxpbWl0ID09PSB1bmRlZmluZWQgPyAxMDAwIDogb3B0aW9ucy5yYW5nZUxpbWl0O1xuXG4gIGNvbnN0IHdhbGsgPSAobm9kZSwgcGFyZW50ID0ge30pID0+IHtcbiAgICBub2RlLnF1ZXVlID0gW107XG5cbiAgICBsZXQgcCA9IHBhcmVudDtcbiAgICBsZXQgcSA9IHBhcmVudC5xdWV1ZTtcblxuICAgIHdoaWxlIChwLnR5cGUgIT09ICdicmFjZScgJiYgcC50eXBlICE9PSAncm9vdCcgJiYgcC5wYXJlbnQpIHtcbiAgICAgIHAgPSBwLnBhcmVudDtcbiAgICAgIHEgPSBwLnF1ZXVlO1xuICAgIH1cblxuICAgIGlmIChub2RlLmludmFsaWQgfHwgbm9kZS5kb2xsYXIpIHtcbiAgICAgIHEucHVzaChhcHBlbmQocS5wb3AoKSwgc3RyaW5naWZ5KG5vZGUsIG9wdGlvbnMpKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKG5vZGUudHlwZSA9PT0gJ2JyYWNlJyAmJiBub2RlLmludmFsaWQgIT09IHRydWUgJiYgbm9kZS5ub2Rlcy5sZW5ndGggPT09IDIpIHtcbiAgICAgIHEucHVzaChhcHBlbmQocS5wb3AoKSwgWyd7fSddKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKG5vZGUubm9kZXMgJiYgbm9kZS5yYW5nZXMgPiAwKSB7XG4gICAgICBjb25zdCBhcmdzID0gdXRpbHMucmVkdWNlKG5vZGUubm9kZXMpO1xuXG4gICAgICBpZiAodXRpbHMuZXhjZWVkc0xpbWl0KC4uLmFyZ3MsIG9wdGlvbnMuc3RlcCwgcmFuZ2VMaW1pdCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ2V4cGFuZGVkIGFycmF5IGxlbmd0aCBleGNlZWRzIHJhbmdlIGxpbWl0LiBVc2Ugb3B0aW9ucy5yYW5nZUxpbWl0IHRvIGluY3JlYXNlIG9yIGRpc2FibGUgdGhlIGxpbWl0LicpO1xuICAgICAgfVxuXG4gICAgICBsZXQgcmFuZ2UgPSBmaWxsKC4uLmFyZ3MsIG9wdGlvbnMpO1xuICAgICAgaWYgKHJhbmdlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByYW5nZSA9IHN0cmluZ2lmeShub2RlLCBvcHRpb25zKTtcbiAgICAgIH1cblxuICAgICAgcS5wdXNoKGFwcGVuZChxLnBvcCgpLCByYW5nZSkpO1xuICAgICAgbm9kZS5ub2RlcyA9IFtdO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGVuY2xvc2UgPSB1dGlscy5lbmNsb3NlQnJhY2Uobm9kZSk7XG4gICAgbGV0IHF1ZXVlID0gbm9kZS5xdWV1ZTtcbiAgICBsZXQgYmxvY2sgPSBub2RlO1xuXG4gICAgd2hpbGUgKGJsb2NrLnR5cGUgIT09ICdicmFjZScgJiYgYmxvY2sudHlwZSAhPT0gJ3Jvb3QnICYmIGJsb2NrLnBhcmVudCkge1xuICAgICAgYmxvY2sgPSBibG9jay5wYXJlbnQ7XG4gICAgICBxdWV1ZSA9IGJsb2NrLnF1ZXVlO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZS5ub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgY2hpbGQgPSBub2RlLm5vZGVzW2ldO1xuXG4gICAgICBpZiAoY2hpbGQudHlwZSA9PT0gJ2NvbW1hJyAmJiBub2RlLnR5cGUgPT09ICdicmFjZScpIHtcbiAgICAgICAgaWYgKGkgPT09IDEpIHF1ZXVlLnB1c2goJycpO1xuICAgICAgICBxdWV1ZS5wdXNoKCcnKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChjaGlsZC50eXBlID09PSAnY2xvc2UnKSB7XG4gICAgICAgIHEucHVzaChhcHBlbmQocS5wb3AoKSwgcXVldWUsIGVuY2xvc2UpKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChjaGlsZC52YWx1ZSAmJiBjaGlsZC50eXBlICE9PSAnb3BlbicpIHtcbiAgICAgICAgcXVldWUucHVzaChhcHBlbmQocXVldWUucG9wKCksIGNoaWxkLnZhbHVlKSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2hpbGQubm9kZXMpIHtcbiAgICAgICAgd2FsayhjaGlsZCwgbm9kZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHF1ZXVlO1xuICB9O1xuXG4gIHJldHVybiB1dGlscy5mbGF0dGVuKHdhbGsoYXN0KSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cGFuZDtcbiIsICIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBNQVhfTEVOR1RIOiAxMDAwMCxcblxuICAvLyBEaWdpdHNcbiAgQ0hBUl8wOiAnMCcsIC8qIDAgKi9cbiAgQ0hBUl85OiAnOScsIC8qIDkgKi9cblxuICAvLyBBbHBoYWJldCBjaGFycy5cbiAgQ0hBUl9VUFBFUkNBU0VfQTogJ0EnLCAvKiBBICovXG4gIENIQVJfTE9XRVJDQVNFX0E6ICdhJywgLyogYSAqL1xuICBDSEFSX1VQUEVSQ0FTRV9aOiAnWicsIC8qIFogKi9cbiAgQ0hBUl9MT1dFUkNBU0VfWjogJ3onLCAvKiB6ICovXG5cbiAgQ0hBUl9MRUZUX1BBUkVOVEhFU0VTOiAnKCcsIC8qICggKi9cbiAgQ0hBUl9SSUdIVF9QQVJFTlRIRVNFUzogJyknLCAvKiApICovXG5cbiAgQ0hBUl9BU1RFUklTSzogJyonLCAvKiAqICovXG5cbiAgLy8gTm9uLWFscGhhYmV0aWMgY2hhcnMuXG4gIENIQVJfQU1QRVJTQU5EOiAnJicsIC8qICYgKi9cbiAgQ0hBUl9BVDogJ0AnLCAvKiBAICovXG4gIENIQVJfQkFDS1NMQVNIOiAnXFxcXCcsIC8qIFxcICovXG4gIENIQVJfQkFDS1RJQ0s6ICdgJywgLyogYCAqL1xuICBDSEFSX0NBUlJJQUdFX1JFVFVSTjogJ1xccicsIC8qIFxcciAqL1xuICBDSEFSX0NJUkNVTUZMRVhfQUNDRU5UOiAnXicsIC8qIF4gKi9cbiAgQ0hBUl9DT0xPTjogJzonLCAvKiA6ICovXG4gIENIQVJfQ09NTUE6ICcsJywgLyogLCAqL1xuICBDSEFSX0RPTExBUjogJyQnLCAvKiAuICovXG4gIENIQVJfRE9UOiAnLicsIC8qIC4gKi9cbiAgQ0hBUl9ET1VCTEVfUVVPVEU6ICdcIicsIC8qIFwiICovXG4gIENIQVJfRVFVQUw6ICc9JywgLyogPSAqL1xuICBDSEFSX0VYQ0xBTUFUSU9OX01BUks6ICchJywgLyogISAqL1xuICBDSEFSX0ZPUk1fRkVFRDogJ1xcZicsIC8qIFxcZiAqL1xuICBDSEFSX0ZPUldBUkRfU0xBU0g6ICcvJywgLyogLyAqL1xuICBDSEFSX0hBU0g6ICcjJywgLyogIyAqL1xuICBDSEFSX0hZUEhFTl9NSU5VUzogJy0nLCAvKiAtICovXG4gIENIQVJfTEVGVF9BTkdMRV9CUkFDS0VUOiAnPCcsIC8qIDwgKi9cbiAgQ0hBUl9MRUZUX0NVUkxZX0JSQUNFOiAneycsIC8qIHsgKi9cbiAgQ0hBUl9MRUZUX1NRVUFSRV9CUkFDS0VUOiAnWycsIC8qIFsgKi9cbiAgQ0hBUl9MSU5FX0ZFRUQ6ICdcXG4nLCAvKiBcXG4gKi9cbiAgQ0hBUl9OT19CUkVBS19TUEFDRTogJ1xcdTAwQTAnLCAvKiBcXHUwMEEwICovXG4gIENIQVJfUEVSQ0VOVDogJyUnLCAvKiAlICovXG4gIENIQVJfUExVUzogJysnLCAvKiArICovXG4gIENIQVJfUVVFU1RJT05fTUFSSzogJz8nLCAvKiA/ICovXG4gIENIQVJfUklHSFRfQU5HTEVfQlJBQ0tFVDogJz4nLCAvKiA+ICovXG4gIENIQVJfUklHSFRfQ1VSTFlfQlJBQ0U6ICd9JywgLyogfSAqL1xuICBDSEFSX1JJR0hUX1NRVUFSRV9CUkFDS0VUOiAnXScsIC8qIF0gKi9cbiAgQ0hBUl9TRU1JQ09MT046ICc7JywgLyogOyAqL1xuICBDSEFSX1NJTkdMRV9RVU9URTogJ1xcJycsIC8qICcgKi9cbiAgQ0hBUl9TUEFDRTogJyAnLCAvKiAgICovXG4gIENIQVJfVEFCOiAnXFx0JywgLyogXFx0ICovXG4gIENIQVJfVU5ERVJTQ09SRTogJ18nLCAvKiBfICovXG4gIENIQVJfVkVSVElDQUxfTElORTogJ3wnLCAvKiB8ICovXG4gIENIQVJfWkVST19XSURUSF9OT0JSRUFLX1NQQUNFOiAnXFx1RkVGRicgLyogXFx1RkVGRiAqL1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHN0cmluZ2lmeSA9IHJlcXVpcmUoJy4vc3RyaW5naWZ5Jyk7XG5cbi8qKlxuICogQ29uc3RhbnRzXG4gKi9cblxuY29uc3Qge1xuICBNQVhfTEVOR1RILFxuICBDSEFSX0JBQ0tTTEFTSCwgLyogXFwgKi9cbiAgQ0hBUl9CQUNLVElDSywgLyogYCAqL1xuICBDSEFSX0NPTU1BLCAvKiAsICovXG4gIENIQVJfRE9ULCAvKiAuICovXG4gIENIQVJfTEVGVF9QQVJFTlRIRVNFUywgLyogKCAqL1xuICBDSEFSX1JJR0hUX1BBUkVOVEhFU0VTLCAvKiApICovXG4gIENIQVJfTEVGVF9DVVJMWV9CUkFDRSwgLyogeyAqL1xuICBDSEFSX1JJR0hUX0NVUkxZX0JSQUNFLCAvKiB9ICovXG4gIENIQVJfTEVGVF9TUVVBUkVfQlJBQ0tFVCwgLyogWyAqL1xuICBDSEFSX1JJR0hUX1NRVUFSRV9CUkFDS0VULCAvKiBdICovXG4gIENIQVJfRE9VQkxFX1FVT1RFLCAvKiBcIiAqL1xuICBDSEFSX1NJTkdMRV9RVU9URSwgLyogJyAqL1xuICBDSEFSX05PX0JSRUFLX1NQQUNFLFxuICBDSEFSX1pFUk9fV0lEVEhfTk9CUkVBS19TUEFDRVxufSA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG5cbi8qKlxuICogcGFyc2VcbiAqL1xuXG5jb25zdCBwYXJzZSA9IChpbnB1dCwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGlmICh0eXBlb2YgaW5wdXQgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBzdHJpbmcnKTtcbiAgfVxuXG4gIGNvbnN0IG9wdHMgPSBvcHRpb25zIHx8IHt9O1xuICBjb25zdCBtYXggPSB0eXBlb2Ygb3B0cy5tYXhMZW5ndGggPT09ICdudW1iZXInID8gTWF0aC5taW4oTUFYX0xFTkdUSCwgb3B0cy5tYXhMZW5ndGgpIDogTUFYX0xFTkdUSDtcbiAgaWYgKGlucHV0Lmxlbmd0aCA+IG1heCkge1xuICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgSW5wdXQgbGVuZ3RoICgke2lucHV0Lmxlbmd0aH0pLCBleGNlZWRzIG1heCBjaGFyYWN0ZXJzICgke21heH0pYCk7XG4gIH1cblxuICBjb25zdCBhc3QgPSB7IHR5cGU6ICdyb290JywgaW5wdXQsIG5vZGVzOiBbXSB9O1xuICBjb25zdCBzdGFjayA9IFthc3RdO1xuICBsZXQgYmxvY2sgPSBhc3Q7XG4gIGxldCBwcmV2ID0gYXN0O1xuICBsZXQgYnJhY2tldHMgPSAwO1xuICBjb25zdCBsZW5ndGggPSBpbnB1dC5sZW5ndGg7XG4gIGxldCBpbmRleCA9IDA7XG4gIGxldCBkZXB0aCA9IDA7XG4gIGxldCB2YWx1ZTtcblxuICAvKipcbiAgICogSGVscGVyc1xuICAgKi9cblxuICBjb25zdCBhZHZhbmNlID0gKCkgPT4gaW5wdXRbaW5kZXgrK107XG4gIGNvbnN0IHB1c2ggPSBub2RlID0+IHtcbiAgICBpZiAobm9kZS50eXBlID09PSAndGV4dCcgJiYgcHJldi50eXBlID09PSAnZG90Jykge1xuICAgICAgcHJldi50eXBlID0gJ3RleHQnO1xuICAgIH1cblxuICAgIGlmIChwcmV2ICYmIHByZXYudHlwZSA9PT0gJ3RleHQnICYmIG5vZGUudHlwZSA9PT0gJ3RleHQnKSB7XG4gICAgICBwcmV2LnZhbHVlICs9IG5vZGUudmFsdWU7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYmxvY2subm9kZXMucHVzaChub2RlKTtcbiAgICBub2RlLnBhcmVudCA9IGJsb2NrO1xuICAgIG5vZGUucHJldiA9IHByZXY7XG4gICAgcHJldiA9IG5vZGU7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH07XG5cbiAgcHVzaCh7IHR5cGU6ICdib3MnIH0pO1xuXG4gIHdoaWxlIChpbmRleCA8IGxlbmd0aCkge1xuICAgIGJsb2NrID0gc3RhY2tbc3RhY2subGVuZ3RoIC0gMV07XG4gICAgdmFsdWUgPSBhZHZhbmNlKCk7XG5cbiAgICAvKipcbiAgICAgKiBJbnZhbGlkIGNoYXJzXG4gICAgICovXG5cbiAgICBpZiAodmFsdWUgPT09IENIQVJfWkVST19XSURUSF9OT0JSRUFLX1NQQUNFIHx8IHZhbHVlID09PSBDSEFSX05PX0JSRUFLX1NQQUNFKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFc2NhcGVkIGNoYXJzXG4gICAgICovXG5cbiAgICBpZiAodmFsdWUgPT09IENIQVJfQkFDS1NMQVNIKSB7XG4gICAgICBwdXNoKHsgdHlwZTogJ3RleHQnLCB2YWx1ZTogKG9wdGlvbnMua2VlcEVzY2FwaW5nID8gdmFsdWUgOiAnJykgKyBhZHZhbmNlKCkgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSaWdodCBzcXVhcmUgYnJhY2tldCAobGl0ZXJhbCk6ICddJ1xuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlID09PSBDSEFSX1JJR0hUX1NRVUFSRV9CUkFDS0VUKSB7XG4gICAgICBwdXNoKHsgdHlwZTogJ3RleHQnLCB2YWx1ZTogJ1xcXFwnICsgdmFsdWUgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMZWZ0IHNxdWFyZSBicmFja2V0OiAnWydcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gQ0hBUl9MRUZUX1NRVUFSRV9CUkFDS0VUKSB7XG4gICAgICBicmFja2V0cysrO1xuXG4gICAgICBsZXQgbmV4dDtcblxuICAgICAgd2hpbGUgKGluZGV4IDwgbGVuZ3RoICYmIChuZXh0ID0gYWR2YW5jZSgpKSkge1xuICAgICAgICB2YWx1ZSArPSBuZXh0O1xuXG4gICAgICAgIGlmIChuZXh0ID09PSBDSEFSX0xFRlRfU1FVQVJFX0JSQUNLRVQpIHtcbiAgICAgICAgICBicmFja2V0cysrO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5leHQgPT09IENIQVJfQkFDS1NMQVNIKSB7XG4gICAgICAgICAgdmFsdWUgKz0gYWR2YW5jZSgpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5leHQgPT09IENIQVJfUklHSFRfU1FVQVJFX0JSQUNLRVQpIHtcbiAgICAgICAgICBicmFja2V0cy0tO1xuXG4gICAgICAgICAgaWYgKGJyYWNrZXRzID09PSAwKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWUgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJlbnRoZXNlc1xuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlID09PSBDSEFSX0xFRlRfUEFSRU5USEVTRVMpIHtcbiAgICAgIGJsb2NrID0gcHVzaCh7IHR5cGU6ICdwYXJlbicsIG5vZGVzOiBbXSB9KTtcbiAgICAgIHN0YWNrLnB1c2goYmxvY2spO1xuICAgICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWUgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUgPT09IENIQVJfUklHSFRfUEFSRU5USEVTRVMpIHtcbiAgICAgIGlmIChibG9jay50eXBlICE9PSAncGFyZW4nKSB7XG4gICAgICAgIHB1c2goeyB0eXBlOiAndGV4dCcsIHZhbHVlIH0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGJsb2NrID0gc3RhY2sucG9wKCk7XG4gICAgICBwdXNoKHsgdHlwZTogJ3RleHQnLCB2YWx1ZSB9KTtcbiAgICAgIGJsb2NrID0gc3RhY2tbc3RhY2subGVuZ3RoIC0gMV07XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBRdW90ZXM6ICd8XCJ8YFxuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlID09PSBDSEFSX0RPVUJMRV9RVU9URSB8fCB2YWx1ZSA9PT0gQ0hBUl9TSU5HTEVfUVVPVEUgfHwgdmFsdWUgPT09IENIQVJfQkFDS1RJQ0spIHtcbiAgICAgIGNvbnN0IG9wZW4gPSB2YWx1ZTtcbiAgICAgIGxldCBuZXh0O1xuXG4gICAgICBpZiAob3B0aW9ucy5rZWVwUXVvdGVzICE9PSB0cnVlKSB7XG4gICAgICAgIHZhbHVlID0gJyc7XG4gICAgICB9XG5cbiAgICAgIHdoaWxlIChpbmRleCA8IGxlbmd0aCAmJiAobmV4dCA9IGFkdmFuY2UoKSkpIHtcbiAgICAgICAgaWYgKG5leHQgPT09IENIQVJfQkFDS1NMQVNIKSB7XG4gICAgICAgICAgdmFsdWUgKz0gbmV4dCArIGFkdmFuY2UoKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXh0ID09PSBvcGVuKSB7XG4gICAgICAgICAgaWYgKG9wdGlvbnMua2VlcFF1b3RlcyA9PT0gdHJ1ZSkgdmFsdWUgKz0gbmV4dDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhbHVlICs9IG5leHQ7XG4gICAgICB9XG5cbiAgICAgIHB1c2goeyB0eXBlOiAndGV4dCcsIHZhbHVlIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTGVmdCBjdXJseSBicmFjZTogJ3snXG4gICAgICovXG5cbiAgICBpZiAodmFsdWUgPT09IENIQVJfTEVGVF9DVVJMWV9CUkFDRSkge1xuICAgICAgZGVwdGgrKztcblxuICAgICAgY29uc3QgZG9sbGFyID0gcHJldi52YWx1ZSAmJiBwcmV2LnZhbHVlLnNsaWNlKC0xKSA9PT0gJyQnIHx8IGJsb2NrLmRvbGxhciA9PT0gdHJ1ZTtcbiAgICAgIGNvbnN0IGJyYWNlID0ge1xuICAgICAgICB0eXBlOiAnYnJhY2UnLFxuICAgICAgICBvcGVuOiB0cnVlLFxuICAgICAgICBjbG9zZTogZmFsc2UsXG4gICAgICAgIGRvbGxhcixcbiAgICAgICAgZGVwdGgsXG4gICAgICAgIGNvbW1hczogMCxcbiAgICAgICAgcmFuZ2VzOiAwLFxuICAgICAgICBub2RlczogW11cbiAgICAgIH07XG5cbiAgICAgIGJsb2NrID0gcHVzaChicmFjZSk7XG4gICAgICBzdGFjay5wdXNoKGJsb2NrKTtcbiAgICAgIHB1c2goeyB0eXBlOiAnb3BlbicsIHZhbHVlIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmlnaHQgY3VybHkgYnJhY2U6ICd9J1xuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlID09PSBDSEFSX1JJR0hUX0NVUkxZX0JSQUNFKSB7XG4gICAgICBpZiAoYmxvY2sudHlwZSAhPT0gJ2JyYWNlJykge1xuICAgICAgICBwdXNoKHsgdHlwZTogJ3RleHQnLCB2YWx1ZSB9KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHR5cGUgPSAnY2xvc2UnO1xuICAgICAgYmxvY2sgPSBzdGFjay5wb3AoKTtcbiAgICAgIGJsb2NrLmNsb3NlID0gdHJ1ZTtcblxuICAgICAgcHVzaCh7IHR5cGUsIHZhbHVlIH0pO1xuICAgICAgZGVwdGgtLTtcblxuICAgICAgYmxvY2sgPSBzdGFja1tzdGFjay5sZW5ndGggLSAxXTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbW1hOiAnLCdcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gQ0hBUl9DT01NQSAmJiBkZXB0aCA+IDApIHtcbiAgICAgIGlmIChibG9jay5yYW5nZXMgPiAwKSB7XG4gICAgICAgIGJsb2NrLnJhbmdlcyA9IDA7XG4gICAgICAgIGNvbnN0IG9wZW4gPSBibG9jay5ub2Rlcy5zaGlmdCgpO1xuICAgICAgICBibG9jay5ub2RlcyA9IFtvcGVuLCB7IHR5cGU6ICd0ZXh0JywgdmFsdWU6IHN0cmluZ2lmeShibG9jaykgfV07XG4gICAgICB9XG5cbiAgICAgIHB1c2goeyB0eXBlOiAnY29tbWEnLCB2YWx1ZSB9KTtcbiAgICAgIGJsb2NrLmNvbW1hcysrO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRG90OiAnLidcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gQ0hBUl9ET1QgJiYgZGVwdGggPiAwICYmIGJsb2NrLmNvbW1hcyA9PT0gMCkge1xuICAgICAgY29uc3Qgc2libGluZ3MgPSBibG9jay5ub2RlcztcblxuICAgICAgaWYgKGRlcHRoID09PSAwIHx8IHNpYmxpbmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBwdXNoKHsgdHlwZTogJ3RleHQnLCB2YWx1ZSB9KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcmV2LnR5cGUgPT09ICdkb3QnKSB7XG4gICAgICAgIGJsb2NrLnJhbmdlID0gW107XG4gICAgICAgIHByZXYudmFsdWUgKz0gdmFsdWU7XG4gICAgICAgIHByZXYudHlwZSA9ICdyYW5nZSc7XG5cbiAgICAgICAgaWYgKGJsb2NrLm5vZGVzLmxlbmd0aCAhPT0gMyAmJiBibG9jay5ub2Rlcy5sZW5ndGggIT09IDUpIHtcbiAgICAgICAgICBibG9jay5pbnZhbGlkID0gdHJ1ZTtcbiAgICAgICAgICBibG9jay5yYW5nZXMgPSAwO1xuICAgICAgICAgIHByZXYudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJsb2NrLnJhbmdlcysrO1xuICAgICAgICBibG9jay5hcmdzID0gW107XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJldi50eXBlID09PSAncmFuZ2UnKSB7XG4gICAgICAgIHNpYmxpbmdzLnBvcCgpO1xuXG4gICAgICAgIGNvbnN0IGJlZm9yZSA9IHNpYmxpbmdzW3NpYmxpbmdzLmxlbmd0aCAtIDFdO1xuICAgICAgICBiZWZvcmUudmFsdWUgKz0gcHJldi52YWx1ZSArIHZhbHVlO1xuICAgICAgICBwcmV2ID0gYmVmb3JlO1xuICAgICAgICBibG9jay5yYW5nZXMtLTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHB1c2goeyB0eXBlOiAnZG90JywgdmFsdWUgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUZXh0XG4gICAgICovXG5cbiAgICBwdXNoKHsgdHlwZTogJ3RleHQnLCB2YWx1ZSB9KTtcbiAgfVxuXG4gIC8vIE1hcmsgaW1iYWxhbmNlZCBicmFjZXMgYW5kIGJyYWNrZXRzIGFzIGludmFsaWRcbiAgZG8ge1xuICAgIGJsb2NrID0gc3RhY2sucG9wKCk7XG5cbiAgICBpZiAoYmxvY2sudHlwZSAhPT0gJ3Jvb3QnKSB7XG4gICAgICBibG9jay5ub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICBpZiAoIW5vZGUubm9kZXMpIHtcbiAgICAgICAgICBpZiAobm9kZS50eXBlID09PSAnb3BlbicpIG5vZGUuaXNPcGVuID0gdHJ1ZTtcbiAgICAgICAgICBpZiAobm9kZS50eXBlID09PSAnY2xvc2UnKSBub2RlLmlzQ2xvc2UgPSB0cnVlO1xuICAgICAgICAgIGlmICghbm9kZS5ub2Rlcykgbm9kZS50eXBlID0gJ3RleHQnO1xuICAgICAgICAgIG5vZGUuaW52YWxpZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBnZXQgdGhlIGxvY2F0aW9uIG9mIHRoZSBibG9jayBvbiBwYXJlbnQubm9kZXMgKGJsb2NrJ3Mgc2libGluZ3MpXG4gICAgICBjb25zdCBwYXJlbnQgPSBzdGFja1tzdGFjay5sZW5ndGggLSAxXTtcbiAgICAgIGNvbnN0IGluZGV4ID0gcGFyZW50Lm5vZGVzLmluZGV4T2YoYmxvY2spO1xuICAgICAgLy8gcmVwbGFjZSB0aGUgKGludmFsaWQpIGJsb2NrIHdpdGggaXQncyBub2Rlc1xuICAgICAgcGFyZW50Lm5vZGVzLnNwbGljZShpbmRleCwgMSwgLi4uYmxvY2subm9kZXMpO1xuICAgIH1cbiAgfSB3aGlsZSAoc3RhY2subGVuZ3RoID4gMCk7XG5cbiAgcHVzaCh7IHR5cGU6ICdlb3MnIH0pO1xuICByZXR1cm4gYXN0O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJzZTtcbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHN0cmluZ2lmeSA9IHJlcXVpcmUoJy4vbGliL3N0cmluZ2lmeScpO1xuY29uc3QgY29tcGlsZSA9IHJlcXVpcmUoJy4vbGliL2NvbXBpbGUnKTtcbmNvbnN0IGV4cGFuZCA9IHJlcXVpcmUoJy4vbGliL2V4cGFuZCcpO1xuY29uc3QgcGFyc2UgPSByZXF1aXJlKCcuL2xpYi9wYXJzZScpO1xuXG4vKipcbiAqIEV4cGFuZCB0aGUgZ2l2ZW4gcGF0dGVybiBvciBjcmVhdGUgYSByZWdleC1jb21wYXRpYmxlIHN0cmluZy5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgYnJhY2VzID0gcmVxdWlyZSgnYnJhY2VzJyk7XG4gKiBjb25zb2xlLmxvZyhicmFjZXMoJ3thLGIsY30nLCB7IGNvbXBpbGU6IHRydWUgfSkpOyAvLz0+IFsnKGF8YnxjKSddXG4gKiBjb25zb2xlLmxvZyhicmFjZXMoJ3thLGIsY30nKSk7IC8vPT4gWydhJywgJ2InLCAnYyddXG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBgc3RyYFxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5jb25zdCBicmFjZXMgPSAoaW5wdXQsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICBsZXQgb3V0cHV0ID0gW107XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoaW5wdXQpKSB7XG4gICAgZm9yIChjb25zdCBwYXR0ZXJuIG9mIGlucHV0KSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBicmFjZXMuY3JlYXRlKHBhdHRlcm4sIG9wdGlvbnMpO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmVzdWx0KSkge1xuICAgICAgICBvdXRwdXQucHVzaCguLi5yZXN1bHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3V0cHV0LnB1c2gocmVzdWx0KTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgb3V0cHV0ID0gW10uY29uY2F0KGJyYWNlcy5jcmVhdGUoaW5wdXQsIG9wdGlvbnMpKTtcbiAgfVxuXG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMuZXhwYW5kID09PSB0cnVlICYmIG9wdGlvbnMubm9kdXBlcyA9PT0gdHJ1ZSkge1xuICAgIG91dHB1dCA9IFsuLi5uZXcgU2V0KG91dHB1dCldO1xuICB9XG4gIHJldHVybiBvdXRwdXQ7XG59O1xuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBgc3RyYCB3aXRoIHRoZSBnaXZlbiBgb3B0aW9uc2AuXG4gKlxuICogYGBganNcbiAqIC8vIGJyYWNlcy5wYXJzZShwYXR0ZXJuLCBbLCBvcHRpb25zXSk7XG4gKiBjb25zdCBhc3QgPSBicmFjZXMucGFyc2UoJ2Eve2IsY30vZCcpO1xuICogY29uc29sZS5sb2coYXN0KTtcbiAqIGBgYFxuICogQHBhcmFtIHtTdHJpbmd9IHBhdHRlcm4gQnJhY2UgcGF0dGVybiB0byBwYXJzZVxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4ge09iamVjdH0gUmV0dXJucyBhbiBBU1RcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuYnJhY2VzLnBhcnNlID0gKGlucHV0LCBvcHRpb25zID0ge30pID0+IHBhcnNlKGlucHV0LCBvcHRpb25zKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgYnJhY2VzIHN0cmluZyBmcm9tIGFuIEFTVCwgb3IgYW4gQVNUIG5vZGUuXG4gKlxuICogYGBganNcbiAqIGNvbnN0IGJyYWNlcyA9IHJlcXVpcmUoJ2JyYWNlcycpO1xuICogbGV0IGFzdCA9IGJyYWNlcy5wYXJzZSgnZm9vL3thLGJ9L2JhcicpO1xuICogY29uc29sZS5sb2coc3RyaW5naWZ5KGFzdC5ub2Rlc1syXSkpOyAvLz0+ICd7YSxifSdcbiAqIGBgYFxuICogQHBhcmFtIHtTdHJpbmd9IGBpbnB1dGAgQnJhY2UgcGF0dGVybiBvciBBU1QuXG4gKiBAcGFyYW0ge09iamVjdH0gYG9wdGlvbnNgXG4gKiBAcmV0dXJuIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiBleHBhbmRlZCB2YWx1ZXMuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmJyYWNlcy5zdHJpbmdpZnkgPSAoaW5wdXQsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBzdHJpbmdpZnkoYnJhY2VzLnBhcnNlKGlucHV0LCBvcHRpb25zKSwgb3B0aW9ucyk7XG4gIH1cbiAgcmV0dXJuIHN0cmluZ2lmeShpbnB1dCwgb3B0aW9ucyk7XG59O1xuXG4vKipcbiAqIENvbXBpbGVzIGEgYnJhY2UgcGF0dGVybiBpbnRvIGEgcmVnZXgtY29tcGF0aWJsZSwgb3B0aW1pemVkIHN0cmluZy5cbiAqIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBieSB0aGUgbWFpbiBbYnJhY2VzXSgjYnJhY2VzKSBmdW5jdGlvbiBieSBkZWZhdWx0LlxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCBicmFjZXMgPSByZXF1aXJlKCdicmFjZXMnKTtcbiAqIGNvbnNvbGUubG9nKGJyYWNlcy5jb21waWxlKCdhL3tiLGN9L2QnKSk7XG4gKiAvLz0+IFsnYS8oYnxjKS9kJ11cbiAqIGBgYFxuICogQHBhcmFtIHtTdHJpbmd9IGBpbnB1dGAgQnJhY2UgcGF0dGVybiBvciBBU1QuXG4gKiBAcGFyYW0ge09iamVjdH0gYG9wdGlvbnNgXG4gKiBAcmV0dXJuIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiBleHBhbmRlZCB2YWx1ZXMuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmJyYWNlcy5jb21waWxlID0gKGlucHV0LCBvcHRpb25zID0ge30pID0+IHtcbiAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcbiAgICBpbnB1dCA9IGJyYWNlcy5wYXJzZShpbnB1dCwgb3B0aW9ucyk7XG4gIH1cbiAgcmV0dXJuIGNvbXBpbGUoaW5wdXQsIG9wdGlvbnMpO1xufTtcblxuLyoqXG4gKiBFeHBhbmRzIGEgYnJhY2UgcGF0dGVybiBpbnRvIGFuIGFycmF5LiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYnkgdGhlXG4gKiBtYWluIFticmFjZXNdKCNicmFjZXMpIGZ1bmN0aW9uIHdoZW4gYG9wdGlvbnMuZXhwYW5kYCBpcyB0cnVlLiBCZWZvcmVcbiAqIHVzaW5nIHRoaXMgbWV0aG9kIGl0J3MgcmVjb21tZW5kZWQgdGhhdCB5b3UgcmVhZCB0aGUgW3BlcmZvcm1hbmNlIG5vdGVzXSgjcGVyZm9ybWFuY2UpKVxuICogYW5kIGFkdmFudGFnZXMgb2YgdXNpbmcgWy5jb21waWxlXSgjY29tcGlsZSkgaW5zdGVhZC5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgYnJhY2VzID0gcmVxdWlyZSgnYnJhY2VzJyk7XG4gKiBjb25zb2xlLmxvZyhicmFjZXMuZXhwYW5kKCdhL3tiLGN9L2QnKSk7XG4gKiAvLz0+IFsnYS9iL2QnLCAnYS9jL2QnXTtcbiAqIGBgYFxuICogQHBhcmFtIHtTdHJpbmd9IGBwYXR0ZXJuYCBCcmFjZSBwYXR0ZXJuXG4gKiBAcGFyYW0ge09iamVjdH0gYG9wdGlvbnNgXG4gKiBAcmV0dXJuIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiBleHBhbmRlZCB2YWx1ZXMuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmJyYWNlcy5leHBhbmQgPSAoaW5wdXQsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuICAgIGlucHV0ID0gYnJhY2VzLnBhcnNlKGlucHV0LCBvcHRpb25zKTtcbiAgfVxuXG4gIGxldCByZXN1bHQgPSBleHBhbmQoaW5wdXQsIG9wdGlvbnMpO1xuXG4gIC8vIGZpbHRlciBvdXQgZW1wdHkgc3RyaW5ncyBpZiBzcGVjaWZpZWRcbiAgaWYgKG9wdGlvbnMubm9lbXB0eSA9PT0gdHJ1ZSkge1xuICAgIHJlc3VsdCA9IHJlc3VsdC5maWx0ZXIoQm9vbGVhbik7XG4gIH1cblxuICAvLyBmaWx0ZXIgb3V0IGR1cGxpY2F0ZXMgaWYgc3BlY2lmaWVkXG4gIGlmIChvcHRpb25zLm5vZHVwZXMgPT09IHRydWUpIHtcbiAgICByZXN1bHQgPSBbLi4ubmV3IFNldChyZXN1bHQpXTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIFByb2Nlc3NlcyBhIGJyYWNlIHBhdHRlcm4gYW5kIHJldHVybnMgZWl0aGVyIGFuIGV4cGFuZGVkIGFycmF5XG4gKiAoaWYgYG9wdGlvbnMuZXhwYW5kYCBpcyB0cnVlKSwgYSBoaWdobHkgb3B0aW1pemVkIHJlZ2V4LWNvbXBhdGlibGUgc3RyaW5nLlxuICogVGhpcyBtZXRob2QgaXMgY2FsbGVkIGJ5IHRoZSBtYWluIFticmFjZXNdKCNicmFjZXMpIGZ1bmN0aW9uLlxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCBicmFjZXMgPSByZXF1aXJlKCdicmFjZXMnKTtcbiAqIGNvbnNvbGUubG9nKGJyYWNlcy5jcmVhdGUoJ3VzZXItezIwMC4uMzAwfS9wcm9qZWN0LXthLGIsY30tezEuLjEwfScpKVxuICogLy89PiAndXNlci0oMjBbMC05XXwyWzEtOV1bMC05XXwzMDApL3Byb2plY3QtKGF8YnxjKS0oWzEtOV18MTApJ1xuICogYGBgXG4gKiBAcGFyYW0ge1N0cmluZ30gYHBhdHRlcm5gIEJyYWNlIHBhdHRlcm5cbiAqIEBwYXJhbSB7T2JqZWN0fSBgb3B0aW9uc2BcbiAqIEByZXR1cm4ge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IG9mIGV4cGFuZGVkIHZhbHVlcy5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuYnJhY2VzLmNyZWF0ZSA9IChpbnB1dCwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGlmIChpbnB1dCA9PT0gJycgfHwgaW5wdXQubGVuZ3RoIDwgMykge1xuICAgIHJldHVybiBbaW5wdXRdO1xuICB9XG5cbiAgcmV0dXJuIG9wdGlvbnMuZXhwYW5kICE9PSB0cnVlXG4gICAgPyBicmFjZXMuY29tcGlsZShpbnB1dCwgb3B0aW9ucylcbiAgICA6IGJyYWNlcy5leHBhbmQoaW5wdXQsIG9wdGlvbnMpO1xufTtcblxuLyoqXG4gKiBFeHBvc2UgXCJicmFjZXNcIlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gYnJhY2VzO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IFdJTl9TTEFTSCA9ICdcXFxcXFxcXC8nO1xuY29uc3QgV0lOX05PX1NMQVNIID0gYFteJHtXSU5fU0xBU0h9XWA7XG5cbmNvbnN0IERFRkFVTFRfTUFYX0VYVEdMT0JfUkVDVVJTSU9OID0gMDtcblxuLyoqXG4gKiBQb3NpeCBnbG9iIHJlZ2V4XG4gKi9cblxuY29uc3QgRE9UX0xJVEVSQUwgPSAnXFxcXC4nO1xuY29uc3QgUExVU19MSVRFUkFMID0gJ1xcXFwrJztcbmNvbnN0IFFNQVJLX0xJVEVSQUwgPSAnXFxcXD8nO1xuY29uc3QgU0xBU0hfTElURVJBTCA9ICdcXFxcLyc7XG5jb25zdCBPTkVfQ0hBUiA9ICcoPz0uKSc7XG5jb25zdCBRTUFSSyA9ICdbXi9dJztcbmNvbnN0IEVORF9BTkNIT1IgPSBgKD86JHtTTEFTSF9MSVRFUkFMfXwkKWA7XG5jb25zdCBTVEFSVF9BTkNIT1IgPSBgKD86Xnwke1NMQVNIX0xJVEVSQUx9KWA7XG5jb25zdCBET1RTX1NMQVNIID0gYCR7RE9UX0xJVEVSQUx9ezEsMn0ke0VORF9BTkNIT1J9YDtcbmNvbnN0IE5PX0RPVCA9IGAoPyEke0RPVF9MSVRFUkFMfSlgO1xuY29uc3QgTk9fRE9UUyA9IGAoPyEke1NUQVJUX0FOQ0hPUn0ke0RPVFNfU0xBU0h9KWA7XG5jb25zdCBOT19ET1RfU0xBU0ggPSBgKD8hJHtET1RfTElURVJBTH17MCwxfSR7RU5EX0FOQ0hPUn0pYDtcbmNvbnN0IE5PX0RPVFNfU0xBU0ggPSBgKD8hJHtET1RTX1NMQVNIfSlgO1xuY29uc3QgUU1BUktfTk9fRE9UID0gYFteLiR7U0xBU0hfTElURVJBTH1dYDtcbmNvbnN0IFNUQVIgPSBgJHtRTUFSS30qP2A7XG5cbmNvbnN0IFBPU0lYX0NIQVJTID0ge1xuICBET1RfTElURVJBTCxcbiAgUExVU19MSVRFUkFMLFxuICBRTUFSS19MSVRFUkFMLFxuICBTTEFTSF9MSVRFUkFMLFxuICBPTkVfQ0hBUixcbiAgUU1BUkssXG4gIEVORF9BTkNIT1IsXG4gIERPVFNfU0xBU0gsXG4gIE5PX0RPVCxcbiAgTk9fRE9UUyxcbiAgTk9fRE9UX1NMQVNILFxuICBOT19ET1RTX1NMQVNILFxuICBRTUFSS19OT19ET1QsXG4gIFNUQVIsXG4gIFNUQVJUX0FOQ0hPUlxufTtcblxuLyoqXG4gKiBXaW5kb3dzIGdsb2IgcmVnZXhcbiAqL1xuXG5jb25zdCBXSU5ET1dTX0NIQVJTID0ge1xuICAuLi5QT1NJWF9DSEFSUyxcblxuICBTTEFTSF9MSVRFUkFMOiBgWyR7V0lOX1NMQVNIfV1gLFxuICBRTUFSSzogV0lOX05PX1NMQVNILFxuICBTVEFSOiBgJHtXSU5fTk9fU0xBU0h9Kj9gLFxuICBET1RTX1NMQVNIOiBgJHtET1RfTElURVJBTH17MSwyfSg/Olske1dJTl9TTEFTSH1dfCQpYCxcbiAgTk9fRE9UOiBgKD8hJHtET1RfTElURVJBTH0pYCxcbiAgTk9fRE9UUzogYCg/ISg/Ol58WyR7V0lOX1NMQVNIfV0pJHtET1RfTElURVJBTH17MSwyfSg/Olske1dJTl9TTEFTSH1dfCQpKWAsXG4gIE5PX0RPVF9TTEFTSDogYCg/ISR7RE9UX0xJVEVSQUx9ezAsMX0oPzpbJHtXSU5fU0xBU0h9XXwkKSlgLFxuICBOT19ET1RTX1NMQVNIOiBgKD8hJHtET1RfTElURVJBTH17MSwyfSg/Olske1dJTl9TTEFTSH1dfCQpKWAsXG4gIFFNQVJLX05PX0RPVDogYFteLiR7V0lOX1NMQVNIfV1gLFxuICBTVEFSVF9BTkNIT1I6IGAoPzpefFske1dJTl9TTEFTSH1dKWAsXG4gIEVORF9BTkNIT1I6IGAoPzpbJHtXSU5fU0xBU0h9XXwkKWBcbn07XG5cbi8qKlxuICogUE9TSVggQnJhY2tldCBSZWdleFxuICovXG5cbmNvbnN0IFBPU0lYX1JFR0VYX1NPVVJDRSA9IHtcbiAgX19wcm90b19fOiBudWxsLFxuICBhbG51bTogJ2EtekEtWjAtOScsXG4gIGFscGhhOiAnYS16QS1aJyxcbiAgYXNjaWk6ICdcXFxceDAwLVxcXFx4N0YnLFxuICBibGFuazogJyBcXFxcdCcsXG4gIGNudHJsOiAnXFxcXHgwMC1cXFxceDFGXFxcXHg3RicsXG4gIGRpZ2l0OiAnMC05JyxcbiAgZ3JhcGg6ICdcXFxceDIxLVxcXFx4N0UnLFxuICBsb3dlcjogJ2EteicsXG4gIHByaW50OiAnXFxcXHgyMC1cXFxceDdFICcsXG4gIHB1bmN0OiAnXFxcXC0hXCIjJCUmXFwnKClcXFxcKissLi86Ozw9Pj9AW1xcXFxdXl9ge3x9ficsXG4gIHNwYWNlOiAnIFxcXFx0XFxcXHJcXFxcblxcXFx2XFxcXGYnLFxuICB1cHBlcjogJ0EtWicsXG4gIHdvcmQ6ICdBLVphLXowLTlfJyxcbiAgeGRpZ2l0OiAnQS1GYS1mMC05J1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIERFRkFVTFRfTUFYX0VYVEdMT0JfUkVDVVJTSU9OLFxuICBNQVhfTEVOR1RIOiAxMDI0ICogNjQsXG4gIFBPU0lYX1JFR0VYX1NPVVJDRSxcblxuICAvLyByZWd1bGFyIGV4cHJlc3Npb25zXG4gIFJFR0VYX0JBQ0tTTEFTSDogL1xcXFwoPyFbKis/XiR7fSh8KVtcXF1dKS9nLFxuICBSRUdFWF9OT05fU1BFQ0lBTF9DSEFSUzogL15bXkAhW1xcXS4sJCorP157fSgpfFxcXFwvXSsvLFxuICBSRUdFWF9TUEVDSUFMX0NIQVJTOiAvWy0qKz8uXiR7fSh8KVtcXF1dLyxcbiAgUkVHRVhfU1BFQ0lBTF9DSEFSU19CQUNLUkVGOiAvKFxcXFw/KSgoXFxXKShcXDMqKSkvZyxcbiAgUkVHRVhfU1BFQ0lBTF9DSEFSU19HTE9CQUw6IC8oWy0qKz8uXiR7fSh8KVtcXF1dKS9nLFxuICBSRUdFWF9SRU1PVkVfQkFDS1NMQVNIOiAvKD86XFxbLio/W15cXFxcXVxcXXxcXFxcKD89LikpL2csXG5cbiAgLy8gUmVwbGFjZSBnbG9icyB3aXRoIGVxdWl2YWxlbnQgcGF0dGVybnMgdG8gcmVkdWNlIHBhcnNpbmcgdGltZS5cbiAgUkVQTEFDRU1FTlRTOiB7XG4gICAgX19wcm90b19fOiBudWxsLFxuICAgICcqKionOiAnKicsXG4gICAgJyoqLyoqJzogJyoqJyxcbiAgICAnKiovKiovKionOiAnKionXG4gIH0sXG5cbiAgLy8gRGlnaXRzXG4gIENIQVJfMDogNDgsIC8qIDAgKi9cbiAgQ0hBUl85OiA1NywgLyogOSAqL1xuXG4gIC8vIEFscGhhYmV0IGNoYXJzLlxuICBDSEFSX1VQUEVSQ0FTRV9BOiA2NSwgLyogQSAqL1xuICBDSEFSX0xPV0VSQ0FTRV9BOiA5NywgLyogYSAqL1xuICBDSEFSX1VQUEVSQ0FTRV9aOiA5MCwgLyogWiAqL1xuICBDSEFSX0xPV0VSQ0FTRV9aOiAxMjIsIC8qIHogKi9cblxuICBDSEFSX0xFRlRfUEFSRU5USEVTRVM6IDQwLCAvKiAoICovXG4gIENIQVJfUklHSFRfUEFSRU5USEVTRVM6IDQxLCAvKiApICovXG5cbiAgQ0hBUl9BU1RFUklTSzogNDIsIC8qICogKi9cblxuICAvLyBOb24tYWxwaGFiZXRpYyBjaGFycy5cbiAgQ0hBUl9BTVBFUlNBTkQ6IDM4LCAvKiAmICovXG4gIENIQVJfQVQ6IDY0LCAvKiBAICovXG4gIENIQVJfQkFDS1dBUkRfU0xBU0g6IDkyLCAvKiBcXCAqL1xuICBDSEFSX0NBUlJJQUdFX1JFVFVSTjogMTMsIC8qIFxcciAqL1xuICBDSEFSX0NJUkNVTUZMRVhfQUNDRU5UOiA5NCwgLyogXiAqL1xuICBDSEFSX0NPTE9OOiA1OCwgLyogOiAqL1xuICBDSEFSX0NPTU1BOiA0NCwgLyogLCAqL1xuICBDSEFSX0RPVDogNDYsIC8qIC4gKi9cbiAgQ0hBUl9ET1VCTEVfUVVPVEU6IDM0LCAvKiBcIiAqL1xuICBDSEFSX0VRVUFMOiA2MSwgLyogPSAqL1xuICBDSEFSX0VYQ0xBTUFUSU9OX01BUks6IDMzLCAvKiAhICovXG4gIENIQVJfRk9STV9GRUVEOiAxMiwgLyogXFxmICovXG4gIENIQVJfRk9SV0FSRF9TTEFTSDogNDcsIC8qIC8gKi9cbiAgQ0hBUl9HUkFWRV9BQ0NFTlQ6IDk2LCAvKiBgICovXG4gIENIQVJfSEFTSDogMzUsIC8qICMgKi9cbiAgQ0hBUl9IWVBIRU5fTUlOVVM6IDQ1LCAvKiAtICovXG4gIENIQVJfTEVGVF9BTkdMRV9CUkFDS0VUOiA2MCwgLyogPCAqL1xuICBDSEFSX0xFRlRfQ1VSTFlfQlJBQ0U6IDEyMywgLyogeyAqL1xuICBDSEFSX0xFRlRfU1FVQVJFX0JSQUNLRVQ6IDkxLCAvKiBbICovXG4gIENIQVJfTElORV9GRUVEOiAxMCwgLyogXFxuICovXG4gIENIQVJfTk9fQlJFQUtfU1BBQ0U6IDE2MCwgLyogXFx1MDBBMCAqL1xuICBDSEFSX1BFUkNFTlQ6IDM3LCAvKiAlICovXG4gIENIQVJfUExVUzogNDMsIC8qICsgKi9cbiAgQ0hBUl9RVUVTVElPTl9NQVJLOiA2MywgLyogPyAqL1xuICBDSEFSX1JJR0hUX0FOR0xFX0JSQUNLRVQ6IDYyLCAvKiA+ICovXG4gIENIQVJfUklHSFRfQ1VSTFlfQlJBQ0U6IDEyNSwgLyogfSAqL1xuICBDSEFSX1JJR0hUX1NRVUFSRV9CUkFDS0VUOiA5MywgLyogXSAqL1xuICBDSEFSX1NFTUlDT0xPTjogNTksIC8qIDsgKi9cbiAgQ0hBUl9TSU5HTEVfUVVPVEU6IDM5LCAvKiAnICovXG4gIENIQVJfU1BBQ0U6IDMyLCAvKiAgICovXG4gIENIQVJfVEFCOiA5LCAvKiBcXHQgKi9cbiAgQ0hBUl9VTkRFUlNDT1JFOiA5NSwgLyogXyAqL1xuICBDSEFSX1ZFUlRJQ0FMX0xJTkU6IDEyNCwgLyogfCAqL1xuICBDSEFSX1pFUk9fV0lEVEhfTk9CUkVBS19TUEFDRTogNjUyNzksIC8qIFxcdUZFRkYgKi9cblxuICBTRVA6IHBhdGguc2VwLFxuXG4gIC8qKlxuICAgKiBDcmVhdGUgRVhUR0xPQl9DSEFSU1xuICAgKi9cblxuICBleHRnbG9iQ2hhcnMoY2hhcnMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJyEnOiB7IHR5cGU6ICduZWdhdGUnLCBvcGVuOiAnKD86KD8hKD86JywgY2xvc2U6IGApKSR7Y2hhcnMuU1RBUn0pYCB9LFxuICAgICAgJz8nOiB7IHR5cGU6ICdxbWFyaycsIG9wZW46ICcoPzonLCBjbG9zZTogJyk/JyB9LFxuICAgICAgJysnOiB7IHR5cGU6ICdwbHVzJywgb3BlbjogJyg/OicsIGNsb3NlOiAnKSsnIH0sXG4gICAgICAnKic6IHsgdHlwZTogJ3N0YXInLCBvcGVuOiAnKD86JywgY2xvc2U6ICcpKicgfSxcbiAgICAgICdAJzogeyB0eXBlOiAnYXQnLCBvcGVuOiAnKD86JywgY2xvc2U6ICcpJyB9XG4gICAgfTtcbiAgfSxcblxuICAvKipcbiAgICogQ3JlYXRlIEdMT0JfQ0hBUlNcbiAgICovXG5cbiAgZ2xvYkNoYXJzKHdpbjMyKSB7XG4gICAgcmV0dXJuIHdpbjMyID09PSB0cnVlID8gV0lORE9XU19DSEFSUyA6IFBPU0lYX0NIQVJTO1xuICB9XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IHdpbjMyID0gcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJztcbmNvbnN0IHtcbiAgUkVHRVhfQkFDS1NMQVNILFxuICBSRUdFWF9SRU1PVkVfQkFDS1NMQVNILFxuICBSRUdFWF9TUEVDSUFMX0NIQVJTLFxuICBSRUdFWF9TUEVDSUFMX0NIQVJTX0dMT0JBTFxufSA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG5cbmV4cG9ydHMuaXNPYmplY3QgPSB2YWwgPT4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KHZhbCk7XG5leHBvcnRzLmhhc1JlZ2V4Q2hhcnMgPSBzdHIgPT4gUkVHRVhfU1BFQ0lBTF9DSEFSUy50ZXN0KHN0cik7XG5leHBvcnRzLmlzUmVnZXhDaGFyID0gc3RyID0+IHN0ci5sZW5ndGggPT09IDEgJiYgZXhwb3J0cy5oYXNSZWdleENoYXJzKHN0cik7XG5leHBvcnRzLmVzY2FwZVJlZ2V4ID0gc3RyID0+IHN0ci5yZXBsYWNlKFJFR0VYX1NQRUNJQUxfQ0hBUlNfR0xPQkFMLCAnXFxcXCQxJyk7XG5leHBvcnRzLnRvUG9zaXhTbGFzaGVzID0gc3RyID0+IHN0ci5yZXBsYWNlKFJFR0VYX0JBQ0tTTEFTSCwgJy8nKTtcblxuZXhwb3J0cy5yZW1vdmVCYWNrc2xhc2hlcyA9IHN0ciA9PiB7XG4gIHJldHVybiBzdHIucmVwbGFjZShSRUdFWF9SRU1PVkVfQkFDS1NMQVNILCBtYXRjaCA9PiB7XG4gICAgcmV0dXJuIG1hdGNoID09PSAnXFxcXCcgPyAnJyA6IG1hdGNoO1xuICB9KTtcbn07XG5cbmV4cG9ydHMuc3VwcG9ydHNMb29rYmVoaW5kcyA9ICgpID0+IHtcbiAgY29uc3Qgc2VncyA9IHByb2Nlc3MudmVyc2lvbi5zbGljZSgxKS5zcGxpdCgnLicpLm1hcChOdW1iZXIpO1xuICBpZiAoc2Vncy5sZW5ndGggPT09IDMgJiYgc2Vnc1swXSA+PSA5IHx8IChzZWdzWzBdID09PSA4ICYmIHNlZ3NbMV0gPj0gMTApKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuZXhwb3J0cy5pc1dpbmRvd3MgPSBvcHRpb25zID0+IHtcbiAgaWYgKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMud2luZG93cyA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMud2luZG93cztcbiAgfVxuICByZXR1cm4gd2luMzIgPT09IHRydWUgfHwgcGF0aC5zZXAgPT09ICdcXFxcJztcbn07XG5cbmV4cG9ydHMuZXNjYXBlTGFzdCA9IChpbnB1dCwgY2hhciwgbGFzdElkeCkgPT4ge1xuICBjb25zdCBpZHggPSBpbnB1dC5sYXN0SW5kZXhPZihjaGFyLCBsYXN0SWR4KTtcbiAgaWYgKGlkeCA9PT0gLTEpIHJldHVybiBpbnB1dDtcbiAgaWYgKGlucHV0W2lkeCAtIDFdID09PSAnXFxcXCcpIHJldHVybiBleHBvcnRzLmVzY2FwZUxhc3QoaW5wdXQsIGNoYXIsIGlkeCAtIDEpO1xuICByZXR1cm4gYCR7aW5wdXQuc2xpY2UoMCwgaWR4KX1cXFxcJHtpbnB1dC5zbGljZShpZHgpfWA7XG59O1xuXG5leHBvcnRzLnJlbW92ZVByZWZpeCA9IChpbnB1dCwgc3RhdGUgPSB7fSkgPT4ge1xuICBsZXQgb3V0cHV0ID0gaW5wdXQ7XG4gIGlmIChvdXRwdXQuc3RhcnRzV2l0aCgnLi8nKSkge1xuICAgIG91dHB1dCA9IG91dHB1dC5zbGljZSgyKTtcbiAgICBzdGF0ZS5wcmVmaXggPSAnLi8nO1xuICB9XG4gIHJldHVybiBvdXRwdXQ7XG59O1xuXG5leHBvcnRzLndyYXBPdXRwdXQgPSAoaW5wdXQsIHN0YXRlID0ge30sIG9wdGlvbnMgPSB7fSkgPT4ge1xuICBjb25zdCBwcmVwZW5kID0gb3B0aW9ucy5jb250YWlucyA/ICcnIDogJ14nO1xuICBjb25zdCBhcHBlbmQgPSBvcHRpb25zLmNvbnRhaW5zID8gJycgOiAnJCc7XG5cbiAgbGV0IG91dHB1dCA9IGAke3ByZXBlbmR9KD86JHtpbnB1dH0pJHthcHBlbmR9YDtcbiAgaWYgKHN0YXRlLm5lZ2F0ZWQgPT09IHRydWUpIHtcbiAgICBvdXRwdXQgPSBgKD86Xig/ISR7b3V0cHV0fSkuKiQpYDtcbiAgfVxuICByZXR1cm4gb3V0cHV0O1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuY29uc3Qge1xuICBDSEFSX0FTVEVSSVNLLCAgICAgICAgICAgICAvKiAqICovXG4gIENIQVJfQVQsICAgICAgICAgICAgICAgICAgIC8qIEAgKi9cbiAgQ0hBUl9CQUNLV0FSRF9TTEFTSCwgICAgICAgLyogXFwgKi9cbiAgQ0hBUl9DT01NQSwgICAgICAgICAgICAgICAgLyogLCAqL1xuICBDSEFSX0RPVCwgICAgICAgICAgICAgICAgICAvKiAuICovXG4gIENIQVJfRVhDTEFNQVRJT05fTUFSSywgICAgIC8qICEgKi9cbiAgQ0hBUl9GT1JXQVJEX1NMQVNILCAgICAgICAgLyogLyAqL1xuICBDSEFSX0xFRlRfQ1VSTFlfQlJBQ0UsICAgICAvKiB7ICovXG4gIENIQVJfTEVGVF9QQVJFTlRIRVNFUywgICAgIC8qICggKi9cbiAgQ0hBUl9MRUZUX1NRVUFSRV9CUkFDS0VULCAgLyogWyAqL1xuICBDSEFSX1BMVVMsICAgICAgICAgICAgICAgICAvKiArICovXG4gIENIQVJfUVVFU1RJT05fTUFSSywgICAgICAgIC8qID8gKi9cbiAgQ0hBUl9SSUdIVF9DVVJMWV9CUkFDRSwgICAgLyogfSAqL1xuICBDSEFSX1JJR0hUX1BBUkVOVEhFU0VTLCAgICAvKiApICovXG4gIENIQVJfUklHSFRfU1FVQVJFX0JSQUNLRVQgIC8qIF0gKi9cbn0gPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuXG5jb25zdCBpc1BhdGhTZXBhcmF0b3IgPSBjb2RlID0+IHtcbiAgcmV0dXJuIGNvZGUgPT09IENIQVJfRk9SV0FSRF9TTEFTSCB8fCBjb2RlID09PSBDSEFSX0JBQ0tXQVJEX1NMQVNIO1xufTtcblxuY29uc3QgZGVwdGggPSB0b2tlbiA9PiB7XG4gIGlmICh0b2tlbi5pc1ByZWZpeCAhPT0gdHJ1ZSkge1xuICAgIHRva2VuLmRlcHRoID0gdG9rZW4uaXNHbG9ic3RhciA/IEluZmluaXR5IDogMTtcbiAgfVxufTtcblxuLyoqXG4gKiBRdWlja2x5IHNjYW5zIGEgZ2xvYiBwYXR0ZXJuIGFuZCByZXR1cm5zIGFuIG9iamVjdCB3aXRoIGEgaGFuZGZ1bCBvZlxuICogdXNlZnVsIHByb3BlcnRpZXMsIGxpa2UgYGlzR2xvYmAsIGBwYXRoYCAodGhlIGxlYWRpbmcgbm9uLWdsb2IsIGlmIGl0IGV4aXN0cyksXG4gKiBgZ2xvYmAgKHRoZSBhY3R1YWwgcGF0dGVybiksIGBuZWdhdGVkYCAodHJ1ZSBpZiB0aGUgcGF0aCBzdGFydHMgd2l0aCBgIWAgYnV0IG5vdFxuICogd2l0aCBgIShgKSBhbmQgYG5lZ2F0ZWRFeHRnbG9iYCAodHJ1ZSBpZiB0aGUgcGF0aCBzdGFydHMgd2l0aCBgIShgKS5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgcG0gPSByZXF1aXJlKCdwaWNvbWF0Y2gnKTtcbiAqIGNvbnNvbGUubG9nKHBtLnNjYW4oJ2Zvby9iYXIvKi5qcycpKTtcbiAqIHsgaXNHbG9iOiB0cnVlLCBpbnB1dDogJ2Zvby9iYXIvKi5qcycsIGJhc2U6ICdmb28vYmFyJywgZ2xvYjogJyouanMnIH1cbiAqIGBgYFxuICogQHBhcmFtIHtTdHJpbmd9IGBzdHJgXG4gKiBAcGFyYW0ge09iamVjdH0gYG9wdGlvbnNgXG4gKiBAcmV0dXJuIHtPYmplY3R9IFJldHVybnMgYW4gb2JqZWN0IHdpdGggdG9rZW5zIGFuZCByZWdleCBzb3VyY2Ugc3RyaW5nLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5jb25zdCBzY2FuID0gKGlucHV0LCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IG9wdHMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIGNvbnN0IGxlbmd0aCA9IGlucHV0Lmxlbmd0aCAtIDE7XG4gIGNvbnN0IHNjYW5Ub0VuZCA9IG9wdHMucGFydHMgPT09IHRydWUgfHwgb3B0cy5zY2FuVG9FbmQgPT09IHRydWU7XG4gIGNvbnN0IHNsYXNoZXMgPSBbXTtcbiAgY29uc3QgdG9rZW5zID0gW107XG4gIGNvbnN0IHBhcnRzID0gW107XG5cbiAgbGV0IHN0ciA9IGlucHV0O1xuICBsZXQgaW5kZXggPSAtMTtcbiAgbGV0IHN0YXJ0ID0gMDtcbiAgbGV0IGxhc3RJbmRleCA9IDA7XG4gIGxldCBpc0JyYWNlID0gZmFsc2U7XG4gIGxldCBpc0JyYWNrZXQgPSBmYWxzZTtcbiAgbGV0IGlzR2xvYiA9IGZhbHNlO1xuICBsZXQgaXNFeHRnbG9iID0gZmFsc2U7XG4gIGxldCBpc0dsb2JzdGFyID0gZmFsc2U7XG4gIGxldCBicmFjZUVzY2FwZWQgPSBmYWxzZTtcbiAgbGV0IGJhY2tzbGFzaGVzID0gZmFsc2U7XG4gIGxldCBuZWdhdGVkID0gZmFsc2U7XG4gIGxldCBuZWdhdGVkRXh0Z2xvYiA9IGZhbHNlO1xuICBsZXQgZmluaXNoZWQgPSBmYWxzZTtcbiAgbGV0IGJyYWNlcyA9IDA7XG4gIGxldCBwcmV2O1xuICBsZXQgY29kZTtcbiAgbGV0IHRva2VuID0geyB2YWx1ZTogJycsIGRlcHRoOiAwLCBpc0dsb2I6IGZhbHNlIH07XG5cbiAgY29uc3QgZW9zID0gKCkgPT4gaW5kZXggPj0gbGVuZ3RoO1xuICBjb25zdCBwZWVrID0gKCkgPT4gc3RyLmNoYXJDb2RlQXQoaW5kZXggKyAxKTtcbiAgY29uc3QgYWR2YW5jZSA9ICgpID0+IHtcbiAgICBwcmV2ID0gY29kZTtcbiAgICByZXR1cm4gc3RyLmNoYXJDb2RlQXQoKytpbmRleCk7XG4gIH07XG5cbiAgd2hpbGUgKGluZGV4IDwgbGVuZ3RoKSB7XG4gICAgY29kZSA9IGFkdmFuY2UoKTtcbiAgICBsZXQgbmV4dDtcblxuICAgIGlmIChjb2RlID09PSBDSEFSX0JBQ0tXQVJEX1NMQVNIKSB7XG4gICAgICBiYWNrc2xhc2hlcyA9IHRva2VuLmJhY2tzbGFzaGVzID0gdHJ1ZTtcbiAgICAgIGNvZGUgPSBhZHZhbmNlKCk7XG5cbiAgICAgIGlmIChjb2RlID09PSBDSEFSX0xFRlRfQ1VSTFlfQlJBQ0UpIHtcbiAgICAgICAgYnJhY2VFc2NhcGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChicmFjZUVzY2FwZWQgPT09IHRydWUgfHwgY29kZSA9PT0gQ0hBUl9MRUZUX0NVUkxZX0JSQUNFKSB7XG4gICAgICBicmFjZXMrKztcblxuICAgICAgd2hpbGUgKGVvcygpICE9PSB0cnVlICYmIChjb2RlID0gYWR2YW5jZSgpKSkge1xuICAgICAgICBpZiAoY29kZSA9PT0gQ0hBUl9CQUNLV0FSRF9TTEFTSCkge1xuICAgICAgICAgIGJhY2tzbGFzaGVzID0gdG9rZW4uYmFja3NsYXNoZXMgPSB0cnVlO1xuICAgICAgICAgIGFkdmFuY2UoKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb2RlID09PSBDSEFSX0xFRlRfQ1VSTFlfQlJBQ0UpIHtcbiAgICAgICAgICBicmFjZXMrKztcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChicmFjZUVzY2FwZWQgIT09IHRydWUgJiYgY29kZSA9PT0gQ0hBUl9ET1QgJiYgKGNvZGUgPSBhZHZhbmNlKCkpID09PSBDSEFSX0RPVCkge1xuICAgICAgICAgIGlzQnJhY2UgPSB0b2tlbi5pc0JyYWNlID0gdHJ1ZTtcbiAgICAgICAgICBpc0dsb2IgPSB0b2tlbi5pc0dsb2IgPSB0cnVlO1xuICAgICAgICAgIGZpbmlzaGVkID0gdHJ1ZTtcblxuICAgICAgICAgIGlmIChzY2FuVG9FbmQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJyYWNlRXNjYXBlZCAhPT0gdHJ1ZSAmJiBjb2RlID09PSBDSEFSX0NPTU1BKSB7XG4gICAgICAgICAgaXNCcmFjZSA9IHRva2VuLmlzQnJhY2UgPSB0cnVlO1xuICAgICAgICAgIGlzR2xvYiA9IHRva2VuLmlzR2xvYiA9IHRydWU7XG4gICAgICAgICAgZmluaXNoZWQgPSB0cnVlO1xuXG4gICAgICAgICAgaWYgKHNjYW5Ub0VuZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29kZSA9PT0gQ0hBUl9SSUdIVF9DVVJMWV9CUkFDRSkge1xuICAgICAgICAgIGJyYWNlcy0tO1xuXG4gICAgICAgICAgaWYgKGJyYWNlcyA9PT0gMCkge1xuICAgICAgICAgICAgYnJhY2VFc2NhcGVkID0gZmFsc2U7XG4gICAgICAgICAgICBpc0JyYWNlID0gdG9rZW4uaXNCcmFjZSA9IHRydWU7XG4gICAgICAgICAgICBmaW5pc2hlZCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHNjYW5Ub0VuZCA9PT0gdHJ1ZSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKGNvZGUgPT09IENIQVJfRk9SV0FSRF9TTEFTSCkge1xuICAgICAgc2xhc2hlcy5wdXNoKGluZGV4KTtcbiAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgIHRva2VuID0geyB2YWx1ZTogJycsIGRlcHRoOiAwLCBpc0dsb2I6IGZhbHNlIH07XG5cbiAgICAgIGlmIChmaW5pc2hlZCA9PT0gdHJ1ZSkgY29udGludWU7XG4gICAgICBpZiAocHJldiA9PT0gQ0hBUl9ET1QgJiYgaW5kZXggPT09IChzdGFydCArIDEpKSB7XG4gICAgICAgIHN0YXJ0ICs9IDI7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBsYXN0SW5kZXggPSBpbmRleCArIDE7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAob3B0cy5ub2V4dCAhPT0gdHJ1ZSkge1xuICAgICAgY29uc3QgaXNFeHRnbG9iQ2hhciA9IGNvZGUgPT09IENIQVJfUExVU1xuICAgICAgICB8fCBjb2RlID09PSBDSEFSX0FUXG4gICAgICAgIHx8IGNvZGUgPT09IENIQVJfQVNURVJJU0tcbiAgICAgICAgfHwgY29kZSA9PT0gQ0hBUl9RVUVTVElPTl9NQVJLXG4gICAgICAgIHx8IGNvZGUgPT09IENIQVJfRVhDTEFNQVRJT05fTUFSSztcblxuICAgICAgaWYgKGlzRXh0Z2xvYkNoYXIgPT09IHRydWUgJiYgcGVlaygpID09PSBDSEFSX0xFRlRfUEFSRU5USEVTRVMpIHtcbiAgICAgICAgaXNHbG9iID0gdG9rZW4uaXNHbG9iID0gdHJ1ZTtcbiAgICAgICAgaXNFeHRnbG9iID0gdG9rZW4uaXNFeHRnbG9iID0gdHJ1ZTtcbiAgICAgICAgZmluaXNoZWQgPSB0cnVlO1xuICAgICAgICBpZiAoY29kZSA9PT0gQ0hBUl9FWENMQU1BVElPTl9NQVJLICYmIGluZGV4ID09PSBzdGFydCkge1xuICAgICAgICAgIG5lZ2F0ZWRFeHRnbG9iID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzY2FuVG9FbmQgPT09IHRydWUpIHtcbiAgICAgICAgICB3aGlsZSAoZW9zKCkgIT09IHRydWUgJiYgKGNvZGUgPSBhZHZhbmNlKCkpKSB7XG4gICAgICAgICAgICBpZiAoY29kZSA9PT0gQ0hBUl9CQUNLV0FSRF9TTEFTSCkge1xuICAgICAgICAgICAgICBiYWNrc2xhc2hlcyA9IHRva2VuLmJhY2tzbGFzaGVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgY29kZSA9IGFkdmFuY2UoKTtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjb2RlID09PSBDSEFSX1JJR0hUX1BBUkVOVEhFU0VTKSB7XG4gICAgICAgICAgICAgIGlzR2xvYiA9IHRva2VuLmlzR2xvYiA9IHRydWU7XG4gICAgICAgICAgICAgIGZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb2RlID09PSBDSEFSX0FTVEVSSVNLKSB7XG4gICAgICBpZiAocHJldiA9PT0gQ0hBUl9BU1RFUklTSykgaXNHbG9ic3RhciA9IHRva2VuLmlzR2xvYnN0YXIgPSB0cnVlO1xuICAgICAgaXNHbG9iID0gdG9rZW4uaXNHbG9iID0gdHJ1ZTtcbiAgICAgIGZpbmlzaGVkID0gdHJ1ZTtcblxuICAgICAgaWYgKHNjYW5Ub0VuZCA9PT0gdHJ1ZSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChjb2RlID09PSBDSEFSX1FVRVNUSU9OX01BUkspIHtcbiAgICAgIGlzR2xvYiA9IHRva2VuLmlzR2xvYiA9IHRydWU7XG4gICAgICBmaW5pc2hlZCA9IHRydWU7XG5cbiAgICAgIGlmIChzY2FuVG9FbmQgPT09IHRydWUpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoY29kZSA9PT0gQ0hBUl9MRUZUX1NRVUFSRV9CUkFDS0VUKSB7XG4gICAgICB3aGlsZSAoZW9zKCkgIT09IHRydWUgJiYgKG5leHQgPSBhZHZhbmNlKCkpKSB7XG4gICAgICAgIGlmIChuZXh0ID09PSBDSEFSX0JBQ0tXQVJEX1NMQVNIKSB7XG4gICAgICAgICAgYmFja3NsYXNoZXMgPSB0b2tlbi5iYWNrc2xhc2hlcyA9IHRydWU7XG4gICAgICAgICAgYWR2YW5jZSgpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5leHQgPT09IENIQVJfUklHSFRfU1FVQVJFX0JSQUNLRVQpIHtcbiAgICAgICAgICBpc0JyYWNrZXQgPSB0b2tlbi5pc0JyYWNrZXQgPSB0cnVlO1xuICAgICAgICAgIGlzR2xvYiA9IHRva2VuLmlzR2xvYiA9IHRydWU7XG4gICAgICAgICAgZmluaXNoZWQgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzY2FuVG9FbmQgPT09IHRydWUpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChvcHRzLm5vbmVnYXRlICE9PSB0cnVlICYmIGNvZGUgPT09IENIQVJfRVhDTEFNQVRJT05fTUFSSyAmJiBpbmRleCA9PT0gc3RhcnQpIHtcbiAgICAgIG5lZ2F0ZWQgPSB0b2tlbi5uZWdhdGVkID0gdHJ1ZTtcbiAgICAgIHN0YXJ0Kys7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAob3B0cy5ub3BhcmVuICE9PSB0cnVlICYmIGNvZGUgPT09IENIQVJfTEVGVF9QQVJFTlRIRVNFUykge1xuICAgICAgaXNHbG9iID0gdG9rZW4uaXNHbG9iID0gdHJ1ZTtcblxuICAgICAgaWYgKHNjYW5Ub0VuZCA9PT0gdHJ1ZSkge1xuICAgICAgICB3aGlsZSAoZW9zKCkgIT09IHRydWUgJiYgKGNvZGUgPSBhZHZhbmNlKCkpKSB7XG4gICAgICAgICAgaWYgKGNvZGUgPT09IENIQVJfTEVGVF9QQVJFTlRIRVNFUykge1xuICAgICAgICAgICAgYmFja3NsYXNoZXMgPSB0b2tlbi5iYWNrc2xhc2hlcyA9IHRydWU7XG4gICAgICAgICAgICBjb2RlID0gYWR2YW5jZSgpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGNvZGUgPT09IENIQVJfUklHSFRfUEFSRU5USEVTRVMpIHtcbiAgICAgICAgICAgIGZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChpc0dsb2IgPT09IHRydWUpIHtcbiAgICAgIGZpbmlzaGVkID0gdHJ1ZTtcblxuICAgICAgaWYgKHNjYW5Ub0VuZCA9PT0gdHJ1ZSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKG9wdHMubm9leHQgPT09IHRydWUpIHtcbiAgICBpc0V4dGdsb2IgPSBmYWxzZTtcbiAgICBpc0dsb2IgPSBmYWxzZTtcbiAgfVxuXG4gIGxldCBiYXNlID0gc3RyO1xuICBsZXQgcHJlZml4ID0gJyc7XG4gIGxldCBnbG9iID0gJyc7XG5cbiAgaWYgKHN0YXJ0ID4gMCkge1xuICAgIHByZWZpeCA9IHN0ci5zbGljZSgwLCBzdGFydCk7XG4gICAgc3RyID0gc3RyLnNsaWNlKHN0YXJ0KTtcbiAgICBsYXN0SW5kZXggLT0gc3RhcnQ7XG4gIH1cblxuICBpZiAoYmFzZSAmJiBpc0dsb2IgPT09IHRydWUgJiYgbGFzdEluZGV4ID4gMCkge1xuICAgIGJhc2UgPSBzdHIuc2xpY2UoMCwgbGFzdEluZGV4KTtcbiAgICBnbG9iID0gc3RyLnNsaWNlKGxhc3RJbmRleCk7XG4gIH0gZWxzZSBpZiAoaXNHbG9iID09PSB0cnVlKSB7XG4gICAgYmFzZSA9ICcnO1xuICAgIGdsb2IgPSBzdHI7XG4gIH0gZWxzZSB7XG4gICAgYmFzZSA9IHN0cjtcbiAgfVxuXG4gIGlmIChiYXNlICYmIGJhc2UgIT09ICcnICYmIGJhc2UgIT09ICcvJyAmJiBiYXNlICE9PSBzdHIpIHtcbiAgICBpZiAoaXNQYXRoU2VwYXJhdG9yKGJhc2UuY2hhckNvZGVBdChiYXNlLmxlbmd0aCAtIDEpKSkge1xuICAgICAgYmFzZSA9IGJhc2Uuc2xpY2UoMCwgLTEpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChvcHRzLnVuZXNjYXBlID09PSB0cnVlKSB7XG4gICAgaWYgKGdsb2IpIGdsb2IgPSB1dGlscy5yZW1vdmVCYWNrc2xhc2hlcyhnbG9iKTtcblxuICAgIGlmIChiYXNlICYmIGJhY2tzbGFzaGVzID09PSB0cnVlKSB7XG4gICAgICBiYXNlID0gdXRpbHMucmVtb3ZlQmFja3NsYXNoZXMoYmFzZSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3Qgc3RhdGUgPSB7XG4gICAgcHJlZml4LFxuICAgIGlucHV0LFxuICAgIHN0YXJ0LFxuICAgIGJhc2UsXG4gICAgZ2xvYixcbiAgICBpc0JyYWNlLFxuICAgIGlzQnJhY2tldCxcbiAgICBpc0dsb2IsXG4gICAgaXNFeHRnbG9iLFxuICAgIGlzR2xvYnN0YXIsXG4gICAgbmVnYXRlZCxcbiAgICBuZWdhdGVkRXh0Z2xvYlxuICB9O1xuXG4gIGlmIChvcHRzLnRva2VucyA9PT0gdHJ1ZSkge1xuICAgIHN0YXRlLm1heERlcHRoID0gMDtcbiAgICBpZiAoIWlzUGF0aFNlcGFyYXRvcihjb2RlKSkge1xuICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgIH1cbiAgICBzdGF0ZS50b2tlbnMgPSB0b2tlbnM7XG4gIH1cblxuICBpZiAob3B0cy5wYXJ0cyA9PT0gdHJ1ZSB8fCBvcHRzLnRva2VucyA9PT0gdHJ1ZSkge1xuICAgIGxldCBwcmV2SW5kZXg7XG5cbiAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBzbGFzaGVzLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgIGNvbnN0IG4gPSBwcmV2SW5kZXggPyBwcmV2SW5kZXggKyAxIDogc3RhcnQ7XG4gICAgICBjb25zdCBpID0gc2xhc2hlc1tpZHhdO1xuICAgICAgY29uc3QgdmFsdWUgPSBpbnB1dC5zbGljZShuLCBpKTtcbiAgICAgIGlmIChvcHRzLnRva2Vucykge1xuICAgICAgICBpZiAoaWR4ID09PSAwICYmIHN0YXJ0ICE9PSAwKSB7XG4gICAgICAgICAgdG9rZW5zW2lkeF0uaXNQcmVmaXggPSB0cnVlO1xuICAgICAgICAgIHRva2Vuc1tpZHhdLnZhbHVlID0gcHJlZml4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRva2Vuc1tpZHhdLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZGVwdGgodG9rZW5zW2lkeF0pO1xuICAgICAgICBzdGF0ZS5tYXhEZXB0aCArPSB0b2tlbnNbaWR4XS5kZXB0aDtcbiAgICAgIH1cbiAgICAgIGlmIChpZHggIT09IDAgfHwgdmFsdWUgIT09ICcnKSB7XG4gICAgICAgIHBhcnRzLnB1c2godmFsdWUpO1xuICAgICAgfVxuICAgICAgcHJldkluZGV4ID0gaTtcbiAgICB9XG5cbiAgICBpZiAocHJldkluZGV4ICYmIHByZXZJbmRleCArIDEgPCBpbnB1dC5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gaW5wdXQuc2xpY2UocHJldkluZGV4ICsgMSk7XG4gICAgICBwYXJ0cy5wdXNoKHZhbHVlKTtcblxuICAgICAgaWYgKG9wdHMudG9rZW5zKSB7XG4gICAgICAgIHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV0udmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgZGVwdGgodG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXSk7XG4gICAgICAgIHN0YXRlLm1heERlcHRoICs9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV0uZGVwdGg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGUuc2xhc2hlcyA9IHNsYXNoZXM7XG4gICAgc3RhdGUucGFydHMgPSBwYXJ0cztcbiAgfVxuXG4gIHJldHVybiBzdGF0ZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2NhbjtcbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGNvbnN0YW50cyA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG5jb25zdCB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxuLyoqXG4gKiBDb25zdGFudHNcbiAqL1xuXG5jb25zdCB7XG4gIE1BWF9MRU5HVEgsXG4gIFBPU0lYX1JFR0VYX1NPVVJDRSxcbiAgUkVHRVhfTk9OX1NQRUNJQUxfQ0hBUlMsXG4gIFJFR0VYX1NQRUNJQUxfQ0hBUlNfQkFDS1JFRixcbiAgUkVQTEFDRU1FTlRTXG59ID0gY29uc3RhbnRzO1xuXG4vKipcbiAqIEhlbHBlcnNcbiAqL1xuXG5jb25zdCBleHBhbmRSYW5nZSA9IChhcmdzLCBvcHRpb25zKSA9PiB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5leHBhbmRSYW5nZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBvcHRpb25zLmV4cGFuZFJhbmdlKC4uLmFyZ3MsIG9wdGlvbnMpO1xuICB9XG5cbiAgYXJncy5zb3J0KCk7XG4gIGNvbnN0IHZhbHVlID0gYFske2FyZ3Muam9pbignLScpfV1gO1xuXG4gIHRyeSB7XG4gICAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldyAqL1xuICAgIG5ldyBSZWdFeHAodmFsdWUpO1xuICB9IGNhdGNoIChleCkge1xuICAgIHJldHVybiBhcmdzLm1hcCh2ID0+IHV0aWxzLmVzY2FwZVJlZ2V4KHYpKS5qb2luKCcuLicpO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgdGhlIG1lc3NhZ2UgZm9yIGEgc3ludGF4IGVycm9yXG4gKi9cblxuY29uc3Qgc3ludGF4RXJyb3IgPSAodHlwZSwgY2hhcikgPT4ge1xuICByZXR1cm4gYE1pc3NpbmcgJHt0eXBlfTogXCIke2NoYXJ9XCIgLSB1c2UgXCJcXFxcXFxcXCR7Y2hhcn1cIiB0byBtYXRjaCBsaXRlcmFsIGNoYXJhY3RlcnNgO1xufTtcblxuY29uc3Qgc3BsaXRUb3BMZXZlbCA9IGlucHV0ID0+IHtcbiAgY29uc3QgcGFydHMgPSBbXTtcbiAgbGV0IGJyYWNrZXQgPSAwO1xuICBsZXQgcGFyZW4gPSAwO1xuICBsZXQgcXVvdGUgPSAwO1xuICBsZXQgdmFsdWUgPSAnJztcbiAgbGV0IGVzY2FwZWQgPSBmYWxzZTtcblxuICBmb3IgKGNvbnN0IGNoIG9mIGlucHV0KSB7XG4gICAgaWYgKGVzY2FwZWQgPT09IHRydWUpIHtcbiAgICAgIHZhbHVlICs9IGNoO1xuICAgICAgZXNjYXBlZCA9IGZhbHNlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGNoID09PSAnXFxcXCcpIHtcbiAgICAgIHZhbHVlICs9IGNoO1xuICAgICAgZXNjYXBlZCA9IHRydWU7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoY2ggPT09ICdcIicpIHtcbiAgICAgIHF1b3RlID0gcXVvdGUgPT09IDEgPyAwIDogMTtcbiAgICAgIHZhbHVlICs9IGNoO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKHF1b3RlID09PSAwKSB7XG4gICAgICBpZiAoY2ggPT09ICdbJykge1xuICAgICAgICBicmFja2V0Kys7XG4gICAgICB9IGVsc2UgaWYgKGNoID09PSAnXScgJiYgYnJhY2tldCA+IDApIHtcbiAgICAgICAgYnJhY2tldC0tO1xuICAgICAgfSBlbHNlIGlmIChicmFja2V0ID09PSAwKSB7XG4gICAgICAgIGlmIChjaCA9PT0gJygnKSB7XG4gICAgICAgICAgcGFyZW4rKztcbiAgICAgICAgfSBlbHNlIGlmIChjaCA9PT0gJyknICYmIHBhcmVuID4gMCkge1xuICAgICAgICAgIHBhcmVuLS07XG4gICAgICAgIH0gZWxzZSBpZiAoY2ggPT09ICd8JyAmJiBwYXJlbiA9PT0gMCkge1xuICAgICAgICAgIHBhcnRzLnB1c2godmFsdWUpO1xuICAgICAgICAgIHZhbHVlID0gJyc7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YWx1ZSArPSBjaDtcbiAgfVxuXG4gIHBhcnRzLnB1c2godmFsdWUpO1xuICByZXR1cm4gcGFydHM7XG59O1xuXG5jb25zdCBpc1BsYWluQnJhbmNoID0gYnJhbmNoID0+IHtcbiAgbGV0IGVzY2FwZWQgPSBmYWxzZTtcblxuICBmb3IgKGNvbnN0IGNoIG9mIGJyYW5jaCkge1xuICAgIGlmIChlc2NhcGVkID09PSB0cnVlKSB7XG4gICAgICBlc2NhcGVkID0gZmFsc2U7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoY2ggPT09ICdcXFxcJykge1xuICAgICAgZXNjYXBlZCA9IHRydWU7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoL1s/KitAISgpW1xcXXt9XS8udGVzdChjaCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZVNpbXBsZUJyYW5jaCA9IGJyYW5jaCA9PiB7XG4gIGxldCB2YWx1ZSA9IGJyYW5jaC50cmltKCk7XG4gIGxldCBjaGFuZ2VkID0gdHJ1ZTtcblxuICB3aGlsZSAoY2hhbmdlZCA9PT0gdHJ1ZSkge1xuICAgIGNoYW5nZWQgPSBmYWxzZTtcblxuICAgIGlmICgvXkBcXChbXlxcXFwoKVtcXF17fXxdK1xcKSQvLnRlc3QodmFsdWUpKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlLnNsaWNlKDIsIC0xKTtcbiAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGlmICghaXNQbGFpbkJyYW5jaCh2YWx1ZSkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICByZXR1cm4gdmFsdWUucmVwbGFjZSgvXFxcXCguKS9nLCAnJDEnKTtcbn07XG5cbmNvbnN0IGhhc1JlcGVhdGVkQ2hhclByZWZpeE92ZXJsYXAgPSBicmFuY2hlcyA9PiB7XG4gIGNvbnN0IHZhbHVlcyA9IGJyYW5jaGVzLm1hcChub3JtYWxpemVTaW1wbGVCcmFuY2gpLmZpbHRlcihCb29sZWFuKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgIGZvciAobGV0IGogPSBpICsgMTsgaiA8IHZhbHVlcy5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3QgYSA9IHZhbHVlc1tpXTtcbiAgICAgIGNvbnN0IGIgPSB2YWx1ZXNbal07XG4gICAgICBjb25zdCBjaGFyID0gYVswXTtcblxuICAgICAgaWYgKCFjaGFyIHx8IGEgIT09IGNoYXIucmVwZWF0KGEubGVuZ3RoKSB8fCBiICE9PSBjaGFyLnJlcGVhdChiLmxlbmd0aCkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChhID09PSBiIHx8IGEuc3RhcnRzV2l0aChiKSB8fCBiLnN0YXJ0c1dpdGgoYSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuY29uc3QgcGFyc2VSZXBlYXRlZEV4dGdsb2IgPSAocGF0dGVybiwgcmVxdWlyZUVuZCA9IHRydWUpID0+IHtcbiAgaWYgKChwYXR0ZXJuWzBdICE9PSAnKycgJiYgcGF0dGVyblswXSAhPT0gJyonKSB8fCBwYXR0ZXJuWzFdICE9PSAnKCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgYnJhY2tldCA9IDA7XG4gIGxldCBwYXJlbiA9IDA7XG4gIGxldCBxdW90ZSA9IDA7XG4gIGxldCBlc2NhcGVkID0gZmFsc2U7XG5cbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBwYXR0ZXJuLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY2ggPSBwYXR0ZXJuW2ldO1xuXG4gICAgaWYgKGVzY2FwZWQgPT09IHRydWUpIHtcbiAgICAgIGVzY2FwZWQgPSBmYWxzZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChjaCA9PT0gJ1xcXFwnKSB7XG4gICAgICBlc2NhcGVkID0gdHJ1ZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChjaCA9PT0gJ1wiJykge1xuICAgICAgcXVvdGUgPSBxdW90ZSA9PT0gMSA/IDAgOiAxO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKHF1b3RlID09PSAxKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoY2ggPT09ICdbJykge1xuICAgICAgYnJhY2tldCsrO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGNoID09PSAnXScgJiYgYnJhY2tldCA+IDApIHtcbiAgICAgIGJyYWNrZXQtLTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChicmFja2V0ID4gMCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGNoID09PSAnKCcpIHtcbiAgICAgIHBhcmVuKys7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoY2ggPT09ICcpJykge1xuICAgICAgcGFyZW4tLTtcblxuICAgICAgaWYgKHBhcmVuID09PSAwKSB7XG4gICAgICAgIGlmIChyZXF1aXJlRW5kID09PSB0cnVlICYmIGkgIT09IHBhdHRlcm4ubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdHlwZTogcGF0dGVyblswXSxcbiAgICAgICAgICBib2R5OiBwYXR0ZXJuLnNsaWNlKDIsIGkpLFxuICAgICAgICAgIGVuZDogaVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuY29uc3QgZ2V0U3RhckV4dGdsb2JTZXF1ZW5jZU91dHB1dCA9IHBhdHRlcm4gPT4ge1xuICBsZXQgaW5kZXggPSAwO1xuICBjb25zdCBjaGFycyA9IFtdO1xuXG4gIHdoaWxlIChpbmRleCA8IHBhdHRlcm4ubGVuZ3RoKSB7XG4gICAgY29uc3QgbWF0Y2ggPSBwYXJzZVJlcGVhdGVkRXh0Z2xvYihwYXR0ZXJuLnNsaWNlKGluZGV4KSwgZmFsc2UpO1xuXG4gICAgaWYgKCFtYXRjaCB8fCBtYXRjaC50eXBlICE9PSAnKicpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBicmFuY2hlcyA9IHNwbGl0VG9wTGV2ZWwobWF0Y2guYm9keSkubWFwKGJyYW5jaCA9PiBicmFuY2gudHJpbSgpKTtcbiAgICBpZiAoYnJhbmNoZXMubGVuZ3RoICE9PSAxKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYnJhbmNoID0gbm9ybWFsaXplU2ltcGxlQnJhbmNoKGJyYW5jaGVzWzBdKTtcbiAgICBpZiAoIWJyYW5jaCB8fCBicmFuY2gubGVuZ3RoICE9PSAxKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY2hhcnMucHVzaChicmFuY2gpO1xuICAgIGluZGV4ICs9IG1hdGNoLmVuZCArIDE7XG4gIH1cblxuICBpZiAoY2hhcnMubGVuZ3RoIDwgMSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHNvdXJjZSA9IGNoYXJzLmxlbmd0aCA9PT0gMVxuICAgID8gdXRpbHMuZXNjYXBlUmVnZXgoY2hhcnNbMF0pXG4gICAgOiBgWyR7Y2hhcnMubWFwKGNoID0+IHV0aWxzLmVzY2FwZVJlZ2V4KGNoKSkuam9pbignJyl9XWA7XG5cbiAgcmV0dXJuIGAke3NvdXJjZX0qYDtcbn07XG5cbmNvbnN0IHJlcGVhdGVkRXh0Z2xvYlJlY3Vyc2lvbiA9IHBhdHRlcm4gPT4ge1xuICBsZXQgZGVwdGggPSAwO1xuICBsZXQgdmFsdWUgPSBwYXR0ZXJuLnRyaW0oKTtcbiAgbGV0IG1hdGNoID0gcGFyc2VSZXBlYXRlZEV4dGdsb2IodmFsdWUpO1xuXG4gIHdoaWxlIChtYXRjaCkge1xuICAgIGRlcHRoKys7XG4gICAgdmFsdWUgPSBtYXRjaC5ib2R5LnRyaW0oKTtcbiAgICBtYXRjaCA9IHBhcnNlUmVwZWF0ZWRFeHRnbG9iKHZhbHVlKTtcbiAgfVxuXG4gIHJldHVybiBkZXB0aDtcbn07XG5cbmNvbnN0IGFuYWx5emVSZXBlYXRlZEV4dGdsb2IgPSAoYm9keSwgb3B0aW9ucykgPT4ge1xuICBpZiAob3B0aW9ucy5tYXhFeHRnbG9iUmVjdXJzaW9uID09PSBmYWxzZSkge1xuICAgIHJldHVybiB7IHJpc2t5OiBmYWxzZSB9O1xuICB9XG5cbiAgY29uc3QgbWF4ID1cbiAgICB0eXBlb2Ygb3B0aW9ucy5tYXhFeHRnbG9iUmVjdXJzaW9uID09PSAnbnVtYmVyJ1xuICAgICAgPyBvcHRpb25zLm1heEV4dGdsb2JSZWN1cnNpb25cbiAgICAgIDogY29uc3RhbnRzLkRFRkFVTFRfTUFYX0VYVEdMT0JfUkVDVVJTSU9OO1xuXG4gIGNvbnN0IGJyYW5jaGVzID0gc3BsaXRUb3BMZXZlbChib2R5KS5tYXAoYnJhbmNoID0+IGJyYW5jaC50cmltKCkpO1xuXG4gIGlmIChicmFuY2hlcy5sZW5ndGggPiAxKSB7XG4gICAgaWYgKFxuICAgICAgYnJhbmNoZXMuc29tZShicmFuY2ggPT4gYnJhbmNoID09PSAnJykgfHxcbiAgICAgIGJyYW5jaGVzLnNvbWUoYnJhbmNoID0+IC9eWyo/XSskLy50ZXN0KGJyYW5jaCkpIHx8XG4gICAgICBoYXNSZXBlYXRlZENoYXJQcmVmaXhPdmVybGFwKGJyYW5jaGVzKVxuICAgICkge1xuICAgICAgcmV0dXJuIHsgcmlza3k6IHRydWUgfTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGNvbnN0IGJyYW5jaCBvZiBicmFuY2hlcykge1xuICAgIGNvbnN0IHNhZmVPdXRwdXQgPSBnZXRTdGFyRXh0Z2xvYlNlcXVlbmNlT3V0cHV0KGJyYW5jaCk7XG4gICAgaWYgKHNhZmVPdXRwdXQpIHtcbiAgICAgIHJldHVybiB7IHJpc2t5OiB0cnVlLCBzYWZlT3V0cHV0IH07XG4gICAgfVxuXG4gICAgaWYgKHJlcGVhdGVkRXh0Z2xvYlJlY3Vyc2lvbihicmFuY2gpID4gbWF4KSB7XG4gICAgICByZXR1cm4geyByaXNreTogdHJ1ZSB9O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IHJpc2t5OiBmYWxzZSB9O1xufTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gaW5wdXQgc3RyaW5nLlxuICogQHBhcmFtIHtTdHJpbmd9IGlucHV0XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5cbmNvbnN0IHBhcnNlID0gKGlucHV0LCBvcHRpb25zKSA9PiB7XG4gIGlmICh0eXBlb2YgaW5wdXQgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBzdHJpbmcnKTtcbiAgfVxuXG4gIGlucHV0ID0gUkVQTEFDRU1FTlRTW2lucHV0XSB8fCBpbnB1dDtcblxuICBjb25zdCBvcHRzID0geyAuLi5vcHRpb25zIH07XG4gIGNvbnN0IG1heCA9IHR5cGVvZiBvcHRzLm1heExlbmd0aCA9PT0gJ251bWJlcicgPyBNYXRoLm1pbihNQVhfTEVOR1RILCBvcHRzLm1heExlbmd0aCkgOiBNQVhfTEVOR1RIO1xuXG4gIGxldCBsZW4gPSBpbnB1dC5sZW5ndGg7XG4gIGlmIChsZW4gPiBtYXgpIHtcbiAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYElucHV0IGxlbmd0aDogJHtsZW59LCBleGNlZWRzIG1heGltdW0gYWxsb3dlZCBsZW5ndGg6ICR7bWF4fWApO1xuICB9XG5cbiAgY29uc3QgYm9zID0geyB0eXBlOiAnYm9zJywgdmFsdWU6ICcnLCBvdXRwdXQ6IG9wdHMucHJlcGVuZCB8fCAnJyB9O1xuICBjb25zdCB0b2tlbnMgPSBbYm9zXTtcblxuICBjb25zdCBjYXB0dXJlID0gb3B0cy5jYXB0dXJlID8gJycgOiAnPzonO1xuICBjb25zdCB3aW4zMiA9IHV0aWxzLmlzV2luZG93cyhvcHRpb25zKTtcblxuICAvLyBjcmVhdGUgY29uc3RhbnRzIGJhc2VkIG9uIHBsYXRmb3JtLCBmb3Igd2luZG93cyBvciBwb3NpeFxuICBjb25zdCBQTEFURk9STV9DSEFSUyA9IGNvbnN0YW50cy5nbG9iQ2hhcnMod2luMzIpO1xuICBjb25zdCBFWFRHTE9CX0NIQVJTID0gY29uc3RhbnRzLmV4dGdsb2JDaGFycyhQTEFURk9STV9DSEFSUyk7XG5cbiAgY29uc3Qge1xuICAgIERPVF9MSVRFUkFMLFxuICAgIFBMVVNfTElURVJBTCxcbiAgICBTTEFTSF9MSVRFUkFMLFxuICAgIE9ORV9DSEFSLFxuICAgIERPVFNfU0xBU0gsXG4gICAgTk9fRE9ULFxuICAgIE5PX0RPVF9TTEFTSCxcbiAgICBOT19ET1RTX1NMQVNILFxuICAgIFFNQVJLLFxuICAgIFFNQVJLX05PX0RPVCxcbiAgICBTVEFSLFxuICAgIFNUQVJUX0FOQ0hPUlxuICB9ID0gUExBVEZPUk1fQ0hBUlM7XG5cbiAgY29uc3QgZ2xvYnN0YXIgPSBvcHRzID0+IHtcbiAgICByZXR1cm4gYCgke2NhcHR1cmV9KD86KD8hJHtTVEFSVF9BTkNIT1J9JHtvcHRzLmRvdCA/IERPVFNfU0xBU0ggOiBET1RfTElURVJBTH0pLikqPylgO1xuICB9O1xuXG4gIGNvbnN0IG5vZG90ID0gb3B0cy5kb3QgPyAnJyA6IE5PX0RPVDtcbiAgY29uc3QgcW1hcmtOb0RvdCA9IG9wdHMuZG90ID8gUU1BUksgOiBRTUFSS19OT19ET1Q7XG4gIGxldCBzdGFyID0gb3B0cy5iYXNoID09PSB0cnVlID8gZ2xvYnN0YXIob3B0cykgOiBTVEFSO1xuXG4gIGlmIChvcHRzLmNhcHR1cmUpIHtcbiAgICBzdGFyID0gYCgke3N0YXJ9KWA7XG4gIH1cblxuICAvLyBtaW5pbWF0Y2ggb3B0aW9ucyBzdXBwb3J0XG4gIGlmICh0eXBlb2Ygb3B0cy5ub2V4dCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgb3B0cy5ub2V4dGdsb2IgPSBvcHRzLm5vZXh0O1xuICB9XG5cbiAgY29uc3Qgc3RhdGUgPSB7XG4gICAgaW5wdXQsXG4gICAgaW5kZXg6IC0xLFxuICAgIHN0YXJ0OiAwLFxuICAgIGRvdDogb3B0cy5kb3QgPT09IHRydWUsXG4gICAgY29uc3VtZWQ6ICcnLFxuICAgIG91dHB1dDogJycsXG4gICAgcHJlZml4OiAnJyxcbiAgICBiYWNrdHJhY2s6IGZhbHNlLFxuICAgIG5lZ2F0ZWQ6IGZhbHNlLFxuICAgIGJyYWNrZXRzOiAwLFxuICAgIGJyYWNlczogMCxcbiAgICBwYXJlbnM6IDAsXG4gICAgcXVvdGVzOiAwLFxuICAgIGdsb2JzdGFyOiBmYWxzZSxcbiAgICB0b2tlbnNcbiAgfTtcblxuICBpbnB1dCA9IHV0aWxzLnJlbW92ZVByZWZpeChpbnB1dCwgc3RhdGUpO1xuICBsZW4gPSBpbnB1dC5sZW5ndGg7XG5cbiAgY29uc3QgZXh0Z2xvYnMgPSBbXTtcbiAgY29uc3QgYnJhY2VzID0gW107XG4gIGNvbnN0IHN0YWNrID0gW107XG4gIGxldCBwcmV2ID0gYm9zO1xuICBsZXQgdmFsdWU7XG5cbiAgLyoqXG4gICAqIFRva2VuaXppbmcgaGVscGVyc1xuICAgKi9cblxuICBjb25zdCBlb3MgPSAoKSA9PiBzdGF0ZS5pbmRleCA9PT0gbGVuIC0gMTtcbiAgY29uc3QgcGVlayA9IHN0YXRlLnBlZWsgPSAobiA9IDEpID0+IGlucHV0W3N0YXRlLmluZGV4ICsgbl07XG4gIGNvbnN0IGFkdmFuY2UgPSBzdGF0ZS5hZHZhbmNlID0gKCkgPT4gaW5wdXRbKytzdGF0ZS5pbmRleF0gfHwgJyc7XG4gIGNvbnN0IHJlbWFpbmluZyA9ICgpID0+IGlucHV0LnNsaWNlKHN0YXRlLmluZGV4ICsgMSk7XG4gIGNvbnN0IGNvbnN1bWUgPSAodmFsdWUgPSAnJywgbnVtID0gMCkgPT4ge1xuICAgIHN0YXRlLmNvbnN1bWVkICs9IHZhbHVlO1xuICAgIHN0YXRlLmluZGV4ICs9IG51bTtcbiAgfTtcblxuICBjb25zdCBhcHBlbmQgPSB0b2tlbiA9PiB7XG4gICAgc3RhdGUub3V0cHV0ICs9IHRva2VuLm91dHB1dCAhPSBudWxsID8gdG9rZW4ub3V0cHV0IDogdG9rZW4udmFsdWU7XG4gICAgY29uc3VtZSh0b2tlbi52YWx1ZSk7XG4gIH07XG5cbiAgY29uc3QgbmVnYXRlID0gKCkgPT4ge1xuICAgIGxldCBjb3VudCA9IDE7XG5cbiAgICB3aGlsZSAocGVlaygpID09PSAnIScgJiYgKHBlZWsoMikgIT09ICcoJyB8fCBwZWVrKDMpID09PSAnPycpKSB7XG4gICAgICBhZHZhbmNlKCk7XG4gICAgICBzdGF0ZS5zdGFydCsrO1xuICAgICAgY291bnQrKztcbiAgICB9XG5cbiAgICBpZiAoY291bnQgJSAyID09PSAwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgc3RhdGUubmVnYXRlZCA9IHRydWU7XG4gICAgc3RhdGUuc3RhcnQrKztcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCBpbmNyZW1lbnQgPSB0eXBlID0+IHtcbiAgICBzdGF0ZVt0eXBlXSsrO1xuICAgIHN0YWNrLnB1c2godHlwZSk7XG4gIH07XG5cbiAgY29uc3QgZGVjcmVtZW50ID0gdHlwZSA9PiB7XG4gICAgc3RhdGVbdHlwZV0tLTtcbiAgICBzdGFjay5wb3AoKTtcbiAgfTtcblxuICAvKipcbiAgICogUHVzaCB0b2tlbnMgb250byB0aGUgdG9rZW5zIGFycmF5LiBUaGlzIGhlbHBlciBzcGVlZHMgdXBcbiAgICogdG9rZW5pemluZyBieSAxKSBoZWxwaW5nIHVzIGF2b2lkIGJhY2t0cmFja2luZyBhcyBtdWNoIGFzIHBvc3NpYmxlLFxuICAgKiBhbmQgMikgaGVscGluZyB1cyBhdm9pZCBjcmVhdGluZyBleHRyYSB0b2tlbnMgd2hlbiBjb25zZWN1dGl2ZVxuICAgKiBjaGFyYWN0ZXJzIGFyZSBwbGFpbiB0ZXh0LiBUaGlzIGltcHJvdmVzIHBlcmZvcm1hbmNlIGFuZCBzaW1wbGlmaWVzXG4gICAqIGxvb2tiZWhpbmRzLlxuICAgKi9cblxuICBjb25zdCBwdXNoID0gdG9rID0+IHtcbiAgICBpZiAocHJldi50eXBlID09PSAnZ2xvYnN0YXInKSB7XG4gICAgICBjb25zdCBpc0JyYWNlID0gc3RhdGUuYnJhY2VzID4gMCAmJiAodG9rLnR5cGUgPT09ICdjb21tYScgfHwgdG9rLnR5cGUgPT09ICdicmFjZScpO1xuICAgICAgY29uc3QgaXNFeHRnbG9iID0gdG9rLmV4dGdsb2IgPT09IHRydWUgfHwgKGV4dGdsb2JzLmxlbmd0aCAmJiAodG9rLnR5cGUgPT09ICdwaXBlJyB8fCB0b2sudHlwZSA9PT0gJ3BhcmVuJykpO1xuXG4gICAgICBpZiAodG9rLnR5cGUgIT09ICdzbGFzaCcgJiYgdG9rLnR5cGUgIT09ICdwYXJlbicgJiYgIWlzQnJhY2UgJiYgIWlzRXh0Z2xvYikge1xuICAgICAgICBzdGF0ZS5vdXRwdXQgPSBzdGF0ZS5vdXRwdXQuc2xpY2UoMCwgLXByZXYub3V0cHV0Lmxlbmd0aCk7XG4gICAgICAgIHByZXYudHlwZSA9ICdzdGFyJztcbiAgICAgICAgcHJldi52YWx1ZSA9ICcqJztcbiAgICAgICAgcHJldi5vdXRwdXQgPSBzdGFyO1xuICAgICAgICBzdGF0ZS5vdXRwdXQgKz0gcHJldi5vdXRwdXQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGV4dGdsb2JzLmxlbmd0aCAmJiB0b2sudHlwZSAhPT0gJ3BhcmVuJykge1xuICAgICAgZXh0Z2xvYnNbZXh0Z2xvYnMubGVuZ3RoIC0gMV0uaW5uZXIgKz0gdG9rLnZhbHVlO1xuICAgIH1cblxuICAgIGlmICh0b2sudmFsdWUgfHwgdG9rLm91dHB1dCkgYXBwZW5kKHRvayk7XG4gICAgaWYgKHByZXYgJiYgcHJldi50eXBlID09PSAndGV4dCcgJiYgdG9rLnR5cGUgPT09ICd0ZXh0Jykge1xuICAgICAgcHJldi52YWx1ZSArPSB0b2sudmFsdWU7XG4gICAgICBwcmV2Lm91dHB1dCA9IChwcmV2Lm91dHB1dCB8fCAnJykgKyB0b2sudmFsdWU7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9rLnByZXYgPSBwcmV2O1xuICAgIHRva2Vucy5wdXNoKHRvayk7XG4gICAgcHJldiA9IHRvaztcbiAgfTtcblxuICBjb25zdCBleHRnbG9iT3BlbiA9ICh0eXBlLCB2YWx1ZSkgPT4ge1xuICAgIGNvbnN0IHRva2VuID0geyAuLi5FWFRHTE9CX0NIQVJTW3ZhbHVlXSwgY29uZGl0aW9uczogMSwgaW5uZXI6ICcnIH07XG5cbiAgICB0b2tlbi5wcmV2ID0gcHJldjtcbiAgICB0b2tlbi5wYXJlbnMgPSBzdGF0ZS5wYXJlbnM7XG4gICAgdG9rZW4ub3V0cHV0ID0gc3RhdGUub3V0cHV0O1xuICAgIHRva2VuLnN0YXJ0SW5kZXggPSBzdGF0ZS5pbmRleDtcbiAgICB0b2tlbi50b2tlbnNJbmRleCA9IHRva2Vucy5sZW5ndGg7XG4gICAgY29uc3Qgb3V0cHV0ID0gKG9wdHMuY2FwdHVyZSA/ICcoJyA6ICcnKSArIHRva2VuLm9wZW47XG5cbiAgICBpbmNyZW1lbnQoJ3BhcmVucycpO1xuICAgIHB1c2goeyB0eXBlLCB2YWx1ZSwgb3V0cHV0OiBzdGF0ZS5vdXRwdXQgPyAnJyA6IE9ORV9DSEFSIH0pO1xuICAgIHB1c2goeyB0eXBlOiAncGFyZW4nLCBleHRnbG9iOiB0cnVlLCB2YWx1ZTogYWR2YW5jZSgpLCBvdXRwdXQgfSk7XG4gICAgZXh0Z2xvYnMucHVzaCh0b2tlbik7XG4gIH07XG5cbiAgY29uc3QgZXh0Z2xvYkNsb3NlID0gdG9rZW4gPT4ge1xuICAgIGNvbnN0IGxpdGVyYWwgPSBpbnB1dC5zbGljZSh0b2tlbi5zdGFydEluZGV4LCBzdGF0ZS5pbmRleCArIDEpO1xuICAgIGNvbnN0IGJvZHkgPSBpbnB1dC5zbGljZSh0b2tlbi5zdGFydEluZGV4ICsgMiwgc3RhdGUuaW5kZXgpO1xuICAgIGNvbnN0IGFuYWx5c2lzID0gYW5hbHl6ZVJlcGVhdGVkRXh0Z2xvYihib2R5LCBvcHRzKTtcblxuICAgIGlmICgodG9rZW4udHlwZSA9PT0gJ3BsdXMnIHx8IHRva2VuLnR5cGUgPT09ICdzdGFyJykgJiYgYW5hbHlzaXMucmlza3kpIHtcbiAgICAgIGNvbnN0IHNhZmVPdXRwdXQgPSBhbmFseXNpcy5zYWZlT3V0cHV0XG4gICAgICAgID8gKHRva2VuLm91dHB1dCA/ICcnIDogT05FX0NIQVIpICsgKG9wdHMuY2FwdHVyZSA/IGAoJHthbmFseXNpcy5zYWZlT3V0cHV0fSlgIDogYW5hbHlzaXMuc2FmZU91dHB1dClcbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICBjb25zdCBvcGVuID0gdG9rZW5zW3Rva2VuLnRva2Vuc0luZGV4XTtcblxuICAgICAgb3Blbi50eXBlID0gJ3RleHQnO1xuICAgICAgb3Blbi52YWx1ZSA9IGxpdGVyYWw7XG4gICAgICBvcGVuLm91dHB1dCA9IHNhZmVPdXRwdXQgfHwgdXRpbHMuZXNjYXBlUmVnZXgobGl0ZXJhbCk7XG5cbiAgICAgIGZvciAobGV0IGkgPSB0b2tlbi50b2tlbnNJbmRleCArIDE7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdG9rZW5zW2ldLnZhbHVlID0gJyc7XG4gICAgICAgIHRva2Vuc1tpXS5vdXRwdXQgPSAnJztcbiAgICAgICAgZGVsZXRlIHRva2Vuc1tpXS5zdWZmaXg7XG4gICAgICB9XG5cbiAgICAgIHN0YXRlLm91dHB1dCA9IHRva2VuLm91dHB1dCArIG9wZW4ub3V0cHV0O1xuICAgICAgc3RhdGUuYmFja3RyYWNrID0gdHJ1ZTtcblxuICAgICAgcHVzaCh7IHR5cGU6ICdwYXJlbicsIGV4dGdsb2I6IHRydWUsIHZhbHVlLCBvdXRwdXQ6ICcnIH0pO1xuICAgICAgZGVjcmVtZW50KCdwYXJlbnMnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgb3V0cHV0ID0gdG9rZW4uY2xvc2UgKyAob3B0cy5jYXB0dXJlID8gJyknIDogJycpO1xuICAgIGxldCByZXN0O1xuXG4gICAgaWYgKHRva2VuLnR5cGUgPT09ICduZWdhdGUnKSB7XG4gICAgICBsZXQgZXh0Z2xvYlN0YXIgPSBzdGFyO1xuXG4gICAgICBpZiAodG9rZW4uaW5uZXIgJiYgdG9rZW4uaW5uZXIubGVuZ3RoID4gMSAmJiB0b2tlbi5pbm5lci5pbmNsdWRlcygnLycpKSB7XG4gICAgICAgIGV4dGdsb2JTdGFyID0gZ2xvYnN0YXIob3B0cyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChleHRnbG9iU3RhciAhPT0gc3RhciB8fCBlb3MoKSB8fCAvXlxcKSskLy50ZXN0KHJlbWFpbmluZygpKSkge1xuICAgICAgICBvdXRwdXQgPSB0b2tlbi5jbG9zZSA9IGApJCkpJHtleHRnbG9iU3Rhcn1gO1xuICAgICAgfVxuXG4gICAgICBpZiAodG9rZW4uaW5uZXIuaW5jbHVkZXMoJyonKSAmJiAocmVzdCA9IHJlbWFpbmluZygpKSAmJiAvXlxcLlteXFxcXC8uXSskLy50ZXN0KHJlc3QpKSB7XG4gICAgICAgIC8vIEFueSBub24tbWFnaWNhbCBzdHJpbmcgKGAudHNgKSBvciBldmVuIG5lc3RlZCBleHByZXNzaW9uIChgLnt0cyx0c3h9YCkgY2FuIGZvbGxvdyBhZnRlciB0aGUgY2xvc2luZyBwYXJlbnRoZXNpcy5cbiAgICAgICAgLy8gSW4gdGhpcyBjYXNlLCB3ZSBuZWVkIHRvIHBhcnNlIHRoZSBzdHJpbmcgYW5kIHVzZSBpdCBpbiB0aGUgb3V0cHV0IG9mIHRoZSBvcmlnaW5hbCBwYXR0ZXJuLlxuICAgICAgICAvLyBTdWl0YWJsZSBwYXR0ZXJuczogYC8hKCouZCkudHNgLCBgLyEoKi5kKS57dHMsdHN4fWAsIGAqKi8hKCotZGJnKS5AKGpzKWAuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIERpc2FibGluZyB0aGUgYGZhc3RwYXRoc2Agb3B0aW9uIGR1ZSB0byBhIHByb2JsZW0gd2l0aCBwYXJzaW5nIHN0cmluZ3MgYXMgYC50c2AgaW4gdGhlIHBhdHRlcm4gbGlrZSBgKiovISgqLmQpLnRzYC5cbiAgICAgICAgY29uc3QgZXhwcmVzc2lvbiA9IHBhcnNlKHJlc3QsIHsgLi4ub3B0aW9ucywgZmFzdHBhdGhzOiBmYWxzZSB9KS5vdXRwdXQ7XG5cbiAgICAgICAgb3V0cHV0ID0gdG9rZW4uY2xvc2UgPSBgKSR7ZXhwcmVzc2lvbn0pJHtleHRnbG9iU3Rhcn0pYDtcbiAgICAgIH1cblxuICAgICAgaWYgKHRva2VuLnByZXYudHlwZSA9PT0gJ2JvcycpIHtcbiAgICAgICAgc3RhdGUubmVnYXRlZEV4dGdsb2IgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHB1c2goeyB0eXBlOiAncGFyZW4nLCBleHRnbG9iOiB0cnVlLCB2YWx1ZSwgb3V0cHV0IH0pO1xuICAgIGRlY3JlbWVudCgncGFyZW5zJyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEZhc3QgcGF0aHNcbiAgICovXG5cbiAgaWYgKG9wdHMuZmFzdHBhdGhzICE9PSBmYWxzZSAmJiAhLyheWyohXXxbLygpW1xcXXt9XCJdKS8udGVzdChpbnB1dCkpIHtcbiAgICBsZXQgYmFja3NsYXNoZXMgPSBmYWxzZTtcblxuICAgIGxldCBvdXRwdXQgPSBpbnB1dC5yZXBsYWNlKFJFR0VYX1NQRUNJQUxfQ0hBUlNfQkFDS1JFRiwgKG0sIGVzYywgY2hhcnMsIGZpcnN0LCByZXN0LCBpbmRleCkgPT4ge1xuICAgICAgaWYgKGZpcnN0ID09PSAnXFxcXCcpIHtcbiAgICAgICAgYmFja3NsYXNoZXMgPSB0cnVlO1xuICAgICAgICByZXR1cm4gbTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpcnN0ID09PSAnPycpIHtcbiAgICAgICAgaWYgKGVzYykge1xuICAgICAgICAgIHJldHVybiBlc2MgKyBmaXJzdCArIChyZXN0ID8gUU1BUksucmVwZWF0KHJlc3QubGVuZ3RoKSA6ICcnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gcW1hcmtOb0RvdCArIChyZXN0ID8gUU1BUksucmVwZWF0KHJlc3QubGVuZ3RoKSA6ICcnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUU1BUksucmVwZWF0KGNoYXJzLmxlbmd0aCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaXJzdCA9PT0gJy4nKSB7XG4gICAgICAgIHJldHVybiBET1RfTElURVJBTC5yZXBlYXQoY2hhcnMubGVuZ3RoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpcnN0ID09PSAnKicpIHtcbiAgICAgICAgaWYgKGVzYykge1xuICAgICAgICAgIHJldHVybiBlc2MgKyBmaXJzdCArIChyZXN0ID8gc3RhciA6ICcnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RhcjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlc2MgPyBtIDogYFxcXFwke219YDtcbiAgICB9KTtcblxuICAgIGlmIChiYWNrc2xhc2hlcyA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKG9wdHMudW5lc2NhcGUgPT09IHRydWUpIHtcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoL1xcXFwvZywgJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoL1xcXFwrL2csIG0gPT4ge1xuICAgICAgICAgIHJldHVybiBtLmxlbmd0aCAlIDIgPT09IDAgPyAnXFxcXFxcXFwnIDogKG0gPyAnXFxcXCcgOiAnJyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChvdXRwdXQgPT09IGlucHV0ICYmIG9wdHMuY29udGFpbnMgPT09IHRydWUpIHtcbiAgICAgIHN0YXRlLm91dHB1dCA9IGlucHV0O1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIHN0YXRlLm91dHB1dCA9IHV0aWxzLndyYXBPdXRwdXQob3V0cHV0LCBzdGF0ZSwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRva2VuaXplIGlucHV0IHVudGlsIHdlIHJlYWNoIGVuZC1vZi1zdHJpbmdcbiAgICovXG5cbiAgd2hpbGUgKCFlb3MoKSkge1xuICAgIHZhbHVlID0gYWR2YW5jZSgpO1xuXG4gICAgaWYgKHZhbHVlID09PSAnXFx1MDAwMCcpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVzY2FwZWQgY2hhcmFjdGVyc1xuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlID09PSAnXFxcXCcpIHtcbiAgICAgIGNvbnN0IG5leHQgPSBwZWVrKCk7XG5cbiAgICAgIGlmIChuZXh0ID09PSAnLycgJiYgb3B0cy5iYXNoICE9PSB0cnVlKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAobmV4dCA9PT0gJy4nIHx8IG5leHQgPT09ICc7Jykge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFuZXh0KSB7XG4gICAgICAgIHZhbHVlICs9ICdcXFxcJztcbiAgICAgICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWUgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBjb2xsYXBzZSBzbGFzaGVzIHRvIHJlZHVjZSBwb3RlbnRpYWwgZm9yIGV4cGxvaXRzXG4gICAgICBjb25zdCBtYXRjaCA9IC9eXFxcXCsvLmV4ZWMocmVtYWluaW5nKCkpO1xuICAgICAgbGV0IHNsYXNoZXMgPSAwO1xuXG4gICAgICBpZiAobWF0Y2ggJiYgbWF0Y2hbMF0ubGVuZ3RoID4gMikge1xuICAgICAgICBzbGFzaGVzID0gbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgICBzdGF0ZS5pbmRleCArPSBzbGFzaGVzO1xuICAgICAgICBpZiAoc2xhc2hlcyAlIDIgIT09IDApIHtcbiAgICAgICAgICB2YWx1ZSArPSAnXFxcXCc7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG9wdHMudW5lc2NhcGUgPT09IHRydWUpIHtcbiAgICAgICAgdmFsdWUgPSBhZHZhbmNlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSArPSBhZHZhbmNlKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZS5icmFja2V0cyA9PT0gMCkge1xuICAgICAgICBwdXNoKHsgdHlwZTogJ3RleHQnLCB2YWx1ZSB9KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSWYgd2UncmUgaW5zaWRlIGEgcmVnZXggY2hhcmFjdGVyIGNsYXNzLCBjb250aW51ZVxuICAgICAqIHVudGlsIHdlIHJlYWNoIHRoZSBjbG9zaW5nIGJyYWNrZXQuXG4gICAgICovXG5cbiAgICBpZiAoc3RhdGUuYnJhY2tldHMgPiAwICYmICh2YWx1ZSAhPT0gJ10nIHx8IHByZXYudmFsdWUgPT09ICdbJyB8fCBwcmV2LnZhbHVlID09PSAnW14nKSkge1xuICAgICAgaWYgKG9wdHMucG9zaXggIT09IGZhbHNlICYmIHZhbHVlID09PSAnOicpIHtcbiAgICAgICAgY29uc3QgaW5uZXIgPSBwcmV2LnZhbHVlLnNsaWNlKDEpO1xuICAgICAgICBpZiAoaW5uZXIuaW5jbHVkZXMoJ1snKSkge1xuICAgICAgICAgIHByZXYucG9zaXggPSB0cnVlO1xuXG4gICAgICAgICAgaWYgKGlubmVyLmluY2x1ZGVzKCc6JykpIHtcbiAgICAgICAgICAgIGNvbnN0IGlkeCA9IHByZXYudmFsdWUubGFzdEluZGV4T2YoJ1snKTtcbiAgICAgICAgICAgIGNvbnN0IHByZSA9IHByZXYudmFsdWUuc2xpY2UoMCwgaWR4KTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3QgPSBwcmV2LnZhbHVlLnNsaWNlKGlkeCArIDIpO1xuICAgICAgICAgICAgY29uc3QgcG9zaXggPSBQT1NJWF9SRUdFWF9TT1VSQ0VbcmVzdF07XG4gICAgICAgICAgICBpZiAocG9zaXgpIHtcbiAgICAgICAgICAgICAgcHJldi52YWx1ZSA9IHByZSArIHBvc2l4O1xuICAgICAgICAgICAgICBzdGF0ZS5iYWNrdHJhY2sgPSB0cnVlO1xuICAgICAgICAgICAgICBhZHZhbmNlKCk7XG5cbiAgICAgICAgICAgICAgaWYgKCFib3Mub3V0cHV0ICYmIHRva2Vucy5pbmRleE9mKHByZXYpID09PSAxKSB7XG4gICAgICAgICAgICAgICAgYm9zLm91dHB1dCA9IE9ORV9DSEFSO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoKHZhbHVlID09PSAnWycgJiYgcGVlaygpICE9PSAnOicpIHx8ICh2YWx1ZSA9PT0gJy0nICYmIHBlZWsoKSA9PT0gJ10nKSkge1xuICAgICAgICB2YWx1ZSA9IGBcXFxcJHt2YWx1ZX1gO1xuICAgICAgfVxuXG4gICAgICBpZiAodmFsdWUgPT09ICddJyAmJiAocHJldi52YWx1ZSA9PT0gJ1snIHx8IHByZXYudmFsdWUgPT09ICdbXicpKSB7XG4gICAgICAgIHZhbHVlID0gYFxcXFwke3ZhbHVlfWA7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRzLnBvc2l4ID09PSB0cnVlICYmIHZhbHVlID09PSAnIScgJiYgcHJldi52YWx1ZSA9PT0gJ1snKSB7XG4gICAgICAgIHZhbHVlID0gJ14nO1xuICAgICAgfVxuXG4gICAgICBwcmV2LnZhbHVlICs9IHZhbHVlO1xuICAgICAgYXBwZW5kKHsgdmFsdWUgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJZiB3ZSdyZSBpbnNpZGUgYSBxdW90ZWQgc3RyaW5nLCBjb250aW51ZVxuICAgICAqIHVudGlsIHdlIHJlYWNoIHRoZSBjbG9zaW5nIGRvdWJsZSBxdW90ZS5cbiAgICAgKi9cblxuICAgIGlmIChzdGF0ZS5xdW90ZXMgPT09IDEgJiYgdmFsdWUgIT09ICdcIicpIHtcbiAgICAgIHZhbHVlID0gdXRpbHMuZXNjYXBlUmVnZXgodmFsdWUpO1xuICAgICAgcHJldi52YWx1ZSArPSB2YWx1ZTtcbiAgICAgIGFwcGVuZCh7IHZhbHVlIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRG91YmxlIHF1b3Rlc1xuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlID09PSAnXCInKSB7XG4gICAgICBzdGF0ZS5xdW90ZXMgPSBzdGF0ZS5xdW90ZXMgPT09IDEgPyAwIDogMTtcbiAgICAgIGlmIChvcHRzLmtlZXBRdW90ZXMgPT09IHRydWUpIHtcbiAgICAgICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWUgfSk7XG4gICAgICB9XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJlbnRoZXNlc1xuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlID09PSAnKCcpIHtcbiAgICAgIGluY3JlbWVudCgncGFyZW5zJyk7XG4gICAgICBwdXNoKHsgdHlwZTogJ3BhcmVuJywgdmFsdWUgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUgPT09ICcpJykge1xuICAgICAgaWYgKHN0YXRlLnBhcmVucyA9PT0gMCAmJiBvcHRzLnN0cmljdEJyYWNrZXRzID09PSB0cnVlKSB7XG4gICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihzeW50YXhFcnJvcignb3BlbmluZycsICcoJykpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBleHRnbG9iID0gZXh0Z2xvYnNbZXh0Z2xvYnMubGVuZ3RoIC0gMV07XG4gICAgICBpZiAoZXh0Z2xvYiAmJiBzdGF0ZS5wYXJlbnMgPT09IGV4dGdsb2IucGFyZW5zICsgMSkge1xuICAgICAgICBleHRnbG9iQ2xvc2UoZXh0Z2xvYnMucG9wKCkpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgcHVzaCh7IHR5cGU6ICdwYXJlbicsIHZhbHVlLCBvdXRwdXQ6IHN0YXRlLnBhcmVucyA/ICcpJyA6ICdcXFxcKScgfSk7XG4gICAgICBkZWNyZW1lbnQoJ3BhcmVucycpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3F1YXJlIGJyYWNrZXRzXG4gICAgICovXG5cbiAgICBpZiAodmFsdWUgPT09ICdbJykge1xuICAgICAgaWYgKG9wdHMubm9icmFja2V0ID09PSB0cnVlIHx8ICFyZW1haW5pbmcoKS5pbmNsdWRlcygnXScpKSB7XG4gICAgICAgIGlmIChvcHRzLm5vYnJhY2tldCAhPT0gdHJ1ZSAmJiBvcHRzLnN0cmljdEJyYWNrZXRzID09PSB0cnVlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKHN5bnRheEVycm9yKCdjbG9zaW5nJywgJ10nKSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YWx1ZSA9IGBcXFxcJHt2YWx1ZX1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5jcmVtZW50KCdicmFja2V0cycpO1xuICAgICAgfVxuXG4gICAgICBwdXNoKHsgdHlwZTogJ2JyYWNrZXQnLCB2YWx1ZSB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZSA9PT0gJ10nKSB7XG4gICAgICBpZiAob3B0cy5ub2JyYWNrZXQgPT09IHRydWUgfHwgKHByZXYgJiYgcHJldi50eXBlID09PSAnYnJhY2tldCcgJiYgcHJldi52YWx1ZS5sZW5ndGggPT09IDEpKSB7XG4gICAgICAgIHB1c2goeyB0eXBlOiAndGV4dCcsIHZhbHVlLCBvdXRwdXQ6IGBcXFxcJHt2YWx1ZX1gIH0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlLmJyYWNrZXRzID09PSAwKSB7XG4gICAgICAgIGlmIChvcHRzLnN0cmljdEJyYWNrZXRzID09PSB0cnVlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKHN5bnRheEVycm9yKCdvcGVuaW5nJywgJ1snKSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdXNoKHsgdHlwZTogJ3RleHQnLCB2YWx1ZSwgb3V0cHV0OiBgXFxcXCR7dmFsdWV9YCB9KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGRlY3JlbWVudCgnYnJhY2tldHMnKTtcblxuICAgICAgY29uc3QgcHJldlZhbHVlID0gcHJldi52YWx1ZS5zbGljZSgxKTtcbiAgICAgIGlmIChwcmV2LnBvc2l4ICE9PSB0cnVlICYmIHByZXZWYWx1ZVswXSA9PT0gJ14nICYmICFwcmV2VmFsdWUuaW5jbHVkZXMoJy8nKSkge1xuICAgICAgICB2YWx1ZSA9IGAvJHt2YWx1ZX1gO1xuICAgICAgfVxuXG4gICAgICBwcmV2LnZhbHVlICs9IHZhbHVlO1xuICAgICAgYXBwZW5kKHsgdmFsdWUgfSk7XG5cbiAgICAgIC8vIHdoZW4gbGl0ZXJhbCBicmFja2V0cyBhcmUgZXhwbGljaXRseSBkaXNhYmxlZFxuICAgICAgLy8gYXNzdW1lIHdlIHNob3VsZCBtYXRjaCB3aXRoIGEgcmVnZXggY2hhcmFjdGVyIGNsYXNzXG4gICAgICBpZiAob3B0cy5saXRlcmFsQnJhY2tldHMgPT09IGZhbHNlIHx8IHV0aWxzLmhhc1JlZ2V4Q2hhcnMocHJldlZhbHVlKSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZXNjYXBlZCA9IHV0aWxzLmVzY2FwZVJlZ2V4KHByZXYudmFsdWUpO1xuICAgICAgc3RhdGUub3V0cHV0ID0gc3RhdGUub3V0cHV0LnNsaWNlKDAsIC1wcmV2LnZhbHVlLmxlbmd0aCk7XG5cbiAgICAgIC8vIHdoZW4gbGl0ZXJhbCBicmFja2V0cyBhcmUgZXhwbGljaXRseSBlbmFibGVkXG4gICAgICAvLyBhc3N1bWUgd2Ugc2hvdWxkIGVzY2FwZSB0aGUgYnJhY2tldHMgdG8gbWF0Y2ggbGl0ZXJhbCBjaGFyYWN0ZXJzXG4gICAgICBpZiAob3B0cy5saXRlcmFsQnJhY2tldHMgPT09IHRydWUpIHtcbiAgICAgICAgc3RhdGUub3V0cHV0ICs9IGVzY2FwZWQ7XG4gICAgICAgIHByZXYudmFsdWUgPSBlc2NhcGVkO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gd2hlbiB0aGUgdXNlciBzcGVjaWZpZXMgbm90aGluZywgdHJ5IHRvIG1hdGNoIGJvdGhcbiAgICAgIHByZXYudmFsdWUgPSBgKCR7Y2FwdHVyZX0ke2VzY2FwZWR9fCR7cHJldi52YWx1ZX0pYDtcbiAgICAgIHN0YXRlLm91dHB1dCArPSBwcmV2LnZhbHVlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQnJhY2VzXG4gICAgICovXG5cbiAgICBpZiAodmFsdWUgPT09ICd7JyAmJiBvcHRzLm5vYnJhY2UgIT09IHRydWUpIHtcbiAgICAgIGluY3JlbWVudCgnYnJhY2VzJyk7XG5cbiAgICAgIGNvbnN0IG9wZW4gPSB7XG4gICAgICAgIHR5cGU6ICdicmFjZScsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBvdXRwdXQ6ICcoJyxcbiAgICAgICAgb3V0cHV0SW5kZXg6IHN0YXRlLm91dHB1dC5sZW5ndGgsXG4gICAgICAgIHRva2Vuc0luZGV4OiBzdGF0ZS50b2tlbnMubGVuZ3RoXG4gICAgICB9O1xuXG4gICAgICBicmFjZXMucHVzaChvcGVuKTtcbiAgICAgIHB1c2gob3Blbik7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUgPT09ICd9Jykge1xuICAgICAgY29uc3QgYnJhY2UgPSBicmFjZXNbYnJhY2VzLmxlbmd0aCAtIDFdO1xuXG4gICAgICBpZiAob3B0cy5ub2JyYWNlID09PSB0cnVlIHx8ICFicmFjZSkge1xuICAgICAgICBwdXNoKHsgdHlwZTogJ3RleHQnLCB2YWx1ZSwgb3V0cHV0OiB2YWx1ZSB9KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGxldCBvdXRwdXQgPSAnKSc7XG5cbiAgICAgIGlmIChicmFjZS5kb3RzID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGFyciA9IHRva2Vucy5zbGljZSgpO1xuICAgICAgICBjb25zdCByYW5nZSA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSBhcnIubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB0b2tlbnMucG9wKCk7XG4gICAgICAgICAgaWYgKGFycltpXS50eXBlID09PSAnYnJhY2UnKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFycltpXS50eXBlICE9PSAnZG90cycpIHtcbiAgICAgICAgICAgIHJhbmdlLnVuc2hpZnQoYXJyW2ldLnZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBvdXRwdXQgPSBleHBhbmRSYW5nZShyYW5nZSwgb3B0cyk7XG4gICAgICAgIHN0YXRlLmJhY2t0cmFjayA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChicmFjZS5jb21tYSAhPT0gdHJ1ZSAmJiBicmFjZS5kb3RzICE9PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IG91dCA9IHN0YXRlLm91dHB1dC5zbGljZSgwLCBicmFjZS5vdXRwdXRJbmRleCk7XG4gICAgICAgIGNvbnN0IHRva3MgPSBzdGF0ZS50b2tlbnMuc2xpY2UoYnJhY2UudG9rZW5zSW5kZXgpO1xuICAgICAgICBicmFjZS52YWx1ZSA9IGJyYWNlLm91dHB1dCA9ICdcXFxceyc7XG4gICAgICAgIHZhbHVlID0gb3V0cHV0ID0gJ1xcXFx9JztcbiAgICAgICAgc3RhdGUub3V0cHV0ID0gb3V0O1xuICAgICAgICBmb3IgKGNvbnN0IHQgb2YgdG9rcykge1xuICAgICAgICAgIHN0YXRlLm91dHB1dCArPSAodC5vdXRwdXQgfHwgdC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcHVzaCh7IHR5cGU6ICdicmFjZScsIHZhbHVlLCBvdXRwdXQgfSk7XG4gICAgICBkZWNyZW1lbnQoJ2JyYWNlcycpO1xuICAgICAgYnJhY2VzLnBvcCgpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGlwZXNcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gJ3wnKSB7XG4gICAgICBpZiAoZXh0Z2xvYnMubGVuZ3RoID4gMCkge1xuICAgICAgICBleHRnbG9ic1tleHRnbG9icy5sZW5ndGggLSAxXS5jb25kaXRpb25zKys7XG4gICAgICB9XG4gICAgICBwdXNoKHsgdHlwZTogJ3RleHQnLCB2YWx1ZSB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbW1hc1xuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlID09PSAnLCcpIHtcbiAgICAgIGxldCBvdXRwdXQgPSB2YWx1ZTtcblxuICAgICAgY29uc3QgYnJhY2UgPSBicmFjZXNbYnJhY2VzLmxlbmd0aCAtIDFdO1xuICAgICAgaWYgKGJyYWNlICYmIHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdID09PSAnYnJhY2VzJykge1xuICAgICAgICBicmFjZS5jb21tYSA9IHRydWU7XG4gICAgICAgIG91dHB1dCA9ICd8JztcbiAgICAgIH1cblxuICAgICAgcHVzaCh7IHR5cGU6ICdjb21tYScsIHZhbHVlLCBvdXRwdXQgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTbGFzaGVzXG4gICAgICovXG5cbiAgICBpZiAodmFsdWUgPT09ICcvJykge1xuICAgICAgLy8gaWYgdGhlIGJlZ2lubmluZyBvZiB0aGUgZ2xvYiBpcyBcIi4vXCIsIGFkdmFuY2UgdGhlIHN0YXJ0XG4gICAgICAvLyB0byB0aGUgY3VycmVudCBpbmRleCwgYW5kIGRvbid0IGFkZCB0aGUgXCIuL1wiIGNoYXJhY3RlcnNcbiAgICAgIC8vIHRvIHRoZSBzdGF0ZS4gVGhpcyBncmVhdGx5IHNpbXBsaWZpZXMgbG9va2JlaGluZHMgd2hlblxuICAgICAgLy8gY2hlY2tpbmcgZm9yIEJPUyBjaGFyYWN0ZXJzIGxpa2UgXCIhXCIgYW5kIFwiLlwiIChub3QgXCIuL1wiKVxuICAgICAgaWYgKHByZXYudHlwZSA9PT0gJ2RvdCcgJiYgc3RhdGUuaW5kZXggPT09IHN0YXRlLnN0YXJ0ICsgMSkge1xuICAgICAgICBzdGF0ZS5zdGFydCA9IHN0YXRlLmluZGV4ICsgMTtcbiAgICAgICAgc3RhdGUuY29uc3VtZWQgPSAnJztcbiAgICAgICAgc3RhdGUub3V0cHV0ID0gJyc7XG4gICAgICAgIHRva2Vucy5wb3AoKTtcbiAgICAgICAgcHJldiA9IGJvczsgLy8gcmVzZXQgXCJwcmV2XCIgdG8gdGhlIGZpcnN0IHRva2VuXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBwdXNoKHsgdHlwZTogJ3NsYXNoJywgdmFsdWUsIG91dHB1dDogU0xBU0hfTElURVJBTCB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERvdHNcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gJy4nKSB7XG4gICAgICBpZiAoc3RhdGUuYnJhY2VzID4gMCAmJiBwcmV2LnR5cGUgPT09ICdkb3QnKSB7XG4gICAgICAgIGlmIChwcmV2LnZhbHVlID09PSAnLicpIHByZXYub3V0cHV0ID0gRE9UX0xJVEVSQUw7XG4gICAgICAgIGNvbnN0IGJyYWNlID0gYnJhY2VzW2JyYWNlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgcHJldi50eXBlID0gJ2RvdHMnO1xuICAgICAgICBwcmV2Lm91dHB1dCArPSB2YWx1ZTtcbiAgICAgICAgcHJldi52YWx1ZSArPSB2YWx1ZTtcbiAgICAgICAgYnJhY2UuZG90cyA9IHRydWU7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoKHN0YXRlLmJyYWNlcyArIHN0YXRlLnBhcmVucykgPT09IDAgJiYgcHJldi50eXBlICE9PSAnYm9zJyAmJiBwcmV2LnR5cGUgIT09ICdzbGFzaCcpIHtcbiAgICAgICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWUsIG91dHB1dDogRE9UX0xJVEVSQUwgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBwdXNoKHsgdHlwZTogJ2RvdCcsIHZhbHVlLCBvdXRwdXQ6IERPVF9MSVRFUkFMIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUXVlc3Rpb24gbWFya3NcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gJz8nKSB7XG4gICAgICBjb25zdCBpc0dyb3VwID0gcHJldiAmJiBwcmV2LnZhbHVlID09PSAnKCc7XG4gICAgICBpZiAoIWlzR3JvdXAgJiYgb3B0cy5ub2V4dGdsb2IgIT09IHRydWUgJiYgcGVlaygpID09PSAnKCcgJiYgcGVlaygyKSAhPT0gJz8nKSB7XG4gICAgICAgIGV4dGdsb2JPcGVuKCdxbWFyaycsIHZhbHVlKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcmV2ICYmIHByZXYudHlwZSA9PT0gJ3BhcmVuJykge1xuICAgICAgICBjb25zdCBuZXh0ID0gcGVlaygpO1xuICAgICAgICBsZXQgb3V0cHV0ID0gdmFsdWU7XG5cbiAgICAgICAgaWYgKG5leHQgPT09ICc8JyAmJiAhdXRpbHMuc3VwcG9ydHNMb29rYmVoaW5kcygpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb2RlLmpzIHYxMCBvciBoaWdoZXIgaXMgcmVxdWlyZWQgZm9yIHJlZ2V4IGxvb2tiZWhpbmRzJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoKHByZXYudmFsdWUgPT09ICcoJyAmJiAhL1shPTw6XS8udGVzdChuZXh0KSkgfHwgKG5leHQgPT09ICc8JyAmJiAhLzwoWyE9XXxcXHcrPikvLnRlc3QocmVtYWluaW5nKCkpKSkge1xuICAgICAgICAgIG91dHB1dCA9IGBcXFxcJHt2YWx1ZX1gO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWUsIG91dHB1dCB9KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRzLmRvdCAhPT0gdHJ1ZSAmJiAocHJldi50eXBlID09PSAnc2xhc2gnIHx8IHByZXYudHlwZSA9PT0gJ2JvcycpKSB7XG4gICAgICAgIHB1c2goeyB0eXBlOiAncW1hcmsnLCB2YWx1ZSwgb3V0cHV0OiBRTUFSS19OT19ET1QgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBwdXNoKHsgdHlwZTogJ3FtYXJrJywgdmFsdWUsIG91dHB1dDogUU1BUksgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeGNsYW1hdGlvblxuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlID09PSAnIScpIHtcbiAgICAgIGlmIChvcHRzLm5vZXh0Z2xvYiAhPT0gdHJ1ZSAmJiBwZWVrKCkgPT09ICcoJykge1xuICAgICAgICBpZiAocGVlaygyKSAhPT0gJz8nIHx8ICEvWyE9PDpdLy50ZXN0KHBlZWsoMykpKSB7XG4gICAgICAgICAgZXh0Z2xvYk9wZW4oJ25lZ2F0ZScsIHZhbHVlKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAob3B0cy5ub25lZ2F0ZSAhPT0gdHJ1ZSAmJiBzdGF0ZS5pbmRleCA9PT0gMCkge1xuICAgICAgICBuZWdhdGUoKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGx1c1xuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlID09PSAnKycpIHtcbiAgICAgIGlmIChvcHRzLm5vZXh0Z2xvYiAhPT0gdHJ1ZSAmJiBwZWVrKCkgPT09ICcoJyAmJiBwZWVrKDIpICE9PSAnPycpIHtcbiAgICAgICAgZXh0Z2xvYk9wZW4oJ3BsdXMnLCB2YWx1ZSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoKHByZXYgJiYgcHJldi52YWx1ZSA9PT0gJygnKSB8fCBvcHRzLnJlZ2V4ID09PSBmYWxzZSkge1xuICAgICAgICBwdXNoKHsgdHlwZTogJ3BsdXMnLCB2YWx1ZSwgb3V0cHV0OiBQTFVTX0xJVEVSQUwgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoKHByZXYgJiYgKHByZXYudHlwZSA9PT0gJ2JyYWNrZXQnIHx8IHByZXYudHlwZSA9PT0gJ3BhcmVuJyB8fCBwcmV2LnR5cGUgPT09ICdicmFjZScpKSB8fCBzdGF0ZS5wYXJlbnMgPiAwKSB7XG4gICAgICAgIHB1c2goeyB0eXBlOiAncGx1cycsIHZhbHVlIH0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgcHVzaCh7IHR5cGU6ICdwbHVzJywgdmFsdWU6IFBMVVNfTElURVJBTCB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBsYWluIHRleHRcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gJ0AnKSB7XG4gICAgICBpZiAob3B0cy5ub2V4dGdsb2IgIT09IHRydWUgJiYgcGVlaygpID09PSAnKCcgJiYgcGVlaygyKSAhPT0gJz8nKSB7XG4gICAgICAgIHB1c2goeyB0eXBlOiAnYXQnLCBleHRnbG9iOiB0cnVlLCB2YWx1ZSwgb3V0cHV0OiAnJyB9KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHB1c2goeyB0eXBlOiAndGV4dCcsIHZhbHVlIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGxhaW4gdGV4dFxuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlICE9PSAnKicpIHtcbiAgICAgIGlmICh2YWx1ZSA9PT0gJyQnIHx8IHZhbHVlID09PSAnXicpIHtcbiAgICAgICAgdmFsdWUgPSBgXFxcXCR7dmFsdWV9YDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbWF0Y2ggPSBSRUdFWF9OT05fU1BFQ0lBTF9DSEFSUy5leGVjKHJlbWFpbmluZygpKTtcbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICB2YWx1ZSArPSBtYXRjaFswXTtcbiAgICAgICAgc3RhdGUuaW5kZXggKz0gbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgfVxuXG4gICAgICBwdXNoKHsgdHlwZTogJ3RleHQnLCB2YWx1ZSB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0YXJzXG4gICAgICovXG5cbiAgICBpZiAocHJldiAmJiAocHJldi50eXBlID09PSAnZ2xvYnN0YXInIHx8IHByZXYuc3RhciA9PT0gdHJ1ZSkpIHtcbiAgICAgIHByZXYudHlwZSA9ICdzdGFyJztcbiAgICAgIHByZXYuc3RhciA9IHRydWU7XG4gICAgICBwcmV2LnZhbHVlICs9IHZhbHVlO1xuICAgICAgcHJldi5vdXRwdXQgPSBzdGFyO1xuICAgICAgc3RhdGUuYmFja3RyYWNrID0gdHJ1ZTtcbiAgICAgIHN0YXRlLmdsb2JzdGFyID0gdHJ1ZTtcbiAgICAgIGNvbnN1bWUodmFsdWUpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgbGV0IHJlc3QgPSByZW1haW5pbmcoKTtcbiAgICBpZiAob3B0cy5ub2V4dGdsb2IgIT09IHRydWUgJiYgL15cXChbXj9dLy50ZXN0KHJlc3QpKSB7XG4gICAgICBleHRnbG9iT3Blbignc3RhcicsIHZhbHVlKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChwcmV2LnR5cGUgPT09ICdzdGFyJykge1xuICAgICAgaWYgKG9wdHMubm9nbG9ic3RhciA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdW1lKHZhbHVlKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByaW9yID0gcHJldi5wcmV2O1xuICAgICAgY29uc3QgYmVmb3JlID0gcHJpb3IucHJldjtcbiAgICAgIGNvbnN0IGlzU3RhcnQgPSBwcmlvci50eXBlID09PSAnc2xhc2gnIHx8IHByaW9yLnR5cGUgPT09ICdib3MnO1xuICAgICAgY29uc3QgYWZ0ZXJTdGFyID0gYmVmb3JlICYmIChiZWZvcmUudHlwZSA9PT0gJ3N0YXInIHx8IGJlZm9yZS50eXBlID09PSAnZ2xvYnN0YXInKTtcblxuICAgICAgaWYgKG9wdHMuYmFzaCA9PT0gdHJ1ZSAmJiAoIWlzU3RhcnQgfHwgKHJlc3RbMF0gJiYgcmVzdFswXSAhPT0gJy8nKSkpIHtcbiAgICAgICAgcHVzaCh7IHR5cGU6ICdzdGFyJywgdmFsdWUsIG91dHB1dDogJycgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpc0JyYWNlID0gc3RhdGUuYnJhY2VzID4gMCAmJiAocHJpb3IudHlwZSA9PT0gJ2NvbW1hJyB8fCBwcmlvci50eXBlID09PSAnYnJhY2UnKTtcbiAgICAgIGNvbnN0IGlzRXh0Z2xvYiA9IGV4dGdsb2JzLmxlbmd0aCAmJiAocHJpb3IudHlwZSA9PT0gJ3BpcGUnIHx8IHByaW9yLnR5cGUgPT09ICdwYXJlbicpO1xuICAgICAgaWYgKCFpc1N0YXJ0ICYmIHByaW9yLnR5cGUgIT09ICdwYXJlbicgJiYgIWlzQnJhY2UgJiYgIWlzRXh0Z2xvYikge1xuICAgICAgICBwdXNoKHsgdHlwZTogJ3N0YXInLCB2YWx1ZSwgb3V0cHV0OiAnJyB9KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIHN0cmlwIGNvbnNlY3V0aXZlIGAvKiovYFxuICAgICAgd2hpbGUgKHJlc3Quc2xpY2UoMCwgMykgPT09ICcvKionKSB7XG4gICAgICAgIGNvbnN0IGFmdGVyID0gaW5wdXRbc3RhdGUuaW5kZXggKyA0XTtcbiAgICAgICAgaWYgKGFmdGVyICYmIGFmdGVyICE9PSAnLycpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXN0ID0gcmVzdC5zbGljZSgzKTtcbiAgICAgICAgY29uc3VtZSgnLyoqJywgMyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcmlvci50eXBlID09PSAnYm9zJyAmJiBlb3MoKSkge1xuICAgICAgICBwcmV2LnR5cGUgPSAnZ2xvYnN0YXInO1xuICAgICAgICBwcmV2LnZhbHVlICs9IHZhbHVlO1xuICAgICAgICBwcmV2Lm91dHB1dCA9IGdsb2JzdGFyKG9wdHMpO1xuICAgICAgICBzdGF0ZS5vdXRwdXQgPSBwcmV2Lm91dHB1dDtcbiAgICAgICAgc3RhdGUuZ2xvYnN0YXIgPSB0cnVlO1xuICAgICAgICBjb25zdW1lKHZhbHVlKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcmlvci50eXBlID09PSAnc2xhc2gnICYmIHByaW9yLnByZXYudHlwZSAhPT0gJ2JvcycgJiYgIWFmdGVyU3RhciAmJiBlb3MoKSkge1xuICAgICAgICBzdGF0ZS5vdXRwdXQgPSBzdGF0ZS5vdXRwdXQuc2xpY2UoMCwgLShwcmlvci5vdXRwdXQgKyBwcmV2Lm91dHB1dCkubGVuZ3RoKTtcbiAgICAgICAgcHJpb3Iub3V0cHV0ID0gYCg/OiR7cHJpb3Iub3V0cHV0fWA7XG5cbiAgICAgICAgcHJldi50eXBlID0gJ2dsb2JzdGFyJztcbiAgICAgICAgcHJldi5vdXRwdXQgPSBnbG9ic3RhcihvcHRzKSArIChvcHRzLnN0cmljdFNsYXNoZXMgPyAnKScgOiAnfCQpJyk7XG4gICAgICAgIHByZXYudmFsdWUgKz0gdmFsdWU7XG4gICAgICAgIHN0YXRlLmdsb2JzdGFyID0gdHJ1ZTtcbiAgICAgICAgc3RhdGUub3V0cHV0ICs9IHByaW9yLm91dHB1dCArIHByZXYub3V0cHV0O1xuICAgICAgICBjb25zdW1lKHZhbHVlKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcmlvci50eXBlID09PSAnc2xhc2gnICYmIHByaW9yLnByZXYudHlwZSAhPT0gJ2JvcycgJiYgcmVzdFswXSA9PT0gJy8nKSB7XG4gICAgICAgIGNvbnN0IGVuZCA9IHJlc3RbMV0gIT09IHZvaWQgMCA/ICd8JCcgOiAnJztcblxuICAgICAgICBzdGF0ZS5vdXRwdXQgPSBzdGF0ZS5vdXRwdXQuc2xpY2UoMCwgLShwcmlvci5vdXRwdXQgKyBwcmV2Lm91dHB1dCkubGVuZ3RoKTtcbiAgICAgICAgcHJpb3Iub3V0cHV0ID0gYCg/OiR7cHJpb3Iub3V0cHV0fWA7XG5cbiAgICAgICAgcHJldi50eXBlID0gJ2dsb2JzdGFyJztcbiAgICAgICAgcHJldi5vdXRwdXQgPSBgJHtnbG9ic3RhcihvcHRzKX0ke1NMQVNIX0xJVEVSQUx9fCR7U0xBU0hfTElURVJBTH0ke2VuZH0pYDtcbiAgICAgICAgcHJldi52YWx1ZSArPSB2YWx1ZTtcblxuICAgICAgICBzdGF0ZS5vdXRwdXQgKz0gcHJpb3Iub3V0cHV0ICsgcHJldi5vdXRwdXQ7XG4gICAgICAgIHN0YXRlLmdsb2JzdGFyID0gdHJ1ZTtcblxuICAgICAgICBjb25zdW1lKHZhbHVlICsgYWR2YW5jZSgpKTtcblxuICAgICAgICBwdXNoKHsgdHlwZTogJ3NsYXNoJywgdmFsdWU6ICcvJywgb3V0cHV0OiAnJyB9KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcmlvci50eXBlID09PSAnYm9zJyAmJiByZXN0WzBdID09PSAnLycpIHtcbiAgICAgICAgcHJldi50eXBlID0gJ2dsb2JzdGFyJztcbiAgICAgICAgcHJldi52YWx1ZSArPSB2YWx1ZTtcbiAgICAgICAgcHJldi5vdXRwdXQgPSBgKD86Xnwke1NMQVNIX0xJVEVSQUx9fCR7Z2xvYnN0YXIob3B0cyl9JHtTTEFTSF9MSVRFUkFMfSlgO1xuICAgICAgICBzdGF0ZS5vdXRwdXQgPSBwcmV2Lm91dHB1dDtcbiAgICAgICAgc3RhdGUuZ2xvYnN0YXIgPSB0cnVlO1xuICAgICAgICBjb25zdW1lKHZhbHVlICsgYWR2YW5jZSgpKTtcbiAgICAgICAgcHVzaCh7IHR5cGU6ICdzbGFzaCcsIHZhbHVlOiAnLycsIG91dHB1dDogJycgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyByZW1vdmUgc2luZ2xlIHN0YXIgZnJvbSBvdXRwdXRcbiAgICAgIHN0YXRlLm91dHB1dCA9IHN0YXRlLm91dHB1dC5zbGljZSgwLCAtcHJldi5vdXRwdXQubGVuZ3RoKTtcblxuICAgICAgLy8gcmVzZXQgcHJldmlvdXMgdG9rZW4gdG8gZ2xvYnN0YXJcbiAgICAgIHByZXYudHlwZSA9ICdnbG9ic3Rhcic7XG4gICAgICBwcmV2Lm91dHB1dCA9IGdsb2JzdGFyKG9wdHMpO1xuICAgICAgcHJldi52YWx1ZSArPSB2YWx1ZTtcblxuICAgICAgLy8gcmVzZXQgb3V0cHV0IHdpdGggZ2xvYnN0YXJcbiAgICAgIHN0YXRlLm91dHB1dCArPSBwcmV2Lm91dHB1dDtcbiAgICAgIHN0YXRlLmdsb2JzdGFyID0gdHJ1ZTtcbiAgICAgIGNvbnN1bWUodmFsdWUpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgY29uc3QgdG9rZW4gPSB7IHR5cGU6ICdzdGFyJywgdmFsdWUsIG91dHB1dDogc3RhciB9O1xuXG4gICAgaWYgKG9wdHMuYmFzaCA9PT0gdHJ1ZSkge1xuICAgICAgdG9rZW4ub3V0cHV0ID0gJy4qPyc7XG4gICAgICBpZiAocHJldi50eXBlID09PSAnYm9zJyB8fCBwcmV2LnR5cGUgPT09ICdzbGFzaCcpIHtcbiAgICAgICAgdG9rZW4ub3V0cHV0ID0gbm9kb3QgKyB0b2tlbi5vdXRwdXQ7XG4gICAgICB9XG4gICAgICBwdXNoKHRva2VuKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChwcmV2ICYmIChwcmV2LnR5cGUgPT09ICdicmFja2V0JyB8fCBwcmV2LnR5cGUgPT09ICdwYXJlbicpICYmIG9wdHMucmVnZXggPT09IHRydWUpIHtcbiAgICAgIHRva2VuLm91dHB1dCA9IHZhbHVlO1xuICAgICAgcHVzaCh0b2tlbik7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoc3RhdGUuaW5kZXggPT09IHN0YXRlLnN0YXJ0IHx8IHByZXYudHlwZSA9PT0gJ3NsYXNoJyB8fCBwcmV2LnR5cGUgPT09ICdkb3QnKSB7XG4gICAgICBpZiAocHJldi50eXBlID09PSAnZG90Jykge1xuICAgICAgICBzdGF0ZS5vdXRwdXQgKz0gTk9fRE9UX1NMQVNIO1xuICAgICAgICBwcmV2Lm91dHB1dCArPSBOT19ET1RfU0xBU0g7XG5cbiAgICAgIH0gZWxzZSBpZiAob3B0cy5kb3QgPT09IHRydWUpIHtcbiAgICAgICAgc3RhdGUub3V0cHV0ICs9IE5PX0RPVFNfU0xBU0g7XG4gICAgICAgIHByZXYub3V0cHV0ICs9IE5PX0RPVFNfU0xBU0g7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXRlLm91dHB1dCArPSBub2RvdDtcbiAgICAgICAgcHJldi5vdXRwdXQgKz0gbm9kb3Q7XG4gICAgICB9XG5cbiAgICAgIGlmIChwZWVrKCkgIT09ICcqJykge1xuICAgICAgICBzdGF0ZS5vdXRwdXQgKz0gT05FX0NIQVI7XG4gICAgICAgIHByZXYub3V0cHV0ICs9IE9ORV9DSEFSO1xuICAgICAgfVxuICAgIH1cblxuICAgIHB1c2godG9rZW4pO1xuICB9XG5cbiAgd2hpbGUgKHN0YXRlLmJyYWNrZXRzID4gMCkge1xuICAgIGlmIChvcHRzLnN0cmljdEJyYWNrZXRzID09PSB0cnVlKSB0aHJvdyBuZXcgU3ludGF4RXJyb3Ioc3ludGF4RXJyb3IoJ2Nsb3NpbmcnLCAnXScpKTtcbiAgICBzdGF0ZS5vdXRwdXQgPSB1dGlscy5lc2NhcGVMYXN0KHN0YXRlLm91dHB1dCwgJ1snKTtcbiAgICBkZWNyZW1lbnQoJ2JyYWNrZXRzJyk7XG4gIH1cblxuICB3aGlsZSAoc3RhdGUucGFyZW5zID4gMCkge1xuICAgIGlmIChvcHRzLnN0cmljdEJyYWNrZXRzID09PSB0cnVlKSB0aHJvdyBuZXcgU3ludGF4RXJyb3Ioc3ludGF4RXJyb3IoJ2Nsb3NpbmcnLCAnKScpKTtcbiAgICBzdGF0ZS5vdXRwdXQgPSB1dGlscy5lc2NhcGVMYXN0KHN0YXRlLm91dHB1dCwgJygnKTtcbiAgICBkZWNyZW1lbnQoJ3BhcmVucycpO1xuICB9XG5cbiAgd2hpbGUgKHN0YXRlLmJyYWNlcyA+IDApIHtcbiAgICBpZiAob3B0cy5zdHJpY3RCcmFja2V0cyA9PT0gdHJ1ZSkgdGhyb3cgbmV3IFN5bnRheEVycm9yKHN5bnRheEVycm9yKCdjbG9zaW5nJywgJ30nKSk7XG4gICAgc3RhdGUub3V0cHV0ID0gdXRpbHMuZXNjYXBlTGFzdChzdGF0ZS5vdXRwdXQsICd7Jyk7XG4gICAgZGVjcmVtZW50KCdicmFjZXMnKTtcbiAgfVxuXG4gIGlmIChvcHRzLnN0cmljdFNsYXNoZXMgIT09IHRydWUgJiYgKHByZXYudHlwZSA9PT0gJ3N0YXInIHx8IHByZXYudHlwZSA9PT0gJ2JyYWNrZXQnKSkge1xuICAgIHB1c2goeyB0eXBlOiAnbWF5YmVfc2xhc2gnLCB2YWx1ZTogJycsIG91dHB1dDogYCR7U0xBU0hfTElURVJBTH0/YCB9KTtcbiAgfVxuXG4gIC8vIHJlYnVpbGQgdGhlIG91dHB1dCBpZiB3ZSBoYWQgdG8gYmFja3RyYWNrIGF0IGFueSBwb2ludFxuICBpZiAoc3RhdGUuYmFja3RyYWNrID09PSB0cnVlKSB7XG4gICAgc3RhdGUub3V0cHV0ID0gJyc7XG5cbiAgICBmb3IgKGNvbnN0IHRva2VuIG9mIHN0YXRlLnRva2Vucykge1xuICAgICAgc3RhdGUub3V0cHV0ICs9IHRva2VuLm91dHB1dCAhPSBudWxsID8gdG9rZW4ub3V0cHV0IDogdG9rZW4udmFsdWU7XG5cbiAgICAgIGlmICh0b2tlbi5zdWZmaXgpIHtcbiAgICAgICAgc3RhdGUub3V0cHV0ICs9IHRva2VuLnN1ZmZpeDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3RhdGU7XG59O1xuXG4vKipcbiAqIEZhc3QgcGF0aHMgZm9yIGNyZWF0aW5nIHJlZ3VsYXIgZXhwcmVzc2lvbnMgZm9yIGNvbW1vbiBnbG9iIHBhdHRlcm5zLlxuICogVGhpcyBjYW4gc2lnbmlmaWNhbnRseSBzcGVlZCB1cCBwcm9jZXNzaW5nIGFuZCBoYXMgdmVyeSBsaXR0bGUgZG93bnNpZGVcbiAqIGltcGFjdCB3aGVuIG5vbmUgb2YgdGhlIGZhc3QgcGF0aHMgbWF0Y2guXG4gKi9cblxucGFyc2UuZmFzdHBhdGhzID0gKGlucHV0LCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IG9wdHMgPSB7IC4uLm9wdGlvbnMgfTtcbiAgY29uc3QgbWF4ID0gdHlwZW9mIG9wdHMubWF4TGVuZ3RoID09PSAnbnVtYmVyJyA/IE1hdGgubWluKE1BWF9MRU5HVEgsIG9wdHMubWF4TGVuZ3RoKSA6IE1BWF9MRU5HVEg7XG4gIGNvbnN0IGxlbiA9IGlucHV0Lmxlbmd0aDtcbiAgaWYgKGxlbiA+IG1heCkge1xuICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgSW5wdXQgbGVuZ3RoOiAke2xlbn0sIGV4Y2VlZHMgbWF4aW11bSBhbGxvd2VkIGxlbmd0aDogJHttYXh9YCk7XG4gIH1cblxuICBpbnB1dCA9IFJFUExBQ0VNRU5UU1tpbnB1dF0gfHwgaW5wdXQ7XG4gIGNvbnN0IHdpbjMyID0gdXRpbHMuaXNXaW5kb3dzKG9wdGlvbnMpO1xuXG4gIC8vIGNyZWF0ZSBjb25zdGFudHMgYmFzZWQgb24gcGxhdGZvcm0sIGZvciB3aW5kb3dzIG9yIHBvc2l4XG4gIGNvbnN0IHtcbiAgICBET1RfTElURVJBTCxcbiAgICBTTEFTSF9MSVRFUkFMLFxuICAgIE9ORV9DSEFSLFxuICAgIERPVFNfU0xBU0gsXG4gICAgTk9fRE9ULFxuICAgIE5PX0RPVFMsXG4gICAgTk9fRE9UU19TTEFTSCxcbiAgICBTVEFSLFxuICAgIFNUQVJUX0FOQ0hPUlxuICB9ID0gY29uc3RhbnRzLmdsb2JDaGFycyh3aW4zMik7XG5cbiAgY29uc3Qgbm9kb3QgPSBvcHRzLmRvdCA/IE5PX0RPVFMgOiBOT19ET1Q7XG4gIGNvbnN0IHNsYXNoRG90ID0gb3B0cy5kb3QgPyBOT19ET1RTX1NMQVNIIDogTk9fRE9UO1xuICBjb25zdCBjYXB0dXJlID0gb3B0cy5jYXB0dXJlID8gJycgOiAnPzonO1xuICBjb25zdCBzdGF0ZSA9IHsgbmVnYXRlZDogZmFsc2UsIHByZWZpeDogJycgfTtcbiAgbGV0IHN0YXIgPSBvcHRzLmJhc2ggPT09IHRydWUgPyAnLio/JyA6IFNUQVI7XG5cbiAgaWYgKG9wdHMuY2FwdHVyZSkge1xuICAgIHN0YXIgPSBgKCR7c3Rhcn0pYDtcbiAgfVxuXG4gIGNvbnN0IGdsb2JzdGFyID0gb3B0cyA9PiB7XG4gICAgaWYgKG9wdHMubm9nbG9ic3RhciA9PT0gdHJ1ZSkgcmV0dXJuIHN0YXI7XG4gICAgcmV0dXJuIGAoJHtjYXB0dXJlfSg/Oig/ISR7U1RBUlRfQU5DSE9SfSR7b3B0cy5kb3QgPyBET1RTX1NMQVNIIDogRE9UX0xJVEVSQUx9KS4pKj8pYDtcbiAgfTtcblxuICBjb25zdCBjcmVhdGUgPSBzdHIgPT4ge1xuICAgIHN3aXRjaCAoc3RyKSB7XG4gICAgICBjYXNlICcqJzpcbiAgICAgICAgcmV0dXJuIGAke25vZG90fSR7T05FX0NIQVJ9JHtzdGFyfWA7XG5cbiAgICAgIGNhc2UgJy4qJzpcbiAgICAgICAgcmV0dXJuIGAke0RPVF9MSVRFUkFMfSR7T05FX0NIQVJ9JHtzdGFyfWA7XG5cbiAgICAgIGNhc2UgJyouKic6XG4gICAgICAgIHJldHVybiBgJHtub2RvdH0ke3N0YXJ9JHtET1RfTElURVJBTH0ke09ORV9DSEFSfSR7c3Rhcn1gO1xuXG4gICAgICBjYXNlICcqLyonOlxuICAgICAgICByZXR1cm4gYCR7bm9kb3R9JHtzdGFyfSR7U0xBU0hfTElURVJBTH0ke09ORV9DSEFSfSR7c2xhc2hEb3R9JHtzdGFyfWA7XG5cbiAgICAgIGNhc2UgJyoqJzpcbiAgICAgICAgcmV0dXJuIG5vZG90ICsgZ2xvYnN0YXIob3B0cyk7XG5cbiAgICAgIGNhc2UgJyoqLyonOlxuICAgICAgICByZXR1cm4gYCg/OiR7bm9kb3R9JHtnbG9ic3RhcihvcHRzKX0ke1NMQVNIX0xJVEVSQUx9KT8ke3NsYXNoRG90fSR7T05FX0NIQVJ9JHtzdGFyfWA7XG5cbiAgICAgIGNhc2UgJyoqLyouKic6XG4gICAgICAgIHJldHVybiBgKD86JHtub2RvdH0ke2dsb2JzdGFyKG9wdHMpfSR7U0xBU0hfTElURVJBTH0pPyR7c2xhc2hEb3R9JHtzdGFyfSR7RE9UX0xJVEVSQUx9JHtPTkVfQ0hBUn0ke3N0YXJ9YDtcblxuICAgICAgY2FzZSAnKiovLionOlxuICAgICAgICByZXR1cm4gYCg/OiR7bm9kb3R9JHtnbG9ic3RhcihvcHRzKX0ke1NMQVNIX0xJVEVSQUx9KT8ke0RPVF9MSVRFUkFMfSR7T05FX0NIQVJ9JHtzdGFyfWA7XG5cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgY29uc3QgbWF0Y2ggPSAvXiguKj8pXFwuKFxcdyspJC8uZXhlYyhzdHIpO1xuICAgICAgICBpZiAoIW1hdGNoKSByZXR1cm47XG5cbiAgICAgICAgY29uc3Qgc291cmNlID0gY3JlYXRlKG1hdGNoWzFdKTtcbiAgICAgICAgaWYgKCFzb3VyY2UpIHJldHVybjtcblxuICAgICAgICByZXR1cm4gc291cmNlICsgRE9UX0xJVEVSQUwgKyBtYXRjaFsyXTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgb3V0cHV0ID0gdXRpbHMucmVtb3ZlUHJlZml4KGlucHV0LCBzdGF0ZSk7XG4gIGxldCBzb3VyY2UgPSBjcmVhdGUob3V0cHV0KTtcblxuICBpZiAoc291cmNlICYmIG9wdHMuc3RyaWN0U2xhc2hlcyAhPT0gdHJ1ZSkge1xuICAgIHNvdXJjZSArPSBgJHtTTEFTSF9MSVRFUkFMfT9gO1xuICB9XG5cbiAgcmV0dXJuIHNvdXJjZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyc2U7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuY29uc3Qgc2NhbiA9IHJlcXVpcmUoJy4vc2NhbicpO1xuY29uc3QgcGFyc2UgPSByZXF1aXJlKCcuL3BhcnNlJyk7XG5jb25zdCB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbmNvbnN0IGNvbnN0YW50cyA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG5jb25zdCBpc09iamVjdCA9IHZhbCA9PiB2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkodmFsKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbWF0Y2hlciBmdW5jdGlvbiBmcm9tIG9uZSBvciBtb3JlIGdsb2IgcGF0dGVybnMuIFRoZVxuICogcmV0dXJuZWQgZnVuY3Rpb24gdGFrZXMgYSBzdHJpbmcgdG8gbWF0Y2ggYXMgaXRzIGZpcnN0IGFyZ3VtZW50LFxuICogYW5kIHJldHVybnMgdHJ1ZSBpZiB0aGUgc3RyaW5nIGlzIGEgbWF0Y2guIFRoZSByZXR1cm5lZCBtYXRjaGVyXG4gKiBmdW5jdGlvbiBhbHNvIHRha2VzIGEgYm9vbGVhbiBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHRoYXQsIHdoZW4gdHJ1ZSxcbiAqIHJldHVybnMgYW4gb2JqZWN0IHdpdGggYWRkaXRpb25hbCBpbmZvcm1hdGlvbi5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgcGljb21hdGNoID0gcmVxdWlyZSgncGljb21hdGNoJyk7XG4gKiAvLyBwaWNvbWF0Y2goZ2xvYlssIG9wdGlvbnNdKTtcbiAqXG4gKiBjb25zdCBpc01hdGNoID0gcGljb21hdGNoKCcqLiEoKmEpJyk7XG4gKiBjb25zb2xlLmxvZyhpc01hdGNoKCdhLmEnKSk7IC8vPT4gZmFsc2VcbiAqIGNvbnNvbGUubG9nKGlzTWF0Y2goJ2EuYicpKTsgLy89PiB0cnVlXG4gKiBgYGBcbiAqIEBuYW1lIHBpY29tYXRjaFxuICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IGBnbG9ic2AgT25lIG9yIG1vcmUgZ2xvYiBwYXR0ZXJucy5cbiAqIEBwYXJhbSB7T2JqZWN0PX0gYG9wdGlvbnNgXG4gKiBAcmV0dXJuIHtGdW5jdGlvbj19IFJldHVybnMgYSBtYXRjaGVyIGZ1bmN0aW9uLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5jb25zdCBwaWNvbWF0Y2ggPSAoZ2xvYiwgb3B0aW9ucywgcmV0dXJuU3RhdGUgPSBmYWxzZSkgPT4ge1xuICBpZiAoQXJyYXkuaXNBcnJheShnbG9iKSkge1xuICAgIGNvbnN0IGZucyA9IGdsb2IubWFwKGlucHV0ID0+IHBpY29tYXRjaChpbnB1dCwgb3B0aW9ucywgcmV0dXJuU3RhdGUpKTtcbiAgICBjb25zdCBhcnJheU1hdGNoZXIgPSBzdHIgPT4ge1xuICAgICAgZm9yIChjb25zdCBpc01hdGNoIG9mIGZucykge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IGlzTWF0Y2goc3RyKTtcbiAgICAgICAgaWYgKHN0YXRlKSByZXR1cm4gc3RhdGU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICByZXR1cm4gYXJyYXlNYXRjaGVyO1xuICB9XG5cbiAgY29uc3QgaXNTdGF0ZSA9IGlzT2JqZWN0KGdsb2IpICYmIGdsb2IudG9rZW5zICYmIGdsb2IuaW5wdXQ7XG5cbiAgaWYgKGdsb2IgPT09ICcnIHx8ICh0eXBlb2YgZ2xvYiAhPT0gJ3N0cmluZycgJiYgIWlzU3RhdGUpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgcGF0dGVybiB0byBiZSBhIG5vbi1lbXB0eSBzdHJpbmcnKTtcbiAgfVxuXG4gIGNvbnN0IG9wdHMgPSBvcHRpb25zIHx8IHt9O1xuICBjb25zdCBwb3NpeCA9IHV0aWxzLmlzV2luZG93cyhvcHRpb25zKTtcbiAgY29uc3QgcmVnZXggPSBpc1N0YXRlXG4gICAgPyBwaWNvbWF0Y2guY29tcGlsZVJlKGdsb2IsIG9wdGlvbnMpXG4gICAgOiBwaWNvbWF0Y2gubWFrZVJlKGdsb2IsIG9wdGlvbnMsIGZhbHNlLCB0cnVlKTtcblxuICBjb25zdCBzdGF0ZSA9IHJlZ2V4LnN0YXRlO1xuICBkZWxldGUgcmVnZXguc3RhdGU7XG5cbiAgbGV0IGlzSWdub3JlZCA9ICgpID0+IGZhbHNlO1xuICBpZiAob3B0cy5pZ25vcmUpIHtcbiAgICBjb25zdCBpZ25vcmVPcHRzID0geyAuLi5vcHRpb25zLCBpZ25vcmU6IG51bGwsIG9uTWF0Y2g6IG51bGwsIG9uUmVzdWx0OiBudWxsIH07XG4gICAgaXNJZ25vcmVkID0gcGljb21hdGNoKG9wdHMuaWdub3JlLCBpZ25vcmVPcHRzLCByZXR1cm5TdGF0ZSk7XG4gIH1cblxuICBjb25zdCBtYXRjaGVyID0gKGlucHV0LCByZXR1cm5PYmplY3QgPSBmYWxzZSkgPT4ge1xuICAgIGNvbnN0IHsgaXNNYXRjaCwgbWF0Y2gsIG91dHB1dCB9ID0gcGljb21hdGNoLnRlc3QoaW5wdXQsIHJlZ2V4LCBvcHRpb25zLCB7IGdsb2IsIHBvc2l4IH0pO1xuICAgIGNvbnN0IHJlc3VsdCA9IHsgZ2xvYiwgc3RhdGUsIHJlZ2V4LCBwb3NpeCwgaW5wdXQsIG91dHB1dCwgbWF0Y2gsIGlzTWF0Y2ggfTtcblxuICAgIGlmICh0eXBlb2Ygb3B0cy5vblJlc3VsdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgb3B0cy5vblJlc3VsdChyZXN1bHQpO1xuICAgIH1cblxuICAgIGlmIChpc01hdGNoID09PSBmYWxzZSkge1xuICAgICAgcmVzdWx0LmlzTWF0Y2ggPSBmYWxzZTtcbiAgICAgIHJldHVybiByZXR1cm5PYmplY3QgPyByZXN1bHQgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoaXNJZ25vcmVkKGlucHV0KSkge1xuICAgICAgaWYgKHR5cGVvZiBvcHRzLm9uSWdub3JlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG9wdHMub25JZ25vcmUocmVzdWx0KTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5pc01hdGNoID0gZmFsc2U7XG4gICAgICByZXR1cm4gcmV0dXJuT2JqZWN0ID8gcmVzdWx0IDogZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvcHRzLm9uTWF0Y2ggPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG9wdHMub25NYXRjaChyZXN1bHQpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuT2JqZWN0ID8gcmVzdWx0IDogdHJ1ZTtcbiAgfTtcblxuICBpZiAocmV0dXJuU3RhdGUpIHtcbiAgICBtYXRjaGVyLnN0YXRlID0gc3RhdGU7XG4gIH1cblxuICByZXR1cm4gbWF0Y2hlcjtcbn07XG5cbi8qKlxuICogVGVzdCBgaW5wdXRgIHdpdGggdGhlIGdpdmVuIGByZWdleGAuIFRoaXMgaXMgdXNlZCBieSB0aGUgbWFpblxuICogYHBpY29tYXRjaCgpYCBmdW5jdGlvbiB0byB0ZXN0IHRoZSBpbnB1dCBzdHJpbmcuXG4gKlxuICogYGBganNcbiAqIGNvbnN0IHBpY29tYXRjaCA9IHJlcXVpcmUoJ3BpY29tYXRjaCcpO1xuICogLy8gcGljb21hdGNoLnRlc3QoaW5wdXQsIHJlZ2V4Wywgb3B0aW9uc10pO1xuICpcbiAqIGNvbnNvbGUubG9nKHBpY29tYXRjaC50ZXN0KCdmb28vYmFyJywgL14oPzooW14vXSo/KVxcLyhbXi9dKj8pKSQvKSk7XG4gKiAvLyB7IGlzTWF0Y2g6IHRydWUsIG1hdGNoOiBbICdmb28vJywgJ2ZvbycsICdiYXInIF0sIG91dHB1dDogJ2Zvby9iYXInIH1cbiAqIGBgYFxuICogQHBhcmFtIHtTdHJpbmd9IGBpbnB1dGAgU3RyaW5nIHRvIHRlc3QuXG4gKiBAcGFyYW0ge1JlZ0V4cH0gYHJlZ2V4YFxuICogQHJldHVybiB7T2JqZWN0fSBSZXR1cm5zIGFuIG9iamVjdCB3aXRoIG1hdGNoaW5nIGluZm8uXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnBpY29tYXRjaC50ZXN0ID0gKGlucHV0LCByZWdleCwgb3B0aW9ucywgeyBnbG9iLCBwb3NpeCB9ID0ge30pID0+IHtcbiAgaWYgKHR5cGVvZiBpbnB1dCAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBpbnB1dCB0byBiZSBhIHN0cmluZycpO1xuICB9XG5cbiAgaWYgKGlucHV0ID09PSAnJykge1xuICAgIHJldHVybiB7IGlzTWF0Y2g6IGZhbHNlLCBvdXRwdXQ6ICcnIH07XG4gIH1cblxuICBjb25zdCBvcHRzID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3QgZm9ybWF0ID0gb3B0cy5mb3JtYXQgfHwgKHBvc2l4ID8gdXRpbHMudG9Qb3NpeFNsYXNoZXMgOiBudWxsKTtcbiAgbGV0IG1hdGNoID0gaW5wdXQgPT09IGdsb2I7XG4gIGxldCBvdXRwdXQgPSAobWF0Y2ggJiYgZm9ybWF0KSA/IGZvcm1hdChpbnB1dCkgOiBpbnB1dDtcblxuICBpZiAobWF0Y2ggPT09IGZhbHNlKSB7XG4gICAgb3V0cHV0ID0gZm9ybWF0ID8gZm9ybWF0KGlucHV0KSA6IGlucHV0O1xuICAgIG1hdGNoID0gb3V0cHV0ID09PSBnbG9iO1xuICB9XG5cbiAgaWYgKG1hdGNoID09PSBmYWxzZSB8fCBvcHRzLmNhcHR1cmUgPT09IHRydWUpIHtcbiAgICBpZiAob3B0cy5tYXRjaEJhc2UgPT09IHRydWUgfHwgb3B0cy5iYXNlbmFtZSA9PT0gdHJ1ZSkge1xuICAgICAgbWF0Y2ggPSBwaWNvbWF0Y2gubWF0Y2hCYXNlKGlucHV0LCByZWdleCwgb3B0aW9ucywgcG9zaXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBtYXRjaCA9IHJlZ2V4LmV4ZWMob3V0cHV0KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBpc01hdGNoOiBCb29sZWFuKG1hdGNoKSwgbWF0Y2gsIG91dHB1dCB9O1xufTtcblxuLyoqXG4gKiBNYXRjaCB0aGUgYmFzZW5hbWUgb2YgYSBmaWxlcGF0aC5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgcGljb21hdGNoID0gcmVxdWlyZSgncGljb21hdGNoJyk7XG4gKiAvLyBwaWNvbWF0Y2gubWF0Y2hCYXNlKGlucHV0LCBnbG9iWywgb3B0aW9uc10pO1xuICogY29uc29sZS5sb2cocGljb21hdGNoLm1hdGNoQmFzZSgnZm9vL2Jhci5qcycsICcqLmpzJyk7IC8vIHRydWVcbiAqIGBgYFxuICogQHBhcmFtIHtTdHJpbmd9IGBpbnB1dGAgU3RyaW5nIHRvIHRlc3QuXG4gKiBAcGFyYW0ge1JlZ0V4cHxTdHJpbmd9IGBnbG9iYCBHbG9iIHBhdHRlcm4gb3IgcmVnZXggY3JlYXRlZCBieSBbLm1ha2VSZV0oI21ha2VSZSkuXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5waWNvbWF0Y2gubWF0Y2hCYXNlID0gKGlucHV0LCBnbG9iLCBvcHRpb25zLCBwb3NpeCA9IHV0aWxzLmlzV2luZG93cyhvcHRpb25zKSkgPT4ge1xuICBjb25zdCByZWdleCA9IGdsb2IgaW5zdGFuY2VvZiBSZWdFeHAgPyBnbG9iIDogcGljb21hdGNoLm1ha2VSZShnbG9iLCBvcHRpb25zKTtcbiAgcmV0dXJuIHJlZ2V4LnRlc3QocGF0aC5iYXNlbmFtZShpbnB1dCkpO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgKiphbnkqKiBvZiB0aGUgZ2l2ZW4gZ2xvYiBgcGF0dGVybnNgIG1hdGNoIHRoZSBzcGVjaWZpZWQgYHN0cmluZ2AuXG4gKlxuICogYGBganNcbiAqIGNvbnN0IHBpY29tYXRjaCA9IHJlcXVpcmUoJ3BpY29tYXRjaCcpO1xuICogLy8gcGljb21hdGNoLmlzTWF0Y2goc3RyaW5nLCBwYXR0ZXJuc1ssIG9wdGlvbnNdKTtcbiAqXG4gKiBjb25zb2xlLmxvZyhwaWNvbWF0Y2guaXNNYXRjaCgnYS5hJywgWydiLionLCAnKi5hJ10pKTsgLy89PiB0cnVlXG4gKiBjb25zb2xlLmxvZyhwaWNvbWF0Y2guaXNNYXRjaCgnYS5hJywgJ2IuKicpKTsgLy89PiBmYWxzZVxuICogYGBgXG4gKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gc3RyIFRoZSBzdHJpbmcgdG8gdGVzdC5cbiAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBwYXR0ZXJucyBPbmUgb3IgbW9yZSBnbG9iIHBhdHRlcm5zIHRvIHVzZSBmb3IgbWF0Y2hpbmcuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIFNlZSBhdmFpbGFibGUgW29wdGlvbnNdKCNvcHRpb25zKS5cbiAqIEByZXR1cm4ge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBhbnkgcGF0dGVybnMgbWF0Y2ggYHN0cmBcbiAqIEBhcGkgcHVibGljXG4gKi9cblxucGljb21hdGNoLmlzTWF0Y2ggPSAoc3RyLCBwYXR0ZXJucywgb3B0aW9ucykgPT4gcGljb21hdGNoKHBhdHRlcm5zLCBvcHRpb25zKShzdHIpO1xuXG4vKipcbiAqIFBhcnNlIGEgZ2xvYiBwYXR0ZXJuIHRvIGNyZWF0ZSB0aGUgc291cmNlIHN0cmluZyBmb3IgYSByZWd1bGFyXG4gKiBleHByZXNzaW9uLlxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCBwaWNvbWF0Y2ggPSByZXF1aXJlKCdwaWNvbWF0Y2gnKTtcbiAqIGNvbnN0IHJlc3VsdCA9IHBpY29tYXRjaC5wYXJzZShwYXR0ZXJuWywgb3B0aW9uc10pO1xuICogYGBgXG4gKiBAcGFyYW0ge1N0cmluZ30gYHBhdHRlcm5gXG4gKiBAcGFyYW0ge09iamVjdH0gYG9wdGlvbnNgXG4gKiBAcmV0dXJuIHtPYmplY3R9IFJldHVybnMgYW4gb2JqZWN0IHdpdGggdXNlZnVsIHByb3BlcnRpZXMgYW5kIG91dHB1dCB0byBiZSB1c2VkIGFzIGEgcmVnZXggc291cmNlIHN0cmluZy5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucGljb21hdGNoLnBhcnNlID0gKHBhdHRlcm4sIG9wdGlvbnMpID0+IHtcbiAgaWYgKEFycmF5LmlzQXJyYXkocGF0dGVybikpIHJldHVybiBwYXR0ZXJuLm1hcChwID0+IHBpY29tYXRjaC5wYXJzZShwLCBvcHRpb25zKSk7XG4gIHJldHVybiBwYXJzZShwYXR0ZXJuLCB7IC4uLm9wdGlvbnMsIGZhc3RwYXRoczogZmFsc2UgfSk7XG59O1xuXG4vKipcbiAqIFNjYW4gYSBnbG9iIHBhdHRlcm4gdG8gc2VwYXJhdGUgdGhlIHBhdHRlcm4gaW50byBzZWdtZW50cy5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgcGljb21hdGNoID0gcmVxdWlyZSgncGljb21hdGNoJyk7XG4gKiAvLyBwaWNvbWF0Y2guc2NhbihpbnB1dFssIG9wdGlvbnNdKTtcbiAqXG4gKiBjb25zdCByZXN1bHQgPSBwaWNvbWF0Y2guc2NhbignIS4vZm9vLyouanMnKTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gKiB7IHByZWZpeDogJyEuLycsXG4gKiAgIGlucHV0OiAnIS4vZm9vLyouanMnLFxuICogICBzdGFydDogMyxcbiAqICAgYmFzZTogJ2ZvbycsXG4gKiAgIGdsb2I6ICcqLmpzJyxcbiAqICAgaXNCcmFjZTogZmFsc2UsXG4gKiAgIGlzQnJhY2tldDogZmFsc2UsXG4gKiAgIGlzR2xvYjogdHJ1ZSxcbiAqICAgaXNFeHRnbG9iOiBmYWxzZSxcbiAqICAgaXNHbG9ic3RhcjogZmFsc2UsXG4gKiAgIG5lZ2F0ZWQ6IHRydWUgfVxuICogYGBgXG4gKiBAcGFyYW0ge1N0cmluZ30gYGlucHV0YCBHbG9iIHBhdHRlcm4gdG8gc2Nhbi5cbiAqIEBwYXJhbSB7T2JqZWN0fSBgb3B0aW9uc2BcbiAqIEByZXR1cm4ge09iamVjdH0gUmV0dXJucyBhbiBvYmplY3Qgd2l0aFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5waWNvbWF0Y2guc2NhbiA9IChpbnB1dCwgb3B0aW9ucykgPT4gc2NhbihpbnB1dCwgb3B0aW9ucyk7XG5cbi8qKlxuICogQ29tcGlsZSBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBmcm9tIHRoZSBgc3RhdGVgIG9iamVjdCByZXR1cm5lZCBieSB0aGVcbiAqIFtwYXJzZSgpXSgjcGFyc2UpIG1ldGhvZC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYHN0YXRlYFxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYFxuICogQHBhcmFtIHtCb29sZWFufSBgcmV0dXJuT3V0cHV0YCBJbnRlbmRlZCBmb3IgaW1wbGVtZW50b3JzLCB0aGlzIGFyZ3VtZW50IGFsbG93cyB5b3UgdG8gcmV0dXJuIHRoZSByYXcgb3V0cHV0IGZyb20gdGhlIHBhcnNlci5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gYHJldHVyblN0YXRlYCBBZGRzIHRoZSBzdGF0ZSB0byBhIGBzdGF0ZWAgcHJvcGVydHkgb24gdGhlIHJldHVybmVkIHJlZ2V4LiBVc2VmdWwgZm9yIGltcGxlbWVudG9ycyBhbmQgZGVidWdnaW5nLlxuICogQHJldHVybiB7UmVnRXhwfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5waWNvbWF0Y2guY29tcGlsZVJlID0gKHN0YXRlLCBvcHRpb25zLCByZXR1cm5PdXRwdXQgPSBmYWxzZSwgcmV0dXJuU3RhdGUgPSBmYWxzZSkgPT4ge1xuICBpZiAocmV0dXJuT3V0cHV0ID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIHN0YXRlLm91dHB1dDtcbiAgfVxuXG4gIGNvbnN0IG9wdHMgPSBvcHRpb25zIHx8IHt9O1xuICBjb25zdCBwcmVwZW5kID0gb3B0cy5jb250YWlucyA/ICcnIDogJ14nO1xuICBjb25zdCBhcHBlbmQgPSBvcHRzLmNvbnRhaW5zID8gJycgOiAnJCc7XG5cbiAgbGV0IHNvdXJjZSA9IGAke3ByZXBlbmR9KD86JHtzdGF0ZS5vdXRwdXR9KSR7YXBwZW5kfWA7XG4gIGlmIChzdGF0ZSAmJiBzdGF0ZS5uZWdhdGVkID09PSB0cnVlKSB7XG4gICAgc291cmNlID0gYF4oPyEke3NvdXJjZX0pLiokYDtcbiAgfVxuXG4gIGNvbnN0IHJlZ2V4ID0gcGljb21hdGNoLnRvUmVnZXgoc291cmNlLCBvcHRpb25zKTtcbiAgaWYgKHJldHVyblN0YXRlID09PSB0cnVlKSB7XG4gICAgcmVnZXguc3RhdGUgPSBzdGF0ZTtcbiAgfVxuXG4gIHJldHVybiByZWdleDtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGEgcmVndWxhciBleHByZXNzaW9uIGZyb20gYSBwYXJzZWQgZ2xvYiBwYXR0ZXJuLlxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCBwaWNvbWF0Y2ggPSByZXF1aXJlKCdwaWNvbWF0Y2gnKTtcbiAqIGNvbnN0IHN0YXRlID0gcGljb21hdGNoLnBhcnNlKCcqLmpzJyk7XG4gKiAvLyBwaWNvbWF0Y2guY29tcGlsZVJlKHN0YXRlWywgb3B0aW9uc10pO1xuICpcbiAqIGNvbnNvbGUubG9nKHBpY29tYXRjaC5jb21waWxlUmUoc3RhdGUpKTtcbiAqIC8vPT4gL14oPzooPyFcXC4pKD89LilbXi9dKj9cXC5qcykkL1xuICogYGBgXG4gKiBAcGFyYW0ge1N0cmluZ30gYHN0YXRlYCBUaGUgb2JqZWN0IHJldHVybmVkIGZyb20gdGhlIGAucGFyc2VgIG1ldGhvZC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBgb3B0aW9uc2BcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gYHJldHVybk91dHB1dGAgSW1wbGVtZW50b3JzIG1heSB1c2UgdGhpcyBhcmd1bWVudCB0byByZXR1cm4gdGhlIGNvbXBpbGVkIG91dHB1dCwgaW5zdGVhZCBvZiBhIHJlZ3VsYXIgZXhwcmVzc2lvbi4gVGhpcyBpcyBub3QgZXhwb3NlZCBvbiB0aGUgb3B0aW9ucyB0byBwcmV2ZW50IGVuZC11c2VycyBmcm9tIG11dGF0aW5nIHRoZSByZXN1bHQuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGByZXR1cm5TdGF0ZWAgSW1wbGVtZW50b3JzIG1heSB1c2UgdGhpcyBhcmd1bWVudCB0byByZXR1cm4gdGhlIHN0YXRlIGZyb20gdGhlIHBhcnNlZCBnbG9iIHdpdGggdGhlIHJldHVybmVkIHJlZ3VsYXIgZXhwcmVzc2lvbi5cbiAqIEByZXR1cm4ge1JlZ0V4cH0gUmV0dXJucyBhIHJlZ2V4IGNyZWF0ZWQgZnJvbSB0aGUgZ2l2ZW4gcGF0dGVybi5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucGljb21hdGNoLm1ha2VSZSA9IChpbnB1dCwgb3B0aW9ucyA9IHt9LCByZXR1cm5PdXRwdXQgPSBmYWxzZSwgcmV0dXJuU3RhdGUgPSBmYWxzZSkgPT4ge1xuICBpZiAoIWlucHV0IHx8IHR5cGVvZiBpbnB1dCAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhIG5vbi1lbXB0eSBzdHJpbmcnKTtcbiAgfVxuXG4gIGxldCBwYXJzZWQgPSB7IG5lZ2F0ZWQ6IGZhbHNlLCBmYXN0cGF0aHM6IHRydWUgfTtcblxuICBpZiAob3B0aW9ucy5mYXN0cGF0aHMgIT09IGZhbHNlICYmIChpbnB1dFswXSA9PT0gJy4nIHx8IGlucHV0WzBdID09PSAnKicpKSB7XG4gICAgcGFyc2VkLm91dHB1dCA9IHBhcnNlLmZhc3RwYXRocyhpbnB1dCwgb3B0aW9ucyk7XG4gIH1cblxuICBpZiAoIXBhcnNlZC5vdXRwdXQpIHtcbiAgICBwYXJzZWQgPSBwYXJzZShpbnB1dCwgb3B0aW9ucyk7XG4gIH1cblxuICByZXR1cm4gcGljb21hdGNoLmNvbXBpbGVSZShwYXJzZWQsIG9wdGlvbnMsIHJldHVybk91dHB1dCwgcmV0dXJuU3RhdGUpO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYSByZWd1bGFyIGV4cHJlc3Npb24gZnJvbSB0aGUgZ2l2ZW4gcmVnZXggc291cmNlIHN0cmluZy5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgcGljb21hdGNoID0gcmVxdWlyZSgncGljb21hdGNoJyk7XG4gKiAvLyBwaWNvbWF0Y2gudG9SZWdleChzb3VyY2VbLCBvcHRpb25zXSk7XG4gKlxuICogY29uc3QgeyBvdXRwdXQgfSA9IHBpY29tYXRjaC5wYXJzZSgnKi5qcycpO1xuICogY29uc29sZS5sb2cocGljb21hdGNoLnRvUmVnZXgob3V0cHV0KSk7XG4gKiAvLz0+IC9eKD86KD8hXFwuKSg/PS4pW14vXSo/XFwuanMpJC9cbiAqIGBgYFxuICogQHBhcmFtIHtTdHJpbmd9IGBzb3VyY2VgIFJlZ3VsYXIgZXhwcmVzc2lvbiBzb3VyY2Ugc3RyaW5nLlxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYFxuICogQHJldHVybiB7UmVnRXhwfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5waWNvbWF0Y2gudG9SZWdleCA9IChzb3VyY2UsIG9wdGlvbnMpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBvcHRzID0gb3B0aW9ucyB8fCB7fTtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cChzb3VyY2UsIG9wdHMuZmxhZ3MgfHwgKG9wdHMubm9jYXNlID8gJ2knIDogJycpKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5kZWJ1ZyA9PT0gdHJ1ZSkgdGhyb3cgZXJyO1xuICAgIHJldHVybiAvJF4vO1xuICB9XG59O1xuXG4vKipcbiAqIFBpY29tYXRjaCBjb25zdGFudHMuXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cblxucGljb21hdGNoLmNvbnN0YW50cyA9IGNvbnN0YW50cztcblxuLyoqXG4gKiBFeHBvc2UgXCJwaWNvbWF0Y2hcIlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gcGljb21hdGNoO1xuIiwgIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9waWNvbWF0Y2gnKTtcbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG5jb25zdCBicmFjZXMgPSByZXF1aXJlKCdicmFjZXMnKTtcbmNvbnN0IHBpY29tYXRjaCA9IHJlcXVpcmUoJ3BpY29tYXRjaCcpO1xuY29uc3QgdXRpbHMgPSByZXF1aXJlKCdwaWNvbWF0Y2gvbGliL3V0aWxzJyk7XG5cbmNvbnN0IGlzRW1wdHlTdHJpbmcgPSB2ID0+IHYgPT09ICcnIHx8IHYgPT09ICcuLyc7XG5jb25zdCBoYXNCcmFjZXMgPSB2ID0+IHtcbiAgY29uc3QgaW5kZXggPSB2LmluZGV4T2YoJ3snKTtcbiAgcmV0dXJuIGluZGV4ID4gLTEgJiYgdi5pbmRleE9mKCd9JywgaW5kZXgpID4gLTE7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gYXJyYXkgb2Ygc3RyaW5ncyB0aGF0IG1hdGNoIG9uZSBvciBtb3JlIGdsb2IgcGF0dGVybnMuXG4gKlxuICogYGBganNcbiAqIGNvbnN0IG1tID0gcmVxdWlyZSgnbWljcm9tYXRjaCcpO1xuICogLy8gbW0obGlzdCwgcGF0dGVybnNbLCBvcHRpb25zXSk7XG4gKlxuICogY29uc29sZS5sb2cobW0oWydhLmpzJywgJ2EudHh0J10sIFsnKi5qcyddKSk7XG4gKiAvLz0+IFsgJ2EuanMnIF1cbiAqIGBgYFxuICogQHBhcmFtIHtTdHJpbmd8QXJyYXk8c3RyaW5nPn0gYGxpc3RgIExpc3Qgb2Ygc3RyaW5ncyB0byBtYXRjaC5cbiAqIEBwYXJhbSB7U3RyaW5nfEFycmF5PHN0cmluZz59IGBwYXR0ZXJuc2AgT25lIG9yIG1vcmUgZ2xvYiBwYXR0ZXJucyB0byB1c2UgZm9yIG1hdGNoaW5nLlxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYCBTZWUgYXZhaWxhYmxlIFtvcHRpb25zXSgjb3B0aW9ucylcbiAqIEByZXR1cm4ge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IG9mIG1hdGNoZXNcbiAqIEBzdW1tYXJ5IGZhbHNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmNvbnN0IG1pY3JvbWF0Y2ggPSAobGlzdCwgcGF0dGVybnMsIG9wdGlvbnMpID0+IHtcbiAgcGF0dGVybnMgPSBbXS5jb25jYXQocGF0dGVybnMpO1xuICBsaXN0ID0gW10uY29uY2F0KGxpc3QpO1xuXG4gIGxldCBvbWl0ID0gbmV3IFNldCgpO1xuICBsZXQga2VlcCA9IG5ldyBTZXQoKTtcbiAgbGV0IGl0ZW1zID0gbmV3IFNldCgpO1xuICBsZXQgbmVnYXRpdmVzID0gMDtcblxuICBsZXQgb25SZXN1bHQgPSBzdGF0ZSA9PiB7XG4gICAgaXRlbXMuYWRkKHN0YXRlLm91dHB1dCk7XG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5vblJlc3VsdCkge1xuICAgICAgb3B0aW9ucy5vblJlc3VsdChzdGF0ZSk7XG4gICAgfVxuICB9O1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcGF0dGVybnMubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgaXNNYXRjaCA9IHBpY29tYXRjaChTdHJpbmcocGF0dGVybnNbaV0pLCB7IC4uLm9wdGlvbnMsIG9uUmVzdWx0IH0sIHRydWUpO1xuICAgIGxldCBuZWdhdGVkID0gaXNNYXRjaC5zdGF0ZS5uZWdhdGVkIHx8IGlzTWF0Y2guc3RhdGUubmVnYXRlZEV4dGdsb2I7XG4gICAgaWYgKG5lZ2F0ZWQpIG5lZ2F0aXZlcysrO1xuXG4gICAgZm9yIChsZXQgaXRlbSBvZiBsaXN0KSB7XG4gICAgICBsZXQgbWF0Y2hlZCA9IGlzTWF0Y2goaXRlbSwgdHJ1ZSk7XG5cbiAgICAgIGxldCBtYXRjaCA9IG5lZ2F0ZWQgPyAhbWF0Y2hlZC5pc01hdGNoIDogbWF0Y2hlZC5pc01hdGNoO1xuICAgICAgaWYgKCFtYXRjaCkgY29udGludWU7XG5cbiAgICAgIGlmIChuZWdhdGVkKSB7XG4gICAgICAgIG9taXQuYWRkKG1hdGNoZWQub3V0cHV0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9taXQuZGVsZXRlKG1hdGNoZWQub3V0cHV0KTtcbiAgICAgICAga2VlcC5hZGQobWF0Y2hlZC5vdXRwdXQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGxldCByZXN1bHQgPSBuZWdhdGl2ZXMgPT09IHBhdHRlcm5zLmxlbmd0aCA/IFsuLi5pdGVtc10gOiBbLi4ua2VlcF07XG4gIGxldCBtYXRjaGVzID0gcmVzdWx0LmZpbHRlcihpdGVtID0+ICFvbWl0LmhhcyhpdGVtKSk7XG5cbiAgaWYgKG9wdGlvbnMgJiYgbWF0Y2hlcy5sZW5ndGggPT09IDApIHtcbiAgICBpZiAob3B0aW9ucy5mYWlsZ2xvYiA9PT0gdHJ1ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBtYXRjaGVzIGZvdW5kIGZvciBcIiR7cGF0dGVybnMuam9pbignLCAnKX1cImApO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLm5vbnVsbCA9PT0gdHJ1ZSB8fCBvcHRpb25zLm51bGxnbG9iID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy51bmVzY2FwZSA/IHBhdHRlcm5zLm1hcChwID0+IHAucmVwbGFjZSgvXFxcXC9nLCAnJykpIDogcGF0dGVybnM7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG1hdGNoZXM7XG59O1xuXG4vKipcbiAqIEJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG4gKi9cblxubWljcm9tYXRjaC5tYXRjaCA9IG1pY3JvbWF0Y2g7XG5cbi8qKlxuICogUmV0dXJucyBhIG1hdGNoZXIgZnVuY3Rpb24gZnJvbSB0aGUgZ2l2ZW4gZ2xvYiBgcGF0dGVybmAgYW5kIGBvcHRpb25zYC5cbiAqIFRoZSByZXR1cm5lZCBmdW5jdGlvbiB0YWtlcyBhIHN0cmluZyB0byBtYXRjaCBhcyBpdHMgb25seSBhcmd1bWVudCBhbmQgcmV0dXJuc1xuICogdHJ1ZSBpZiB0aGUgc3RyaW5nIGlzIGEgbWF0Y2guXG4gKlxuICogYGBganNcbiAqIGNvbnN0IG1tID0gcmVxdWlyZSgnbWljcm9tYXRjaCcpO1xuICogLy8gbW0ubWF0Y2hlcihwYXR0ZXJuWywgb3B0aW9uc10pO1xuICpcbiAqIGNvbnN0IGlzTWF0Y2ggPSBtbS5tYXRjaGVyKCcqLiEoKmEpJyk7XG4gKiBjb25zb2xlLmxvZyhpc01hdGNoKCdhLmEnKSk7IC8vPT4gZmFsc2VcbiAqIGNvbnNvbGUubG9nKGlzTWF0Y2goJ2EuYicpKTsgLy89PiB0cnVlXG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBgcGF0dGVybmAgR2xvYiBwYXR0ZXJuXG4gKiBAcGFyYW0ge09iamVjdH0gYG9wdGlvbnNgXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gUmV0dXJucyBhIG1hdGNoZXIgZnVuY3Rpb24uXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1pY3JvbWF0Y2gubWF0Y2hlciA9IChwYXR0ZXJuLCBvcHRpb25zKSA9PiBwaWNvbWF0Y2gocGF0dGVybiwgb3B0aW9ucyk7XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmICoqYW55Kiogb2YgdGhlIGdpdmVuIGdsb2IgYHBhdHRlcm5zYCBtYXRjaCB0aGUgc3BlY2lmaWVkIGBzdHJpbmdgLlxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCBtbSA9IHJlcXVpcmUoJ21pY3JvbWF0Y2gnKTtcbiAqIC8vIG1tLmlzTWF0Y2goc3RyaW5nLCBwYXR0ZXJuc1ssIG9wdGlvbnNdKTtcbiAqXG4gKiBjb25zb2xlLmxvZyhtbS5pc01hdGNoKCdhLmEnLCBbJ2IuKicsICcqLmEnXSkpOyAvLz0+IHRydWVcbiAqIGNvbnNvbGUubG9nKG1tLmlzTWF0Y2goJ2EuYScsICdiLionKSk7IC8vPT4gZmFsc2VcbiAqIGBgYFxuICogQHBhcmFtIHtTdHJpbmd9IGBzdHJgIFRoZSBzdHJpbmcgdG8gdGVzdC5cbiAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBgcGF0dGVybnNgIE9uZSBvciBtb3JlIGdsb2IgcGF0dGVybnMgdG8gdXNlIGZvciBtYXRjaGluZy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBgW29wdGlvbnNdYCBTZWUgYXZhaWxhYmxlIFtvcHRpb25zXSgjb3B0aW9ucykuXG4gKiBAcmV0dXJuIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgYW55IHBhdHRlcm5zIG1hdGNoIGBzdHJgXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1pY3JvbWF0Y2guaXNNYXRjaCA9IChzdHIsIHBhdHRlcm5zLCBvcHRpb25zKSA9PiBwaWNvbWF0Y2gocGF0dGVybnMsIG9wdGlvbnMpKHN0cik7XG5cbi8qKlxuICogQmFja3dhcmRzIGNvbXBhdGliaWxpdHlcbiAqL1xuXG5taWNyb21hdGNoLmFueSA9IG1pY3JvbWF0Y2guaXNNYXRjaDtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbGlzdCBvZiBzdHJpbmdzIHRoYXQgXyoqZG8gbm90IG1hdGNoIGFueSoqXyBvZiB0aGUgZ2l2ZW4gYHBhdHRlcm5zYC5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgbW0gPSByZXF1aXJlKCdtaWNyb21hdGNoJyk7XG4gKiAvLyBtbS5ub3QobGlzdCwgcGF0dGVybnNbLCBvcHRpb25zXSk7XG4gKlxuICogY29uc29sZS5sb2cobW0ubm90KFsnYS5hJywgJ2IuYicsICdjLmMnXSwgJyouYScpKTtcbiAqIC8vPT4gWydiLmInLCAnYy5jJ11cbiAqIGBgYFxuICogQHBhcmFtIHtBcnJheX0gYGxpc3RgIEFycmF5IG9mIHN0cmluZ3MgdG8gbWF0Y2guXG4gKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gYHBhdHRlcm5zYCBPbmUgb3IgbW9yZSBnbG9iIHBhdHRlcm4gdG8gdXNlIGZvciBtYXRjaGluZy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBgb3B0aW9uc2AgU2VlIGF2YWlsYWJsZSBbb3B0aW9uc10oI29wdGlvbnMpIGZvciBjaGFuZ2luZyBob3cgbWF0Y2hlcyBhcmUgcGVyZm9ybWVkXG4gKiBAcmV0dXJuIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiBzdHJpbmdzIHRoYXQgKipkbyBub3QgbWF0Y2gqKiB0aGUgZ2l2ZW4gcGF0dGVybnMuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1pY3JvbWF0Y2gubm90ID0gKGxpc3QsIHBhdHRlcm5zLCBvcHRpb25zID0ge30pID0+IHtcbiAgcGF0dGVybnMgPSBbXS5jb25jYXQocGF0dGVybnMpLm1hcChTdHJpbmcpO1xuICBsZXQgcmVzdWx0ID0gbmV3IFNldCgpO1xuICBsZXQgaXRlbXMgPSBbXTtcblxuICBsZXQgb25SZXN1bHQgPSBzdGF0ZSA9PiB7XG4gICAgaWYgKG9wdGlvbnMub25SZXN1bHQpIG9wdGlvbnMub25SZXN1bHQoc3RhdGUpO1xuICAgIGl0ZW1zLnB1c2goc3RhdGUub3V0cHV0KTtcbiAgfTtcblxuICBsZXQgbWF0Y2hlcyA9IG5ldyBTZXQobWljcm9tYXRjaChsaXN0LCBwYXR0ZXJucywgeyAuLi5vcHRpb25zLCBvblJlc3VsdCB9KSk7XG5cbiAgZm9yIChsZXQgaXRlbSBvZiBpdGVtcykge1xuICAgIGlmICghbWF0Y2hlcy5oYXMoaXRlbSkpIHtcbiAgICAgIHJlc3VsdC5hZGQoaXRlbSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBbLi4ucmVzdWx0XTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBgc3RyaW5nYCBjb250YWlucyB0aGUgZ2l2ZW4gcGF0dGVybi4gU2ltaWxhclxuICogdG8gWy5pc01hdGNoXSgjaXNNYXRjaCkgYnV0IHRoZSBwYXR0ZXJuIGNhbiBtYXRjaCBhbnkgcGFydCBvZiB0aGUgc3RyaW5nLlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgbW0gPSByZXF1aXJlKCdtaWNyb21hdGNoJyk7XG4gKiAvLyBtbS5jb250YWlucyhzdHJpbmcsIHBhdHRlcm5bLCBvcHRpb25zXSk7XG4gKlxuICogY29uc29sZS5sb2cobW0uY29udGFpbnMoJ2FhL2JiL2NjJywgJypiJykpO1xuICogLy89PiB0cnVlXG4gKiBjb25zb2xlLmxvZyhtbS5jb250YWlucygnYWEvYmIvY2MnLCAnKmQnKSk7XG4gKiAvLz0+IGZhbHNlXG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBgc3RyYCBUaGUgc3RyaW5nIHRvIG1hdGNoLlxuICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IGBwYXR0ZXJuc2AgR2xvYiBwYXR0ZXJuIHRvIHVzZSBmb3IgbWF0Y2hpbmcuXG4gKiBAcGFyYW0ge09iamVjdH0gYG9wdGlvbnNgIFNlZSBhdmFpbGFibGUgW29wdGlvbnNdKCNvcHRpb25zKSBmb3IgY2hhbmdpbmcgaG93IG1hdGNoZXMgYXJlIHBlcmZvcm1lZFxuICogQHJldHVybiB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGFueSBvZiB0aGUgcGF0dGVybnMgbWF0Y2hlcyBhbnkgcGFydCBvZiBgc3RyYC5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubWljcm9tYXRjaC5jb250YWlucyA9IChzdHIsIHBhdHRlcm4sIG9wdGlvbnMpID0+IHtcbiAgaWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRXhwZWN0ZWQgYSBzdHJpbmc6IFwiJHt1dGlsLmluc3BlY3Qoc3RyKX1cImApO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkocGF0dGVybikpIHtcbiAgICByZXR1cm4gcGF0dGVybi5zb21lKHAgPT4gbWljcm9tYXRjaC5jb250YWlucyhzdHIsIHAsIG9wdGlvbnMpKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgcGF0dGVybiA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAoaXNFbXB0eVN0cmluZyhzdHIpIHx8IGlzRW1wdHlTdHJpbmcocGF0dGVybikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoc3RyLmluY2x1ZGVzKHBhdHRlcm4pIHx8IChzdHIuc3RhcnRzV2l0aCgnLi8nKSAmJiBzdHIuc2xpY2UoMikuaW5jbHVkZXMocGF0dGVybikpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbWljcm9tYXRjaC5pc01hdGNoKHN0ciwgcGF0dGVybiwgeyAuLi5vcHRpb25zLCBjb250YWluczogdHJ1ZSB9KTtcbn07XG5cbi8qKlxuICogRmlsdGVyIHRoZSBrZXlzIG9mIHRoZSBnaXZlbiBvYmplY3Qgd2l0aCB0aGUgZ2l2ZW4gYGdsb2JgIHBhdHRlcm5cbiAqIGFuZCBgb3B0aW9uc2AuIERvZXMgbm90IGF0dGVtcHQgdG8gbWF0Y2ggbmVzdGVkIGtleXMuIElmIHlvdSBuZWVkIHRoaXMgZmVhdHVyZSxcbiAqIHVzZSBbZ2xvYi1vYmplY3RdW10gaW5zdGVhZC5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgbW0gPSByZXF1aXJlKCdtaWNyb21hdGNoJyk7XG4gKiAvLyBtbS5tYXRjaEtleXMob2JqZWN0LCBwYXR0ZXJuc1ssIG9wdGlvbnNdKTtcbiAqXG4gKiBjb25zdCBvYmogPSB7IGFhOiAnYScsIGFiOiAnYicsIGFjOiAnYycgfTtcbiAqIGNvbnNvbGUubG9nKG1tLm1hdGNoS2V5cyhvYmosICcqYicpKTtcbiAqIC8vPT4geyBhYjogJ2InIH1cbiAqIGBgYFxuICogQHBhcmFtIHtPYmplY3R9IGBvYmplY3RgIFRoZSBvYmplY3Qgd2l0aCBrZXlzIHRvIGZpbHRlci5cbiAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBgcGF0dGVybnNgIE9uZSBvciBtb3JlIGdsb2IgcGF0dGVybnMgdG8gdXNlIGZvciBtYXRjaGluZy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBgb3B0aW9uc2AgU2VlIGF2YWlsYWJsZSBbb3B0aW9uc10oI29wdGlvbnMpIGZvciBjaGFuZ2luZyBob3cgbWF0Y2hlcyBhcmUgcGVyZm9ybWVkXG4gKiBAcmV0dXJuIHtPYmplY3R9IFJldHVybnMgYW4gb2JqZWN0IHdpdGggb25seSBrZXlzIHRoYXQgbWF0Y2ggdGhlIGdpdmVuIHBhdHRlcm5zLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5taWNyb21hdGNoLm1hdGNoS2V5cyA9IChvYmosIHBhdHRlcm5zLCBvcHRpb25zKSA9PiB7XG4gIGlmICghdXRpbHMuaXNPYmplY3Qob2JqKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHRoZSBmaXJzdCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QnKTtcbiAgfVxuICBsZXQga2V5cyA9IG1pY3JvbWF0Y2goT2JqZWN0LmtleXMob2JqKSwgcGF0dGVybnMsIG9wdGlvbnMpO1xuICBsZXQgcmVzID0ge307XG4gIGZvciAobGV0IGtleSBvZiBrZXlzKSByZXNba2V5XSA9IG9ialtrZXldO1xuICByZXR1cm4gcmVzO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgc29tZSBvZiB0aGUgc3RyaW5ncyBpbiB0aGUgZ2l2ZW4gYGxpc3RgIG1hdGNoIGFueSBvZiB0aGUgZ2l2ZW4gZ2xvYiBgcGF0dGVybnNgLlxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCBtbSA9IHJlcXVpcmUoJ21pY3JvbWF0Y2gnKTtcbiAqIC8vIG1tLnNvbWUobGlzdCwgcGF0dGVybnNbLCBvcHRpb25zXSk7XG4gKlxuICogY29uc29sZS5sb2cobW0uc29tZShbJ2Zvby5qcycsICdiYXIuanMnXSwgWycqLmpzJywgJyFmb28uanMnXSkpO1xuICogLy8gdHJ1ZVxuICogY29uc29sZS5sb2cobW0uc29tZShbJ2Zvby5qcyddLCBbJyouanMnLCAnIWZvby5qcyddKSk7XG4gKiAvLyBmYWxzZVxuICogYGBgXG4gKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gYGxpc3RgIFRoZSBzdHJpbmcgb3IgYXJyYXkgb2Ygc3RyaW5ncyB0byB0ZXN0LiBSZXR1cm5zIGFzIHNvb24gYXMgdGhlIGZpcnN0IG1hdGNoIGlzIGZvdW5kLlxuICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IGBwYXR0ZXJuc2AgT25lIG9yIG1vcmUgZ2xvYiBwYXR0ZXJucyB0byB1c2UgZm9yIG1hdGNoaW5nLlxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYCBTZWUgYXZhaWxhYmxlIFtvcHRpb25zXSgjb3B0aW9ucykgZm9yIGNoYW5naW5nIGhvdyBtYXRjaGVzIGFyZSBwZXJmb3JtZWRcbiAqIEByZXR1cm4ge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBhbnkgYHBhdHRlcm5zYCBtYXRjaGVzIGFueSBvZiB0aGUgc3RyaW5ncyBpbiBgbGlzdGBcbiAqIEBhcGkgcHVibGljXG4gKi9cblxubWljcm9tYXRjaC5zb21lID0gKGxpc3QsIHBhdHRlcm5zLCBvcHRpb25zKSA9PiB7XG4gIGxldCBpdGVtcyA9IFtdLmNvbmNhdChsaXN0KTtcblxuICBmb3IgKGxldCBwYXR0ZXJuIG9mIFtdLmNvbmNhdChwYXR0ZXJucykpIHtcbiAgICBsZXQgaXNNYXRjaCA9IHBpY29tYXRjaChTdHJpbmcocGF0dGVybiksIG9wdGlvbnMpO1xuICAgIGlmIChpdGVtcy5zb21lKGl0ZW0gPT4gaXNNYXRjaChpdGVtKSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBldmVyeSBzdHJpbmcgaW4gdGhlIGdpdmVuIGBsaXN0YCBtYXRjaGVzXG4gKiBhbnkgb2YgdGhlIGdpdmVuIGdsb2IgYHBhdHRlcm5zYC5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgbW0gPSByZXF1aXJlKCdtaWNyb21hdGNoJyk7XG4gKiAvLyBtbS5ldmVyeShsaXN0LCBwYXR0ZXJuc1ssIG9wdGlvbnNdKTtcbiAqXG4gKiBjb25zb2xlLmxvZyhtbS5ldmVyeSgnZm9vLmpzJywgWydmb28uanMnXSkpO1xuICogLy8gdHJ1ZVxuICogY29uc29sZS5sb2cobW0uZXZlcnkoWydmb28uanMnLCAnYmFyLmpzJ10sIFsnKi5qcyddKSk7XG4gKiAvLyB0cnVlXG4gKiBjb25zb2xlLmxvZyhtbS5ldmVyeShbJ2Zvby5qcycsICdiYXIuanMnXSwgWycqLmpzJywgJyFmb28uanMnXSkpO1xuICogLy8gZmFsc2VcbiAqIGNvbnNvbGUubG9nKG1tLmV2ZXJ5KFsnZm9vLmpzJ10sIFsnKi5qcycsICchZm9vLmpzJ10pKTtcbiAqIC8vIGZhbHNlXG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBgbGlzdGAgVGhlIHN0cmluZyBvciBhcnJheSBvZiBzdHJpbmdzIHRvIHRlc3QuXG4gKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gYHBhdHRlcm5zYCBPbmUgb3IgbW9yZSBnbG9iIHBhdHRlcm5zIHRvIHVzZSBmb3IgbWF0Y2hpbmcuXG4gKiBAcGFyYW0ge09iamVjdH0gYG9wdGlvbnNgIFNlZSBhdmFpbGFibGUgW29wdGlvbnNdKCNvcHRpb25zKSBmb3IgY2hhbmdpbmcgaG93IG1hdGNoZXMgYXJlIHBlcmZvcm1lZFxuICogQHJldHVybiB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGFsbCBgcGF0dGVybnNgIG1hdGNoZXMgYWxsIG9mIHRoZSBzdHJpbmdzIGluIGBsaXN0YFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5taWNyb21hdGNoLmV2ZXJ5ID0gKGxpc3QsIHBhdHRlcm5zLCBvcHRpb25zKSA9PiB7XG4gIGxldCBpdGVtcyA9IFtdLmNvbmNhdChsaXN0KTtcblxuICBmb3IgKGxldCBwYXR0ZXJuIG9mIFtdLmNvbmNhdChwYXR0ZXJucykpIHtcbiAgICBsZXQgaXNNYXRjaCA9IHBpY29tYXRjaChTdHJpbmcocGF0dGVybiksIG9wdGlvbnMpO1xuICAgIGlmICghaXRlbXMuZXZlcnkoaXRlbSA9PiBpc01hdGNoKGl0ZW0pKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmICoqYWxsKiogb2YgdGhlIGdpdmVuIGBwYXR0ZXJuc2AgbWF0Y2hcbiAqIHRoZSBzcGVjaWZpZWQgc3RyaW5nLlxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCBtbSA9IHJlcXVpcmUoJ21pY3JvbWF0Y2gnKTtcbiAqIC8vIG1tLmFsbChzdHJpbmcsIHBhdHRlcm5zWywgb3B0aW9uc10pO1xuICpcbiAqIGNvbnNvbGUubG9nKG1tLmFsbCgnZm9vLmpzJywgWydmb28uanMnXSkpO1xuICogLy8gdHJ1ZVxuICpcbiAqIGNvbnNvbGUubG9nKG1tLmFsbCgnZm9vLmpzJywgWycqLmpzJywgJyFmb28uanMnXSkpO1xuICogLy8gZmFsc2VcbiAqXG4gKiBjb25zb2xlLmxvZyhtbS5hbGwoJ2Zvby5qcycsIFsnKi5qcycsICdmb28uanMnXSkpO1xuICogLy8gdHJ1ZVxuICpcbiAqIGNvbnNvbGUubG9nKG1tLmFsbCgnZm9vLmpzJywgWycqLmpzJywgJ2YqJywgJypvKicsICcqby5qcyddKSk7XG4gKiAvLyB0cnVlXG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBgc3RyYCBUaGUgc3RyaW5nIHRvIHRlc3QuXG4gKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gYHBhdHRlcm5zYCBPbmUgb3IgbW9yZSBnbG9iIHBhdHRlcm5zIHRvIHVzZSBmb3IgbWF0Y2hpbmcuXG4gKiBAcGFyYW0ge09iamVjdH0gYG9wdGlvbnNgIFNlZSBhdmFpbGFibGUgW29wdGlvbnNdKCNvcHRpb25zKSBmb3IgY2hhbmdpbmcgaG93IG1hdGNoZXMgYXJlIHBlcmZvcm1lZFxuICogQHJldHVybiB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGFueSBwYXR0ZXJucyBtYXRjaCBgc3RyYFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5taWNyb21hdGNoLmFsbCA9IChzdHIsIHBhdHRlcm5zLCBvcHRpb25zKSA9PiB7XG4gIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEV4cGVjdGVkIGEgc3RyaW5nOiBcIiR7dXRpbC5pbnNwZWN0KHN0cil9XCJgKTtcbiAgfVxuXG4gIHJldHVybiBbXS5jb25jYXQocGF0dGVybnMpLmV2ZXJ5KHAgPT4gcGljb21hdGNoKHAsIG9wdGlvbnMpKHN0cikpO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIGFycmF5IG9mIG1hdGNoZXMgY2FwdHVyZWQgYnkgYHBhdHRlcm5gIGluIGBzdHJpbmcsIG9yIGBudWxsYCBpZiB0aGUgcGF0dGVybiBkaWQgbm90IG1hdGNoLlxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCBtbSA9IHJlcXVpcmUoJ21pY3JvbWF0Y2gnKTtcbiAqIC8vIG1tLmNhcHR1cmUocGF0dGVybiwgc3RyaW5nWywgb3B0aW9uc10pO1xuICpcbiAqIGNvbnNvbGUubG9nKG1tLmNhcHR1cmUoJ3Rlc3QvKi5qcycsICd0ZXN0L2Zvby5qcycpKTtcbiAqIC8vPT4gWydmb28nXVxuICogY29uc29sZS5sb2cobW0uY2FwdHVyZSgndGVzdC8qLmpzJywgJ2Zvby9iYXIuY3NzJykpO1xuICogLy89PiBudWxsXG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBgZ2xvYmAgR2xvYiBwYXR0ZXJuIHRvIHVzZSBmb3IgbWF0Y2hpbmcuXG4gKiBAcGFyYW0ge1N0cmluZ30gYGlucHV0YCBTdHJpbmcgdG8gbWF0Y2hcbiAqIEBwYXJhbSB7T2JqZWN0fSBgb3B0aW9uc2AgU2VlIGF2YWlsYWJsZSBbb3B0aW9uc10oI29wdGlvbnMpIGZvciBjaGFuZ2luZyBob3cgbWF0Y2hlcyBhcmUgcGVyZm9ybWVkXG4gKiBAcmV0dXJuIHtBcnJheXxudWxsfSBSZXR1cm5zIGFuIGFycmF5IG9mIGNhcHR1cmVzIGlmIHRoZSBpbnB1dCBtYXRjaGVzIHRoZSBnbG9iIHBhdHRlcm4sIG90aGVyd2lzZSBgbnVsbGAuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1pY3JvbWF0Y2guY2FwdHVyZSA9IChnbG9iLCBpbnB1dCwgb3B0aW9ucykgPT4ge1xuICBsZXQgcG9zaXggPSB1dGlscy5pc1dpbmRvd3Mob3B0aW9ucyk7XG4gIGxldCByZWdleCA9IHBpY29tYXRjaC5tYWtlUmUoU3RyaW5nKGdsb2IpLCB7IC4uLm9wdGlvbnMsIGNhcHR1cmU6IHRydWUgfSk7XG4gIGxldCBtYXRjaCA9IHJlZ2V4LmV4ZWMocG9zaXggPyB1dGlscy50b1Bvc2l4U2xhc2hlcyhpbnB1dCkgOiBpbnB1dCk7XG5cbiAgaWYgKG1hdGNoKSB7XG4gICAgcmV0dXJuIG1hdGNoLnNsaWNlKDEpLm1hcCh2ID0+IHYgPT09IHZvaWQgMCA/ICcnIDogdik7XG4gIH1cbn07XG5cbi8qKlxuICogQ3JlYXRlIGEgcmVndWxhciBleHByZXNzaW9uIGZyb20gdGhlIGdpdmVuIGdsb2IgYHBhdHRlcm5gLlxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCBtbSA9IHJlcXVpcmUoJ21pY3JvbWF0Y2gnKTtcbiAqIC8vIG1tLm1ha2VSZShwYXR0ZXJuWywgb3B0aW9uc10pO1xuICpcbiAqIGNvbnNvbGUubG9nKG1tLm1ha2VSZSgnKi5qcycpKTtcbiAqIC8vPT4gL14oPzooXFwuW1xcXFxcXC9dKT8oPyFcXC4pKD89LilbXlxcL10qP1xcLmpzKSQvXG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBgcGF0dGVybmAgQSBnbG9iIHBhdHRlcm4gdG8gY29udmVydCB0byByZWdleC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBgb3B0aW9uc2BcbiAqIEByZXR1cm4ge1JlZ0V4cH0gUmV0dXJucyBhIHJlZ2V4IGNyZWF0ZWQgZnJvbSB0aGUgZ2l2ZW4gcGF0dGVybi5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubWljcm9tYXRjaC5tYWtlUmUgPSAoLi4uYXJncykgPT4gcGljb21hdGNoLm1ha2VSZSguLi5hcmdzKTtcblxuLyoqXG4gKiBTY2FuIGEgZ2xvYiBwYXR0ZXJuIHRvIHNlcGFyYXRlIHRoZSBwYXR0ZXJuIGludG8gc2VnbWVudHMuIFVzZWRcbiAqIGJ5IHRoZSBbc3BsaXRdKCNzcGxpdCkgbWV0aG9kLlxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCBtbSA9IHJlcXVpcmUoJ21pY3JvbWF0Y2gnKTtcbiAqIGNvbnN0IHN0YXRlID0gbW0uc2NhbihwYXR0ZXJuWywgb3B0aW9uc10pO1xuICogYGBgXG4gKiBAcGFyYW0ge1N0cmluZ30gYHBhdHRlcm5gXG4gKiBAcGFyYW0ge09iamVjdH0gYG9wdGlvbnNgXG4gKiBAcmV0dXJuIHtPYmplY3R9IFJldHVybnMgYW4gb2JqZWN0IHdpdGhcbiAqIEBhcGkgcHVibGljXG4gKi9cblxubWljcm9tYXRjaC5zY2FuID0gKC4uLmFyZ3MpID0+IHBpY29tYXRjaC5zY2FuKC4uLmFyZ3MpO1xuXG4vKipcbiAqIFBhcnNlIGEgZ2xvYiBwYXR0ZXJuIHRvIGNyZWF0ZSB0aGUgc291cmNlIHN0cmluZyBmb3IgYSByZWd1bGFyXG4gKiBleHByZXNzaW9uLlxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCBtbSA9IHJlcXVpcmUoJ21pY3JvbWF0Y2gnKTtcbiAqIGNvbnN0IHN0YXRlID0gbW0ucGFyc2UocGF0dGVyblssIG9wdGlvbnNdKTtcbiAqIGBgYFxuICogQHBhcmFtIHtTdHJpbmd9IGBnbG9iYFxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYFxuICogQHJldHVybiB7T2JqZWN0fSBSZXR1cm5zIGFuIG9iamVjdCB3aXRoIHVzZWZ1bCBwcm9wZXJ0aWVzIGFuZCBvdXRwdXQgdG8gYmUgdXNlZCBhcyByZWdleCBzb3VyY2Ugc3RyaW5nLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5taWNyb21hdGNoLnBhcnNlID0gKHBhdHRlcm5zLCBvcHRpb25zKSA9PiB7XG4gIGxldCByZXMgPSBbXTtcbiAgZm9yIChsZXQgcGF0dGVybiBvZiBbXS5jb25jYXQocGF0dGVybnMgfHwgW10pKSB7XG4gICAgZm9yIChsZXQgc3RyIG9mIGJyYWNlcyhTdHJpbmcocGF0dGVybiksIG9wdGlvbnMpKSB7XG4gICAgICByZXMucHVzaChwaWNvbWF0Y2gucGFyc2Uoc3RyLCBvcHRpb25zKSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59O1xuXG4vKipcbiAqIFByb2Nlc3MgdGhlIGdpdmVuIGJyYWNlIGBwYXR0ZXJuYC5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgeyBicmFjZXMgfSA9IHJlcXVpcmUoJ21pY3JvbWF0Y2gnKTtcbiAqIGNvbnNvbGUubG9nKGJyYWNlcygnZm9vL3thLGIsY30vYmFyJykpO1xuICogLy89PiBbICdmb28vKGF8YnxjKS9iYXInIF1cbiAqXG4gKiBjb25zb2xlLmxvZyhicmFjZXMoJ2Zvby97YSxiLGN9L2JhcicsIHsgZXhwYW5kOiB0cnVlIH0pKTtcbiAqIC8vPT4gWyAnZm9vL2EvYmFyJywgJ2Zvby9iL2JhcicsICdmb28vYy9iYXInIF1cbiAqIGBgYFxuICogQHBhcmFtIHtTdHJpbmd9IGBwYXR0ZXJuYCBTdHJpbmcgd2l0aCBicmFjZSBwYXR0ZXJuIHRvIHByb2Nlc3MuXG4gKiBAcGFyYW0ge09iamVjdH0gYG9wdGlvbnNgIEFueSBbb3B0aW9uc10oI29wdGlvbnMpIHRvIGNoYW5nZSBob3cgZXhwYW5zaW9uIGlzIHBlcmZvcm1lZC4gU2VlIHRoZSBbYnJhY2VzXVtdIGxpYnJhcnkgZm9yIGFsbCBhdmFpbGFibGUgb3B0aW9ucy5cbiAqIEByZXR1cm4ge0FycmF5fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5taWNyb21hdGNoLmJyYWNlcyA9IChwYXR0ZXJuLCBvcHRpb25zKSA9PiB7XG4gIGlmICh0eXBlb2YgcGF0dGVybiAhPT0gJ3N0cmluZycpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGEgc3RyaW5nJyk7XG4gIGlmICgob3B0aW9ucyAmJiBvcHRpb25zLm5vYnJhY2UgPT09IHRydWUpIHx8ICFoYXNCcmFjZXMocGF0dGVybikpIHtcbiAgICByZXR1cm4gW3BhdHRlcm5dO1xuICB9XG4gIHJldHVybiBicmFjZXMocGF0dGVybiwgb3B0aW9ucyk7XG59O1xuXG4vKipcbiAqIEV4cGFuZCBicmFjZXNcbiAqL1xuXG5taWNyb21hdGNoLmJyYWNlRXhwYW5kID0gKHBhdHRlcm4sIG9wdGlvbnMpID0+IHtcbiAgaWYgKHR5cGVvZiBwYXR0ZXJuICE9PSAnc3RyaW5nJykgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBzdHJpbmcnKTtcbiAgcmV0dXJuIG1pY3JvbWF0Y2guYnJhY2VzKHBhdHRlcm4sIHsgLi4ub3B0aW9ucywgZXhwYW5kOiB0cnVlIH0pO1xufTtcblxuLyoqXG4gKiBFeHBvc2UgbWljcm9tYXRjaFxuICovXG5cbi8vIGV4cG9zZWQgZm9yIHRlc3RzXG5taWNyb21hdGNoLmhhc0JyYWNlcyA9IGhhc0JyYWNlcztcbm1vZHVsZS5leHBvcnRzID0gbWljcm9tYXRjaDtcbiIsICJpbXBvcnQgeyBOb3RpY2UsIFBsdWdpbiwgc2V0SWNvbiwgV29ya3NwYWNlTGVhZiB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB7IFB1Ymxpc2hlciB9IGZyb20gJy4vc3JjL3B1Ymxpc2gvcHVibGlzaGVyJztcbmltcG9ydCB7IERFRkFVTFRfQkFDS1VQX1NFVFRJTkdTLCBERUZBVUxUX1NFVFRJTkdTLCBjcmVhdGVTaXRlUHJvZmlsZSB9IGZyb20gJy4vc3JjL2NvcmUvc2V0dGluZ3MnO1xuaW1wb3J0IHsgTm90ZUZsYXJlU2V0dGluZ3MsIFB1Ymxpc2hSZXN1bHQsIFNpdGVQcm9maWxlIH0gZnJvbSAnLi9zcmMvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBOb3RlRmxhcmVTZXR0aW5nc1RhYiB9IGZyb20gJy4vc3JjL3VpL3NldHRpbmdzL3NldHRpbmdzVGFiJztcbmltcG9ydCB7IFN0YXR1c0JhciB9IGZyb20gJy4vc3JjL3VpL3N0YXR1c0Jhcic7XG5pbXBvcnQgeyBOb3RlRmxhcmVWaWV3LCBWSUVXX1RZUEVfTk9URUZMQVJFIH0gZnJvbSAnLi9zcmMvdWkvbm90ZWZsYXJlVmlldyc7XG5pbXBvcnQgeyBkZWNyeXB0U2VjcmV0LCBlbmNyeXB0U2VjcmV0LCBpc1NlY3VyZVN0b3JhZ2VBdmFpbGFibGUgfSBmcm9tICcuL3NyYy9jb3JlL3NlY3VyZVN0b3JlJztcbmltcG9ydCB7IEJhY2t1cEVuZ2luZSB9IGZyb20gJy4vc3JjL2JhY2t1cC9iYWNrdXBFbmdpbmUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOb3RlRmxhcmVQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xuICBzZXR0aW5ncyE6IE5vdGVGbGFyZVNldHRpbmdzO1xuICBzdGF0dXNCYXIhOiBTdGF0dXNCYXI7XG4gIHByaXZhdGUgcmliYm9uRWw6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgYmFja3VwSW5Qcm9ncmVzcyA9IGZhbHNlO1xuICBwcml2YXRlIGJhY2t1cERlYm91bmNlVGltZXI6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gIGFzeW5jIG9ubG9hZCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLmxvYWRTZXR0aW5ncygpO1xuXG4gICAgaWYgKCFpc1NlY3VyZVN0b3JhZ2VBdmFpbGFibGUoKSkge1xuICAgICAgbmV3IE5vdGljZShcbiAgICAgICAgJ05vdGVGbGFyZTogc2VjdXJlIHRva2VuIHN0b3JhZ2UgaXMgdW5hdmFpbGFibGUgb24gdGhpcyBzeXN0ZW0uIFlvdXIgdG9rZW5zIHdpbGwgbm90IGJlIHNhdmVkIGJldHdlZW4gc2Vzc2lvbnMgXHUyMDE0IHlvdSBtYXkgbmVlZCB0byByZS1lbnRlciB0aGVtLicsXG4gICAgICAgIDEwMDAwLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBzdGF0dXNFbCA9IHRoaXMuYWRkU3RhdHVzQmFySXRlbSgpO1xuICAgIHRoaXMuc3RhdHVzQmFyID0gbmV3IFN0YXR1c0JhcihzdGF0dXNFbCk7XG4gICAgdGhpcy51cGRhdGVTdGF0dXNCYXIoKTtcblxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KFZJRVdfVFlQRV9OT1RFRkxBUkUsIChsZWFmKSA9PiBuZXcgTm90ZUZsYXJlVmlldyhsZWFmLCB0aGlzKSk7XG5cbiAgICAvLyBUaGUgcmliYm9uIGljb24gb3BlbnMgdGhlIHB1Ymxpc2hpbmcgcGFuZWwuXG4gICAgdGhpcy5yaWJib25FbCA9IHRoaXMuYWRkUmliYm9uSWNvbihcbiAgICAgIHRoaXMuaXNBY3RpdmVMaXZlKCkgPyAnY2xvdWQtY2hlY2snIDogJ2Nsb3VkLXVwbG9hZCcsXG4gICAgICAnTm90ZUZsYXJlJyxcbiAgICAgICgpID0+IHZvaWQgdGhpcy5hY3RpdmF0ZVZpZXcoKSxcbiAgICApO1xuICAgIHRoaXMudXBkYXRlUmliYm9uSWNvbigpO1xuXG4gICAgdGhpcy5hZGRDb21tYW5kKHtcbiAgICAgIGlkOiAnb3Blbi1wYW5lbCcsXG4gICAgICBuYW1lOiAnT3BlbiBwYW5lbCcsXG4gICAgICBjYWxsYmFjazogKCkgPT4gdm9pZCB0aGlzLmFjdGl2YXRlVmlldygpLFxuICAgIH0pO1xuICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICBpZDogJ3B1Ymxpc2gnLFxuICAgICAgbmFtZTogJ1B1Ymxpc2ggYWN0aXZlIHNpdGUnLFxuICAgICAgY2FsbGJhY2s6ICgpID0+IHZvaWQgdGhpcy5kb1B1Ymxpc2goKSxcbiAgICB9KTtcbiAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgaWQ6ICd1bnB1Ymxpc2gnLFxuICAgICAgbmFtZTogJ1VucHVibGlzaCBhY3RpdmUgc2l0ZScsXG4gICAgICBjYWxsYmFjazogKCkgPT4gdm9pZCB0aGlzLmRvVW5wdWJsaXNoKCksXG4gICAgfSk7XG4gICAgdGhpcy5hZGRDb21tYW5kKHtcbiAgICAgIGlkOiAnYmFja3VwLW5vdycsXG4gICAgICBuYW1lOiAnQmFjayB1cCB2YXVsdCBub3cnLFxuICAgICAgY2FsbGJhY2s6ICgpID0+IHZvaWQgdGhpcy5kb0JhY2t1cChmYWxzZSksXG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZFNldHRpbmdUYWIobmV3IE5vdGVGbGFyZVNldHRpbmdzVGFiKHRoaXMuYXBwLCB0aGlzKSk7XG4gICAgdGhpcy5yZWdpc3RlckJhY2t1cEF1dG9tYXRpb24oKTtcbiAgfVxuXG4gIC8qKiBUaGUgY3VycmVudGx5LXNlbGVjdGVkIHNpdGUsIG9yIHRoZSBmaXJzdCBvbmUsIG9yIG51bGwgd2hlbiBub25lIGV4aXN0LiAqL1xuICBnZXRBY3RpdmVTaXRlKCk6IFNpdGVQcm9maWxlIHwgbnVsbCB7XG4gICAgY29uc3QgeyBzaXRlcywgYWN0aXZlU2l0ZUlkIH0gPSB0aGlzLnNldHRpbmdzO1xuICAgIHJldHVybiBzaXRlcy5maW5kKChzKSA9PiBzLmlkID09PSBhY3RpdmVTaXRlSWQpID8/IHNpdGVzWzBdID8/IG51bGw7XG4gIH1cblxuICBwcml2YXRlIGlzQWN0aXZlTGl2ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBY3RpdmVTaXRlKCk/LmlzUHVibGlzaGVkID8/IGZhbHNlO1xuICB9XG5cbiAgLyoqIFJldmVhbCB0aGUgTm90ZUZsYXJlIHBhbmVsIChjcmVhdGluZyBpdCBpZiBuZWVkZWQgaW4gdGhlIGNvbmZpZ3VyZWQgbG9jYXRpb24pLiAqL1xuICBhc3luYyBhY3RpdmF0ZVZpZXcoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgeyB3b3Jrc3BhY2UgfSA9IHRoaXMuYXBwO1xuICAgIGxldCBsZWFmOiBXb3Jrc3BhY2VMZWFmIHwgbnVsbCA9IHdvcmtzcGFjZS5nZXRMZWF2ZXNPZlR5cGUoVklFV19UWVBFX05PVEVGTEFSRSlbMF0gPz8gbnVsbDtcblxuICAgIGlmICghbGVhZikge1xuICAgICAgY29uc3QgbG9jID0gdGhpcy5zZXR0aW5ncy5kZWZhdWx0Vmlld0xvY2F0aW9uID8/ICdsZWZ0JztcbiAgICAgIGlmIChsb2MgPT09ICdyaWdodCcpIHtcbiAgICAgICAgbGVhZiA9IHdvcmtzcGFjZS5nZXRSaWdodExlYWYoZmFsc2UpO1xuICAgICAgfSBlbHNlIGlmIChsb2MgPT09ICd0YWInKSB7XG4gICAgICAgIGxlYWYgPSB3b3Jrc3BhY2UuZ2V0TGVhZigndGFiJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZWFmID0gd29ya3NwYWNlLmdldExlZnRMZWFmKGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIGlmICghbGVhZikgcmV0dXJuO1xuICAgICAgYXdhaXQgbGVhZi5zZXRWaWV3U3RhdGUoeyB0eXBlOiBWSUVXX1RZUEVfTk9URUZMQVJFLCBhY3RpdmU6IHRydWUgfSk7XG4gICAgfVxuICAgIHZvaWQgd29ya3NwYWNlLnJldmVhbExlYWYobGVhZik7XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2hWaWV3KCk6IHZvaWQge1xuICAgIHRoaXMuYXBwLndvcmtzcGFjZS5nZXRMZWF2ZXNPZlR5cGUoVklFV19UWVBFX05PVEVGTEFSRSkuZm9yRWFjaCgobGVhZikgPT4ge1xuICAgICAgY29uc3QgdmlldyA9IGxlYWYudmlldztcbiAgICAgIGlmICh2aWV3IGluc3RhbmNlb2YgTm90ZUZsYXJlVmlldykgdmlldy5yZWZyZXNoKCk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBkb0JhY2t1cChiYWNrZ3JvdW5kID0gZmFsc2UpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAodGhpcy5iYWNrdXBJblByb2dyZXNzKSB7XG4gICAgICBpZiAoIWJhY2tncm91bmQpIG5ldyBOb3RpY2UoJ0EgYmFja3VwIGlzIGFscmVhZHkgcnVubmluZy4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLnNldHVwQ29tcGxldGUgfHwgIXRoaXMuc2V0dGluZ3MuZW5hYmxlQmFja3VwKSB7XG4gICAgICBpZiAoIWJhY2tncm91bmQpIHtcbiAgICAgICAgdGhpcy5vcGVuU2V0dGluZ3NUYWIoKTtcbiAgICAgICAgbmV3IE5vdGljZSgnRW5hYmxlIHByaXZhdGUgYmFja3VwIGluIE5vdGVGbGFyZSBzZXR0aW5ncyBmaXJzdC4nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuc2V0dGluZ3MuYmFja3VwLnJlcG9zaXRvcnkpIHtcbiAgICAgIHRoaXMuc2V0dGluZ3MuYmFja3VwLnJlcG9zaXRvcnkgPSB0aGlzLmRlZmF1bHRCYWNrdXBSZXBvc2l0b3J5KCk7XG4gICAgfVxuXG4gICAgdGhpcy5iYWNrdXBJblByb2dyZXNzID0gdHJ1ZTtcbiAgICB0aGlzLnNldHRpbmdzLmJhY2t1cC5sYXN0QmFja3VwQXR0ZW1wdEF0ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuICAgIGNvbnN0IGVuZ2luZSA9IG5ldyBCYWNrdXBFbmdpbmUodGhpcy5hcHAsIHRoaXMuc2V0dGluZ3MsIChtZXNzYWdlKSA9PiB7XG4gICAgICBpZiAoIWJhY2tncm91bmQpIHRoaXMuc3RhdHVzQmFyLnNldE1lc3NhZ2UoYE5vdGVGbGFyZTogJHttZXNzYWdlfWApO1xuICAgIH0pO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGVuZ2luZS5iYWNrdXAoKTtcbiAgICAgIGlmICghcmVzdWx0LnN1Y2Nlc3MpIHRocm93IG5ldyBFcnJvcihyZXN1bHQuZXJyb3JzWzBdID8/ICdCYWNrdXAgZmFpbGVkLicpO1xuXG4gICAgICB0aGlzLnNldHRpbmdzLmJhY2t1cC5sYXN0QmFja3VwQXQgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgICB0aGlzLnNldHRpbmdzLmJhY2t1cC5sYXN0QmFja3VwRXJyb3IgPSAnJztcbiAgICAgIGF3YWl0IHRoaXMuc2F2ZVNldHRpbmdzKCk7XG5cbiAgICAgIGlmICghYmFja2dyb3VuZCkge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gcmVzdWx0LnVwZGF0ZWQgPiAwXG4gICAgICAgICAgPyBgQmFja3VwIGNvbXBsZXRlIFx1MDBCNyAke3Jlc3VsdC51cGRhdGVkfSBmaWxlJHtyZXN1bHQudXBkYXRlZCA9PT0gMSA/ICcnIDogJ3MnfSB1cGRhdGVkYFxuICAgICAgICAgIDogJ0JhY2t1cCBpcyBhbHJlYWR5IHVwIHRvIGRhdGUnO1xuICAgICAgICBuZXcgTm90aWNlKG1lc3NhZ2UsIDUwMDApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gdGhpcy50b1VzZXJNZXNzYWdlKGVycm9yLCAnQmFja3VwIGZhaWxlZC4nKTtcbiAgICAgIHRoaXMuc2V0dGluZ3MuYmFja3VwLmxhc3RCYWNrdXBFcnJvciA9IG1lc3NhZ2U7XG4gICAgICBhd2FpdCB0aGlzLnNhdmVTZXR0aW5ncygpO1xuICAgICAgaWYgKCFiYWNrZ3JvdW5kKSB7XG4gICAgICAgIHRoaXMuc3RhdHVzQmFyLnNldEVycm9yKG1lc3NhZ2UpO1xuICAgICAgICBuZXcgTm90aWNlKG1lc3NhZ2UsIDgwMDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgTm90ZUZsYXJlIGJhY2tncm91bmQgYmFja3VwIGZhaWxlZDogJHttZXNzYWdlfWApO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLmJhY2t1cEluUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICAgIGlmICghYmFja2dyb3VuZCkgdGhpcy51cGRhdGVTdGF0dXNCYXIoKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBkb1B1Ymxpc2goKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgc2l0ZSA9IHRoaXMuZ2V0QWN0aXZlU2l0ZSgpO1xuICAgIGlmICghdGhpcy5zZXR0aW5ncy5zZXR1cENvbXBsZXRlIHx8ICFzaXRlKSB7XG4gICAgICB0aGlzLm9wZW5TZXR0aW5nc1RhYigpO1xuICAgICAgbmV3IE5vdGljZSgnQWRkIGEgc2l0ZSBiZWZvcmUgcHVibGlzaGluZy4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwdWJsaXNoZXIgPSBuZXcgUHVibGlzaGVyKHRoaXMuc2V0dGluZ3MsIHNpdGUsIHRoaXMuYXBwLCAobWVzc2FnZSkgPT4ge1xuICAgICAgdGhpcy5zeW5jU3RhdHVzRnJvbVByb2dyZXNzKG1lc3NhZ2UpO1xuICAgIH0pO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHB1Ymxpc2hlci5wdWJsaXNoKCk7XG4gICAgICBhd2FpdCB0aGlzLmFwcGx5UHVibGlzaFJlc3VsdChzaXRlLCByZXN1bHQpO1xuICAgIH0gY2F0Y2ggKGVycjogdW5rbm93bikge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IHRoaXMudG9Vc2VyTWVzc2FnZShlcnIsICdQdWJsaXNoaW5nIGZhaWxlZC4gUmV2aWV3IHlvdXIgc2V0dXAgYW5kIHRyeSBhZ2Fpbi4nKTtcbiAgICAgIHRoaXMuc3RhdHVzQmFyLnNldEVycm9yKG1lc3NhZ2UpO1xuICAgICAgbmV3IE5vdGljZShtZXNzYWdlLCA4MDAwKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBkb1VucHVibGlzaCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBzaXRlID0gdGhpcy5nZXRBY3RpdmVTaXRlKCk7XG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLnNldHVwQ29tcGxldGUgfHwgIXNpdGUpIHtcbiAgICAgIHRoaXMub3BlblNldHRpbmdzVGFiKCk7XG4gICAgICBuZXcgTm90aWNlKCdBZGQgYSBzaXRlIGZpcnN0LicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHB1Ymxpc2hlciA9IG5ldyBQdWJsaXNoZXIodGhpcy5zZXR0aW5ncywgc2l0ZSwgdGhpcy5hcHAsIChtZXNzYWdlKSA9PiB7XG4gICAgICB0aGlzLnN0YXR1c0Jhci5zZXRNZXNzYWdlKGBOb3RlRmxhcmU6ICR7bWVzc2FnZX1gKTtcbiAgICB9KTtcblxuICAgIHRoaXMuc3RhdHVzQmFyLnNldE1lc3NhZ2UoJ05vdGVGbGFyZTogVGFraW5nIHlvdXIgc2l0ZSBvZmZsaW5lLi4uJyk7XG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgcHVibGlzaGVyLnVucHVibGlzaCgpO1xuICAgICAgc2l0ZS5pc1B1Ymxpc2hlZCA9IGZhbHNlO1xuICAgICAgYXdhaXQgdGhpcy5zYXZlU2V0dGluZ3MoKTtcbiAgICAgIHRoaXMudXBkYXRlU3RhdHVzQmFyKCk7XG4gICAgICBuZXcgTm90aWNlKCdZb3VyIHNpdGUgaXMgbm93IG9mZmxpbmUuIFlvdSBjYW4gcHVibGlzaCBhZ2FpbiBhbnkgdGltZS4nKTtcbiAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLnRvVXNlck1lc3NhZ2UoZXJyLCAnVW5wdWJsaXNoIGZhaWxlZC4gQ2hlY2sgeW91ciBDbG91ZGZsYXJlIHNldHRpbmdzIGFuZCB0cnkgYWdhaW4uJyk7XG4gICAgICB0aGlzLnN0YXR1c0Jhci5zZXRFcnJvcihtZXNzYWdlKTtcbiAgICAgIG5ldyBOb3RpY2UobWVzc2FnZSwgODAwMCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgbG9hZFNldHRpbmdzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGxvYWRlZCA9IChhd2FpdCB0aGlzLmxvYWREYXRhKCkpIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgbnVsbDtcbiAgICBjb25zdCB7IHNldHRpbmdzIH0gPSBtaWdyYXRlU2V0dGluZ3MobG9hZGVkKTtcbiAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XG4gIH1cblxuICBhc3luYyBzYXZlU2V0dGluZ3MoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gUGVyc2lzdCB0b2tlbnMgYXMgT1MtZW5jcnlwdGVkIGNpcGhlcnRleHQ7IG5ldmVyIHdyaXRlIHBsYWludGV4dC4gSWZcbiAgICAvLyBzZWN1cmUgc3RvcmFnZSBpcyB1bmF2YWlsYWJsZSB0aGUgdG9rZW5zIHNpbXBseSBhcmVuJ3QgcGVyc2lzdGVkICh0aGV5XG4gICAgLy8gc3RheSBpbiBtZW1vcnkgZm9yIHRoZSBzZXNzaW9uKSByYXRoZXIgdGhhbiBiZWluZyB3cml0dGVuIGluIHRoZSBjbGVhci5cbiAgICBjb25zdCB7IGdpdGh1YlRva2VuLCBjbG91ZGZsYXJlVG9rZW4sIC4uLnJlc3QgfSA9IHRoaXMuc2V0dGluZ3M7XG4gICAgY29uc3QgcGVyc2lzdGVkOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9IHsgLi4ucmVzdCB9O1xuICAgIGlmIChpc1NlY3VyZVN0b3JhZ2VBdmFpbGFibGUoKSkge1xuICAgICAgcGVyc2lzdGVkLmdpdGh1YlRva2VuRW5jID0gZ2l0aHViVG9rZW4gPyBlbmNyeXB0U2VjcmV0KGdpdGh1YlRva2VuKSA6ICcnO1xuICAgICAgcGVyc2lzdGVkLmNsb3VkZmxhcmVUb2tlbkVuYyA9IGNsb3VkZmxhcmVUb2tlbiA/IGVuY3J5cHRTZWNyZXQoY2xvdWRmbGFyZVRva2VuKSA6ICcnO1xuICAgIH1cbiAgICBhd2FpdCB0aGlzLnNhdmVEYXRhKHBlcnNpc3RlZCk7XG5cbiAgICB0aGlzLnVwZGF0ZVN0YXR1c0JhcigpO1xuICAgIHRoaXMudXBkYXRlUmliYm9uSWNvbigpO1xuICAgIHRoaXMucmVmcmVzaFZpZXcoKTtcbiAgfVxuXG4gIHVwZGF0ZVN0YXR1c0JhcigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuc3RhdHVzQmFyKSByZXR1cm47XG5cbiAgICBjb25zdCBzaXRlID0gdGhpcy5nZXRBY3RpdmVTaXRlKCk7XG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLnNldHVwQ29tcGxldGUgfHwgIXNpdGUpIHtcbiAgICAgIHRoaXMuc3RhdHVzQmFyLnNldElkbGUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoc2l0ZS5pc1B1Ymxpc2hlZCkge1xuICAgICAgdGhpcy5zdGF0dXNCYXIuc2V0TGl2ZShzaXRlLmxhc3ROb3RlQ291bnQsIHNpdGUuc2l0ZVVybCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zdGF0dXNCYXIuc2V0VW5wdWJsaXNoZWQoKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlUmliYm9uSWNvbigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucmliYm9uRWwpIHJldHVybjtcblxuICAgIGNvbnN0IGxpdmUgPSB0aGlzLmlzQWN0aXZlTGl2ZSgpO1xuICAgIHNldEljb24odGhpcy5yaWJib25FbCwgbGl2ZSA/ICdjbG91ZC1jaGVjaycgOiAnY2xvdWQtdXBsb2FkJyk7XG4gICAgdGhpcy5yaWJib25FbC5zZXRBdHRyaWJ1dGUoXG4gICAgICAnYXJpYS1sYWJlbCcsXG4gICAgICBsaXZlID8gJ05vdGVGbGFyZTogVW5wdWJsaXNoIHNpdGUnIDogJ05vdGVGbGFyZTogUHVibGlzaCBzaXRlJyxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBzeW5jU3RhdHVzRnJvbVByb2dyZXNzKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHVwbG9hZE1hdGNoID0gL1VwbG9hZGluZyAoXFxkKylcXC8oXFxkKykvLmV4ZWMobWVzc2FnZSk7XG4gICAgaWYgKHVwbG9hZE1hdGNoKSB7XG4gICAgICB0aGlzLnN0YXR1c0Jhci5zZXRQdWJsaXNoaW5nKE51bWJlcih1cGxvYWRNYXRjaFsxXSksIE51bWJlcih1cGxvYWRNYXRjaFsyXSkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHJhdGVNYXRjaCA9IC9SYXRlIGxpbWl0ZWQoPzouKj8pKFxcZCspcy8uZXhlYyhtZXNzYWdlKTtcbiAgICBpZiAocmF0ZU1hdGNoKSB7XG4gICAgICB0aGlzLnN0YXR1c0Jhci5zZXRSYXRlTGltaXRlZChOdW1iZXIocmF0ZU1hdGNoWzFdKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zdGF0dXNCYXIuc2V0TWVzc2FnZShgTm90ZUZsYXJlOiAke21lc3NhZ2V9YCk7XG4gIH1cblxuICBwcml2YXRlIHJlZ2lzdGVyQmFja3VwQXV0b21hdGlvbigpOiB2b2lkIHtcbiAgICBjb25zdCBxdWV1ZUFmdGVyQ2hhbmdlID0gKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLmVuYWJsZUJhY2t1cCB8fCAhdGhpcy5zZXR0aW5ncy5iYWNrdXAuYmFja3VwT25DaGFuZ2UpIHJldHVybjtcbiAgICAgIGlmICh0aGlzLmJhY2t1cERlYm91bmNlVGltZXIgIT09IG51bGwpIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5iYWNrdXBEZWJvdW5jZVRpbWVyKTtcbiAgICAgIHRoaXMuYmFja3VwRGVib3VuY2VUaW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5iYWNrdXBEZWJvdW5jZVRpbWVyID0gbnVsbDtcbiAgICAgICAgdm9pZCB0aGlzLmRvQmFja3VwKHRydWUpO1xuICAgICAgfSwgMzAwMDApO1xuICAgIH07XG5cbiAgICB0aGlzLnJlZ2lzdGVyRXZlbnQodGhpcy5hcHAudmF1bHQub24oJ2NyZWF0ZScsIHF1ZXVlQWZ0ZXJDaGFuZ2UpKTtcbiAgICB0aGlzLnJlZ2lzdGVyRXZlbnQodGhpcy5hcHAudmF1bHQub24oJ21vZGlmeScsIHF1ZXVlQWZ0ZXJDaGFuZ2UpKTtcbiAgICB0aGlzLnJlZ2lzdGVyRXZlbnQodGhpcy5hcHAudmF1bHQub24oJ2RlbGV0ZScsIHF1ZXVlQWZ0ZXJDaGFuZ2UpKTtcbiAgICB0aGlzLnJlZ2lzdGVyRXZlbnQodGhpcy5hcHAudmF1bHQub24oJ3JlbmFtZScsIHF1ZXVlQWZ0ZXJDaGFuZ2UpKTtcbiAgICB0aGlzLnJlZ2lzdGVyKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmJhY2t1cERlYm91bmNlVGltZXIgIT09IG51bGwpIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5iYWNrdXBEZWJvdW5jZVRpbWVyKTtcbiAgICB9KTtcblxuICAgIHRoaXMucmVnaXN0ZXJJbnRlcnZhbCh3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgdm9pZCB0aGlzLnJ1blNjaGVkdWxlZEJhY2t1cElmRHVlKCk7XG4gICAgfSwgNjAwMDApKTtcbiAgICB0aGlzLmFwcC53b3Jrc3BhY2Uub25MYXlvdXRSZWFkeSgoKSA9PiB2b2lkIHRoaXMucnVuU2NoZWR1bGVkQmFja3VwSWZEdWUoKSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHJ1blNjaGVkdWxlZEJhY2t1cElmRHVlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHsgYmFja3VwIH0gPSB0aGlzLnNldHRpbmdzO1xuICAgIGlmICghdGhpcy5zZXR0aW5ncy5zZXR1cENvbXBsZXRlIHx8ICF0aGlzLnNldHRpbmdzLmVuYWJsZUJhY2t1cCB8fCBiYWNrdXAuaW50ZXJ2YWxNaW51dGVzIDw9IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBsYXN0QXR0ZW1wdCA9IGJhY2t1cC5sYXN0QmFja3VwQXR0ZW1wdEF0XG4gICAgICA/IG5ldyBEYXRlKGJhY2t1cC5sYXN0QmFja3VwQXR0ZW1wdEF0KS5nZXRUaW1lKClcbiAgICAgIDogMDtcbiAgICBjb25zdCBpbnRlcnZhbE1zID0gYmFja3VwLmludGVydmFsTWludXRlcyAqIDYwICogMTAwMDtcbiAgICBpZiAoIWxhc3RBdHRlbXB0IHx8IERhdGUubm93KCkgLSBsYXN0QXR0ZW1wdCA+PSBpbnRlcnZhbE1zKSB7XG4gICAgICBhd2FpdCB0aGlzLmRvQmFja3VwKHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGRlZmF1bHRCYWNrdXBSZXBvc2l0b3J5KCk6IHN0cmluZyB7XG4gICAgY29uc3QgdmF1bHROYW1lID0gdGhpcy5hcHAudmF1bHQuZ2V0TmFtZSgpXG4gICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgLnJlcGxhY2UoL1teYS16MC05LV0rL2csICctJylcbiAgICAgIC5yZXBsYWNlKC9eLSt8LSskL2csICcnKTtcbiAgICByZXR1cm4gYCR7dmF1bHROYW1lIHx8ICdvYnNpZGlhbi12YXVsdCd9LWJhY2t1cGA7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGFwcGx5UHVibGlzaFJlc3VsdChzaXRlOiBTaXRlUHJvZmlsZSwgcmVzdWx0OiBQdWJsaXNoUmVzdWx0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgc2l0ZS5sYXN0UHVibGlzaGVkID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuICAgIHNpdGUuaXNQdWJsaXNoZWQgPSBzaXRlLmlzUHVibGlzaGVkIHx8IHJlc3VsdC5zdWNjZXNzO1xuICAgIHNpdGUubGFzdE5vdGVDb3VudCA9IHJlc3VsdC51cGxvYWRlZDtcbiAgICBhd2FpdCB0aGlzLnNhdmVTZXR0aW5ncygpO1xuXG4gICAgaWYgKHJlc3VsdC5zdWNjZXNzKSB7XG4gICAgICB0aGlzLnN0YXR1c0Jhci5zZXRMaXZlKHJlc3VsdC51cGxvYWRlZCwgc2l0ZS5zaXRlVXJsKTtcbiAgICAgIGNvbnN0IGZpeGVkTm90ZSA9IHJlc3VsdC5maXhlZCA+IDAgPyBgIChhdXRvLWZpeGVkICR7cmVzdWx0LmZpeGVkfSBmcm9udG1hdHRlciBpc3N1ZSR7cmVzdWx0LmZpeGVkID09PSAxID8gJycgOiAncyd9KWAgOiAnJztcbiAgICAgIG5ldyBOb3RpY2UoYFB1Ymxpc2hlZCAke3Jlc3VsdC51cGxvYWRlZH0gZmlsZXMgdG8gJHtzaXRlLnNpdGVVcmx9JHtmaXhlZE5vdGV9YCwgNjAwMCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZmlyc3RFcnJvciA9IHJlc3VsdC5lcnJvcnNbMF0gPz8gJ1B1Ymxpc2hpbmcgZmFpbGVkLiBSZXZpZXcgeW91ciBzZXR1cCBhbmQgdHJ5IGFnYWluLic7XG4gICAgdGhpcy5zdGF0dXNCYXIuc2V0RXJyb3IoZmlyc3RFcnJvcik7XG4gICAgbmV3IE5vdGljZShgRmFpbGVkIHRvIHB1Ymxpc2g6ICR7Zmlyc3RFcnJvcn1gLCA4MDAwKTtcbiAgfVxuXG4gIG9wZW5TZXR0aW5nc1RhYigpOiB2b2lkIHtcbiAgICBjb25zdCBzZXR0aW5nID0gKCh0aGlzLmFwcCBhcyB1bmtub3duKSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikuc2V0dGluZyBhc1xuICAgICAgfCB7IG9wZW4/OiAoKSA9PiB2b2lkOyBvcGVuVGFiQnlJZD86IChpZDogc3RyaW5nKSA9PiB2b2lkIH1cbiAgICAgIHwgdW5kZWZpbmVkO1xuICAgIHNldHRpbmc/Lm9wZW4/LigpO1xuICAgIHNldHRpbmc/Lm9wZW5UYWJCeUlkPy4odGhpcy5tYW5pZmVzdC5pZCk7XG4gIH1cblxuICBwcml2YXRlIHRvVXNlck1lc3NhZ2UoZXJyOiB1bmtub3duLCBmYWxsYmFjazogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBtZXNzYWdlID0gZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6ICcnO1xuICAgIHJldHVybiBtZXNzYWdlIHx8IGZhbGxiYWNrO1xuICB9XG59XG5cbi8qKlxuICogQnVpbGQgdGhlIGluLW1lbW9yeSBzZXR0aW5ncyBmcm9tIHdoYXRldmVyIGlzIGluIGBkYXRhLmpzb25gLCB1cGdyYWRpbmcgdHdvXG4gKiBsZWdhY3kgc2hhcGVzIHNvIGV4aXN0aW5nIHVzZXJzIGtlZXAgd29ya2luZzpcbiAqICAxLiBwbGFpbnRleHQgYGdpdGh1YlRva2VuYC9gY2xvdWRmbGFyZVRva2VuYCBcdTIxOTIgZGVjcnlwdC1vbi1sb2FkIHZpYSBgKkVuY2AsXG4gKiAgICAgYW5kIGZsYWcgYSByZS1zYXZlIHNvIHRoZSBwbGFpbnRleHQgaXMgc2NydWJiZWQgYW5kIHJld3JpdHRlbiBlbmNyeXB0ZWQuXG4gKiAgMi4gZmxhdCBzaW5nbGUtc2l0ZSBmaWVsZHMgKGBnaXRodWJSZXBvYCwgYGNsb3VkZmxhcmVQcm9qZWN0YCwgXHUyMDI2KSBcdTIxOTIgb25lXG4gKiAgICAgU2l0ZVByb2ZpbGUgaW4gYHNpdGVzW11gLlxuICogUmV0dXJucyBgbmVlZHNSZXNhdmVgIHNvIHRoZSBjYWxsZXIgcmV3cml0ZXMgdGhlIGZpbGUgaW4gdGhlIG5ldyBzaGFwZS5cbiAqL1xuZnVuY3Rpb24gbWlncmF0ZVNldHRpbmdzKFxuICBsb2FkZWQ6IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgbnVsbCxcbik6IHsgc2V0dGluZ3M6IE5vdGVGbGFyZVNldHRpbmdzIH0ge1xuICBjb25zdCBzZXR0aW5nczogTm90ZUZsYXJlU2V0dGluZ3MgPSB7XG4gICAgLi4uREVGQVVMVF9TRVRUSU5HUyxcbiAgICBzaXRlczogW10sXG4gICAgYmFja3VwOiB7IC4uLkRFRkFVTFRfQkFDS1VQX1NFVFRJTkdTIH0sXG4gIH07XG4gIGlmICghbG9hZGVkKSByZXR1cm4geyBzZXR0aW5ncyB9O1xuXG4gIGNvbnN0IHN0ciA9ICh2OiB1bmtub3duKTogc3RyaW5nID0+ICh0eXBlb2YgdiA9PT0gJ3N0cmluZycgPyB2IDogJycpO1xuICBzZXR0aW5ncy5naXRodWJPd25lciA9IHN0cihsb2FkZWQuZ2l0aHViT3duZXIpO1xuICBzZXR0aW5ncy5jbG91ZGZsYXJlQWNjb3VudCA9IHN0cihsb2FkZWQuY2xvdWRmbGFyZUFjY291bnQpO1xuICBzZXR0aW5ncy5tYXN0ZXJSZXBvc2l0b3J5ID0gc3RyKGxvYWRlZC5tYXN0ZXJSZXBvc2l0b3J5KSB8fCAnbm90ZWZsYXJlLXNpdGVzJztcbiAgc2V0dGluZ3Muc2V0dXBDb21wbGV0ZSA9IGxvYWRlZC5zZXR1cENvbXBsZXRlID09PSB0cnVlO1xuICBzZXR0aW5ncy5hY3RpdmVTaXRlSWQgPSBzdHIobG9hZGVkLmFjdGl2ZVNpdGVJZCk7XG4gIHNldHRpbmdzLmVuYWJsZUJhY2t1cCA9IGxvYWRlZC5lbmFibGVCYWNrdXAgPT09IHRydWU7XG4gIHNldHRpbmdzLmVuYWJsZVB1Ymxpc2ggPSBsb2FkZWQuZW5hYmxlUHVibGlzaCAhPT0gZmFsc2U7IC8vIGRlZmF1bHQgdHJ1ZVxuICBjb25zdCBzYXZlZEJhY2t1cCA9IHR5cGVvZiBsb2FkZWQuYmFja3VwID09PSAnb2JqZWN0JyAmJiBsb2FkZWQuYmFja3VwICE9PSBudWxsXG4gICAgPyBsb2FkZWQuYmFja3VwIGFzIFBhcnRpYWw8Tm90ZUZsYXJlU2V0dGluZ3NbJ2JhY2t1cCddPlxuICAgIDogbnVsbDtcbiAgc2V0dGluZ3MuYmFja3VwID0ge1xuICAgIC4uLkRFRkFVTFRfQkFDS1VQX1NFVFRJTkdTLFxuICAgIC4uLihzYXZlZEJhY2t1cCA/PyB7fSksXG4gICAgcmVwb3NpdG9yeTogc2F2ZWRCYWNrdXA/LnJlcG9zaXRvcnkgPz8gJycsXG4gICAgZm9sZGVyOiBzYXZlZEJhY2t1cD8uZm9sZGVyID8/ICcnLFxuICAgIGJhY2t1cE9uQ2hhbmdlOiBzYXZlZEJhY2t1cD8uYmFja3VwT25DaGFuZ2UgPz8gdHJ1ZSxcbiAgICBsYXN0QmFja3VwQXQ6IHNhdmVkQmFja3VwPy5sYXN0QmFja3VwQXQgPz8gJycsXG4gIH07XG5cbiAgaWYgKGxvYWRlZC5naXRodWJUb2tlbkVuYykge1xuICAgIHNldHRpbmdzLmdpdGh1YlRva2VuID0gZGVjcnlwdFNlY3JldChzdHIobG9hZGVkLmdpdGh1YlRva2VuRW5jKSk7XG4gIH1cbiAgaWYgKGxvYWRlZC5jbG91ZGZsYXJlVG9rZW5FbmMpIHtcbiAgICBzZXR0aW5ncy5jbG91ZGZsYXJlVG9rZW4gPSBkZWNyeXB0U2VjcmV0KHN0cihsb2FkZWQuY2xvdWRmbGFyZVRva2VuRW5jKSk7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShsb2FkZWQuc2l0ZXMpKSB7XG4gICAgc2V0dGluZ3Muc2l0ZXMgPSAobG9hZGVkLnNpdGVzIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+W10pLm1hcCgocykgPT4ge1xuICAgICAgLy8gTWlncmF0ZSBsZWdhY3kgcHVibGlzaFNjb3BlICgnZm9sZGVyJyB8ICdwYWdlJykgYW5kIHB1Ymxpc2hQYXRoIHRvIHB1Ymxpc2hQYXRoc1xuICAgICAgbGV0IHB1Ymxpc2hTY29wZSA9IHMucHVibGlzaFNjb3BlIGFzIHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgIGxldCBwdWJsaXNoUGF0aHMgPSBzLnB1Ymxpc2hQYXRocyBhcyBzdHJpbmdbXSB8IHVuZGVmaW5lZDtcbiAgICAgIFxuICAgICAgaWYgKHB1Ymxpc2hTY29wZSA9PT0gJ2ZvbGRlcicgfHwgcHVibGlzaFNjb3BlID09PSAncGFnZScpIHtcbiAgICAgICAgcHVibGlzaFNjb3BlID0gJ3NlbGVjdGVkJztcbiAgICAgICAgY29uc3QgbGVnYWN5UGF0aCA9IHMucHVibGlzaFBhdGggYXMgc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICBpZiAobGVnYWN5UGF0aCAmJiAhcHVibGlzaFBhdGhzKSB7XG4gICAgICAgICAgcHVibGlzaFBhdGhzID0gW2xlZ2FjeVBhdGhdO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjcmVhdGVTaXRlUHJvZmlsZSh7XG4gICAgICAgIC4uLihzIGFzIFBhcnRpYWw8U2l0ZVByb2ZpbGU+KSxcbiAgICAgICAgcHVibGlzaFNjb3BlOiAocHVibGlzaFNjb3BlIGFzICd2YXVsdCcgfCAnc2VsZWN0ZWQnKSB8fCAndmF1bHQnLFxuICAgICAgICBwdWJsaXNoUGF0aHM6IHB1Ymxpc2hQYXRocyB8fCBbXSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gRW5zdXJlIHRoZSBhY3RpdmUgaWQgcG9pbnRzIGF0IGEgcmVhbCBzaXRlLlxuICBpZiAoIXNldHRpbmdzLnNpdGVzLnNvbWUoKHMpID0+IHMuaWQgPT09IHNldHRpbmdzLmFjdGl2ZVNpdGVJZCkpIHtcbiAgICBzZXR0aW5ncy5hY3RpdmVTaXRlSWQgPSBzZXR0aW5ncy5zaXRlc1swXT8uaWQgPz8gJyc7XG4gIH1cblxuICByZXR1cm4geyBzZXR0aW5ncyB9O1xufVxuIiwgImltcG9ydCB7IHJlcXVlc3RVcmwgfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgeyBVcGxvYWRGaWxlLCBQdWJsaXNoUmVzdWx0IH0gZnJvbSAnLi4vY29yZS90eXBlcyc7XG5cblxuYXN5bmMgZnVuY3Rpb24gZG9SZXF1ZXN0KHVybDogc3RyaW5nLCBvcHRpb25zOiB7IG1ldGhvZD86IHN0cmluZzsgaGVhZGVycz86IFJlY29yZDxzdHJpbmcsIHN0cmluZz47IGJvZHk/OiBzdHJpbmcgfSA9IHt9KSB7XG4gIGNvbnN0IHJlc3AgPSBhd2FpdCByZXF1ZXN0VXJsKHtcbiAgICB1cmwsXG4gICAgbWV0aG9kOiBvcHRpb25zLm1ldGhvZCB8fCAnR0VUJyxcbiAgICBoZWFkZXJzOiBvcHRpb25zLmhlYWRlcnMsXG4gICAgYm9keTogb3B0aW9ucy5ib2R5LFxuICAgIHRocm93OiBmYWxzZVxuICB9KTtcbiAgcmV0dXJuIHtcbiAgICBvazogcmVzcC5zdGF0dXMgPj0gMjAwICYmIHJlc3Auc3RhdHVzIDwgMzAwLFxuICAgIHN0YXR1czogcmVzcC5zdGF0dXMsXG4gICAganNvbjogYXN5bmMgKCkgPT4gcmVzcC5qc29uIGFzIHVua25vd24sXG4gICAgdGV4dDogYXN5bmMgKCkgPT4gcmVzcC50ZXh0XG4gIH07XG59XG5cbmNvbnN0IEdJVEhVQl9BUEkgPSAnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbSc7XG5jb25zdCBCQVRDSF9TSVpFID0gMTA7XG5jb25zdCBSQVRFX0xJTUlUX1dBSVRfTVMgPSA2MDAwMDtcblxuZXhwb3J0IGNsYXNzIEdpdEh1YkFwaSB7XG4gIHByaXZhdGUgdG9rZW46IHN0cmluZztcbiAgcHJpdmF0ZSBvd25lcjogc3RyaW5nO1xuICBwcml2YXRlIHJlcG86IHN0cmluZztcbiAgcHJpdmF0ZSBicmFuY2g6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICB0b2tlbjogc3RyaW5nLFxuICAgIG93bmVyOiBzdHJpbmcsXG4gICAgcmVwbzogc3RyaW5nLFxuICAgIGJyYW5jaCA9ICcnLFxuICApIHtcbiAgICB0aGlzLnRva2VuID0gdG9rZW47XG4gICAgdGhpcy5vd25lciA9IG93bmVyO1xuICAgIHRoaXMucmVwbyA9IHJlcG8udHJpbSgpLnJlcGxhY2UoL1xccysvZywgJy0nKTtcbiAgICB0aGlzLmJyYW5jaCA9IGJyYW5jaDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGhlYWRlcnMoKTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIEF1dGhvcml6YXRpb246IGB0b2tlbiAke3RoaXMudG9rZW59YCxcbiAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL3ZuZC5naXRodWIranNvbicsXG4gICAgICAnWC1HaXRIdWItQXBpLVZlcnNpb24nOiAnMjAyMi0xMS0yOCcsXG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgIH07XG4gIH1cblxuICBhc3luYyBnZXRBdXRoZW50aWNhdGVkVXNlcigpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBkb1JlcXVlc3QoYCR7R0lUSFVCX0FQSX0vdXNlcmAsIHsgaGVhZGVyczogdGhpcy5oZWFkZXJzIH0pO1xuICAgIGlmICghcmVzcC5vaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIEdpdEh1YiB0b2tlbiBvciBtaXNzaW5nIHJlcG8gcGVybWlzc2lvbicpO1xuICAgIH1cbiAgICBjb25zdCBkYXRhID0gKGF3YWl0IHJlc3AuanNvbigpKSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgICByZXR1cm4gKGRhdGE/LmxvZ2luIGFzIHN0cmluZyk7XG4gIH1cblxuICAvKiogVGhlIHJlcG8ncyBkZWZhdWx0IGJyYW5jaCAoZS5nLiBgbWFpbmApLiAqL1xuICBhc3luYyBnZXREZWZhdWx0QnJhbmNoKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IGRvUmVxdWVzdChgJHtHSVRIVUJfQVBJfS9yZXBvcy8ke3RoaXMub3duZXJ9LyR7dGhpcy5yZXBvfWAsIHtcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICB9KTtcbiAgICBpZiAoIXJlc3Aub2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IHJlYWQgcmVwb3NpdG9yeSBpbmZvIGZyb20gR2l0SHViLiBDaGVjayB0aGUgdG9rZW4gYW5kIHJlcG8gbmFtZS4nKTtcbiAgICB9XG4gICAgY29uc3QgZGF0YSA9IChhd2FpdCByZXNwLmpzb24oKSkgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gICAgcmV0dXJuIChkYXRhPy5kZWZhdWx0X2JyYW5jaCBhcyBzdHJpbmcpIHx8ICdtYWluJztcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYW4gZW1wdHkgcHVibGljIHJlcG8sIGluaXRpYWxpc2VkIHdpdGggb25lIGNvbW1pdCBvbiB0aGUgZGVmYXVsdFxuICAgKiBicmFuY2ggKGBtYWluYCkuIE5vdGVGbGFyZSB0aGVuIGNvbW1pdHMgdGhlIHVzZXIncyBjb250ZW50IHBsdXMgYSBtZGdhcmRlblxuICAgKiBgcGFja2FnZS5qc29uYC9gbWRnYXJkZW4uY29uZmlnLmpzb25gIG9uIHRvcCBcdTIwMTQgdGhlcmUncyBubyB0ZW1wbGF0ZSBmb3JrLCBzb1xuICAgKiB0aGVyZSdzIG5vIHY0L3Y1IGJyYW5jaCBkcmlmdCB0byBtYW5hZ2UuIElkZW1wb3RlbnQ6IGEgNDIyIChhbHJlYWR5IGV4aXN0cylcbiAgICogaXMgdHJlYXRlZCBhcyBzdWNjZXNzIHNvIHNldHVwIGNhbiBiZSByZS1ydW4uXG4gICAqL1xuICBhc3luYyBjcmVhdGVSZXBvKHByaXZhdGVSZXBvID0gZmFsc2UpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCByZXNwID0gYXdhaXQgZG9SZXF1ZXN0KGAke0dJVEhVQl9BUEl9L3VzZXIvcmVwb3NgLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgbmFtZTogdGhpcy5yZXBvLFxuICAgICAgICBwcml2YXRlOiBwcml2YXRlUmVwbyxcbiAgICAgICAgYXV0b19pbml0OiB0cnVlLFxuICAgICAgICBkZXNjcmlwdGlvbjogcHJpdmF0ZVJlcG8gPyAnUHJpdmF0ZSB2YXVsdCBiYWNrdXAgbWFuYWdlZCBieSBOb3RlRmxhcmUnIDogJ1B1Ymxpc2hlZCB3aXRoIE5vdGVGbGFyZSAobWRnYXJkZW4pJyxcbiAgICAgIH0pLFxuICAgIH0pO1xuXG4gICAgaWYgKHJlc3Auc3RhdHVzID09PSA0MjIpIHtcbiAgICAgIC8vIDQyMiBhbG1vc3QgYWx3YXlzIG1lYW5zIHRoZSByZXBvIG5hbWUgaXMgYWxyZWFkeSB0YWtlbiBcdTIwMTQgZWl0aGVyIGJ5XG4gICAgICAvLyB0aGlzIHVzZXIgKGlkZW1wb3RlbnQgc3VjY2Vzcykgb3IgYnkgc29tZW9uZSBlbHNlIChtdXN0IHJlbmFtZSkuXG4gICAgICBjb25zdCBlcnJCb2R5ID0gKGF3YWl0IHJlc3AuanNvbigpLmNhdGNoKCgpID0+ICh7fSkpKSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgICAgIGNvbnN0IGdoTWVzc2FnZTogc3RyaW5nID0gKGVyckJvZHk/Lm1lc3NhZ2UgYXMgc3RyaW5nKSA/PyAnJztcbiAgICAgIGNvbnN0IGVycm9yczogQXJyYXk8eyBtZXNzYWdlPzogc3RyaW5nIH0+ID0gKGVyckJvZHk/LmVycm9ycyBhcyBBcnJheTx7IG1lc3NhZ2U/OiBzdHJpbmcgfT4pID8/IFtdO1xuICAgICAgY29uc3QgYWxyZWFkeUV4aXN0cyA9IGVycm9ycy5zb21lKChlKSA9PlxuICAgICAgICAoZS5tZXNzYWdlID8/ICcnKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdhbHJlYWR5IGV4aXN0JyksXG4gICAgICApIHx8IGdoTWVzc2FnZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdhbHJlYWR5IGV4aXN0Jyk7XG5cbiAgICAgIGlmIChhbHJlYWR5RXhpc3RzICYmIGF3YWl0IHRoaXMucmVwb0V4aXN0cygpKSB7XG4gICAgICAgIC8vIFRoZSByZXBvIGJlbG9uZ3MgdG8gdGhpcyBhY2NvdW50IFx1MjAxNCB0cmVhdCBhcyBzdWNjZXNzIChyZS1ydW4gb2Ygc2V0dXApLlxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBBIEdpdEh1YiByZXBvc2l0b3J5IG5hbWVkIFwiJHt0aGlzLnJlcG99XCIgYWxyZWFkeSBleGlzdHMuIGAgK1xuICAgICAgICAnUGxlYXNlIGNob29zZSBhIGRpZmZlcmVudCBzaXRlIG5hbWUgYW5kIHRyeSBhZ2Fpbi4nLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoIXJlc3Aub2spIHtcbiAgICAgIGNvbnN0IGVyciA9IChhd2FpdCByZXNwLmpzb24oKS5jYXRjaCgoKSA9PiAoe30pKSkgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBjcmVhdGUgR2l0SHViIHJlcG86ICR7KGVyciBhcyB7IG1lc3NhZ2U/OiBzdHJpbmcgfSkubWVzc2FnZSA/PyAnVW5rbm93biBlcnJvcid9YCk7XG4gICAgfVxuICB9XG5cblxuICAvKiogVGhpbiBKU09OIHdyYXBwZXIgYXJvdW5kIHRoZSBHaXRIdWIgUkVTVCBBUEk7IHRocm93cyB3aXRoIC5zdGF0dXMgb24gZXJyb3IuICovXG4gIHByaXZhdGUgYXN5bmMgZ2g8VD4ocGF0aDogc3RyaW5nLCBtZXRob2Q6IHN0cmluZywgYm9keT86IHVua25vd24pOiBQcm9taXNlPFQ+IHtcbiAgICBjb25zdCByZXNwID0gYXdhaXQgZG9SZXF1ZXN0KGAke0dJVEhVQl9BUEl9JHtwYXRofWAsIHtcbiAgICAgIG1ldGhvZCxcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgIGJvZHk6IGJvZHkgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IEpTT04uc3RyaW5naWZ5KGJvZHkpLFxuICAgIH0pO1xuICAgIGlmICghcmVzcC5vaykge1xuICAgICAgY29uc3QgZXJyQm9keSA9IChhd2FpdCByZXNwLmpzb24oKS5jYXRjaCgoKSA9PiAoe30pKSkgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gICAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoIChlcnJCb2R5Py5tZXNzYWdlIGFzIHN0cmluZykgPz8gYEdpdEh1YiByZXF1ZXN0IGZhaWxlZCAoJHtyZXNwLnN0YXR1c30pYCApIGFzIEVycm9yICYgeyBzdGF0dXM/OiBudW1iZXIgfTtcbiAgICAgIGVyci5zdGF0dXMgPSByZXNwLnN0YXR1cztcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgcmV0dXJuIChhd2FpdCByZXNwLmpzb24oKSkgYXMgVDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGxvYWQgZXZlcnkgZmlsZSBhcyBhIFNJTkdMRSBnaXQgY29tbWl0IHZpYSB0aGUgR2l0IERhdGEgQVBJXG4gICAqIChibG9icyBcdTIxOTIgdHJlZSBcdTIxOTIgY29tbWl0IFx1MjE5MiBtb3ZlIGJyYW5jaCByZWYpLCBpbnN0ZWFkIG9mIG9uZSBDb250ZW50cy1BUEkgUFVUXG4gICAqIHBlciBmaWxlLiBPbmUgY29tbWl0IG1lYW5zIENsb3VkZmxhcmUgcnVucyBleGFjdGx5IG9uZSBidWlsZCBwZXIgcHVibGlzaCxcbiAgICogYW5kIHRoZXJlIGFyZSBubyBwZXItZmlsZSBTSEEgY29uZmxpY3RzICh0aGUgbmV3IHRyZWUgaXMgbGF5ZXJlZCBvbiB0aGVcbiAgICogY3VycmVudCB0cmVlIHdpdGggYGJhc2VfdHJlZWApLCB3aGljaCBraWxscyB0aGUgNDA5LzQyMiBlcnJvcnMgZW50aXJlbHkuXG4gICAqL1xuICBhc3luYyBjb21taXRGaWxlcyhcbiAgICBmaWxlczogVXBsb2FkRmlsZVtdLFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICBvblByb2dyZXNzOiAoZG9uZTogbnVtYmVyLCB0b3RhbDogbnVtYmVyKSA9PiB2b2lkLFxuICAgIG9uUmF0ZUxpbWl0PzogKHNlY3NMZWZ0OiBudW1iZXIpID0+IHZvaWQsXG4gICAgbWlycm9yUHJlZml4ID0gJycsXG4gICAgb3B0aW9ucz86IHsgaXNQcml2YXRlPzogYm9vbGVhbiB9XG4gICk6IFByb21pc2U8UHVibGlzaFJlc3VsdCAmIHsgY29tbWl0U2hhPzogc3RyaW5nIH0+IHtcbiAgICBjb25zdCByZXN1bHQ6IFB1Ymxpc2hSZXN1bHQgJiB7IGNvbW1pdFNoYT86IHN0cmluZyB9ID0geyBzdWNjZXNzOiB0cnVlLCB1cGxvYWRlZDogMCwgZmFpbGVkOiAwLCBlcnJvcnM6IFtdLCBmaXhlZDogMCwgaXNzdWVzOiBbXSB9O1xuICAgIGlmIChmaWxlcy5sZW5ndGggPT09IDApIHJldHVybiByZXN1bHQ7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgZXhpc3RzID0gYXdhaXQgdGhpcy5yZXBvRXhpc3RzKCk7XG4gICAgICBpZiAoIWV4aXN0cykge1xuICAgICAgICBjb25zdCBpc1ByaXZhdGUgPSBvcHRpb25zPy5pc1ByaXZhdGUgfHwgZmFsc2U7XG4gICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlUmVwbyhpc1ByaXZhdGUpO1xuICAgICAgICBjb25zdCByZWFkeSA9IGF3YWl0IHRoaXMud2FpdEZvclJlcG8oMzAwMDApO1xuICAgICAgICBpZiAoIXJlYWR5KSB7XG4gICAgICAgICAgcmVzdWx0LnN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgICByZXN1bHQuZXJyb3JzLnB1c2goJ1RpbWVkIG91dCB3YWl0aW5nIGZvciByZXBvc2l0b3J5IGNyZWF0aW9uIG9uIEdpdEh1Yi4nKTtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmVzdWx0LnN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgIHJlc3VsdC5lcnJvcnMucHVzaChgRmFpbGVkIHRvIGNoZWNrIG9yIGNyZWF0ZSByZXBvc2l0b3J5OiAkeyhlIGFzIEVycm9yKS5tZXNzYWdlfWApO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuYnJhbmNoKSB7XG4gICAgICByZXN1bHQuc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgcmVzdWx0LmVycm9ycy5wdXNoKCdObyBicmFuY2ggc3BlY2lmaWVkLiBSdW4gc2V0dXAgdG8gZGV0ZWN0IHRoZSByZXBvc2l0b3J5IGRlZmF1bHQgYnJhbmNoLicpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgY29uc3QgYnJhbmNoID0gdGhpcy5icmFuY2g7XG4gICAgY29uc3QgcmVmUGF0aCA9IGAvcmVwb3MvJHt0aGlzLm93bmVyfS8ke3RoaXMucmVwb30vZ2l0L3JlZnMvaGVhZHMvJHtlbmNvZGVVUklDb21wb25lbnQoYnJhbmNoKX1gO1xuXG4gICAgLy8gMS4gQ3VycmVudCBicmFuY2ggdGlwICsgaXRzIGJhc2UgdHJlZS5cbiAgICBsZXQgaGVhZFNoYTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gICAgbGV0IGJhc2VUcmVlU2hhOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgICBsZXQgYnJhbmNoRXhpc3RzID0gdHJ1ZTtcblxuICAgIHRyeSB7XG4gICAgICBpZiAoIWhlYWRTaGEpIHtcbiAgICAgICAgY29uc3QgcmVmID0gYXdhaXQgdGhpcy5naDx7IG9iamVjdDogeyBzaGE6IHN0cmluZyB9IH0+KHJlZlBhdGgsICdHRVQnKTtcbiAgICAgICAgaGVhZFNoYSA9IHJlZi5vYmplY3Quc2hhO1xuICAgICAgfVxuICAgICAgY29uc3QgaGVhZENvbW1pdCA9IGF3YWl0IHRoaXMuZ2g8eyB0cmVlOiB7IHNoYTogc3RyaW5nIH0gfT4oXG4gICAgICAgIGAvcmVwb3MvJHt0aGlzLm93bmVyfS8ke3RoaXMucmVwb30vZ2l0L2NvbW1pdHMvJHtoZWFkU2hhfWAsXG4gICAgICAgICdHRVQnLFxuICAgICAgKTtcbiAgICAgIGJhc2VUcmVlU2hhID0gaGVhZENvbW1pdC50cmVlLnNoYTtcbiAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgIGlmICgoZXJyIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KS5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICAvLyBCcmFuY2ggZG9lc24ndCBleGlzdCBcdTIwMTQgZmlyc3QgY29tbWl0IHNjZW5hcmlvLlxuICAgICAgICBicmFuY2hFeGlzdHMgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdC5zdWNjZXNzID0gZmFsc2U7XG4gICAgICAgIHJlc3VsdC5lcnJvcnMucHVzaChgQ291bGQgbm90IHJlYWQgYnJhbmNoIFwiJHticmFuY2h9XCI6ICR7KGVyciBhcyBFcnJvcikubWVzc2FnZX1gKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyAyLiBDcmVhdGUgYSBibG9iIHBlciBmaWxlIChiYXRjaGVkLCB3aXRoIHJhdGUtbGltaXQgYmFja29mZikuXG4gICAgY29uc3QgdHJlZUl0ZW1zOiBBcnJheTx7IHBhdGg6IHN0cmluZzsgbW9kZTogJzEwMDY0NCc7IHR5cGU6ICdibG9iJzsgc2hhOiBzdHJpbmcgfCBudWxsIH0+ID0gW107XG4gICAgbGV0IGRvbmUgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpICs9IEJBVENIX1NJWkUpIHtcbiAgICAgIGNvbnN0IGJhdGNoID0gZmlsZXMuc2xpY2UoaSwgaSArIEJBVENIX1NJWkUpO1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIGJhdGNoLm1hcChhc3luYyAoZmlsZSkgPT4ge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoZmlsZS5jb250ZW50ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgIHRyZWVJdGVtcy5wdXNoKHsgcGF0aDogZmlsZS5wYXRoLCBtb2RlOiAnMTAwNjQ0JywgdHlwZTogJ2Jsb2InLCBzaGE6IG51bGwgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zdCBzaGEgPSBhd2FpdCB0aGlzLmNyZWF0ZUJsb2JXaXRoUmV0cnkoZmlsZS5jb250ZW50LCBvblJhdGVMaW1pdCk7XG4gICAgICAgICAgICAgIHRyZWVJdGVtcy5wdXNoKHsgcGF0aDogZmlsZS5wYXRoLCBtb2RlOiAnMTAwNjQ0JywgdHlwZTogJ2Jsb2InLCBzaGEgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQudXBsb2FkZWQrKztcbiAgICAgICAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgICAgICAgIHJlc3VsdC5mYWlsZWQrKztcbiAgICAgICAgICAgIHJlc3VsdC5lcnJvcnMucHVzaChgJHtmaWxlLnBhdGh9OiAkeyhlcnIgYXMgRXJyb3IpLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRvbmUrKztcbiAgICAgICAgICBvblByb2dyZXNzKGRvbmUsIGZpbGVzLmxlbmd0aCk7XG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICAgIGlmIChpICsgQkFUQ0hfU0laRSA8IGZpbGVzLmxlbmd0aCkge1xuICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZShyID0+IHdpbmRvdy5zZXRUaW1lb3V0KHIsIDEwMCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZXN1bHQudXBsb2FkZWQgPT09IDApIHtcbiAgICAgIHJlc3VsdC5zdWNjZXNzID0gZmFsc2U7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8vIE5ldmVyIHJlbW92ZSByZW1vdGUgYmFja3VwIGZpbGVzIHdoZW4gYW5vdGhlciB1cGxvYWQgaW4gdGhlIHNhbWUgYmF0Y2hcbiAgICAvLyBmYWlsZWQuIEEgbGF0ZXIgc3VjY2Vzc2Z1bCBydW4gY2FuIHNhZmVseSBhcHBseSB0aG9zZSBkZWxldGlvbnMuXG4gICAgaWYgKHJlc3VsdC5mYWlsZWQgPiAwKSB7XG4gICAgICBmb3IgKGxldCBpbmRleCA9IHRyZWVJdGVtcy5sZW5ndGggLSAxOyBpbmRleCA+PSAwOyBpbmRleC0tKSB7XG4gICAgICAgIGlmICh0cmVlSXRlbXNbaW5kZXhdLnNoYSA9PT0gbnVsbCkgdHJlZUl0ZW1zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgICBpZiAodHJlZUl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXN1bHQuc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIDJiLiBNaXJyb3I6IHdoZW4gZXZlcnkgZmlsZSB1cGxvYWRlZCBjbGVhbmx5LCBkZWxldGUgYW55IGV4aXN0aW5nIGJsb2JzXG4gICAgLy8gdW5kZXIgYG1pcnJvclByZWZpeGAgdGhhdCBhcmVuJ3QgaW4gdGhpcyBwdWJsaXNoIFx1MjAxNCB0aGlzIHN0cmlwcyBhbnkgcHJldmlvdXNcbiAgICAvLyB0ZW1wbGF0ZSdzIGRlbW8gcGFnZXMgYW5kIGFueSBub3RlcyByZW1vdmVkL2V4Y2x1ZGVkIGZyb20gdGhlIHZhdWx0LCBzb1xuICAgIC8vIHRoZSBsaXZlIHNpdGUgbWF0Y2hlcyB0aGUgdmF1bHQgZXhhY3RseS4gU2tpcHBlZCBvbiBwYXJ0aWFsIGZhaWx1cmUgKHNvIGFcbiAgICAvLyBoaWNjdXAgbmV2ZXIgd2lwZXMgY29udGVudCkgYW5kIGJlc3QtZWZmb3J0IChza2lwIGlmIHRoZSB0cmVlIGNhbid0IGxpc3QpLlxuICAgIGlmIChtaXJyb3JQcmVmaXggJiYgcmVzdWx0LmZhaWxlZCA9PT0gMCAmJiBiYXNlVHJlZVNoYSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZnVsbCA9IGF3YWl0IHRoaXMuZ2g8eyB0cmVlOiBBcnJheTx7IHBhdGg6IHN0cmluZzsgdHlwZTogc3RyaW5nIH0+IH0+KFxuICAgICAgICAgIGAvcmVwb3MvJHt0aGlzLm93bmVyfS8ke3RoaXMucmVwb30vZ2l0L3RyZWVzLyR7YmFzZVRyZWVTaGF9P3JlY3Vyc2l2ZT0xYCxcbiAgICAgICAgICAnR0VUJyxcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3Qga2VlcCA9IG5ldyBTZXQoZmlsZXMubWFwKGYgPT4gZi5wYXRoKSk7XG4gICAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgZnVsbC50cmVlKSB7XG4gICAgICAgICAgaWYgKGVudHJ5LnR5cGUgPT09ICdibG9iJyAmJiBlbnRyeS5wYXRoLnN0YXJ0c1dpdGgobWlycm9yUHJlZml4KSAmJiAha2VlcC5oYXMoZW50cnkucGF0aCkpIHtcbiAgICAgICAgICAgIHRyZWVJdGVtcy5wdXNoKHsgcGF0aDogZW50cnkucGF0aCwgbW9kZTogJzEwMDY0NCcsIHR5cGU6ICdibG9iJywgc2hhOiBudWxsIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIC8vIENvdWxkbid0IHJlYWQgdGhlIGV4aXN0aW5nIHRyZWUgXHUyMDE0IGtlZXAgZ29pbmcgd2l0aCBhZGRzL3VwZGF0ZXMgb25seS5cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyAzLiBUcmVlIFx1MjE5MiBjb21taXQgXHUyMTkyIGZhc3QtZm9yd2FyZCB0aGUgYnJhbmNoIHJlZi5cbiAgICB0cnkge1xuICAgICAgY29uc3QgdHJlZSA9IGF3YWl0IHRoaXMuZ2g8eyBzaGE6IHN0cmluZyB9PihcbiAgICAgICAgYC9yZXBvcy8ke3RoaXMub3duZXJ9LyR7dGhpcy5yZXBvfS9naXQvdHJlZXNgLFxuICAgICAgICAnUE9TVCcsXG4gICAgICAgIGJhc2VUcmVlU2hhID8geyBiYXNlX3RyZWU6IGJhc2VUcmVlU2hhLCB0cmVlOiB0cmVlSXRlbXMgfSA6IHsgdHJlZTogdHJlZUl0ZW1zIH0sXG4gICAgICApO1xuICAgICAgY29uc3QgY29tbWl0ID0gYXdhaXQgdGhpcy5naDx7IHNoYTogc3RyaW5nIH0+KFxuICAgICAgICBgL3JlcG9zLyR7dGhpcy5vd25lcn0vJHt0aGlzLnJlcG99L2dpdC9jb21taXRzYCxcbiAgICAgICAgJ1BPU1QnLFxuICAgICAgICBoZWFkU2hhID8geyBtZXNzYWdlLCB0cmVlOiB0cmVlLnNoYSwgcGFyZW50czogW2hlYWRTaGFdIH0gOiB7IG1lc3NhZ2UsIHRyZWU6IHRyZWUuc2hhLCBwYXJlbnRzOiBbXSB9LFxuICAgICAgKTtcbiAgICAgIHJlc3VsdC5jb21taXRTaGEgPSBjb21taXQuc2hhO1xuXG4gICAgICBpZiAoYnJhbmNoRXhpc3RzKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuZ2gocmVmUGF0aCwgJ1BBVENIJywgeyBzaGE6IGNvbW1pdC5zaGEsIGZvcmNlOiBmYWxzZSB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0IHRoaXMuZ2goYC9yZXBvcy8ke3RoaXMub3duZXJ9LyR7dGhpcy5yZXBvfS9naXQvcmVmc2AsICdQT1NUJywge1xuICAgICAgICAgIHJlZjogYHJlZnMvaGVhZHMvJHticmFuY2h9YCxcbiAgICAgICAgICBzaGE6IGNvbW1pdC5zaGEsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycjogdW5rbm93bikge1xuICAgICAgcmVzdWx0LnN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgIHJlc3VsdC5lcnJvcnMucHVzaChgQ29tbWl0IGZhaWxlZDogJHsoZXJyIGFzIEVycm9yKS5tZXNzYWdlfWApO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBpZiAocmVzdWx0LmZhaWxlZCA+IDApIHJlc3VsdC5zdWNjZXNzID0gZmFsc2U7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgY3JlYXRlQmxvYldpdGhSZXRyeShcbiAgICBiYXNlNjRDb250ZW50OiBzdHJpbmcsXG4gICAgb25SYXRlTGltaXQ/OiAoc2Vjc0xlZnQ6IG51bWJlcikgPT4gdm9pZCxcbiAgKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBsZXQgbGFzdEVycjogRXJyb3IgfCBudWxsID0gbnVsbDtcbiAgICBmb3IgKGxldCBhdHRlbXB0ID0gMDsgYXR0ZW1wdCA8IDM7IGF0dGVtcHQrKykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgYmxvYiA9IGF3YWl0IHRoaXMuZ2g8eyBzaGE6IHN0cmluZyB9PihcbiAgICAgICAgICBgL3JlcG9zLyR7dGhpcy5vd25lcn0vJHt0aGlzLnJlcG99L2dpdC9ibG9ic2AsXG4gICAgICAgICAgJ1BPU1QnLFxuICAgICAgICAgIHsgY29udGVudDogYmFzZTY0Q29udGVudCwgZW5jb2Rpbmc6ICdiYXNlNjQnIH0sXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBibG9iLnNoYTtcbiAgICAgIH0gY2F0Y2ggKGVycjogdW5rbm93bikge1xuICAgICAgICBsYXN0RXJyID0gZXJyIGFzIEVycm9yO1xuICAgICAgICBjb25zdCBzdGF0dXMgPSAobGFzdEVyciBhcyBFcnJvciAmIHsgc3RhdHVzPzogbnVtYmVyIH0pLnN0YXR1cztcbiAgICAgICAgY29uc3QgbXNnID0gbGFzdEVyci5tZXNzYWdlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCByYXRlTGltaXRlZCA9XG4gICAgICAgICAgc3RhdHVzID09PSA0MjkgfHxcbiAgICAgICAgICAoc3RhdHVzID09PSA0MDMgJiYgKG1zZy5pbmNsdWRlcygncmF0ZSBsaW1pdCcpIHx8IG1zZy5pbmNsdWRlcygnYWJ1c2UnKSB8fCBtc2cuaW5jbHVkZXMoJ3NlY29uZGFyeScpKSk7XG4gICAgICAgICAgXG4gICAgICAgIGlmIChzdGF0dXMgPT09IDQwNCB8fCBzdGF0dXMgPT09IDQwMSB8fCAoc3RhdHVzID09PSA0MDMgJiYgIXJhdGVMaW1pdGVkKSkge1xuICAgICAgICAgIHRocm93IGxhc3RFcnI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmF0ZUxpbWl0ZWQpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLndhaXRXaXRoQ291bnRkb3duKFJBVEVfTElNSVRfV0FJVF9NUywgb25SYXRlTGltaXQpO1xuICAgICAgICB9IGVsc2UgaWYgKGF0dGVtcHQgPCAyKSB7XG4gICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UociA9PiB3aW5kb3cuc2V0VGltZW91dChyLCAxMDAwICogTWF0aC5wb3coMiwgYXR0ZW1wdCkpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBsYXN0RXJyID8/IG5ldyBFcnJvcignQmxvYiBjcmVhdGlvbiBmYWlsZWQnKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgd2FpdFdpdGhDb3VudGRvd24obXM6IG51bWJlciwgb25UaWNrPzogKHNlY3NMZWZ0OiBudW1iZXIpID0+IHZvaWQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIW9uVGljaykge1xuICAgICAgYXdhaXQgbmV3IFByb21pc2UociA9PiB3aW5kb3cuc2V0VGltZW91dChyLCBtcykpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgc2Vjc0xlZnQgPSBNYXRoLmNlaWwobXMgLyAxMDAwKTtcbiAgICBjb25zdCBpbnRlcnZhbCA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBzZWNzTGVmdC0tO1xuICAgICAgaWYgKHNlY3NMZWZ0ID49IDApIG9uVGljayhzZWNzTGVmdCk7XG4gICAgfSwgMTAwMCk7XG4gICAgYXdhaXQgbmV3IFByb21pc2UociA9PiB3aW5kb3cuc2V0VGltZW91dChyLCBtcykpO1xuICAgIHdpbmRvdy5jbGVhckludGVydmFsKGludGVydmFsKTtcbiAgfVxuXG4gIGFzeW5jIHJlcG9FeGlzdHMoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IGRvUmVxdWVzdChcbiAgICAgIGAke0dJVEhVQl9BUEl9L3JlcG9zLyR7dGhpcy5vd25lcn0vJHt0aGlzLnJlcG99YCxcbiAgICAgIHsgaGVhZGVyczogdGhpcy5oZWFkZXJzIH0sXG4gICAgKTtcbiAgICByZXR1cm4gcmVzcC5vaztcbiAgfVxuXG4gIGFzeW5jIGlzUmVwb1ByaXZhdGUoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IGRvUmVxdWVzdChcbiAgICAgIGAke0dJVEhVQl9BUEl9L3JlcG9zLyR7dGhpcy5vd25lcn0vJHt0aGlzLnJlcG99YCxcbiAgICAgIHsgaGVhZGVyczogdGhpcy5oZWFkZXJzIH0sXG4gICAgKTtcbiAgICBpZiAoIXJlc3Aub2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IHZlcmlmeSBiYWNrdXAgc3RvcmFnZSBwcml2YWN5LicpO1xuICAgIH1cbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcC5qc29uKCkgYXMgeyBwcml2YXRlPzogYm9vbGVhbiB9O1xuICAgIHJldHVybiBkYXRhLnByaXZhdGUgPT09IHRydWU7XG4gIH1cblxuICBhc3luYyB3YWl0Rm9yUmVwbyhtYXhXYWl0TXMgPSAzMDAwMCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IHN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgICB3aGlsZSAoRGF0ZS5ub3coKSAtIHN0YXJ0IDwgbWF4V2FpdE1zKSB7XG4gICAgICBpZiAoYXdhaXQgdGhpcy5yZXBvRXhpc3RzKCkpIHJldHVybiB0cnVlO1xuICAgICAgYXdhaXQgbmV3IFByb21pc2UociA9PiB3aW5kb3cuc2V0VGltZW91dChyLCAyMDAwKSk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaCB0aGUgZmxhdCBmaWxlIHRyZWUgZm9yIHRoZSByZXBvc2l0b3J5J3MgaW50ZXJuYWwgc3RvcmFnZSByZWZlcmVuY2UuXG4gICAqIFJldHVybnMgYW4gYXJyYXkgb2YgeyBwYXRoLCBzaGEsIHR5cGUgfSBvYmplY3RzIGZvciBhbGwgYmxvYnMgKGZpbGVzKS5cbiAgICogVXNlZCBieSBCYWNrdXBFbmdpbmUgdG8gYXZvaWQgcmUtdXBsb2FkaW5nIHVuY2hhbmdlZCBmaWxlcy5cbiAgICovXG4gIGFzeW5jIGxpc3RUcmVlKGJyYW5jaD86IHN0cmluZyk6IFByb21pc2U8QXJyYXk8eyBwYXRoOiBzdHJpbmc7IHNoYTogc3RyaW5nOyB0eXBlOiBzdHJpbmcgfT4+IHtcbiAgICBjb25zdCByZWYgPSBicmFuY2ggfHwgdGhpcy5icmFuY2ggfHwgJ21haW4nO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLmdoPHsgdHJlZTogQXJyYXk8eyBwYXRoOiBzdHJpbmc7IHNoYTogc3RyaW5nOyB0eXBlOiBzdHJpbmcgfT4gfT4oXG4gICAgICBgL3JlcG9zLyR7dGhpcy5vd25lcn0vJHt0aGlzLnJlcG99L2dpdC90cmVlcy8ke2VuY29kZVVSSUNvbXBvbmVudChyZWYpfT9yZWN1cnNpdmU9MWAsXG4gICAgICAnR0VUJyxcbiAgICApO1xuICAgIHJldHVybiAoZGF0YS50cmVlID8/IFtdKS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0udHlwZSA9PT0gJ2Jsb2InKTtcbiAgfVxuXG59XG4iLCAiaW1wb3J0IHsgcmVxdWVzdFVybCB9IGZyb20gJ29ic2lkaWFuJztcblxuY29uc3QgQ0ZfQVBJID0gJ2h0dHBzOi8vYXBpLmNsb3VkZmxhcmUuY29tL2NsaWVudC92NCc7XG5cbi8vIEluc3RhbGwgZGVwcyBmaXJzdCwgdGhlbiBidWlsZCB3aXRoIG1kZ2FyZGVuLiBBIGJhcmUgYG5weCBtZGdhcmRlbiBidWlsZGBcbi8vIG1pZ2h0IHdvcmsgaWYgY2FjaGluZyBpcyBwZXJmZWN0LCBidXQgdGhpcyBndWFyYW50ZWVzIHRoZSB2ZXJzaW9uIHBpbm5lZCBpblxuLy8gcGFja2FnZS5qc29uIGlzIGluc3RhbGxlZCBiZWZvcmUgZXhlY3V0aW9uLlxuLy8gYG5wbSBjaSB8fCBucG0gaW5zdGFsbGAgYWN0cyBhcyBhIGZhbGxiYWNrIGZvciBtaXNzaW5nIGxvY2tmaWxlcy5cbi8vIFdpdGhvdXQgdGhpcywgbnB4IHdvdWxkIGludGVyYWN0aXZlbHkgcHJvbXB0IFwiTmVlZCB0byBpbnN0YWxsLi4uIE9rIHRvIHByb2NlZWQ/ICh5KVwiXG5jb25zdCBNREdBUkRFTl9CVUlMRF9DT01NQU5EID0gJ25wbSBjaSB8fCBucG0gaW5zdGFsbCAmJiBucHggbWRnYXJkZW4gYnVpbGQnO1xuXG5pbnRlcmZhY2UgQ2xvdWRmbGFyZUFwaUVycm9yIHtcbiAgZXJyb3JzPzogQXJyYXk8eyBtZXNzYWdlPzogc3RyaW5nIH0+O1xuICByZXN1bHQ/OiB1bmtub3duO1xufVxuXG5leHBvcnQgY2xhc3MgQ2xvdWRmbGFyZUFwaSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdG9rZW46IHN0cmluZyxcbiAgICBwcml2YXRlIGFjY291bnRJZDogc3RyaW5nLFxuICApIHt9XG5cbiAgcHJpdmF0ZSBnZXQgaGVhZGVycygpOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+IHtcbiAgICByZXR1cm4ge1xuICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3RoaXMudG9rZW59YCxcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgcmVxdWVzdDxUPihcbiAgICBwYXRoOiBzdHJpbmcsXG4gICAgbWV0aG9kID0gJ0dFVCcsXG4gICAgYm9keT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+LFxuICApOiBQcm9taXNlPFQ+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcCA9IGF3YWl0IHJlcXVlc3RVcmwoe1xuICAgICAgICB1cmw6IGAke0NGX0FQSX0ke3BhdGh9YCxcbiAgICAgICAgbWV0aG9kLFxuICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgIGJvZHk6IGJvZHkgPyBKU09OLnN0cmluZ2lmeShib2R5KSA6IHVuZGVmaW5lZCxcbiAgICAgICAgdGhyb3c6IGZhbHNlLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGRhdGEgPSAocmVzcC5qc29uID8/IHt9KSBhcyBDbG91ZGZsYXJlQXBpRXJyb3I7XG4gICAgICBpZiAocmVzcC5zdGF0dXMgPj0gNDAwKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBkYXRhLmVycm9ycz8uWzBdPy5tZXNzYWdlID8/IHRoaXMubWVzc2FnZUZvclN0YXR1cyhyZXNwLnN0YXR1cyk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRhdGEgYXMgVDtcbiAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnIgaW5zdGFuY2VvZiBFcnJvciA/IGVyci5tZXNzYWdlIDogJyc7XG4gICAgICBpZiAobWVzc2FnZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdmYWlsZWQgdG8gZmV0Y2gnKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ0NvdWxkIG5vdCByZWFjaCBDbG91ZGZsYXJlLiBDaGVjayB5b3VyIGludGVybmV0IGNvbm5lY3Rpb24sIGZpcmV3YWxsLCBvciBwcm94eSwgdGhlbiB0cnkgYWdhaW4uJyxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1lc3NhZ2VGb3JTdGF0dXMoc3RhdHVzOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGlmIChzdGF0dXMgPT09IDQwMSB8fCBzdGF0dXMgPT09IDQwMykge1xuICAgICAgcmV0dXJuICdDbG91ZGZsYXJlIHJlamVjdGVkIHRoaXMgdG9rZW4uIENyZWF0ZSBhbiBBY2NvdW50IEFQSSBUb2tlbiB3aXRoIENsb3VkZmxhcmUgUGFnZXM6IEVkaXQgKGFuZCBXb3JrZXJzIFNjcmlwdHM6IEVkaXQpIHBlcm1pc3Npb25zLic7XG4gICAgfVxuICAgIGlmIChzdGF0dXMgPT09IDQwNCkge1xuICAgICAgcmV0dXJuICdDbG91ZGZsYXJlIGFjY291bnQgb3IgUGFnZXMgcHJvamVjdCBub3QgZm91bmQuIERvdWJsZS1jaGVjayB0aGUgQWNjb3VudCBJRCBhbmQgcHJvamVjdCBuYW1lLic7XG4gICAgfVxuICAgIGlmIChzdGF0dXMgPj0gNTAwKSB7XG4gICAgICByZXR1cm4gJ0Nsb3VkZmxhcmUgaXMgdGVtcG9yYXJpbHkgdW5hdmFpbGFibGUuIFBsZWFzZSB0cnkgYWdhaW4gaW4gYSBtb21lbnQuJztcbiAgICB9XG4gICAgcmV0dXJuICdDbG91ZGZsYXJlIHJlcXVlc3QgZmFpbGVkLic7XG4gIH1cblxuICAvKipcbiAgICogTGlzdHMgdGhlIGFjY291bnRzIHRoaXMgdG9rZW4gY2FuIHJlYWNoIGFuZCByZXR1cm5zIHRoZSBmaXJzdCBpZC5cbiAgICogTGV0cyB0aGUgd2l6YXJkIGF1dG8tZGV0ZWN0IHRoZSBBY2NvdW50IElEIHNvIHRoZSB1c2VyIG5ldmVyIGhhcyB0byBjb3B5XG4gICAqIHRoZSAzMi1jaGFyYWN0ZXIgdmFsdWUgb3V0IG9mIHRoZSBkYXNoYm9hcmQgYnkgaGFuZC4gUmVxdWlyZXMgdGhlIHRva2VuIHRvXG4gICAqIGluY2x1ZGUgQWNjb3VudCBTZXR0aW5nczogUmVhZCAoYnVuZGxlZCBpbnRvIG91ciB0b2tlbiB0ZW1wbGF0ZSBsaW5rKS5cbiAgICovXG4gIGFzeW5jIGdldEFjY291bnRJZCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLnJlcXVlc3Q8eyByZXN1bHQ/OiBBcnJheTx7IGlkPzogc3RyaW5nIH0+IH0+KCcvYWNjb3VudHMnKTtcbiAgICBjb25zdCBhY2NvdW50cyA9IGRhdGEucmVzdWx0ID8/IFtdO1xuICAgIGNvbnN0IGlkID0gYWNjb3VudHNbMF0/LmlkO1xuICAgIGlmICghaWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0NvdWxkIG5vdCByZWFkIGFueSBDbG91ZGZsYXJlIGFjY291bnQgZnJvbSB0aGlzIHRva2VuLiBBZGQgdGhlIFwiQWNjb3VudCBTZXR0aW5nczogUmVhZFwiIHBlcm1pc3Npb24sIG9yIHBhc3RlIHlvdXIgQWNjb3VudCBJRCBtYW51YWxseS4nLFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGlkO1xuICB9XG5cbiAgYXN5bmMgY3JlYXRlUHJvamVjdChcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgZ2l0aHViT3duZXI6IHN0cmluZyxcbiAgICByZXBvOiBzdHJpbmcsXG4gICAgYnJhbmNoOiBzdHJpbmcsXG4gICAgcm9vdERpcjogc3RyaW5nID0gJycsXG4gICk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMucmVxdWVzdDxDbG91ZGZsYXJlQXBpRXJyb3I+KFxuICAgICAgYC9hY2NvdW50cy8ke3RoaXMuYWNjb3VudElkfS9wYWdlcy9wcm9qZWN0c2AsXG4gICAgICAnUE9TVCcsXG4gICAgICB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIHNvdXJjZToge1xuICAgICAgICAgIHR5cGU6ICdnaXRodWInLFxuICAgICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgb3duZXI6IGdpdGh1Yk93bmVyLFxuICAgICAgICAgICAgcmVwb19uYW1lOiByZXBvLFxuICAgICAgICAgICAgLy8gVGhlIHJlcG8ncyBkZWZhdWx0IGJyYW5jaCAobWFpbikuIEJ1aWxkaW5nIGEgbm9uLWV4aXN0ZW50IGJyYW5jaFxuICAgICAgICAgICAgLy8geWllbGRzIGEgYmxhbmsgc2l0ZSAvIDUyMi5cbiAgICAgICAgICAgIHByb2R1Y3Rpb25fYnJhbmNoOiBicmFuY2gsXG4gICAgICAgICAgICBkZXBsb3ltZW50c19lbmFibGVkOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGJ1aWxkX2NvbmZpZzoge1xuICAgICAgICAgIGJ1aWxkX2NvbW1hbmQ6IE1ER0FSREVOX0JVSUxEX0NPTU1BTkQsXG4gICAgICAgICAgZGVzdGluYXRpb25fZGlyOiAncHVibGljJyxcbiAgICAgICAgICByb290X2Rpcjogcm9vdERpcixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgKTtcbiAgICBjb25zdCByZXN1bHQgPSAoZGF0YS5yZXN1bHQgPz8ge30pIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuICAgIGNvbnN0IHJhd1N1YmRvbWFpbiA9IChyZXN1bHQuc3ViZG9tYWluIGFzIHN0cmluZyB8IHVuZGVmaW5lZCkgPz8gbmFtZTtcbiAgICBjb25zdCBzdWJkb21haW4gPSByYXdTdWJkb21haW4ucmVwbGFjZSgvXFwucGFnZXNcXC5kZXYkLywgJycpO1xuICAgIHJldHVybiBgJHtzdWJkb21haW59LnBhZ2VzLmRldmA7XG4gIH1cblxuICAvKipcbiAgICogUmVwYWlyIHRoZSBidWlsZCBzZXR0aW5ncyBvbiBhbiBFWElTVElORyBwcm9qZWN0IHNvIGEgcmUtcHVibGlzaCBzZWxmLWhlYWxzXG4gICAqIGEgcHJvamVjdCB0aGF0IHdhcyBjcmVhdGVkIHdpdGggYSBiYWQgYnVpbGQgY29tbWFuZCBvciB3cm9uZyBicmFuY2ggXHUyMDE0IHRoZVxuICAgKiB1c2VyIG5ldmVyIGhhcyB0byBlZGl0IHRoZSBDbG91ZGZsYXJlIGRhc2hib2FyZC4gQ2FsbGVkIGV2ZXJ5IHB1Ymxpc2guXG4gICAqIC0gYnVpbGRfY29tbWFuZCBtdXN0IGluc3RhbGwgZGVwcyBiZWZvcmUgYG5weCBtZGdhcmRlbiBidWlsZGAgKHNlZSBhYm92ZSkuXG4gICAqIC0gcHJvZHVjdGlvbl9icmFuY2ggbXVzdCBiZSB0aGUgcmVwbydzIHJlYWwgZGVmYXVsdCBicmFuY2ggKG1haW4pIG9yXG4gICAqICAgQ2xvdWRmbGFyZSBidWlsZHMgYSBub24tZXhpc3RlbnQgYnJhbmNoIFx1MjE5MiBibGFuayBzaXRlIC8gNTIyLlxuICAgKi9cbiAgYXN5bmMgY29uZmlndXJlQnVpbGQoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIGdpdGh1Yk93bmVyOiBzdHJpbmcsXG4gICAgcmVwbzogc3RyaW5nLFxuICAgIGJyYW5jaDogc3RyaW5nLFxuICAgIHJvb3REaXI6IHN0cmluZyA9ICcnLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLnJlcXVlc3QoXG4gICAgICBgL2FjY291bnRzLyR7dGhpcy5hY2NvdW50SWR9L3BhZ2VzL3Byb2plY3RzLyR7bmFtZX1gLFxuICAgICAgJ1BBVENIJyxcbiAgICAgIHtcbiAgICAgICAgYnVpbGRfY29uZmlnOiB7XG4gICAgICAgICAgYnVpbGRfY29tbWFuZDogTURHQVJERU5fQlVJTERfQ09NTUFORCxcbiAgICAgICAgICBkZXN0aW5hdGlvbl9kaXI6ICdwdWJsaWMnLFxuICAgICAgICAgIHJvb3RfZGlyOiByb290RGlyLFxuICAgICAgICB9LFxuICAgICAgICBzb3VyY2U6IHtcbiAgICAgICAgICB0eXBlOiAnZ2l0aHViJyxcbiAgICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIG93bmVyOiBnaXRodWJPd25lcixcbiAgICAgICAgICAgIHJlcG9fbmFtZTogcmVwbyxcbiAgICAgICAgICAgIHByb2R1Y3Rpb25fYnJhbmNoOiBicmFuY2gsXG4gICAgICAgICAgICBkZXBsb3ltZW50c19lbmFibGVkOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogRm9yY2VzIGEgZnJlc2ggcHJvZHVjdGlvbiBidWlsZC4gQ29udGVudCBjb21taXRzIG5vcm1hbGx5IHRyaWdnZXIgYSBidWlsZFxuICAgKiB2aWEgdGhlIGdpdCB3ZWJob29rLCBidXQgZmlyaW5nIHRoaXMgZXhwbGljaXRseSBndWFyYW50ZWVzIHRoZSBsYXRlc3Qgbm90ZXNcbiAgICogYWN0dWFsbHkgZ2V0IGRlcGxveWVkLiBCZXN0LWVmZm9ydCBcdTIwMTQgdGhlIGNhbGxlciB0cmVhdHMgZmFpbHVyZSBhcyBub24tZmF0YWwuXG4gICAqL1xuICBhc3luYyB0cmlnZ2VyRGVwbG95bWVudChuYW1lOiBzdHJpbmcsIGJyYW5jaDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5yZXF1ZXN0KFxuICAgICAgYC9hY2NvdW50cy8ke3RoaXMuYWNjb3VudElkfS9wYWdlcy9wcm9qZWN0cy8ke25hbWV9L2RlcGxveW1lbnRzYCxcbiAgICAgICdQT1NUJyxcbiAgICAgIGJyYW5jaCA/IHsgYnJhbmNoIH0gOiB1bmRlZmluZWQsXG4gICAgKTtcbiAgfVxuXG4gIGFzeW5jIGdldFByb2plY3QobmFtZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5yZXF1ZXN0PENsb3VkZmxhcmVBcGlFcnJvcj4oXG4gICAgICBgL2FjY291bnRzLyR7dGhpcy5hY2NvdW50SWR9L3BhZ2VzL3Byb2plY3RzLyR7bmFtZX1gLFxuICAgICk7XG4gICAgY29uc3QgcmVzdWx0ID0gZGF0YS5yZXN1bHQgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gICAgY29uc3QgcmF3U3ViZG9tYWluID0gKHJlc3VsdD8uc3ViZG9tYWluIGFzIHN0cmluZyB8IHVuZGVmaW5lZCkgPz8gbmFtZTtcbiAgICBjb25zdCBzdWJkb21haW4gPSByYXdTdWJkb21haW4ucmVwbGFjZSgvXFwucGFnZXNcXC5kZXYkLywgJycpO1xuICAgIHJldHVybiBgJHtzdWJkb21haW59LnBhZ2VzLmRldmA7XG4gIH1cblxuICBhc3luYyBlbmFibGVEZXBsb3ltZW50KG5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMucmVxdWVzdChcbiAgICAgIGAvYWNjb3VudHMvJHt0aGlzLmFjY291bnRJZH0vcGFnZXMvcHJvamVjdHMvJHtuYW1lfWAsXG4gICAgICAnUEFUQ0gnLFxuICAgICAge1xuICAgICAgICBkZXBsb3ltZW50X2NvbmZpZ3M6IHsgcHJvZHVjdGlvbjogeyBkZXBsb3ltZW50X2VuYWJsZWQ6IHRydWUgfSB9LFxuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgYXN5bmMgZGVsZXRlUHJvamVjdChuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLnJlcXVlc3QoXG4gICAgICBgL2FjY291bnRzLyR7dGhpcy5hY2NvdW50SWR9L3BhZ2VzL3Byb2plY3RzLyR7bmFtZX1gLFxuICAgICAgJ0RFTEVURScsXG4gICAgKTtcbiAgfVxufVxuIiwgImltcG9ydCB7IEFwcCwgVEZpbGUsIFRGb2xkZXIgfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgeyBpc01hdGNoIH0gZnJvbSAnbWljcm9tYXRjaCc7XG5pbXBvcnQgeyBTaXRlUHJvZmlsZSB9IGZyb20gJy4uL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgQVRUQUNITUVOVF9FWFRTIH0gZnJvbSAnLi4vY29yZS9jb25zdGFudHMnO1xuXG5leHBvcnQgY2xhc3MgRmlsZUNvbGxlY3RvciB7XG4gIHByaXZhdGUgcmVhZG9ubHkgcHVibGlzaFNjb3BlOiAndmF1bHQnIHwgJ3NlbGVjdGVkJztcbiAgcHJpdmF0ZSByZWFkb25seSBwdWJsaXNoUGF0aHM6IHN0cmluZ1tdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYXBwOiBBcHAsXG4gICAgcHJpdmF0ZSBzaXRlOiBTaXRlUHJvZmlsZSxcbiAgKSB7XG4gICAgdGhpcy5wdWJsaXNoU2NvcGUgPSBzaXRlLnB1Ymxpc2hTY29wZSB8fCAndmF1bHQnO1xuICAgIHRoaXMucHVibGlzaFBhdGhzID0gKHNpdGUucHVibGlzaFBhdGhzIHx8IFtdKS5tYXAocCA9PiBwLnRyaW0oKS5yZXBsYWNlKC9eXFwvK3xcXC8rJC9nLCAnJykpLmZpbHRlcihCb29sZWFuKTtcbiAgfVxuXG4gIGFzeW5jIGNvbGxlY3QoKTogUHJvbWlzZTxURmlsZVtdPiB7XG4gICAgY29uc3QgcmVzdWx0OiBURmlsZVtdID0gW107XG5cbiAgICBpZiAodGhpcy5wdWJsaXNoU2NvcGUgPT09ICdzZWxlY3RlZCcpIHtcbiAgICAgIGNvbnN0IGV4cGxpY2l0RmlsZXMgPSBuZXcgU2V0PHN0cmluZz4oKTtcblxuICAgICAgZm9yIChjb25zdCBwYXRoIG9mIHRoaXMucHVibGlzaFBhdGhzKSB7XG4gICAgICAgIGNvbnN0IGFic3RyYWN0RmlsZSA9IHRoaXMuYXBwLnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aChwYXRoKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChhYnN0cmFjdEZpbGUgaW5zdGFuY2VvZiBURmlsZSkge1xuICAgICAgICAgIGlmIChhYnN0cmFjdEZpbGUuZXh0ZW5zaW9uID09PSAnbWQnICYmICF0aGlzLmlzRXhjbHVkZWQoYWJzdHJhY3RGaWxlLnBhdGgpKSB7XG4gICAgICAgICAgICBpZiAoIXJlc3VsdC5zb21lKGYgPT4gZi5wYXRoID09PSBhYnN0cmFjdEZpbGUucGF0aCkpIHtcbiAgICAgICAgICAgICAgcmVzdWx0LnB1c2goYWJzdHJhY3RGaWxlKTtcbiAgICAgICAgICAgICAgZXhwbGljaXRGaWxlcy5hZGQoYWJzdHJhY3RGaWxlLnBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChhYnN0cmFjdEZpbGUgaW5zdGFuY2VvZiBURm9sZGVyKSB7XG4gICAgICAgICAgY29uc3QgZm9sZGVyUHJlZml4ID0gcGF0aCArICcvJztcbiAgICAgICAgICBmb3IgKGNvbnN0IGZpbGUgb2YgdGhpcy5hcHAudmF1bHQuZ2V0RmlsZXMoKSkge1xuICAgICAgICAgICAgaWYgKGZpbGUucGF0aC5zdGFydHNXaXRoKGZvbGRlclByZWZpeCkgJiYgIXRoaXMuaXNFeGNsdWRlZChmaWxlLnBhdGgpKSB7XG4gICAgICAgICAgICAgIGlmIChmaWxlLmV4dGVuc2lvbiA9PT0gJ21kJykge1xuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0LnNvbWUoZiA9PiBmLnBhdGggPT09IGZpbGUucGF0aCkpIHtcbiAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGZpbGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICB0aGlzLnNpdGUuaW5jbHVkZUF0dGFjaG1lbnRzICYmXG4gICAgICAgICAgICAgICAgQVRUQUNITUVOVF9FWFRTLmhhcyhmaWxlLmV4dGVuc2lvbi50b0xvd2VyQ2FzZSgpKVxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdC5zb21lKGYgPT4gZi5wYXRoID09PSBmaWxlLnBhdGgpKSB7XG4gICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChmaWxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuc2l0ZS5pbmNsdWRlQXR0YWNobWVudHMpIHtcbiAgICAgICAgY29uc3QgZXh0cmFBdHRhY2htZW50czogVEZpbGVbXSA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGZpbGUgb2YgcmVzdWx0KSB7XG4gICAgICAgICAgaWYgKGV4cGxpY2l0RmlsZXMuaGFzKGZpbGUucGF0aCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhY2hlID0gdGhpcy5hcHAubWV0YWRhdGFDYWNoZS5nZXRDYWNoZShmaWxlLnBhdGgpO1xuICAgICAgICAgICAgY29uc3QgbGlua3NBbmRFbWJlZHMgPSBbXG4gICAgICAgICAgICAgIC4uLihjYWNoZT8ubGlua3MgfHwgW10pLFxuICAgICAgICAgICAgICAuLi4oY2FjaGU/LmVtYmVkcyB8fCBbXSksXG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgbGlua3NBbmRFbWJlZHMpIHtcbiAgICAgICAgICAgICAgY29uc3QgZGVzdEZpbGUgPSB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLmdldEZpcnN0TGlua3BhdGhEZXN0KGl0ZW0ubGluaywgZmlsZS5wYXRoKTtcbiAgICAgICAgICAgICAgaWYgKGRlc3RGaWxlICYmIEFUVEFDSE1FTlRfRVhUUy5oYXMoZGVzdEZpbGUuZXh0ZW5zaW9uLnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzRXhjbHVkZWQoZGVzdEZpbGUucGF0aCkgJiYgIXJlc3VsdC5zb21lKGYgPT4gZi5wYXRoID09PSBkZXN0RmlsZS5wYXRoKSAmJiAhZXh0cmFBdHRhY2htZW50cy5zb21lKGYgPT4gZi5wYXRoID09PSBkZXN0RmlsZS5wYXRoKSkge1xuICAgICAgICAgICAgICAgICAgZXh0cmFBdHRhY2htZW50cy5wdXNoKGRlc3RGaWxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0LnB1c2goLi4uZXh0cmFBdHRhY2htZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBmaWxlIG9mIHRoaXMuYXBwLnZhdWx0LmdldEZpbGVzKCkpIHtcbiAgICAgIGlmICh0aGlzLmlzRXhjbHVkZWQoZmlsZS5wYXRoKSkgY29udGludWU7XG5cbiAgICAgIGlmIChmaWxlLmV4dGVuc2lvbiA9PT0gJ21kJykge1xuICAgICAgICByZXN1bHQucHVzaChmaWxlKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIHRoaXMuc2l0ZS5pbmNsdWRlQXR0YWNobWVudHMgJiZcbiAgICAgICAgQVRUQUNITUVOVF9FWFRTLmhhcyhmaWxlLmV4dGVuc2lvbi50b0xvd2VyQ2FzZSgpKVxuICAgICAgKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGZpbGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBhc3luYyByZWFkQXNCYXNlNjQoZmlsZTogVEZpbGUpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IGJ1ZmZlciA9IGF3YWl0IHRoaXMuYXBwLnZhdWx0LnJlYWRCaW5hcnkoZmlsZSk7XG4gICAgY29uc3QgYnl0ZXMgPSBuZXcgVWludDhBcnJheShidWZmZXIpO1xuICAgIGxldCBiaW5hcnkgPSAnJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ5dGVzLmJ5dGVMZW5ndGg7IGkrKykge1xuICAgICAgYmluYXJ5ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gYnRvYShiaW5hcnkpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0V4Y2x1ZGVkKHBhdGg6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnNpdGUuZXhjbHVkZVBhdHRlcm5zLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBpc01hdGNoKHBhdGgsIHRoaXMuc2l0ZS5leGNsdWRlUGF0dGVybnMsIHsgZG90OiB0cnVlIH0pO1xuICB9XG59XG4iLCAiLy8gU2hhcmVkIGFjcm9zcyBmaWxlQ29sbGVjdG9yICh3aGljaCBmaWxlcyB0byB1cGxvYWQpIGFuZCB0cmFuc2Zvcm1lciAod2hpY2hcbi8vIGVtYmVkcyBhcmUgaW1hZ2VzKS4gS2VlcCB0aGlzIGFzIHRoZSBzaW5nbGUgc291cmNlIG9mIHRydXRoIFx1MjAxNCBib3RoIG1vZHVsZXNcbi8vIG11c3QgYWdyZWUgb24gd2hhdCBjb3VudHMgYXMgYSBwdWJsaXNoYWJsZSBhdHRhY2htZW50LlxuZXhwb3J0IGNvbnN0IEFUVEFDSE1FTlRfRVhUUyA9IG5ldyBTZXQoW1xuICAncG5nJyxcbiAgJ2pwZycsXG4gICdqcGVnJyxcbiAgJ2dpZicsXG4gICdzdmcnLFxuICAnd2VicCcsXG4gICdwZGYnLFxuXSk7XG5cbi8vIE5vZGUgdmVyc2lvbiBwaW5uZWQgZm9yIHRoZSBDbG91ZGZsYXJlIFBhZ2VzIGJ1aWxkLiBtZGdhcmRlbiBuZWVkcyBhIG1vZGVyblxuLy8gTm9kZTsgQ2xvdWRmbGFyZSBvdGhlcndpc2UgZGVmYXVsdHMgdG8gYSB2ZXJ5IG9sZCBvbmUgYW5kIHRoZSBidWlsZCBmYWlscy5cbi8vIFdyaXR0ZW4gdG8gYSBgLm5vZGUtdmVyc2lvbmAgZmlsZSBpbiB0aGUgcmVwbyByb290IG9uIGV2ZXJ5IHB1Ymxpc2guXG5leHBvcnQgY29uc3QgTk9ERV9WRVJTSU9OID0gJzIyJztcblxuLy8gVGhlIG1kZ2FyZGVuIGVuZ2luZSBkZXBlbmRlbmN5IHdyaXR0ZW4gaW50byBlYWNoIHB1Ymxpc2hlZCByZXBvJ3Ncbi8vIHBhY2thZ2UuanNvbiAoQ2xvdWRmbGFyZSBydW5zIGBucG0gaW5zdGFsbGAgdGhlbiBgbnB4IG1kZ2FyZGVuIGJ1aWxkYCkuXG4vLyBEZWZhdWx0cyB0byB0aGUgbnBtIHJlbGVhc2UgXHUyMDE0IHB1Ymxpc2ggbWRnYXJkZW4gdG8gbnBtIGZvciB0aGlzIHRvIHJlc29sdmUuXG4vLyBEdXJpbmcgbG9jYWwgZGV2IG9yIGJlZm9yZSBwdWJsaXNoLCB0aGlzIGNvdWxkIHBvaW50IHRvIGEgZ2l0aHViIGJyYW5jaDpcbi8vICdnaXRodWI6PG93bmVyPi9tZGdhcmRlbicgKG1kZ2FyZGVuJ3MgYHByZXBhcmVgIHNjcmlwdCBidWlsZHMgaXQgb24gaW5zdGFsbCkuXG4vLyAnbGF0ZXN0JyB3aWxsIGZldGNoIHRoZSBuZXdlc3QgdmVyc2lvbiwgYnV0IHBpbm5pbmcgYSB2ZXJzaW9uIGlzIHNhZmVyLlxuXG5leHBvcnQgY29uc3QgTURHQVJERU5fVkVSU0lPTiA9ICdsYXRlc3QnO1xuXG4vKipcbiAqIEdpdEh1YiBBY3Rpb25zIHdvcmtmbG93IFlBTUwgZm9yIHRoZSBcIkdpdEh1YiBBY3Rpb25zXCIgZGVwbG95IHRhcmdldC5cbiAqIFRoaXMgZ2V0cyBjb21taXR0ZWQgdG8gYC5naXRodWIvd29ya2Zsb3dzL2RlcGxveS55bWxgIGluIHRoZSBwdWJsaXNoIHJlcG8uXG4gKiBJdCBpbnN0YWxscyBtZGdhcmRlbiwgYnVpbGRzIHRoZSBzaXRlLCBhbmQgZGVwbG95cyB0byBHaXRIdWIgUGFnZXMuXG4gKi9cbmV4cG9ydCBjb25zdCBHSVRIVUJfQUNUSU9OU19XT1JLRkxPVyA9IGBuYW1lOiBEZXBsb3kgdG8gR2l0SHViIFBhZ2VzXG5cbm9uOlxuICBwdXNoOlxuICAgIGJyYW5jaGVzOiBbbWFpbl1cbiAgd29ya2Zsb3dfZGlzcGF0Y2g6XG5cbnBlcm1pc3Npb25zOlxuICBjb250ZW50czogcmVhZFxuICBwYWdlczogd3JpdGVcbiAgaWQtdG9rZW46IHdyaXRlXG5cbmNvbmN1cnJlbmN5OlxuICBncm91cDogXCJwYWdlc1wiXG4gIGNhbmNlbC1pbi1wcm9ncmVzczogZmFsc2Vcblxuam9iczpcbiAgYnVpbGQ6XG4gICAgcnVucy1vbjogdWJ1bnR1LWxhdGVzdFxuICAgIHN0ZXBzOlxuICAgICAgLSB1c2VzOiBhY3Rpb25zL2NoZWNrb3V0QHY0XG4gICAgICAtIHVzZXM6IGFjdGlvbnMvc2V0dXAtbm9kZUB2NFxuICAgICAgICB3aXRoOlxuICAgICAgICAgIG5vZGUtdmVyc2lvbjogJyR7Tk9ERV9WRVJTSU9OfSdcbiAgICAgICAgICBjYWNoZTogbnBtXG4gICAgICAtIHJ1bjogbnBtIGNpIHx8IG5wbSBpbnN0YWxsXG4gICAgICAtIHJ1bjogbnB4IG1kZ2FyZGVuIGJ1aWxkXG4gICAgICAtIHVzZXM6IGFjdGlvbnMvdXBsb2FkLXBhZ2VzLWFydGlmYWN0QHYzXG4gICAgICAgIHdpdGg6XG4gICAgICAgICAgcGF0aDogcHVibGljXG5cbiAgZGVwbG95OlxuICAgIGVudmlyb25tZW50OlxuICAgICAgbmFtZTogZ2l0aHViLXBhZ2VzXG4gICAgICB1cmw6IFxcJHt7IHN0ZXBzLmRlcGxveW1lbnQub3V0cHV0cy5wYWdlX3VybCB9fVxuICAgIHJ1bnMtb246IHVidW50dS1sYXRlc3RcbiAgICBuZWVkczogYnVpbGRcbiAgICBzdGVwczpcbiAgICAgIC0gbmFtZTogRGVwbG95IHRvIEdpdEh1YiBQYWdlc1xuICAgICAgICBpZDogZGVwbG95bWVudFxuICAgICAgICB1c2VzOiBhY3Rpb25zL2RlcGxveS1wYWdlc0B2NFxuYDsiLCAiaW1wb3J0IHsgcGFyc2VZYW1sLCBzdHJpbmdpZnlZYW1sIH0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IHsgbm9ybWFsaXplRnJvbnRtYXR0ZXIgfSBmcm9tICcuL2NvbnRlbnRWYWxpZGF0b3InO1xuXG4vLyBBIGZyb250bWF0dGVyIGJsb2NrIGF0IHRoZSB2ZXJ5IHN0YXJ0IG9mIHRoZSBjb250ZW50LlxuY29uc3QgTEVBRElOR19CTE9DS19SRSA9IC9eLS0tWyBcXHRdKlxccj9cXG4oW1xcc1xcU10qPylcXHI/XFxuLS0tWyBcXHRdKihcXHI/XFxufCQpLztcblxuLyoqXG4gKiBQcmVwYXJlcyBhIHZhdWx0IG5vdGUncyB0ZXh0IGZvciB1cGxvYWQuIG1kZ2FyZGVuIHJlc29sdmVzIE9ic2lkaWFuIHdpa2lsaW5rc1xuICogYW5kIGVtYmVkcyBpdHNlbGYsIHNvIHdlIG5vIGxvbmdlciByZXdyaXRlIGxpbmtzIGhlcmUgXHUyMDE0IHdlIG9ubHk6XG4gKiAgIDEuIGd1YXJhbnRlZSBhIHZhbGlkIGxlYWRpbmcgZnJvbnRtYXR0ZXIgYmxvY2sgKGRlZmVuc2l2ZTsgbWRnYXJkZW4gdG9sZXJhdGVzXG4gKiAgICAgIGJhZCBmcm9udG1hdHRlciwgYnV0IGEgY2xlYW4gYmxvY2sgZ2l2ZXMgYSByZWxpYWJsZSB0aXRsZSksIGFuZFxuICogICAyLiBkcm9wIGBwcml2YXRlYC9gZHJhZnRgIGtleXMgc28gdGhlIG5vdGUgcHVibGlzaGVzIChtZGdhcmRlbiBza2lwcyBub3Rlc1xuICogICAgICB0aGF0IHN0aWxsIGNhcnJ5IHRob3NlIGZsYWdzKS5cbiAqIE9ubHkgdGhlIHVwbG9hZGVkIGNvcHkgaXMgY2hhbmdlZCBcdTIwMTQgdGhlIHZhdWx0IG5vdGUgaXMgbmV2ZXIgdG91Y2hlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIFRyYW5zZm9ybWVyIHtcbiAgdHJhbnNmb3JtKGNvbnRlbnQ6IHN0cmluZywgZmlsZVBhdGg6IHN0cmluZywgdGl0bGU/OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IG5vdGVUaXRsZSA9IHRpdGxlID8/IGZpbGVQYXRoLnNwbGl0KCcvJykucG9wKCk/LnJlcGxhY2UoL1xcLm1kJC8sICcnKSA/PyAnVW50aXRsZWQnO1xuICAgIGxldCByZXN1bHQgPSBub3JtYWxpemVGcm9udG1hdHRlcihjb250ZW50LCBub3RlVGl0bGUpO1xuICAgIHJlc3VsdCA9IHRoaXMuc3RyaXBQcml2YXRlRnJvbnRtYXR0ZXIocmVzdWx0KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBgcHJpdmF0ZWAvYGRyYWZ0YCBrZXlzIGZyb20gdGhlIGxlYWRpbmcgZnJvbnRtYXR0ZXIgYmxvY2suIFBhcnNlcyB0aGVcbiAgICogYmxvY2sgd2l0aCBPYnNpZGlhbidzIFlBTUwgZW5naW5lIChyb2J1c3QgYWdhaW5zdCBxdW90aW5nL25lc3RpbmcpIHJhdGhlclxuICAgKiB0aGFuIHNwbGl0dGluZyBsaW5lcy4gQXNzdW1lcyBhIHZhbGlkIGxlYWRpbmcgYmxvY2sgKGd1YXJhbnRlZWQgYnlcbiAgICogYG5vcm1hbGl6ZUZyb250bWF0dGVyYCB1cHN0cmVhbSk7IGxlYXZlcyBjb250ZW50IHVudG91Y2hlZCBvdGhlcndpc2UuXG4gICAqL1xuICBwcml2YXRlIHN0cmlwUHJpdmF0ZUZyb250bWF0dGVyKGNvbnRlbnQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgbSA9IGNvbnRlbnQubWF0Y2goTEVBRElOR19CTE9DS19SRSk7XG4gICAgaWYgKCFtKSByZXR1cm4gY29udGVudDtcblxuICAgIGxldCBkYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgICB0cnkge1xuICAgICAgZGF0YSA9IChwYXJzZVlhbWwobVsxXSkgPz8ge30pIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuICAgIH0gY2F0Y2gge1xuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfVxuICAgIGRlbGV0ZSBkYXRhLnByaXZhdGU7XG4gICAgZGVsZXRlIGRhdGEuZHJhZnQ7XG5cbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoZGF0YSk7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtYXNzaWdubWVudCwgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1jYWxsLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLW1lbWJlci1hY2Nlc3MgLS0gT2JzaWRpYW4gc3RyaW5naWZ5WWFtbCB0eXBpbmdzIG1heSBiZSBpbmNvbXBsZXRlXG4gICAgY29uc3QgeWFtbCA9IGtleXMubGVuZ3RoID8gc3RyaW5naWZ5WWFtbChkYXRhKS50cmltRW5kKCkgOiAnJztcbiAgICBjb25zdCBibG9jayA9IHlhbWwgPyBgLS0tXFxuJHt5YW1sfVxcbi0tLWAgOiBgLS0tXFxuLS0tYDtcbiAgICBjb25zdCB0cmFpbGluZyA9IG1bMl0gPyAnXFxuJyA6ICcnO1xuICAgIHJldHVybiBjb250ZW50LnNsaWNlKDAsIG0uaW5kZXgpICsgYmxvY2sgKyB0cmFpbGluZyArIGNvbnRlbnQuc2xpY2UoKG0uaW5kZXggPz8gMCkgKyBtWzBdLmxlbmd0aCk7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBwYXJzZVlhbWwgfSBmcm9tICdvYnNpZGlhbic7XG5cbi8qKlxuICogUHJlLXB1Ymxpc2ggZnJvbnRtYXR0ZXIgY2hlY2sgKyByZXBhaXIuIG1kZ2FyZGVuIHBhcnNlcyBZQU1MIGZyb250bWF0dGVyIHdpdGhcbiAqIHRoZSBzYW1lIGpzLXlhbWwgZW5naW5lIE9ic2lkaWFuIGV4cG9zZXMgYXMgYHBhcnNlWWFtbGAsIHNvIHdlIGNhbiBjYXRjaCB0aGVcbiAqIGV4YWN0IGZhaWx1cmVzIGhlcmUgXHUyMDE0IGJlZm9yZSBhbnl0aGluZyByZWFjaGVzIENsb3VkZmxhcmUuXG4gKlxuICogVGhlIHJlY3VycmluZyBicmVha2VyOiBhIG5vdGUgdGhhdCBzdGFydHMgKGFmdGVyIGEgYmxhbmsgbGluZSkgd2l0aCBhIHN0cmF5XG4gKiBgLS0tYCBob3Jpem9udGFsIHJ1bGUgYW5kIG5vIGNsb3NpbmcgYC0tLWAuIG1kZ2FyZGVuIHRyZWF0cyBpdCBhcyBhIGZyb250bWF0dGVyXG4gKiBvcGVuZXIsIG5ldmVyIGZpbmRzIHRoZSBjbG9zZSwgYW5kIHRyaWVzIHRvIFlBTUwtcGFyc2UgdGhlIHdob2xlIGJvZHkgXHUyMTkyXG4gKiBcImVuZCBvZiB0aGUgc3RyZWFtIG9yIGEgZG9jdW1lbnQgc2VwYXJhdG9yIGlzIGV4cGVjdGVkXCIuIFRoZSBmaXggaXMgdG8gZW5zdXJlXG4gKiBldmVyeSBwdWJsaXNoZWQgbm90ZSBCRUdJTlMgd2l0aCBhIHZhbGlkIGZyb250bWF0dGVyIGJsb2NrOyB0aGUgc3RyYXkgYC0tLWBcbiAqIHRoZW4gZGVncmFkZXMgdG8gYW4gb3JkaW5hcnkgYm9keSBob3Jpem9udGFsLXJ1bGUuXG4gKi9cblxuZXhwb3J0IHR5cGUgRnJvbnRtYXR0ZXJTdGF0dXMgPSAnY2xlYW4nIHwgJ2ZpeGVkJztcblxuZXhwb3J0IGludGVyZmFjZSBGcm9udG1hdHRlckluc3BlY3Rpb24ge1xuICBzdGF0dXM6IEZyb250bWF0dGVyU3RhdHVzO1xuICByZWFzb24/OiBzdHJpbmc7XG59XG5cbi8vIEEgZnJvbnRtYXR0ZXIgYmxvY2sgYXQgdGhlIHZlcnkgc3RhcnQ6IGAtLS1gIGxpbmUsIGJvZHksIGNsb3NpbmcgYC0tLWAgbGluZS5cbmNvbnN0IExFQURJTkdfQkxPQ0tfUkUgPSAvXi0tLVsgXFx0XSpcXHI/XFxuKFtcXHNcXFNdKj8pXFxyP1xcbi0tLVsgXFx0XSooXFxyP1xcbnwkKS87XG5cbi8qKiBUcnVlIG9ubHkgd2hlbiB0aGUgY29udGVudCBzdGFydHMgd2l0aCBhIHBhcnNlYWJsZSBgLS0tXHUyMDI2LS0tYCBibG9jay4gKi9cbmZ1bmN0aW9uIGhhc1ZhbGlkTGVhZGluZ0Zyb250bWF0dGVyKHJhdzogc3RyaW5nKTogYm9vbGVhbiB7XG4gIGNvbnN0IHMgPSByYXcucmVwbGFjZSgvXlxcdWZlZmYvLCAnJyk7XG4gIGNvbnN0IG0gPSBzLm1hdGNoKExFQURJTkdfQkxPQ0tfUkUpO1xuICBpZiAoIW0pIHJldHVybiBmYWxzZTtcbiAgdHJ5IHtcbiAgICBwYXJzZVlhbWwobVsxXSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vKiogV2hldGhlciB0aGUgY29udGVudCAqbG9va3MqIGxpa2UgaXQgb3BlbnMgd2l0aCBmcm9udG1hdHRlciAobGF0Y2hlcyBtZGdhcmRlbikuICovXG5mdW5jdGlvbiBsb29rc0xpa2VGcm9udG1hdHRlck9wZW5lcihyYXc6IHN0cmluZyk6IGJvb2xlYW4ge1xuICBjb25zdCBzdHJpcHBlZCA9IHJhdy5yZXBsYWNlKC9eXFx1ZmVmZi8sICcnKS5yZXBsYWNlKC9eWyBcXHRcXHJcXG5dKy8sICcnKTtcbiAgcmV0dXJuIHN0cmlwcGVkLnN0YXJ0c1dpdGgoJy0tLScpO1xufVxuXG4vKipcbiAqIENsYXNzaWZ5IGEgbm90ZSdzIGZyb250bWF0dGVyIHdpdGhvdXQgbW9kaWZ5aW5nIGl0LiBgY2xlYW5gID0gc2FmZSB0byBwdWJsaXNoXG4gKiBhcy1pczsgYGZpeGVkYCA9IHdvdWxkIGJyZWFrIG1kZ2FyZGVuIGFuZCB3aWxsIGJlIGF1dG8tcmVwYWlyZWQgb24gcHVibGlzaC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluc3BlY3RGcm9udG1hdHRlcihyYXc6IHN0cmluZyk6IEZyb250bWF0dGVySW5zcGVjdGlvbiB7XG4gIGlmIChoYXNWYWxpZExlYWRpbmdGcm9udG1hdHRlcihyYXcpKSByZXR1cm4geyBzdGF0dXM6ICdjbGVhbicgfTtcbiAgaWYgKGxvb2tzTGlrZUZyb250bWF0dGVyT3BlbmVyKHJhdykpIHtcbiAgICByZXR1cm4geyBzdGF0dXM6ICdmaXhlZCcsIHJlYXNvbjogJ3N0cmF5IG9yIHVucGFyc2VhYmxlIFx1MjAxQy0tLVx1MjAxRCBhdCB0aGUgdG9wIFx1MjAxNCB3b3VsZCBicmVhayB0aGUgbWRnYXJkZW4gYnVpbGQnIH07XG4gIH1cbiAgLy8gTm8gbGVhZGluZyBmcm9udG1hdHRlciBhbmQgbm8gcmlza3kgb3BlbmVyIFx1MjE5MiBub3RoaW5nIHRvIGRvLlxuICByZXR1cm4geyBzdGF0dXM6ICdjbGVhbicgfTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gY29udGVudCB0aGF0IGlzIGd1YXJhbnRlZWQgdG8gYmVnaW4gd2l0aCBhIHZhbGlkIGZyb250bWF0dGVyIGJsb2NrLlxuICogSWYgdGhlIG5vdGUgYWxyZWFkeSBkb2VzLCBpdCdzIHJldHVybmVkIHVuY2hhbmdlZDsgb3RoZXJ3aXNlIGEgbWluaW1hbCBibG9ja1xuICogKGB0aXRsZWApIGlzIHByZXBlbmRlZCBzbyBtZGdhcmRlbiBwYXJzZXMgY2xlYW5seS4gT25seSB0aGUgcHVibGlzaGVkIGNvcHkgaXNcbiAqIGFmZmVjdGVkIFx1MjAxNCBuZXZlciB0aGUgdXNlcidzIHZhdWx0IG5vdGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVGcm9udG1hdHRlcihyYXc6IHN0cmluZywgdGl0bGU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmIChoYXNWYWxpZExlYWRpbmdGcm9udG1hdHRlcihyYXcpKSByZXR1cm4gcmF3O1xuICBjb25zdCBzYWZlVGl0bGUgPSB0aXRsZS5yZXBsYWNlKC9cIi9nLCBcIidcIik7XG4gIHJldHVybiBgLS0tXFxudGl0bGU6IFwiJHtzYWZlVGl0bGV9XCJcXG4tLS1cXG5cXG4ke3Jhd31gO1xufVxuIiwgImltcG9ydCB7IEFwcCB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB7IE5vdGVGbGFyZVNldHRpbmdzLCBQdWJsaXNoUmVzdWx0LCBTaXRlUHJvZmlsZSwgVXBsb2FkRmlsZSB9IGZyb20gJy4uL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgR2l0SHViQXBpIH0gZnJvbSAnLi4vYXBpL2dpdGh1YkFwaSc7XG5pbXBvcnQgeyBDbG91ZGZsYXJlQXBpIH0gZnJvbSAnLi4vYXBpL2Nsb3VkZmxhcmVBcGknO1xuaW1wb3J0IHsgRmlsZUNvbGxlY3RvciB9IGZyb20gJy4vZmlsZUNvbGxlY3Rvcic7XG5pbXBvcnQgeyBUcmFuc2Zvcm1lciB9IGZyb20gJy4vdHJhbnNmb3JtZXInO1xuaW1wb3J0IHsgaW5zcGVjdEZyb250bWF0dGVyIH0gZnJvbSAnLi9jb250ZW50VmFsaWRhdG9yJztcbmltcG9ydCB7IE1ER0FSREVOX1ZFUlNJT04sIE5PREVfVkVSU0lPTiwgR0lUSFVCX0FDVElPTlNfV09SS0ZMT1cgfSBmcm9tICcuLi9jb3JlL2NvbnN0YW50cyc7XG5cbmNvbnN0IFJFQ09OTkVDVF9ISU5UID1cbiAgXCJJZiB0aGUgYnVpbGQgY2FuJ3Qgc3RhcnQsIHJlY29ubmVjdCBDbG91ZGZsYXJlIHRvIEdpdEh1YjogaW5zdGFsbC9hdXRob3JpemUgdGhlIFwiICtcbiAgJ1wiQ2xvdWRmbGFyZSBXb3JrZXJzIGFuZCBQYWdlc1wiIEdpdEh1YiBBcHAgZm9yIHRoaXMgcmVwby4nO1xuXG5cbmZ1bmN0aW9uIHRleHRUb0Jhc2U2NCh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBieXRlcyA9IG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZSh0ZXh0KTtcbiAgbGV0IGJpbmFyeSA9ICcnO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgYmluYXJ5ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0pO1xuICB9XG4gIHJldHVybiBidG9hKGJpbmFyeSk7XG59XG5cbmV4cG9ydCBjbGFzcyBQdWJsaXNoZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHNldHRpbmdzOiBOb3RlRmxhcmVTZXR0aW5ncyxcbiAgICBwcml2YXRlIHNpdGU6IFNpdGVQcm9maWxlLFxuICAgIHByaXZhdGUgYXBwOiBBcHAsXG4gICAgcHJpdmF0ZSBvblByb2dyZXNzOiAobXNnOiBzdHJpbmcpID0+IHZvaWQsXG4gICkge31cblxuICAvKiogRGV0ZXJtaW5lIHRoZSBlZmZlY3RpdmUgZGVwbG95IHRhcmdldCBmb3IgdGhpcyBzaXRlLiAqL1xuICBwcml2YXRlIGdldCBkZXBsb3lUYXJnZXQoKTogJ2Nsb3VkZmxhcmUnIHwgJ2dpdGh1Yi1hY3Rpb25zJyB7XG4gICAgaWYgKHRoaXMuc2l0ZS5kZXBsb3lUYXJnZXQpIHJldHVybiB0aGlzLnNpdGUuZGVwbG95VGFyZ2V0O1xuICAgIHJldHVybiB0aGlzLnNldHRpbmdzLmNsb3VkZmxhcmVUb2tlbiA/ICdjbG91ZGZsYXJlJyA6ICdnaXRodWItYWN0aW9ucyc7XG4gIH1cblxuICBhc3luYyBwdWJsaXNoKCk6IFByb21pc2U8UHVibGlzaFJlc3VsdD4ge1xuICAgIGNvbnN0IHJlcG8gPSB0aGlzLnNldHRpbmdzLm1hc3RlclJlcG9zaXRvcnk7XG4gICAgXG4gICAgLy8gVGhlIGJyYW5jaCBDbG91ZGZsYXJlL0dIIEFjdGlvbnMgYnVpbGRzIGFuZCB3ZSBjb21taXQgdG8gaXMgdGhlIHJlcG8nc1xuICAgIC8vIG93biBkZWZhdWx0IChtYWluKS4gUmUtcmVzb2x2ZSBmcm9tIEdpdEh1YiBpbiBjYXNlIGl0IGRpZmZlcnMuXG4gICAgbGV0IGJyYW5jaCA9IHRoaXMuc2l0ZS5naXRodWJCcmFuY2ggfHwgJ21haW4nO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBwcm9iZSA9IG5ldyBHaXRIdWJBcGkoXG4gICAgICAgIHRoaXMuc2V0dGluZ3MuZ2l0aHViVG9rZW4sXG4gICAgICAgIHRoaXMuc2V0dGluZ3MuZ2l0aHViT3duZXIsXG4gICAgICAgIHJlcG8sXG4gICAgICApO1xuICAgICAgYnJhbmNoID0gYXdhaXQgcHJvYmUuZ2V0RGVmYXVsdEJyYW5jaCgpO1xuICAgICAgdGhpcy5zaXRlLmdpdGh1YkJyYW5jaCA9IGJyYW5jaDtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIEtlZXAgdGhlIHN0b3JlZCBicmFuY2guXG4gICAgfVxuXG4gICAgY29uc3QgZ2l0aHViID0gbmV3IEdpdEh1YkFwaShcbiAgICAgIHRoaXMuc2V0dGluZ3MuZ2l0aHViVG9rZW4sXG4gICAgICB0aGlzLnNldHRpbmdzLmdpdGh1Yk93bmVyLFxuICAgICAgcmVwbyxcbiAgICAgIGJyYW5jaCxcbiAgICApO1xuICAgIGNvbnN0IGNvbGxlY3RvciA9IG5ldyBGaWxlQ29sbGVjdG9yKHRoaXMuYXBwLCB0aGlzLnNpdGUpO1xuICAgIGNvbnN0IHRyYW5zZm9ybWVyID0gbmV3IFRyYW5zZm9ybWVyKCk7XG5cbiAgICBjb25zdCB1cGxvYWRGaWxlc01hcCA9IG5ldyBNYXA8c3RyaW5nLCBVcGxvYWRGaWxlPigpO1xuICAgIGNvbnN0IGlzc3Vlczogc3RyaW5nW10gPSBbXTtcbiAgICBsZXQgZml4ZWRDb3VudCA9IDA7XG5cbiAgICBjb25zdCByb290RGlyID0gYHNpdGVzLyR7dGhpcy5zaXRlLmlkfWA7XG4gICAgXG4gICAgdGhpcy5vblByb2dyZXNzKCdDb2xsZWN0aW5nIGZpbGVzXHUyMDI2Jyk7XG5cbiAgICBjb25zdCBmaWxlcyA9IGF3YWl0IGNvbGxlY3Rvci5jb2xsZWN0KCk7XG4gICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgICBsZXQgY29udGVudDogc3RyaW5nO1xuICAgICAgbGV0IHJlcG9QYXRoOiBzdHJpbmc7XG5cbiAgICAgIGlmIChmaWxlLmV4dGVuc2lvbiA9PT0gJ21kJykge1xuICAgICAgICBjb25zdCByYXcgPSBhd2FpdCB0aGlzLmFwcC52YXVsdC5yZWFkKGZpbGUpO1xuICAgICAgICAvLyBQcmVmbGlnaHQ6IGNhdGNoICsgYXV0by1yZXBhaXIgZnJvbnRtYXR0ZXIgdGhhdCB3b3VsZCBjcmFzaCB0aGUgYnVpbGQuXG4gICAgICAgIGNvbnN0IGNoZWNrID0gaW5zcGVjdEZyb250bWF0dGVyKHJhdyk7XG4gICAgICAgIGlmIChjaGVjay5zdGF0dXMgPT09ICdmaXhlZCcpIHtcbiAgICAgICAgICBmaXhlZENvdW50Kys7XG4gICAgICAgICAgaXNzdWVzLnB1c2goYCR7ZmlsZS5wYXRofTogJHtjaGVjay5yZWFzb24gPz8gJ2Zyb250bWF0dGVyIGF1dG8tZml4ZWQnfWApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybWVkID0gdHJhbnNmb3JtZXIudHJhbnNmb3JtKHJhdywgZmlsZS5wYXRoLCBmaWxlLmJhc2VuYW1lKTtcbiAgICAgICAgY29udGVudCA9IHRleHRUb0Jhc2U2NCh0cmFuc2Zvcm1lZCk7XG4gICAgICAgIHJlcG9QYXRoID0gYCR7cm9vdERpcn0vY29udGVudC8ke2ZpbGUucGF0aH1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29udGVudCA9IGF3YWl0IGNvbGxlY3Rvci5yZWFkQXNCYXNlNjQoZmlsZSk7XG4gICAgICAgIHJlcG9QYXRoID0gYCR7cm9vdERpcn0vY29udGVudC9hdHRhY2htZW50cy8ke2ZpbGUubmFtZX1gO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXVwbG9hZEZpbGVzTWFwLmhhcyhyZXBvUGF0aCkpIHtcbiAgICAgICAgdXBsb2FkRmlsZXNNYXAuc2V0KHJlcG9QYXRoLCB7IHBhdGg6IHJlcG9QYXRoLCBjb250ZW50IH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlcG8tcm9vdCBmaWxlcyB0aGF0IGRyaXZlIHRoZSBidWlsZCAoc2FtZSBmb3IgYm90aCBkZXBsb3kgdGFyZ2V0cyk6XG4gICAgLy8gIC0gcGFja2FnZS5qc29uICBcdTIwMTQgcHVsbHMgaW4gbWRnYXJkZW4sIGRlZmluZXMgYnVpbGQgc2NyaXB0XG4gICAgLy8gIC0gbWRnYXJkZW4uY29uZmlnLmpzb24gXHUyMDE0IHNpdGUgdGhlbWUgKyBtZXRhZGF0YVxuICAgIC8vICAtIC5ub2RlLXZlcnNpb24gXHUyMDE0IHBpbnMgYSBtb2Rlcm4gTm9kZSBmb3IgdGhlIGJ1aWxkIGVudmlyb25tZW50XG4gICAgdXBsb2FkRmlsZXNNYXAuc2V0KGAke3Jvb3REaXJ9L3BhY2thZ2UuanNvbmAsIHtcbiAgICAgIHBhdGg6IGAke3Jvb3REaXJ9L3BhY2thZ2UuanNvbmAsXG4gICAgICBjb250ZW50OiB0ZXh0VG9CYXNlNjQodGhpcy5idWlsZFBhY2thZ2VKc29uKCkpLFxuICAgIH0pO1xuICAgIHVwbG9hZEZpbGVzTWFwLnNldChgJHtyb290RGlyfS9tZGdhcmRlbi5jb25maWcuanNvbmAsIHtcbiAgICAgIHBhdGg6IGAke3Jvb3REaXJ9L21kZ2FyZGVuLmNvbmZpZy5qc29uYCxcbiAgICAgIGNvbnRlbnQ6IHRleHRUb0Jhc2U2NCh0aGlzLmJ1aWxkTWRnYXJkZW5Db25maWcoKSksXG4gICAgfSk7XG4gICAgdXBsb2FkRmlsZXNNYXAuc2V0KGAke3Jvb3REaXJ9Ly5ub2RlLXZlcnNpb25gLCB7XG4gICAgICBwYXRoOiBgJHtyb290RGlyfS8ubm9kZS12ZXJzaW9uYCxcbiAgICAgIGNvbnRlbnQ6IHRleHRUb0Jhc2U2NChgJHtOT0RFX1ZFUlNJT059XFxuYCksXG4gICAgfSk7XG5cbiAgICAvLyBHaXRIdWIgQWN0aW9ucyBkZXBsb3kgdGFyZ2V0OiBwdXNoIHRoZSB3b3JrZmxvdyBmaWxlIHNvIEdpdEh1YiBQYWdlc1xuICAgIC8vIGJ1aWxkcyBhbmQgcHVibGlzaGVzIHRoZSBzaXRlIGF1dG9tYXRpY2FsbHkgb24gZXZlcnkgcHVzaC5cbiAgICBpZiAodGhpcy5kZXBsb3lUYXJnZXQgPT09ICdnaXRodWItYWN0aW9ucycpIHtcbiAgICAgIHVwbG9hZEZpbGVzTWFwLnNldCgnLmdpdGh1Yi93b3JrZmxvd3MvZGVwbG95LnltbCcsIHtcbiAgICAgICAgcGF0aDogJy5naXRodWIvd29ya2Zsb3dzL2RlcGxveS55bWwnLFxuICAgICAgICBjb250ZW50OiB0ZXh0VG9CYXNlNjQoR0lUSFVCX0FDVElPTlNfV09SS0ZMT1cpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgdXBsb2FkRmlsZXMgPSBBcnJheS5mcm9tKHVwbG9hZEZpbGVzTWFwLnZhbHVlcygpKTtcblxuICAgIHRoaXMub25Qcm9ncmVzcyhgVXBsb2FkaW5nIDAvJHt1cGxvYWRGaWxlcy5sZW5ndGh9Li4uYCk7XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBnaXRodWIuY29tbWl0RmlsZXMoXG4gICAgICB1cGxvYWRGaWxlcyxcbiAgICAgIGBOb3RlRmxhcmU6IHB1Ymxpc2ggJHt1cGxvYWRGaWxlcy5sZW5ndGh9IGZpbGVzYCxcbiAgICAgIChkb25lLCB0b3RhbCkgPT4gdGhpcy5vblByb2dyZXNzKGBVcGxvYWRpbmcgJHtkb25lfS8ke3RvdGFsfS4uLmApLFxuICAgICAgKHNlY3NMZWZ0KSA9PiB0aGlzLm9uUHJvZ3Jlc3MoYFJhdGUgbGltaXRlZCBcdTIwMTQgJHtzZWNzTGVmdH1zLi4uYCksXG4gICAgICAvLyBNaXJyb3IgY29udGVudC8gc28gbm90ZXMgcmVtb3ZlZCBvciBleGNsdWRlZCBmcm9tIHRoZSB2YXVsdCBkaXNhcHBlYXJcbiAgICAgIC8vIGZyb20gdGhlIHB1Ymxpc2hlZCBzaXRlIHRvby5cbiAgICAgIGAke3Jvb3REaXJ9L2NvbnRlbnQvYCxcbiAgICApO1xuXG4gICAgcmVzdWx0LmZpeGVkID0gZml4ZWRDb3VudDtcbiAgICByZXN1bHQuaXNzdWVzID0gaXNzdWVzO1xuXG4gICAgLy8gXHUyNTAwXHUyNTAwIENsb3VkZmxhcmUtc3BlY2lmaWMgcG9zdC1wdWJsaXNoIHN0ZXBzIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuICAgIGlmICh0aGlzLmRlcGxveVRhcmdldCA9PT0gJ2Nsb3VkZmxhcmUnKSB7XG4gICAgICBjb25zdCBjbG91ZGZsYXJlID0gbmV3IENsb3VkZmxhcmVBcGkoXG4gICAgICAgIHRoaXMuc2V0dGluZ3MuY2xvdWRmbGFyZVRva2VuLFxuICAgICAgICB0aGlzLnNldHRpbmdzLmNsb3VkZmxhcmVBY2NvdW50LFxuICAgICAgKTtcblxuICAgICAgLy8gRW5hYmxlIENsb3VkZmxhcmUgZGVwbG95bWVudCAoaGFuZGxlcyBib3RoIGZpcnN0IHB1Ymxpc2ggYW5kIHJlLXB1Ymxpc2ggYWZ0ZXIgdW5wdWJsaXNoKVxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgY2xvdWRmbGFyZS5lbmFibGVEZXBsb3ltZW50KHRoaXMuc2l0ZS5jbG91ZGZsYXJlUHJvamVjdCk7XG4gICAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgICAgY29uc3QgbXNnID0gKGVyciBhcyBFcnJvcikubWVzc2FnZTtcbiAgICAgICAgaWYgKG1zZy5pbmNsdWRlcygnUHJvamVjdCBub3QgZm91bmQnKSkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBjbG91ZGZsYXJlLmNyZWF0ZVByb2plY3QoXG4gICAgICAgICAgICAgIHRoaXMuc2l0ZS5jbG91ZGZsYXJlUHJvamVjdCxcbiAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5naXRodWJPd25lcixcbiAgICAgICAgICAgICAgcmVwbyxcbiAgICAgICAgICAgICAgYnJhbmNoLFxuICAgICAgICAgICAgICByb290RGlyXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgLy8gUHJvamVjdCBjcmVhdGlvbiBzdWNjZWVkczsgZGVwbG95bWVudCBpcyBhdXRvbWF0aWNhbGx5IGVuYWJsZWQgYnkgZGVmYXVsdC5cbiAgICAgICAgICB9IGNhdGNoIChjcmVhdGVFcnI6IHVua25vd24pIHtcbiAgICAgICAgICAgIHJlc3VsdC5lcnJvcnMucHVzaChgQ2xvdWRmbGFyZSByZWNvdmVyeSBmYWlsZWQ6ICR7KGNyZWF0ZUVyciBhcyBFcnJvcikubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdWNjZXNzID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdC5lcnJvcnMucHVzaChgQ2xvdWRmbGFyZTogJHttc2d9YCk7XG4gICAgICAgICAgcmVzdWx0LnN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBSZXBhaXIgdGhlIFBhZ2VzIGJ1aWxkIHNldHRpbmdzIGV2ZXJ5IHB1Ymxpc2ggc28gYSBwcm9qZWN0IGNyZWF0ZWQgZWFybGllclxuICAgICAgLy8gd2l0aCBhIGJhZCBidWlsZCBjb21tYW5kIG9yIHN0YWxlIGJyYW5jaCBzZWxmLWhlYWxzLlxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgY2xvdWRmbGFyZS5jb25maWd1cmVCdWlsZChcbiAgICAgICAgICB0aGlzLnNpdGUuY2xvdWRmbGFyZVByb2plY3QsXG4gICAgICAgICAgdGhpcy5zZXR0aW5ncy5naXRodWJPd25lcixcbiAgICAgICAgICByZXBvLFxuICAgICAgICAgIGJyYW5jaCxcbiAgICAgICAgICByb290RGlyLFxuICAgICAgICApO1xuICAgICAgfSBjYXRjaCAoZXJyOiB1bmtub3duKSB7XG4gICAgICAgIHJlc3VsdC5lcnJvcnMucHVzaChgQ2xvdWRmbGFyZSBidWlsZCBjb25maWc6ICR7KGVyciBhcyBFcnJvcikubWVzc2FnZX1gKTtcbiAgICAgICAgcmVzdWx0LnN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgY2xvdWRmbGFyZS50cmlnZ2VyRGVwbG95bWVudCh0aGlzLnNpdGUuY2xvdWRmbGFyZVByb2plY3QsIGJyYW5jaCk7XG4gICAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgICAgcmVzdWx0LmVycm9ycy5wdXNoKGBDbG91ZGZsYXJlIGJ1aWxkOiAkeyhlcnIgYXMgRXJyb3IpLm1lc3NhZ2V9LiAke1JFQ09OTkVDVF9ISU5UfWApO1xuICAgICAgICByZXN1bHQuc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKiogcGFja2FnZS5qc29uIGZvciB0aGUgcHVibGlzaGVkIHJlcG8gc28gQ2xvdWRmbGFyZSBjYW4gYG5weCBtZGdhcmRlbiBidWlsZGAuICovXG4gIHByaXZhdGUgYnVpbGRQYWNrYWdlSnNvbigpOiBzdHJpbmcge1xuICAgIGNvbnN0IHBrZyA9IHtcbiAgICAgIG5hbWU6IHRoaXMuc2l0ZS5uYW1lIHx8ICdteS1tZGdhcmRlbicsXG4gICAgICBwcml2YXRlOiB0cnVlLFxuICAgICAgc2NyaXB0czogeyBidWlsZDogJ21kZ2FyZGVuIGJ1aWxkJyB9LFxuICAgICAgZGVwZW5kZW5jaWVzOiB7IG1kZ2FyZGVuOiBNREdBUkRFTl9WRVJTSU9OIH0sXG4gICAgfTtcbiAgICByZXR1cm4gYCR7SlNPTi5zdHJpbmdpZnkocGtnLCBudWxsLCAyKX1cXG5gO1xuICB9XG5cbiAgLyoqIG1kZ2FyZGVuLmNvbmZpZy5qc29uIGdlbmVyYXRlZCBmcm9tIHRoaXMgc2l0ZSdzIHByb2ZpbGUgKHBsdWdpbi1tYW5hZ2VkKS4gKi9cbiAgcHJpdmF0ZSBidWlsZE1kZ2FyZGVuQ29uZmlnKCk6IHN0cmluZyB7XG4gICAgY29uc3QgdmF1bHROYW1lID0gdGhpcy5hcHAudmF1bHQuZ2V0TmFtZSgpO1xuICAgIGNvbnN0IGhvc3QgPSB0aGlzLnNpdGUuc2l0ZVVybC5yZXBsYWNlKC9eaHR0cHM/OlxcL1xcLy8sICcnKTtcbiAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICBzaXRlOiB7XG4gICAgICAgIHRpdGxlOiB0aGlzLnNpdGUuc2lkZWJhclRpdGxlIHx8IHRoaXMuc2l0ZS5uYW1lIHx8IHZhdWx0TmFtZSxcbiAgICAgICAgZGVzY3JpcHRpb246IHRoaXMuc2l0ZS5zaXRlRGVzY3JpcHRpb24gfHwgYE5vdGVzIHB1Ymxpc2hlZCBmcm9tICR7dmF1bHROYW1lfWAsXG4gICAgICAgIGJhc2VVcmw6IGhvc3QgPyBgaHR0cHM6Ly8ke2hvc3R9YCA6ICcnLFxuICAgICAgICBsYW5ndWFnZTogJ2VuJyxcbiAgICAgICAgYXV0aG9yOiB0aGlzLnNpdGUuYXV0aG9yTmFtZSB8fCAnJyxcbiAgICAgIH0sXG4gICAgICB0aGVtZTogeyBkYXJrTW9kZTogJ3RvZ2dsZScgfSxcbiAgICAgIG5hdjogW1xuICAgICAgICB7IHRpdGxlOiAnSG9tZScsIHVybDogJy8nIH0sXG4gICAgICAgIHsgdGl0bGU6ICdUYWdzJywgdXJsOiAnL3RhZ3MvJyB9LFxuICAgICAgXSxcbiAgICAgIGZlYXR1cmVzOiB7XG4gICAgICAgIHNlYXJjaDogdHJ1ZSxcbiAgICAgICAgYmFja2xpbmtzOiB0cnVlLFxuICAgICAgICB0YWdzOiB0cnVlLFxuICAgICAgICBncmFwaDogdHJ1ZSxcbiAgICAgICAgbWF0aDogdHJ1ZSxcbiAgICAgICAgc3ludGF4SGlnaGxpZ2h0OiB0cnVlLFxuICAgICAgICByc3M6IHRydWUsXG4gICAgICAgIHNpdGVtYXA6IHRydWUsXG4gICAgICB9LFxuICAgICAgYnVpbGQ6IHsgY29udGVudERpcjogJ2NvbnRlbnQnLCBvdXREaXI6ICdwdWJsaWMnIH0sXG4gICAgfTtcbiAgICByZXR1cm4gYCR7SlNPTi5zdHJpbmdpZnkoY29uZmlnLCBudWxsLCAyKX1cXG5gO1xuICB9XG5cbiAgYXN5bmMgdW5wdWJsaXNoKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICh0aGlzLmRlcGxveVRhcmdldCA9PT0gJ2Nsb3VkZmxhcmUnKSB7XG4gICAgICBjb25zdCBjbG91ZGZsYXJlID0gbmV3IENsb3VkZmxhcmVBcGkoXG4gICAgICAgIHRoaXMuc2V0dGluZ3MuY2xvdWRmbGFyZVRva2VuLFxuICAgICAgICB0aGlzLnNldHRpbmdzLmNsb3VkZmxhcmVBY2NvdW50LFxuICAgICAgKTtcbiAgICAgIGF3YWl0IGNsb3VkZmxhcmUuZGVsZXRlUHJvamVjdCh0aGlzLnNpdGUuY2xvdWRmbGFyZVByb2plY3QpO1xuICAgIH1cbiAgICAvLyBGb3IgR2l0SHViIEFjdGlvbnMgdGFyZ2V0LCB1bnB1Ymxpc2ggaXMgYSBtYW51YWwgc3RlcCBpbiBHaXRIdWIgUGFnZXMgc2V0dGluZ3MuXG4gIH1cblxufVxuIiwgImltcG9ydCB7IEJhY2t1cFNldHRpbmdzLCBOb3RlRmxhcmVTZXR0aW5ncywgU2l0ZVByb2ZpbGUgfSBmcm9tICcuL3R5cGVzJztcblxuLyoqIERlZmF1bHQgZXhjbHVkZSBnbG9icyBhcHBsaWVkIHRvIGEgYnJhbmQtbmV3IHNpdGUuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9FWENMVURFX1BBVFRFUk5TID0gWydwcml2YXRlLyoqJywgJyoucHJpdmF0ZS5tZCcsICdUZW1wbGF0ZXMvKionXTtcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfQkFDS1VQX1NFVFRJTkdTOiBCYWNrdXBTZXR0aW5ncyA9IHtcbiAgcmVwb3NpdG9yeTogJycsXG4gIGZvbGRlcjogJycsXG4gIGJhY2t1cE9uQ2hhbmdlOiB0cnVlLFxuICBpbnRlcnZhbE1pbnV0ZXM6IDYwLFxuICBsYXN0QmFja3VwQXR0ZW1wdEF0OiAnJyxcbiAgbGFzdEJhY2t1cEF0OiAnJyxcbiAgbGFzdEJhY2t1cEVycm9yOiAnJyxcbn07XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1NFVFRJTkdTOiBOb3RlRmxhcmVTZXR0aW5ncyA9IHtcbiAgZ2l0aHViT3duZXI6ICcnLFxuICBnaXRodWJUb2tlbjogJycsXG4gIGNsb3VkZmxhcmVBY2NvdW50OiAnJyxcbiAgY2xvdWRmbGFyZVRva2VuOiAnJyxcbiAgc2l0ZXM6IFtdLFxuICBhY3RpdmVTaXRlSWQ6ICcnLFxuICBzZXR1cENvbXBsZXRlOiBmYWxzZSxcbiAgZW5hYmxlQmFja3VwOiBmYWxzZSxcbiAgZW5hYmxlUHVibGlzaDogdHJ1ZSxcbiAgYmFja3VwOiB7IC4uLkRFRkFVTFRfQkFDS1VQX1NFVFRJTkdTIH0sXG4gIG1hc3RlclJlcG9zaXRvcnk6ICcnLFxuICBkZWZhdWx0Vmlld0xvY2F0aW9uOiAnbGVmdCcsXG59O1xuXG4vKiogQnVpbGQgYSBmcmVzaCBzaXRlIHByb2ZpbGUgd2l0aCBzZW5zaWJsZSBkZWZhdWx0cy4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTaXRlUHJvZmlsZShwYXJ0aWFsOiBQYXJ0aWFsPFNpdGVQcm9maWxlPiA9IHt9KTogU2l0ZVByb2ZpbGUge1xuICByZXR1cm4ge1xuICAgIGlkOlxuICAgICAgdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgJ3JhbmRvbVVVSUQnIGluIGNyeXB0b1xuICAgICAgICA/IGNyeXB0by5yYW5kb21VVUlEKClcbiAgICAgICAgOiBgc2l0ZS0ke0RhdGUubm93KCl9LSR7TWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc2xpY2UoMiwgOCl9YCxcbiAgICBuYW1lOiAnJyxcbiAgICBnaXRodWJSZXBvOiAnJyxcbiAgICBnaXRodWJCcmFuY2g6ICcnLFxuICAgIGNsb3VkZmxhcmVQcm9qZWN0OiAnJyxcbiAgICBzaXRlVXJsOiAnJyxcbiAgICBwdWJsaXNoU2NvcGU6IHBhcnRpYWwucHVibGlzaFNjb3BlIHx8ICd2YXVsdCcsXG4gICAgcHVibGlzaFBhdGhzOiBwYXJ0aWFsLnB1Ymxpc2hQYXRocyB8fCBbXSxcbiAgICBhdXRob3JOYW1lOiAnJyxcbiAgICBzaWRlYmFyVGl0bGU6ICcnLFxuICAgIHNpdGVEZXNjcmlwdGlvbjogJycsXG4gICAgZXhjbHVkZVBhdHRlcm5zOiBbLi4uREVGQVVMVF9FWENMVURFX1BBVFRFUk5TXSxcbiAgICBpbmNsdWRlQXR0YWNobWVudHM6IHRydWUsXG4gICAgaXNQdWJsaXNoZWQ6IGZhbHNlLFxuICAgIGxhc3RQdWJsaXNoZWQ6ICcnLFxuICAgIGxhc3ROb3RlQ291bnQ6IDAsXG4gICAgZGVwbG95VGFyZ2V0OiAnY2xvdWRmbGFyZScsXG4gICAgLi4ucGFydGlhbCxcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBBcHAsIFBsdWdpblNldHRpbmdUYWIsIFNldHRpbmcsIEJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB7IFNldHVwU3RlcCB9IGZyb20gJy4uLy4uL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHR5cGUgTm90ZUZsYXJlUGx1Z2luIGZyb20gJy4uLy4uLy4uL21haW4nO1xuaW1wb3J0IHsgcHJvdmlzaW9uU2l0ZSwgc2x1Z2lmeSwgYnVpbGRDbG91ZGZsYXJlVG9rZW5VcmwsIEFkZFNpdGVNb2RhbCwgUmVtb3ZlU2l0ZU1vZGFsLCBSZXNldE1vZGFsLCBFZGl0U2l0ZU1vZGFsLCBQYXRoU3VnZ2VzdE1vZGFsIH0gZnJvbSAnLi9zaXRlTW9kYWxzJztcbmltcG9ydCB7IEdpdEh1YkFwaSB9IGZyb20gJy4uLy4uL2FwaS9naXRodWJBcGknO1xuaW1wb3J0IHsgQ2xvdWRmbGFyZUFwaSB9IGZyb20gJy4uLy4uL2FwaS9jbG91ZGZsYXJlQXBpJztcblxuY29uc3QgR0lUSFVCX1RPS0VOX1VSTCA9ICdodHRwczovL2dpdGh1Yi5jb20vc2V0dGluZ3MvdG9rZW5zL25ldz9zY29wZXM9cmVwbyx3b3JrZmxvdyZkZXNjcmlwdGlvbj1Ob3RlRmxhcmUnO1xuY29uc3QgQ0xPVURGTEFSRV9BUFBfVVJMID0gJ2h0dHBzOi8vZ2l0aHViLmNvbS9hcHBzL2Nsb3VkZmxhcmUtd29ya2Vycy1hbmQtcGFnZXMvaW5zdGFsbGF0aW9ucy9uZXcnO1xuY29uc3QgQ0xPVURGTEFSRV9UT0tFTl9VUkwgPSBidWlsZENsb3VkZmxhcmVUb2tlblVybCgpO1xuXG5leHBvcnQgY2xhc3MgTm90ZUZsYXJlU2V0dGluZ3NUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcbiAgcGx1Z2luOiBOb3RlRmxhcmVQbHVnaW47XG4gIHByaXZhdGUgd2l6YXJkU3RlcDogU2V0dXBTdGVwID0gJ2dpdGh1Yic7XG4gIHByaXZhdGUgcGVuZGluZ05hbWUgPSAnJztcbiAgcHJpdmF0ZSBwZW5kaW5nU2NvcGU6ICd2YXVsdCcgfCAnc2VsZWN0ZWQnID0gJ3ZhdWx0JztcbiAgcHJpdmF0ZSBwZW5kaW5nUGF0aHM6IHN0cmluZ1tdID0gW107XG4gIHByaXZhdGUgcGVuZGluZ0RlcGxveVRhcmdldDogJ2dpdGh1Yi1hY3Rpb25zJyB8ICdjbG91ZGZsYXJlJyA9ICdnaXRodWItYWN0aW9ucyc7XG4gIHByaXZhdGUgaGFzSW5pdGlhbGl6ZWRXaXphcmQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGx1Z2luOiBOb3RlRmxhcmVQbHVnaW4pIHtcbiAgICBzdXBlcihhcHAsIHBsdWdpbik7XG4gICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gIH1cblxuICBkaXNwbGF5KCk6IHZvaWQgeyB0aGlzLnJlbmRlcigpOyB9XG5cbiAgcmVuZGVyKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgY29udGFpbmVyRWwgfSA9IHRoaXM7XG4gICAgY29udGFpbmVyRWwuZW1wdHkoKTtcblxuICAgIGNvbnN0IGhhc0NyZWRzID0gISEodGhpcy5wbHVnaW4uc2V0dGluZ3MuZ2l0aHViVG9rZW4pO1xuICAgIGNvbnN0IHNldHVwQ29tcGxldGUgPSB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zZXR1cENvbXBsZXRlO1xuICAgIGNvbnN0IG5lZWRzU2V0dXAgPSAhc2V0dXBDb21wbGV0ZSB8fCAhaGFzQ3JlZHMgfHxcbiAgICAgICh0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbmFibGVQdWJsaXNoICYmIHRoaXMucGx1Z2luLnNldHRpbmdzLnNpdGVzLmxlbmd0aCA9PT0gMCk7XG4gICAgaWYgKG5lZWRzU2V0dXAgfHwgKHRoaXMud2l6YXJkU3RlcCA9PT0gJ2RvbmUnICYmIHRoaXMuaGFzSW5pdGlhbGl6ZWRXaXphcmQpKSB7XG4gICAgICBpZiAoIXRoaXMuaGFzSW5pdGlhbGl6ZWRXaXphcmQpIHtcbiAgICAgICAgdGhpcy53aXphcmRTdGVwID0gdGhpcy5nZXRJbml0aWFsV2l6YXJkU3RlcCgpO1xuICAgICAgICB0aGlzLmhhc0luaXRpYWxpemVkV2l6YXJkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMucmVuZGVyV2l6YXJkKGNvbnRhaW5lckVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW5kZXJNYW5hZ2VQYW5lbChjb250YWluZXJFbCk7XG4gICAgfVxuICB9XG5cbiAgLy8gXHUyNTAwXHUyNTAwXHUyNTAwIFdpemFyZCAoZmlyc3QgcnVuOiBjb2xsZWN0IGNyZWRlbnRpYWxzICsgY3JlYXRlIHRoZSBmaXJzdCBzaXRlKSBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcblxuICBwcml2YXRlIHJlbmRlcldpemFyZChlbDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcldpemFyZEhlYWRlcihlbCk7XG4gICAgaWYgKHRoaXMud2l6YXJkU3RlcCA9PT0gJ2dpdGh1YicpIHRoaXMucmVuZGVyU3RlcDEoZWwpO1xuICAgIGVsc2UgaWYgKHRoaXMud2l6YXJkU3RlcCA9PT0gJ21vZGUnKSB0aGlzLnJlbmRlclN0ZXBNb2RlKGVsKTtcbiAgICBlbHNlIGlmICh0aGlzLndpemFyZFN0ZXAgPT09ICdkZXBsb3ktdGFyZ2V0JykgdGhpcy5yZW5kZXJTdGVwRGVwbG95VGFyZ2V0KGVsKTtcbiAgICBlbHNlIGlmICh0aGlzLndpemFyZFN0ZXAgPT09ICdjbG91ZGZsYXJlJykgdGhpcy5yZW5kZXJTdGVwMihlbCk7XG4gICAgZWxzZSB0aGlzLnJlbmRlclN0ZXAzKGVsKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVyU3RlcDEoZWw6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgbmV3IFNldHRpbmcoZWwpLnNldE5hbWUoJ0Nvbm5lY3QgeW91ciBhY2NvdW50Jykuc2V0SGVhZGluZygpO1xuICAgIGVsLmNyZWF0ZUVsKCdwJywge1xuICAgICAgY2xzOiAnc2V0dGluZy1pdGVtLWRlc2NyaXB0aW9uJyxcbiAgICAgIHRleHQ6ICdPbmUgc2VjdXJlIGNvbm5lY3Rpb24gcG93ZXJzIHB1Ymxpc2hpbmcgYW5kIG9wdGlvbmFsIHByaXZhdGUgYmFja3Vwcy4gWW91ciB0b2tlbiBpcyBlbmNyeXB0ZWQgd2l0aCB5b3VyIG9wZXJhdGluZyBzeXN0ZW0ga2V5Y2hhaW4uJyxcbiAgICB9KTtcblxuICAgIGxldCB0b2tlblZhbHVlID0gdGhpcy5wbHVnaW4uc2V0dGluZ3MuZ2l0aHViVG9rZW47XG4gICAgY29uc3QgdG9rZW5TZXR0aW5nID0gbmV3IFNldHRpbmcoZWwpLnNldE5hbWUoJ0FjY2VzcyB0b2tlbicpO1xuICAgIHRva2VuU2V0dGluZy5kZXNjRWwuYXBwZW5kVGV4dCgnQ3JlYXRlIGEgdG9rZW4gd2l0aCB0aGUgJyk7XG4gICAgdG9rZW5TZXR0aW5nLmRlc2NFbC5jcmVhdGVFbCgnc3Ryb25nJywgeyB0ZXh0OiAncmVwbycgfSk7XG4gICAgdG9rZW5TZXR0aW5nLmRlc2NFbC5hcHBlbmRUZXh0KCcgYW5kICcpO1xuICAgIHRva2VuU2V0dGluZy5kZXNjRWwuY3JlYXRlRWwoJ3N0cm9uZycsIHsgdGV4dDogJ3dvcmtmbG93JyB9KTtcbiAgICB0b2tlblNldHRpbmcuZGVzY0VsLmFwcGVuZFRleHQoJyBzY29wZXMuIFN0b3JlZCBlbmNyeXB0ZWQgaW4geW91ciBPUyBrZXljaGFpbiwgbmV2ZXIgbG9nZ2VkLiAnKTtcbiAgICB0b2tlblNldHRpbmcuZGVzY0VsLmNyZWF0ZUVsKCdhJywge1xuICAgICAgdGV4dDogJ0NyZWF0ZSB0b2tlbiBcdTIxOTcnLFxuICAgICAgaHJlZjogR0lUSFVCX1RPS0VOX1VSTCxcbiAgICAgIGF0dHI6IHsgdGFyZ2V0OiAnX2JsYW5rJywgcmVsOiAnbm9vcGVuZXInIH0sXG4gICAgfSk7XG4gICAgdG9rZW5TZXR0aW5nLmFkZFRleHQodGV4dCA9PiB7XG4gICAgICB0ZXh0LnNldFBsYWNlaG9sZGVyKCdnaHBfXHUyMDI2Jyk7XG4gICAgICB0ZXh0LmlucHV0RWwudHlwZSA9ICdwYXNzd29yZCc7XG4gICAgICB0ZXh0LnNldFZhbHVlKHRva2VuVmFsdWUpO1xuICAgICAgdGV4dC5vbkNoYW5nZSh2ID0+IHsgdG9rZW5WYWx1ZSA9IHYudHJpbSgpOyB9KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGVycm9yRWwgPSB0aGlzLmNyZWF0ZUVycm9yRWwoZWwpO1xuXG4gICAgbmV3IFNldHRpbmcoZWwpLmFkZEJ1dHRvbihidG4gPT4ge1xuICAgICAgYnRuLnNldEJ1dHRvblRleHQoJ1ZlcmlmeSAmIGNvbnRpbnVlJykuc2V0Q3RhKCk7XG4gICAgICBidG4ub25DbGljayhhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmICghdG9rZW5WYWx1ZSkgcmV0dXJuIHRoaXMuc2hvd0Vycm9yKGVycm9yRWwsICdQbGVhc2UgZW50ZXIgeW91ciBHaXRIdWIgdG9rZW4uJyk7XG4gICAgICAgIHRoaXMuaGlkZUVycm9yKGVycm9yRWwpO1xuICAgICAgICB0aGlzLmJ1c3koYnRuLCAnVmVyaWZ5aW5nXHUyMDI2Jyk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCB1c2VybmFtZSA9IGF3YWl0IG5ldyBHaXRIdWJBcGkodG9rZW5WYWx1ZSwgJycsICcnKS5nZXRBdXRoZW50aWNhdGVkVXNlcigpO1xuXG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZ2l0aHViVG9rZW4gPSB0b2tlblZhbHVlO1xuICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmdpdGh1Yk93bmVyID0gdXNlcm5hbWU7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG5cbiAgICAgICAgICB0aGlzLndpemFyZFN0ZXAgPSAnbW9kZSc7XG4gICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyOiB1bmtub3duKSB7XG4gICAgICAgICAgY29uc3QgbXNnID0gKGVyciBhcyBFcnJvcikubWVzc2FnZTtcbiAgICAgICAgICB0aGlzLnNob3dFcnJvcihcbiAgICAgICAgICAgIGVycm9yRWwsXG4gICAgICAgICAgICAvaW52YWxpZC9pLnRlc3QobXNnKVxuICAgICAgICAgICAgICA/ICdUb2tlbiBpbnZhbGlkIG9yIG1pc3NpbmcgdGhlIHJlcG8gc2NvcGUuIENoZWNrIGl0IGFuZCB0cnkgYWdhaW4uJ1xuICAgICAgICAgICAgICA6IG1zZyxcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMuaWRsZShidG4sICdWZXJpZnkgJiBjb250aW51ZScpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBTdGVwIDI6IGNob29zZSB0aGUgb3V0Y29tZXMgTm90ZUZsYXJlIHNob3VsZCBtYW5hZ2UuICovXG4gIHByaXZhdGUgcmVuZGVyU3RlcE1vZGUoZWw6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgbmV3IFNldHRpbmcoZWwpLnNldE5hbWUoJ0Nob29zZSB5b3VyIGV4cGVyaWVuY2UnKS5zZXRIZWFkaW5nKCk7XG4gICAgZWwuY3JlYXRlRWwoJ3AnLCB7XG4gICAgICBjbHM6ICdzZXR0aW5nLWl0ZW0tZGVzY3JpcHRpb24nLFxuICAgICAgdGV4dDogJ1N0YXJ0IHdpdGggZWl0aGVyIGZlYXR1cmUgb3IgdXNlIGJvdGguIFlvdSBjYW4gY2hhbmdlIHRoaXMgbGF0ZXIuJyxcbiAgICB9KTtcblxuICAgIGxldCBlbmFibGVCYWNrdXAgPSB0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbmFibGVCYWNrdXA7XG4gICAgbGV0IGVuYWJsZVB1Ymxpc2ggPSB0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbmFibGVQdWJsaXNoO1xuXG4gICAgbmV3IFNldHRpbmcoZWwpXG4gICAgICAuc2V0TmFtZSgnQXV0b21hdGljIHByaXZhdGUgYmFja3VwJylcbiAgICAgIC5zZXREZXNjKCdQcm90ZWN0IHlvdXIgdmF1bHQgcXVpZXRseSBpbiB0aGUgYmFja2dyb3VuZCB3aXRoIG5vIG1hbnVhbCBzdGVwcyBvciBmaWxlIHNlbGVjdGlvbi4nKVxuICAgICAgLmFkZFRvZ2dsZSh0ID0+IHtcbiAgICAgICAgdC5zZXRWYWx1ZShlbmFibGVCYWNrdXApO1xuICAgICAgICB0Lm9uQ2hhbmdlKHYgPT4geyBlbmFibGVCYWNrdXAgPSB2OyB9KTtcbiAgICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoZWwpXG4gICAgICAuc2V0TmFtZSgnUHVibGlzaCBhIHdlYnNpdGUnKVxuICAgICAgLnNldERlc2MoJ1R1cm4gc2VsZWN0ZWQgbm90ZXMgaW50byBhIGZhc3QgcHVibGljIHNpdGUgd2l0aCBvbmUtY2xpY2sgdXBkYXRlcy4nKVxuICAgICAgLmFkZFRvZ2dsZSh0ID0+IHtcbiAgICAgICAgdC5zZXRWYWx1ZShlbmFibGVQdWJsaXNoKTtcbiAgICAgICAgdC5vbkNoYW5nZSh2ID0+IHsgZW5hYmxlUHVibGlzaCA9IHY7IH0pO1xuICAgICAgfSk7XG5cbiAgICBjb25zdCBlcnJvckVsID0gdGhpcy5jcmVhdGVFcnJvckVsKGVsKTtcblxuICAgIG5ldyBTZXR0aW5nKGVsKVxuICAgICAgLmFkZEJ1dHRvbihiYWNrID0+IHtcbiAgICAgICAgYmFjay5zZXRCdXR0b25UZXh0KCdCYWNrJyk7XG4gICAgICAgIGJhY2sub25DbGljaygoKSA9PiB7IHRoaXMud2l6YXJkU3RlcCA9ICdnaXRodWInOyB0aGlzLnJlbmRlcigpOyB9KTtcbiAgICAgIH0pXG4gICAgICAuYWRkQnV0dG9uKGJ0biA9PiB7XG4gICAgICAgIGJ0bi5zZXRCdXR0b25UZXh0KCdDb250aW51ZScpLnNldEN0YSgpO1xuICAgICAgICBidG4ub25DbGljayhhc3luYyAoKSA9PiB7XG4gICAgICAgICAgaWYgKCFlbmFibGVCYWNrdXAgJiYgIWVuYWJsZVB1Ymxpc2gpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNob3dFcnJvcihlcnJvckVsLCAnUGxlYXNlIGVuYWJsZSBhdCBsZWFzdCBvbmUgZmVhdHVyZS4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5oaWRlRXJyb3IoZXJyb3JFbCk7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5hYmxlQmFja3VwID0gZW5hYmxlQmFja3VwO1xuICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmVuYWJsZVB1Ymxpc2ggPSBlbmFibGVQdWJsaXNoO1xuXG4gICAgICAgICAgaWYgKGVuYWJsZUJhY2t1cCAmJiAhdGhpcy5wbHVnaW4uc2V0dGluZ3MuYmFja3VwLnJlcG9zaXRvcnkpIHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmJhY2t1cC5yZXBvc2l0b3J5ID0gdGhpcy5wbHVnaW4uZGVmYXVsdEJhY2t1cFJlcG9zaXRvcnkoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZW5hYmxlUHVibGlzaCkge1xuICAgICAgICAgICAgdGhpcy53aXphcmRTdGVwID0gJ2RlcGxveS10YXJnZXQnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zZXR1cENvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgdGhpcy53aXphcmRTdGVwID0gJ2RvbmUnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqIFN0ZXAgMyAocHVibGlzaCBwYXRoKTogY2hvb3NlIGRlcGxveSB0YXJnZXQgXHUyMDE0IEdpdEh1YiBBY3Rpb25zIG9yIENsb3VkZmxhcmUuICovXG4gIHByaXZhdGUgcmVuZGVyU3RlcERlcGxveVRhcmdldChlbDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBuZXcgU2V0dGluZyhlbCkuc2V0TmFtZSgnQ3JlYXRlIHlvdXIgc2l0ZScpLnNldEhlYWRpbmcoKTtcbiAgICBlbC5jcmVhdGVFbCgncCcsIHtcbiAgICAgIGNsczogJ3NldHRpbmctaXRlbS1kZXNjcmlwdGlvbicsXG4gICAgICB0ZXh0OiAnQ2hvb3NlIHdoYXQgdG8gcHVibGlzaCBhbmQgd2hlcmUgTm90ZUZsYXJlIHNob3VsZCBob3N0IGl0LicsXG4gICAgfSk7XG5cbiAgICBsZXQgc2l0ZU5hbWUgPSB0aGlzLnBlbmRpbmdOYW1lIHx8ICdub3RlZmxhcmUtc2l0ZSc7XG4gICAgbmV3IFNldHRpbmcoZWwpXG4gICAgICAuc2V0TmFtZSgnU2l0ZSBuYW1lJylcbiAgICAgIC5zZXREZXNjKCdVc2VkIGZvciB5b3VyIHNpdGUgYWRkcmVzcy4gTG93ZXJjYXNlIGxldHRlcnMsIG51bWJlcnMsIGFuZCBkYXNoZXMgd29yayBiZXN0LicpXG4gICAgICAuYWRkVGV4dCh0ZXh0ID0+IHtcbiAgICAgICAgdGV4dC5zZXRQbGFjZWhvbGRlcignbXktbm90ZXMnKTtcbiAgICAgICAgdGV4dC5zZXRWYWx1ZShzaXRlTmFtZSk7XG4gICAgICAgIHRleHQub25DaGFuZ2UodmFsdWUgPT4geyBzaXRlTmFtZSA9IHZhbHVlOyB9KTtcbiAgICAgIH0pO1xuXG4gICAgbGV0IHNjb3BlID0gdGhpcy5wZW5kaW5nU2NvcGU7XG4gICAgbGV0IHBhdGhzID0gWy4uLnRoaXMucGVuZGluZ1BhdGhzXTtcblxuICAgIGxldCB1cGRhdGVWaXNpYmlsaXR5OiAoKSA9PiB2b2lkO1xuXG4gICAgbmV3IFNldHRpbmcoZWwpXG4gICAgICAuc2V0TmFtZSgnUHVibGlzaCBzY29wZScpXG4gICAgICAuc2V0RGVzYygnQ29uZmlndXJlIHdoYXQgdG8gcHVibGlzaDogdGhlIGVudGlyZSB2YXVsdCBvciBzZWxlY3RlZCBmaWxlcy9mb2xkZXJzLicpXG4gICAgICAuYWRkRHJvcGRvd24oZCA9PiB7XG4gICAgICAgIGQuYWRkT3B0aW9uKCd2YXVsdCcsICdGdWxsIFZhdWx0Jyk7XG4gICAgICAgIGQuYWRkT3B0aW9uKCdzZWxlY3RlZCcsICdTZWxlY3RlZCBGaWxlcy9Gb2xkZXJzJyk7XG4gICAgICAgIGQuc2V0VmFsdWUoc2NvcGUpO1xuICAgICAgICBkLm9uQ2hhbmdlKHYgPT4ge1xuICAgICAgICAgIHNjb3BlID0gdiBhcyAndmF1bHQnIHwgJ3NlbGVjdGVkJztcbiAgICAgICAgICB1cGRhdGVWaXNpYmlsaXR5KCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICBjb25zdCBwYXRoc0NvbnRhaW5lciA9IGVsLmNyZWF0ZURpdignbm90ZWZsYXJlLXBhdGhzLWNvbnRhaW5lcicpO1xuICAgIFxuICAgIGNvbnN0IHJlbmRlclBhdGhzID0gKCkgPT4ge1xuICAgICAgcGF0aHNDb250YWluZXIuZW1wdHkoKTtcbiAgICAgIGlmIChzY29wZSA9PT0gJ3ZhdWx0Jykge1xuICAgICAgICBwYXRoc0NvbnRhaW5lci5zZXRDc3NTdHlsZXMoeyBkaXNwbGF5OiAnbm9uZScgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHBhdGhzQ29udGFpbmVyLnNldENzc1N0eWxlcyh7IGRpc3BsYXk6ICdibG9jaycgfSk7XG4gICAgICBcbiAgICAgIGlmIChwYXRocy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcGF0aHNDb250YWluZXIuY3JlYXRlRWwoJ3AnLCB7IHRleHQ6ICdObyBmaWxlcyBvciBmb2xkZXJzIHNlbGVjdGVkLicsIGNsczogJ25vdGVmbGFyZS1tdXRlZCcgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBsaXN0ID0gcGF0aHNDb250YWluZXIuY3JlYXRlRWwoJ3VsJywgeyBjbHM6ICdub3RlZmxhcmUtcGF0aC1saXN0JyB9KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXRocy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGxpID0gbGlzdC5jcmVhdGVFbCgnbGknKTtcbiAgICAgICAgICBsaS5zZXRDc3NTdHlsZXMoeyBkaXNwbGF5OiAnZmxleCcgfSk7XG4gICAgICAgICAgbGkuc2V0Q3NzU3R5bGVzKHsganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyB9KTtcbiAgICAgICAgICBsaS5zZXRDc3NTdHlsZXMoeyBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9KTtcbiAgICAgICAgICBsaS5zZXRDc3NTdHlsZXMoeyBtYXJnaW5Cb3R0b206ICc0cHgnIH0pO1xuICAgICAgICAgIFxuICAgICAgICAgIGxpLmNyZWF0ZVNwYW4oeyB0ZXh0OiBwYXRoc1tpXSB9KTtcbiAgICAgICAgICBjb25zdCByZW1vdmVCdG4gPSBsaS5jcmVhdGVFbCgnYnV0dG9uJywgeyB0ZXh0OiAnXHUyNzE1JyB9KTtcbiAgICAgICAgICByZW1vdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBwYXRocy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICByZW5kZXJQYXRocygpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCBuZXcgcGF0aFxuICAgICAgY29uc3QgYWRkUm93ID0gcGF0aHNDb250YWluZXIuY3JlYXRlRGl2KCdub3RlZmxhcmUtYWRkLXBhdGgtcm93Jyk7XG4gICAgICBhZGRSb3cuc2V0Q3NzU3R5bGVzKHsgbWFyZ2luVG9wOiAnOHB4JyB9KTtcbiAgICAgIFxuICAgICAgY29uc3QgYWRkQnRuID0gYWRkUm93LmNyZWF0ZUVsKCdidXR0b24nLCB7IHRleHQ6ICdCcm93c2UgVmF1bHQuLi4nIH0pO1xuICAgICAgYWRkQnRuLnNldENzc1N0eWxlcyh7IHdpZHRoOiAnMTAwJScgfSk7XG4gICAgICBhZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIG5ldyBQYXRoU3VnZ2VzdE1vZGFsKHRoaXMuYXBwLCAoc2VsZWN0ZWRQYXRoKSA9PiB7XG4gICAgICAgICAgaWYgKCFwYXRocy5pbmNsdWRlcyhzZWxlY3RlZFBhdGgpKSB7XG4gICAgICAgICAgICBwYXRocy5wdXNoKHNlbGVjdGVkUGF0aCk7XG4gICAgICAgICAgICByZW5kZXJQYXRocygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkub3BlbigpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHVwZGF0ZVZpc2liaWxpdHkgPSAoKSA9PiB7XG4gICAgICByZW5kZXJQYXRocygpO1xuICAgIH07XG4gICAgdXBkYXRlVmlzaWJpbGl0eSgpO1xuXG4gICAgbmV3IFNldHRpbmcoZWwpLnNldE5hbWUoJ0hvc3RpbmcgUHJvdmlkZXInKS5zZXRIZWFkaW5nKCk7XG5cbiAgICBuZXcgU2V0dGluZyhlbClcbiAgICAgIC5zZXROYW1lKCdTaW1wbGUgaG9zdGluZyAoR2l0SHViIFBhZ2VzKScpXG4gICAgICAuc2V0RGVzYygnRnJlZSwgYXV0b21hdGVkIGhvc3RpbmcgdmlhIEdpdEh1YiBBY3Rpb25zIHdpdGggbm8gZXh0cmEgYWNjb3VudHMuIFBlcmZlY3QgZm9yIGEgZmFzdCwgc2ltcGxlIHNldHVwLicpXG4gICAgICAuYWRkQnV0dG9uKGJ0biA9PiB7XG4gICAgICAgIGJ0bi5zZXRCdXR0b25UZXh0KHRoaXMucGVuZGluZ0RlcGxveVRhcmdldCA9PT0gJ2dpdGh1Yi1hY3Rpb25zJyA/ICdcdTI3MTMgU2VsZWN0ZWQnIDogJ1NlbGVjdCcpO1xuICAgICAgICBpZiAodGhpcy5wZW5kaW5nRGVwbG95VGFyZ2V0ID09PSAnZ2l0aHViLWFjdGlvbnMnKSBidG4uc2V0Q3RhKCk7XG4gICAgICAgIGJ0bi5vbkNsaWNrKCgpID0+IHtcbiAgICAgICAgICB0aGlzLnBlbmRpbmdOYW1lID0gc2l0ZU5hbWU7XG4gICAgICAgICAgdGhpcy5wZW5kaW5nU2NvcGUgPSBzY29wZTtcbiAgICAgICAgICB0aGlzLnBlbmRpbmdQYXRocyA9IHBhdGhzO1xuICAgICAgICAgIHRoaXMucGVuZGluZ0RlcGxveVRhcmdldCA9ICdnaXRodWItYWN0aW9ucyc7XG4gICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIG5ldyBTZXR0aW5nKGVsKVxuICAgICAgLnNldE5hbWUoJ0Nsb3VkZmxhcmUgaG9zdGluZycpXG4gICAgICAuc2V0RGVzYygnUHJlbWl1bSBmZWF0dXJlczogZ2xvYmFsIENETiwgaW5zdGFudCBkZXBsb3ltZW50IHRvZ2dsZXMsIGFuZCBjdXN0b20gZG9tYWlucy4gUmVxdWlyZXMgY29ubmVjdGluZyBhIGZyZWUgQ2xvdWRmbGFyZSBhY2NvdW50LicpXG4gICAgICAuYWRkQnV0dG9uKGJ0biA9PiB7XG4gICAgICAgIGJ0bi5zZXRCdXR0b25UZXh0KHRoaXMucGVuZGluZ0RlcGxveVRhcmdldCA9PT0gJ2Nsb3VkZmxhcmUnID8gJ1x1MjcxMyBTZWxlY3RlZCcgOiAnU2VsZWN0Jyk7XG4gICAgICAgIGlmICh0aGlzLnBlbmRpbmdEZXBsb3lUYXJnZXQgPT09ICdjbG91ZGZsYXJlJykgYnRuLnNldEN0YSgpO1xuICAgICAgICBidG4ub25DbGljaygoKSA9PiB7XG4gICAgICAgICAgdGhpcy5wZW5kaW5nTmFtZSA9IHNpdGVOYW1lO1xuICAgICAgICAgIHRoaXMucGVuZGluZ1Njb3BlID0gc2NvcGU7XG4gICAgICAgICAgdGhpcy5wZW5kaW5nUGF0aHMgPSBwYXRocztcbiAgICAgICAgICB0aGlzLnBlbmRpbmdEZXBsb3lUYXJnZXQgPSAnY2xvdWRmbGFyZSc7XG4gICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIGNvbnN0IGVycm9yRWwgPSB0aGlzLmNyZWF0ZUVycm9yRWwoZWwpO1xuICAgIG5ldyBTZXR0aW5nKGVsKVxuICAgICAgLmFkZEJ1dHRvbihiYWNrID0+IHtcbiAgICAgICAgYmFjay5zZXRCdXR0b25UZXh0KCdCYWNrJyk7XG4gICAgICAgIGJhY2sub25DbGljaygoKSA9PiB7IHRoaXMud2l6YXJkU3RlcCA9ICdtb2RlJzsgdGhpcy5yZW5kZXIoKTsgfSk7XG4gICAgICB9KVxuICAgICAgLmFkZEJ1dHRvbihidG4gPT4ge1xuICAgICAgICBidG4uc2V0QnV0dG9uVGV4dCgnQ29udGludWUnKS5zZXRDdGEoKTtcbiAgICAgICAgYnRuLm9uQ2xpY2soKCkgPT4ge1xuICAgICAgICAgIGlmICghc2x1Z2lmeShzaXRlTmFtZSkpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yKGVycm9yRWwsICdQbGVhc2UgZW50ZXIgYSBzaXRlIG5hbWUuJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMucGVuZGluZ05hbWUgPSBzaXRlTmFtZTtcbiAgICAgICAgICB0aGlzLnBlbmRpbmdTY29wZSA9IHNjb3BlO1xuICAgICAgICAgIHRoaXMucGVuZGluZ1BhdGhzID0gcGF0aHM7XG4gICAgICAgICAgdGhpcy53aXphcmRTdGVwID0gJ2Nsb3VkZmxhcmUnO1xuICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlbmRlclN0ZXAyKGVsOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGNvbnN0IGRlcGxveVRhcmdldCA9IHRoaXMucGVuZGluZ0RlcGxveVRhcmdldDtcbiAgICBjb25zdCByZXBvU2x1ZyA9IGAke3RoaXMucGx1Z2luLnNldHRpbmdzLmdpdGh1Yk93bmVyfS8ke3NsdWdpZnkodGhpcy5wZW5kaW5nTmFtZSl9YDtcbiAgICBjb25zdCBjZlJlcXVpcmVkID0gZGVwbG95VGFyZ2V0ID09PSAnY2xvdWRmbGFyZSc7XG5cbiAgICBuZXcgU2V0dGluZyhlbCkuc2V0TmFtZShcbiAgICAgIGNmUmVxdWlyZWQgPyAnQ29ubmVjdCBDbG91ZGZsYXJlJyA6ICdMYXVuY2ggeW91ciBzaXRlJ1xuICAgICkuc2V0SGVhZGluZygpO1xuICAgIGVsLmNyZWF0ZUVsKCdwJywge1xuICAgICAgY2xzOiAnc2V0dGluZy1pdGVtLWRlc2NyaXB0aW9uJyxcbiAgICAgIHRleHQ6IGNmUmVxdWlyZWRcbiAgICAgICAgPyAnQ2xvdWRmbGFyZSBob3N0cyB0aGUgc2l0ZSBmb3IgZnJlZSBhbmQgbGV0cyBOb3RlRmxhcmUgdGFrZSBpdCBvbmxpbmUgb3Igb2ZmbGluZSB3aXRob3V0IGRlbGV0aW5nIGNvbnRlbnQuIFR3byBvbmUtdGltZSBjbGlja3MgaW4geW91ciBicm93c2VyOidcbiAgICAgICAgOiAnTm90ZUZsYXJlIHdpbGwgY3JlYXRlIGEgR2l0SHViIHJlcG8gYW5kIHB1c2ggYSBHaXRIdWIgQWN0aW9ucyB3b3JrZmxvdyB0aGF0IGJ1aWxkcyBhbmQgZGVwbG95cyB5b3VyIHNpdGUgdG8gR2l0SHViIFBhZ2VzLicsXG4gICAgfSk7XG5cbiAgICBsZXQgY2ZUb2tlbiA9IHRoaXMucGx1Z2luLnNldHRpbmdzLmNsb3VkZmxhcmVUb2tlbjtcbiAgICBsZXQgY2ZBY2NvdW50ID0gdGhpcy5wbHVnaW4uc2V0dGluZ3MuY2xvdWRmbGFyZUFjY291bnQ7XG5cbiAgICBpZiAoY2ZSZXF1aXJlZCkge1xuICAgICAgY29uc3QgdG9rZW5TdGVwID0gbmV3IFNldHRpbmcoZWwpLnNldE5hbWUoJzEuIENyZWF0ZSBhIENsb3VkZmxhcmUgQVBJIHRva2VuJyk7XG4gICAgICB0b2tlblN0ZXAuZGVzY0VsLmFwcGVuZFRleHQoJ09wZW5zIHdpdGggUGFnZXMsIFdvcmtlcnMgYW5kIEFjY291bnQgcGVybWlzc2lvbnMgcHJlLXNlbGVjdGVkIFx1MjAxNCBjbGljayB0aHJvdWdoIHRvIGNyZWF0ZSBpdCwgdGhlbiBjb3B5IGl0LiAnKTtcbiAgICAgIHRva2VuU3RlcC5kZXNjRWwuY3JlYXRlRWwoJ2EnLCB7XG4gICAgICAgIHRleHQ6ICdDcmVhdGUgdG9rZW4gXHUyMTk3JyxcbiAgICAgICAgaHJlZjogQ0xPVURGTEFSRV9UT0tFTl9VUkwsXG4gICAgICAgIGF0dHI6IHsgdGFyZ2V0OiAnX2JsYW5rJywgcmVsOiAnbm9vcGVuZXInIH0sXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgYXBwU3RlcCA9IG5ldyBTZXR0aW5nKGVsKS5zZXROYW1lKCcyLiBBdXRob3JpemUgQ2xvdWRmbGFyZSBvbiBHaXRIdWInKTtcbiAgICAgIGFwcFN0ZXAuZGVzY0VsLmFwcGVuZFRleHQoJ0dyYW50IHRoZSBcdTIwMUNDbG91ZGZsYXJlIFdvcmtlcnMgYW5kIFBhZ2VzXHUyMDFEIGFwcCBhY2Nlc3MgdG8geW91ciAnKTtcbiAgICAgIGFwcFN0ZXAuZGVzY0VsLmNyZWF0ZUVsKCdjb2RlJywgeyB0ZXh0OiByZXBvU2x1ZyB9KTtcbiAgICAgIGFwcFN0ZXAuZGVzY0VsLmFwcGVuZFRleHQoJyByZXBvIFx1MjAxNCBDbG91ZGZsYXJlIG5lZWRzIHRoaXMgdG8gYnVpbGQgdGhlIHNpdGUuICcpO1xuICAgICAgYXBwU3RlcC5kZXNjRWwuY3JlYXRlRWwoJ2EnLCB7XG4gICAgICAgIHRleHQ6ICdBdXRob3JpemUgXHUyMTk3JyxcbiAgICAgICAgaHJlZjogQ0xPVURGTEFSRV9BUFBfVVJMLFxuICAgICAgICBhdHRyOiB7IHRhcmdldDogJ19ibGFuaycsIHJlbDogJ25vb3BlbmVyJyB9LFxuICAgICAgfSk7XG5cbiAgICAgIG5ldyBTZXR0aW5nKGVsKVxuICAgICAgICAuc2V0TmFtZSgnQ2xvdWRmbGFyZSBBUEkgdG9rZW4nKVxuICAgICAgICAuc2V0RGVzYygnU3RvcmVkIGVuY3J5cHRlZCBpbiB5b3VyIE9TIGtleWNoYWluIGFuZCBuZXZlciBsb2dnZWQuJylcbiAgICAgICAgLmFkZFRleHQodGV4dCA9PiB7XG4gICAgICAgICAgdGV4dC5zZXRQbGFjZWhvbGRlcignUGFzdGUgQVBJIHRva2VuXHUyMDI2Jyk7XG4gICAgICAgICAgdGV4dC5pbnB1dEVsLnR5cGUgPSAncGFzc3dvcmQnO1xuICAgICAgICAgIHRleHQuc2V0VmFsdWUoY2ZUb2tlbik7XG4gICAgICAgICAgdGV4dC5vbkNoYW5nZSh2ID0+IHsgY2ZUb2tlbiA9IHYudHJpbSgpOyB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgIG5ldyBTZXR0aW5nKGVsKVxuICAgICAgICAuc2V0TmFtZSgnQ2xvdWRmbGFyZSBhY2NvdW50IElEJylcbiAgICAgICAgLnNldERlc2MoJ09wdGlvbmFsIFx1MjAxNCBOb3RlRmxhcmUgZGV0ZWN0cyB0aGlzIGF1dG9tYXRpY2FsbHkgZnJvbSB5b3VyIHRva2VuLicpXG4gICAgICAgIC5hZGRUZXh0KHRleHQgPT4ge1xuICAgICAgICAgIHRleHQuc2V0UGxhY2Vob2xkZXIoJ0F1dG8tZGV0ZWN0ZWQnKTtcbiAgICAgICAgICB0ZXh0LnNldFZhbHVlKGNmQWNjb3VudCk7XG4gICAgICAgICAgdGV4dC5vbkNoYW5nZSh2ID0+IHsgY2ZBY2NvdW50ID0gdi50cmltKCk7IH0pO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3IFNldHRpbmcoZWwpXG4gICAgICAgIC5zZXROYW1lKCdSZWFkeSB0byBjcmVhdGUnKVxuICAgICAgICAuc2V0RGVzYygnTm90ZUZsYXJlIHdpbGwgcHJvdmlzaW9uIHRoZSBzaXRlIGFuZCBwcmVwYXJlIGl0cyBmaXJzdCBkZXBsb3ltZW50IGF1dG9tYXRpY2FsbHkuJyk7XG4gICAgfVxuXG4gICAgY29uc3QgZXJyb3JFbCA9IHRoaXMuY3JlYXRlRXJyb3JFbChlbCk7XG5cbiAgICBuZXcgU2V0dGluZyhlbClcbiAgICAgIC5hZGRCdXR0b24oYmFjayA9PiB7XG4gICAgICAgIGJhY2suc2V0QnV0dG9uVGV4dCgnQmFjaycpO1xuICAgICAgICBiYWNrLm9uQ2xpY2soKCkgPT4geyB0aGlzLndpemFyZFN0ZXAgPSAnZGVwbG95LXRhcmdldCc7IHRoaXMucmVuZGVyKCk7IH0pO1xuICAgICAgfSlcbiAgICAgIC5hZGRCdXR0b24oYnRuID0+IHtcbiAgICAgICAgYnRuLnNldEJ1dHRvblRleHQoY2ZSZXF1aXJlZCA/ICdDb25uZWN0ICYgY3JlYXRlIHNpdGUnIDogJ0NyZWF0ZSBzaXRlJykuc2V0Q3RhKCk7XG4gICAgICAgIGJ0bi5vbkNsaWNrKGFzeW5jICgpID0+IHtcbiAgICAgICAgICBpZiAoY2ZSZXF1aXJlZCAmJiAhY2ZUb2tlbikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hvd0Vycm9yKGVycm9yRWwsICdQbGVhc2UgcGFzdGUgeW91ciBDbG91ZGZsYXJlIEFQSSB0b2tlbi4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5oaWRlRXJyb3IoZXJyb3JFbCk7XG4gICAgICAgICAgdGhpcy5idXN5KGJ0biwgY2ZSZXF1aXJlZCA/ICdDaGVja2luZyB0b2tlblx1MjAyNicgOiAnQ3JlYXRpbmcgeW91ciBzaXRlXHUyMDI2Jyk7XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKGNmUmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgbGV0IGFjY291bnRJZCA9IGNmQWNjb3VudDtcbiAgICAgICAgICAgICAgaWYgKCFhY2NvdW50SWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1c3koYnRuLCAnRGV0ZWN0aW5nIGFjY291bnRcdTIwMjYnKTtcbiAgICAgICAgICAgICAgICBhY2NvdW50SWQgPSBhd2FpdCBuZXcgQ2xvdWRmbGFyZUFwaShjZlRva2VuLCAnJykuZ2V0QWNjb3VudElkKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuY2xvdWRmbGFyZVRva2VuID0gY2ZUb2tlbjtcbiAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuY2xvdWRmbGFyZUFjY291bnQgPSBhY2NvdW50SWQ7XG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmJ1c3koYnRuLCAnQ3JlYXRpbmcgeW91ciBzaXRlXHUyMDI2Jyk7XG4gICAgICAgICAgICBjb25zdCBzaXRlID0gYXdhaXQgcHJvdmlzaW9uU2l0ZShcbiAgICAgICAgICAgICAgdGhpcy5wbHVnaW4sXG4gICAgICAgICAgICAgIHRoaXMucGVuZGluZ05hbWUsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwdWJsaXNoU2NvcGU6IHRoaXMucGVuZGluZ1Njb3BlLFxuICAgICAgICAgICAgICAgIHB1Ymxpc2hQYXRoczogdGhpcy5wZW5kaW5nUGF0aHMsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGRlcGxveVRhcmdldFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnNpdGVzLnB1c2goc2l0ZSk7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5hY3RpdmVTaXRlSWQgPSBzaXRlLmlkO1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Muc2V0dXBDb21wbGV0ZSA9IHRydWU7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblxuICAgICAgICAgICAgdGhpcy53aXphcmRTdGVwID0gJ2RvbmUnO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yKGVycm9yRWwsIChlcnIgYXMgRXJyb3IpLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhpcy5pZGxlKGJ0biwgY2ZSZXF1aXJlZCA/ICdDb25uZWN0ICYgY3JlYXRlIHNpdGUnIDogJ0NyZWF0ZSBzaXRlJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJTdGVwMyhlbDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBzaXRlID0gdGhpcy5wbHVnaW4uZ2V0QWN0aXZlU2l0ZSgpO1xuICAgIG5ldyBTZXR0aW5nKGVsKS5zZXROYW1lKCdZb3VcdTIwMTlyZSByZWFkeScpLnNldEhlYWRpbmcoKTtcblxuICAgIGNvbnN0IGRvbmUgPSBuZXcgU2V0dGluZyhlbCkuc2V0TmFtZShcbiAgICAgIHNpdGUgPyAnWW91ciBzaXRlIGlzIHJlYWR5IHRvIHB1Ymxpc2gnIDogJ0F1dG9tYXRpYyBiYWNrdXAgaXMgcmVhZHknLFxuICAgICk7XG4gICAgaWYgKHNpdGU/LnNpdGVVcmwpIHtcbiAgICAgIGRvbmUuZGVzY0VsLmFwcGVuZFRleHQoJ1NpdGU6ICcpO1xuICAgICAgZG9uZS5kZXNjRWwuY3JlYXRlRWwoJ2EnLCB7XG4gICAgICAgIHRleHQ6IGBodHRwczovLyR7c2l0ZS5zaXRlVXJsfWAsXG4gICAgICAgIGhyZWY6IGBodHRwczovLyR7c2l0ZS5zaXRlVXJsfWAsXG4gICAgICAgIGF0dHI6IHsgdGFyZ2V0OiAnX2JsYW5rJywgcmVsOiAnbm9vcGVuZXInIH0sXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9uZS5zZXREZXNjKCdOb3RlRmxhcmUgd2lsbCBwcm90ZWN0IHlvdXIgdmF1bHQgcXVpZXRseSB1c2luZyB5b3VyIGNob3NlbiBzY2hlZHVsZS4nKTtcbiAgICB9XG5cbiAgICBuZXcgU2V0dGluZyhlbClcbiAgICAgIC5hZGRCdXR0b24obGF0ZXIgPT4ge1xuICAgICAgICBsYXRlci5zZXRCdXR0b25UZXh0KHNpdGUgPyBcIkknbGwgcHVibGlzaCBsYXRlclwiIDogJ09wZW4gc2V0dGluZ3MnKTtcbiAgICAgICAgbGF0ZXIub25DbGljayhhc3luYyAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Muc2V0dXBDb21wbGV0ZSA9IHRydWU7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgdGhpcy5oYXNJbml0aWFsaXplZFdpemFyZCA9IGZhbHNlO1xuICAgICAgICAgIGlmIChzaXRlKSB0aGlzLmNsb3NlU2V0dGluZ3MoKTtcbiAgICAgICAgICBlbHNlIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5hZGRCdXR0b24oYnRuID0+IHtcbiAgICAgICAgYnRuLnNldEJ1dHRvblRleHQoc2l0ZSA/ICdQdWJsaXNoIG5vdycgOiAnQmFjayB1cCBub3cnKS5zZXRDdGEoKTtcbiAgICAgICAgYnRuLm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnNldHVwQ29tcGxldGUgPSB0cnVlO1xuICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIHRoaXMuaGFzSW5pdGlhbGl6ZWRXaXphcmQgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmNsb3NlU2V0dGluZ3MoKTtcbiAgICAgICAgICBpZiAoc2l0ZSkgYXdhaXQgdGhpcy5wbHVnaW4uZG9QdWJsaXNoKCk7XG4gICAgICAgICAgZWxzZSBhd2FpdCB0aGlzLnBsdWdpbi5kb0JhY2t1cChmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICAvLyBcdTI1MDBcdTI1MDBcdTI1MDAgTWFuYWdlIHBhbmVsIChtdWx0aS1zaXRlKSBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcblxuICBwcml2YXRlIHJlbmRlck1hbmFnZVBhbmVsKGVsOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGNvbnN0IHMgPSB0aGlzLnBsdWdpbi5zZXR0aW5ncztcbiAgICAvLyBjb25zdCBzaXRlID0gdGhpcy5wbHVnaW4uZ2V0QWN0aXZlU2l0ZSgpO1xuXG4gICAgY29uc3Qgb3B0c1NldHRpbmcgPSBuZXcgU2V0dGluZyhlbCk7XG4gICAgb3B0c1NldHRpbmcuc2V0TmFtZSgnT3B0aW9ucycpO1xuICAgIG9wdHNTZXR0aW5nLnNldEhlYWRpbmcoKTtcblxuICAgIG5ldyBTZXR0aW5nKGVsKVxuICAgICAgLnNldE5hbWUoJ09wZW4gcGFuZWwgaW4nKVxuICAgICAgLnNldERlc2MoJ1doZXJlIHRoZSBOb3RlRmxhcmUgcGFuZWwgc2hvdWxkIG9wZW4gYnkgZGVmYXVsdCB3aGVuIGNsaWNraW5nIHRoZSByaWJib24gaWNvbiBvciBydW5uaW5nIHRoZSBjb21tYW5kLicpXG4gICAgICAuYWRkRHJvcGRvd24oZCA9PiB7XG4gICAgICAgIGQuYWRkT3B0aW9uKCdsZWZ0JywgJ0xlZnQgc2lkZWJhcicpO1xuICAgICAgICBkLmFkZE9wdGlvbigncmlnaHQnLCAnUmlnaHQgc2lkZWJhcicpO1xuICAgICAgICBkLmFkZE9wdGlvbigndGFiJywgJ01haW4gd29ya3NwYWNlIHRhYicpO1xuICAgICAgICBkLnNldFZhbHVlKHMuZGVmYXVsdFZpZXdMb2NhdGlvbiA/PyAnbGVmdCcpO1xuICAgICAgICBkLm9uQ2hhbmdlKGFzeW5jIHYgPT4ge1xuICAgICAgICAgIHMuZGVmYXVsdFZpZXdMb2NhdGlvbiA9IHYgYXMgJ2xlZnQnIHwgJ3JpZ2h0JyB8ICd0YWInO1xuICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoZWwpLnNldE5hbWUoJ0ZlYXR1cmVzJykuc2V0SGVhZGluZygpO1xuICAgIG5ldyBTZXR0aW5nKGVsKVxuICAgICAgLnNldE5hbWUoJ1B1Ymxpc2ggYSB3ZWJzaXRlJylcbiAgICAgIC5zZXREZXNjKCdLZWVwIG9uZS1jbGljayBwdWJsaXNoaW5nIGF2YWlsYWJsZSBpbiB0aGUgTm90ZUZsYXJlIHBhbmVsLicpXG4gICAgICAuYWRkVG9nZ2xlKHRvZ2dsZSA9PiB7XG4gICAgICAgIHRvZ2dsZS5zZXRWYWx1ZShzLmVuYWJsZVB1Ymxpc2gpO1xuICAgICAgICB0b2dnbGUub25DaGFuZ2UoYXN5bmMgdmFsdWUgPT4ge1xuICAgICAgICAgIHMuZW5hYmxlUHVibGlzaCA9IHZhbHVlO1xuICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhlbClcbiAgICAgIC5zZXROYW1lKCdBdXRvbWF0aWMgcHJpdmF0ZSBiYWNrdXAnKVxuICAgICAgLnNldERlc2MoJ1Byb3RlY3QgeW91ciB2YXVsdCBpbiB0aGUgYmFja2dyb3VuZCB3aXRob3V0IG1hbnVhbCB2ZXJzaW9uLWNvbnRyb2wgc3RlcHMuJylcbiAgICAgIC5hZGRUb2dnbGUodG9nZ2xlID0+IHtcbiAgICAgICAgdG9nZ2xlLnNldFZhbHVlKHMuZW5hYmxlQmFja3VwKTtcbiAgICAgICAgdG9nZ2xlLm9uQ2hhbmdlKGFzeW5jIHZhbHVlID0+IHtcbiAgICAgICAgICBzLmVuYWJsZUJhY2t1cCA9IHZhbHVlO1xuICAgICAgICAgIGlmICh2YWx1ZSAmJiAhcy5iYWNrdXAucmVwb3NpdG9yeSkge1xuICAgICAgICAgICAgcy5iYWNrdXAucmVwb3NpdG9yeSA9IHRoaXMucGx1Z2luLmRlZmF1bHRCYWNrdXBSZXBvc2l0b3J5KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICBpZiAocy5lbmFibGVCYWNrdXApIHtcbiAgICAgIG5ldyBTZXR0aW5nKGVsKS5zZXROYW1lKCdCYWNrdXAnKS5zZXRIZWFkaW5nKCk7XG5cblxuXG4gICAgICBuZXcgU2V0dGluZyhlbClcbiAgICAgICAgLnNldE5hbWUoJ0FmdGVyIGNoYW5nZXMnKVxuICAgICAgICAuc2V0RGVzYygnUnVuIGEgYmFja3VwIDMwIHNlY29uZHMgYWZ0ZXIgdmF1bHQgZmlsZXMgY2hhbmdlLicpXG4gICAgICAgIC5hZGRUb2dnbGUodG9nZ2xlID0+IHtcbiAgICAgICAgICB0b2dnbGUuc2V0VmFsdWUocy5iYWNrdXAuYmFja3VwT25DaGFuZ2UpO1xuICAgICAgICAgIHRvZ2dsZS5vbkNoYW5nZShhc3luYyB2YWx1ZSA9PiB7XG4gICAgICAgICAgICBzLmJhY2t1cC5iYWNrdXBPbkNoYW5nZSA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICBuZXcgU2V0dGluZyhlbClcbiAgICAgICAgLnNldE5hbWUoJ1NjaGVkdWxlJylcbiAgICAgICAgLnNldERlc2MoJ1BlcmlvZGljIGJhY2t1cHMgcnVuIHdoaWxlIE9ic2lkaWFuIGlzIG9wZW4uJylcbiAgICAgICAgLmFkZERyb3Bkb3duKGRyb3Bkb3duID0+IHtcbiAgICAgICAgICBkcm9wZG93bi5hZGRPcHRpb24oJzAnLCAnT2ZmJyk7XG4gICAgICAgICAgZHJvcGRvd24uYWRkT3B0aW9uKCcxNScsICdFdmVyeSAxNSBtaW51dGVzJyk7XG4gICAgICAgICAgZHJvcGRvd24uYWRkT3B0aW9uKCczMCcsICdFdmVyeSAzMCBtaW51dGVzJyk7XG4gICAgICAgICAgZHJvcGRvd24uYWRkT3B0aW9uKCc2MCcsICdFdmVyeSBob3VyJyk7XG4gICAgICAgICAgZHJvcGRvd24uYWRkT3B0aW9uKCczNjAnLCAnRXZlcnkgNiBob3VycycpO1xuICAgICAgICAgIGRyb3Bkb3duLmFkZE9wdGlvbignMTQ0MCcsICdEYWlseScpO1xuICAgICAgICAgIGRyb3Bkb3duLnNldFZhbHVlKFN0cmluZyhzLmJhY2t1cC5pbnRlcnZhbE1pbnV0ZXMpKTtcbiAgICAgICAgICBkcm9wZG93bi5vbkNoYW5nZShhc3luYyB2YWx1ZSA9PiB7XG4gICAgICAgICAgICBzLmJhY2t1cC5pbnRlcnZhbE1pbnV0ZXMgPSBOdW1iZXIodmFsdWUpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICBjb25zdCBiYWNrdXBTdGF0dXMgPSBzLmJhY2t1cC5sYXN0QmFja3VwRXJyb3JcbiAgICAgICAgPyBgTmVlZHMgYXR0ZW50aW9uOiAke3MuYmFja3VwLmxhc3RCYWNrdXBFcnJvcn1gXG4gICAgICAgIDogcy5iYWNrdXAubGFzdEJhY2t1cEF0XG4gICAgICAgICAgPyBgTGFzdCBiYWNrdXA6ICR7bmV3IERhdGUocy5iYWNrdXAubGFzdEJhY2t1cEF0KS50b0xvY2FsZVN0cmluZygpfWBcbiAgICAgICAgICA6ICdZb3VyIGZpcnN0IGJhY2t1cCBoYXMgbm90IHJ1biB5ZXQuJztcbiAgICAgIG5ldyBTZXR0aW5nKGVsKVxuICAgICAgICAuc2V0TmFtZSgnQmFja3VwIHN0YXR1cycpXG4gICAgICAgIC5zZXREZXNjKGJhY2t1cFN0YXR1cylcbiAgICAgICAgLmFkZEJ1dHRvbihidXR0b24gPT4ge1xuICAgICAgICAgIGJ1dHRvbi5zZXRCdXR0b25UZXh0KCdCYWNrIHVwIG5vdycpLnNldEN0YSgpO1xuICAgICAgICAgIGJ1dHRvbi5vbkNsaWNrKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGJ1dHRvbi5zZXREaXNhYmxlZCh0cnVlKS5zZXRCdXR0b25UZXh0KCdCYWNraW5nIHVwXHUyMDI2Jyk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5kb0JhY2t1cChmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXMuZW5hYmxlUHVibGlzaCkge1xuICAgICAgdGhpcy5yZW5kZXJEYW5nZXJab25lKGVsKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBcdTI1MDBcdTI1MDAgR2xvYmFsIENvbmZpZyBcdTI1MDBcdTI1MDBcbiAgICBuZXcgU2V0dGluZyhlbCkuc2V0TmFtZSgnR2xvYmFsIENvbmZpZ3VyYXRpb24nKS5zZXRIZWFkaW5nKCk7XG4gICAgbmV3IFNldHRpbmcoZWwpXG4gICAgICAuc2V0TmFtZSgnTWFzdGVyIFJlcG9zaXRvcnknKVxuICAgICAgLnNldERlc2MoYEdpdEh1YiByZXBvc2l0b3J5IHRvIGhvc3QgYWxsIHlvdXIgc2l0ZXM6ICR7cy5naXRodWJPd25lcn0vJHtzLm1hc3RlclJlcG9zaXRvcnkgfHwgJ25vdGVmbGFyZS1zaXRlcyd9YClcbiAgICAgIC5hZGRUZXh0KHQgPT4ge1xuICAgICAgICB0LnNldFBsYWNlaG9sZGVyKCdub3RlZmxhcmUtc2l0ZXMnKTtcbiAgICAgICAgdC5zZXRWYWx1ZShzLm1hc3RlclJlcG9zaXRvcnkgfHwgJ25vdGVmbGFyZS1zaXRlcycpO1xuICAgICAgICB0Lm9uQ2hhbmdlKGFzeW5jIHYgPT4ge1xuICAgICAgICAgIHMubWFzdGVyUmVwb3NpdG9yeSA9IHYudHJpbSgpO1xuICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgLy8gXHUyNTAwXHUyNTAwIFNpdGVzIExpc3QgXHUyNTAwXHUyNTAwXG4gICAgbmV3IFNldHRpbmcoZWwpLnNldE5hbWUoJ1lvdXIgU2l0ZXMnKS5zZXRIZWFkaW5nKCk7XG4gICAgXG4gICAgaWYgKHMuc2l0ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBlbC5jcmVhdGVFbCgncCcsIHsgY2xzOiAnc2V0dGluZy1pdGVtLWRlc2NyaXB0aW9uJywgdGV4dDogJ05vIHNpdGVzIHlldCBcdTIwMTQgYWRkIG9uZSB0byBnZXQgc3RhcnRlZC4nIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGNvbnN0IHNpdGUgb2Ygcy5zaXRlcykge1xuICAgICAgICBjb25zdCBpc0xpdmUgPSBzaXRlLmlzUHVibGlzaGVkO1xuICAgICAgICBjb25zdCBzdGF0dXNUZXh0ID0gc2l0ZS5sYXN0UHVibGlzaGVkXG4gICAgICAgICAgICA/IGBMYXN0IHB1Ymxpc2hlZCAke25ldyBEYXRlKHNpdGUubGFzdFB1Ymxpc2hlZCkudG9Mb2NhbGVTdHJpbmcoKX0gXHUwMEI3ICR7c2l0ZS5sYXN0Tm90ZUNvdW50fSBub3Rlc2BcbiAgICAgICAgICAgIDogJ05vdCBwdWJsaXNoZWQgeWV0JztcbiAgICAgICAgICAgIFxuICAgICAgICBjb25zdCBzaXRlU2V0dGluZyA9IG5ldyBTZXR0aW5nKGVsKVxuICAgICAgICAgIC5zZXROYW1lKHNpdGUubmFtZSB8fCBzaXRlLmNsb3VkZmxhcmVQcm9qZWN0IHx8ICdTaXRlJylcbiAgICAgICAgICAuc2V0RGVzYyhgJHtpc0xpdmUgPyAnXHVEODNEXHVERkUyIExpdmUnIDogJ1x1MjZBQSBPZmZsaW5lJ30gXHUyMDE0ICR7c3RhdHVzVGV4dH1gKTtcblxuICAgICAgICBpZiAoc2l0ZS5zaXRlVXJsKSB7XG4gICAgICAgICAgc2l0ZVNldHRpbmcuYWRkRXh0cmFCdXR0b24oYiA9PlxuICAgICAgICAgICAgYi5zZXRJY29uKCdleHRlcm5hbC1saW5rJykuc2V0VG9vbHRpcCgnT3BlbiBzaXRlJykub25DbGljaygoKSA9PiB7XG4gICAgICAgICAgICAgIHdpbmRvdy5vcGVuKGBodHRwczovLyR7c2l0ZS5zaXRlVXJsfWAsICdfYmxhbmsnKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHNpdGVTZXR0aW5nLmFkZEJ1dHRvbihiID0+IFxuICAgICAgICAgIGIuc2V0QnV0dG9uVGV4dCgnRWRpdCcpLm9uQ2xpY2soKCkgPT4ge1xuICAgICAgICAgICAgbmV3IEVkaXRTaXRlTW9kYWwodGhpcy5hcHAsIHRoaXMucGx1Z2luLCBzaXRlLCAoKSA9PiB0aGlzLnJlbmRlcigpKS5vcGVuKCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgICAgXG4gICAgICAgIHNpdGVTZXR0aW5nLmFkZEJ1dHRvbihiID0+XG4gICAgICAgICAgYi5zZXRCdXR0b25UZXh0KCdSZW1vdmUnKS5zZXREZXN0cnVjdGl2ZSgpLm9uQ2xpY2soKCkgPT4ge1xuICAgICAgICAgICAgbmV3IFJlbW92ZVNpdGVNb2RhbCh0aGlzLmFwcCwgdGhpcy5wbHVnaW4sIHNpdGUsICgpID0+IHRoaXMucmVuZGVyKCkpLm9wZW4oKTtcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIG5ldyBTZXR0aW5nKGVsKVxuICAgICAgLmFkZEJ1dHRvbihiID0+IGIuc2V0QnV0dG9uVGV4dCgnQWRkIHNpdGUnKS5zZXRDdGEoKS5vbkNsaWNrKCgpID0+IHtcbiAgICAgICAgbmV3IEFkZFNpdGVNb2RhbCh0aGlzLmFwcCwgdGhpcy5wbHVnaW4sICgpID0+IHRoaXMucmVuZGVyKCkpLm9wZW4oKTtcbiAgICAgIH0pKTtcblxuICAgIHRoaXMucmVuZGVyRGFuZ2VyWm9uZShlbCk7XG4gIH1cblxuICBwcml2YXRlIHJlbmRlckRhbmdlclpvbmUoZWw6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgbmV3IFNldHRpbmcoZWwpLnNldE5hbWUoJ0RhbmdlciB6b25lJykuc2V0SGVhZGluZygpO1xuICAgIG5ldyBTZXR0aW5nKGVsKVxuICAgICAgLnNldE5hbWUoJ1Jlc2V0IE5vdGVGbGFyZScpXG4gICAgICAuc2V0RGVzYygnQ2xlYXJzIGFsbCBOb3RlRmxhcmUgc2V0dGluZ3MgKHRva2VucyArIGV2ZXJ5IHNpdGUpIGFuZCByZXN0YXJ0cyBzZXR1cC4gWW91ciBHaXRIdWIgcmVwb3MgYW5kIENsb3VkZmxhcmUgcHJvamVjdHMgYXJlIE5PVCBkZWxldGVkLicpXG4gICAgICAuYWRkQnV0dG9uKGIgPT4ge1xuICAgICAgICBiLnNldEJ1dHRvblRleHQoJ1Jlc2V0Jykuc2V0RGVzdHJ1Y3RpdmUoKTtcbiAgICAgICAgYi5vbkNsaWNrKCgpID0+IG5ldyBSZXNldE1vZGFsKHRoaXMuYXBwLCB0aGlzLnBsdWdpbiwgKCkgPT4ge1xuICAgICAgICAgIHRoaXMud2l6YXJkU3RlcCA9ICdnaXRodWInO1xuICAgICAgICAgIHRoaXMucGVuZGluZ05hbWUgPSAnJztcbiAgICAgICAgICB0aGlzLnBlbmRpbmdTY29wZSA9ICd2YXVsdCc7XG4gICAgICAgICAgdGhpcy5wZW5kaW5nUGF0aHMgPSBbXTtcbiAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9KS5vcGVuKCkpO1xuICAgICAgfSk7XG4gIH1cblxuICAvLyBcdTI1MDBcdTI1MDBcdTI1MDAgSGVscGVycyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcblxuICBwcml2YXRlIHJlbmRlcldpemFyZEhlYWRlcihjb250YWluZXI6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudCA9IHRoaXMud2l6YXJkU3RlcCA9PT0gJ2dpdGh1YidcbiAgICAgID8gMVxuICAgICAgOiB0aGlzLndpemFyZFN0ZXAgPT09ICdtb2RlJ1xuICAgICAgICA/IDJcbiAgICAgICAgOiB0aGlzLndpemFyZFN0ZXAgPT09ICdkb25lJ1xuICAgICAgICAgID8gNFxuICAgICAgICAgIDogMztcbiAgICBjb25zdCBsYWJlbHMgPSBbJ0Nvbm5lY3QnLCAnQ2hvb3NlJywgJ0NvbmZpZ3VyZScsICdSZWFkeSddO1xuICAgIFxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lcilcbiAgICAgIC5zZXROYW1lKGBTZXR1cDogU3RlcCAke2N1cnJlbnR9IG9mIDQgXHUyMDE0ICR7bGFiZWxzW2N1cnJlbnQgLSAxXX1gKVxuICAgICAgLnNldEhlYWRpbmcoKTtcbiAgICAgIFxuICAgIGNvbnRhaW5lci5jcmVhdGVFbCgncCcsIHtcbiAgICAgIHRleHQ6ICdQdWJsaXNoIHBvbGlzaGVkIG5vdGUgc2l0ZXMgYW5kIGtlZXAgeW91ciB2YXVsdCBwcm90ZWN0ZWQgZnJvbSBvbmUgZm9jdXNlZCB3b3Jrc3BhY2UuJyxcbiAgICAgIGNsczogJ3NldHRpbmctaXRlbS1kZXNjcmlwdGlvbicsXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUVycm9yRWwoY29udGFpbmVyOiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICBjb25zdCBlbCA9IGNvbnRhaW5lci5jcmVhdGVFbCgncCcsIHsgY2xzOiAnc2V0dGluZy1pdGVtLWRlc2NyaXB0aW9uJyB9KTtcbiAgICBlbC5zZXRDc3NTdHlsZXMoeyBjb2xvcjogJ3ZhcigtLXRleHQtZXJyb3IpJyB9KTtcbiAgICBlbC5oaWRlKCk7XG4gICAgcmV0dXJuIGVsO1xuICB9XG5cbiAgcHJpdmF0ZSBzaG93RXJyb3IoZWw6IEhUTUxFbGVtZW50LCBtc2c6IHN0cmluZyk6IHZvaWQge1xuICAgIGVsLnNldFRleHQobXNnKTtcbiAgICBlbC5zaG93KCk7XG4gIH1cblxuICBwcml2YXRlIGhpZGVFcnJvcihlbDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBlbC5oaWRlKCk7XG4gIH1cblxuICBwcml2YXRlIGJ1c3koYnRuOiBCdXR0b25Db21wb25lbnQsIGxhYmVsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBidG4uc2V0RGlzYWJsZWQodHJ1ZSkuc2V0QnV0dG9uVGV4dChsYWJlbCk7XG4gIH1cblxuICBwcml2YXRlIGlkbGUoYnRuOiBCdXR0b25Db21wb25lbnQsIGxhYmVsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBidG4uc2V0RGlzYWJsZWQoZmFsc2UpLnNldEJ1dHRvblRleHQobGFiZWwpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRJbml0aWFsV2l6YXJkU3RlcCgpOiBTZXR1cFN0ZXAge1xuICAgIGNvbnN0IHMgPSB0aGlzLnBsdWdpbi5zZXR0aW5ncztcbiAgICBpZiAocy5naXRodWJUb2tlbiAmJiBzLmdpdGh1Yk93bmVyKSByZXR1cm4gJ21vZGUnO1xuICAgIHJldHVybiAnZ2l0aHViJztcbiAgfVxuXG4gIHByaXZhdGUgY2xvc2VTZXR0aW5ncygpOiB2b2lkIHtcbiAgICBjb25zdCBzZXR0aW5nID0gKCh0aGlzLmFwcCBhcyB1bmtub3duKSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikuc2V0dGluZyBhc1xuICAgICAgfCB7IGNsb3NlPzogKCkgPT4gdm9pZCB9XG4gICAgICB8IHVuZGVmaW5lZDtcbiAgICBzZXR0aW5nPy5jbG9zZT8uKCk7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBBcHAsIE1vZGFsLCBOb3RpY2UsIFNldHRpbmcsIFRGb2xkZXIgfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgeyBHaXRIdWJBcGkgfSBmcm9tICcuLi8uLi9hcGkvZ2l0aHViQXBpJztcbmltcG9ydCB7IENsb3VkZmxhcmVBcGkgfSBmcm9tICcuLi8uLi9hcGkvY2xvdWRmbGFyZUFwaSc7XG5pbXBvcnQgeyBERUZBVUxUX1NFVFRJTkdTLCBjcmVhdGVTaXRlUHJvZmlsZSB9IGZyb20gJy4uLy4uL2NvcmUvc2V0dGluZ3MnO1xuaW1wb3J0IHsgU2l0ZVByb2ZpbGUgfSBmcm9tICcuLi8uLi9jb3JlL3R5cGVzJztcbmltcG9ydCB0eXBlIE5vdGVGbGFyZVBsdWdpbiBmcm9tICcuLi8uLi8uLi9tYWluJztcbmV4cG9ydCBmdW5jdGlvbiBidWlsZENsb3VkZmxhcmVUb2tlblVybCgpOiBzdHJpbmcge1xuICBjb25zdCBwZXJtcyA9IGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShbXG4gICAgeyBrZXk6ICdwYWdlJywgdHlwZTogJ2VkaXQnIH0sXG4gICAgeyBrZXk6ICd3b3JrZXJzX3NjcmlwdHMnLCB0eXBlOiAnZWRpdCcgfSxcbiAgICB7IGtleTogJ2FjY291bnRfc2V0dGluZ3MnLCB0eXBlOiAncmVhZCcgfSxcbiAgXSkpO1xuICByZXR1cm4gYGh0dHBzOi8vZGFzaC5jbG91ZGZsYXJlLmNvbS9wcm9maWxlL2FwaS10b2tlbnM/cGVybWlzc2lvbkdyb3VwS2V5cz0ke3Blcm1zfSZhY2NvdW50SWQ9KiZ6b25lSWQ9YWxsJm5hbWU9Tm90ZUZsYXJlYDtcbn1cblxuLyoqIE5vcm1hbGlzZSBhIHNpdGUgbmFtZSBpbnRvIGEgdmFsaWQgR2l0SHViIHJlcG8gLyBQYWdlcyBwcm9qZWN0IHNsdWcuICovXG5leHBvcnQgZnVuY3Rpb24gc2x1Z2lmeSh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHZhbHVlXG4gICAgLnRyaW0oKVxuICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgLnJlcGxhY2UoL1teYS16MC05LV0rL2csICctJylcbiAgICAucmVwbGFjZSgvXi0rfC0rJC9nLCAnJylcbiAgICAuc2xpY2UoMCwgNjApO1xufVxuXG4vKiogVHVybnMgYSByYXcgQ2xvdWRmbGFyZSBlcnJvciBpbnRvIGFuIGFjdGlvbmFibGUgc2V0dXAgbWVzc2FnZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbG91ZGZsYXJlU2V0dXBIaW50KHJhd01lc3NhZ2U6IHN0cmluZywgcmVwb1NsdWc6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IGxvd2VyID0gcmF3TWVzc2FnZS50b0xvd2VyQ2FzZSgpO1xuICBpZiAobG93ZXIuaW5jbHVkZXMoJ3JlamVjdGVkIHRoaXMgdG9rZW4nKSB8fCBsb3dlci5pbmNsdWRlcygncGVybWlzc2lvbicpIHx8IGxvd2VyLmluY2x1ZGVzKCdhdXRoZW50aWNhdGlvbicpKSB7XG4gICAgcmV0dXJuICdDbG91ZGZsYXJlIHJlamVjdGVkIHRoaXMgdG9rZW4uIE1ha2Ugc3VyZSBpdCBoYXMgdGhlIENsb3VkZmxhcmUgUGFnZXM6IEVkaXQgcGVybWlzc2lvbiwgdGhlbiB0cnkgYWdhaW4uJztcbiAgfVxuICByZXR1cm4gYENvdWxkbid0IGNyZWF0ZSB0aGUgUGFnZXMgcHJvamVjdC4gTW9zdCBsaWtlbHkgdGhlIENsb3VkZmxhcmUgR2l0SHViIEFwcCBpc24ndCBhdXRob3JpemVkIGZvciAke3JlcG9TbHVnfSB5ZXQgXHUyMDE0IHVzZSBcdTIwMUNBdXRob3JpemUgQ2xvdWRmbGFyZSBvbiBHaXRIdWJcdTIwMUQsIGdyYW50IGFjY2VzcyB0byB0aGF0IHJlcG8sIHRoZW4gdHJ5IGFnYWluLiAoQ2xvdWRmbGFyZSBzYWlkOiAke3Jhd01lc3NhZ2V9KWA7XG59XG5cbi8qKiBWYXVsdCBmb2xkZXJzIGZvciB0aGUgY29udGVudC1mb2xkZXIgcGlja2VyICgnJyA9IHdob2xlIHZhdWx0KS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb2xkZXJPcHRpb25zKGFwcDogQXBwKTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiB7XG4gIGNvbnN0IG9wdHM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7ICcnOiAnV2hvbGUgdmF1bHQnIH07XG4gIGZvciAoY29uc3QgZiBvZiBhcHAudmF1bHQuZ2V0QWxsTG9hZGVkRmlsZXMoKSkge1xuICAgIGlmIChmIGluc3RhbmNlb2YgVEZvbGRlciAmJiBmLnBhdGggJiYgZi5wYXRoICE9PSAnLycpIG9wdHNbZi5wYXRoXSA9IGYucGF0aDtcbiAgfVxuICByZXR1cm4gb3B0cztcbn1cblxuLyoqXG4gKiBFbmQtdG8tZW5kIHNpdGUgY3JlYXRpb24sIHNoYXJlZCBieSB0aGUgZmlyc3QtcnVuIHdpemFyZCBhbmQgdGhlIFwiQWRkIHNpdGVcIlxuICogbW9kYWw6IGNyZWF0ZSBhIGZyZXNoIEdpdEh1YiByZXBvLCB0aGVuIGEgQ2xvdWRmbGFyZSBQYWdlcyBwcm9qZWN0IHBvaW50ZWQgYXRcbiAqIGl0LiBUaGUgZmlyc3QgcHVibGlzaCBjb21taXRzIHRoZSB1c2VyJ3MgY29udGVudCBwbHVzIGEgbWRnYXJkZW5cbiAqIHBhY2thZ2UuanNvbi9jb25maWcsIHdoaWNoIENsb3VkZmxhcmUgYnVpbGRzIHdpdGggYG5weCBtZGdhcmRlbiBidWlsZGAuIFJldXNlc1xuICogdGhlIHNoYXJlZCBHaXRIdWIvQ2xvdWRmbGFyZSBjcmVkZW50aWFscyBhbHJlYWR5IG9uIHRoZSBwbHVnaW4gc2V0dGluZ3MuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwcm92aXNpb25TaXRlKFxuICBwbHVnaW46IE5vdGVGbGFyZVBsdWdpbixcbiAgbmFtZTogc3RyaW5nLFxuICBwcm9maWxlUGFyYW1zOiBQYXJ0aWFsPFNpdGVQcm9maWxlPixcbiAgZGVwbG95VGFyZ2V0OiAnY2xvdWRmbGFyZScgfCAnZ2l0aHViLWFjdGlvbnMnID0gJ2Nsb3VkZmxhcmUnLFxuKTogUHJvbWlzZTxTaXRlUHJvZmlsZT4ge1xuICBjb25zdCBzbHVnID0gc2x1Z2lmeShuYW1lKTtcbiAgaWYgKCFzbHVnKSB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBlbnRlciBhIHNpdGUgbmFtZS4nKTtcblxuICBjb25zdCBvd25lciA9IHBsdWdpbi5zZXR0aW5ncy5naXRodWJPd25lcjtcbiAgY29uc3QgcmVwbyA9IHBsdWdpbi5zZXR0aW5ncy5tYXN0ZXJSZXBvc2l0b3J5O1xuICBpZiAoIXJlcG8pIHRocm93IG5ldyBFcnJvcignUGxlYXNlIGNvbmZpZ3VyZSBhIE1hc3RlciBSZXBvc2l0b3J5IGluIHNldHRpbmdzIGZpcnN0LicpO1xuXG4gIGNvbnN0IHNpdGUgPSBjcmVhdGVTaXRlUHJvZmlsZSh7XG4gICAgbmFtZSxcbiAgICBkZXBsb3lUYXJnZXQsXG4gICAgLi4ucHJvZmlsZVBhcmFtcyxcbiAgfSk7XG5cbiAgY29uc3QgZ2ggPSBuZXcgR2l0SHViQXBpKHBsdWdpbi5zZXR0aW5ncy5naXRodWJUb2tlbiwgb3duZXIsIHJlcG8pO1xuICBhd2FpdCBnaC5jcmVhdGVSZXBvKCk7XG4gIGlmICghKGF3YWl0IGdoLndhaXRGb3JSZXBvKDMwMDAwKSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlcG9zaXRvcnkgY3JlYXRpb24gdGltZWQgb3V0IFx1MjAxNCBwbGVhc2UgdHJ5IGFnYWluLicpO1xuICB9XG5cbiAgbGV0IGJyYW5jaCA9ICdtYWluJztcbiAgdHJ5IHtcbiAgICBicmFuY2ggPSBhd2FpdCBnaC5nZXREZWZhdWx0QnJhbmNoKCk7XG4gIH0gY2F0Y2gge1xuICAgIC8vIEtlZXAgdGhlIGJyYW5jaC5cbiAgfVxuICBzaXRlLmdpdGh1YkJyYW5jaCA9IGJyYW5jaDtcblxuICBsZXQgc2l0ZVVybCA9ICcnO1xuXG4gIGlmIChkZXBsb3lUYXJnZXQgPT09ICdjbG91ZGZsYXJlJykge1xuICAgIGNvbnN0IGNmID0gbmV3IENsb3VkZmxhcmVBcGkocGx1Z2luLnNldHRpbmdzLmNsb3VkZmxhcmVUb2tlbiwgcGx1Z2luLnNldHRpbmdzLmNsb3VkZmxhcmVBY2NvdW50KTtcbiAgICBjb25zdCByb290RGlyID0gYHNpdGVzLyR7c2l0ZS5pZH1gO1xuICAgIC8vIE1ha2UgcHJvamVjdCBuYW1lIHVuaXF1ZSBzaW5jZSBtdWx0aXBsZSBzaXRlcyBzaGFyZSB0aGUgc2FtZSByZXBvXG4gICAgY29uc3QgcHJvamVjdE5hbWUgPSBzbHVnaWZ5KGAke3JlcG99LSR7c2x1Z31gKTtcbiAgICB0cnkge1xuICAgICAgc2l0ZVVybCA9IGF3YWl0IGNmLmNyZWF0ZVByb2plY3QocHJvamVjdE5hbWUsIG93bmVyLCByZXBvLCBicmFuY2gsIHJvb3REaXIpO1xuICAgICAgc2l0ZS5jbG91ZGZsYXJlUHJvamVjdCA9IHByb2plY3ROYW1lO1xuICAgIH0gY2F0Y2ggKGNyZWF0ZUVycjogdW5rbm93bikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgc2l0ZVVybCA9IGF3YWl0IGNmLmdldFByb2plY3QocHJvamVjdE5hbWUpO1xuICAgICAgICBzaXRlLmNsb3VkZmxhcmVQcm9qZWN0ID0gcHJvamVjdE5hbWU7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGNsb3VkZmxhcmVTZXR1cEhpbnQoKGNyZWF0ZUVyciBhcyBFcnJvcikubWVzc2FnZSwgYCR7b3duZXJ9LyR7cmVwb31gKSk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEdpdEh1YiBBY3Rpb25zOiBzaXRlIFVSTCB3aWxsIGJlIGdpdGh1Yi5pbyBhZnRlciBmaXJzdCBHSCBQYWdlcyBidWlsZC5cbiAgICBzaXRlVXJsID0gYCR7b3duZXJ9LmdpdGh1Yi5pby8ke3JlcG99YDtcbiAgfVxuXG4gIHNpdGUuc2l0ZVVybCA9IHNpdGVVcmw7XG4gIHJldHVybiBzaXRlO1xufVxuXG4vLyBcdTI1MDBcdTI1MDBcdTI1MDAgTW9kYWxzIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuXG4vKiogQ3JlYXRlIGFuIGFkZGl0aW9uYWwgc2l0ZSwgcmV1c2luZyB0aGUgYWxyZWFkeS1jb25uZWN0ZWQgY3JlZGVudGlhbHMuICovXG4vKiogQ3JlYXRlIGFuIGFkZGl0aW9uYWwgc2l0ZSwgcmV1c2luZyB0aGUgYWxyZWFkeS1jb25uZWN0ZWQgY3JlZGVudGlhbHMuICovXG5leHBvcnQgY2xhc3MgQWRkU2l0ZU1vZGFsIGV4dGVuZHMgTW9kYWwge1xuICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcHJpdmF0ZSBwbHVnaW46IE5vdGVGbGFyZVBsdWdpbiwgcHJpdmF0ZSBvbkRvbmU6ICgpID0+IHZvaWQpIHtcbiAgICBzdXBlcihhcHApO1xuICB9XG5cbiAgb25PcGVuKCk6IHZvaWQge1xuICAgIHRoaXMudGl0bGVFbC5zZXRUZXh0KCdBZGQgYSBzaXRlJyk7XG4gICAgbGV0IG5hbWUgPSAnJztcbiAgICBsZXQgc2NvcGU6ICd2YXVsdCcgfCAnc2VsZWN0ZWQnID0gJ3ZhdWx0JztcbiAgICBsZXQgcGF0aHM6IHN0cmluZ1tdID0gW107XG4gICAgbGV0IGF1dGhvck5hbWUgPSAnJztcbiAgICBsZXQgc2lkZWJhclRpdGxlID0gJyc7XG4gICAgbGV0IHNpdGVEZXNjcmlwdGlvbiA9ICcnO1xuXG4gICAgbmV3IFNldHRpbmcodGhpcy5jb250ZW50RWwpXG4gICAgICAuc2V0TmFtZSgnU2l0ZSBuYW1lJylcbiAgICAgIC5zZXREZXNjKCdBIG5ldyBHaXRIdWIgcmVwbyArIENsb3VkZmxhcmUgcHJvamVjdCB3aXRoIHRoaXMgbmFtZS4nKVxuICAgICAgLmFkZFRleHQodCA9PiB7XG4gICAgICAgIHQuc2V0UGxhY2Vob2xkZXIoJ215LWJsb2cnKTtcbiAgICAgICAgdC5vbkNoYW5nZSh2ID0+IHsgbmFtZSA9IHY7IH0pO1xuICAgICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbClcbiAgICAgIC5zZXROYW1lKCdQdWJsaXNoIHNjb3BlJylcbiAgICAgIC5zZXREZXNjKCdDb25maWd1cmUgd2hhdCB0byBwdWJsaXNoOiB0aGUgZW50aXJlIHZhdWx0IG9yIHNlbGVjdGVkIGZpbGVzL2ZvbGRlcnMuJylcbiAgICAgIC5hZGREcm9wZG93bihkID0+IHtcbiAgICAgICAgZC5hZGRPcHRpb24oJ3ZhdWx0JywgJ0Z1bGwgVmF1bHQnKTtcbiAgICAgICAgZC5hZGRPcHRpb24oJ3NlbGVjdGVkJywgJ1NlbGVjdGVkIEZpbGVzL0ZvbGRlcnMnKTtcbiAgICAgICAgZC5zZXRWYWx1ZSgndmF1bHQnKTtcbiAgICAgICAgZC5vbkNoYW5nZSh2ID0+IHtcbiAgICAgICAgICBzY29wZSA9IHYgYXMgJ3ZhdWx0JyB8ICdzZWxlY3RlZCc7XG4gICAgICAgICAgdXBkYXRlVmlzaWJpbGl0eSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgY29uc3QgcGF0aHNDb250YWluZXIgPSB0aGlzLmNvbnRlbnRFbC5jcmVhdGVEaXYoJ25vdGVmbGFyZS1wYXRocy1jb250YWluZXInKTtcbiAgICBcbiAgICBjb25zdCByZW5kZXJQYXRocyA9ICgpID0+IHtcbiAgICAgIHBhdGhzQ29udGFpbmVyLmVtcHR5KCk7XG4gICAgICBpZiAoc2NvcGUgPT09ICd2YXVsdCcpIHtcbiAgICAgICAgcGF0aHNDb250YWluZXIuc2V0Q3NzU3R5bGVzKHsgZGlzcGxheTogJ25vbmUnIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBwYXRoc0NvbnRhaW5lci5zZXRDc3NTdHlsZXMoeyBkaXNwbGF5OiAnYmxvY2snIH0pO1xuICAgICAgXG4gICAgICBpZiAocGF0aHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHBhdGhzQ29udGFpbmVyLmNyZWF0ZUVsKCdwJywgeyB0ZXh0OiAnTm8gZmlsZXMgb3IgZm9sZGVycyBzZWxlY3RlZC4nLCBjbHM6ICdub3RlZmxhcmUtbXV0ZWQnIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbGlzdCA9IHBhdGhzQ29udGFpbmVyLmNyZWF0ZUVsKCd1bCcsIHsgY2xzOiAnbm90ZWZsYXJlLXBhdGgtbGlzdCcgfSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBsaSA9IGxpc3QuY3JlYXRlRWwoJ2xpJyk7XG4gICAgICAgICAgbGkuc2V0Q3NzU3R5bGVzKHsgZGlzcGxheTogJ2ZsZXgnIH0pO1xuICAgICAgICAgIGxpLnNldENzc1N0eWxlcyh7IGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicgfSk7XG4gICAgICAgICAgbGkuc2V0Q3NzU3R5bGVzKHsgYWxpZ25JdGVtczogJ2NlbnRlcicgfSk7XG4gICAgICAgICAgbGkuc2V0Q3NzU3R5bGVzKHsgbWFyZ2luQm90dG9tOiAnNHB4JyB9KTtcbiAgICAgICAgICBcbiAgICAgICAgICBsaS5jcmVhdGVTcGFuKHsgdGV4dDogcGF0aHNbaV0gfSk7XG4gICAgICAgICAgY29uc3QgcmVtb3ZlQnRuID0gbGkuY3JlYXRlRWwoJ2J1dHRvbicsIHsgdGV4dDogJ1x1MjcxNScgfSk7XG4gICAgICAgICAgcmVtb3ZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgcGF0aHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgcmVuZGVyUGF0aHMoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBhZGRSb3cgPSBwYXRoc0NvbnRhaW5lci5jcmVhdGVEaXYoJ25vdGVmbGFyZS1hZGQtcGF0aC1yb3cnKTtcbiAgICAgIGFkZFJvdy5zZXRDc3NTdHlsZXMoeyBtYXJnaW5Ub3A6ICc4cHgnIH0pO1xuICAgICAgXG4gICAgICBjb25zdCBhZGRCdG4gPSBhZGRSb3cuY3JlYXRlRWwoJ2J1dHRvbicsIHsgdGV4dDogJ0Jyb3dzZSBWYXVsdC4uLicgfSk7XG4gICAgICBhZGRCdG4uc2V0Q3NzU3R5bGVzKHsgd2lkdGg6ICcxMDAlJyB9KTtcbiAgICAgIGFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgbmV3IFBhdGhTdWdnZXN0TW9kYWwodGhpcy5hcHAsIChzZWxlY3RlZFBhdGgpID0+IHtcbiAgICAgICAgICBpZiAoc2VsZWN0ZWRQYXRoLnRyaW0oKSAmJiAhcGF0aHMuaW5jbHVkZXMoc2VsZWN0ZWRQYXRoLnRyaW0oKSkpIHtcbiAgICAgICAgICAgIHBhdGhzLnB1c2goc2VsZWN0ZWRQYXRoLnRyaW0oKSk7XG4gICAgICAgICAgICByZW5kZXJQYXRocygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkub3BlbigpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IHVwZGF0ZVZpc2liaWxpdHkgPSAoKSA9PiB7XG4gICAgICByZW5kZXJQYXRocygpO1xuICAgIH07XG5cbiAgICBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbClcbiAgICAgIC5zZXROYW1lKCdBdXRob3IgbmFtZScpXG4gICAgICAuc2V0RGVzYygnQXV0aG9yIG5hbWUgd3JpdHRlbiB0byBzaXRlIG1ldGFkYXRhIChvcHRpb25hbCkuJylcbiAgICAgIC5hZGRUZXh0KHQgPT4ge1xuICAgICAgICB0LnNldFBsYWNlaG9sZGVyKCdZb3VyIE5hbWUnKTtcbiAgICAgICAgdC5vbkNoYW5nZSh2ID0+IHsgYXV0aG9yTmFtZSA9IHYudHJpbSgpOyB9KTtcbiAgICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcodGhpcy5jb250ZW50RWwpXG4gICAgICAuc2V0TmFtZSgnU2lkZWJhciB0aXRsZScpXG4gICAgICAuc2V0RGVzYygnVGl0bGUgc2hvd24gaW4gdGhlIHNpZGViYXIgKG9wdGlvbmFsLCBkZWZhdWx0cyB0byBzaXRlIG5hbWUpLicpXG4gICAgICAuYWRkVGV4dCh0ID0+IHtcbiAgICAgICAgdC5zZXRQbGFjZWhvbGRlcignTXkgRGlnaXRhbCBHYXJkZW4nKTtcbiAgICAgICAgdC5vbkNoYW5nZSh2ID0+IHsgc2lkZWJhclRpdGxlID0gdi50cmltKCk7IH0pO1xuICAgICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbClcbiAgICAgIC5zZXROYW1lKCdTaXRlIGRlc2NyaXB0aW9uJylcbiAgICAgIC5zZXREZXNjKCdEZXNjcmlwdGlvbiBvZiB5b3VyIHNpdGUgKG9wdGlvbmFsKS4nKVxuICAgICAgLmFkZFRleHQodCA9PiB7XG4gICAgICAgIHQuc2V0UGxhY2Vob2xkZXIoJ05vdGVzIGFuZCB0aG91Z2h0c1x1MjAyNicpO1xuICAgICAgICB0Lm9uQ2hhbmdlKHYgPT4geyBzaXRlRGVzY3JpcHRpb24gPSB2LnRyaW0oKTsgfSk7XG4gICAgICB9KTtcblxuICAgIHVwZGF0ZVZpc2liaWxpdHkoKTtcblxuICAgIGNvbnN0IGVycm9yRWwgPSB0aGlzLmNvbnRlbnRFbC5jcmVhdGVFbCgncCcsIHsgY2xzOiAnc2V0dGluZy1pdGVtLWRlc2NyaXB0aW9uJyB9KTtcbiAgICBlcnJvckVsLnNldENzc1N0eWxlcyh7IGNvbG9yOiAndmFyKC0tdGV4dC1lcnJvciknIH0pO1xuICAgIGVycm9yRWwuaGlkZSgpO1xuXG4gICAgbmV3IFNldHRpbmcodGhpcy5jb250ZW50RWwpXG4gICAgICAuYWRkQnV0dG9uKGIgPT4gYi5zZXRCdXR0b25UZXh0KCdDYW5jZWwnKS5vbkNsaWNrKCgpID0+IHRoaXMuY2xvc2UoKSkpXG4gICAgICAuYWRkQnV0dG9uKGIgPT5cbiAgICAgICAgYi5zZXRCdXR0b25UZXh0KCdDcmVhdGUgc2l0ZScpLnNldEN0YSgpLm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGlmICghc2x1Z2lmeShuYW1lKSkge1xuICAgICAgICAgICAgZXJyb3JFbC5zZXRUZXh0KCdQbGVhc2UgZW50ZXIgYSBzaXRlIG5hbWUuJyk7XG4gICAgICAgICAgICBlcnJvckVsLnNob3coKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZXJyb3JFbC5oaWRlKCk7XG4gICAgICAgICAgYi5zZXREaXNhYmxlZCh0cnVlKS5zZXRCdXR0b25UZXh0KCdDcmVhdGluZ1x1MjAyNicpO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBzaXRlID0gYXdhaXQgcHJvdmlzaW9uU2l0ZSh0aGlzLnBsdWdpbiwgbmFtZSwge1xuICAgICAgICAgICAgICBwdWJsaXNoU2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgICBwdWJsaXNoUGF0aHM6IHBhdGhzLFxuICAgICAgICAgICAgICBhdXRob3JOYW1lLFxuICAgICAgICAgICAgICBzaWRlYmFyVGl0bGUsXG4gICAgICAgICAgICAgIHNpdGVEZXNjcmlwdGlvbixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Muc2l0ZXMucHVzaChzaXRlKTtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmFjdGl2ZVNpdGVJZCA9IHNpdGUuaWQ7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIG5ldyBOb3RpY2UoYFNpdGUgXHUyMDFDJHtzaXRlLm5hbWV9XHUyMDFEIGNyZWF0ZWQuYCk7XG4gICAgICAgICAgICB0aGlzLm9uRG9uZSgpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycjogdW5rbm93bikge1xuICAgICAgICAgICAgZXJyb3JFbC5zZXRUZXh0KChlcnIgYXMgRXJyb3IpLm1lc3NhZ2UpO1xuICAgICAgICAgICAgZXJyb3JFbC5zaG93KCk7XG4gICAgICAgICAgICBiLnNldERpc2FibGVkKGZhbHNlKS5zZXRCdXR0b25UZXh0KCdDcmVhdGUgc2l0ZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICApO1xuICB9XG5cbiAgb25DbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnRlbnRFbC5lbXB0eSgpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSZW1vdmVTaXRlTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XG4gIHByaXZhdGUgZGVsZXRpbmcgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBhcHA6IEFwcCxcbiAgICBwcml2YXRlIHBsdWdpbjogTm90ZUZsYXJlUGx1Z2luLFxuICAgIHByaXZhdGUgc2l0ZTogU2l0ZVByb2ZpbGUsXG4gICAgcHJpdmF0ZSBvbkRvbmU6ICgpID0+IHZvaWQsXG4gICkge1xuICAgIHN1cGVyKGFwcCk7XG4gIH1cblxuICBvbk9wZW4oKTogdm9pZCB7XG4gICAgdGhpcy50aXRsZUVsLnNldFRleHQoJ1JlbW92ZSB0aGlzIHNpdGU/Jyk7XG5cbiAgICB0aGlzLmNvbnRlbnRFbC5jcmVhdGVFbCgncCcsIHtcbiAgICAgIHRleHQ6IGBcIiR7dGhpcy5zaXRlLm5hbWUgfHwgdGhpcy5zaXRlLmdpdGh1YlJlcG8gfHwgJ1VubmFtZWQgc2l0ZSd9XCIgd2lsbCBiZSByZW1vdmVkIGZyb20gTm90ZUZsYXJlLmAsXG4gICAgfSk7XG5cbiAgICBjb25zdCBlcnJvckVsID0gdGhpcy5jb250ZW50RWwuY3JlYXRlRWwoJ3AnLCB7IGNsczogJ3NldHRpbmctaXRlbS1kZXNjcmlwdGlvbicgfSk7XG4gICAgZXJyb3JFbC5zZXRDc3NTdHlsZXMoeyBjb2xvcjogJ3ZhcigtLXRleHQtZXJyb3IpJyB9KTtcbiAgICBlcnJvckVsLmhpZGUoKTtcblxuICAgIG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKVxuICAgICAgLmFkZEJ1dHRvbihiID0+IGIuc2V0QnV0dG9uVGV4dCgnQ2FuY2VsJykub25DbGljaygoKSA9PiB0aGlzLmNsb3NlKCkpKVxuICAgICAgLmFkZEJ1dHRvbihiID0+IHtcbiAgICAgICAgYi5zZXRCdXR0b25UZXh0KCdSZW1vdmUnKS5zZXREZXN0cnVjdGl2ZSgpO1xuICAgICAgICBiLm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmRlbGV0aW5nKSByZXR1cm47XG4gICAgICAgICAgdGhpcy5kZWxldGluZyA9IHRydWU7XG4gICAgICAgICAgYi5zZXREaXNhYmxlZCh0cnVlKS5zZXRCdXR0b25UZXh0KCdSZW1vdmluZy4uLicpO1xuICAgICAgICAgIGVycm9yRWwuaGlkZSgpO1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNpdGUuaXNQdWJsaXNoZWQpIHtcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAvLyBJbmxpbmUgdW5wdWJsaXNoIGxvZ2ljIGZvciBDbG91ZGZsYXJlXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2l0ZS5kZXBsb3lUYXJnZXQgPT09ICdjbG91ZGZsYXJlJyB8fCAodGhpcy5zaXRlLmRlcGxveVRhcmdldCA9PSBudWxsICYmIHRoaXMucGx1Z2luLnNldHRpbmdzLmNsb3VkZmxhcmVUb2tlbikpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGNsb3VkZmxhcmUgPSBuZXcgQ2xvdWRmbGFyZUFwaSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5jbG91ZGZsYXJlVG9rZW4sIHRoaXMucGx1Z2luLnNldHRpbmdzLmNsb3VkZmxhcmVBY2NvdW50KTtcbiAgICAgICAgICAgICAgICAgIGF3YWl0IGNsb3VkZmxhcmUuZGVsZXRlUHJvamVjdCh0aGlzLnNpdGUuY2xvdWRmbGFyZVByb2plY3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignQ291bGQgbm90IHVucHVibGlzaCBzaXRlIGR1cmluZyByZW1vdmFsOicsIGUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHMgPSB0aGlzLnBsdWdpbi5zZXR0aW5ncztcbiAgICAgICAgICAgIHMuc2l0ZXMgPSBzLnNpdGVzLmZpbHRlcih4ID0+IHguaWQgIT09IHRoaXMuc2l0ZS5pZCk7XG4gICAgICAgICAgICBpZiAocy5hY3RpdmVTaXRlSWQgPT09IHRoaXMuc2l0ZS5pZCkgcy5hY3RpdmVTaXRlSWQgPSBzLnNpdGVzWzBdPy5pZCA/PyAnJztcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5vbkRvbmUoKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgICAgICAgIGVycm9yRWwuc2V0VGV4dCgoZXJyIGFzIEVycm9yKS5tZXNzYWdlKTtcbiAgICAgICAgICAgIGVycm9yRWwuc2hvdygpO1xuICAgICAgICAgICAgYi5zZXREaXNhYmxlZChmYWxzZSkuc2V0QnV0dG9uVGV4dCgnUmVtb3ZlJyk7XG4gICAgICAgICAgICB0aGlzLmRlbGV0aW5nID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgb25DbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnRlbnRFbC5lbXB0eSgpO1xuICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFVucHVibGlzaE1vZGFsIGV4dGVuZHMgTW9kYWwge1xuICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcHJpdmF0ZSBwbHVnaW46IE5vdGVGbGFyZVBsdWdpbiwgcHJpdmF0ZSBvbkRvbmU6ICgpID0+IHZvaWQpIHtcbiAgICBzdXBlcihhcHApO1xuICB9XG5cbiAgb25PcGVuKCk6IHZvaWQge1xuICAgIHRoaXMudGl0bGVFbC5zZXRUZXh0KCdVbnB1Ymxpc2ggeW91ciBzaXRlPycpO1xuICAgIHRoaXMuY29udGVudEVsLmNyZWF0ZUVsKCdwJywge1xuICAgICAgdGV4dDogJ1lvdXIgc2l0ZSB3aWxsIGdvIG9mZmxpbmUuIEZpbGVzIGluIEdpdEh1YiByZW1haW4gdW50b3VjaGVkIFx1MjAxNCB5b3UgY2FuIHJlLXB1Ymxpc2ggYW55IHRpbWUuJyxcbiAgICB9KTtcbiAgICBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbClcbiAgICAgIC5hZGRCdXR0b24oYiA9PiBiLnNldEJ1dHRvblRleHQoJ0NhbmNlbCcpLm9uQ2xpY2soKCkgPT4gdGhpcy5jbG9zZSgpKSlcbiAgICAgIC5hZGRCdXR0b24oYiA9PlxuICAgICAgICBiLnNldEJ1dHRvblRleHQoJ1VucHVibGlzaCcpLnNldERlc3RydWN0aXZlKCkub25DbGljayhhc3luYyAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLmRvVW5wdWJsaXNoKCk7XG4gICAgICAgICAgdGhpcy5vbkRvbmUoKTtcbiAgICAgICAgfSksXG4gICAgICApO1xuICB9XG5cbiAgb25DbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnRlbnRFbC5lbXB0eSgpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSZXNldE1vZGFsIGV4dGVuZHMgTW9kYWwge1xuICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcHJpdmF0ZSBwbHVnaW46IE5vdGVGbGFyZVBsdWdpbiwgcHJpdmF0ZSBvbkRvbmU6ICgpID0+IHZvaWQpIHtcbiAgICBzdXBlcihhcHApO1xuICB9XG5cbiAgb25PcGVuKCk6IHZvaWQge1xuICAgIHRoaXMudGl0bGVFbC5zZXRUZXh0KCdSZXNldCBOb3RlRmxhcmU/Jyk7XG4gICAgdGhpcy5jb250ZW50RWwuY3JlYXRlRWwoJ3AnLCB7XG4gICAgICB0ZXh0OiAnVGhpcyBjbGVhcnMgYWxsIE5vdGVGbGFyZSBzZXR0aW5ncyAodG9rZW5zIGFuZCBldmVyeSBzaXRlKS4gWW91ciBHaXRIdWIgcmVwb3MgYW5kIENsb3VkZmxhcmUgcHJvamVjdHMgd2lsbCBOT1QgYmUgZGVsZXRlZC4nLFxuICAgIH0pO1xuICAgIG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKVxuICAgICAgLmFkZEJ1dHRvbihiID0+IGIuc2V0QnV0dG9uVGV4dCgnQ2FuY2VsJykub25DbGljaygoKSA9PiB0aGlzLmNsb3NlKCkpKVxuICAgICAgLmFkZEJ1dHRvbihiID0+XG4gICAgICAgIGIuc2V0QnV0dG9uVGV4dCgnUmVzZXQnKS5zZXREZXN0cnVjdGl2ZSgpLm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMucGx1Z2luLnNldHRpbmdzLCB7XG4gICAgICAgICAgICAuLi5ERUZBVUxUX1NFVFRJTkdTLFxuICAgICAgICAgICAgc2l0ZXM6IFtdLFxuICAgICAgICAgICAgYmFja3VwOiB7IC4uLkRFRkFVTFRfU0VUVElOR1MuYmFja3VwIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgdGhpcy5vbkRvbmUoKTtcbiAgICAgICAgfSksXG4gICAgICApO1xuICB9XG5cbiAgb25DbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnRlbnRFbC5lbXB0eSgpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBFZGl0U2l0ZU1vZGFsIGV4dGVuZHMgTW9kYWwge1xuICBjb25zdHJ1Y3RvcihcbiAgICBhcHA6IEFwcCxcbiAgICBwcml2YXRlIHBsdWdpbjogTm90ZUZsYXJlUGx1Z2luLFxuICAgIHByaXZhdGUgc2l0ZTogU2l0ZVByb2ZpbGUsXG4gICAgcHJpdmF0ZSBvbkRvbmU6ICgpID0+IHZvaWQsXG4gICkge1xuICAgIHN1cGVyKGFwcCk7XG4gIH1cblxuICBvbk9wZW4oKTogdm9pZCB7XG4gICAgY29uc3QgcyA9IHRoaXMuc2l0ZTtcbiAgICB0aGlzLnRpdGxlRWwuc2V0VGV4dChgU2V0dGluZ3MgZm9yICR7cy5uYW1lIHx8IHMuY2xvdWRmbGFyZVByb2plY3QgfHwgJ1NpdGUnfWApO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBwcml2YXRlIHJlbmRlcigpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnRlbnRFbC5lbXB0eSgpO1xuICAgIGNvbnN0IHMgPSB0aGlzLnNpdGU7XG5cbiAgICBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbCkuc2V0TmFtZSgnUHVibGlzaGluZyBydWxlcycpLnNldEhlYWRpbmcoKTtcblxuICAgIGxldCB1cGRhdGVWaXNpYmlsaXR5OiAoKSA9PiB2b2lkO1xuICAgIFxuICAgIG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKVxuICAgICAgLnNldE5hbWUoJ1B1Ymxpc2ggc2NvcGUnKVxuICAgICAgLnNldERlc2MoJ0NvbmZpZ3VyZSB3aGF0IHRvIHB1Ymxpc2g6IHRoZSBlbnRpcmUgdmF1bHQgb3Igc2VsZWN0ZWQgZmlsZXMvZm9sZGVycy4nKVxuICAgICAgLmFkZERyb3Bkb3duKGQgPT4ge1xuICAgICAgICBkLmFkZE9wdGlvbigndmF1bHQnLCAnRnVsbCBWYXVsdCcpO1xuICAgICAgICBkLmFkZE9wdGlvbignc2VsZWN0ZWQnLCAnU2VsZWN0ZWQgRmlsZXMvRm9sZGVycycpO1xuICAgICAgICBkLnNldFZhbHVlKHMucHVibGlzaFNjb3BlIHx8ICd2YXVsdCcpO1xuICAgICAgICBkLm9uQ2hhbmdlKGFzeW5jIHYgPT4ge1xuICAgICAgICAgIHMucHVibGlzaFNjb3BlID0gdiBhcyAndmF1bHQnIHwgJ3NlbGVjdGVkJztcbiAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICB1cGRhdGVWaXNpYmlsaXR5KCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICBjb25zdCBwYXRoc0NvbnRhaW5lciA9IHRoaXMuY29udGVudEVsLmNyZWF0ZURpdignbm90ZWZsYXJlLXBhdGhzLWNvbnRhaW5lcicpO1xuICAgIFxuICAgIGNvbnN0IHJlbmRlclBhdGhzID0gKCkgPT4ge1xuICAgICAgcGF0aHNDb250YWluZXIuZW1wdHkoKTtcbiAgICAgIGlmICgocy5wdWJsaXNoU2NvcGUgfHwgJ3ZhdWx0JykgPT09ICd2YXVsdCcpIHtcbiAgICAgICAgcGF0aHNDb250YWluZXIuc2V0Q3NzU3R5bGVzKHsgZGlzcGxheTogJ25vbmUnIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBwYXRoc0NvbnRhaW5lci5zZXRDc3NTdHlsZXMoeyBkaXNwbGF5OiAnYmxvY2snIH0pO1xuICAgICAgXG4gICAgICBjb25zdCBwYXRocyA9IHMucHVibGlzaFBhdGhzIHx8IFtdO1xuICAgICAgaWYgKHBhdGhzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBwYXRoc0NvbnRhaW5lci5jcmVhdGVFbCgncCcsIHsgdGV4dDogJ05vIGZpbGVzIG9yIGZvbGRlcnMgc2VsZWN0ZWQuJywgY2xzOiAnbm90ZWZsYXJlLW11dGVkJyB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGxpc3QgPSBwYXRoc0NvbnRhaW5lci5jcmVhdGVFbCgndWwnLCB7IGNsczogJ25vdGVmbGFyZS1wYXRoLWxpc3QnIH0pO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhdGhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgbGkgPSBsaXN0LmNyZWF0ZUVsKCdsaScpO1xuICAgICAgICAgIGxpLnNldENzc1N0eWxlcyh7IGRpc3BsYXk6ICdmbGV4JyB9KTtcbiAgICAgICAgICBsaS5zZXRDc3NTdHlsZXMoeyBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nIH0pO1xuICAgICAgICAgIGxpLnNldENzc1N0eWxlcyh7IGFsaWduSXRlbXM6ICdjZW50ZXInIH0pO1xuICAgICAgICAgIGxpLnNldENzc1N0eWxlcyh7IG1hcmdpbkJvdHRvbTogJzRweCcgfSk7XG4gICAgICAgICAgXG4gICAgICAgICAgbGkuY3JlYXRlU3Bhbih7IHRleHQ6IHBhdGhzW2ldIH0pO1xuICAgICAgICAgIGNvbnN0IHJlbW92ZUJ0biA9IGxpLmNyZWF0ZUVsKCdidXR0b24nLCB7IHRleHQ6ICdcdTI3MTUnIH0pO1xuICAgICAgICAgIHJlbW92ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHsgdm9pZCAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgcy5wdWJsaXNoUGF0aHM/LnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgcmVuZGVyUGF0aHMoKTtcbiAgICAgICAgICB9KSgpOyB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBhZGRSb3cgPSBwYXRoc0NvbnRhaW5lci5jcmVhdGVEaXYoJ25vdGVmbGFyZS1hZGQtcGF0aC1yb3cnKTtcbiAgICAgIGFkZFJvdy5zZXRDc3NTdHlsZXMoeyBtYXJnaW5Ub3A6ICc4cHgnIH0pO1xuICAgICAgXG4gICAgICBjb25zdCBhZGRCdG4gPSBhZGRSb3cuY3JlYXRlRWwoJ2J1dHRvbicsIHsgdGV4dDogJ0Jyb3dzZSBWYXVsdC4uLicgfSk7XG4gICAgICBhZGRCdG4uc2V0Q3NzU3R5bGVzKHsgd2lkdGg6ICcxMDAlJyB9KTtcbiAgICAgIGFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgbmV3IFBhdGhTdWdnZXN0TW9kYWwodGhpcy5hcHAsIChzZWxlY3RlZFBhdGgpID0+IHsgdm9pZCAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGlmIChzZWxlY3RlZFBhdGgudHJpbSgpKSB7XG4gICAgICAgICAgICBpZiAoIXMucHVibGlzaFBhdGhzKSBzLnB1Ymxpc2hQYXRocyA9IFtdO1xuICAgICAgICAgICAgaWYgKCFzLnB1Ymxpc2hQYXRocy5pbmNsdWRlcyhzZWxlY3RlZFBhdGgudHJpbSgpKSkge1xuICAgICAgICAgICAgICBzLnB1Ymxpc2hQYXRocy5wdXNoKHNlbGVjdGVkUGF0aC50cmltKCkpO1xuICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgcmVuZGVyUGF0aHMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pKCk7IH0pLm9wZW4oKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB1cGRhdGVWaXNpYmlsaXR5ID0gKCkgPT4ge1xuICAgICAgcmVuZGVyUGF0aHMoKTtcbiAgICB9O1xuICAgIHVwZGF0ZVZpc2liaWxpdHkoKTtcblxuICAgIC8vIEN1c3RvbWl6YXRpb25zXG4gICAgbmV3IFNldHRpbmcodGhpcy5jb250ZW50RWwpLnNldE5hbWUoJ1NpdGUgQ3VzdG9taXphdGlvbicpLnNldEhlYWRpbmcoKTtcblxuICAgIG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKVxuICAgICAgLnNldE5hbWUoJ1NpdGUgbmFtZScpXG4gICAgICAuc2V0RGVzYygnSW50ZXJuYWwgbmFtZSBmb3IgdGhpcyBzaXRlLicpXG4gICAgICAuYWRkVGV4dCh0ID0+IHtcbiAgICAgICAgdC5zZXRWYWx1ZShzLm5hbWUgfHwgJycpO1xuICAgICAgICB0Lm9uQ2hhbmdlKGFzeW5jIHYgPT4ge1xuICAgICAgICAgIHMubmFtZSA9IHYudHJpbSgpO1xuICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcodGhpcy5jb250ZW50RWwpXG4gICAgICAuc2V0TmFtZSgnQXV0aG9yIG5hbWUnKVxuICAgICAgLnNldERlc2MoJ1RoZSBhdXRob3IgbmFtZSB3cml0dGVuIHRvIHRoZSBzaXRlIG1ldGFkYXRhLicpXG4gICAgICAuYWRkVGV4dCh0ID0+IHtcbiAgICAgICAgdC5zZXRQbGFjZWhvbGRlcignWW91ciBOYW1lJyk7XG4gICAgICAgIHQuc2V0VmFsdWUocy5hdXRob3JOYW1lIHx8ICcnKTtcbiAgICAgICAgdC5vbkNoYW5nZShhc3luYyB2ID0+IHtcbiAgICAgICAgICBzLmF1dGhvck5hbWUgPSB2LnRyaW0oKTtcbiAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKVxuICAgICAgLnNldE5hbWUoJ1NpZGViYXIgdGl0bGUnKVxuICAgICAgLnNldERlc2MoJ1RpdGxlIHNob3duIGluIHRoZSBzaWRlYmFyLiBEZWZhdWx0cyB0byB0aGUgc2l0ZSBuYW1lLicpXG4gICAgICAuYWRkVGV4dCh0ID0+IHtcbiAgICAgICAgdC5zZXRQbGFjZWhvbGRlcignTXkgRGlnaXRhbCBHYXJkZW4nKTtcbiAgICAgICAgdC5zZXRWYWx1ZShzLnNpZGViYXJUaXRsZSB8fCAnJyk7XG4gICAgICAgIHQub25DaGFuZ2UoYXN5bmMgdiA9PiB7XG4gICAgICAgICAgcy5zaWRlYmFyVGl0bGUgPSB2LnRyaW0oKTtcbiAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKVxuICAgICAgLnNldE5hbWUoJ1NpdGUgZGVzY3JpcHRpb24nKVxuICAgICAgLnNldERlc2MoJ0Rlc2NyaXB0aW9uIG9mIHlvdXIgc2l0ZS4nKVxuICAgICAgLmFkZFRleHQodCA9PiB7XG4gICAgICAgIHQuc2V0UGxhY2Vob2xkZXIoJ05vdGVzIGFuZCB0aG91Z2h0c1x1MjAyNicpO1xuICAgICAgICB0LnNldFZhbHVlKHMuc2l0ZURlc2NyaXB0aW9uIHx8ICcnKTtcbiAgICAgICAgdC5vbkNoYW5nZShhc3luYyB2ID0+IHtcbiAgICAgICAgICBzLnNpdGVEZXNjcmlwdGlvbiA9IHYudHJpbSgpO1xuICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcodGhpcy5jb250ZW50RWwpXG4gICAgICAuc2V0TmFtZSgnRXhjbHVkZSBwYXR0ZXJucycpXG4gICAgICAuc2V0RGVzYygnT25lIGdsb2IgcGVyIGxpbmUuIE1hdGNoaW5nIGZpbGVzIGFyZSBub3QgcHVibGlzaGVkIChlLmcuIHByaXZhdGUvKiosICoucHJpdmF0ZS5tZCkuJylcbiAgICAgIC5hZGRUZXh0QXJlYShhcmVhID0+IHtcbiAgICAgICAgYXJlYS5zZXRWYWx1ZShzLmV4Y2x1ZGVQYXR0ZXJucy5qb2luKCdcXG4nKSk7XG4gICAgICAgIGFyZWEuaW5wdXRFbC5yb3dzID0gNDtcbiAgICAgICAgYXJlYS5vbkNoYW5nZShhc3luYyB2ID0+IHtcbiAgICAgICAgICBzLmV4Y2x1ZGVQYXR0ZXJucyA9IHYuc3BsaXQoJ1xcbicpLm1hcCh4ID0+IHgudHJpbSgpKS5maWx0ZXIoQm9vbGVhbik7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbClcbiAgICAgIC5zZXROYW1lKCdJbmNsdWRlIGF0dGFjaG1lbnRzJylcbiAgICAgIC5zZXREZXNjKCdVcGxvYWQgaW1hZ2VzIGFuZCBQREZzIGFsb25nc2lkZSB5b3VyIG5vdGVzLicpXG4gICAgICAuYWRkVG9nZ2xlKHRvZ2dsZSA9PiB7XG4gICAgICAgIHRvZ2dsZS5zZXRWYWx1ZShzLmluY2x1ZGVBdHRhY2htZW50cyk7XG4gICAgICAgIHRvZ2dsZS5vbkNoYW5nZShhc3luYyB2ID0+IHtcbiAgICAgICAgICBzLmluY2x1ZGVBdHRhY2htZW50cyA9IHY7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbClcbiAgICAgIC5hZGRCdXR0b24oYiA9PiBiLnNldEJ1dHRvblRleHQoJ0RvbmUnKS5zZXRDdGEoKS5vbkNsaWNrKCgpID0+IHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB0aGlzLm9uRG9uZSgpO1xuICAgICAgfSkpO1xuICB9XG5cbiAgZGlzcGxheSgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnRlbnRFbC5lbXB0eSgpO1xuICAgIHRoaXMub25PcGVuKCk7XG4gIH1cblxuICBvbkNsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuY29udGVudEVsLmVtcHR5KCk7XG4gIH1cbn1cblxuaW1wb3J0IHsgRnV6enlTdWdnZXN0TW9kYWwsIFRBYnN0cmFjdEZpbGUsIFRGaWxlIH0gZnJvbSAnb2JzaWRpYW4nO1xuXG5leHBvcnQgY2xhc3MgUGF0aFN1Z2dlc3RNb2RhbCBleHRlbmRzIEZ1enp5U3VnZ2VzdE1vZGFsPFRBYnN0cmFjdEZpbGU+IHtcbiAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHByaXZhdGUgb25DaG9vc2U6IChwYXRoOiBzdHJpbmcpID0+IHZvaWQpIHtcbiAgICBzdXBlcihhcHApO1xuICAgIHRoaXMuc2V0UGxhY2Vob2xkZXIoJ1NlYXJjaCBmb3IgYSBmaWxlIG9yIGZvbGRlci4uLicpO1xuICB9XG4gIFxuICBnZXRJdGVtcygpOiBUQWJzdHJhY3RGaWxlW10ge1xuICAgIHJldHVybiB0aGlzLmFwcC52YXVsdC5nZXRBbGxMb2FkZWRGaWxlcygpLmZpbHRlcihmID0+IFxuICAgICAgZi5wYXRoICE9PSAnLycgJiYgXG4gICAgICAhZi5wYXRoLnN0YXJ0c1dpdGgoJy4nKSAmJlxuICAgICAgIWYucGF0aC5pbmNsdWRlcygnLy4nKSAmJlxuICAgICAgKGYgaW5zdGFuY2VvZiBURm9sZGVyIHx8IChmIGluc3RhbmNlb2YgVEZpbGUgJiYgZi5leHRlbnNpb24gPT09ICdtZCcpKVxuICAgICk7XG4gIH1cbiAgXG4gIGdldEl0ZW1UZXh0KGl0ZW06IFRBYnN0cmFjdEZpbGUpOiBzdHJpbmcge1xuICAgIHJldHVybiBpdGVtLnBhdGg7XG4gIH1cbiAgXG4gIG9uQ2hvb3NlSXRlbShpdGVtOiBUQWJzdHJhY3RGaWxlLCBldnQ6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5vbkNob29zZShpdGVtLnBhdGgpO1xuICB9XG59XG4iLCAiZXhwb3J0IGNsYXNzIFN0YXR1c0JhciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEhUTUxFbGVtZW50KSB7fVxuXG4gIHNldElkbGUoKTogdm9pZCB7XG4gICAgdGhpcy5zZXQoJ05vdGVGbGFyZTogTm90IHNldCB1cCcpO1xuICAgIHRoaXMuZWwudGl0bGUgPSAnJztcbiAgfVxuXG4gIHNldFVucHVibGlzaGVkKCk6IHZvaWQge1xuICAgIHRoaXMuc2V0KCdOb3RlRmxhcmU6IFVucHVibGlzaGVkJyk7XG4gICAgdGhpcy5lbC50aXRsZSA9ICcnO1xuICB9XG5cbiAgc2V0UHVibGlzaGluZyhuOiBudW1iZXIsIHRvdGFsOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnNldChgTm90ZUZsYXJlOiBVcGxvYWRpbmcgJHtufS8ke3RvdGFsfS4uLmApO1xuICB9XG5cbiAgc2V0TGl2ZShub3RlQ291bnQ6IG51bWJlciwgdXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnNldChgTm90ZUZsYXJlOiBMaXZlIFx1MjAxNCAke25vdGVDb3VudH0gbm90ZXMgXHUyMTk3YCk7XG4gICAgdGhpcy5lbC50aXRsZSA9IHVybCA/IGBodHRwczovLyR7dXJsfWAgOiAnJztcbiAgfVxuXG4gIHNldEVycm9yKG1zZzogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5zZXQoYE5vdGVGbGFyZTogRXJyb3IgXHUyMDE0ICR7bXNnfWApO1xuICB9XG5cbiAgc2V0UmF0ZUxpbWl0ZWQoc2Vjc0xlZnQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuc2V0KGBOb3RlRmxhcmU6IFJhdGUgbGltaXRlZCBcdTIwMTQgJHtzZWNzTGVmdH1zYCk7XG4gIH1cblxuICBzZXRNZXNzYWdlKG1zZzogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5zZXQobXNnKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0KHRleHQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuZWwudGV4dENvbnRlbnQgPSB0ZXh0O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgSXRlbVZpZXcsIFdvcmtzcGFjZUxlYWYsIHNldEljb24sIFNldHRpbmcgfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgeyBBZGRTaXRlTW9kYWwsIFVucHVibGlzaE1vZGFsLCBFZGl0U2l0ZU1vZGFsLCBSZW1vdmVTaXRlTW9kYWwsIFBhdGhTdWdnZXN0TW9kYWwgfSBmcm9tICcuL3NldHRpbmdzL3NpdGVNb2RhbHMnO1xuaW1wb3J0IHR5cGUgTm90ZUZsYXJlUGx1Z2luIGZyb20gJy4uLy4uL21haW4nO1xuXG5leHBvcnQgY29uc3QgVklFV19UWVBFX05PVEVGTEFSRSA9ICdub3RlZmxhcmUtcGFuZWwnO1xuXG5jb25zdCBDTE9VREZMQVJFX0FQUF9VUkwgPSAnaHR0cHM6Ly9naXRodWIuY29tL2FwcHMvY2xvdWRmbGFyZS13b3JrZXJzLWFuZC1wYWdlcy9pbnN0YWxsYXRpb25zL25ldyc7XG5cbi8qKlxuICogRm9jdXNlZCBwdWJsaXNoaW5nIHBhbmVsLiBCYWNrdXAgcnVucyBxdWlldGx5IGluIHRoZSBiYWNrZ3JvdW5kIGFuZCBpc1xuICogY29uZmlndXJlZCBmcm9tIE5vdGVGbGFyZSBzZXR0aW5ncy5cbiAqL1xuZXhwb3J0IGNsYXNzIE5vdGVGbGFyZVZpZXcgZXh0ZW5kcyBJdGVtVmlldyB7XG4gIGNvbnN0cnVjdG9yKGxlYWY6IFdvcmtzcGFjZUxlYWYsIHByaXZhdGUgcGx1Z2luOiBOb3RlRmxhcmVQbHVnaW4pIHtcbiAgICBzdXBlcihsZWFmKTtcbiAgfVxuXG4gIGdldFZpZXdUeXBlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFZJRVdfVFlQRV9OT1RFRkxBUkU7XG4gIH1cblxuICBnZXREaXNwbGF5VGV4dCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAnTm90ZUZsYXJlJztcbiAgfVxuXG4gIGdldEljb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5wbHVnaW4uZ2V0QWN0aXZlU2l0ZSgpPy5pc1B1Ymxpc2hlZCA/ICdjbG91ZC1jaGVjaycgOiAnY2xvdWQtdXBsb2FkJztcbiAgfVxuXG4gIGFzeW5jIG9uT3BlbigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgYXN5bmMgb25DbG9zZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBub3RoaW5nIHRvIGNsZWFuIHVwXG4gIH1cblxuICByZWZyZXNoKCk6IHZvaWQge1xuICAgIHZvaWQgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgcmVuZGVyKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHJvb3QgPSB0aGlzLmNvbnRhaW5lckVsLmNoaWxkcmVuWzFdIGFzIEhUTUxFbGVtZW50O1xuICAgIHJvb3QuZW1wdHkoKTtcbiAgICByb290LmFkZENsYXNzKCdub3RlZmxhcmUtdmlldycpO1xuXG4gICAgY29uc3QgcyA9IHRoaXMucGx1Z2luLnNldHRpbmdzO1xuICAgIFxuICAgIGlmICghcy5zZXR1cENvbXBsZXRlKSB7XG4gICAgICByb290LmNyZWF0ZUVsKCdwJywge1xuICAgICAgICB0ZXh0OiAnRmluaXNoIHNldHVwIHRvIHB1Ymxpc2ggeW91ciBub3RlcyBhbmQgcHJvdGVjdCB5b3VyIHZhdWx0IHdpdGggYXV0b21hdGljIGJhY2t1cHMuJyxcbiAgICAgICAgY2xzOiAnc2V0dGluZy1pdGVtLWRlc2NyaXB0aW9uJyxcbiAgICAgIH0pO1xuICAgICAgY29uc3Qgc2V0dXBCdG4gPSByb290LmNyZWF0ZUVsKCdidXR0b24nLCB7IHRleHQ6ICdPcGVuIHNldHVwJywgY2xzOiAnbW9kLWN0YScgfSk7XG4gICAgICBzZXR1cEJ0bi5zZXRDc3NTdHlsZXMoeyBtYXJnaW5Ub3A6ICcxMHB4JyB9KTtcbiAgICAgIHNldHVwQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5wbHVnaW4ub3BlblNldHRpbmdzVGFiKCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnRlbnQgPSByb290LmNyZWF0ZUVsKCdkaXYnLCB7IGNsczogJ25vdGVmbGFyZS10YWItY29udGVudCcgfSk7XG4gICAgaWYgKHMuZW5hYmxlUHVibGlzaCkge1xuICAgICAgYXdhaXQgdGhpcy5yZW5kZXJQdWJsaXNoKGNvbnRlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBiYWNrdXAgPSBjb250ZW50LmNyZWF0ZUVsKCdkaXYnKTtcbiAgICAgIGJhY2t1cC5jcmVhdGVFbCgnaDMnLCB7IHRleHQ6ICdZb3VyIHZhdWx0IGlzIHByb3RlY3RlZCcgfSk7XG4gICAgICBiYWNrdXAuY3JlYXRlRWwoJ3AnLCB7XG4gICAgICAgIHRleHQ6IHMuYmFja3VwLmxhc3RCYWNrdXBBdFxuICAgICAgICAgID8gYExhc3QgYmFja3VwOiAke25ldyBEYXRlKHMuYmFja3VwLmxhc3RCYWNrdXBBdCkudG9Mb2NhbGVTdHJpbmcoKX1gXG4gICAgICAgICAgOiAnWW91ciBmaXJzdCBiYWNrdXAgd2lsbCBydW4gYXV0b21hdGljYWxseS4nLFxuICAgICAgICBjbHM6ICdzZXR0aW5nLWl0ZW0tZGVzY3JpcHRpb24nLFxuICAgICAgfSk7XG4gICAgICBjb25zdCBzZXR0aW5nc0J1dHRvbiA9IGJhY2t1cC5jcmVhdGVFbCgnYnV0dG9uJywgeyB0ZXh0OiAnQmFja3VwIHNldHRpbmdzJywgY2xzOiAnbW9kLWN0YScgfSk7XG4gICAgICBzZXR0aW5nc0J1dHRvbi5zZXRDc3NTdHlsZXMoeyBtYXJnaW5Ub3A6ICcxMHB4JyB9KTtcbiAgICAgIHNldHRpbmdzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5wbHVnaW4ub3BlblNldHRpbmdzVGFiKCkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgcmVuZGVyUHVibGlzaChyb290OiBIVE1MRWxlbWVudCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHMgPSB0aGlzLnBsdWdpbi5zZXR0aW5ncztcbiAgICBjb25zdCBzaXRlID0gdGhpcy5wbHVnaW4uZ2V0QWN0aXZlU2l0ZSgpO1xuXG4gICAgaWYgKCFzaXRlKSB7XG4gICAgICByb290LmNyZWF0ZUVsKCdwJywge1xuICAgICAgICB0ZXh0OiAnTm8gcHVibGlzaCBzaXRlcyBjb25maWd1cmVkLicsXG4gICAgICAgIGNsczogJ25vdGVmbGFyZS1tdXRlZCcsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGNyZWF0ZUJ0biA9IHJvb3QuY3JlYXRlRWwoJ2J1dHRvbicsIHsgdGV4dDogJ1F1aWNrIGNyZWF0ZSBzaXRlJywgY2xzOiAnbW9kLWN0YScgfSk7XG4gICAgICBjcmVhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIG5ldyBBZGRTaXRlTW9kYWwodGhpcy5hcHAsIHRoaXMucGx1Z2luLCAoKSA9PiB0aGlzLnJlZnJlc2goKSkub3BlbigpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG5cblxuICAgIC8vIFx1MjUwMFx1MjUwMCBIZWFkZXI6IFNpdGUgc3dpdGNoZXIsIFN0YXR1cywgQWRkIFNpdGUgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXG4gICAgY29uc3QgaXNMaXZlID0gc2l0ZS5pc1B1Ymxpc2hlZDtcbiAgICBuZXcgU2V0dGluZyhyb290KVxuICAgICAgLnNldE5hbWUoJ0N1cnJlbnQgU2l0ZScpXG4gICAgICAuc2V0RGVzYyhgU3RhdHVzOiAke2lzTGl2ZSA/ICdcdUQ4M0RcdURGRTIgTGl2ZScgOiAnXHUyNkFBIE9mZmxpbmUnfWApXG4gICAgICAuYWRkRHJvcGRvd24oZCA9PiB7XG4gICAgICAgIGZvciAoY29uc3Qgc3Agb2Ygcy5zaXRlcykge1xuICAgICAgICAgIGQuYWRkT3B0aW9uKHNwLmlkLCBzcC5uYW1lIHx8IHNwLmdpdGh1YlJlcG8pO1xuICAgICAgICB9XG4gICAgICAgIGQuc2V0VmFsdWUoc2l0ZS5pZCk7XG4gICAgICAgIGQub25DaGFuZ2UoYXN5bmMgaWQgPT4ge1xuICAgICAgICAgIHMuYWN0aXZlU2l0ZUlkID0gaWQ7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgdm9pZCB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuYWRkQnV0dG9uKGIgPT4ge1xuICAgICAgICBiLnNldEljb24oJ3BsdXMnKS5zZXRUb29sdGlwKCdDcmVhdGUgYW5vdGhlciBzaXRlJykub25DbGljaygoKSA9PiB7XG4gICAgICAgICAgbmV3IEFkZFNpdGVNb2RhbCh0aGlzLmFwcCwgdGhpcy5wbHVnaW4sICgpID0+IHRoaXMucmVmcmVzaCgpKS5vcGVuKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAvLyBcdTI1MDBcdTI1MDAgU2l0ZSBQdWJsaXNoIFNldHRpbmdzIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuICAgIGxldCB1cGRhdGVWaXNpYmlsaXR5OiAoKSA9PiB2b2lkO1xuXG4gICAgbmV3IFNldHRpbmcocm9vdClcbiAgICAgIC5zZXROYW1lKCdQdWJsaXNoIHNjb3BlJylcbiAgICAgIC5zZXREZXNjKCdDb25maWd1cmUgd2hhdCB0byBwdWJsaXNoOiB0aGUgZW50aXJlIHZhdWx0IG9yIHNlbGVjdGVkIGZpbGVzL2ZvbGRlcnMuJylcbiAgICAgIC5hZGREcm9wZG93bihkID0+IHtcbiAgICAgICAgZC5hZGRPcHRpb24oJ3ZhdWx0JywgJ0Z1bGwgVmF1bHQnKTtcbiAgICAgICAgZC5hZGRPcHRpb24oJ3NlbGVjdGVkJywgJ1NlbGVjdGVkIEZpbGVzL0ZvbGRlcnMnKTtcbiAgICAgICAgZC5zZXRWYWx1ZShzaXRlLnB1Ymxpc2hTY29wZSB8fCAndmF1bHQnKTtcbiAgICAgICAgZC5vbkNoYW5nZShhc3luYyB2ID0+IHtcbiAgICAgICAgICBzaXRlLnB1Ymxpc2hTY29wZSA9IHYgYXMgJ3ZhdWx0JyB8ICdzZWxlY3RlZCc7XG4gICAgICAgICAgdXBkYXRlVmlzaWJpbGl0eSgpO1xuICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgY29uc3QgcGF0aHNDb250YWluZXIgPSByb290LmNyZWF0ZURpdignbm90ZWZsYXJlLXBhdGhzLWNvbnRhaW5lcicpO1xuICAgIHBhdGhzQ29udGFpbmVyLnNldENzc1N0eWxlcyh7XG4gICAgICBwYWRkaW5nTGVmdDogJzEuNWVtJyxcbiAgICAgIHBhZGRpbmdSaWdodDogJzEuNWVtJyxcbiAgICAgIHBhZGRpbmdCb3R0b206ICcxZW0nXG4gICAgfSk7XG4gICAgXG4gICAgY29uc3QgcmVuZGVyUGF0aHMgPSAoKSA9PiB7XG4gICAgICBwYXRoc0NvbnRhaW5lci5lbXB0eSgpO1xuICAgICAgaWYgKChzaXRlLnB1Ymxpc2hTY29wZSB8fCAndmF1bHQnKSA9PT0gJ3ZhdWx0Jykge1xuICAgICAgICBwYXRoc0NvbnRhaW5lci5zZXRDc3NTdHlsZXMoeyBkaXNwbGF5OiAnbm9uZScgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHBhdGhzQ29udGFpbmVyLnNldENzc1N0eWxlcyh7IGRpc3BsYXk6ICdibG9jaycgfSk7XG4gICAgICBcbiAgICAgIGNvbnN0IGFkZFJvdyA9IHBhdGhzQ29udGFpbmVyLmNyZWF0ZURpdignbm90ZWZsYXJlLWFkZC1wYXRoLXJvdycpO1xuICAgICAgYWRkUm93LnNldENzc1N0eWxlcyh7IG1hcmdpblRvcDogJzhweCcgfSk7XG4gICAgICBcbiAgICAgIGNvbnN0IGFkZEJ0biA9IGFkZFJvdy5jcmVhdGVFbCgnYnV0dG9uJywgeyB0ZXh0OiAnQnJvd3NlIFZhdWx0Li4uJyB9KTtcbiAgICAgIGFkZEJ0bi5zZXRDc3NTdHlsZXMoeyB3aWR0aDogJzEwMCUnIH0pO1xuICAgICAgYWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBuZXcgUGF0aFN1Z2dlc3RNb2RhbCh0aGlzLmFwcCwgKHNlbGVjdGVkUGF0aCkgPT4geyB2b2lkIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgaWYgKCFzaXRlLnB1Ymxpc2hQYXRocykgc2l0ZS5wdWJsaXNoUGF0aHMgPSBbXTtcbiAgICAgICAgICBpZiAoIXNpdGUucHVibGlzaFBhdGhzLmluY2x1ZGVzKHNlbGVjdGVkUGF0aCkpIHtcbiAgICAgICAgICAgIHNpdGUucHVibGlzaFBhdGhzLnB1c2goc2VsZWN0ZWRQYXRoKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgcmVuZGVyUGF0aHMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKCk7IH0pLm9wZW4oKTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBwYXRocyA9IHNpdGUucHVibGlzaFBhdGhzIHx8IFtdO1xuICAgICAgaWYgKHBhdGhzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjb25zdCBwID0gcGF0aHNDb250YWluZXIuY3JlYXRlRWwoJ3AnLCB7IHRleHQ6ICdObyBmaWxlcyBvciBmb2xkZXJzIHNlbGVjdGVkLicsIGNsczogJ3NldHRpbmctaXRlbS1kZXNjcmlwdGlvbicgfSk7XG4gICAgICAgIHAuc2V0Q3NzU3R5bGVzKHsgbWFyZ2luVG9wOiAnMTJweCcgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBjaGlwQ29udGFpbmVyID0gcGF0aHNDb250YWluZXIuY3JlYXRlRGl2KCk7XG4gICAgICAgIGNoaXBDb250YWluZXIuc2V0Q3NzU3R5bGVzKHtcbiAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgZmxleFdyYXA6ICd3cmFwJyxcbiAgICAgICAgICBnYXA6ICc4cHgnLFxuICAgICAgICAgIG1hcmdpblRvcDogJzEycHgnLFxuICAgICAgICAgIG1heEhlaWdodDogJzE1MHB4JyxcbiAgICAgICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgICAgICAgICBwYWRkaW5nOiAnNHB4IDAnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBjaGlwID0gY2hpcENvbnRhaW5lci5jcmVhdGVEaXYoKTtcbiAgICAgICAgICBjaGlwLnNldENzc1N0eWxlcyh7XG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgIGdhcDogJzZweCcsXG4gICAgICAgICAgICBwYWRkaW5nOiAnNHB4IDhweCcsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1mb3JtLWZpZWxkKScsXG4gICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpJyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJ3ZhcigtLXJhZGl1cy1zKScsXG4gICAgICAgICAgICBmb250U2l6ZTogJ3ZhcigtLWZvbnQtdWktc21hbGxlciknXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgXG4gICAgICAgICAgY29uc3QgaWNvblNwYW4gPSBjaGlwLmNyZWF0ZVNwYW4oKTtcbiAgICAgICAgICBjb25zdCBhYnN0cmFjdEZpbGUgPSB0aGlzLmFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgocGF0aHNbaV0pO1xuICAgICAgICAgIGNvbnN0IGlzRm9sZGVyID0gYWJzdHJhY3RGaWxlICYmICdjaGlsZHJlbicgaW4gYWJzdHJhY3RGaWxlO1xuICAgICAgICAgIHNldEljb24oaWNvblNwYW4sIGlzRm9sZGVyID8gJ2ZvbGRlcicgOiAnZmlsZS10ZXh0Jyk7XG4gICAgICAgICAgaWNvblNwYW4uc2V0Q3NzU3R5bGVzKHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgY29sb3I6ICd2YXIoLS10ZXh0LW11dGVkKScsXG4gICAgICAgICAgICB3aWR0aDogJzE0cHgnLFxuICAgICAgICAgICAgaGVpZ2h0OiAnMTRweCdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBcbiAgICAgICAgICBjaGlwLmNyZWF0ZVNwYW4oeyB0ZXh0OiBwYXRoc1tpXSB9KTtcbiAgICAgICAgICBjb25zdCByZW1vdmVCdG4gPSBjaGlwLmNyZWF0ZVNwYW4oeyBjbHM6ICdjbGlja2FibGUtaWNvbicgfSk7XG4gICAgICAgICAgc2V0SWNvbihyZW1vdmVCdG4sICd4Jyk7XG4gICAgICAgICAgcmVtb3ZlQnRuLnNldENzc1N0eWxlcyh7XG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICcwJyxcbiAgICAgICAgICAgIHdpZHRoOiAnMTRweCcsXG4gICAgICAgICAgICBoZWlnaHQ6ICcxNHB4J1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJlbW92ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHsgdm9pZCAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgc2l0ZS5wdWJsaXNoUGF0aHM/LnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgcmVuZGVyUGF0aHMoKTtcbiAgICAgICAgICB9KSgpOyB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICB1cGRhdGVWaXNpYmlsaXR5ID0gKCkgPT4ge1xuICAgICAgcmVuZGVyUGF0aHMoKTtcbiAgICB9O1xuICAgIHVwZGF0ZVZpc2liaWxpdHkoKTtcblxuICAgIC8vIFx1MjUwMFx1MjUwMCBBZHZhbmNlZCBDdXN0b21pemF0aW9uIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuICAgIG5ldyBTZXR0aW5nKHJvb3QpXG4gICAgICAuc2V0TmFtZSgnQWR2YW5jZWQgU2V0dGluZ3MnKVxuICAgICAgLnNldERlc2MoJ0NvbmZpZ3VyZSBtZXRhZGF0YSwgc3R5bGluZywgYW5kIGV4Y2x1c2lvbnMgZm9yIHRoaXMgc2l0ZS4nKVxuICAgICAgLmFkZEJ1dHRvbihiID0+IHtcbiAgICAgICAgYi5zZXRCdXR0b25UZXh0KCdFZGl0IHNldHRpbmdzJykub25DbGljaygoKSA9PiB7XG4gICAgICAgICAgbmV3IEVkaXRTaXRlTW9kYWwodGhpcy5hcHAsIHRoaXMucGx1Z2luLCBzaXRlLCAoKSA9PiB0aGlzLnJlZnJlc2goKSkub3BlbigpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgLy8gXHUyNTAwXHUyNTAwIFN0YXR1cyBhbmQgRGVwbG95IEluZm8gXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXG4gICAgY29uc3QgZGVwbG95VGFyZ2V0ID0gc2l0ZS5kZXBsb3lUYXJnZXQgPz8gKHMuY2xvdWRmbGFyZVRva2VuID8gJ2Nsb3VkZmxhcmUnIDogJ2dpdGh1Yi1hY3Rpb25zJyk7XG4gICAgY29uc3QgdGFyZ2V0TGFiZWwgPSBkZXBsb3lUYXJnZXQgPT09ICdjbG91ZGZsYXJlJyA/ICdDbG91ZGZsYXJlIFBhZ2VzJyA6ICdHaXRIdWIgQWN0aW9ucyc7XG4gICAgXG4gICAgY29uc3QgZGVwbG95U2V0dGluZyA9IG5ldyBTZXR0aW5nKHJvb3QpXG4gICAgICAuc2V0TmFtZSgnRGVwbG95bWVudCBJbmZvJylcbiAgICAgIC5zZXREZXNjKGBEZXBsb3k6ICR7dGFyZ2V0TGFiZWx9YCk7XG5cbiAgICBpZiAoc2l0ZS5zaXRlVXJsKSB7XG4gICAgICBkZXBsb3lTZXR0aW5nLmFkZEJ1dHRvbihiID0+IHtcbiAgICAgICAgYi5zZXRJY29uKCdleHRlcm5hbC1saW5rJykuc2V0QnV0dG9uVGV4dCgnT3BlbiBTaXRlJykub25DbGljaygoKSA9PiB7XG4gICAgICAgICAgd2luZG93Lm9wZW4oYGh0dHBzOi8vJHtzaXRlLnNpdGVVcmx9YCwgJ19ibGFuaycpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChkZXBsb3lUYXJnZXQgPT09ICdjbG91ZGZsYXJlJykge1xuICAgICAgbmV3IFNldHRpbmcocm9vdClcbiAgICAgICAgLnNldE5hbWUoJ0dpdEh1YiBDb25uZWN0aW9uJylcbiAgICAgICAgLnNldERlc2MoJ0lmIENsb3VkZmxhcmUgc2F5cyBcIkRpc2Nvbm5lY3RlZCBmcm9tIEdpdFwiLCBjbGljayBoZXJlIHRvIGdyYW50IGFjY2VzcyB0byB5b3VyIHJlcG9zaXRvcnkuJylcbiAgICAgICAgLmFkZEJ1dHRvbihiID0+IGIuc2V0QnV0dG9uVGV4dCgnR3JhbnQgQWNjZXNzJykub25DbGljaygoKSA9PiB7XG4gICAgICAgICAgd2luZG93Lm9wZW4oQ0xPVURGTEFSRV9BUFBfVVJMLCAnX2JsYW5rJyk7XG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICAvLyBcdTI1MDBcdTI1MDAgQWN0aW9ucyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcbiAgICBjb25zdCBhY3Rpb25TZXR0aW5nID0gbmV3IFNldHRpbmcocm9vdCkuc2V0TmFtZSgnQWN0aW9ucycpO1xuICAgIFxuICAgIGFjdGlvblNldHRpbmcuY29udHJvbEVsLnNldENzc1N0eWxlcyh7XG4gICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICBmbGV4RGlyZWN0aW9uOiAncm93JyxcbiAgICAgIGdhcDogJzhweCcsXG4gICAgICBmbGV4V3JhcDogJ3dyYXAnLFxuICAgICAganVzdGlmeUNvbnRlbnQ6ICdmbGV4LWVuZCdcbiAgICB9KTtcblxuICAgIGFjdGlvblNldHRpbmdcbiAgICAgIC5hZGRCdXR0b24oYiA9PiB7XG4gICAgICAgIGIuc2V0QnV0dG9uVGV4dCgnUHVibGlzaCcpXG4gICAgICAgICAuc2V0Q3RhKClcbiAgICAgICAgIC5vbkNsaWNrKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgYi5zZXREaXNhYmxlZCh0cnVlKTtcbiAgICAgICAgICAgYi5zZXRCdXR0b25UZXh0KCdQdWJsaXNoaW5nLi4uJyk7XG4gICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uZG9QdWJsaXNoKCk7XG4gICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgYi5zZXREaXNhYmxlZChmYWxzZSk7XG4gICAgICAgICAgICAgYi5zZXRCdXR0b25UZXh0KCdQdWJsaXNoJyk7XG4gICAgICAgICAgIH1cbiAgICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5hZGRCdXR0b24oYiA9PiB7XG4gICAgICAgIGIuc2V0QnV0dG9uVGV4dCgnVW5wdWJsaXNoJyk7XG4gICAgICAgIGlmICghc2l0ZS5pc1B1Ymxpc2hlZCkgYi5zZXREaXNhYmxlZCh0cnVlKTtcbiAgICAgICAgZWxzZSBiLnNldERlc3RydWN0aXZlKCk7XG4gICAgICAgIGIub25DbGljaygoKSA9PiB7XG4gICAgICAgICAgbmV3IFVucHVibGlzaE1vZGFsKHRoaXMuYXBwLCB0aGlzLnBsdWdpbiwgKCkgPT4gdGhpcy5yZWZyZXNoKCkpLm9wZW4oKTtcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmFkZEJ1dHRvbihiID0+IHtcbiAgICAgICAgYi5zZXRCdXR0b25UZXh0KCdEZWxldGUnKVxuICAgICAgICAgLnNldERlc3RydWN0aXZlKClcbiAgICAgICAgIC5vbkNsaWNrKCgpID0+IHtcbiAgICAgICAgICAgbmV3IFJlbW92ZVNpdGVNb2RhbCh0aGlzLmFwcCwgdGhpcy5wbHVnaW4sIHNpdGUsICgpID0+IHtcbiAgICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgICAgfSkub3BlbigpO1xuICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxufSIsICIvKipcbiAqIFRva2VuIHN0b3JhZ2UgYmFja2VkIGJ5IEVsZWN0cm9uIGBzYWZlU3RvcmFnZWAsIHdoaWNoIGVuY3J5cHRzL2RlY3J5cHRzIHdpdGggYVxuICoga2V5IGhlbGQgaW4gdGhlIE9TIGtleWNoYWluIChtYWNPUyBLZXljaGFpbiAvIFdpbmRvd3MgRFBBUEkgLyBMaW51eCBsaWJzZWNyZXQpLlxuICpcbiAqIFdlIHBlcnNpc3QgT05MWSB0aGUgY2lwaGVydGV4dCAoYmFzZTY0KSBpbiBgZGF0YS5qc29uYDsgdGhlIHBsYWludGV4dCB0b2tlblxuICogbGl2ZXMgaW4gbWVtb3J5IGF0IHJ1bnRpbWUgYW5kIGlzIG5ldmVyIHdyaXR0ZW4gdG8gZGlzay4gVGhpcyBrZWVwcyB0aGUgdXNlcidzXG4gKiBHaXRIdWIvQ2xvdWRmbGFyZSB0b2tlbnMgb3V0IG9mIHRoZSBwbGFpbnRleHQgc2V0dGluZ3MgZmlsZS5cbiAqL1xuXG5pbnRlcmZhY2UgU2FmZVN0b3JhZ2Uge1xuICBpc0VuY3J5cHRpb25BdmFpbGFibGUoKTogYm9vbGVhbjtcbiAgZW5jcnlwdFN0cmluZyhwbGFpbjogc3RyaW5nKTogQnVmZmVyO1xuICBkZWNyeXB0U3RyaW5nKGJ1ZjogQnVmZmVyKTogc3RyaW5nO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlU2FmZVN0b3JhZ2UoKTogU2FmZVN0b3JhZ2UgfCBudWxsIHtcbiAgdHJ5IHtcbiAgICAvLyBPYnNpZGlhbidzIHJlbmRlcmVyIGhhcyBub2RlSW50ZWdyYXRpb24sIHNvIGByZXF1aXJlKCdlbGVjdHJvbicpYCB3b3Jrcy5cbiAgICAvLyBOZXdlciBFbGVjdHJvbiBleHBvc2VzIGBzYWZlU3RvcmFnZWAgZGlyZWN0bHk7IG9sZGVyIHZlcnNpb25zIG9ubHkgdmlhIHRoZVxuICAgIC8vIGRlcHJlY2F0ZWQgYHJlbW90ZWAgbW9kdWxlIFx1MjAxNCB0cnkgYm90aCwgZmFsbCBiYWNrIHRvIG51bGwgaWYgbmVpdGhlci5cbiAgICAvLyBPYnNpZGlhbiBwbHVnaW4gZXhlY3V0aW9uIGVudmlyb25tZW50IHByb3ZpZGVzIHJlcXVpcmUoJ2VsZWN0cm9uJykuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby12YXItcmVxdWlyZXMsIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZXF1aXJlLWltcG9ydHMsIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtY2FsbCAtLSByZXF1aXJlZCB0byBhY2Nlc3MgZWxlY3Ryb24gc2FmZVN0b3JhZ2UgaW4gT2JzaWRpYW5cbiAgICBjb25zdCBlbGVjdHJvbiA9IHJlcXVpcmUoJ2VsZWN0cm9uJykgYXMgdW5rbm93biBhcyB7XG4gICAgICBzYWZlU3RvcmFnZT86IFNhZmVTdG9yYWdlO1xuICAgICAgcmVtb3RlPzogeyBzYWZlU3RvcmFnZT86IFNhZmVTdG9yYWdlIH07XG4gICAgfTtcbiAgICByZXR1cm4gZWxlY3Ryb24uc2FmZVN0b3JhZ2UgPz8gZWxlY3Ryb24ucmVtb3RlPy5zYWZlU3RvcmFnZSA/PyBudWxsO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5jb25zdCBzYWZlU3RvcmFnZSA9IHJlc29sdmVTYWZlU3RvcmFnZSgpO1xuXG4vKiogVHJ1ZSB3aGVuIHRoZSBPUy1iYWNrZWQgZW5jcnlwdGlvbiBpcyB1c2FibGUgKGUuZy4gYSBrZXlyaW5nIGlzIHByZXNlbnQpLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU2VjdXJlU3RvcmFnZUF2YWlsYWJsZSgpOiBib29sZWFuIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFzYWZlU3RvcmFnZSAmJiBzYWZlU3RvcmFnZS5pc0VuY3J5cHRpb25BdmFpbGFibGUoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8qKiBFbmNyeXB0IGEgdG9rZW4gdG8gYSBiYXNlNjQgc3RyaW5nLiBFbXB0eSBpbiBcdTIxOTIgZW1wdHkgb3V0LiBUaHJvd3MgaWYgdW5hdmFpbGFibGUuICovXG5leHBvcnQgZnVuY3Rpb24gZW5jcnlwdFNlY3JldChwbGFpbjogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKCFwbGFpbikgcmV0dXJuICcnO1xuICBpZiAoIWlzU2VjdXJlU3RvcmFnZUF2YWlsYWJsZSgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdTZWN1cmUgc3RvcmFnZSBpcyB1bmF2YWlsYWJsZSBvbiB0aGlzIHN5c3RlbS4nKTtcbiAgfVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1jYWxsLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLW1lbWJlci1hY2Nlc3MsIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtcmV0dXJuIC0tIFNhZmVTdG9yYWdlIHR5cGluZ3MgYXJlIGluY29tcGxldGVcbiAgcmV0dXJuIHNhZmVTdG9yYWdlIS5lbmNyeXB0U3RyaW5nKHBsYWluKS50b1N0cmluZygnYmFzZTY0Jyk7XG59XG5cbi8qKiBEZWNyeXB0IGEgYmFzZTY0IGNpcGhlcnRleHQgYmFjayB0byB0aGUgdG9rZW4uIFJldHVybnMgJycgb24gYW55IGZhaWx1cmUuICovXG5leHBvcnQgZnVuY3Rpb24gZGVjcnlwdFNlY3JldChiNjQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmICghYjY0KSByZXR1cm4gJyc7XG4gIGlmICghaXNTZWN1cmVTdG9yYWdlQXZhaWxhYmxlKCkpIHJldHVybiAnJztcbiAgdHJ5IHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1jYWxsLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLXJldHVybiwgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1tZW1iZXItYWNjZXNzIC0tIEJ1ZmZlciB0eXBpbmdzIG1heSBiZSBtaXNzaW5nIGluIE9ic2lkaWFuIGNvbnRleHRcbiAgICByZXR1cm4gc2FmZVN0b3JhZ2UhLmRlY3J5cHRTdHJpbmcoQnVmZmVyLmZyb20oYjY0LCAnYmFzZTY0JykpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBBcHAsIG5vcm1hbGl6ZVBhdGggfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgeyBHaXRIdWJBcGkgfSBmcm9tICcuLi9hcGkvZ2l0aHViQXBpJztcbmltcG9ydCB7IEJhY2t1cFJlc3VsdCwgTm90ZUZsYXJlU2V0dGluZ3MsIFVwbG9hZEZpbGUgfSBmcm9tICcuLi9jb3JlL3R5cGVzJztcblxuY29uc3QgREVGQVVMVF9JR05PUkVfUEFUVEVSTlMgPSBbXG4gICcuRFNfU3RvcmUnLFxuICAnVGh1bWJzLmRiJyxcbiAgJ2Rlc2t0b3AuaW5pJyxcbiAgJy50cmFzaC8nLFxuICAnbm9kZV9tb2R1bGVzLycsXG5dO1xuXG5pbnRlcmZhY2UgTG9jYWxCYWNrdXBGaWxlIHtcbiAgY29udGVudDogc3RyaW5nO1xuICBzaGE6IHN0cmluZztcbn1cblxuLyoqXG4gKiBNaXJyb3JzIHRoZSBzZWxlY3RlZCB2YXVsdCBjb250ZW50IHRvIHByaXZhdGUgcmVtb3RlIHN0b3JhZ2UuXG4gKiBUaGUgbG9jYWwgdmF1bHQgaXMgYXV0aG9yaXRhdGl2ZTsgdGhlcmUgaXMgbm8gcHVsbCwgY29uZmxpY3QsIGJyYW5jaCwgb3JcbiAqIG1hbnVhbCBjb21taXQgd29ya2Zsb3cgZXhwb3NlZCB0byB1c2Vycy5cbiAqL1xuZXhwb3J0IGNsYXNzIEJhY2t1cEVuZ2luZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYXBwOiBBcHAsXG4gICAgcHJpdmF0ZSBzZXR0aW5nczogTm90ZUZsYXJlU2V0dGluZ3MsXG4gICAgcHJpdmF0ZSBvblByb2dyZXNzOiAobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkID0gKCkgPT4ge30sXG4gICkge31cblxuICBhc3luYyBiYWNrdXAoKTogUHJvbWlzZTxCYWNrdXBSZXN1bHQ+IHtcbiAgICBjb25zdCByZXN1bHQ6IEJhY2t1cFJlc3VsdCA9IHsgc3VjY2VzczogdHJ1ZSwgdXBkYXRlZDogMCwgZXJyb3JzOiBbXSB9O1xuICAgIGNvbnN0IHsgZ2l0aHViT3duZXIsIGdpdGh1YlRva2VuLCBiYWNrdXAgfSA9IHRoaXMuc2V0dGluZ3M7XG5cbiAgICBpZiAoIWdpdGh1YlRva2VuIHx8ICFnaXRodWJPd25lciB8fCAhYmFja3VwLnJlcG9zaXRvcnkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICB1cGRhdGVkOiAwLFxuICAgICAgICBlcnJvcnM6IFsnQmFja3VwIGlzIG5vdCBjb25maWd1cmVkLiBPcGVuIE5vdGVGbGFyZSBzZXR0aW5ncyB0byBmaW5pc2ggc2V0dXAuJ10sXG4gICAgICB9O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBsZXQgZ2l0aHViID0gbmV3IEdpdEh1YkFwaShnaXRodWJUb2tlbiwgZ2l0aHViT3duZXIsIGJhY2t1cC5yZXBvc2l0b3J5LCAnbWFpbicpO1xuICAgICAgY29uc3QgcmVwb3NpdG9yeUV4aXN0cyA9IGF3YWl0IGdpdGh1Yi5yZXBvRXhpc3RzKCk7XG4gICAgICBpZiAoIXJlcG9zaXRvcnlFeGlzdHMpIHtcbiAgICAgICAgdGhpcy5vblByb2dyZXNzKCdQcmVwYXJpbmcgcHJpdmF0ZSBiYWNrdXAgc3RvcmFnZVx1MjAyNicpO1xuICAgICAgICBhd2FpdCBnaXRodWIuY3JlYXRlUmVwbyh0cnVlKTtcbiAgICAgICAgaWYgKCEoYXdhaXQgZ2l0aHViLndhaXRGb3JSZXBvKDMwMDAwKSkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RpbWVkIG91dCB3aGlsZSBwcmVwYXJpbmcgcHJpdmF0ZSBiYWNrdXAgc3RvcmFnZS4nKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICghKGF3YWl0IGdpdGh1Yi5pc1JlcG9Qcml2YXRlKCkpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnQmFja3VwIHN0b3BwZWQgYmVjYXVzZSBpdHMgc3RvcmFnZSBsb2NhdGlvbiBpcyBwdWJsaWMuIFJlbmFtZSB0aGF0IHJlcG9zaXRvcnkgaW4gR2l0SHViIG9yIG1ha2UgaXQgcHJpdmF0ZSwgdGhlbiB0cnkgYWdhaW4uJyxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgbGV0IGJyYW5jaCA9ICdtYWluJztcbiAgICAgIHRyeSB7XG4gICAgICAgIGJyYW5jaCA9IGF3YWl0IGdpdGh1Yi5nZXREZWZhdWx0QnJhbmNoKCk7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgLy8gUmVwb3NpdG9yaWVzIGNyZWF0ZWQgYnkgTm90ZUZsYXJlIHVzZSBtYWluLlxuICAgICAgfVxuICAgICAgZ2l0aHViID0gbmV3IEdpdEh1YkFwaShnaXRodWJUb2tlbiwgZ2l0aHViT3duZXIsIGJhY2t1cC5yZXBvc2l0b3J5LCBicmFuY2gpO1xuXG4gICAgICBjb25zdCBsb2NhbEZpbGVzID0gYXdhaXQgdGhpcy5jb2xsZWN0TG9jYWxGaWxlcygpO1xuICAgICAgY29uc3QgcmVtb3RlRmlsZXMgPSBhd2FpdCB0aGlzLmdldFJlbW90ZUZpbGVzKGdpdGh1Yik7XG4gICAgICBjb25zdCB1cGxvYWRzOiBVcGxvYWRGaWxlW10gPSBbXTtcblxuICAgICAgZm9yIChjb25zdCBbcGF0aCwgbG9jYWxdIG9mIGxvY2FsRmlsZXMpIHtcbiAgICAgICAgaWYgKHJlbW90ZUZpbGVzLmdldChwYXRoKSAhPT0gbG9jYWwuc2hhKSB7XG4gICAgICAgICAgdXBsb2Fkcy5wdXNoKHsgcGF0aCwgY29udGVudDogbG9jYWwuY29udGVudCB9KTtcbiAgICAgICAgfVxuICAgICAgICByZW1vdGVGaWxlcy5kZWxldGUocGF0aCk7XG4gICAgICB9XG5cbiAgICAgIGZvciAoY29uc3QgcGF0aCBvZiByZW1vdGVGaWxlcy5rZXlzKCkpIHtcbiAgICAgICAgY29uc3QgZXhpc3RzQnV0V2FzVW5yZWFkYWJsZSA9XG4gICAgICAgICAgdGhpcy5pc0luQmFja3VwU2NvcGUocGF0aCkgJiYgdGhpcy5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKHBhdGgpICE9PSBudWxsO1xuICAgICAgICBpZiAoIXRoaXMuaXNJZ25vcmVkKHBhdGgpICYmICFleGlzdHNCdXRXYXNVbnJlYWRhYmxlKSB7XG4gICAgICAgICAgdXBsb2Fkcy5wdXNoKHsgcGF0aCwgY29udGVudDogbnVsbCB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodXBsb2Fkcy5sZW5ndGggPT09IDApIHJldHVybiByZXN1bHQ7XG5cbiAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IG5ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoKTtcbiAgICAgIGNvbnN0IGNvbW1pdHRlZCA9IGF3YWl0IGdpdGh1Yi5jb21taXRGaWxlcyhcbiAgICAgICAgdXBsb2FkcyxcbiAgICAgICAgYE5vdGVGbGFyZSBiYWNrdXAgXHUwMEI3ICR7dGltZXN0YW1wfWAsXG4gICAgICAgIChkb25lLCB0b3RhbCkgPT4gdGhpcy5vblByb2dyZXNzKGBCYWNraW5nIHVwICR7ZG9uZX0vJHt0b3RhbH1cdTIwMjZgKSxcbiAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAnJyxcbiAgICAgICAgeyBpc1ByaXZhdGU6IHRydWUgfSxcbiAgICAgICk7XG5cbiAgICAgIHJlc3VsdC5zdWNjZXNzID0gY29tbWl0dGVkLnN1Y2Nlc3M7XG4gICAgICByZXN1bHQudXBkYXRlZCA9IGNvbW1pdHRlZC51cGxvYWRlZDtcbiAgICAgIHJlc3VsdC5lcnJvcnMgPSBjb21taXR0ZWQuZXJyb3JzO1xuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICByZXN1bHQuc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgcmVzdWx0LmVycm9ycy5wdXNoKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogJ0JhY2t1cCBmYWlsZWQuJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgY29sbGVjdExvY2FsRmlsZXMoKTogUHJvbWlzZTxNYXA8c3RyaW5nLCBMb2NhbEJhY2t1cEZpbGU+PiB7XG4gICAgY29uc3QgZmlsZXMgPSBuZXcgTWFwPHN0cmluZywgTG9jYWxCYWNrdXBGaWxlPigpO1xuICAgIGNvbnN0IGZvbGRlciA9IHRoaXMuc2V0dGluZ3MuYmFja3VwLmZvbGRlclxuICAgICAgPyBub3JtYWxpemVQYXRoKHRoaXMuc2V0dGluZ3MuYmFja3VwLmZvbGRlcilcbiAgICAgIDogJyc7XG5cbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgdGhpcy5hcHAudmF1bHQuZ2V0RmlsZXMoKSkge1xuICAgICAgaWYgKGZvbGRlciAmJiBmaWxlLnBhdGggIT09IGZvbGRlciAmJiAhZmlsZS5wYXRoLnN0YXJ0c1dpdGgoYCR7Zm9sZGVyfS9gKSkgY29udGludWU7XG4gICAgICBpZiAodGhpcy5pc0lnbm9yZWQoZmlsZS5wYXRoKSkgY29udGludWU7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYXdhaXQgdGhpcy5hcHAudmF1bHQucmVhZEJpbmFyeShmaWxlKSk7XG4gICAgICAgIGZpbGVzLnNldChmaWxlLnBhdGgsIHtcbiAgICAgICAgICBjb250ZW50OiB0aGlzLnRvQmFzZTY0KGJ5dGVzKSxcbiAgICAgICAgICBzaGE6IGF3YWl0IHRoaXMuY29tcHV0ZUdpdEJsb2JTaGEoYnl0ZXMpLFxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvLyBBIHRyYW5zaWVudGx5IHVucmVhZGFibGUgZmlsZSBpcyBza2lwcGVkIHdpdGhvdXQgZGVsZXRpbmcgaXRzIGJhY2t1cC5cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmlsZXM7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGdldFJlbW90ZUZpbGVzKGdpdGh1YjogR2l0SHViQXBpKTogUHJvbWlzZTxNYXA8c3RyaW5nLCBzdHJpbmc+PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHRyZWUgPSBhd2FpdCBnaXRodWIubGlzdFRyZWUoKTtcbiAgICAgIHJldHVybiBuZXcgTWFwKFxuICAgICAgICB0cmVlXG4gICAgICAgICAgLmZpbHRlcigoZmlsZSkgPT4gIXRoaXMuaXNJZ25vcmVkKGZpbGUucGF0aCkpXG4gICAgICAgICAgLm1hcCgoZmlsZSkgPT4gW2ZpbGUucGF0aCwgZmlsZS5zaGFdKSxcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIGNvbnN0IHN0YXR1cyA9IChlcnJvciBhcyBFcnJvciAmIHsgc3RhdHVzPzogbnVtYmVyIH0pLnN0YXR1cztcbiAgICAgIGlmIChzdGF0dXMgPT09IDQwNCB8fCAoZXJyb3IgYXMgRXJyb3IpLm1lc3NhZ2UuaW5jbHVkZXMoJzQwNCcpKSByZXR1cm4gbmV3IE1hcCgpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpc0lnbm9yZWQocGF0aDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgY29uZmlnRGlyID0gdGhpcy5hcHAudmF1bHQuY29uZmlnRGlyO1xuICAgIGlmIChwYXRoID09PSBjb25maWdEaXIgfHwgcGF0aC5zdGFydHNXaXRoKGAke2NvbmZpZ0Rpcn0vYCkpIHJldHVybiB0cnVlO1xuICAgIFxuICAgIHJldHVybiBERUZBVUxUX0lHTk9SRV9QQVRURVJOUy5zb21lKChwYXR0ZXJuKSA9PiB7XG4gICAgICBpZiAocGF0dGVybi5lbmRzV2l0aCgnLycpKSB7XG4gICAgICAgIHJldHVybiBwYXRoID09PSBwYXR0ZXJuLnNsaWNlKDAsIC0xKSB8fCBwYXRoLnN0YXJ0c1dpdGgocGF0dGVybik7XG4gICAgICB9XG4gICAgICByZXR1cm4gcGF0aCA9PT0gcGF0dGVybiB8fCBwYXRoLmVuZHNXaXRoKCcvJyArIHBhdHRlcm4pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0luQmFja3VwU2NvcGUocGF0aDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZm9sZGVyID0gdGhpcy5zZXR0aW5ncy5iYWNrdXAuZm9sZGVyXG4gICAgICA/IG5vcm1hbGl6ZVBhdGgodGhpcy5zZXR0aW5ncy5iYWNrdXAuZm9sZGVyKVxuICAgICAgOiAnJztcbiAgICByZXR1cm4gIWZvbGRlciB8fCBwYXRoID09PSBmb2xkZXIgfHwgcGF0aC5zdGFydHNXaXRoKGAke2ZvbGRlcn0vYCk7XG4gIH1cblxuICBwcml2YXRlIHRvQmFzZTY0KGJ5dGVzOiBVaW50OEFycmF5KTogc3RyaW5nIHtcbiAgICBsZXQgYmluYXJ5ID0gJyc7XG4gICAgY29uc3QgY2h1bmtTaXplID0gMHg4MDAwO1xuICAgIGZvciAobGV0IG9mZnNldCA9IDA7IG9mZnNldCA8IGJ5dGVzLmxlbmd0aDsgb2Zmc2V0ICs9IGNodW5rU2l6ZSkge1xuICAgICAgYmluYXJ5ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoLi4uYnl0ZXMuc3ViYXJyYXkob2Zmc2V0LCBvZmZzZXQgKyBjaHVua1NpemUpKTtcbiAgICB9XG4gICAgcmV0dXJuIGJ0b2EoYmluYXJ5KTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgY29tcHV0ZUdpdEJsb2JTaGEoY29udGVudDogVWludDhBcnJheSk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgaGVhZGVyID0gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKGBibG9iICR7Y29udGVudC5ieXRlTGVuZ3RofVxcMGApO1xuICAgIGNvbnN0IHBheWxvYWQgPSBuZXcgVWludDhBcnJheShoZWFkZXIubGVuZ3RoICsgY29udGVudC5sZW5ndGgpO1xuICAgIHBheWxvYWQuc2V0KGhlYWRlcik7XG4gICAgcGF5bG9hZC5zZXQoY29udGVudCwgaGVhZGVyLmxlbmd0aCk7XG4gICAgY29uc3QgaGFzaCA9IGF3YWl0IGNyeXB0by5zdWJ0bGUuZGlnZXN0KCdTSEEtMScsIHBheWxvYWQpO1xuICAgIHJldHVybiBBcnJheS5mcm9tKG5ldyBVaW50OEFycmF5KGhhc2gpKVxuICAgICAgLm1hcCgoYnl0ZSkgPT4gYnl0ZS50b1N0cmluZygxNikucGFkU3RhcnQoMiwgJzAnKSlcbiAgICAgIC5qb2luKCcnKTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFFQSxZQUFRLFlBQVksU0FBTztBQUN6QixVQUFJLE9BQU8sUUFBUSxVQUFVO0FBQzNCLGVBQU8sT0FBTyxVQUFVLEdBQUc7QUFBQSxNQUM3QjtBQUNBLFVBQUksT0FBTyxRQUFRLFlBQVksSUFBSSxLQUFLLE1BQU0sSUFBSTtBQUNoRCxlQUFPLE9BQU8sVUFBVSxPQUFPLEdBQUcsQ0FBQztBQUFBLE1BQ3JDO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFNQSxZQUFRLE9BQU8sQ0FBQyxNQUFNLFNBQVMsS0FBSyxNQUFNLEtBQUssQ0FBQUEsVUFBUUEsTUFBSyxTQUFTLElBQUk7QUFNekUsWUFBUSxlQUFlLENBQUMsS0FBSyxLQUFLLE9BQU8sR0FBRyxVQUFVO0FBQ3BELFVBQUksVUFBVTtBQUFPLGVBQU87QUFDNUIsVUFBSSxDQUFDLFFBQVEsVUFBVSxHQUFHLEtBQUssQ0FBQyxRQUFRLFVBQVUsR0FBRztBQUFHLGVBQU87QUFDL0QsY0FBUyxPQUFPLEdBQUcsSUFBSSxPQUFPLEdBQUcsS0FBSyxPQUFPLElBQUksS0FBTTtBQUFBLElBQ3pEO0FBTUEsWUFBUSxhQUFhLENBQUMs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QUFPLEVBQUUsU0FBUztBQUNwQjsiLAogICJuYW1lcyI6IFsibm9kZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtYXgiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJpbmRleCIsICJtb2R1bGUiLCAicmVxdWlyZV9jb25zdGFudHMiLCAibW9kdWxlIiwgInJlcXVpcmVfdXRpbHMiLCAibW9kdWxlIiwgInJlcXVpcmVfcGFyc2UiLCAibW9kdWxlIiwgImJyYW5jaCIsICJvcHRzIiwgInZhbHVlIiwgInJlc3QiLCAic291cmNlIiwgIm1vZHVsZSIsICJpc01hdGNoIiwgInN0YXRlIiwgInJlcXVpcmVfcGljb21hdGNoIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAiaXNNYXRjaCIsICJpbXBvcnRfb2JzaWRpYW4iLCAiX2EiLCAiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfb2JzaWRpYW4iLCAiaW1wb3J0X29ic2lkaWFuIiwgIkxFQURJTkdfQkxPQ0tfUkUiLCAiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfb2JzaWRpYW4iLCAiaW1wb3J0X29ic2lkaWFuIiwgIkNMT1VERkxBUkVfQVBQX1VSTCIsICJfYSIsICJpbXBvcnRfb2JzaWRpYW4iXQp9Cg==
