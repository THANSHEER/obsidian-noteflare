var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
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

// src/core/settings.ts
var settings_exports = {};
__export(settings_exports, {
  DEFAULT_BACKUP_SETTINGS: () => DEFAULT_BACKUP_SETTINGS,
  DEFAULT_EXCLUDE_PATTERNS: () => DEFAULT_EXCLUDE_PATTERNS,
  DEFAULT_SETTINGS: () => DEFAULT_SETTINGS,
  createSiteProfile: () => createSiteProfile
});
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
    lastPublishFailed: false,
    lastPublishError: "",
    hostingProvider: "cloudflare",
    ...partial
  };
}
var DEFAULT_EXCLUDE_PATTERNS, DEFAULT_BACKUP_SETTINGS, DEFAULT_SETTINGS;
var init_settings = __esm({
  "src/core/settings.ts"() {
    DEFAULT_EXCLUDE_PATTERNS = ["private/**", "*.private.md", "Templates/**"];
    DEFAULT_BACKUP_SETTINGS = {
      repository: "",
      repoVisibility: "private",
      backupOnChange: true,
      intervalMinutes: 60,
      lastBackupAttemptAt: "",
      lastBackupAt: "",
      lastBackupError: ""
    };
    DEFAULT_SETTINGS = {
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
      masterRepositoryPrivate: false,
      defaultViewLocation: "left"
    };
  }
});

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => NoteFlarePlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian23 = require("obsidian");

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
  /**
   * Configures GitHub Pages for the repository using GitHub Actions as the source.
   * This prevents the 404 error during the first deploy-pages action.
   */
  async enableGitHubPages() {
    const resp = await doRequest(`${GITHUB_API}/repos/${this.owner}/${this.repo}/pages`, {
      method: "POST",
      headers: {
        ...this.headers,
        Accept: "application/vnd.github.v3+json"
      },
      body: JSON.stringify({
        build_type: "workflow"
      })
    });
    if (!resp.ok && resp.status !== 409) {
      const text = await resp.text().catch(() => "");
      throw new Error(`Failed to enable GitHub Pages: ${resp.status} ${text}`);
    }
  }
  /**
   * Returns high-level repository metadata for the live status dashboard.
   * Returns null (never throws) so callers can fall back to cached data.
   */
  async getRepoInfo() {
    try {
      const resp = await doRequest(`${GITHUB_API}/repos/${this.owner}/${this.repo}`, {
        headers: this.headers
      });
      if (!resp.ok)
        return null;
      const data = await resp.json();
      return {
        htmlUrl: data.html_url || "",
        pushedAt: data.pushed_at || "",
        isPrivate: data.private || false,
        description: data.description || ""
      };
    } catch (e) {
      return null;
    }
  }
  /**
   * Returns the most recent workflow run for the given workflow file.
   * `workflowFile` is the filename under `.github/workflows/`, e.g. `deploy.yml`.
   * Returns null (never throws) on any error.
   */
  async getLatestWorkflowRun(workflowFile) {
    var _a;
    try {
      const resp = await doRequest(
        `${GITHUB_API}/repos/${this.owner}/${this.repo}/actions/workflows/${encodeURIComponent(workflowFile)}/runs?per_page=1`,
        { headers: this.headers }
      );
      if (!resp.ok)
        return null;
      const data = await resp.json();
      const run = (_a = data.workflow_runs) == null ? void 0 : _a[0];
      if (!run)
        return null;
      return {
        status: run.status || "",
        conclusion: run.conclusion || "",
        htmlUrl: run.html_url || "",
        createdAt: run.created_at || "",
        updatedAt: run.updated_at || ""
      };
    } catch (e) {
      return null;
    }
  }
  /**
   * Returns the tip commit info for a branch.
   * Returns null (never throws) on any error.
   */
  async getLatestCommit(branch) {
    const ref = branch || this.branch || "main";
    try {
      const resp = await doRequest(
        `${GITHUB_API}/repos/${this.owner}/${this.repo}/commits/${encodeURIComponent(ref)}`,
        { headers: this.headers }
      );
      if (!resp.ok)
        return null;
      const data = await resp.json();
      const commit = data.commit;
      const commitAuthor = commit == null ? void 0 : commit.author;
      return {
        sha: (data.sha || "").slice(0, 7),
        message: ((commit == null ? void 0 : commit.message) || "").split("\n")[0],
        date: (commitAuthor == null ? void 0 : commitAuthor.date) || "",
        author: (commitAuthor == null ? void 0 : commitAuthor.name) || "",
        htmlUrl: data.html_url || ""
      };
    } catch (e) {
      return null;
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
    const result = { success: true, uploaded: 0, noteCount: 0, failed: 0, errors: [], fixed: 0, issues: [] };
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
      const ref = await this.gh(refPath, "GET");
      headSha = ref.object.sha;
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
  /**
   * Remove a site's entire sub-folder (`sites/<siteId>/`) from the master repo
   * in a single commit using null-SHA tree entries (the same mirror-deletion
   * mechanism used by publish). Does NOT delete the master repo — other sites
   * may still be living there. Best-effort: if the folder doesn't exist or the
   * repo is unreachable, this returns without throwing.
   */
  async deleteSiteFolder(siteId, branch) {
    const prefix = `sites/${siteId}/`;
    let headSha;
    let baseTreeSha;
    const refPath = `/repos/${this.owner}/${this.repo}/git/refs/heads/${encodeURIComponent(branch)}`;
    try {
      const ref = await this.gh(refPath, "GET");
      headSha = ref.object.sha;
      const headCommit = await this.gh(
        `/repos/${this.owner}/${this.repo}/git/commits/${headSha}`,
        "GET"
      );
      baseTreeSha = headCommit.tree.sha;
    } catch (e) {
      return;
    }
    let toDelete = [];
    try {
      const fullTree = await this.gh(
        `/repos/${this.owner}/${this.repo}/git/trees/${baseTreeSha}?recursive=1`,
        "GET"
      );
      toDelete = fullTree.tree.filter((item) => item.type === "blob" && item.path.startsWith(prefix)).map((item) => ({ path: item.path, mode: "100644", type: "blob", sha: null }));
    } catch (e) {
      return;
    }
    if (toDelete.length === 0)
      return;
    const tree = await this.gh(
      `/repos/${this.owner}/${this.repo}/git/trees`,
      "POST",
      { base_tree: baseTreeSha, tree: toDelete }
    );
    const commit = await this.gh(
      `/repos/${this.owner}/${this.repo}/git/commits`,
      "POST",
      { message: `NoteFlare: remove site ${siteId}`, tree: tree.sha, parents: [headSha] }
    );
    await this.gh(refPath, "PATCH", { sha: commit.sha, force: false });
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
        const err = new Error(message);
        err.status = resp.status;
        throw err;
      }
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      if (message.toLowerCase().includes("failed to fetch")) {
        const fetchErr = new Error(
          "Could not reach Cloudflare. Check your internet connection, firewall, or proxy, then try again."
        );
        fetchErr.status = 500;
        throw fetchErr;
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
  /**
   * Pause a Cloudflare Pages deployment — takes the site offline without
   * deleting the project or any content. `enableDeployment` restores it.
   * This is the correct backend for "Unpublish".
   */
  async disableDeployment(name) {
    await this.request(
      `/accounts/${this.accountId}/pages/projects/${name}`,
      "PATCH",
      {
        deployment_configs: { production: { deployment_enabled: false } }
      }
    );
  }
  async deleteProject(name) {
    await this.request(
      `/accounts/${this.accountId}/pages/projects/${name}`,
      "DELETE"
    );
  }
  async listDeployments(name) {
    return this.request(
      `/accounts/${this.accountId}/pages/projects/${name}/deployments`
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
var NODE_VERSION = "24";
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
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 'lts/*'
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Build all sites
        run: |
          mkdir -p build_output/sites
          found_sites=0
          for site_dir in sites/*/; do
            if [ -f "\${site_dir}package.json" ]; then
              echo "Building site in \${site_dir}..."
              (
                cd "\${site_dir}"
                npm ci || npm install
                npx mdgarden build
              )
              site_id=$(basename "\${site_dir}")
              cp -r "\${site_dir}public" "build_output/sites/\${site_id}"
              found_sites=$((found_sites + 1))
            fi
          done
          if [ "$found_sites" -eq 0 ]; then
            echo "No sites found to build."
            mkdir -p build_output
            echo "<h1>No sites published yet</h1>" > build_output/index.html
          else
            latest_site=""
            latest_time=0
            for site_dir in sites/*/; do
              if [ -f "\${site_dir}package.json" ]; then
                mtime=$(git log -1 --format="%ct" "\${site_dir}" 2>/dev/null || echo 0)
                if [ "$mtime" -gt "$latest_time" ]; then
                  latest_time="$mtime"
                  latest_site=$(basename "\${site_dir}")
                fi
              fi
            done
            if [ -z "$latest_site" ]; then
              latest_site=$(ls -1 build_output/sites | head -n 1)
            fi
            if [ -n "$latest_site" ]; then
              echo "Deploying '$latest_site' to root..."
              cp -r "sites/\${latest_site}/public/." build_output/
            fi
          fi
          mv build_output public
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
  /** Effective hosting provider for this site. */
  get hostingProvider() {
    return this.site.hostingProvider;
  }
  async publish() {
    var _a, _b;
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
      const isPrivate = await probe.isRepoPrivate();
      this.settings.masterRepositoryPrivate = isPrivate;
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
    if (this.hostingProvider === "github-pages") {
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
      `${rootDir}/content/`,
      { isPrivate: this.settings.masterRepositoryPrivate || false }
    );
    result.fixed = fixedCount;
    result.issues = issues;
    result.noteCount = files.length;
    if (result.success && this.hostingProvider === "cloudflare") {
      const cloudflare = new CloudflareApi(
        this.settings.cloudflareToken,
        this.settings.cloudflareAccount
      );
      try {
        await cloudflare.enableDeployment(this.site.cloudflareProject);
      } catch (err) {
        const msg = err.message;
        const status = err.status;
        if (status === 404 || msg.toLowerCase().includes("project not found")) {
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
      if (result.success) {
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
      }
      if (result.success) {
        try {
          await cloudflare.triggerDeployment(this.site.cloudflareProject, branch);
        } catch (err) {
          result.errors.push(`Cloudflare build: ${err.message}. ${RECONNECT_HINT}`);
          result.success = false;
        }
      }
    }
    this.site.lastPublishFailed = !result.success;
    this.site.lastPublishError = result.success ? "" : (_b = result.errors[0]) != null ? _b : "Unknown error";
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
    if (this.hostingProvider !== "cloudflare") {
      throw new Error("Unpublish via API is only supported for Cloudflare Pages sites.");
    }
    const cloudflare = new CloudflareApi(
      this.settings.cloudflareToken,
      this.settings.cloudflareAccount
    );
    await cloudflare.disableDeployment(this.site.cloudflareProject);
  }
};

// main.ts
init_settings();

// src/ui/settings/settingsTab.ts
var import_obsidian21 = require("obsidian");

// src/ui/settings/wizard/stepGitHub.ts
var import_obsidian6 = require("obsidian");

// src/ui/settings/settingsHelpers.ts
function createErrorEl(container) {
  const el = container.createEl("p", { cls: "setting-item-description" });
  el.setCssStyles({ color: "var(--text-error)" });
  el.hide();
  return el;
}
function showError(el, msg) {
  el.setText(msg);
  el.show();
}
function hideError(el) {
  el.hide();
}
function busy(btn, label) {
  btn.setDisabled(true).setButtonText(label);
}
function idle(btn, label) {
  btn.setDisabled(false).setButtonText(label);
}

// src/ui/settings/wizard/stepGitHub.ts
var GITHUB_TOKEN_URL = "https://github.com/settings/tokens/new?scopes=repo,workflow&description=NoteFlare";
function renderStepGitHub(tab, el) {
  const heading = new import_obsidian6.Setting(el);
  heading.setName("Connect GitHub");
  heading.setHeading();
  el.createEl("p", {
    cls: "setting-item-description",
    text: "GitHub stores your site and vault backup. Your token is encrypted in your OS keychain \u2014 never logged."
  });
  let tokenValue = tab.plugin.settings.githubToken;
  const tokenSetting = new import_obsidian6.Setting(el).setName("Personal access token");
  tokenSetting.descEl.appendText("Create one with ");
  tokenSetting.descEl.createEl("strong", { text: "repo" });
  tokenSetting.descEl.appendText(" + ");
  tokenSetting.descEl.createEl("strong", { text: "workflow" });
  tokenSetting.descEl.appendText(" scopes. ");
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
  const errorEl = createErrorEl(el);
  new import_obsidian6.Setting(el).addButton((btn) => {
    btn.setButtonText("Verify & continue").setCta();
    btn.onClick(() => {
      void (async () => {
        if (!tokenValue)
          return showError(errorEl, "Please enter your GitHub token.");
        hideError(errorEl);
        busy(btn, "Verifying\u2026");
        try {
          const username = await new GitHubApi(tokenValue, "", "").getAuthenticatedUser();
          tab.plugin.settings.githubToken = tokenValue;
          tab.plugin.settings.githubOwner = username;
          await tab.plugin.saveSettings();
          tab.wizardStep = "hosting";
          tab.render();
        } catch (err) {
          const msg = err.message;
          showError(
            errorEl,
            /invalid/i.test(msg) ? "Token invalid or missing the repo scope. Check it and try again." : msg
          );
          idle(btn, "Verify & continue");
        }
      })();
    });
  });
}

// src/ui/settings/wizard/stepHosting.ts
var import_obsidian8 = require("obsidian");

// src/ui/settings/modals/helpers.ts
init_settings();
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
async function provisionSite(plugin, name, profileParams, hostingProvider = "github-pages") {
  const slug = slugify(name);
  if (!slug)
    throw new Error("Please enter a site name.");
  const owner = plugin.settings.githubOwner;
  const repo = plugin.settings.masterRepository;
  if (!repo)
    throw new Error("Please configure a Master Repository in settings first.");
  const site = createSiteProfile({
    name,
    hostingProvider,
    ...profileParams
  });
  const gh = new GitHubApi(plugin.settings.githubToken, owner, repo);
  await gh.createRepo();
  if (!await gh.waitForRepo(3e4)) {
    throw new Error("Repository creation timed out \u2014 please try again.");
  }
  if (hostingProvider === "github-pages") {
    try {
      await gh.enableGitHubPages();
    } catch (e) {
      console.warn("Could not auto-enable GitHub Pages:", e);
    }
  }
  let branch = "main";
  try {
    branch = await gh.getDefaultBranch();
  } catch (e) {
  }
  site.githubBranch = branch;
  site.githubRepo = repo;
  let siteUrl = "";
  if (hostingProvider === "github-pages") {
    siteUrl = `${owner}.github.io/${repo}`;
  } else {
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
  }
  site.siteUrl = siteUrl;
  return site;
}

// src/ui/settings/modals/pathSuggestModal.ts
var import_obsidian7 = require("obsidian");
var PathSuggestModal = class extends import_obsidian7.FuzzySuggestModal {
  constructor(app, onChoose) {
    super(app);
    this.onChoose = onChoose;
    this.setPlaceholder("Search for a file or folder...");
  }
  getItems() {
    return this.app.vault.getAllLoadedFiles().filter(
      (f) => f.path !== "/" && !f.path.startsWith(".") && !f.path.includes("/.") && (f instanceof import_obsidian7.TFolder || f instanceof import_obsidian7.TFile && f.extension === "md")
    );
  }
  getItemText(item) {
    return item.path;
  }
  onChooseItem(item, _evt) {
    this.onChoose(item.path);
  }
};

// src/ui/settings/wizard/stepHosting.ts
var CLOUDFLARE_APP_URL = "https://github.com/apps/cloudflare-workers-and-pages/installations/new";
var CLOUDFLARE_TOKEN_URL = buildCloudflareTokenUrl();
function renderStepHosting(tab, el) {
  const heading = new import_obsidian8.Setting(el);
  heading.setName("Choose hosting & create your site");
  heading.setHeading();
  el.createEl("p", {
    cls: "setting-item-description",
    text: "Pick where NoteFlare should host your site. GitHub Pages is free and works out of the box. Cloudflare adds a global CDN and instant deploy controls."
  });
  let siteName = tab.pendingName || "my-notes";
  new import_obsidian8.Setting(el).setName("Site name").setDesc("Used for your repository and site address. Lowercase letters, numbers, and dashes.").addText((text) => {
    text.setPlaceholder("my-notes");
    text.setValue(siteName);
    text.onChange((v) => {
      siteName = v;
    });
  });
  let masterRepo = tab.plugin.settings.masterRepository || "noteflare-sites";
  new import_obsidian8.Setting(el).setName("GitHub repository name").setDesc("All your NoteFlare sites will live inside this single repository.").addText((text) => {
    text.setPlaceholder("noteflare-sites");
    text.setValue(masterRepo);
    text.onChange((v) => {
      masterRepo = v.trim();
      updateCfAppHint();
    });
  });
  let selectedProvider = tab.pendingProvider;
  new import_obsidian8.Setting(el).setName("Hosting provider").setDesc("GitHub Pages is free with no extra setup. Cloudflare Pages adds a CDN and real-time deploy controls (requires a free Cloudflare account).").addDropdown((d) => {
    d.addOption("github-pages", "GitHub Pages (free, no setup required)");
    d.addOption("cloudflare", "Cloudflare Pages (CDN, deploy controls)");
    d.setValue(selectedProvider);
    d.onChange((v) => {
      selectedProvider = v;
      tab.pendingProvider = selectedProvider;
      cfSection.setCssStyles({ display: selectedProvider === "cloudflare" ? "block" : "none" });
    });
  });
  let scope = tab.pendingScope;
  let paths = [...tab.pendingPaths];
  new import_obsidian8.Setting(el).setName("Publish scope").setDesc("Publish the entire vault or only selected files and folders.").addDropdown((d) => {
    d.addOption("vault", "Full vault");
    d.addOption("selected", "Selected files / folders");
    d.setValue(scope);
    d.onChange((v) => {
      scope = v;
      renderPaths();
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
      pathsContainer.createEl("p", { text: "No items selected.", cls: "noteflare-muted" });
    } else {
      const list = pathsContainer.createEl("ul", { cls: "noteflare-path-list" });
      for (let i = 0; i < paths.length; i++) {
        const li = list.createEl("li");
        li.setCssStyles({ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" });
        li.createSpan({ text: paths[i] });
        const rb = li.createEl("button", { text: "\u2715" });
        rb.addEventListener("click", () => {
          paths.splice(i, 1);
          renderPaths();
        });
      }
    }
    const addRow = pathsContainer.createDiv();
    addRow.setCssStyles({ marginTop: "8px" });
    const addBtn = addRow.createEl("button", { text: "Browse vault\u2026" });
    addBtn.setCssStyles({ width: "100%" });
    addBtn.addEventListener("click", () => {
      new PathSuggestModal(tab.app, (p) => {
        if (!paths.includes(p)) {
          paths.push(p);
          renderPaths();
        }
      }).open();
    });
  };
  renderPaths();
  const cfSection = el.createDiv("nf-cf-section");
  cfSection.setCssStyles({ display: selectedProvider === "cloudflare" ? "block" : "none" });
  let cfToken = tab.plugin.settings.cloudflareToken;
  let cfAccount = tab.plugin.settings.cloudflareAccount;
  let cfAppHintEl = null;
  const updateCfAppHint = () => {
    if (cfAppHintEl) {
      cfAppHintEl.setText(
        `Grant the "Cloudflare Workers and Pages" app access to: ${tab.plugin.settings.githubOwner}/${masterRepo || "noteflare-sites"}`
      );
    }
  };
  new import_obsidian8.Setting(cfSection).setName("1. Create a Cloudflare API token").setDesc("Creates a token with Pages, Workers, and Account permissions pre-filled.").addButton((b) => {
    b.setButtonText("Create Token \u2197");
    b.onClick(() => {
      window.open(CLOUDFLARE_TOKEN_URL, "_blank");
    });
  });
  const cfAppSetting = new import_obsidian8.Setting(cfSection).setName("2. Authorize Cloudflare on GitHub").setDesc(`Grant the "Cloudflare Workers and Pages" app access to: ${tab.plugin.settings.githubOwner}/${masterRepo || "noteflare-sites"}`).addButton((b) => {
    b.setButtonText("Authorize \u2197");
    b.onClick(() => {
      window.open(CLOUDFLARE_APP_URL, "_blank");
    });
  });
  cfAppHintEl = cfAppSetting.descEl;
  new import_obsidian8.Setting(cfSection).setName("Cloudflare API token").setDesc("Stored encrypted in your OS keychain.").addText((t) => {
    t.setPlaceholder("Paste API token\u2026");
    t.inputEl.type = "password";
    t.setValue(cfToken);
    t.onChange((v) => {
      cfToken = v.trim();
    });
  });
  new import_obsidian8.Setting(cfSection).setName("Cloudflare account ID").setDesc("Optional \u2014 detected automatically from your token.").addText((t) => {
    t.setPlaceholder("Auto-detected");
    t.setValue(cfAccount);
    t.onChange((v) => {
      cfAccount = v.trim();
    });
  });
  const errorEl = createErrorEl(el);
  new import_obsidian8.Setting(el).addButton((back) => {
    back.setButtonText("Back");
    back.onClick(() => {
      tab.wizardStep = "github";
      tab.render();
    });
  }).addButton((btn) => {
    btn.setButtonText("Continue").setCta();
    btn.onClick(() => {
      void (async () => {
        const nameSlug = slugify(siteName);
        if (!nameSlug)
          return showError(errorEl, "Please enter a site name.");
        if (!masterRepo.trim())
          return showError(errorEl, "Please enter a repository name.");
        if (selectedProvider === "cloudflare" && !cfToken) {
          return showError(errorEl, "Please paste your Cloudflare API token.");
        }
        hideError(errorEl);
        busy(btn, "Setting up\u2026");
        try {
          tab.plugin.settings.masterRepository = masterRepo.trim();
          if (selectedProvider === "cloudflare") {
            let accountId = cfAccount;
            if (!accountId) {
              busy(btn, "Detecting Cloudflare account\u2026");
              accountId = await new CloudflareApi(cfToken, "").getAccountId();
            }
            tab.plugin.settings.cloudflareToken = cfToken;
            tab.plugin.settings.cloudflareAccount = accountId;
            await tab.plugin.saveSettings();
          }
          busy(btn, "Creating your site\u2026");
          const site = await provisionSite(
            tab.plugin,
            siteName,
            { publishScope: scope, publishPaths: paths },
            selectedProvider
          );
          tab.plugin.settings.sites.push(site);
          tab.plugin.settings.activeSiteId = site.id;
          tab.plugin.settings.enablePublish = true;
          await tab.plugin.saveSettings();
          tab.pendingName = siteName;
          tab.pendingScope = scope;
          tab.pendingPaths = paths;
          tab.pendingProvider = selectedProvider;
          tab.wizardStep = "backup";
          tab.render();
        } catch (err) {
          showError(errorEl, err.message);
          idle(btn, "Continue");
        }
      })();
    });
  });
}

// src/ui/settings/wizard/stepBackup.ts
var import_obsidian9 = require("obsidian");
function renderStepBackup(tab, el) {
  var _a;
  const heading = new import_obsidian9.Setting(el);
  heading.setName("Automatic backup (optional)");
  heading.setHeading();
  el.createEl("p", {
    cls: "setting-item-description",
    text: "NoteFlare can silently mirror your entire vault to a private GitHub repository. No manual steps \u2014 it runs in the background."
  });
  let enableBackup = tab.plugin.settings.enableBackup;
  let repoVisibility = (_a = tab.plugin.settings.backup.repoVisibility) != null ? _a : "private";
  new import_obsidian9.Setting(el).setName("Enable automatic backup").setDesc("Run a backup after vault changes and/or on a schedule.").addToggle((t) => {
    t.setValue(enableBackup);
    t.onChange((v) => {
      enableBackup = v;
      visibilitySection.setCssStyles({ display: v ? "block" : "none" });
    });
  });
  const visibilitySection = el.createDiv();
  visibilitySection.setCssStyles({ display: enableBackup ? "block" : "none" });
  new import_obsidian9.Setting(visibilitySection).setName("Backup repository visibility").setDesc("Private keeps your notes confidential. Public makes the repo visible on GitHub (not recommended for personal notes).").addDropdown((d) => {
    d.addOption("private", "\u{1F512} Private (recommended)");
    d.addOption("public", "\u{1F310} Public");
    d.setValue(repoVisibility);
    d.onChange((v) => {
      repoVisibility = v;
    });
  });
  const errorEl = createErrorEl(el);
  new import_obsidian9.Setting(el).addButton((back) => {
    back.setButtonText("Back");
    back.onClick(() => {
      tab.wizardStep = "hosting";
      tab.render();
    });
  }).addButton((btn) => {
    btn.setButtonText("Finish setup").setCta();
    btn.onClick(() => {
      void (async () => {
        hideError(errorEl);
        tab.plugin.settings.enableBackup = enableBackup;
        tab.plugin.settings.backup.repoVisibility = repoVisibility;
        if (enableBackup && !tab.plugin.settings.backup.repository) {
          tab.plugin.settings.backup.repository = tab.plugin.defaultBackupRepository();
        }
        tab.plugin.settings.setupComplete = true;
        await tab.plugin.saveSettings();
        tab.wizardStep = "done";
        tab.render();
      })();
    });
  });
}

// src/ui/settings/wizard/stepDone.ts
var import_obsidian10 = require("obsidian");
function renderStepDone(tab, el) {
  const site = tab.plugin.getActiveSite();
  const heading = new import_obsidian10.Setting(el);
  heading.setName("You're all set! \u{1F389}");
  heading.setHeading();
  const doneMsg = new import_obsidian10.Setting(el).setName(
    site ? "Your site is ready to publish" : "Automatic backup is ready"
  );
  if (site == null ? void 0 : site.siteUrl) {
    doneMsg.descEl.appendText("Your site will be live at: ");
    doneMsg.descEl.createEl("a", {
      text: `https://${site.siteUrl}`,
      href: `https://${site.siteUrl}`,
      attr: { target: "_blank", rel: "noopener" }
    });
  } else {
    doneMsg.setDesc("NoteFlare will protect your vault quietly using your chosen schedule.");
  }
  new import_obsidian10.Setting(el).addButton((later) => {
    later.setButtonText(site ? "I'll publish later" : "Open configuration");
    later.onClick(() => {
      void (async () => {
        tab.hasInitializedWizard = false;
        if (site)
          tab.closeSettings();
        else
          tab.render();
      })();
    });
  }).addButton((btn) => {
    btn.setButtonText(site ? "Publish now" : "Back up now").setCta();
    btn.onClick(() => {
      void (async () => {
        tab.hasInitializedWizard = false;
        tab.closeSettings();
        if (site)
          await tab.plugin.doPublish();
        else
          await tab.plugin.doBackup(false);
      })();
    });
  });
}

// src/ui/settings/wizard/wizardRenderer.ts
function renderWizard(tab, el) {
  renderWizardSteps(tab, el);
  if (tab.wizardStep === "github")
    renderStepGitHub(tab, el);
  else if (tab.wizardStep === "hosting")
    renderStepHosting(tab, el);
  else if (tab.wizardStep === "backup")
    renderStepBackup(tab, el);
  else
    renderStepDone(tab, el);
}
function renderWizardSteps(tab, el) {
  const steps = [
    { key: "github", label: "GitHub" },
    { key: "hosting", label: "Hosting" },
    { key: "backup", label: "Backup" },
    { key: "done", label: "Done" }
  ];
  const order = steps.map((s) => s.key);
  const currentIdx = order.indexOf(tab.wizardStep);
  const wrapper = el.createDiv("nf-wizard-steps");
  steps.forEach(({ label }, i) => {
    const dot = wrapper.createDiv("nf-step-dot");
    if (i < currentIdx)
      dot.addClass("completed");
    else if (i === currentIdx)
      dot.addClass("active");
    const labelEl = dot.createSpan("nf-step-label");
    labelEl.setText(label);
  });
}

// src/ui/settings/manage/connectionsSection.ts
var import_obsidian12 = require("obsidian");

// src/ui/settings/manage/restoreSection.ts
var import_obsidian11 = require("obsidian");

// src/core/vaultRegistry.ts
var REGISTRY_DIR = ".noteflare";
var REGISTRY_PATH = ".noteflare/registry.json";
var VaultRegistry = class _VaultRegistry {
  /** Load the registry from disk, returning an empty registry if not found. */
  static async load(app) {
    try {
      const raw = await app.vault.adapter.read(REGISTRY_PATH);
      const parsed = JSON.parse(raw);
      if (parsed.version === 1 && Array.isArray(parsed.entries)) {
        return parsed;
      }
    } catch (e) {
    }
    return { version: 1, entries: [] };
  }
  /** Write the registry to disk, creating the `.noteflare/` directory if needed. */
  static async save(app, registry) {
    try {
      const exists = await app.vault.adapter.exists(REGISTRY_DIR);
      if (!exists) {
        await app.vault.adapter.mkdir(REGISTRY_DIR);
      }
      await app.vault.adapter.write(REGISTRY_PATH, JSON.stringify(registry, null, 2));
    } catch (err) {
      console.warn("NoteFlare: could not write vault registry:", err);
    }
  }
  /**
   * Add or update a single site entry derived from a `SiteProfile`.
   * Called automatically by `saveSettings()` so the registry stays in sync.
   */
  static async upsert(app, site, masterRepository, githubOwner, masterRepositoryPrivate) {
    const registry = await _VaultRegistry.load(app);
    const entry = {
      id: site.id,
      name: site.name,
      masterRepository,
      githubOwner,
      githubBranch: site.githubBranch,
      cloudflareProject: site.cloudflareProject,
      siteUrl: site.siteUrl,
      hostingProvider: site.hostingProvider,
      lastPublished: site.lastPublished,
      masterRepositoryPrivate
    };
    const idx = registry.entries.findIndex((e) => e.id === site.id);
    if (idx >= 0) {
      registry.entries[idx] = entry;
    } else {
      registry.entries.push(entry);
    }
    await _VaultRegistry.save(app, registry);
  }
  /** Remove a site from the registry by ID. */
  static async remove(app, siteId) {
    const registry = await _VaultRegistry.load(app);
    registry.entries = registry.entries.filter((e) => e.id !== siteId);
    await _VaultRegistry.save(app, registry);
  }
  /**
   * Rebuild `SiteProfile` stubs from registry entries that aren't already in
   * `existingSiteIds`. Used during restore-after-reinstall: creates lightweight
   * profiles with no credential data (credentials come from the OS keychain via
   * the plugin's normal load path).
   */
  static buildRestoredProfiles(entries, existingSiteIds) {
    return entries.filter((e) => !existingSiteIds.has(e.id));
  }
};

// src/ui/settings/manage/restoreSection.ts
async function renderRestoreFromRegistry(tab, el) {
  const s = tab.plugin.settings;
  const registry = await VaultRegistry.load(tab.app);
  const existingIds = new Set(s.sites.map((site) => site.id));
  const orphaned = VaultRegistry.buildRestoredProfiles(registry.entries, existingIds);
  if (orphaned.length === 0)
    return;
  const restoreSection = el.createDiv("nf-restore-section");
  const restoreHeading = new import_obsidian11.Setting(restoreSection);
  restoreHeading.setName("Previous sites found");
  restoreHeading.setHeading();
  restoreSection.createEl("p", {
    cls: "setting-item-description",
    text: `NoteFlare found ${orphaned.length} site${orphaned.length === 1 ? "" : "s"} from a previous installation in your vault registry. Restore them to continue using your existing GitHub repos and Cloudflare projects.`
  });
  for (const entry of orphaned) {
    const label = `${entry.name || entry.masterRepository} \xB7 ${entry.hostingProvider === "cloudflare" ? "Cloudflare Pages" : "GitHub Pages"}` + (entry.siteUrl ? ` \xB7 ${entry.siteUrl}` : "");
    restoreSection.createEl("p", { cls: "setting-item-description", text: `\u2022 ${label}` });
  }
  const errorEl = createErrorEl(restoreSection);
  new import_obsidian11.Setting(restoreSection).addButton((b) => {
    b.setButtonText(`Restore ${orphaned.length} site${orphaned.length === 1 ? "" : "s"}`).setCta();
    b.onClick(() => {
      void (async () => {
        var _a;
        b.setDisabled(true).setButtonText("Restoring\u2026");
        errorEl.hide();
        try {
          for (const entry of orphaned) {
            s.masterRepository = s.masterRepository || entry.masterRepository;
            s.githubOwner = s.githubOwner || entry.githubOwner;
            s.masterRepositoryPrivate = s.masterRepositoryPrivate || entry.masterRepositoryPrivate || false;
            const { createSiteProfile: create } = await Promise.resolve().then(() => (init_settings(), settings_exports));
            const restoredSite = create({
              id: entry.id,
              name: entry.name,
              githubRepo: entry.masterRepository,
              githubBranch: entry.githubBranch,
              cloudflareProject: entry.cloudflareProject,
              siteUrl: entry.siteUrl,
              hostingProvider: entry.hostingProvider,
              lastPublished: entry.lastPublished,
              isPublished: !!entry.lastPublished
            });
            s.sites.push(restoredSite);
          }
          s.activeSiteId = s.activeSiteId || ((_a = s.sites[0]) == null ? void 0 : _a.id) || "";
          s.enablePublish = true;
          await tab.plugin.saveSettings();
          tab.render();
        } catch (err) {
          showError(errorEl, err.message);
          b.setDisabled(false).setButtonText(`Restore ${orphaned.length} site${orphaned.length === 1 ? "" : "s"}`);
        }
      })();
    });
  });
}

// src/ui/settings/manage/connectionsSection.ts
var CLOUDFLARE_APP_URL2 = "https://github.com/apps/cloudflare-workers-and-pages/installations/new";
var CLOUDFLARE_TOKEN_URL2 = buildCloudflareTokenUrl();
function renderConnectionsSection(tab, el) {
  const s = tab.plugin.settings;
  const connHeading = new import_obsidian12.Setting(el);
  connHeading.setName("Connections");
  connHeading.setHeading();
  const ghSetting = new import_obsidian12.Setting(el).setName("GitHub");
  if (s.githubToken && s.githubOwner) {
    ghSetting.setDesc(`Connected as @${s.githubOwner}`);
    ghSetting.addButton((b) => {
      b.setButtonText("Disconnect");
      b.buttonEl.addClass("mod-warning");
      b.onClick(() => {
        void (async () => {
          s.githubToken = "";
          s.githubOwner = "";
          s.setupComplete = false;
          await tab.plugin.saveSettings();
          tab.hasInitializedWizard = false;
          tab.wizardStep = "github";
          tab.render();
        })();
      });
    });
  } else {
    ghSetting.setDesc("Not connected");
    ghSetting.addButton((b) => {
      b.setButtonText("Connect").setCta();
      b.onClick(() => {
        tab.hasInitializedWizard = false;
        tab.wizardStep = "github";
        tab.render();
      });
    });
  }
  const cfSetting = new import_obsidian12.Setting(el).setName("Cloudflare");
  if (s.cloudflareToken) {
    const accountHint = s.cloudflareAccount ? `Account: ${s.cloudflareAccount.slice(0, 8)}\u2026` : "Connected";
    cfSetting.setDesc(accountHint);
    cfSetting.addButton((b) => {
      b.setButtonText("Reconnect to GitHub");
      b.setTooltip("Open Cloudflare \u2194 GitHub App authorization if your builds are disconnected");
      b.onClick(() => {
        window.open(CLOUDFLARE_APP_URL2, "_blank");
      });
    });
    cfSetting.addButton((b) => {
      b.setButtonText("Disconnect");
      b.buttonEl.addClass("mod-warning");
      b.onClick(() => {
        void (async () => {
          s.cloudflareToken = "";
          s.cloudflareAccount = "";
          await tab.plugin.saveSettings();
          tab.render();
        })();
      });
    });
  } else {
    cfSetting.setDesc("Not connected \u2014 required for Cloudflare Pages hosting");
    cfSetting.addButton((b) => {
      b.setButtonText("Connect");
      b.onClick(() => {
        tab.openCloudflareConnectFlow();
      });
    });
  }
  void renderRestoreFromRegistry(tab, el);
}
function openCloudflareConnectFlow(tab, containerEl) {
  const s = tab.plugin.settings;
  const heading = new import_obsidian12.Setting(containerEl);
  heading.setName("Connect Cloudflare");
  heading.setHeading();
  containerEl.createEl("p", {
    cls: "setting-item-description",
    text: "Two quick one-time steps in your browser:"
  });
  const cfSection = containerEl.createDiv();
  const repoSlug = `${s.githubOwner}/${s.masterRepository || "noteflare-sites"}`;
  new import_obsidian12.Setting(cfSection).setName("1. Create a Cloudflare API token").setDesc("Creates a token with Pages, Workers, and Account permissions pre-filled.").addButton((b) => {
    b.setButtonText("Create Token \u2197");
    b.onClick(() => {
      window.open(CLOUDFLARE_TOKEN_URL2, "_blank");
    });
  });
  new import_obsidian12.Setting(cfSection).setName("2. Authorize Cloudflare on GitHub").setDesc(`Grant the "Cloudflare Workers and Pages" app access to: ${repoSlug}`).addButton((b) => {
    b.setButtonText("Authorize \u2197");
    b.onClick(() => {
      window.open(CLOUDFLARE_APP_URL2, "_blank");
    });
  });
  let cfToken = "";
  let cfAccount = "";
  new import_obsidian12.Setting(cfSection).setName("Cloudflare API token").setDesc("Stored encrypted in your OS keychain.").addText((t) => {
    t.setPlaceholder("Paste API token\u2026");
    t.inputEl.type = "password";
    t.onChange((v) => {
      cfToken = v.trim();
    });
  });
  new import_obsidian12.Setting(cfSection).setName("Cloudflare account ID").setDesc("Optional \u2014 detected automatically from your token.").addText((t) => {
    t.setPlaceholder("Auto-detected");
    t.onChange((v) => {
      cfAccount = v.trim();
    });
  });
  const errorEl = createErrorEl(containerEl);
  new import_obsidian12.Setting(containerEl).addButton((back) => {
    back.setButtonText("Cancel");
    back.onClick(() => {
      tab.isCloudflareConnectFlowOpen = false;
      tab.render();
    });
  }).addButton((btn) => {
    btn.setButtonText("Save & connect").setCta();
    btn.onClick(() => {
      void (async () => {
        if (!cfToken)
          return showError(errorEl, "Please paste your Cloudflare API token.");
        hideError(errorEl);
        busy(btn, "Verifying\u2026");
        try {
          let accountId = cfAccount;
          if (!accountId) {
            busy(btn, "Detecting account\u2026");
            accountId = await new CloudflareApi(cfToken, "").getAccountId();
          }
          s.cloudflareToken = cfToken;
          s.cloudflareAccount = accountId;
          await tab.plugin.saveSettings();
          tab.isCloudflareConnectFlowOpen = false;
          tab.render();
        } catch (err) {
          showError(errorEl, err.message);
          idle(btn, "Save & connect");
        }
      })();
    });
  });
}

// src/ui/settings/manage/backupSection.ts
var import_obsidian13 = require("obsidian");
function renderBackupSection(tab, el) {
  var _a;
  const s = tab.plugin.settings;
  const backupHeading = new import_obsidian13.Setting(el);
  backupHeading.setName("Backup & Storage");
  backupHeading.setHeading();
  const backupRepoName = s.backup.repository || tab.plugin.defaultBackupRepository();
  const backupUrl = `https://github.com/${s.githubOwner}/${backupRepoName}`;
  new import_obsidian13.Setting(el).setName("GitHub repository").setDesc(`Publish repo: ${s.githubOwner}/${s.masterRepository || "noteflare-sites"} (your site source). Backup repo: ${s.githubOwner}/${backupRepoName} (your vault mirror, kept separate).`).addText((t) => {
    t.setValue(backupRepoName);
    t.setDisabled(true);
  });
  const linkSetting = new import_obsidian13.Setting(el).setName("View backup on GitHub").setDesc("Open your private vault mirror in the browser.");
  linkSetting.controlEl.createEl("a", {
    text: "Open Repository \u2197",
    href: backupUrl
  });
  (_a = linkSetting.controlEl.querySelector("a")) == null ? void 0 : _a.addEventListener("click", (e) => {
    e.preventDefault();
    window.open(backupUrl);
  });
  new import_obsidian13.Setting(el).setName("Enable automatic backup").setDesc("Silently mirror your vault to a private GitHub repository in the background.").addToggle((toggle) => {
    toggle.setValue(s.enableBackup);
    toggle.onChange((value) => {
      void (async () => {
        s.enableBackup = value;
        if (value && !s.backup.repository) {
          s.backup.repository = tab.plugin.defaultBackupRepository();
        }
        await tab.plugin.saveSettings();
        tab.render();
      })();
    });
  });
  if (s.enableBackup) {
    new import_obsidian13.Setting(el).setName("Repository visibility").setDesc("Private keeps your notes confidential. Public makes the backup repo visible on GitHub.").addDropdown((d) => {
      var _a2;
      d.addOption("private", "\u{1F512} Private (recommended)");
      d.addOption("public", "\u{1F310} Public");
      d.setValue((_a2 = s.backup.repoVisibility) != null ? _a2 : "private");
      d.onChange((v) => {
        void (async () => {
          s.backup.repoVisibility = v;
          await tab.plugin.saveSettings();
        })();
      });
    });
    new import_obsidian13.Setting(el).setName("Back up after changes").setDesc("Run a backup 30 seconds after vault files are modified.").addToggle((toggle) => {
      toggle.setValue(s.backup.backupOnChange);
      toggle.onChange((value) => {
        void (async () => {
          s.backup.backupOnChange = value;
          await tab.plugin.saveSettings();
        })();
      });
    });
    new import_obsidian13.Setting(el).setName("Schedule").setDesc("Periodic backups run while Obsidian is open.").addDropdown((dropdown) => {
      dropdown.addOption("0", "Off");
      dropdown.addOption("15", "Every 15 minutes");
      dropdown.addOption("30", "Every 30 minutes");
      dropdown.addOption("60", "Every hour");
      dropdown.addOption("360", "Every 6 hours");
      dropdown.addOption("1440", "Daily");
      dropdown.setValue(String(s.backup.intervalMinutes));
      dropdown.onChange((value) => {
        void (async () => {
          s.backup.intervalMinutes = Number(value);
          await tab.plugin.saveSettings();
        })();
      });
    });
    const backupStatus = s.backup.lastBackupError ? `Needs attention: ${s.backup.lastBackupError}` : s.backup.lastBackupAt ? `Last backup: ${new Date(s.backup.lastBackupAt).toLocaleString()}` : "No backup has run yet.";
    new import_obsidian13.Setting(el).setName("Backup status").setDesc(backupStatus).addButton((button) => {
      button.setButtonText("Back up now").setCta();
      button.onClick(() => {
        void (async () => {
          button.setDisabled(true).setButtonText("Backing up\u2026");
          await tab.plugin.doBackup(false);
          tab.render();
        })();
      });
    });
  }
}

// src/ui/settings/manage/sitesSection.ts
var import_obsidian20 = require("obsidian");

// src/ui/settings/modals/addSiteModal.ts
var import_obsidian14 = require("obsidian");
var AddSiteModal = class extends import_obsidian14.Modal {
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
    new import_obsidian14.Setting(this.contentEl).setName("Site name").setDesc("Used as the GitHub repository name and site identifier.").addText((t) => {
      t.setPlaceholder("my-blog");
      t.onChange((v) => {
        name = v;
      });
    });
    let hostingProvider = "github-pages";
    const cfConnected = !!this.plugin.settings.cloudflareToken;
    new import_obsidian14.Setting(this.contentEl).setName("Hosting provider").setDesc("Where to host this site.").addDropdown((d) => {
      d.addOption("github-pages", "GitHub Pages");
      if (cfConnected) {
        d.addOption("cloudflare", "Cloudflare Pages");
      }
      d.setValue(hostingProvider);
      d.onChange((v) => {
        hostingProvider = v;
      });
    });
    new import_obsidian14.Setting(this.contentEl).setName("Publish scope").setDesc("Configure what to publish: the entire vault or selected files/folders.").addDropdown((d) => {
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
          li.setCssStyles({ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" });
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
    new import_obsidian14.Setting(this.contentEl).setName("Author name").setDesc("Author name written to site metadata (optional).").addText((t) => {
      t.setPlaceholder("Your Name");
      t.onChange((v) => {
        authorName = v.trim();
      });
    });
    new import_obsidian14.Setting(this.contentEl).setName("Sidebar title").setDesc("Title shown in the sidebar (optional, defaults to site name).").addText((t) => {
      t.setPlaceholder("My Digital Garden");
      t.onChange((v) => {
        sidebarTitle = v.trim();
      });
    });
    new import_obsidian14.Setting(this.contentEl).setName("Site description").setDesc("Description of your site (optional).").addText((t) => {
      t.setPlaceholder("Notes and thoughts\u2026");
      t.onChange((v) => {
        siteDescription = v.trim();
      });
    });
    updateVisibility();
    const errorEl = this.contentEl.createEl("p", { cls: "setting-item-description" });
    errorEl.setCssStyles({ color: "var(--text-error)" });
    errorEl.hide();
    new import_obsidian14.Setting(this.contentEl).addButton((b) => b.setButtonText("Cancel").onClick(() => this.close())).addButton((b) => {
      b.setButtonText("Create site").setCta();
      b.onClick(() => {
        void (async () => {
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
            }, hostingProvider);
            this.plugin.settings.sites.push(site);
            this.plugin.settings.activeSiteId = site.id;
            await this.plugin.saveSettings();
            this.close();
            new import_obsidian14.Notice(`Site \u201C${site.name}\u201D created.`);
            this.onDone();
          } catch (err) {
            errorEl.setText(err.message);
            errorEl.show();
            b.setDisabled(false).setButtonText("Create site");
          }
        })();
      });
    });
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/ui/settings/modals/removeSiteModal.ts
var import_obsidian15 = require("obsidian");
var RemoveSiteModal = class extends import_obsidian15.Modal {
  constructor(app, plugin, site, onDone) {
    super(app);
    this.plugin = plugin;
    this.site = site;
    this.onDone = onDone;
    this.deleting = false;
  }
  onOpen() {
    this.titleEl.setText("Delete this site?");
    const siteName = this.site.name || this.site.githubRepo || "Unnamed site";
    this.contentEl.createEl("p", {
      text: `"${siteName}" will be permanently deleted from NoteFlare.`
    });
    const summaryDiv = this.contentEl.createDiv();
    summaryDiv.setCssStyles({
      marginTop: "8px",
      padding: "10px 12px",
      borderLeft: "4px solid var(--text-warning)",
      backgroundColor: "var(--background-modifier-border)",
      borderRadius: "var(--radius-s)",
      marginBottom: "10px"
    });
    summaryDiv.createEl("strong", { text: "What will be deleted:" });
    const stepsList = summaryDiv.createEl("ul");
    stepsList.setCssStyles({ margin: "6px 0 0 0", paddingLeft: "1.2em" });
    const ghStep = stepsList.createEl("li");
    ghStep.setText("\u2705 Site folder removed from GitHub repository (via API)");
    if (this.site.hostingProvider === "cloudflare") {
      const cfStep = stepsList.createEl("li");
      cfStep.setText("\u2705 Cloudflare Pages project deleted (via API)");
    } else {
      stepsList.createEl("li").setText("\u26A0\uFE0F GitHub Pages deployment \u2014 NOT automatically removed. Disable it manually:");
      const manualNote = stepsList.createEl("li");
      manualNote.setCssStyles({ listStyleType: "none", paddingLeft: "1em", color: "var(--text-muted)", fontSize: "var(--font-ui-smaller)" });
      manualNote.setText("GitHub repo \u2192 Settings \u2192 Pages \u2192 Source \u2192 None \u2192 Save");
    }
    const progressEl = this.contentEl.createEl("p", { cls: "setting-item-description" });
    progressEl.hide();
    const errorEl = this.contentEl.createEl("p", { cls: "setting-item-description" });
    errorEl.setCssStyles({ color: "var(--text-error)" });
    errorEl.hide();
    new import_obsidian15.Setting(this.contentEl).addButton((b) => b.setButtonText("Cancel").onClick(() => this.close())).addButton((b) => {
      b.setButtonText("Delete");
      b.buttonEl.addClass("mod-warning");
      b.onClick(() => {
        void (async () => {
          var _a, _b;
          if (this.deleting)
            return;
          this.deleting = true;
          b.setDisabled(true).setButtonText("Deleting\u2026");
          errorEl.hide();
          progressEl.show();
          const s = this.plugin.settings;
          const gh = new GitHubApi(
            s.githubToken,
            s.githubOwner,
            s.masterRepository,
            this.site.githubBranch || "main"
          );
          if (this.site.hostingProvider === "cloudflare" && s.cloudflareToken) {
            try {
              progressEl.setText("Deleting Cloudflare Pages project\u2026");
              const cf = new CloudflareApi(s.cloudflareToken, s.cloudflareAccount);
              await cf.deleteProject(this.site.cloudflareProject);
            } catch (e) {
              console.warn("NoteFlare: could not delete Cloudflare project:", e);
            }
          }
          try {
            progressEl.setText("Removing site from GitHub repository\u2026");
            await gh.deleteSiteFolder(this.site.id, this.site.githubBranch || "main");
          } catch (e) {
            console.warn("NoteFlare: could not delete GitHub site folder:", e);
          }
          try {
            progressEl.setText("Updating vault registry\u2026");
            await VaultRegistry.remove(this.app, this.site.id);
          } catch (e) {
            console.warn("NoteFlare: could not update vault registry:", e);
          }
          try {
            const s2 = this.plugin.settings;
            s2.sites = s2.sites.filter((x) => x.id !== this.site.id);
            if (s2.activeSiteId === this.site.id) {
              s2.activeSiteId = (_b = (_a = s2.sites[0]) == null ? void 0 : _a.id) != null ? _b : "";
            }
            await this.plugin.saveSettings();
            this.close();
            new import_obsidian15.Notice(`Site "${siteName}" deleted.`);
            this.onDone();
          } catch (err) {
            errorEl.setText(err.message);
            errorEl.show();
            progressEl.hide();
            b.setDisabled(false).setButtonText("Delete");
            this.deleting = false;
          }
        })();
      });
    });
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/ui/settings/modals/unpublishModals.ts
var import_obsidian16 = require("obsidian");
var UnpublishModal = class extends import_obsidian16.Modal {
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
    new import_obsidian16.Setting(this.contentEl).addButton((b) => b.setButtonText("Cancel").onClick(() => this.close())).addButton((b) => {
      b.setButtonText("Unpublish");
      b.buttonEl.addClass("mod-warning");
      b.onClick(() => {
        void (async () => {
          this.close();
          await this.plugin.doUnpublish();
          this.onDone();
        })();
      });
    });
  }
  onClose() {
    this.contentEl.empty();
  }
};
var GitHubPagesUnpublishModal = class extends import_obsidian16.Modal {
  constructor(app, pagesSettingsUrl) {
    super(app);
    this.pagesSettingsUrl = pagesSettingsUrl;
  }
  onOpen() {
    this.titleEl.setText("Disable GitHub Pages (Manual)");
    this.contentEl.createEl("p", {
      text: "GitHub Pages cannot be paused via the GitHub API. To take your site offline, follow these steps:"
    });
    const steps = this.contentEl.createEl("ol");
    steps.setCssStyles({ paddingLeft: "1.4em" });
    steps.createEl("li", { text: "Click the button below to open your repository Pages settings." });
    steps.createEl("li", { text: "Under \u201CSource\u201D, change the selection from \u201CGitHub Actions\u201D to \u201CNone\u201D." });
    steps.createEl("li", { text: "Click Save. Your site will be offline within a minute." });
    new import_obsidian16.Setting(this.contentEl).addButton((b) => b.setButtonText("Cancel").onClick(() => this.close())).addButton((b) => {
      b.setButtonText("Open GitHub Pages settings \u2197").setCta();
      b.onClick(() => {
        window.open(this.pagesSettingsUrl, "_blank");
        this.close();
      });
    });
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/ui/settings/modals/resetModal.ts
var import_obsidian17 = require("obsidian");
init_settings();
var ResetModal = class extends import_obsidian17.Modal {
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
    new import_obsidian17.Setting(this.contentEl).addButton((b) => b.setButtonText("Cancel").onClick(() => this.close())).addButton((b) => {
      b.setButtonText("Reset");
      b.buttonEl.addClass("mod-warning");
      b.onClick(() => {
        void (async () => {
          this.close();
          Object.assign(this.plugin.settings, {
            ...DEFAULT_SETTINGS,
            sites: [],
            backup: { ...DEFAULT_SETTINGS.backup }
          });
          await this.plugin.saveSettings();
          this.onDone();
        })();
      });
    });
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/ui/settings/modals/editSiteModal.ts
var import_obsidian19 = require("obsidian");

// src/ui/settings/modals/changeRepoModal.ts
var import_obsidian18 = require("obsidian");
init_settings();
var ChangeRepoModal = class extends import_obsidian18.Modal {
  constructor(app, plugin, site, onDone) {
    super(app);
    this.plugin = plugin;
    this.site = site;
    this.onDone = onDone;
  }
  onOpen() {
    this.titleEl.setText("Change Repository");
    let newRepo = "";
    new import_obsidian18.Setting(this.contentEl).setName("New repository name").setDesc("Enter the new GitHub repository name.").addText((t) => {
      t.setValue(this.site.githubRepo || this.plugin.settings.masterRepository);
      t.onChange((v) => {
        newRepo = v.trim();
      });
    });
    new import_obsidian18.Setting(this.contentEl).setName("Migrate or Create New").setDesc("Migrate will update this site. Create New will clone this profile for the new repo.").addButton((b) => b.setButtonText("Migrate").onClick(() => {
      if (!newRepo)
        return;
      this.site.githubRepo = newRepo;
      void this.plugin.saveSettings().then(() => {
        new import_obsidian18.Notice("Repository updated. Publish to provision the new repo.");
        this.close();
        this.onDone();
      });
    })).addButton((b) => b.setButtonText("Create New").setCta().onClick(() => {
      if (!newRepo)
        return;
      const newSite = createSiteProfile({
        ...this.site,
        name: `${this.site.name} (Copy)`,
        githubRepo: newRepo,
        cloudflareProject: "",
        siteUrl: "",
        isPublished: false,
        lastPublished: "",
        lastNoteCount: 0
      });
      this.plugin.settings.sites.push(newSite);
      void this.plugin.saveSettings().then(() => {
        new import_obsidian18.Notice("New site profile created.");
        this.close();
        this.onDone();
      });
    }));
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/ui/settings/modals/editSiteModal.ts
var EditSiteModal = class extends import_obsidian19.Modal {
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
    new import_obsidian19.Setting(this.contentEl).setName("Publishing rules").setHeading();
    new import_obsidian19.Setting(this.contentEl).setName("GitHub repository").setDesc("The repository linked to this site.").addText((t) => {
      t.setValue(s.githubRepo || this.plugin.settings.masterRepository);
      t.setDisabled(true);
    }).addButton((b) => b.setButtonText("Change Repo").onClick(() => {
      new ChangeRepoModal(this.app, this.plugin, s, () => this.render()).open();
    }));
    let updateVisibility;
    new import_obsidian19.Setting(this.contentEl).setName("Publish scope").setDesc("Configure what to publish: the entire vault or selected files/folders.").addDropdown((d) => {
      d.addOption("vault", "Full Vault");
      d.addOption("selected", "Selected Files/Folders");
      d.setValue(s.publishScope || "vault");
      d.onChange((v) => {
        void (async () => {
          s.publishScope = v;
          await this.plugin.saveSettings();
          updateVisibility();
        })();
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
          li.setCssStyles({ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" });
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
    new import_obsidian19.Setting(this.contentEl).setName("Site Customization").setHeading();
    new import_obsidian19.Setting(this.contentEl).setName("Site name").setDesc("Internal name for this site.").addText((t) => {
      t.setValue(s.name || "");
      t.onChange((v) => {
        void (async () => {
          s.name = v.trim();
          await this.plugin.saveSettings();
        })();
      });
    });
    new import_obsidian19.Setting(this.contentEl).setName("Author name").setDesc("The author name written to the site metadata.").addText((t) => {
      t.setPlaceholder("Your Name");
      t.setValue(s.authorName || "");
      t.onChange((v) => {
        void (async () => {
          s.authorName = v.trim();
          await this.plugin.saveSettings();
        })();
      });
    });
    new import_obsidian19.Setting(this.contentEl).setName("Sidebar title").setDesc("Title shown in the sidebar. Defaults to the site name.").addText((t) => {
      t.setPlaceholder("My Digital Garden");
      t.setValue(s.sidebarTitle || "");
      t.onChange((v) => {
        void (async () => {
          s.sidebarTitle = v.trim();
          await this.plugin.saveSettings();
        })();
      });
    });
    new import_obsidian19.Setting(this.contentEl).setName("Site description").setDesc("Description of your site.").addText((t) => {
      t.setPlaceholder("Notes and thoughts\u2026");
      t.setValue(s.siteDescription || "");
      t.onChange((v) => {
        void (async () => {
          s.siteDescription = v.trim();
          await this.plugin.saveSettings();
        })();
      });
    });
    new import_obsidian19.Setting(this.contentEl).setName("Exclude patterns").setDesc("One glob per line. Matching files are not published (e.g. private/**, *.private.md).").addTextArea((area) => {
      area.setValue(s.excludePatterns.join("\n"));
      area.inputEl.rows = 4;
      area.onChange((v) => {
        void (async () => {
          s.excludePatterns = v.split("\n").map((x) => x.trim()).filter(Boolean);
          await this.plugin.saveSettings();
        })();
      });
    });
    new import_obsidian19.Setting(this.contentEl).setName("Include attachments").setDesc("Upload images and PDFs alongside your notes.").addToggle((toggle) => {
      toggle.setValue(s.includeAttachments);
      toggle.onChange((v) => {
        void (async () => {
          s.includeAttachments = v;
          await this.plugin.saveSettings();
        })();
      });
    });
    new import_obsidian19.Setting(this.contentEl).addButton((b) => b.setButtonText("Done").setCta().onClick(() => {
      this.close();
      this.onDone();
    }));
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/ui/settings/manage/sitesSection.ts
function renderSitesSection(tab, el) {
  const s = tab.plugin.settings;
  if (s.enablePublish) {
    const sitesHeading = new import_obsidian20.Setting(el);
    sitesHeading.setName("Sites");
    sitesHeading.setHeading();
    new import_obsidian20.Setting(el).setName("Panel location").setDesc("Where the NoteFlare panel opens by default.").addDropdown((d) => {
      var _a;
      d.addOption("left", "Left sidebar");
      d.addOption("right", "Right sidebar");
      d.addOption("tab", "Main workspace tab");
      d.setValue((_a = s.defaultViewLocation) != null ? _a : "left");
      d.onChange((v) => {
        void (async () => {
          s.defaultViewLocation = v;
          await tab.plugin.saveSettings();
        })();
      });
    });
    if (s.sites.length === 0) {
      el.createEl("p", {
        cls: "setting-item-description",
        text: "No sites yet \u2014 add one to get started."
      });
    } else {
      for (const site of s.sites) {
        const isLive = site.isPublished;
        const providerLabel = site.hostingProvider === "cloudflare" ? "Cloudflare Pages" : "GitHub Pages";
        const statusText = site.lastPublished ? `Last published ${new Date(site.lastPublished).toLocaleString()} \xB7 ${site.lastNoteCount} notes` : "Not published yet";
        const siteSetting = new import_obsidian20.Setting(el).setName(site.name || site.cloudflareProject || "Site").setDesc(`${isLive ? "\u{1F7E2} Live" : "\u26AA Offline"} \xB7 ${providerLabel} \xB7 ${statusText}`);
        const cfConnected = !!tab.plugin.settings.cloudflareToken;
        siteSetting.addDropdown((d) => {
          d.addOption("github-pages", "GitHub Pages");
          if (cfConnected) {
            d.addOption("cloudflare", "Cloudflare Pages");
          }
          const storedProvider = site.hostingProvider || "github-pages";
          d.setValue(cfConnected ? storedProvider : "github-pages");
          d.onChange((v) => {
            void (async () => {
              site.hostingProvider = v;
              await tab.plugin.saveSettings();
              tab.render();
            })();
          });
        });
        if (site.siteUrl) {
          siteSetting.addExtraButton(
            (b) => b.setIcon("external-link").setTooltip("Open site").onClick(() => {
              window.open(`https://${site.siteUrl}`, "_blank");
            })
          );
        }
        siteSetting.addButton(
          (b) => b.setButtonText("Edit").onClick(() => {
            new EditSiteModal(tab.app, tab.plugin, site, () => tab.render()).open();
          })
        );
        siteSetting.addButton((b) => {
          b.setButtonText("Remove");
          b.buttonEl.addClass("mod-warning");
          b.onClick(() => {
            new RemoveSiteModal(tab.app, tab.plugin, site, () => tab.render()).open();
          });
        });
      }
    }
    new import_obsidian20.Setting(el).addButton(
      (b) => b.setButtonText("Add site").setCta().onClick(() => {
        new AddSiteModal(tab.app, tab.plugin, () => tab.render()).open();
      })
    );
  }
}

// src/ui/settings/settingsTab.ts
var NoteFlareSettingsTab = class extends import_obsidian21.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.isCloudflareConnectFlowOpen = false;
    this.hasInitializedWizard = false;
    // Pending config across wizard steps
    this.pendingName = "";
    this.pendingScope = "vault";
    this.pendingPaths = [];
    this.pendingProvider = "cloudflare";
    this.plugin = plugin;
    this.wizardStep = this.getInitialWizardStep();
  }
  getInitialWizardStep() {
    const s = this.plugin.settings;
    if (s.githubToken && s.githubOwner)
      return "hosting";
    return "github";
  }
  display() {
    this.render();
  }
  render() {
    const { containerEl } = this;
    containerEl.empty();
    const s = this.plugin.settings;
    try {
      if (!s.setupComplete) {
        if (!this.hasInitializedWizard) {
          this.wizardStep = this.getInitialWizardStep();
          this.hasInitializedWizard = true;
        }
        renderWizard(this, containerEl);
      } else if (this.isCloudflareConnectFlowOpen) {
        openCloudflareConnectFlow(this, containerEl);
      } else {
        try {
          renderConnectionsSection(this, containerEl);
        } catch (e) {
          this.renderSectionError(containerEl, "Connections", e);
        }
        try {
          renderBackupSection(this, containerEl);
        } catch (e) {
          this.renderSectionError(containerEl, "Backup", e);
        }
        try {
          renderSitesSection(this, containerEl);
        } catch (e) {
          this.renderSectionError(containerEl, "Sites", e);
        }
      }
    } catch (err) {
      this.renderSectionError(containerEl, "Settings", err);
    }
    this.renderResetFooter(containerEl);
  }
  /** Display an inline error when a settings section fails to render. */
  renderSectionError(el, section, err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`NoteFlare: ${section} section render error:`, err);
    const p = el.createEl("p", { cls: "setting-item-description" });
    p.setText(`\u26A0 NoteFlare (${section}): ${msg}`);
    p.setCssStyles({ color: "var(--text-error)", marginBottom: "8px" });
  }
  openCloudflareConnectFlow() {
    this.isCloudflareConnectFlowOpen = true;
    this.render();
  }
  closeSettings() {
    var _a;
    const setting = this.app.setting;
    (_a = setting == null ? void 0 : setting.close) == null ? void 0 : _a.call(setting);
  }
  renderResetFooter(el) {
    const divider = el.createDiv("nf-reset-footer");
    const dangerHeading = new import_obsidian21.Setting(divider);
    dangerHeading.setName("Danger zone");
    dangerHeading.setHeading();
    const resetSetting = new import_obsidian21.Setting(divider);
    resetSetting.setName("Hard reset NoteFlare");
    resetSetting.setDesc(
      "Clears all NoteFlare data \u2014 tokens, every site, and all configuration. Your GitHub repos and Cloudflare projects are NOT deleted and can be reconnected any time."
    );
    resetSetting.addButton((b) => {
      b.setButtonText("Hard reset");
      b.buttonEl.addClass("mod-warning");
      b.onClick(
        () => new ResetModal(this.app, this.plugin, () => {
          this.wizardStep = "github";
          this.pendingName = "";
          this.pendingScope = "vault";
          this.pendingPaths = [];
          this.pendingProvider = "cloudflare";
          this.hasInitializedWizard = false;
          this.render();
        }).open()
      );
    });
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
var import_obsidian22 = require("obsidian");
var VIEW_TYPE_NOTEFLARE = "noteflare-panel";
var CLOUDFLARE_APP_URL3 = "https://github.com/apps/cloudflare-workers-and-pages/installations/new";
function relativeTime(iso) {
  if (!iso)
    return "";
  const diffMs = Date.now() - new Date(iso).getTime();
  if (isNaN(diffMs))
    return "";
  const mins = Math.floor(diffMs / 6e4);
  if (mins < 1)
    return "just now";
  if (mins < 60)
    return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)
    return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}
var NoteFlareView = class extends import_obsidian22.ItemView {
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
    const site = this.plugin.getActiveSite();
    if (site)
      void this.plugin.fetchLiveStatus(site);
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
      const settingsButton = backup.createEl("button", { text: "Backup options", cls: "mod-cta" });
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
    const isPublishing = !!this.plugin.publishInProgress[site.id];
    const hasFailed = site.lastPublishFailed && !isPublishing;
    const isLive = site.isPublished && !hasFailed;
    const live = (_a = this.plugin.liveStatus[site.id]) != null ? _a : null;
    new import_obsidian22.Setting(root).setName("Current site").addDropdown((d) => {
      for (const sp of s.sites) {
        d.addOption(sp.id, sp.name || sp.githubRepo);
      }
      d.setValue(site.id);
      d.onChange((id) => {
        void (async () => {
          s.activeSiteId = id;
          await this.plugin.saveSettings();
          void this.render();
        })();
      });
    }).addButton((b) => {
      b.setIcon("plus").setTooltip("Create another site").onClick(() => {
        new AddSiteModal(this.app, this.plugin, () => this.refresh()).open();
      });
    });
    this.renderStatusDashboard(root, site, isLive, hasFailed, isPublishing, live);
    if (site.hostingProvider === "cloudflare" && site.lastPublishError && /disconnect|git account/i.test(site.lastPublishError)) {
      const warnBanner = root.createDiv("nf-cf-warn-banner");
      warnBanner.createEl("strong", { text: "\u26A0 Cloudflare disconnected from GitHub" });
      warnBanner.createEl("p", {
        text: "Your last build failed because Cloudflare lost access to your GitHub repository. Click below to re-authorize, then publish again."
      });
      const reconnectBtn = warnBanner.createEl("button", { text: "Re-authorize Cloudflare \u2197", cls: "mod-cta" });
      reconnectBtn.addEventListener("click", () => {
        window.open(CLOUDFLARE_APP_URL3, "_blank");
      });
    }
    let updateVisibility;
    new import_obsidian22.Setting(root).setName("Publish scope").setDesc("Configure what to publish: the entire vault or selected files/folders.").addDropdown((d) => {
      d.addOption("vault", "Full Vault");
      d.addOption("selected", "Selected Files/Folders");
      d.setValue(site.publishScope || "vault");
      d.onChange((v) => {
        void (async () => {
          site.publishScope = v;
          updateVisibility();
          await this.plugin.saveSettings();
        })();
      });
    });
    const pathsContainer = root.createDiv("noteflare-paths-container");
    pathsContainer.setCssStyles({
      paddingLeft: "0",
      paddingRight: "0",
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
          (0, import_obsidian22.setIcon)(iconSpan, isFolder ? "folder" : "file-text");
          iconSpan.setCssStyles({
            display: "flex",
            alignItems: "center",
            color: "var(--text-muted)",
            width: "14px",
            height: "14px"
          });
          chip.createSpan({ text: paths[i] });
          const removeBtn = chip.createSpan({ cls: "clickable-icon" });
          (0, import_obsidian22.setIcon)(removeBtn, "x");
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
    new import_obsidian22.Setting(root).setName("Advanced").setDesc("Configure metadata, styling, and exclusions for this site.").addButton((b) => {
      b.setButtonText("Edit").onClick(() => {
        new EditSiteModal(this.app, this.plugin, site, () => this.refresh()).open();
      });
    });
    this.renderActions(root, site, isLive, hasFailed, isPublishing);
  }
  /** Render the live status dashboard card. */
  renderStatusDashboard(root, site, isLive, hasFailed, isPublishing, live) {
    const card = root.createDiv("nf-status-card");
    card.setCssStyles({
      marginBottom: "12px",
      padding: "12px 14px",
      border: "1px solid var(--background-modifier-border)",
      borderRadius: "var(--radius-m)",
      backgroundColor: "var(--background-primary-alt)"
    });
    const headerRow = card.createDiv();
    headerRow.setCssStyles({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "10px"
    });
    let badgeEmoji = "\u26AA";
    let badgeText = "Offline";
    let badgeColor = "var(--text-muted)";
    if (isPublishing) {
      badgeEmoji = "\u{1F535}";
      badgeText = "Publishing\u2026";
      badgeColor = "var(--text-accent)";
    } else if (hasFailed) {
      badgeEmoji = "\u{1F534}";
      badgeText = "Last publish failed";
      badgeColor = "var(--text-error)";
    } else if (isLive) {
      if (live && !live.loading && live.workflowStatus === "completed") {
        if (live.workflowConclusion === "success") {
          badgeEmoji = "\u{1F7E2}";
          badgeText = "Live";
          badgeColor = "var(--text-success)";
        } else if (live.workflowConclusion === "failure") {
          badgeEmoji = "\u{1F534}";
          badgeText = site.hostingProvider === "cloudflare" ? "Build failed on Cloudflare" : "Build failed on GitHub";
          badgeColor = "var(--text-error)";
        } else if (live.workflowConclusion === "cancelled") {
          badgeEmoji = "\u{1F7E1}";
          badgeText = "Build cancelled";
          badgeColor = "var(--color-yellow)";
        }
      } else if (live && live.workflowStatus === "in_progress") {
        badgeEmoji = "\u{1F535}";
        badgeText = site.hostingProvider === "cloudflare" ? "Building on Cloudflare\u2026" : "Building on GitHub\u2026";
        badgeColor = "var(--text-accent)";
      } else {
        badgeEmoji = "\u{1F7E2}";
        badgeText = "Live";
        badgeColor = "var(--text-success)";
      }
    }
    const badgeEl = headerRow.createEl("span");
    badgeEl.setCssStyles({ fontWeight: "600", color: badgeColor, fontSize: "var(--font-ui-medium)" });
    badgeEl.setText(`${badgeEmoji} ${badgeText}`);
    const refreshBtn = headerRow.createEl("button", { text: (live == null ? void 0 : live.loading) ? "\u2026" : "\u21BB Refresh" });
    refreshBtn.setCssStyles({ fontSize: "var(--font-ui-smaller)", padding: "2px 8px" });
    if (live == null ? void 0 : live.loading)
      refreshBtn.setAttr("disabled", "true");
    refreshBtn.addEventListener("click", () => {
      const s = this.plugin.getActiveSite();
      if (s)
        void this.plugin.fetchLiveStatus(s);
    });
    const grid = card.createDiv();
    grid.setCssStyles({
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "6px 16px",
      fontSize: "var(--font-ui-smaller)",
      color: "var(--text-muted)"
    });
    const addRow = (label, value, href) => {
      const labelEl = grid.createEl("span", { text: label });
      labelEl.setCssStyles({ fontWeight: "500", color: "var(--text-normal)" });
      if (href && value) {
        const linkEl = grid.createEl("a", { text: value, href });
        linkEl.setCssStyles({ color: "var(--text-accent)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block" });
        linkEl.addEventListener("click", (e) => {
          e.preventDefault();
          window.open(href, "_blank");
        });
      } else {
        const valEl = grid.createEl("span", { text: value || "\u2014" });
        valEl.setCssStyles({ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" });
      }
    };
    addRow("Site URL", site.siteUrl ? site.siteUrl : "\u2014", site.siteUrl ? `https://${site.siteUrl.replace(/^https?:\/\//, "")}` : void 0);
    const hostLabel = site.hostingProvider === "cloudflare" ? "Cloudflare Pages" : site.hostingProvider === "github-pages" ? "GitHub Pages" : site.hostingProvider;
    addRow("Host", hostLabel);
    if (live && !live.loading) {
      addRow(
        "Repository",
        `${this.plugin.settings.githubOwner}/${this.plugin.settings.masterRepository}`,
        live.repoHtmlUrl || `https://github.com/${this.plugin.settings.githubOwner}/${this.plugin.settings.masterRepository}`
      );
      addRow("Last push", live.repoPushedAt ? relativeTime(live.repoPushedAt) : "\u2014");
      if (live.commitSha) {
        addRow(
          "Last commit",
          `${live.commitSha}${live.commitMessage ? ` \u2014 ${live.commitMessage.slice(0, 40)}` : ""}`,
          live.commitSha ? `https://github.com/${this.plugin.settings.githubOwner}/${this.plugin.settings.masterRepository}/commits` : void 0
        );
        addRow("Committed", relativeTime(live.commitDate));
      }
      if ((site.hostingProvider === "github-pages" || site.hostingProvider === "cloudflare") && live.workflowStatus) {
        const wfLabel = live.workflowStatus === "in_progress" ? "\u{1F504} Building\u2026" : live.workflowConclusion === "success" ? "\u2705 Passed" : live.workflowConclusion === "failure" ? "\u274C Failed" : live.workflowConclusion === "cancelled" ? "\u26D4 Cancelled" : live.workflowStatus;
        addRow("Build", wfLabel, live.workflowUrl || void 0);
        addRow("Build ran", relativeTime(live.workflowUpdatedAt));
      }
      if (live.fetchedAt) {
        const fetchedEl = card.createEl("p", { text: `Status fetched ${relativeTime(live.fetchedAt)}` });
        fetchedEl.setCssStyles({ margin: "8px 0 0 0", fontSize: "var(--font-ui-smaller)", color: "var(--text-faint)" });
      }
    } else if (live == null ? void 0 : live.loading) {
      const loadingEl = card.createEl("p", { text: "Fetching live status\u2026" });
      loadingEl.setCssStyles({ margin: "6px 0 0 0", fontSize: "var(--font-ui-smaller)", color: "var(--text-muted)" });
    } else {
      addRow(
        "Repository",
        `${this.plugin.settings.githubOwner}/${this.plugin.settings.masterRepository}`,
        `https://github.com/${this.plugin.settings.githubOwner}/${this.plugin.settings.masterRepository}`
      );
      if (site.lastPublished) {
        addRow("Last published", relativeTime(site.lastPublished));
        addRow("Notes", String(site.lastNoteCount));
      }
    }
    if (hasFailed && site.lastPublishError) {
      const errEl = card.createEl("p", { text: `\u26A0 ${site.lastPublishError}` });
      errEl.setCssStyles({
        margin: "8px 0 0 0",
        fontSize: "var(--font-ui-smaller)",
        color: "var(--text-error)",
        wordBreak: "break-word"
      });
    }
    if (this.plugin.settings.enableBackup) {
      const backupEl = card.createEl("p");
      backupEl.setCssStyles({ margin: "8px 0 0 0", fontSize: "var(--font-ui-smaller)", color: "var(--text-muted)", borderTop: "1px solid var(--background-modifier-border)", paddingTop: "8px" });
      const backupText = this.plugin.settings.backup.lastBackupError ? `Backup: \u26A0 ${this.plugin.settings.backup.lastBackupError}` : this.plugin.settings.backup.lastBackupAt ? `Backup: \u2713 ${relativeTime(this.plugin.settings.backup.lastBackupAt)}` : "Backup: not run yet";
      backupEl.setText(backupText);
    }
  }
  /** Render the Publish / Unpublish / Delete action buttons. */
  renderActions(root, site, isLive, hasFailed, isPublishing) {
    const actionBox = root.createDiv("nf-actions-box");
    actionBox.setCssStyles({
      marginTop: "8px",
      padding: "12px",
      border: "1px solid var(--background-modifier-border)",
      backgroundColor: "var(--background-primary-alt)",
      borderRadius: "var(--radius-s)",
      marginBottom: "15px"
    });
    const actionHeading = new import_obsidian22.Setting(actionBox).setName("Actions").setHeading();
    actionHeading.settingEl.setCssStyles({ border: "none", padding: "0", marginBottom: "12px" });
    const actionSetting = new import_obsidian22.Setting(actionBox);
    actionSetting.settingEl.setCssStyles({ border: "none", padding: "0" });
    actionSetting.infoEl.setCssStyles({ display: "none" });
    actionSetting.controlEl.setCssStyles({
      display: "flex",
      flexDirection: "row",
      gap: "8px",
      flexWrap: "wrap",
      justifyContent: "flex-end",
      width: "100%"
    });
    const publishLabel = isPublishing ? "Publishing\u2026" : hasFailed ? "Republish" : isLive ? "Update" : "Publish";
    const hostingProvider = site.hostingProvider;
    actionSetting.addButton((b) => {
      b.setButtonText(publishLabel);
      if (isPublishing) {
        b.setDisabled(true);
      } else {
        b.setCta();
      }
      b.onClick(() => {
        void (async () => {
          b.setDisabled(true);
          b.setButtonText("Publishing\u2026");
          try {
            await this.plugin.doPublish();
          } finally {
            void this.render();
          }
        })();
      });
    }).addButton((b) => {
      if (hostingProvider === "cloudflare") {
        b.setButtonText("Unpublish");
        if (!isLive || isPublishing) {
          b.setDisabled(true);
        } else {
          b.buttonEl.addClass("mod-warning");
        }
        b.onClick(() => {
          new UnpublishModal(this.app, this.plugin, () => this.refresh()).open();
        });
      } else {
        b.setButtonText("Unpublish (Manual)");
        if (!isLive || isPublishing) {
          b.setDisabled(true);
        } else {
          b.buttonEl.addClass("mod-warning");
        }
        b.onClick(() => {
          void (async () => {
            site.isPublished = false;
            await this.plugin.saveSettings();
            new GitHubPagesUnpublishModal(
              this.app,
              `https://github.com/${this.plugin.settings.githubOwner}/${this.plugin.settings.masterRepository}/settings/pages`
            ).open();
            this.refresh();
          })();
        });
      }
    }).addButton((b) => {
      const deleteTooltip = hostingProvider === "cloudflare" ? "Removes the Cloudflare Pages project (API) and the site folder from GitHub" : "Removes the site folder from GitHub. GitHub Pages link may remain \u2014 disable it manually in repo Settings \u2192 Pages";
      b.setButtonText("Delete");
      b.setTooltip(deleteTooltip);
      if (isPublishing)
        b.setDisabled(true);
      else
        b.buttonEl.addClass("mod-warning");
      b.onClick(() => {
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
      const isPrivate = backup.repoVisibility !== "public";
      let github = new GitHubApi(githubToken, githubOwner, backup.repository, "main");
      const repositoryExists = await github.repoExists();
      if (!repositoryExists) {
        this.onProgress("Preparing backup storage\u2026");
        await github.createRepo(isPrivate);
        if (!await github.waitForRepo(3e4)) {
          throw new Error("Timed out while preparing backup storage.");
        }
      } else if (isPrivate && !await github.isRepoPrivate()) {
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
        const localFileExists = this.app.vault.getAbstractFileByPath(path) !== null;
        if (!this.isIgnored(path) && !localFileExists) {
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
    for (const file of this.app.vault.getFiles()) {
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

// src/backup/backupScheduler.ts
var BackupScheduler = class {
  constructor(plugin) {
    this.plugin = plugin;
    this.backupDebounceTimer = null;
  }
  registerAutomation() {
    const { app } = this.plugin;
    const queueAfterChange = () => {
      if (!this.plugin.settings.enableBackup || !this.plugin.settings.backup.backupOnChange)
        return;
      if (this.backupDebounceTimer !== null)
        window.clearTimeout(this.backupDebounceTimer);
      this.backupDebounceTimer = window.setTimeout(() => {
        this.backupDebounceTimer = null;
        void this.plugin.doBackup(true);
      }, 3e4);
    };
    this.plugin.registerEvent(app.vault.on("create", queueAfterChange));
    this.plugin.registerEvent(app.vault.on("modify", queueAfterChange));
    this.plugin.registerEvent(app.vault.on("delete", queueAfterChange));
    this.plugin.registerEvent(app.vault.on("rename", queueAfterChange));
    this.plugin.register(() => {
      if (this.backupDebounceTimer !== null)
        window.clearTimeout(this.backupDebounceTimer);
    });
    this.plugin.registerInterval(window.setInterval(() => {
      void this.runScheduledBackupIfDue();
    }, 6e4));
    app.workspace.onLayoutReady(() => void this.runScheduledBackupIfDue());
  }
  async runScheduledBackupIfDue() {
    const { settings } = this.plugin;
    const { backup } = settings;
    if (!settings.setupComplete || !settings.enableBackup || backup.intervalMinutes <= 0) {
      return;
    }
    const lastAttempt = backup.lastBackupAttemptAt ? new Date(backup.lastBackupAttemptAt).getTime() : 0;
    const intervalMs = backup.intervalMinutes * 60 * 1e3;
    if (!lastAttempt || Date.now() - lastAttempt >= intervalMs) {
      await this.plugin.doBackup(true);
    }
  }
};

// main.ts
var NoteFlarePlugin = class extends import_obsidian23.Plugin {
  constructor() {
    super(...arguments);
    this.ribbonEl = null;
    this.backupInProgress = false;
    /** In-progress publish tracking (in-memory only, cleared on success/fail). */
    this.publishInProgress = {};
    /** Live GitHub status cache (in-memory, refreshed on panel open/refresh). */
    this.liveStatus = {};
  }
  async onload() {
    await this.loadSettings();
    if (this.settings.githubToken && this.settings.githubOwner && this.settings.sites.length === 0) {
      const registry = await VaultRegistry.load(this.app);
      if (registry.entries.length > 0) {
        new import_obsidian23.Notice(
          `NoteFlare found ${registry.entries.length} previously configured site${registry.entries.length === 1 ? "" : "s"} in your vault. Open NoteFlare settings to restore them.`,
          1e4
        );
      }
    }
    if (!isSecureStorageAvailable()) {
      new import_obsidian23.Notice(
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
    new BackupScheduler(this).registerAutomation();
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
        new import_obsidian23.Notice("A backup is already running.");
      return;
    }
    if (!this.settings.setupComplete || !this.settings.enableBackup) {
      if (!background) {
        this.openSettingsTab();
        new import_obsidian23.Notice("Enable private backup in NoteFlare settings first.");
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
        new import_obsidian23.Notice(message, 5e3);
      }
    } catch (error) {
      const message = this.toUserMessage(error, "Backup failed.");
      this.settings.backup.lastBackupError = message;
      await this.saveSettings();
      if (!background) {
        this.statusBar.setError(message);
        new import_obsidian23.Notice(message, 8e3);
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
      new import_obsidian23.Notice("Add a site before publishing.");
      return;
    }
    if (this.publishInProgress[site.id])
      return;
    this.publishInProgress[site.id] = true;
    this.refreshView();
    const publisher = new Publisher(this.settings, site, this.app, (message) => {
      this.syncStatusFromProgress(message);
      this.refreshView();
    });
    try {
      const result = await publisher.publish();
      await this.applyPublishResult(site, result);
    } catch (err) {
      const message = this.toUserMessage(err, "Publishing failed. Review your setup and try again.");
      site.lastPublishFailed = true;
      site.lastPublishError = message;
      site.isPublished = false;
      this.statusBar.setError(message);
      new import_obsidian23.Notice(message, 8e3);
      await this.saveSettings();
    } finally {
      this.publishInProgress[site.id] = false;
      this.refreshView();
    }
  }
  async doUnpublish() {
    const site = this.getActiveSite();
    if (!this.settings.setupComplete || !site) {
      this.openSettingsTab();
      new import_obsidian23.Notice("Add a site first.");
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
      new import_obsidian23.Notice("Your site is now offline. You can publish again any time.");
    } catch (err) {
      const message = this.toUserMessage(err, "Unpublish failed. Check your Cloudflare settings and try again.");
      this.statusBar.setError(message);
      new import_obsidian23.Notice(message, 8e3);
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
    for (const site of this.settings.sites) {
      void VaultRegistry.upsert(
        this.app,
        site,
        this.settings.masterRepository,
        this.settings.githubOwner,
        this.settings.masterRepositoryPrivate || false
      );
    }
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
    (0, import_obsidian23.setIcon)(this.ribbonEl, live ? "cloud-check" : "cloud-upload");
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
  defaultBackupRepository() {
    const vaultName = this.app.vault.getName().toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
    return `${vaultName || "obsidian-vault"}-backup`;
  }
  async applyPublishResult(site, result) {
    var _a, _b;
    site.lastPublished = (/* @__PURE__ */ new Date()).toISOString();
    site.isPublished = result.success;
    site.lastNoteCount = result.noteCount;
    site.lastPublishFailed = !result.success;
    site.lastPublishError = result.success ? "" : (_a = result.errors[0]) != null ? _a : "Unknown error";
    await this.saveSettings();
    if (result.success) {
      this.statusBar.setLive(result.noteCount, site.siteUrl);
      const fixedNote = result.fixed > 0 ? ` (auto-fixed ${result.fixed} frontmatter issue${result.fixed === 1 ? "" : "s"})` : "";
      new import_obsidian23.Notice(`Published ${result.noteCount} file${result.noteCount === 1 ? "" : "s"} to ${site.siteUrl}${fixedNote}`, 6e3);
      void this.fetchLiveStatus(site);
      return;
    }
    const firstError = (_b = result.errors[0]) != null ? _b : "Publishing failed. Review your setup and try again.";
    this.statusBar.setError(firstError);
    new import_obsidian23.Notice(`Failed to publish: ${firstError}`, 8e3);
  }
  /**
   * Fetch live GitHub status for the given site and cache it in `liveStatus`.
   * The view calls this on open and on the Refresh button. Never throws.
   */
  async fetchLiveStatus(site) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
    const repo = site.githubRepo || this.settings.masterRepository;
    if (!this.settings.githubToken || !this.settings.githubOwner || !repo) {
      this.liveStatus[site.id] = {
        ...(_a = this.liveStatus[site.id]) != null ? _a : {},
        loading: false,
        error: !repo ? "GitHub repository not configured." : "GitHub account not connected."
      };
      this.refreshView();
      return;
    }
    const branch = site.githubBranch || "main";
    const github = new GitHubApi(
      this.settings.githubToken,
      this.settings.githubOwner,
      repo,
      branch
    );
    this.liveStatus[site.id] = {
      ...(_b = this.liveStatus[site.id]) != null ? _b : {},
      loading: true
    };
    this.refreshView();
    try {
      const [repoInfo, workflowRun, latestCommit] = await Promise.all([
        github.getRepoInfo(),
        github.getLatestWorkflowRun("deploy.yml"),
        github.getLatestCommit(branch)
      ]);
      let cfWorkflowStatus = (_c = workflowRun == null ? void 0 : workflowRun.status) != null ? _c : "";
      let cfWorkflowConclusion = (_d = workflowRun == null ? void 0 : workflowRun.conclusion) != null ? _d : "";
      let cfWorkflowUrl = (_e = workflowRun == null ? void 0 : workflowRun.htmlUrl) != null ? _e : "";
      let cfWorkflowUpdatedAt = (_f = workflowRun == null ? void 0 : workflowRun.updatedAt) != null ? _f : "";
      if (site.hostingProvider === "cloudflare" && this.settings.cloudflareToken && this.settings.cloudflareAccount && site.cloudflareProject) {
        try {
          const cf = new CloudflareApi(this.settings.cloudflareToken, this.settings.cloudflareAccount);
          const cfDeployments = await cf.listDeployments(site.cloudflareProject);
          const latestCf = (_g = cfDeployments == null ? void 0 : cfDeployments.result) == null ? void 0 : _g[0];
          if (latestCf) {
            const status = latestCf.status;
            if (status === "queued" || status === "pending" || status === "in_progress") {
              cfWorkflowStatus = "in_progress";
              cfWorkflowConclusion = "";
            } else if (status === "success" || status === "active") {
              cfWorkflowStatus = "completed";
              cfWorkflowConclusion = "success";
            } else if (status === "failure" || status === "error") {
              cfWorkflowStatus = "completed";
              cfWorkflowConclusion = "failure";
            } else if (status === "canceled") {
              cfWorkflowStatus = "completed";
              cfWorkflowConclusion = "cancelled";
            } else {
              cfWorkflowStatus = "completed";
              cfWorkflowConclusion = "success";
            }
            cfWorkflowUrl = latestCf.url || "";
            cfWorkflowUpdatedAt = latestCf.modified_on || latestCf.created_on || "";
          }
        } catch (cfErr) {
          console.warn("NoteFlare: could not fetch Cloudflare status:", cfErr);
        }
      }
      this.liveStatus[site.id] = {
        loading: false,
        repoHtmlUrl: (_h = repoInfo == null ? void 0 : repoInfo.htmlUrl) != null ? _h : "",
        repoPushedAt: (_i = repoInfo == null ? void 0 : repoInfo.pushedAt) != null ? _i : "",
        workflowStatus: cfWorkflowStatus,
        workflowConclusion: cfWorkflowConclusion,
        workflowUrl: cfWorkflowUrl,
        workflowUpdatedAt: cfWorkflowUpdatedAt,
        commitSha: (_j = latestCommit == null ? void 0 : latestCommit.sha) != null ? _j : "",
        commitMessage: (_k = latestCommit == null ? void 0 : latestCommit.message) != null ? _k : "",
        commitDate: (_l = latestCommit == null ? void 0 : latestCommit.date) != null ? _l : "",
        fetchedAt: (/* @__PURE__ */ new Date()).toISOString(),
        error: ""
      };
    } catch (err) {
      this.liveStatus[site.id] = {
        ...(_m = this.liveStatus[site.id]) != null ? _m : {},
        loading: false,
        error: err instanceof Error ? err.message : "Status fetch failed"
      };
    }
    this.refreshView();
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
  settings.masterRepositoryPrivate = loaded.masterRepositoryPrivate === true;
  settings.setupComplete = loaded.setupComplete === true;
  settings.activeSiteId = str(loaded.activeSiteId);
  settings.enableBackup = loaded.enableBackup === true;
  settings.enablePublish = loaded.enablePublish !== false;
  const savedBackup = typeof loaded.backup === "object" && loaded.backup !== null ? loaded.backup : null;
  settings.backup = {
    ...DEFAULT_BACKUP_SETTINGS,
    ...savedBackup != null ? savedBackup : {},
    repository: (_a = savedBackup == null ? void 0 : savedBackup.repository) != null ? _a : "",
    repoVisibility: (_b = savedBackup == null ? void 0 : savedBackup.repoVisibility) != null ? _b : "private",
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
      let hostingProvider = s.hostingProvider;
      if (!hostingProvider) {
        const legacyTarget = s.deployTarget;
        hostingProvider = legacyTarget === "cloudflare" ? "cloudflare" : "github-pages";
      }
      const { deployTarget: _dt, ...rest } = s;
      return createSiteProfile({
        ...rest,
        publishScope: publishScope || "vault",
        publishPaths: publishPaths || [],
        hostingProvider
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
