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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL2JyYWNlcy9saWIvdXRpbHMuanMiLCAibm9kZV9tb2R1bGVzL2JyYWNlcy9saWIvc3RyaW5naWZ5LmpzIiwgIm5vZGVfbW9kdWxlcy9pcy1udW1iZXIvaW5kZXguanMiLCAibm9kZV9tb2R1bGVzL3RvLXJlZ2V4LXJhbmdlL2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9maWxsLXJhbmdlL2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9icmFjZXMvbGliL2NvbXBpbGUuanMiLCAibm9kZV9tb2R1bGVzL2JyYWNlcy9saWIvZXhwYW5kLmpzIiwgIm5vZGVfbW9kdWxlcy9icmFjZXMvbGliL2NvbnN0YW50cy5qcyIsICJub2RlX21vZHVsZXMvYnJhY2VzL2xpYi9wYXJzZS5qcyIsICJub2RlX21vZHVsZXMvYnJhY2VzL2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9waWNvbWF0Y2gvbGliL2NvbnN0YW50cy5qcyIsICJub2RlX21vZHVsZXMvcGljb21hdGNoL2xpYi91dGlscy5qcyIsICJub2RlX21vZHVsZXMvcGljb21hdGNoL2xpYi9zY2FuLmpzIiwgIm5vZGVfbW9kdWxlcy9waWNvbWF0Y2gvbGliL3BhcnNlLmpzIiwgIm5vZGVfbW9kdWxlcy9waWNvbWF0Y2gvbGliL3BpY29tYXRjaC5qcyIsICJub2RlX21vZHVsZXMvcGljb21hdGNoL2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9taWNyb21hdGNoL2luZGV4LmpzIiwgInNyYy9jb3JlL3NldHRpbmdzLnRzIiwgIm1haW4udHMiLCAic3JjL2FwaS9naXRodWJBcGkudHMiLCAic3JjL2FwaS9jbG91ZGZsYXJlQXBpLnRzIiwgInNyYy9wdWJsaXNoL2ZpbGVDb2xsZWN0b3IudHMiLCAic3JjL2NvcmUvY29uc3RhbnRzLnRzIiwgInNyYy9wdWJsaXNoL3RyYW5zZm9ybWVyLnRzIiwgInNyYy9wdWJsaXNoL2NvbnRlbnRWYWxpZGF0b3IudHMiLCAic3JjL3B1Ymxpc2gvcHVibGlzaGVyLnRzIiwgInNyYy91aS9zZXR0aW5ncy9zZXR0aW5nc1RhYi50cyIsICJzcmMvdWkvc2V0dGluZ3Mvd2l6YXJkL3N0ZXBHaXRIdWIudHMiLCAic3JjL3VpL3NldHRpbmdzL3NldHRpbmdzSGVscGVycy50cyIsICJzcmMvdWkvc2V0dGluZ3Mvd2l6YXJkL3N0ZXBIb3N0aW5nLnRzIiwgInNyYy91aS9zZXR0aW5ncy9tb2RhbHMvaGVscGVycy50cyIsICJzcmMvdWkvc2V0dGluZ3MvbW9kYWxzL3BhdGhTdWdnZXN0TW9kYWwudHMiLCAic3JjL3VpL3NldHRpbmdzL3dpemFyZC9zdGVwQmFja3VwLnRzIiwgInNyYy91aS9zZXR0aW5ncy93aXphcmQvc3RlcERvbmUudHMiLCAic3JjL3VpL3NldHRpbmdzL3dpemFyZC93aXphcmRSZW5kZXJlci50cyIsICJzcmMvdWkvc2V0dGluZ3MvbWFuYWdlL2Nvbm5lY3Rpb25zU2VjdGlvbi50cyIsICJzcmMvdWkvc2V0dGluZ3MvbWFuYWdlL3Jlc3RvcmVTZWN0aW9uLnRzIiwgInNyYy9jb3JlL3ZhdWx0UmVnaXN0cnkudHMiLCAic3JjL3VpL3NldHRpbmdzL21hbmFnZS9iYWNrdXBTZWN0aW9uLnRzIiwgInNyYy91aS9zZXR0aW5ncy9tYW5hZ2Uvc2l0ZXNTZWN0aW9uLnRzIiwgInNyYy91aS9zZXR0aW5ncy9tb2RhbHMvYWRkU2l0ZU1vZGFsLnRzIiwgInNyYy91aS9zZXR0aW5ncy9tb2RhbHMvcmVtb3ZlU2l0ZU1vZGFsLnRzIiwgInNyYy91aS9zZXR0aW5ncy9tb2RhbHMvdW5wdWJsaXNoTW9kYWxzLnRzIiwgInNyYy91aS9zZXR0aW5ncy9tb2RhbHMvcmVzZXRNb2RhbC50cyIsICJzcmMvdWkvc2V0dGluZ3MvbW9kYWxzL2VkaXRTaXRlTW9kYWwudHMiLCAic3JjL3VpL3NldHRpbmdzL21vZGFscy9jaGFuZ2VSZXBvTW9kYWwudHMiLCAic3JjL3VpL3N0YXR1c0Jhci50cyIsICJzcmMvdWkvbm90ZWZsYXJlVmlldy50cyIsICJzcmMvY29yZS9zZWN1cmVTdG9yZS50cyIsICJzcmMvYmFja3VwL2JhY2t1cEVuZ2luZS50cyIsICJzcmMvYmFja3VwL2JhY2t1cFNjaGVkdWxlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLmlzSW50ZWdlciA9IG51bSA9PiB7XG4gIGlmICh0eXBlb2YgbnVtID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKG51bSk7XG4gIH1cbiAgaWYgKHR5cGVvZiBudW0gPT09ICdzdHJpbmcnICYmIG51bS50cmltKCkgIT09ICcnKSB7XG4gICAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIoTnVtYmVyKG51bSkpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbi8qKlxuICogRmluZCBhIG5vZGUgb2YgdGhlIGdpdmVuIHR5cGVcbiAqL1xuXG5leHBvcnRzLmZpbmQgPSAobm9kZSwgdHlwZSkgPT4gbm9kZS5ub2Rlcy5maW5kKG5vZGUgPT4gbm9kZS50eXBlID09PSB0eXBlKTtcblxuLyoqXG4gKiBGaW5kIGEgbm9kZSBvZiB0aGUgZ2l2ZW4gdHlwZVxuICovXG5cbmV4cG9ydHMuZXhjZWVkc0xpbWl0ID0gKG1pbiwgbWF4LCBzdGVwID0gMSwgbGltaXQpID0+IHtcbiAgaWYgKGxpbWl0ID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuICBpZiAoIWV4cG9ydHMuaXNJbnRlZ2VyKG1pbikgfHwgIWV4cG9ydHMuaXNJbnRlZ2VyKG1heCkpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuICgoTnVtYmVyKG1heCkgLSBOdW1iZXIobWluKSkgLyBOdW1iZXIoc3RlcCkpID49IGxpbWl0O1xufTtcblxuLyoqXG4gKiBFc2NhcGUgdGhlIGdpdmVuIG5vZGUgd2l0aCAnXFxcXCcgYmVmb3JlIG5vZGUudmFsdWVcbiAqL1xuXG5leHBvcnRzLmVzY2FwZU5vZGUgPSAoYmxvY2ssIG4gPSAwLCB0eXBlKSA9PiB7XG4gIGNvbnN0IG5vZGUgPSBibG9jay5ub2Rlc1tuXTtcbiAgaWYgKCFub2RlKSByZXR1cm47XG5cbiAgaWYgKCh0eXBlICYmIG5vZGUudHlwZSA9PT0gdHlwZSkgfHwgbm9kZS50eXBlID09PSAnb3BlbicgfHwgbm9kZS50eXBlID09PSAnY2xvc2UnKSB7XG4gICAgaWYgKG5vZGUuZXNjYXBlZCAhPT0gdHJ1ZSkge1xuICAgICAgbm9kZS52YWx1ZSA9ICdcXFxcJyArIG5vZGUudmFsdWU7XG4gICAgICBub2RlLmVzY2FwZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIGJyYWNlIG5vZGUgc2hvdWxkIGJlIGVuY2xvc2VkIGluIGxpdGVyYWwgYnJhY2VzXG4gKi9cblxuZXhwb3J0cy5lbmNsb3NlQnJhY2UgPSBub2RlID0+IHtcbiAgaWYgKG5vZGUudHlwZSAhPT0gJ2JyYWNlJykgcmV0dXJuIGZhbHNlO1xuICBpZiAoKG5vZGUuY29tbWFzID4+IDAgKyBub2RlLnJhbmdlcyA+PiAwKSA9PT0gMCkge1xuICAgIG5vZGUuaW52YWxpZCA9IHRydWU7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYSBicmFjZSBub2RlIGlzIGludmFsaWQuXG4gKi9cblxuZXhwb3J0cy5pc0ludmFsaWRCcmFjZSA9IGJsb2NrID0+IHtcbiAgaWYgKGJsb2NrLnR5cGUgIT09ICdicmFjZScpIHJldHVybiBmYWxzZTtcbiAgaWYgKGJsb2NrLmludmFsaWQgPT09IHRydWUgfHwgYmxvY2suZG9sbGFyKSByZXR1cm4gdHJ1ZTtcbiAgaWYgKChibG9jay5jb21tYXMgPj4gMCArIGJsb2NrLnJhbmdlcyA+PiAwKSA9PT0gMCkge1xuICAgIGJsb2NrLmludmFsaWQgPSB0cnVlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChibG9jay5vcGVuICE9PSB0cnVlIHx8IGJsb2NrLmNsb3NlICE9PSB0cnVlKSB7XG4gICAgYmxvY2suaW52YWxpZCA9IHRydWU7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYSBub2RlIGlzIGFuIG9wZW4gb3IgY2xvc2Ugbm9kZVxuICovXG5cbmV4cG9ydHMuaXNPcGVuT3JDbG9zZSA9IG5vZGUgPT4ge1xuICBpZiAobm9kZS50eXBlID09PSAnb3BlbicgfHwgbm9kZS50eXBlID09PSAnY2xvc2UnKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIG5vZGUub3BlbiA9PT0gdHJ1ZSB8fCBub2RlLmNsb3NlID09PSB0cnVlO1xufTtcblxuLyoqXG4gKiBSZWR1Y2UgYW4gYXJyYXkgb2YgdGV4dCBub2Rlcy5cbiAqL1xuXG5leHBvcnRzLnJlZHVjZSA9IG5vZGVzID0+IG5vZGVzLnJlZHVjZSgoYWNjLCBub2RlKSA9PiB7XG4gIGlmIChub2RlLnR5cGUgPT09ICd0ZXh0JykgYWNjLnB1c2gobm9kZS52YWx1ZSk7XG4gIGlmIChub2RlLnR5cGUgPT09ICdyYW5nZScpIG5vZGUudHlwZSA9ICd0ZXh0JztcbiAgcmV0dXJuIGFjYztcbn0sIFtdKTtcblxuLyoqXG4gKiBGbGF0dGVuIGFuIGFycmF5XG4gKi9cblxuZXhwb3J0cy5mbGF0dGVuID0gKC4uLmFyZ3MpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gW107XG5cbiAgY29uc3QgZmxhdCA9IGFyciA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGVsZSA9IGFycltpXTtcblxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZWxlKSkge1xuICAgICAgICBmbGF0KGVsZSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoZWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goZWxlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICBmbGF0KGFyZ3MpO1xuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChhc3QsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICBjb25zdCBzdHJpbmdpZnkgPSAobm9kZSwgcGFyZW50ID0ge30pID0+IHtcbiAgICBjb25zdCBpbnZhbGlkQmxvY2sgPSBvcHRpb25zLmVzY2FwZUludmFsaWQgJiYgdXRpbHMuaXNJbnZhbGlkQnJhY2UocGFyZW50KTtcbiAgICBjb25zdCBpbnZhbGlkTm9kZSA9IG5vZGUuaW52YWxpZCA9PT0gdHJ1ZSAmJiBvcHRpb25zLmVzY2FwZUludmFsaWQgPT09IHRydWU7XG4gICAgbGV0IG91dHB1dCA9ICcnO1xuXG4gICAgaWYgKG5vZGUudmFsdWUpIHtcbiAgICAgIGlmICgoaW52YWxpZEJsb2NrIHx8IGludmFsaWROb2RlKSAmJiB1dGlscy5pc09wZW5PckNsb3NlKG5vZGUpKSB7XG4gICAgICAgIHJldHVybiAnXFxcXCcgKyBub2RlLnZhbHVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5vZGUudmFsdWU7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUudmFsdWUpIHtcbiAgICAgIHJldHVybiBub2RlLnZhbHVlO1xuICAgIH1cblxuICAgIGlmIChub2RlLm5vZGVzKSB7XG4gICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIG5vZGUubm9kZXMpIHtcbiAgICAgICAgb3V0cHV0ICs9IHN0cmluZ2lmeShjaGlsZCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH07XG5cbiAgcmV0dXJuIHN0cmluZ2lmeShhc3QpO1xufTtcblxuIiwgIi8qIVxuICogaXMtbnVtYmVyIDxodHRwczovL2dpdGh1Yi5jb20vam9uc2NobGlua2VydC9pcy1udW1iZXI+XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEpvbiBTY2hsaW5rZXJ0LlxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihudW0pIHtcbiAgaWYgKHR5cGVvZiBudW0gPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIG51bSAtIG51bSA9PT0gMDtcbiAgfVxuICBpZiAodHlwZW9mIG51bSA9PT0gJ3N0cmluZycgJiYgbnVtLnRyaW0oKSAhPT0gJycpIHtcbiAgICByZXR1cm4gTnVtYmVyLmlzRmluaXRlID8gTnVtYmVyLmlzRmluaXRlKCtudW0pIDogaXNGaW5pdGUoK251bSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcbiIsICIvKiFcbiAqIHRvLXJlZ2V4LXJhbmdlIDxodHRwczovL2dpdGh1Yi5jb20vbWljcm9tYXRjaC90by1yZWdleC1yYW5nZT5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUtcHJlc2VudCwgSm9uIFNjaGxpbmtlcnQuXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBpc051bWJlciA9IHJlcXVpcmUoJ2lzLW51bWJlcicpO1xuXG5jb25zdCB0b1JlZ2V4UmFuZ2UgPSAobWluLCBtYXgsIG9wdGlvbnMpID0+IHtcbiAgaWYgKGlzTnVtYmVyKG1pbikgPT09IGZhbHNlKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndG9SZWdleFJhbmdlOiBleHBlY3RlZCB0aGUgZmlyc3QgYXJndW1lbnQgdG8gYmUgYSBudW1iZXInKTtcbiAgfVxuXG4gIGlmIChtYXggPT09IHZvaWQgMCB8fCBtaW4gPT09IG1heCkge1xuICAgIHJldHVybiBTdHJpbmcobWluKTtcbiAgfVxuXG4gIGlmIChpc051bWJlcihtYXgpID09PSBmYWxzZSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3RvUmVnZXhSYW5nZTogZXhwZWN0ZWQgdGhlIHNlY29uZCBhcmd1bWVudCB0byBiZSBhIG51bWJlci4nKTtcbiAgfVxuXG4gIGxldCBvcHRzID0geyByZWxheFplcm9zOiB0cnVlLCAuLi5vcHRpb25zIH07XG4gIGlmICh0eXBlb2Ygb3B0cy5zdHJpY3RaZXJvcyA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgb3B0cy5yZWxheFplcm9zID0gb3B0cy5zdHJpY3RaZXJvcyA9PT0gZmFsc2U7XG4gIH1cblxuICBsZXQgcmVsYXggPSBTdHJpbmcob3B0cy5yZWxheFplcm9zKTtcbiAgbGV0IHNob3J0aGFuZCA9IFN0cmluZyhvcHRzLnNob3J0aGFuZCk7XG4gIGxldCBjYXB0dXJlID0gU3RyaW5nKG9wdHMuY2FwdHVyZSk7XG4gIGxldCB3cmFwID0gU3RyaW5nKG9wdHMud3JhcCk7XG4gIGxldCBjYWNoZUtleSA9IG1pbiArICc6JyArIG1heCArICc9JyArIHJlbGF4ICsgc2hvcnRoYW5kICsgY2FwdHVyZSArIHdyYXA7XG5cbiAgaWYgKHRvUmVnZXhSYW5nZS5jYWNoZS5oYXNPd25Qcm9wZXJ0eShjYWNoZUtleSkpIHtcbiAgICByZXR1cm4gdG9SZWdleFJhbmdlLmNhY2hlW2NhY2hlS2V5XS5yZXN1bHQ7XG4gIH1cblxuICBsZXQgYSA9IE1hdGgubWluKG1pbiwgbWF4KTtcbiAgbGV0IGIgPSBNYXRoLm1heChtaW4sIG1heCk7XG5cbiAgaWYgKE1hdGguYWJzKGEgLSBiKSA9PT0gMSkge1xuICAgIGxldCByZXN1bHQgPSBtaW4gKyAnfCcgKyBtYXg7XG4gICAgaWYgKG9wdHMuY2FwdHVyZSkge1xuICAgICAgcmV0dXJuIGAoJHtyZXN1bHR9KWA7XG4gICAgfVxuICAgIGlmIChvcHRzLndyYXAgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZXR1cm4gYCg/OiR7cmVzdWx0fSlgO1xuICB9XG5cbiAgbGV0IGlzUGFkZGVkID0gaGFzUGFkZGluZyhtaW4pIHx8IGhhc1BhZGRpbmcobWF4KTtcbiAgbGV0IHN0YXRlID0geyBtaW4sIG1heCwgYSwgYiB9O1xuICBsZXQgcG9zaXRpdmVzID0gW107XG4gIGxldCBuZWdhdGl2ZXMgPSBbXTtcblxuICBpZiAoaXNQYWRkZWQpIHtcbiAgICBzdGF0ZS5pc1BhZGRlZCA9IGlzUGFkZGVkO1xuICAgIHN0YXRlLm1heExlbiA9IFN0cmluZyhzdGF0ZS5tYXgpLmxlbmd0aDtcbiAgfVxuXG4gIGlmIChhIDwgMCkge1xuICAgIGxldCBuZXdNaW4gPSBiIDwgMCA/IE1hdGguYWJzKGIpIDogMTtcbiAgICBuZWdhdGl2ZXMgPSBzcGxpdFRvUGF0dGVybnMobmV3TWluLCBNYXRoLmFicyhhKSwgc3RhdGUsIG9wdHMpO1xuICAgIGEgPSBzdGF0ZS5hID0gMDtcbiAgfVxuXG4gIGlmIChiID49IDApIHtcbiAgICBwb3NpdGl2ZXMgPSBzcGxpdFRvUGF0dGVybnMoYSwgYiwgc3RhdGUsIG9wdHMpO1xuICB9XG5cbiAgc3RhdGUubmVnYXRpdmVzID0gbmVnYXRpdmVzO1xuICBzdGF0ZS5wb3NpdGl2ZXMgPSBwb3NpdGl2ZXM7XG4gIHN0YXRlLnJlc3VsdCA9IGNvbGxhdGVQYXR0ZXJucyhuZWdhdGl2ZXMsIHBvc2l0aXZlcywgb3B0cyk7XG5cbiAgaWYgKG9wdHMuY2FwdHVyZSA9PT0gdHJ1ZSkge1xuICAgIHN0YXRlLnJlc3VsdCA9IGAoJHtzdGF0ZS5yZXN1bHR9KWA7XG4gIH0gZWxzZSBpZiAob3B0cy53cmFwICE9PSBmYWxzZSAmJiAocG9zaXRpdmVzLmxlbmd0aCArIG5lZ2F0aXZlcy5sZW5ndGgpID4gMSkge1xuICAgIHN0YXRlLnJlc3VsdCA9IGAoPzoke3N0YXRlLnJlc3VsdH0pYDtcbiAgfVxuXG4gIHRvUmVnZXhSYW5nZS5jYWNoZVtjYWNoZUtleV0gPSBzdGF0ZTtcbiAgcmV0dXJuIHN0YXRlLnJlc3VsdDtcbn07XG5cbmZ1bmN0aW9uIGNvbGxhdGVQYXR0ZXJucyhuZWcsIHBvcywgb3B0aW9ucykge1xuICBsZXQgb25seU5lZ2F0aXZlID0gZmlsdGVyUGF0dGVybnMobmVnLCBwb3MsICctJywgZmFsc2UsIG9wdGlvbnMpIHx8IFtdO1xuICBsZXQgb25seVBvc2l0aXZlID0gZmlsdGVyUGF0dGVybnMocG9zLCBuZWcsICcnLCBmYWxzZSwgb3B0aW9ucykgfHwgW107XG4gIGxldCBpbnRlcnNlY3RlZCA9IGZpbHRlclBhdHRlcm5zKG5lZywgcG9zLCAnLT8nLCB0cnVlLCBvcHRpb25zKSB8fCBbXTtcbiAgbGV0IHN1YnBhdHRlcm5zID0gb25seU5lZ2F0aXZlLmNvbmNhdChpbnRlcnNlY3RlZCkuY29uY2F0KG9ubHlQb3NpdGl2ZSk7XG4gIHJldHVybiBzdWJwYXR0ZXJucy5qb2luKCd8Jyk7XG59XG5cbmZ1bmN0aW9uIHNwbGl0VG9SYW5nZXMobWluLCBtYXgpIHtcbiAgbGV0IG5pbmVzID0gMTtcbiAgbGV0IHplcm9zID0gMTtcblxuICBsZXQgc3RvcCA9IGNvdW50TmluZXMobWluLCBuaW5lcyk7XG4gIGxldCBzdG9wcyA9IG5ldyBTZXQoW21heF0pO1xuXG4gIHdoaWxlIChtaW4gPD0gc3RvcCAmJiBzdG9wIDw9IG1heCkge1xuICAgIHN0b3BzLmFkZChzdG9wKTtcbiAgICBuaW5lcyArPSAxO1xuICAgIHN0b3AgPSBjb3VudE5pbmVzKG1pbiwgbmluZXMpO1xuICB9XG5cbiAgc3RvcCA9IGNvdW50WmVyb3MobWF4ICsgMSwgemVyb3MpIC0gMTtcblxuICB3aGlsZSAobWluIDwgc3RvcCAmJiBzdG9wIDw9IG1heCkge1xuICAgIHN0b3BzLmFkZChzdG9wKTtcbiAgICB6ZXJvcyArPSAxO1xuICAgIHN0b3AgPSBjb3VudFplcm9zKG1heCArIDEsIHplcm9zKSAtIDE7XG4gIH1cblxuICBzdG9wcyA9IFsuLi5zdG9wc107XG4gIHN0b3BzLnNvcnQoY29tcGFyZSk7XG4gIHJldHVybiBzdG9wcztcbn1cblxuLyoqXG4gKiBDb252ZXJ0IGEgcmFuZ2UgdG8gYSByZWdleCBwYXR0ZXJuXG4gKiBAcGFyYW0ge051bWJlcn0gYHN0YXJ0YFxuICogQHBhcmFtIHtOdW1iZXJ9IGBzdG9wYFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5cbmZ1bmN0aW9uIHJhbmdlVG9QYXR0ZXJuKHN0YXJ0LCBzdG9wLCBvcHRpb25zKSB7XG4gIGlmIChzdGFydCA9PT0gc3RvcCkge1xuICAgIHJldHVybiB7IHBhdHRlcm46IHN0YXJ0LCBjb3VudDogW10sIGRpZ2l0czogMCB9O1xuICB9XG5cbiAgbGV0IHppcHBlZCA9IHppcChzdGFydCwgc3RvcCk7XG4gIGxldCBkaWdpdHMgPSB6aXBwZWQubGVuZ3RoO1xuICBsZXQgcGF0dGVybiA9ICcnO1xuICBsZXQgY291bnQgPSAwO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGlnaXRzOyBpKyspIHtcbiAgICBsZXQgW3N0YXJ0RGlnaXQsIHN0b3BEaWdpdF0gPSB6aXBwZWRbaV07XG5cbiAgICBpZiAoc3RhcnREaWdpdCA9PT0gc3RvcERpZ2l0KSB7XG4gICAgICBwYXR0ZXJuICs9IHN0YXJ0RGlnaXQ7XG5cbiAgICB9IGVsc2UgaWYgKHN0YXJ0RGlnaXQgIT09ICcwJyB8fCBzdG9wRGlnaXQgIT09ICc5Jykge1xuICAgICAgcGF0dGVybiArPSB0b0NoYXJhY3RlckNsYXNzKHN0YXJ0RGlnaXQsIHN0b3BEaWdpdCwgb3B0aW9ucyk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgY291bnQrKztcbiAgICB9XG4gIH1cblxuICBpZiAoY291bnQpIHtcbiAgICBwYXR0ZXJuICs9IG9wdGlvbnMuc2hvcnRoYW5kID09PSB0cnVlID8gJ1xcXFxkJyA6ICdbMC05XSc7XG4gIH1cblxuICByZXR1cm4geyBwYXR0ZXJuLCBjb3VudDogW2NvdW50XSwgZGlnaXRzIH07XG59XG5cbmZ1bmN0aW9uIHNwbGl0VG9QYXR0ZXJucyhtaW4sIG1heCwgdG9rLCBvcHRpb25zKSB7XG4gIGxldCByYW5nZXMgPSBzcGxpdFRvUmFuZ2VzKG1pbiwgbWF4KTtcbiAgbGV0IHRva2VucyA9IFtdO1xuICBsZXQgc3RhcnQgPSBtaW47XG4gIGxldCBwcmV2O1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcmFuZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IG1heCA9IHJhbmdlc1tpXTtcbiAgICBsZXQgb2JqID0gcmFuZ2VUb1BhdHRlcm4oU3RyaW5nKHN0YXJ0KSwgU3RyaW5nKG1heCksIG9wdGlvbnMpO1xuICAgIGxldCB6ZXJvcyA9ICcnO1xuXG4gICAgaWYgKCF0b2suaXNQYWRkZWQgJiYgcHJldiAmJiBwcmV2LnBhdHRlcm4gPT09IG9iai5wYXR0ZXJuKSB7XG4gICAgICBpZiAocHJldi5jb3VudC5sZW5ndGggPiAxKSB7XG4gICAgICAgIHByZXYuY291bnQucG9wKCk7XG4gICAgICB9XG5cbiAgICAgIHByZXYuY291bnQucHVzaChvYmouY291bnRbMF0pO1xuICAgICAgcHJldi5zdHJpbmcgPSBwcmV2LnBhdHRlcm4gKyB0b1F1YW50aWZpZXIocHJldi5jb3VudCk7XG4gICAgICBzdGFydCA9IG1heCArIDE7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAodG9rLmlzUGFkZGVkKSB7XG4gICAgICB6ZXJvcyA9IHBhZFplcm9zKG1heCwgdG9rLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBvYmouc3RyaW5nID0gemVyb3MgKyBvYmoucGF0dGVybiArIHRvUXVhbnRpZmllcihvYmouY291bnQpO1xuICAgIHRva2Vucy5wdXNoKG9iaik7XG4gICAgc3RhcnQgPSBtYXggKyAxO1xuICAgIHByZXYgPSBvYmo7XG4gIH1cblxuICByZXR1cm4gdG9rZW5zO1xufVxuXG5mdW5jdGlvbiBmaWx0ZXJQYXR0ZXJucyhhcnIsIGNvbXBhcmlzb24sIHByZWZpeCwgaW50ZXJzZWN0aW9uLCBvcHRpb25zKSB7XG4gIGxldCByZXN1bHQgPSBbXTtcblxuICBmb3IgKGxldCBlbGUgb2YgYXJyKSB7XG4gICAgbGV0IHsgc3RyaW5nIH0gPSBlbGU7XG5cbiAgICAvLyBvbmx5IHB1c2ggaWYgX2JvdGhfIGFyZSBuZWdhdGl2ZS4uLlxuICAgIGlmICghaW50ZXJzZWN0aW9uICYmICFjb250YWlucyhjb21wYXJpc29uLCAnc3RyaW5nJywgc3RyaW5nKSkge1xuICAgICAgcmVzdWx0LnB1c2gocHJlZml4ICsgc3RyaW5nKTtcbiAgICB9XG5cbiAgICAvLyBvciBfYm90aF8gYXJlIHBvc2l0aXZlXG4gICAgaWYgKGludGVyc2VjdGlvbiAmJiBjb250YWlucyhjb21wYXJpc29uLCAnc3RyaW5nJywgc3RyaW5nKSkge1xuICAgICAgcmVzdWx0LnB1c2gocHJlZml4ICsgc3RyaW5nKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBaaXAgc3RyaW5nc1xuICovXG5cbmZ1bmN0aW9uIHppcChhLCBiKSB7XG4gIGxldCBhcnIgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSBhcnIucHVzaChbYVtpXSwgYltpXV0pO1xuICByZXR1cm4gYXJyO1xufVxuXG5mdW5jdGlvbiBjb21wYXJlKGEsIGIpIHtcbiAgcmV0dXJuIGEgPiBiID8gMSA6IGIgPiBhID8gLTEgOiAwO1xufVxuXG5mdW5jdGlvbiBjb250YWlucyhhcnIsIGtleSwgdmFsKSB7XG4gIHJldHVybiBhcnIuc29tZShlbGUgPT4gZWxlW2tleV0gPT09IHZhbCk7XG59XG5cbmZ1bmN0aW9uIGNvdW50TmluZXMobWluLCBsZW4pIHtcbiAgcmV0dXJuIE51bWJlcihTdHJpbmcobWluKS5zbGljZSgwLCAtbGVuKSArICc5Jy5yZXBlYXQobGVuKSk7XG59XG5cbmZ1bmN0aW9uIGNvdW50WmVyb3MoaW50ZWdlciwgemVyb3MpIHtcbiAgcmV0dXJuIGludGVnZXIgLSAoaW50ZWdlciAlIE1hdGgucG93KDEwLCB6ZXJvcykpO1xufVxuXG5mdW5jdGlvbiB0b1F1YW50aWZpZXIoZGlnaXRzKSB7XG4gIGxldCBbc3RhcnQgPSAwLCBzdG9wID0gJyddID0gZGlnaXRzO1xuICBpZiAoc3RvcCB8fCBzdGFydCA+IDEpIHtcbiAgICByZXR1cm4gYHske3N0YXJ0ICsgKHN0b3AgPyAnLCcgKyBzdG9wIDogJycpfX1gO1xuICB9XG4gIHJldHVybiAnJztcbn1cblxuZnVuY3Rpb24gdG9DaGFyYWN0ZXJDbGFzcyhhLCBiLCBvcHRpb25zKSB7XG4gIHJldHVybiBgWyR7YX0keyhiIC0gYSA9PT0gMSkgPyAnJyA6ICctJ30ke2J9XWA7XG59XG5cbmZ1bmN0aW9uIGhhc1BhZGRpbmcoc3RyKSB7XG4gIHJldHVybiAvXi0/KDArKVxcZC8udGVzdChzdHIpO1xufVxuXG5mdW5jdGlvbiBwYWRaZXJvcyh2YWx1ZSwgdG9rLCBvcHRpb25zKSB7XG4gIGlmICghdG9rLmlzUGFkZGVkKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgbGV0IGRpZmYgPSBNYXRoLmFicyh0b2subWF4TGVuIC0gU3RyaW5nKHZhbHVlKS5sZW5ndGgpO1xuICBsZXQgcmVsYXggPSBvcHRpb25zLnJlbGF4WmVyb3MgIT09IGZhbHNlO1xuXG4gIHN3aXRjaCAoZGlmZikge1xuICAgIGNhc2UgMDpcbiAgICAgIHJldHVybiAnJztcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gcmVsYXggPyAnMD8nIDogJzAnO1xuICAgIGNhc2UgMjpcbiAgICAgIHJldHVybiByZWxheCA/ICcwezAsMn0nIDogJzAwJztcbiAgICBkZWZhdWx0OiB7XG4gICAgICByZXR1cm4gcmVsYXggPyBgMHswLCR7ZGlmZn19YCA6IGAweyR7ZGlmZn19YDtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBDYWNoZVxuICovXG5cbnRvUmVnZXhSYW5nZS5jYWNoZSA9IHt9O1xudG9SZWdleFJhbmdlLmNsZWFyQ2FjaGUgPSAoKSA9PiAodG9SZWdleFJhbmdlLmNhY2hlID0ge30pO1xuXG4vKipcbiAqIEV4cG9zZSBgdG9SZWdleFJhbmdlYFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gdG9SZWdleFJhbmdlO1xuIiwgIi8qIVxuICogZmlsbC1yYW5nZSA8aHR0cHM6Ly9naXRodWIuY29tL2pvbnNjaGxpbmtlcnQvZmlsbC1yYW5nZT5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgSm9uIFNjaGxpbmtlcnQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuY29uc3QgdG9SZWdleFJhbmdlID0gcmVxdWlyZSgndG8tcmVnZXgtcmFuZ2UnKTtcblxuY29uc3QgaXNPYmplY3QgPSB2YWwgPT4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KHZhbCk7XG5cbmNvbnN0IHRyYW5zZm9ybSA9IHRvTnVtYmVyID0+IHtcbiAgcmV0dXJuIHZhbHVlID0+IHRvTnVtYmVyID09PSB0cnVlID8gTnVtYmVyKHZhbHVlKSA6IFN0cmluZyh2YWx1ZSk7XG59O1xuXG5jb25zdCBpc1ZhbGlkVmFsdWUgPSB2YWx1ZSA9PiB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInIHx8ICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlICE9PSAnJyk7XG59O1xuXG5jb25zdCBpc051bWJlciA9IG51bSA9PiBOdW1iZXIuaXNJbnRlZ2VyKCtudW0pO1xuXG5jb25zdCB6ZXJvcyA9IGlucHV0ID0+IHtcbiAgbGV0IHZhbHVlID0gYCR7aW5wdXR9YDtcbiAgbGV0IGluZGV4ID0gLTE7XG4gIGlmICh2YWx1ZVswXSA9PT0gJy0nKSB2YWx1ZSA9IHZhbHVlLnNsaWNlKDEpO1xuICBpZiAodmFsdWUgPT09ICcwJykgcmV0dXJuIGZhbHNlO1xuICB3aGlsZSAodmFsdWVbKytpbmRleF0gPT09ICcwJyk7XG4gIHJldHVybiBpbmRleCA+IDA7XG59O1xuXG5jb25zdCBzdHJpbmdpZnkgPSAoc3RhcnQsIGVuZCwgb3B0aW9ucykgPT4ge1xuICBpZiAodHlwZW9mIHN0YXJ0ID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgZW5kID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBvcHRpb25zLnN0cmluZ2lmeSA9PT0gdHJ1ZTtcbn07XG5cbmNvbnN0IHBhZCA9IChpbnB1dCwgbWF4TGVuZ3RoLCB0b051bWJlcikgPT4ge1xuICBpZiAobWF4TGVuZ3RoID4gMCkge1xuICAgIGxldCBkYXNoID0gaW5wdXRbMF0gPT09ICctJyA/ICctJyA6ICcnO1xuICAgIGlmIChkYXNoKSBpbnB1dCA9IGlucHV0LnNsaWNlKDEpO1xuICAgIGlucHV0ID0gKGRhc2ggKyBpbnB1dC5wYWRTdGFydChkYXNoID8gbWF4TGVuZ3RoIC0gMSA6IG1heExlbmd0aCwgJzAnKSk7XG4gIH1cbiAgaWYgKHRvTnVtYmVyID09PSBmYWxzZSkge1xuICAgIHJldHVybiBTdHJpbmcoaW5wdXQpO1xuICB9XG4gIHJldHVybiBpbnB1dDtcbn07XG5cbmNvbnN0IHRvTWF4TGVuID0gKGlucHV0LCBtYXhMZW5ndGgpID0+IHtcbiAgbGV0IG5lZ2F0aXZlID0gaW5wdXRbMF0gPT09ICctJyA/ICctJyA6ICcnO1xuICBpZiAobmVnYXRpdmUpIHtcbiAgICBpbnB1dCA9IGlucHV0LnNsaWNlKDEpO1xuICAgIG1heExlbmd0aC0tO1xuICB9XG4gIHdoaWxlIChpbnB1dC5sZW5ndGggPCBtYXhMZW5ndGgpIGlucHV0ID0gJzAnICsgaW5wdXQ7XG4gIHJldHVybiBuZWdhdGl2ZSA/ICgnLScgKyBpbnB1dCkgOiBpbnB1dDtcbn07XG5cbmNvbnN0IHRvU2VxdWVuY2UgPSAocGFydHMsIG9wdGlvbnMsIG1heExlbikgPT4ge1xuICBwYXJ0cy5uZWdhdGl2ZXMuc29ydCgoYSwgYikgPT4gYSA8IGIgPyAtMSA6IGEgPiBiID8gMSA6IDApO1xuICBwYXJ0cy5wb3NpdGl2ZXMuc29ydCgoYSwgYikgPT4gYSA8IGIgPyAtMSA6IGEgPiBiID8gMSA6IDApO1xuXG4gIGxldCBwcmVmaXggPSBvcHRpb25zLmNhcHR1cmUgPyAnJyA6ICc/Oic7XG4gIGxldCBwb3NpdGl2ZXMgPSAnJztcbiAgbGV0IG5lZ2F0aXZlcyA9ICcnO1xuICBsZXQgcmVzdWx0O1xuXG4gIGlmIChwYXJ0cy5wb3NpdGl2ZXMubGVuZ3RoKSB7XG4gICAgcG9zaXRpdmVzID0gcGFydHMucG9zaXRpdmVzLm1hcCh2ID0+IHRvTWF4TGVuKFN0cmluZyh2KSwgbWF4TGVuKSkuam9pbignfCcpO1xuICB9XG5cbiAgaWYgKHBhcnRzLm5lZ2F0aXZlcy5sZW5ndGgpIHtcbiAgICBuZWdhdGl2ZXMgPSBgLSgke3ByZWZpeH0ke3BhcnRzLm5lZ2F0aXZlcy5tYXAodiA9PiB0b01heExlbihTdHJpbmcodiksIG1heExlbikpLmpvaW4oJ3wnKX0pYDtcbiAgfVxuXG4gIGlmIChwb3NpdGl2ZXMgJiYgbmVnYXRpdmVzKSB7XG4gICAgcmVzdWx0ID0gYCR7cG9zaXRpdmVzfXwke25lZ2F0aXZlc31gO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9IHBvc2l0aXZlcyB8fCBuZWdhdGl2ZXM7XG4gIH1cblxuICBpZiAob3B0aW9ucy53cmFwKSB7XG4gICAgcmV0dXJuIGAoJHtwcmVmaXh9JHtyZXN1bHR9KWA7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuY29uc3QgdG9SYW5nZSA9IChhLCBiLCBpc051bWJlcnMsIG9wdGlvbnMpID0+IHtcbiAgaWYgKGlzTnVtYmVycykge1xuICAgIHJldHVybiB0b1JlZ2V4UmFuZ2UoYSwgYiwgeyB3cmFwOiBmYWxzZSwgLi4ub3B0aW9ucyB9KTtcbiAgfVxuXG4gIGxldCBzdGFydCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoYSk7XG4gIGlmIChhID09PSBiKSByZXR1cm4gc3RhcnQ7XG5cbiAgbGV0IHN0b3AgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGIpO1xuICByZXR1cm4gYFske3N0YXJ0fS0ke3N0b3B9XWA7XG59O1xuXG5jb25zdCB0b1JlZ2V4ID0gKHN0YXJ0LCBlbmQsIG9wdGlvbnMpID0+IHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoc3RhcnQpKSB7XG4gICAgbGV0IHdyYXAgPSBvcHRpb25zLndyYXAgPT09IHRydWU7XG4gICAgbGV0IHByZWZpeCA9IG9wdGlvbnMuY2FwdHVyZSA/ICcnIDogJz86JztcbiAgICByZXR1cm4gd3JhcCA/IGAoJHtwcmVmaXh9JHtzdGFydC5qb2luKCd8Jyl9KWAgOiBzdGFydC5qb2luKCd8Jyk7XG4gIH1cbiAgcmV0dXJuIHRvUmVnZXhSYW5nZShzdGFydCwgZW5kLCBvcHRpb25zKTtcbn07XG5cbmNvbnN0IHJhbmdlRXJyb3IgPSAoLi4uYXJncykgPT4ge1xuICByZXR1cm4gbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgcmFuZ2UgYXJndW1lbnRzOiAnICsgdXRpbC5pbnNwZWN0KC4uLmFyZ3MpKTtcbn07XG5cbmNvbnN0IGludmFsaWRSYW5nZSA9IChzdGFydCwgZW5kLCBvcHRpb25zKSA9PiB7XG4gIGlmIChvcHRpb25zLnN0cmljdFJhbmdlcyA9PT0gdHJ1ZSkgdGhyb3cgcmFuZ2VFcnJvcihbc3RhcnQsIGVuZF0pO1xuICByZXR1cm4gW107XG59O1xuXG5jb25zdCBpbnZhbGlkU3RlcCA9IChzdGVwLCBvcHRpb25zKSA9PiB7XG4gIGlmIChvcHRpb25zLnN0cmljdFJhbmdlcyA9PT0gdHJ1ZSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEV4cGVjdGVkIHN0ZXAgXCIke3N0ZXB9XCIgdG8gYmUgYSBudW1iZXJgKTtcbiAgfVxuICByZXR1cm4gW107XG59O1xuXG5jb25zdCBmaWxsTnVtYmVycyA9IChzdGFydCwgZW5kLCBzdGVwID0gMSwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGxldCBhID0gTnVtYmVyKHN0YXJ0KTtcbiAgbGV0IGIgPSBOdW1iZXIoZW5kKTtcblxuICBpZiAoIU51bWJlci5pc0ludGVnZXIoYSkgfHwgIU51bWJlci5pc0ludGVnZXIoYikpIHtcbiAgICBpZiAob3B0aW9ucy5zdHJpY3RSYW5nZXMgPT09IHRydWUpIHRocm93IHJhbmdlRXJyb3IoW3N0YXJ0LCBlbmRdKTtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICAvLyBmaXggbmVnYXRpdmUgemVyb1xuICBpZiAoYSA9PT0gMCkgYSA9IDA7XG4gIGlmIChiID09PSAwKSBiID0gMDtcblxuICBsZXQgZGVzY2VuZGluZyA9IGEgPiBiO1xuICBsZXQgc3RhcnRTdHJpbmcgPSBTdHJpbmcoc3RhcnQpO1xuICBsZXQgZW5kU3RyaW5nID0gU3RyaW5nKGVuZCk7XG4gIGxldCBzdGVwU3RyaW5nID0gU3RyaW5nKHN0ZXApO1xuICBzdGVwID0gTWF0aC5tYXgoTWF0aC5hYnMoc3RlcCksIDEpO1xuXG4gIGxldCBwYWRkZWQgPSB6ZXJvcyhzdGFydFN0cmluZykgfHwgemVyb3MoZW5kU3RyaW5nKSB8fCB6ZXJvcyhzdGVwU3RyaW5nKTtcbiAgbGV0IG1heExlbiA9IHBhZGRlZCA/IE1hdGgubWF4KHN0YXJ0U3RyaW5nLmxlbmd0aCwgZW5kU3RyaW5nLmxlbmd0aCwgc3RlcFN0cmluZy5sZW5ndGgpIDogMDtcbiAgbGV0IHRvTnVtYmVyID0gcGFkZGVkID09PSBmYWxzZSAmJiBzdHJpbmdpZnkoc3RhcnQsIGVuZCwgb3B0aW9ucykgPT09IGZhbHNlO1xuICBsZXQgZm9ybWF0ID0gb3B0aW9ucy50cmFuc2Zvcm0gfHwgdHJhbnNmb3JtKHRvTnVtYmVyKTtcblxuICBpZiAob3B0aW9ucy50b1JlZ2V4ICYmIHN0ZXAgPT09IDEpIHtcbiAgICByZXR1cm4gdG9SYW5nZSh0b01heExlbihzdGFydCwgbWF4TGVuKSwgdG9NYXhMZW4oZW5kLCBtYXhMZW4pLCB0cnVlLCBvcHRpb25zKTtcbiAgfVxuXG4gIGxldCBwYXJ0cyA9IHsgbmVnYXRpdmVzOiBbXSwgcG9zaXRpdmVzOiBbXSB9O1xuICBsZXQgcHVzaCA9IG51bSA9PiBwYXJ0c1tudW0gPCAwID8gJ25lZ2F0aXZlcycgOiAncG9zaXRpdmVzJ10ucHVzaChNYXRoLmFicyhudW0pKTtcbiAgbGV0IHJhbmdlID0gW107XG4gIGxldCBpbmRleCA9IDA7XG5cbiAgd2hpbGUgKGRlc2NlbmRpbmcgPyBhID49IGIgOiBhIDw9IGIpIHtcbiAgICBpZiAob3B0aW9ucy50b1JlZ2V4ID09PSB0cnVlICYmIHN0ZXAgPiAxKSB7XG4gICAgICBwdXNoKGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICByYW5nZS5wdXNoKHBhZChmb3JtYXQoYSwgaW5kZXgpLCBtYXhMZW4sIHRvTnVtYmVyKSk7XG4gICAgfVxuICAgIGEgPSBkZXNjZW5kaW5nID8gYSAtIHN0ZXAgOiBhICsgc3RlcDtcbiAgICBpbmRleCsrO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMudG9SZWdleCA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiBzdGVwID4gMVxuICAgICAgPyB0b1NlcXVlbmNlKHBhcnRzLCBvcHRpb25zLCBtYXhMZW4pXG4gICAgICA6IHRvUmVnZXgocmFuZ2UsIG51bGwsIHsgd3JhcDogZmFsc2UsIC4uLm9wdGlvbnMgfSk7XG4gIH1cblxuICByZXR1cm4gcmFuZ2U7XG59O1xuXG5jb25zdCBmaWxsTGV0dGVycyA9IChzdGFydCwgZW5kLCBzdGVwID0gMSwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGlmICgoIWlzTnVtYmVyKHN0YXJ0KSAmJiBzdGFydC5sZW5ndGggPiAxKSB8fCAoIWlzTnVtYmVyKGVuZCkgJiYgZW5kLmxlbmd0aCA+IDEpKSB7XG4gICAgcmV0dXJuIGludmFsaWRSYW5nZShzdGFydCwgZW5kLCBvcHRpb25zKTtcbiAgfVxuXG4gIGxldCBmb3JtYXQgPSBvcHRpb25zLnRyYW5zZm9ybSB8fCAodmFsID0+IFN0cmluZy5mcm9tQ2hhckNvZGUodmFsKSk7XG4gIGxldCBhID0gYCR7c3RhcnR9YC5jaGFyQ29kZUF0KDApO1xuICBsZXQgYiA9IGAke2VuZH1gLmNoYXJDb2RlQXQoMCk7XG5cbiAgbGV0IGRlc2NlbmRpbmcgPSBhID4gYjtcbiAgbGV0IG1pbiA9IE1hdGgubWluKGEsIGIpO1xuICBsZXQgbWF4ID0gTWF0aC5tYXgoYSwgYik7XG5cbiAgaWYgKG9wdGlvbnMudG9SZWdleCAmJiBzdGVwID09PSAxKSB7XG4gICAgcmV0dXJuIHRvUmFuZ2UobWluLCBtYXgsIGZhbHNlLCBvcHRpb25zKTtcbiAgfVxuXG4gIGxldCByYW5nZSA9IFtdO1xuICBsZXQgaW5kZXggPSAwO1xuXG4gIHdoaWxlIChkZXNjZW5kaW5nID8gYSA+PSBiIDogYSA8PSBiKSB7XG4gICAgcmFuZ2UucHVzaChmb3JtYXQoYSwgaW5kZXgpKTtcbiAgICBhID0gZGVzY2VuZGluZyA/IGEgLSBzdGVwIDogYSArIHN0ZXA7XG4gICAgaW5kZXgrKztcbiAgfVxuXG4gIGlmIChvcHRpb25zLnRvUmVnZXggPT09IHRydWUpIHtcbiAgICByZXR1cm4gdG9SZWdleChyYW5nZSwgbnVsbCwgeyB3cmFwOiBmYWxzZSwgb3B0aW9ucyB9KTtcbiAgfVxuXG4gIHJldHVybiByYW5nZTtcbn07XG5cbmNvbnN0IGZpbGwgPSAoc3RhcnQsIGVuZCwgc3RlcCwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGlmIChlbmQgPT0gbnVsbCAmJiBpc1ZhbGlkVmFsdWUoc3RhcnQpKSB7XG4gICAgcmV0dXJuIFtzdGFydF07XG4gIH1cblxuICBpZiAoIWlzVmFsaWRWYWx1ZShzdGFydCkgfHwgIWlzVmFsaWRWYWx1ZShlbmQpKSB7XG4gICAgcmV0dXJuIGludmFsaWRSYW5nZShzdGFydCwgZW5kLCBvcHRpb25zKTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygc3RlcCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBmaWxsKHN0YXJ0LCBlbmQsIDEsIHsgdHJhbnNmb3JtOiBzdGVwIH0pO1xuICB9XG5cbiAgaWYgKGlzT2JqZWN0KHN0ZXApKSB7XG4gICAgcmV0dXJuIGZpbGwoc3RhcnQsIGVuZCwgMCwgc3RlcCk7XG4gIH1cblxuICBsZXQgb3B0cyA9IHsgLi4ub3B0aW9ucyB9O1xuICBpZiAob3B0cy5jYXB0dXJlID09PSB0cnVlKSBvcHRzLndyYXAgPSB0cnVlO1xuICBzdGVwID0gc3RlcCB8fCBvcHRzLnN0ZXAgfHwgMTtcblxuICBpZiAoIWlzTnVtYmVyKHN0ZXApKSB7XG4gICAgaWYgKHN0ZXAgIT0gbnVsbCAmJiAhaXNPYmplY3Qoc3RlcCkpIHJldHVybiBpbnZhbGlkU3RlcChzdGVwLCBvcHRzKTtcbiAgICByZXR1cm4gZmlsbChzdGFydCwgZW5kLCAxLCBzdGVwKTtcbiAgfVxuXG4gIGlmIChpc051bWJlcihzdGFydCkgJiYgaXNOdW1iZXIoZW5kKSkge1xuICAgIHJldHVybiBmaWxsTnVtYmVycyhzdGFydCwgZW5kLCBzdGVwLCBvcHRzKTtcbiAgfVxuXG4gIHJldHVybiBmaWxsTGV0dGVycyhzdGFydCwgZW5kLCBNYXRoLm1heChNYXRoLmFicyhzdGVwKSwgMSksIG9wdHMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmaWxsO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZmlsbCA9IHJlcXVpcmUoJ2ZpbGwtcmFuZ2UnKTtcbmNvbnN0IHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG5jb25zdCBjb21waWxlID0gKGFzdCwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGNvbnN0IHdhbGsgPSAobm9kZSwgcGFyZW50ID0ge30pID0+IHtcbiAgICBjb25zdCBpbnZhbGlkQmxvY2sgPSB1dGlscy5pc0ludmFsaWRCcmFjZShwYXJlbnQpO1xuICAgIGNvbnN0IGludmFsaWROb2RlID0gbm9kZS5pbnZhbGlkID09PSB0cnVlICYmIG9wdGlvbnMuZXNjYXBlSW52YWxpZCA9PT0gdHJ1ZTtcbiAgICBjb25zdCBpbnZhbGlkID0gaW52YWxpZEJsb2NrID09PSB0cnVlIHx8IGludmFsaWROb2RlID09PSB0cnVlO1xuICAgIGNvbnN0IHByZWZpeCA9IG9wdGlvbnMuZXNjYXBlSW52YWxpZCA9PT0gdHJ1ZSA/ICdcXFxcJyA6ICcnO1xuICAgIGxldCBvdXRwdXQgPSAnJztcblxuICAgIGlmIChub2RlLmlzT3BlbiA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIHByZWZpeCArIG5vZGUudmFsdWU7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUuaXNDbG9zZSA9PT0gdHJ1ZSkge1xuICAgICAgY29uc29sZS5sb2coJ25vZGUuaXNDbG9zZScsIHByZWZpeCwgbm9kZS52YWx1ZSk7XG4gICAgICByZXR1cm4gcHJlZml4ICsgbm9kZS52YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAobm9kZS50eXBlID09PSAnb3BlbicpIHtcbiAgICAgIHJldHVybiBpbnZhbGlkID8gcHJlZml4ICsgbm9kZS52YWx1ZSA6ICcoJztcbiAgICB9XG5cbiAgICBpZiAobm9kZS50eXBlID09PSAnY2xvc2UnKSB7XG4gICAgICByZXR1cm4gaW52YWxpZCA/IHByZWZpeCArIG5vZGUudmFsdWUgOiAnKSc7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUudHlwZSA9PT0gJ2NvbW1hJykge1xuICAgICAgcmV0dXJuIG5vZGUucHJldi50eXBlID09PSAnY29tbWEnID8gJycgOiBpbnZhbGlkID8gbm9kZS52YWx1ZSA6ICd8JztcbiAgICB9XG5cbiAgICBpZiAobm9kZS52YWx1ZSkge1xuICAgICAgcmV0dXJuIG5vZGUudmFsdWU7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUubm9kZXMgJiYgbm9kZS5yYW5nZXMgPiAwKSB7XG4gICAgICBjb25zdCBhcmdzID0gdXRpbHMucmVkdWNlKG5vZGUubm9kZXMpO1xuICAgICAgY29uc3QgcmFuZ2UgPSBmaWxsKC4uLmFyZ3MsIHsgLi4ub3B0aW9ucywgd3JhcDogZmFsc2UsIHRvUmVnZXg6IHRydWUsIHN0cmljdFplcm9zOiB0cnVlIH0pO1xuXG4gICAgICBpZiAocmFuZ2UubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIHJldHVybiBhcmdzLmxlbmd0aCA+IDEgJiYgcmFuZ2UubGVuZ3RoID4gMSA/IGAoJHtyYW5nZX0pYCA6IHJhbmdlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChub2RlLm5vZGVzKSB7XG4gICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIG5vZGUubm9kZXMpIHtcbiAgICAgICAgb3V0cHV0ICs9IHdhbGsoY2hpbGQsIG5vZGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH07XG5cbiAgcmV0dXJuIHdhbGsoYXN0KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY29tcGlsZTtcbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGZpbGwgPSByZXF1aXJlKCdmaWxsLXJhbmdlJyk7XG5jb25zdCBzdHJpbmdpZnkgPSByZXF1aXJlKCcuL3N0cmluZ2lmeScpO1xuY29uc3QgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbmNvbnN0IGFwcGVuZCA9IChxdWV1ZSA9ICcnLCBzdGFzaCA9ICcnLCBlbmNsb3NlID0gZmFsc2UpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gW107XG5cbiAgcXVldWUgPSBbXS5jb25jYXQocXVldWUpO1xuICBzdGFzaCA9IFtdLmNvbmNhdChzdGFzaCk7XG5cbiAgaWYgKCFzdGFzaC5sZW5ndGgpIHJldHVybiBxdWV1ZTtcbiAgaWYgKCFxdWV1ZS5sZW5ndGgpIHtcbiAgICByZXR1cm4gZW5jbG9zZSA/IHV0aWxzLmZsYXR0ZW4oc3Rhc2gpLm1hcChlbGUgPT4gYHske2VsZX19YCkgOiBzdGFzaDtcbiAgfVxuXG4gIGZvciAoY29uc3QgaXRlbSBvZiBxdWV1ZSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG4gICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIGl0ZW0pIHtcbiAgICAgICAgcmVzdWx0LnB1c2goYXBwZW5kKHZhbHVlLCBzdGFzaCwgZW5jbG9zZSkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBlbGUgb2Ygc3Rhc2gpIHtcbiAgICAgICAgaWYgKGVuY2xvc2UgPT09IHRydWUgJiYgdHlwZW9mIGVsZSA9PT0gJ3N0cmluZycpIGVsZSA9IGB7JHtlbGV9fWA7XG4gICAgICAgIHJlc3VsdC5wdXNoKEFycmF5LmlzQXJyYXkoZWxlKSA/IGFwcGVuZChpdGVtLCBlbGUsIGVuY2xvc2UpIDogaXRlbSArIGVsZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB1dGlscy5mbGF0dGVuKHJlc3VsdCk7XG59O1xuXG5jb25zdCBleHBhbmQgPSAoYXN0LCBvcHRpb25zID0ge30pID0+IHtcbiAgY29uc3QgcmFuZ2VMaW1pdCA9IG9wdGlvbnMucmFuZ2VMaW1pdCA9PT0gdW5kZWZpbmVkID8gMTAwMCA6IG9wdGlvbnMucmFuZ2VMaW1pdDtcblxuICBjb25zdCB3YWxrID0gKG5vZGUsIHBhcmVudCA9IHt9KSA9PiB7XG4gICAgbm9kZS5xdWV1ZSA9IFtdO1xuXG4gICAgbGV0IHAgPSBwYXJlbnQ7XG4gICAgbGV0IHEgPSBwYXJlbnQucXVldWU7XG5cbiAgICB3aGlsZSAocC50eXBlICE9PSAnYnJhY2UnICYmIHAudHlwZSAhPT0gJ3Jvb3QnICYmIHAucGFyZW50KSB7XG4gICAgICBwID0gcC5wYXJlbnQ7XG4gICAgICBxID0gcC5xdWV1ZTtcbiAgICB9XG5cbiAgICBpZiAobm9kZS5pbnZhbGlkIHx8IG5vZGUuZG9sbGFyKSB7XG4gICAgICBxLnB1c2goYXBwZW5kKHEucG9wKCksIHN0cmluZ2lmeShub2RlLCBvcHRpb25zKSkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChub2RlLnR5cGUgPT09ICdicmFjZScgJiYgbm9kZS5pbnZhbGlkICE9PSB0cnVlICYmIG5vZGUubm9kZXMubGVuZ3RoID09PSAyKSB7XG4gICAgICBxLnB1c2goYXBwZW5kKHEucG9wKCksIFsne30nXSkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChub2RlLm5vZGVzICYmIG5vZGUucmFuZ2VzID4gMCkge1xuICAgICAgY29uc3QgYXJncyA9IHV0aWxzLnJlZHVjZShub2RlLm5vZGVzKTtcblxuICAgICAgaWYgKHV0aWxzLmV4Y2VlZHNMaW1pdCguLi5hcmdzLCBvcHRpb25zLnN0ZXAsIHJhbmdlTGltaXQpKSB7XG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdleHBhbmRlZCBhcnJheSBsZW5ndGggZXhjZWVkcyByYW5nZSBsaW1pdC4gVXNlIG9wdGlvbnMucmFuZ2VMaW1pdCB0byBpbmNyZWFzZSBvciBkaXNhYmxlIHRoZSBsaW1pdC4nKTtcbiAgICAgIH1cblxuICAgICAgbGV0IHJhbmdlID0gZmlsbCguLi5hcmdzLCBvcHRpb25zKTtcbiAgICAgIGlmIChyYW5nZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmFuZ2UgPSBzdHJpbmdpZnkobm9kZSwgb3B0aW9ucyk7XG4gICAgICB9XG5cbiAgICAgIHEucHVzaChhcHBlbmQocS5wb3AoKSwgcmFuZ2UpKTtcbiAgICAgIG5vZGUubm9kZXMgPSBbXTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBlbmNsb3NlID0gdXRpbHMuZW5jbG9zZUJyYWNlKG5vZGUpO1xuICAgIGxldCBxdWV1ZSA9IG5vZGUucXVldWU7XG4gICAgbGV0IGJsb2NrID0gbm9kZTtcblxuICAgIHdoaWxlIChibG9jay50eXBlICE9PSAnYnJhY2UnICYmIGJsb2NrLnR5cGUgIT09ICdyb290JyAmJiBibG9jay5wYXJlbnQpIHtcbiAgICAgIGJsb2NrID0gYmxvY2sucGFyZW50O1xuICAgICAgcXVldWUgPSBibG9jay5xdWV1ZTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGUubm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGNoaWxkID0gbm9kZS5ub2Rlc1tpXTtcblxuICAgICAgaWYgKGNoaWxkLnR5cGUgPT09ICdjb21tYScgJiYgbm9kZS50eXBlID09PSAnYnJhY2UnKSB7XG4gICAgICAgIGlmIChpID09PSAxKSBxdWV1ZS5wdXNoKCcnKTtcbiAgICAgICAgcXVldWUucHVzaCgnJyk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2hpbGQudHlwZSA9PT0gJ2Nsb3NlJykge1xuICAgICAgICBxLnB1c2goYXBwZW5kKHEucG9wKCksIHF1ZXVlLCBlbmNsb3NlKSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2hpbGQudmFsdWUgJiYgY2hpbGQudHlwZSAhPT0gJ29wZW4nKSB7XG4gICAgICAgIHF1ZXVlLnB1c2goYXBwZW5kKHF1ZXVlLnBvcCgpLCBjaGlsZC52YWx1ZSkpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNoaWxkLm5vZGVzKSB7XG4gICAgICAgIHdhbGsoY2hpbGQsIG5vZGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBxdWV1ZTtcbiAgfTtcblxuICByZXR1cm4gdXRpbHMuZmxhdHRlbih3YWxrKGFzdCkpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBhbmQ7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgTUFYX0xFTkdUSDogMTAwMDAsXG5cbiAgLy8gRGlnaXRzXG4gIENIQVJfMDogJzAnLCAvKiAwICovXG4gIENIQVJfOTogJzknLCAvKiA5ICovXG5cbiAgLy8gQWxwaGFiZXQgY2hhcnMuXG4gIENIQVJfVVBQRVJDQVNFX0E6ICdBJywgLyogQSAqL1xuICBDSEFSX0xPV0VSQ0FTRV9BOiAnYScsIC8qIGEgKi9cbiAgQ0hBUl9VUFBFUkNBU0VfWjogJ1onLCAvKiBaICovXG4gIENIQVJfTE9XRVJDQVNFX1o6ICd6JywgLyogeiAqL1xuXG4gIENIQVJfTEVGVF9QQVJFTlRIRVNFUzogJygnLCAvKiAoICovXG4gIENIQVJfUklHSFRfUEFSRU5USEVTRVM6ICcpJywgLyogKSAqL1xuXG4gIENIQVJfQVNURVJJU0s6ICcqJywgLyogKiAqL1xuXG4gIC8vIE5vbi1hbHBoYWJldGljIGNoYXJzLlxuICBDSEFSX0FNUEVSU0FORDogJyYnLCAvKiAmICovXG4gIENIQVJfQVQ6ICdAJywgLyogQCAqL1xuICBDSEFSX0JBQ0tTTEFTSDogJ1xcXFwnLCAvKiBcXCAqL1xuICBDSEFSX0JBQ0tUSUNLOiAnYCcsIC8qIGAgKi9cbiAgQ0hBUl9DQVJSSUFHRV9SRVRVUk46ICdcXHInLCAvKiBcXHIgKi9cbiAgQ0hBUl9DSVJDVU1GTEVYX0FDQ0VOVDogJ14nLCAvKiBeICovXG4gIENIQVJfQ09MT046ICc6JywgLyogOiAqL1xuICBDSEFSX0NPTU1BOiAnLCcsIC8qICwgKi9cbiAgQ0hBUl9ET0xMQVI6ICckJywgLyogLiAqL1xuICBDSEFSX0RPVDogJy4nLCAvKiAuICovXG4gIENIQVJfRE9VQkxFX1FVT1RFOiAnXCInLCAvKiBcIiAqL1xuICBDSEFSX0VRVUFMOiAnPScsIC8qID0gKi9cbiAgQ0hBUl9FWENMQU1BVElPTl9NQVJLOiAnIScsIC8qICEgKi9cbiAgQ0hBUl9GT1JNX0ZFRUQ6ICdcXGYnLCAvKiBcXGYgKi9cbiAgQ0hBUl9GT1JXQVJEX1NMQVNIOiAnLycsIC8qIC8gKi9cbiAgQ0hBUl9IQVNIOiAnIycsIC8qICMgKi9cbiAgQ0hBUl9IWVBIRU5fTUlOVVM6ICctJywgLyogLSAqL1xuICBDSEFSX0xFRlRfQU5HTEVfQlJBQ0tFVDogJzwnLCAvKiA8ICovXG4gIENIQVJfTEVGVF9DVVJMWV9CUkFDRTogJ3snLCAvKiB7ICovXG4gIENIQVJfTEVGVF9TUVVBUkVfQlJBQ0tFVDogJ1snLCAvKiBbICovXG4gIENIQVJfTElORV9GRUVEOiAnXFxuJywgLyogXFxuICovXG4gIENIQVJfTk9fQlJFQUtfU1BBQ0U6ICdcXHUwMEEwJywgLyogXFx1MDBBMCAqL1xuICBDSEFSX1BFUkNFTlQ6ICclJywgLyogJSAqL1xuICBDSEFSX1BMVVM6ICcrJywgLyogKyAqL1xuICBDSEFSX1FVRVNUSU9OX01BUks6ICc/JywgLyogPyAqL1xuICBDSEFSX1JJR0hUX0FOR0xFX0JSQUNLRVQ6ICc+JywgLyogPiAqL1xuICBDSEFSX1JJR0hUX0NVUkxZX0JSQUNFOiAnfScsIC8qIH0gKi9cbiAgQ0hBUl9SSUdIVF9TUVVBUkVfQlJBQ0tFVDogJ10nLCAvKiBdICovXG4gIENIQVJfU0VNSUNPTE9OOiAnOycsIC8qIDsgKi9cbiAgQ0hBUl9TSU5HTEVfUVVPVEU6ICdcXCcnLCAvKiAnICovXG4gIENIQVJfU1BBQ0U6ICcgJywgLyogICAqL1xuICBDSEFSX1RBQjogJ1xcdCcsIC8qIFxcdCAqL1xuICBDSEFSX1VOREVSU0NPUkU6ICdfJywgLyogXyAqL1xuICBDSEFSX1ZFUlRJQ0FMX0xJTkU6ICd8JywgLyogfCAqL1xuICBDSEFSX1pFUk9fV0lEVEhfTk9CUkVBS19TUEFDRTogJ1xcdUZFRkYnIC8qIFxcdUZFRkYgKi9cbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBzdHJpbmdpZnkgPSByZXF1aXJlKCcuL3N0cmluZ2lmeScpO1xuXG4vKipcbiAqIENvbnN0YW50c1xuICovXG5cbmNvbnN0IHtcbiAgTUFYX0xFTkdUSCxcbiAgQ0hBUl9CQUNLU0xBU0gsIC8qIFxcICovXG4gIENIQVJfQkFDS1RJQ0ssIC8qIGAgKi9cbiAgQ0hBUl9DT01NQSwgLyogLCAqL1xuICBDSEFSX0RPVCwgLyogLiAqL1xuICBDSEFSX0xFRlRfUEFSRU5USEVTRVMsIC8qICggKi9cbiAgQ0hBUl9SSUdIVF9QQVJFTlRIRVNFUywgLyogKSAqL1xuICBDSEFSX0xFRlRfQ1VSTFlfQlJBQ0UsIC8qIHsgKi9cbiAgQ0hBUl9SSUdIVF9DVVJMWV9CUkFDRSwgLyogfSAqL1xuICBDSEFSX0xFRlRfU1FVQVJFX0JSQUNLRVQsIC8qIFsgKi9cbiAgQ0hBUl9SSUdIVF9TUVVBUkVfQlJBQ0tFVCwgLyogXSAqL1xuICBDSEFSX0RPVUJMRV9RVU9URSwgLyogXCIgKi9cbiAgQ0hBUl9TSU5HTEVfUVVPVEUsIC8qICcgKi9cbiAgQ0hBUl9OT19CUkVBS19TUEFDRSxcbiAgQ0hBUl9aRVJPX1dJRFRIX05PQlJFQUtfU1BBQ0Vcbn0gPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuXG4vKipcbiAqIHBhcnNlXG4gKi9cblxuY29uc3QgcGFyc2UgPSAoaW5wdXQsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICBpZiAodHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGEgc3RyaW5nJyk7XG4gIH1cblxuICBjb25zdCBvcHRzID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3QgbWF4ID0gdHlwZW9mIG9wdHMubWF4TGVuZ3RoID09PSAnbnVtYmVyJyA/IE1hdGgubWluKE1BWF9MRU5HVEgsIG9wdHMubWF4TGVuZ3RoKSA6IE1BWF9MRU5HVEg7XG4gIGlmIChpbnB1dC5sZW5ndGggPiBtYXgpIHtcbiAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYElucHV0IGxlbmd0aCAoJHtpbnB1dC5sZW5ndGh9KSwgZXhjZWVkcyBtYXggY2hhcmFjdGVycyAoJHttYXh9KWApO1xuICB9XG5cbiAgY29uc3QgYXN0ID0geyB0eXBlOiAncm9vdCcsIGlucHV0LCBub2RlczogW10gfTtcbiAgY29uc3Qgc3RhY2sgPSBbYXN0XTtcbiAgbGV0IGJsb2NrID0gYXN0O1xuICBsZXQgcHJldiA9IGFzdDtcbiAgbGV0IGJyYWNrZXRzID0gMDtcbiAgY29uc3QgbGVuZ3RoID0gaW5wdXQubGVuZ3RoO1xuICBsZXQgaW5kZXggPSAwO1xuICBsZXQgZGVwdGggPSAwO1xuICBsZXQgdmFsdWU7XG5cbiAgLyoqXG4gICAqIEhlbHBlcnNcbiAgICovXG5cbiAgY29uc3QgYWR2YW5jZSA9ICgpID0+IGlucHV0W2luZGV4KytdO1xuICBjb25zdCBwdXNoID0gbm9kZSA9PiB7XG4gICAgaWYgKG5vZGUudHlwZSA9PT0gJ3RleHQnICYmIHByZXYudHlwZSA9PT0gJ2RvdCcpIHtcbiAgICAgIHByZXYudHlwZSA9ICd0ZXh0JztcbiAgICB9XG5cbiAgICBpZiAocHJldiAmJiBwcmV2LnR5cGUgPT09ICd0ZXh0JyAmJiBub2RlLnR5cGUgPT09ICd0ZXh0Jykge1xuICAgICAgcHJldi52YWx1ZSArPSBub2RlLnZhbHVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGJsb2NrLm5vZGVzLnB1c2gobm9kZSk7XG4gICAgbm9kZS5wYXJlbnQgPSBibG9jaztcbiAgICBub2RlLnByZXYgPSBwcmV2O1xuICAgIHByZXYgPSBub2RlO1xuICAgIHJldHVybiBub2RlO1xuICB9O1xuXG4gIHB1c2goeyB0eXBlOiAnYm9zJyB9KTtcblxuICB3aGlsZSAoaW5kZXggPCBsZW5ndGgpIHtcbiAgICBibG9jayA9IHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdO1xuICAgIHZhbHVlID0gYWR2YW5jZSgpO1xuXG4gICAgLyoqXG4gICAgICogSW52YWxpZCBjaGFyc1xuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlID09PSBDSEFSX1pFUk9fV0lEVEhfTk9CUkVBS19TUEFDRSB8fCB2YWx1ZSA9PT0gQ0hBUl9OT19CUkVBS19TUEFDRSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXNjYXBlZCBjaGFyc1xuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlID09PSBDSEFSX0JBQ0tTTEFTSCkge1xuICAgICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWU6IChvcHRpb25zLmtlZXBFc2NhcGluZyA/IHZhbHVlIDogJycpICsgYWR2YW5jZSgpIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmlnaHQgc3F1YXJlIGJyYWNrZXQgKGxpdGVyYWwpOiAnXSdcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gQ0hBUl9SSUdIVF9TUVVBUkVfQlJBQ0tFVCkge1xuICAgICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWU6ICdcXFxcJyArIHZhbHVlIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTGVmdCBzcXVhcmUgYnJhY2tldDogJ1snXG4gICAgICovXG5cbiAgICBpZiAodmFsdWUgPT09IENIQVJfTEVGVF9TUVVBUkVfQlJBQ0tFVCkge1xuICAgICAgYnJhY2tldHMrKztcblxuICAgICAgbGV0IG5leHQ7XG5cbiAgICAgIHdoaWxlIChpbmRleCA8IGxlbmd0aCAmJiAobmV4dCA9IGFkdmFuY2UoKSkpIHtcbiAgICAgICAgdmFsdWUgKz0gbmV4dDtcblxuICAgICAgICBpZiAobmV4dCA9PT0gQ0hBUl9MRUZUX1NRVUFSRV9CUkFDS0VUKSB7XG4gICAgICAgICAgYnJhY2tldHMrKztcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXh0ID09PSBDSEFSX0JBQ0tTTEFTSCkge1xuICAgICAgICAgIHZhbHVlICs9IGFkdmFuY2UoKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXh0ID09PSBDSEFSX1JJR0hUX1NRVUFSRV9CUkFDS0VUKSB7XG4gICAgICAgICAgYnJhY2tldHMtLTtcblxuICAgICAgICAgIGlmIChicmFja2V0cyA9PT0gMCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHB1c2goeyB0eXBlOiAndGV4dCcsIHZhbHVlIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyZW50aGVzZXNcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gQ0hBUl9MRUZUX1BBUkVOVEhFU0VTKSB7XG4gICAgICBibG9jayA9IHB1c2goeyB0eXBlOiAncGFyZW4nLCBub2RlczogW10gfSk7XG4gICAgICBzdGFjay5wdXNoKGJsb2NrKTtcbiAgICAgIHB1c2goeyB0eXBlOiAndGV4dCcsIHZhbHVlIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlID09PSBDSEFSX1JJR0hUX1BBUkVOVEhFU0VTKSB7XG4gICAgICBpZiAoYmxvY2sudHlwZSAhPT0gJ3BhcmVuJykge1xuICAgICAgICBwdXNoKHsgdHlwZTogJ3RleHQnLCB2YWx1ZSB9KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBibG9jayA9IHN0YWNrLnBvcCgpO1xuICAgICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWUgfSk7XG4gICAgICBibG9jayA9IHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUXVvdGVzOiAnfFwifGBcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gQ0hBUl9ET1VCTEVfUVVPVEUgfHwgdmFsdWUgPT09IENIQVJfU0lOR0xFX1FVT1RFIHx8IHZhbHVlID09PSBDSEFSX0JBQ0tUSUNLKSB7XG4gICAgICBjb25zdCBvcGVuID0gdmFsdWU7XG4gICAgICBsZXQgbmV4dDtcblxuICAgICAgaWYgKG9wdGlvbnMua2VlcFF1b3RlcyAhPT0gdHJ1ZSkge1xuICAgICAgICB2YWx1ZSA9ICcnO1xuICAgICAgfVxuXG4gICAgICB3aGlsZSAoaW5kZXggPCBsZW5ndGggJiYgKG5leHQgPSBhZHZhbmNlKCkpKSB7XG4gICAgICAgIGlmIChuZXh0ID09PSBDSEFSX0JBQ0tTTEFTSCkge1xuICAgICAgICAgIHZhbHVlICs9IG5leHQgKyBhZHZhbmNlKCk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV4dCA9PT0gb3Blbikge1xuICAgICAgICAgIGlmIChvcHRpb25zLmtlZXBRdW90ZXMgPT09IHRydWUpIHZhbHVlICs9IG5leHQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB2YWx1ZSArPSBuZXh0O1xuICAgICAgfVxuXG4gICAgICBwdXNoKHsgdHlwZTogJ3RleHQnLCB2YWx1ZSB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExlZnQgY3VybHkgYnJhY2U6ICd7J1xuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlID09PSBDSEFSX0xFRlRfQ1VSTFlfQlJBQ0UpIHtcbiAgICAgIGRlcHRoKys7XG5cbiAgICAgIGNvbnN0IGRvbGxhciA9IHByZXYudmFsdWUgJiYgcHJldi52YWx1ZS5zbGljZSgtMSkgPT09ICckJyB8fCBibG9jay5kb2xsYXIgPT09IHRydWU7XG4gICAgICBjb25zdCBicmFjZSA9IHtcbiAgICAgICAgdHlwZTogJ2JyYWNlJyxcbiAgICAgICAgb3BlbjogdHJ1ZSxcbiAgICAgICAgY2xvc2U6IGZhbHNlLFxuICAgICAgICBkb2xsYXIsXG4gICAgICAgIGRlcHRoLFxuICAgICAgICBjb21tYXM6IDAsXG4gICAgICAgIHJhbmdlczogMCxcbiAgICAgICAgbm9kZXM6IFtdXG4gICAgICB9O1xuXG4gICAgICBibG9jayA9IHB1c2goYnJhY2UpO1xuICAgICAgc3RhY2sucHVzaChibG9jayk7XG4gICAgICBwdXNoKHsgdHlwZTogJ29wZW4nLCB2YWx1ZSB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJpZ2h0IGN1cmx5IGJyYWNlOiAnfSdcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gQ0hBUl9SSUdIVF9DVVJMWV9CUkFDRSkge1xuICAgICAgaWYgKGJsb2NrLnR5cGUgIT09ICdicmFjZScpIHtcbiAgICAgICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWUgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB0eXBlID0gJ2Nsb3NlJztcbiAgICAgIGJsb2NrID0gc3RhY2sucG9wKCk7XG4gICAgICBibG9jay5jbG9zZSA9IHRydWU7XG5cbiAgICAgIHB1c2goeyB0eXBlLCB2YWx1ZSB9KTtcbiAgICAgIGRlcHRoLS07XG5cbiAgICAgIGJsb2NrID0gc3RhY2tbc3RhY2subGVuZ3RoIC0gMV07XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb21tYTogJywnXG4gICAgICovXG5cbiAgICBpZiAodmFsdWUgPT09IENIQVJfQ09NTUEgJiYgZGVwdGggPiAwKSB7XG4gICAgICBpZiAoYmxvY2sucmFuZ2VzID4gMCkge1xuICAgICAgICBibG9jay5yYW5nZXMgPSAwO1xuICAgICAgICBjb25zdCBvcGVuID0gYmxvY2subm9kZXMuc2hpZnQoKTtcbiAgICAgICAgYmxvY2subm9kZXMgPSBbb3BlbiwgeyB0eXBlOiAndGV4dCcsIHZhbHVlOiBzdHJpbmdpZnkoYmxvY2spIH1dO1xuICAgICAgfVxuXG4gICAgICBwdXNoKHsgdHlwZTogJ2NvbW1hJywgdmFsdWUgfSk7XG4gICAgICBibG9jay5jb21tYXMrKztcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERvdDogJy4nXG4gICAgICovXG5cbiAgICBpZiAodmFsdWUgPT09IENIQVJfRE9UICYmIGRlcHRoID4gMCAmJiBibG9jay5jb21tYXMgPT09IDApIHtcbiAgICAgIGNvbnN0IHNpYmxpbmdzID0gYmxvY2subm9kZXM7XG5cbiAgICAgIGlmIChkZXB0aCA9PT0gMCB8fCBzaWJsaW5ncy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWUgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJldi50eXBlID09PSAnZG90Jykge1xuICAgICAgICBibG9jay5yYW5nZSA9IFtdO1xuICAgICAgICBwcmV2LnZhbHVlICs9IHZhbHVlO1xuICAgICAgICBwcmV2LnR5cGUgPSAncmFuZ2UnO1xuXG4gICAgICAgIGlmIChibG9jay5ub2Rlcy5sZW5ndGggIT09IDMgJiYgYmxvY2subm9kZXMubGVuZ3RoICE9PSA1KSB7XG4gICAgICAgICAgYmxvY2suaW52YWxpZCA9IHRydWU7XG4gICAgICAgICAgYmxvY2sucmFuZ2VzID0gMDtcbiAgICAgICAgICBwcmV2LnR5cGUgPSAndGV4dCc7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBibG9jay5yYW5nZXMrKztcbiAgICAgICAgYmxvY2suYXJncyA9IFtdO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHByZXYudHlwZSA9PT0gJ3JhbmdlJykge1xuICAgICAgICBzaWJsaW5ncy5wb3AoKTtcblxuICAgICAgICBjb25zdCBiZWZvcmUgPSBzaWJsaW5nc1tzaWJsaW5ncy5sZW5ndGggLSAxXTtcbiAgICAgICAgYmVmb3JlLnZhbHVlICs9IHByZXYudmFsdWUgKyB2YWx1ZTtcbiAgICAgICAgcHJldiA9IGJlZm9yZTtcbiAgICAgICAgYmxvY2sucmFuZ2VzLS07XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBwdXNoKHsgdHlwZTogJ2RvdCcsIHZhbHVlIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGV4dFxuICAgICAqL1xuXG4gICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWUgfSk7XG4gIH1cblxuICAvLyBNYXJrIGltYmFsYW5jZWQgYnJhY2VzIGFuZCBicmFja2V0cyBhcyBpbnZhbGlkXG4gIGRvIHtcbiAgICBibG9jayA9IHN0YWNrLnBvcCgpO1xuXG4gICAgaWYgKGJsb2NrLnR5cGUgIT09ICdyb290Jykge1xuICAgICAgYmxvY2subm9kZXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgaWYgKCFub2RlLm5vZGVzKSB7XG4gICAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ29wZW4nKSBub2RlLmlzT3BlbiA9IHRydWU7XG4gICAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ2Nsb3NlJykgbm9kZS5pc0Nsb3NlID0gdHJ1ZTtcbiAgICAgICAgICBpZiAoIW5vZGUubm9kZXMpIG5vZGUudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgICBub2RlLmludmFsaWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gZ2V0IHRoZSBsb2NhdGlvbiBvZiB0aGUgYmxvY2sgb24gcGFyZW50Lm5vZGVzIChibG9jaydzIHNpYmxpbmdzKVxuICAgICAgY29uc3QgcGFyZW50ID0gc3RhY2tbc3RhY2subGVuZ3RoIC0gMV07XG4gICAgICBjb25zdCBpbmRleCA9IHBhcmVudC5ub2Rlcy5pbmRleE9mKGJsb2NrKTtcbiAgICAgIC8vIHJlcGxhY2UgdGhlIChpbnZhbGlkKSBibG9jayB3aXRoIGl0J3Mgbm9kZXNcbiAgICAgIHBhcmVudC5ub2Rlcy5zcGxpY2UoaW5kZXgsIDEsIC4uLmJsb2NrLm5vZGVzKTtcbiAgICB9XG4gIH0gd2hpbGUgKHN0YWNrLmxlbmd0aCA+IDApO1xuXG4gIHB1c2goeyB0eXBlOiAnZW9zJyB9KTtcbiAgcmV0dXJuIGFzdDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyc2U7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBzdHJpbmdpZnkgPSByZXF1aXJlKCcuL2xpYi9zdHJpbmdpZnknKTtcbmNvbnN0IGNvbXBpbGUgPSByZXF1aXJlKCcuL2xpYi9jb21waWxlJyk7XG5jb25zdCBleHBhbmQgPSByZXF1aXJlKCcuL2xpYi9leHBhbmQnKTtcbmNvbnN0IHBhcnNlID0gcmVxdWlyZSgnLi9saWIvcGFyc2UnKTtcblxuLyoqXG4gKiBFeHBhbmQgdGhlIGdpdmVuIHBhdHRlcm4gb3IgY3JlYXRlIGEgcmVnZXgtY29tcGF0aWJsZSBzdHJpbmcuXG4gKlxuICogYGBganNcbiAqIGNvbnN0IGJyYWNlcyA9IHJlcXVpcmUoJ2JyYWNlcycpO1xuICogY29uc29sZS5sb2coYnJhY2VzKCd7YSxiLGN9JywgeyBjb21waWxlOiB0cnVlIH0pKTsgLy89PiBbJyhhfGJ8YyknXVxuICogY29uc29sZS5sb2coYnJhY2VzKCd7YSxiLGN9JykpOyAvLz0+IFsnYScsICdiJywgJ2MnXVxuICogYGBgXG4gKiBAcGFyYW0ge1N0cmluZ30gYHN0cmBcbiAqIEBwYXJhbSB7T2JqZWN0fSBgb3B0aW9uc2BcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuY29uc3QgYnJhY2VzID0gKGlucHV0LCBvcHRpb25zID0ge30pID0+IHtcbiAgbGV0IG91dHB1dCA9IFtdO1xuXG4gIGlmIChBcnJheS5pc0FycmF5KGlucHV0KSkge1xuICAgIGZvciAoY29uc3QgcGF0dGVybiBvZiBpbnB1dCkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYnJhY2VzLmNyZWF0ZShwYXR0ZXJuLCBvcHRpb25zKTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlc3VsdCkpIHtcbiAgICAgICAgb3V0cHV0LnB1c2goLi4ucmVzdWx0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG91dHB1dC5wdXNoKHJlc3VsdCk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIG91dHB1dCA9IFtdLmNvbmNhdChicmFjZXMuY3JlYXRlKGlucHV0LCBvcHRpb25zKSk7XG4gIH1cblxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmV4cGFuZCA9PT0gdHJ1ZSAmJiBvcHRpb25zLm5vZHVwZXMgPT09IHRydWUpIHtcbiAgICBvdXRwdXQgPSBbLi4ubmV3IFNldChvdXRwdXQpXTtcbiAgfVxuICByZXR1cm4gb3V0cHV0O1xufTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gYHN0cmAgd2l0aCB0aGUgZ2l2ZW4gYG9wdGlvbnNgLlxuICpcbiAqIGBgYGpzXG4gKiAvLyBicmFjZXMucGFyc2UocGF0dGVybiwgWywgb3B0aW9uc10pO1xuICogY29uc3QgYXN0ID0gYnJhY2VzLnBhcnNlKCdhL3tiLGN9L2QnKTtcbiAqIGNvbnNvbGUubG9nKGFzdCk7XG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXR0ZXJuIEJyYWNlIHBhdHRlcm4gdG8gcGFyc2VcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHtPYmplY3R9IFJldHVybnMgYW4gQVNUXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmJyYWNlcy5wYXJzZSA9IChpbnB1dCwgb3B0aW9ucyA9IHt9KSA9PiBwYXJzZShpbnB1dCwgb3B0aW9ucyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGJyYWNlcyBzdHJpbmcgZnJvbSBhbiBBU1QsIG9yIGFuIEFTVCBub2RlLlxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCBicmFjZXMgPSByZXF1aXJlKCdicmFjZXMnKTtcbiAqIGxldCBhc3QgPSBicmFjZXMucGFyc2UoJ2Zvby97YSxifS9iYXInKTtcbiAqIGNvbnNvbGUubG9nKHN0cmluZ2lmeShhc3Qubm9kZXNbMl0pKTsgLy89PiAne2EsYn0nXG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBgaW5wdXRgIEJyYWNlIHBhdHRlcm4gb3IgQVNULlxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYFxuICogQHJldHVybiB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgZXhwYW5kZWQgdmFsdWVzLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5icmFjZXMuc3RyaW5naWZ5ID0gKGlucHV0LCBvcHRpb25zID0ge30pID0+IHtcbiAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gc3RyaW5naWZ5KGJyYWNlcy5wYXJzZShpbnB1dCwgb3B0aW9ucyksIG9wdGlvbnMpO1xuICB9XG4gIHJldHVybiBzdHJpbmdpZnkoaW5wdXQsIG9wdGlvbnMpO1xufTtcblxuLyoqXG4gKiBDb21waWxlcyBhIGJyYWNlIHBhdHRlcm4gaW50byBhIHJlZ2V4LWNvbXBhdGlibGUsIG9wdGltaXplZCBzdHJpbmcuXG4gKiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYnkgdGhlIG1haW4gW2JyYWNlc10oI2JyYWNlcykgZnVuY3Rpb24gYnkgZGVmYXVsdC5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgYnJhY2VzID0gcmVxdWlyZSgnYnJhY2VzJyk7XG4gKiBjb25zb2xlLmxvZyhicmFjZXMuY29tcGlsZSgnYS97YixjfS9kJykpO1xuICogLy89PiBbJ2EvKGJ8YykvZCddXG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBgaW5wdXRgIEJyYWNlIHBhdHRlcm4gb3IgQVNULlxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYFxuICogQHJldHVybiB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgZXhwYW5kZWQgdmFsdWVzLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5icmFjZXMuY29tcGlsZSA9IChpbnB1dCwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgaW5wdXQgPSBicmFjZXMucGFyc2UoaW5wdXQsIG9wdGlvbnMpO1xuICB9XG4gIHJldHVybiBjb21waWxlKGlucHV0LCBvcHRpb25zKTtcbn07XG5cbi8qKlxuICogRXhwYW5kcyBhIGJyYWNlIHBhdHRlcm4gaW50byBhbiBhcnJheS4gVGhpcyBtZXRob2QgaXMgY2FsbGVkIGJ5IHRoZVxuICogbWFpbiBbYnJhY2VzXSgjYnJhY2VzKSBmdW5jdGlvbiB3aGVuIGBvcHRpb25zLmV4cGFuZGAgaXMgdHJ1ZS4gQmVmb3JlXG4gKiB1c2luZyB0aGlzIG1ldGhvZCBpdCdzIHJlY29tbWVuZGVkIHRoYXQgeW91IHJlYWQgdGhlIFtwZXJmb3JtYW5jZSBub3Rlc10oI3BlcmZvcm1hbmNlKSlcbiAqIGFuZCBhZHZhbnRhZ2VzIG9mIHVzaW5nIFsuY29tcGlsZV0oI2NvbXBpbGUpIGluc3RlYWQuXG4gKlxuICogYGBganNcbiAqIGNvbnN0IGJyYWNlcyA9IHJlcXVpcmUoJ2JyYWNlcycpO1xuICogY29uc29sZS5sb2coYnJhY2VzLmV4cGFuZCgnYS97YixjfS9kJykpO1xuICogLy89PiBbJ2EvYi9kJywgJ2EvYy9kJ107XG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBgcGF0dGVybmAgQnJhY2UgcGF0dGVyblxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYFxuICogQHJldHVybiB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgZXhwYW5kZWQgdmFsdWVzLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5icmFjZXMuZXhwYW5kID0gKGlucHV0LCBvcHRpb25zID0ge30pID0+IHtcbiAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcbiAgICBpbnB1dCA9IGJyYWNlcy5wYXJzZShpbnB1dCwgb3B0aW9ucyk7XG4gIH1cblxuICBsZXQgcmVzdWx0ID0gZXhwYW5kKGlucHV0LCBvcHRpb25zKTtcblxuICAvLyBmaWx0ZXIgb3V0IGVtcHR5IHN0cmluZ3MgaWYgc3BlY2lmaWVkXG4gIGlmIChvcHRpb25zLm5vZW1wdHkgPT09IHRydWUpIHtcbiAgICByZXN1bHQgPSByZXN1bHQuZmlsdGVyKEJvb2xlYW4pO1xuICB9XG5cbiAgLy8gZmlsdGVyIG91dCBkdXBsaWNhdGVzIGlmIHNwZWNpZmllZFxuICBpZiAob3B0aW9ucy5ub2R1cGVzID09PSB0cnVlKSB7XG4gICAgcmVzdWx0ID0gWy4uLm5ldyBTZXQocmVzdWx0KV07XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBQcm9jZXNzZXMgYSBicmFjZSBwYXR0ZXJuIGFuZCByZXR1cm5zIGVpdGhlciBhbiBleHBhbmRlZCBhcnJheVxuICogKGlmIGBvcHRpb25zLmV4cGFuZGAgaXMgdHJ1ZSksIGEgaGlnaGx5IG9wdGltaXplZCByZWdleC1jb21wYXRpYmxlIHN0cmluZy5cbiAqIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBieSB0aGUgbWFpbiBbYnJhY2VzXSgjYnJhY2VzKSBmdW5jdGlvbi5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgYnJhY2VzID0gcmVxdWlyZSgnYnJhY2VzJyk7XG4gKiBjb25zb2xlLmxvZyhicmFjZXMuY3JlYXRlKCd1c2VyLXsyMDAuLjMwMH0vcHJvamVjdC17YSxiLGN9LXsxLi4xMH0nKSlcbiAqIC8vPT4gJ3VzZXItKDIwWzAtOV18MlsxLTldWzAtOV18MzAwKS9wcm9qZWN0LShhfGJ8YyktKFsxLTldfDEwKSdcbiAqIGBgYFxuICogQHBhcmFtIHtTdHJpbmd9IGBwYXR0ZXJuYCBCcmFjZSBwYXR0ZXJuXG4gKiBAcGFyYW0ge09iamVjdH0gYG9wdGlvbnNgXG4gKiBAcmV0dXJuIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiBleHBhbmRlZCB2YWx1ZXMuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmJyYWNlcy5jcmVhdGUgPSAoaW5wdXQsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICBpZiAoaW5wdXQgPT09ICcnIHx8IGlucHV0Lmxlbmd0aCA8IDMpIHtcbiAgICByZXR1cm4gW2lucHV0XTtcbiAgfVxuXG4gIHJldHVybiBvcHRpb25zLmV4cGFuZCAhPT0gdHJ1ZVxuICAgID8gYnJhY2VzLmNvbXBpbGUoaW5wdXQsIG9wdGlvbnMpXG4gICAgOiBicmFjZXMuZXhwYW5kKGlucHV0LCBvcHRpb25zKTtcbn07XG5cbi8qKlxuICogRXhwb3NlIFwiYnJhY2VzXCJcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJyYWNlcztcbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCBXSU5fU0xBU0ggPSAnXFxcXFxcXFwvJztcbmNvbnN0IFdJTl9OT19TTEFTSCA9IGBbXiR7V0lOX1NMQVNIfV1gO1xuXG5jb25zdCBERUZBVUxUX01BWF9FWFRHTE9CX1JFQ1VSU0lPTiA9IDA7XG5cbi8qKlxuICogUG9zaXggZ2xvYiByZWdleFxuICovXG5cbmNvbnN0IERPVF9MSVRFUkFMID0gJ1xcXFwuJztcbmNvbnN0IFBMVVNfTElURVJBTCA9ICdcXFxcKyc7XG5jb25zdCBRTUFSS19MSVRFUkFMID0gJ1xcXFw/JztcbmNvbnN0IFNMQVNIX0xJVEVSQUwgPSAnXFxcXC8nO1xuY29uc3QgT05FX0NIQVIgPSAnKD89LiknO1xuY29uc3QgUU1BUksgPSAnW14vXSc7XG5jb25zdCBFTkRfQU5DSE9SID0gYCg/OiR7U0xBU0hfTElURVJBTH18JClgO1xuY29uc3QgU1RBUlRfQU5DSE9SID0gYCg/Ol58JHtTTEFTSF9MSVRFUkFMfSlgO1xuY29uc3QgRE9UU19TTEFTSCA9IGAke0RPVF9MSVRFUkFMfXsxLDJ9JHtFTkRfQU5DSE9SfWA7XG5jb25zdCBOT19ET1QgPSBgKD8hJHtET1RfTElURVJBTH0pYDtcbmNvbnN0IE5PX0RPVFMgPSBgKD8hJHtTVEFSVF9BTkNIT1J9JHtET1RTX1NMQVNIfSlgO1xuY29uc3QgTk9fRE9UX1NMQVNIID0gYCg/ISR7RE9UX0xJVEVSQUx9ezAsMX0ke0VORF9BTkNIT1J9KWA7XG5jb25zdCBOT19ET1RTX1NMQVNIID0gYCg/ISR7RE9UU19TTEFTSH0pYDtcbmNvbnN0IFFNQVJLX05PX0RPVCA9IGBbXi4ke1NMQVNIX0xJVEVSQUx9XWA7XG5jb25zdCBTVEFSID0gYCR7UU1BUkt9Kj9gO1xuXG5jb25zdCBQT1NJWF9DSEFSUyA9IHtcbiAgRE9UX0xJVEVSQUwsXG4gIFBMVVNfTElURVJBTCxcbiAgUU1BUktfTElURVJBTCxcbiAgU0xBU0hfTElURVJBTCxcbiAgT05FX0NIQVIsXG4gIFFNQVJLLFxuICBFTkRfQU5DSE9SLFxuICBET1RTX1NMQVNILFxuICBOT19ET1QsXG4gIE5PX0RPVFMsXG4gIE5PX0RPVF9TTEFTSCxcbiAgTk9fRE9UU19TTEFTSCxcbiAgUU1BUktfTk9fRE9ULFxuICBTVEFSLFxuICBTVEFSVF9BTkNIT1Jcbn07XG5cbi8qKlxuICogV2luZG93cyBnbG9iIHJlZ2V4XG4gKi9cblxuY29uc3QgV0lORE9XU19DSEFSUyA9IHtcbiAgLi4uUE9TSVhfQ0hBUlMsXG5cbiAgU0xBU0hfTElURVJBTDogYFske1dJTl9TTEFTSH1dYCxcbiAgUU1BUks6IFdJTl9OT19TTEFTSCxcbiAgU1RBUjogYCR7V0lOX05PX1NMQVNIfSo/YCxcbiAgRE9UU19TTEFTSDogYCR7RE9UX0xJVEVSQUx9ezEsMn0oPzpbJHtXSU5fU0xBU0h9XXwkKWAsXG4gIE5PX0RPVDogYCg/ISR7RE9UX0xJVEVSQUx9KWAsXG4gIE5PX0RPVFM6IGAoPyEoPzpefFske1dJTl9TTEFTSH1dKSR7RE9UX0xJVEVSQUx9ezEsMn0oPzpbJHtXSU5fU0xBU0h9XXwkKSlgLFxuICBOT19ET1RfU0xBU0g6IGAoPyEke0RPVF9MSVRFUkFMfXswLDF9KD86WyR7V0lOX1NMQVNIfV18JCkpYCxcbiAgTk9fRE9UU19TTEFTSDogYCg/ISR7RE9UX0xJVEVSQUx9ezEsMn0oPzpbJHtXSU5fU0xBU0h9XXwkKSlgLFxuICBRTUFSS19OT19ET1Q6IGBbXi4ke1dJTl9TTEFTSH1dYCxcbiAgU1RBUlRfQU5DSE9SOiBgKD86XnxbJHtXSU5fU0xBU0h9XSlgLFxuICBFTkRfQU5DSE9SOiBgKD86WyR7V0lOX1NMQVNIfV18JClgXG59O1xuXG4vKipcbiAqIFBPU0lYIEJyYWNrZXQgUmVnZXhcbiAqL1xuXG5jb25zdCBQT1NJWF9SRUdFWF9TT1VSQ0UgPSB7XG4gIF9fcHJvdG9fXzogbnVsbCxcbiAgYWxudW06ICdhLXpBLVowLTknLFxuICBhbHBoYTogJ2EtekEtWicsXG4gIGFzY2lpOiAnXFxcXHgwMC1cXFxceDdGJyxcbiAgYmxhbms6ICcgXFxcXHQnLFxuICBjbnRybDogJ1xcXFx4MDAtXFxcXHgxRlxcXFx4N0YnLFxuICBkaWdpdDogJzAtOScsXG4gIGdyYXBoOiAnXFxcXHgyMS1cXFxceDdFJyxcbiAgbG93ZXI6ICdhLXonLFxuICBwcmludDogJ1xcXFx4MjAtXFxcXHg3RSAnLFxuICBwdW5jdDogJ1xcXFwtIVwiIyQlJlxcJygpXFxcXCorLC4vOjs8PT4/QFtcXFxcXV5fYHt8fX4nLFxuICBzcGFjZTogJyBcXFxcdFxcXFxyXFxcXG5cXFxcdlxcXFxmJyxcbiAgdXBwZXI6ICdBLVonLFxuICB3b3JkOiAnQS1aYS16MC05XycsXG4gIHhkaWdpdDogJ0EtRmEtZjAtOSdcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBERUZBVUxUX01BWF9FWFRHTE9CX1JFQ1VSU0lPTixcbiAgTUFYX0xFTkdUSDogMTAyNCAqIDY0LFxuICBQT1NJWF9SRUdFWF9TT1VSQ0UsXG5cbiAgLy8gcmVndWxhciBleHByZXNzaW9uc1xuICBSRUdFWF9CQUNLU0xBU0g6IC9cXFxcKD8hWyorP14ke30ofClbXFxdXSkvZyxcbiAgUkVHRVhfTk9OX1NQRUNJQUxfQ0hBUlM6IC9eW15AIVtcXF0uLCQqKz9ee30oKXxcXFxcL10rLyxcbiAgUkVHRVhfU1BFQ0lBTF9DSEFSUzogL1stKis/Ll4ke30ofClbXFxdXS8sXG4gIFJFR0VYX1NQRUNJQUxfQ0hBUlNfQkFDS1JFRjogLyhcXFxcPykoKFxcVykoXFwzKikpL2csXG4gIFJFR0VYX1NQRUNJQUxfQ0hBUlNfR0xPQkFMOiAvKFstKis/Ll4ke30ofClbXFxdXSkvZyxcbiAgUkVHRVhfUkVNT1ZFX0JBQ0tTTEFTSDogLyg/OlxcWy4qP1teXFxcXF1cXF18XFxcXCg/PS4pKS9nLFxuXG4gIC8vIFJlcGxhY2UgZ2xvYnMgd2l0aCBlcXVpdmFsZW50IHBhdHRlcm5zIHRvIHJlZHVjZSBwYXJzaW5nIHRpbWUuXG4gIFJFUExBQ0VNRU5UUzoge1xuICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICAnKioqJzogJyonLFxuICAgICcqKi8qKic6ICcqKicsXG4gICAgJyoqLyoqLyoqJzogJyoqJ1xuICB9LFxuXG4gIC8vIERpZ2l0c1xuICBDSEFSXzA6IDQ4LCAvKiAwICovXG4gIENIQVJfOTogNTcsIC8qIDkgKi9cblxuICAvLyBBbHBoYWJldCBjaGFycy5cbiAgQ0hBUl9VUFBFUkNBU0VfQTogNjUsIC8qIEEgKi9cbiAgQ0hBUl9MT1dFUkNBU0VfQTogOTcsIC8qIGEgKi9cbiAgQ0hBUl9VUFBFUkNBU0VfWjogOTAsIC8qIFogKi9cbiAgQ0hBUl9MT1dFUkNBU0VfWjogMTIyLCAvKiB6ICovXG5cbiAgQ0hBUl9MRUZUX1BBUkVOVEhFU0VTOiA0MCwgLyogKCAqL1xuICBDSEFSX1JJR0hUX1BBUkVOVEhFU0VTOiA0MSwgLyogKSAqL1xuXG4gIENIQVJfQVNURVJJU0s6IDQyLCAvKiAqICovXG5cbiAgLy8gTm9uLWFscGhhYmV0aWMgY2hhcnMuXG4gIENIQVJfQU1QRVJTQU5EOiAzOCwgLyogJiAqL1xuICBDSEFSX0FUOiA2NCwgLyogQCAqL1xuICBDSEFSX0JBQ0tXQVJEX1NMQVNIOiA5MiwgLyogXFwgKi9cbiAgQ0hBUl9DQVJSSUFHRV9SRVRVUk46IDEzLCAvKiBcXHIgKi9cbiAgQ0hBUl9DSVJDVU1GTEVYX0FDQ0VOVDogOTQsIC8qIF4gKi9cbiAgQ0hBUl9DT0xPTjogNTgsIC8qIDogKi9cbiAgQ0hBUl9DT01NQTogNDQsIC8qICwgKi9cbiAgQ0hBUl9ET1Q6IDQ2LCAvKiAuICovXG4gIENIQVJfRE9VQkxFX1FVT1RFOiAzNCwgLyogXCIgKi9cbiAgQ0hBUl9FUVVBTDogNjEsIC8qID0gKi9cbiAgQ0hBUl9FWENMQU1BVElPTl9NQVJLOiAzMywgLyogISAqL1xuICBDSEFSX0ZPUk1fRkVFRDogMTIsIC8qIFxcZiAqL1xuICBDSEFSX0ZPUldBUkRfU0xBU0g6IDQ3LCAvKiAvICovXG4gIENIQVJfR1JBVkVfQUNDRU5UOiA5NiwgLyogYCAqL1xuICBDSEFSX0hBU0g6IDM1LCAvKiAjICovXG4gIENIQVJfSFlQSEVOX01JTlVTOiA0NSwgLyogLSAqL1xuICBDSEFSX0xFRlRfQU5HTEVfQlJBQ0tFVDogNjAsIC8qIDwgKi9cbiAgQ0hBUl9MRUZUX0NVUkxZX0JSQUNFOiAxMjMsIC8qIHsgKi9cbiAgQ0hBUl9MRUZUX1NRVUFSRV9CUkFDS0VUOiA5MSwgLyogWyAqL1xuICBDSEFSX0xJTkVfRkVFRDogMTAsIC8qIFxcbiAqL1xuICBDSEFSX05PX0JSRUFLX1NQQUNFOiAxNjAsIC8qIFxcdTAwQTAgKi9cbiAgQ0hBUl9QRVJDRU5UOiAzNywgLyogJSAqL1xuICBDSEFSX1BMVVM6IDQzLCAvKiArICovXG4gIENIQVJfUVVFU1RJT05fTUFSSzogNjMsIC8qID8gKi9cbiAgQ0hBUl9SSUdIVF9BTkdMRV9CUkFDS0VUOiA2MiwgLyogPiAqL1xuICBDSEFSX1JJR0hUX0NVUkxZX0JSQUNFOiAxMjUsIC8qIH0gKi9cbiAgQ0hBUl9SSUdIVF9TUVVBUkVfQlJBQ0tFVDogOTMsIC8qIF0gKi9cbiAgQ0hBUl9TRU1JQ09MT046IDU5LCAvKiA7ICovXG4gIENIQVJfU0lOR0xFX1FVT1RFOiAzOSwgLyogJyAqL1xuICBDSEFSX1NQQUNFOiAzMiwgLyogICAqL1xuICBDSEFSX1RBQjogOSwgLyogXFx0ICovXG4gIENIQVJfVU5ERVJTQ09SRTogOTUsIC8qIF8gKi9cbiAgQ0hBUl9WRVJUSUNBTF9MSU5FOiAxMjQsIC8qIHwgKi9cbiAgQ0hBUl9aRVJPX1dJRFRIX05PQlJFQUtfU1BBQ0U6IDY1Mjc5LCAvKiBcXHVGRUZGICovXG5cbiAgU0VQOiBwYXRoLnNlcCxcblxuICAvKipcbiAgICogQ3JlYXRlIEVYVEdMT0JfQ0hBUlNcbiAgICovXG5cbiAgZXh0Z2xvYkNoYXJzKGNoYXJzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICchJzogeyB0eXBlOiAnbmVnYXRlJywgb3BlbjogJyg/Oig/ISg/OicsIGNsb3NlOiBgKSkke2NoYXJzLlNUQVJ9KWAgfSxcbiAgICAgICc/JzogeyB0eXBlOiAncW1hcmsnLCBvcGVuOiAnKD86JywgY2xvc2U6ICcpPycgfSxcbiAgICAgICcrJzogeyB0eXBlOiAncGx1cycsIG9wZW46ICcoPzonLCBjbG9zZTogJykrJyB9LFxuICAgICAgJyonOiB7IHR5cGU6ICdzdGFyJywgb3BlbjogJyg/OicsIGNsb3NlOiAnKSonIH0sXG4gICAgICAnQCc6IHsgdHlwZTogJ2F0Jywgb3BlbjogJyg/OicsIGNsb3NlOiAnKScgfVxuICAgIH07XG4gIH0sXG5cbiAgLyoqXG4gICAqIENyZWF0ZSBHTE9CX0NIQVJTXG4gICAqL1xuXG4gIGdsb2JDaGFycyh3aW4zMikge1xuICAgIHJldHVybiB3aW4zMiA9PT0gdHJ1ZSA/IFdJTkRPV1NfQ0hBUlMgOiBQT1NJWF9DSEFSUztcbiAgfVxufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCB3aW4zMiA9IHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMic7XG5jb25zdCB7XG4gIFJFR0VYX0JBQ0tTTEFTSCxcbiAgUkVHRVhfUkVNT1ZFX0JBQ0tTTEFTSCxcbiAgUkVHRVhfU1BFQ0lBTF9DSEFSUyxcbiAgUkVHRVhfU1BFQ0lBTF9DSEFSU19HTE9CQUxcbn0gPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuXG5leHBvcnRzLmlzT2JqZWN0ID0gdmFsID0+IHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheSh2YWwpO1xuZXhwb3J0cy5oYXNSZWdleENoYXJzID0gc3RyID0+IFJFR0VYX1NQRUNJQUxfQ0hBUlMudGVzdChzdHIpO1xuZXhwb3J0cy5pc1JlZ2V4Q2hhciA9IHN0ciA9PiBzdHIubGVuZ3RoID09PSAxICYmIGV4cG9ydHMuaGFzUmVnZXhDaGFycyhzdHIpO1xuZXhwb3J0cy5lc2NhcGVSZWdleCA9IHN0ciA9PiBzdHIucmVwbGFjZShSRUdFWF9TUEVDSUFMX0NIQVJTX0dMT0JBTCwgJ1xcXFwkMScpO1xuZXhwb3J0cy50b1Bvc2l4U2xhc2hlcyA9IHN0ciA9PiBzdHIucmVwbGFjZShSRUdFWF9CQUNLU0xBU0gsICcvJyk7XG5cbmV4cG9ydHMucmVtb3ZlQmFja3NsYXNoZXMgPSBzdHIgPT4ge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoUkVHRVhfUkVNT1ZFX0JBQ0tTTEFTSCwgbWF0Y2ggPT4ge1xuICAgIHJldHVybiBtYXRjaCA9PT0gJ1xcXFwnID8gJycgOiBtYXRjaDtcbiAgfSk7XG59O1xuXG5leHBvcnRzLnN1cHBvcnRzTG9va2JlaGluZHMgPSAoKSA9PiB7XG4gIGNvbnN0IHNlZ3MgPSBwcm9jZXNzLnZlcnNpb24uc2xpY2UoMSkuc3BsaXQoJy4nKS5tYXAoTnVtYmVyKTtcbiAgaWYgKHNlZ3MubGVuZ3RoID09PSAzICYmIHNlZ3NbMF0gPj0gOSB8fCAoc2Vnc1swXSA9PT0gOCAmJiBzZWdzWzFdID49IDEwKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmV4cG9ydHMuaXNXaW5kb3dzID0gb3B0aW9ucyA9PiB7XG4gIGlmIChvcHRpb25zICYmIHR5cGVvZiBvcHRpb25zLndpbmRvd3MgPT09ICdib29sZWFuJykge1xuICAgIHJldHVybiBvcHRpb25zLndpbmRvd3M7XG4gIH1cbiAgcmV0dXJuIHdpbjMyID09PSB0cnVlIHx8IHBhdGguc2VwID09PSAnXFxcXCc7XG59O1xuXG5leHBvcnRzLmVzY2FwZUxhc3QgPSAoaW5wdXQsIGNoYXIsIGxhc3RJZHgpID0+IHtcbiAgY29uc3QgaWR4ID0gaW5wdXQubGFzdEluZGV4T2YoY2hhciwgbGFzdElkeCk7XG4gIGlmIChpZHggPT09IC0xKSByZXR1cm4gaW5wdXQ7XG4gIGlmIChpbnB1dFtpZHggLSAxXSA9PT0gJ1xcXFwnKSByZXR1cm4gZXhwb3J0cy5lc2NhcGVMYXN0KGlucHV0LCBjaGFyLCBpZHggLSAxKTtcbiAgcmV0dXJuIGAke2lucHV0LnNsaWNlKDAsIGlkeCl9XFxcXCR7aW5wdXQuc2xpY2UoaWR4KX1gO1xufTtcblxuZXhwb3J0cy5yZW1vdmVQcmVmaXggPSAoaW5wdXQsIHN0YXRlID0ge30pID0+IHtcbiAgbGV0IG91dHB1dCA9IGlucHV0O1xuICBpZiAob3V0cHV0LnN0YXJ0c1dpdGgoJy4vJykpIHtcbiAgICBvdXRwdXQgPSBvdXRwdXQuc2xpY2UoMik7XG4gICAgc3RhdGUucHJlZml4ID0gJy4vJztcbiAgfVxuICByZXR1cm4gb3V0cHV0O1xufTtcblxuZXhwb3J0cy53cmFwT3V0cHV0ID0gKGlucHV0LCBzdGF0ZSA9IHt9LCBvcHRpb25zID0ge30pID0+IHtcbiAgY29uc3QgcHJlcGVuZCA9IG9wdGlvbnMuY29udGFpbnMgPyAnJyA6ICdeJztcbiAgY29uc3QgYXBwZW5kID0gb3B0aW9ucy5jb250YWlucyA/ICcnIDogJyQnO1xuXG4gIGxldCBvdXRwdXQgPSBgJHtwcmVwZW5kfSg/OiR7aW5wdXR9KSR7YXBwZW5kfWA7XG4gIGlmIChzdGF0ZS5uZWdhdGVkID09PSB0cnVlKSB7XG4gICAgb3V0cHV0ID0gYCg/Ol4oPyEke291dHB1dH0pLiokKWA7XG4gIH1cbiAgcmV0dXJuIG91dHB1dDtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbmNvbnN0IHtcbiAgQ0hBUl9BU1RFUklTSywgICAgICAgICAgICAgLyogKiAqL1xuICBDSEFSX0FULCAgICAgICAgICAgICAgICAgICAvKiBAICovXG4gIENIQVJfQkFDS1dBUkRfU0xBU0gsICAgICAgIC8qIFxcICovXG4gIENIQVJfQ09NTUEsICAgICAgICAgICAgICAgIC8qICwgKi9cbiAgQ0hBUl9ET1QsICAgICAgICAgICAgICAgICAgLyogLiAqL1xuICBDSEFSX0VYQ0xBTUFUSU9OX01BUkssICAgICAvKiAhICovXG4gIENIQVJfRk9SV0FSRF9TTEFTSCwgICAgICAgIC8qIC8gKi9cbiAgQ0hBUl9MRUZUX0NVUkxZX0JSQUNFLCAgICAgLyogeyAqL1xuICBDSEFSX0xFRlRfUEFSRU5USEVTRVMsICAgICAvKiAoICovXG4gIENIQVJfTEVGVF9TUVVBUkVfQlJBQ0tFVCwgIC8qIFsgKi9cbiAgQ0hBUl9QTFVTLCAgICAgICAgICAgICAgICAgLyogKyAqL1xuICBDSEFSX1FVRVNUSU9OX01BUkssICAgICAgICAvKiA/ICovXG4gIENIQVJfUklHSFRfQ1VSTFlfQlJBQ0UsICAgIC8qIH0gKi9cbiAgQ0hBUl9SSUdIVF9QQVJFTlRIRVNFUywgICAgLyogKSAqL1xuICBDSEFSX1JJR0hUX1NRVUFSRV9CUkFDS0VUICAvKiBdICovXG59ID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcblxuY29uc3QgaXNQYXRoU2VwYXJhdG9yID0gY29kZSA9PiB7XG4gIHJldHVybiBjb2RlID09PSBDSEFSX0ZPUldBUkRfU0xBU0ggfHwgY29kZSA9PT0gQ0hBUl9CQUNLV0FSRF9TTEFTSDtcbn07XG5cbmNvbnN0IGRlcHRoID0gdG9rZW4gPT4ge1xuICBpZiAodG9rZW4uaXNQcmVmaXggIT09IHRydWUpIHtcbiAgICB0b2tlbi5kZXB0aCA9IHRva2VuLmlzR2xvYnN0YXIgPyBJbmZpbml0eSA6IDE7XG4gIH1cbn07XG5cbi8qKlxuICogUXVpY2tseSBzY2FucyBhIGdsb2IgcGF0dGVybiBhbmQgcmV0dXJucyBhbiBvYmplY3Qgd2l0aCBhIGhhbmRmdWwgb2ZcbiAqIHVzZWZ1bCBwcm9wZXJ0aWVzLCBsaWtlIGBpc0dsb2JgLCBgcGF0aGAgKHRoZSBsZWFkaW5nIG5vbi1nbG9iLCBpZiBpdCBleGlzdHMpLFxuICogYGdsb2JgICh0aGUgYWN0dWFsIHBhdHRlcm4pLCBgbmVnYXRlZGAgKHRydWUgaWYgdGhlIHBhdGggc3RhcnRzIHdpdGggYCFgIGJ1dCBub3RcbiAqIHdpdGggYCEoYCkgYW5kIGBuZWdhdGVkRXh0Z2xvYmAgKHRydWUgaWYgdGhlIHBhdGggc3RhcnRzIHdpdGggYCEoYCkuXG4gKlxuICogYGBganNcbiAqIGNvbnN0IHBtID0gcmVxdWlyZSgncGljb21hdGNoJyk7XG4gKiBjb25zb2xlLmxvZyhwbS5zY2FuKCdmb28vYmFyLyouanMnKSk7XG4gKiB7IGlzR2xvYjogdHJ1ZSwgaW5wdXQ6ICdmb28vYmFyLyouanMnLCBiYXNlOiAnZm9vL2JhcicsIGdsb2I6ICcqLmpzJyB9XG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBgc3RyYFxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYFxuICogQHJldHVybiB7T2JqZWN0fSBSZXR1cm5zIGFuIG9iamVjdCB3aXRoIHRva2VucyBhbmQgcmVnZXggc291cmNlIHN0cmluZy5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuY29uc3Qgc2NhbiA9IChpbnB1dCwgb3B0aW9ucykgPT4ge1xuICBjb25zdCBvcHRzID0gb3B0aW9ucyB8fCB7fTtcblxuICBjb25zdCBsZW5ndGggPSBpbnB1dC5sZW5ndGggLSAxO1xuICBjb25zdCBzY2FuVG9FbmQgPSBvcHRzLnBhcnRzID09PSB0cnVlIHx8IG9wdHMuc2NhblRvRW5kID09PSB0cnVlO1xuICBjb25zdCBzbGFzaGVzID0gW107XG4gIGNvbnN0IHRva2VucyA9IFtdO1xuICBjb25zdCBwYXJ0cyA9IFtdO1xuXG4gIGxldCBzdHIgPSBpbnB1dDtcbiAgbGV0IGluZGV4ID0gLTE7XG4gIGxldCBzdGFydCA9IDA7XG4gIGxldCBsYXN0SW5kZXggPSAwO1xuICBsZXQgaXNCcmFjZSA9IGZhbHNlO1xuICBsZXQgaXNCcmFja2V0ID0gZmFsc2U7XG4gIGxldCBpc0dsb2IgPSBmYWxzZTtcbiAgbGV0IGlzRXh0Z2xvYiA9IGZhbHNlO1xuICBsZXQgaXNHbG9ic3RhciA9IGZhbHNlO1xuICBsZXQgYnJhY2VFc2NhcGVkID0gZmFsc2U7XG4gIGxldCBiYWNrc2xhc2hlcyA9IGZhbHNlO1xuICBsZXQgbmVnYXRlZCA9IGZhbHNlO1xuICBsZXQgbmVnYXRlZEV4dGdsb2IgPSBmYWxzZTtcbiAgbGV0IGZpbmlzaGVkID0gZmFsc2U7XG4gIGxldCBicmFjZXMgPSAwO1xuICBsZXQgcHJldjtcbiAgbGV0IGNvZGU7XG4gIGxldCB0b2tlbiA9IHsgdmFsdWU6ICcnLCBkZXB0aDogMCwgaXNHbG9iOiBmYWxzZSB9O1xuXG4gIGNvbnN0IGVvcyA9ICgpID0+IGluZGV4ID49IGxlbmd0aDtcbiAgY29uc3QgcGVlayA9ICgpID0+IHN0ci5jaGFyQ29kZUF0KGluZGV4ICsgMSk7XG4gIGNvbnN0IGFkdmFuY2UgPSAoKSA9PiB7XG4gICAgcHJldiA9IGNvZGU7XG4gICAgcmV0dXJuIHN0ci5jaGFyQ29kZUF0KCsraW5kZXgpO1xuICB9O1xuXG4gIHdoaWxlIChpbmRleCA8IGxlbmd0aCkge1xuICAgIGNvZGUgPSBhZHZhbmNlKCk7XG4gICAgbGV0IG5leHQ7XG5cbiAgICBpZiAoY29kZSA9PT0gQ0hBUl9CQUNLV0FSRF9TTEFTSCkge1xuICAgICAgYmFja3NsYXNoZXMgPSB0b2tlbi5iYWNrc2xhc2hlcyA9IHRydWU7XG4gICAgICBjb2RlID0gYWR2YW5jZSgpO1xuXG4gICAgICBpZiAoY29kZSA9PT0gQ0hBUl9MRUZUX0NVUkxZX0JSQUNFKSB7XG4gICAgICAgIGJyYWNlRXNjYXBlZCA9IHRydWU7XG4gICAgICB9XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoYnJhY2VFc2NhcGVkID09PSB0cnVlIHx8IGNvZGUgPT09IENIQVJfTEVGVF9DVVJMWV9CUkFDRSkge1xuICAgICAgYnJhY2VzKys7XG5cbiAgICAgIHdoaWxlIChlb3MoKSAhPT0gdHJ1ZSAmJiAoY29kZSA9IGFkdmFuY2UoKSkpIHtcbiAgICAgICAgaWYgKGNvZGUgPT09IENIQVJfQkFDS1dBUkRfU0xBU0gpIHtcbiAgICAgICAgICBiYWNrc2xhc2hlcyA9IHRva2VuLmJhY2tzbGFzaGVzID0gdHJ1ZTtcbiAgICAgICAgICBhZHZhbmNlKCk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29kZSA9PT0gQ0hBUl9MRUZUX0NVUkxZX0JSQUNFKSB7XG4gICAgICAgICAgYnJhY2VzKys7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYnJhY2VFc2NhcGVkICE9PSB0cnVlICYmIGNvZGUgPT09IENIQVJfRE9UICYmIChjb2RlID0gYWR2YW5jZSgpKSA9PT0gQ0hBUl9ET1QpIHtcbiAgICAgICAgICBpc0JyYWNlID0gdG9rZW4uaXNCcmFjZSA9IHRydWU7XG4gICAgICAgICAgaXNHbG9iID0gdG9rZW4uaXNHbG9iID0gdHJ1ZTtcbiAgICAgICAgICBmaW5pc2hlZCA9IHRydWU7XG5cbiAgICAgICAgICBpZiAoc2NhblRvRW5kID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChicmFjZUVzY2FwZWQgIT09IHRydWUgJiYgY29kZSA9PT0gQ0hBUl9DT01NQSkge1xuICAgICAgICAgIGlzQnJhY2UgPSB0b2tlbi5pc0JyYWNlID0gdHJ1ZTtcbiAgICAgICAgICBpc0dsb2IgPSB0b2tlbi5pc0dsb2IgPSB0cnVlO1xuICAgICAgICAgIGZpbmlzaGVkID0gdHJ1ZTtcblxuICAgICAgICAgIGlmIChzY2FuVG9FbmQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvZGUgPT09IENIQVJfUklHSFRfQ1VSTFlfQlJBQ0UpIHtcbiAgICAgICAgICBicmFjZXMtLTtcblxuICAgICAgICAgIGlmIChicmFjZXMgPT09IDApIHtcbiAgICAgICAgICAgIGJyYWNlRXNjYXBlZCA9IGZhbHNlO1xuICAgICAgICAgICAgaXNCcmFjZSA9IHRva2VuLmlzQnJhY2UgPSB0cnVlO1xuICAgICAgICAgICAgZmluaXNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzY2FuVG9FbmQgPT09IHRydWUpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChjb2RlID09PSBDSEFSX0ZPUldBUkRfU0xBU0gpIHtcbiAgICAgIHNsYXNoZXMucHVzaChpbmRleCk7XG4gICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICB0b2tlbiA9IHsgdmFsdWU6ICcnLCBkZXB0aDogMCwgaXNHbG9iOiBmYWxzZSB9O1xuXG4gICAgICBpZiAoZmluaXNoZWQgPT09IHRydWUpIGNvbnRpbnVlO1xuICAgICAgaWYgKHByZXYgPT09IENIQVJfRE9UICYmIGluZGV4ID09PSAoc3RhcnQgKyAxKSkge1xuICAgICAgICBzdGFydCArPSAyO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgbGFzdEluZGV4ID0gaW5kZXggKyAxO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMubm9leHQgIT09IHRydWUpIHtcbiAgICAgIGNvbnN0IGlzRXh0Z2xvYkNoYXIgPSBjb2RlID09PSBDSEFSX1BMVVNcbiAgICAgICAgfHwgY29kZSA9PT0gQ0hBUl9BVFxuICAgICAgICB8fCBjb2RlID09PSBDSEFSX0FTVEVSSVNLXG4gICAgICAgIHx8IGNvZGUgPT09IENIQVJfUVVFU1RJT05fTUFSS1xuICAgICAgICB8fCBjb2RlID09PSBDSEFSX0VYQ0xBTUFUSU9OX01BUks7XG5cbiAgICAgIGlmIChpc0V4dGdsb2JDaGFyID09PSB0cnVlICYmIHBlZWsoKSA9PT0gQ0hBUl9MRUZUX1BBUkVOVEhFU0VTKSB7XG4gICAgICAgIGlzR2xvYiA9IHRva2VuLmlzR2xvYiA9IHRydWU7XG4gICAgICAgIGlzRXh0Z2xvYiA9IHRva2VuLmlzRXh0Z2xvYiA9IHRydWU7XG4gICAgICAgIGZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKGNvZGUgPT09IENIQVJfRVhDTEFNQVRJT05fTUFSSyAmJiBpbmRleCA9PT0gc3RhcnQpIHtcbiAgICAgICAgICBuZWdhdGVkRXh0Z2xvYiA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2NhblRvRW5kID09PSB0cnVlKSB7XG4gICAgICAgICAgd2hpbGUgKGVvcygpICE9PSB0cnVlICYmIChjb2RlID0gYWR2YW5jZSgpKSkge1xuICAgICAgICAgICAgaWYgKGNvZGUgPT09IENIQVJfQkFDS1dBUkRfU0xBU0gpIHtcbiAgICAgICAgICAgICAgYmFja3NsYXNoZXMgPSB0b2tlbi5iYWNrc2xhc2hlcyA9IHRydWU7XG4gICAgICAgICAgICAgIGNvZGUgPSBhZHZhbmNlKCk7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY29kZSA9PT0gQ0hBUl9SSUdIVF9QQVJFTlRIRVNFUykge1xuICAgICAgICAgICAgICBpc0dsb2IgPSB0b2tlbi5pc0dsb2IgPSB0cnVlO1xuICAgICAgICAgICAgICBmaW5pc2hlZCA9IHRydWU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29kZSA9PT0gQ0hBUl9BU1RFUklTSykge1xuICAgICAgaWYgKHByZXYgPT09IENIQVJfQVNURVJJU0spIGlzR2xvYnN0YXIgPSB0b2tlbi5pc0dsb2JzdGFyID0gdHJ1ZTtcbiAgICAgIGlzR2xvYiA9IHRva2VuLmlzR2xvYiA9IHRydWU7XG4gICAgICBmaW5pc2hlZCA9IHRydWU7XG5cbiAgICAgIGlmIChzY2FuVG9FbmQgPT09IHRydWUpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoY29kZSA9PT0gQ0hBUl9RVUVTVElPTl9NQVJLKSB7XG4gICAgICBpc0dsb2IgPSB0b2tlbi5pc0dsb2IgPSB0cnVlO1xuICAgICAgZmluaXNoZWQgPSB0cnVlO1xuXG4gICAgICBpZiAoc2NhblRvRW5kID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKGNvZGUgPT09IENIQVJfTEVGVF9TUVVBUkVfQlJBQ0tFVCkge1xuICAgICAgd2hpbGUgKGVvcygpICE9PSB0cnVlICYmIChuZXh0ID0gYWR2YW5jZSgpKSkge1xuICAgICAgICBpZiAobmV4dCA9PT0gQ0hBUl9CQUNLV0FSRF9TTEFTSCkge1xuICAgICAgICAgIGJhY2tzbGFzaGVzID0gdG9rZW4uYmFja3NsYXNoZXMgPSB0cnVlO1xuICAgICAgICAgIGFkdmFuY2UoKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXh0ID09PSBDSEFSX1JJR0hUX1NRVUFSRV9CUkFDS0VUKSB7XG4gICAgICAgICAgaXNCcmFja2V0ID0gdG9rZW4uaXNCcmFja2V0ID0gdHJ1ZTtcbiAgICAgICAgICBpc0dsb2IgPSB0b2tlbi5pc0dsb2IgPSB0cnVlO1xuICAgICAgICAgIGZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc2NhblRvRW5kID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAob3B0cy5ub25lZ2F0ZSAhPT0gdHJ1ZSAmJiBjb2RlID09PSBDSEFSX0VYQ0xBTUFUSU9OX01BUksgJiYgaW5kZXggPT09IHN0YXJ0KSB7XG4gICAgICBuZWdhdGVkID0gdG9rZW4ubmVnYXRlZCA9IHRydWU7XG4gICAgICBzdGFydCsrO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMubm9wYXJlbiAhPT0gdHJ1ZSAmJiBjb2RlID09PSBDSEFSX0xFRlRfUEFSRU5USEVTRVMpIHtcbiAgICAgIGlzR2xvYiA9IHRva2VuLmlzR2xvYiA9IHRydWU7XG5cbiAgICAgIGlmIChzY2FuVG9FbmQgPT09IHRydWUpIHtcbiAgICAgICAgd2hpbGUgKGVvcygpICE9PSB0cnVlICYmIChjb2RlID0gYWR2YW5jZSgpKSkge1xuICAgICAgICAgIGlmIChjb2RlID09PSBDSEFSX0xFRlRfUEFSRU5USEVTRVMpIHtcbiAgICAgICAgICAgIGJhY2tzbGFzaGVzID0gdG9rZW4uYmFja3NsYXNoZXMgPSB0cnVlO1xuICAgICAgICAgICAgY29kZSA9IGFkdmFuY2UoKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjb2RlID09PSBDSEFSX1JJR0hUX1BBUkVOVEhFU0VTKSB7XG4gICAgICAgICAgICBmaW5pc2hlZCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoaXNHbG9iID09PSB0cnVlKSB7XG4gICAgICBmaW5pc2hlZCA9IHRydWU7XG5cbiAgICAgIGlmIChzY2FuVG9FbmQgPT09IHRydWUpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGlmIChvcHRzLm5vZXh0ID09PSB0cnVlKSB7XG4gICAgaXNFeHRnbG9iID0gZmFsc2U7XG4gICAgaXNHbG9iID0gZmFsc2U7XG4gIH1cblxuICBsZXQgYmFzZSA9IHN0cjtcbiAgbGV0IHByZWZpeCA9ICcnO1xuICBsZXQgZ2xvYiA9ICcnO1xuXG4gIGlmIChzdGFydCA+IDApIHtcbiAgICBwcmVmaXggPSBzdHIuc2xpY2UoMCwgc3RhcnQpO1xuICAgIHN0ciA9IHN0ci5zbGljZShzdGFydCk7XG4gICAgbGFzdEluZGV4IC09IHN0YXJ0O1xuICB9XG5cbiAgaWYgKGJhc2UgJiYgaXNHbG9iID09PSB0cnVlICYmIGxhc3RJbmRleCA+IDApIHtcbiAgICBiYXNlID0gc3RyLnNsaWNlKDAsIGxhc3RJbmRleCk7XG4gICAgZ2xvYiA9IHN0ci5zbGljZShsYXN0SW5kZXgpO1xuICB9IGVsc2UgaWYgKGlzR2xvYiA9PT0gdHJ1ZSkge1xuICAgIGJhc2UgPSAnJztcbiAgICBnbG9iID0gc3RyO1xuICB9IGVsc2Uge1xuICAgIGJhc2UgPSBzdHI7XG4gIH1cblxuICBpZiAoYmFzZSAmJiBiYXNlICE9PSAnJyAmJiBiYXNlICE9PSAnLycgJiYgYmFzZSAhPT0gc3RyKSB7XG4gICAgaWYgKGlzUGF0aFNlcGFyYXRvcihiYXNlLmNoYXJDb2RlQXQoYmFzZS5sZW5ndGggLSAxKSkpIHtcbiAgICAgIGJhc2UgPSBiYXNlLnNsaWNlKDAsIC0xKTtcbiAgICB9XG4gIH1cblxuICBpZiAob3B0cy51bmVzY2FwZSA9PT0gdHJ1ZSkge1xuICAgIGlmIChnbG9iKSBnbG9iID0gdXRpbHMucmVtb3ZlQmFja3NsYXNoZXMoZ2xvYik7XG5cbiAgICBpZiAoYmFzZSAmJiBiYWNrc2xhc2hlcyA9PT0gdHJ1ZSkge1xuICAgICAgYmFzZSA9IHV0aWxzLnJlbW92ZUJhY2tzbGFzaGVzKGJhc2UpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHN0YXRlID0ge1xuICAgIHByZWZpeCxcbiAgICBpbnB1dCxcbiAgICBzdGFydCxcbiAgICBiYXNlLFxuICAgIGdsb2IsXG4gICAgaXNCcmFjZSxcbiAgICBpc0JyYWNrZXQsXG4gICAgaXNHbG9iLFxuICAgIGlzRXh0Z2xvYixcbiAgICBpc0dsb2JzdGFyLFxuICAgIG5lZ2F0ZWQsXG4gICAgbmVnYXRlZEV4dGdsb2JcbiAgfTtcblxuICBpZiAob3B0cy50b2tlbnMgPT09IHRydWUpIHtcbiAgICBzdGF0ZS5tYXhEZXB0aCA9IDA7XG4gICAgaWYgKCFpc1BhdGhTZXBhcmF0b3IoY29kZSkpIHtcbiAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICB9XG4gICAgc3RhdGUudG9rZW5zID0gdG9rZW5zO1xuICB9XG5cbiAgaWYgKG9wdHMucGFydHMgPT09IHRydWUgfHwgb3B0cy50b2tlbnMgPT09IHRydWUpIHtcbiAgICBsZXQgcHJldkluZGV4O1xuXG4gICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgc2xhc2hlcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICBjb25zdCBuID0gcHJldkluZGV4ID8gcHJldkluZGV4ICsgMSA6IHN0YXJ0O1xuICAgICAgY29uc3QgaSA9IHNsYXNoZXNbaWR4XTtcbiAgICAgIGNvbnN0IHZhbHVlID0gaW5wdXQuc2xpY2UobiwgaSk7XG4gICAgICBpZiAob3B0cy50b2tlbnMpIHtcbiAgICAgICAgaWYgKGlkeCA9PT0gMCAmJiBzdGFydCAhPT0gMCkge1xuICAgICAgICAgIHRva2Vuc1tpZHhdLmlzUHJlZml4ID0gdHJ1ZTtcbiAgICAgICAgICB0b2tlbnNbaWR4XS52YWx1ZSA9IHByZWZpeDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b2tlbnNbaWR4XS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGRlcHRoKHRva2Vuc1tpZHhdKTtcbiAgICAgICAgc3RhdGUubWF4RGVwdGggKz0gdG9rZW5zW2lkeF0uZGVwdGg7XG4gICAgICB9XG4gICAgICBpZiAoaWR4ICE9PSAwIHx8IHZhbHVlICE9PSAnJykge1xuICAgICAgICBwYXJ0cy5wdXNoKHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHByZXZJbmRleCA9IGk7XG4gICAgfVxuXG4gICAgaWYgKHByZXZJbmRleCAmJiBwcmV2SW5kZXggKyAxIDwgaW5wdXQubGVuZ3RoKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGlucHV0LnNsaWNlKHByZXZJbmRleCArIDEpO1xuICAgICAgcGFydHMucHVzaCh2YWx1ZSk7XG5cbiAgICAgIGlmIChvcHRzLnRva2Vucykge1xuICAgICAgICB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIGRlcHRoKHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV0pO1xuICAgICAgICBzdGF0ZS5tYXhEZXB0aCArPSB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdLmRlcHRoO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRlLnNsYXNoZXMgPSBzbGFzaGVzO1xuICAgIHN0YXRlLnBhcnRzID0gcGFydHM7XG4gIH1cblxuICByZXR1cm4gc3RhdGU7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNjYW47XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBjb25zdGFudHMgPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuY29uc3QgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbi8qKlxuICogQ29uc3RhbnRzXG4gKi9cblxuY29uc3Qge1xuICBNQVhfTEVOR1RILFxuICBQT1NJWF9SRUdFWF9TT1VSQ0UsXG4gIFJFR0VYX05PTl9TUEVDSUFMX0NIQVJTLFxuICBSRUdFWF9TUEVDSUFMX0NIQVJTX0JBQ0tSRUYsXG4gIFJFUExBQ0VNRU5UU1xufSA9IGNvbnN0YW50cztcblxuLyoqXG4gKiBIZWxwZXJzXG4gKi9cblxuY29uc3QgZXhwYW5kUmFuZ2UgPSAoYXJncywgb3B0aW9ucykgPT4ge1xuICBpZiAodHlwZW9mIG9wdGlvbnMuZXhwYW5kUmFuZ2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5leHBhbmRSYW5nZSguLi5hcmdzLCBvcHRpb25zKTtcbiAgfVxuXG4gIGFyZ3Muc29ydCgpO1xuICBjb25zdCB2YWx1ZSA9IGBbJHthcmdzLmpvaW4oJy0nKX1dYDtcblxuICB0cnkge1xuICAgIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXcgKi9cbiAgICBuZXcgUmVnRXhwKHZhbHVlKTtcbiAgfSBjYXRjaCAoZXgpIHtcbiAgICByZXR1cm4gYXJncy5tYXAodiA9PiB1dGlscy5lc2NhcGVSZWdleCh2KSkuam9pbignLi4nKTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIHRoZSBtZXNzYWdlIGZvciBhIHN5bnRheCBlcnJvclxuICovXG5cbmNvbnN0IHN5bnRheEVycm9yID0gKHR5cGUsIGNoYXIpID0+IHtcbiAgcmV0dXJuIGBNaXNzaW5nICR7dHlwZX06IFwiJHtjaGFyfVwiIC0gdXNlIFwiXFxcXFxcXFwke2NoYXJ9XCIgdG8gbWF0Y2ggbGl0ZXJhbCBjaGFyYWN0ZXJzYDtcbn07XG5cbmNvbnN0IHNwbGl0VG9wTGV2ZWwgPSBpbnB1dCA9PiB7XG4gIGNvbnN0IHBhcnRzID0gW107XG4gIGxldCBicmFja2V0ID0gMDtcbiAgbGV0IHBhcmVuID0gMDtcbiAgbGV0IHF1b3RlID0gMDtcbiAgbGV0IHZhbHVlID0gJyc7XG4gIGxldCBlc2NhcGVkID0gZmFsc2U7XG5cbiAgZm9yIChjb25zdCBjaCBvZiBpbnB1dCkge1xuICAgIGlmIChlc2NhcGVkID09PSB0cnVlKSB7XG4gICAgICB2YWx1ZSArPSBjaDtcbiAgICAgIGVzY2FwZWQgPSBmYWxzZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChjaCA9PT0gJ1xcXFwnKSB7XG4gICAgICB2YWx1ZSArPSBjaDtcbiAgICAgIGVzY2FwZWQgPSB0cnVlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGNoID09PSAnXCInKSB7XG4gICAgICBxdW90ZSA9IHF1b3RlID09PSAxID8gMCA6IDE7XG4gICAgICB2YWx1ZSArPSBjaDtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChxdW90ZSA9PT0gMCkge1xuICAgICAgaWYgKGNoID09PSAnWycpIHtcbiAgICAgICAgYnJhY2tldCsrO1xuICAgICAgfSBlbHNlIGlmIChjaCA9PT0gJ10nICYmIGJyYWNrZXQgPiAwKSB7XG4gICAgICAgIGJyYWNrZXQtLTtcbiAgICAgIH0gZWxzZSBpZiAoYnJhY2tldCA9PT0gMCkge1xuICAgICAgICBpZiAoY2ggPT09ICcoJykge1xuICAgICAgICAgIHBhcmVuKys7XG4gICAgICAgIH0gZWxzZSBpZiAoY2ggPT09ICcpJyAmJiBwYXJlbiA+IDApIHtcbiAgICAgICAgICBwYXJlbi0tO1xuICAgICAgICB9IGVsc2UgaWYgKGNoID09PSAnfCcgJiYgcGFyZW4gPT09IDApIHtcbiAgICAgICAgICBwYXJ0cy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICB2YWx1ZSA9ICcnO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFsdWUgKz0gY2g7XG4gIH1cblxuICBwYXJ0cy5wdXNoKHZhbHVlKTtcbiAgcmV0dXJuIHBhcnRzO1xufTtcblxuY29uc3QgaXNQbGFpbkJyYW5jaCA9IGJyYW5jaCA9PiB7XG4gIGxldCBlc2NhcGVkID0gZmFsc2U7XG5cbiAgZm9yIChjb25zdCBjaCBvZiBicmFuY2gpIHtcbiAgICBpZiAoZXNjYXBlZCA9PT0gdHJ1ZSkge1xuICAgICAgZXNjYXBlZCA9IGZhbHNlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGNoID09PSAnXFxcXCcpIHtcbiAgICAgIGVzY2FwZWQgPSB0cnVlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKC9bPyorQCEoKVtcXF17fV0vLnRlc3QoY2gpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5jb25zdCBub3JtYWxpemVTaW1wbGVCcmFuY2ggPSBicmFuY2ggPT4ge1xuICBsZXQgdmFsdWUgPSBicmFuY2gudHJpbSgpO1xuICBsZXQgY2hhbmdlZCA9IHRydWU7XG5cbiAgd2hpbGUgKGNoYW5nZWQgPT09IHRydWUpIHtcbiAgICBjaGFuZ2VkID0gZmFsc2U7XG5cbiAgICBpZiAoL15AXFwoW15cXFxcKClbXFxde318XStcXCkkLy50ZXN0KHZhbHVlKSkge1xuICAgICAgdmFsdWUgPSB2YWx1ZS5zbGljZSgyLCAtMSk7XG4gICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWlzUGxhaW5CcmFuY2godmFsdWUpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoL1xcXFwoLikvZywgJyQxJyk7XG59O1xuXG5jb25zdCBoYXNSZXBlYXRlZENoYXJQcmVmaXhPdmVybGFwID0gYnJhbmNoZXMgPT4ge1xuICBjb25zdCB2YWx1ZXMgPSBicmFuY2hlcy5tYXAobm9ybWFsaXplU2ltcGxlQnJhbmNoKS5maWx0ZXIoQm9vbGVhbik7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gaSArIDE7IGogPCB2YWx1ZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IGEgPSB2YWx1ZXNbaV07XG4gICAgICBjb25zdCBiID0gdmFsdWVzW2pdO1xuICAgICAgY29uc3QgY2hhciA9IGFbMF07XG5cbiAgICAgIGlmICghY2hhciB8fCBhICE9PSBjaGFyLnJlcGVhdChhLmxlbmd0aCkgfHwgYiAhPT0gY2hhci5yZXBlYXQoYi5sZW5ndGgpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoYSA9PT0gYiB8fCBhLnN0YXJ0c1dpdGgoYikgfHwgYi5zdGFydHNXaXRoKGEpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmNvbnN0IHBhcnNlUmVwZWF0ZWRFeHRnbG9iID0gKHBhdHRlcm4sIHJlcXVpcmVFbmQgPSB0cnVlKSA9PiB7XG4gIGlmICgocGF0dGVyblswXSAhPT0gJysnICYmIHBhdHRlcm5bMF0gIT09ICcqJykgfHwgcGF0dGVyblsxXSAhPT0gJygnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IGJyYWNrZXQgPSAwO1xuICBsZXQgcGFyZW4gPSAwO1xuICBsZXQgcXVvdGUgPSAwO1xuICBsZXQgZXNjYXBlZCA9IGZhbHNlO1xuXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgcGF0dGVybi5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNoID0gcGF0dGVybltpXTtcblxuICAgIGlmIChlc2NhcGVkID09PSB0cnVlKSB7XG4gICAgICBlc2NhcGVkID0gZmFsc2U7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoY2ggPT09ICdcXFxcJykge1xuICAgICAgZXNjYXBlZCA9IHRydWU7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoY2ggPT09ICdcIicpIHtcbiAgICAgIHF1b3RlID0gcXVvdGUgPT09IDEgPyAwIDogMTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChxdW90ZSA9PT0gMSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGNoID09PSAnWycpIHtcbiAgICAgIGJyYWNrZXQrKztcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChjaCA9PT0gJ10nICYmIGJyYWNrZXQgPiAwKSB7XG4gICAgICBicmFja2V0LS07XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoYnJhY2tldCA+IDApIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChjaCA9PT0gJygnKSB7XG4gICAgICBwYXJlbisrO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGNoID09PSAnKScpIHtcbiAgICAgIHBhcmVuLS07XG5cbiAgICAgIGlmIChwYXJlbiA9PT0gMCkge1xuICAgICAgICBpZiAocmVxdWlyZUVuZCA9PT0gdHJ1ZSAmJiBpICE9PSBwYXR0ZXJuLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHR5cGU6IHBhdHRlcm5bMF0sXG4gICAgICAgICAgYm9keTogcGF0dGVybi5zbGljZSgyLCBpKSxcbiAgICAgICAgICBlbmQ6IGlcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IGdldFN0YXJFeHRnbG9iU2VxdWVuY2VPdXRwdXQgPSBwYXR0ZXJuID0+IHtcbiAgbGV0IGluZGV4ID0gMDtcbiAgY29uc3QgY2hhcnMgPSBbXTtcblxuICB3aGlsZSAoaW5kZXggPCBwYXR0ZXJuLmxlbmd0aCkge1xuICAgIGNvbnN0IG1hdGNoID0gcGFyc2VSZXBlYXRlZEV4dGdsb2IocGF0dGVybi5zbGljZShpbmRleCksIGZhbHNlKTtcblxuICAgIGlmICghbWF0Y2ggfHwgbWF0Y2gudHlwZSAhPT0gJyonKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYnJhbmNoZXMgPSBzcGxpdFRvcExldmVsKG1hdGNoLmJvZHkpLm1hcChicmFuY2ggPT4gYnJhbmNoLnRyaW0oKSk7XG4gICAgaWYgKGJyYW5jaGVzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGJyYW5jaCA9IG5vcm1hbGl6ZVNpbXBsZUJyYW5jaChicmFuY2hlc1swXSk7XG4gICAgaWYgKCFicmFuY2ggfHwgYnJhbmNoLmxlbmd0aCAhPT0gMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNoYXJzLnB1c2goYnJhbmNoKTtcbiAgICBpbmRleCArPSBtYXRjaC5lbmQgKyAxO1xuICB9XG5cbiAgaWYgKGNoYXJzLmxlbmd0aCA8IDEpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBzb3VyY2UgPSBjaGFycy5sZW5ndGggPT09IDFcbiAgICA/IHV0aWxzLmVzY2FwZVJlZ2V4KGNoYXJzWzBdKVxuICAgIDogYFske2NoYXJzLm1hcChjaCA9PiB1dGlscy5lc2NhcGVSZWdleChjaCkpLmpvaW4oJycpfV1gO1xuXG4gIHJldHVybiBgJHtzb3VyY2V9KmA7XG59O1xuXG5jb25zdCByZXBlYXRlZEV4dGdsb2JSZWN1cnNpb24gPSBwYXR0ZXJuID0+IHtcbiAgbGV0IGRlcHRoID0gMDtcbiAgbGV0IHZhbHVlID0gcGF0dGVybi50cmltKCk7XG4gIGxldCBtYXRjaCA9IHBhcnNlUmVwZWF0ZWRFeHRnbG9iKHZhbHVlKTtcblxuICB3aGlsZSAobWF0Y2gpIHtcbiAgICBkZXB0aCsrO1xuICAgIHZhbHVlID0gbWF0Y2guYm9keS50cmltKCk7XG4gICAgbWF0Y2ggPSBwYXJzZVJlcGVhdGVkRXh0Z2xvYih2YWx1ZSk7XG4gIH1cblxuICByZXR1cm4gZGVwdGg7XG59O1xuXG5jb25zdCBhbmFseXplUmVwZWF0ZWRFeHRnbG9iID0gKGJvZHksIG9wdGlvbnMpID0+IHtcbiAgaWYgKG9wdGlvbnMubWF4RXh0Z2xvYlJlY3Vyc2lvbiA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4geyByaXNreTogZmFsc2UgfTtcbiAgfVxuXG4gIGNvbnN0IG1heCA9XG4gICAgdHlwZW9mIG9wdGlvbnMubWF4RXh0Z2xvYlJlY3Vyc2lvbiA9PT0gJ251bWJlcidcbiAgICAgID8gb3B0aW9ucy5tYXhFeHRnbG9iUmVjdXJzaW9uXG4gICAgICA6IGNvbnN0YW50cy5ERUZBVUxUX01BWF9FWFRHTE9CX1JFQ1VSU0lPTjtcblxuICBjb25zdCBicmFuY2hlcyA9IHNwbGl0VG9wTGV2ZWwoYm9keSkubWFwKGJyYW5jaCA9PiBicmFuY2gudHJpbSgpKTtcblxuICBpZiAoYnJhbmNoZXMubGVuZ3RoID4gMSkge1xuICAgIGlmIChcbiAgICAgIGJyYW5jaGVzLnNvbWUoYnJhbmNoID0+IGJyYW5jaCA9PT0gJycpIHx8XG4gICAgICBicmFuY2hlcy5zb21lKGJyYW5jaCA9PiAvXlsqP10rJC8udGVzdChicmFuY2gpKSB8fFxuICAgICAgaGFzUmVwZWF0ZWRDaGFyUHJlZml4T3ZlcmxhcChicmFuY2hlcylcbiAgICApIHtcbiAgICAgIHJldHVybiB7IHJpc2t5OiB0cnVlIH07XG4gICAgfVxuICB9XG5cbiAgZm9yIChjb25zdCBicmFuY2ggb2YgYnJhbmNoZXMpIHtcbiAgICBjb25zdCBzYWZlT3V0cHV0ID0gZ2V0U3RhckV4dGdsb2JTZXF1ZW5jZU91dHB1dChicmFuY2gpO1xuICAgIGlmIChzYWZlT3V0cHV0KSB7XG4gICAgICByZXR1cm4geyByaXNreTogdHJ1ZSwgc2FmZU91dHB1dCB9O1xuICAgIH1cblxuICAgIGlmIChyZXBlYXRlZEV4dGdsb2JSZWN1cnNpb24oYnJhbmNoKSA+IG1heCkge1xuICAgICAgcmV0dXJuIHsgcmlza3k6IHRydWUgfTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyByaXNreTogZmFsc2UgfTtcbn07XG5cbi8qKlxuICogUGFyc2UgdGhlIGdpdmVuIGlucHV0IHN0cmluZy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuXG5jb25zdCBwYXJzZSA9IChpbnB1dCwgb3B0aW9ucykgPT4ge1xuICBpZiAodHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGEgc3RyaW5nJyk7XG4gIH1cblxuICBpbnB1dCA9IFJFUExBQ0VNRU5UU1tpbnB1dF0gfHwgaW5wdXQ7XG5cbiAgY29uc3Qgb3B0cyA9IHsgLi4ub3B0aW9ucyB9O1xuICBjb25zdCBtYXggPSB0eXBlb2Ygb3B0cy5tYXhMZW5ndGggPT09ICdudW1iZXInID8gTWF0aC5taW4oTUFYX0xFTkdUSCwgb3B0cy5tYXhMZW5ndGgpIDogTUFYX0xFTkdUSDtcblxuICBsZXQgbGVuID0gaW5wdXQubGVuZ3RoO1xuICBpZiAobGVuID4gbWF4KSB7XG4gICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBJbnB1dCBsZW5ndGg6ICR7bGVufSwgZXhjZWVkcyBtYXhpbXVtIGFsbG93ZWQgbGVuZ3RoOiAke21heH1gKTtcbiAgfVxuXG4gIGNvbnN0IGJvcyA9IHsgdHlwZTogJ2JvcycsIHZhbHVlOiAnJywgb3V0cHV0OiBvcHRzLnByZXBlbmQgfHwgJycgfTtcbiAgY29uc3QgdG9rZW5zID0gW2Jvc107XG5cbiAgY29uc3QgY2FwdHVyZSA9IG9wdHMuY2FwdHVyZSA/ICcnIDogJz86JztcbiAgY29uc3Qgd2luMzIgPSB1dGlscy5pc1dpbmRvd3Mob3B0aW9ucyk7XG5cbiAgLy8gY3JlYXRlIGNvbnN0YW50cyBiYXNlZCBvbiBwbGF0Zm9ybSwgZm9yIHdpbmRvd3Mgb3IgcG9zaXhcbiAgY29uc3QgUExBVEZPUk1fQ0hBUlMgPSBjb25zdGFudHMuZ2xvYkNoYXJzKHdpbjMyKTtcbiAgY29uc3QgRVhUR0xPQl9DSEFSUyA9IGNvbnN0YW50cy5leHRnbG9iQ2hhcnMoUExBVEZPUk1fQ0hBUlMpO1xuXG4gIGNvbnN0IHtcbiAgICBET1RfTElURVJBTCxcbiAgICBQTFVTX0xJVEVSQUwsXG4gICAgU0xBU0hfTElURVJBTCxcbiAgICBPTkVfQ0hBUixcbiAgICBET1RTX1NMQVNILFxuICAgIE5PX0RPVCxcbiAgICBOT19ET1RfU0xBU0gsXG4gICAgTk9fRE9UU19TTEFTSCxcbiAgICBRTUFSSyxcbiAgICBRTUFSS19OT19ET1QsXG4gICAgU1RBUixcbiAgICBTVEFSVF9BTkNIT1JcbiAgfSA9IFBMQVRGT1JNX0NIQVJTO1xuXG4gIGNvbnN0IGdsb2JzdGFyID0gb3B0cyA9PiB7XG4gICAgcmV0dXJuIGAoJHtjYXB0dXJlfSg/Oig/ISR7U1RBUlRfQU5DSE9SfSR7b3B0cy5kb3QgPyBET1RTX1NMQVNIIDogRE9UX0xJVEVSQUx9KS4pKj8pYDtcbiAgfTtcblxuICBjb25zdCBub2RvdCA9IG9wdHMuZG90ID8gJycgOiBOT19ET1Q7XG4gIGNvbnN0IHFtYXJrTm9Eb3QgPSBvcHRzLmRvdCA/IFFNQVJLIDogUU1BUktfTk9fRE9UO1xuICBsZXQgc3RhciA9IG9wdHMuYmFzaCA9PT0gdHJ1ZSA/IGdsb2JzdGFyKG9wdHMpIDogU1RBUjtcblxuICBpZiAob3B0cy5jYXB0dXJlKSB7XG4gICAgc3RhciA9IGAoJHtzdGFyfSlgO1xuICB9XG5cbiAgLy8gbWluaW1hdGNoIG9wdGlvbnMgc3VwcG9ydFxuICBpZiAodHlwZW9mIG9wdHMubm9leHQgPT09ICdib29sZWFuJykge1xuICAgIG9wdHMubm9leHRnbG9iID0gb3B0cy5ub2V4dDtcbiAgfVxuXG4gIGNvbnN0IHN0YXRlID0ge1xuICAgIGlucHV0LFxuICAgIGluZGV4OiAtMSxcbiAgICBzdGFydDogMCxcbiAgICBkb3Q6IG9wdHMuZG90ID09PSB0cnVlLFxuICAgIGNvbnN1bWVkOiAnJyxcbiAgICBvdXRwdXQ6ICcnLFxuICAgIHByZWZpeDogJycsXG4gICAgYmFja3RyYWNrOiBmYWxzZSxcbiAgICBuZWdhdGVkOiBmYWxzZSxcbiAgICBicmFja2V0czogMCxcbiAgICBicmFjZXM6IDAsXG4gICAgcGFyZW5zOiAwLFxuICAgIHF1b3RlczogMCxcbiAgICBnbG9ic3RhcjogZmFsc2UsXG4gICAgdG9rZW5zXG4gIH07XG5cbiAgaW5wdXQgPSB1dGlscy5yZW1vdmVQcmVmaXgoaW5wdXQsIHN0YXRlKTtcbiAgbGVuID0gaW5wdXQubGVuZ3RoO1xuXG4gIGNvbnN0IGV4dGdsb2JzID0gW107XG4gIGNvbnN0IGJyYWNlcyA9IFtdO1xuICBjb25zdCBzdGFjayA9IFtdO1xuICBsZXQgcHJldiA9IGJvcztcbiAgbGV0IHZhbHVlO1xuXG4gIC8qKlxuICAgKiBUb2tlbml6aW5nIGhlbHBlcnNcbiAgICovXG5cbiAgY29uc3QgZW9zID0gKCkgPT4gc3RhdGUuaW5kZXggPT09IGxlbiAtIDE7XG4gIGNvbnN0IHBlZWsgPSBzdGF0ZS5wZWVrID0gKG4gPSAxKSA9PiBpbnB1dFtzdGF0ZS5pbmRleCArIG5dO1xuICBjb25zdCBhZHZhbmNlID0gc3RhdGUuYWR2YW5jZSA9ICgpID0+IGlucHV0Wysrc3RhdGUuaW5kZXhdIHx8ICcnO1xuICBjb25zdCByZW1haW5pbmcgPSAoKSA9PiBpbnB1dC5zbGljZShzdGF0ZS5pbmRleCArIDEpO1xuICBjb25zdCBjb25zdW1lID0gKHZhbHVlID0gJycsIG51bSA9IDApID0+IHtcbiAgICBzdGF0ZS5jb25zdW1lZCArPSB2YWx1ZTtcbiAgICBzdGF0ZS5pbmRleCArPSBudW07XG4gIH07XG5cbiAgY29uc3QgYXBwZW5kID0gdG9rZW4gPT4ge1xuICAgIHN0YXRlLm91dHB1dCArPSB0b2tlbi5vdXRwdXQgIT0gbnVsbCA/IHRva2VuLm91dHB1dCA6IHRva2VuLnZhbHVlO1xuICAgIGNvbnN1bWUodG9rZW4udmFsdWUpO1xuICB9O1xuXG4gIGNvbnN0IG5lZ2F0ZSA9ICgpID0+IHtcbiAgICBsZXQgY291bnQgPSAxO1xuXG4gICAgd2hpbGUgKHBlZWsoKSA9PT0gJyEnICYmIChwZWVrKDIpICE9PSAnKCcgfHwgcGVlaygzKSA9PT0gJz8nKSkge1xuICAgICAgYWR2YW5jZSgpO1xuICAgICAgc3RhdGUuc3RhcnQrKztcbiAgICAgIGNvdW50Kys7XG4gICAgfVxuXG4gICAgaWYgKGNvdW50ICUgMiA9PT0gMCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHN0YXRlLm5lZ2F0ZWQgPSB0cnVlO1xuICAgIHN0YXRlLnN0YXJ0Kys7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgY29uc3QgaW5jcmVtZW50ID0gdHlwZSA9PiB7XG4gICAgc3RhdGVbdHlwZV0rKztcbiAgICBzdGFjay5wdXNoKHR5cGUpO1xuICB9O1xuXG4gIGNvbnN0IGRlY3JlbWVudCA9IHR5cGUgPT4ge1xuICAgIHN0YXRlW3R5cGVdLS07XG4gICAgc3RhY2sucG9wKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFB1c2ggdG9rZW5zIG9udG8gdGhlIHRva2VucyBhcnJheS4gVGhpcyBoZWxwZXIgc3BlZWRzIHVwXG4gICAqIHRva2VuaXppbmcgYnkgMSkgaGVscGluZyB1cyBhdm9pZCBiYWNrdHJhY2tpbmcgYXMgbXVjaCBhcyBwb3NzaWJsZSxcbiAgICogYW5kIDIpIGhlbHBpbmcgdXMgYXZvaWQgY3JlYXRpbmcgZXh0cmEgdG9rZW5zIHdoZW4gY29uc2VjdXRpdmVcbiAgICogY2hhcmFjdGVycyBhcmUgcGxhaW4gdGV4dC4gVGhpcyBpbXByb3ZlcyBwZXJmb3JtYW5jZSBhbmQgc2ltcGxpZmllc1xuICAgKiBsb29rYmVoaW5kcy5cbiAgICovXG5cbiAgY29uc3QgcHVzaCA9IHRvayA9PiB7XG4gICAgaWYgKHByZXYudHlwZSA9PT0gJ2dsb2JzdGFyJykge1xuICAgICAgY29uc3QgaXNCcmFjZSA9IHN0YXRlLmJyYWNlcyA+IDAgJiYgKHRvay50eXBlID09PSAnY29tbWEnIHx8IHRvay50eXBlID09PSAnYnJhY2UnKTtcbiAgICAgIGNvbnN0IGlzRXh0Z2xvYiA9IHRvay5leHRnbG9iID09PSB0cnVlIHx8IChleHRnbG9icy5sZW5ndGggJiYgKHRvay50eXBlID09PSAncGlwZScgfHwgdG9rLnR5cGUgPT09ICdwYXJlbicpKTtcblxuICAgICAgaWYgKHRvay50eXBlICE9PSAnc2xhc2gnICYmIHRvay50eXBlICE9PSAncGFyZW4nICYmICFpc0JyYWNlICYmICFpc0V4dGdsb2IpIHtcbiAgICAgICAgc3RhdGUub3V0cHV0ID0gc3RhdGUub3V0cHV0LnNsaWNlKDAsIC1wcmV2Lm91dHB1dC5sZW5ndGgpO1xuICAgICAgICBwcmV2LnR5cGUgPSAnc3Rhcic7XG4gICAgICAgIHByZXYudmFsdWUgPSAnKic7XG4gICAgICAgIHByZXYub3V0cHV0ID0gc3RhcjtcbiAgICAgICAgc3RhdGUub3V0cHV0ICs9IHByZXYub3V0cHV0O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChleHRnbG9icy5sZW5ndGggJiYgdG9rLnR5cGUgIT09ICdwYXJlbicpIHtcbiAgICAgIGV4dGdsb2JzW2V4dGdsb2JzLmxlbmd0aCAtIDFdLmlubmVyICs9IHRvay52YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAodG9rLnZhbHVlIHx8IHRvay5vdXRwdXQpIGFwcGVuZCh0b2spO1xuICAgIGlmIChwcmV2ICYmIHByZXYudHlwZSA9PT0gJ3RleHQnICYmIHRvay50eXBlID09PSAndGV4dCcpIHtcbiAgICAgIHByZXYudmFsdWUgKz0gdG9rLnZhbHVlO1xuICAgICAgcHJldi5vdXRwdXQgPSAocHJldi5vdXRwdXQgfHwgJycpICsgdG9rLnZhbHVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRvay5wcmV2ID0gcHJldjtcbiAgICB0b2tlbnMucHVzaCh0b2spO1xuICAgIHByZXYgPSB0b2s7XG4gIH07XG5cbiAgY29uc3QgZXh0Z2xvYk9wZW4gPSAodHlwZSwgdmFsdWUpID0+IHtcbiAgICBjb25zdCB0b2tlbiA9IHsgLi4uRVhUR0xPQl9DSEFSU1t2YWx1ZV0sIGNvbmRpdGlvbnM6IDEsIGlubmVyOiAnJyB9O1xuXG4gICAgdG9rZW4ucHJldiA9IHByZXY7XG4gICAgdG9rZW4ucGFyZW5zID0gc3RhdGUucGFyZW5zO1xuICAgIHRva2VuLm91dHB1dCA9IHN0YXRlLm91dHB1dDtcbiAgICB0b2tlbi5zdGFydEluZGV4ID0gc3RhdGUuaW5kZXg7XG4gICAgdG9rZW4udG9rZW5zSW5kZXggPSB0b2tlbnMubGVuZ3RoO1xuICAgIGNvbnN0IG91dHB1dCA9IChvcHRzLmNhcHR1cmUgPyAnKCcgOiAnJykgKyB0b2tlbi5vcGVuO1xuXG4gICAgaW5jcmVtZW50KCdwYXJlbnMnKTtcbiAgICBwdXNoKHsgdHlwZSwgdmFsdWUsIG91dHB1dDogc3RhdGUub3V0cHV0ID8gJycgOiBPTkVfQ0hBUiB9KTtcbiAgICBwdXNoKHsgdHlwZTogJ3BhcmVuJywgZXh0Z2xvYjogdHJ1ZSwgdmFsdWU6IGFkdmFuY2UoKSwgb3V0cHV0IH0pO1xuICAgIGV4dGdsb2JzLnB1c2godG9rZW4pO1xuICB9O1xuXG4gIGNvbnN0IGV4dGdsb2JDbG9zZSA9IHRva2VuID0+IHtcbiAgICBjb25zdCBsaXRlcmFsID0gaW5wdXQuc2xpY2UodG9rZW4uc3RhcnRJbmRleCwgc3RhdGUuaW5kZXggKyAxKTtcbiAgICBjb25zdCBib2R5ID0gaW5wdXQuc2xpY2UodG9rZW4uc3RhcnRJbmRleCArIDIsIHN0YXRlLmluZGV4KTtcbiAgICBjb25zdCBhbmFseXNpcyA9IGFuYWx5emVSZXBlYXRlZEV4dGdsb2IoYm9keSwgb3B0cyk7XG5cbiAgICBpZiAoKHRva2VuLnR5cGUgPT09ICdwbHVzJyB8fCB0b2tlbi50eXBlID09PSAnc3RhcicpICYmIGFuYWx5c2lzLnJpc2t5KSB7XG4gICAgICBjb25zdCBzYWZlT3V0cHV0ID0gYW5hbHlzaXMuc2FmZU91dHB1dFxuICAgICAgICA/ICh0b2tlbi5vdXRwdXQgPyAnJyA6IE9ORV9DSEFSKSArIChvcHRzLmNhcHR1cmUgPyBgKCR7YW5hbHlzaXMuc2FmZU91dHB1dH0pYCA6IGFuYWx5c2lzLnNhZmVPdXRwdXQpXG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgY29uc3Qgb3BlbiA9IHRva2Vuc1t0b2tlbi50b2tlbnNJbmRleF07XG5cbiAgICAgIG9wZW4udHlwZSA9ICd0ZXh0JztcbiAgICAgIG9wZW4udmFsdWUgPSBsaXRlcmFsO1xuICAgICAgb3Blbi5vdXRwdXQgPSBzYWZlT3V0cHV0IHx8IHV0aWxzLmVzY2FwZVJlZ2V4KGxpdGVyYWwpO1xuXG4gICAgICBmb3IgKGxldCBpID0gdG9rZW4udG9rZW5zSW5kZXggKyAxOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRva2Vuc1tpXS52YWx1ZSA9ICcnO1xuICAgICAgICB0b2tlbnNbaV0ub3V0cHV0ID0gJyc7XG4gICAgICAgIGRlbGV0ZSB0b2tlbnNbaV0uc3VmZml4O1xuICAgICAgfVxuXG4gICAgICBzdGF0ZS5vdXRwdXQgPSB0b2tlbi5vdXRwdXQgKyBvcGVuLm91dHB1dDtcbiAgICAgIHN0YXRlLmJhY2t0cmFjayA9IHRydWU7XG5cbiAgICAgIHB1c2goeyB0eXBlOiAncGFyZW4nLCBleHRnbG9iOiB0cnVlLCB2YWx1ZSwgb3V0cHV0OiAnJyB9KTtcbiAgICAgIGRlY3JlbWVudCgncGFyZW5zJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IG91dHB1dCA9IHRva2VuLmNsb3NlICsgKG9wdHMuY2FwdHVyZSA/ICcpJyA6ICcnKTtcbiAgICBsZXQgcmVzdDtcblxuICAgIGlmICh0b2tlbi50eXBlID09PSAnbmVnYXRlJykge1xuICAgICAgbGV0IGV4dGdsb2JTdGFyID0gc3RhcjtcblxuICAgICAgaWYgKHRva2VuLmlubmVyICYmIHRva2VuLmlubmVyLmxlbmd0aCA+IDEgJiYgdG9rZW4uaW5uZXIuaW5jbHVkZXMoJy8nKSkge1xuICAgICAgICBleHRnbG9iU3RhciA9IGdsb2JzdGFyKG9wdHMpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXh0Z2xvYlN0YXIgIT09IHN0YXIgfHwgZW9zKCkgfHwgL15cXCkrJC8udGVzdChyZW1haW5pbmcoKSkpIHtcbiAgICAgICAgb3V0cHV0ID0gdG9rZW4uY2xvc2UgPSBgKSQpKSR7ZXh0Z2xvYlN0YXJ9YDtcbiAgICAgIH1cblxuICAgICAgaWYgKHRva2VuLmlubmVyLmluY2x1ZGVzKCcqJykgJiYgKHJlc3QgPSByZW1haW5pbmcoKSkgJiYgL15cXC5bXlxcXFwvLl0rJC8udGVzdChyZXN0KSkge1xuICAgICAgICAvLyBBbnkgbm9uLW1hZ2ljYWwgc3RyaW5nIChgLnRzYCkgb3IgZXZlbiBuZXN0ZWQgZXhwcmVzc2lvbiAoYC57dHMsdHN4fWApIGNhbiBmb2xsb3cgYWZ0ZXIgdGhlIGNsb3NpbmcgcGFyZW50aGVzaXMuXG4gICAgICAgIC8vIEluIHRoaXMgY2FzZSwgd2UgbmVlZCB0byBwYXJzZSB0aGUgc3RyaW5nIGFuZCB1c2UgaXQgaW4gdGhlIG91dHB1dCBvZiB0aGUgb3JpZ2luYWwgcGF0dGVybi5cbiAgICAgICAgLy8gU3VpdGFibGUgcGF0dGVybnM6IGAvISgqLmQpLnRzYCwgYC8hKCouZCkue3RzLHRzeH1gLCBgKiovISgqLWRiZykuQChqcylgLlxuICAgICAgICAvL1xuICAgICAgICAvLyBEaXNhYmxpbmcgdGhlIGBmYXN0cGF0aHNgIG9wdGlvbiBkdWUgdG8gYSBwcm9ibGVtIHdpdGggcGFyc2luZyBzdHJpbmdzIGFzIGAudHNgIGluIHRoZSBwYXR0ZXJuIGxpa2UgYCoqLyEoKi5kKS50c2AuXG4gICAgICAgIGNvbnN0IGV4cHJlc3Npb24gPSBwYXJzZShyZXN0LCB7IC4uLm9wdGlvbnMsIGZhc3RwYXRoczogZmFsc2UgfSkub3V0cHV0O1xuXG4gICAgICAgIG91dHB1dCA9IHRva2VuLmNsb3NlID0gYCkke2V4cHJlc3Npb259KSR7ZXh0Z2xvYlN0YXJ9KWA7XG4gICAgICB9XG5cbiAgICAgIGlmICh0b2tlbi5wcmV2LnR5cGUgPT09ICdib3MnKSB7XG4gICAgICAgIHN0YXRlLm5lZ2F0ZWRFeHRnbG9iID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwdXNoKHsgdHlwZTogJ3BhcmVuJywgZXh0Z2xvYjogdHJ1ZSwgdmFsdWUsIG91dHB1dCB9KTtcbiAgICBkZWNyZW1lbnQoJ3BhcmVucycpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGYXN0IHBhdGhzXG4gICAqL1xuXG4gIGlmIChvcHRzLmZhc3RwYXRocyAhPT0gZmFsc2UgJiYgIS8oXlsqIV18Wy8oKVtcXF17fVwiXSkvLnRlc3QoaW5wdXQpKSB7XG4gICAgbGV0IGJhY2tzbGFzaGVzID0gZmFsc2U7XG5cbiAgICBsZXQgb3V0cHV0ID0gaW5wdXQucmVwbGFjZShSRUdFWF9TUEVDSUFMX0NIQVJTX0JBQ0tSRUYsIChtLCBlc2MsIGNoYXJzLCBmaXJzdCwgcmVzdCwgaW5kZXgpID0+IHtcbiAgICAgIGlmIChmaXJzdCA9PT0gJ1xcXFwnKSB7XG4gICAgICAgIGJhY2tzbGFzaGVzID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIG07XG4gICAgICB9XG5cbiAgICAgIGlmIChmaXJzdCA9PT0gJz8nKSB7XG4gICAgICAgIGlmIChlc2MpIHtcbiAgICAgICAgICByZXR1cm4gZXNjICsgZmlyc3QgKyAocmVzdCA/IFFNQVJLLnJlcGVhdChyZXN0Lmxlbmd0aCkgOiAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHFtYXJrTm9Eb3QgKyAocmVzdCA/IFFNQVJLLnJlcGVhdChyZXN0Lmxlbmd0aCkgOiAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFFNQVJLLnJlcGVhdChjaGFycy5sZW5ndGgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmlyc3QgPT09ICcuJykge1xuICAgICAgICByZXR1cm4gRE9UX0xJVEVSQUwucmVwZWF0KGNoYXJzLmxlbmd0aCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaXJzdCA9PT0gJyonKSB7XG4gICAgICAgIGlmIChlc2MpIHtcbiAgICAgICAgICByZXR1cm4gZXNjICsgZmlyc3QgKyAocmVzdCA/IHN0YXIgOiAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0YXI7XG4gICAgICB9XG4gICAgICByZXR1cm4gZXNjID8gbSA6IGBcXFxcJHttfWA7XG4gICAgfSk7XG5cbiAgICBpZiAoYmFja3NsYXNoZXMgPT09IHRydWUpIHtcbiAgICAgIGlmIChvcHRzLnVuZXNjYXBlID09PSB0cnVlKSB7XG4gICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKC9cXFxcL2csICcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKC9cXFxcKy9nLCBtID0+IHtcbiAgICAgICAgICByZXR1cm4gbS5sZW5ndGggJSAyID09PSAwID8gJ1xcXFxcXFxcJyA6IChtID8gJ1xcXFwnIDogJycpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAob3V0cHV0ID09PSBpbnB1dCAmJiBvcHRzLmNvbnRhaW5zID09PSB0cnVlKSB7XG4gICAgICBzdGF0ZS5vdXRwdXQgPSBpbnB1dDtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICBzdGF0ZS5vdXRwdXQgPSB1dGlscy53cmFwT3V0cHV0KG91dHB1dCwgc3RhdGUsIG9wdGlvbnMpO1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2tlbml6ZSBpbnB1dCB1bnRpbCB3ZSByZWFjaCBlbmQtb2Ytc3RyaW5nXG4gICAqL1xuXG4gIHdoaWxlICghZW9zKCkpIHtcbiAgICB2YWx1ZSA9IGFkdmFuY2UoKTtcblxuICAgIGlmICh2YWx1ZSA9PT0gJ1xcdTAwMDAnKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFc2NhcGVkIGNoYXJhY3RlcnNcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gJ1xcXFwnKSB7XG4gICAgICBjb25zdCBuZXh0ID0gcGVlaygpO1xuXG4gICAgICBpZiAobmV4dCA9PT0gJy8nICYmIG9wdHMuYmFzaCAhPT0gdHJ1ZSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5leHQgPT09ICcuJyB8fCBuZXh0ID09PSAnOycpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICghbmV4dCkge1xuICAgICAgICB2YWx1ZSArPSAnXFxcXCc7XG4gICAgICAgIHB1c2goeyB0eXBlOiAndGV4dCcsIHZhbHVlIH0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gY29sbGFwc2Ugc2xhc2hlcyB0byByZWR1Y2UgcG90ZW50aWFsIGZvciBleHBsb2l0c1xuICAgICAgY29uc3QgbWF0Y2ggPSAvXlxcXFwrLy5leGVjKHJlbWFpbmluZygpKTtcbiAgICAgIGxldCBzbGFzaGVzID0gMDtcblxuICAgICAgaWYgKG1hdGNoICYmIG1hdGNoWzBdLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgc2xhc2hlcyA9IG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgICAgc3RhdGUuaW5kZXggKz0gc2xhc2hlcztcbiAgICAgICAgaWYgKHNsYXNoZXMgJSAyICE9PSAwKSB7XG4gICAgICAgICAgdmFsdWUgKz0gJ1xcXFwnO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRzLnVuZXNjYXBlID09PSB0cnVlKSB7XG4gICAgICAgIHZhbHVlID0gYWR2YW5jZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgKz0gYWR2YW5jZSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUuYnJhY2tldHMgPT09IDApIHtcbiAgICAgICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWUgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElmIHdlJ3JlIGluc2lkZSBhIHJlZ2V4IGNoYXJhY3RlciBjbGFzcywgY29udGludWVcbiAgICAgKiB1bnRpbCB3ZSByZWFjaCB0aGUgY2xvc2luZyBicmFja2V0LlxuICAgICAqL1xuXG4gICAgaWYgKHN0YXRlLmJyYWNrZXRzID4gMCAmJiAodmFsdWUgIT09ICddJyB8fCBwcmV2LnZhbHVlID09PSAnWycgfHwgcHJldi52YWx1ZSA9PT0gJ1teJykpIHtcbiAgICAgIGlmIChvcHRzLnBvc2l4ICE9PSBmYWxzZSAmJiB2YWx1ZSA9PT0gJzonKSB7XG4gICAgICAgIGNvbnN0IGlubmVyID0gcHJldi52YWx1ZS5zbGljZSgxKTtcbiAgICAgICAgaWYgKGlubmVyLmluY2x1ZGVzKCdbJykpIHtcbiAgICAgICAgICBwcmV2LnBvc2l4ID0gdHJ1ZTtcblxuICAgICAgICAgIGlmIChpbm5lci5pbmNsdWRlcygnOicpKSB7XG4gICAgICAgICAgICBjb25zdCBpZHggPSBwcmV2LnZhbHVlLmxhc3RJbmRleE9mKCdbJyk7XG4gICAgICAgICAgICBjb25zdCBwcmUgPSBwcmV2LnZhbHVlLnNsaWNlKDAsIGlkeCk7XG4gICAgICAgICAgICBjb25zdCByZXN0ID0gcHJldi52YWx1ZS5zbGljZShpZHggKyAyKTtcbiAgICAgICAgICAgIGNvbnN0IHBvc2l4ID0gUE9TSVhfUkVHRVhfU09VUkNFW3Jlc3RdO1xuICAgICAgICAgICAgaWYgKHBvc2l4KSB7XG4gICAgICAgICAgICAgIHByZXYudmFsdWUgPSBwcmUgKyBwb3NpeDtcbiAgICAgICAgICAgICAgc3RhdGUuYmFja3RyYWNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgYWR2YW5jZSgpO1xuXG4gICAgICAgICAgICAgIGlmICghYm9zLm91dHB1dCAmJiB0b2tlbnMuaW5kZXhPZihwcmV2KSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGJvcy5vdXRwdXQgPSBPTkVfQ0hBUjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCh2YWx1ZSA9PT0gJ1snICYmIHBlZWsoKSAhPT0gJzonKSB8fCAodmFsdWUgPT09ICctJyAmJiBwZWVrKCkgPT09ICddJykpIHtcbiAgICAgICAgdmFsdWUgPSBgXFxcXCR7dmFsdWV9YDtcbiAgICAgIH1cblxuICAgICAgaWYgKHZhbHVlID09PSAnXScgJiYgKHByZXYudmFsdWUgPT09ICdbJyB8fCBwcmV2LnZhbHVlID09PSAnW14nKSkge1xuICAgICAgICB2YWx1ZSA9IGBcXFxcJHt2YWx1ZX1gO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0cy5wb3NpeCA9PT0gdHJ1ZSAmJiB2YWx1ZSA9PT0gJyEnICYmIHByZXYudmFsdWUgPT09ICdbJykge1xuICAgICAgICB2YWx1ZSA9ICdeJztcbiAgICAgIH1cblxuICAgICAgcHJldi52YWx1ZSArPSB2YWx1ZTtcbiAgICAgIGFwcGVuZCh7IHZhbHVlIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSWYgd2UncmUgaW5zaWRlIGEgcXVvdGVkIHN0cmluZywgY29udGludWVcbiAgICAgKiB1bnRpbCB3ZSByZWFjaCB0aGUgY2xvc2luZyBkb3VibGUgcXVvdGUuXG4gICAgICovXG5cbiAgICBpZiAoc3RhdGUucXVvdGVzID09PSAxICYmIHZhbHVlICE9PSAnXCInKSB7XG4gICAgICB2YWx1ZSA9IHV0aWxzLmVzY2FwZVJlZ2V4KHZhbHVlKTtcbiAgICAgIHByZXYudmFsdWUgKz0gdmFsdWU7XG4gICAgICBhcHBlbmQoeyB2YWx1ZSB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERvdWJsZSBxdW90ZXNcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gJ1wiJykge1xuICAgICAgc3RhdGUucXVvdGVzID0gc3RhdGUucXVvdGVzID09PSAxID8gMCA6IDE7XG4gICAgICBpZiAob3B0cy5rZWVwUXVvdGVzID09PSB0cnVlKSB7XG4gICAgICAgIHB1c2goeyB0eXBlOiAndGV4dCcsIHZhbHVlIH0pO1xuICAgICAgfVxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyZW50aGVzZXNcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gJygnKSB7XG4gICAgICBpbmNyZW1lbnQoJ3BhcmVucycpO1xuICAgICAgcHVzaCh7IHR5cGU6ICdwYXJlbicsIHZhbHVlIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlID09PSAnKScpIHtcbiAgICAgIGlmIChzdGF0ZS5wYXJlbnMgPT09IDAgJiYgb3B0cy5zdHJpY3RCcmFja2V0cyA9PT0gdHJ1ZSkge1xuICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3Ioc3ludGF4RXJyb3IoJ29wZW5pbmcnLCAnKCcpKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZXh0Z2xvYiA9IGV4dGdsb2JzW2V4dGdsb2JzLmxlbmd0aCAtIDFdO1xuICAgICAgaWYgKGV4dGdsb2IgJiYgc3RhdGUucGFyZW5zID09PSBleHRnbG9iLnBhcmVucyArIDEpIHtcbiAgICAgICAgZXh0Z2xvYkNsb3NlKGV4dGdsb2JzLnBvcCgpKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHB1c2goeyB0eXBlOiAncGFyZW4nLCB2YWx1ZSwgb3V0cHV0OiBzdGF0ZS5wYXJlbnMgPyAnKScgOiAnXFxcXCknIH0pO1xuICAgICAgZGVjcmVtZW50KCdwYXJlbnMnKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNxdWFyZSBicmFja2V0c1xuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlID09PSAnWycpIHtcbiAgICAgIGlmIChvcHRzLm5vYnJhY2tldCA9PT0gdHJ1ZSB8fCAhcmVtYWluaW5nKCkuaW5jbHVkZXMoJ10nKSkge1xuICAgICAgICBpZiAob3B0cy5ub2JyYWNrZXQgIT09IHRydWUgJiYgb3B0cy5zdHJpY3RCcmFja2V0cyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihzeW50YXhFcnJvcignY2xvc2luZycsICddJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFsdWUgPSBgXFxcXCR7dmFsdWV9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluY3JlbWVudCgnYnJhY2tldHMnKTtcbiAgICAgIH1cblxuICAgICAgcHVzaCh7IHR5cGU6ICdicmFja2V0JywgdmFsdWUgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUgPT09ICddJykge1xuICAgICAgaWYgKG9wdHMubm9icmFja2V0ID09PSB0cnVlIHx8IChwcmV2ICYmIHByZXYudHlwZSA9PT0gJ2JyYWNrZXQnICYmIHByZXYudmFsdWUubGVuZ3RoID09PSAxKSkge1xuICAgICAgICBwdXNoKHsgdHlwZTogJ3RleHQnLCB2YWx1ZSwgb3V0cHV0OiBgXFxcXCR7dmFsdWV9YCB9KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZS5icmFja2V0cyA9PT0gMCkge1xuICAgICAgICBpZiAob3B0cy5zdHJpY3RCcmFja2V0cyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihzeW50YXhFcnJvcignb3BlbmluZycsICdbJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWUsIG91dHB1dDogYFxcXFwke3ZhbHVlfWAgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBkZWNyZW1lbnQoJ2JyYWNrZXRzJyk7XG5cbiAgICAgIGNvbnN0IHByZXZWYWx1ZSA9IHByZXYudmFsdWUuc2xpY2UoMSk7XG4gICAgICBpZiAocHJldi5wb3NpeCAhPT0gdHJ1ZSAmJiBwcmV2VmFsdWVbMF0gPT09ICdeJyAmJiAhcHJldlZhbHVlLmluY2x1ZGVzKCcvJykpIHtcbiAgICAgICAgdmFsdWUgPSBgLyR7dmFsdWV9YDtcbiAgICAgIH1cblxuICAgICAgcHJldi52YWx1ZSArPSB2YWx1ZTtcbiAgICAgIGFwcGVuZCh7IHZhbHVlIH0pO1xuXG4gICAgICAvLyB3aGVuIGxpdGVyYWwgYnJhY2tldHMgYXJlIGV4cGxpY2l0bHkgZGlzYWJsZWRcbiAgICAgIC8vIGFzc3VtZSB3ZSBzaG91bGQgbWF0Y2ggd2l0aCBhIHJlZ2V4IGNoYXJhY3RlciBjbGFzc1xuICAgICAgaWYgKG9wdHMubGl0ZXJhbEJyYWNrZXRzID09PSBmYWxzZSB8fCB1dGlscy5oYXNSZWdleENoYXJzKHByZXZWYWx1ZSkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGVzY2FwZWQgPSB1dGlscy5lc2NhcGVSZWdleChwcmV2LnZhbHVlKTtcbiAgICAgIHN0YXRlLm91dHB1dCA9IHN0YXRlLm91dHB1dC5zbGljZSgwLCAtcHJldi52YWx1ZS5sZW5ndGgpO1xuXG4gICAgICAvLyB3aGVuIGxpdGVyYWwgYnJhY2tldHMgYXJlIGV4cGxpY2l0bHkgZW5hYmxlZFxuICAgICAgLy8gYXNzdW1lIHdlIHNob3VsZCBlc2NhcGUgdGhlIGJyYWNrZXRzIHRvIG1hdGNoIGxpdGVyYWwgY2hhcmFjdGVyc1xuICAgICAgaWYgKG9wdHMubGl0ZXJhbEJyYWNrZXRzID09PSB0cnVlKSB7XG4gICAgICAgIHN0YXRlLm91dHB1dCArPSBlc2NhcGVkO1xuICAgICAgICBwcmV2LnZhbHVlID0gZXNjYXBlZDtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIHdoZW4gdGhlIHVzZXIgc3BlY2lmaWVzIG5vdGhpbmcsIHRyeSB0byBtYXRjaCBib3RoXG4gICAgICBwcmV2LnZhbHVlID0gYCgke2NhcHR1cmV9JHtlc2NhcGVkfXwke3ByZXYudmFsdWV9KWA7XG4gICAgICBzdGF0ZS5vdXRwdXQgKz0gcHJldi52YWx1ZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJyYWNlc1xuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlID09PSAneycgJiYgb3B0cy5ub2JyYWNlICE9PSB0cnVlKSB7XG4gICAgICBpbmNyZW1lbnQoJ2JyYWNlcycpO1xuXG4gICAgICBjb25zdCBvcGVuID0ge1xuICAgICAgICB0eXBlOiAnYnJhY2UnLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgb3V0cHV0OiAnKCcsXG4gICAgICAgIG91dHB1dEluZGV4OiBzdGF0ZS5vdXRwdXQubGVuZ3RoLFxuICAgICAgICB0b2tlbnNJbmRleDogc3RhdGUudG9rZW5zLmxlbmd0aFxuICAgICAgfTtcblxuICAgICAgYnJhY2VzLnB1c2gob3Blbik7XG4gICAgICBwdXNoKG9wZW4pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlID09PSAnfScpIHtcbiAgICAgIGNvbnN0IGJyYWNlID0gYnJhY2VzW2JyYWNlcy5sZW5ndGggLSAxXTtcblxuICAgICAgaWYgKG9wdHMubm9icmFjZSA9PT0gdHJ1ZSB8fCAhYnJhY2UpIHtcbiAgICAgICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWUsIG91dHB1dDogdmFsdWUgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBsZXQgb3V0cHV0ID0gJyknO1xuXG4gICAgICBpZiAoYnJhY2UuZG90cyA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBhcnIgPSB0b2tlbnMuc2xpY2UoKTtcbiAgICAgICAgY29uc3QgcmFuZ2UgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gYXJyLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgdG9rZW5zLnBvcCgpO1xuICAgICAgICAgIGlmIChhcnJbaV0udHlwZSA9PT0gJ2JyYWNlJykge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhcnJbaV0udHlwZSAhPT0gJ2RvdHMnKSB7XG4gICAgICAgICAgICByYW5nZS51bnNoaWZ0KGFycltpXS52YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgb3V0cHV0ID0gZXhwYW5kUmFuZ2UocmFuZ2UsIG9wdHMpO1xuICAgICAgICBzdGF0ZS5iYWNrdHJhY2sgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoYnJhY2UuY29tbWEgIT09IHRydWUgJiYgYnJhY2UuZG90cyAhPT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBvdXQgPSBzdGF0ZS5vdXRwdXQuc2xpY2UoMCwgYnJhY2Uub3V0cHV0SW5kZXgpO1xuICAgICAgICBjb25zdCB0b2tzID0gc3RhdGUudG9rZW5zLnNsaWNlKGJyYWNlLnRva2Vuc0luZGV4KTtcbiAgICAgICAgYnJhY2UudmFsdWUgPSBicmFjZS5vdXRwdXQgPSAnXFxcXHsnO1xuICAgICAgICB2YWx1ZSA9IG91dHB1dCA9ICdcXFxcfSc7XG4gICAgICAgIHN0YXRlLm91dHB1dCA9IG91dDtcbiAgICAgICAgZm9yIChjb25zdCB0IG9mIHRva3MpIHtcbiAgICAgICAgICBzdGF0ZS5vdXRwdXQgKz0gKHQub3V0cHV0IHx8IHQudmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHB1c2goeyB0eXBlOiAnYnJhY2UnLCB2YWx1ZSwgb3V0cHV0IH0pO1xuICAgICAgZGVjcmVtZW50KCdicmFjZXMnKTtcbiAgICAgIGJyYWNlcy5wb3AoKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBpcGVzXG4gICAgICovXG5cbiAgICBpZiAodmFsdWUgPT09ICd8Jykge1xuICAgICAgaWYgKGV4dGdsb2JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZXh0Z2xvYnNbZXh0Z2xvYnMubGVuZ3RoIC0gMV0uY29uZGl0aW9ucysrO1xuICAgICAgfVxuICAgICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWUgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb21tYXNcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gJywnKSB7XG4gICAgICBsZXQgb3V0cHV0ID0gdmFsdWU7XG5cbiAgICAgIGNvbnN0IGJyYWNlID0gYnJhY2VzW2JyYWNlcy5sZW5ndGggLSAxXTtcbiAgICAgIGlmIChicmFjZSAmJiBzdGFja1tzdGFjay5sZW5ndGggLSAxXSA9PT0gJ2JyYWNlcycpIHtcbiAgICAgICAgYnJhY2UuY29tbWEgPSB0cnVlO1xuICAgICAgICBvdXRwdXQgPSAnfCc7XG4gICAgICB9XG5cbiAgICAgIHB1c2goeyB0eXBlOiAnY29tbWEnLCB2YWx1ZSwgb3V0cHV0IH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2xhc2hlc1xuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlID09PSAnLycpIHtcbiAgICAgIC8vIGlmIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGdsb2IgaXMgXCIuL1wiLCBhZHZhbmNlIHRoZSBzdGFydFxuICAgICAgLy8gdG8gdGhlIGN1cnJlbnQgaW5kZXgsIGFuZCBkb24ndCBhZGQgdGhlIFwiLi9cIiBjaGFyYWN0ZXJzXG4gICAgICAvLyB0byB0aGUgc3RhdGUuIFRoaXMgZ3JlYXRseSBzaW1wbGlmaWVzIGxvb2tiZWhpbmRzIHdoZW5cbiAgICAgIC8vIGNoZWNraW5nIGZvciBCT1MgY2hhcmFjdGVycyBsaWtlIFwiIVwiIGFuZCBcIi5cIiAobm90IFwiLi9cIilcbiAgICAgIGlmIChwcmV2LnR5cGUgPT09ICdkb3QnICYmIHN0YXRlLmluZGV4ID09PSBzdGF0ZS5zdGFydCArIDEpIHtcbiAgICAgICAgc3RhdGUuc3RhcnQgPSBzdGF0ZS5pbmRleCArIDE7XG4gICAgICAgIHN0YXRlLmNvbnN1bWVkID0gJyc7XG4gICAgICAgIHN0YXRlLm91dHB1dCA9ICcnO1xuICAgICAgICB0b2tlbnMucG9wKCk7XG4gICAgICAgIHByZXYgPSBib3M7IC8vIHJlc2V0IFwicHJldlwiIHRvIHRoZSBmaXJzdCB0b2tlblxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgcHVzaCh7IHR5cGU6ICdzbGFzaCcsIHZhbHVlLCBvdXRwdXQ6IFNMQVNIX0xJVEVSQUwgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEb3RzXG4gICAgICovXG5cbiAgICBpZiAodmFsdWUgPT09ICcuJykge1xuICAgICAgaWYgKHN0YXRlLmJyYWNlcyA+IDAgJiYgcHJldi50eXBlID09PSAnZG90Jykge1xuICAgICAgICBpZiAocHJldi52YWx1ZSA9PT0gJy4nKSBwcmV2Lm91dHB1dCA9IERPVF9MSVRFUkFMO1xuICAgICAgICBjb25zdCBicmFjZSA9IGJyYWNlc1ticmFjZXMubGVuZ3RoIC0gMV07XG4gICAgICAgIHByZXYudHlwZSA9ICdkb3RzJztcbiAgICAgICAgcHJldi5vdXRwdXQgKz0gdmFsdWU7XG4gICAgICAgIHByZXYudmFsdWUgKz0gdmFsdWU7XG4gICAgICAgIGJyYWNlLmRvdHMgPSB0cnVlO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKChzdGF0ZS5icmFjZXMgKyBzdGF0ZS5wYXJlbnMpID09PSAwICYmIHByZXYudHlwZSAhPT0gJ2JvcycgJiYgcHJldi50eXBlICE9PSAnc2xhc2gnKSB7XG4gICAgICAgIHB1c2goeyB0eXBlOiAndGV4dCcsIHZhbHVlLCBvdXRwdXQ6IERPVF9MSVRFUkFMIH0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgcHVzaCh7IHR5cGU6ICdkb3QnLCB2YWx1ZSwgb3V0cHV0OiBET1RfTElURVJBTCB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFF1ZXN0aW9uIG1hcmtzXG4gICAgICovXG5cbiAgICBpZiAodmFsdWUgPT09ICc/Jykge1xuICAgICAgY29uc3QgaXNHcm91cCA9IHByZXYgJiYgcHJldi52YWx1ZSA9PT0gJygnO1xuICAgICAgaWYgKCFpc0dyb3VwICYmIG9wdHMubm9leHRnbG9iICE9PSB0cnVlICYmIHBlZWsoKSA9PT0gJygnICYmIHBlZWsoMikgIT09ICc/Jykge1xuICAgICAgICBleHRnbG9iT3BlbigncW1hcmsnLCB2YWx1ZSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJldiAmJiBwcmV2LnR5cGUgPT09ICdwYXJlbicpIHtcbiAgICAgICAgY29uc3QgbmV4dCA9IHBlZWsoKTtcbiAgICAgICAgbGV0IG91dHB1dCA9IHZhbHVlO1xuXG4gICAgICAgIGlmIChuZXh0ID09PSAnPCcgJiYgIXV0aWxzLnN1cHBvcnRzTG9va2JlaGluZHMoKSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm9kZS5qcyB2MTAgb3IgaGlnaGVyIGlzIHJlcXVpcmVkIGZvciByZWdleCBsb29rYmVoaW5kcycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKChwcmV2LnZhbHVlID09PSAnKCcgJiYgIS9bIT08Ol0vLnRlc3QobmV4dCkpIHx8IChuZXh0ID09PSAnPCcgJiYgIS88KFshPV18XFx3Kz4pLy50ZXN0KHJlbWFpbmluZygpKSkpIHtcbiAgICAgICAgICBvdXRwdXQgPSBgXFxcXCR7dmFsdWV9YDtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1c2goeyB0eXBlOiAndGV4dCcsIHZhbHVlLCBvdXRwdXQgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0cy5kb3QgIT09IHRydWUgJiYgKHByZXYudHlwZSA9PT0gJ3NsYXNoJyB8fCBwcmV2LnR5cGUgPT09ICdib3MnKSkge1xuICAgICAgICBwdXNoKHsgdHlwZTogJ3FtYXJrJywgdmFsdWUsIG91dHB1dDogUU1BUktfTk9fRE9UIH0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgcHVzaCh7IHR5cGU6ICdxbWFyaycsIHZhbHVlLCBvdXRwdXQ6IFFNQVJLIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXhjbGFtYXRpb25cbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gJyEnKSB7XG4gICAgICBpZiAob3B0cy5ub2V4dGdsb2IgIT09IHRydWUgJiYgcGVlaygpID09PSAnKCcpIHtcbiAgICAgICAgaWYgKHBlZWsoMikgIT09ICc/JyB8fCAhL1shPTw6XS8udGVzdChwZWVrKDMpKSkge1xuICAgICAgICAgIGV4dGdsb2JPcGVuKCduZWdhdGUnLCB2YWx1ZSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG9wdHMubm9uZWdhdGUgIT09IHRydWUgJiYgc3RhdGUuaW5kZXggPT09IDApIHtcbiAgICAgICAgbmVnYXRlKCk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBsdXNcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gJysnKSB7XG4gICAgICBpZiAob3B0cy5ub2V4dGdsb2IgIT09IHRydWUgJiYgcGVlaygpID09PSAnKCcgJiYgcGVlaygyKSAhPT0gJz8nKSB7XG4gICAgICAgIGV4dGdsb2JPcGVuKCdwbHVzJywgdmFsdWUpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKChwcmV2ICYmIHByZXYudmFsdWUgPT09ICcoJykgfHwgb3B0cy5yZWdleCA9PT0gZmFsc2UpIHtcbiAgICAgICAgcHVzaCh7IHR5cGU6ICdwbHVzJywgdmFsdWUsIG91dHB1dDogUExVU19MSVRFUkFMIH0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKChwcmV2ICYmIChwcmV2LnR5cGUgPT09ICdicmFja2V0JyB8fCBwcmV2LnR5cGUgPT09ICdwYXJlbicgfHwgcHJldi50eXBlID09PSAnYnJhY2UnKSkgfHwgc3RhdGUucGFyZW5zID4gMCkge1xuICAgICAgICBwdXNoKHsgdHlwZTogJ3BsdXMnLCB2YWx1ZSB9KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHB1c2goeyB0eXBlOiAncGx1cycsIHZhbHVlOiBQTFVTX0xJVEVSQUwgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQbGFpbiB0ZXh0XG4gICAgICovXG5cbiAgICBpZiAodmFsdWUgPT09ICdAJykge1xuICAgICAgaWYgKG9wdHMubm9leHRnbG9iICE9PSB0cnVlICYmIHBlZWsoKSA9PT0gJygnICYmIHBlZWsoMikgIT09ICc/Jykge1xuICAgICAgICBwdXNoKHsgdHlwZTogJ2F0JywgZXh0Z2xvYjogdHJ1ZSwgdmFsdWUsIG91dHB1dDogJycgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBwdXNoKHsgdHlwZTogJ3RleHQnLCB2YWx1ZSB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBsYWluIHRleHRcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSAhPT0gJyonKSB7XG4gICAgICBpZiAodmFsdWUgPT09ICckJyB8fCB2YWx1ZSA9PT0gJ14nKSB7XG4gICAgICAgIHZhbHVlID0gYFxcXFwke3ZhbHVlfWA7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1hdGNoID0gUkVHRVhfTk9OX1NQRUNJQUxfQ0hBUlMuZXhlYyhyZW1haW5pbmcoKSk7XG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgdmFsdWUgKz0gbWF0Y2hbMF07XG4gICAgICAgIHN0YXRlLmluZGV4ICs9IG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgIH1cblxuICAgICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWUgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdGFyc1xuICAgICAqL1xuXG4gICAgaWYgKHByZXYgJiYgKHByZXYudHlwZSA9PT0gJ2dsb2JzdGFyJyB8fCBwcmV2LnN0YXIgPT09IHRydWUpKSB7XG4gICAgICBwcmV2LnR5cGUgPSAnc3Rhcic7XG4gICAgICBwcmV2LnN0YXIgPSB0cnVlO1xuICAgICAgcHJldi52YWx1ZSArPSB2YWx1ZTtcbiAgICAgIHByZXYub3V0cHV0ID0gc3RhcjtcbiAgICAgIHN0YXRlLmJhY2t0cmFjayA9IHRydWU7XG4gICAgICBzdGF0ZS5nbG9ic3RhciA9IHRydWU7XG4gICAgICBjb25zdW1lKHZhbHVlKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGxldCByZXN0ID0gcmVtYWluaW5nKCk7XG4gICAgaWYgKG9wdHMubm9leHRnbG9iICE9PSB0cnVlICYmIC9eXFwoW14/XS8udGVzdChyZXN0KSkge1xuICAgICAgZXh0Z2xvYk9wZW4oJ3N0YXInLCB2YWx1ZSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAocHJldi50eXBlID09PSAnc3RhcicpIHtcbiAgICAgIGlmIChvcHRzLm5vZ2xvYnN0YXIgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3VtZSh2YWx1ZSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwcmlvciA9IHByZXYucHJldjtcbiAgICAgIGNvbnN0IGJlZm9yZSA9IHByaW9yLnByZXY7XG4gICAgICBjb25zdCBpc1N0YXJ0ID0gcHJpb3IudHlwZSA9PT0gJ3NsYXNoJyB8fCBwcmlvci50eXBlID09PSAnYm9zJztcbiAgICAgIGNvbnN0IGFmdGVyU3RhciA9IGJlZm9yZSAmJiAoYmVmb3JlLnR5cGUgPT09ICdzdGFyJyB8fCBiZWZvcmUudHlwZSA9PT0gJ2dsb2JzdGFyJyk7XG5cbiAgICAgIGlmIChvcHRzLmJhc2ggPT09IHRydWUgJiYgKCFpc1N0YXJ0IHx8IChyZXN0WzBdICYmIHJlc3RbMF0gIT09ICcvJykpKSB7XG4gICAgICAgIHB1c2goeyB0eXBlOiAnc3RhcicsIHZhbHVlLCBvdXRwdXQ6ICcnIH0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaXNCcmFjZSA9IHN0YXRlLmJyYWNlcyA+IDAgJiYgKHByaW9yLnR5cGUgPT09ICdjb21tYScgfHwgcHJpb3IudHlwZSA9PT0gJ2JyYWNlJyk7XG4gICAgICBjb25zdCBpc0V4dGdsb2IgPSBleHRnbG9icy5sZW5ndGggJiYgKHByaW9yLnR5cGUgPT09ICdwaXBlJyB8fCBwcmlvci50eXBlID09PSAncGFyZW4nKTtcbiAgICAgIGlmICghaXNTdGFydCAmJiBwcmlvci50eXBlICE9PSAncGFyZW4nICYmICFpc0JyYWNlICYmICFpc0V4dGdsb2IpIHtcbiAgICAgICAgcHVzaCh7IHR5cGU6ICdzdGFyJywgdmFsdWUsIG91dHB1dDogJycgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBzdHJpcCBjb25zZWN1dGl2ZSBgLyoqL2BcbiAgICAgIHdoaWxlIChyZXN0LnNsaWNlKDAsIDMpID09PSAnLyoqJykge1xuICAgICAgICBjb25zdCBhZnRlciA9IGlucHV0W3N0YXRlLmluZGV4ICsgNF07XG4gICAgICAgIGlmIChhZnRlciAmJiBhZnRlciAhPT0gJy8nKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdCA9IHJlc3Quc2xpY2UoMyk7XG4gICAgICAgIGNvbnN1bWUoJy8qKicsIDMpO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJpb3IudHlwZSA9PT0gJ2JvcycgJiYgZW9zKCkpIHtcbiAgICAgICAgcHJldi50eXBlID0gJ2dsb2JzdGFyJztcbiAgICAgICAgcHJldi52YWx1ZSArPSB2YWx1ZTtcbiAgICAgICAgcHJldi5vdXRwdXQgPSBnbG9ic3RhcihvcHRzKTtcbiAgICAgICAgc3RhdGUub3V0cHV0ID0gcHJldi5vdXRwdXQ7XG4gICAgICAgIHN0YXRlLmdsb2JzdGFyID0gdHJ1ZTtcbiAgICAgICAgY29uc3VtZSh2YWx1ZSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJpb3IudHlwZSA9PT0gJ3NsYXNoJyAmJiBwcmlvci5wcmV2LnR5cGUgIT09ICdib3MnICYmICFhZnRlclN0YXIgJiYgZW9zKCkpIHtcbiAgICAgICAgc3RhdGUub3V0cHV0ID0gc3RhdGUub3V0cHV0LnNsaWNlKDAsIC0ocHJpb3Iub3V0cHV0ICsgcHJldi5vdXRwdXQpLmxlbmd0aCk7XG4gICAgICAgIHByaW9yLm91dHB1dCA9IGAoPzoke3ByaW9yLm91dHB1dH1gO1xuXG4gICAgICAgIHByZXYudHlwZSA9ICdnbG9ic3Rhcic7XG4gICAgICAgIHByZXYub3V0cHV0ID0gZ2xvYnN0YXIob3B0cykgKyAob3B0cy5zdHJpY3RTbGFzaGVzID8gJyknIDogJ3wkKScpO1xuICAgICAgICBwcmV2LnZhbHVlICs9IHZhbHVlO1xuICAgICAgICBzdGF0ZS5nbG9ic3RhciA9IHRydWU7XG4gICAgICAgIHN0YXRlLm91dHB1dCArPSBwcmlvci5vdXRwdXQgKyBwcmV2Lm91dHB1dDtcbiAgICAgICAgY29uc3VtZSh2YWx1ZSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJpb3IudHlwZSA9PT0gJ3NsYXNoJyAmJiBwcmlvci5wcmV2LnR5cGUgIT09ICdib3MnICYmIHJlc3RbMF0gPT09ICcvJykge1xuICAgICAgICBjb25zdCBlbmQgPSByZXN0WzFdICE9PSB2b2lkIDAgPyAnfCQnIDogJyc7XG5cbiAgICAgICAgc3RhdGUub3V0cHV0ID0gc3RhdGUub3V0cHV0LnNsaWNlKDAsIC0ocHJpb3Iub3V0cHV0ICsgcHJldi5vdXRwdXQpLmxlbmd0aCk7XG4gICAgICAgIHByaW9yLm91dHB1dCA9IGAoPzoke3ByaW9yLm91dHB1dH1gO1xuXG4gICAgICAgIHByZXYudHlwZSA9ICdnbG9ic3Rhcic7XG4gICAgICAgIHByZXYub3V0cHV0ID0gYCR7Z2xvYnN0YXIob3B0cyl9JHtTTEFTSF9MSVRFUkFMfXwke1NMQVNIX0xJVEVSQUx9JHtlbmR9KWA7XG4gICAgICAgIHByZXYudmFsdWUgKz0gdmFsdWU7XG5cbiAgICAgICAgc3RhdGUub3V0cHV0ICs9IHByaW9yLm91dHB1dCArIHByZXYub3V0cHV0O1xuICAgICAgICBzdGF0ZS5nbG9ic3RhciA9IHRydWU7XG5cbiAgICAgICAgY29uc3VtZSh2YWx1ZSArIGFkdmFuY2UoKSk7XG5cbiAgICAgICAgcHVzaCh7IHR5cGU6ICdzbGFzaCcsIHZhbHVlOiAnLycsIG91dHB1dDogJycgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJpb3IudHlwZSA9PT0gJ2JvcycgJiYgcmVzdFswXSA9PT0gJy8nKSB7XG4gICAgICAgIHByZXYudHlwZSA9ICdnbG9ic3Rhcic7XG4gICAgICAgIHByZXYudmFsdWUgKz0gdmFsdWU7XG4gICAgICAgIHByZXYub3V0cHV0ID0gYCg/Ol58JHtTTEFTSF9MSVRFUkFMfXwke2dsb2JzdGFyKG9wdHMpfSR7U0xBU0hfTElURVJBTH0pYDtcbiAgICAgICAgc3RhdGUub3V0cHV0ID0gcHJldi5vdXRwdXQ7XG4gICAgICAgIHN0YXRlLmdsb2JzdGFyID0gdHJ1ZTtcbiAgICAgICAgY29uc3VtZSh2YWx1ZSArIGFkdmFuY2UoKSk7XG4gICAgICAgIHB1c2goeyB0eXBlOiAnc2xhc2gnLCB2YWx1ZTogJy8nLCBvdXRwdXQ6ICcnIH0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gcmVtb3ZlIHNpbmdsZSBzdGFyIGZyb20gb3V0cHV0XG4gICAgICBzdGF0ZS5vdXRwdXQgPSBzdGF0ZS5vdXRwdXQuc2xpY2UoMCwgLXByZXYub3V0cHV0Lmxlbmd0aCk7XG5cbiAgICAgIC8vIHJlc2V0IHByZXZpb3VzIHRva2VuIHRvIGdsb2JzdGFyXG4gICAgICBwcmV2LnR5cGUgPSAnZ2xvYnN0YXInO1xuICAgICAgcHJldi5vdXRwdXQgPSBnbG9ic3RhcihvcHRzKTtcbiAgICAgIHByZXYudmFsdWUgKz0gdmFsdWU7XG5cbiAgICAgIC8vIHJlc2V0IG91dHB1dCB3aXRoIGdsb2JzdGFyXG4gICAgICBzdGF0ZS5vdXRwdXQgKz0gcHJldi5vdXRwdXQ7XG4gICAgICBzdGF0ZS5nbG9ic3RhciA9IHRydWU7XG4gICAgICBjb25zdW1lKHZhbHVlKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGNvbnN0IHRva2VuID0geyB0eXBlOiAnc3RhcicsIHZhbHVlLCBvdXRwdXQ6IHN0YXIgfTtcblxuICAgIGlmIChvcHRzLmJhc2ggPT09IHRydWUpIHtcbiAgICAgIHRva2VuLm91dHB1dCA9ICcuKj8nO1xuICAgICAgaWYgKHByZXYudHlwZSA9PT0gJ2JvcycgfHwgcHJldi50eXBlID09PSAnc2xhc2gnKSB7XG4gICAgICAgIHRva2VuLm91dHB1dCA9IG5vZG90ICsgdG9rZW4ub3V0cHV0O1xuICAgICAgfVxuICAgICAgcHVzaCh0b2tlbik7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAocHJldiAmJiAocHJldi50eXBlID09PSAnYnJhY2tldCcgfHwgcHJldi50eXBlID09PSAncGFyZW4nKSAmJiBvcHRzLnJlZ2V4ID09PSB0cnVlKSB7XG4gICAgICB0b2tlbi5vdXRwdXQgPSB2YWx1ZTtcbiAgICAgIHB1c2godG9rZW4pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKHN0YXRlLmluZGV4ID09PSBzdGF0ZS5zdGFydCB8fCBwcmV2LnR5cGUgPT09ICdzbGFzaCcgfHwgcHJldi50eXBlID09PSAnZG90Jykge1xuICAgICAgaWYgKHByZXYudHlwZSA9PT0gJ2RvdCcpIHtcbiAgICAgICAgc3RhdGUub3V0cHV0ICs9IE5PX0RPVF9TTEFTSDtcbiAgICAgICAgcHJldi5vdXRwdXQgKz0gTk9fRE9UX1NMQVNIO1xuXG4gICAgICB9IGVsc2UgaWYgKG9wdHMuZG90ID09PSB0cnVlKSB7XG4gICAgICAgIHN0YXRlLm91dHB1dCArPSBOT19ET1RTX1NMQVNIO1xuICAgICAgICBwcmV2Lm91dHB1dCArPSBOT19ET1RTX1NMQVNIO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGF0ZS5vdXRwdXQgKz0gbm9kb3Q7XG4gICAgICAgIHByZXYub3V0cHV0ICs9IG5vZG90O1xuICAgICAgfVxuXG4gICAgICBpZiAocGVlaygpICE9PSAnKicpIHtcbiAgICAgICAgc3RhdGUub3V0cHV0ICs9IE9ORV9DSEFSO1xuICAgICAgICBwcmV2Lm91dHB1dCArPSBPTkVfQ0hBUjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwdXNoKHRva2VuKTtcbiAgfVxuXG4gIHdoaWxlIChzdGF0ZS5icmFja2V0cyA+IDApIHtcbiAgICBpZiAob3B0cy5zdHJpY3RCcmFja2V0cyA9PT0gdHJ1ZSkgdGhyb3cgbmV3IFN5bnRheEVycm9yKHN5bnRheEVycm9yKCdjbG9zaW5nJywgJ10nKSk7XG4gICAgc3RhdGUub3V0cHV0ID0gdXRpbHMuZXNjYXBlTGFzdChzdGF0ZS5vdXRwdXQsICdbJyk7XG4gICAgZGVjcmVtZW50KCdicmFja2V0cycpO1xuICB9XG5cbiAgd2hpbGUgKHN0YXRlLnBhcmVucyA+IDApIHtcbiAgICBpZiAob3B0cy5zdHJpY3RCcmFja2V0cyA9PT0gdHJ1ZSkgdGhyb3cgbmV3IFN5bnRheEVycm9yKHN5bnRheEVycm9yKCdjbG9zaW5nJywgJyknKSk7XG4gICAgc3RhdGUub3V0cHV0ID0gdXRpbHMuZXNjYXBlTGFzdChzdGF0ZS5vdXRwdXQsICcoJyk7XG4gICAgZGVjcmVtZW50KCdwYXJlbnMnKTtcbiAgfVxuXG4gIHdoaWxlIChzdGF0ZS5icmFjZXMgPiAwKSB7XG4gICAgaWYgKG9wdHMuc3RyaWN0QnJhY2tldHMgPT09IHRydWUpIHRocm93IG5ldyBTeW50YXhFcnJvcihzeW50YXhFcnJvcignY2xvc2luZycsICd9JykpO1xuICAgIHN0YXRlLm91dHB1dCA9IHV0aWxzLmVzY2FwZUxhc3Qoc3RhdGUub3V0cHV0LCAneycpO1xuICAgIGRlY3JlbWVudCgnYnJhY2VzJyk7XG4gIH1cblxuICBpZiAob3B0cy5zdHJpY3RTbGFzaGVzICE9PSB0cnVlICYmIChwcmV2LnR5cGUgPT09ICdzdGFyJyB8fCBwcmV2LnR5cGUgPT09ICdicmFja2V0JykpIHtcbiAgICBwdXNoKHsgdHlwZTogJ21heWJlX3NsYXNoJywgdmFsdWU6ICcnLCBvdXRwdXQ6IGAke1NMQVNIX0xJVEVSQUx9P2AgfSk7XG4gIH1cblxuICAvLyByZWJ1aWxkIHRoZSBvdXRwdXQgaWYgd2UgaGFkIHRvIGJhY2t0cmFjayBhdCBhbnkgcG9pbnRcbiAgaWYgKHN0YXRlLmJhY2t0cmFjayA9PT0gdHJ1ZSkge1xuICAgIHN0YXRlLm91dHB1dCA9ICcnO1xuXG4gICAgZm9yIChjb25zdCB0b2tlbiBvZiBzdGF0ZS50b2tlbnMpIHtcbiAgICAgIHN0YXRlLm91dHB1dCArPSB0b2tlbi5vdXRwdXQgIT0gbnVsbCA/IHRva2VuLm91dHB1dCA6IHRva2VuLnZhbHVlO1xuXG4gICAgICBpZiAodG9rZW4uc3VmZml4KSB7XG4gICAgICAgIHN0YXRlLm91dHB1dCArPSB0b2tlbi5zdWZmaXg7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHN0YXRlO1xufTtcblxuLyoqXG4gKiBGYXN0IHBhdGhzIGZvciBjcmVhdGluZyByZWd1bGFyIGV4cHJlc3Npb25zIGZvciBjb21tb24gZ2xvYiBwYXR0ZXJucy5cbiAqIFRoaXMgY2FuIHNpZ25pZmljYW50bHkgc3BlZWQgdXAgcHJvY2Vzc2luZyBhbmQgaGFzIHZlcnkgbGl0dGxlIGRvd25zaWRlXG4gKiBpbXBhY3Qgd2hlbiBub25lIG9mIHRoZSBmYXN0IHBhdGhzIG1hdGNoLlxuICovXG5cbnBhcnNlLmZhc3RwYXRocyA9IChpbnB1dCwgb3B0aW9ucykgPT4ge1xuICBjb25zdCBvcHRzID0geyAuLi5vcHRpb25zIH07XG4gIGNvbnN0IG1heCA9IHR5cGVvZiBvcHRzLm1heExlbmd0aCA9PT0gJ251bWJlcicgPyBNYXRoLm1pbihNQVhfTEVOR1RILCBvcHRzLm1heExlbmd0aCkgOiBNQVhfTEVOR1RIO1xuICBjb25zdCBsZW4gPSBpbnB1dC5sZW5ndGg7XG4gIGlmIChsZW4gPiBtYXgpIHtcbiAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYElucHV0IGxlbmd0aDogJHtsZW59LCBleGNlZWRzIG1heGltdW0gYWxsb3dlZCBsZW5ndGg6ICR7bWF4fWApO1xuICB9XG5cbiAgaW5wdXQgPSBSRVBMQUNFTUVOVFNbaW5wdXRdIHx8IGlucHV0O1xuICBjb25zdCB3aW4zMiA9IHV0aWxzLmlzV2luZG93cyhvcHRpb25zKTtcblxuICAvLyBjcmVhdGUgY29uc3RhbnRzIGJhc2VkIG9uIHBsYXRmb3JtLCBmb3Igd2luZG93cyBvciBwb3NpeFxuICBjb25zdCB7XG4gICAgRE9UX0xJVEVSQUwsXG4gICAgU0xBU0hfTElURVJBTCxcbiAgICBPTkVfQ0hBUixcbiAgICBET1RTX1NMQVNILFxuICAgIE5PX0RPVCxcbiAgICBOT19ET1RTLFxuICAgIE5PX0RPVFNfU0xBU0gsXG4gICAgU1RBUixcbiAgICBTVEFSVF9BTkNIT1JcbiAgfSA9IGNvbnN0YW50cy5nbG9iQ2hhcnMod2luMzIpO1xuXG4gIGNvbnN0IG5vZG90ID0gb3B0cy5kb3QgPyBOT19ET1RTIDogTk9fRE9UO1xuICBjb25zdCBzbGFzaERvdCA9IG9wdHMuZG90ID8gTk9fRE9UU19TTEFTSCA6IE5PX0RPVDtcbiAgY29uc3QgY2FwdHVyZSA9IG9wdHMuY2FwdHVyZSA/ICcnIDogJz86JztcbiAgY29uc3Qgc3RhdGUgPSB7IG5lZ2F0ZWQ6IGZhbHNlLCBwcmVmaXg6ICcnIH07XG4gIGxldCBzdGFyID0gb3B0cy5iYXNoID09PSB0cnVlID8gJy4qPycgOiBTVEFSO1xuXG4gIGlmIChvcHRzLmNhcHR1cmUpIHtcbiAgICBzdGFyID0gYCgke3N0YXJ9KWA7XG4gIH1cblxuICBjb25zdCBnbG9ic3RhciA9IG9wdHMgPT4ge1xuICAgIGlmIChvcHRzLm5vZ2xvYnN0YXIgPT09IHRydWUpIHJldHVybiBzdGFyO1xuICAgIHJldHVybiBgKCR7Y2FwdHVyZX0oPzooPyEke1NUQVJUX0FOQ0hPUn0ke29wdHMuZG90ID8gRE9UU19TTEFTSCA6IERPVF9MSVRFUkFMfSkuKSo/KWA7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlID0gc3RyID0+IHtcbiAgICBzd2l0Y2ggKHN0cikge1xuICAgICAgY2FzZSAnKic6XG4gICAgICAgIHJldHVybiBgJHtub2RvdH0ke09ORV9DSEFSfSR7c3Rhcn1gO1xuXG4gICAgICBjYXNlICcuKic6XG4gICAgICAgIHJldHVybiBgJHtET1RfTElURVJBTH0ke09ORV9DSEFSfSR7c3Rhcn1gO1xuXG4gICAgICBjYXNlICcqLionOlxuICAgICAgICByZXR1cm4gYCR7bm9kb3R9JHtzdGFyfSR7RE9UX0xJVEVSQUx9JHtPTkVfQ0hBUn0ke3N0YXJ9YDtcblxuICAgICAgY2FzZSAnKi8qJzpcbiAgICAgICAgcmV0dXJuIGAke25vZG90fSR7c3Rhcn0ke1NMQVNIX0xJVEVSQUx9JHtPTkVfQ0hBUn0ke3NsYXNoRG90fSR7c3Rhcn1gO1xuXG4gICAgICBjYXNlICcqKic6XG4gICAgICAgIHJldHVybiBub2RvdCArIGdsb2JzdGFyKG9wdHMpO1xuXG4gICAgICBjYXNlICcqKi8qJzpcbiAgICAgICAgcmV0dXJuIGAoPzoke25vZG90fSR7Z2xvYnN0YXIob3B0cyl9JHtTTEFTSF9MSVRFUkFMfSk/JHtzbGFzaERvdH0ke09ORV9DSEFSfSR7c3Rhcn1gO1xuXG4gICAgICBjYXNlICcqKi8qLionOlxuICAgICAgICByZXR1cm4gYCg/OiR7bm9kb3R9JHtnbG9ic3RhcihvcHRzKX0ke1NMQVNIX0xJVEVSQUx9KT8ke3NsYXNoRG90fSR7c3Rhcn0ke0RPVF9MSVRFUkFMfSR7T05FX0NIQVJ9JHtzdGFyfWA7XG5cbiAgICAgIGNhc2UgJyoqLy4qJzpcbiAgICAgICAgcmV0dXJuIGAoPzoke25vZG90fSR7Z2xvYnN0YXIob3B0cyl9JHtTTEFTSF9MSVRFUkFMfSk/JHtET1RfTElURVJBTH0ke09ORV9DSEFSfSR7c3Rhcn1gO1xuXG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGNvbnN0IG1hdGNoID0gL14oLio/KVxcLihcXHcrKSQvLmV4ZWMoc3RyKTtcbiAgICAgICAgaWYgKCFtYXRjaCkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IGNyZWF0ZShtYXRjaFsxXSk7XG4gICAgICAgIGlmICghc291cmNlKSByZXR1cm47XG5cbiAgICAgICAgcmV0dXJuIHNvdXJjZSArIERPVF9MSVRFUkFMICsgbWF0Y2hbMl07XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IG91dHB1dCA9IHV0aWxzLnJlbW92ZVByZWZpeChpbnB1dCwgc3RhdGUpO1xuICBsZXQgc291cmNlID0gY3JlYXRlKG91dHB1dCk7XG5cbiAgaWYgKHNvdXJjZSAmJiBvcHRzLnN0cmljdFNsYXNoZXMgIT09IHRydWUpIHtcbiAgICBzb3VyY2UgKz0gYCR7U0xBU0hfTElURVJBTH0/YDtcbiAgfVxuXG4gIHJldHVybiBzb3VyY2U7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcnNlO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IHNjYW4gPSByZXF1aXJlKCcuL3NjYW4nKTtcbmNvbnN0IHBhcnNlID0gcmVxdWlyZSgnLi9wYXJzZScpO1xuY29uc3QgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5jb25zdCBjb25zdGFudHMgPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuY29uc3QgaXNPYmplY3QgPSB2YWwgPT4gdmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KHZhbCk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hdGNoZXIgZnVuY3Rpb24gZnJvbSBvbmUgb3IgbW9yZSBnbG9iIHBhdHRlcm5zLiBUaGVcbiAqIHJldHVybmVkIGZ1bmN0aW9uIHRha2VzIGEgc3RyaW5nIHRvIG1hdGNoIGFzIGl0cyBmaXJzdCBhcmd1bWVudCxcbiAqIGFuZCByZXR1cm5zIHRydWUgaWYgdGhlIHN0cmluZyBpcyBhIG1hdGNoLiBUaGUgcmV0dXJuZWQgbWF0Y2hlclxuICogZnVuY3Rpb24gYWxzbyB0YWtlcyBhIGJvb2xlYW4gYXMgdGhlIHNlY29uZCBhcmd1bWVudCB0aGF0LCB3aGVuIHRydWUsXG4gKiByZXR1cm5zIGFuIG9iamVjdCB3aXRoIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24uXG4gKlxuICogYGBganNcbiAqIGNvbnN0IHBpY29tYXRjaCA9IHJlcXVpcmUoJ3BpY29tYXRjaCcpO1xuICogLy8gcGljb21hdGNoKGdsb2JbLCBvcHRpb25zXSk7XG4gKlxuICogY29uc3QgaXNNYXRjaCA9IHBpY29tYXRjaCgnKi4hKCphKScpO1xuICogY29uc29sZS5sb2coaXNNYXRjaCgnYS5hJykpOyAvLz0+IGZhbHNlXG4gKiBjb25zb2xlLmxvZyhpc01hdGNoKCdhLmInKSk7IC8vPT4gdHJ1ZVxuICogYGBgXG4gKiBAbmFtZSBwaWNvbWF0Y2hcbiAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBgZ2xvYnNgIE9uZSBvciBtb3JlIGdsb2IgcGF0dGVybnMuXG4gKiBAcGFyYW0ge09iamVjdD19IGBvcHRpb25zYFxuICogQHJldHVybiB7RnVuY3Rpb249fSBSZXR1cm5zIGEgbWF0Y2hlciBmdW5jdGlvbi5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuY29uc3QgcGljb21hdGNoID0gKGdsb2IsIG9wdGlvbnMsIHJldHVyblN0YXRlID0gZmFsc2UpID0+IHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoZ2xvYikpIHtcbiAgICBjb25zdCBmbnMgPSBnbG9iLm1hcChpbnB1dCA9PiBwaWNvbWF0Y2goaW5wdXQsIG9wdGlvbnMsIHJldHVyblN0YXRlKSk7XG4gICAgY29uc3QgYXJyYXlNYXRjaGVyID0gc3RyID0+IHtcbiAgICAgIGZvciAoY29uc3QgaXNNYXRjaCBvZiBmbnMpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSBpc01hdGNoKHN0cik7XG4gICAgICAgIGlmIChzdGF0ZSkgcmV0dXJuIHN0YXRlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgcmV0dXJuIGFycmF5TWF0Y2hlcjtcbiAgfVxuXG4gIGNvbnN0IGlzU3RhdGUgPSBpc09iamVjdChnbG9iKSAmJiBnbG9iLnRva2VucyAmJiBnbG9iLmlucHV0O1xuXG4gIGlmIChnbG9iID09PSAnJyB8fCAodHlwZW9mIGdsb2IgIT09ICdzdHJpbmcnICYmICFpc1N0YXRlKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHBhdHRlcm4gdG8gYmUgYSBub24tZW1wdHkgc3RyaW5nJyk7XG4gIH1cblxuICBjb25zdCBvcHRzID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3QgcG9zaXggPSB1dGlscy5pc1dpbmRvd3Mob3B0aW9ucyk7XG4gIGNvbnN0IHJlZ2V4ID0gaXNTdGF0ZVxuICAgID8gcGljb21hdGNoLmNvbXBpbGVSZShnbG9iLCBvcHRpb25zKVxuICAgIDogcGljb21hdGNoLm1ha2VSZShnbG9iLCBvcHRpb25zLCBmYWxzZSwgdHJ1ZSk7XG5cbiAgY29uc3Qgc3RhdGUgPSByZWdleC5zdGF0ZTtcbiAgZGVsZXRlIHJlZ2V4LnN0YXRlO1xuXG4gIGxldCBpc0lnbm9yZWQgPSAoKSA9PiBmYWxzZTtcbiAgaWYgKG9wdHMuaWdub3JlKSB7XG4gICAgY29uc3QgaWdub3JlT3B0cyA9IHsgLi4ub3B0aW9ucywgaWdub3JlOiBudWxsLCBvbk1hdGNoOiBudWxsLCBvblJlc3VsdDogbnVsbCB9O1xuICAgIGlzSWdub3JlZCA9IHBpY29tYXRjaChvcHRzLmlnbm9yZSwgaWdub3JlT3B0cywgcmV0dXJuU3RhdGUpO1xuICB9XG5cbiAgY29uc3QgbWF0Y2hlciA9IChpbnB1dCwgcmV0dXJuT2JqZWN0ID0gZmFsc2UpID0+IHtcbiAgICBjb25zdCB7IGlzTWF0Y2gsIG1hdGNoLCBvdXRwdXQgfSA9IHBpY29tYXRjaC50ZXN0KGlucHV0LCByZWdleCwgb3B0aW9ucywgeyBnbG9iLCBwb3NpeCB9KTtcbiAgICBjb25zdCByZXN1bHQgPSB7IGdsb2IsIHN0YXRlLCByZWdleCwgcG9zaXgsIGlucHV0LCBvdXRwdXQsIG1hdGNoLCBpc01hdGNoIH07XG5cbiAgICBpZiAodHlwZW9mIG9wdHMub25SZXN1bHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG9wdHMub25SZXN1bHQocmVzdWx0KTtcbiAgICB9XG5cbiAgICBpZiAoaXNNYXRjaCA9PT0gZmFsc2UpIHtcbiAgICAgIHJlc3VsdC5pc01hdGNoID0gZmFsc2U7XG4gICAgICByZXR1cm4gcmV0dXJuT2JqZWN0ID8gcmVzdWx0IDogZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGlzSWdub3JlZChpbnB1dCkpIHtcbiAgICAgIGlmICh0eXBlb2Ygb3B0cy5vbklnbm9yZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvcHRzLm9uSWdub3JlKHJlc3VsdCk7XG4gICAgICB9XG4gICAgICByZXN1bHQuaXNNYXRjaCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHJldHVybk9iamVjdCA/IHJlc3VsdCA6IGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb3B0cy5vbk1hdGNoID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBvcHRzLm9uTWF0Y2gocmVzdWx0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVybk9iamVjdCA/IHJlc3VsdCA6IHRydWU7XG4gIH07XG5cbiAgaWYgKHJldHVyblN0YXRlKSB7XG4gICAgbWF0Y2hlci5zdGF0ZSA9IHN0YXRlO1xuICB9XG5cbiAgcmV0dXJuIG1hdGNoZXI7XG59O1xuXG4vKipcbiAqIFRlc3QgYGlucHV0YCB3aXRoIHRoZSBnaXZlbiBgcmVnZXhgLiBUaGlzIGlzIHVzZWQgYnkgdGhlIG1haW5cbiAqIGBwaWNvbWF0Y2goKWAgZnVuY3Rpb24gdG8gdGVzdCB0aGUgaW5wdXQgc3RyaW5nLlxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCBwaWNvbWF0Y2ggPSByZXF1aXJlKCdwaWNvbWF0Y2gnKTtcbiAqIC8vIHBpY29tYXRjaC50ZXN0KGlucHV0LCByZWdleFssIG9wdGlvbnNdKTtcbiAqXG4gKiBjb25zb2xlLmxvZyhwaWNvbWF0Y2gudGVzdCgnZm9vL2JhcicsIC9eKD86KFteL10qPylcXC8oW14vXSo/KSkkLykpO1xuICogLy8geyBpc01hdGNoOiB0cnVlLCBtYXRjaDogWyAnZm9vLycsICdmb28nLCAnYmFyJyBdLCBvdXRwdXQ6ICdmb28vYmFyJyB9XG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBgaW5wdXRgIFN0cmluZyB0byB0ZXN0LlxuICogQHBhcmFtIHtSZWdFeHB9IGByZWdleGBcbiAqIEByZXR1cm4ge09iamVjdH0gUmV0dXJucyBhbiBvYmplY3Qgd2l0aCBtYXRjaGluZyBpbmZvLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5waWNvbWF0Y2gudGVzdCA9IChpbnB1dCwgcmVnZXgsIG9wdGlvbnMsIHsgZ2xvYiwgcG9zaXggfSA9IHt9KSA9PiB7XG4gIGlmICh0eXBlb2YgaW5wdXQgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgaW5wdXQgdG8gYmUgYSBzdHJpbmcnKTtcbiAgfVxuXG4gIGlmIChpbnB1dCA9PT0gJycpIHtcbiAgICByZXR1cm4geyBpc01hdGNoOiBmYWxzZSwgb3V0cHV0OiAnJyB9O1xuICB9XG5cbiAgY29uc3Qgb3B0cyA9IG9wdGlvbnMgfHwge307XG4gIGNvbnN0IGZvcm1hdCA9IG9wdHMuZm9ybWF0IHx8IChwb3NpeCA/IHV0aWxzLnRvUG9zaXhTbGFzaGVzIDogbnVsbCk7XG4gIGxldCBtYXRjaCA9IGlucHV0ID09PSBnbG9iO1xuICBsZXQgb3V0cHV0ID0gKG1hdGNoICYmIGZvcm1hdCkgPyBmb3JtYXQoaW5wdXQpIDogaW5wdXQ7XG5cbiAgaWYgKG1hdGNoID09PSBmYWxzZSkge1xuICAgIG91dHB1dCA9IGZvcm1hdCA/IGZvcm1hdChpbnB1dCkgOiBpbnB1dDtcbiAgICBtYXRjaCA9IG91dHB1dCA9PT0gZ2xvYjtcbiAgfVxuXG4gIGlmIChtYXRjaCA9PT0gZmFsc2UgfHwgb3B0cy5jYXB0dXJlID09PSB0cnVlKSB7XG4gICAgaWYgKG9wdHMubWF0Y2hCYXNlID09PSB0cnVlIHx8IG9wdHMuYmFzZW5hbWUgPT09IHRydWUpIHtcbiAgICAgIG1hdGNoID0gcGljb21hdGNoLm1hdGNoQmFzZShpbnB1dCwgcmVnZXgsIG9wdGlvbnMsIHBvc2l4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWF0Y2ggPSByZWdleC5leGVjKG91dHB1dCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgaXNNYXRjaDogQm9vbGVhbihtYXRjaCksIG1hdGNoLCBvdXRwdXQgfTtcbn07XG5cbi8qKlxuICogTWF0Y2ggdGhlIGJhc2VuYW1lIG9mIGEgZmlsZXBhdGguXG4gKlxuICogYGBganNcbiAqIGNvbnN0IHBpY29tYXRjaCA9IHJlcXVpcmUoJ3BpY29tYXRjaCcpO1xuICogLy8gcGljb21hdGNoLm1hdGNoQmFzZShpbnB1dCwgZ2xvYlssIG9wdGlvbnNdKTtcbiAqIGNvbnNvbGUubG9nKHBpY29tYXRjaC5tYXRjaEJhc2UoJ2Zvby9iYXIuanMnLCAnKi5qcycpOyAvLyB0cnVlXG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBgaW5wdXRgIFN0cmluZyB0byB0ZXN0LlxuICogQHBhcmFtIHtSZWdFeHB8U3RyaW5nfSBgZ2xvYmAgR2xvYiBwYXR0ZXJuIG9yIHJlZ2V4IGNyZWF0ZWQgYnkgWy5tYWtlUmVdKCNtYWtlUmUpLlxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucGljb21hdGNoLm1hdGNoQmFzZSA9IChpbnB1dCwgZ2xvYiwgb3B0aW9ucywgcG9zaXggPSB1dGlscy5pc1dpbmRvd3Mob3B0aW9ucykpID0+IHtcbiAgY29uc3QgcmVnZXggPSBnbG9iIGluc3RhbmNlb2YgUmVnRXhwID8gZ2xvYiA6IHBpY29tYXRjaC5tYWtlUmUoZ2xvYiwgb3B0aW9ucyk7XG4gIHJldHVybiByZWdleC50ZXN0KHBhdGguYmFzZW5hbWUoaW5wdXQpKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmICoqYW55Kiogb2YgdGhlIGdpdmVuIGdsb2IgYHBhdHRlcm5zYCBtYXRjaCB0aGUgc3BlY2lmaWVkIGBzdHJpbmdgLlxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCBwaWNvbWF0Y2ggPSByZXF1aXJlKCdwaWNvbWF0Y2gnKTtcbiAqIC8vIHBpY29tYXRjaC5pc01hdGNoKHN0cmluZywgcGF0dGVybnNbLCBvcHRpb25zXSk7XG4gKlxuICogY29uc29sZS5sb2cocGljb21hdGNoLmlzTWF0Y2goJ2EuYScsIFsnYi4qJywgJyouYSddKSk7IC8vPT4gdHJ1ZVxuICogY29uc29sZS5sb2cocGljb21hdGNoLmlzTWF0Y2goJ2EuYScsICdiLionKSk7IC8vPT4gZmFsc2VcbiAqIGBgYFxuICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IHN0ciBUaGUgc3RyaW5nIHRvIHRlc3QuXG4gKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gcGF0dGVybnMgT25lIG9yIG1vcmUgZ2xvYiBwYXR0ZXJucyB0byB1c2UgZm9yIG1hdGNoaW5nLlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBTZWUgYXZhaWxhYmxlIFtvcHRpb25zXSgjb3B0aW9ucykuXG4gKiBAcmV0dXJuIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgYW55IHBhdHRlcm5zIG1hdGNoIGBzdHJgXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnBpY29tYXRjaC5pc01hdGNoID0gKHN0ciwgcGF0dGVybnMsIG9wdGlvbnMpID0+IHBpY29tYXRjaChwYXR0ZXJucywgb3B0aW9ucykoc3RyKTtcblxuLyoqXG4gKiBQYXJzZSBhIGdsb2IgcGF0dGVybiB0byBjcmVhdGUgdGhlIHNvdXJjZSBzdHJpbmcgZm9yIGEgcmVndWxhclxuICogZXhwcmVzc2lvbi5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgcGljb21hdGNoID0gcmVxdWlyZSgncGljb21hdGNoJyk7XG4gKiBjb25zdCByZXN1bHQgPSBwaWNvbWF0Y2gucGFyc2UocGF0dGVyblssIG9wdGlvbnNdKTtcbiAqIGBgYFxuICogQHBhcmFtIHtTdHJpbmd9IGBwYXR0ZXJuYFxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYFxuICogQHJldHVybiB7T2JqZWN0fSBSZXR1cm5zIGFuIG9iamVjdCB3aXRoIHVzZWZ1bCBwcm9wZXJ0aWVzIGFuZCBvdXRwdXQgdG8gYmUgdXNlZCBhcyBhIHJlZ2V4IHNvdXJjZSBzdHJpbmcuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnBpY29tYXRjaC5wYXJzZSA9IChwYXR0ZXJuLCBvcHRpb25zKSA9PiB7XG4gIGlmIChBcnJheS5pc0FycmF5KHBhdHRlcm4pKSByZXR1cm4gcGF0dGVybi5tYXAocCA9PiBwaWNvbWF0Y2gucGFyc2UocCwgb3B0aW9ucykpO1xuICByZXR1cm4gcGFyc2UocGF0dGVybiwgeyAuLi5vcHRpb25zLCBmYXN0cGF0aHM6IGZhbHNlIH0pO1xufTtcblxuLyoqXG4gKiBTY2FuIGEgZ2xvYiBwYXR0ZXJuIHRvIHNlcGFyYXRlIHRoZSBwYXR0ZXJuIGludG8gc2VnbWVudHMuXG4gKlxuICogYGBganNcbiAqIGNvbnN0IHBpY29tYXRjaCA9IHJlcXVpcmUoJ3BpY29tYXRjaCcpO1xuICogLy8gcGljb21hdGNoLnNjYW4oaW5wdXRbLCBvcHRpb25zXSk7XG4gKlxuICogY29uc3QgcmVzdWx0ID0gcGljb21hdGNoLnNjYW4oJyEuL2Zvby8qLmpzJyk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICogeyBwcmVmaXg6ICchLi8nLFxuICogICBpbnB1dDogJyEuL2Zvby8qLmpzJyxcbiAqICAgc3RhcnQ6IDMsXG4gKiAgIGJhc2U6ICdmb28nLFxuICogICBnbG9iOiAnKi5qcycsXG4gKiAgIGlzQnJhY2U6IGZhbHNlLFxuICogICBpc0JyYWNrZXQ6IGZhbHNlLFxuICogICBpc0dsb2I6IHRydWUsXG4gKiAgIGlzRXh0Z2xvYjogZmFsc2UsXG4gKiAgIGlzR2xvYnN0YXI6IGZhbHNlLFxuICogICBuZWdhdGVkOiB0cnVlIH1cbiAqIGBgYFxuICogQHBhcmFtIHtTdHJpbmd9IGBpbnB1dGAgR2xvYiBwYXR0ZXJuIHRvIHNjYW4uXG4gKiBAcGFyYW0ge09iamVjdH0gYG9wdGlvbnNgXG4gKiBAcmV0dXJuIHtPYmplY3R9IFJldHVybnMgYW4gb2JqZWN0IHdpdGhcbiAqIEBhcGkgcHVibGljXG4gKi9cblxucGljb21hdGNoLnNjYW4gPSAoaW5wdXQsIG9wdGlvbnMpID0+IHNjYW4oaW5wdXQsIG9wdGlvbnMpO1xuXG4vKipcbiAqIENvbXBpbGUgYSByZWd1bGFyIGV4cHJlc3Npb24gZnJvbSB0aGUgYHN0YXRlYCBvYmplY3QgcmV0dXJuZWQgYnkgdGhlXG4gKiBbcGFyc2UoKV0oI3BhcnNlKSBtZXRob2QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGBzdGF0ZWBcbiAqIEBwYXJhbSB7T2JqZWN0fSBgb3B0aW9uc2BcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gYHJldHVybk91dHB1dGAgSW50ZW5kZWQgZm9yIGltcGxlbWVudG9ycywgdGhpcyBhcmd1bWVudCBhbGxvd3MgeW91IHRvIHJldHVybiB0aGUgcmF3IG91dHB1dCBmcm9tIHRoZSBwYXJzZXIuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGByZXR1cm5TdGF0ZWAgQWRkcyB0aGUgc3RhdGUgdG8gYSBgc3RhdGVgIHByb3BlcnR5IG9uIHRoZSByZXR1cm5lZCByZWdleC4gVXNlZnVsIGZvciBpbXBsZW1lbnRvcnMgYW5kIGRlYnVnZ2luZy5cbiAqIEByZXR1cm4ge1JlZ0V4cH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucGljb21hdGNoLmNvbXBpbGVSZSA9IChzdGF0ZSwgb3B0aW9ucywgcmV0dXJuT3V0cHV0ID0gZmFsc2UsIHJldHVyblN0YXRlID0gZmFsc2UpID0+IHtcbiAgaWYgKHJldHVybk91dHB1dCA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiBzdGF0ZS5vdXRwdXQ7XG4gIH1cblxuICBjb25zdCBvcHRzID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3QgcHJlcGVuZCA9IG9wdHMuY29udGFpbnMgPyAnJyA6ICdeJztcbiAgY29uc3QgYXBwZW5kID0gb3B0cy5jb250YWlucyA/ICcnIDogJyQnO1xuXG4gIGxldCBzb3VyY2UgPSBgJHtwcmVwZW5kfSg/OiR7c3RhdGUub3V0cHV0fSkke2FwcGVuZH1gO1xuICBpZiAoc3RhdGUgJiYgc3RhdGUubmVnYXRlZCA9PT0gdHJ1ZSkge1xuICAgIHNvdXJjZSA9IGBeKD8hJHtzb3VyY2V9KS4qJGA7XG4gIH1cblxuICBjb25zdCByZWdleCA9IHBpY29tYXRjaC50b1JlZ2V4KHNvdXJjZSwgb3B0aW9ucyk7XG4gIGlmIChyZXR1cm5TdGF0ZSA9PT0gdHJ1ZSkge1xuICAgIHJlZ2V4LnN0YXRlID0gc3RhdGU7XG4gIH1cblxuICByZXR1cm4gcmVnZXg7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBmcm9tIGEgcGFyc2VkIGdsb2IgcGF0dGVybi5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgcGljb21hdGNoID0gcmVxdWlyZSgncGljb21hdGNoJyk7XG4gKiBjb25zdCBzdGF0ZSA9IHBpY29tYXRjaC5wYXJzZSgnKi5qcycpO1xuICogLy8gcGljb21hdGNoLmNvbXBpbGVSZShzdGF0ZVssIG9wdGlvbnNdKTtcbiAqXG4gKiBjb25zb2xlLmxvZyhwaWNvbWF0Y2guY29tcGlsZVJlKHN0YXRlKSk7XG4gKiAvLz0+IC9eKD86KD8hXFwuKSg/PS4pW14vXSo/XFwuanMpJC9cbiAqIGBgYFxuICogQHBhcmFtIHtTdHJpbmd9IGBzdGF0ZWAgVGhlIG9iamVjdCByZXR1cm5lZCBmcm9tIHRoZSBgLnBhcnNlYCBtZXRob2QuXG4gKiBAcGFyYW0ge09iamVjdH0gYG9wdGlvbnNgXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGByZXR1cm5PdXRwdXRgIEltcGxlbWVudG9ycyBtYXkgdXNlIHRoaXMgYXJndW1lbnQgdG8gcmV0dXJuIHRoZSBjb21waWxlZCBvdXRwdXQsIGluc3RlYWQgb2YgYSByZWd1bGFyIGV4cHJlc3Npb24uIFRoaXMgaXMgbm90IGV4cG9zZWQgb24gdGhlIG9wdGlvbnMgdG8gcHJldmVudCBlbmQtdXNlcnMgZnJvbSBtdXRhdGluZyB0aGUgcmVzdWx0LlxuICogQHBhcmFtIHtCb29sZWFufSBgcmV0dXJuU3RhdGVgIEltcGxlbWVudG9ycyBtYXkgdXNlIHRoaXMgYXJndW1lbnQgdG8gcmV0dXJuIHRoZSBzdGF0ZSBmcm9tIHRoZSBwYXJzZWQgZ2xvYiB3aXRoIHRoZSByZXR1cm5lZCByZWd1bGFyIGV4cHJlc3Npb24uXG4gKiBAcmV0dXJuIHtSZWdFeHB9IFJldHVybnMgYSByZWdleCBjcmVhdGVkIGZyb20gdGhlIGdpdmVuIHBhdHRlcm4uXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnBpY29tYXRjaC5tYWtlUmUgPSAoaW5wdXQsIG9wdGlvbnMgPSB7fSwgcmV0dXJuT3V0cHV0ID0gZmFsc2UsIHJldHVyblN0YXRlID0gZmFsc2UpID0+IHtcbiAgaWYgKCFpbnB1dCB8fCB0eXBlb2YgaW5wdXQgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBub24tZW1wdHkgc3RyaW5nJyk7XG4gIH1cblxuICBsZXQgcGFyc2VkID0geyBuZWdhdGVkOiBmYWxzZSwgZmFzdHBhdGhzOiB0cnVlIH07XG5cbiAgaWYgKG9wdGlvbnMuZmFzdHBhdGhzICE9PSBmYWxzZSAmJiAoaW5wdXRbMF0gPT09ICcuJyB8fCBpbnB1dFswXSA9PT0gJyonKSkge1xuICAgIHBhcnNlZC5vdXRwdXQgPSBwYXJzZS5mYXN0cGF0aHMoaW5wdXQsIG9wdGlvbnMpO1xuICB9XG5cbiAgaWYgKCFwYXJzZWQub3V0cHV0KSB7XG4gICAgcGFyc2VkID0gcGFyc2UoaW5wdXQsIG9wdGlvbnMpO1xuICB9XG5cbiAgcmV0dXJuIHBpY29tYXRjaC5jb21waWxlUmUocGFyc2VkLCBvcHRpb25zLCByZXR1cm5PdXRwdXQsIHJldHVyblN0YXRlKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGEgcmVndWxhciBleHByZXNzaW9uIGZyb20gdGhlIGdpdmVuIHJlZ2V4IHNvdXJjZSBzdHJpbmcuXG4gKlxuICogYGBganNcbiAqIGNvbnN0IHBpY29tYXRjaCA9IHJlcXVpcmUoJ3BpY29tYXRjaCcpO1xuICogLy8gcGljb21hdGNoLnRvUmVnZXgoc291cmNlWywgb3B0aW9uc10pO1xuICpcbiAqIGNvbnN0IHsgb3V0cHV0IH0gPSBwaWNvbWF0Y2gucGFyc2UoJyouanMnKTtcbiAqIGNvbnNvbGUubG9nKHBpY29tYXRjaC50b1JlZ2V4KG91dHB1dCkpO1xuICogLy89PiAvXig/Oig/IVxcLikoPz0uKVteL10qP1xcLmpzKSQvXG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBgc291cmNlYCBSZWd1bGFyIGV4cHJlc3Npb24gc291cmNlIHN0cmluZy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBgb3B0aW9uc2BcbiAqIEByZXR1cm4ge1JlZ0V4cH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucGljb21hdGNoLnRvUmVnZXggPSAoc291cmNlLCBvcHRpb25zKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3Qgb3B0cyA9IG9wdGlvbnMgfHwge307XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoc291cmNlLCBvcHRzLmZsYWdzIHx8IChvcHRzLm5vY2FzZSA/ICdpJyA6ICcnKSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuZGVidWcgPT09IHRydWUpIHRocm93IGVycjtcbiAgICByZXR1cm4gLyReLztcbiAgfVxufTtcblxuLyoqXG4gKiBQaWNvbWF0Y2ggY29uc3RhbnRzLlxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5cbnBpY29tYXRjaC5jb25zdGFudHMgPSBjb25zdGFudHM7XG5cbi8qKlxuICogRXhwb3NlIFwicGljb21hdGNoXCJcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBpY29tYXRjaDtcbiIsICIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvcGljb21hdGNoJyk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuY29uc3QgYnJhY2VzID0gcmVxdWlyZSgnYnJhY2VzJyk7XG5jb25zdCBwaWNvbWF0Y2ggPSByZXF1aXJlKCdwaWNvbWF0Y2gnKTtcbmNvbnN0IHV0aWxzID0gcmVxdWlyZSgncGljb21hdGNoL2xpYi91dGlscycpO1xuXG5jb25zdCBpc0VtcHR5U3RyaW5nID0gdiA9PiB2ID09PSAnJyB8fCB2ID09PSAnLi8nO1xuY29uc3QgaGFzQnJhY2VzID0gdiA9PiB7XG4gIGNvbnN0IGluZGV4ID0gdi5pbmRleE9mKCd7Jyk7XG4gIHJldHVybiBpbmRleCA+IC0xICYmIHYuaW5kZXhPZignfScsIGluZGV4KSA+IC0xO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIGFycmF5IG9mIHN0cmluZ3MgdGhhdCBtYXRjaCBvbmUgb3IgbW9yZSBnbG9iIHBhdHRlcm5zLlxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCBtbSA9IHJlcXVpcmUoJ21pY3JvbWF0Y2gnKTtcbiAqIC8vIG1tKGxpc3QsIHBhdHRlcm5zWywgb3B0aW9uc10pO1xuICpcbiAqIGNvbnNvbGUubG9nKG1tKFsnYS5qcycsICdhLnR4dCddLCBbJyouanMnXSkpO1xuICogLy89PiBbICdhLmpzJyBdXG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfEFycmF5PHN0cmluZz59IGBsaXN0YCBMaXN0IG9mIHN0cmluZ3MgdG8gbWF0Y2guXG4gKiBAcGFyYW0ge1N0cmluZ3xBcnJheTxzdHJpbmc+fSBgcGF0dGVybnNgIE9uZSBvciBtb3JlIGdsb2IgcGF0dGVybnMgdG8gdXNlIGZvciBtYXRjaGluZy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBgb3B0aW9uc2AgU2VlIGF2YWlsYWJsZSBbb3B0aW9uc10oI29wdGlvbnMpXG4gKiBAcmV0dXJuIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiBtYXRjaGVzXG4gKiBAc3VtbWFyeSBmYWxzZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5jb25zdCBtaWNyb21hdGNoID0gKGxpc3QsIHBhdHRlcm5zLCBvcHRpb25zKSA9PiB7XG4gIHBhdHRlcm5zID0gW10uY29uY2F0KHBhdHRlcm5zKTtcbiAgbGlzdCA9IFtdLmNvbmNhdChsaXN0KTtcblxuICBsZXQgb21pdCA9IG5ldyBTZXQoKTtcbiAgbGV0IGtlZXAgPSBuZXcgU2V0KCk7XG4gIGxldCBpdGVtcyA9IG5ldyBTZXQoKTtcbiAgbGV0IG5lZ2F0aXZlcyA9IDA7XG5cbiAgbGV0IG9uUmVzdWx0ID0gc3RhdGUgPT4ge1xuICAgIGl0ZW1zLmFkZChzdGF0ZS5vdXRwdXQpO1xuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMub25SZXN1bHQpIHtcbiAgICAgIG9wdGlvbnMub25SZXN1bHQoc3RhdGUpO1xuICAgIH1cbiAgfTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHBhdHRlcm5zLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGlzTWF0Y2ggPSBwaWNvbWF0Y2goU3RyaW5nKHBhdHRlcm5zW2ldKSwgeyAuLi5vcHRpb25zLCBvblJlc3VsdCB9LCB0cnVlKTtcbiAgICBsZXQgbmVnYXRlZCA9IGlzTWF0Y2guc3RhdGUubmVnYXRlZCB8fCBpc01hdGNoLnN0YXRlLm5lZ2F0ZWRFeHRnbG9iO1xuICAgIGlmIChuZWdhdGVkKSBuZWdhdGl2ZXMrKztcblxuICAgIGZvciAobGV0IGl0ZW0gb2YgbGlzdCkge1xuICAgICAgbGV0IG1hdGNoZWQgPSBpc01hdGNoKGl0ZW0sIHRydWUpO1xuXG4gICAgICBsZXQgbWF0Y2ggPSBuZWdhdGVkID8gIW1hdGNoZWQuaXNNYXRjaCA6IG1hdGNoZWQuaXNNYXRjaDtcbiAgICAgIGlmICghbWF0Y2gpIGNvbnRpbnVlO1xuXG4gICAgICBpZiAobmVnYXRlZCkge1xuICAgICAgICBvbWl0LmFkZChtYXRjaGVkLm91dHB1dCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvbWl0LmRlbGV0ZShtYXRjaGVkLm91dHB1dCk7XG4gICAgICAgIGtlZXAuYWRkKG1hdGNoZWQub3V0cHV0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBsZXQgcmVzdWx0ID0gbmVnYXRpdmVzID09PSBwYXR0ZXJucy5sZW5ndGggPyBbLi4uaXRlbXNdIDogWy4uLmtlZXBdO1xuICBsZXQgbWF0Y2hlcyA9IHJlc3VsdC5maWx0ZXIoaXRlbSA9PiAhb21pdC5oYXMoaXRlbSkpO1xuXG4gIGlmIChvcHRpb25zICYmIG1hdGNoZXMubGVuZ3RoID09PSAwKSB7XG4gICAgaWYgKG9wdGlvbnMuZmFpbGdsb2IgPT09IHRydWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gbWF0Y2hlcyBmb3VuZCBmb3IgXCIke3BhdHRlcm5zLmpvaW4oJywgJyl9XCJgKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5ub251bGwgPT09IHRydWUgfHwgb3B0aW9ucy5udWxsZ2xvYiA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMudW5lc2NhcGUgPyBwYXR0ZXJucy5tYXAocCA9PiBwLnJlcGxhY2UoL1xcXFwvZywgJycpKSA6IHBhdHRlcm5zO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBtYXRjaGVzO1xufTtcblxuLyoqXG4gKiBCYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuICovXG5cbm1pY3JvbWF0Y2gubWF0Y2ggPSBtaWNyb21hdGNoO1xuXG4vKipcbiAqIFJldHVybnMgYSBtYXRjaGVyIGZ1bmN0aW9uIGZyb20gdGhlIGdpdmVuIGdsb2IgYHBhdHRlcm5gIGFuZCBgb3B0aW9uc2AuXG4gKiBUaGUgcmV0dXJuZWQgZnVuY3Rpb24gdGFrZXMgYSBzdHJpbmcgdG8gbWF0Y2ggYXMgaXRzIG9ubHkgYXJndW1lbnQgYW5kIHJldHVybnNcbiAqIHRydWUgaWYgdGhlIHN0cmluZyBpcyBhIG1hdGNoLlxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCBtbSA9IHJlcXVpcmUoJ21pY3JvbWF0Y2gnKTtcbiAqIC8vIG1tLm1hdGNoZXIocGF0dGVyblssIG9wdGlvbnNdKTtcbiAqXG4gKiBjb25zdCBpc01hdGNoID0gbW0ubWF0Y2hlcignKi4hKCphKScpO1xuICogY29uc29sZS5sb2coaXNNYXRjaCgnYS5hJykpOyAvLz0+IGZhbHNlXG4gKiBjb25zb2xlLmxvZyhpc01hdGNoKCdhLmInKSk7IC8vPT4gdHJ1ZVxuICogYGBgXG4gKiBAcGFyYW0ge1N0cmluZ30gYHBhdHRlcm5gIEdsb2IgcGF0dGVyblxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYFxuICogQHJldHVybiB7RnVuY3Rpb259IFJldHVybnMgYSBtYXRjaGVyIGZ1bmN0aW9uLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5taWNyb21hdGNoLm1hdGNoZXIgPSAocGF0dGVybiwgb3B0aW9ucykgPT4gcGljb21hdGNoKHBhdHRlcm4sIG9wdGlvbnMpO1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiAqKmFueSoqIG9mIHRoZSBnaXZlbiBnbG9iIGBwYXR0ZXJuc2AgbWF0Y2ggdGhlIHNwZWNpZmllZCBgc3RyaW5nYC5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgbW0gPSByZXF1aXJlKCdtaWNyb21hdGNoJyk7XG4gKiAvLyBtbS5pc01hdGNoKHN0cmluZywgcGF0dGVybnNbLCBvcHRpb25zXSk7XG4gKlxuICogY29uc29sZS5sb2cobW0uaXNNYXRjaCgnYS5hJywgWydiLionLCAnKi5hJ10pKTsgLy89PiB0cnVlXG4gKiBjb25zb2xlLmxvZyhtbS5pc01hdGNoKCdhLmEnLCAnYi4qJykpOyAvLz0+IGZhbHNlXG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBgc3RyYCBUaGUgc3RyaW5nIHRvIHRlc3QuXG4gKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gYHBhdHRlcm5zYCBPbmUgb3IgbW9yZSBnbG9iIHBhdHRlcm5zIHRvIHVzZSBmb3IgbWF0Y2hpbmcuXG4gKiBAcGFyYW0ge09iamVjdH0gYFtvcHRpb25zXWAgU2VlIGF2YWlsYWJsZSBbb3B0aW9uc10oI29wdGlvbnMpLlxuICogQHJldHVybiB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGFueSBwYXR0ZXJucyBtYXRjaCBgc3RyYFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5taWNyb21hdGNoLmlzTWF0Y2ggPSAoc3RyLCBwYXR0ZXJucywgb3B0aW9ucykgPT4gcGljb21hdGNoKHBhdHRlcm5zLCBvcHRpb25zKShzdHIpO1xuXG4vKipcbiAqIEJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG4gKi9cblxubWljcm9tYXRjaC5hbnkgPSBtaWNyb21hdGNoLmlzTWF0Y2g7XG5cbi8qKlxuICogUmV0dXJucyBhIGxpc3Qgb2Ygc3RyaW5ncyB0aGF0IF8qKmRvIG5vdCBtYXRjaCBhbnkqKl8gb2YgdGhlIGdpdmVuIGBwYXR0ZXJuc2AuXG4gKlxuICogYGBganNcbiAqIGNvbnN0IG1tID0gcmVxdWlyZSgnbWljcm9tYXRjaCcpO1xuICogLy8gbW0ubm90KGxpc3QsIHBhdHRlcm5zWywgb3B0aW9uc10pO1xuICpcbiAqIGNvbnNvbGUubG9nKG1tLm5vdChbJ2EuYScsICdiLmInLCAnYy5jJ10sICcqLmEnKSk7XG4gKiAvLz0+IFsnYi5iJywgJ2MuYyddXG4gKiBgYGBcbiAqIEBwYXJhbSB7QXJyYXl9IGBsaXN0YCBBcnJheSBvZiBzdHJpbmdzIHRvIG1hdGNoLlxuICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IGBwYXR0ZXJuc2AgT25lIG9yIG1vcmUgZ2xvYiBwYXR0ZXJuIHRvIHVzZSBmb3IgbWF0Y2hpbmcuXG4gKiBAcGFyYW0ge09iamVjdH0gYG9wdGlvbnNgIFNlZSBhdmFpbGFibGUgW29wdGlvbnNdKCNvcHRpb25zKSBmb3IgY2hhbmdpbmcgaG93IG1hdGNoZXMgYXJlIHBlcmZvcm1lZFxuICogQHJldHVybiB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2Ygc3RyaW5ncyB0aGF0ICoqZG8gbm90IG1hdGNoKiogdGhlIGdpdmVuIHBhdHRlcm5zLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5taWNyb21hdGNoLm5vdCA9IChsaXN0LCBwYXR0ZXJucywgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIHBhdHRlcm5zID0gW10uY29uY2F0KHBhdHRlcm5zKS5tYXAoU3RyaW5nKTtcbiAgbGV0IHJlc3VsdCA9IG5ldyBTZXQoKTtcbiAgbGV0IGl0ZW1zID0gW107XG5cbiAgbGV0IG9uUmVzdWx0ID0gc3RhdGUgPT4ge1xuICAgIGlmIChvcHRpb25zLm9uUmVzdWx0KSBvcHRpb25zLm9uUmVzdWx0KHN0YXRlKTtcbiAgICBpdGVtcy5wdXNoKHN0YXRlLm91dHB1dCk7XG4gIH07XG5cbiAgbGV0IG1hdGNoZXMgPSBuZXcgU2V0KG1pY3JvbWF0Y2gobGlzdCwgcGF0dGVybnMsIHsgLi4ub3B0aW9ucywgb25SZXN1bHQgfSkpO1xuXG4gIGZvciAobGV0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBpZiAoIW1hdGNoZXMuaGFzKGl0ZW0pKSB7XG4gICAgICByZXN1bHQuYWRkKGl0ZW0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gWy4uLnJlc3VsdF07XG59O1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gYHN0cmluZ2AgY29udGFpbnMgdGhlIGdpdmVuIHBhdHRlcm4uIFNpbWlsYXJcbiAqIHRvIFsuaXNNYXRjaF0oI2lzTWF0Y2gpIGJ1dCB0aGUgcGF0dGVybiBjYW4gbWF0Y2ggYW55IHBhcnQgb2YgdGhlIHN0cmluZy5cbiAqXG4gKiBgYGBqc1xuICogdmFyIG1tID0gcmVxdWlyZSgnbWljcm9tYXRjaCcpO1xuICogLy8gbW0uY29udGFpbnMoc3RyaW5nLCBwYXR0ZXJuWywgb3B0aW9uc10pO1xuICpcbiAqIGNvbnNvbGUubG9nKG1tLmNvbnRhaW5zKCdhYS9iYi9jYycsICcqYicpKTtcbiAqIC8vPT4gdHJ1ZVxuICogY29uc29sZS5sb2cobW0uY29udGFpbnMoJ2FhL2JiL2NjJywgJypkJykpO1xuICogLy89PiBmYWxzZVxuICogYGBgXG4gKiBAcGFyYW0ge1N0cmluZ30gYHN0cmAgVGhlIHN0cmluZyB0byBtYXRjaC5cbiAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBgcGF0dGVybnNgIEdsb2IgcGF0dGVybiB0byB1c2UgZm9yIG1hdGNoaW5nLlxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYCBTZWUgYXZhaWxhYmxlIFtvcHRpb25zXSgjb3B0aW9ucykgZm9yIGNoYW5naW5nIGhvdyBtYXRjaGVzIGFyZSBwZXJmb3JtZWRcbiAqIEByZXR1cm4ge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBhbnkgb2YgdGhlIHBhdHRlcm5zIG1hdGNoZXMgYW55IHBhcnQgb2YgYHN0cmAuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1pY3JvbWF0Y2guY29udGFpbnMgPSAoc3RyLCBwYXR0ZXJuLCBvcHRpb25zKSA9PiB7XG4gIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEV4cGVjdGVkIGEgc3RyaW5nOiBcIiR7dXRpbC5pbnNwZWN0KHN0cil9XCJgKTtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHBhdHRlcm4pKSB7XG4gICAgcmV0dXJuIHBhdHRlcm4uc29tZShwID0+IG1pY3JvbWF0Y2guY29udGFpbnMoc3RyLCBwLCBvcHRpb25zKSk7XG4gIH1cblxuICBpZiAodHlwZW9mIHBhdHRlcm4gPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKGlzRW1wdHlTdHJpbmcoc3RyKSB8fCBpc0VtcHR5U3RyaW5nKHBhdHRlcm4pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHN0ci5pbmNsdWRlcyhwYXR0ZXJuKSB8fCAoc3RyLnN0YXJ0c1dpdGgoJy4vJykgJiYgc3RyLnNsaWNlKDIpLmluY2x1ZGVzKHBhdHRlcm4pKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG1pY3JvbWF0Y2guaXNNYXRjaChzdHIsIHBhdHRlcm4sIHsgLi4ub3B0aW9ucywgY29udGFpbnM6IHRydWUgfSk7XG59O1xuXG4vKipcbiAqIEZpbHRlciB0aGUga2V5cyBvZiB0aGUgZ2l2ZW4gb2JqZWN0IHdpdGggdGhlIGdpdmVuIGBnbG9iYCBwYXR0ZXJuXG4gKiBhbmQgYG9wdGlvbnNgLiBEb2VzIG5vdCBhdHRlbXB0IHRvIG1hdGNoIG5lc3RlZCBrZXlzLiBJZiB5b3UgbmVlZCB0aGlzIGZlYXR1cmUsXG4gKiB1c2UgW2dsb2Itb2JqZWN0XVtdIGluc3RlYWQuXG4gKlxuICogYGBganNcbiAqIGNvbnN0IG1tID0gcmVxdWlyZSgnbWljcm9tYXRjaCcpO1xuICogLy8gbW0ubWF0Y2hLZXlzKG9iamVjdCwgcGF0dGVybnNbLCBvcHRpb25zXSk7XG4gKlxuICogY29uc3Qgb2JqID0geyBhYTogJ2EnLCBhYjogJ2InLCBhYzogJ2MnIH07XG4gKiBjb25zb2xlLmxvZyhtbS5tYXRjaEtleXMob2JqLCAnKmInKSk7XG4gKiAvLz0+IHsgYWI6ICdiJyB9XG4gKiBgYGBcbiAqIEBwYXJhbSB7T2JqZWN0fSBgb2JqZWN0YCBUaGUgb2JqZWN0IHdpdGgga2V5cyB0byBmaWx0ZXIuXG4gKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gYHBhdHRlcm5zYCBPbmUgb3IgbW9yZSBnbG9iIHBhdHRlcm5zIHRvIHVzZSBmb3IgbWF0Y2hpbmcuXG4gKiBAcGFyYW0ge09iamVjdH0gYG9wdGlvbnNgIFNlZSBhdmFpbGFibGUgW29wdGlvbnNdKCNvcHRpb25zKSBmb3IgY2hhbmdpbmcgaG93IG1hdGNoZXMgYXJlIHBlcmZvcm1lZFxuICogQHJldHVybiB7T2JqZWN0fSBSZXR1cm5zIGFuIG9iamVjdCB3aXRoIG9ubHkga2V5cyB0aGF0IG1hdGNoIHRoZSBnaXZlbiBwYXR0ZXJucy5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubWljcm9tYXRjaC5tYXRjaEtleXMgPSAob2JqLCBwYXR0ZXJucywgb3B0aW9ucykgPT4ge1xuICBpZiAoIXV0aWxzLmlzT2JqZWN0KG9iaikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCB0aGUgZmlyc3QgYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0Jyk7XG4gIH1cbiAgbGV0IGtleXMgPSBtaWNyb21hdGNoKE9iamVjdC5rZXlzKG9iaiksIHBhdHRlcm5zLCBvcHRpb25zKTtcbiAgbGV0IHJlcyA9IHt9O1xuICBmb3IgKGxldCBrZXkgb2Yga2V5cykgcmVzW2tleV0gPSBvYmpba2V5XTtcbiAgcmV0dXJuIHJlcztcbn07XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHNvbWUgb2YgdGhlIHN0cmluZ3MgaW4gdGhlIGdpdmVuIGBsaXN0YCBtYXRjaCBhbnkgb2YgdGhlIGdpdmVuIGdsb2IgYHBhdHRlcm5zYC5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgbW0gPSByZXF1aXJlKCdtaWNyb21hdGNoJyk7XG4gKiAvLyBtbS5zb21lKGxpc3QsIHBhdHRlcm5zWywgb3B0aW9uc10pO1xuICpcbiAqIGNvbnNvbGUubG9nKG1tLnNvbWUoWydmb28uanMnLCAnYmFyLmpzJ10sIFsnKi5qcycsICchZm9vLmpzJ10pKTtcbiAqIC8vIHRydWVcbiAqIGNvbnNvbGUubG9nKG1tLnNvbWUoWydmb28uanMnXSwgWycqLmpzJywgJyFmb28uanMnXSkpO1xuICogLy8gZmFsc2VcbiAqIGBgYFxuICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IGBsaXN0YCBUaGUgc3RyaW5nIG9yIGFycmF5IG9mIHN0cmluZ3MgdG8gdGVzdC4gUmV0dXJucyBhcyBzb29uIGFzIHRoZSBmaXJzdCBtYXRjaCBpcyBmb3VuZC5cbiAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBgcGF0dGVybnNgIE9uZSBvciBtb3JlIGdsb2IgcGF0dGVybnMgdG8gdXNlIGZvciBtYXRjaGluZy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBgb3B0aW9uc2AgU2VlIGF2YWlsYWJsZSBbb3B0aW9uc10oI29wdGlvbnMpIGZvciBjaGFuZ2luZyBob3cgbWF0Y2hlcyBhcmUgcGVyZm9ybWVkXG4gKiBAcmV0dXJuIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgYW55IGBwYXR0ZXJuc2AgbWF0Y2hlcyBhbnkgb2YgdGhlIHN0cmluZ3MgaW4gYGxpc3RgXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1pY3JvbWF0Y2guc29tZSA9IChsaXN0LCBwYXR0ZXJucywgb3B0aW9ucykgPT4ge1xuICBsZXQgaXRlbXMgPSBbXS5jb25jYXQobGlzdCk7XG5cbiAgZm9yIChsZXQgcGF0dGVybiBvZiBbXS5jb25jYXQocGF0dGVybnMpKSB7XG4gICAgbGV0IGlzTWF0Y2ggPSBwaWNvbWF0Y2goU3RyaW5nKHBhdHRlcm4pLCBvcHRpb25zKTtcbiAgICBpZiAoaXRlbXMuc29tZShpdGVtID0+IGlzTWF0Y2goaXRlbSkpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgZXZlcnkgc3RyaW5nIGluIHRoZSBnaXZlbiBgbGlzdGAgbWF0Y2hlc1xuICogYW55IG9mIHRoZSBnaXZlbiBnbG9iIGBwYXR0ZXJuc2AuXG4gKlxuICogYGBganNcbiAqIGNvbnN0IG1tID0gcmVxdWlyZSgnbWljcm9tYXRjaCcpO1xuICogLy8gbW0uZXZlcnkobGlzdCwgcGF0dGVybnNbLCBvcHRpb25zXSk7XG4gKlxuICogY29uc29sZS5sb2cobW0uZXZlcnkoJ2Zvby5qcycsIFsnZm9vLmpzJ10pKTtcbiAqIC8vIHRydWVcbiAqIGNvbnNvbGUubG9nKG1tLmV2ZXJ5KFsnZm9vLmpzJywgJ2Jhci5qcyddLCBbJyouanMnXSkpO1xuICogLy8gdHJ1ZVxuICogY29uc29sZS5sb2cobW0uZXZlcnkoWydmb28uanMnLCAnYmFyLmpzJ10sIFsnKi5qcycsICchZm9vLmpzJ10pKTtcbiAqIC8vIGZhbHNlXG4gKiBjb25zb2xlLmxvZyhtbS5ldmVyeShbJ2Zvby5qcyddLCBbJyouanMnLCAnIWZvby5qcyddKSk7XG4gKiAvLyBmYWxzZVxuICogYGBgXG4gKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gYGxpc3RgIFRoZSBzdHJpbmcgb3IgYXJyYXkgb2Ygc3RyaW5ncyB0byB0ZXN0LlxuICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IGBwYXR0ZXJuc2AgT25lIG9yIG1vcmUgZ2xvYiBwYXR0ZXJucyB0byB1c2UgZm9yIG1hdGNoaW5nLlxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYCBTZWUgYXZhaWxhYmxlIFtvcHRpb25zXSgjb3B0aW9ucykgZm9yIGNoYW5naW5nIGhvdyBtYXRjaGVzIGFyZSBwZXJmb3JtZWRcbiAqIEByZXR1cm4ge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBhbGwgYHBhdHRlcm5zYCBtYXRjaGVzIGFsbCBvZiB0aGUgc3RyaW5ncyBpbiBgbGlzdGBcbiAqIEBhcGkgcHVibGljXG4gKi9cblxubWljcm9tYXRjaC5ldmVyeSA9IChsaXN0LCBwYXR0ZXJucywgb3B0aW9ucykgPT4ge1xuICBsZXQgaXRlbXMgPSBbXS5jb25jYXQobGlzdCk7XG5cbiAgZm9yIChsZXQgcGF0dGVybiBvZiBbXS5jb25jYXQocGF0dGVybnMpKSB7XG4gICAgbGV0IGlzTWF0Y2ggPSBwaWNvbWF0Y2goU3RyaW5nKHBhdHRlcm4pLCBvcHRpb25zKTtcbiAgICBpZiAoIWl0ZW1zLmV2ZXJ5KGl0ZW0gPT4gaXNNYXRjaChpdGVtKSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiAqKmFsbCoqIG9mIHRoZSBnaXZlbiBgcGF0dGVybnNgIG1hdGNoXG4gKiB0aGUgc3BlY2lmaWVkIHN0cmluZy5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgbW0gPSByZXF1aXJlKCdtaWNyb21hdGNoJyk7XG4gKiAvLyBtbS5hbGwoc3RyaW5nLCBwYXR0ZXJuc1ssIG9wdGlvbnNdKTtcbiAqXG4gKiBjb25zb2xlLmxvZyhtbS5hbGwoJ2Zvby5qcycsIFsnZm9vLmpzJ10pKTtcbiAqIC8vIHRydWVcbiAqXG4gKiBjb25zb2xlLmxvZyhtbS5hbGwoJ2Zvby5qcycsIFsnKi5qcycsICchZm9vLmpzJ10pKTtcbiAqIC8vIGZhbHNlXG4gKlxuICogY29uc29sZS5sb2cobW0uYWxsKCdmb28uanMnLCBbJyouanMnLCAnZm9vLmpzJ10pKTtcbiAqIC8vIHRydWVcbiAqXG4gKiBjb25zb2xlLmxvZyhtbS5hbGwoJ2Zvby5qcycsIFsnKi5qcycsICdmKicsICcqbyonLCAnKm8uanMnXSkpO1xuICogLy8gdHJ1ZVxuICogYGBgXG4gKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gYHN0cmAgVGhlIHN0cmluZyB0byB0ZXN0LlxuICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IGBwYXR0ZXJuc2AgT25lIG9yIG1vcmUgZ2xvYiBwYXR0ZXJucyB0byB1c2UgZm9yIG1hdGNoaW5nLlxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYCBTZWUgYXZhaWxhYmxlIFtvcHRpb25zXSgjb3B0aW9ucykgZm9yIGNoYW5naW5nIGhvdyBtYXRjaGVzIGFyZSBwZXJmb3JtZWRcbiAqIEByZXR1cm4ge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBhbnkgcGF0dGVybnMgbWF0Y2ggYHN0cmBcbiAqIEBhcGkgcHVibGljXG4gKi9cblxubWljcm9tYXRjaC5hbGwgPSAoc3RyLCBwYXR0ZXJucywgb3B0aW9ucykgPT4ge1xuICBpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCBhIHN0cmluZzogXCIke3V0aWwuaW5zcGVjdChzdHIpfVwiYCk7XG4gIH1cblxuICByZXR1cm4gW10uY29uY2F0KHBhdHRlcm5zKS5ldmVyeShwID0+IHBpY29tYXRjaChwLCBvcHRpb25zKShzdHIpKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSBvZiBtYXRjaGVzIGNhcHR1cmVkIGJ5IGBwYXR0ZXJuYCBpbiBgc3RyaW5nLCBvciBgbnVsbGAgaWYgdGhlIHBhdHRlcm4gZGlkIG5vdCBtYXRjaC5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgbW0gPSByZXF1aXJlKCdtaWNyb21hdGNoJyk7XG4gKiAvLyBtbS5jYXB0dXJlKHBhdHRlcm4sIHN0cmluZ1ssIG9wdGlvbnNdKTtcbiAqXG4gKiBjb25zb2xlLmxvZyhtbS5jYXB0dXJlKCd0ZXN0LyouanMnLCAndGVzdC9mb28uanMnKSk7XG4gKiAvLz0+IFsnZm9vJ11cbiAqIGNvbnNvbGUubG9nKG1tLmNhcHR1cmUoJ3Rlc3QvKi5qcycsICdmb28vYmFyLmNzcycpKTtcbiAqIC8vPT4gbnVsbFxuICogYGBgXG4gKiBAcGFyYW0ge1N0cmluZ30gYGdsb2JgIEdsb2IgcGF0dGVybiB0byB1c2UgZm9yIG1hdGNoaW5nLlxuICogQHBhcmFtIHtTdHJpbmd9IGBpbnB1dGAgU3RyaW5nIHRvIG1hdGNoXG4gKiBAcGFyYW0ge09iamVjdH0gYG9wdGlvbnNgIFNlZSBhdmFpbGFibGUgW29wdGlvbnNdKCNvcHRpb25zKSBmb3IgY2hhbmdpbmcgaG93IG1hdGNoZXMgYXJlIHBlcmZvcm1lZFxuICogQHJldHVybiB7QXJyYXl8bnVsbH0gUmV0dXJucyBhbiBhcnJheSBvZiBjYXB0dXJlcyBpZiB0aGUgaW5wdXQgbWF0Y2hlcyB0aGUgZ2xvYiBwYXR0ZXJuLCBvdGhlcndpc2UgYG51bGxgLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5taWNyb21hdGNoLmNhcHR1cmUgPSAoZ2xvYiwgaW5wdXQsIG9wdGlvbnMpID0+IHtcbiAgbGV0IHBvc2l4ID0gdXRpbHMuaXNXaW5kb3dzKG9wdGlvbnMpO1xuICBsZXQgcmVnZXggPSBwaWNvbWF0Y2gubWFrZVJlKFN0cmluZyhnbG9iKSwgeyAuLi5vcHRpb25zLCBjYXB0dXJlOiB0cnVlIH0pO1xuICBsZXQgbWF0Y2ggPSByZWdleC5leGVjKHBvc2l4ID8gdXRpbHMudG9Qb3NpeFNsYXNoZXMoaW5wdXQpIDogaW5wdXQpO1xuXG4gIGlmIChtYXRjaCkge1xuICAgIHJldHVybiBtYXRjaC5zbGljZSgxKS5tYXAodiA9PiB2ID09PSB2b2lkIDAgPyAnJyA6IHYpO1xuICB9XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBmcm9tIHRoZSBnaXZlbiBnbG9iIGBwYXR0ZXJuYC5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgbW0gPSByZXF1aXJlKCdtaWNyb21hdGNoJyk7XG4gKiAvLyBtbS5tYWtlUmUocGF0dGVyblssIG9wdGlvbnNdKTtcbiAqXG4gKiBjb25zb2xlLmxvZyhtbS5tYWtlUmUoJyouanMnKSk7XG4gKiAvLz0+IC9eKD86KFxcLltcXFxcXFwvXSk/KD8hXFwuKSg/PS4pW15cXC9dKj9cXC5qcykkL1xuICogYGBgXG4gKiBAcGFyYW0ge1N0cmluZ30gYHBhdHRlcm5gIEEgZ2xvYiBwYXR0ZXJuIHRvIGNvbnZlcnQgdG8gcmVnZXguXG4gKiBAcGFyYW0ge09iamVjdH0gYG9wdGlvbnNgXG4gKiBAcmV0dXJuIHtSZWdFeHB9IFJldHVybnMgYSByZWdleCBjcmVhdGVkIGZyb20gdGhlIGdpdmVuIHBhdHRlcm4uXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1pY3JvbWF0Y2gubWFrZVJlID0gKC4uLmFyZ3MpID0+IHBpY29tYXRjaC5tYWtlUmUoLi4uYXJncyk7XG5cbi8qKlxuICogU2NhbiBhIGdsb2IgcGF0dGVybiB0byBzZXBhcmF0ZSB0aGUgcGF0dGVybiBpbnRvIHNlZ21lbnRzLiBVc2VkXG4gKiBieSB0aGUgW3NwbGl0XSgjc3BsaXQpIG1ldGhvZC5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgbW0gPSByZXF1aXJlKCdtaWNyb21hdGNoJyk7XG4gKiBjb25zdCBzdGF0ZSA9IG1tLnNjYW4ocGF0dGVyblssIG9wdGlvbnNdKTtcbiAqIGBgYFxuICogQHBhcmFtIHtTdHJpbmd9IGBwYXR0ZXJuYFxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYFxuICogQHJldHVybiB7T2JqZWN0fSBSZXR1cm5zIGFuIG9iamVjdCB3aXRoXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1pY3JvbWF0Y2guc2NhbiA9ICguLi5hcmdzKSA9PiBwaWNvbWF0Y2guc2NhbiguLi5hcmdzKTtcblxuLyoqXG4gKiBQYXJzZSBhIGdsb2IgcGF0dGVybiB0byBjcmVhdGUgdGhlIHNvdXJjZSBzdHJpbmcgZm9yIGEgcmVndWxhclxuICogZXhwcmVzc2lvbi5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgbW0gPSByZXF1aXJlKCdtaWNyb21hdGNoJyk7XG4gKiBjb25zdCBzdGF0ZSA9IG1tLnBhcnNlKHBhdHRlcm5bLCBvcHRpb25zXSk7XG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBgZ2xvYmBcbiAqIEBwYXJhbSB7T2JqZWN0fSBgb3B0aW9uc2BcbiAqIEByZXR1cm4ge09iamVjdH0gUmV0dXJucyBhbiBvYmplY3Qgd2l0aCB1c2VmdWwgcHJvcGVydGllcyBhbmQgb3V0cHV0IHRvIGJlIHVzZWQgYXMgcmVnZXggc291cmNlIHN0cmluZy5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubWljcm9tYXRjaC5wYXJzZSA9IChwYXR0ZXJucywgb3B0aW9ucykgPT4ge1xuICBsZXQgcmVzID0gW107XG4gIGZvciAobGV0IHBhdHRlcm4gb2YgW10uY29uY2F0KHBhdHRlcm5zIHx8IFtdKSkge1xuICAgIGZvciAobGV0IHN0ciBvZiBicmFjZXMoU3RyaW5nKHBhdHRlcm4pLCBvcHRpb25zKSkge1xuICAgICAgcmVzLnB1c2gocGljb21hdGNoLnBhcnNlKHN0ciwgb3B0aW9ucykpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufTtcblxuLyoqXG4gKiBQcm9jZXNzIHRoZSBnaXZlbiBicmFjZSBgcGF0dGVybmAuXG4gKlxuICogYGBganNcbiAqIGNvbnN0IHsgYnJhY2VzIH0gPSByZXF1aXJlKCdtaWNyb21hdGNoJyk7XG4gKiBjb25zb2xlLmxvZyhicmFjZXMoJ2Zvby97YSxiLGN9L2JhcicpKTtcbiAqIC8vPT4gWyAnZm9vLyhhfGJ8YykvYmFyJyBdXG4gKlxuICogY29uc29sZS5sb2coYnJhY2VzKCdmb28ve2EsYixjfS9iYXInLCB7IGV4cGFuZDogdHJ1ZSB9KSk7XG4gKiAvLz0+IFsgJ2Zvby9hL2JhcicsICdmb28vYi9iYXInLCAnZm9vL2MvYmFyJyBdXG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBgcGF0dGVybmAgU3RyaW5nIHdpdGggYnJhY2UgcGF0dGVybiB0byBwcm9jZXNzLlxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYCBBbnkgW29wdGlvbnNdKCNvcHRpb25zKSB0byBjaGFuZ2UgaG93IGV4cGFuc2lvbiBpcyBwZXJmb3JtZWQuIFNlZSB0aGUgW2JyYWNlc11bXSBsaWJyYXJ5IGZvciBhbGwgYXZhaWxhYmxlIG9wdGlvbnMuXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubWljcm9tYXRjaC5icmFjZXMgPSAocGF0dGVybiwgb3B0aW9ucykgPT4ge1xuICBpZiAodHlwZW9mIHBhdHRlcm4gIT09ICdzdHJpbmcnKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhIHN0cmluZycpO1xuICBpZiAoKG9wdGlvbnMgJiYgb3B0aW9ucy5ub2JyYWNlID09PSB0cnVlKSB8fCAhaGFzQnJhY2VzKHBhdHRlcm4pKSB7XG4gICAgcmV0dXJuIFtwYXR0ZXJuXTtcbiAgfVxuICByZXR1cm4gYnJhY2VzKHBhdHRlcm4sIG9wdGlvbnMpO1xufTtcblxuLyoqXG4gKiBFeHBhbmQgYnJhY2VzXG4gKi9cblxubWljcm9tYXRjaC5icmFjZUV4cGFuZCA9IChwYXR0ZXJuLCBvcHRpb25zKSA9PiB7XG4gIGlmICh0eXBlb2YgcGF0dGVybiAhPT0gJ3N0cmluZycpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGEgc3RyaW5nJyk7XG4gIHJldHVybiBtaWNyb21hdGNoLmJyYWNlcyhwYXR0ZXJuLCB7IC4uLm9wdGlvbnMsIGV4cGFuZDogdHJ1ZSB9KTtcbn07XG5cbi8qKlxuICogRXhwb3NlIG1pY3JvbWF0Y2hcbiAqL1xuXG4vLyBleHBvc2VkIGZvciB0ZXN0c1xubWljcm9tYXRjaC5oYXNCcmFjZXMgPSBoYXNCcmFjZXM7XG5tb2R1bGUuZXhwb3J0cyA9IG1pY3JvbWF0Y2g7XG4iLCAiaW1wb3J0IHsgQmFja3VwU2V0dGluZ3MsIE5vdGVGbGFyZVNldHRpbmdzLCBTaXRlUHJvZmlsZSB9IGZyb20gJy4vdHlwZXMnO1xuXG4vKiogRGVmYXVsdCBleGNsdWRlIGdsb2JzIGFwcGxpZWQgdG8gYSBicmFuZC1uZXcgc2l0ZS4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX0VYQ0xVREVfUEFUVEVSTlMgPSBbJ3ByaXZhdGUvKionLCAnKi5wcml2YXRlLm1kJywgJ1RlbXBsYXRlcy8qKiddO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9CQUNLVVBfU0VUVElOR1M6IEJhY2t1cFNldHRpbmdzID0ge1xuICByZXBvc2l0b3J5OiAnJyxcbiAgcmVwb1Zpc2liaWxpdHk6ICdwcml2YXRlJyxcbiAgYmFja3VwT25DaGFuZ2U6IHRydWUsXG4gIGludGVydmFsTWludXRlczogNjAsXG4gIGxhc3RCYWNrdXBBdHRlbXB0QXQ6ICcnLFxuICBsYXN0QmFja3VwQXQ6ICcnLFxuICBsYXN0QmFja3VwRXJyb3I6ICcnLFxufTtcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfU0VUVElOR1M6IE5vdGVGbGFyZVNldHRpbmdzID0ge1xuICBnaXRodWJPd25lcjogJycsXG4gIGdpdGh1YlRva2VuOiAnJyxcbiAgY2xvdWRmbGFyZUFjY291bnQ6ICcnLFxuICBjbG91ZGZsYXJlVG9rZW46ICcnLFxuICBzaXRlczogW10sXG4gIGFjdGl2ZVNpdGVJZDogJycsXG4gIHNldHVwQ29tcGxldGU6IGZhbHNlLFxuICBlbmFibGVCYWNrdXA6IGZhbHNlLFxuICBlbmFibGVQdWJsaXNoOiB0cnVlLFxuICBiYWNrdXA6IHsgLi4uREVGQVVMVF9CQUNLVVBfU0VUVElOR1MgfSxcbiAgbWFzdGVyUmVwb3NpdG9yeTogJycsXG4gIG1hc3RlclJlcG9zaXRvcnlQcml2YXRlOiBmYWxzZSxcbiAgZGVmYXVsdFZpZXdMb2NhdGlvbjogJ2xlZnQnLFxufTtcblxuLyoqIEJ1aWxkIGEgZnJlc2ggc2l0ZSBwcm9maWxlIHdpdGggc2Vuc2libGUgZGVmYXVsdHMuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2l0ZVByb2ZpbGUocGFydGlhbDogUGFydGlhbDxTaXRlUHJvZmlsZT4gPSB7fSk6IFNpdGVQcm9maWxlIHtcbiAgcmV0dXJuIHtcbiAgICBpZDpcbiAgICAgIHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmICdyYW5kb21VVUlEJyBpbiBjcnlwdG9cbiAgICAgICAgPyBjcnlwdG8ucmFuZG9tVVVJRCgpXG4gICAgICAgIDogYHNpdGUtJHtEYXRlLm5vdygpfS0ke01hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnNsaWNlKDIsIDgpfWAsXG4gICAgbmFtZTogJycsXG4gICAgZ2l0aHViUmVwbzogJycsXG4gICAgZ2l0aHViQnJhbmNoOiAnJyxcbiAgICBjbG91ZGZsYXJlUHJvamVjdDogJycsXG4gICAgc2l0ZVVybDogJycsXG4gICAgcHVibGlzaFNjb3BlOiBwYXJ0aWFsLnB1Ymxpc2hTY29wZSB8fCAndmF1bHQnLFxuICAgIHB1Ymxpc2hQYXRoczogcGFydGlhbC5wdWJsaXNoUGF0aHMgfHwgW10sXG4gICAgYXV0aG9yTmFtZTogJycsXG4gICAgc2lkZWJhclRpdGxlOiAnJyxcbiAgICBzaXRlRGVzY3JpcHRpb246ICcnLFxuICAgIGV4Y2x1ZGVQYXR0ZXJuczogWy4uLkRFRkFVTFRfRVhDTFVERV9QQVRURVJOU10sXG4gICAgaW5jbHVkZUF0dGFjaG1lbnRzOiB0cnVlLFxuICAgIGlzUHVibGlzaGVkOiBmYWxzZSxcbiAgICBsYXN0UHVibGlzaGVkOiAnJyxcbiAgICBsYXN0Tm90ZUNvdW50OiAwLFxuICAgIGxhc3RQdWJsaXNoRmFpbGVkOiBmYWxzZSxcbiAgICBsYXN0UHVibGlzaEVycm9yOiAnJyxcbiAgICBob3N0aW5nUHJvdmlkZXI6ICdjbG91ZGZsYXJlJyxcbiAgICAuLi5wYXJ0aWFsLFxuICB9O1xufVxuIiwgImltcG9ydCB7IE5vdGljZSwgUGx1Z2luLCBzZXRJY29uLCBXb3Jrc3BhY2VMZWFmIH0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IHsgUHVibGlzaGVyIH0gZnJvbSAnLi9zcmMvcHVibGlzaC9wdWJsaXNoZXInO1xuaW1wb3J0IHsgREVGQVVMVF9CQUNLVVBfU0VUVElOR1MsIERFRkFVTFRfU0VUVElOR1MsIGNyZWF0ZVNpdGVQcm9maWxlIH0gZnJvbSAnLi9zcmMvY29yZS9zZXR0aW5ncyc7XG5pbXBvcnQgeyBOb3RlRmxhcmVTZXR0aW5ncywgUHVibGlzaFJlc3VsdCwgU2l0ZVByb2ZpbGUgfSBmcm9tICcuL3NyYy9jb3JlL3R5cGVzJztcbmltcG9ydCB7IE5vdGVGbGFyZVNldHRpbmdzVGFiIH0gZnJvbSAnLi9zcmMvdWkvc2V0dGluZ3Mvc2V0dGluZ3NUYWInO1xuaW1wb3J0IHsgU3RhdHVzQmFyIH0gZnJvbSAnLi9zcmMvdWkvc3RhdHVzQmFyJztcbmltcG9ydCB7IE5vdGVGbGFyZVZpZXcsIFZJRVdfVFlQRV9OT1RFRkxBUkUgfSBmcm9tICcuL3NyYy91aS9ub3RlZmxhcmVWaWV3JztcbmltcG9ydCB7IGRlY3J5cHRTZWNyZXQsIGVuY3J5cHRTZWNyZXQsIGlzU2VjdXJlU3RvcmFnZUF2YWlsYWJsZSB9IGZyb20gJy4vc3JjL2NvcmUvc2VjdXJlU3RvcmUnO1xuaW1wb3J0IHsgQmFja3VwRW5naW5lIH0gZnJvbSAnLi9zcmMvYmFja3VwL2JhY2t1cEVuZ2luZSc7XG5pbXBvcnQgeyBCYWNrdXBTY2hlZHVsZXIgfSBmcm9tICcuL3NyYy9iYWNrdXAvYmFja3VwU2NoZWR1bGVyJztcbmltcG9ydCB7IFZhdWx0UmVnaXN0cnkgfSBmcm9tICcuL3NyYy9jb3JlL3ZhdWx0UmVnaXN0cnknO1xuaW1wb3J0IHsgR2l0SHViQXBpIH0gZnJvbSAnLi9zcmMvYXBpL2dpdGh1YkFwaSc7XG5pbXBvcnQgeyBDbG91ZGZsYXJlQXBpIH0gZnJvbSAnLi9zcmMvYXBpL2Nsb3VkZmxhcmVBcGknO1xuXG5leHBvcnQgaW50ZXJmYWNlIExpdmVTaXRlU3RhdHVzIHtcbiAgbG9hZGluZzogYm9vbGVhbjtcbiAgcmVwb0h0bWxVcmw6IHN0cmluZztcbiAgcmVwb1B1c2hlZEF0OiBzdHJpbmc7XG4gIHdvcmtmbG93U3RhdHVzOiBzdHJpbmc7ICAgIC8vICdxdWV1ZWQnIHwgJ2luX3Byb2dyZXNzJyB8ICdjb21wbGV0ZWQnIHwgJydcbiAgd29ya2Zsb3dDb25jbHVzaW9uOiBzdHJpbmc7IC8vICdzdWNjZXNzJyB8ICdmYWlsdXJlJyB8ICdjYW5jZWxsZWQnIHwgJydcbiAgd29ya2Zsb3dVcmw6IHN0cmluZztcbiAgd29ya2Zsb3dVcGRhdGVkQXQ6IHN0cmluZztcbiAgY29tbWl0U2hhOiBzdHJpbmc7XG4gIGNvbW1pdE1lc3NhZ2U6IHN0cmluZztcbiAgY29tbWl0RGF0ZTogc3RyaW5nO1xuICBmZXRjaGVkQXQ6IHN0cmluZzsgLy8gSVNPIHRpbWVzdGFtcCBvZiBsYXN0IHN1Y2Nlc3NmdWwgZmV0Y2hcbiAgZXJyb3I6IHN0cmluZzsgICAgLy8gbm9uLWVtcHR5IGlmIGxhc3QgZmV0Y2ggZmFpbGVkXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vdGVGbGFyZVBsdWdpbiBleHRlbmRzIFBsdWdpbiB7XG4gIHNldHRpbmdzITogTm90ZUZsYXJlU2V0dGluZ3M7XG4gIHN0YXR1c0JhciE6IFN0YXR1c0JhcjtcbiAgcHJpdmF0ZSByaWJib25FbDogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBiYWNrdXBJblByb2dyZXNzID0gZmFsc2U7XG4gIC8qKiBJbi1wcm9ncmVzcyBwdWJsaXNoIHRyYWNraW5nIChpbi1tZW1vcnkgb25seSwgY2xlYXJlZCBvbiBzdWNjZXNzL2ZhaWwpLiAqL1xuICBwdWJsaXNoSW5Qcm9ncmVzczogUmVjb3JkPHN0cmluZywgYm9vbGVhbj4gPSB7fTtcbiAgLyoqIExpdmUgR2l0SHViIHN0YXR1cyBjYWNoZSAoaW4tbWVtb3J5LCByZWZyZXNoZWQgb24gcGFuZWwgb3Blbi9yZWZyZXNoKS4gKi9cbiAgbGl2ZVN0YXR1czogUmVjb3JkPHN0cmluZywgTGl2ZVNpdGVTdGF0dXM+ID0ge307XG5cbiAgYXN5bmMgb25sb2FkKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMubG9hZFNldHRpbmdzKCk7XG5cbiAgICAvLyBDaGVjayB0aGUgdmF1bHQgcmVnaXN0cnkgZm9yIHNpdGVzIHRoYXQgZXhpc3RlZCBiZWZvcmUgYSByZWluc3RhbGwuXG4gICAgLy8gSWYgY3JlZGVudGlhbHMgYXJlIHByZXNlbnQgYnV0IG5vIHNpdGVzIGFyZSBsb2FkZWQsIHRoZSB1c2VyIHByb2JhYmx5XG4gICAgLy8gcmVpbnN0YWxsZWQgdGhlIHBsdWdpbiBcdTIwMTQgc2hvdyBhIG5vdGljZSBwcm9tcHRpbmcgdGhlbSB0byByZXN0b3JlLlxuICAgIGlmICh0aGlzLnNldHRpbmdzLmdpdGh1YlRva2VuICYmIHRoaXMuc2V0dGluZ3MuZ2l0aHViT3duZXIgJiYgdGhpcy5zZXR0aW5ncy5zaXRlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGNvbnN0IHJlZ2lzdHJ5ID0gYXdhaXQgVmF1bHRSZWdpc3RyeS5sb2FkKHRoaXMuYXBwKTtcbiAgICAgIGlmIChyZWdpc3RyeS5lbnRyaWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbmV3IE5vdGljZShcbiAgICAgICAgICBgTm90ZUZsYXJlIGZvdW5kICR7cmVnaXN0cnkuZW50cmllcy5sZW5ndGh9IHByZXZpb3VzbHkgY29uZmlndXJlZCBzaXRlJHtyZWdpc3RyeS5lbnRyaWVzLmxlbmd0aCA9PT0gMSA/ICcnIDogJ3MnfSBpbiB5b3VyIHZhdWx0LiBPcGVuIE5vdGVGbGFyZSBzZXR0aW5ncyB0byByZXN0b3JlIHRoZW0uYCxcbiAgICAgICAgICAxMDAwMCxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWlzU2VjdXJlU3RvcmFnZUF2YWlsYWJsZSgpKSB7XG4gICAgICBuZXcgTm90aWNlKFxuICAgICAgICAnTm90ZUZsYXJlOiBzZWN1cmUgdG9rZW4gc3RvcmFnZSBpcyB1bmF2YWlsYWJsZSBvbiB0aGlzIHN5c3RlbS4gWW91ciB0b2tlbnMgd2lsbCBub3QgYmUgc2F2ZWQgYmV0d2VlbiBzZXNzaW9ucyBcdTIwMTQgeW91IG1heSBuZWVkIHRvIHJlLWVudGVyIHRoZW0uJyxcbiAgICAgICAgMTAwMDAsXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXR1c0VsID0gdGhpcy5hZGRTdGF0dXNCYXJJdGVtKCk7XG4gICAgdGhpcy5zdGF0dXNCYXIgPSBuZXcgU3RhdHVzQmFyKHN0YXR1c0VsKTtcbiAgICB0aGlzLnVwZGF0ZVN0YXR1c0JhcigpO1xuXG4gICAgdGhpcy5yZWdpc3RlclZpZXcoVklFV19UWVBFX05PVEVGTEFSRSwgKGxlYWYpID0+IG5ldyBOb3RlRmxhcmVWaWV3KGxlYWYsIHRoaXMpKTtcblxuICAgIC8vIFRoZSByaWJib24gaWNvbiBvcGVucyB0aGUgcHVibGlzaGluZyBwYW5lbC5cbiAgICB0aGlzLnJpYmJvbkVsID0gdGhpcy5hZGRSaWJib25JY29uKFxuICAgICAgdGhpcy5pc0FjdGl2ZUxpdmUoKSA/ICdjbG91ZC1jaGVjaycgOiAnY2xvdWQtdXBsb2FkJyxcbiAgICAgICdOb3RlRmxhcmUnLFxuICAgICAgKCkgPT4gdm9pZCB0aGlzLmFjdGl2YXRlVmlldygpLFxuICAgICk7XG4gICAgdGhpcy51cGRhdGVSaWJib25JY29uKCk7XG5cbiAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgaWQ6ICdvcGVuLXBhbmVsJyxcbiAgICAgIG5hbWU6ICdPcGVuIHBhbmVsJyxcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB2b2lkIHRoaXMuYWN0aXZhdGVWaWV3KCksXG4gICAgfSk7XG4gICAgdGhpcy5hZGRDb21tYW5kKHtcbiAgICAgIGlkOiAncHVibGlzaCcsXG4gICAgICBuYW1lOiAnUHVibGlzaCBhY3RpdmUgc2l0ZScsXG4gICAgICBjYWxsYmFjazogKCkgPT4gdm9pZCB0aGlzLmRvUHVibGlzaCgpLFxuICAgIH0pO1xuICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICBpZDogJ3VucHVibGlzaCcsXG4gICAgICBuYW1lOiAnVW5wdWJsaXNoIGFjdGl2ZSBzaXRlJyxcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB2b2lkIHRoaXMuZG9VbnB1Ymxpc2goKSxcbiAgICB9KTtcbiAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgaWQ6ICdiYWNrdXAtbm93JyxcbiAgICAgIG5hbWU6ICdCYWNrIHVwIHZhdWx0IG5vdycsXG4gICAgICBjYWxsYmFjazogKCkgPT4gdm9pZCB0aGlzLmRvQmFja3VwKGZhbHNlKSxcbiAgICB9KTtcblxuICAgIHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgTm90ZUZsYXJlU2V0dGluZ3NUYWIodGhpcy5hcHAsIHRoaXMpKTtcbiAgICBcbiAgICBuZXcgQmFja3VwU2NoZWR1bGVyKHRoaXMpLnJlZ2lzdGVyQXV0b21hdGlvbigpO1xuICB9XG5cbiAgLyoqIFRoZSBjdXJyZW50bHktc2VsZWN0ZWQgc2l0ZSwgb3IgdGhlIGZpcnN0IG9uZSwgb3IgbnVsbCB3aGVuIG5vbmUgZXhpc3QuICovXG4gIGdldEFjdGl2ZVNpdGUoKTogU2l0ZVByb2ZpbGUgfCBudWxsIHtcbiAgICBjb25zdCB7IHNpdGVzLCBhY3RpdmVTaXRlSWQgfSA9IHRoaXMuc2V0dGluZ3M7XG4gICAgcmV0dXJuIHNpdGVzLmZpbmQoKHMpID0+IHMuaWQgPT09IGFjdGl2ZVNpdGVJZCkgPz8gc2l0ZXNbMF0gPz8gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgaXNBY3RpdmVMaXZlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmdldEFjdGl2ZVNpdGUoKT8uaXNQdWJsaXNoZWQgPz8gZmFsc2U7XG4gIH1cblxuICAvKiogUmV2ZWFsIHRoZSBOb3RlRmxhcmUgcGFuZWwgKGNyZWF0aW5nIGl0IGlmIG5lZWRlZCBpbiB0aGUgY29uZmlndXJlZCBsb2NhdGlvbikuICovXG4gIGFzeW5jIGFjdGl2YXRlVmlldygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB7IHdvcmtzcGFjZSB9ID0gdGhpcy5hcHA7XG4gICAgbGV0IGxlYWY6IFdvcmtzcGFjZUxlYWYgfCBudWxsID0gd29ya3NwYWNlLmdldExlYXZlc09mVHlwZShWSUVXX1RZUEVfTk9URUZMQVJFKVswXSA/PyBudWxsO1xuXG4gICAgaWYgKCFsZWFmKSB7XG4gICAgICBjb25zdCBsb2MgPSB0aGlzLnNldHRpbmdzLmRlZmF1bHRWaWV3TG9jYXRpb24gPz8gJ2xlZnQnO1xuICAgICAgaWYgKGxvYyA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICBsZWFmID0gd29ya3NwYWNlLmdldFJpZ2h0TGVhZihmYWxzZSk7XG4gICAgICB9IGVsc2UgaWYgKGxvYyA9PT0gJ3RhYicpIHtcbiAgICAgICAgbGVhZiA9IHdvcmtzcGFjZS5nZXRMZWFmKCd0YWInKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxlYWYgPSB3b3Jrc3BhY2UuZ2V0TGVmdExlYWYoZmFsc2UpO1xuICAgICAgfVxuICAgICAgaWYgKCFsZWFmKSByZXR1cm47XG4gICAgICBhd2FpdCBsZWFmLnNldFZpZXdTdGF0ZSh7IHR5cGU6IFZJRVdfVFlQRV9OT1RFRkxBUkUsIGFjdGl2ZTogdHJ1ZSB9KTtcbiAgICB9XG4gICAgdm9pZCB3b3Jrc3BhY2UucmV2ZWFsTGVhZihsZWFmKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVmcmVzaFZpZXcoKTogdm9pZCB7XG4gICAgdGhpcy5hcHAud29ya3NwYWNlLmdldExlYXZlc09mVHlwZShWSUVXX1RZUEVfTk9URUZMQVJFKS5mb3JFYWNoKChsZWFmKSA9PiB7XG4gICAgICBjb25zdCB2aWV3ID0gbGVhZi52aWV3O1xuICAgICAgaWYgKHZpZXcgaW5zdGFuY2VvZiBOb3RlRmxhcmVWaWV3KSB2aWV3LnJlZnJlc2goKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGRvQmFja3VwKGJhY2tncm91bmQgPSBmYWxzZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICh0aGlzLmJhY2t1cEluUHJvZ3Jlc3MpIHtcbiAgICAgIGlmICghYmFja2dyb3VuZCkgbmV3IE5vdGljZSgnQSBiYWNrdXAgaXMgYWxyZWFkeSBydW5uaW5nLicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuc2V0dGluZ3Muc2V0dXBDb21wbGV0ZSB8fCAhdGhpcy5zZXR0aW5ncy5lbmFibGVCYWNrdXApIHtcbiAgICAgIGlmICghYmFja2dyb3VuZCkge1xuICAgICAgICB0aGlzLm9wZW5TZXR0aW5nc1RhYigpO1xuICAgICAgICBuZXcgTm90aWNlKCdFbmFibGUgcHJpdmF0ZSBiYWNrdXAgaW4gTm90ZUZsYXJlIHNldHRpbmdzIGZpcnN0LicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5zZXR0aW5ncy5iYWNrdXAucmVwb3NpdG9yeSkge1xuICAgICAgdGhpcy5zZXR0aW5ncy5iYWNrdXAucmVwb3NpdG9yeSA9IHRoaXMuZGVmYXVsdEJhY2t1cFJlcG9zaXRvcnkoKTtcbiAgICB9XG5cbiAgICB0aGlzLmJhY2t1cEluUHJvZ3Jlc3MgPSB0cnVlO1xuICAgIHRoaXMuc2V0dGluZ3MuYmFja3VwLmxhc3RCYWNrdXBBdHRlbXB0QXQgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgY29uc3QgZW5naW5lID0gbmV3IEJhY2t1cEVuZ2luZSh0aGlzLmFwcCwgdGhpcy5zZXR0aW5ncywgKG1lc3NhZ2UpID0+IHtcbiAgICAgIGlmICghYmFja2dyb3VuZCkgdGhpcy5zdGF0dXNCYXIuc2V0TWVzc2FnZShgTm90ZUZsYXJlOiAke21lc3NhZ2V9YCk7XG4gICAgfSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZW5naW5lLmJhY2t1cCgpO1xuICAgICAgaWYgKCFyZXN1bHQuc3VjY2VzcykgdGhyb3cgbmV3IEVycm9yKHJlc3VsdC5lcnJvcnNbMF0gPz8gJ0JhY2t1cCBmYWlsZWQuJyk7XG5cbiAgICAgIHRoaXMuc2V0dGluZ3MuYmFja3VwLmxhc3RCYWNrdXBBdCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbiAgICAgIHRoaXMuc2V0dGluZ3MuYmFja3VwLmxhc3RCYWNrdXBFcnJvciA9ICcnO1xuICAgICAgYXdhaXQgdGhpcy5zYXZlU2V0dGluZ3MoKTtcblxuICAgICAgaWYgKCFiYWNrZ3JvdW5kKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSByZXN1bHQudXBkYXRlZCA+IDBcbiAgICAgICAgICA/IGBCYWNrdXAgY29tcGxldGUgXHUwMEI3ICR7cmVzdWx0LnVwZGF0ZWR9IGZpbGUke3Jlc3VsdC51cGRhdGVkID09PSAxID8gJycgOiAncyd9IHVwZGF0ZWRgXG4gICAgICAgICAgOiAnQmFja3VwIGlzIGFscmVhZHkgdXAgdG8gZGF0ZSc7XG4gICAgICAgIG5ldyBOb3RpY2UobWVzc2FnZSwgNTAwMCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLnRvVXNlck1lc3NhZ2UoZXJyb3IsICdCYWNrdXAgZmFpbGVkLicpO1xuICAgICAgdGhpcy5zZXR0aW5ncy5iYWNrdXAubGFzdEJhY2t1cEVycm9yID0gbWVzc2FnZTtcbiAgICAgIGF3YWl0IHRoaXMuc2F2ZVNldHRpbmdzKCk7XG4gICAgICBpZiAoIWJhY2tncm91bmQpIHtcbiAgICAgICAgdGhpcy5zdGF0dXNCYXIuc2V0RXJyb3IobWVzc2FnZSk7XG4gICAgICAgIG5ldyBOb3RpY2UobWVzc2FnZSwgODAwMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBOb3RlRmxhcmUgYmFja2dyb3VuZCBiYWNrdXAgZmFpbGVkOiAke21lc3NhZ2V9YCk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMuYmFja3VwSW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgICAgaWYgKCFiYWNrZ3JvdW5kKSB0aGlzLnVwZGF0ZVN0YXR1c0JhcigpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGRvUHVibGlzaCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBzaXRlID0gdGhpcy5nZXRBY3RpdmVTaXRlKCk7XG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLnNldHVwQ29tcGxldGUgfHwgIXNpdGUpIHtcbiAgICAgIHRoaXMub3BlblNldHRpbmdzVGFiKCk7XG4gICAgICBuZXcgTm90aWNlKCdBZGQgYSBzaXRlIGJlZm9yZSBwdWJsaXNoaW5nLicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEd1YXJkIGFnYWluc3QgZG91YmxlLWNsaWNrcy5cbiAgICBpZiAodGhpcy5wdWJsaXNoSW5Qcm9ncmVzc1tzaXRlLmlkXSkgcmV0dXJuO1xuICAgIHRoaXMucHVibGlzaEluUHJvZ3Jlc3Nbc2l0ZS5pZF0gPSB0cnVlO1xuICAgIHRoaXMucmVmcmVzaFZpZXcoKTtcblxuICAgIGNvbnN0IHB1Ymxpc2hlciA9IG5ldyBQdWJsaXNoZXIodGhpcy5zZXR0aW5ncywgc2l0ZSwgdGhpcy5hcHAsIChtZXNzYWdlKSA9PiB7XG4gICAgICB0aGlzLnN5bmNTdGF0dXNGcm9tUHJvZ3Jlc3MobWVzc2FnZSk7XG4gICAgICB0aGlzLnJlZnJlc2hWaWV3KCk7XG4gICAgfSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcHVibGlzaGVyLnB1Ymxpc2goKTtcbiAgICAgIC8vIHB1Ymxpc2hlci50cyBhbHJlYWR5IHdyb3RlIGxhc3RQdWJsaXNoRmFpbGVkL2xhc3RQdWJsaXNoRXJyb3Igb250byBzaXRlLlxuICAgICAgYXdhaXQgdGhpcy5hcHBseVB1Ymxpc2hSZXN1bHQoc2l0ZSwgcmVzdWx0KTtcbiAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLnRvVXNlck1lc3NhZ2UoZXJyLCAnUHVibGlzaGluZyBmYWlsZWQuIFJldmlldyB5b3VyIHNldHVwIGFuZCB0cnkgYWdhaW4uJyk7XG4gICAgICAvLyBQZXJzaXN0IHRoZSBmYWlsdXJlIHNvIGl0IHN1cnZpdmVzIGEgcmVzdGFydC5cbiAgICAgIHNpdGUubGFzdFB1Ymxpc2hGYWlsZWQgPSB0cnVlO1xuICAgICAgc2l0ZS5sYXN0UHVibGlzaEVycm9yID0gbWVzc2FnZTtcbiAgICAgIHNpdGUuaXNQdWJsaXNoZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuc3RhdHVzQmFyLnNldEVycm9yKG1lc3NhZ2UpO1xuICAgICAgbmV3IE5vdGljZShtZXNzYWdlLCA4MDAwKTtcbiAgICAgIGF3YWl0IHRoaXMuc2F2ZVNldHRpbmdzKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMucHVibGlzaEluUHJvZ3Jlc3Nbc2l0ZS5pZF0gPSBmYWxzZTtcbiAgICAgIHRoaXMucmVmcmVzaFZpZXcoKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBkb1VucHVibGlzaCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBzaXRlID0gdGhpcy5nZXRBY3RpdmVTaXRlKCk7XG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLnNldHVwQ29tcGxldGUgfHwgIXNpdGUpIHtcbiAgICAgIHRoaXMub3BlblNldHRpbmdzVGFiKCk7XG4gICAgICBuZXcgTm90aWNlKCdBZGQgYSBzaXRlIGZpcnN0LicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHB1Ymxpc2hlciA9IG5ldyBQdWJsaXNoZXIodGhpcy5zZXR0aW5ncywgc2l0ZSwgdGhpcy5hcHAsIChtZXNzYWdlKSA9PiB7XG4gICAgICB0aGlzLnN0YXR1c0Jhci5zZXRNZXNzYWdlKGBOb3RlRmxhcmU6ICR7bWVzc2FnZX1gKTtcbiAgICB9KTtcblxuICAgIHRoaXMuc3RhdHVzQmFyLnNldE1lc3NhZ2UoJ05vdGVGbGFyZTogVGFraW5nIHlvdXIgc2l0ZSBvZmZsaW5lLi4uJyk7XG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgcHVibGlzaGVyLnVucHVibGlzaCgpO1xuICAgICAgc2l0ZS5pc1B1Ymxpc2hlZCA9IGZhbHNlO1xuICAgICAgYXdhaXQgdGhpcy5zYXZlU2V0dGluZ3MoKTtcbiAgICAgIHRoaXMudXBkYXRlU3RhdHVzQmFyKCk7XG4gICAgICBuZXcgTm90aWNlKCdZb3VyIHNpdGUgaXMgbm93IG9mZmxpbmUuIFlvdSBjYW4gcHVibGlzaCBhZ2FpbiBhbnkgdGltZS4nKTtcbiAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLnRvVXNlck1lc3NhZ2UoZXJyLCAnVW5wdWJsaXNoIGZhaWxlZC4gQ2hlY2sgeW91ciBDbG91ZGZsYXJlIHNldHRpbmdzIGFuZCB0cnkgYWdhaW4uJyk7XG4gICAgICB0aGlzLnN0YXR1c0Jhci5zZXRFcnJvcihtZXNzYWdlKTtcbiAgICAgIG5ldyBOb3RpY2UobWVzc2FnZSwgODAwMCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgbG9hZFNldHRpbmdzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGxvYWRlZCA9IChhd2FpdCB0aGlzLmxvYWREYXRhKCkpIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgbnVsbDtcbiAgICBjb25zdCB7IHNldHRpbmdzIH0gPSBtaWdyYXRlU2V0dGluZ3MobG9hZGVkKTtcbiAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XG4gIH1cblxuICBhc3luYyBzYXZlU2V0dGluZ3MoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gUGVyc2lzdCB0b2tlbnMgYXMgT1MtZW5jcnlwdGVkIGNpcGhlcnRleHQ7IG5ldmVyIHdyaXRlIHBsYWludGV4dC4gSWZcbiAgICAvLyBzZWN1cmUgc3RvcmFnZSBpcyB1bmF2YWlsYWJsZSB0aGUgdG9rZW5zIHNpbXBseSBhcmVuJ3QgcGVyc2lzdGVkICh0aGV5XG4gICAgLy8gc3RheSBpbiBtZW1vcnkgZm9yIHRoZSBzZXNzaW9uKSByYXRoZXIgdGhhbiBiZWluZyB3cml0dGVuIGluIHRoZSBjbGVhci5cbiAgICBjb25zdCB7IGdpdGh1YlRva2VuLCBjbG91ZGZsYXJlVG9rZW4sIC4uLnJlc3QgfSA9IHRoaXMuc2V0dGluZ3M7XG4gICAgY29uc3QgcGVyc2lzdGVkOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9IHsgLi4ucmVzdCB9O1xuICAgIGlmIChpc1NlY3VyZVN0b3JhZ2VBdmFpbGFibGUoKSkge1xuICAgICAgcGVyc2lzdGVkLmdpdGh1YlRva2VuRW5jID0gZ2l0aHViVG9rZW4gPyBlbmNyeXB0U2VjcmV0KGdpdGh1YlRva2VuKSA6ICcnO1xuICAgICAgcGVyc2lzdGVkLmNsb3VkZmxhcmVUb2tlbkVuYyA9IGNsb3VkZmxhcmVUb2tlbiA/IGVuY3J5cHRTZWNyZXQoY2xvdWRmbGFyZVRva2VuKSA6ICcnO1xuICAgIH1cbiAgICBhd2FpdCB0aGlzLnNhdmVEYXRhKHBlcnNpc3RlZCk7XG5cbiAgICAvLyBLZWVwIHRoZSB2YXVsdCByZWdpc3RyeSBpbiBzeW5jIHNvIHNpdGVzIHN1cnZpdmUgcGx1Z2luIHVuaW5zdGFsbC9yZWluc3RhbGwuXG4gICAgLy8gTm9uLWZhdGFsOiBhIHJlZ2lzdHJ5IHdyaXRlIGZhaWx1cmUgbXVzdCBub3QgYmxvY2sgdGhlIHNldHRpbmdzIHNhdmUuXG4gICAgZm9yIChjb25zdCBzaXRlIG9mIHRoaXMuc2V0dGluZ3Muc2l0ZXMpIHtcbiAgICAgIHZvaWQgVmF1bHRSZWdpc3RyeS51cHNlcnQoXG4gICAgICAgIHRoaXMuYXBwLFxuICAgICAgICBzaXRlLFxuICAgICAgICB0aGlzLnNldHRpbmdzLm1hc3RlclJlcG9zaXRvcnksXG4gICAgICAgIHRoaXMuc2V0dGluZ3MuZ2l0aHViT3duZXIsXG4gICAgICAgIHRoaXMuc2V0dGluZ3MubWFzdGVyUmVwb3NpdG9yeVByaXZhdGUgfHwgZmFsc2UsXG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlU3RhdHVzQmFyKCk7XG4gICAgdGhpcy51cGRhdGVSaWJib25JY29uKCk7XG4gICAgdGhpcy5yZWZyZXNoVmlldygpO1xuICB9XG5cbiAgdXBkYXRlU3RhdHVzQmFyKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5zdGF0dXNCYXIpIHJldHVybjtcblxuICAgIGNvbnN0IHNpdGUgPSB0aGlzLmdldEFjdGl2ZVNpdGUoKTtcbiAgICBpZiAoIXRoaXMuc2V0dGluZ3Muc2V0dXBDb21wbGV0ZSB8fCAhc2l0ZSkge1xuICAgICAgdGhpcy5zdGF0dXNCYXIuc2V0SWRsZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChzaXRlLmlzUHVibGlzaGVkKSB7XG4gICAgICB0aGlzLnN0YXR1c0Jhci5zZXRMaXZlKHNpdGUubGFzdE5vdGVDb3VudCwgc2l0ZS5zaXRlVXJsKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnN0YXR1c0Jhci5zZXRVbnB1Ymxpc2hlZCgpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVSaWJib25JY29uKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5yaWJib25FbCkgcmV0dXJuO1xuXG4gICAgY29uc3QgbGl2ZSA9IHRoaXMuaXNBY3RpdmVMaXZlKCk7XG4gICAgc2V0SWNvbih0aGlzLnJpYmJvbkVsLCBsaXZlID8gJ2Nsb3VkLWNoZWNrJyA6ICdjbG91ZC11cGxvYWQnKTtcbiAgICB0aGlzLnJpYmJvbkVsLnNldEF0dHJpYnV0ZShcbiAgICAgICdhcmlhLWxhYmVsJyxcbiAgICAgIGxpdmUgPyAnTm90ZUZsYXJlOiBVbnB1Ymxpc2ggc2l0ZScgOiAnTm90ZUZsYXJlOiBQdWJsaXNoIHNpdGUnLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHN5bmNTdGF0dXNGcm9tUHJvZ3Jlc3MobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgdXBsb2FkTWF0Y2ggPSAvVXBsb2FkaW5nIChcXGQrKVxcLyhcXGQrKS8uZXhlYyhtZXNzYWdlKTtcbiAgICBpZiAodXBsb2FkTWF0Y2gpIHtcbiAgICAgIHRoaXMuc3RhdHVzQmFyLnNldFB1Ymxpc2hpbmcoTnVtYmVyKHVwbG9hZE1hdGNoWzFdKSwgTnVtYmVyKHVwbG9hZE1hdGNoWzJdKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcmF0ZU1hdGNoID0gL1JhdGUgbGltaXRlZCg/Oi4qPykoXFxkKylzLy5leGVjKG1lc3NhZ2UpO1xuICAgIGlmIChyYXRlTWF0Y2gpIHtcbiAgICAgIHRoaXMuc3RhdHVzQmFyLnNldFJhdGVMaW1pdGVkKE51bWJlcihyYXRlTWF0Y2hbMV0pKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnN0YXR1c0Jhci5zZXRNZXNzYWdlKGBOb3RlRmxhcmU6ICR7bWVzc2FnZX1gKTtcbiAgfVxuXG4gIGRlZmF1bHRCYWNrdXBSZXBvc2l0b3J5KCk6IHN0cmluZyB7XG4gICAgY29uc3QgdmF1bHROYW1lID0gdGhpcy5hcHAudmF1bHQuZ2V0TmFtZSgpXG4gICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgLnJlcGxhY2UoL1teYS16MC05LV0rL2csICctJylcbiAgICAgIC5yZXBsYWNlKC9eLSt8LSskL2csICcnKTtcbiAgICByZXR1cm4gYCR7dmF1bHROYW1lIHx8ICdvYnNpZGlhbi12YXVsdCd9LWJhY2t1cGA7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGFwcGx5UHVibGlzaFJlc3VsdChzaXRlOiBTaXRlUHJvZmlsZSwgcmVzdWx0OiBQdWJsaXNoUmVzdWx0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgc2l0ZS5sYXN0UHVibGlzaGVkID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuICAgIHNpdGUuaXNQdWJsaXNoZWQgPSByZXN1bHQuc3VjY2VzcztcbiAgICAvLyBVc2Ugbm90ZUNvdW50ICh2YXVsdCBmaWxlcyBvbmx5KSBcdTIwMTQgbm90IHJlc3VsdC51cGxvYWRlZCB3aGljaCBhbHNvIGNvdW50cyBidWlsZCBmaWxlcy5cbiAgICBzaXRlLmxhc3ROb3RlQ291bnQgPSByZXN1bHQubm90ZUNvdW50O1xuICAgIC8vIGxhc3RQdWJsaXNoRmFpbGVkIGFuZCBsYXN0UHVibGlzaEVycm9yIHdlcmUgYWxyZWFkeSBzZXQgYnkgcHVibGlzaGVyLnRzO1xuICAgIC8vIGVuc3VyZSB0aGV5J3JlIGNvcnJlY3QgZXZlbiBpZiBwdWJsaXNoZXIgZGlkbid0IHNldCB0aGVtIChzaG91bGRuJ3QgaGFwcGVuKS5cbiAgICBzaXRlLmxhc3RQdWJsaXNoRmFpbGVkID0gIXJlc3VsdC5zdWNjZXNzO1xuICAgIHNpdGUubGFzdFB1Ymxpc2hFcnJvciA9IHJlc3VsdC5zdWNjZXNzID8gJycgOiAocmVzdWx0LmVycm9yc1swXSA/PyAnVW5rbm93biBlcnJvcicpO1xuICAgIGF3YWl0IHRoaXMuc2F2ZVNldHRpbmdzKCk7XG5cbiAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgIHRoaXMuc3RhdHVzQmFyLnNldExpdmUocmVzdWx0Lm5vdGVDb3VudCwgc2l0ZS5zaXRlVXJsKTtcbiAgICAgIGNvbnN0IGZpeGVkTm90ZSA9IHJlc3VsdC5maXhlZCA+IDAgPyBgIChhdXRvLWZpeGVkICR7cmVzdWx0LmZpeGVkfSBmcm9udG1hdHRlciBpc3N1ZSR7cmVzdWx0LmZpeGVkID09PSAxID8gJycgOiAncyd9KWAgOiAnJztcbiAgICAgIG5ldyBOb3RpY2UoYFB1Ymxpc2hlZCAke3Jlc3VsdC5ub3RlQ291bnR9IGZpbGUke3Jlc3VsdC5ub3RlQ291bnQgPT09IDEgPyAnJyA6ICdzJ30gdG8gJHtzaXRlLnNpdGVVcmx9JHtmaXhlZE5vdGV9YCwgNjAwMCk7XG4gICAgICAvLyBLaWNrIG9mZiBhIGxpdmUgc3RhdHVzIGZldGNoIHNvIHRoZSBwYW5lbCByZWZsZWN0cyB0aGUgbmV3IGRlcGxveW1lbnQuXG4gICAgICB2b2lkIHRoaXMuZmV0Y2hMaXZlU3RhdHVzKHNpdGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGZpcnN0RXJyb3IgPSByZXN1bHQuZXJyb3JzWzBdID8/ICdQdWJsaXNoaW5nIGZhaWxlZC4gUmV2aWV3IHlvdXIgc2V0dXAgYW5kIHRyeSBhZ2Fpbi4nO1xuICAgIHRoaXMuc3RhdHVzQmFyLnNldEVycm9yKGZpcnN0RXJyb3IpO1xuICAgIG5ldyBOb3RpY2UoYEZhaWxlZCB0byBwdWJsaXNoOiAke2ZpcnN0RXJyb3J9YCwgODAwMCk7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggbGl2ZSBHaXRIdWIgc3RhdHVzIGZvciB0aGUgZ2l2ZW4gc2l0ZSBhbmQgY2FjaGUgaXQgaW4gYGxpdmVTdGF0dXNgLlxuICAgKiBUaGUgdmlldyBjYWxscyB0aGlzIG9uIG9wZW4gYW5kIG9uIHRoZSBSZWZyZXNoIGJ1dHRvbi4gTmV2ZXIgdGhyb3dzLlxuICAgKi9cbiAgYXN5bmMgZmV0Y2hMaXZlU3RhdHVzKHNpdGU6IFNpdGVQcm9maWxlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcmVwbyA9IHNpdGUuZ2l0aHViUmVwbyB8fCB0aGlzLnNldHRpbmdzLm1hc3RlclJlcG9zaXRvcnk7XG4gICAgXG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLmdpdGh1YlRva2VuIHx8ICF0aGlzLnNldHRpbmdzLmdpdGh1Yk93bmVyIHx8ICFyZXBvKSB7XG4gICAgICB0aGlzLmxpdmVTdGF0dXNbc2l0ZS5pZF0gPSB7XG4gICAgICAgIC4uLih0aGlzLmxpdmVTdGF0dXNbc2l0ZS5pZF0gPz8ge30pLFxuICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgZXJyb3I6ICFyZXBvID8gJ0dpdEh1YiByZXBvc2l0b3J5IG5vdCBjb25maWd1cmVkLicgOiAnR2l0SHViIGFjY291bnQgbm90IGNvbm5lY3RlZC4nLFxuICAgICAgfSBhcyBMaXZlU2l0ZVN0YXR1cztcbiAgICAgIHRoaXMucmVmcmVzaFZpZXcoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBicmFuY2ggPSBzaXRlLmdpdGh1YkJyYW5jaCB8fCAnbWFpbic7XG4gICAgY29uc3QgZ2l0aHViID0gbmV3IEdpdEh1YkFwaShcbiAgICAgIHRoaXMuc2V0dGluZ3MuZ2l0aHViVG9rZW4sXG4gICAgICB0aGlzLnNldHRpbmdzLmdpdGh1Yk93bmVyLFxuICAgICAgcmVwbyxcbiAgICAgIGJyYW5jaCxcbiAgICApO1xuXG4gICAgLy8gTWFyayBsb2FkaW5nIHNvIHRoZSB2aWV3IGNhbiBzaG93IGEgc3Bpbm5lci5cbiAgICB0aGlzLmxpdmVTdGF0dXNbc2l0ZS5pZF0gPSB7XG4gICAgICAuLi4odGhpcy5saXZlU3RhdHVzW3NpdGUuaWRdID8/IHt9KSxcbiAgICAgIGxvYWRpbmc6IHRydWUsXG4gICAgfSBhcyBMaXZlU2l0ZVN0YXR1cztcbiAgICB0aGlzLnJlZnJlc2hWaWV3KCk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgW3JlcG9JbmZvLCB3b3JrZmxvd1J1biwgbGF0ZXN0Q29tbWl0XSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgZ2l0aHViLmdldFJlcG9JbmZvKCksXG4gICAgICAgIGdpdGh1Yi5nZXRMYXRlc3RXb3JrZmxvd1J1bignZGVwbG95LnltbCcpLFxuICAgICAgICBnaXRodWIuZ2V0TGF0ZXN0Q29tbWl0KGJyYW5jaCksXG4gICAgICBdKTtcblxuICAgICAgbGV0IGNmV29ya2Zsb3dTdGF0dXMgPSB3b3JrZmxvd1J1bj8uc3RhdHVzID8/ICcnO1xuICAgICAgbGV0IGNmV29ya2Zsb3dDb25jbHVzaW9uID0gd29ya2Zsb3dSdW4/LmNvbmNsdXNpb24gPz8gJyc7XG4gICAgICBsZXQgY2ZXb3JrZmxvd1VybCA9IHdvcmtmbG93UnVuPy5odG1sVXJsID8/ICcnO1xuICAgICAgbGV0IGNmV29ya2Zsb3dVcGRhdGVkQXQgPSB3b3JrZmxvd1J1bj8udXBkYXRlZEF0ID8/ICcnO1xuXG4gICAgICBpZiAoc2l0ZS5ob3N0aW5nUHJvdmlkZXIgPT09ICdjbG91ZGZsYXJlJyAmJiB0aGlzLnNldHRpbmdzLmNsb3VkZmxhcmVUb2tlbiAmJiB0aGlzLnNldHRpbmdzLmNsb3VkZmxhcmVBY2NvdW50ICYmIHNpdGUuY2xvdWRmbGFyZVByb2plY3QpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBjZiA9IG5ldyBDbG91ZGZsYXJlQXBpKHRoaXMuc2V0dGluZ3MuY2xvdWRmbGFyZVRva2VuLCB0aGlzLnNldHRpbmdzLmNsb3VkZmxhcmVBY2NvdW50KTtcbiAgICAgICAgICBjb25zdCBjZkRlcGxveW1lbnRzID0gYXdhaXQgY2YubGlzdERlcGxveW1lbnRzKHNpdGUuY2xvdWRmbGFyZVByb2plY3QpO1xuICAgICAgICAgIGNvbnN0IGxhdGVzdENmID0gY2ZEZXBsb3ltZW50cz8ucmVzdWx0Py5bMF07XG4gICAgICAgICAgaWYgKGxhdGVzdENmKSB7XG4gICAgICAgICAgICBjb25zdCBzdGF0dXMgPSBsYXRlc3RDZi5zdGF0dXMgYXMgc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ3F1ZXVlZCcgfHwgc3RhdHVzID09PSAncGVuZGluZycgfHwgc3RhdHVzID09PSAnaW5fcHJvZ3Jlc3MnKSB7XG4gICAgICAgICAgICAgIGNmV29ya2Zsb3dTdGF0dXMgPSAnaW5fcHJvZ3Jlc3MnO1xuICAgICAgICAgICAgICBjZldvcmtmbG93Q29uY2x1c2lvbiA9ICcnO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09ICdzdWNjZXNzJyB8fCBzdGF0dXMgPT09ICdhY3RpdmUnKSB7XG4gICAgICAgICAgICAgIGNmV29ya2Zsb3dTdGF0dXMgPSAnY29tcGxldGVkJztcbiAgICAgICAgICAgICAgY2ZXb3JrZmxvd0NvbmNsdXNpb24gPSAnc3VjY2Vzcyc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ2ZhaWx1cmUnIHx8IHN0YXR1cyA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICBjZldvcmtmbG93U3RhdHVzID0gJ2NvbXBsZXRlZCc7XG4gICAgICAgICAgICAgIGNmV29ya2Zsb3dDb25jbHVzaW9uID0gJ2ZhaWx1cmUnO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09ICdjYW5jZWxlZCcpIHtcbiAgICAgICAgICAgICAgY2ZXb3JrZmxvd1N0YXR1cyA9ICdjb21wbGV0ZWQnO1xuICAgICAgICAgICAgICBjZldvcmtmbG93Q29uY2x1c2lvbiA9ICdjYW5jZWxsZWQnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY2ZXb3JrZmxvd1N0YXR1cyA9ICdjb21wbGV0ZWQnO1xuICAgICAgICAgICAgICBjZldvcmtmbG93Q29uY2x1c2lvbiA9ICdzdWNjZXNzJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNmV29ya2Zsb3dVcmwgPSAobGF0ZXN0Q2YudXJsIGFzIHN0cmluZyB8IHVuZGVmaW5lZCkgfHwgJyc7XG4gICAgICAgICAgICBjZldvcmtmbG93VXBkYXRlZEF0ID0gKGxhdGVzdENmLm1vZGlmaWVkX29uIGFzIHN0cmluZyB8IHVuZGVmaW5lZCkgfHwgKGxhdGVzdENmLmNyZWF0ZWRfb24gYXMgc3RyaW5nIHwgdW5kZWZpbmVkKSB8fCAnJztcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGNmRXJyOiB1bmtub3duKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdOb3RlRmxhcmU6IGNvdWxkIG5vdCBmZXRjaCBDbG91ZGZsYXJlIHN0YXR1czonLCBjZkVycik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5saXZlU3RhdHVzW3NpdGUuaWRdID0ge1xuICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgcmVwb0h0bWxVcmw6IHJlcG9JbmZvPy5odG1sVXJsID8/ICcnLFxuICAgICAgICByZXBvUHVzaGVkQXQ6IHJlcG9JbmZvPy5wdXNoZWRBdCA/PyAnJyxcbiAgICAgICAgd29ya2Zsb3dTdGF0dXM6IGNmV29ya2Zsb3dTdGF0dXMsXG4gICAgICAgIHdvcmtmbG93Q29uY2x1c2lvbjogY2ZXb3JrZmxvd0NvbmNsdXNpb24sXG4gICAgICAgIHdvcmtmbG93VXJsOiBjZldvcmtmbG93VXJsLFxuICAgICAgICB3b3JrZmxvd1VwZGF0ZWRBdDogY2ZXb3JrZmxvd1VwZGF0ZWRBdCxcbiAgICAgICAgY29tbWl0U2hhOiBsYXRlc3RDb21taXQ/LnNoYSA/PyAnJyxcbiAgICAgICAgY29tbWl0TWVzc2FnZTogbGF0ZXN0Q29tbWl0Py5tZXNzYWdlID8/ICcnLFxuICAgICAgICBjb21taXREYXRlOiBsYXRlc3RDb21taXQ/LmRhdGUgPz8gJycsXG4gICAgICAgIGZldGNoZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICBlcnJvcjogJycsXG4gICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycjogdW5rbm93bikge1xuICAgICAgdGhpcy5saXZlU3RhdHVzW3NpdGUuaWRdID0ge1xuICAgICAgICAuLi4odGhpcy5saXZlU3RhdHVzW3NpdGUuaWRdID8/IHt9KSxcbiAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgIGVycm9yOiAoZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6ICdTdGF0dXMgZmV0Y2ggZmFpbGVkJyksXG4gICAgICB9IGFzIExpdmVTaXRlU3RhdHVzO1xuICAgIH1cblxuICAgIHRoaXMucmVmcmVzaFZpZXcoKTtcbiAgfVxuXG4gIG9wZW5TZXR0aW5nc1RhYigpOiB2b2lkIHtcbiAgICBjb25zdCBzZXR0aW5nID0gKCh0aGlzLmFwcCBhcyB1bmtub3duKSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikuc2V0dGluZyBhc1xuICAgICAgfCB7IG9wZW4/OiAoKSA9PiB2b2lkOyBvcGVuVGFiQnlJZD86IChpZDogc3RyaW5nKSA9PiB2b2lkIH1cbiAgICAgIHwgdW5kZWZpbmVkO1xuICAgIHNldHRpbmc/Lm9wZW4/LigpO1xuICAgIHNldHRpbmc/Lm9wZW5UYWJCeUlkPy4odGhpcy5tYW5pZmVzdC5pZCk7XG4gIH1cblxuICBwcml2YXRlIHRvVXNlck1lc3NhZ2UoZXJyOiB1bmtub3duLCBmYWxsYmFjazogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBtZXNzYWdlID0gZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6ICcnO1xuICAgIHJldHVybiBtZXNzYWdlIHx8IGZhbGxiYWNrO1xuICB9XG59XG5cbi8qKlxuICogQnVpbGQgdGhlIGluLW1lbW9yeSBzZXR0aW5ncyBmcm9tIHdoYXRldmVyIGlzIGluIGBkYXRhLmpzb25gLCB1cGdyYWRpbmcgdHdvXG4gKiBsZWdhY3kgc2hhcGVzIHNvIGV4aXN0aW5nIHVzZXJzIGtlZXAgd29ya2luZzpcbiAqICAxLiBwbGFpbnRleHQgYGdpdGh1YlRva2VuYC9gY2xvdWRmbGFyZVRva2VuYCBcdTIxOTIgZGVjcnlwdC1vbi1sb2FkIHZpYSBgKkVuY2BcbiAqICAgICAodGhlIHBsYWludGV4dCBpcyBzY3J1YmJlZCBvbiB0aGUgbmV4dCBzYXZlKS5cbiAqICAyLiBmbGF0IHNpbmdsZS1zaXRlIGZpZWxkcyAoYGdpdGh1YlJlcG9gLCBgY2xvdWRmbGFyZVByb2plY3RgLCBcdTIwMjYpIFx1MjE5MiBvbmVcbiAqICAgICBTaXRlUHJvZmlsZSBpbiBgc2l0ZXNbXWAuXG4gKi9cbmZ1bmN0aW9uIG1pZ3JhdGVTZXR0aW5ncyhcbiAgbG9hZGVkOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IG51bGwsXG4pOiB7IHNldHRpbmdzOiBOb3RlRmxhcmVTZXR0aW5ncyB9IHtcbiAgY29uc3Qgc2V0dGluZ3M6IE5vdGVGbGFyZVNldHRpbmdzID0ge1xuICAgIC4uLkRFRkFVTFRfU0VUVElOR1MsXG4gICAgc2l0ZXM6IFtdLFxuICAgIGJhY2t1cDogeyAuLi5ERUZBVUxUX0JBQ0tVUF9TRVRUSU5HUyB9LFxuICB9O1xuICBpZiAoIWxvYWRlZCkgcmV0dXJuIHsgc2V0dGluZ3MgfTtcblxuICBjb25zdCBzdHIgPSAodjogdW5rbm93bik6IHN0cmluZyA9PiAodHlwZW9mIHYgPT09ICdzdHJpbmcnID8gdiA6ICcnKTtcbiAgc2V0dGluZ3MuZ2l0aHViT3duZXIgPSBzdHIobG9hZGVkLmdpdGh1Yk93bmVyKTtcbiAgc2V0dGluZ3MuY2xvdWRmbGFyZUFjY291bnQgPSBzdHIobG9hZGVkLmNsb3VkZmxhcmVBY2NvdW50KTtcbiAgc2V0dGluZ3MubWFzdGVyUmVwb3NpdG9yeSA9IHN0cihsb2FkZWQubWFzdGVyUmVwb3NpdG9yeSkgfHwgJ25vdGVmbGFyZS1zaXRlcyc7XG4gIHNldHRpbmdzLm1hc3RlclJlcG9zaXRvcnlQcml2YXRlID0gbG9hZGVkLm1hc3RlclJlcG9zaXRvcnlQcml2YXRlID09PSB0cnVlO1xuICBzZXR0aW5ncy5zZXR1cENvbXBsZXRlID0gbG9hZGVkLnNldHVwQ29tcGxldGUgPT09IHRydWU7XG4gIHNldHRpbmdzLmFjdGl2ZVNpdGVJZCA9IHN0cihsb2FkZWQuYWN0aXZlU2l0ZUlkKTtcbiAgc2V0dGluZ3MuZW5hYmxlQmFja3VwID0gbG9hZGVkLmVuYWJsZUJhY2t1cCA9PT0gdHJ1ZTtcbiAgc2V0dGluZ3MuZW5hYmxlUHVibGlzaCA9IGxvYWRlZC5lbmFibGVQdWJsaXNoICE9PSBmYWxzZTsgLy8gZGVmYXVsdCB0cnVlXG4gIGNvbnN0IHNhdmVkQmFja3VwID0gdHlwZW9mIGxvYWRlZC5iYWNrdXAgPT09ICdvYmplY3QnICYmIGxvYWRlZC5iYWNrdXAgIT09IG51bGxcbiAgICA/IGxvYWRlZC5iYWNrdXAgYXMgUGFydGlhbDxOb3RlRmxhcmVTZXR0aW5nc1snYmFja3VwJ10+XG4gICAgOiBudWxsO1xuICBzZXR0aW5ncy5iYWNrdXAgPSB7XG4gICAgLi4uREVGQVVMVF9CQUNLVVBfU0VUVElOR1MsXG4gICAgLi4uKHNhdmVkQmFja3VwID8/IHt9KSxcbiAgICByZXBvc2l0b3J5OiBzYXZlZEJhY2t1cD8ucmVwb3NpdG9yeSA/PyAnJyxcbiAgICByZXBvVmlzaWJpbGl0eTogKHNhdmVkQmFja3VwPy5yZXBvVmlzaWJpbGl0eSBhcyAncHJpdmF0ZScgfCAncHVibGljJyB8IHVuZGVmaW5lZCkgPz8gJ3ByaXZhdGUnLFxuICAgIGJhY2t1cE9uQ2hhbmdlOiBzYXZlZEJhY2t1cD8uYmFja3VwT25DaGFuZ2UgPz8gdHJ1ZSxcbiAgICBsYXN0QmFja3VwQXQ6IHNhdmVkQmFja3VwPy5sYXN0QmFja3VwQXQgPz8gJycsXG4gIH07XG5cbiAgaWYgKGxvYWRlZC5naXRodWJUb2tlbkVuYykge1xuICAgIHNldHRpbmdzLmdpdGh1YlRva2VuID0gZGVjcnlwdFNlY3JldChzdHIobG9hZGVkLmdpdGh1YlRva2VuRW5jKSk7XG4gIH1cbiAgaWYgKGxvYWRlZC5jbG91ZGZsYXJlVG9rZW5FbmMpIHtcbiAgICBzZXR0aW5ncy5jbG91ZGZsYXJlVG9rZW4gPSBkZWNyeXB0U2VjcmV0KHN0cihsb2FkZWQuY2xvdWRmbGFyZVRva2VuRW5jKSk7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShsb2FkZWQuc2l0ZXMpKSB7XG4gICAgc2V0dGluZ3Muc2l0ZXMgPSAobG9hZGVkLnNpdGVzIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+W10pLm1hcCgocykgPT4ge1xuICAgICAgLy8gTWlncmF0ZSBsZWdhY3kgcHVibGlzaFNjb3BlICgnZm9sZGVyJyB8ICdwYWdlJykgYW5kIHB1Ymxpc2hQYXRoIHRvIHB1Ymxpc2hQYXRoc1xuICAgICAgbGV0IHB1Ymxpc2hTY29wZSA9IHMucHVibGlzaFNjb3BlIGFzIHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgIGxldCBwdWJsaXNoUGF0aHMgPSBzLnB1Ymxpc2hQYXRocyBhcyBzdHJpbmdbXSB8IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHB1Ymxpc2hTY29wZSA9PT0gJ2ZvbGRlcicgfHwgcHVibGlzaFNjb3BlID09PSAncGFnZScpIHtcbiAgICAgICAgcHVibGlzaFNjb3BlID0gJ3NlbGVjdGVkJztcbiAgICAgICAgY29uc3QgbGVnYWN5UGF0aCA9IHMucHVibGlzaFBhdGggYXMgc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICBpZiAobGVnYWN5UGF0aCAmJiAhcHVibGlzaFBhdGhzKSB7XG4gICAgICAgICAgcHVibGlzaFBhdGhzID0gW2xlZ2FjeVBhdGhdO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIE1pZ3JhdGUgbGVnYWN5IGRlcGxveVRhcmdldCB0byBob3N0aW5nUHJvdmlkZXIsIHRoZW4gZGlzY2FyZCBpdC5cbiAgICAgIGxldCBob3N0aW5nUHJvdmlkZXIgPSBzLmhvc3RpbmdQcm92aWRlciBhcyBTaXRlUHJvZmlsZVsnaG9zdGluZ1Byb3ZpZGVyJ10gfCB1bmRlZmluZWQ7XG4gICAgICBpZiAoIWhvc3RpbmdQcm92aWRlcikge1xuICAgICAgICBjb25zdCBsZWdhY3lUYXJnZXQgPSBzLmRlcGxveVRhcmdldCBhcyBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICAgIGhvc3RpbmdQcm92aWRlciA9IGxlZ2FjeVRhcmdldCA9PT0gJ2Nsb3VkZmxhcmUnID8gJ2Nsb3VkZmxhcmUnIDogJ2dpdGh1Yi1wYWdlcyc7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgZGVwbG95VGFyZ2V0OiBfZHQsIC4uLnJlc3QgfSA9IHMgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gICAgICB2b2lkIF9kdDsgLy8gY29uc3VtZWQgYnkgbWlncmF0aW9uIGFib3ZlXG5cbiAgICAgIHJldHVybiBjcmVhdGVTaXRlUHJvZmlsZSh7XG4gICAgICAgIC4uLihyZXN0IGFzIFBhcnRpYWw8U2l0ZVByb2ZpbGU+KSxcbiAgICAgICAgcHVibGlzaFNjb3BlOiAocHVibGlzaFNjb3BlIGFzICd2YXVsdCcgfCAnc2VsZWN0ZWQnKSB8fCAndmF1bHQnLFxuICAgICAgICBwdWJsaXNoUGF0aHM6IHB1Ymxpc2hQYXRocyB8fCBbXSxcbiAgICAgICAgaG9zdGluZ1Byb3ZpZGVyLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBFbnN1cmUgdGhlIGFjdGl2ZSBpZCBwb2ludHMgYXQgYSByZWFsIHNpdGUuXG4gIGlmICghc2V0dGluZ3Muc2l0ZXMuc29tZSgocykgPT4gcy5pZCA9PT0gc2V0dGluZ3MuYWN0aXZlU2l0ZUlkKSkge1xuICAgIHNldHRpbmdzLmFjdGl2ZVNpdGVJZCA9IHNldHRpbmdzLnNpdGVzWzBdPy5pZCA/PyAnJztcbiAgfVxuXG4gIHJldHVybiB7IHNldHRpbmdzIH07XG59IiwgImltcG9ydCB7IHJlcXVlc3RVcmwgfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgeyBVcGxvYWRGaWxlLCBQdWJsaXNoUmVzdWx0IH0gZnJvbSAnLi4vY29yZS90eXBlcyc7XG5cblxuYXN5bmMgZnVuY3Rpb24gZG9SZXF1ZXN0KHVybDogc3RyaW5nLCBvcHRpb25zOiB7IG1ldGhvZD86IHN0cmluZzsgaGVhZGVycz86IFJlY29yZDxzdHJpbmcsIHN0cmluZz47IGJvZHk/OiBzdHJpbmcgfSA9IHt9KSB7XG4gIGNvbnN0IHJlc3AgPSBhd2FpdCByZXF1ZXN0VXJsKHtcbiAgICB1cmwsXG4gICAgbWV0aG9kOiBvcHRpb25zLm1ldGhvZCB8fCAnR0VUJyxcbiAgICBoZWFkZXJzOiBvcHRpb25zLmhlYWRlcnMsXG4gICAgYm9keTogb3B0aW9ucy5ib2R5LFxuICAgIHRocm93OiBmYWxzZVxuICB9KTtcbiAgcmV0dXJuIHtcbiAgICBvazogcmVzcC5zdGF0dXMgPj0gMjAwICYmIHJlc3Auc3RhdHVzIDwgMzAwLFxuICAgIHN0YXR1czogcmVzcC5zdGF0dXMsXG4gICAganNvbjogYXN5bmMgKCkgPT4gcmVzcC5qc29uIGFzIHVua25vd24sXG4gICAgdGV4dDogYXN5bmMgKCkgPT4gcmVzcC50ZXh0XG4gIH07XG59XG5cbmNvbnN0IEdJVEhVQl9BUEkgPSAnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbSc7XG5jb25zdCBCQVRDSF9TSVpFID0gMTA7XG5jb25zdCBSQVRFX0xJTUlUX1dBSVRfTVMgPSA2MDAwMDtcblxuZXhwb3J0IGNsYXNzIEdpdEh1YkFwaSB7XG4gIHByaXZhdGUgdG9rZW46IHN0cmluZztcbiAgcHJpdmF0ZSBvd25lcjogc3RyaW5nO1xuICBwcml2YXRlIHJlcG86IHN0cmluZztcbiAgcHJpdmF0ZSBicmFuY2g6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICB0b2tlbjogc3RyaW5nLFxuICAgIG93bmVyOiBzdHJpbmcsXG4gICAgcmVwbzogc3RyaW5nLFxuICAgIGJyYW5jaCA9ICcnLFxuICApIHtcbiAgICB0aGlzLnRva2VuID0gdG9rZW47XG4gICAgdGhpcy5vd25lciA9IG93bmVyO1xuICAgIHRoaXMucmVwbyA9IHJlcG8udHJpbSgpLnJlcGxhY2UoL1xccysvZywgJy0nKTtcbiAgICB0aGlzLmJyYW5jaCA9IGJyYW5jaDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGhlYWRlcnMoKTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIEF1dGhvcml6YXRpb246IGB0b2tlbiAke3RoaXMudG9rZW59YCxcbiAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL3ZuZC5naXRodWIranNvbicsXG4gICAgICAnWC1HaXRIdWItQXBpLVZlcnNpb24nOiAnMjAyMi0xMS0yOCcsXG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgIH07XG4gIH1cblxuICBhc3luYyBnZXRBdXRoZW50aWNhdGVkVXNlcigpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBkb1JlcXVlc3QoYCR7R0lUSFVCX0FQSX0vdXNlcmAsIHsgaGVhZGVyczogdGhpcy5oZWFkZXJzIH0pO1xuICAgIGlmICghcmVzcC5vaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIEdpdEh1YiB0b2tlbiBvciBtaXNzaW5nIHJlcG8gcGVybWlzc2lvbicpO1xuICAgIH1cbiAgICBjb25zdCBkYXRhID0gKGF3YWl0IHJlc3AuanNvbigpKSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgICByZXR1cm4gKGRhdGE/LmxvZ2luIGFzIHN0cmluZyk7XG4gIH1cblxuICAvKiogVGhlIHJlcG8ncyBkZWZhdWx0IGJyYW5jaCAoZS5nLiBgbWFpbmApLiAqL1xuICBhc3luYyBnZXREZWZhdWx0QnJhbmNoKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IGRvUmVxdWVzdChgJHtHSVRIVUJfQVBJfS9yZXBvcy8ke3RoaXMub3duZXJ9LyR7dGhpcy5yZXBvfWAsIHtcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICB9KTtcbiAgICBpZiAoIXJlc3Aub2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IHJlYWQgcmVwb3NpdG9yeSBpbmZvIGZyb20gR2l0SHViLiBDaGVjayB0aGUgdG9rZW4gYW5kIHJlcG8gbmFtZS4nKTtcbiAgICB9XG4gICAgY29uc3QgZGF0YSA9IChhd2FpdCByZXNwLmpzb24oKSkgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gICAgcmV0dXJuIChkYXRhPy5kZWZhdWx0X2JyYW5jaCBhcyBzdHJpbmcpIHx8ICdtYWluJztcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYW4gZW1wdHkgcHVibGljIHJlcG8sIGluaXRpYWxpc2VkIHdpdGggb25lIGNvbW1pdCBvbiB0aGUgZGVmYXVsdFxuICAgKiBicmFuY2ggKGBtYWluYCkuIE5vdGVGbGFyZSB0aGVuIGNvbW1pdHMgdGhlIHVzZXIncyBjb250ZW50IHBsdXMgYSBtZGdhcmRlblxuICAgKiBgcGFja2FnZS5qc29uYC9gbWRnYXJkZW4uY29uZmlnLmpzb25gIG9uIHRvcCBcdTIwMTQgdGhlcmUncyBubyB0ZW1wbGF0ZSBmb3JrLCBzb1xuICAgKiB0aGVyZSdzIG5vIHY0L3Y1IGJyYW5jaCBkcmlmdCB0byBtYW5hZ2UuIElkZW1wb3RlbnQ6IGEgNDIyIChhbHJlYWR5IGV4aXN0cylcbiAgICogaXMgdHJlYXRlZCBhcyBzdWNjZXNzIHNvIHNldHVwIGNhbiBiZSByZS1ydW4uXG4gICAqL1xuICBhc3luYyBjcmVhdGVSZXBvKHByaXZhdGVSZXBvID0gZmFsc2UpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCByZXNwID0gYXdhaXQgZG9SZXF1ZXN0KGAke0dJVEhVQl9BUEl9L3VzZXIvcmVwb3NgLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgbmFtZTogdGhpcy5yZXBvLFxuICAgICAgICBwcml2YXRlOiBwcml2YXRlUmVwbyxcbiAgICAgICAgYXV0b19pbml0OiB0cnVlLFxuICAgICAgICBkZXNjcmlwdGlvbjogcHJpdmF0ZVJlcG8gPyAnUHJpdmF0ZSB2YXVsdCBiYWNrdXAgbWFuYWdlZCBieSBOb3RlRmxhcmUnIDogJ1B1Ymxpc2hlZCB3aXRoIE5vdGVGbGFyZSAobWRnYXJkZW4pJyxcbiAgICAgIH0pLFxuICAgIH0pO1xuXG4gICAgaWYgKHJlc3Auc3RhdHVzID09PSA0MjIpIHtcbiAgICAgIC8vIDQyMiBhbG1vc3QgYWx3YXlzIG1lYW5zIHRoZSByZXBvIG5hbWUgaXMgYWxyZWFkeSB0YWtlbiBcdTIwMTQgZWl0aGVyIGJ5XG4gICAgICAvLyB0aGlzIHVzZXIgKGlkZW1wb3RlbnQgc3VjY2Vzcykgb3IgYnkgc29tZW9uZSBlbHNlIChtdXN0IHJlbmFtZSkuXG4gICAgICBjb25zdCBlcnJCb2R5ID0gKGF3YWl0IHJlc3AuanNvbigpLmNhdGNoKCgpID0+ICh7fSkpKSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgICAgIGNvbnN0IGdoTWVzc2FnZTogc3RyaW5nID0gKGVyckJvZHk/Lm1lc3NhZ2UgYXMgc3RyaW5nKSA/PyAnJztcbiAgICAgIGNvbnN0IGVycm9yczogQXJyYXk8eyBtZXNzYWdlPzogc3RyaW5nIH0+ID0gKGVyckJvZHk/LmVycm9ycyBhcyBBcnJheTx7IG1lc3NhZ2U/OiBzdHJpbmcgfT4pID8/IFtdO1xuICAgICAgY29uc3QgYWxyZWFkeUV4aXN0cyA9IGVycm9ycy5zb21lKChlKSA9PlxuICAgICAgICAoZS5tZXNzYWdlID8/ICcnKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdhbHJlYWR5IGV4aXN0JyksXG4gICAgICApIHx8IGdoTWVzc2FnZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdhbHJlYWR5IGV4aXN0Jyk7XG5cbiAgICAgIGlmIChhbHJlYWR5RXhpc3RzICYmIGF3YWl0IHRoaXMucmVwb0V4aXN0cygpKSB7XG4gICAgICAgIC8vIFRoZSByZXBvIGJlbG9uZ3MgdG8gdGhpcyBhY2NvdW50IFx1MjAxNCB0cmVhdCBhcyBzdWNjZXNzIChyZS1ydW4gb2Ygc2V0dXApLlxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBBIEdpdEh1YiByZXBvc2l0b3J5IG5hbWVkIFwiJHt0aGlzLnJlcG99XCIgYWxyZWFkeSBleGlzdHMuIGAgK1xuICAgICAgICAnUGxlYXNlIGNob29zZSBhIGRpZmZlcmVudCBzaXRlIG5hbWUgYW5kIHRyeSBhZ2Fpbi4nLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoIXJlc3Aub2spIHtcbiAgICAgIGNvbnN0IGVyciA9IChhd2FpdCByZXNwLmpzb24oKS5jYXRjaCgoKSA9PiAoe30pKSkgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBjcmVhdGUgR2l0SHViIHJlcG86ICR7KGVyciBhcyB7IG1lc3NhZ2U/OiBzdHJpbmcgfSkubWVzc2FnZSA/PyAnVW5rbm93biBlcnJvcid9YCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbmZpZ3VyZXMgR2l0SHViIFBhZ2VzIGZvciB0aGUgcmVwb3NpdG9yeSB1c2luZyBHaXRIdWIgQWN0aW9ucyBhcyB0aGUgc291cmNlLlxuICAgKiBUaGlzIHByZXZlbnRzIHRoZSA0MDQgZXJyb3IgZHVyaW5nIHRoZSBmaXJzdCBkZXBsb3ktcGFnZXMgYWN0aW9uLlxuICAgKi9cbiAgYXN5bmMgZW5hYmxlR2l0SHViUGFnZXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IGRvUmVxdWVzdChgJHtHSVRIVUJfQVBJfS9yZXBvcy8ke3RoaXMub3duZXJ9LyR7dGhpcy5yZXBvfS9wYWdlc2AsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAuLi50aGlzLmhlYWRlcnMsXG4gICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL3ZuZC5naXRodWIudjMranNvbicsXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBidWlsZF90eXBlOiAnd29ya2Zsb3cnLFxuICAgICAgfSksXG4gICAgfSk7XG5cbiAgICBpZiAoIXJlc3Aub2sgJiYgcmVzcC5zdGF0dXMgIT09IDQwOSkgeyAvLyA0MDkgbWVhbnMgYWxyZWFkeSBlbmFibGVkXG4gICAgICBjb25zdCB0ZXh0ID0gYXdhaXQgcmVzcC50ZXh0KCkuY2F0Y2goKCkgPT4gJycpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gZW5hYmxlIEdpdEh1YiBQYWdlczogJHtyZXNwLnN0YXR1c30gJHt0ZXh0fWApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGhpZ2gtbGV2ZWwgcmVwb3NpdG9yeSBtZXRhZGF0YSBmb3IgdGhlIGxpdmUgc3RhdHVzIGRhc2hib2FyZC5cbiAgICogUmV0dXJucyBudWxsIChuZXZlciB0aHJvd3MpIHNvIGNhbGxlcnMgY2FuIGZhbGwgYmFjayB0byBjYWNoZWQgZGF0YS5cbiAgICovXG4gIGFzeW5jIGdldFJlcG9JbmZvKCk6IFByb21pc2U8e1xuICAgIGh0bWxVcmw6IHN0cmluZztcbiAgICBwdXNoZWRBdDogc3RyaW5nO1xuICAgIGlzUHJpdmF0ZTogYm9vbGVhbjtcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICB9IHwgbnVsbD4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwID0gYXdhaXQgZG9SZXF1ZXN0KGAke0dJVEhVQl9BUEl9L3JlcG9zLyR7dGhpcy5vd25lcn0vJHt0aGlzLnJlcG99YCwge1xuICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICB9KTtcbiAgICAgIGlmICghcmVzcC5vaykgcmV0dXJuIG51bGw7XG4gICAgICBjb25zdCBkYXRhID0gKGF3YWl0IHJlc3AuanNvbigpKSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGh0bWxVcmw6IChkYXRhLmh0bWxfdXJsIGFzIHN0cmluZykgfHwgJycsXG4gICAgICAgIHB1c2hlZEF0OiAoZGF0YS5wdXNoZWRfYXQgYXMgc3RyaW5nKSB8fCAnJyxcbiAgICAgICAgaXNQcml2YXRlOiAoZGF0YS5wcml2YXRlIGFzIGJvb2xlYW4pIHx8IGZhbHNlLFxuICAgICAgICBkZXNjcmlwdGlvbjogKGRhdGEuZGVzY3JpcHRpb24gYXMgc3RyaW5nKSB8fCAnJyxcbiAgICAgIH07XG4gICAgfSBjYXRjaCB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbW9zdCByZWNlbnQgd29ya2Zsb3cgcnVuIGZvciB0aGUgZ2l2ZW4gd29ya2Zsb3cgZmlsZS5cbiAgICogYHdvcmtmbG93RmlsZWAgaXMgdGhlIGZpbGVuYW1lIHVuZGVyIGAuZ2l0aHViL3dvcmtmbG93cy9gLCBlLmcuIGBkZXBsb3kueW1sYC5cbiAgICogUmV0dXJucyBudWxsIChuZXZlciB0aHJvd3MpIG9uIGFueSBlcnJvci5cbiAgICovXG4gIGFzeW5jIGdldExhdGVzdFdvcmtmbG93UnVuKHdvcmtmbG93RmlsZTogc3RyaW5nKTogUHJvbWlzZTx7XG4gICAgc3RhdHVzOiBzdHJpbmc7ICAgICAgIC8vICdxdWV1ZWQnIHwgJ2luX3Byb2dyZXNzJyB8ICdjb21wbGV0ZWQnXG4gICAgY29uY2x1c2lvbjogc3RyaW5nOyAgIC8vICdzdWNjZXNzJyB8ICdmYWlsdXJlJyB8ICdjYW5jZWxsZWQnIHwgJycgKHdoZW4gaW5fcHJvZ3Jlc3MpXG4gICAgaHRtbFVybDogc3RyaW5nO1xuICAgIGNyZWF0ZWRBdDogc3RyaW5nO1xuICAgIHVwZGF0ZWRBdDogc3RyaW5nO1xuICB9IHwgbnVsbD4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwID0gYXdhaXQgZG9SZXF1ZXN0KFxuICAgICAgICBgJHtHSVRIVUJfQVBJfS9yZXBvcy8ke3RoaXMub3duZXJ9LyR7dGhpcy5yZXBvfS9hY3Rpb25zL3dvcmtmbG93cy8ke2VuY29kZVVSSUNvbXBvbmVudCh3b3JrZmxvd0ZpbGUpfS9ydW5zP3Blcl9wYWdlPTFgLFxuICAgICAgICB7IGhlYWRlcnM6IHRoaXMuaGVhZGVycyB9LFxuICAgICAgKTtcbiAgICAgIGlmICghcmVzcC5vaykgcmV0dXJuIG51bGw7XG4gICAgICBjb25zdCBkYXRhID0gKGF3YWl0IHJlc3AuanNvbigpKSBhcyB7IHdvcmtmbG93X3J1bnM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPltdIH07XG4gICAgICBjb25zdCBydW4gPSBkYXRhLndvcmtmbG93X3J1bnM/LlswXTtcbiAgICAgIGlmICghcnVuKSByZXR1cm4gbnVsbDtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1czogKHJ1bi5zdGF0dXMgYXMgc3RyaW5nKSB8fCAnJyxcbiAgICAgICAgY29uY2x1c2lvbjogKHJ1bi5jb25jbHVzaW9uIGFzIHN0cmluZykgfHwgJycsXG4gICAgICAgIGh0bWxVcmw6IChydW4uaHRtbF91cmwgYXMgc3RyaW5nKSB8fCAnJyxcbiAgICAgICAgY3JlYXRlZEF0OiAocnVuLmNyZWF0ZWRfYXQgYXMgc3RyaW5nKSB8fCAnJyxcbiAgICAgICAgdXBkYXRlZEF0OiAocnVuLnVwZGF0ZWRfYXQgYXMgc3RyaW5nKSB8fCAnJyxcbiAgICAgIH07XG4gICAgfSBjYXRjaCB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdGlwIGNvbW1pdCBpbmZvIGZvciBhIGJyYW5jaC5cbiAgICogUmV0dXJucyBudWxsIChuZXZlciB0aHJvd3MpIG9uIGFueSBlcnJvci5cbiAgICovXG4gIGFzeW5jIGdldExhdGVzdENvbW1pdChicmFuY2g/OiBzdHJpbmcpOiBQcm9taXNlPHtcbiAgICBzaGE6IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgZGF0ZTogc3RyaW5nO1xuICAgIGF1dGhvcjogc3RyaW5nO1xuICAgIGh0bWxVcmw6IHN0cmluZztcbiAgfSB8IG51bGw+IHtcbiAgICBjb25zdCByZWYgPSBicmFuY2ggfHwgdGhpcy5icmFuY2ggfHwgJ21haW4nO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwID0gYXdhaXQgZG9SZXF1ZXN0KFxuICAgICAgICBgJHtHSVRIVUJfQVBJfS9yZXBvcy8ke3RoaXMub3duZXJ9LyR7dGhpcy5yZXBvfS9jb21taXRzLyR7ZW5jb2RlVVJJQ29tcG9uZW50KHJlZil9YCxcbiAgICAgICAgeyBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfSxcbiAgICAgICk7XG4gICAgICBpZiAoIXJlc3Aub2spIHJldHVybiBudWxsO1xuICAgICAgY29uc3QgZGF0YSA9IChhd2FpdCByZXNwLmpzb24oKSkgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gICAgICBjb25zdCBjb21taXQgPSBkYXRhLmNvbW1pdCBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IHVuZGVmaW5lZDtcbiAgICAgIGNvbnN0IGNvbW1pdEF1dGhvciA9IGNvbW1pdD8uYXV0aG9yIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgdW5kZWZpbmVkO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc2hhOiAoKGRhdGEuc2hhIGFzIHN0cmluZykgfHwgJycpLnNsaWNlKDAsIDcpLFxuICAgICAgICBtZXNzYWdlOiAoKGNvbW1pdD8ubWVzc2FnZSBhcyBzdHJpbmcpIHx8ICcnKS5zcGxpdCgnXFxuJylbMF0sXG4gICAgICAgIGRhdGU6IChjb21taXRBdXRob3I/LmRhdGUgYXMgc3RyaW5nKSB8fCAnJyxcbiAgICAgICAgYXV0aG9yOiAoY29tbWl0QXV0aG9yPy5uYW1lIGFzIHN0cmluZykgfHwgJycsXG4gICAgICAgIGh0bWxVcmw6IChkYXRhLmh0bWxfdXJsIGFzIHN0cmluZykgfHwgJycsXG4gICAgICB9O1xuICAgIH0gY2F0Y2gge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqIFRoaW4gSlNPTiB3cmFwcGVyIGFyb3VuZCB0aGUgR2l0SHViIFJFU1QgQVBJOyB0aHJvd3Mgd2l0aCAuc3RhdHVzIG9uIGVycm9yLiAqL1xuICBwcml2YXRlIGFzeW5jIGdoPFQ+KHBhdGg6IHN0cmluZywgbWV0aG9kOiBzdHJpbmcsIGJvZHk/OiB1bmtub3duKTogUHJvbWlzZTxUPiB7XG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IGRvUmVxdWVzdChgJHtHSVRIVUJfQVBJfSR7cGF0aH1gLCB7XG4gICAgICBtZXRob2QsXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICBib2R5OiBib2R5ID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBKU09OLnN0cmluZ2lmeShib2R5KSxcbiAgICB9KTtcbiAgICBpZiAoIXJlc3Aub2spIHtcbiAgICAgIGNvbnN0IGVyckJvZHkgPSAoYXdhaXQgcmVzcC5qc29uKCkuY2F0Y2goKCkgPT4gKHt9KSkpIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKCAoZXJyQm9keT8ubWVzc2FnZSBhcyBzdHJpbmcpID8/IGBHaXRIdWIgcmVxdWVzdCBmYWlsZWQgKCR7cmVzcC5zdGF0dXN9KWAgKSBhcyBFcnJvciAmIHsgc3RhdHVzPzogbnVtYmVyIH07XG4gICAgICBlcnIuc3RhdHVzID0gcmVzcC5zdGF0dXM7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHJldHVybiAoYXdhaXQgcmVzcC5qc29uKCkpIGFzIFQ7XG4gIH1cblxuICAvKipcbiAgICogVXBsb2FkIGV2ZXJ5IGZpbGUgYXMgYSBTSU5HTEUgZ2l0IGNvbW1pdCB2aWEgdGhlIEdpdCBEYXRhIEFQSVxuICAgKiAoYmxvYnMgXHUyMTkyIHRyZWUgXHUyMTkyIGNvbW1pdCBcdTIxOTIgbW92ZSBicmFuY2ggcmVmKSwgaW5zdGVhZCBvZiBvbmUgQ29udGVudHMtQVBJIFBVVFxuICAgKiBwZXIgZmlsZS4gT25lIGNvbW1pdCBtZWFucyBDbG91ZGZsYXJlIHJ1bnMgZXhhY3RseSBvbmUgYnVpbGQgcGVyIHB1Ymxpc2gsXG4gICAqIGFuZCB0aGVyZSBhcmUgbm8gcGVyLWZpbGUgU0hBIGNvbmZsaWN0cyAodGhlIG5ldyB0cmVlIGlzIGxheWVyZWQgb24gdGhlXG4gICAqIGN1cnJlbnQgdHJlZSB3aXRoIGBiYXNlX3RyZWVgKSwgd2hpY2gga2lsbHMgdGhlIDQwOS80MjIgZXJyb3JzIGVudGlyZWx5LlxuICAgKi9cbiAgYXN5bmMgY29tbWl0RmlsZXMoXG4gICAgZmlsZXM6IFVwbG9hZEZpbGVbXSxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgb25Qcm9ncmVzczogKGRvbmU6IG51bWJlciwgdG90YWw6IG51bWJlcikgPT4gdm9pZCxcbiAgICBvblJhdGVMaW1pdD86IChzZWNzTGVmdDogbnVtYmVyKSA9PiB2b2lkLFxuICAgIG1pcnJvclByZWZpeCA9ICcnLFxuICAgIG9wdGlvbnM/OiB7IGlzUHJpdmF0ZT86IGJvb2xlYW4gfVxuICApOiBQcm9taXNlPFB1Ymxpc2hSZXN1bHQgJiB7IGNvbW1pdFNoYT86IHN0cmluZyB9PiB7XG4gICAgY29uc3QgcmVzdWx0OiBQdWJsaXNoUmVzdWx0ICYgeyBjb21taXRTaGE/OiBzdHJpbmcgfSA9IHsgc3VjY2VzczogdHJ1ZSwgdXBsb2FkZWQ6IDAsIG5vdGVDb3VudDogMCwgZmFpbGVkOiAwLCBlcnJvcnM6IFtdLCBmaXhlZDogMCwgaXNzdWVzOiBbXSB9O1xuICAgIGlmIChmaWxlcy5sZW5ndGggPT09IDApIHJldHVybiByZXN1bHQ7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgZXhpc3RzID0gYXdhaXQgdGhpcy5yZXBvRXhpc3RzKCk7XG4gICAgICBpZiAoIWV4aXN0cykge1xuICAgICAgICBjb25zdCBpc1ByaXZhdGUgPSBvcHRpb25zPy5pc1ByaXZhdGUgfHwgZmFsc2U7XG4gICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlUmVwbyhpc1ByaXZhdGUpO1xuICAgICAgICBjb25zdCByZWFkeSA9IGF3YWl0IHRoaXMud2FpdEZvclJlcG8oMzAwMDApO1xuICAgICAgICBpZiAoIXJlYWR5KSB7XG4gICAgICAgICAgcmVzdWx0LnN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgICByZXN1bHQuZXJyb3JzLnB1c2goJ1RpbWVkIG91dCB3YWl0aW5nIGZvciByZXBvc2l0b3J5IGNyZWF0aW9uIG9uIEdpdEh1Yi4nKTtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmVzdWx0LnN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgIHJlc3VsdC5lcnJvcnMucHVzaChgRmFpbGVkIHRvIGNoZWNrIG9yIGNyZWF0ZSByZXBvc2l0b3J5OiAkeyhlIGFzIEVycm9yKS5tZXNzYWdlfWApO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuYnJhbmNoKSB7XG4gICAgICByZXN1bHQuc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgcmVzdWx0LmVycm9ycy5wdXNoKCdObyBicmFuY2ggc3BlY2lmaWVkLiBSdW4gc2V0dXAgdG8gZGV0ZWN0IHRoZSByZXBvc2l0b3J5IGRlZmF1bHQgYnJhbmNoLicpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgY29uc3QgYnJhbmNoID0gdGhpcy5icmFuY2g7XG4gICAgY29uc3QgcmVmUGF0aCA9IGAvcmVwb3MvJHt0aGlzLm93bmVyfS8ke3RoaXMucmVwb30vZ2l0L3JlZnMvaGVhZHMvJHtlbmNvZGVVUklDb21wb25lbnQoYnJhbmNoKX1gO1xuXG4gICAgLy8gMS4gQ3VycmVudCBicmFuY2ggdGlwICsgaXRzIGJhc2UgdHJlZS5cbiAgICBsZXQgaGVhZFNoYTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gICAgbGV0IGJhc2VUcmVlU2hhOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgICBsZXQgYnJhbmNoRXhpc3RzID0gdHJ1ZTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZWYgPSBhd2FpdCB0aGlzLmdoPHsgb2JqZWN0OiB7IHNoYTogc3RyaW5nIH0gfT4ocmVmUGF0aCwgJ0dFVCcpO1xuICAgICAgaGVhZFNoYSA9IHJlZi5vYmplY3Quc2hhO1xuICAgICAgY29uc3QgaGVhZENvbW1pdCA9IGF3YWl0IHRoaXMuZ2g8eyB0cmVlOiB7IHNoYTogc3RyaW5nIH0gfT4oXG4gICAgICAgIGAvcmVwb3MvJHt0aGlzLm93bmVyfS8ke3RoaXMucmVwb30vZ2l0L2NvbW1pdHMvJHtoZWFkU2hhfWAsXG4gICAgICAgICdHRVQnLFxuICAgICAgKTtcbiAgICAgIGJhc2VUcmVlU2hhID0gaGVhZENvbW1pdC50cmVlLnNoYTtcbiAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgIGlmICgoZXJyIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KS5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICAvLyBCcmFuY2ggZG9lc24ndCBleGlzdCBcdTIwMTQgZmlyc3QgY29tbWl0IHNjZW5hcmlvLlxuICAgICAgICBicmFuY2hFeGlzdHMgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdC5zdWNjZXNzID0gZmFsc2U7XG4gICAgICAgIHJlc3VsdC5lcnJvcnMucHVzaChgQ291bGQgbm90IHJlYWQgYnJhbmNoIFwiJHticmFuY2h9XCI6ICR7KGVyciBhcyBFcnJvcikubWVzc2FnZX1gKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyAyLiBDcmVhdGUgYSBibG9iIHBlciBmaWxlIChiYXRjaGVkLCB3aXRoIHJhdGUtbGltaXQgYmFja29mZikuXG4gICAgY29uc3QgdHJlZUl0ZW1zOiBBcnJheTx7IHBhdGg6IHN0cmluZzsgbW9kZTogJzEwMDY0NCc7IHR5cGU6ICdibG9iJzsgc2hhOiBzdHJpbmcgfCBudWxsIH0+ID0gW107XG4gICAgbGV0IGRvbmUgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpICs9IEJBVENIX1NJWkUpIHtcbiAgICAgIGNvbnN0IGJhdGNoID0gZmlsZXMuc2xpY2UoaSwgaSArIEJBVENIX1NJWkUpO1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIGJhdGNoLm1hcChhc3luYyAoZmlsZSkgPT4ge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoZmlsZS5jb250ZW50ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgIHRyZWVJdGVtcy5wdXNoKHsgcGF0aDogZmlsZS5wYXRoLCBtb2RlOiAnMTAwNjQ0JywgdHlwZTogJ2Jsb2InLCBzaGE6IG51bGwgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zdCBzaGEgPSBhd2FpdCB0aGlzLmNyZWF0ZUJsb2JXaXRoUmV0cnkoZmlsZS5jb250ZW50LCBvblJhdGVMaW1pdCk7XG4gICAgICAgICAgICAgIHRyZWVJdGVtcy5wdXNoKHsgcGF0aDogZmlsZS5wYXRoLCBtb2RlOiAnMTAwNjQ0JywgdHlwZTogJ2Jsb2InLCBzaGEgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQudXBsb2FkZWQrKztcbiAgICAgICAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgICAgICAgIHJlc3VsdC5mYWlsZWQrKztcbiAgICAgICAgICAgIHJlc3VsdC5lcnJvcnMucHVzaChgJHtmaWxlLnBhdGh9OiAkeyhlcnIgYXMgRXJyb3IpLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRvbmUrKztcbiAgICAgICAgICBvblByb2dyZXNzKGRvbmUsIGZpbGVzLmxlbmd0aCk7XG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICAgIGlmIChpICsgQkFUQ0hfU0laRSA8IGZpbGVzLmxlbmd0aCkge1xuICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZShyID0+IHdpbmRvdy5zZXRUaW1lb3V0KHIsIDEwMCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZXN1bHQudXBsb2FkZWQgPT09IDApIHtcbiAgICAgIHJlc3VsdC5zdWNjZXNzID0gZmFsc2U7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8vIE5ldmVyIHJlbW92ZSByZW1vdGUgYmFja3VwIGZpbGVzIHdoZW4gYW5vdGhlciB1cGxvYWQgaW4gdGhlIHNhbWUgYmF0Y2hcbiAgICAvLyBmYWlsZWQuIEEgbGF0ZXIgc3VjY2Vzc2Z1bCBydW4gY2FuIHNhZmVseSBhcHBseSB0aG9zZSBkZWxldGlvbnMuXG4gICAgaWYgKHJlc3VsdC5mYWlsZWQgPiAwKSB7XG4gICAgICBmb3IgKGxldCBpbmRleCA9IHRyZWVJdGVtcy5sZW5ndGggLSAxOyBpbmRleCA+PSAwOyBpbmRleC0tKSB7XG4gICAgICAgIGlmICh0cmVlSXRlbXNbaW5kZXhdLnNoYSA9PT0gbnVsbCkgdHJlZUl0ZW1zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgICBpZiAodHJlZUl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXN1bHQuc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIDJiLiBNaXJyb3I6IHdoZW4gZXZlcnkgZmlsZSB1cGxvYWRlZCBjbGVhbmx5LCBkZWxldGUgYW55IGV4aXN0aW5nIGJsb2JzXG4gICAgLy8gdW5kZXIgYG1pcnJvclByZWZpeGAgdGhhdCBhcmVuJ3QgaW4gdGhpcyBwdWJsaXNoIFx1MjAxNCB0aGlzIHN0cmlwcyBhbnkgcHJldmlvdXNcbiAgICAvLyB0ZW1wbGF0ZSdzIGRlbW8gcGFnZXMgYW5kIGFueSBub3RlcyByZW1vdmVkL2V4Y2x1ZGVkIGZyb20gdGhlIHZhdWx0LCBzb1xuICAgIC8vIHRoZSBsaXZlIHNpdGUgbWF0Y2hlcyB0aGUgdmF1bHQgZXhhY3RseS4gU2tpcHBlZCBvbiBwYXJ0aWFsIGZhaWx1cmUgKHNvIGFcbiAgICAvLyBoaWNjdXAgbmV2ZXIgd2lwZXMgY29udGVudCkgYW5kIGJlc3QtZWZmb3J0IChza2lwIGlmIHRoZSB0cmVlIGNhbid0IGxpc3QpLlxuICAgIGlmIChtaXJyb3JQcmVmaXggJiYgcmVzdWx0LmZhaWxlZCA9PT0gMCAmJiBiYXNlVHJlZVNoYSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZnVsbCA9IGF3YWl0IHRoaXMuZ2g8eyB0cmVlOiBBcnJheTx7IHBhdGg6IHN0cmluZzsgdHlwZTogc3RyaW5nIH0+IH0+KFxuICAgICAgICAgIGAvcmVwb3MvJHt0aGlzLm93bmVyfS8ke3RoaXMucmVwb30vZ2l0L3RyZWVzLyR7YmFzZVRyZWVTaGF9P3JlY3Vyc2l2ZT0xYCxcbiAgICAgICAgICAnR0VUJyxcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3Qga2VlcCA9IG5ldyBTZXQoZmlsZXMubWFwKGYgPT4gZi5wYXRoKSk7XG4gICAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgZnVsbC50cmVlKSB7XG4gICAgICAgICAgaWYgKGVudHJ5LnR5cGUgPT09ICdibG9iJyAmJiBlbnRyeS5wYXRoLnN0YXJ0c1dpdGgobWlycm9yUHJlZml4KSAmJiAha2VlcC5oYXMoZW50cnkucGF0aCkpIHtcbiAgICAgICAgICAgIHRyZWVJdGVtcy5wdXNoKHsgcGF0aDogZW50cnkucGF0aCwgbW9kZTogJzEwMDY0NCcsIHR5cGU6ICdibG9iJywgc2hhOiBudWxsIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIC8vIENvdWxkbid0IHJlYWQgdGhlIGV4aXN0aW5nIHRyZWUgXHUyMDE0IGtlZXAgZ29pbmcgd2l0aCBhZGRzL3VwZGF0ZXMgb25seS5cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyAzLiBUcmVlIFx1MjE5MiBjb21taXQgXHUyMTkyIGZhc3QtZm9yd2FyZCB0aGUgYnJhbmNoIHJlZi5cbiAgICB0cnkge1xuICAgICAgY29uc3QgdHJlZSA9IGF3YWl0IHRoaXMuZ2g8eyBzaGE6IHN0cmluZyB9PihcbiAgICAgICAgYC9yZXBvcy8ke3RoaXMub3duZXJ9LyR7dGhpcy5yZXBvfS9naXQvdHJlZXNgLFxuICAgICAgICAnUE9TVCcsXG4gICAgICAgIGJhc2VUcmVlU2hhID8geyBiYXNlX3RyZWU6IGJhc2VUcmVlU2hhLCB0cmVlOiB0cmVlSXRlbXMgfSA6IHsgdHJlZTogdHJlZUl0ZW1zIH0sXG4gICAgICApO1xuICAgICAgY29uc3QgY29tbWl0ID0gYXdhaXQgdGhpcy5naDx7IHNoYTogc3RyaW5nIH0+KFxuICAgICAgICBgL3JlcG9zLyR7dGhpcy5vd25lcn0vJHt0aGlzLnJlcG99L2dpdC9jb21taXRzYCxcbiAgICAgICAgJ1BPU1QnLFxuICAgICAgICBoZWFkU2hhID8geyBtZXNzYWdlLCB0cmVlOiB0cmVlLnNoYSwgcGFyZW50czogW2hlYWRTaGFdIH0gOiB7IG1lc3NhZ2UsIHRyZWU6IHRyZWUuc2hhLCBwYXJlbnRzOiBbXSB9LFxuICAgICAgKTtcbiAgICAgIHJlc3VsdC5jb21taXRTaGEgPSBjb21taXQuc2hhO1xuXG4gICAgICBpZiAoYnJhbmNoRXhpc3RzKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuZ2gocmVmUGF0aCwgJ1BBVENIJywgeyBzaGE6IGNvbW1pdC5zaGEsIGZvcmNlOiBmYWxzZSB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0IHRoaXMuZ2goYC9yZXBvcy8ke3RoaXMub3duZXJ9LyR7dGhpcy5yZXBvfS9naXQvcmVmc2AsICdQT1NUJywge1xuICAgICAgICAgIHJlZjogYHJlZnMvaGVhZHMvJHticmFuY2h9YCxcbiAgICAgICAgICBzaGE6IGNvbW1pdC5zaGEsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycjogdW5rbm93bikge1xuICAgICAgcmVzdWx0LnN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgIHJlc3VsdC5lcnJvcnMucHVzaChgQ29tbWl0IGZhaWxlZDogJHsoZXJyIGFzIEVycm9yKS5tZXNzYWdlfWApO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBpZiAocmVzdWx0LmZhaWxlZCA+IDApIHJlc3VsdC5zdWNjZXNzID0gZmFsc2U7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgY3JlYXRlQmxvYldpdGhSZXRyeShcbiAgICBiYXNlNjRDb250ZW50OiBzdHJpbmcsXG4gICAgb25SYXRlTGltaXQ/OiAoc2Vjc0xlZnQ6IG51bWJlcikgPT4gdm9pZCxcbiAgKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBsZXQgbGFzdEVycjogRXJyb3IgfCBudWxsID0gbnVsbDtcbiAgICBmb3IgKGxldCBhdHRlbXB0ID0gMDsgYXR0ZW1wdCA8IDM7IGF0dGVtcHQrKykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgYmxvYiA9IGF3YWl0IHRoaXMuZ2g8eyBzaGE6IHN0cmluZyB9PihcbiAgICAgICAgICBgL3JlcG9zLyR7dGhpcy5vd25lcn0vJHt0aGlzLnJlcG99L2dpdC9ibG9ic2AsXG4gICAgICAgICAgJ1BPU1QnLFxuICAgICAgICAgIHsgY29udGVudDogYmFzZTY0Q29udGVudCwgZW5jb2Rpbmc6ICdiYXNlNjQnIH0sXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBibG9iLnNoYTtcbiAgICAgIH0gY2F0Y2ggKGVycjogdW5rbm93bikge1xuICAgICAgICBsYXN0RXJyID0gZXJyIGFzIEVycm9yO1xuICAgICAgICBjb25zdCBzdGF0dXMgPSAobGFzdEVyciBhcyBFcnJvciAmIHsgc3RhdHVzPzogbnVtYmVyIH0pLnN0YXR1cztcbiAgICAgICAgY29uc3QgbXNnID0gbGFzdEVyci5tZXNzYWdlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCByYXRlTGltaXRlZCA9XG4gICAgICAgICAgc3RhdHVzID09PSA0MjkgfHxcbiAgICAgICAgICAoc3RhdHVzID09PSA0MDMgJiYgKG1zZy5pbmNsdWRlcygncmF0ZSBsaW1pdCcpIHx8IG1zZy5pbmNsdWRlcygnYWJ1c2UnKSB8fCBtc2cuaW5jbHVkZXMoJ3NlY29uZGFyeScpKSk7XG4gICAgICAgICAgXG4gICAgICAgIGlmIChzdGF0dXMgPT09IDQwNCB8fCBzdGF0dXMgPT09IDQwMSB8fCAoc3RhdHVzID09PSA0MDMgJiYgIXJhdGVMaW1pdGVkKSkge1xuICAgICAgICAgIHRocm93IGxhc3RFcnI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmF0ZUxpbWl0ZWQpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLndhaXRXaXRoQ291bnRkb3duKFJBVEVfTElNSVRfV0FJVF9NUywgb25SYXRlTGltaXQpO1xuICAgICAgICB9IGVsc2UgaWYgKGF0dGVtcHQgPCAyKSB7XG4gICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UociA9PiB3aW5kb3cuc2V0VGltZW91dChyLCAxMDAwICogTWF0aC5wb3coMiwgYXR0ZW1wdCkpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBsYXN0RXJyID8/IG5ldyBFcnJvcignQmxvYiBjcmVhdGlvbiBmYWlsZWQnKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgd2FpdFdpdGhDb3VudGRvd24obXM6IG51bWJlciwgb25UaWNrPzogKHNlY3NMZWZ0OiBudW1iZXIpID0+IHZvaWQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIW9uVGljaykge1xuICAgICAgYXdhaXQgbmV3IFByb21pc2UociA9PiB3aW5kb3cuc2V0VGltZW91dChyLCBtcykpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgc2Vjc0xlZnQgPSBNYXRoLmNlaWwobXMgLyAxMDAwKTtcbiAgICBjb25zdCBpbnRlcnZhbCA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBzZWNzTGVmdC0tO1xuICAgICAgaWYgKHNlY3NMZWZ0ID49IDApIG9uVGljayhzZWNzTGVmdCk7XG4gICAgfSwgMTAwMCk7XG4gICAgYXdhaXQgbmV3IFByb21pc2UociA9PiB3aW5kb3cuc2V0VGltZW91dChyLCBtcykpO1xuICAgIHdpbmRvdy5jbGVhckludGVydmFsKGludGVydmFsKTtcbiAgfVxuXG4gIGFzeW5jIHJlcG9FeGlzdHMoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IGRvUmVxdWVzdChcbiAgICAgIGAke0dJVEhVQl9BUEl9L3JlcG9zLyR7dGhpcy5vd25lcn0vJHt0aGlzLnJlcG99YCxcbiAgICAgIHsgaGVhZGVyczogdGhpcy5oZWFkZXJzIH0sXG4gICAgKTtcbiAgICByZXR1cm4gcmVzcC5vaztcbiAgfVxuXG4gIGFzeW5jIGlzUmVwb1ByaXZhdGUoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IGRvUmVxdWVzdChcbiAgICAgIGAke0dJVEhVQl9BUEl9L3JlcG9zLyR7dGhpcy5vd25lcn0vJHt0aGlzLnJlcG99YCxcbiAgICAgIHsgaGVhZGVyczogdGhpcy5oZWFkZXJzIH0sXG4gICAgKTtcbiAgICBpZiAoIXJlc3Aub2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IHZlcmlmeSBiYWNrdXAgc3RvcmFnZSBwcml2YWN5LicpO1xuICAgIH1cbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcC5qc29uKCkgYXMgeyBwcml2YXRlPzogYm9vbGVhbiB9O1xuICAgIHJldHVybiBkYXRhLnByaXZhdGUgPT09IHRydWU7XG4gIH1cblxuICBhc3luYyB3YWl0Rm9yUmVwbyhtYXhXYWl0TXMgPSAzMDAwMCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IHN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgICB3aGlsZSAoRGF0ZS5ub3coKSAtIHN0YXJ0IDwgbWF4V2FpdE1zKSB7XG4gICAgICBpZiAoYXdhaXQgdGhpcy5yZXBvRXhpc3RzKCkpIHJldHVybiB0cnVlO1xuICAgICAgYXdhaXQgbmV3IFByb21pc2UociA9PiB3aW5kb3cuc2V0VGltZW91dChyLCAyMDAwKSk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaCB0aGUgZmxhdCBmaWxlIHRyZWUgZm9yIHRoZSByZXBvc2l0b3J5J3MgaW50ZXJuYWwgc3RvcmFnZSByZWZlcmVuY2UuXG4gICAqIFJldHVybnMgYW4gYXJyYXkgb2YgeyBwYXRoLCBzaGEsIHR5cGUgfSBvYmplY3RzIGZvciBhbGwgYmxvYnMgKGZpbGVzKS5cbiAgICogVXNlZCBieSBCYWNrdXBFbmdpbmUgdG8gYXZvaWQgcmUtdXBsb2FkaW5nIHVuY2hhbmdlZCBmaWxlcy5cbiAgICovXG4gIGFzeW5jIGxpc3RUcmVlKGJyYW5jaD86IHN0cmluZyk6IFByb21pc2U8QXJyYXk8eyBwYXRoOiBzdHJpbmc7IHNoYTogc3RyaW5nOyB0eXBlOiBzdHJpbmcgfT4+IHtcbiAgICBjb25zdCByZWYgPSBicmFuY2ggfHwgdGhpcy5icmFuY2ggfHwgJ21haW4nO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLmdoPHsgdHJlZTogQXJyYXk8eyBwYXRoOiBzdHJpbmc7IHNoYTogc3RyaW5nOyB0eXBlOiBzdHJpbmcgfT4gfT4oXG4gICAgICBgL3JlcG9zLyR7dGhpcy5vd25lcn0vJHt0aGlzLnJlcG99L2dpdC90cmVlcy8ke2VuY29kZVVSSUNvbXBvbmVudChyZWYpfT9yZWN1cnNpdmU9MWAsXG4gICAgICAnR0VUJyxcbiAgICApO1xuICAgIHJldHVybiAoZGF0YS50cmVlID8/IFtdKS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0udHlwZSA9PT0gJ2Jsb2InKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBzaXRlJ3MgZW50aXJlIHN1Yi1mb2xkZXIgKGBzaXRlcy88c2l0ZUlkPi9gKSBmcm9tIHRoZSBtYXN0ZXIgcmVwb1xuICAgKiBpbiBhIHNpbmdsZSBjb21taXQgdXNpbmcgbnVsbC1TSEEgdHJlZSBlbnRyaWVzICh0aGUgc2FtZSBtaXJyb3ItZGVsZXRpb25cbiAgICogbWVjaGFuaXNtIHVzZWQgYnkgcHVibGlzaCkuIERvZXMgTk9UIGRlbGV0ZSB0aGUgbWFzdGVyIHJlcG8gXHUyMDE0IG90aGVyIHNpdGVzXG4gICAqIG1heSBzdGlsbCBiZSBsaXZpbmcgdGhlcmUuIEJlc3QtZWZmb3J0OiBpZiB0aGUgZm9sZGVyIGRvZXNuJ3QgZXhpc3Qgb3IgdGhlXG4gICAqIHJlcG8gaXMgdW5yZWFjaGFibGUsIHRoaXMgcmV0dXJucyB3aXRob3V0IHRocm93aW5nLlxuICAgKi9cbiAgYXN5bmMgZGVsZXRlU2l0ZUZvbGRlcihzaXRlSWQ6IHN0cmluZywgYnJhbmNoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBwcmVmaXggPSBgc2l0ZXMvJHtzaXRlSWR9L2A7XG5cbiAgICAvLyBSZXNvbHZlIHRoZSBicmFuY2ggdGlwLlxuICAgIGxldCBoZWFkU2hhOiBzdHJpbmc7XG4gICAgbGV0IGJhc2VUcmVlU2hhOiBzdHJpbmc7XG4gICAgY29uc3QgcmVmUGF0aCA9IGAvcmVwb3MvJHt0aGlzLm93bmVyfS8ke3RoaXMucmVwb30vZ2l0L3JlZnMvaGVhZHMvJHtlbmNvZGVVUklDb21wb25lbnQoYnJhbmNoKX1gO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlZiA9IGF3YWl0IHRoaXMuZ2g8eyBvYmplY3Q6IHsgc2hhOiBzdHJpbmcgfSB9PihyZWZQYXRoLCAnR0VUJyk7XG4gICAgICBoZWFkU2hhID0gcmVmLm9iamVjdC5zaGE7XG4gICAgICBjb25zdCBoZWFkQ29tbWl0ID0gYXdhaXQgdGhpcy5naDx7IHRyZWU6IHsgc2hhOiBzdHJpbmcgfSB9PihcbiAgICAgICAgYC9yZXBvcy8ke3RoaXMub3duZXJ9LyR7dGhpcy5yZXBvfS9naXQvY29tbWl0cy8ke2hlYWRTaGF9YCxcbiAgICAgICAgJ0dFVCcsXG4gICAgICApO1xuICAgICAgYmFzZVRyZWVTaGEgPSBoZWFkQ29tbWl0LnRyZWUuc2hhO1xuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gUmVwbyBvciBicmFuY2ggZG9lc24ndCBleGlzdCBcdTIwMTQgbm90aGluZyB0byBkZWxldGUuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gRmluZCBhbGwgYmxvYnMgdW5kZXIgdGhlIHNpdGUgcHJlZml4LlxuICAgIGxldCB0b0RlbGV0ZTogQXJyYXk8eyBwYXRoOiBzdHJpbmc7IG1vZGU6ICcxMDA2NDQnOyB0eXBlOiAnYmxvYic7IHNoYTogbnVsbCB9PiA9IFtdO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBmdWxsVHJlZSA9IGF3YWl0IHRoaXMuZ2g8eyB0cmVlOiBBcnJheTx7IHBhdGg6IHN0cmluZzsgdHlwZTogc3RyaW5nIH0+IH0+KFxuICAgICAgICBgL3JlcG9zLyR7dGhpcy5vd25lcn0vJHt0aGlzLnJlcG99L2dpdC90cmVlcy8ke2Jhc2VUcmVlU2hhfT9yZWN1cnNpdmU9MWAsXG4gICAgICAgICdHRVQnLFxuICAgICAgKTtcbiAgICAgIHRvRGVsZXRlID0gZnVsbFRyZWUudHJlZVxuICAgICAgICAuZmlsdGVyKChpdGVtKSA9PiBpdGVtLnR5cGUgPT09ICdibG9iJyAmJiBpdGVtLnBhdGguc3RhcnRzV2l0aChwcmVmaXgpKVxuICAgICAgICAubWFwKChpdGVtKSA9PiAoeyBwYXRoOiBpdGVtLnBhdGgsIG1vZGU6ICcxMDA2NDQnIGFzIGNvbnN0LCB0eXBlOiAnYmxvYicgYXMgY29uc3QsIHNoYTogbnVsbCB9KSk7XG4gICAgfSBjYXRjaCB7XG4gICAgICByZXR1cm47IC8vIENhbid0IHJlYWQgdGhlIHRyZWUgXHUyMDE0IHNraXAgc2lsZW50bHkuXG4gICAgfVxuXG4gICAgaWYgKHRvRGVsZXRlLmxlbmd0aCA9PT0gMCkgcmV0dXJuOyAvLyBOb3RoaW5nIHVuZGVyIHRoYXQgcHJlZml4LlxuXG4gICAgLy8gQ29tbWl0IHRoZSBkZWxldGlvbnMgYXMgYSBzaW5nbGUgdHJlZSB1cGRhdGUuXG4gICAgY29uc3QgdHJlZSA9IGF3YWl0IHRoaXMuZ2g8eyBzaGE6IHN0cmluZyB9PihcbiAgICAgIGAvcmVwb3MvJHt0aGlzLm93bmVyfS8ke3RoaXMucmVwb30vZ2l0L3RyZWVzYCxcbiAgICAgICdQT1NUJyxcbiAgICAgIHsgYmFzZV90cmVlOiBiYXNlVHJlZVNoYSwgdHJlZTogdG9EZWxldGUgfSxcbiAgICApO1xuICAgIGNvbnN0IGNvbW1pdCA9IGF3YWl0IHRoaXMuZ2g8eyBzaGE6IHN0cmluZyB9PihcbiAgICAgIGAvcmVwb3MvJHt0aGlzLm93bmVyfS8ke3RoaXMucmVwb30vZ2l0L2NvbW1pdHNgLFxuICAgICAgJ1BPU1QnLFxuICAgICAgeyBtZXNzYWdlOiBgTm90ZUZsYXJlOiByZW1vdmUgc2l0ZSAke3NpdGVJZH1gLCB0cmVlOiB0cmVlLnNoYSwgcGFyZW50czogW2hlYWRTaGFdIH0sXG4gICAgKTtcbiAgICBhd2FpdCB0aGlzLmdoKHJlZlBhdGgsICdQQVRDSCcsIHsgc2hhOiBjb21taXQuc2hhLCBmb3JjZTogZmFsc2UgfSk7XG4gIH1cblxufVxuIiwgImltcG9ydCB7IHJlcXVlc3RVcmwgfSBmcm9tICdvYnNpZGlhbic7XG5cbmNvbnN0IENGX0FQSSA9ICdodHRwczovL2FwaS5jbG91ZGZsYXJlLmNvbS9jbGllbnQvdjQnO1xuXG4vLyBJbnN0YWxsIGRlcHMgZmlyc3QsIHRoZW4gYnVpbGQgd2l0aCBtZGdhcmRlbi4gQSBiYXJlIGBucHggbWRnYXJkZW4gYnVpbGRgXG4vLyBtaWdodCB3b3JrIGlmIGNhY2hpbmcgaXMgcGVyZmVjdCwgYnV0IHRoaXMgZ3VhcmFudGVlcyB0aGUgdmVyc2lvbiBwaW5uZWQgaW5cbi8vIHBhY2thZ2UuanNvbiBpcyBpbnN0YWxsZWQgYmVmb3JlIGV4ZWN1dGlvbi5cbi8vIGBucG0gY2kgfHwgbnBtIGluc3RhbGxgIGFjdHMgYXMgYSBmYWxsYmFjayBmb3IgbWlzc2luZyBsb2NrZmlsZXMuXG4vLyBXaXRob3V0IHRoaXMsIG5weCB3b3VsZCBpbnRlcmFjdGl2ZWx5IHByb21wdCBcIk5lZWQgdG8gaW5zdGFsbC4uLiBPayB0byBwcm9jZWVkPyAoeSlcIlxuY29uc3QgTURHQVJERU5fQlVJTERfQ09NTUFORCA9ICducG0gY2kgfHwgbnBtIGluc3RhbGwgJiYgbnB4IG1kZ2FyZGVuIGJ1aWxkJztcblxuaW50ZXJmYWNlIENsb3VkZmxhcmVBcGlFcnJvciB7XG4gIGVycm9ycz86IEFycmF5PHsgbWVzc2FnZT86IHN0cmluZyB9PjtcbiAgcmVzdWx0PzogdW5rbm93bjtcbn1cblxuZXhwb3J0IGNsYXNzIENsb3VkZmxhcmVBcGkge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHRva2VuOiBzdHJpbmcsXG4gICAgcHJpdmF0ZSBhY2NvdW50SWQ6IHN0cmluZyxcbiAgKSB7fVxuXG4gIHByaXZhdGUgZ2V0IGhlYWRlcnMoKTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0aGlzLnRva2VufWAsXG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHJlcXVlc3Q8VD4oXG4gICAgcGF0aDogc3RyaW5nLFxuICAgIG1ldGhvZCA9ICdHRVQnLFxuICAgIGJvZHk/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPixcbiAgKTogUHJvbWlzZTxUPiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3AgPSBhd2FpdCByZXF1ZXN0VXJsKHtcbiAgICAgICAgdXJsOiBgJHtDRl9BUEl9JHtwYXRofWAsXG4gICAgICAgIG1ldGhvZCxcbiAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICBib2R5OiBib2R5ID8gSlNPTi5zdHJpbmdpZnkoYm9keSkgOiB1bmRlZmluZWQsXG4gICAgICAgIHRocm93OiBmYWxzZSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBkYXRhID0gKHJlc3AuanNvbiA/PyB7fSkgYXMgQ2xvdWRmbGFyZUFwaUVycm9yO1xuICAgICAgaWYgKHJlc3Auc3RhdHVzID49IDQwMCkge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gZGF0YS5lcnJvcnM/LlswXT8ubWVzc2FnZSA/PyB0aGlzLm1lc3NhZ2VGb3JTdGF0dXMocmVzcC5zdGF0dXMpO1xuICAgICAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IobWVzc2FnZSkgYXMgRXJyb3IgJiB7IHN0YXR1cz86IG51bWJlciB9O1xuICAgICAgICBlcnIuc3RhdHVzID0gcmVzcC5zdGF0dXM7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRhdGEgYXMgVDtcbiAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnIgaW5zdGFuY2VvZiBFcnJvciA/IGVyci5tZXNzYWdlIDogJyc7XG4gICAgICBpZiAobWVzc2FnZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdmYWlsZWQgdG8gZmV0Y2gnKSkge1xuICAgICAgICBjb25zdCBmZXRjaEVyciA9IG5ldyBFcnJvcihcbiAgICAgICAgICAnQ291bGQgbm90IHJlYWNoIENsb3VkZmxhcmUuIENoZWNrIHlvdXIgaW50ZXJuZXQgY29ubmVjdGlvbiwgZmlyZXdhbGwsIG9yIHByb3h5LCB0aGVuIHRyeSBhZ2Fpbi4nLFxuICAgICAgICApIGFzIEVycm9yICYgeyBzdGF0dXM/OiBudW1iZXIgfTtcbiAgICAgICAgZmV0Y2hFcnIuc3RhdHVzID0gNTAwO1xuICAgICAgICB0aHJvdyBmZXRjaEVycjtcbiAgICAgIH1cbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1lc3NhZ2VGb3JTdGF0dXMoc3RhdHVzOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGlmIChzdGF0dXMgPT09IDQwMSB8fCBzdGF0dXMgPT09IDQwMykge1xuICAgICAgcmV0dXJuICdDbG91ZGZsYXJlIHJlamVjdGVkIHRoaXMgdG9rZW4uIENyZWF0ZSBhbiBBY2NvdW50IEFQSSBUb2tlbiB3aXRoIENsb3VkZmxhcmUgUGFnZXM6IEVkaXQgKGFuZCBXb3JrZXJzIFNjcmlwdHM6IEVkaXQpIHBlcm1pc3Npb25zLic7XG4gICAgfVxuICAgIGlmIChzdGF0dXMgPT09IDQwNCkge1xuICAgICAgcmV0dXJuICdDbG91ZGZsYXJlIGFjY291bnQgb3IgUGFnZXMgcHJvamVjdCBub3QgZm91bmQuIERvdWJsZS1jaGVjayB0aGUgQWNjb3VudCBJRCBhbmQgcHJvamVjdCBuYW1lLic7XG4gICAgfVxuICAgIGlmIChzdGF0dXMgPj0gNTAwKSB7XG4gICAgICByZXR1cm4gJ0Nsb3VkZmxhcmUgaXMgdGVtcG9yYXJpbHkgdW5hdmFpbGFibGUuIFBsZWFzZSB0cnkgYWdhaW4gaW4gYSBtb21lbnQuJztcbiAgICB9XG4gICAgcmV0dXJuICdDbG91ZGZsYXJlIHJlcXVlc3QgZmFpbGVkLic7XG4gIH1cblxuICAvKipcbiAgICogTGlzdHMgdGhlIGFjY291bnRzIHRoaXMgdG9rZW4gY2FuIHJlYWNoIGFuZCByZXR1cm5zIHRoZSBmaXJzdCBpZC5cbiAgICogTGV0cyB0aGUgd2l6YXJkIGF1dG8tZGV0ZWN0IHRoZSBBY2NvdW50IElEIHNvIHRoZSB1c2VyIG5ldmVyIGhhcyB0byBjb3B5XG4gICAqIHRoZSAzMi1jaGFyYWN0ZXIgdmFsdWUgb3V0IG9mIHRoZSBkYXNoYm9hcmQgYnkgaGFuZC4gUmVxdWlyZXMgdGhlIHRva2VuIHRvXG4gICAqIGluY2x1ZGUgQWNjb3VudCBTZXR0aW5nczogUmVhZCAoYnVuZGxlZCBpbnRvIG91ciB0b2tlbiB0ZW1wbGF0ZSBsaW5rKS5cbiAgICovXG4gIGFzeW5jIGdldEFjY291bnRJZCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLnJlcXVlc3Q8eyByZXN1bHQ/OiBBcnJheTx7IGlkPzogc3RyaW5nIH0+IH0+KCcvYWNjb3VudHMnKTtcbiAgICBjb25zdCBhY2NvdW50cyA9IGRhdGEucmVzdWx0ID8/IFtdO1xuICAgIGNvbnN0IGlkID0gYWNjb3VudHNbMF0/LmlkO1xuICAgIGlmICghaWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0NvdWxkIG5vdCByZWFkIGFueSBDbG91ZGZsYXJlIGFjY291bnQgZnJvbSB0aGlzIHRva2VuLiBBZGQgdGhlIFwiQWNjb3VudCBTZXR0aW5nczogUmVhZFwiIHBlcm1pc3Npb24sIG9yIHBhc3RlIHlvdXIgQWNjb3VudCBJRCBtYW51YWxseS4nLFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGlkO1xuICB9XG5cbiAgYXN5bmMgY3JlYXRlUHJvamVjdChcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgZ2l0aHViT3duZXI6IHN0cmluZyxcbiAgICByZXBvOiBzdHJpbmcsXG4gICAgYnJhbmNoOiBzdHJpbmcsXG4gICAgcm9vdERpcjogc3RyaW5nID0gJycsXG4gICk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMucmVxdWVzdDxDbG91ZGZsYXJlQXBpRXJyb3I+KFxuICAgICAgYC9hY2NvdW50cy8ke3RoaXMuYWNjb3VudElkfS9wYWdlcy9wcm9qZWN0c2AsXG4gICAgICAnUE9TVCcsXG4gICAgICB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIHNvdXJjZToge1xuICAgICAgICAgIHR5cGU6ICdnaXRodWInLFxuICAgICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgb3duZXI6IGdpdGh1Yk93bmVyLFxuICAgICAgICAgICAgcmVwb19uYW1lOiByZXBvLFxuICAgICAgICAgICAgLy8gVGhlIHJlcG8ncyBkZWZhdWx0IGJyYW5jaCAobWFpbikuIEJ1aWxkaW5nIGEgbm9uLWV4aXN0ZW50IGJyYW5jaFxuICAgICAgICAgICAgLy8geWllbGRzIGEgYmxhbmsgc2l0ZSAvIDUyMi5cbiAgICAgICAgICAgIHByb2R1Y3Rpb25fYnJhbmNoOiBicmFuY2gsXG4gICAgICAgICAgICBkZXBsb3ltZW50c19lbmFibGVkOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGJ1aWxkX2NvbmZpZzoge1xuICAgICAgICAgIGJ1aWxkX2NvbW1hbmQ6IE1ER0FSREVOX0JVSUxEX0NPTU1BTkQsXG4gICAgICAgICAgZGVzdGluYXRpb25fZGlyOiAncHVibGljJyxcbiAgICAgICAgICByb290X2Rpcjogcm9vdERpcixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgKTtcbiAgICBjb25zdCByZXN1bHQgPSAoZGF0YS5yZXN1bHQgPz8ge30pIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuICAgIGNvbnN0IHJhd1N1YmRvbWFpbiA9IChyZXN1bHQuc3ViZG9tYWluIGFzIHN0cmluZyB8IHVuZGVmaW5lZCkgPz8gbmFtZTtcbiAgICBjb25zdCBzdWJkb21haW4gPSByYXdTdWJkb21haW4ucmVwbGFjZSgvXFwucGFnZXNcXC5kZXYkLywgJycpO1xuICAgIHJldHVybiBgJHtzdWJkb21haW59LnBhZ2VzLmRldmA7XG4gIH1cblxuICAvKipcbiAgICogUmVwYWlyIHRoZSBidWlsZCBzZXR0aW5ncyBvbiBhbiBFWElTVElORyBwcm9qZWN0IHNvIGEgcmUtcHVibGlzaCBzZWxmLWhlYWxzXG4gICAqIGEgcHJvamVjdCB0aGF0IHdhcyBjcmVhdGVkIHdpdGggYSBiYWQgYnVpbGQgY29tbWFuZCBvciB3cm9uZyBicmFuY2ggXHUyMDE0IHRoZVxuICAgKiB1c2VyIG5ldmVyIGhhcyB0byBlZGl0IHRoZSBDbG91ZGZsYXJlIGRhc2hib2FyZC4gQ2FsbGVkIGV2ZXJ5IHB1Ymxpc2guXG4gICAqIC0gYnVpbGRfY29tbWFuZCBtdXN0IGluc3RhbGwgZGVwcyBiZWZvcmUgYG5weCBtZGdhcmRlbiBidWlsZGAgKHNlZSBhYm92ZSkuXG4gICAqIC0gcHJvZHVjdGlvbl9icmFuY2ggbXVzdCBiZSB0aGUgcmVwbydzIHJlYWwgZGVmYXVsdCBicmFuY2ggKG1haW4pIG9yXG4gICAqICAgQ2xvdWRmbGFyZSBidWlsZHMgYSBub24tZXhpc3RlbnQgYnJhbmNoIFx1MjE5MiBibGFuayBzaXRlIC8gNTIyLlxuICAgKi9cbiAgYXN5bmMgY29uZmlndXJlQnVpbGQoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIGdpdGh1Yk93bmVyOiBzdHJpbmcsXG4gICAgcmVwbzogc3RyaW5nLFxuICAgIGJyYW5jaDogc3RyaW5nLFxuICAgIHJvb3REaXI6IHN0cmluZyA9ICcnLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLnJlcXVlc3QoXG4gICAgICBgL2FjY291bnRzLyR7dGhpcy5hY2NvdW50SWR9L3BhZ2VzL3Byb2plY3RzLyR7bmFtZX1gLFxuICAgICAgJ1BBVENIJyxcbiAgICAgIHtcbiAgICAgICAgYnVpbGRfY29uZmlnOiB7XG4gICAgICAgICAgYnVpbGRfY29tbWFuZDogTURHQVJERU5fQlVJTERfQ09NTUFORCxcbiAgICAgICAgICBkZXN0aW5hdGlvbl9kaXI6ICdwdWJsaWMnLFxuICAgICAgICAgIHJvb3RfZGlyOiByb290RGlyLFxuICAgICAgICB9LFxuICAgICAgICBzb3VyY2U6IHtcbiAgICAgICAgICB0eXBlOiAnZ2l0aHViJyxcbiAgICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIG93bmVyOiBnaXRodWJPd25lcixcbiAgICAgICAgICAgIHJlcG9fbmFtZTogcmVwbyxcbiAgICAgICAgICAgIHByb2R1Y3Rpb25fYnJhbmNoOiBicmFuY2gsXG4gICAgICAgICAgICBkZXBsb3ltZW50c19lbmFibGVkOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogRm9yY2VzIGEgZnJlc2ggcHJvZHVjdGlvbiBidWlsZC4gQ29udGVudCBjb21taXRzIG5vcm1hbGx5IHRyaWdnZXIgYSBidWlsZFxuICAgKiB2aWEgdGhlIGdpdCB3ZWJob29rLCBidXQgZmlyaW5nIHRoaXMgZXhwbGljaXRseSBndWFyYW50ZWVzIHRoZSBsYXRlc3Qgbm90ZXNcbiAgICogYWN0dWFsbHkgZ2V0IGRlcGxveWVkLiBCZXN0LWVmZm9ydCBcdTIwMTQgdGhlIGNhbGxlciB0cmVhdHMgZmFpbHVyZSBhcyBub24tZmF0YWwuXG4gICAqL1xuICBhc3luYyB0cmlnZ2VyRGVwbG95bWVudChuYW1lOiBzdHJpbmcsIGJyYW5jaDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5yZXF1ZXN0KFxuICAgICAgYC9hY2NvdW50cy8ke3RoaXMuYWNjb3VudElkfS9wYWdlcy9wcm9qZWN0cy8ke25hbWV9L2RlcGxveW1lbnRzYCxcbiAgICAgICdQT1NUJyxcbiAgICAgIGJyYW5jaCA/IHsgYnJhbmNoIH0gOiB1bmRlZmluZWQsXG4gICAgKTtcbiAgfVxuXG4gIGFzeW5jIGdldFByb2plY3QobmFtZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5yZXF1ZXN0PENsb3VkZmxhcmVBcGlFcnJvcj4oXG4gICAgICBgL2FjY291bnRzLyR7dGhpcy5hY2NvdW50SWR9L3BhZ2VzL3Byb2plY3RzLyR7bmFtZX1gLFxuICAgICk7XG4gICAgY29uc3QgcmVzdWx0ID0gZGF0YS5yZXN1bHQgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gICAgY29uc3QgcmF3U3ViZG9tYWluID0gKHJlc3VsdD8uc3ViZG9tYWluIGFzIHN0cmluZyB8IHVuZGVmaW5lZCkgPz8gbmFtZTtcbiAgICBjb25zdCBzdWJkb21haW4gPSByYXdTdWJkb21haW4ucmVwbGFjZSgvXFwucGFnZXNcXC5kZXYkLywgJycpO1xuICAgIHJldHVybiBgJHtzdWJkb21haW59LnBhZ2VzLmRldmA7XG4gIH1cblxuICBhc3luYyBlbmFibGVEZXBsb3ltZW50KG5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMucmVxdWVzdChcbiAgICAgIGAvYWNjb3VudHMvJHt0aGlzLmFjY291bnRJZH0vcGFnZXMvcHJvamVjdHMvJHtuYW1lfWAsXG4gICAgICAnUEFUQ0gnLFxuICAgICAge1xuICAgICAgICBkZXBsb3ltZW50X2NvbmZpZ3M6IHsgcHJvZHVjdGlvbjogeyBkZXBsb3ltZW50X2VuYWJsZWQ6IHRydWUgfSB9LFxuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhdXNlIGEgQ2xvdWRmbGFyZSBQYWdlcyBkZXBsb3ltZW50IFx1MjAxNCB0YWtlcyB0aGUgc2l0ZSBvZmZsaW5lIHdpdGhvdXRcbiAgICogZGVsZXRpbmcgdGhlIHByb2plY3Qgb3IgYW55IGNvbnRlbnQuIGBlbmFibGVEZXBsb3ltZW50YCByZXN0b3JlcyBpdC5cbiAgICogVGhpcyBpcyB0aGUgY29ycmVjdCBiYWNrZW5kIGZvciBcIlVucHVibGlzaFwiLlxuICAgKi9cbiAgYXN5bmMgZGlzYWJsZURlcGxveW1lbnQobmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5yZXF1ZXN0KFxuICAgICAgYC9hY2NvdW50cy8ke3RoaXMuYWNjb3VudElkfS9wYWdlcy9wcm9qZWN0cy8ke25hbWV9YCxcbiAgICAgICdQQVRDSCcsXG4gICAgICB7XG4gICAgICAgIGRlcGxveW1lbnRfY29uZmlnczogeyBwcm9kdWN0aW9uOiB7IGRlcGxveW1lbnRfZW5hYmxlZDogZmFsc2UgfSB9LFxuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgYXN5bmMgZGVsZXRlUHJvamVjdChuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLnJlcXVlc3QoXG4gICAgICBgL2FjY291bnRzLyR7dGhpcy5hY2NvdW50SWR9L3BhZ2VzL3Byb2plY3RzLyR7bmFtZX1gLFxuICAgICAgJ0RFTEVURScsXG4gICAgKTtcbiAgfVxuXG4gIGFzeW5jIGxpc3REZXBsb3ltZW50cyhuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHsgcmVzdWx0PzogQXJyYXk8UmVjb3JkPHN0cmluZywgdW5rbm93bj4+IH0+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0PHsgcmVzdWx0PzogQXJyYXk8UmVjb3JkPHN0cmluZywgdW5rbm93bj4+IH0+KFxuICAgICAgYC9hY2NvdW50cy8ke3RoaXMuYWNjb3VudElkfS9wYWdlcy9wcm9qZWN0cy8ke25hbWV9L2RlcGxveW1lbnRzYCxcbiAgICApO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQXBwLCBURmlsZSwgVEZvbGRlciB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB7IGlzTWF0Y2ggfSBmcm9tICdtaWNyb21hdGNoJztcbmltcG9ydCB7IFNpdGVQcm9maWxlIH0gZnJvbSAnLi4vY29yZS90eXBlcyc7XG5pbXBvcnQgeyBBVFRBQ0hNRU5UX0VYVFMgfSBmcm9tICcuLi9jb3JlL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBjbGFzcyBGaWxlQ29sbGVjdG9yIHtcbiAgcHJpdmF0ZSByZWFkb25seSBwdWJsaXNoU2NvcGU6ICd2YXVsdCcgfCAnc2VsZWN0ZWQnO1xuICBwcml2YXRlIHJlYWRvbmx5IHB1Ymxpc2hQYXRoczogc3RyaW5nW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhcHA6IEFwcCxcbiAgICBwcml2YXRlIHNpdGU6IFNpdGVQcm9maWxlLFxuICApIHtcbiAgICB0aGlzLnB1Ymxpc2hTY29wZSA9IHNpdGUucHVibGlzaFNjb3BlIHx8ICd2YXVsdCc7XG4gICAgdGhpcy5wdWJsaXNoUGF0aHMgPSAoc2l0ZS5wdWJsaXNoUGF0aHMgfHwgW10pLm1hcChwID0+IHAudHJpbSgpLnJlcGxhY2UoL15cXC8rfFxcLyskL2csICcnKSkuZmlsdGVyKEJvb2xlYW4pO1xuICB9XG5cbiAgYXN5bmMgY29sbGVjdCgpOiBQcm9taXNlPFRGaWxlW10+IHtcbiAgICBjb25zdCByZXN1bHQ6IFRGaWxlW10gPSBbXTtcblxuICAgIGlmICh0aGlzLnB1Ymxpc2hTY29wZSA9PT0gJ3NlbGVjdGVkJykge1xuICAgICAgY29uc3QgZXhwbGljaXRGaWxlcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXG4gICAgICBmb3IgKGNvbnN0IHBhdGggb2YgdGhpcy5wdWJsaXNoUGF0aHMpIHtcbiAgICAgICAgY29uc3QgYWJzdHJhY3RGaWxlID0gdGhpcy5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKHBhdGgpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGFic3RyYWN0RmlsZSBpbnN0YW5jZW9mIFRGaWxlKSB7XG4gICAgICAgICAgaWYgKGFic3RyYWN0RmlsZS5leHRlbnNpb24gPT09ICdtZCcgJiYgIXRoaXMuaXNFeGNsdWRlZChhYnN0cmFjdEZpbGUucGF0aCkpIHtcbiAgICAgICAgICAgIGlmICghcmVzdWx0LnNvbWUoZiA9PiBmLnBhdGggPT09IGFic3RyYWN0RmlsZS5wYXRoKSkge1xuICAgICAgICAgICAgICByZXN1bHQucHVzaChhYnN0cmFjdEZpbGUpO1xuICAgICAgICAgICAgICBleHBsaWNpdEZpbGVzLmFkZChhYnN0cmFjdEZpbGUucGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGFic3RyYWN0RmlsZSBpbnN0YW5jZW9mIFRGb2xkZXIpIHtcbiAgICAgICAgICBjb25zdCBmb2xkZXJQcmVmaXggPSBwYXRoICsgJy8nO1xuICAgICAgICAgIGZvciAoY29uc3QgZmlsZSBvZiB0aGlzLmFwcC52YXVsdC5nZXRGaWxlcygpKSB7XG4gICAgICAgICAgICBpZiAoZmlsZS5wYXRoLnN0YXJ0c1dpdGgoZm9sZGVyUHJlZml4KSAmJiAhdGhpcy5pc0V4Y2x1ZGVkKGZpbGUucGF0aCkpIHtcbiAgICAgICAgICAgICAgaWYgKGZpbGUuZXh0ZW5zaW9uID09PSAnbWQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQuc29tZShmID0+IGYucGF0aCA9PT0gZmlsZS5wYXRoKSkge1xuICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZmlsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgIHRoaXMuc2l0ZS5pbmNsdWRlQXR0YWNobWVudHMgJiZcbiAgICAgICAgICAgICAgICBBVFRBQ0hNRU5UX0VYVFMuaGFzKGZpbGUuZXh0ZW5zaW9uLnRvTG93ZXJDYXNlKCkpXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0LnNvbWUoZiA9PiBmLnBhdGggPT09IGZpbGUucGF0aCkpIHtcbiAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGZpbGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5zaXRlLmluY2x1ZGVBdHRhY2htZW50cykge1xuICAgICAgICBjb25zdCBleHRyYUF0dGFjaG1lbnRzOiBURmlsZVtdID0gW107XG4gICAgICAgIGZvciAoY29uc3QgZmlsZSBvZiByZXN1bHQpIHtcbiAgICAgICAgICBpZiAoZXhwbGljaXRGaWxlcy5oYXMoZmlsZS5wYXRoKSkge1xuICAgICAgICAgICAgY29uc3QgY2FjaGUgPSB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLmdldENhY2hlKGZpbGUucGF0aCk7XG4gICAgICAgICAgICBjb25zdCBsaW5rc0FuZEVtYmVkcyA9IFtcbiAgICAgICAgICAgICAgLi4uKGNhY2hlPy5saW5rcyB8fCBbXSksXG4gICAgICAgICAgICAgIC4uLihjYWNoZT8uZW1iZWRzIHx8IFtdKSxcbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBsaW5rc0FuZEVtYmVkcykge1xuICAgICAgICAgICAgICBjb25zdCBkZXN0RmlsZSA9IHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0Rmlyc3RMaW5rcGF0aERlc3QoaXRlbS5saW5rLCBmaWxlLnBhdGgpO1xuICAgICAgICAgICAgICBpZiAoZGVzdEZpbGUgJiYgQVRUQUNITUVOVF9FWFRTLmhhcyhkZXN0RmlsZS5leHRlbnNpb24udG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNFeGNsdWRlZChkZXN0RmlsZS5wYXRoKSAmJiAhcmVzdWx0LnNvbWUoZiA9PiBmLnBhdGggPT09IGRlc3RGaWxlLnBhdGgpICYmICFleHRyYUF0dGFjaG1lbnRzLnNvbWUoZiA9PiBmLnBhdGggPT09IGRlc3RGaWxlLnBhdGgpKSB7XG4gICAgICAgICAgICAgICAgICBleHRyYUF0dGFjaG1lbnRzLnB1c2goZGVzdEZpbGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXN1bHQucHVzaCguLi5leHRyYUF0dGFjaG1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgdGhpcy5hcHAudmF1bHQuZ2V0RmlsZXMoKSkge1xuICAgICAgaWYgKHRoaXMuaXNFeGNsdWRlZChmaWxlLnBhdGgpKSBjb250aW51ZTtcblxuICAgICAgaWYgKGZpbGUuZXh0ZW5zaW9uID09PSAnbWQnKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGZpbGUpO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgdGhpcy5zaXRlLmluY2x1ZGVBdHRhY2htZW50cyAmJlxuICAgICAgICBBVFRBQ0hNRU5UX0VYVFMuaGFzKGZpbGUuZXh0ZW5zaW9uLnRvTG93ZXJDYXNlKCkpXG4gICAgICApIHtcbiAgICAgICAgcmVzdWx0LnB1c2goZmlsZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGFzeW5jIHJlYWRBc0Jhc2U2NChmaWxlOiBURmlsZSk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgYnVmZmVyID0gYXdhaXQgdGhpcy5hcHAudmF1bHQucmVhZEJpbmFyeShmaWxlKTtcbiAgICBjb25zdCBieXRlcyA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlcik7XG4gICAgbGV0IGJpbmFyeSA9ICcnO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnl0ZXMuYnl0ZUxlbmd0aDsgaSsrKSB7XG4gICAgICBiaW5hcnkgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSk7XG4gICAgfVxuICAgIHJldHVybiBidG9hKGJpbmFyeSk7XG4gIH1cblxuICBwcml2YXRlIGlzRXhjbHVkZWQocGF0aDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuc2l0ZS5leGNsdWRlUGF0dGVybnMubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIGlzTWF0Y2gocGF0aCwgdGhpcy5zaXRlLmV4Y2x1ZGVQYXR0ZXJucywgeyBkb3Q6IHRydWUgfSk7XG4gIH1cbn1cbiIsICIvLyBTaGFyZWQgYWNyb3NzIGZpbGVDb2xsZWN0b3IgKHdoaWNoIGZpbGVzIHRvIHVwbG9hZCkgYW5kIHRyYW5zZm9ybWVyICh3aGljaFxuLy8gZW1iZWRzIGFyZSBpbWFnZXMpLiBLZWVwIHRoaXMgYXMgdGhlIHNpbmdsZSBzb3VyY2Ugb2YgdHJ1dGggXHUyMDE0IGJvdGggbW9kdWxlc1xuLy8gbXVzdCBhZ3JlZSBvbiB3aGF0IGNvdW50cyBhcyBhIHB1Ymxpc2hhYmxlIGF0dGFjaG1lbnQuXG5leHBvcnQgY29uc3QgQVRUQUNITUVOVF9FWFRTID0gbmV3IFNldChbXG4gICdwbmcnLFxuICAnanBnJyxcbiAgJ2pwZWcnLFxuICAnZ2lmJyxcbiAgJ3N2ZycsXG4gICd3ZWJwJyxcbiAgJ3BkZicsXG5dKTtcblxuLy8gTm9kZSB2ZXJzaW9uIHBpbm5lZCBmb3IgdGhlIENsb3VkZmxhcmUgUGFnZXMgYnVpbGQuIG1kZ2FyZGVuIG5lZWRzIGEgbW9kZXJuXG4vLyBOb2RlOyBDbG91ZGZsYXJlIG90aGVyd2lzZSBkZWZhdWx0cyB0byBhIHZlcnkgb2xkIG9uZSBhbmQgdGhlIGJ1aWxkIGZhaWxzLlxuLy8gV3JpdHRlbiB0byBhIGAubm9kZS12ZXJzaW9uYCBmaWxlIGluIHRoZSByZXBvIHJvb3Qgb24gZXZlcnkgcHVibGlzaC5cbmV4cG9ydCBjb25zdCBOT0RFX1ZFUlNJT04gPSAnMjQnO1xuXG4vLyBUaGUgbWRnYXJkZW4gZW5naW5lIGRlcGVuZGVuY3kgd3JpdHRlbiBpbnRvIGVhY2ggcHVibGlzaGVkIHJlcG8nc1xuLy8gcGFja2FnZS5qc29uIChDbG91ZGZsYXJlIHJ1bnMgYG5wbSBpbnN0YWxsYCB0aGVuIGBucHggbWRnYXJkZW4gYnVpbGRgKS5cbi8vIERlZmF1bHRzIHRvIHRoZSBucG0gcmVsZWFzZSBcdTIwMTQgcHVibGlzaCBtZGdhcmRlbiB0byBucG0gZm9yIHRoaXMgdG8gcmVzb2x2ZS5cbi8vIER1cmluZyBsb2NhbCBkZXYgb3IgYmVmb3JlIHB1Ymxpc2gsIHRoaXMgY291bGQgcG9pbnQgdG8gYSBnaXRodWIgYnJhbmNoOlxuLy8gJ2dpdGh1Yjo8b3duZXI+L21kZ2FyZGVuJyAobWRnYXJkZW4ncyBgcHJlcGFyZWAgc2NyaXB0IGJ1aWxkcyBpdCBvbiBpbnN0YWxsKS5cbi8vICdsYXRlc3QnIHdpbGwgZmV0Y2ggdGhlIG5ld2VzdCB2ZXJzaW9uLCBidXQgcGlubmluZyBhIHZlcnNpb24gaXMgc2FmZXIuXG5cbmV4cG9ydCBjb25zdCBNREdBUkRFTl9WRVJTSU9OID0gJ2xhdGVzdCc7XG5cbi8qKlxuICogR2l0SHViIEFjdGlvbnMgd29ya2Zsb3cgWUFNTCBmb3IgdGhlIFwiR2l0SHViIEFjdGlvbnNcIiBkZXBsb3kgdGFyZ2V0LlxuICogVGhpcyBnZXRzIGNvbW1pdHRlZCB0byBgLmdpdGh1Yi93b3JrZmxvd3MvZGVwbG95LnltbGAgaW4gdGhlIHB1Ymxpc2ggcmVwby5cbiAqIEl0IGluc3RhbGxzIG1kZ2FyZGVuLCBidWlsZHMgdGhlIHNpdGUsIGFuZCBkZXBsb3lzIHRvIEdpdEh1YiBQYWdlcy5cbiAqXG4gKiBBY3Rpb24gdmVyc2lvbnMgcGlubmVkIHRvIGtub3duIHN0YWJsZSByZWxlYXNlczpcbiAqICAgYWN0aW9ucy9jaGVja291dEB2NCwgc2V0dXAtbm9kZUB2NCwgY29uZmlndXJlLXBhZ2VzQHY1LFxuICogICB1cGxvYWQtcGFnZXMtYXJ0aWZhY3RAdjMsIGRlcGxveS1wYWdlc0B2NFxuICovXG5leHBvcnQgY29uc3QgR0lUSFVCX0FDVElPTlNfV09SS0ZMT1cgPSBgbmFtZTogRGVwbG95IHRvIEdpdEh1YiBQYWdlc1xuXG5vbjpcbiAgcHVzaDpcbiAgICBicmFuY2hlczogW21haW5dXG4gIHdvcmtmbG93X2Rpc3BhdGNoOlxuXG5wZXJtaXNzaW9uczpcbiAgY29udGVudHM6IHJlYWRcbiAgcGFnZXM6IHdyaXRlXG4gIGlkLXRva2VuOiB3cml0ZVxuXG5jb25jdXJyZW5jeTpcbiAgZ3JvdXA6IFwicGFnZXNcIlxuICBjYW5jZWwtaW4tcHJvZ3Jlc3M6IGZhbHNlXG5cbmpvYnM6XG4gIGJ1aWxkOlxuICAgIHJ1bnMtb246IHVidW50dS1sYXRlc3RcbiAgICBzdGVwczpcbiAgICAgIC0gdXNlczogYWN0aW9ucy9jaGVja291dEB2NFxuICAgICAgICB3aXRoOlxuICAgICAgICAgIGZldGNoLWRlcHRoOiAwXG4gICAgICAtIHVzZXM6IGFjdGlvbnMvc2V0dXAtbm9kZUB2NFxuICAgICAgICB3aXRoOlxuICAgICAgICAgIG5vZGUtdmVyc2lvbjogJ2x0cy8qJ1xuICAgICAgLSBuYW1lOiBTZXR1cCBQYWdlc1xuICAgICAgICB1c2VzOiBhY3Rpb25zL2NvbmZpZ3VyZS1wYWdlc0B2NVxuICAgICAgLSBuYW1lOiBCdWlsZCBhbGwgc2l0ZXNcbiAgICAgICAgcnVuOiB8XG4gICAgICAgICAgbWtkaXIgLXAgYnVpbGRfb3V0cHV0L3NpdGVzXG4gICAgICAgICAgZm91bmRfc2l0ZXM9MFxuICAgICAgICAgIGZvciBzaXRlX2RpciBpbiBzaXRlcy8qLzsgZG9cbiAgICAgICAgICAgIGlmIFsgLWYgXCJcXCR7c2l0ZV9kaXJ9cGFja2FnZS5qc29uXCIgXTsgdGhlblxuICAgICAgICAgICAgICBlY2hvIFwiQnVpbGRpbmcgc2l0ZSBpbiBcXCR7c2l0ZV9kaXJ9Li4uXCJcbiAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgIGNkIFwiXFwke3NpdGVfZGlyfVwiXG4gICAgICAgICAgICAgICAgbnBtIGNpIHx8IG5wbSBpbnN0YWxsXG4gICAgICAgICAgICAgICAgbnB4IG1kZ2FyZGVuIGJ1aWxkXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgc2l0ZV9pZD1cXCQoYmFzZW5hbWUgXCJcXCR7c2l0ZV9kaXJ9XCIpXG4gICAgICAgICAgICAgIGNwIC1yIFwiXFwke3NpdGVfZGlyfXB1YmxpY1wiIFwiYnVpbGRfb3V0cHV0L3NpdGVzL1xcJHtzaXRlX2lkfVwiXG4gICAgICAgICAgICAgIGZvdW5kX3NpdGVzPVxcJCgoZm91bmRfc2l0ZXMgKyAxKSlcbiAgICAgICAgICAgIGZpXG4gICAgICAgICAgZG9uZVxuICAgICAgICAgIGlmIFsgXCJcXCRmb3VuZF9zaXRlc1wiIC1lcSAwIF07IHRoZW5cbiAgICAgICAgICAgIGVjaG8gXCJObyBzaXRlcyBmb3VuZCB0byBidWlsZC5cIlxuICAgICAgICAgICAgbWtkaXIgLXAgYnVpbGRfb3V0cHV0XG4gICAgICAgICAgICBlY2hvIFwiPGgxPk5vIHNpdGVzIHB1Ymxpc2hlZCB5ZXQ8L2gxPlwiID4gYnVpbGRfb3V0cHV0L2luZGV4Lmh0bWxcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBsYXRlc3Rfc2l0ZT1cIlwiXG4gICAgICAgICAgICBsYXRlc3RfdGltZT0wXG4gICAgICAgICAgICBmb3Igc2l0ZV9kaXIgaW4gc2l0ZXMvKi87IGRvXG4gICAgICAgICAgICAgIGlmIFsgLWYgXCJcXCR7c2l0ZV9kaXJ9cGFja2FnZS5qc29uXCIgXTsgdGhlblxuICAgICAgICAgICAgICAgIG10aW1lPVxcJChnaXQgbG9nIC0xIC0tZm9ybWF0PVwiJWN0XCIgXCJcXCR7c2l0ZV9kaXJ9XCIgMj4vZGV2L251bGwgfHwgZWNobyAwKVxuICAgICAgICAgICAgICAgIGlmIFsgXCJcXCRtdGltZVwiIC1ndCBcIlxcJGxhdGVzdF90aW1lXCIgXTsgdGhlblxuICAgICAgICAgICAgICAgICAgbGF0ZXN0X3RpbWU9XCJcXCRtdGltZVwiXG4gICAgICAgICAgICAgICAgICBsYXRlc3Rfc2l0ZT1cXCQoYmFzZW5hbWUgXCJcXCR7c2l0ZV9kaXJ9XCIpXG4gICAgICAgICAgICAgICAgZmlcbiAgICAgICAgICAgICAgZmlcbiAgICAgICAgICAgIGRvbmVcbiAgICAgICAgICAgIGlmIFsgLXogXCJcXCRsYXRlc3Rfc2l0ZVwiIF07IHRoZW5cbiAgICAgICAgICAgICAgbGF0ZXN0X3NpdGU9XFwkKGxzIC0xIGJ1aWxkX291dHB1dC9zaXRlcyB8IGhlYWQgLW4gMSlcbiAgICAgICAgICAgIGZpXG4gICAgICAgICAgICBpZiBbIC1uIFwiXFwkbGF0ZXN0X3NpdGVcIiBdOyB0aGVuXG4gICAgICAgICAgICAgIGVjaG8gXCJEZXBsb3lpbmcgJ1xcJGxhdGVzdF9zaXRlJyB0byByb290Li4uXCJcbiAgICAgICAgICAgICAgY3AgLXIgXCJzaXRlcy9cXCR7bGF0ZXN0X3NpdGV9L3B1YmxpYy8uXCIgYnVpbGRfb3V0cHV0L1xuICAgICAgICAgICAgZmlcbiAgICAgICAgICBmaVxuICAgICAgICAgIG12IGJ1aWxkX291dHB1dCBwdWJsaWNcbiAgICAgIC0gdXNlczogYWN0aW9ucy91cGxvYWQtcGFnZXMtYXJ0aWZhY3RAdjNcbiAgICAgICAgd2l0aDpcbiAgICAgICAgICBwYXRoOiBwdWJsaWNcblxuICBkZXBsb3k6XG4gICAgZW52aXJvbm1lbnQ6XG4gICAgICBuYW1lOiBnaXRodWItcGFnZXNcbiAgICAgIHVybDogXFwke3sgc3RlcHMuZGVwbG95bWVudC5vdXRwdXRzLnBhZ2VfdXJsIH19XG4gICAgcnVucy1vbjogdWJ1bnR1LWxhdGVzdFxuICAgIG5lZWRzOiBidWlsZFxuICAgIHN0ZXBzOlxuICAgICAgLSBuYW1lOiBEZXBsb3kgdG8gR2l0SHViIFBhZ2VzXG4gICAgICAgIGlkOiBkZXBsb3ltZW50XG4gICAgICAgIHVzZXM6IGFjdGlvbnMvZGVwbG95LXBhZ2VzQHY0XG5gOyIsICJpbXBvcnQgeyBwYXJzZVlhbWwsIHN0cmluZ2lmeVlhbWwgfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgeyBub3JtYWxpemVGcm9udG1hdHRlciB9IGZyb20gJy4vY29udGVudFZhbGlkYXRvcic7XG5cbi8vIEEgZnJvbnRtYXR0ZXIgYmxvY2sgYXQgdGhlIHZlcnkgc3RhcnQgb2YgdGhlIGNvbnRlbnQuXG5jb25zdCBMRUFESU5HX0JMT0NLX1JFID0gL14tLS1bIFxcdF0qXFxyP1xcbihbXFxzXFxTXSo/KVxccj9cXG4tLS1bIFxcdF0qKFxccj9cXG58JCkvO1xuXG4vKipcbiAqIFByZXBhcmVzIGEgdmF1bHQgbm90ZSdzIHRleHQgZm9yIHVwbG9hZC4gbWRnYXJkZW4gcmVzb2x2ZXMgT2JzaWRpYW4gd2lraWxpbmtzXG4gKiBhbmQgZW1iZWRzIGl0c2VsZiwgc28gd2Ugbm8gbG9uZ2VyIHJld3JpdGUgbGlua3MgaGVyZSBcdTIwMTQgd2Ugb25seTpcbiAqICAgMS4gZ3VhcmFudGVlIGEgdmFsaWQgbGVhZGluZyBmcm9udG1hdHRlciBibG9jayAoZGVmZW5zaXZlOyBtZGdhcmRlbiB0b2xlcmF0ZXNcbiAqICAgICAgYmFkIGZyb250bWF0dGVyLCBidXQgYSBjbGVhbiBibG9jayBnaXZlcyBhIHJlbGlhYmxlIHRpdGxlKSwgYW5kXG4gKiAgIDIuIGRyb3AgYHByaXZhdGVgL2BkcmFmdGAga2V5cyBzbyB0aGUgbm90ZSBwdWJsaXNoZXMgKG1kZ2FyZGVuIHNraXBzIG5vdGVzXG4gKiAgICAgIHRoYXQgc3RpbGwgY2FycnkgdGhvc2UgZmxhZ3MpLlxuICogT25seSB0aGUgdXBsb2FkZWQgY29weSBpcyBjaGFuZ2VkIFx1MjAxNCB0aGUgdmF1bHQgbm90ZSBpcyBuZXZlciB0b3VjaGVkLlxuICovXG5leHBvcnQgY2xhc3MgVHJhbnNmb3JtZXIge1xuICB0cmFuc2Zvcm0oY29udGVudDogc3RyaW5nLCBmaWxlUGF0aDogc3RyaW5nLCB0aXRsZT86IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3Qgbm90ZVRpdGxlID0gdGl0bGUgPz8gZmlsZVBhdGguc3BsaXQoJy8nKS5wb3AoKT8ucmVwbGFjZSgvXFwubWQkLywgJycpID8/ICdVbnRpdGxlZCc7XG4gICAgbGV0IHJlc3VsdCA9IG5vcm1hbGl6ZUZyb250bWF0dGVyKGNvbnRlbnQsIG5vdGVUaXRsZSk7XG4gICAgcmVzdWx0ID0gdGhpcy5zdHJpcFByaXZhdGVGcm9udG1hdHRlcihyZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGBwcml2YXRlYC9gZHJhZnRgIGtleXMgZnJvbSB0aGUgbGVhZGluZyBmcm9udG1hdHRlciBibG9jay4gUGFyc2VzIHRoZVxuICAgKiBibG9jayB3aXRoIE9ic2lkaWFuJ3MgWUFNTCBlbmdpbmUgKHJvYnVzdCBhZ2FpbnN0IHF1b3RpbmcvbmVzdGluZykgcmF0aGVyXG4gICAqIHRoYW4gc3BsaXR0aW5nIGxpbmVzLiBBc3N1bWVzIGEgdmFsaWQgbGVhZGluZyBibG9jayAoZ3VhcmFudGVlZCBieVxuICAgKiBgbm9ybWFsaXplRnJvbnRtYXR0ZXJgIHVwc3RyZWFtKTsgbGVhdmVzIGNvbnRlbnQgdW50b3VjaGVkIG90aGVyd2lzZS5cbiAgICovXG4gIHByaXZhdGUgc3RyaXBQcml2YXRlRnJvbnRtYXR0ZXIoY29udGVudDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBtID0gY29udGVudC5tYXRjaChMRUFESU5HX0JMT0NLX1JFKTtcbiAgICBpZiAoIW0pIHJldHVybiBjb250ZW50O1xuXG4gICAgbGV0IGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuICAgIHRyeSB7XG4gICAgICBkYXRhID0gKHBhcnNlWWFtbChtWzFdKSA/PyB7fSkgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gICAgfSBjYXRjaCB7XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9XG4gICAgZGVsZXRlIGRhdGEucHJpdmF0ZTtcbiAgICBkZWxldGUgZGF0YS5kcmFmdDtcblxuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhkYXRhKTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1hc3NpZ25tZW50LCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWNhbGwsIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtbWVtYmVyLWFjY2VzcyAtLSBPYnNpZGlhbiBzdHJpbmdpZnlZYW1sIHR5cGluZ3MgbWF5IGJlIGluY29tcGxldGVcbiAgICBjb25zdCB5YW1sID0ga2V5cy5sZW5ndGggPyBzdHJpbmdpZnlZYW1sKGRhdGEpLnRyaW1FbmQoKSA6ICcnO1xuICAgIGNvbnN0IGJsb2NrID0geWFtbCA/IGAtLS1cXG4ke3lhbWx9XFxuLS0tYCA6IGAtLS1cXG4tLS1gO1xuICAgIGNvbnN0IHRyYWlsaW5nID0gbVsyXSA/ICdcXG4nIDogJyc7XG4gICAgcmV0dXJuIGNvbnRlbnQuc2xpY2UoMCwgbS5pbmRleCkgKyBibG9jayArIHRyYWlsaW5nICsgY29udGVudC5zbGljZSgobS5pbmRleCA/PyAwKSArIG1bMF0ubGVuZ3RoKTtcbiAgfVxufVxuIiwgImltcG9ydCB7IHBhcnNlWWFtbCB9IGZyb20gJ29ic2lkaWFuJztcblxuLyoqXG4gKiBQcmUtcHVibGlzaCBmcm9udG1hdHRlciBjaGVjayArIHJlcGFpci4gbWRnYXJkZW4gcGFyc2VzIFlBTUwgZnJvbnRtYXR0ZXIgd2l0aFxuICogdGhlIHNhbWUganMteWFtbCBlbmdpbmUgT2JzaWRpYW4gZXhwb3NlcyBhcyBgcGFyc2VZYW1sYCwgc28gd2UgY2FuIGNhdGNoIHRoZVxuICogZXhhY3QgZmFpbHVyZXMgaGVyZSBcdTIwMTQgYmVmb3JlIGFueXRoaW5nIHJlYWNoZXMgQ2xvdWRmbGFyZS5cbiAqXG4gKiBUaGUgcmVjdXJyaW5nIGJyZWFrZXI6IGEgbm90ZSB0aGF0IHN0YXJ0cyAoYWZ0ZXIgYSBibGFuayBsaW5lKSB3aXRoIGEgc3RyYXlcbiAqIGAtLS1gIGhvcml6b250YWwgcnVsZSBhbmQgbm8gY2xvc2luZyBgLS0tYC4gbWRnYXJkZW4gdHJlYXRzIGl0IGFzIGEgZnJvbnRtYXR0ZXJcbiAqIG9wZW5lciwgbmV2ZXIgZmluZHMgdGhlIGNsb3NlLCBhbmQgdHJpZXMgdG8gWUFNTC1wYXJzZSB0aGUgd2hvbGUgYm9keSBcdTIxOTJcbiAqIFwiZW5kIG9mIHRoZSBzdHJlYW0gb3IgYSBkb2N1bWVudCBzZXBhcmF0b3IgaXMgZXhwZWN0ZWRcIi4gVGhlIGZpeCBpcyB0byBlbnN1cmVcbiAqIGV2ZXJ5IHB1Ymxpc2hlZCBub3RlIEJFR0lOUyB3aXRoIGEgdmFsaWQgZnJvbnRtYXR0ZXIgYmxvY2s7IHRoZSBzdHJheSBgLS0tYFxuICogdGhlbiBkZWdyYWRlcyB0byBhbiBvcmRpbmFyeSBib2R5IGhvcml6b250YWwtcnVsZS5cbiAqL1xuXG5leHBvcnQgdHlwZSBGcm9udG1hdHRlclN0YXR1cyA9ICdjbGVhbicgfCAnZml4ZWQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZyb250bWF0dGVySW5zcGVjdGlvbiB7XG4gIHN0YXR1czogRnJvbnRtYXR0ZXJTdGF0dXM7XG4gIHJlYXNvbj86IHN0cmluZztcbn1cblxuLy8gQSBmcm9udG1hdHRlciBibG9jayBhdCB0aGUgdmVyeSBzdGFydDogYC0tLWAgbGluZSwgYm9keSwgY2xvc2luZyBgLS0tYCBsaW5lLlxuY29uc3QgTEVBRElOR19CTE9DS19SRSA9IC9eLS0tWyBcXHRdKlxccj9cXG4oW1xcc1xcU10qPylcXHI/XFxuLS0tWyBcXHRdKihcXHI/XFxufCQpLztcblxuLyoqIFRydWUgb25seSB3aGVuIHRoZSBjb250ZW50IHN0YXJ0cyB3aXRoIGEgcGFyc2VhYmxlIGAtLS1cdTIwMjYtLS1gIGJsb2NrLiAqL1xuZnVuY3Rpb24gaGFzVmFsaWRMZWFkaW5nRnJvbnRtYXR0ZXIocmF3OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgY29uc3QgcyA9IHJhdy5yZXBsYWNlKC9eXFx1ZmVmZi8sICcnKTtcbiAgY29uc3QgbSA9IHMubWF0Y2goTEVBRElOR19CTE9DS19SRSk7XG4gIGlmICghbSkgcmV0dXJuIGZhbHNlO1xuICB0cnkge1xuICAgIHBhcnNlWWFtbChtWzFdKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8qKiBXaGV0aGVyIHRoZSBjb250ZW50ICpsb29rcyogbGlrZSBpdCBvcGVucyB3aXRoIGZyb250bWF0dGVyIChsYXRjaGVzIG1kZ2FyZGVuKS4gKi9cbmZ1bmN0aW9uIGxvb2tzTGlrZUZyb250bWF0dGVyT3BlbmVyKHJhdzogc3RyaW5nKTogYm9vbGVhbiB7XG4gIGNvbnN0IHN0cmlwcGVkID0gcmF3LnJlcGxhY2UoL15cXHVmZWZmLywgJycpLnJlcGxhY2UoL15bIFxcdFxcclxcbl0rLywgJycpO1xuICByZXR1cm4gc3RyaXBwZWQuc3RhcnRzV2l0aCgnLS0tJyk7XG59XG5cbi8qKlxuICogQ2xhc3NpZnkgYSBub3RlJ3MgZnJvbnRtYXR0ZXIgd2l0aG91dCBtb2RpZnlpbmcgaXQuIGBjbGVhbmAgPSBzYWZlIHRvIHB1Ymxpc2hcbiAqIGFzLWlzOyBgZml4ZWRgID0gd291bGQgYnJlYWsgbWRnYXJkZW4gYW5kIHdpbGwgYmUgYXV0by1yZXBhaXJlZCBvbiBwdWJsaXNoLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5zcGVjdEZyb250bWF0dGVyKHJhdzogc3RyaW5nKTogRnJvbnRtYXR0ZXJJbnNwZWN0aW9uIHtcbiAgaWYgKGhhc1ZhbGlkTGVhZGluZ0Zyb250bWF0dGVyKHJhdykpIHJldHVybiB7IHN0YXR1czogJ2NsZWFuJyB9O1xuICBpZiAobG9va3NMaWtlRnJvbnRtYXR0ZXJPcGVuZXIocmF3KSkge1xuICAgIHJldHVybiB7IHN0YXR1czogJ2ZpeGVkJywgcmVhc29uOiAnc3RyYXkgb3IgdW5wYXJzZWFibGUgXHUyMDFDLS0tXHUyMDFEIGF0IHRoZSB0b3AgXHUyMDE0IHdvdWxkIGJyZWFrIHRoZSBtZGdhcmRlbiBidWlsZCcgfTtcbiAgfVxuICAvLyBObyBsZWFkaW5nIGZyb250bWF0dGVyIGFuZCBubyByaXNreSBvcGVuZXIgXHUyMTkyIG5vdGhpbmcgdG8gZG8uXG4gIHJldHVybiB7IHN0YXR1czogJ2NsZWFuJyB9O1xufVxuXG4vKipcbiAqIFJldHVybiBjb250ZW50IHRoYXQgaXMgZ3VhcmFudGVlZCB0byBiZWdpbiB3aXRoIGEgdmFsaWQgZnJvbnRtYXR0ZXIgYmxvY2suXG4gKiBJZiB0aGUgbm90ZSBhbHJlYWR5IGRvZXMsIGl0J3MgcmV0dXJuZWQgdW5jaGFuZ2VkOyBvdGhlcndpc2UgYSBtaW5pbWFsIGJsb2NrXG4gKiAoYHRpdGxlYCkgaXMgcHJlcGVuZGVkIHNvIG1kZ2FyZGVuIHBhcnNlcyBjbGVhbmx5LiBPbmx5IHRoZSBwdWJsaXNoZWQgY29weSBpc1xuICogYWZmZWN0ZWQgXHUyMDE0IG5ldmVyIHRoZSB1c2VyJ3MgdmF1bHQgbm90ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZUZyb250bWF0dGVyKHJhdzogc3RyaW5nLCB0aXRsZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKGhhc1ZhbGlkTGVhZGluZ0Zyb250bWF0dGVyKHJhdykpIHJldHVybiByYXc7XG4gIGNvbnN0IHNhZmVUaXRsZSA9IHRpdGxlLnJlcGxhY2UoL1wiL2csIFwiJ1wiKTtcbiAgcmV0dXJuIGAtLS1cXG50aXRsZTogXCIke3NhZmVUaXRsZX1cIlxcbi0tLVxcblxcbiR7cmF3fWA7XG59XG4iLCAiaW1wb3J0IHsgQXBwIH0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IHsgTm90ZUZsYXJlU2V0dGluZ3MsIFB1Ymxpc2hSZXN1bHQsIFNpdGVQcm9maWxlLCBVcGxvYWRGaWxlIH0gZnJvbSAnLi4vY29yZS90eXBlcyc7XG5pbXBvcnQgeyBHaXRIdWJBcGkgfSBmcm9tICcuLi9hcGkvZ2l0aHViQXBpJztcbmltcG9ydCB7IENsb3VkZmxhcmVBcGkgfSBmcm9tICcuLi9hcGkvY2xvdWRmbGFyZUFwaSc7XG5pbXBvcnQgeyBGaWxlQ29sbGVjdG9yIH0gZnJvbSAnLi9maWxlQ29sbGVjdG9yJztcbmltcG9ydCB7IFRyYW5zZm9ybWVyIH0gZnJvbSAnLi90cmFuc2Zvcm1lcic7XG5pbXBvcnQgeyBpbnNwZWN0RnJvbnRtYXR0ZXIgfSBmcm9tICcuL2NvbnRlbnRWYWxpZGF0b3InO1xuaW1wb3J0IHsgR0lUSFVCX0FDVElPTlNfV09SS0ZMT1csIE1ER0FSREVOX1ZFUlNJT04sIE5PREVfVkVSU0lPTiB9IGZyb20gJy4uL2NvcmUvY29uc3RhbnRzJztcblxuY29uc3QgUkVDT05ORUNUX0hJTlQgPVxuICBcIklmIHRoZSBidWlsZCBjYW4ndCBzdGFydCwgcmVjb25uZWN0IENsb3VkZmxhcmUgdG8gR2l0SHViOiBpbnN0YWxsL2F1dGhvcml6ZSB0aGUgXCIgK1xuICAnXCJDbG91ZGZsYXJlIFdvcmtlcnMgYW5kIFBhZ2VzXCIgR2l0SHViIEFwcCBmb3IgdGhpcyByZXBvLic7XG5cblxuZnVuY3Rpb24gdGV4dFRvQmFzZTY0KHRleHQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IGJ5dGVzID0gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKHRleHQpO1xuICBsZXQgYmluYXJ5ID0gJyc7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICBiaW5hcnkgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSk7XG4gIH1cbiAgcmV0dXJuIGJ0b2EoYmluYXJ5KTtcbn1cblxuZXhwb3J0IGNsYXNzIFB1Ymxpc2hlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc2V0dGluZ3M6IE5vdGVGbGFyZVNldHRpbmdzLFxuICAgIHByaXZhdGUgc2l0ZTogU2l0ZVByb2ZpbGUsXG4gICAgcHJpdmF0ZSBhcHA6IEFwcCxcbiAgICBwcml2YXRlIG9uUHJvZ3Jlc3M6IChtc2c6IHN0cmluZykgPT4gdm9pZCxcbiAgKSB7fVxuXG4gIC8qKiBFZmZlY3RpdmUgaG9zdGluZyBwcm92aWRlciBmb3IgdGhpcyBzaXRlLiAqL1xuICBwcml2YXRlIGdldCBob3N0aW5nUHJvdmlkZXIoKTogU2l0ZVByb2ZpbGVbJ2hvc3RpbmdQcm92aWRlciddIHtcbiAgICByZXR1cm4gdGhpcy5zaXRlLmhvc3RpbmdQcm92aWRlcjtcbiAgfVxuXG4gIGFzeW5jIHB1Ymxpc2goKTogUHJvbWlzZTxQdWJsaXNoUmVzdWx0PiB7XG4gICAgY29uc3QgcmVwbyA9IHRoaXMuc2V0dGluZ3MubWFzdGVyUmVwb3NpdG9yeTtcbiAgICBcbiAgICAvLyBUaGUgYnJhbmNoIENsb3VkZmxhcmUvR0ggQWN0aW9ucyBidWlsZHMgYW5kIHdlIGNvbW1pdCB0byBpcyB0aGUgcmVwbydzXG4gICAgLy8gb3duIGRlZmF1bHQgKG1haW4pLiBSZS1yZXNvbHZlIGZyb20gR2l0SHViIGluIGNhc2UgaXQgZGlmZmVycy5cbiAgICBsZXQgYnJhbmNoID0gdGhpcy5zaXRlLmdpdGh1YkJyYW5jaCB8fCAnbWFpbic7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHByb2JlID0gbmV3IEdpdEh1YkFwaShcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5naXRodWJUb2tlbixcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5naXRodWJPd25lcixcbiAgICAgICAgcmVwbyxcbiAgICAgICk7XG4gICAgICBicmFuY2ggPSBhd2FpdCBwcm9iZS5nZXREZWZhdWx0QnJhbmNoKCk7XG4gICAgICB0aGlzLnNpdGUuZ2l0aHViQnJhbmNoID0gYnJhbmNoO1xuXG4gICAgICBjb25zdCBpc1ByaXZhdGUgPSBhd2FpdCBwcm9iZS5pc1JlcG9Qcml2YXRlKCk7XG4gICAgICB0aGlzLnNldHRpbmdzLm1hc3RlclJlcG9zaXRvcnlQcml2YXRlID0gaXNQcml2YXRlO1xuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gS2VlcCB0aGUgc3RvcmVkIGJyYW5jaCBhbmQgcHJpdmFjeS5cbiAgICB9XG5cbiAgICBjb25zdCBnaXRodWIgPSBuZXcgR2l0SHViQXBpKFxuICAgICAgdGhpcy5zZXR0aW5ncy5naXRodWJUb2tlbixcbiAgICAgIHRoaXMuc2V0dGluZ3MuZ2l0aHViT3duZXIsXG4gICAgICByZXBvLFxuICAgICAgYnJhbmNoLFxuICAgICk7XG4gICAgY29uc3QgY29sbGVjdG9yID0gbmV3IEZpbGVDb2xsZWN0b3IodGhpcy5hcHAsIHRoaXMuc2l0ZSk7XG4gICAgY29uc3QgdHJhbnNmb3JtZXIgPSBuZXcgVHJhbnNmb3JtZXIoKTtcblxuICAgIGNvbnN0IHVwbG9hZEZpbGVzTWFwID0gbmV3IE1hcDxzdHJpbmcsIFVwbG9hZEZpbGU+KCk7XG4gICAgY29uc3QgaXNzdWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGxldCBmaXhlZENvdW50ID0gMDtcblxuICAgIGNvbnN0IHJvb3REaXIgPSBgc2l0ZXMvJHt0aGlzLnNpdGUuaWR9YDtcbiAgICBcbiAgICB0aGlzLm9uUHJvZ3Jlc3MoJ0NvbGxlY3RpbmcgZmlsZXNcdTIwMjYnKTtcblxuICAgIGNvbnN0IGZpbGVzID0gYXdhaXQgY29sbGVjdG9yLmNvbGxlY3QoKTtcbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMpIHtcbiAgICAgIGxldCBjb250ZW50OiBzdHJpbmc7XG4gICAgICBsZXQgcmVwb1BhdGg6IHN0cmluZztcblxuICAgICAgaWYgKGZpbGUuZXh0ZW5zaW9uID09PSAnbWQnKSB7XG4gICAgICAgIGNvbnN0IHJhdyA9IGF3YWl0IHRoaXMuYXBwLnZhdWx0LnJlYWQoZmlsZSk7XG4gICAgICAgIC8vIFByZWZsaWdodDogY2F0Y2ggKyBhdXRvLXJlcGFpciBmcm9udG1hdHRlciB0aGF0IHdvdWxkIGNyYXNoIHRoZSBidWlsZC5cbiAgICAgICAgY29uc3QgY2hlY2sgPSBpbnNwZWN0RnJvbnRtYXR0ZXIocmF3KTtcbiAgICAgICAgaWYgKGNoZWNrLnN0YXR1cyA9PT0gJ2ZpeGVkJykge1xuICAgICAgICAgIGZpeGVkQ291bnQrKztcbiAgICAgICAgICBpc3N1ZXMucHVzaChgJHtmaWxlLnBhdGh9OiAke2NoZWNrLnJlYXNvbiA/PyAnZnJvbnRtYXR0ZXIgYXV0by1maXhlZCd9YCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdHJhbnNmb3JtZWQgPSB0cmFuc2Zvcm1lci50cmFuc2Zvcm0ocmF3LCBmaWxlLnBhdGgsIGZpbGUuYmFzZW5hbWUpO1xuICAgICAgICBjb250ZW50ID0gdGV4dFRvQmFzZTY0KHRyYW5zZm9ybWVkKTtcbiAgICAgICAgcmVwb1BhdGggPSBgJHtyb290RGlyfS9jb250ZW50LyR7ZmlsZS5wYXRofWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb250ZW50ID0gYXdhaXQgY29sbGVjdG9yLnJlYWRBc0Jhc2U2NChmaWxlKTtcbiAgICAgICAgcmVwb1BhdGggPSBgJHtyb290RGlyfS9jb250ZW50L2F0dGFjaG1lbnRzLyR7ZmlsZS5uYW1lfWA7XG4gICAgICB9XG5cbiAgICAgIGlmICghdXBsb2FkRmlsZXNNYXAuaGFzKHJlcG9QYXRoKSkge1xuICAgICAgICB1cGxvYWRGaWxlc01hcC5zZXQocmVwb1BhdGgsIHsgcGF0aDogcmVwb1BhdGgsIGNvbnRlbnQgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmVwby1yb290IGZpbGVzIHRoYXQgZHJpdmUgdGhlIGJ1aWxkIChzYW1lIGZvciBib3RoIGRlcGxveSB0YXJnZXRzKTpcbiAgICAvLyAgLSBwYWNrYWdlLmpzb24gIFx1MjAxNCBwdWxscyBpbiBtZGdhcmRlbiwgZGVmaW5lcyBidWlsZCBzY3JpcHRcbiAgICAvLyAgLSBtZGdhcmRlbi5jb25maWcuanNvbiBcdTIwMTQgc2l0ZSB0aGVtZSArIG1ldGFkYXRhXG4gICAgLy8gIC0gLm5vZGUtdmVyc2lvbiBcdTIwMTQgcGlucyBhIG1vZGVybiBOb2RlIGZvciB0aGUgYnVpbGQgZW52aXJvbm1lbnRcbiAgICB1cGxvYWRGaWxlc01hcC5zZXQoYCR7cm9vdERpcn0vcGFja2FnZS5qc29uYCwge1xuICAgICAgcGF0aDogYCR7cm9vdERpcn0vcGFja2FnZS5qc29uYCxcbiAgICAgIGNvbnRlbnQ6IHRleHRUb0Jhc2U2NCh0aGlzLmJ1aWxkUGFja2FnZUpzb24oKSksXG4gICAgfSk7XG4gICAgdXBsb2FkRmlsZXNNYXAuc2V0KGAke3Jvb3REaXJ9L21kZ2FyZGVuLmNvbmZpZy5qc29uYCwge1xuICAgICAgcGF0aDogYCR7cm9vdERpcn0vbWRnYXJkZW4uY29uZmlnLmpzb25gLFxuICAgICAgY29udGVudDogdGV4dFRvQmFzZTY0KHRoaXMuYnVpbGRNZGdhcmRlbkNvbmZpZygpKSxcbiAgICB9KTtcbiAgICB1cGxvYWRGaWxlc01hcC5zZXQoYCR7cm9vdERpcn0vLm5vZGUtdmVyc2lvbmAsIHtcbiAgICAgIHBhdGg6IGAke3Jvb3REaXJ9Ly5ub2RlLXZlcnNpb25gLFxuICAgICAgY29udGVudDogdGV4dFRvQmFzZTY0KGAke05PREVfVkVSU0lPTn1cXG5gKSxcbiAgICB9KTtcblxuICAgIC8vIEZvciBHaXRIdWIgQWN0aW9ucyAvIEdpdEh1YiBQYWdlczogY29tbWl0IHRoZSBkZXBsb3kgd29ya2Zsb3cgc28gdGhlXG4gICAgLy8gYnVpbGQgdHJpZ2dlcnMgb24gcHVzaC4gV2l0aG91dCB0aGlzIGZpbGUsIG5vIHdvcmtmbG93IHJ1bnMgYW5kIHRoZVxuICAgIC8vIHNpdGUgc3RheXMgYmxhbmsgZm9yZXZlci5cbiAgICBpZiAodGhpcy5ob3N0aW5nUHJvdmlkZXIgPT09ICdnaXRodWItcGFnZXMnKSB7XG4gICAgICB1cGxvYWRGaWxlc01hcC5zZXQoJy5naXRodWIvd29ya2Zsb3dzL2RlcGxveS55bWwnLCB7XG4gICAgICAgIHBhdGg6ICcuZ2l0aHViL3dvcmtmbG93cy9kZXBsb3kueW1sJyxcbiAgICAgICAgY29udGVudDogdGV4dFRvQmFzZTY0KEdJVEhVQl9BQ1RJT05TX1dPUktGTE9XKSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHVwbG9hZEZpbGVzID0gQXJyYXkuZnJvbSh1cGxvYWRGaWxlc01hcC52YWx1ZXMoKSk7XG5cbiAgICB0aGlzLm9uUHJvZ3Jlc3MoYFVwbG9hZGluZyAwLyR7dXBsb2FkRmlsZXMubGVuZ3RofS4uLmApO1xuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZ2l0aHViLmNvbW1pdEZpbGVzKFxuICAgICAgdXBsb2FkRmlsZXMsXG4gICAgICBgTm90ZUZsYXJlOiBwdWJsaXNoICR7dXBsb2FkRmlsZXMubGVuZ3RofSBmaWxlc2AsXG4gICAgICAoZG9uZSwgdG90YWwpID0+IHRoaXMub25Qcm9ncmVzcyhgVXBsb2FkaW5nICR7ZG9uZX0vJHt0b3RhbH0uLi5gKSxcbiAgICAgIChzZWNzTGVmdCkgPT4gdGhpcy5vblByb2dyZXNzKGBSYXRlIGxpbWl0ZWQgXHUyMDE0ICR7c2Vjc0xlZnR9cy4uLmApLFxuICAgICAgLy8gTWlycm9yIGNvbnRlbnQvIHNvIG5vdGVzIHJlbW92ZWQgb3IgZXhjbHVkZWQgZnJvbSB0aGUgdmF1bHQgZGlzYXBwZWFyXG4gICAgICAvLyBmcm9tIHRoZSBwdWJsaXNoZWQgc2l0ZSB0b28uXG4gICAgICBgJHtyb290RGlyfS9jb250ZW50L2AsXG4gICAgICB7IGlzUHJpdmF0ZTogdGhpcy5zZXR0aW5ncy5tYXN0ZXJSZXBvc2l0b3J5UHJpdmF0ZSB8fCBmYWxzZSB9XG4gICAgKTtcblxuICAgIHJlc3VsdC5maXhlZCA9IGZpeGVkQ291bnQ7XG4gICAgcmVzdWx0Lmlzc3VlcyA9IGlzc3VlcztcbiAgICAvLyBub3RlQ291bnQgPSB2YXVsdCBmaWxlcyBvbmx5IChub3RlcyArIGF0dGFjaG1lbnRzKSwgZXhjbHVkaW5nIGJ1aWxkIGZpbGVzIGxpa2VcbiAgICAvLyBwYWNrYWdlLmpzb24sIG1kZ2FyZGVuLmNvbmZpZy5qc29uLCAubm9kZS12ZXJzaW9uLCBhbmQgdGhlIEdIIEFjdGlvbnMgd29ya2Zsb3cuXG4gICAgcmVzdWx0Lm5vdGVDb3VudCA9IGZpbGVzLmxlbmd0aDtcblxuICAgIGlmIChyZXN1bHQuc3VjY2VzcyAmJiB0aGlzLmhvc3RpbmdQcm92aWRlciA9PT0gJ2Nsb3VkZmxhcmUnKSB7XG4gICAgICBjb25zdCBjbG91ZGZsYXJlID0gbmV3IENsb3VkZmxhcmVBcGkoXG4gICAgICAgIHRoaXMuc2V0dGluZ3MuY2xvdWRmbGFyZVRva2VuLFxuICAgICAgICB0aGlzLnNldHRpbmdzLmNsb3VkZmxhcmVBY2NvdW50LFxuICAgICAgKTtcblxuICAgICAgLy8gRW5hYmxlIENsb3VkZmxhcmUgZGVwbG95bWVudCAoaGFuZGxlcyBib3RoIGZpcnN0IHB1Ymxpc2ggYW5kIHJlLXB1Ymxpc2ggYWZ0ZXIgdW5wdWJsaXNoKVxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgY2xvdWRmbGFyZS5lbmFibGVEZXBsb3ltZW50KHRoaXMuc2l0ZS5jbG91ZGZsYXJlUHJvamVjdCk7XG4gICAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgICAgY29uc3QgbXNnID0gKGVyciBhcyBFcnJvcikubWVzc2FnZTtcbiAgICAgICAgY29uc3Qgc3RhdHVzID0gKGVyciBhcyBFcnJvciAmIHsgc3RhdHVzPzogbnVtYmVyIH0pLnN0YXR1cztcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gNDA0IHx8IG1zZy50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdwcm9qZWN0IG5vdCBmb3VuZCcpKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IGNsb3VkZmxhcmUuY3JlYXRlUHJvamVjdChcbiAgICAgICAgICAgICAgdGhpcy5zaXRlLmNsb3VkZmxhcmVQcm9qZWN0LFxuICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLmdpdGh1Yk93bmVyLFxuICAgICAgICAgICAgICByZXBvLFxuICAgICAgICAgICAgICBicmFuY2gsXG4gICAgICAgICAgICAgIHJvb3REaXJcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICAvLyBQcm9qZWN0IGNyZWF0aW9uIHN1Y2NlZWRzOyBkZXBsb3ltZW50IGlzIGF1dG9tYXRpY2FsbHkgZW5hYmxlZCBieSBkZWZhdWx0LlxuICAgICAgICAgIH0gY2F0Y2ggKGNyZWF0ZUVycjogdW5rbm93bikge1xuICAgICAgICAgICAgcmVzdWx0LmVycm9ycy5wdXNoKGBDbG91ZGZsYXJlIHJlY292ZXJ5IGZhaWxlZDogJHsoY3JlYXRlRXJyIGFzIEVycm9yKS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgcmVzdWx0LnN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzdWx0LmVycm9ycy5wdXNoKGBDbG91ZGZsYXJlOiAke21zZ31gKTtcbiAgICAgICAgICByZXN1bHQuc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFJlcGFpciB0aGUgUGFnZXMgYnVpbGQgc2V0dGluZ3MgZXZlcnkgcHVibGlzaCBzbyBhIHByb2plY3QgY3JlYXRlZCBlYXJsaWVyXG4gICAgICAvLyB3aXRoIGEgYmFkIGJ1aWxkIGNvbW1hbmQgb3Igc3RhbGUgYnJhbmNoIHNlbGYtaGVhbHMuXG4gICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCBjbG91ZGZsYXJlLmNvbmZpZ3VyZUJ1aWxkKFxuICAgICAgICAgICAgdGhpcy5zaXRlLmNsb3VkZmxhcmVQcm9qZWN0LFxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5naXRodWJPd25lcixcbiAgICAgICAgICAgIHJlcG8sXG4gICAgICAgICAgICBicmFuY2gsXG4gICAgICAgICAgICByb290RGlyLFxuICAgICAgICAgICk7XG4gICAgICAgIH0gY2F0Y2ggKGVycjogdW5rbm93bikge1xuICAgICAgICAgIHJlc3VsdC5lcnJvcnMucHVzaChgQ2xvdWRmbGFyZSBidWlsZCBjb25maWc6ICR7KGVyciBhcyBFcnJvcikubWVzc2FnZX1gKTtcbiAgICAgICAgICByZXN1bHQuc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IGNsb3VkZmxhcmUudHJpZ2dlckRlcGxveW1lbnQodGhpcy5zaXRlLmNsb3VkZmxhcmVQcm9qZWN0LCBicmFuY2gpO1xuICAgICAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgICAgICByZXN1bHQuZXJyb3JzLnB1c2goYENsb3VkZmxhcmUgYnVpbGQ6ICR7KGVyciBhcyBFcnJvcikubWVzc2FnZX0uICR7UkVDT05ORUNUX0hJTlR9YCk7XG4gICAgICAgICAgcmVzdWx0LnN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFdyaXRlIHB1Ymxpc2ggb3V0Y29tZSBiYWNrIG9udG8gdGhlIHByb2ZpbGUgc28gaXQgc3Vydml2ZXMgYSByZXN0YXJ0LlxuICAgIC8vIG1haW4udHMgd2lsbCBjYWxsIHNhdmVTZXR0aW5ncygpIGFmdGVyIHRoaXMgcmV0dXJucy5cbiAgICB0aGlzLnNpdGUubGFzdFB1Ymxpc2hGYWlsZWQgPSAhcmVzdWx0LnN1Y2Nlc3M7XG4gICAgdGhpcy5zaXRlLmxhc3RQdWJsaXNoRXJyb3IgPSByZXN1bHQuc3VjY2VzcyA/ICcnIDogKHJlc3VsdC5lcnJvcnNbMF0gPz8gJ1Vua25vd24gZXJyb3InKTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKiogcGFja2FnZS5qc29uIGZvciB0aGUgcHVibGlzaGVkIHJlcG8gc28gQ2xvdWRmbGFyZSBjYW4gYG5weCBtZGdhcmRlbiBidWlsZGAuICovXG4gIHByaXZhdGUgYnVpbGRQYWNrYWdlSnNvbigpOiBzdHJpbmcge1xuICAgIGNvbnN0IHBrZyA9IHtcbiAgICAgIG5hbWU6IHRoaXMuc2l0ZS5uYW1lIHx8ICdteS1tZGdhcmRlbicsXG4gICAgICBwcml2YXRlOiB0cnVlLFxuICAgICAgc2NyaXB0czogeyBidWlsZDogJ21kZ2FyZGVuIGJ1aWxkJyB9LFxuICAgICAgZGVwZW5kZW5jaWVzOiB7IG1kZ2FyZGVuOiBNREdBUkRFTl9WRVJTSU9OIH0sXG4gICAgfTtcbiAgICByZXR1cm4gYCR7SlNPTi5zdHJpbmdpZnkocGtnLCBudWxsLCAyKX1cXG5gO1xuICB9XG5cbiAgLyoqIG1kZ2FyZGVuLmNvbmZpZy5qc29uIGdlbmVyYXRlZCBmcm9tIHRoaXMgc2l0ZSdzIHByb2ZpbGUgKHBsdWdpbi1tYW5hZ2VkKS4gKi9cbiAgcHJpdmF0ZSBidWlsZE1kZ2FyZGVuQ29uZmlnKCk6IHN0cmluZyB7XG4gICAgY29uc3QgdmF1bHROYW1lID0gdGhpcy5hcHAudmF1bHQuZ2V0TmFtZSgpO1xuICAgIGNvbnN0IGhvc3QgPSB0aGlzLnNpdGUuc2l0ZVVybC5yZXBsYWNlKC9eaHR0cHM/OlxcL1xcLy8sICcnKTtcbiAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICBzaXRlOiB7XG4gICAgICAgIHRpdGxlOiB0aGlzLnNpdGUuc2lkZWJhclRpdGxlIHx8IHRoaXMuc2l0ZS5uYW1lIHx8IHZhdWx0TmFtZSxcbiAgICAgICAgZGVzY3JpcHRpb246IHRoaXMuc2l0ZS5zaXRlRGVzY3JpcHRpb24gfHwgYE5vdGVzIHB1Ymxpc2hlZCBmcm9tICR7dmF1bHROYW1lfWAsXG4gICAgICAgIGJhc2VVcmw6IGhvc3QgPyBgaHR0cHM6Ly8ke2hvc3R9YCA6ICcnLFxuICAgICAgICBsYW5ndWFnZTogJ2VuJyxcbiAgICAgICAgYXV0aG9yOiB0aGlzLnNpdGUuYXV0aG9yTmFtZSB8fCAnJyxcbiAgICAgIH0sXG4gICAgICB0aGVtZTogeyBkYXJrTW9kZTogJ3RvZ2dsZScgfSxcbiAgICAgIG5hdjogW1xuICAgICAgICB7IHRpdGxlOiAnSG9tZScsIHVybDogJy8nIH0sXG4gICAgICAgIHsgdGl0bGU6ICdUYWdzJywgdXJsOiAnL3RhZ3MvJyB9LFxuICAgICAgXSxcbiAgICAgIGZlYXR1cmVzOiB7XG4gICAgICAgIHNlYXJjaDogdHJ1ZSxcbiAgICAgICAgYmFja2xpbmtzOiB0cnVlLFxuICAgICAgICB0YWdzOiB0cnVlLFxuICAgICAgICBncmFwaDogdHJ1ZSxcbiAgICAgICAgbWF0aDogdHJ1ZSxcbiAgICAgICAgc3ludGF4SGlnaGxpZ2h0OiB0cnVlLFxuICAgICAgICByc3M6IHRydWUsXG4gICAgICAgIHNpdGVtYXA6IHRydWUsXG4gICAgICB9LFxuICAgICAgYnVpbGQ6IHsgY29udGVudERpcjogJ2NvbnRlbnQnLCBvdXREaXI6ICdwdWJsaWMnIH0sXG4gICAgfTtcbiAgICByZXR1cm4gYCR7SlNPTi5zdHJpbmdpZnkoY29uZmlnLCBudWxsLCAyKX1cXG5gO1xuICB9XG5cbiAgYXN5bmMgdW5wdWJsaXNoKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICh0aGlzLmhvc3RpbmdQcm92aWRlciAhPT0gJ2Nsb3VkZmxhcmUnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VucHVibGlzaCB2aWEgQVBJIGlzIG9ubHkgc3VwcG9ydGVkIGZvciBDbG91ZGZsYXJlIFBhZ2VzIHNpdGVzLicpO1xuICAgIH1cbiAgICBjb25zdCBjbG91ZGZsYXJlID0gbmV3IENsb3VkZmxhcmVBcGkoXG4gICAgICB0aGlzLnNldHRpbmdzLmNsb3VkZmxhcmVUb2tlbixcbiAgICAgIHRoaXMuc2V0dGluZ3MuY2xvdWRmbGFyZUFjY291bnQsXG4gICAgKTtcbiAgICAvLyBQYXVzZSB0aGUgZGVwbG95bWVudCBcdTIwMTQgdGFrZXMgdGhlIHNpdGUgb2ZmbGluZSB3aXRob3V0IGRlbGV0aW5nIHRoZSBwcm9qZWN0XG4gICAgLy8gb3IgYW55IGNvbnRlbnQuIFJlLXB1Ymxpc2hpbmcgc2ltcGx5IHJlLWVuYWJsZXMgaXQgdmlhIGVuYWJsZURlcGxveW1lbnQuXG4gICAgYXdhaXQgY2xvdWRmbGFyZS5kaXNhYmxlRGVwbG95bWVudCh0aGlzLnNpdGUuY2xvdWRmbGFyZVByb2plY3QpO1xuICB9XG5cbn1cbiIsICJpbXBvcnQgeyBBcHAsIFBsdWdpblNldHRpbmdUYWIsIFNldHRpbmcgfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgdHlwZSBOb3RlRmxhcmVQbHVnaW4gZnJvbSAnLi4vLi4vLi4vbWFpbic7XG5pbXBvcnQgeyBTZXR1cFN0ZXAgfSBmcm9tICcuLi8uLi9jb3JlL3R5cGVzJztcbmltcG9ydCB7IHJlbmRlcldpemFyZCB9IGZyb20gJy4vd2l6YXJkL3dpemFyZFJlbmRlcmVyJztcbmltcG9ydCB7IHJlbmRlckNvbm5lY3Rpb25zU2VjdGlvbiwgcmVuZGVyQmFja3VwU2VjdGlvbiwgcmVuZGVyU2l0ZXNTZWN0aW9uIH0gZnJvbSAnLi9tYW5hZ2UnO1xuaW1wb3J0IHsgb3BlbkNsb3VkZmxhcmVDb25uZWN0RmxvdyB9IGZyb20gJy4vbWFuYWdlL2Nvbm5lY3Rpb25zU2VjdGlvbic7XG5pbXBvcnQgeyBSZXNldE1vZGFsIH0gZnJvbSAnLi9tb2RhbHMnO1xuXG5leHBvcnQgY2xhc3MgTm90ZUZsYXJlU2V0dGluZ3NUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcbiAgcHVibGljIHBsdWdpbjogTm90ZUZsYXJlUGx1Z2luO1xuICBwdWJsaWMgd2l6YXJkU3RlcDogU2V0dXBTdGVwO1xuICBwdWJsaWMgaXNDbG91ZGZsYXJlQ29ubmVjdEZsb3dPcGVuID0gZmFsc2U7XG4gIHB1YmxpYyBoYXNJbml0aWFsaXplZFdpemFyZCA9IGZhbHNlO1xuXG4gIC8vIFBlbmRpbmcgY29uZmlnIGFjcm9zcyB3aXphcmQgc3RlcHNcbiAgcHVibGljIHBlbmRpbmdOYW1lID0gJyc7XG4gIHB1YmxpYyBwZW5kaW5nU2NvcGU6ICd2YXVsdCcgfCAnc2VsZWN0ZWQnID0gJ3ZhdWx0JztcbiAgcHVibGljIHBlbmRpbmdQYXRoczogc3RyaW5nW10gPSBbXTtcbiAgcHVibGljIHBlbmRpbmdQcm92aWRlcjogJ2dpdGh1Yi1wYWdlcycgfCAnY2xvdWRmbGFyZScgfCAnbmV0bGlmeScgfCAndmVyY2VsJyA9ICdjbG91ZGZsYXJlJztcblxuICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGx1Z2luOiBOb3RlRmxhcmVQbHVnaW4pIHtcbiAgICBzdXBlcihhcHAsIHBsdWdpbik7XG4gICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gICAgdGhpcy53aXphcmRTdGVwID0gdGhpcy5nZXRJbml0aWFsV2l6YXJkU3RlcCgpO1xuICB9XG5cbiAgcHVibGljIGdldEluaXRpYWxXaXphcmRTdGVwKCk6IFNldHVwU3RlcCB7XG4gICAgY29uc3QgcyA9IHRoaXMucGx1Z2luLnNldHRpbmdzO1xuICAgIGlmIChzLmdpdGh1YlRva2VuICYmIHMuZ2l0aHViT3duZXIpIHJldHVybiAnaG9zdGluZyc7XG4gICAgcmV0dXJuICdnaXRodWInO1xuICB9XG5cbiAgb3ZlcnJpZGUgZGlzcGxheSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcHVibGljIHJlbmRlcigpOiB2b2lkIHtcbiAgICBjb25zdCB7IGNvbnRhaW5lckVsIH0gPSB0aGlzO1xuICAgIGNvbnRhaW5lckVsLmVtcHR5KCk7XG5cbiAgICBjb25zdCBzID0gdGhpcy5wbHVnaW4uc2V0dGluZ3M7XG5cbiAgICB0cnkge1xuICAgICAgaWYgKCFzLnNldHVwQ29tcGxldGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc0luaXRpYWxpemVkV2l6YXJkKSB7XG4gICAgICAgICAgdGhpcy53aXphcmRTdGVwID0gdGhpcy5nZXRJbml0aWFsV2l6YXJkU3RlcCgpO1xuICAgICAgICAgIHRoaXMuaGFzSW5pdGlhbGl6ZWRXaXphcmQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJlbmRlcldpemFyZCh0aGlzLCBjb250YWluZXJFbCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaXNDbG91ZGZsYXJlQ29ubmVjdEZsb3dPcGVuKSB7XG4gICAgICAgIG9wZW5DbG91ZGZsYXJlQ29ubmVjdEZsb3codGhpcywgY29udGFpbmVyRWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJ5IHsgcmVuZGVyQ29ubmVjdGlvbnNTZWN0aW9uKHRoaXMsIGNvbnRhaW5lckVsKTsgfVxuICAgICAgICBjYXRjaCAoZSkgeyB0aGlzLnJlbmRlclNlY3Rpb25FcnJvcihjb250YWluZXJFbCwgJ0Nvbm5lY3Rpb25zJywgZSk7IH1cbiAgICAgICAgdHJ5IHsgcmVuZGVyQmFja3VwU2VjdGlvbih0aGlzLCBjb250YWluZXJFbCk7IH1cbiAgICAgICAgY2F0Y2ggKGUpIHsgdGhpcy5yZW5kZXJTZWN0aW9uRXJyb3IoY29udGFpbmVyRWwsICdCYWNrdXAnLCBlKTsgfVxuICAgICAgICB0cnkgeyByZW5kZXJTaXRlc1NlY3Rpb24odGhpcywgY29udGFpbmVyRWwpOyB9XG4gICAgICAgIGNhdGNoIChlKSB7IHRoaXMucmVuZGVyU2VjdGlvbkVycm9yKGNvbnRhaW5lckVsLCAnU2l0ZXMnLCBlKTsgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycjogdW5rbm93bikge1xuICAgICAgdGhpcy5yZW5kZXJTZWN0aW9uRXJyb3IoY29udGFpbmVyRWwsICdTZXR0aW5ncycsIGVycik7XG4gICAgfVxuXG4gICAgLy8gQWx3YXlzIHJlbmRlciB0aGUgcmVzZXQgZm9vdGVyLCBldmVuIGlmIGEgc2VjdGlvbiBhYm92ZSB0aHJldy5cbiAgICB0aGlzLnJlbmRlclJlc2V0Rm9vdGVyKGNvbnRhaW5lckVsKTtcbiAgfVxuXG4gIC8qKiBEaXNwbGF5IGFuIGlubGluZSBlcnJvciB3aGVuIGEgc2V0dGluZ3Mgc2VjdGlvbiBmYWlscyB0byByZW5kZXIuICovXG4gIHByaXZhdGUgcmVuZGVyU2VjdGlvbkVycm9yKGVsOiBIVE1MRWxlbWVudCwgc2VjdGlvbjogc3RyaW5nLCBlcnI6IHVua25vd24pOiB2b2lkIHtcbiAgICBjb25zdCBtc2cgPSBlcnIgaW5zdGFuY2VvZiBFcnJvciA/IGVyci5tZXNzYWdlIDogU3RyaW5nKGVycik7XG4gICAgY29uc29sZS5lcnJvcihgTm90ZUZsYXJlOiAke3NlY3Rpb259IHNlY3Rpb24gcmVuZGVyIGVycm9yOmAsIGVycik7XG4gICAgY29uc3QgcCA9IGVsLmNyZWF0ZUVsKCdwJywgeyBjbHM6ICdzZXR0aW5nLWl0ZW0tZGVzY3JpcHRpb24nIH0pO1xuICAgIHAuc2V0VGV4dChgXHUyNkEwIE5vdGVGbGFyZSAoJHtzZWN0aW9ufSk6ICR7bXNnfWApO1xuICAgIHAuc2V0Q3NzU3R5bGVzKHsgY29sb3I6ICd2YXIoLS10ZXh0LWVycm9yKScsIG1hcmdpbkJvdHRvbTogJzhweCcgfSk7XG4gIH1cblxuICBwdWJsaWMgb3BlbkNsb3VkZmxhcmVDb25uZWN0RmxvdygpOiB2b2lkIHtcbiAgICB0aGlzLmlzQ2xvdWRmbGFyZUNvbm5lY3RGbG93T3BlbiA9IHRydWU7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBjbG9zZVNldHRpbmdzKCk6IHZvaWQge1xuICAgIGNvbnN0IHNldHRpbmcgPSAodGhpcy5hcHAgYXMgdW5rbm93biBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikuc2V0dGluZyBhc1xuICAgICAgfCB7IGNsb3NlPzogKCkgPT4gdm9pZCB9XG4gICAgICB8IHVuZGVmaW5lZDtcbiAgICBzZXR0aW5nPy5jbG9zZT8uKCk7XG4gIH1cblxuICBwcml2YXRlIHJlbmRlclJlc2V0Rm9vdGVyKGVsOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGNvbnN0IGRpdmlkZXIgPSBlbC5jcmVhdGVEaXYoJ25mLXJlc2V0LWZvb3RlcicpO1xuXG4gICAgY29uc3QgZGFuZ2VySGVhZGluZyA9IG5ldyBTZXR0aW5nKGRpdmlkZXIpO1xuICAgIGRhbmdlckhlYWRpbmcuc2V0TmFtZSgnRGFuZ2VyIHpvbmUnKTtcbiAgICBkYW5nZXJIZWFkaW5nLnNldEhlYWRpbmcoKTtcblxuICAgIGNvbnN0IHJlc2V0U2V0dGluZyA9IG5ldyBTZXR0aW5nKGRpdmlkZXIpO1xuICAgIHJlc2V0U2V0dGluZy5zZXROYW1lKCdIYXJkIHJlc2V0IE5vdGVGbGFyZScpO1xuICAgIHJlc2V0U2V0dGluZy5zZXREZXNjKFxuICAgICAgJ0NsZWFycyBhbGwgTm90ZUZsYXJlIGRhdGEgXHUyMDE0IHRva2VucywgZXZlcnkgc2l0ZSwgYW5kIGFsbCBjb25maWd1cmF0aW9uLiAnICtcbiAgICAgICdZb3VyIEdpdEh1YiByZXBvcyBhbmQgQ2xvdWRmbGFyZSBwcm9qZWN0cyBhcmUgTk9UIGRlbGV0ZWQgYW5kIGNhbiBiZSByZWNvbm5lY3RlZCBhbnkgdGltZS4nLFxuICAgICk7XG4gICAgcmVzZXRTZXR0aW5nLmFkZEJ1dHRvbigoYikgPT4ge1xuICAgICAgYi5zZXRCdXR0b25UZXh0KCdIYXJkIHJlc2V0Jyk7XG4gICAgICBiLmJ1dHRvbkVsLmFkZENsYXNzKCdtb2Qtd2FybmluZycpO1xuICAgICAgYi5vbkNsaWNrKCgpID0+XG4gICAgICAgIG5ldyBSZXNldE1vZGFsKHRoaXMuYXBwLCB0aGlzLnBsdWdpbiwgKCkgPT4ge1xuICAgICAgICAgIHRoaXMud2l6YXJkU3RlcCA9ICdnaXRodWInO1xuICAgICAgICAgIHRoaXMucGVuZGluZ05hbWUgPSAnJztcbiAgICAgICAgICB0aGlzLnBlbmRpbmdTY29wZSA9ICd2YXVsdCc7XG4gICAgICAgICAgdGhpcy5wZW5kaW5nUGF0aHMgPSBbXTtcbiAgICAgICAgICB0aGlzLnBlbmRpbmdQcm92aWRlciA9ICdjbG91ZGZsYXJlJztcbiAgICAgICAgICB0aGlzLmhhc0luaXRpYWxpemVkV2l6YXJkID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfSkub3BlbigpLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFNldHRpbmcgfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgdHlwZSB7IE5vdGVGbGFyZVNldHRpbmdzVGFiIH0gZnJvbSAnLi4vc2V0dGluZ3NUYWInO1xuaW1wb3J0IHsgR2l0SHViQXBpIH0gZnJvbSAnLi4vLi4vLi4vYXBpL2dpdGh1YkFwaSc7XG5pbXBvcnQgeyBjcmVhdGVFcnJvckVsLCBzaG93RXJyb3IsIGhpZGVFcnJvciwgYnVzeSwgaWRsZSB9IGZyb20gJy4uL3NldHRpbmdzSGVscGVycyc7XG5cbmNvbnN0IEdJVEhVQl9UT0tFTl9VUkwgPSAnaHR0cHM6Ly9naXRodWIuY29tL3NldHRpbmdzL3Rva2Vucy9uZXc/c2NvcGVzPXJlcG8sd29ya2Zsb3cmZGVzY3JpcHRpb249Tm90ZUZsYXJlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclN0ZXBHaXRIdWIodGFiOiBOb3RlRmxhcmVTZXR0aW5nc1RhYiwgZWw6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgY29uc3QgaGVhZGluZyA9IG5ldyBTZXR0aW5nKGVsKTtcbiAgICBoZWFkaW5nLnNldE5hbWUoJ0Nvbm5lY3QgR2l0SHViJyk7XG4gICAgaGVhZGluZy5zZXRIZWFkaW5nKCk7XG5cbiAgICBlbC5jcmVhdGVFbCgncCcsIHtcbiAgICAgIGNsczogJ3NldHRpbmctaXRlbS1kZXNjcmlwdGlvbicsXG4gICAgICB0ZXh0OiAnR2l0SHViIHN0b3JlcyB5b3VyIHNpdGUgYW5kIHZhdWx0IGJhY2t1cC4gWW91ciB0b2tlbiBpcyBlbmNyeXB0ZWQgaW4geW91ciBPUyBrZXljaGFpbiBcdTIwMTQgbmV2ZXIgbG9nZ2VkLicsXG4gICAgfSk7XG5cbiAgICBsZXQgdG9rZW5WYWx1ZSA9IHRhYi5wbHVnaW4uc2V0dGluZ3MuZ2l0aHViVG9rZW47XG5cbiAgICBjb25zdCB0b2tlblNldHRpbmcgPSBuZXcgU2V0dGluZyhlbCkuc2V0TmFtZSgnUGVyc29uYWwgYWNjZXNzIHRva2VuJyk7XG4gICAgdG9rZW5TZXR0aW5nLmRlc2NFbC5hcHBlbmRUZXh0KCdDcmVhdGUgb25lIHdpdGggJyk7XG4gICAgdG9rZW5TZXR0aW5nLmRlc2NFbC5jcmVhdGVFbCgnc3Ryb25nJywgeyB0ZXh0OiAncmVwbycgfSk7XG4gICAgdG9rZW5TZXR0aW5nLmRlc2NFbC5hcHBlbmRUZXh0KCcgKyAnKTtcbiAgICB0b2tlblNldHRpbmcuZGVzY0VsLmNyZWF0ZUVsKCdzdHJvbmcnLCB7IHRleHQ6ICd3b3JrZmxvdycgfSk7XG4gICAgdG9rZW5TZXR0aW5nLmRlc2NFbC5hcHBlbmRUZXh0KCcgc2NvcGVzLiAnKTtcbiAgICB0b2tlblNldHRpbmcuZGVzY0VsLmNyZWF0ZUVsKCdhJywge1xuICAgICAgdGV4dDogJ0NyZWF0ZSB0b2tlbiBcdTIxOTcnLFxuICAgICAgaHJlZjogR0lUSFVCX1RPS0VOX1VSTCxcbiAgICAgIGF0dHI6IHsgdGFyZ2V0OiAnX2JsYW5rJywgcmVsOiAnbm9vcGVuZXInIH0sXG4gICAgfSk7XG4gICAgdG9rZW5TZXR0aW5nLmFkZFRleHQoKHRleHQpID0+IHtcbiAgICAgIHRleHQuc2V0UGxhY2Vob2xkZXIoJ2docF9cdTIwMjYnKTtcbiAgICAgIHRleHQuaW5wdXRFbC50eXBlID0gJ3Bhc3N3b3JkJztcbiAgICAgIHRleHQuc2V0VmFsdWUodG9rZW5WYWx1ZSk7XG4gICAgICB0ZXh0Lm9uQ2hhbmdlKCh2KSA9PiB7XG4gICAgICAgIHRva2VuVmFsdWUgPSB2LnRyaW0oKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY29uc3QgZXJyb3JFbCA9IGNyZWF0ZUVycm9yRWwoZWwpO1xuXG4gICAgbmV3IFNldHRpbmcoZWwpLmFkZEJ1dHRvbigoYnRuKSA9PiB7XG4gICAgICBidG4uc2V0QnV0dG9uVGV4dCgnVmVyaWZ5ICYgY29udGludWUnKS5zZXRDdGEoKTtcbiAgICAgIGJ0bi5vbkNsaWNrKCgpID0+IHtcbiAgICAgICAgdm9pZCAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGlmICghdG9rZW5WYWx1ZSkgcmV0dXJuIHNob3dFcnJvcihlcnJvckVsLCAnUGxlYXNlIGVudGVyIHlvdXIgR2l0SHViIHRva2VuLicpO1xuICAgICAgICAgIGhpZGVFcnJvcihlcnJvckVsKTtcbiAgICAgICAgICBidXN5KGJ0biwgJ1ZlcmlmeWluZ1x1MjAyNicpO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB1c2VybmFtZSA9IGF3YWl0IG5ldyBHaXRIdWJBcGkodG9rZW5WYWx1ZSwgJycsICcnKS5nZXRBdXRoZW50aWNhdGVkVXNlcigpO1xuICAgICAgICAgICAgdGFiLnBsdWdpbi5zZXR0aW5ncy5naXRodWJUb2tlbiA9IHRva2VuVmFsdWU7XG4gICAgICAgICAgICB0YWIucGx1Z2luLnNldHRpbmdzLmdpdGh1Yk93bmVyID0gdXNlcm5hbWU7XG4gICAgICAgICAgICBhd2FpdCB0YWIucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgdGFiLndpemFyZFN0ZXAgPSAnaG9zdGluZyc7XG4gICAgICAgICAgICB0YWIucmVuZGVyKCk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyOiB1bmtub3duKSB7XG4gICAgICAgICAgICBjb25zdCBtc2cgPSAoZXJyIGFzIEVycm9yKS5tZXNzYWdlO1xuICAgICAgICAgICAgc2hvd0Vycm9yKFxuICAgICAgICAgICAgICBlcnJvckVsLFxuICAgICAgICAgICAgICAvaW52YWxpZC9pLnRlc3QobXNnKVxuICAgICAgICAgICAgICAgID8gJ1Rva2VuIGludmFsaWQgb3IgbWlzc2luZyB0aGUgcmVwbyBzY29wZS4gQ2hlY2sgaXQgYW5kIHRyeSBhZ2Fpbi4nXG4gICAgICAgICAgICAgICAgOiBtc2csXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWRsZShidG4sICdWZXJpZnkgJiBjb250aW51ZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xufVxuIiwgIi8qKlxuICogU2hhcmVkIFVJIGhlbHBlcnMgZm9yIHRoZSBzZXR0aW5ncyB3aXphcmQgYW5kIG1hbmFnZSBwYW5lbC5cbiAqIFB1cmUgZnVuY3Rpb25zIHdpdGggbm8gcGx1Z2luIGRlcGVuZGVuY3kgXHUyMDE0IHBhc3NlZCBhcyBjYWxsYmFja3NcbiAqIHNvIGVhY2ggc3RlcCBmaWxlIGNhbiBjYWxsIGJ1c3kvaWRsZS9lcnJvciB3aXRob3V0IGNvdXBsaW5nIHRvIHRoZSB0YWIgY2xhc3MuXG4gKi9cbmltcG9ydCB7IEJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJ29ic2lkaWFuJztcblxuLyoqIEFwcGVuZCBhIGhpZGRlbiBlcnJvciBwYXJhZ3JhcGggdG8gYGNvbnRhaW5lcmAgYW5kIHJldHVybiBpdC4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFcnJvckVsKGNvbnRhaW5lcjogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7XG4gIGNvbnN0IGVsID0gY29udGFpbmVyLmNyZWF0ZUVsKCdwJywgeyBjbHM6ICdzZXR0aW5nLWl0ZW0tZGVzY3JpcHRpb24nIH0pO1xuICBlbC5zZXRDc3NTdHlsZXMoeyBjb2xvcjogJ3ZhcigtLXRleHQtZXJyb3IpJyB9KTtcbiAgZWwuaGlkZSgpO1xuICByZXR1cm4gZWw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93RXJyb3IoZWw6IEhUTUxFbGVtZW50LCBtc2c6IHN0cmluZyk6IHZvaWQge1xuICBlbC5zZXRUZXh0KG1zZyk7XG4gIGVsLnNob3coKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhpZGVFcnJvcihlbDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgZWwuaGlkZSgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVzeShidG46IEJ1dHRvbkNvbXBvbmVudCwgbGFiZWw6IHN0cmluZyk6IHZvaWQge1xuICBidG4uc2V0RGlzYWJsZWQodHJ1ZSkuc2V0QnV0dG9uVGV4dChsYWJlbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpZGxlKGJ0bjogQnV0dG9uQ29tcG9uZW50LCBsYWJlbDogc3RyaW5nKTogdm9pZCB7XG4gIGJ0bi5zZXREaXNhYmxlZChmYWxzZSkuc2V0QnV0dG9uVGV4dChsYWJlbCk7XG59XG4iLCAiaW1wb3J0IHsgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB0eXBlIHsgTm90ZUZsYXJlU2V0dGluZ3NUYWIgfSBmcm9tICcuLi9zZXR0aW5nc1RhYic7XG5pbXBvcnQgeyBDbG91ZGZsYXJlQXBpIH0gZnJvbSAnLi4vLi4vLi4vYXBpL2Nsb3VkZmxhcmVBcGknO1xuaW1wb3J0IHsgYnVpbGRDbG91ZGZsYXJlVG9rZW5VcmwsIHNsdWdpZnksIHByb3Zpc2lvblNpdGUgfSBmcm9tICcuLi9tb2RhbHMvaGVscGVycyc7XG5pbXBvcnQgeyBjcmVhdGVFcnJvckVsLCBzaG93RXJyb3IsIGhpZGVFcnJvciwgYnVzeSwgaWRsZSB9IGZyb20gJy4uL3NldHRpbmdzSGVscGVycyc7XG5pbXBvcnQgeyBQYXRoU3VnZ2VzdE1vZGFsIH0gZnJvbSAnLi4vbW9kYWxzL3BhdGhTdWdnZXN0TW9kYWwnO1xuXG5jb25zdCBDTE9VREZMQVJFX0FQUF9VUkwgPSAnaHR0cHM6Ly9naXRodWIuY29tL2FwcHMvY2xvdWRmbGFyZS13b3JrZXJzLWFuZC1wYWdlcy9pbnN0YWxsYXRpb25zL25ldyc7XG5jb25zdCBDTE9VREZMQVJFX1RPS0VOX1VSTCA9IGJ1aWxkQ2xvdWRmbGFyZVRva2VuVXJsKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJTdGVwSG9zdGluZyh0YWI6IE5vdGVGbGFyZVNldHRpbmdzVGFiLCBlbDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBoZWFkaW5nID0gbmV3IFNldHRpbmcoZWwpO1xuICAgIGhlYWRpbmcuc2V0TmFtZSgnQ2hvb3NlIGhvc3RpbmcgJiBjcmVhdGUgeW91ciBzaXRlJyk7XG4gICAgaGVhZGluZy5zZXRIZWFkaW5nKCk7XG5cbiAgICBlbC5jcmVhdGVFbCgncCcsIHtcbiAgICAgIGNsczogJ3NldHRpbmctaXRlbS1kZXNjcmlwdGlvbicsXG4gICAgICB0ZXh0OiAnUGljayB3aGVyZSBOb3RlRmxhcmUgc2hvdWxkIGhvc3QgeW91ciBzaXRlLiBHaXRIdWIgUGFnZXMgaXMgZnJlZSBhbmQgd29ya3Mgb3V0IG9mIHRoZSBib3guIENsb3VkZmxhcmUgYWRkcyBhIGdsb2JhbCBDRE4gYW5kIGluc3RhbnQgZGVwbG95IGNvbnRyb2xzLicsXG4gICAgfSk7XG5cbiAgICAvLyBTaXRlIG5hbWVcbiAgICBsZXQgc2l0ZU5hbWUgPSB0YWIucGVuZGluZ05hbWUgfHwgJ215LW5vdGVzJztcbiAgICBuZXcgU2V0dGluZyhlbClcbiAgICAgIC5zZXROYW1lKCdTaXRlIG5hbWUnKVxuICAgICAgLnNldERlc2MoJ1VzZWQgZm9yIHlvdXIgcmVwb3NpdG9yeSBhbmQgc2l0ZSBhZGRyZXNzLiBMb3dlcmNhc2UgbGV0dGVycywgbnVtYmVycywgYW5kIGRhc2hlcy4nKVxuICAgICAgLmFkZFRleHQoKHRleHQpID0+IHtcbiAgICAgICAgdGV4dC5zZXRQbGFjZWhvbGRlcignbXktbm90ZXMnKTtcbiAgICAgICAgdGV4dC5zZXRWYWx1ZShzaXRlTmFtZSk7XG4gICAgICAgIHRleHQub25DaGFuZ2UoKHYpID0+IHtcbiAgICAgICAgICBzaXRlTmFtZSA9IHY7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAvLyBNYXN0ZXIgcmVwbyBuYW1lXG4gICAgbGV0IG1hc3RlclJlcG8gPSB0YWIucGx1Z2luLnNldHRpbmdzLm1hc3RlclJlcG9zaXRvcnkgfHwgJ25vdGVmbGFyZS1zaXRlcyc7XG4gICAgbmV3IFNldHRpbmcoZWwpXG4gICAgICAuc2V0TmFtZSgnR2l0SHViIHJlcG9zaXRvcnkgbmFtZScpXG4gICAgICAuc2V0RGVzYygnQWxsIHlvdXIgTm90ZUZsYXJlIHNpdGVzIHdpbGwgbGl2ZSBpbnNpZGUgdGhpcyBzaW5nbGUgcmVwb3NpdG9yeS4nKVxuICAgICAgLmFkZFRleHQoKHRleHQpID0+IHtcbiAgICAgICAgdGV4dC5zZXRQbGFjZWhvbGRlcignbm90ZWZsYXJlLXNpdGVzJyk7XG4gICAgICAgIHRleHQuc2V0VmFsdWUobWFzdGVyUmVwbyk7XG4gICAgICAgIHRleHQub25DaGFuZ2UoKHYpID0+IHtcbiAgICAgICAgICBtYXN0ZXJSZXBvID0gdi50cmltKCk7XG4gICAgICAgICAgLy8gS2VlcCB0aGUgQ0YgYXV0aG9yaXplIGhpbnQgaW4gc3luYyB3aXRoIHdoYXQgdGhlIHVzZXIgdHlwZXNcbiAgICAgICAgICB1cGRhdGVDZkFwcEhpbnQoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIC8vIFx1MjUwMFx1MjUwMCBIb3N0aW5nIHByb3ZpZGVyIHNlbGVjdG9yIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuICAgIC8vIFRoaXMgd3JpdGVzIHRhYi5wZW5kaW5nUHJvdmlkZXIgc28gdGhlIHJlc3Qgb2YgdGhlIHdpemFyZCBrbm93cyB0aGUgY2hvaWNlLlxuICAgIGxldCBzZWxlY3RlZFByb3ZpZGVyID0gdGFiLnBlbmRpbmdQcm92aWRlcjtcblxuICAgIG5ldyBTZXR0aW5nKGVsKVxuICAgICAgLnNldE5hbWUoJ0hvc3RpbmcgcHJvdmlkZXInKVxuICAgICAgLnNldERlc2MoJ0dpdEh1YiBQYWdlcyBpcyBmcmVlIHdpdGggbm8gZXh0cmEgc2V0dXAuIENsb3VkZmxhcmUgUGFnZXMgYWRkcyBhIENETiBhbmQgcmVhbC10aW1lIGRlcGxveSBjb250cm9scyAocmVxdWlyZXMgYSBmcmVlIENsb3VkZmxhcmUgYWNjb3VudCkuJylcbiAgICAgIC5hZGREcm9wZG93bigoZCkgPT4ge1xuICAgICAgICBkLmFkZE9wdGlvbignZ2l0aHViLXBhZ2VzJywgJ0dpdEh1YiBQYWdlcyAoZnJlZSwgbm8gc2V0dXAgcmVxdWlyZWQpJyk7XG4gICAgICAgIGQuYWRkT3B0aW9uKCdjbG91ZGZsYXJlJywgJ0Nsb3VkZmxhcmUgUGFnZXMgKENETiwgZGVwbG95IGNvbnRyb2xzKScpO1xuICAgICAgICBkLnNldFZhbHVlKHNlbGVjdGVkUHJvdmlkZXIpO1xuICAgICAgICBkLm9uQ2hhbmdlKCh2KSA9PiB7XG4gICAgICAgICAgc2VsZWN0ZWRQcm92aWRlciA9IHYgYXMgJ2dpdGh1Yi1wYWdlcycgfCAnY2xvdWRmbGFyZSc7XG4gICAgICAgICAgdGFiLnBlbmRpbmdQcm92aWRlciA9IHNlbGVjdGVkUHJvdmlkZXI7XG4gICAgICAgICAgLy8gU2hvdy9oaWRlIENGIGNyZWRlbnRpYWxzIHNlY3Rpb24gYmFzZWQgb24gdGhlIGNob3NlbiBwcm92aWRlclxuICAgICAgICAgIGNmU2VjdGlvbi5zZXRDc3NTdHlsZXMoeyBkaXNwbGF5OiBzZWxlY3RlZFByb3ZpZGVyID09PSAnY2xvdWRmbGFyZScgPyAnYmxvY2snIDogJ25vbmUnIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgLy8gUHVibGlzaCBzY29wZVxuICAgIGxldCBzY29wZSA9IHRhYi5wZW5kaW5nU2NvcGU7XG4gICAgbGV0IHBhdGhzID0gWy4uLnRhYi5wZW5kaW5nUGF0aHNdO1xuXG4gICAgbmV3IFNldHRpbmcoZWwpXG4gICAgICAuc2V0TmFtZSgnUHVibGlzaCBzY29wZScpXG4gICAgICAuc2V0RGVzYygnUHVibGlzaCB0aGUgZW50aXJlIHZhdWx0IG9yIG9ubHkgc2VsZWN0ZWQgZmlsZXMgYW5kIGZvbGRlcnMuJylcbiAgICAgIC5hZGREcm9wZG93bigoZCkgPT4ge1xuICAgICAgICBkLmFkZE9wdGlvbigndmF1bHQnLCAnRnVsbCB2YXVsdCcpO1xuICAgICAgICBkLmFkZE9wdGlvbignc2VsZWN0ZWQnLCAnU2VsZWN0ZWQgZmlsZXMgLyBmb2xkZXJzJyk7XG4gICAgICAgIGQuc2V0VmFsdWUoc2NvcGUpO1xuICAgICAgICBkLm9uQ2hhbmdlKCh2KSA9PiB7XG4gICAgICAgICAgc2NvcGUgPSB2IGFzICd2YXVsdCcgfCAnc2VsZWN0ZWQnO1xuICAgICAgICAgIHJlbmRlclBhdGhzKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICBjb25zdCBwYXRoc0NvbnRhaW5lciA9IGVsLmNyZWF0ZURpdignbm90ZWZsYXJlLXBhdGhzLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IHJlbmRlclBhdGhzID0gKCkgPT4ge1xuICAgICAgcGF0aHNDb250YWluZXIuZW1wdHkoKTtcbiAgICAgIGlmIChzY29wZSA9PT0gJ3ZhdWx0Jykge1xuICAgICAgICBwYXRoc0NvbnRhaW5lci5zZXRDc3NTdHlsZXMoeyBkaXNwbGF5OiAnbm9uZScgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHBhdGhzQ29udGFpbmVyLnNldENzc1N0eWxlcyh7IGRpc3BsYXk6ICdibG9jaycgfSk7XG4gICAgICBpZiAocGF0aHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHBhdGhzQ29udGFpbmVyLmNyZWF0ZUVsKCdwJywgeyB0ZXh0OiAnTm8gaXRlbXMgc2VsZWN0ZWQuJywgY2xzOiAnbm90ZWZsYXJlLW11dGVkJyB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGxpc3QgPSBwYXRoc0NvbnRhaW5lci5jcmVhdGVFbCgndWwnLCB7IGNsczogJ25vdGVmbGFyZS1wYXRoLWxpc3QnIH0pO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhdGhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgbGkgPSBsaXN0LmNyZWF0ZUVsKCdsaScpO1xuICAgICAgICAgIGxpLnNldENzc1N0eWxlcyh7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpbkJvdHRvbTogJzRweCcgfSk7XG4gICAgICAgICAgbGkuY3JlYXRlU3Bhbih7IHRleHQ6IHBhdGhzW2ldIH0pO1xuICAgICAgICAgIGNvbnN0IHJiID0gbGkuY3JlYXRlRWwoJ2J1dHRvbicsIHsgdGV4dDogJ1x1MjcxNScgfSk7XG4gICAgICAgICAgcmIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7IHBhdGhzLnNwbGljZShpLCAxKTsgcmVuZGVyUGF0aHMoKTsgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IGFkZFJvdyA9IHBhdGhzQ29udGFpbmVyLmNyZWF0ZURpdigpO1xuICAgICAgYWRkUm93LnNldENzc1N0eWxlcyh7IG1hcmdpblRvcDogJzhweCcgfSk7XG4gICAgICBjb25zdCBhZGRCdG4gPSBhZGRSb3cuY3JlYXRlRWwoJ2J1dHRvbicsIHsgdGV4dDogJ0Jyb3dzZSB2YXVsdFx1MjAyNicgfSk7XG4gICAgICBhZGRCdG4uc2V0Q3NzU3R5bGVzKHsgd2lkdGg6ICcxMDAlJyB9KTtcbiAgICAgIGFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgbmV3IFBhdGhTdWdnZXN0TW9kYWwodGFiLmFwcCwgKHApID0+IHtcbiAgICAgICAgICBpZiAoIXBhdGhzLmluY2x1ZGVzKHApKSB7IHBhdGhzLnB1c2gocCk7IHJlbmRlclBhdGhzKCk7IH1cbiAgICAgICAgfSkub3BlbigpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICByZW5kZXJQYXRocygpO1xuXG4gICAgLy8gXHUyNTAwXHUyNTAwIENsb3VkZmxhcmUgY3JlZGVudGlhbHMgc2VjdGlvbiBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcbiAgICAvLyBPbmx5IHZpc2libGUgd2hlbiB0aGUgdXNlciBzZWxlY3RzIENsb3VkZmxhcmUgYXMgdGhlIGhvc3RpbmcgcHJvdmlkZXIuXG4gICAgY29uc3QgY2ZTZWN0aW9uID0gZWwuY3JlYXRlRGl2KCduZi1jZi1zZWN0aW9uJyk7XG4gICAgY2ZTZWN0aW9uLnNldENzc1N0eWxlcyh7IGRpc3BsYXk6IHNlbGVjdGVkUHJvdmlkZXIgPT09ICdjbG91ZGZsYXJlJyA/ICdibG9jaycgOiAnbm9uZScgfSk7XG5cbiAgICBsZXQgY2ZUb2tlbiA9IHRhYi5wbHVnaW4uc2V0dGluZ3MuY2xvdWRmbGFyZVRva2VuO1xuICAgIGxldCBjZkFjY291bnQgPSB0YWIucGx1Z2luLnNldHRpbmdzLmNsb3VkZmxhcmVBY2NvdW50O1xuXG4gICAgLy8gS2VlcCBhIHJlZmVyZW5jZSB0byB0aGUgQ0YgQXBwIGF1dGhvcml6ZSBoaW50IGVsZW1lbnQgc28gd2UgY2FuIHVwZGF0ZVxuICAgIC8vIGl0IGluIHJlYWwtdGltZSB3aGVuIHRoZSB1c2VyIGNoYW5nZXMgdGhlIHJlcG9zaXRvcnkgbmFtZSBhYm92ZS5cbiAgICBsZXQgY2ZBcHBIaW50RWw6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gICAgY29uc3QgdXBkYXRlQ2ZBcHBIaW50ID0gKCkgPT4ge1xuICAgICAgaWYgKGNmQXBwSGludEVsKSB7XG4gICAgICAgIGNmQXBwSGludEVsLnNldFRleHQoXG4gICAgICAgICAgYEdyYW50IHRoZSBcIkNsb3VkZmxhcmUgV29ya2VycyBhbmQgUGFnZXNcIiBhcHAgYWNjZXNzIHRvOiAke3RhYi5wbHVnaW4uc2V0dGluZ3MuZ2l0aHViT3duZXJ9LyR7bWFzdGVyUmVwbyB8fCAnbm90ZWZsYXJlLXNpdGVzJ31gLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBuZXcgU2V0dGluZyhjZlNlY3Rpb24pXG4gICAgICAuc2V0TmFtZSgnMS4gQ3JlYXRlIGEgQ2xvdWRmbGFyZSBBUEkgdG9rZW4nKVxuICAgICAgLnNldERlc2MoJ0NyZWF0ZXMgYSB0b2tlbiB3aXRoIFBhZ2VzLCBXb3JrZXJzLCBhbmQgQWNjb3VudCBwZXJtaXNzaW9ucyBwcmUtZmlsbGVkLicpXG4gICAgICAuYWRkQnV0dG9uKChiKSA9PiB7XG4gICAgICAgIGIuc2V0QnV0dG9uVGV4dCgnQ3JlYXRlIFRva2VuIFx1MjE5NycpO1xuICAgICAgICBiLm9uQ2xpY2soKCkgPT4geyB3aW5kb3cub3BlbihDTE9VREZMQVJFX1RPS0VOX1VSTCwgJ19ibGFuaycpOyB9KTtcbiAgICAgIH0pO1xuXG4gICAgY29uc3QgY2ZBcHBTZXR0aW5nID0gbmV3IFNldHRpbmcoY2ZTZWN0aW9uKVxuICAgICAgLnNldE5hbWUoJzIuIEF1dGhvcml6ZSBDbG91ZGZsYXJlIG9uIEdpdEh1YicpXG4gICAgICAuc2V0RGVzYyhgR3JhbnQgdGhlIFwiQ2xvdWRmbGFyZSBXb3JrZXJzIGFuZCBQYWdlc1wiIGFwcCBhY2Nlc3MgdG86ICR7dGFiLnBsdWdpbi5zZXR0aW5ncy5naXRodWJPd25lcn0vJHttYXN0ZXJSZXBvIHx8ICdub3RlZmxhcmUtc2l0ZXMnfWApXG4gICAgICAuYWRkQnV0dG9uKChiKSA9PiB7XG4gICAgICAgIGIuc2V0QnV0dG9uVGV4dCgnQXV0aG9yaXplIFx1MjE5NycpO1xuICAgICAgICBiLm9uQ2xpY2soKCkgPT4geyB3aW5kb3cub3BlbihDTE9VREZMQVJFX0FQUF9VUkwsICdfYmxhbmsnKTsgfSk7XG4gICAgICB9KTtcbiAgICAvLyBTdG9yZSBkZXNjcmlwdGlvbiBlbGVtZW50IHJlZiBmb3IgbGl2ZSB1cGRhdGVzIHdoZW4gbWFzdGVyUmVwbyBmaWVsZCBjaGFuZ2VzXG4gICAgY2ZBcHBIaW50RWwgPSBjZkFwcFNldHRpbmcuZGVzY0VsO1xuXG4gICAgbmV3IFNldHRpbmcoY2ZTZWN0aW9uKVxuICAgICAgLnNldE5hbWUoJ0Nsb3VkZmxhcmUgQVBJIHRva2VuJylcbiAgICAgIC5zZXREZXNjKCdTdG9yZWQgZW5jcnlwdGVkIGluIHlvdXIgT1Mga2V5Y2hhaW4uJylcbiAgICAgIC5hZGRUZXh0KCh0KSA9PiB7XG4gICAgICAgIHQuc2V0UGxhY2Vob2xkZXIoJ1Bhc3RlIEFQSSB0b2tlblx1MjAyNicpO1xuICAgICAgICB0LmlucHV0RWwudHlwZSA9ICdwYXNzd29yZCc7XG4gICAgICAgIHQuc2V0VmFsdWUoY2ZUb2tlbik7XG4gICAgICAgIHQub25DaGFuZ2UoKHYpID0+IHsgY2ZUb2tlbiA9IHYudHJpbSgpOyB9KTtcbiAgICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY2ZTZWN0aW9uKVxuICAgICAgLnNldE5hbWUoJ0Nsb3VkZmxhcmUgYWNjb3VudCBJRCcpXG4gICAgICAuc2V0RGVzYygnT3B0aW9uYWwgXHUyMDE0IGRldGVjdGVkIGF1dG9tYXRpY2FsbHkgZnJvbSB5b3VyIHRva2VuLicpXG4gICAgICAuYWRkVGV4dCgodCkgPT4ge1xuICAgICAgICB0LnNldFBsYWNlaG9sZGVyKCdBdXRvLWRldGVjdGVkJyk7XG4gICAgICAgIHQuc2V0VmFsdWUoY2ZBY2NvdW50KTtcbiAgICAgICAgdC5vbkNoYW5nZSgodikgPT4geyBjZkFjY291bnQgPSB2LnRyaW0oKTsgfSk7XG4gICAgICB9KTtcblxuICAgIGNvbnN0IGVycm9yRWwgPSBjcmVhdGVFcnJvckVsKGVsKTtcblxuICAgIG5ldyBTZXR0aW5nKGVsKVxuICAgICAgLmFkZEJ1dHRvbigoYmFjaykgPT4ge1xuICAgICAgICBiYWNrLnNldEJ1dHRvblRleHQoJ0JhY2snKTtcbiAgICAgICAgYmFjay5vbkNsaWNrKCgpID0+IHsgdGFiLndpemFyZFN0ZXAgPSAnZ2l0aHViJzsgdGFiLnJlbmRlcigpOyB9KTtcbiAgICAgIH0pXG4gICAgICAuYWRkQnV0dG9uKChidG4pID0+IHtcbiAgICAgICAgYnRuLnNldEJ1dHRvblRleHQoJ0NvbnRpbnVlJykuc2V0Q3RhKCk7XG4gICAgICAgIGJ0bi5vbkNsaWNrKCgpID0+IHtcbiAgICAgICAgICB2b2lkIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuYW1lU2x1ZyA9IHNsdWdpZnkoc2l0ZU5hbWUpO1xuICAgICAgICAgICAgaWYgKCFuYW1lU2x1ZykgcmV0dXJuIHNob3dFcnJvcihlcnJvckVsLCAnUGxlYXNlIGVudGVyIGEgc2l0ZSBuYW1lLicpO1xuICAgICAgICAgICAgaWYgKCFtYXN0ZXJSZXBvLnRyaW0oKSkgcmV0dXJuIHNob3dFcnJvcihlcnJvckVsLCAnUGxlYXNlIGVudGVyIGEgcmVwb3NpdG9yeSBuYW1lLicpO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkUHJvdmlkZXIgPT09ICdjbG91ZGZsYXJlJyAmJiAhY2ZUb2tlbikge1xuICAgICAgICAgICAgICByZXR1cm4gc2hvd0Vycm9yKGVycm9yRWwsICdQbGVhc2UgcGFzdGUgeW91ciBDbG91ZGZsYXJlIEFQSSB0b2tlbi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGhpZGVFcnJvcihlcnJvckVsKTtcbiAgICAgICAgICAgIGJ1c3koYnRuLCAnU2V0dGluZyB1cFx1MjAyNicpO1xuXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAvLyBTYXZlIG1hc3RlciByZXBvIG5hbWUgYmVmb3JlIHByb3Zpc2lvbmluZ1xuICAgICAgICAgICAgICB0YWIucGx1Z2luLnNldHRpbmdzLm1hc3RlclJlcG9zaXRvcnkgPSBtYXN0ZXJSZXBvLnRyaW0oKTtcblxuICAgICAgICAgICAgICAvLyBSZXNvbHZlIENsb3VkZmxhcmUgYWNjb3VudCBpZiBDbG91ZGZsYXJlIHdhcyBjaG9zZW5cbiAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkUHJvdmlkZXIgPT09ICdjbG91ZGZsYXJlJykge1xuICAgICAgICAgICAgICAgIGxldCBhY2NvdW50SWQgPSBjZkFjY291bnQ7XG4gICAgICAgICAgICAgICAgaWYgKCFhY2NvdW50SWQpIHtcbiAgICAgICAgICAgICAgICAgIGJ1c3koYnRuLCAnRGV0ZWN0aW5nIENsb3VkZmxhcmUgYWNjb3VudFx1MjAyNicpO1xuICAgICAgICAgICAgICAgICAgYWNjb3VudElkID0gYXdhaXQgbmV3IENsb3VkZmxhcmVBcGkoY2ZUb2tlbiwgJycpLmdldEFjY291bnRJZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0YWIucGx1Z2luLnNldHRpbmdzLmNsb3VkZmxhcmVUb2tlbiA9IGNmVG9rZW47XG4gICAgICAgICAgICAgICAgdGFiLnBsdWdpbi5zZXR0aW5ncy5jbG91ZGZsYXJlQWNjb3VudCA9IGFjY291bnRJZDtcbiAgICAgICAgICAgICAgICBhd2FpdCB0YWIucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgYnVzeShidG4sICdDcmVhdGluZyB5b3VyIHNpdGVcdTIwMjYnKTtcbiAgICAgICAgICAgICAgY29uc3Qgc2l0ZSA9IGF3YWl0IHByb3Zpc2lvblNpdGUoXG4gICAgICAgICAgICAgICAgdGFiLnBsdWdpbixcbiAgICAgICAgICAgICAgICBzaXRlTmFtZSxcbiAgICAgICAgICAgICAgICB7IHB1Ymxpc2hTY29wZTogc2NvcGUsIHB1Ymxpc2hQYXRoczogcGF0aHMgfSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFByb3ZpZGVyLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB0YWIucGx1Z2luLnNldHRpbmdzLnNpdGVzLnB1c2goc2l0ZSk7XG4gICAgICAgICAgICAgIHRhYi5wbHVnaW4uc2V0dGluZ3MuYWN0aXZlU2l0ZUlkID0gc2l0ZS5pZDtcbiAgICAgICAgICAgICAgdGFiLnBsdWdpbi5zZXR0aW5ncy5lbmFibGVQdWJsaXNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgYXdhaXQgdGFiLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblxuICAgICAgICAgICAgICB0YWIucGVuZGluZ05hbWUgPSBzaXRlTmFtZTtcbiAgICAgICAgICAgICAgdGFiLnBlbmRpbmdTY29wZSA9IHNjb3BlO1xuICAgICAgICAgICAgICB0YWIucGVuZGluZ1BhdGhzID0gcGF0aHM7XG4gICAgICAgICAgICAgIHRhYi5wZW5kaW5nUHJvdmlkZXIgPSBzZWxlY3RlZFByb3ZpZGVyO1xuICAgICAgICAgICAgICB0YWIud2l6YXJkU3RlcCA9ICdiYWNrdXAnO1xuICAgICAgICAgICAgICB0YWIucmVuZGVyKCk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgICAgICAgICAgc2hvd0Vycm9yKGVycm9yRWwsIChlcnIgYXMgRXJyb3IpLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICBpZGxlKGJ0biwgJ0NvbnRpbnVlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbn1cbiIsICJcbmltcG9ydCB7IEdpdEh1YkFwaSB9IGZyb20gJy4uLy4uLy4uL2FwaS9naXRodWJBcGknO1xuaW1wb3J0IHsgQ2xvdWRmbGFyZUFwaSB9IGZyb20gJy4uLy4uLy4uL2FwaS9jbG91ZGZsYXJlQXBpJztcbmltcG9ydCB7IGNyZWF0ZVNpdGVQcm9maWxlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9zZXR0aW5ncyc7XG5pbXBvcnQgeyBTaXRlUHJvZmlsZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHR5cGUgTm90ZUZsYXJlUGx1Z2luIGZyb20gJy4uLy4uLy4uLy4uL21haW4nO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZENsb3VkZmxhcmVUb2tlblVybCgpOiBzdHJpbmcge1xuICBjb25zdCBwZXJtcyA9IGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShbXG4gICAgeyBrZXk6ICdwYWdlJywgdHlwZTogJ2VkaXQnIH0sXG4gICAgeyBrZXk6ICd3b3JrZXJzX3NjcmlwdHMnLCB0eXBlOiAnZWRpdCcgfSxcbiAgICB7IGtleTogJ2FjY291bnRfc2V0dGluZ3MnLCB0eXBlOiAncmVhZCcgfSxcbiAgXSkpO1xuICByZXR1cm4gYGh0dHBzOi8vZGFzaC5jbG91ZGZsYXJlLmNvbS9wcm9maWxlL2FwaS10b2tlbnM/cGVybWlzc2lvbkdyb3VwS2V5cz0ke3Blcm1zfSZhY2NvdW50SWQ9KiZ6b25lSWQ9YWxsJm5hbWU9Tm90ZUZsYXJlYDtcbn1cblxuLyoqIE5vcm1hbGlzZSBhIHNpdGUgbmFtZSBpbnRvIGEgdmFsaWQgR2l0SHViIHJlcG8gLyBQYWdlcyBwcm9qZWN0IHNsdWcuICovXG5leHBvcnQgZnVuY3Rpb24gc2x1Z2lmeSh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHZhbHVlXG4gICAgLnRyaW0oKVxuICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgLnJlcGxhY2UoL1teYS16MC05LV0rL2csICctJylcbiAgICAucmVwbGFjZSgvXi0rfC0rJC9nLCAnJylcbiAgICAuc2xpY2UoMCwgNjApO1xufVxuXG4vKiogVHVybnMgYSByYXcgQ2xvdWRmbGFyZSBlcnJvciBpbnRvIGFuIGFjdGlvbmFibGUgc2V0dXAgbWVzc2FnZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbG91ZGZsYXJlU2V0dXBIaW50KHJhd01lc3NhZ2U6IHN0cmluZywgcmVwb1NsdWc6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IGxvd2VyID0gcmF3TWVzc2FnZS50b0xvd2VyQ2FzZSgpO1xuICBpZiAobG93ZXIuaW5jbHVkZXMoJ3JlamVjdGVkIHRoaXMgdG9rZW4nKSB8fCBsb3dlci5pbmNsdWRlcygncGVybWlzc2lvbicpIHx8IGxvd2VyLmluY2x1ZGVzKCdhdXRoZW50aWNhdGlvbicpKSB7XG4gICAgcmV0dXJuICdDbG91ZGZsYXJlIHJlamVjdGVkIHRoaXMgdG9rZW4uIE1ha2Ugc3VyZSBpdCBoYXMgdGhlIENsb3VkZmxhcmUgUGFnZXM6IEVkaXQgcGVybWlzc2lvbiwgdGhlbiB0cnkgYWdhaW4uJztcbiAgfVxuICByZXR1cm4gYENvdWxkbid0IGNyZWF0ZSB0aGUgUGFnZXMgcHJvamVjdC4gTW9zdCBsaWtlbHkgdGhlIENsb3VkZmxhcmUgR2l0SHViIEFwcCBpc24ndCBhdXRob3JpemVkIGZvciAke3JlcG9TbHVnfSB5ZXQgXHUyMDE0IHVzZSBcdTIwMUNBdXRob3JpemUgQ2xvdWRmbGFyZSBvbiBHaXRIdWJcdTIwMUQsIGdyYW50IGFjY2VzcyB0byB0aGF0IHJlcG8sIHRoZW4gdHJ5IGFnYWluLiAoQ2xvdWRmbGFyZSBzYWlkOiAke3Jhd01lc3NhZ2V9KWA7XG59XG5cblxuLyoqXG4gKiBFbmQtdG8tZW5kIHNpdGUgY3JlYXRpb24sIHNoYXJlZCBieSB0aGUgZmlyc3QtcnVuIHdpemFyZCBhbmQgdGhlIFwiQWRkIHNpdGVcIlxuICogbW9kYWw6IGNyZWF0ZSBhIGZyZXNoIEdpdEh1YiByZXBvLCB0aGVuIGEgQ2xvdWRmbGFyZSBQYWdlcyBwcm9qZWN0IHBvaW50ZWQgYXRcbiAqIGl0LiBUaGUgZmlyc3QgcHVibGlzaCBjb21taXRzIHRoZSB1c2VyJ3MgY29udGVudCBwbHVzIGEgbWRnYXJkZW5cbiAqIHBhY2thZ2UuanNvbi9jb25maWcsIHdoaWNoIENsb3VkZmxhcmUgYnVpbGRzIHdpdGggYG5weCBtZGdhcmRlbiBidWlsZGAuIFJldXNlc1xuICogdGhlIHNoYXJlZCBHaXRIdWIvQ2xvdWRmbGFyZSBjcmVkZW50aWFscyBhbHJlYWR5IG9uIHRoZSBwbHVnaW4gc2V0dGluZ3MuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwcm92aXNpb25TaXRlKFxuICBwbHVnaW46IE5vdGVGbGFyZVBsdWdpbixcbiAgbmFtZTogc3RyaW5nLFxuICBwcm9maWxlUGFyYW1zOiBQYXJ0aWFsPFNpdGVQcm9maWxlPixcbiAgaG9zdGluZ1Byb3ZpZGVyOiBTaXRlUHJvZmlsZVsnaG9zdGluZ1Byb3ZpZGVyJ10gPSAnZ2l0aHViLXBhZ2VzJyxcbik6IFByb21pc2U8U2l0ZVByb2ZpbGU+IHtcbiAgY29uc3Qgc2x1ZyA9IHNsdWdpZnkobmFtZSk7XG4gIGlmICghc2x1ZykgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgZW50ZXIgYSBzaXRlIG5hbWUuJyk7XG5cbiAgY29uc3Qgb3duZXIgPSBwbHVnaW4uc2V0dGluZ3MuZ2l0aHViT3duZXI7XG4gIGNvbnN0IHJlcG8gPSBwbHVnaW4uc2V0dGluZ3MubWFzdGVyUmVwb3NpdG9yeTtcbiAgaWYgKCFyZXBvKSB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBjb25maWd1cmUgYSBNYXN0ZXIgUmVwb3NpdG9yeSBpbiBzZXR0aW5ncyBmaXJzdC4nKTtcblxuICBjb25zdCBzaXRlID0gY3JlYXRlU2l0ZVByb2ZpbGUoe1xuICAgIG5hbWUsXG4gICAgaG9zdGluZ1Byb3ZpZGVyLFxuICAgIC4uLnByb2ZpbGVQYXJhbXMsXG4gIH0pO1xuXG4gIGNvbnN0IGdoID0gbmV3IEdpdEh1YkFwaShwbHVnaW4uc2V0dGluZ3MuZ2l0aHViVG9rZW4sIG93bmVyLCByZXBvKTtcbiAgYXdhaXQgZ2guY3JlYXRlUmVwbygpO1xuICBpZiAoIShhd2FpdCBnaC53YWl0Rm9yUmVwbygzMDAwMCkpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdSZXBvc2l0b3J5IGNyZWF0aW9uIHRpbWVkIG91dCBcdTIwMTQgcGxlYXNlIHRyeSBhZ2Fpbi4nKTtcbiAgfVxuXG4gIGlmIChob3N0aW5nUHJvdmlkZXIgPT09ICdnaXRodWItcGFnZXMnKSB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGdoLmVuYWJsZUdpdEh1YlBhZ2VzKCk7XG4gICAgfSBjYXRjaCAoZTogdW5rbm93bikge1xuICAgICAgLy8gRG9uJ3QgZmFpbCBzZXR1cCwganVzdCBsZXQgdGhlbSBrbm93IHRoZXkgbWlnaHQgbmVlZCB0byBkbyBpdCBtYW51YWxseVxuICAgICAgY29uc29sZS53YXJuKCdDb3VsZCBub3QgYXV0by1lbmFibGUgR2l0SHViIFBhZ2VzOicsIGUpO1xuICAgIH1cbiAgfVxuXG4gIGxldCBicmFuY2ggPSAnbWFpbic7XG4gIHRyeSB7XG4gICAgYnJhbmNoID0gYXdhaXQgZ2guZ2V0RGVmYXVsdEJyYW5jaCgpO1xuICB9IGNhdGNoIHtcbiAgICAvLyBLZWVwIHRoZSBicmFuY2guXG4gIH1cbiAgc2l0ZS5naXRodWJCcmFuY2ggPSBicmFuY2g7XG4gIHNpdGUuZ2l0aHViUmVwbyA9IHJlcG87XG5cbiAgbGV0IHNpdGVVcmwgPSAnJztcblxuICBpZiAoaG9zdGluZ1Byb3ZpZGVyID09PSAnZ2l0aHViLXBhZ2VzJykge1xuICAgIC8vIEdpdEh1YiBQYWdlcyBVUkwgaXMgZGV0ZXJtaW5pc3RpYyBcdTIwMTQgbm8gQVBJIGNhbGwgbmVlZGVkLlxuICAgIHNpdGVVcmwgPSBgJHtvd25lcn0uZ2l0aHViLmlvLyR7cmVwb31gO1xuICAgIC8vIGNsb3VkZmxhcmVQcm9qZWN0IGludGVudGlvbmFsbHkgbGVmdCBibGFuayBmb3IgR2l0SHViIFBhZ2VzIHNpdGVzLlxuICB9IGVsc2Uge1xuICAgIC8vIENsb3VkZmxhcmUgUGFnZXM6IGNyZWF0ZSAob3IgcmVjb3ZlcikgYSBQYWdlcyBwcm9qZWN0LlxuICAgIGNvbnN0IGNmID0gbmV3IENsb3VkZmxhcmVBcGkocGx1Z2luLnNldHRpbmdzLmNsb3VkZmxhcmVUb2tlbiwgcGx1Z2luLnNldHRpbmdzLmNsb3VkZmxhcmVBY2NvdW50KTtcbiAgICBjb25zdCByb290RGlyID0gYHNpdGVzLyR7c2l0ZS5pZH1gO1xuICAgIC8vIE1ha2UgcHJvamVjdCBuYW1lIHVuaXF1ZSBzaW5jZSBtdWx0aXBsZSBzaXRlcyBzaGFyZSB0aGUgc2FtZSByZXBvXG4gICAgY29uc3QgcHJvamVjdE5hbWUgPSBzbHVnaWZ5KGAke3JlcG99LSR7c2x1Z31gKTtcbiAgICB0cnkge1xuICAgICAgc2l0ZVVybCA9IGF3YWl0IGNmLmNyZWF0ZVByb2plY3QocHJvamVjdE5hbWUsIG93bmVyLCByZXBvLCBicmFuY2gsIHJvb3REaXIpO1xuICAgICAgc2l0ZS5jbG91ZGZsYXJlUHJvamVjdCA9IHByb2plY3ROYW1lO1xuICAgIH0gY2F0Y2ggKGNyZWF0ZUVycjogdW5rbm93bikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgc2l0ZVVybCA9IGF3YWl0IGNmLmdldFByb2plY3QocHJvamVjdE5hbWUpO1xuICAgICAgICBzaXRlLmNsb3VkZmxhcmVQcm9qZWN0ID0gcHJvamVjdE5hbWU7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGNsb3VkZmxhcmVTZXR1cEhpbnQoKGNyZWF0ZUVyciBhcyBFcnJvcikubWVzc2FnZSwgYCR7b3duZXJ9LyR7cmVwb31gKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2l0ZS5zaXRlVXJsID0gc2l0ZVVybDtcbiAgcmV0dXJuIHNpdGU7XG59XG4iLCAiaW1wb3J0IHsgQXBwLCBGdXp6eVN1Z2dlc3RNb2RhbCwgVEFic3RyYWN0RmlsZSwgVEZpbGUsIFRGb2xkZXIgfSBmcm9tICdvYnNpZGlhbic7XG5cbmV4cG9ydCBjbGFzcyBQYXRoU3VnZ2VzdE1vZGFsIGV4dGVuZHMgRnV6enlTdWdnZXN0TW9kYWw8VEFic3RyYWN0RmlsZT4ge1xuICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcHJpdmF0ZSBvbkNob29zZTogKHBhdGg6IHN0cmluZykgPT4gdm9pZCkge1xuICAgIHN1cGVyKGFwcCk7XG4gICAgdGhpcy5zZXRQbGFjZWhvbGRlcignU2VhcmNoIGZvciBhIGZpbGUgb3IgZm9sZGVyLi4uJyk7XG4gIH1cbiAgXG4gIGdldEl0ZW1zKCk6IFRBYnN0cmFjdEZpbGVbXSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwLnZhdWx0LmdldEFsbExvYWRlZEZpbGVzKCkuZmlsdGVyKGYgPT4gXG4gICAgICBmLnBhdGggIT09ICcvJyAmJiBcbiAgICAgICFmLnBhdGguc3RhcnRzV2l0aCgnLicpICYmXG4gICAgICAhZi5wYXRoLmluY2x1ZGVzKCcvLicpICYmXG4gICAgICAoZiBpbnN0YW5jZW9mIFRGb2xkZXIgfHwgKGYgaW5zdGFuY2VvZiBURmlsZSAmJiBmLmV4dGVuc2lvbiA9PT0gJ21kJykpXG4gICAgKTtcbiAgfVxuICBcbiAgZ2V0SXRlbVRleHQoaXRlbTogVEFic3RyYWN0RmlsZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGl0ZW0ucGF0aDtcbiAgfVxuICBcbiAgb25DaG9vc2VJdGVtKGl0ZW06IFRBYnN0cmFjdEZpbGUsIF9ldnQ6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5vbkNob29zZShpdGVtLnBhdGgpO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB0eXBlIHsgTm90ZUZsYXJlU2V0dGluZ3NUYWIgfSBmcm9tICcuLi9zZXR0aW5nc1RhYic7XG5pbXBvcnQgeyBjcmVhdGVFcnJvckVsLCBoaWRlRXJyb3IgfSBmcm9tICcuLi9zZXR0aW5nc0hlbHBlcnMnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyU3RlcEJhY2t1cCh0YWI6IE5vdGVGbGFyZVNldHRpbmdzVGFiLCBlbDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBoZWFkaW5nID0gbmV3IFNldHRpbmcoZWwpO1xuICAgIGhlYWRpbmcuc2V0TmFtZSgnQXV0b21hdGljIGJhY2t1cCAob3B0aW9uYWwpJyk7XG4gICAgaGVhZGluZy5zZXRIZWFkaW5nKCk7XG5cbiAgICBlbC5jcmVhdGVFbCgncCcsIHtcbiAgICAgIGNsczogJ3NldHRpbmctaXRlbS1kZXNjcmlwdGlvbicsXG4gICAgICB0ZXh0OiAnTm90ZUZsYXJlIGNhbiBzaWxlbnRseSBtaXJyb3IgeW91ciBlbnRpcmUgdmF1bHQgdG8gYSBwcml2YXRlIEdpdEh1YiByZXBvc2l0b3J5LiBObyBtYW51YWwgc3RlcHMgXHUyMDE0IGl0IHJ1bnMgaW4gdGhlIGJhY2tncm91bmQuJyxcbiAgICB9KTtcblxuICAgIGxldCBlbmFibGVCYWNrdXAgPSB0YWIucGx1Z2luLnNldHRpbmdzLmVuYWJsZUJhY2t1cDtcbiAgICBsZXQgcmVwb1Zpc2liaWxpdHkgPSB0YWIucGx1Z2luLnNldHRpbmdzLmJhY2t1cC5yZXBvVmlzaWJpbGl0eSA/PyAncHJpdmF0ZSc7XG5cbiAgICBuZXcgU2V0dGluZyhlbClcbiAgICAgIC5zZXROYW1lKCdFbmFibGUgYXV0b21hdGljIGJhY2t1cCcpXG4gICAgICAuc2V0RGVzYygnUnVuIGEgYmFja3VwIGFmdGVyIHZhdWx0IGNoYW5nZXMgYW5kL29yIG9uIGEgc2NoZWR1bGUuJylcbiAgICAgIC5hZGRUb2dnbGUoKHQpID0+IHtcbiAgICAgICAgdC5zZXRWYWx1ZShlbmFibGVCYWNrdXApO1xuICAgICAgICB0Lm9uQ2hhbmdlKCh2KSA9PiB7XG4gICAgICAgICAgZW5hYmxlQmFja3VwID0gdjtcbiAgICAgICAgICB2aXNpYmlsaXR5U2VjdGlvbi5zZXRDc3NTdHlsZXMoeyBkaXNwbGF5OiB2ID8gJ2Jsb2NrJyA6ICdub25lJyB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIGNvbnN0IHZpc2liaWxpdHlTZWN0aW9uID0gZWwuY3JlYXRlRGl2KCk7XG4gICAgdmlzaWJpbGl0eVNlY3Rpb24uc2V0Q3NzU3R5bGVzKHsgZGlzcGxheTogZW5hYmxlQmFja3VwID8gJ2Jsb2NrJyA6ICdub25lJyB9KTtcblxuICAgIG5ldyBTZXR0aW5nKHZpc2liaWxpdHlTZWN0aW9uKVxuICAgICAgLnNldE5hbWUoJ0JhY2t1cCByZXBvc2l0b3J5IHZpc2liaWxpdHknKVxuICAgICAgLnNldERlc2MoJ1ByaXZhdGUga2VlcHMgeW91ciBub3RlcyBjb25maWRlbnRpYWwuIFB1YmxpYyBtYWtlcyB0aGUgcmVwbyB2aXNpYmxlIG9uIEdpdEh1YiAobm90IHJlY29tbWVuZGVkIGZvciBwZXJzb25hbCBub3RlcykuJylcbiAgICAgIC5hZGREcm9wZG93bigoZCkgPT4ge1xuICAgICAgICBkLmFkZE9wdGlvbigncHJpdmF0ZScsICdcdUQ4M0RcdUREMTIgUHJpdmF0ZSAocmVjb21tZW5kZWQpJyk7XG4gICAgICAgIGQuYWRkT3B0aW9uKCdwdWJsaWMnLCAnXHVEODNDXHVERjEwIFB1YmxpYycpO1xuICAgICAgICBkLnNldFZhbHVlKHJlcG9WaXNpYmlsaXR5KTtcbiAgICAgICAgZC5vbkNoYW5nZSgodikgPT4geyByZXBvVmlzaWJpbGl0eSA9IHYgYXMgJ3ByaXZhdGUnIHwgJ3B1YmxpYyc7IH0pO1xuICAgICAgfSk7XG5cbiAgICBjb25zdCBlcnJvckVsID0gY3JlYXRlRXJyb3JFbChlbCk7XG5cbiAgICBuZXcgU2V0dGluZyhlbClcbiAgICAgIC5hZGRCdXR0b24oKGJhY2spID0+IHtcbiAgICAgICAgYmFjay5zZXRCdXR0b25UZXh0KCdCYWNrJyk7XG4gICAgICAgIGJhY2sub25DbGljaygoKSA9PiB7IHRhYi53aXphcmRTdGVwID0gJ2hvc3RpbmcnOyB0YWIucmVuZGVyKCk7IH0pO1xuICAgICAgfSlcbiAgICAgIC5hZGRCdXR0b24oKGJ0bikgPT4ge1xuICAgICAgICBidG4uc2V0QnV0dG9uVGV4dCgnRmluaXNoIHNldHVwJykuc2V0Q3RhKCk7XG4gICAgICAgIGJ0bi5vbkNsaWNrKCgpID0+IHtcbiAgICAgICAgICB2b2lkIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBoaWRlRXJyb3IoZXJyb3JFbCk7XG4gICAgICAgICAgICB0YWIucGx1Z2luLnNldHRpbmdzLmVuYWJsZUJhY2t1cCA9IGVuYWJsZUJhY2t1cDtcbiAgICAgICAgICAgIHRhYi5wbHVnaW4uc2V0dGluZ3MuYmFja3VwLnJlcG9WaXNpYmlsaXR5ID0gcmVwb1Zpc2liaWxpdHk7XG4gICAgICAgICAgICBpZiAoZW5hYmxlQmFja3VwICYmICF0YWIucGx1Z2luLnNldHRpbmdzLmJhY2t1cC5yZXBvc2l0b3J5KSB7XG4gICAgICAgICAgICAgIC8vIFVzZSB0aGUgdmF1bHQtZGVyaXZlZCBiYWNrdXAgcmVwbyBuYW1lIFx1MjAxNCBOT1QgdGhlIHB1Ymxpc2ggbWFzdGVyIHJlcG8uXG4gICAgICAgICAgICAgIHRhYi5wbHVnaW4uc2V0dGluZ3MuYmFja3VwLnJlcG9zaXRvcnkgPSB0YWIucGx1Z2luLmRlZmF1bHRCYWNrdXBSZXBvc2l0b3J5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YWIucGx1Z2luLnNldHRpbmdzLnNldHVwQ29tcGxldGUgPSB0cnVlO1xuICAgICAgICAgICAgYXdhaXQgdGFiLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIHRhYi53aXphcmRTdGVwID0gJ2RvbmUnO1xuICAgICAgICAgICAgdGFiLnJlbmRlcigpO1xuICAgICAgICAgIH0pKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG59XG4iLCAiaW1wb3J0IHsgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB0eXBlIHsgTm90ZUZsYXJlU2V0dGluZ3NUYWIgfSBmcm9tICcuLi9zZXR0aW5nc1RhYic7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJTdGVwRG9uZSh0YWI6IE5vdGVGbGFyZVNldHRpbmdzVGFiLCBlbDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBzaXRlID0gdGFiLnBsdWdpbi5nZXRBY3RpdmVTaXRlKCk7XG5cbiAgICBjb25zdCBoZWFkaW5nID0gbmV3IFNldHRpbmcoZWwpO1xuICAgIGhlYWRpbmcuc2V0TmFtZSgnWW91XFwncmUgYWxsIHNldCEgXHVEODNDXHVERjg5Jyk7XG4gICAgaGVhZGluZy5zZXRIZWFkaW5nKCk7XG5cbiAgICBjb25zdCBkb25lTXNnID0gbmV3IFNldHRpbmcoZWwpLnNldE5hbWUoXG4gICAgICBzaXRlID8gJ1lvdXIgc2l0ZSBpcyByZWFkeSB0byBwdWJsaXNoJyA6ICdBdXRvbWF0aWMgYmFja3VwIGlzIHJlYWR5JyxcbiAgICApO1xuICAgIGlmIChzaXRlPy5zaXRlVXJsKSB7XG4gICAgICBkb25lTXNnLmRlc2NFbC5hcHBlbmRUZXh0KCdZb3VyIHNpdGUgd2lsbCBiZSBsaXZlIGF0OiAnKTtcbiAgICAgIGRvbmVNc2cuZGVzY0VsLmNyZWF0ZUVsKCdhJywge1xuICAgICAgICB0ZXh0OiBgaHR0cHM6Ly8ke3NpdGUuc2l0ZVVybH1gLFxuICAgICAgICBocmVmOiBgaHR0cHM6Ly8ke3NpdGUuc2l0ZVVybH1gLFxuICAgICAgICBhdHRyOiB7IHRhcmdldDogJ19ibGFuaycsIHJlbDogJ25vb3BlbmVyJyB9LFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvbmVNc2cuc2V0RGVzYygnTm90ZUZsYXJlIHdpbGwgcHJvdGVjdCB5b3VyIHZhdWx0IHF1aWV0bHkgdXNpbmcgeW91ciBjaG9zZW4gc2NoZWR1bGUuJyk7XG4gICAgfVxuXG4gICAgbmV3IFNldHRpbmcoZWwpXG4gICAgICAuYWRkQnV0dG9uKChsYXRlcikgPT4ge1xuICAgICAgICBsYXRlci5zZXRCdXR0b25UZXh0KHNpdGUgPyBcIkknbGwgcHVibGlzaCBsYXRlclwiIDogJ09wZW4gY29uZmlndXJhdGlvbicpO1xuICAgICAgICBsYXRlci5vbkNsaWNrKCgpID0+IHtcbiAgICAgICAgICB2b2lkIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICB0YWIuaGFzSW5pdGlhbGl6ZWRXaXphcmQgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChzaXRlKSB0YWIuY2xvc2VTZXR0aW5ncygpO1xuICAgICAgICAgICAgZWxzZSB0YWIucmVuZGVyKCk7XG4gICAgICAgICAgfSkoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmFkZEJ1dHRvbigoYnRuKSA9PiB7XG4gICAgICAgIGJ0bi5zZXRCdXR0b25UZXh0KHNpdGUgPyAnUHVibGlzaCBub3cnIDogJ0JhY2sgdXAgbm93Jykuc2V0Q3RhKCk7XG4gICAgICAgIGJ0bi5vbkNsaWNrKCgpID0+IHtcbiAgICAgICAgICB2b2lkIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICB0YWIuaGFzSW5pdGlhbGl6ZWRXaXphcmQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRhYi5jbG9zZVNldHRpbmdzKCk7XG4gICAgICAgICAgICBpZiAoc2l0ZSkgYXdhaXQgdGFiLnBsdWdpbi5kb1B1Ymxpc2goKTtcbiAgICAgICAgICAgIGVsc2UgYXdhaXQgdGFiLnBsdWdpbi5kb0JhY2t1cChmYWxzZSk7XG4gICAgICAgICAgfSkoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IE5vdGVGbGFyZVNldHRpbmdzVGFiIH0gZnJvbSAnLi4vc2V0dGluZ3NUYWInO1xuaW1wb3J0IHsgcmVuZGVyU3RlcEdpdEh1YiB9IGZyb20gJy4vc3RlcEdpdEh1Yic7XG5pbXBvcnQgeyByZW5kZXJTdGVwSG9zdGluZyB9IGZyb20gJy4vc3RlcEhvc3RpbmcnO1xuaW1wb3J0IHsgcmVuZGVyU3RlcEJhY2t1cCB9IGZyb20gJy4vc3RlcEJhY2t1cCc7XG5pbXBvcnQgeyByZW5kZXJTdGVwRG9uZSB9IGZyb20gJy4vc3RlcERvbmUnO1xuaW1wb3J0IHsgU2V0dXBTdGVwIH0gZnJvbSAnLi4vLi4vLi4vY29yZS90eXBlcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJXaXphcmQodGFiOiBOb3RlRmxhcmVTZXR0aW5nc1RhYiwgZWw6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gIHJlbmRlcldpemFyZFN0ZXBzKHRhYiwgZWwpO1xuICBpZiAodGFiLndpemFyZFN0ZXAgPT09ICdnaXRodWInKSByZW5kZXJTdGVwR2l0SHViKHRhYiwgZWwpO1xuICBlbHNlIGlmICh0YWIud2l6YXJkU3RlcCA9PT0gJ2hvc3RpbmcnKSByZW5kZXJTdGVwSG9zdGluZyh0YWIsIGVsKTtcbiAgZWxzZSBpZiAodGFiLndpemFyZFN0ZXAgPT09ICdiYWNrdXAnKSByZW5kZXJTdGVwQmFja3VwKHRhYiwgZWwpO1xuICBlbHNlIHJlbmRlclN0ZXBEb25lKHRhYiwgZWwpO1xufVxuXG5mdW5jdGlvbiByZW5kZXJXaXphcmRTdGVwcyh0YWI6IE5vdGVGbGFyZVNldHRpbmdzVGFiLCBlbDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBzdGVwczogQXJyYXk8eyBrZXk6IFNldHVwU3RlcDsgbGFiZWw6IHN0cmluZyB9PiA9IFtcbiAgICAgIHsga2V5OiAnZ2l0aHViJywgbGFiZWw6ICdHaXRIdWInIH0sXG4gICAgICB7IGtleTogJ2hvc3RpbmcnLCBsYWJlbDogJ0hvc3RpbmcnIH0sXG4gICAgICB7IGtleTogJ2JhY2t1cCcsIGxhYmVsOiAnQmFja3VwJyB9LFxuICAgICAgeyBrZXk6ICdkb25lJywgbGFiZWw6ICdEb25lJyB9LFxuICAgIF07XG4gICAgY29uc3Qgb3JkZXIgPSBzdGVwcy5tYXAoKHMpID0+IHMua2V5KTtcbiAgICBjb25zdCBjdXJyZW50SWR4ID0gb3JkZXIuaW5kZXhPZih0YWIud2l6YXJkU3RlcCk7XG5cbiAgICBjb25zdCB3cmFwcGVyID0gZWwuY3JlYXRlRGl2KCduZi13aXphcmQtc3RlcHMnKTtcbiAgICBzdGVwcy5mb3JFYWNoKCh7IGxhYmVsIH0sIGkpID0+IHtcbiAgICAgIGNvbnN0IGRvdCA9IHdyYXBwZXIuY3JlYXRlRGl2KCduZi1zdGVwLWRvdCcpO1xuICAgICAgaWYgKGkgPCBjdXJyZW50SWR4KSBkb3QuYWRkQ2xhc3MoJ2NvbXBsZXRlZCcpO1xuICAgICAgZWxzZSBpZiAoaSA9PT0gY3VycmVudElkeCkgZG90LmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgIGNvbnN0IGxhYmVsRWwgPSBkb3QuY3JlYXRlU3BhbignbmYtc3RlcC1sYWJlbCcpO1xuICAgICAgbGFiZWxFbC5zZXRUZXh0KGxhYmVsKTtcbiAgICB9KTtcbn1cbiIsICJpbXBvcnQgeyBTZXR0aW5nIH0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IHR5cGUgeyBOb3RlRmxhcmVTZXR0aW5nc1RhYiB9IGZyb20gJy4uL3NldHRpbmdzVGFiJztcbmltcG9ydCB7IGJ1aWxkQ2xvdWRmbGFyZVRva2VuVXJsIH0gZnJvbSAnLi4vbW9kYWxzL2hlbHBlcnMnO1xuaW1wb3J0IHsgQ2xvdWRmbGFyZUFwaSB9IGZyb20gJy4uLy4uLy4uL2FwaS9jbG91ZGZsYXJlQXBpJztcbmltcG9ydCB7IGNyZWF0ZUVycm9yRWwsIHNob3dFcnJvciwgaGlkZUVycm9yLCBidXN5LCBpZGxlIH0gZnJvbSAnLi4vc2V0dGluZ3NIZWxwZXJzJztcbmltcG9ydCB7IHJlbmRlclJlc3RvcmVGcm9tUmVnaXN0cnkgfSBmcm9tICcuL3Jlc3RvcmVTZWN0aW9uJztcblxuY29uc3QgQ0xPVURGTEFSRV9BUFBfVVJMID0gJ2h0dHBzOi8vZ2l0aHViLmNvbS9hcHBzL2Nsb3VkZmxhcmUtd29ya2Vycy1hbmQtcGFnZXMvaW5zdGFsbGF0aW9ucy9uZXcnO1xuY29uc3QgQ0xPVURGTEFSRV9UT0tFTl9VUkwgPSBidWlsZENsb3VkZmxhcmVUb2tlblVybCgpO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyQ29ubmVjdGlvbnNTZWN0aW9uKHRhYjogTm90ZUZsYXJlU2V0dGluZ3NUYWIsIGVsOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGNvbnN0IHMgPSB0YWIucGx1Z2luLnNldHRpbmdzO1xuXG4gICAgLy8gXHUyNTAwXHUyNTAwIFNlY3Rpb24gMTogQ29ubmVjdGlvbnMgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXG4gICAgY29uc3QgY29ubkhlYWRpbmcgPSBuZXcgU2V0dGluZyhlbCk7XG4gICAgY29ubkhlYWRpbmcuc2V0TmFtZSgnQ29ubmVjdGlvbnMnKTtcbiAgICBjb25uSGVhZGluZy5zZXRIZWFkaW5nKCk7XG5cbiAgICAvLyBHaXRIdWIgcm93XG4gICAgY29uc3QgZ2hTZXR0aW5nID0gbmV3IFNldHRpbmcoZWwpLnNldE5hbWUoJ0dpdEh1YicpO1xuICAgIGlmIChzLmdpdGh1YlRva2VuICYmIHMuZ2l0aHViT3duZXIpIHtcbiAgICAgIGdoU2V0dGluZy5zZXREZXNjKGBDb25uZWN0ZWQgYXMgQCR7cy5naXRodWJPd25lcn1gKTtcbiAgICAgIGdoU2V0dGluZy5hZGRCdXR0b24oKGIpID0+IHtcbiAgICAgICAgYi5zZXRCdXR0b25UZXh0KCdEaXNjb25uZWN0Jyk7XG4gICAgICAgIGIuYnV0dG9uRWwuYWRkQ2xhc3MoJ21vZC13YXJuaW5nJyk7XG4gICAgICAgIGIub25DbGljaygoKSA9PiB7XG4gICAgICAgICAgdm9pZCAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgcy5naXRodWJUb2tlbiA9ICcnO1xuICAgICAgICAgICAgcy5naXRodWJPd25lciA9ICcnO1xuICAgICAgICAgICAgcy5zZXR1cENvbXBsZXRlID0gZmFsc2U7XG4gICAgICAgICAgICBhd2FpdCB0YWIucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgdGFiLmhhc0luaXRpYWxpemVkV2l6YXJkID0gZmFsc2U7XG4gICAgICAgICAgICB0YWIud2l6YXJkU3RlcCA9ICdnaXRodWInO1xuICAgICAgICAgICAgdGFiLnJlbmRlcigpO1xuICAgICAgICAgIH0pKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdoU2V0dGluZy5zZXREZXNjKCdOb3QgY29ubmVjdGVkJyk7XG4gICAgICBnaFNldHRpbmcuYWRkQnV0dG9uKChiKSA9PiB7XG4gICAgICAgIGIuc2V0QnV0dG9uVGV4dCgnQ29ubmVjdCcpLnNldEN0YSgpO1xuICAgICAgICBiLm9uQ2xpY2soKCkgPT4geyB0YWIuaGFzSW5pdGlhbGl6ZWRXaXphcmQgPSBmYWxzZTsgdGFiLndpemFyZFN0ZXAgPSAnZ2l0aHViJzsgdGFiLnJlbmRlcigpOyB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIENsb3VkZmxhcmUgcm93XG4gICAgY29uc3QgY2ZTZXR0aW5nID0gbmV3IFNldHRpbmcoZWwpLnNldE5hbWUoJ0Nsb3VkZmxhcmUnKTtcbiAgICBpZiAocy5jbG91ZGZsYXJlVG9rZW4pIHtcbiAgICAgIGNvbnN0IGFjY291bnRIaW50ID0gcy5jbG91ZGZsYXJlQWNjb3VudFxuICAgICAgICA/IGBBY2NvdW50OiAke3MuY2xvdWRmbGFyZUFjY291bnQuc2xpY2UoMCwgOCl9XHUyMDI2YFxuICAgICAgICA6ICdDb25uZWN0ZWQnO1xuICAgICAgY2ZTZXR0aW5nLnNldERlc2MoYWNjb3VudEhpbnQpO1xuICAgICAgLy8gUmVjb25uZWN0IGlzIG5lZWRlZCB3aGVuIHRoZSBDbG91ZGZsYXJlIFx1MjE5NCBHaXRIdWIgQXBwIGF1dGhvcml6YXRpb25cbiAgICAgIC8vIGlzIHJldm9rZWQgKGUuZy4gYWZ0ZXIgZGVsZXRpbmcgYW5kIHJlY3JlYXRpbmcgdGhlIHJlcG8pLlxuICAgICAgY2ZTZXR0aW5nLmFkZEJ1dHRvbigoYikgPT4ge1xuICAgICAgICBiLnNldEJ1dHRvblRleHQoJ1JlY29ubmVjdCB0byBHaXRIdWInKTtcbiAgICAgICAgYi5zZXRUb29sdGlwKCdPcGVuIENsb3VkZmxhcmUgXHUyMTk0IEdpdEh1YiBBcHAgYXV0aG9yaXphdGlvbiBpZiB5b3VyIGJ1aWxkcyBhcmUgZGlzY29ubmVjdGVkJyk7XG4gICAgICAgIGIub25DbGljaygoKSA9PiB7IHdpbmRvdy5vcGVuKENMT1VERkxBUkVfQVBQX1VSTCwgJ19ibGFuaycpOyB9KTtcbiAgICAgIH0pO1xuICAgICAgY2ZTZXR0aW5nLmFkZEJ1dHRvbigoYikgPT4ge1xuICAgICAgICBiLnNldEJ1dHRvblRleHQoJ0Rpc2Nvbm5lY3QnKTtcbiAgICAgICAgYi5idXR0b25FbC5hZGRDbGFzcygnbW9kLXdhcm5pbmcnKTtcbiAgICAgICAgYi5vbkNsaWNrKCgpID0+IHtcbiAgICAgICAgICB2b2lkIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBzLmNsb3VkZmxhcmVUb2tlbiA9ICcnO1xuICAgICAgICAgICAgcy5jbG91ZGZsYXJlQWNjb3VudCA9ICcnO1xuICAgICAgICAgICAgYXdhaXQgdGFiLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIHRhYi5yZW5kZXIoKTtcbiAgICAgICAgICB9KSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjZlNldHRpbmcuc2V0RGVzYygnTm90IGNvbm5lY3RlZCBcdTIwMTQgcmVxdWlyZWQgZm9yIENsb3VkZmxhcmUgUGFnZXMgaG9zdGluZycpO1xuICAgICAgY2ZTZXR0aW5nLmFkZEJ1dHRvbigoYikgPT4ge1xuICAgICAgICBiLnNldEJ1dHRvblRleHQoJ0Nvbm5lY3QnKTtcbiAgICAgICAgYi5vbkNsaWNrKCgpID0+IHsgdGFiLm9wZW5DbG91ZGZsYXJlQ29ubmVjdEZsb3coKTsgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBSZXN0b3JlIGZyb20gdmF1bHQgcmVnaXN0cnkgKHNob3duIG9ubHkgd2hlbiBzaXRlcyBleGlzdCBpbiByZWdpc3RyeSBidXQgbm90IGluIHNldHRpbmdzKVxuICAgIHZvaWQgcmVuZGVyUmVzdG9yZUZyb21SZWdpc3RyeSh0YWIsIGVsKTtcblxuICAgIC8vIFJlc2V0IGlzIGluIHRoZSBwZXJzaXN0ZW50IGZvb3RlciBiZWxvdyBcdTIwMTQgcmVtb3ZlZCBmcm9tIGhlcmUgdG8gYXZvaWQgZHVwbGljYXRpb24uXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvcGVuQ2xvdWRmbGFyZUNvbm5lY3RGbG93KHRhYjogTm90ZUZsYXJlU2V0dGluZ3NUYWIsIGNvbnRhaW5lckVsOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGNvbnN0IHMgPSB0YWIucGx1Z2luLnNldHRpbmdzO1xuXG4gICAgY29uc3QgaGVhZGluZyA9IG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKTtcbiAgICBoZWFkaW5nLnNldE5hbWUoJ0Nvbm5lY3QgQ2xvdWRmbGFyZScpO1xuICAgIGhlYWRpbmcuc2V0SGVhZGluZygpO1xuXG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoJ3AnLCB7XG4gICAgICBjbHM6ICdzZXR0aW5nLWl0ZW0tZGVzY3JpcHRpb24nLFxuICAgICAgdGV4dDogJ1R3byBxdWljayBvbmUtdGltZSBzdGVwcyBpbiB5b3VyIGJyb3dzZXI6JyxcbiAgICB9KTtcblxuICAgIGNvbnN0IGNmU2VjdGlvbiA9IGNvbnRhaW5lckVsLmNyZWF0ZURpdigpO1xuICAgIGNvbnN0IHJlcG9TbHVnID0gYCR7cy5naXRodWJPd25lcn0vJHtzLm1hc3RlclJlcG9zaXRvcnkgfHwgJ25vdGVmbGFyZS1zaXRlcyd9YDtcblxuICAgIG5ldyBTZXR0aW5nKGNmU2VjdGlvbilcbiAgICAgIC5zZXROYW1lKCcxLiBDcmVhdGUgYSBDbG91ZGZsYXJlIEFQSSB0b2tlbicpXG4gICAgICAuc2V0RGVzYygnQ3JlYXRlcyBhIHRva2VuIHdpdGggUGFnZXMsIFdvcmtlcnMsIGFuZCBBY2NvdW50IHBlcm1pc3Npb25zIHByZS1maWxsZWQuJylcbiAgICAgIC5hZGRCdXR0b24oKGIpID0+IHtcbiAgICAgICAgYi5zZXRCdXR0b25UZXh0KCdDcmVhdGUgVG9rZW4gXHUyMTk3Jyk7XG4gICAgICAgIGIub25DbGljaygoKSA9PiB7IHdpbmRvdy5vcGVuKENMT1VERkxBUkVfVE9LRU5fVVJMLCAnX2JsYW5rJyk7IH0pO1xuICAgICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhjZlNlY3Rpb24pXG4gICAgICAuc2V0TmFtZSgnMi4gQXV0aG9yaXplIENsb3VkZmxhcmUgb24gR2l0SHViJylcbiAgICAgIC5zZXREZXNjKGBHcmFudCB0aGUgXCJDbG91ZGZsYXJlIFdvcmtlcnMgYW5kIFBhZ2VzXCIgYXBwIGFjY2VzcyB0bzogJHtyZXBvU2x1Z31gKVxuICAgICAgLmFkZEJ1dHRvbigoYikgPT4ge1xuICAgICAgICBiLnNldEJ1dHRvblRleHQoJ0F1dGhvcml6ZSBcdTIxOTcnKTtcbiAgICAgICAgYi5vbkNsaWNrKCgpID0+IHsgd2luZG93Lm9wZW4oQ0xPVURGTEFSRV9BUFBfVVJMLCAnX2JsYW5rJyk7IH0pO1xuICAgICAgfSk7XG5cbiAgICBsZXQgY2ZUb2tlbiA9ICcnO1xuICAgIGxldCBjZkFjY291bnQgPSAnJztcblxuICAgIG5ldyBTZXR0aW5nKGNmU2VjdGlvbilcbiAgICAgIC5zZXROYW1lKCdDbG91ZGZsYXJlIEFQSSB0b2tlbicpXG4gICAgICAuc2V0RGVzYygnU3RvcmVkIGVuY3J5cHRlZCBpbiB5b3VyIE9TIGtleWNoYWluLicpXG4gICAgICAuYWRkVGV4dCgodCkgPT4ge1xuICAgICAgICB0LnNldFBsYWNlaG9sZGVyKCdQYXN0ZSBBUEkgdG9rZW5cdTIwMjYnKTtcbiAgICAgICAgdC5pbnB1dEVsLnR5cGUgPSAncGFzc3dvcmQnO1xuICAgICAgICB0Lm9uQ2hhbmdlKCh2KSA9PiB7IGNmVG9rZW4gPSB2LnRyaW0oKTsgfSk7XG4gICAgICB9KTtcblxuICAgIG5ldyBTZXR0aW5nKGNmU2VjdGlvbilcbiAgICAgIC5zZXROYW1lKCdDbG91ZGZsYXJlIGFjY291bnQgSUQnKVxuICAgICAgLnNldERlc2MoJ09wdGlvbmFsIFx1MjAxNCBkZXRlY3RlZCBhdXRvbWF0aWNhbGx5IGZyb20geW91ciB0b2tlbi4nKVxuICAgICAgLmFkZFRleHQoKHQpID0+IHtcbiAgICAgICAgdC5zZXRQbGFjZWhvbGRlcignQXV0by1kZXRlY3RlZCcpO1xuICAgICAgICB0Lm9uQ2hhbmdlKCh2KSA9PiB7IGNmQWNjb3VudCA9IHYudHJpbSgpOyB9KTtcbiAgICAgIH0pO1xuXG4gICAgY29uc3QgZXJyb3JFbCA9IGNyZWF0ZUVycm9yRWwoY29udGFpbmVyRWwpO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuYWRkQnV0dG9uKChiYWNrKSA9PiB7XG4gICAgICAgIGJhY2suc2V0QnV0dG9uVGV4dCgnQ2FuY2VsJyk7XG4gICAgICAgIGJhY2sub25DbGljaygoKSA9PiB7XG4gICAgICAgICAgdGFiLmlzQ2xvdWRmbGFyZUNvbm5lY3RGbG93T3BlbiA9IGZhbHNlO1xuICAgICAgICAgIHRhYi5yZW5kZXIoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmFkZEJ1dHRvbigoYnRuKSA9PiB7XG4gICAgICAgIGJ0bi5zZXRCdXR0b25UZXh0KCdTYXZlICYgY29ubmVjdCcpLnNldEN0YSgpO1xuICAgICAgICBidG4ub25DbGljaygoKSA9PiB7XG4gICAgICAgICAgdm9pZCAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFjZlRva2VuKSByZXR1cm4gc2hvd0Vycm9yKGVycm9yRWwsICdQbGVhc2UgcGFzdGUgeW91ciBDbG91ZGZsYXJlIEFQSSB0b2tlbi4nKTtcbiAgICAgICAgICAgIGhpZGVFcnJvcihlcnJvckVsKTtcbiAgICAgICAgICAgIGJ1c3koYnRuLCAnVmVyaWZ5aW5nXHUyMDI2Jyk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBsZXQgYWNjb3VudElkID0gY2ZBY2NvdW50O1xuICAgICAgICAgICAgICBpZiAoIWFjY291bnRJZCkge1xuICAgICAgICAgICAgICAgIGJ1c3koYnRuLCAnRGV0ZWN0aW5nIGFjY291bnRcdTIwMjYnKTtcbiAgICAgICAgICAgICAgICBhY2NvdW50SWQgPSBhd2FpdCBuZXcgQ2xvdWRmbGFyZUFwaShjZlRva2VuLCAnJykuZ2V0QWNjb3VudElkKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcy5jbG91ZGZsYXJlVG9rZW4gPSBjZlRva2VuO1xuICAgICAgICAgICAgICBzLmNsb3VkZmxhcmVBY2NvdW50ID0gYWNjb3VudElkO1xuICAgICAgICAgICAgICBhd2FpdCB0YWIucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICB0YWIuaXNDbG91ZGZsYXJlQ29ubmVjdEZsb3dPcGVuID0gZmFsc2U7XG4gICAgICAgICAgICAgIHRhYi5yZW5kZXIoKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycjogdW5rbm93bikge1xuICAgICAgICAgICAgICBzaG93RXJyb3IoZXJyb3JFbCwgKGVyciBhcyBFcnJvcikubWVzc2FnZSk7XG4gICAgICAgICAgICAgIGlkbGUoYnRuLCAnU2F2ZSAmIGNvbm5lY3QnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG4iLCAiaW1wb3J0IHsgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB0eXBlIHsgTm90ZUZsYXJlU2V0dGluZ3NUYWIgfSBmcm9tICcuLi9zZXR0aW5nc1RhYic7XG5pbXBvcnQgeyBWYXVsdFJlZ2lzdHJ5IH0gZnJvbSAnLi4vLi4vLi4vY29yZS92YXVsdFJlZ2lzdHJ5JztcbmltcG9ydCB7IFJlZ2lzdHJ5RW50cnkgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3R5cGVzJztcbmltcG9ydCB7IGNyZWF0ZUVycm9yRWwsIHNob3dFcnJvciB9IGZyb20gJy4uL3NldHRpbmdzSGVscGVycyc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW5kZXJSZXN0b3JlRnJvbVJlZ2lzdHJ5KHRhYjogTm90ZUZsYXJlU2V0dGluZ3NUYWIsIGVsOiBIVE1MRWxlbWVudCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHMgPSB0YWIucGx1Z2luLnNldHRpbmdzO1xuICAgIGNvbnN0IHJlZ2lzdHJ5ID0gYXdhaXQgVmF1bHRSZWdpc3RyeS5sb2FkKHRhYi5hcHApO1xuICAgIGNvbnN0IGV4aXN0aW5nSWRzID0gbmV3IFNldDxzdHJpbmc+KHMuc2l0ZXMubWFwKChzaXRlKSA9PiBzaXRlLmlkKSk7XG4gICAgY29uc3Qgb3JwaGFuZWQgPSBWYXVsdFJlZ2lzdHJ5LmJ1aWxkUmVzdG9yZWRQcm9maWxlcyhyZWdpc3RyeS5lbnRyaWVzLCBleGlzdGluZ0lkcyk7XG5cbiAgICBpZiAob3JwaGFuZWQubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICBjb25zdCByZXN0b3JlU2VjdGlvbiA9IGVsLmNyZWF0ZURpdignbmYtcmVzdG9yZS1zZWN0aW9uJyk7XG5cbiAgICBjb25zdCByZXN0b3JlSGVhZGluZyA9IG5ldyBTZXR0aW5nKHJlc3RvcmVTZWN0aW9uKTtcbiAgICByZXN0b3JlSGVhZGluZy5zZXROYW1lKCdQcmV2aW91cyBzaXRlcyBmb3VuZCcpO1xuICAgIHJlc3RvcmVIZWFkaW5nLnNldEhlYWRpbmcoKTtcblxuICAgIHJlc3RvcmVTZWN0aW9uLmNyZWF0ZUVsKCdwJywge1xuICAgICAgY2xzOiAnc2V0dGluZy1pdGVtLWRlc2NyaXB0aW9uJyxcbiAgICAgIHRleHQ6IGBOb3RlRmxhcmUgZm91bmQgJHtvcnBoYW5lZC5sZW5ndGh9IHNpdGUke29ycGhhbmVkLmxlbmd0aCA9PT0gMSA/ICcnIDogJ3MnfSBmcm9tIGEgcHJldmlvdXMgaW5zdGFsbGF0aW9uIGluIHlvdXIgdmF1bHQgcmVnaXN0cnkuIFJlc3RvcmUgdGhlbSB0byBjb250aW51ZSB1c2luZyB5b3VyIGV4aXN0aW5nIEdpdEh1YiByZXBvcyBhbmQgQ2xvdWRmbGFyZSBwcm9qZWN0cy5gLFxuICAgIH0pO1xuXG4gICAgZm9yIChjb25zdCBlbnRyeSBvZiBvcnBoYW5lZCkge1xuICAgICAgY29uc3QgbGFiZWwgPVxuICAgICAgICBgJHtlbnRyeS5uYW1lIHx8IGVudHJ5Lm1hc3RlclJlcG9zaXRvcnl9IFx1MDBCNyAke2VudHJ5Lmhvc3RpbmdQcm92aWRlciA9PT0gJ2Nsb3VkZmxhcmUnID8gJ0Nsb3VkZmxhcmUgUGFnZXMnIDogJ0dpdEh1YiBQYWdlcyd9YCArXG4gICAgICAgIChlbnRyeS5zaXRlVXJsID8gYCBcdTAwQjcgJHtlbnRyeS5zaXRlVXJsfWAgOiAnJyk7XG4gICAgICByZXN0b3JlU2VjdGlvbi5jcmVhdGVFbCgncCcsIHsgY2xzOiAnc2V0dGluZy1pdGVtLWRlc2NyaXB0aW9uJywgdGV4dDogYFx1MjAyMiAke2xhYmVsfWAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgZXJyb3JFbCA9IGNyZWF0ZUVycm9yRWwocmVzdG9yZVNlY3Rpb24pO1xuXG4gICAgbmV3IFNldHRpbmcocmVzdG9yZVNlY3Rpb24pLmFkZEJ1dHRvbigoYikgPT4ge1xuICAgICAgYi5zZXRCdXR0b25UZXh0KGBSZXN0b3JlICR7b3JwaGFuZWQubGVuZ3RofSBzaXRlJHtvcnBoYW5lZC5sZW5ndGggPT09IDEgPyAnJyA6ICdzJ31gKS5zZXRDdGEoKTtcbiAgICAgIGIub25DbGljaygoKSA9PiB7XG4gICAgICAgIHZvaWQgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICBiLnNldERpc2FibGVkKHRydWUpLnNldEJ1dHRvblRleHQoJ1Jlc3RvcmluZ1x1MjAyNicpO1xuICAgICAgICAgIGVycm9yRWwuaGlkZSgpO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIG9ycGhhbmVkKSB7XG4gICAgICAgICAgICAgIHMubWFzdGVyUmVwb3NpdG9yeSA9IHMubWFzdGVyUmVwb3NpdG9yeSB8fCBlbnRyeS5tYXN0ZXJSZXBvc2l0b3J5O1xuICAgICAgICAgICAgICBzLmdpdGh1Yk93bmVyID0gcy5naXRodWJPd25lciB8fCBlbnRyeS5naXRodWJPd25lcjtcbiAgICAgICAgICAgICAgcy5tYXN0ZXJSZXBvc2l0b3J5UHJpdmF0ZSA9IHMubWFzdGVyUmVwb3NpdG9yeVByaXZhdGUgfHwgZW50cnkubWFzdGVyUmVwb3NpdG9yeVByaXZhdGUgfHwgZmFsc2U7XG4gICAgICAgICAgICAgIC8vIFJlYnVpbGQgYSBsaWdodHdlaWdodCBTaXRlUHJvZmlsZSBmcm9tIHRoZSByZWdpc3RyeSBlbnRyeS5cbiAgICAgICAgICAgICAgY29uc3QgeyBjcmVhdGVTaXRlUHJvZmlsZTogY3JlYXRlIH0gPSBhd2FpdCBpbXBvcnQoJy4uLy4uLy4uL2NvcmUvc2V0dGluZ3MnKTtcbiAgICAgICAgICAgICAgY29uc3QgcmVzdG9yZWRTaXRlID0gY3JlYXRlKHtcbiAgICAgICAgICAgICAgICBpZDogZW50cnkuaWQsXG4gICAgICAgICAgICAgICAgbmFtZTogZW50cnkubmFtZSxcbiAgICAgICAgICAgICAgICBnaXRodWJSZXBvOiBlbnRyeS5tYXN0ZXJSZXBvc2l0b3J5LFxuICAgICAgICAgICAgICAgIGdpdGh1YkJyYW5jaDogZW50cnkuZ2l0aHViQnJhbmNoLFxuICAgICAgICAgICAgICAgIGNsb3VkZmxhcmVQcm9qZWN0OiBlbnRyeS5jbG91ZGZsYXJlUHJvamVjdCxcbiAgICAgICAgICAgICAgICBzaXRlVXJsOiBlbnRyeS5zaXRlVXJsLFxuICAgICAgICAgICAgICAgIGhvc3RpbmdQcm92aWRlcjogZW50cnkuaG9zdGluZ1Byb3ZpZGVyIGFzIFJlZ2lzdHJ5RW50cnlbJ2hvc3RpbmdQcm92aWRlciddLFxuICAgICAgICAgICAgICAgIGxhc3RQdWJsaXNoZWQ6IGVudHJ5Lmxhc3RQdWJsaXNoZWQsXG4gICAgICAgICAgICAgICAgaXNQdWJsaXNoZWQ6ICEhZW50cnkubGFzdFB1Ymxpc2hlZCxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHMuc2l0ZXMucHVzaChyZXN0b3JlZFNpdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcy5hY3RpdmVTaXRlSWQgPSBzLmFjdGl2ZVNpdGVJZCB8fCBzLnNpdGVzWzBdPy5pZCB8fCAnJztcbiAgICAgICAgICAgIHMuZW5hYmxlUHVibGlzaCA9IHRydWU7XG4gICAgICAgICAgICBhd2FpdCB0YWIucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgdGFiLnJlbmRlcigpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycjogdW5rbm93bikge1xuICAgICAgICAgICAgc2hvd0Vycm9yKGVycm9yRWwsIChlcnIgYXMgRXJyb3IpLm1lc3NhZ2UpO1xuICAgICAgICAgICAgYi5zZXREaXNhYmxlZChmYWxzZSkuc2V0QnV0dG9uVGV4dChgUmVzdG9yZSAke29ycGhhbmVkLmxlbmd0aH0gc2l0ZSR7b3JwaGFuZWQubGVuZ3RoID09PSAxID8gJycgOiAncyd9YCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG59XG4iLCAiaW1wb3J0IHsgQXBwIH0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IHsgUmVnaXN0cnlFbnRyeSwgVmF1bHRSZWdpc3RyeSBhcyBWYXVsdFJlZ2lzdHJ5RGF0YSwgU2l0ZVByb2ZpbGUgfSBmcm9tICcuL3R5cGVzJztcblxuLyoqXG4gKiBQZXJzaXN0cyBtaW5pbWFsIHNpdGUgcmVmZXJlbmNlcyB0byBgLm5vdGVmbGFyZS9yZWdpc3RyeS5qc29uYCBpbiB0aGUgdmF1bHRcbiAqIHJvb3QuIFRoaXMgZmlsZSBzdXJ2aXZlcyBwbHVnaW4gdW5pbnN0YWxsL3JlaW5zdGFsbCwgbGV0dGluZyB1c2VycyByZXN0b3JlXG4gKiB0aGVpciBleGlzdGluZyBHaXRIdWIgcmVwb3MgYW5kIENsb3VkZmxhcmUgcHJvamVjdHMgd2l0aG91dCByZS1wcm92aXNpb25pbmcuXG4gKlxuICogVGhlIHJlZ2lzdHJ5IGlzIGludGVudGlvbmFsbHkgTk9UIGNsZWFyZWQgb24gSGFyZCBSZXNldCBcdTIwMTQgdGhlIHJlc2V0IHdpcGVzIHRoZVxuICogcGx1Z2luJ3MgaW50ZXJuYWwgc2V0dGluZ3MgKHRva2Vucywgc2l0ZSBwcm9maWxlcykgYnV0IGxlYXZlcyB0aGUgcmVnaXN0cnkgc29cbiAqIHRoZSB1c2VyIGNhbiBpbW1lZGlhdGVseSByZXN0b3JlIHRoZWlyIHNpdGVzIGFmdGVyIHJlY29ubmVjdGluZyBjcmVkZW50aWFscy5cbiAqL1xuXG5jb25zdCBSRUdJU1RSWV9ESVIgPSAnLm5vdGVmbGFyZSc7XG5jb25zdCBSRUdJU1RSWV9QQVRIID0gJy5ub3RlZmxhcmUvcmVnaXN0cnkuanNvbic7XG5cbmV4cG9ydCBjbGFzcyBWYXVsdFJlZ2lzdHJ5IHtcbiAgLyoqIExvYWQgdGhlIHJlZ2lzdHJ5IGZyb20gZGlzaywgcmV0dXJuaW5nIGFuIGVtcHR5IHJlZ2lzdHJ5IGlmIG5vdCBmb3VuZC4gKi9cbiAgc3RhdGljIGFzeW5jIGxvYWQoYXBwOiBBcHApOiBQcm9taXNlPFZhdWx0UmVnaXN0cnlEYXRhPiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJhdyA9IGF3YWl0IGFwcC52YXVsdC5hZGFwdGVyLnJlYWQoUkVHSVNUUllfUEFUSCk7XG4gICAgICBjb25zdCBwYXJzZWQgPSBKU09OLnBhcnNlKHJhdykgYXMgVmF1bHRSZWdpc3RyeURhdGE7XG4gICAgICBpZiAocGFyc2VkLnZlcnNpb24gPT09IDEgJiYgQXJyYXkuaXNBcnJheShwYXJzZWQuZW50cmllcykpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlZDtcbiAgICAgIH1cbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIEZpbGUgZG9lc24ndCBleGlzdCBvciBpcyBjb3JydXB0ZWQgXHUyMDE0IHN0YXJ0IGZyZXNoLlxuICAgIH1cbiAgICByZXR1cm4geyB2ZXJzaW9uOiAxLCBlbnRyaWVzOiBbXSB9O1xuICB9XG5cbiAgLyoqIFdyaXRlIHRoZSByZWdpc3RyeSB0byBkaXNrLCBjcmVhdGluZyB0aGUgYC5ub3RlZmxhcmUvYCBkaXJlY3RvcnkgaWYgbmVlZGVkLiAqL1xuICBzdGF0aWMgYXN5bmMgc2F2ZShhcHA6IEFwcCwgcmVnaXN0cnk6IFZhdWx0UmVnaXN0cnlEYXRhKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGV4aXN0cyA9IGF3YWl0IGFwcC52YXVsdC5hZGFwdGVyLmV4aXN0cyhSRUdJU1RSWV9ESVIpO1xuICAgICAgaWYgKCFleGlzdHMpIHtcbiAgICAgICAgYXdhaXQgYXBwLnZhdWx0LmFkYXB0ZXIubWtkaXIoUkVHSVNUUllfRElSKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IGFwcC52YXVsdC5hZGFwdGVyLndyaXRlKFJFR0lTVFJZX1BBVEgsIEpTT04uc3RyaW5naWZ5KHJlZ2lzdHJ5LCBudWxsLCAyKSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAvLyBOb24tZmF0YWwgXHUyMDE0IHRoZSBtYW5hZ2UgcGFuZWwgd2lsbCBzdGlsbCB3b3JrLCB0aGUgcmVnaXN0cnkganVzdCB3b24ndCBwZXJzaXN0LlxuICAgICAgY29uc29sZS53YXJuKCdOb3RlRmxhcmU6IGNvdWxkIG5vdCB3cml0ZSB2YXVsdCByZWdpc3RyeTonLCBlcnIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgb3IgdXBkYXRlIGEgc2luZ2xlIHNpdGUgZW50cnkgZGVyaXZlZCBmcm9tIGEgYFNpdGVQcm9maWxlYC5cbiAgICogQ2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgYHNhdmVTZXR0aW5ncygpYCBzbyB0aGUgcmVnaXN0cnkgc3RheXMgaW4gc3luYy5cbiAgICovXG4gIHN0YXRpYyBhc3luYyB1cHNlcnQoXG4gICAgYXBwOiBBcHAsXG4gICAgc2l0ZTogU2l0ZVByb2ZpbGUsXG4gICAgbWFzdGVyUmVwb3NpdG9yeTogc3RyaW5nLFxuICAgIGdpdGh1Yk93bmVyOiBzdHJpbmcsXG4gICAgbWFzdGVyUmVwb3NpdG9yeVByaXZhdGU6IGJvb2xlYW4sXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHJlZ2lzdHJ5ID0gYXdhaXQgVmF1bHRSZWdpc3RyeS5sb2FkKGFwcCk7XG4gICAgY29uc3QgZW50cnk6IFJlZ2lzdHJ5RW50cnkgPSB7XG4gICAgICBpZDogc2l0ZS5pZCxcbiAgICAgIG5hbWU6IHNpdGUubmFtZSxcbiAgICAgIG1hc3RlclJlcG9zaXRvcnksXG4gICAgICBnaXRodWJPd25lcixcbiAgICAgIGdpdGh1YkJyYW5jaDogc2l0ZS5naXRodWJCcmFuY2gsXG4gICAgICBjbG91ZGZsYXJlUHJvamVjdDogc2l0ZS5jbG91ZGZsYXJlUHJvamVjdCxcbiAgICAgIHNpdGVVcmw6IHNpdGUuc2l0ZVVybCxcbiAgICAgIGhvc3RpbmdQcm92aWRlcjogc2l0ZS5ob3N0aW5nUHJvdmlkZXIsXG4gICAgICBsYXN0UHVibGlzaGVkOiBzaXRlLmxhc3RQdWJsaXNoZWQsXG4gICAgICBtYXN0ZXJSZXBvc2l0b3J5UHJpdmF0ZSxcbiAgICB9O1xuICAgIGNvbnN0IGlkeCA9IHJlZ2lzdHJ5LmVudHJpZXMuZmluZEluZGV4KChlKSA9PiBlLmlkID09PSBzaXRlLmlkKTtcbiAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgIHJlZ2lzdHJ5LmVudHJpZXNbaWR4XSA9IGVudHJ5O1xuICAgIH0gZWxzZSB7XG4gICAgICByZWdpc3RyeS5lbnRyaWVzLnB1c2goZW50cnkpO1xuICAgIH1cbiAgICBhd2FpdCBWYXVsdFJlZ2lzdHJ5LnNhdmUoYXBwLCByZWdpc3RyeSk7XG4gIH1cblxuICAvKiogUmVtb3ZlIGEgc2l0ZSBmcm9tIHRoZSByZWdpc3RyeSBieSBJRC4gKi9cbiAgc3RhdGljIGFzeW5jIHJlbW92ZShhcHA6IEFwcCwgc2l0ZUlkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCByZWdpc3RyeSA9IGF3YWl0IFZhdWx0UmVnaXN0cnkubG9hZChhcHApO1xuICAgIHJlZ2lzdHJ5LmVudHJpZXMgPSByZWdpc3RyeS5lbnRyaWVzLmZpbHRlcigoZSkgPT4gZS5pZCAhPT0gc2l0ZUlkKTtcbiAgICBhd2FpdCBWYXVsdFJlZ2lzdHJ5LnNhdmUoYXBwLCByZWdpc3RyeSk7XG4gIH1cblxuICAvKipcbiAgICogUmVidWlsZCBgU2l0ZVByb2ZpbGVgIHN0dWJzIGZyb20gcmVnaXN0cnkgZW50cmllcyB0aGF0IGFyZW4ndCBhbHJlYWR5IGluXG4gICAqIGBleGlzdGluZ1NpdGVJZHNgLiBVc2VkIGR1cmluZyByZXN0b3JlLWFmdGVyLXJlaW5zdGFsbDogY3JlYXRlcyBsaWdodHdlaWdodFxuICAgKiBwcm9maWxlcyB3aXRoIG5vIGNyZWRlbnRpYWwgZGF0YSAoY3JlZGVudGlhbHMgY29tZSBmcm9tIHRoZSBPUyBrZXljaGFpbiB2aWFcbiAgICogdGhlIHBsdWdpbidzIG5vcm1hbCBsb2FkIHBhdGgpLlxuICAgKi9cbiAgc3RhdGljIGJ1aWxkUmVzdG9yZWRQcm9maWxlcyhcbiAgICBlbnRyaWVzOiBSZWdpc3RyeUVudHJ5W10sXG4gICAgZXhpc3RpbmdTaXRlSWRzOiBTZXQ8c3RyaW5nPixcbiAgKTogUmVnaXN0cnlFbnRyeVtdIHtcbiAgICByZXR1cm4gZW50cmllcy5maWx0ZXIoKGUpID0+ICFleGlzdGluZ1NpdGVJZHMuaGFzKGUuaWQpKTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFNldHRpbmcgfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgdHlwZSB7IE5vdGVGbGFyZVNldHRpbmdzVGFiIH0gZnJvbSAnLi4vc2V0dGluZ3NUYWInO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyQmFja3VwU2VjdGlvbih0YWI6IE5vdGVGbGFyZVNldHRpbmdzVGFiLCBlbDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgY29uc3QgcyA9IHRhYi5wbHVnaW4uc2V0dGluZ3M7XG4gIGNvbnN0IGJhY2t1cEhlYWRpbmcgPSBuZXcgU2V0dGluZyhlbCk7XG4gIGJhY2t1cEhlYWRpbmcuc2V0TmFtZSgnQmFja3VwICYgU3RvcmFnZScpO1xuICBiYWNrdXBIZWFkaW5nLnNldEhlYWRpbmcoKTtcblxuICAgIGNvbnN0IGJhY2t1cFJlcG9OYW1lID0gcy5iYWNrdXAucmVwb3NpdG9yeSB8fCB0YWIucGx1Z2luLmRlZmF1bHRCYWNrdXBSZXBvc2l0b3J5KCk7XG4gICAgY29uc3QgYmFja3VwVXJsID0gYGh0dHBzOi8vZ2l0aHViLmNvbS8ke3MuZ2l0aHViT3duZXJ9LyR7YmFja3VwUmVwb05hbWV9YDtcblxuICAgIG5ldyBTZXR0aW5nKGVsKVxuICAgICAgLnNldE5hbWUoJ0dpdEh1YiByZXBvc2l0b3J5JylcbiAgICAgIC5zZXREZXNjKGBQdWJsaXNoIHJlcG86ICR7cy5naXRodWJPd25lcn0vJHtzLm1hc3RlclJlcG9zaXRvcnkgfHwgJ25vdGVmbGFyZS1zaXRlcyd9ICh5b3VyIHNpdGUgc291cmNlKS4gQmFja3VwIHJlcG86ICR7cy5naXRodWJPd25lcn0vJHtiYWNrdXBSZXBvTmFtZX0gKHlvdXIgdmF1bHQgbWlycm9yLCBrZXB0IHNlcGFyYXRlKS5gKVxuICAgICAgLmFkZFRleHQoKHQpID0+IHtcbiAgICAgICAgdC5zZXRWYWx1ZShiYWNrdXBSZXBvTmFtZSk7XG4gICAgICAgIHQuc2V0RGlzYWJsZWQodHJ1ZSk7XG4gICAgICB9KTtcblxuICAgIGNvbnN0IGxpbmtTZXR0aW5nID0gbmV3IFNldHRpbmcoZWwpXG4gICAgICAuc2V0TmFtZSgnVmlldyBiYWNrdXAgb24gR2l0SHViJylcbiAgICAgIC5zZXREZXNjKCdPcGVuIHlvdXIgcHJpdmF0ZSB2YXVsdCBtaXJyb3IgaW4gdGhlIGJyb3dzZXIuJyk7XG4gICAgbGlua1NldHRpbmcuY29udHJvbEVsLmNyZWF0ZUVsKCdhJywge1xuICAgICAgdGV4dDogJ09wZW4gUmVwb3NpdG9yeSBcdTIxOTcnLFxuICAgICAgaHJlZjogYmFja3VwVXJsLFxuICAgIH0pO1xuICAgIC8vIE9wZW4gaW4gZGVmYXVsdCBicm93c2VyIGluc3RlYWQgb2YgT2JzaWRpYW5cbiAgICBsaW5rU2V0dGluZy5jb250cm9sRWwucXVlcnlTZWxlY3RvcignYScpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB3aW5kb3cub3BlbihiYWNrdXBVcmwpO1xuICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoZWwpXG4gICAgICAuc2V0TmFtZSgnRW5hYmxlIGF1dG9tYXRpYyBiYWNrdXAnKVxuICAgICAgLnNldERlc2MoJ1NpbGVudGx5IG1pcnJvciB5b3VyIHZhdWx0IHRvIGEgcHJpdmF0ZSBHaXRIdWIgcmVwb3NpdG9yeSBpbiB0aGUgYmFja2dyb3VuZC4nKVxuICAgICAgLmFkZFRvZ2dsZSgodG9nZ2xlKSA9PiB7XG4gICAgICAgIHRvZ2dsZS5zZXRWYWx1ZShzLmVuYWJsZUJhY2t1cCk7XG4gICAgICAgIHRvZ2dsZS5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICB2b2lkIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBzLmVuYWJsZUJhY2t1cCA9IHZhbHVlO1xuICAgICAgICAgICAgaWYgKHZhbHVlICYmICFzLmJhY2t1cC5yZXBvc2l0b3J5KSB7XG4gICAgICAgICAgICAgIHMuYmFja3VwLnJlcG9zaXRvcnkgPSB0YWIucGx1Z2luLmRlZmF1bHRCYWNrdXBSZXBvc2l0b3J5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhd2FpdCB0YWIucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgdGFiLnJlbmRlcigpO1xuICAgICAgICAgIH0pKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICBpZiAocy5lbmFibGVCYWNrdXApIHtcbiAgICAgIG5ldyBTZXR0aW5nKGVsKVxuICAgICAgICAuc2V0TmFtZSgnUmVwb3NpdG9yeSB2aXNpYmlsaXR5JylcbiAgICAgICAgLnNldERlc2MoJ1ByaXZhdGUga2VlcHMgeW91ciBub3RlcyBjb25maWRlbnRpYWwuIFB1YmxpYyBtYWtlcyB0aGUgYmFja3VwIHJlcG8gdmlzaWJsZSBvbiBHaXRIdWIuJylcbiAgICAgICAgLmFkZERyb3Bkb3duKChkKSA9PiB7XG4gICAgICAgICAgZC5hZGRPcHRpb24oJ3ByaXZhdGUnLCAnXHVEODNEXHVERDEyIFByaXZhdGUgKHJlY29tbWVuZGVkKScpO1xuICAgICAgICAgIGQuYWRkT3B0aW9uKCdwdWJsaWMnLCAnXHVEODNDXHVERjEwIFB1YmxpYycpO1xuICAgICAgICAgIGQuc2V0VmFsdWUocy5iYWNrdXAucmVwb1Zpc2liaWxpdHkgPz8gJ3ByaXZhdGUnKTtcbiAgICAgICAgICBkLm9uQ2hhbmdlKCh2KSA9PiB7XG4gICAgICAgICAgICB2b2lkIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgIHMuYmFja3VwLnJlcG9WaXNpYmlsaXR5ID0gdiBhcyAncHJpdmF0ZScgfCAncHVibGljJztcbiAgICAgICAgICAgICAgYXdhaXQgdGFiLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICBuZXcgU2V0dGluZyhlbClcbiAgICAgICAgLnNldE5hbWUoJ0JhY2sgdXAgYWZ0ZXIgY2hhbmdlcycpXG4gICAgICAgIC5zZXREZXNjKCdSdW4gYSBiYWNrdXAgMzAgc2Vjb25kcyBhZnRlciB2YXVsdCBmaWxlcyBhcmUgbW9kaWZpZWQuJylcbiAgICAgICAgLmFkZFRvZ2dsZSgodG9nZ2xlKSA9PiB7XG4gICAgICAgICAgdG9nZ2xlLnNldFZhbHVlKHMuYmFja3VwLmJhY2t1cE9uQ2hhbmdlKTtcbiAgICAgICAgICB0b2dnbGUub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB2b2lkIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgIHMuYmFja3VwLmJhY2t1cE9uQ2hhbmdlID0gdmFsdWU7XG4gICAgICAgICAgICAgIGF3YWl0IHRhYi5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgbmV3IFNldHRpbmcoZWwpXG4gICAgICAgIC5zZXROYW1lKCdTY2hlZHVsZScpXG4gICAgICAgIC5zZXREZXNjKCdQZXJpb2RpYyBiYWNrdXBzIHJ1biB3aGlsZSBPYnNpZGlhbiBpcyBvcGVuLicpXG4gICAgICAgIC5hZGREcm9wZG93bigoZHJvcGRvd24pID0+IHtcbiAgICAgICAgICBkcm9wZG93bi5hZGRPcHRpb24oJzAnLCAnT2ZmJyk7XG4gICAgICAgICAgZHJvcGRvd24uYWRkT3B0aW9uKCcxNScsICdFdmVyeSAxNSBtaW51dGVzJyk7XG4gICAgICAgICAgZHJvcGRvd24uYWRkT3B0aW9uKCczMCcsICdFdmVyeSAzMCBtaW51dGVzJyk7XG4gICAgICAgICAgZHJvcGRvd24uYWRkT3B0aW9uKCc2MCcsICdFdmVyeSBob3VyJyk7XG4gICAgICAgICAgZHJvcGRvd24uYWRkT3B0aW9uKCczNjAnLCAnRXZlcnkgNiBob3VycycpO1xuICAgICAgICAgIGRyb3Bkb3duLmFkZE9wdGlvbignMTQ0MCcsICdEYWlseScpO1xuICAgICAgICAgIGRyb3Bkb3duLnNldFZhbHVlKFN0cmluZyhzLmJhY2t1cC5pbnRlcnZhbE1pbnV0ZXMpKTtcbiAgICAgICAgICBkcm9wZG93bi5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHZvaWQgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgcy5iYWNrdXAuaW50ZXJ2YWxNaW51dGVzID0gTnVtYmVyKHZhbHVlKTtcbiAgICAgICAgICAgICAgYXdhaXQgdGFiLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICBjb25zdCBiYWNrdXBTdGF0dXMgPSBzLmJhY2t1cC5sYXN0QmFja3VwRXJyb3JcbiAgICAgICAgPyBgTmVlZHMgYXR0ZW50aW9uOiAke3MuYmFja3VwLmxhc3RCYWNrdXBFcnJvcn1gXG4gICAgICAgIDogcy5iYWNrdXAubGFzdEJhY2t1cEF0XG4gICAgICAgICAgPyBgTGFzdCBiYWNrdXA6ICR7bmV3IERhdGUocy5iYWNrdXAubGFzdEJhY2t1cEF0KS50b0xvY2FsZVN0cmluZygpfWBcbiAgICAgICAgICA6ICdObyBiYWNrdXAgaGFzIHJ1biB5ZXQuJztcblxuICAgICAgbmV3IFNldHRpbmcoZWwpXG4gICAgICAgIC5zZXROYW1lKCdCYWNrdXAgc3RhdHVzJylcbiAgICAgICAgLnNldERlc2MoYmFja3VwU3RhdHVzKVxuICAgICAgICAuYWRkQnV0dG9uKChidXR0b24pID0+IHtcbiAgICAgICAgICBidXR0b24uc2V0QnV0dG9uVGV4dCgnQmFjayB1cCBub3cnKS5zZXRDdGEoKTtcbiAgICAgICAgICBidXR0b24ub25DbGljaygoKSA9PiB7XG4gICAgICAgICAgICB2b2lkIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgIGJ1dHRvbi5zZXREaXNhYmxlZCh0cnVlKS5zZXRCdXR0b25UZXh0KCdCYWNraW5nIHVwXHUyMDI2Jyk7XG4gICAgICAgICAgICAgIGF3YWl0IHRhYi5wbHVnaW4uZG9CYWNrdXAoZmFsc2UpO1xuICAgICAgICAgICAgICB0YWIucmVuZGVyKCk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCAiaW1wb3J0IHsgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB0eXBlIHsgTm90ZUZsYXJlU2V0dGluZ3NUYWIgfSBmcm9tICcuLi9zZXR0aW5nc1RhYic7XG5pbXBvcnQgeyBFZGl0U2l0ZU1vZGFsLCBSZW1vdmVTaXRlTW9kYWwsIEFkZFNpdGVNb2RhbCB9IGZyb20gJy4uL21vZGFscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJTaXRlc1NlY3Rpb24odGFiOiBOb3RlRmxhcmVTZXR0aW5nc1RhYiwgZWw6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gIGNvbnN0IHMgPSB0YWIucGx1Z2luLnNldHRpbmdzO1xuICBpZiAocy5lbmFibGVQdWJsaXNoKSB7XG4gICAgY29uc3Qgc2l0ZXNIZWFkaW5nID0gbmV3IFNldHRpbmcoZWwpO1xuICAgIHNpdGVzSGVhZGluZy5zZXROYW1lKCdTaXRlcycpO1xuICAgIHNpdGVzSGVhZGluZy5zZXRIZWFkaW5nKCk7XG5cbiAgICAgIG5ldyBTZXR0aW5nKGVsKVxuICAgICAgICAuc2V0TmFtZSgnUGFuZWwgbG9jYXRpb24nKVxuICAgICAgICAuc2V0RGVzYygnV2hlcmUgdGhlIE5vdGVGbGFyZSBwYW5lbCBvcGVucyBieSBkZWZhdWx0LicpXG4gICAgICAgIC5hZGREcm9wZG93bigoZCkgPT4ge1xuICAgICAgICAgIGQuYWRkT3B0aW9uKCdsZWZ0JywgJ0xlZnQgc2lkZWJhcicpO1xuICAgICAgICAgIGQuYWRkT3B0aW9uKCdyaWdodCcsICdSaWdodCBzaWRlYmFyJyk7XG4gICAgICAgICAgZC5hZGRPcHRpb24oJ3RhYicsICdNYWluIHdvcmtzcGFjZSB0YWInKTtcbiAgICAgICAgICBkLnNldFZhbHVlKHMuZGVmYXVsdFZpZXdMb2NhdGlvbiA/PyAnbGVmdCcpO1xuICAgICAgICAgIGQub25DaGFuZ2UoKHYpID0+IHtcbiAgICAgICAgICAgIHZvaWQgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgcy5kZWZhdWx0Vmlld0xvY2F0aW9uID0gdiBhcyAnbGVmdCcgfCAncmlnaHQnIHwgJ3RhYic7XG4gICAgICAgICAgICAgIGF3YWl0IHRhYi5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgaWYgKHMuc2l0ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGVsLmNyZWF0ZUVsKCdwJywge1xuICAgICAgICAgIGNsczogJ3NldHRpbmctaXRlbS1kZXNjcmlwdGlvbicsXG4gICAgICAgICAgdGV4dDogJ05vIHNpdGVzIHlldCBcdTIwMTQgYWRkIG9uZSB0byBnZXQgc3RhcnRlZC4nLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAoY29uc3Qgc2l0ZSBvZiBzLnNpdGVzKSB7XG4gICAgICAgICAgY29uc3QgaXNMaXZlID0gc2l0ZS5pc1B1Ymxpc2hlZDtcbiAgICAgICAgICBjb25zdCBwcm92aWRlckxhYmVsID1cbiAgICAgICAgICAgIHNpdGUuaG9zdGluZ1Byb3ZpZGVyID09PSAnY2xvdWRmbGFyZSdcbiAgICAgICAgICAgICAgPyAnQ2xvdWRmbGFyZSBQYWdlcydcbiAgICAgICAgICAgICAgOiAnR2l0SHViIFBhZ2VzJztcbiAgICAgICAgICBjb25zdCBzdGF0dXNUZXh0ID0gc2l0ZS5sYXN0UHVibGlzaGVkXG4gICAgICAgICAgICA/IGBMYXN0IHB1Ymxpc2hlZCAke25ldyBEYXRlKHNpdGUubGFzdFB1Ymxpc2hlZCkudG9Mb2NhbGVTdHJpbmcoKX0gXHUwMEI3ICR7c2l0ZS5sYXN0Tm90ZUNvdW50fSBub3Rlc2BcbiAgICAgICAgICAgIDogJ05vdCBwdWJsaXNoZWQgeWV0JztcblxuICAgICAgICAgIGNvbnN0IHNpdGVTZXR0aW5nID0gbmV3IFNldHRpbmcoZWwpXG4gICAgICAgICAgICAuc2V0TmFtZShzaXRlLm5hbWUgfHwgc2l0ZS5jbG91ZGZsYXJlUHJvamVjdCB8fCAnU2l0ZScpXG4gICAgICAgICAgICAuc2V0RGVzYyhgJHtpc0xpdmUgPyAnXHVEODNEXHVERkUyIExpdmUnIDogJ1x1MjZBQSBPZmZsaW5lJ30gXHUwMEI3ICR7cHJvdmlkZXJMYWJlbH0gXHUwMEI3ICR7c3RhdHVzVGV4dH1gKTtcblxuICAgICAgICAgIGNvbnN0IGNmQ29ubmVjdGVkID0gISF0YWIucGx1Z2luLnNldHRpbmdzLmNsb3VkZmxhcmVUb2tlbjtcbiAgICAgICAgICBzaXRlU2V0dGluZy5hZGREcm9wZG93bigoZCkgPT4ge1xuICAgICAgICAgICAgZC5hZGRPcHRpb24oJ2dpdGh1Yi1wYWdlcycsICdHaXRIdWIgUGFnZXMnKTtcbiAgICAgICAgICAgIGlmIChjZkNvbm5lY3RlZCkge1xuICAgICAgICAgICAgICBkLmFkZE9wdGlvbignY2xvdWRmbGFyZScsICdDbG91ZGZsYXJlIFBhZ2VzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBPbmx5IHNldCAnY2xvdWRmbGFyZScgaWYgdGhlIG9wdGlvbiBleGlzdHM7IG90aGVyd2lzZSBmYWxsIGJhY2sgdG8gZ2l0aHViLXBhZ2VzLlxuICAgICAgICAgICAgY29uc3Qgc3RvcmVkUHJvdmlkZXIgPSBzaXRlLmhvc3RpbmdQcm92aWRlciB8fCAnZ2l0aHViLXBhZ2VzJztcbiAgICAgICAgICAgIGQuc2V0VmFsdWUoY2ZDb25uZWN0ZWQgPyBzdG9yZWRQcm92aWRlciA6ICdnaXRodWItcGFnZXMnKTtcbiAgICAgICAgICAgIGQub25DaGFuZ2UoKHYpID0+IHtcbiAgICAgICAgICAgICAgdm9pZCAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNpdGUuaG9zdGluZ1Byb3ZpZGVyID0gdiBhcyAnZ2l0aHViLXBhZ2VzJyB8ICdjbG91ZGZsYXJlJztcbiAgICAgICAgICAgICAgICBhd2FpdCB0YWIucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgIHRhYi5yZW5kZXIoKTtcbiAgICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYgKHNpdGUuc2l0ZVVybCkge1xuICAgICAgICAgICAgc2l0ZVNldHRpbmcuYWRkRXh0cmFCdXR0b24oKGIpID0+XG4gICAgICAgICAgICAgIGJcbiAgICAgICAgICAgICAgICAuc2V0SWNvbignZXh0ZXJuYWwtbGluaycpXG4gICAgICAgICAgICAgICAgLnNldFRvb2x0aXAoJ09wZW4gc2l0ZScpXG4gICAgICAgICAgICAgICAgLm9uQ2xpY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oYGh0dHBzOi8vJHtzaXRlLnNpdGVVcmx9YCwgJ19ibGFuaycpO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzaXRlU2V0dGluZy5hZGRCdXR0b24oKGIpID0+XG4gICAgICAgICAgICBiLnNldEJ1dHRvblRleHQoJ0VkaXQnKS5vbkNsaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgbmV3IEVkaXRTaXRlTW9kYWwodGFiLmFwcCwgdGFiLnBsdWdpbiwgc2l0ZSwgKCkgPT4gdGFiLnJlbmRlcigpKS5vcGVuKCk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgc2l0ZVNldHRpbmcuYWRkQnV0dG9uKChiKSA9PiB7XG4gICAgICAgICAgICBiLnNldEJ1dHRvblRleHQoJ1JlbW92ZScpO1xuICAgICAgICAgICAgYi5idXR0b25FbC5hZGRDbGFzcygnbW9kLXdhcm5pbmcnKTtcbiAgICAgICAgICAgIGIub25DbGljaygoKSA9PiB7XG4gICAgICAgICAgICAgIG5ldyBSZW1vdmVTaXRlTW9kYWwodGFiLmFwcCwgdGFiLnBsdWdpbiwgc2l0ZSwgKCkgPT4gdGFiLnJlbmRlcigpKS5vcGVuKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBuZXcgU2V0dGluZyhlbCkuYWRkQnV0dG9uKChiKSA9PlxuICAgICAgICBiXG4gICAgICAgICAgLnNldEJ1dHRvblRleHQoJ0FkZCBzaXRlJylcbiAgICAgICAgICAuc2V0Q3RhKClcbiAgICAgICAgICAub25DbGljaygoKSA9PiB7XG4gICAgICAgICAgICBuZXcgQWRkU2l0ZU1vZGFsKHRhYi5hcHAsIHRhYi5wbHVnaW4sICgpID0+IHRhYi5yZW5kZXIoKSkub3BlbigpO1xuICAgICAgICAgIH0pLFxuICAgICAgKTtcbiAgICB9XG59XG4iLCAiaW1wb3J0IHsgQXBwLCBNb2RhbCwgTm90aWNlLCBTZXR0aW5nIH0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IHR5cGUgTm90ZUZsYXJlUGx1Z2luIGZyb20gJy4uLy4uLy4uLy4uL21haW4nO1xuaW1wb3J0IHsgU2l0ZVByb2ZpbGUgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3R5cGVzJztcbmltcG9ydCB7IFBhdGhTdWdnZXN0TW9kYWwgfSBmcm9tICcuL3BhdGhTdWdnZXN0TW9kYWwnO1xuaW1wb3J0IHsgc2x1Z2lmeSwgcHJvdmlzaW9uU2l0ZSB9IGZyb20gJy4vaGVscGVycyc7XG5cbmV4cG9ydCBjbGFzcyBBZGRTaXRlTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XG4gIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwcml2YXRlIHBsdWdpbjogTm90ZUZsYXJlUGx1Z2luLCBwcml2YXRlIG9uRG9uZTogKCkgPT4gdm9pZCkge1xuICAgIHN1cGVyKGFwcCk7XG4gIH1cblxuICBvbk9wZW4oKTogdm9pZCB7XG4gICAgdGhpcy50aXRsZUVsLnNldFRleHQoJ0FkZCBhIHNpdGUnKTtcbiAgICBsZXQgbmFtZSA9ICcnO1xuICAgIGxldCBzY29wZTogJ3ZhdWx0JyB8ICdzZWxlY3RlZCcgPSAndmF1bHQnO1xuICAgIGxldCBwYXRoczogc3RyaW5nW10gPSBbXTtcbiAgICBsZXQgYXV0aG9yTmFtZSA9ICcnO1xuICAgIGxldCBzaWRlYmFyVGl0bGUgPSAnJztcbiAgICBsZXQgc2l0ZURlc2NyaXB0aW9uID0gJyc7XG5cbiAgICBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbClcbiAgICAgIC5zZXROYW1lKCdTaXRlIG5hbWUnKVxuICAgICAgLnNldERlc2MoJ1VzZWQgYXMgdGhlIEdpdEh1YiByZXBvc2l0b3J5IG5hbWUgYW5kIHNpdGUgaWRlbnRpZmllci4nKVxuICAgICAgLmFkZFRleHQodCA9PiB7XG4gICAgICAgIHQuc2V0UGxhY2Vob2xkZXIoJ215LWJsb2cnKTtcbiAgICAgICAgdC5vbkNoYW5nZSh2ID0+IHsgbmFtZSA9IHY7IH0pO1xuICAgICAgfSk7XG5cbiAgICBsZXQgaG9zdGluZ1Byb3ZpZGVyOiBTaXRlUHJvZmlsZVsnaG9zdGluZ1Byb3ZpZGVyJ10gPSAnZ2l0aHViLXBhZ2VzJztcbiAgICBjb25zdCBjZkNvbm5lY3RlZCA9ICEhdGhpcy5wbHVnaW4uc2V0dGluZ3MuY2xvdWRmbGFyZVRva2VuO1xuXG4gICAgbmV3IFNldHRpbmcodGhpcy5jb250ZW50RWwpXG4gICAgICAuc2V0TmFtZSgnSG9zdGluZyBwcm92aWRlcicpXG4gICAgICAuc2V0RGVzYygnV2hlcmUgdG8gaG9zdCB0aGlzIHNpdGUuJylcbiAgICAgIC5hZGREcm9wZG93bihkID0+IHtcbiAgICAgICAgZC5hZGRPcHRpb24oJ2dpdGh1Yi1wYWdlcycsICdHaXRIdWIgUGFnZXMnKTtcbiAgICAgICAgaWYgKGNmQ29ubmVjdGVkKSB7XG4gICAgICAgICAgZC5hZGRPcHRpb24oJ2Nsb3VkZmxhcmUnLCAnQ2xvdWRmbGFyZSBQYWdlcycpO1xuICAgICAgICB9XG4gICAgICAgIGQuc2V0VmFsdWUoaG9zdGluZ1Byb3ZpZGVyKTtcbiAgICAgICAgZC5vbkNoYW5nZSh2ID0+IHtcbiAgICAgICAgICBob3N0aW5nUHJvdmlkZXIgPSB2IGFzIFNpdGVQcm9maWxlWydob3N0aW5nUHJvdmlkZXInXTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKVxuICAgICAgLnNldE5hbWUoJ1B1Ymxpc2ggc2NvcGUnKVxuICAgICAgLnNldERlc2MoJ0NvbmZpZ3VyZSB3aGF0IHRvIHB1Ymxpc2g6IHRoZSBlbnRpcmUgdmF1bHQgb3Igc2VsZWN0ZWQgZmlsZXMvZm9sZGVycy4nKVxuICAgICAgLmFkZERyb3Bkb3duKGQgPT4ge1xuICAgICAgICBkLmFkZE9wdGlvbigndmF1bHQnLCAnRnVsbCBWYXVsdCcpO1xuICAgICAgICBkLmFkZE9wdGlvbignc2VsZWN0ZWQnLCAnU2VsZWN0ZWQgRmlsZXMvRm9sZGVycycpO1xuICAgICAgICBkLnNldFZhbHVlKCd2YXVsdCcpO1xuICAgICAgICBkLm9uQ2hhbmdlKHYgPT4ge1xuICAgICAgICAgIHNjb3BlID0gdiBhcyAndmF1bHQnIHwgJ3NlbGVjdGVkJztcbiAgICAgICAgICB1cGRhdGVWaXNpYmlsaXR5KCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICBjb25zdCBwYXRoc0NvbnRhaW5lciA9IHRoaXMuY29udGVudEVsLmNyZWF0ZURpdignbm90ZWZsYXJlLXBhdGhzLWNvbnRhaW5lcicpO1xuICAgIFxuICAgIGNvbnN0IHJlbmRlclBhdGhzID0gKCkgPT4ge1xuICAgICAgcGF0aHNDb250YWluZXIuZW1wdHkoKTtcbiAgICAgIGlmIChzY29wZSA9PT0gJ3ZhdWx0Jykge1xuICAgICAgICBwYXRoc0NvbnRhaW5lci5zZXRDc3NTdHlsZXMoeyBkaXNwbGF5OiAnbm9uZScgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHBhdGhzQ29udGFpbmVyLnNldENzc1N0eWxlcyh7IGRpc3BsYXk6ICdibG9jaycgfSk7XG4gICAgICBcbiAgICAgIGlmIChwYXRocy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcGF0aHNDb250YWluZXIuY3JlYXRlRWwoJ3AnLCB7IHRleHQ6ICdObyBmaWxlcyBvciBmb2xkZXJzIHNlbGVjdGVkLicsIGNsczogJ25vdGVmbGFyZS1tdXRlZCcgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBsaXN0ID0gcGF0aHNDb250YWluZXIuY3JlYXRlRWwoJ3VsJywgeyBjbHM6ICdub3RlZmxhcmUtcGF0aC1saXN0JyB9KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXRocy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGxpID0gbGlzdC5jcmVhdGVFbCgnbGknKTtcbiAgICAgICAgICBsaS5zZXRDc3NTdHlsZXMoeyBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Cb3R0b206ICc0cHgnIH0pO1xuICAgICAgICAgIGxpLmNyZWF0ZVNwYW4oeyB0ZXh0OiBwYXRoc1tpXSB9KTtcbiAgICAgICAgICBjb25zdCByZW1vdmVCdG4gPSBsaS5jcmVhdGVFbCgnYnV0dG9uJywgeyB0ZXh0OiAnXHUyNzE1JyB9KTtcbiAgICAgICAgICByZW1vdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBwYXRocy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICByZW5kZXJQYXRocygpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGFkZFJvdyA9IHBhdGhzQ29udGFpbmVyLmNyZWF0ZURpdignbm90ZWZsYXJlLWFkZC1wYXRoLXJvdycpO1xuICAgICAgYWRkUm93LnNldENzc1N0eWxlcyh7IG1hcmdpblRvcDogJzhweCcgfSk7XG4gICAgICBcbiAgICAgIGNvbnN0IGFkZEJ0biA9IGFkZFJvdy5jcmVhdGVFbCgnYnV0dG9uJywgeyB0ZXh0OiAnQnJvd3NlIFZhdWx0Li4uJyB9KTtcbiAgICAgIGFkZEJ0bi5zZXRDc3NTdHlsZXMoeyB3aWR0aDogJzEwMCUnIH0pO1xuICAgICAgYWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBuZXcgUGF0aFN1Z2dlc3RNb2RhbCh0aGlzLmFwcCwgKHNlbGVjdGVkUGF0aCkgPT4ge1xuICAgICAgICAgIGlmIChzZWxlY3RlZFBhdGgudHJpbSgpICYmICFwYXRocy5pbmNsdWRlcyhzZWxlY3RlZFBhdGgudHJpbSgpKSkge1xuICAgICAgICAgICAgcGF0aHMucHVzaChzZWxlY3RlZFBhdGgudHJpbSgpKTtcbiAgICAgICAgICAgIHJlbmRlclBhdGhzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KS5vcGVuKCk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgY29uc3QgdXBkYXRlVmlzaWJpbGl0eSA9ICgpID0+IHtcbiAgICAgIHJlbmRlclBhdGhzKCk7XG4gICAgfTtcblxuICAgIG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKVxuICAgICAgLnNldE5hbWUoJ0F1dGhvciBuYW1lJylcbiAgICAgIC5zZXREZXNjKCdBdXRob3IgbmFtZSB3cml0dGVuIHRvIHNpdGUgbWV0YWRhdGEgKG9wdGlvbmFsKS4nKVxuICAgICAgLmFkZFRleHQodCA9PiB7XG4gICAgICAgIHQuc2V0UGxhY2Vob2xkZXIoJ1lvdXIgTmFtZScpO1xuICAgICAgICB0Lm9uQ2hhbmdlKHYgPT4geyBhdXRob3JOYW1lID0gdi50cmltKCk7IH0pO1xuICAgICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbClcbiAgICAgIC5zZXROYW1lKCdTaWRlYmFyIHRpdGxlJylcbiAgICAgIC5zZXREZXNjKCdUaXRsZSBzaG93biBpbiB0aGUgc2lkZWJhciAob3B0aW9uYWwsIGRlZmF1bHRzIHRvIHNpdGUgbmFtZSkuJylcbiAgICAgIC5hZGRUZXh0KHQgPT4ge1xuICAgICAgICB0LnNldFBsYWNlaG9sZGVyKCdNeSBEaWdpdGFsIEdhcmRlbicpO1xuICAgICAgICB0Lm9uQ2hhbmdlKHYgPT4geyBzaWRlYmFyVGl0bGUgPSB2LnRyaW0oKTsgfSk7XG4gICAgICB9KTtcblxuICAgIG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKVxuICAgICAgLnNldE5hbWUoJ1NpdGUgZGVzY3JpcHRpb24nKVxuICAgICAgLnNldERlc2MoJ0Rlc2NyaXB0aW9uIG9mIHlvdXIgc2l0ZSAob3B0aW9uYWwpLicpXG4gICAgICAuYWRkVGV4dCh0ID0+IHtcbiAgICAgICAgdC5zZXRQbGFjZWhvbGRlcignTm90ZXMgYW5kIHRob3VnaHRzXHUyMDI2Jyk7XG4gICAgICAgIHQub25DaGFuZ2UodiA9PiB7IHNpdGVEZXNjcmlwdGlvbiA9IHYudHJpbSgpOyB9KTtcbiAgICAgIH0pO1xuXG4gICAgdXBkYXRlVmlzaWJpbGl0eSgpO1xuXG4gICAgY29uc3QgZXJyb3JFbCA9IHRoaXMuY29udGVudEVsLmNyZWF0ZUVsKCdwJywgeyBjbHM6ICdzZXR0aW5nLWl0ZW0tZGVzY3JpcHRpb24nIH0pO1xuICAgIGVycm9yRWwuc2V0Q3NzU3R5bGVzKHsgY29sb3I6ICd2YXIoLS10ZXh0LWVycm9yKScgfSk7XG4gICAgZXJyb3JFbC5oaWRlKCk7XG5cbiAgICBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbClcbiAgICAgIC5hZGRCdXR0b24oYiA9PiBiLnNldEJ1dHRvblRleHQoJ0NhbmNlbCcpLm9uQ2xpY2soKCkgPT4gdGhpcy5jbG9zZSgpKSlcbiAgICAgIC5hZGRCdXR0b24oYiA9PiB7XG4gICAgICAgIGIuc2V0QnV0dG9uVGV4dCgnQ3JlYXRlIHNpdGUnKS5zZXRDdGEoKTtcbiAgICAgICAgYi5vbkNsaWNrKCgpID0+IHsgdm9pZCAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGlmICghc2x1Z2lmeShuYW1lKSkge1xuICAgICAgICAgICAgZXJyb3JFbC5zZXRUZXh0KCdQbGVhc2UgZW50ZXIgYSBzaXRlIG5hbWUuJyk7XG4gICAgICAgICAgICBlcnJvckVsLnNob3coKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZXJyb3JFbC5oaWRlKCk7XG4gICAgICAgICAgYi5zZXREaXNhYmxlZCh0cnVlKS5zZXRCdXR0b25UZXh0KCdDcmVhdGluZ1x1MjAyNicpO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBzaXRlID0gYXdhaXQgcHJvdmlzaW9uU2l0ZSh0aGlzLnBsdWdpbiwgbmFtZSwge1xuICAgICAgICAgICAgICBwdWJsaXNoU2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgICBwdWJsaXNoUGF0aHM6IHBhdGhzLFxuICAgICAgICAgICAgICBhdXRob3JOYW1lLFxuICAgICAgICAgICAgICBzaWRlYmFyVGl0bGUsXG4gICAgICAgICAgICAgIHNpdGVEZXNjcmlwdGlvbixcbiAgICAgICAgICAgIH0sIGhvc3RpbmdQcm92aWRlcik7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zaXRlcy5wdXNoKHNpdGUpO1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuYWN0aXZlU2l0ZUlkID0gc2l0ZS5pZDtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgbmV3IE5vdGljZShgU2l0ZSBcdTIwMUMke3NpdGUubmFtZX1cdTIwMUQgY3JlYXRlZC5gKTtcbiAgICAgICAgICAgIHRoaXMub25Eb25lKCk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyOiB1bmtub3duKSB7XG4gICAgICAgICAgICBlcnJvckVsLnNldFRleHQoKGVyciBhcyBFcnJvcikubWVzc2FnZSk7XG4gICAgICAgICAgICBlcnJvckVsLnNob3coKTtcbiAgICAgICAgICAgIGIuc2V0RGlzYWJsZWQoZmFsc2UpLnNldEJ1dHRvblRleHQoJ0NyZWF0ZSBzaXRlJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSgpOyB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgb25DbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnRlbnRFbC5lbXB0eSgpO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQXBwLCBNb2RhbCwgTm90aWNlLCBTZXR0aW5nIH0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IHR5cGUgTm90ZUZsYXJlUGx1Z2luIGZyb20gJy4uLy4uLy4uLy4uL21haW4nO1xuaW1wb3J0IHsgU2l0ZVByb2ZpbGUgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3R5cGVzJztcbmltcG9ydCB7IEdpdEh1YkFwaSB9IGZyb20gJy4uLy4uLy4uL2FwaS9naXRodWJBcGknO1xuaW1wb3J0IHsgQ2xvdWRmbGFyZUFwaSB9IGZyb20gJy4uLy4uLy4uL2FwaS9jbG91ZGZsYXJlQXBpJztcbmltcG9ydCB7IFZhdWx0UmVnaXN0cnkgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3ZhdWx0UmVnaXN0cnknO1xuXG5leHBvcnQgY2xhc3MgUmVtb3ZlU2l0ZU1vZGFsIGV4dGVuZHMgTW9kYWwge1xuICBwcml2YXRlIGRlbGV0aW5nID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgYXBwOiBBcHAsXG4gICAgcHJpdmF0ZSBwbHVnaW46IE5vdGVGbGFyZVBsdWdpbixcbiAgICBwcml2YXRlIHNpdGU6IFNpdGVQcm9maWxlLFxuICAgIHByaXZhdGUgb25Eb25lOiAoKSA9PiB2b2lkLFxuICApIHtcbiAgICBzdXBlcihhcHApO1xuICB9XG5cbiAgb25PcGVuKCk6IHZvaWQge1xuICAgIHRoaXMudGl0bGVFbC5zZXRUZXh0KCdEZWxldGUgdGhpcyBzaXRlPycpO1xuICAgIGNvbnN0IHNpdGVOYW1lID0gdGhpcy5zaXRlLm5hbWUgfHwgdGhpcy5zaXRlLmdpdGh1YlJlcG8gfHwgJ1VubmFtZWQgc2l0ZSc7XG5cbiAgICB0aGlzLmNvbnRlbnRFbC5jcmVhdGVFbCgncCcsIHtcbiAgICAgIHRleHQ6IGBcIiR7c2l0ZU5hbWV9XCIgd2lsbCBiZSBwZXJtYW5lbnRseSBkZWxldGVkIGZyb20gTm90ZUZsYXJlLmAsXG4gICAgfSk7XG5cbiAgICAvLyBTaG93IGEgY2xlYXIsIHByb21pbmVudCBzdW1tYXJ5IG9mIHdoYXQgdGhlIGRlbGV0ZSBvcGVyYXRpb24gd2lsbCBkb1xuICAgIGNvbnN0IHN1bW1hcnlEaXYgPSB0aGlzLmNvbnRlbnRFbC5jcmVhdGVEaXYoKTtcbiAgICBzdW1tYXJ5RGl2LnNldENzc1N0eWxlcyh7XG4gICAgICBtYXJnaW5Ub3A6ICc4cHgnLFxuICAgICAgcGFkZGluZzogJzEwcHggMTJweCcsXG4gICAgICBib3JkZXJMZWZ0OiAnNHB4IHNvbGlkIHZhcigtLXRleHQtd2FybmluZyknLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpJyxcbiAgICAgIGJvcmRlclJhZGl1czogJ3ZhcigtLXJhZGl1cy1zKScsXG4gICAgICBtYXJnaW5Cb3R0b206ICcxMHB4JyxcbiAgICB9KTtcbiAgICBzdW1tYXJ5RGl2LmNyZWF0ZUVsKCdzdHJvbmcnLCB7IHRleHQ6ICdXaGF0IHdpbGwgYmUgZGVsZXRlZDonIH0pO1xuICAgIGNvbnN0IHN0ZXBzTGlzdCA9IHN1bW1hcnlEaXYuY3JlYXRlRWwoJ3VsJyk7XG4gICAgc3RlcHNMaXN0LnNldENzc1N0eWxlcyh7IG1hcmdpbjogJzZweCAwIDAgMCcsIHBhZGRpbmdMZWZ0OiAnMS4yZW0nIH0pO1xuICAgIGNvbnN0IGdoU3RlcCA9IHN0ZXBzTGlzdC5jcmVhdGVFbCgnbGknKTtcbiAgICBnaFN0ZXAuc2V0VGV4dCgnXHUyNzA1IFNpdGUgZm9sZGVyIHJlbW92ZWQgZnJvbSBHaXRIdWIgcmVwb3NpdG9yeSAodmlhIEFQSSknKTtcbiAgICBpZiAodGhpcy5zaXRlLmhvc3RpbmdQcm92aWRlciA9PT0gJ2Nsb3VkZmxhcmUnKSB7XG4gICAgICBjb25zdCBjZlN0ZXAgPSBzdGVwc0xpc3QuY3JlYXRlRWwoJ2xpJyk7XG4gICAgICBjZlN0ZXAuc2V0VGV4dCgnXHUyNzA1IENsb3VkZmxhcmUgUGFnZXMgcHJvamVjdCBkZWxldGVkICh2aWEgQVBJKScpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGVwc0xpc3QuY3JlYXRlRWwoJ2xpJykuc2V0VGV4dCgnXHUyNkEwXHVGRTBGIEdpdEh1YiBQYWdlcyBkZXBsb3ltZW50IFx1MjAxNCBOT1QgYXV0b21hdGljYWxseSByZW1vdmVkLiBEaXNhYmxlIGl0IG1hbnVhbGx5OicpO1xuICAgICAgY29uc3QgbWFudWFsTm90ZSA9IHN0ZXBzTGlzdC5jcmVhdGVFbCgnbGknKTtcbiAgICAgIG1hbnVhbE5vdGUuc2V0Q3NzU3R5bGVzKHsgbGlzdFN0eWxlVHlwZTogJ25vbmUnLCBwYWRkaW5nTGVmdDogJzFlbScsIGNvbG9yOiAndmFyKC0tdGV4dC1tdXRlZCknLCBmb250U2l6ZTogJ3ZhcigtLWZvbnQtdWktc21hbGxlciknIH0pO1xuICAgICAgbWFudWFsTm90ZS5zZXRUZXh0KCdHaXRIdWIgcmVwbyBcdTIxOTIgU2V0dGluZ3MgXHUyMTkyIFBhZ2VzIFx1MjE5MiBTb3VyY2UgXHUyMTkyIE5vbmUgXHUyMTkyIFNhdmUnKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcm9ncmVzc0VsID0gdGhpcy5jb250ZW50RWwuY3JlYXRlRWwoJ3AnLCB7IGNsczogJ3NldHRpbmctaXRlbS1kZXNjcmlwdGlvbicgfSk7XG4gICAgcHJvZ3Jlc3NFbC5oaWRlKCk7XG5cbiAgICBjb25zdCBlcnJvckVsID0gdGhpcy5jb250ZW50RWwuY3JlYXRlRWwoJ3AnLCB7IGNsczogJ3NldHRpbmctaXRlbS1kZXNjcmlwdGlvbicgfSk7XG4gICAgZXJyb3JFbC5zZXRDc3NTdHlsZXMoeyBjb2xvcjogJ3ZhcigtLXRleHQtZXJyb3IpJyB9KTtcbiAgICBlcnJvckVsLmhpZGUoKTtcblxuICAgIG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKVxuICAgICAgLmFkZEJ1dHRvbigoYikgPT4gYi5zZXRCdXR0b25UZXh0KCdDYW5jZWwnKS5vbkNsaWNrKCgpID0+IHRoaXMuY2xvc2UoKSkpXG4gICAgICAuYWRkQnV0dG9uKChiKSA9PiB7XG4gICAgICAgIGIuc2V0QnV0dG9uVGV4dCgnRGVsZXRlJyk7XG4gICAgICAgIGIuYnV0dG9uRWwuYWRkQ2xhc3MoJ21vZC13YXJuaW5nJyk7XG4gICAgICAgIGIub25DbGljaygoKSA9PiB7XG4gICAgICAgICAgdm9pZCAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGVsZXRpbmcpIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMuZGVsZXRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgYi5zZXREaXNhYmxlZCh0cnVlKS5zZXRCdXR0b25UZXh0KCdEZWxldGluZ1x1MjAyNicpO1xuICAgICAgICAgICAgZXJyb3JFbC5oaWRlKCk7XG4gICAgICAgICAgICBwcm9ncmVzc0VsLnNob3coKTtcblxuICAgICAgICAgICAgY29uc3QgcyA9IHRoaXMucGx1Z2luLnNldHRpbmdzO1xuICAgICAgICAgICAgY29uc3QgZ2ggPSBuZXcgR2l0SHViQXBpKFxuICAgICAgICAgICAgICBzLmdpdGh1YlRva2VuLFxuICAgICAgICAgICAgICBzLmdpdGh1Yk93bmVyLFxuICAgICAgICAgICAgICBzLm1hc3RlclJlcG9zaXRvcnksXG4gICAgICAgICAgICAgIHRoaXMuc2l0ZS5naXRodWJCcmFuY2ggfHwgJ21haW4nLFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8gU3RlcCAxOiBDbG91ZGZsYXJlIGNsZWFudXBcbiAgICAgICAgICAgIGlmICh0aGlzLnNpdGUuaG9zdGluZ1Byb3ZpZGVyID09PSAnY2xvdWRmbGFyZScgJiYgcy5jbG91ZGZsYXJlVG9rZW4pIHtcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBwcm9ncmVzc0VsLnNldFRleHQoJ0RlbGV0aW5nIENsb3VkZmxhcmUgUGFnZXMgcHJvamVjdFx1MjAyNicpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNmID0gbmV3IENsb3VkZmxhcmVBcGkocy5jbG91ZGZsYXJlVG9rZW4sIHMuY2xvdWRmbGFyZUFjY291bnQpO1xuICAgICAgICAgICAgICAgIGF3YWl0IGNmLmRlbGV0ZVByb2plY3QodGhpcy5zaXRlLmNsb3VkZmxhcmVQcm9qZWN0KTtcbiAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignTm90ZUZsYXJlOiBjb3VsZCBub3QgZGVsZXRlIENsb3VkZmxhcmUgcHJvamVjdDonLCBlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBTdGVwIDI6IEdpdEh1YiBmb2xkZXIgY2xlYW51cFxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgcHJvZ3Jlc3NFbC5zZXRUZXh0KCdSZW1vdmluZyBzaXRlIGZyb20gR2l0SHViIHJlcG9zaXRvcnlcdTIwMjYnKTtcbiAgICAgICAgICAgICAgYXdhaXQgZ2guZGVsZXRlU2l0ZUZvbGRlcih0aGlzLnNpdGUuaWQsIHRoaXMuc2l0ZS5naXRodWJCcmFuY2ggfHwgJ21haW4nKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdOb3RlRmxhcmU6IGNvdWxkIG5vdCBkZWxldGUgR2l0SHViIHNpdGUgZm9sZGVyOicsIGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBTdGVwIDM6IFZhdWx0IHJlZ2lzdHJ5XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBwcm9ncmVzc0VsLnNldFRleHQoJ1VwZGF0aW5nIHZhdWx0IHJlZ2lzdHJ5XHUyMDI2Jyk7XG4gICAgICAgICAgICAgIGF3YWl0IFZhdWx0UmVnaXN0cnkucmVtb3ZlKHRoaXMuYXBwLCB0aGlzLnNpdGUuaWQpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ05vdGVGbGFyZTogY291bGQgbm90IHVwZGF0ZSB2YXVsdCByZWdpc3RyeTonLCBlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gU3RlcCA0OiBSZW1vdmUgZnJvbSBwbHVnaW4gc2V0dGluZ3NcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGNvbnN0IHMyID0gdGhpcy5wbHVnaW4uc2V0dGluZ3M7XG4gICAgICAgICAgICAgIHMyLnNpdGVzID0gczIuc2l0ZXMuZmlsdGVyKCh4KSA9PiB4LmlkICE9PSB0aGlzLnNpdGUuaWQpO1xuICAgICAgICAgICAgICBpZiAoczIuYWN0aXZlU2l0ZUlkID09PSB0aGlzLnNpdGUuaWQpIHtcbiAgICAgICAgICAgICAgICBzMi5hY3RpdmVTaXRlSWQgPSBzMi5zaXRlc1swXT8uaWQgPz8gJyc7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgICAgbmV3IE5vdGljZShgU2l0ZSBcIiR7c2l0ZU5hbWV9XCIgZGVsZXRlZC5gKTtcbiAgICAgICAgICAgICAgdGhpcy5vbkRvbmUoKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycjogdW5rbm93bikge1xuICAgICAgICAgICAgICBlcnJvckVsLnNldFRleHQoKGVyciBhcyBFcnJvcikubWVzc2FnZSk7XG4gICAgICAgICAgICAgIGVycm9yRWwuc2hvdygpO1xuICAgICAgICAgICAgICBwcm9ncmVzc0VsLmhpZGUoKTtcbiAgICAgICAgICAgICAgYi5zZXREaXNhYmxlZChmYWxzZSkuc2V0QnV0dG9uVGV4dCgnRGVsZXRlJyk7XG4gICAgICAgICAgICAgIHRoaXMuZGVsZXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgb25DbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnRlbnRFbC5lbXB0eSgpO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQXBwLCBNb2RhbCwgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB0eXBlIE5vdGVGbGFyZVBsdWdpbiBmcm9tICcuLi8uLi8uLi8uLi9tYWluJztcblxuZXhwb3J0IGNsYXNzIFVucHVibGlzaE1vZGFsIGV4dGVuZHMgTW9kYWwge1xuICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcHJpdmF0ZSBwbHVnaW46IE5vdGVGbGFyZVBsdWdpbiwgcHJpdmF0ZSBvbkRvbmU6ICgpID0+IHZvaWQpIHtcbiAgICBzdXBlcihhcHApO1xuICB9XG5cbiAgb25PcGVuKCk6IHZvaWQge1xuICAgIHRoaXMudGl0bGVFbC5zZXRUZXh0KCdVbnB1Ymxpc2ggeW91ciBzaXRlPycpO1xuICAgIHRoaXMuY29udGVudEVsLmNyZWF0ZUVsKCdwJywge1xuICAgICAgdGV4dDogJ1lvdXIgc2l0ZSB3aWxsIGdvIG9mZmxpbmUuIEZpbGVzIGluIEdpdEh1YiByZW1haW4gdW50b3VjaGVkIFx1MjAxNCB5b3UgY2FuIHJlLXB1Ymxpc2ggYW55IHRpbWUuJyxcbiAgICB9KTtcbiAgICBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbClcbiAgICAgIC5hZGRCdXR0b24oYiA9PiBiLnNldEJ1dHRvblRleHQoJ0NhbmNlbCcpLm9uQ2xpY2soKCkgPT4gdGhpcy5jbG9zZSgpKSlcbiAgICAgIC5hZGRCdXR0b24oYiA9PiB7XG4gICAgICAgIGIuc2V0QnV0dG9uVGV4dCgnVW5wdWJsaXNoJyk7XG4gICAgICAgIGIuYnV0dG9uRWwuYWRkQ2xhc3MoJ21vZC13YXJuaW5nJyk7XG4gICAgICAgIGIub25DbGljaygoKSA9PiB7XG4gICAgICAgICAgdm9pZCAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uZG9VbnB1Ymxpc2goKTtcbiAgICAgICAgICAgIHRoaXMub25Eb25lKCk7XG4gICAgICAgICAgfSkoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIG9uQ2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5jb250ZW50RWwuZW1wdHkoKTtcbiAgfVxufVxuXG4vKipcbiAqIEluZm8gbW9kYWwgZm9yIEdpdEh1YiBQYWdlcyBtYW51YWwgdW5wdWJsaXNoLlxuICogR2l0SHViIFBhZ2VzIGNhbm5vdCBiZSBwYXVzZWQgdmlhIEFQSSBzbyB0aGlzIHNob3dzIHRoZSB1c2VyIGV4YWN0bHlcbiAqIGhvdyB0byBkaXNhYmxlIGl0IHRoZW1zZWx2ZXMgaW4gdGhlIEdpdEh1YiByZXBvIHNldHRpbmdzLlxuICovXG5leHBvcnQgY2xhc3MgR2l0SHViUGFnZXNVbnB1Ymxpc2hNb2RhbCBleHRlbmRzIE1vZGFsIHtcbiAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHByaXZhdGUgcGFnZXNTZXR0aW5nc1VybDogc3RyaW5nKSB7XG4gICAgc3VwZXIoYXBwKTtcbiAgfVxuXG4gIG9uT3BlbigpOiB2b2lkIHtcbiAgICB0aGlzLnRpdGxlRWwuc2V0VGV4dCgnRGlzYWJsZSBHaXRIdWIgUGFnZXMgKE1hbnVhbCknKTtcbiAgICB0aGlzLmNvbnRlbnRFbC5jcmVhdGVFbCgncCcsIHtcbiAgICAgIHRleHQ6ICdHaXRIdWIgUGFnZXMgY2Fubm90IGJlIHBhdXNlZCB2aWEgdGhlIEdpdEh1YiBBUEkuIFRvIHRha2UgeW91ciBzaXRlIG9mZmxpbmUsIGZvbGxvdyB0aGVzZSBzdGVwczonLFxuICAgIH0pO1xuICAgIGNvbnN0IHN0ZXBzID0gdGhpcy5jb250ZW50RWwuY3JlYXRlRWwoJ29sJyk7XG4gICAgc3RlcHMuc2V0Q3NzU3R5bGVzKHsgcGFkZGluZ0xlZnQ6ICcxLjRlbScgfSk7XG4gICAgc3RlcHMuY3JlYXRlRWwoJ2xpJywgeyB0ZXh0OiAnQ2xpY2sgdGhlIGJ1dHRvbiBiZWxvdyB0byBvcGVuIHlvdXIgcmVwb3NpdG9yeSBQYWdlcyBzZXR0aW5ncy4nIH0pO1xuICAgIHN0ZXBzLmNyZWF0ZUVsKCdsaScsIHsgdGV4dDogJ1VuZGVyIFx1MjAxQ1NvdXJjZVx1MjAxRCwgY2hhbmdlIHRoZSBzZWxlY3Rpb24gZnJvbSBcdTIwMUNHaXRIdWIgQWN0aW9uc1x1MjAxRCB0byBcdTIwMUNOb25lXHUyMDFELicgfSk7XG4gICAgc3RlcHMuY3JlYXRlRWwoJ2xpJywgeyB0ZXh0OiAnQ2xpY2sgU2F2ZS4gWW91ciBzaXRlIHdpbGwgYmUgb2ZmbGluZSB3aXRoaW4gYSBtaW51dGUuJyB9KTtcbiAgICBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbClcbiAgICAgIC5hZGRCdXR0b24oYiA9PiBiLnNldEJ1dHRvblRleHQoJ0NhbmNlbCcpLm9uQ2xpY2soKCkgPT4gdGhpcy5jbG9zZSgpKSlcbiAgICAgIC5hZGRCdXR0b24oYiA9PiB7XG4gICAgICAgIGIuc2V0QnV0dG9uVGV4dCgnT3BlbiBHaXRIdWIgUGFnZXMgc2V0dGluZ3MgXHUyMTk3Jykuc2V0Q3RhKCk7XG4gICAgICAgIGIub25DbGljaygoKSA9PiB7IHdpbmRvdy5vcGVuKHRoaXMucGFnZXNTZXR0aW5nc1VybCwgJ19ibGFuaycpOyB0aGlzLmNsb3NlKCk7IH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBvbkNsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuY29udGVudEVsLmVtcHR5KCk7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBBcHAsIE1vZGFsLCBTZXR0aW5nIH0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IHR5cGUgTm90ZUZsYXJlUGx1Z2luIGZyb20gJy4uLy4uLy4uLy4uL21haW4nO1xuaW1wb3J0IHsgREVGQVVMVF9TRVRUSU5HUyB9IGZyb20gJy4uLy4uLy4uL2NvcmUvc2V0dGluZ3MnO1xuXG5leHBvcnQgY2xhc3MgUmVzZXRNb2RhbCBleHRlbmRzIE1vZGFsIHtcbiAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHByaXZhdGUgcGx1Z2luOiBOb3RlRmxhcmVQbHVnaW4sIHByaXZhdGUgb25Eb25lOiAoKSA9PiB2b2lkKSB7XG4gICAgc3VwZXIoYXBwKTtcbiAgfVxuXG4gIG9uT3BlbigpOiB2b2lkIHtcbiAgICB0aGlzLnRpdGxlRWwuc2V0VGV4dCgnUmVzZXQgTm90ZUZsYXJlPycpO1xuICAgIHRoaXMuY29udGVudEVsLmNyZWF0ZUVsKCdwJywge1xuICAgICAgdGV4dDogJ1RoaXMgY2xlYXJzIGFsbCBOb3RlRmxhcmUgc2V0dGluZ3MgKHRva2VucyBhbmQgZXZlcnkgc2l0ZSkuIFlvdXIgR2l0SHViIHJlcG9zIGFuZCBDbG91ZGZsYXJlIHByb2plY3RzIHdpbGwgTk9UIGJlIGRlbGV0ZWQuJyxcbiAgICB9KTtcbiAgICBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbClcbiAgICAgIC5hZGRCdXR0b24oYiA9PiBiLnNldEJ1dHRvblRleHQoJ0NhbmNlbCcpLm9uQ2xpY2soKCkgPT4gdGhpcy5jbG9zZSgpKSlcbiAgICAgIC5hZGRCdXR0b24oYiA9PiB7XG4gICAgICAgIGIuc2V0QnV0dG9uVGV4dCgnUmVzZXQnKTtcbiAgICAgICAgYi5idXR0b25FbC5hZGRDbGFzcygnbW9kLXdhcm5pbmcnKTtcbiAgICAgICAgYi5vbkNsaWNrKCgpID0+IHtcbiAgICAgICAgICB2b2lkIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMucGx1Z2luLnNldHRpbmdzLCB7XG4gICAgICAgICAgICAgIC4uLkRFRkFVTFRfU0VUVElOR1MsXG4gICAgICAgICAgICAgIHNpdGVzOiBbXSxcbiAgICAgICAgICAgICAgYmFja3VwOiB7IC4uLkRFRkFVTFRfU0VUVElOR1MuYmFja3VwIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgdGhpcy5vbkRvbmUoKTtcbiAgICAgICAgICB9KSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgb25DbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnRlbnRFbC5lbXB0eSgpO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQXBwLCBNb2RhbCwgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB0eXBlIE5vdGVGbGFyZVBsdWdpbiBmcm9tICcuLi8uLi8uLi8uLi9tYWluJztcbmltcG9ydCB7IFNpdGVQcm9maWxlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS90eXBlcyc7XG5pbXBvcnQgeyBQYXRoU3VnZ2VzdE1vZGFsIH0gZnJvbSAnLi9wYXRoU3VnZ2VzdE1vZGFsJztcbmltcG9ydCB7IENoYW5nZVJlcG9Nb2RhbCB9IGZyb20gJy4vY2hhbmdlUmVwb01vZGFsJztcbmltcG9ydCB7IHNsdWdpZnkgfSBmcm9tICcuL2hlbHBlcnMnO1xuXG5cbmV4cG9ydCBjbGFzcyBFZGl0U2l0ZU1vZGFsIGV4dGVuZHMgTW9kYWwge1xuICBjb25zdHJ1Y3RvcihcbiAgICBhcHA6IEFwcCxcbiAgICBwcml2YXRlIHBsdWdpbjogTm90ZUZsYXJlUGx1Z2luLFxuICAgIHByaXZhdGUgc2l0ZTogU2l0ZVByb2ZpbGUsXG4gICAgcHJpdmF0ZSBvbkRvbmU6ICgpID0+IHZvaWQsXG4gICkge1xuICAgIHN1cGVyKGFwcCk7XG4gIH1cblxuICBvbk9wZW4oKTogdm9pZCB7XG4gICAgY29uc3QgcyA9IHRoaXMuc2l0ZTtcbiAgICB0aGlzLnRpdGxlRWwuc2V0VGV4dChgU2V0dGluZ3MgZm9yICR7cy5uYW1lIHx8IHMuY2xvdWRmbGFyZVByb2plY3QgfHwgJ1NpdGUnfWApO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBwcml2YXRlIHJlbmRlcigpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnRlbnRFbC5lbXB0eSgpO1xuICAgIGNvbnN0IHMgPSB0aGlzLnNpdGU7XG5cbiAgICBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbCkuc2V0TmFtZSgnUHVibGlzaGluZyBydWxlcycpLnNldEhlYWRpbmcoKTtcblxuICAgIG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKVxuICAgICAgLnNldE5hbWUoJ0dpdEh1YiByZXBvc2l0b3J5JylcbiAgICAgIC5zZXREZXNjKCdUaGUgcmVwb3NpdG9yeSBsaW5rZWQgdG8gdGhpcyBzaXRlLicpXG4gICAgICAuYWRkVGV4dCh0ID0+IHtcbiAgICAgICAgdC5zZXRWYWx1ZShzLmdpdGh1YlJlcG8gfHwgdGhpcy5wbHVnaW4uc2V0dGluZ3MubWFzdGVyUmVwb3NpdG9yeSk7XG4gICAgICAgIHQuc2V0RGlzYWJsZWQodHJ1ZSk7XG4gICAgICB9KVxuICAgICAgLmFkZEJ1dHRvbihiID0+IGIuc2V0QnV0dG9uVGV4dCgnQ2hhbmdlIFJlcG8nKS5vbkNsaWNrKCgpID0+IHtcbiAgICAgICAgbmV3IENoYW5nZVJlcG9Nb2RhbCh0aGlzLmFwcCwgdGhpcy5wbHVnaW4sIHMsICgpID0+IHRoaXMucmVuZGVyKCkpLm9wZW4oKTtcbiAgICAgIH0pKTtcblxuICAgIGxldCB1cGRhdGVWaXNpYmlsaXR5OiAoKSA9PiB2b2lkO1xuICAgIFxuICAgIG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKVxuICAgICAgLnNldE5hbWUoJ1B1Ymxpc2ggc2NvcGUnKVxuICAgICAgLnNldERlc2MoJ0NvbmZpZ3VyZSB3aGF0IHRvIHB1Ymxpc2g6IHRoZSBlbnRpcmUgdmF1bHQgb3Igc2VsZWN0ZWQgZmlsZXMvZm9sZGVycy4nKVxuICAgICAgLmFkZERyb3Bkb3duKGQgPT4ge1xuICAgICAgICBkLmFkZE9wdGlvbigndmF1bHQnLCAnRnVsbCBWYXVsdCcpO1xuICAgICAgICBkLmFkZE9wdGlvbignc2VsZWN0ZWQnLCAnU2VsZWN0ZWQgRmlsZXMvRm9sZGVycycpO1xuICAgICAgICBkLnNldFZhbHVlKHMucHVibGlzaFNjb3BlIHx8ICd2YXVsdCcpO1xuICAgICAgICBkLm9uQ2hhbmdlKCh2KSA9PiB7IHZvaWQgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICBzLnB1Ymxpc2hTY29wZSA9IHYgYXMgJ3ZhdWx0JyB8ICdzZWxlY3RlZCc7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgdXBkYXRlVmlzaWJpbGl0eSgpO1xuICAgICAgICB9KSgpOyB9KTtcbiAgICAgIH0pO1xuXG4gICAgY29uc3QgcGF0aHNDb250YWluZXIgPSB0aGlzLmNvbnRlbnRFbC5jcmVhdGVEaXYoJ25vdGVmbGFyZS1wYXRocy1jb250YWluZXInKTtcbiAgICBcbiAgICBjb25zdCByZW5kZXJQYXRocyA9ICgpID0+IHtcbiAgICAgIHBhdGhzQ29udGFpbmVyLmVtcHR5KCk7XG4gICAgICBpZiAoKHMucHVibGlzaFNjb3BlIHx8ICd2YXVsdCcpID09PSAndmF1bHQnKSB7XG4gICAgICAgIHBhdGhzQ29udGFpbmVyLnNldENzc1N0eWxlcyh7IGRpc3BsYXk6ICdub25lJyB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcGF0aHNDb250YWluZXIuc2V0Q3NzU3R5bGVzKHsgZGlzcGxheTogJ2Jsb2NrJyB9KTtcbiAgICAgIFxuICAgICAgY29uc3QgcGF0aHMgPSBzLnB1Ymxpc2hQYXRocyB8fCBbXTtcbiAgICAgIGlmIChwYXRocy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcGF0aHNDb250YWluZXIuY3JlYXRlRWwoJ3AnLCB7IHRleHQ6ICdObyBmaWxlcyBvciBmb2xkZXJzIHNlbGVjdGVkLicsIGNsczogJ25vdGVmbGFyZS1tdXRlZCcgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBsaXN0ID0gcGF0aHNDb250YWluZXIuY3JlYXRlRWwoJ3VsJywgeyBjbHM6ICdub3RlZmxhcmUtcGF0aC1saXN0JyB9KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXRocy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGxpID0gbGlzdC5jcmVhdGVFbCgnbGknKTtcbiAgICAgICAgICBsaS5zZXRDc3NTdHlsZXMoeyBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Cb3R0b206ICc0cHgnIH0pO1xuICAgICAgICAgIFxuICAgICAgICAgIGxpLmNyZWF0ZVNwYW4oeyB0ZXh0OiBwYXRoc1tpXSB9KTtcbiAgICAgICAgICBjb25zdCByZW1vdmVCdG4gPSBsaS5jcmVhdGVFbCgnYnV0dG9uJywgeyB0ZXh0OiAnXHUyNzE1JyB9KTtcbiAgICAgICAgICByZW1vdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7IHZvaWQgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHMucHVibGlzaFBhdGhzPy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIHJlbmRlclBhdGhzKCk7XG4gICAgICAgICAgfSkoKTsgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgYWRkUm93ID0gcGF0aHNDb250YWluZXIuY3JlYXRlRGl2KCdub3RlZmxhcmUtYWRkLXBhdGgtcm93Jyk7XG4gICAgICBhZGRSb3cuc2V0Q3NzU3R5bGVzKHsgbWFyZ2luVG9wOiAnOHB4JyB9KTtcbiAgICAgIFxuICAgICAgY29uc3QgYWRkQnRuID0gYWRkUm93LmNyZWF0ZUVsKCdidXR0b24nLCB7IHRleHQ6ICdCcm93c2UgVmF1bHQuLi4nIH0pO1xuICAgICAgYWRkQnRuLnNldENzc1N0eWxlcyh7IHdpZHRoOiAnMTAwJScgfSk7XG4gICAgICBhZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIG5ldyBQYXRoU3VnZ2VzdE1vZGFsKHRoaXMuYXBwLCAoc2VsZWN0ZWRQYXRoKSA9PiB7IHZvaWQgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICBpZiAoc2VsZWN0ZWRQYXRoLnRyaW0oKSkge1xuICAgICAgICAgICAgaWYgKCFzLnB1Ymxpc2hQYXRocykgcy5wdWJsaXNoUGF0aHMgPSBbXTtcbiAgICAgICAgICAgIGlmICghcy5wdWJsaXNoUGF0aHMuaW5jbHVkZXMoc2VsZWN0ZWRQYXRoLnRyaW0oKSkpIHtcbiAgICAgICAgICAgICAgcy5wdWJsaXNoUGF0aHMucHVzaChzZWxlY3RlZFBhdGgudHJpbSgpKTtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgIHJlbmRlclBhdGhzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KSgpOyB9KS5vcGVuKCk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdXBkYXRlVmlzaWJpbGl0eSA9ICgpID0+IHtcbiAgICAgIHJlbmRlclBhdGhzKCk7XG4gICAgfTtcbiAgICB1cGRhdGVWaXNpYmlsaXR5KCk7XG5cbiAgICAvLyBDdXN0b21pemF0aW9uc1xuICAgIG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKS5zZXROYW1lKCdTaXRlIEN1c3RvbWl6YXRpb24nKS5zZXRIZWFkaW5nKCk7XG5cbiAgICBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbClcbiAgICAgIC5zZXROYW1lKCdTaXRlIG5hbWUnKVxuICAgICAgLnNldERlc2MoJ0ludGVybmFsIG5hbWUgZm9yIHRoaXMgc2l0ZS4nKVxuICAgICAgLmFkZFRleHQodCA9PiB7XG4gICAgICAgIHQuc2V0VmFsdWUocy5uYW1lIHx8ICcnKTtcbiAgICAgICAgdC5vbkNoYW5nZSgodikgPT4geyB2b2lkIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgcy5uYW1lID0gdi50cmltKCk7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgIH0pKCk7IH0pO1xuICAgICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbClcbiAgICAgIC5zZXROYW1lKCdBdXRob3IgbmFtZScpXG4gICAgICAuc2V0RGVzYygnVGhlIGF1dGhvciBuYW1lIHdyaXR0ZW4gdG8gdGhlIHNpdGUgbWV0YWRhdGEuJylcbiAgICAgIC5hZGRUZXh0KHQgPT4ge1xuICAgICAgICB0LnNldFBsYWNlaG9sZGVyKCdZb3VyIE5hbWUnKTtcbiAgICAgICAgdC5zZXRWYWx1ZShzLmF1dGhvck5hbWUgfHwgJycpO1xuICAgICAgICB0Lm9uQ2hhbmdlKCh2KSA9PiB7IHZvaWQgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICBzLmF1dGhvck5hbWUgPSB2LnRyaW0oKTtcbiAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgfSkoKTsgfSk7XG4gICAgICB9KTtcblxuICAgIG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKVxuICAgICAgLnNldE5hbWUoJ1NpZGViYXIgdGl0bGUnKVxuICAgICAgLnNldERlc2MoJ1RpdGxlIHNob3duIGluIHRoZSBzaWRlYmFyLiBEZWZhdWx0cyB0byB0aGUgc2l0ZSBuYW1lLicpXG4gICAgICAuYWRkVGV4dCh0ID0+IHtcbiAgICAgICAgdC5zZXRQbGFjZWhvbGRlcignTXkgRGlnaXRhbCBHYXJkZW4nKTtcbiAgICAgICAgdC5zZXRWYWx1ZShzLnNpZGViYXJUaXRsZSB8fCAnJyk7XG4gICAgICAgIHQub25DaGFuZ2UoKHYpID0+IHsgdm9pZCAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIHMuc2lkZWJhclRpdGxlID0gdi50cmltKCk7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgIH0pKCk7IH0pO1xuICAgICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbClcbiAgICAgIC5zZXROYW1lKCdTaXRlIGRlc2NyaXB0aW9uJylcbiAgICAgIC5zZXREZXNjKCdEZXNjcmlwdGlvbiBvZiB5b3VyIHNpdGUuJylcbiAgICAgIC5hZGRUZXh0KHQgPT4ge1xuICAgICAgICB0LnNldFBsYWNlaG9sZGVyKCdOb3RlcyBhbmQgdGhvdWdodHNcdTIwMjYnKTtcbiAgICAgICAgdC5zZXRWYWx1ZShzLnNpdGVEZXNjcmlwdGlvbiB8fCAnJyk7XG4gICAgICAgIHQub25DaGFuZ2UoKHYpID0+IHsgdm9pZCAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIHMuc2l0ZURlc2NyaXB0aW9uID0gdi50cmltKCk7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgIH0pKCk7IH0pO1xuICAgICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbClcbiAgICAgIC5zZXROYW1lKCdFeGNsdWRlIHBhdHRlcm5zJylcbiAgICAgIC5zZXREZXNjKCdPbmUgZ2xvYiBwZXIgbGluZS4gTWF0Y2hpbmcgZmlsZXMgYXJlIG5vdCBwdWJsaXNoZWQgKGUuZy4gcHJpdmF0ZS8qKiwgKi5wcml2YXRlLm1kKS4nKVxuICAgICAgLmFkZFRleHRBcmVhKGFyZWEgPT4ge1xuICAgICAgICBhcmVhLnNldFZhbHVlKHMuZXhjbHVkZVBhdHRlcm5zLmpvaW4oJ1xcbicpKTtcbiAgICAgICAgYXJlYS5pbnB1dEVsLnJvd3MgPSA0O1xuICAgICAgICBhcmVhLm9uQ2hhbmdlKCh2KSA9PiB7IHZvaWQgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICBzLmV4Y2x1ZGVQYXR0ZXJucyA9IHYuc3BsaXQoJ1xcbicpLm1hcCh4ID0+IHgudHJpbSgpKS5maWx0ZXIoQm9vbGVhbik7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgIH0pKCk7IH0pO1xuICAgICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbClcbiAgICAgIC5zZXROYW1lKCdJbmNsdWRlIGF0dGFjaG1lbnRzJylcbiAgICAgIC5zZXREZXNjKCdVcGxvYWQgaW1hZ2VzIGFuZCBQREZzIGFsb25nc2lkZSB5b3VyIG5vdGVzLicpXG4gICAgICAuYWRkVG9nZ2xlKHRvZ2dsZSA9PiB7XG4gICAgICAgIHRvZ2dsZS5zZXRWYWx1ZShzLmluY2x1ZGVBdHRhY2htZW50cyk7XG4gICAgICAgIHRvZ2dsZS5vbkNoYW5nZSgodikgPT4geyB2b2lkIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgcy5pbmNsdWRlQXR0YWNobWVudHMgPSB2O1xuICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICB9KSgpOyB9KTtcbiAgICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcodGhpcy5jb250ZW50RWwpXG4gICAgICAuYWRkQnV0dG9uKGIgPT4gYi5zZXRCdXR0b25UZXh0KCdEb25lJykuc2V0Q3RhKCkub25DbGljaygoKSA9PiB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgdGhpcy5vbkRvbmUoKTtcbiAgICAgIH0pKTtcbiAgfVxuXG4gIG9uQ2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5jb250ZW50RWwuZW1wdHkoKTtcbiAgfVxufVxuIiwgImltcG9ydCB7IEFwcCwgTW9kYWwsIE5vdGljZSwgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB0eXBlIE5vdGVGbGFyZVBsdWdpbiBmcm9tICcuLi8uLi8uLi8uLi9tYWluJztcbmltcG9ydCB7IFNpdGVQcm9maWxlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS90eXBlcyc7XG5pbXBvcnQgeyBjcmVhdGVTaXRlUHJvZmlsZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvc2V0dGluZ3MnO1xuXG5leHBvcnQgY2xhc3MgQ2hhbmdlUmVwb01vZGFsIGV4dGVuZHMgTW9kYWwge1xuICBjb25zdHJ1Y3RvcihcbiAgICBhcHA6IEFwcCxcbiAgICBwcml2YXRlIHBsdWdpbjogTm90ZUZsYXJlUGx1Z2luLFxuICAgIHByaXZhdGUgc2l0ZTogU2l0ZVByb2ZpbGUsXG4gICAgcHJpdmF0ZSBvbkRvbmU6ICgpID0+IHZvaWQsXG4gICkge1xuICAgIHN1cGVyKGFwcCk7XG4gIH1cblxuICBvbk9wZW4oKTogdm9pZCB7XG4gICAgdGhpcy50aXRsZUVsLnNldFRleHQoJ0NoYW5nZSBSZXBvc2l0b3J5Jyk7XG4gICAgbGV0IG5ld1JlcG8gPSAnJztcblxuICAgIG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKVxuICAgICAgLnNldE5hbWUoJ05ldyByZXBvc2l0b3J5IG5hbWUnKVxuICAgICAgLnNldERlc2MoJ0VudGVyIHRoZSBuZXcgR2l0SHViIHJlcG9zaXRvcnkgbmFtZS4nKVxuICAgICAgLmFkZFRleHQodCA9PiB7XG4gICAgICAgIHQuc2V0VmFsdWUodGhpcy5zaXRlLmdpdGh1YlJlcG8gfHwgdGhpcy5wbHVnaW4uc2V0dGluZ3MubWFzdGVyUmVwb3NpdG9yeSk7XG4gICAgICAgIHQub25DaGFuZ2UodiA9PiB7IG5ld1JlcG8gPSB2LnRyaW0oKTsgfSk7XG4gICAgICB9KTtcblxuICAgIG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKVxuICAgICAgLnNldE5hbWUoJ01pZ3JhdGUgb3IgQ3JlYXRlIE5ldycpXG4gICAgICAuc2V0RGVzYygnTWlncmF0ZSB3aWxsIHVwZGF0ZSB0aGlzIHNpdGUuIENyZWF0ZSBOZXcgd2lsbCBjbG9uZSB0aGlzIHByb2ZpbGUgZm9yIHRoZSBuZXcgcmVwby4nKVxuICAgICAgLmFkZEJ1dHRvbihiID0+IGIuc2V0QnV0dG9uVGV4dCgnTWlncmF0ZScpLm9uQ2xpY2soKCkgPT4ge1xuICAgICAgICBpZiAoIW5ld1JlcG8pIHJldHVybjtcbiAgICAgICAgdGhpcy5zaXRlLmdpdGh1YlJlcG8gPSBuZXdSZXBvO1xuICAgICAgICB2b2lkIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIG5ldyBOb3RpY2UoJ1JlcG9zaXRvcnkgdXBkYXRlZC4gUHVibGlzaCB0byBwcm92aXNpb24gdGhlIG5ldyByZXBvLicpO1xuICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICB0aGlzLm9uRG9uZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pKVxuICAgICAgLmFkZEJ1dHRvbihiID0+IGIuc2V0QnV0dG9uVGV4dCgnQ3JlYXRlIE5ldycpLnNldEN0YSgpLm9uQ2xpY2soKCkgPT4ge1xuICAgICAgICBpZiAoIW5ld1JlcG8pIHJldHVybjtcbiAgICAgICAgY29uc3QgbmV3U2l0ZSA9IGNyZWF0ZVNpdGVQcm9maWxlKHtcbiAgICAgICAgICAuLi50aGlzLnNpdGUsXG4gICAgICAgICAgbmFtZTogYCR7dGhpcy5zaXRlLm5hbWV9IChDb3B5KWAsXG4gICAgICAgICAgZ2l0aHViUmVwbzogbmV3UmVwbyxcbiAgICAgICAgICBjbG91ZGZsYXJlUHJvamVjdDogJycsXG4gICAgICAgICAgc2l0ZVVybDogJycsXG4gICAgICAgICAgaXNQdWJsaXNoZWQ6IGZhbHNlLFxuICAgICAgICAgIGxhc3RQdWJsaXNoZWQ6ICcnLFxuICAgICAgICAgIGxhc3ROb3RlQ291bnQ6IDAsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zaXRlcy5wdXNoKG5ld1NpdGUpO1xuICAgICAgICB2b2lkIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIG5ldyBOb3RpY2UoJ05ldyBzaXRlIHByb2ZpbGUgY3JlYXRlZC4nKTtcbiAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgdGhpcy5vbkRvbmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KSk7XG4gIH1cblxuICBvbkNsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuY29udGVudEVsLmVtcHR5KCk7XG4gIH1cbn1cbiIsICJleHBvcnQgY2xhc3MgU3RhdHVzQmFyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogSFRNTEVsZW1lbnQpIHt9XG5cbiAgc2V0SWRsZSgpOiB2b2lkIHtcbiAgICB0aGlzLnNldCgnTm90ZUZsYXJlOiBOb3Qgc2V0IHVwJyk7XG4gICAgdGhpcy5lbC50aXRsZSA9ICcnO1xuICB9XG5cbiAgc2V0VW5wdWJsaXNoZWQoKTogdm9pZCB7XG4gICAgdGhpcy5zZXQoJ05vdGVGbGFyZTogVW5wdWJsaXNoZWQnKTtcbiAgICB0aGlzLmVsLnRpdGxlID0gJyc7XG4gIH1cblxuICBzZXRQdWJsaXNoaW5nKG46IG51bWJlciwgdG90YWw6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuc2V0KGBOb3RlRmxhcmU6IFVwbG9hZGluZyAke259LyR7dG90YWx9Li4uYCk7XG4gIH1cblxuICBzZXRMaXZlKG5vdGVDb3VudDogbnVtYmVyLCB1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuc2V0KGBOb3RlRmxhcmU6IExpdmUgXHUyMDE0ICR7bm90ZUNvdW50fSBub3RlcyBcdTIxOTdgKTtcbiAgICB0aGlzLmVsLnRpdGxlID0gdXJsID8gYGh0dHBzOi8vJHt1cmx9YCA6ICcnO1xuICB9XG5cbiAgc2V0RXJyb3IobXNnOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnNldChgTm90ZUZsYXJlOiBFcnJvciBcdTIwMTQgJHttc2d9YCk7XG4gIH1cblxuICBzZXRSYXRlTGltaXRlZChzZWNzTGVmdDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5zZXQoYE5vdGVGbGFyZTogUmF0ZSBsaW1pdGVkIFx1MjAxNCAke3NlY3NMZWZ0fXNgKTtcbiAgfVxuXG4gIHNldE1lc3NhZ2UobXNnOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnNldChtc2cpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXQodGV4dDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5lbC50ZXh0Q29udGVudCA9IHRleHQ7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBJdGVtVmlldywgV29ya3NwYWNlTGVhZiwgc2V0SWNvbiwgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB7IEFkZFNpdGVNb2RhbCwgVW5wdWJsaXNoTW9kYWwsIEVkaXRTaXRlTW9kYWwsIFJlbW92ZVNpdGVNb2RhbCwgUGF0aFN1Z2dlc3RNb2RhbCwgR2l0SHViUGFnZXNVbnB1Ymxpc2hNb2RhbCB9IGZyb20gJy4vc2V0dGluZ3MvbW9kYWxzJztcbmltcG9ydCB0eXBlIE5vdGVGbGFyZVBsdWdpbiBmcm9tICcuLi8uLi9tYWluJztcbmltcG9ydCB0eXBlIHsgTGl2ZVNpdGVTdGF0dXMgfSBmcm9tICcuLi8uLi9tYWluJztcbmltcG9ydCB7IFNpdGVQcm9maWxlIH0gZnJvbSAnLi4vY29yZS90eXBlcyc7XG5cblxuZXhwb3J0IGNvbnN0IFZJRVdfVFlQRV9OT1RFRkxBUkUgPSAnbm90ZWZsYXJlLXBhbmVsJztcblxuY29uc3QgQ0xPVURGTEFSRV9BUFBfVVJMID0gJ2h0dHBzOi8vZ2l0aHViLmNvbS9hcHBzL2Nsb3VkZmxhcmUtd29ya2Vycy1hbmQtcGFnZXMvaW5zdGFsbGF0aW9ucy9uZXcnO1xuXG4vKiogRm9ybWF0IGFuIElTTyBkYXRlIHN0cmluZyB0byBhIHJlbGF0aXZlIHRpbWUgbGlrZSBcIjMgbWluIGFnb1wiLiAqL1xuZnVuY3Rpb24gcmVsYXRpdmVUaW1lKGlzbzogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKCFpc28pIHJldHVybiAnJztcbiAgY29uc3QgZGlmZk1zID0gRGF0ZS5ub3coKSAtIG5ldyBEYXRlKGlzbykuZ2V0VGltZSgpO1xuICBpZiAoaXNOYU4oZGlmZk1zKSkgcmV0dXJuICcnO1xuICBjb25zdCBtaW5zID0gTWF0aC5mbG9vcihkaWZmTXMgLyA2MDAwMCk7XG4gIGlmIChtaW5zIDwgMSkgcmV0dXJuICdqdXN0IG5vdyc7XG4gIGlmIChtaW5zIDwgNjApIHJldHVybiBgJHttaW5zfSBtaW4gYWdvYDtcbiAgY29uc3QgaHJzID0gTWF0aC5mbG9vcihtaW5zIC8gNjApO1xuICBpZiAoaHJzIDwgMjQpIHJldHVybiBgJHtocnN9aCBhZ29gO1xuICBjb25zdCBkYXlzID0gTWF0aC5mbG9vcihocnMgLyAyNCk7XG4gIHJldHVybiBgJHtkYXlzfWQgYWdvYDtcbn1cblxuLyoqXG4gKiBGb2N1c2VkIHB1Ymxpc2hpbmcgcGFuZWwuIEJhY2t1cCBydW5zIHF1aWV0bHkgaW4gdGhlIGJhY2tncm91bmQgYW5kIGlzXG4gKiBjb25maWd1cmVkIGZyb20gTm90ZUZsYXJlIHNldHRpbmdzLlxuICovXG5leHBvcnQgY2xhc3MgTm90ZUZsYXJlVmlldyBleHRlbmRzIEl0ZW1WaWV3IHtcbiAgY29uc3RydWN0b3IobGVhZjogV29ya3NwYWNlTGVhZiwgcHJpdmF0ZSBwbHVnaW46IE5vdGVGbGFyZVBsdWdpbikge1xuICAgIHN1cGVyKGxlYWYpO1xuICB9XG5cbiAgZ2V0Vmlld1R5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gVklFV19UWVBFX05PVEVGTEFSRTtcbiAgfVxuXG4gIGdldERpc3BsYXlUZXh0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdOb3RlRmxhcmUnO1xuICB9XG5cbiAgZ2V0SWNvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnBsdWdpbi5nZXRBY3RpdmVTaXRlKCk/LmlzUHVibGlzaGVkID8gJ2Nsb3VkLWNoZWNrJyA6ICdjbG91ZC11cGxvYWQnO1xuICB9XG5cbiAgYXN5bmMgb25PcGVuKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMucmVuZGVyKCk7XG4gICAgLy8gRmV0Y2ggbGl2ZSBzdGF0dXMgaW4gYmFja2dyb3VuZCB3aGVuIHBhbmVsIG9wZW5zLlxuICAgIGNvbnN0IHNpdGUgPSB0aGlzLnBsdWdpbi5nZXRBY3RpdmVTaXRlKCk7XG4gICAgaWYgKHNpdGUpIHZvaWQgdGhpcy5wbHVnaW4uZmV0Y2hMaXZlU3RhdHVzKHNpdGUpO1xuICB9XG5cbiAgYXN5bmMgb25DbG9zZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBub3RoaW5nIHRvIGNsZWFuIHVwXG4gIH1cblxuICByZWZyZXNoKCk6IHZvaWQge1xuICAgIHZvaWQgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgcmVuZGVyKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHJvb3QgPSB0aGlzLmNvbnRhaW5lckVsLmNoaWxkcmVuWzFdIGFzIEhUTUxFbGVtZW50O1xuICAgIHJvb3QuZW1wdHkoKTtcbiAgICByb290LmFkZENsYXNzKCdub3RlZmxhcmUtdmlldycpO1xuXG4gICAgY29uc3QgcyA9IHRoaXMucGx1Z2luLnNldHRpbmdzO1xuICAgIFxuICAgIGlmICghcy5zZXR1cENvbXBsZXRlKSB7XG4gICAgICByb290LmNyZWF0ZUVsKCdwJywge1xuICAgICAgICB0ZXh0OiAnRmluaXNoIHNldHVwIHRvIHB1Ymxpc2ggeW91ciBub3RlcyBhbmQgcHJvdGVjdCB5b3VyIHZhdWx0IHdpdGggYXV0b21hdGljIGJhY2t1cHMuJyxcbiAgICAgICAgY2xzOiAnc2V0dGluZy1pdGVtLWRlc2NyaXB0aW9uJyxcbiAgICAgIH0pO1xuICAgICAgY29uc3Qgc2V0dXBCdG4gPSByb290LmNyZWF0ZUVsKCdidXR0b24nLCB7IHRleHQ6ICdPcGVuIHNldHVwJywgY2xzOiAnbW9kLWN0YScgfSk7XG4gICAgICBzZXR1cEJ0bi5zZXRDc3NTdHlsZXMoeyBtYXJnaW5Ub3A6ICcxMHB4JyB9KTtcbiAgICAgIHNldHVwQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5wbHVnaW4ub3BlblNldHRpbmdzVGFiKCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnRlbnQgPSByb290LmNyZWF0ZUVsKCdkaXYnLCB7IGNsczogJ25vdGVmbGFyZS10YWItY29udGVudCcgfSk7XG4gICAgaWYgKHMuZW5hYmxlUHVibGlzaCkge1xuICAgICAgYXdhaXQgdGhpcy5yZW5kZXJQdWJsaXNoKGNvbnRlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBiYWNrdXAgPSBjb250ZW50LmNyZWF0ZUVsKCdkaXYnKTtcbiAgICAgIGJhY2t1cC5jcmVhdGVFbCgnaDMnLCB7IHRleHQ6ICdZb3VyIHZhdWx0IGlzIHByb3RlY3RlZCcgfSk7XG4gICAgICBiYWNrdXAuY3JlYXRlRWwoJ3AnLCB7XG4gICAgICAgIHRleHQ6IHMuYmFja3VwLmxhc3RCYWNrdXBBdFxuICAgICAgICAgID8gYExhc3QgYmFja3VwOiAke25ldyBEYXRlKHMuYmFja3VwLmxhc3RCYWNrdXBBdCkudG9Mb2NhbGVTdHJpbmcoKX1gXG4gICAgICAgICAgOiAnWW91ciBmaXJzdCBiYWNrdXAgd2lsbCBydW4gYXV0b21hdGljYWxseS4nLFxuICAgICAgICBjbHM6ICdzZXR0aW5nLWl0ZW0tZGVzY3JpcHRpb24nLFxuICAgICAgfSk7XG4gICAgICBjb25zdCBzZXR0aW5nc0J1dHRvbiA9IGJhY2t1cC5jcmVhdGVFbCgnYnV0dG9uJywgeyB0ZXh0OiAnQmFja3VwIG9wdGlvbnMnLCBjbHM6ICdtb2QtY3RhJyB9KTtcbiAgICAgIHNldHRpbmdzQnV0dG9uLnNldENzc1N0eWxlcyh7IG1hcmdpblRvcDogJzEwcHgnIH0pO1xuICAgICAgc2V0dGluZ3NCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnBsdWdpbi5vcGVuU2V0dGluZ3NUYWIoKSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyByZW5kZXJQdWJsaXNoKHJvb3Q6IEhUTUxFbGVtZW50KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcyA9IHRoaXMucGx1Z2luLnNldHRpbmdzO1xuICAgIGNvbnN0IHNpdGUgPSB0aGlzLnBsdWdpbi5nZXRBY3RpdmVTaXRlKCk7XG5cbiAgICBpZiAoIXNpdGUpIHtcbiAgICAgIHJvb3QuY3JlYXRlRWwoJ3AnLCB7XG4gICAgICAgIHRleHQ6ICdObyBwdWJsaXNoIHNpdGVzIGNvbmZpZ3VyZWQuJyxcbiAgICAgICAgY2xzOiAnbm90ZWZsYXJlLW11dGVkJyxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgY3JlYXRlQnRuID0gcm9vdC5jcmVhdGVFbCgnYnV0dG9uJywgeyB0ZXh0OiAnUXVpY2sgY3JlYXRlIHNpdGUnLCBjbHM6ICdtb2QtY3RhJyB9KTtcbiAgICAgIGNyZWF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgbmV3IEFkZFNpdGVNb2RhbCh0aGlzLmFwcCwgdGhpcy5wbHVnaW4sICgpID0+IHRoaXMucmVmcmVzaCgpKS5vcGVuKCk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBcdTI1MDBcdTI1MDAgU2luZ2xlIHNvdXJjZSBvZiB0cnV0aDogZGVyaXZlIGFsbCBzdGF0dXMgZnJvbSBwZXJzaXN0ZWQgU2l0ZVByb2ZpbGUgXHUyNTAwXHUyNTAwXG4gICAgY29uc3QgaXNQdWJsaXNoaW5nID0gISF0aGlzLnBsdWdpbi5wdWJsaXNoSW5Qcm9ncmVzc1tzaXRlLmlkXTtcbiAgICBjb25zdCBoYXNGYWlsZWQgPSBzaXRlLmxhc3RQdWJsaXNoRmFpbGVkICYmICFpc1B1Ymxpc2hpbmc7XG4gICAgY29uc3QgaXNMaXZlID0gc2l0ZS5pc1B1Ymxpc2hlZCAmJiAhaGFzRmFpbGVkO1xuICAgIGNvbnN0IGxpdmUgPSB0aGlzLnBsdWdpbi5saXZlU3RhdHVzW3NpdGUuaWRdID8/IG51bGw7XG5cbiAgICAvLyBcdTI1MDBcdTI1MDAgSGVhZGVyOiBTaXRlIHN3aXRjaGVyIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuICAgIG5ldyBTZXR0aW5nKHJvb3QpXG4gICAgICAuc2V0TmFtZSgnQ3VycmVudCBzaXRlJylcbiAgICAgIC5hZGREcm9wZG93bihkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCBzcCBvZiBzLnNpdGVzKSB7XG4gICAgICAgICAgZC5hZGRPcHRpb24oc3AuaWQsIHNwLm5hbWUgfHwgc3AuZ2l0aHViUmVwbyk7XG4gICAgICAgIH1cbiAgICAgICAgZC5zZXRWYWx1ZShzaXRlLmlkKTtcbiAgICAgICAgZC5vbkNoYW5nZSgoaWQpID0+IHsgdm9pZCAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIHMuYWN0aXZlU2l0ZUlkID0gaWQ7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgdm9pZCB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9KSgpOyB9KTtcbiAgICAgIH0pXG4gICAgICAuYWRkQnV0dG9uKGIgPT4ge1xuICAgICAgICBiLnNldEljb24oJ3BsdXMnKS5zZXRUb29sdGlwKCdDcmVhdGUgYW5vdGhlciBzaXRlJykub25DbGljaygoKSA9PiB7XG4gICAgICAgICAgbmV3IEFkZFNpdGVNb2RhbCh0aGlzLmFwcCwgdGhpcy5wbHVnaW4sICgpID0+IHRoaXMucmVmcmVzaCgpKS5vcGVuKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAvLyBcdTI1MDBcdTI1MDAgTGl2ZSBTdGF0dXMgRGFzaGJvYXJkIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuICAgIHRoaXMucmVuZGVyU3RhdHVzRGFzaGJvYXJkKHJvb3QsIHNpdGUsIGlzTGl2ZSwgaGFzRmFpbGVkLCBpc1B1Ymxpc2hpbmcsIGxpdmUpO1xuXG4gICAgLy8gXHUyNTAwXHUyNTAwIENsb3VkZmxhcmUgcmVjb25uZWN0IHdhcm5pbmcgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXG4gICAgaWYgKFxuICAgICAgc2l0ZS5ob3N0aW5nUHJvdmlkZXIgPT09ICdjbG91ZGZsYXJlJyAmJlxuICAgICAgc2l0ZS5sYXN0UHVibGlzaEVycm9yICYmXG4gICAgICAvZGlzY29ubmVjdHxnaXQgYWNjb3VudC9pLnRlc3Qoc2l0ZS5sYXN0UHVibGlzaEVycm9yKVxuICAgICkge1xuICAgICAgY29uc3Qgd2FybkJhbm5lciA9IHJvb3QuY3JlYXRlRGl2KCduZi1jZi13YXJuLWJhbm5lcicpO1xuICAgICAgd2FybkJhbm5lci5jcmVhdGVFbCgnc3Ryb25nJywgeyB0ZXh0OiAnXHUyNkEwIENsb3VkZmxhcmUgZGlzY29ubmVjdGVkIGZyb20gR2l0SHViJyB9KTtcbiAgICAgIHdhcm5CYW5uZXIuY3JlYXRlRWwoJ3AnLCB7XG4gICAgICAgIHRleHQ6ICdZb3VyIGxhc3QgYnVpbGQgZmFpbGVkIGJlY2F1c2UgQ2xvdWRmbGFyZSBsb3N0IGFjY2VzcyB0byB5b3VyIEdpdEh1YiByZXBvc2l0b3J5LiBDbGljayBiZWxvdyB0byByZS1hdXRob3JpemUsIHRoZW4gcHVibGlzaCBhZ2Fpbi4nLFxuICAgICAgfSk7XG4gICAgICBjb25zdCByZWNvbm5lY3RCdG4gPSB3YXJuQmFubmVyLmNyZWF0ZUVsKCdidXR0b24nLCB7IHRleHQ6ICdSZS1hdXRob3JpemUgQ2xvdWRmbGFyZSBcdTIxOTcnLCBjbHM6ICdtb2QtY3RhJyB9KTtcbiAgICAgIHJlY29ubmVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHsgd2luZG93Lm9wZW4oQ0xPVURGTEFSRV9BUFBfVVJMLCAnX2JsYW5rJyk7IH0pO1xuICAgIH1cblxuICAgIC8vIFx1MjUwMFx1MjUwMCBTaXRlIFB1Ymxpc2ggU2NvcGUgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXG4gICAgbGV0IHVwZGF0ZVZpc2liaWxpdHk6ICgpID0+IHZvaWQ7XG5cbiAgICBuZXcgU2V0dGluZyhyb290KVxuICAgICAgLnNldE5hbWUoJ1B1Ymxpc2ggc2NvcGUnKVxuICAgICAgLnNldERlc2MoJ0NvbmZpZ3VyZSB3aGF0IHRvIHB1Ymxpc2g6IHRoZSBlbnRpcmUgdmF1bHQgb3Igc2VsZWN0ZWQgZmlsZXMvZm9sZGVycy4nKVxuICAgICAgLmFkZERyb3Bkb3duKGQgPT4ge1xuICAgICAgICBkLmFkZE9wdGlvbigndmF1bHQnLCAnRnVsbCBWYXVsdCcpO1xuICAgICAgICBkLmFkZE9wdGlvbignc2VsZWN0ZWQnLCAnU2VsZWN0ZWQgRmlsZXMvRm9sZGVycycpO1xuICAgICAgICBkLnNldFZhbHVlKHNpdGUucHVibGlzaFNjb3BlIHx8ICd2YXVsdCcpO1xuICAgICAgICBkLm9uQ2hhbmdlKCh2KSA9PiB7IHZvaWQgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICBzaXRlLnB1Ymxpc2hTY29wZSA9IHYgYXMgJ3ZhdWx0JyB8ICdzZWxlY3RlZCc7XG4gICAgICAgICAgdXBkYXRlVmlzaWJpbGl0eSgpO1xuICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICB9KSgpOyB9KTtcbiAgICAgIH0pO1xuXG4gICAgY29uc3QgcGF0aHNDb250YWluZXIgPSByb290LmNyZWF0ZURpdignbm90ZWZsYXJlLXBhdGhzLWNvbnRhaW5lcicpO1xuICAgIHBhdGhzQ29udGFpbmVyLnNldENzc1N0eWxlcyh7XG4gICAgICBwYWRkaW5nTGVmdDogJzAnLFxuICAgICAgcGFkZGluZ1JpZ2h0OiAnMCcsXG4gICAgICBwYWRkaW5nQm90dG9tOiAnMWVtJ1xuICAgIH0pO1xuICAgIFxuICAgIGNvbnN0IHJlbmRlclBhdGhzID0gKCkgPT4ge1xuICAgICAgcGF0aHNDb250YWluZXIuZW1wdHkoKTtcbiAgICAgIGlmICgoc2l0ZS5wdWJsaXNoU2NvcGUgfHwgJ3ZhdWx0JykgPT09ICd2YXVsdCcpIHtcbiAgICAgICAgcGF0aHNDb250YWluZXIuc2V0Q3NzU3R5bGVzKHsgZGlzcGxheTogJ25vbmUnIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBwYXRoc0NvbnRhaW5lci5zZXRDc3NTdHlsZXMoeyBkaXNwbGF5OiAnYmxvY2snIH0pO1xuICAgICAgXG4gICAgICBjb25zdCBhZGRSb3cgPSBwYXRoc0NvbnRhaW5lci5jcmVhdGVEaXYoJ25vdGVmbGFyZS1hZGQtcGF0aC1yb3cnKTtcbiAgICAgIGFkZFJvdy5zZXRDc3NTdHlsZXMoeyBtYXJnaW5Ub3A6ICc4cHgnIH0pO1xuICAgICAgXG4gICAgICBjb25zdCBhZGRCdG4gPSBhZGRSb3cuY3JlYXRlRWwoJ2J1dHRvbicsIHsgdGV4dDogJ0Jyb3dzZSBWYXVsdC4uLicgfSk7XG4gICAgICBhZGRCdG4uc2V0Q3NzU3R5bGVzKHsgd2lkdGg6ICcxMDAlJyB9KTtcbiAgICAgIGFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgbmV3IFBhdGhTdWdnZXN0TW9kYWwodGhpcy5hcHAsIChzZWxlY3RlZFBhdGgpID0+IHsgdm9pZCAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGlmICghc2l0ZS5wdWJsaXNoUGF0aHMpIHNpdGUucHVibGlzaFBhdGhzID0gW107XG4gICAgICAgICAgaWYgKCFzaXRlLnB1Ymxpc2hQYXRocy5pbmNsdWRlcyhzZWxlY3RlZFBhdGgpKSB7XG4gICAgICAgICAgICBzaXRlLnB1Ymxpc2hQYXRocy5wdXNoKHNlbGVjdGVkUGF0aCk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIHJlbmRlclBhdGhzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSgpOyB9KS5vcGVuKCk7XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgcGF0aHMgPSBzaXRlLnB1Ymxpc2hQYXRocyB8fCBbXTtcbiAgICAgIGlmIChwYXRocy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY29uc3QgcCA9IHBhdGhzQ29udGFpbmVyLmNyZWF0ZUVsKCdwJywgeyB0ZXh0OiAnTm8gZmlsZXMgb3IgZm9sZGVycyBzZWxlY3RlZC4nLCBjbHM6ICdzZXR0aW5nLWl0ZW0tZGVzY3JpcHRpb24nIH0pO1xuICAgICAgICBwLnNldENzc1N0eWxlcyh7IG1hcmdpblRvcDogJzEycHgnIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgY2hpcENvbnRhaW5lciA9IHBhdGhzQ29udGFpbmVyLmNyZWF0ZURpdigpO1xuICAgICAgICBjaGlwQ29udGFpbmVyLnNldENzc1N0eWxlcyh7XG4gICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgIGZsZXhXcmFwOiAnd3JhcCcsXG4gICAgICAgICAgZ2FwOiAnOHB4JyxcbiAgICAgICAgICBtYXJnaW5Ub3A6ICcxMnB4JyxcbiAgICAgICAgICBtYXhIZWlnaHQ6ICcxNTBweCcsXG4gICAgICAgICAgb3ZlcmZsb3dZOiAnYXV0bycsXG4gICAgICAgICAgcGFkZGluZzogJzRweCAwJ1xuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhdGhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgY2hpcCA9IGNoaXBDb250YWluZXIuY3JlYXRlRGl2KCk7XG4gICAgICAgICAgY2hpcC5zZXRDc3NTdHlsZXMoe1xuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICBnYXA6ICc2cHgnLFxuICAgICAgICAgICAgcGFkZGluZzogJzRweCA4cHgnLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItZm9ybS1maWVsZCknLFxuICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKScsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICd2YXIoLS1yYWRpdXMtcyknLFxuICAgICAgICAgICAgZm9udFNpemU6ICd2YXIoLS1mb250LXVpLXNtYWxsZXIpJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIFxuICAgICAgICAgIGNvbnN0IGljb25TcGFuID0gY2hpcC5jcmVhdGVTcGFuKCk7XG4gICAgICAgICAgY29uc3QgYWJzdHJhY3RGaWxlID0gdGhpcy5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKHBhdGhzW2ldKTtcbiAgICAgICAgICBjb25zdCBpc0ZvbGRlciA9IGFic3RyYWN0RmlsZSAmJiAnY2hpbGRyZW4nIGluIGFic3RyYWN0RmlsZTtcbiAgICAgICAgICBzZXRJY29uKGljb25TcGFuLCBpc0ZvbGRlciA/ICdmb2xkZXInIDogJ2ZpbGUtdGV4dCcpO1xuICAgICAgICAgIGljb25TcGFuLnNldENzc1N0eWxlcyh7XG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgIGNvbG9yOiAndmFyKC0tdGV4dC1tdXRlZCknLFxuICAgICAgICAgICAgd2lkdGg6ICcxNHB4JyxcbiAgICAgICAgICAgIGhlaWdodDogJzE0cHgnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgXG4gICAgICAgICAgY2hpcC5jcmVhdGVTcGFuKHsgdGV4dDogcGF0aHNbaV0gfSk7XG4gICAgICAgICAgY29uc3QgcmVtb3ZlQnRuID0gY2hpcC5jcmVhdGVTcGFuKHsgY2xzOiAnY2xpY2thYmxlLWljb24nIH0pO1xuICAgICAgICAgIHNldEljb24ocmVtb3ZlQnRuLCAneCcpO1xuICAgICAgICAgIHJlbW92ZUJ0bi5zZXRDc3NTdHlsZXMoe1xuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICBwYWRkaW5nOiAnMCcsXG4gICAgICAgICAgICB3aWR0aDogJzE0cHgnLFxuICAgICAgICAgICAgaGVpZ2h0OiAnMTRweCdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZW1vdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7IHZvaWQgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHNpdGUucHVibGlzaFBhdGhzPy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIHJlbmRlclBhdGhzKCk7XG4gICAgICAgICAgfSkoKTsgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdXBkYXRlVmlzaWJpbGl0eSA9ICgpID0+IHtcbiAgICAgIHJlbmRlclBhdGhzKCk7XG4gICAgfTtcbiAgICB1cGRhdGVWaXNpYmlsaXR5KCk7XG5cbiAgICAvLyBcdTI1MDBcdTI1MDAgQWR2YW5jZWQgQ3VzdG9taXphdGlvbiBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcbiAgICBuZXcgU2V0dGluZyhyb290KVxuICAgICAgLnNldE5hbWUoJ0FkdmFuY2VkJylcbiAgICAgIC5zZXREZXNjKCdDb25maWd1cmUgbWV0YWRhdGEsIHN0eWxpbmcsIGFuZCBleGNsdXNpb25zIGZvciB0aGlzIHNpdGUuJylcbiAgICAgIC5hZGRCdXR0b24oYiA9PiB7XG4gICAgICAgIGIuc2V0QnV0dG9uVGV4dCgnRWRpdCcpLm9uQ2xpY2soKCkgPT4ge1xuICAgICAgICAgIG5ldyBFZGl0U2l0ZU1vZGFsKHRoaXMuYXBwLCB0aGlzLnBsdWdpbiwgc2l0ZSwgKCkgPT4gdGhpcy5yZWZyZXNoKCkpLm9wZW4oKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIC8vIFx1MjUwMFx1MjUwMCBBY3Rpb25zIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuICAgIHRoaXMucmVuZGVyQWN0aW9ucyhyb290LCBzaXRlLCBpc0xpdmUsIGhhc0ZhaWxlZCwgaXNQdWJsaXNoaW5nKTtcbiAgfVxuXG4gIC8qKiBSZW5kZXIgdGhlIGxpdmUgc3RhdHVzIGRhc2hib2FyZCBjYXJkLiAqL1xuICBwcml2YXRlIHJlbmRlclN0YXR1c0Rhc2hib2FyZChcbiAgICByb290OiBIVE1MRWxlbWVudCxcbiAgICBzaXRlOiBTaXRlUHJvZmlsZSxcbiAgICBpc0xpdmU6IGJvb2xlYW4sXG4gICAgaGFzRmFpbGVkOiBib29sZWFuLFxuICAgIGlzUHVibGlzaGluZzogYm9vbGVhbixcbiAgICBsaXZlOiBMaXZlU2l0ZVN0YXR1cyB8IG51bGwsXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGNhcmQgPSByb290LmNyZWF0ZURpdignbmYtc3RhdHVzLWNhcmQnKTtcbiAgICBjYXJkLnNldENzc1N0eWxlcyh7XG4gICAgICBtYXJnaW5Cb3R0b206ICcxMnB4JyxcbiAgICAgIHBhZGRpbmc6ICcxMnB4IDE0cHgnLFxuICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKScsXG4gICAgICBib3JkZXJSYWRpdXM6ICd2YXIoLS1yYWRpdXMtbSknLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tYmFja2dyb3VuZC1wcmltYXJ5LWFsdCknLFxuICAgIH0pO1xuXG4gICAgLy8gXHUyNTAwXHUyNTAwIFJvdyAxOiBTdGF0dXMgYmFkZ2UgKyBSZWZyZXNoIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuICAgIGNvbnN0IGhlYWRlclJvdyA9IGNhcmQuY3JlYXRlRGl2KCk7XG4gICAgaGVhZGVyUm93LnNldENzc1N0eWxlcyh7XG4gICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXG4gICAgICBtYXJnaW5Cb3R0b206ICcxMHB4JyxcbiAgICB9KTtcblxuICAgIC8vIERlcml2ZSB0aGUgYmFkZ2UgZnJvbSBzaW5nbGUgc291cmNlIG9mIHRydXRoXG4gICAgbGV0IGJhZGdlRW1vamkgPSAnXHUyNkFBJztcbiAgICBsZXQgYmFkZ2VUZXh0ID0gJ09mZmxpbmUnO1xuICAgIGxldCBiYWRnZUNvbG9yID0gJ3ZhcigtLXRleHQtbXV0ZWQpJztcblxuICAgIGlmIChpc1B1Ymxpc2hpbmcpIHtcbiAgICAgIGJhZGdlRW1vamkgPSAnXHVEODNEXHVERDM1JztcbiAgICAgIGJhZGdlVGV4dCA9ICdQdWJsaXNoaW5nXHUyMDI2JztcbiAgICAgIGJhZGdlQ29sb3IgPSAndmFyKC0tdGV4dC1hY2NlbnQpJztcbiAgICB9IGVsc2UgaWYgKGhhc0ZhaWxlZCkge1xuICAgICAgYmFkZ2VFbW9qaSA9ICdcdUQ4M0RcdUREMzQnO1xuICAgICAgYmFkZ2VUZXh0ID0gJ0xhc3QgcHVibGlzaCBmYWlsZWQnO1xuICAgICAgYmFkZ2VDb2xvciA9ICd2YXIoLS10ZXh0LWVycm9yKSc7XG4gICAgfSBlbHNlIGlmIChpc0xpdmUpIHtcbiAgICAgIC8vIElmIHdlIGhhdmUgbGl2ZSBkYXRhLCBzaG93IHRoZSBhY3R1YWwgd29ya2Zsb3cgY29uY2x1c2lvblxuICAgICAgaWYgKGxpdmUgJiYgIWxpdmUubG9hZGluZyAmJiBsaXZlLndvcmtmbG93U3RhdHVzID09PSAnY29tcGxldGVkJykge1xuICAgICAgICBpZiAobGl2ZS53b3JrZmxvd0NvbmNsdXNpb24gPT09ICdzdWNjZXNzJykge1xuICAgICAgICAgIGJhZGdlRW1vamkgPSAnXHVEODNEXHVERkUyJztcbiAgICAgICAgICBiYWRnZVRleHQgPSAnTGl2ZSc7XG4gICAgICAgICAgYmFkZ2VDb2xvciA9ICd2YXIoLS10ZXh0LXN1Y2Nlc3MpJztcbiAgICAgICAgfSBlbHNlIGlmIChsaXZlLndvcmtmbG93Q29uY2x1c2lvbiA9PT0gJ2ZhaWx1cmUnKSB7XG4gICAgICAgICAgYmFkZ2VFbW9qaSA9ICdcdUQ4M0RcdUREMzQnO1xuICAgICAgICAgIGJhZGdlVGV4dCA9IHNpdGUuaG9zdGluZ1Byb3ZpZGVyID09PSAnY2xvdWRmbGFyZScgPyAnQnVpbGQgZmFpbGVkIG9uIENsb3VkZmxhcmUnIDogJ0J1aWxkIGZhaWxlZCBvbiBHaXRIdWInO1xuICAgICAgICAgIGJhZGdlQ29sb3IgPSAndmFyKC0tdGV4dC1lcnJvciknO1xuICAgICAgICB9IGVsc2UgaWYgKGxpdmUud29ya2Zsb3dDb25jbHVzaW9uID09PSAnY2FuY2VsbGVkJykge1xuICAgICAgICAgIGJhZGdlRW1vamkgPSAnXHVEODNEXHVERkUxJztcbiAgICAgICAgICBiYWRnZVRleHQgPSAnQnVpbGQgY2FuY2VsbGVkJztcbiAgICAgICAgICBiYWRnZUNvbG9yID0gJ3ZhcigtLWNvbG9yLXllbGxvdyknO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGxpdmUgJiYgbGl2ZS53b3JrZmxvd1N0YXR1cyA9PT0gJ2luX3Byb2dyZXNzJykge1xuICAgICAgICBiYWRnZUVtb2ppID0gJ1x1RDgzRFx1REQzNSc7XG4gICAgICAgIGJhZGdlVGV4dCA9IHNpdGUuaG9zdGluZ1Byb3ZpZGVyID09PSAnY2xvdWRmbGFyZScgPyAnQnVpbGRpbmcgb24gQ2xvdWRmbGFyZVx1MjAyNicgOiAnQnVpbGRpbmcgb24gR2l0SHViXHUyMDI2JztcbiAgICAgICAgYmFkZ2VDb2xvciA9ICd2YXIoLS10ZXh0LWFjY2VudCknO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYmFkZ2VFbW9qaSA9ICdcdUQ4M0RcdURGRTInO1xuICAgICAgICBiYWRnZVRleHQgPSAnTGl2ZSc7XG4gICAgICAgIGJhZGdlQ29sb3IgPSAndmFyKC0tdGV4dC1zdWNjZXNzKSc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgYmFkZ2VFbCA9IGhlYWRlclJvdy5jcmVhdGVFbCgnc3BhbicpO1xuICAgIGJhZGdlRWwuc2V0Q3NzU3R5bGVzKHsgZm9udFdlaWdodDogJzYwMCcsIGNvbG9yOiBiYWRnZUNvbG9yLCBmb250U2l6ZTogJ3ZhcigtLWZvbnQtdWktbWVkaXVtKScgfSk7XG4gICAgYmFkZ2VFbC5zZXRUZXh0KGAke2JhZGdlRW1vaml9ICR7YmFkZ2VUZXh0fWApO1xuXG4gICAgLy8gUmVmcmVzaCBidXR0b24gKHJpZ2h0IHNpZGUpXG4gICAgY29uc3QgcmVmcmVzaEJ0biA9IGhlYWRlclJvdy5jcmVhdGVFbCgnYnV0dG9uJywgeyB0ZXh0OiBsaXZlPy5sb2FkaW5nID8gJ1x1MjAyNicgOiAnXHUyMUJCIFJlZnJlc2gnIH0pO1xuICAgIHJlZnJlc2hCdG4uc2V0Q3NzU3R5bGVzKHsgZm9udFNpemU6ICd2YXIoLS1mb250LXVpLXNtYWxsZXIpJywgcGFkZGluZzogJzJweCA4cHgnIH0pO1xuICAgIGlmIChsaXZlPy5sb2FkaW5nKSByZWZyZXNoQnRuLnNldEF0dHIoJ2Rpc2FibGVkJywgJ3RydWUnKTtcbiAgICByZWZyZXNoQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY29uc3QgcyA9IHRoaXMucGx1Z2luLmdldEFjdGl2ZVNpdGUoKTtcbiAgICAgIGlmIChzKSB2b2lkIHRoaXMucGx1Z2luLmZldGNoTGl2ZVN0YXR1cyhzKTtcbiAgICB9KTtcblxuICAgIC8vIFx1MjUwMFx1MjUwMCBSb3cgMjogRGV0YWlscyBncmlkIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuICAgIGNvbnN0IGdyaWQgPSBjYXJkLmNyZWF0ZURpdigpO1xuICAgIGdyaWQuc2V0Q3NzU3R5bGVzKHtcbiAgICAgIGRpc3BsYXk6ICdncmlkJyxcbiAgICAgIGdyaWRUZW1wbGF0ZUNvbHVtbnM6ICcxZnIgMWZyJyxcbiAgICAgIGdhcDogJzZweCAxNnB4JyxcbiAgICAgIGZvbnRTaXplOiAndmFyKC0tZm9udC11aS1zbWFsbGVyKScsXG4gICAgICBjb2xvcjogJ3ZhcigtLXRleHQtbXV0ZWQpJyxcbiAgICB9KTtcblxuICAgIGNvbnN0IGFkZFJvdyA9IChsYWJlbDogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBocmVmPzogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBsYWJlbEVsID0gZ3JpZC5jcmVhdGVFbCgnc3BhbicsIHsgdGV4dDogbGFiZWwgfSk7XG4gICAgICBsYWJlbEVsLnNldENzc1N0eWxlcyh7IGZvbnRXZWlnaHQ6ICc1MDAnLCBjb2xvcjogJ3ZhcigtLXRleHQtbm9ybWFsKScgfSk7XG4gICAgICBpZiAoaHJlZiAmJiB2YWx1ZSkge1xuICAgICAgICBjb25zdCBsaW5rRWwgPSBncmlkLmNyZWF0ZUVsKCdhJywgeyB0ZXh0OiB2YWx1ZSwgaHJlZiB9KTtcbiAgICAgICAgbGlua0VsLnNldENzc1N0eWxlcyh7IGNvbG9yOiAndmFyKC0tdGV4dC1hY2NlbnQpJywgb3ZlcmZsb3c6ICdoaWRkZW4nLCB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsIHdoaXRlU3BhY2U6ICdub3dyYXAnLCBkaXNwbGF5OiAnYmxvY2snIH0pO1xuICAgICAgICBsaW5rRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IHdpbmRvdy5vcGVuKGhyZWYsICdfYmxhbmsnKTsgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCB2YWxFbCA9IGdyaWQuY3JlYXRlRWwoJ3NwYW4nLCB7IHRleHQ6IHZhbHVlIHx8ICdcdTIwMTQnIH0pO1xuICAgICAgICB2YWxFbC5zZXRDc3NTdHlsZXMoeyBvdmVyZmxvdzogJ2hpZGRlbicsIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJywgd2hpdGVTcGFjZTogJ25vd3JhcCcgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIFNpdGUgVVJMXG4gICAgYWRkUm93KCdTaXRlIFVSTCcsIHNpdGUuc2l0ZVVybCA/IHNpdGUuc2l0ZVVybCA6ICdcdTIwMTQnLCBzaXRlLnNpdGVVcmwgPyBgaHR0cHM6Ly8ke3NpdGUuc2l0ZVVybC5yZXBsYWNlKC9eaHR0cHM/OlxcL1xcLy8sICcnKX1gIDogdW5kZWZpbmVkKTtcblxuICAgIC8vIEhvc3RcbiAgICBjb25zdCBob3N0TGFiZWwgPSBzaXRlLmhvc3RpbmdQcm92aWRlciA9PT0gJ2Nsb3VkZmxhcmUnID8gJ0Nsb3VkZmxhcmUgUGFnZXMnXG4gICAgICA6IHNpdGUuaG9zdGluZ1Byb3ZpZGVyID09PSAnZ2l0aHViLXBhZ2VzJyA/ICdHaXRIdWIgUGFnZXMnXG4gICAgICA6IHNpdGUuaG9zdGluZ1Byb3ZpZGVyO1xuICAgIGFkZFJvdygnSG9zdCcsIGhvc3RMYWJlbCk7XG5cbiAgICBpZiAobGl2ZSAmJiAhbGl2ZS5sb2FkaW5nKSB7XG4gICAgICAvLyBSZXBvc2l0b3J5IGxpbmtcbiAgICAgIGFkZFJvdyhcbiAgICAgICAgJ1JlcG9zaXRvcnknLFxuICAgICAgICBgJHt0aGlzLnBsdWdpbi5zZXR0aW5ncy5naXRodWJPd25lcn0vJHt0aGlzLnBsdWdpbi5zZXR0aW5ncy5tYXN0ZXJSZXBvc2l0b3J5fWAsXG4gICAgICAgIGxpdmUucmVwb0h0bWxVcmwgfHwgYGh0dHBzOi8vZ2l0aHViLmNvbS8ke3RoaXMucGx1Z2luLnNldHRpbmdzLmdpdGh1Yk93bmVyfS8ke3RoaXMucGx1Z2luLnNldHRpbmdzLm1hc3RlclJlcG9zaXRvcnl9YCxcbiAgICAgICk7XG5cbiAgICAgIC8vIExhc3QgcHVzaCB0aW1lXG4gICAgICBhZGRSb3coJ0xhc3QgcHVzaCcsIGxpdmUucmVwb1B1c2hlZEF0ID8gcmVsYXRpdmVUaW1lKGxpdmUucmVwb1B1c2hlZEF0KSA6ICdcdTIwMTQnKTtcblxuICAgICAgLy8gQ29tbWl0XG4gICAgICBpZiAobGl2ZS5jb21taXRTaGEpIHtcbiAgICAgICAgYWRkUm93KFxuICAgICAgICAgICdMYXN0IGNvbW1pdCcsXG4gICAgICAgICAgYCR7bGl2ZS5jb21taXRTaGF9JHtsaXZlLmNvbW1pdE1lc3NhZ2UgPyBgIFx1MjAxNCAke2xpdmUuY29tbWl0TWVzc2FnZS5zbGljZSgwLCA0MCl9YCA6ICcnfWAsXG4gICAgICAgICAgbGl2ZS5jb21taXRTaGEgPyBgaHR0cHM6Ly9naXRodWIuY29tLyR7dGhpcy5wbHVnaW4uc2V0dGluZ3MuZ2l0aHViT3duZXJ9LyR7dGhpcy5wbHVnaW4uc2V0dGluZ3MubWFzdGVyUmVwb3NpdG9yeX0vY29tbWl0c2AgOiB1bmRlZmluZWQsXG4gICAgICAgICk7XG4gICAgICAgIGFkZFJvdygnQ29tbWl0dGVkJywgcmVsYXRpdmVUaW1lKGxpdmUuY29tbWl0RGF0ZSkpO1xuICAgICAgfVxuXG4gICAgICAvLyBXb3JrZmxvdyBydW5cbiAgICAgIGlmICgoc2l0ZS5ob3N0aW5nUHJvdmlkZXIgPT09ICdnaXRodWItcGFnZXMnIHx8IHNpdGUuaG9zdGluZ1Byb3ZpZGVyID09PSAnY2xvdWRmbGFyZScpICYmIGxpdmUud29ya2Zsb3dTdGF0dXMpIHtcbiAgICAgICAgY29uc3Qgd2ZMYWJlbCA9IGxpdmUud29ya2Zsb3dTdGF0dXMgPT09ICdpbl9wcm9ncmVzcycgPyAnXHVEODNEXHVERDA0IEJ1aWxkaW5nXHUyMDI2J1xuICAgICAgICAgIDogbGl2ZS53b3JrZmxvd0NvbmNsdXNpb24gPT09ICdzdWNjZXNzJyA/ICdcdTI3MDUgUGFzc2VkJ1xuICAgICAgICAgIDogbGl2ZS53b3JrZmxvd0NvbmNsdXNpb24gPT09ICdmYWlsdXJlJyA/ICdcdTI3NEMgRmFpbGVkJ1xuICAgICAgICAgIDogbGl2ZS53b3JrZmxvd0NvbmNsdXNpb24gPT09ICdjYW5jZWxsZWQnID8gJ1x1MjZENCBDYW5jZWxsZWQnXG4gICAgICAgICAgOiBsaXZlLndvcmtmbG93U3RhdHVzO1xuICAgICAgICBhZGRSb3coJ0J1aWxkJywgd2ZMYWJlbCwgbGl2ZS53b3JrZmxvd1VybCB8fCB1bmRlZmluZWQpO1xuICAgICAgICBhZGRSb3coJ0J1aWxkIHJhbicsIHJlbGF0aXZlVGltZShsaXZlLndvcmtmbG93VXBkYXRlZEF0KSk7XG4gICAgICB9XG5cbiAgICAgIC8vIEZldGNoZWQgYXRcbiAgICAgIGlmIChsaXZlLmZldGNoZWRBdCkge1xuICAgICAgICBjb25zdCBmZXRjaGVkRWwgPSBjYXJkLmNyZWF0ZUVsKCdwJywgeyB0ZXh0OiBgU3RhdHVzIGZldGNoZWQgJHtyZWxhdGl2ZVRpbWUobGl2ZS5mZXRjaGVkQXQpfWAgfSk7XG4gICAgICAgIGZldGNoZWRFbC5zZXRDc3NTdHlsZXMoeyBtYXJnaW46ICc4cHggMCAwIDAnLCBmb250U2l6ZTogJ3ZhcigtLWZvbnQtdWktc21hbGxlciknLCBjb2xvcjogJ3ZhcigtLXRleHQtZmFpbnQpJyB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGxpdmU/LmxvYWRpbmcpIHtcbiAgICAgIGNvbnN0IGxvYWRpbmdFbCA9IGNhcmQuY3JlYXRlRWwoJ3AnLCB7IHRleHQ6ICdGZXRjaGluZyBsaXZlIHN0YXR1c1x1MjAyNicgfSk7XG4gICAgICBsb2FkaW5nRWwuc2V0Q3NzU3R5bGVzKHsgbWFyZ2luOiAnNnB4IDAgMCAwJywgZm9udFNpemU6ICd2YXIoLS1mb250LXVpLXNtYWxsZXIpJywgY29sb3I6ICd2YXIoLS10ZXh0LW11dGVkKScgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE5vIGxpdmUgZGF0YSB5ZXQgXHUyMDE0IHNob3cgY2FjaGVkIGluZm9cbiAgICAgIGFkZFJvdyhcbiAgICAgICAgJ1JlcG9zaXRvcnknLFxuICAgICAgICBgJHt0aGlzLnBsdWdpbi5zZXR0aW5ncy5naXRodWJPd25lcn0vJHt0aGlzLnBsdWdpbi5zZXR0aW5ncy5tYXN0ZXJSZXBvc2l0b3J5fWAsXG4gICAgICAgIGBodHRwczovL2dpdGh1Yi5jb20vJHt0aGlzLnBsdWdpbi5zZXR0aW5ncy5naXRodWJPd25lcn0vJHt0aGlzLnBsdWdpbi5zZXR0aW5ncy5tYXN0ZXJSZXBvc2l0b3J5fWAsXG4gICAgICApO1xuICAgICAgaWYgKHNpdGUubGFzdFB1Ymxpc2hlZCkge1xuICAgICAgICBhZGRSb3coJ0xhc3QgcHVibGlzaGVkJywgcmVsYXRpdmVUaW1lKHNpdGUubGFzdFB1Ymxpc2hlZCkpO1xuICAgICAgICBhZGRSb3coJ05vdGVzJywgU3RyaW5nKHNpdGUubGFzdE5vdGVDb3VudCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFx1MjUwMFx1MjUwMCBFcnJvciBkaXNwbGF5IFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuICAgIGlmIChoYXNGYWlsZWQgJiYgc2l0ZS5sYXN0UHVibGlzaEVycm9yKSB7XG4gICAgICBjb25zdCBlcnJFbCA9IGNhcmQuY3JlYXRlRWwoJ3AnLCB7IHRleHQ6IGBcdTI2QTAgJHtzaXRlLmxhc3RQdWJsaXNoRXJyb3J9YCB9KTtcbiAgICAgIGVyckVsLnNldENzc1N0eWxlcyh7XG4gICAgICAgIG1hcmdpbjogJzhweCAwIDAgMCcsXG4gICAgICAgIGZvbnRTaXplOiAndmFyKC0tZm9udC11aS1zbWFsbGVyKScsXG4gICAgICAgIGNvbG9yOiAndmFyKC0tdGV4dC1lcnJvciknLFxuICAgICAgICB3b3JkQnJlYWs6ICdicmVhay13b3JkJyxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFx1MjUwMFx1MjUwMCBCYWNrdXAgc3RhdHVzIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuICAgIGlmICh0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbmFibGVCYWNrdXApIHtcbiAgICAgIGNvbnN0IGJhY2t1cEVsID0gY2FyZC5jcmVhdGVFbCgncCcpO1xuICAgICAgYmFja3VwRWwuc2V0Q3NzU3R5bGVzKHsgbWFyZ2luOiAnOHB4IDAgMCAwJywgZm9udFNpemU6ICd2YXIoLS1mb250LXVpLXNtYWxsZXIpJywgY29sb3I6ICd2YXIoLS10ZXh0LW11dGVkKScsIGJvcmRlclRvcDogJzFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlciknLCBwYWRkaW5nVG9wOiAnOHB4JyB9KTtcbiAgICAgIGNvbnN0IGJhY2t1cFRleHQgPSB0aGlzLnBsdWdpbi5zZXR0aW5ncy5iYWNrdXAubGFzdEJhY2t1cEVycm9yXG4gICAgICAgID8gYEJhY2t1cDogXHUyNkEwICR7dGhpcy5wbHVnaW4uc2V0dGluZ3MuYmFja3VwLmxhc3RCYWNrdXBFcnJvcn1gXG4gICAgICAgIDogdGhpcy5wbHVnaW4uc2V0dGluZ3MuYmFja3VwLmxhc3RCYWNrdXBBdFxuICAgICAgICAgID8gYEJhY2t1cDogXHUyNzEzICR7cmVsYXRpdmVUaW1lKHRoaXMucGx1Z2luLnNldHRpbmdzLmJhY2t1cC5sYXN0QmFja3VwQXQpfWBcbiAgICAgICAgICA6ICdCYWNrdXA6IG5vdCBydW4geWV0JztcbiAgICAgIGJhY2t1cEVsLnNldFRleHQoYmFja3VwVGV4dCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFJlbmRlciB0aGUgUHVibGlzaCAvIFVucHVibGlzaCAvIERlbGV0ZSBhY3Rpb24gYnV0dG9ucy4gKi9cbiAgcHJpdmF0ZSByZW5kZXJBY3Rpb25zKFxuICAgIHJvb3Q6IEhUTUxFbGVtZW50LFxuICAgIHNpdGU6IFNpdGVQcm9maWxlLFxuICAgIGlzTGl2ZTogYm9vbGVhbixcbiAgICBoYXNGYWlsZWQ6IGJvb2xlYW4sXG4gICAgaXNQdWJsaXNoaW5nOiBib29sZWFuLFxuICApOiB2b2lkIHtcbiAgICBjb25zdCBhY3Rpb25Cb3ggPSByb290LmNyZWF0ZURpdignbmYtYWN0aW9ucy1ib3gnKTtcbiAgICBhY3Rpb25Cb3guc2V0Q3NzU3R5bGVzKHtcbiAgICAgIG1hcmdpblRvcDogJzhweCcsXG4gICAgICBwYWRkaW5nOiAnMTJweCcsXG4gICAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpJyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJ3ZhcigtLWJhY2tncm91bmQtcHJpbWFyeS1hbHQpJyxcbiAgICAgIGJvcmRlclJhZGl1czogJ3ZhcigtLXJhZGl1cy1zKScsXG4gICAgICBtYXJnaW5Cb3R0b206ICcxNXB4J1xuICAgIH0pO1xuXG4gICAgY29uc3QgYWN0aW9uSGVhZGluZyA9IG5ldyBTZXR0aW5nKGFjdGlvbkJveCkuc2V0TmFtZSgnQWN0aW9ucycpLnNldEhlYWRpbmcoKTtcbiAgICBhY3Rpb25IZWFkaW5nLnNldHRpbmdFbC5zZXRDc3NTdHlsZXMoeyBib3JkZXI6ICdub25lJywgcGFkZGluZzogJzAnLCBtYXJnaW5Cb3R0b206ICcxMnB4JyB9KTtcbiAgICBcbiAgICBjb25zdCBhY3Rpb25TZXR0aW5nID0gbmV3IFNldHRpbmcoYWN0aW9uQm94KTtcbiAgICBhY3Rpb25TZXR0aW5nLnNldHRpbmdFbC5zZXRDc3NTdHlsZXMoeyBib3JkZXI6ICdub25lJywgcGFkZGluZzogJzAnIH0pO1xuICAgIGFjdGlvblNldHRpbmcuaW5mb0VsLnNldENzc1N0eWxlcyh7IGRpc3BsYXk6ICdub25lJyB9KTtcbiAgICBhY3Rpb25TZXR0aW5nLmNvbnRyb2xFbC5zZXRDc3NTdHlsZXMoe1xuICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgZmxleERpcmVjdGlvbjogJ3JvdycsXG4gICAgICBnYXA6ICc4cHgnLFxuICAgICAgZmxleFdyYXA6ICd3cmFwJyxcbiAgICAgIGp1c3RpZnlDb250ZW50OiAnZmxleC1lbmQnLFxuICAgICAgd2lkdGg6ICcxMDAlJ1xuICAgIH0pO1xuXG4gICAgLy8gXHUyNTAwXHUyNTAwIEJ1dHRvbiBsYWJlbDogc2luZ2xlIHNvdXJjZSBvZiB0cnV0aCBmcm9tIHBlcnNpc3RlZCBTaXRlUHJvZmlsZSBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcbiAgICAvLyBoYXNGYWlsZWQgXHUyMTkyIFwiUmVwdWJsaXNoXCJcbiAgICAvLyBpc0xpdmUgKG5ldmVyIGZhaWxlZCkgXHUyMTkyIFwiVXBkYXRlXCJcbiAgICAvLyBuZXZlciBwdWJsaXNoZWQgXHUyMTkyIFwiUHVibGlzaFwiXG4gICAgY29uc3QgcHVibGlzaExhYmVsID0gaXNQdWJsaXNoaW5nXG4gICAgICA/ICdQdWJsaXNoaW5nXHUyMDI2J1xuICAgICAgOiBoYXNGYWlsZWRcbiAgICAgICAgPyAnUmVwdWJsaXNoJ1xuICAgICAgICA6IGlzTGl2ZVxuICAgICAgICAgID8gJ1VwZGF0ZSdcbiAgICAgICAgICA6ICdQdWJsaXNoJztcblxuICAgIGNvbnN0IGhvc3RpbmdQcm92aWRlciA9IHNpdGUuaG9zdGluZ1Byb3ZpZGVyO1xuXG4gICAgYWN0aW9uU2V0dGluZ1xuICAgICAgLmFkZEJ1dHRvbihiID0+IHtcbiAgICAgICAgYi5zZXRCdXR0b25UZXh0KHB1Ymxpc2hMYWJlbCk7XG4gICAgICAgIGlmIChpc1B1Ymxpc2hpbmcpIHtcbiAgICAgICAgICBiLnNldERpc2FibGVkKHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGIuc2V0Q3RhKCk7XG4gICAgICAgIH1cbiAgICAgICAgYi5vbkNsaWNrKCgpID0+IHsgdm9pZCAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGIuc2V0RGlzYWJsZWQodHJ1ZSk7XG4gICAgICAgICAgYi5zZXRCdXR0b25UZXh0KCdQdWJsaXNoaW5nXHUyMDI2Jyk7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLmRvUHVibGlzaCgpO1xuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICB2b2lkIHRoaXMucmVuZGVyKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSgpOyB9KTtcbiAgICAgIH0pXG4gICAgICAuYWRkQnV0dG9uKGIgPT4ge1xuICAgICAgICBpZiAoaG9zdGluZ1Byb3ZpZGVyID09PSAnY2xvdWRmbGFyZScpIHtcbiAgICAgICAgICBiLnNldEJ1dHRvblRleHQoJ1VucHVibGlzaCcpO1xuICAgICAgICAgIGlmICghaXNMaXZlIHx8IGlzUHVibGlzaGluZykge1xuICAgICAgICAgICAgYi5zZXREaXNhYmxlZCh0cnVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYi5idXR0b25FbC5hZGRDbGFzcygnbW9kLXdhcm5pbmcnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYi5vbkNsaWNrKCgpID0+IHtcbiAgICAgICAgICAgIG5ldyBVbnB1Ymxpc2hNb2RhbCh0aGlzLmFwcCwgdGhpcy5wbHVnaW4sICgpID0+IHRoaXMucmVmcmVzaCgpKS5vcGVuKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gR2l0SHViIFBhZ2VzIGNhbm5vdCBiZSBwYXVzZWQgdmlhIEFQSS5cbiAgICAgICAgICBiLnNldEJ1dHRvblRleHQoJ1VucHVibGlzaCAoTWFudWFsKScpO1xuICAgICAgICAgIGlmICghaXNMaXZlIHx8IGlzUHVibGlzaGluZykge1xuICAgICAgICAgICAgYi5zZXREaXNhYmxlZCh0cnVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYi5idXR0b25FbC5hZGRDbGFzcygnbW9kLXdhcm5pbmcnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYi5vbkNsaWNrKCgpID0+IHtcbiAgICAgICAgICAgIHZvaWQgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgLy8gTWFyayB0aGUgc2l0ZSBvZmZsaW5lIGxvY2FsbHkgc28gdGhlIHBhbmVsIHJlZmxlY3RzIHRoZSBjaGFuZ2UuXG4gICAgICAgICAgICAgIC8vIFRoZSB1c2VyIG11c3Qgc3RpbGwgbWFudWFsbHkgZGlzYWJsZSBHaXRIdWIgUGFnZXMgaW4gdGhlaXIgcmVwb1xuICAgICAgICAgICAgICAvLyBzZXR0aW5ncyBcdTIwMTQgdGhpcyBqdXN0IGtlZXBzIE5vdGVGbGFyZSdzIHN0YXRlIGNvbnNpc3RlbnQuXG4gICAgICAgICAgICAgIHNpdGUuaXNQdWJsaXNoZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgIG5ldyBHaXRIdWJQYWdlc1VucHVibGlzaE1vZGFsKFxuICAgICAgICAgICAgICAgIHRoaXMuYXBwLFxuICAgICAgICAgICAgICAgIGBodHRwczovL2dpdGh1Yi5jb20vJHt0aGlzLnBsdWdpbi5zZXR0aW5ncy5naXRodWJPd25lcn0vJHt0aGlzLnBsdWdpbi5zZXR0aW5ncy5tYXN0ZXJSZXBvc2l0b3J5fS9zZXR0aW5ncy9wYWdlc2AsXG4gICAgICAgICAgICAgICkub3BlbigpO1xuICAgICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuYWRkQnV0dG9uKGIgPT4ge1xuICAgICAgICBjb25zdCBkZWxldGVUb29sdGlwID0gaG9zdGluZ1Byb3ZpZGVyID09PSAnY2xvdWRmbGFyZSdcbiAgICAgICAgICA/ICdSZW1vdmVzIHRoZSBDbG91ZGZsYXJlIFBhZ2VzIHByb2plY3QgKEFQSSkgYW5kIHRoZSBzaXRlIGZvbGRlciBmcm9tIEdpdEh1YidcbiAgICAgICAgICA6ICdSZW1vdmVzIHRoZSBzaXRlIGZvbGRlciBmcm9tIEdpdEh1Yi4gR2l0SHViIFBhZ2VzIGxpbmsgbWF5IHJlbWFpbiBcdTIwMTQgZGlzYWJsZSBpdCBtYW51YWxseSBpbiByZXBvIFNldHRpbmdzIFx1MjE5MiBQYWdlcyc7XG4gICAgICAgIGIuc2V0QnV0dG9uVGV4dCgnRGVsZXRlJyk7XG4gICAgICAgIGIuc2V0VG9vbHRpcChkZWxldGVUb29sdGlwKTtcbiAgICAgICAgaWYgKGlzUHVibGlzaGluZykgYi5zZXREaXNhYmxlZCh0cnVlKTtcbiAgICAgICAgZWxzZSBiLmJ1dHRvbkVsLmFkZENsYXNzKCdtb2Qtd2FybmluZycpO1xuICAgICAgICBiLm9uQ2xpY2soKCkgPT4ge1xuICAgICAgICAgIG5ldyBSZW1vdmVTaXRlTW9kYWwodGhpcy5hcHAsIHRoaXMucGx1Z2luLCBzaXRlLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgICB9KS5vcGVuKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cbn0iLCAiLyoqXG4gKiBUb2tlbiBzdG9yYWdlIGJhY2tlZCBieSBFbGVjdHJvbiBgc2FmZVN0b3JhZ2VgLCB3aGljaCBlbmNyeXB0cy9kZWNyeXB0cyB3aXRoIGFcbiAqIGtleSBoZWxkIGluIHRoZSBPUyBrZXljaGFpbiAobWFjT1MgS2V5Y2hhaW4gLyBXaW5kb3dzIERQQVBJIC8gTGludXggbGlic2VjcmV0KS5cbiAqXG4gKiBXZSBwZXJzaXN0IE9OTFkgdGhlIGNpcGhlcnRleHQgKGJhc2U2NCkgaW4gYGRhdGEuanNvbmA7IHRoZSBwbGFpbnRleHQgdG9rZW5cbiAqIGxpdmVzIGluIG1lbW9yeSBhdCBydW50aW1lIGFuZCBpcyBuZXZlciB3cml0dGVuIHRvIGRpc2suIFRoaXMga2VlcHMgdGhlIHVzZXInc1xuICogR2l0SHViL0Nsb3VkZmxhcmUgdG9rZW5zIG91dCBvZiB0aGUgcGxhaW50ZXh0IHNldHRpbmdzIGZpbGUuXG4gKi9cblxuaW50ZXJmYWNlIFNhZmVTdG9yYWdlIHtcbiAgaXNFbmNyeXB0aW9uQXZhaWxhYmxlKCk6IGJvb2xlYW47XG4gIGVuY3J5cHRTdHJpbmcocGxhaW46IHN0cmluZyk6IEJ1ZmZlcjtcbiAgZGVjcnlwdFN0cmluZyhidWY6IEJ1ZmZlcik6IHN0cmluZztcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZVNhZmVTdG9yYWdlKCk6IFNhZmVTdG9yYWdlIHwgbnVsbCB7XG4gIHRyeSB7XG4gICAgLy8gT2JzaWRpYW4ncyByZW5kZXJlciBoYXMgbm9kZUludGVncmF0aW9uLCBzbyBgcmVxdWlyZSgnZWxlY3Ryb24nKWAgd29ya3MuXG4gICAgLy8gTmV3ZXIgRWxlY3Ryb24gZXhwb3NlcyBgc2FmZVN0b3JhZ2VgIGRpcmVjdGx5OyBvbGRlciB2ZXJzaW9ucyBvbmx5IHZpYSB0aGVcbiAgICAvLyBkZXByZWNhdGVkIGByZW1vdGVgIG1vZHVsZSBcdTIwMTQgdHJ5IGJvdGgsIGZhbGwgYmFjayB0byBudWxsIGlmIG5laXRoZXIuXG4gICAgLy8gT2JzaWRpYW4gcGx1Z2luIGV4ZWN1dGlvbiBlbnZpcm9ubWVudCBwcm92aWRlcyByZXF1aXJlKCdlbGVjdHJvbicpLlxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVxdWlyZS1pbXBvcnRzLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWNhbGwgLS0gcmVxdWlyZWQgdG8gYWNjZXNzIGVsZWN0cm9uIHNhZmVTdG9yYWdlIGluIE9ic2lkaWFuXG4gICAgY29uc3QgZWxlY3Ryb24gPSByZXF1aXJlKCdlbGVjdHJvbicpIGFzIHVua25vd24gYXMge1xuICAgICAgc2FmZVN0b3JhZ2U/OiBTYWZlU3RvcmFnZTtcbiAgICAgIHJlbW90ZT86IHsgc2FmZVN0b3JhZ2U/OiBTYWZlU3RvcmFnZSB9O1xuICAgIH07XG4gICAgcmV0dXJuIGVsZWN0cm9uLnNhZmVTdG9yYWdlID8/IGVsZWN0cm9uLnJlbW90ZT8uc2FmZVN0b3JhZ2UgPz8gbnVsbDtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuY29uc3Qgc2FmZVN0b3JhZ2UgPSByZXNvbHZlU2FmZVN0b3JhZ2UoKTtcblxuLyoqIFRydWUgd2hlbiB0aGUgT1MtYmFja2VkIGVuY3J5cHRpb24gaXMgdXNhYmxlIChlLmcuIGEga2V5cmluZyBpcyBwcmVzZW50KS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1NlY3VyZVN0b3JhZ2VBdmFpbGFibGUoKTogYm9vbGVhbiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhc2FmZVN0b3JhZ2UgJiYgc2FmZVN0b3JhZ2UuaXNFbmNyeXB0aW9uQXZhaWxhYmxlKCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vKiogRW5jcnlwdCBhIHRva2VuIHRvIGEgYmFzZTY0IHN0cmluZy4gRW1wdHkgaW4gXHUyMTkyIGVtcHR5IG91dC4gVGhyb3dzIGlmIHVuYXZhaWxhYmxlLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVuY3J5cHRTZWNyZXQocGxhaW46IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmICghcGxhaW4pIHJldHVybiAnJztcbiAgaWYgKCFpc1NlY3VyZVN0b3JhZ2VBdmFpbGFibGUoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignU2VjdXJlIHN0b3JhZ2UgaXMgdW5hdmFpbGFibGUgb24gdGhpcyBzeXN0ZW0uJyk7XG4gIH1cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtY2FsbCwgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1tZW1iZXItYWNjZXNzLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLXJldHVybiAtLSBTYWZlU3RvcmFnZSB0eXBpbmdzIGFyZSBpbmNvbXBsZXRlXG4gIHJldHVybiBzYWZlU3RvcmFnZSEuZW5jcnlwdFN0cmluZyhwbGFpbikudG9TdHJpbmcoJ2Jhc2U2NCcpO1xufVxuXG4vKiogRGVjcnlwdCBhIGJhc2U2NCBjaXBoZXJ0ZXh0IGJhY2sgdG8gdGhlIHRva2VuLiBSZXR1cm5zICcnIG9uIGFueSBmYWlsdXJlLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlY3J5cHRTZWNyZXQoYjY0OiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAoIWI2NCkgcmV0dXJuICcnO1xuICBpZiAoIWlzU2VjdXJlU3RvcmFnZUF2YWlsYWJsZSgpKSByZXR1cm4gJyc7XG4gIHRyeSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtY2FsbCwgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1yZXR1cm4sIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtbWVtYmVyLWFjY2VzcyAtLSBCdWZmZXIgdHlwaW5ncyBtYXkgYmUgbWlzc2luZyBpbiBPYnNpZGlhbiBjb250ZXh0XG4gICAgcmV0dXJuIHNhZmVTdG9yYWdlIS5kZWNyeXB0U3RyaW5nKEJ1ZmZlci5mcm9tKGI2NCwgJ2Jhc2U2NCcpKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuICcnO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQXBwIH0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IHsgR2l0SHViQXBpIH0gZnJvbSAnLi4vYXBpL2dpdGh1YkFwaSc7XG5pbXBvcnQgeyBCYWNrdXBSZXN1bHQsIE5vdGVGbGFyZVNldHRpbmdzLCBVcGxvYWRGaWxlIH0gZnJvbSAnLi4vY29yZS90eXBlcyc7XG5cbmNvbnN0IERFRkFVTFRfSUdOT1JFX1BBVFRFUk5TID0gW1xuICAnLkRTX1N0b3JlJyxcbiAgJ1RodW1icy5kYicsXG4gICdkZXNrdG9wLmluaScsXG4gICcudHJhc2gvJyxcbiAgJ25vZGVfbW9kdWxlcy8nLFxuXTtcblxuaW50ZXJmYWNlIExvY2FsQmFja3VwRmlsZSB7XG4gIGNvbnRlbnQ6IHN0cmluZztcbiAgc2hhOiBzdHJpbmc7XG59XG5cbi8qKlxuICogTWlycm9ycyB0aGUgc2VsZWN0ZWQgdmF1bHQgY29udGVudCB0byBwcml2YXRlIHJlbW90ZSBzdG9yYWdlLlxuICogVGhlIGxvY2FsIHZhdWx0IGlzIGF1dGhvcml0YXRpdmU7IHRoZXJlIGlzIG5vIHB1bGwsIGNvbmZsaWN0LCBicmFuY2gsIG9yXG4gKiBtYW51YWwgY29tbWl0IHdvcmtmbG93IGV4cG9zZWQgdG8gdXNlcnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBCYWNrdXBFbmdpbmUge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGFwcDogQXBwLFxuICAgIHByaXZhdGUgc2V0dGluZ3M6IE5vdGVGbGFyZVNldHRpbmdzLFxuICAgIHByaXZhdGUgb25Qcm9ncmVzczogKG1lc3NhZ2U6IHN0cmluZykgPT4gdm9pZCA9ICgpID0+IHt9LFxuICApIHt9XG5cbiAgYXN5bmMgYmFja3VwKCk6IFByb21pc2U8QmFja3VwUmVzdWx0PiB7XG4gICAgY29uc3QgcmVzdWx0OiBCYWNrdXBSZXN1bHQgPSB7IHN1Y2Nlc3M6IHRydWUsIHVwZGF0ZWQ6IDAsIGVycm9yczogW10gfTtcbiAgICBjb25zdCB7IGdpdGh1Yk93bmVyLCBnaXRodWJUb2tlbiwgYmFja3VwIH0gPSB0aGlzLnNldHRpbmdzO1xuXG4gICAgaWYgKCFnaXRodWJUb2tlbiB8fCAhZ2l0aHViT3duZXIgfHwgIWJhY2t1cC5yZXBvc2l0b3J5KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgdXBkYXRlZDogMCxcbiAgICAgICAgZXJyb3JzOiBbJ0JhY2t1cCBpcyBub3QgY29uZmlndXJlZC4gT3BlbiBOb3RlRmxhcmUgc2V0dGluZ3MgdG8gZmluaXNoIHNldHVwLiddLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgaXNQcml2YXRlID0gYmFja3VwLnJlcG9WaXNpYmlsaXR5ICE9PSAncHVibGljJztcbiAgICAgIGxldCBnaXRodWIgPSBuZXcgR2l0SHViQXBpKGdpdGh1YlRva2VuLCBnaXRodWJPd25lciwgYmFja3VwLnJlcG9zaXRvcnksICdtYWluJyk7XG4gICAgICBjb25zdCByZXBvc2l0b3J5RXhpc3RzID0gYXdhaXQgZ2l0aHViLnJlcG9FeGlzdHMoKTtcbiAgICAgIGlmICghcmVwb3NpdG9yeUV4aXN0cykge1xuICAgICAgICB0aGlzLm9uUHJvZ3Jlc3MoJ1ByZXBhcmluZyBiYWNrdXAgc3RvcmFnZVx1MjAyNicpO1xuICAgICAgICBhd2FpdCBnaXRodWIuY3JlYXRlUmVwbyhpc1ByaXZhdGUpO1xuICAgICAgICBpZiAoIShhd2FpdCBnaXRodWIud2FpdEZvclJlcG8oMzAwMDApKSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGltZWQgb3V0IHdoaWxlIHByZXBhcmluZyBiYWNrdXAgc3RvcmFnZS4nKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpc1ByaXZhdGUgJiYgIShhd2FpdCBnaXRodWIuaXNSZXBvUHJpdmF0ZSgpKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ0JhY2t1cCBzdG9wcGVkIGJlY2F1c2UgaXRzIHN0b3JhZ2UgbG9jYXRpb24gaXMgcHVibGljLiBSZW5hbWUgdGhhdCByZXBvc2l0b3J5IGluIEdpdEh1YiBvciBtYWtlIGl0IHByaXZhdGUsIHRoZW4gdHJ5IGFnYWluLicsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGxldCBicmFuY2ggPSAnbWFpbic7XG4gICAgICB0cnkge1xuICAgICAgICBicmFuY2ggPSBhd2FpdCBnaXRodWIuZ2V0RGVmYXVsdEJyYW5jaCgpO1xuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIC8vIFJlcG9zaXRvcmllcyBjcmVhdGVkIGJ5IE5vdGVGbGFyZSB1c2UgbWFpbi5cbiAgICAgIH1cbiAgICAgIGdpdGh1YiA9IG5ldyBHaXRIdWJBcGkoZ2l0aHViVG9rZW4sIGdpdGh1Yk93bmVyLCBiYWNrdXAucmVwb3NpdG9yeSwgYnJhbmNoKTtcblxuICAgICAgY29uc3QgbG9jYWxGaWxlcyA9IGF3YWl0IHRoaXMuY29sbGVjdExvY2FsRmlsZXMoKTtcbiAgICAgIGNvbnN0IHJlbW90ZUZpbGVzID0gYXdhaXQgdGhpcy5nZXRSZW1vdGVGaWxlcyhnaXRodWIpO1xuICAgICAgY29uc3QgdXBsb2FkczogVXBsb2FkRmlsZVtdID0gW107XG5cbiAgICAgIGZvciAoY29uc3QgW3BhdGgsIGxvY2FsXSBvZiBsb2NhbEZpbGVzKSB7XG4gICAgICAgIGlmIChyZW1vdGVGaWxlcy5nZXQocGF0aCkgIT09IGxvY2FsLnNoYSkge1xuICAgICAgICAgIHVwbG9hZHMucHVzaCh7IHBhdGgsIGNvbnRlbnQ6IGxvY2FsLmNvbnRlbnQgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVtb3RlRmlsZXMuZGVsZXRlKHBhdGgpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGNvbnN0IHBhdGggb2YgcmVtb3RlRmlsZXMua2V5cygpKSB7XG4gICAgICAgIC8vIFNraXAgZGVsZXRpb24gaWYgdGhlIGZpbGUgc3RpbGwgZXhpc3RzIGxvY2FsbHkgYnV0IHdhcyB0cmFuc2llbnRseSB1bnJlYWRhYmxlLlxuICAgICAgICBjb25zdCBsb2NhbEZpbGVFeGlzdHMgPSB0aGlzLmFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgocGF0aCkgIT09IG51bGw7XG4gICAgICAgIGlmICghdGhpcy5pc0lnbm9yZWQocGF0aCkgJiYgIWxvY2FsRmlsZUV4aXN0cykge1xuICAgICAgICAgIHVwbG9hZHMucHVzaCh7IHBhdGgsIGNvbnRlbnQ6IG51bGwgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHVwbG9hZHMubGVuZ3RoID09PSAwKSByZXR1cm4gcmVzdWx0O1xuXG4gICAgICBjb25zdCB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKCk7XG4gICAgICBjb25zdCBjb21taXR0ZWQgPSBhd2FpdCBnaXRodWIuY29tbWl0RmlsZXMoXG4gICAgICAgIHVwbG9hZHMsXG4gICAgICAgIGBOb3RlRmxhcmUgYmFja3VwIFx1MDBCNyAke3RpbWVzdGFtcH1gLFxuICAgICAgICAoZG9uZSwgdG90YWwpID0+IHRoaXMub25Qcm9ncmVzcyhgQmFja2luZyB1cCAke2RvbmV9LyR7dG90YWx9XHUyMDI2YCksXG4gICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgJycsXG4gICAgICAgIHsgaXNQcml2YXRlOiB0cnVlIH0sXG4gICAgICApO1xuXG4gICAgICByZXN1bHQuc3VjY2VzcyA9IGNvbW1pdHRlZC5zdWNjZXNzO1xuICAgICAgcmVzdWx0LnVwZGF0ZWQgPSBjb21taXR0ZWQudXBsb2FkZWQ7XG4gICAgICByZXN1bHQuZXJyb3JzID0gY29tbWl0dGVkLmVycm9ycztcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgcmVzdWx0LnN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgIHJlc3VsdC5lcnJvcnMucHVzaChlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6ICdCYWNrdXAgZmFpbGVkLicpO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGNvbGxlY3RMb2NhbEZpbGVzKCk6IFByb21pc2U8TWFwPHN0cmluZywgTG9jYWxCYWNrdXBGaWxlPj4ge1xuICAgIGNvbnN0IGZpbGVzID0gbmV3IE1hcDxzdHJpbmcsIExvY2FsQmFja3VwRmlsZT4oKTtcblxuICAgIGZvciAoY29uc3QgZmlsZSBvZiB0aGlzLmFwcC52YXVsdC5nZXRGaWxlcygpKSB7XG4gICAgICBpZiAodGhpcy5pc0lnbm9yZWQoZmlsZS5wYXRoKSkgY29udGludWU7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYXdhaXQgdGhpcy5hcHAudmF1bHQucmVhZEJpbmFyeShmaWxlKSk7XG4gICAgICAgIGZpbGVzLnNldChmaWxlLnBhdGgsIHtcbiAgICAgICAgICBjb250ZW50OiB0aGlzLnRvQmFzZTY0KGJ5dGVzKSxcbiAgICAgICAgICBzaGE6IGF3YWl0IHRoaXMuY29tcHV0ZUdpdEJsb2JTaGEoYnl0ZXMpLFxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvLyBBIHRyYW5zaWVudGx5IHVucmVhZGFibGUgZmlsZSBpcyBza2lwcGVkIHdpdGhvdXQgZGVsZXRpbmcgaXRzIGJhY2t1cC5cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmlsZXM7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGdldFJlbW90ZUZpbGVzKGdpdGh1YjogR2l0SHViQXBpKTogUHJvbWlzZTxNYXA8c3RyaW5nLCBzdHJpbmc+PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHRyZWUgPSBhd2FpdCBnaXRodWIubGlzdFRyZWUoKTtcbiAgICAgIHJldHVybiBuZXcgTWFwKFxuICAgICAgICB0cmVlXG4gICAgICAgICAgLmZpbHRlcigoZmlsZSkgPT4gIXRoaXMuaXNJZ25vcmVkKGZpbGUucGF0aCkpXG4gICAgICAgICAgLm1hcCgoZmlsZSkgPT4gW2ZpbGUucGF0aCwgZmlsZS5zaGFdKSxcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIGNvbnN0IHN0YXR1cyA9IChlcnJvciBhcyBFcnJvciAmIHsgc3RhdHVzPzogbnVtYmVyIH0pLnN0YXR1cztcbiAgICAgIGlmIChzdGF0dXMgPT09IDQwNCB8fCAoZXJyb3IgYXMgRXJyb3IpLm1lc3NhZ2UuaW5jbHVkZXMoJzQwNCcpKSByZXR1cm4gbmV3IE1hcCgpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpc0lnbm9yZWQocGF0aDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgY29uZmlnRGlyID0gdGhpcy5hcHAudmF1bHQuY29uZmlnRGlyO1xuICAgIGlmIChwYXRoID09PSBjb25maWdEaXIgfHwgcGF0aC5zdGFydHNXaXRoKGAke2NvbmZpZ0Rpcn0vYCkpIHJldHVybiB0cnVlO1xuICAgIFxuICAgIHJldHVybiBERUZBVUxUX0lHTk9SRV9QQVRURVJOUy5zb21lKChwYXR0ZXJuKSA9PiB7XG4gICAgICBpZiAocGF0dGVybi5lbmRzV2l0aCgnLycpKSB7XG4gICAgICAgIHJldHVybiBwYXRoID09PSBwYXR0ZXJuLnNsaWNlKDAsIC0xKSB8fCBwYXRoLnN0YXJ0c1dpdGgocGF0dGVybik7XG4gICAgICB9XG4gICAgICByZXR1cm4gcGF0aCA9PT0gcGF0dGVybiB8fCBwYXRoLmVuZHNXaXRoKCcvJyArIHBhdHRlcm4pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSB0b0Jhc2U2NChieXRlczogVWludDhBcnJheSk6IHN0cmluZyB7XG4gICAgbGV0IGJpbmFyeSA9ICcnO1xuICAgIGNvbnN0IGNodW5rU2l6ZSA9IDB4ODAwMDtcbiAgICBmb3IgKGxldCBvZmZzZXQgPSAwOyBvZmZzZXQgPCBieXRlcy5sZW5ndGg7IG9mZnNldCArPSBjaHVua1NpemUpIHtcbiAgICAgIGJpbmFyeSArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKC4uLmJ5dGVzLnN1YmFycmF5KG9mZnNldCwgb2Zmc2V0ICsgY2h1bmtTaXplKSk7XG4gICAgfVxuICAgIHJldHVybiBidG9hKGJpbmFyeSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGNvbXB1dGVHaXRCbG9iU2hhKGNvbnRlbnQ6IFVpbnQ4QXJyYXkpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IGhlYWRlciA9IG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShgYmxvYiAke2NvbnRlbnQuYnl0ZUxlbmd0aH1cXDBgKTtcbiAgICBjb25zdCBwYXlsb2FkID0gbmV3IFVpbnQ4QXJyYXkoaGVhZGVyLmxlbmd0aCArIGNvbnRlbnQubGVuZ3RoKTtcbiAgICBwYXlsb2FkLnNldChoZWFkZXIpO1xuICAgIHBheWxvYWQuc2V0KGNvbnRlbnQsIGhlYWRlci5sZW5ndGgpO1xuICAgIGNvbnN0IGhhc2ggPSBhd2FpdCBjcnlwdG8uc3VidGxlLmRpZ2VzdCgnU0hBLTEnLCBwYXlsb2FkKTtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShuZXcgVWludDhBcnJheShoYXNoKSlcbiAgICAgIC5tYXAoKGJ5dGUpID0+IGJ5dGUudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsICcwJykpXG4gICAgICAuam9pbignJyk7XG4gIH1cbn1cbiIsICJpbXBvcnQgdHlwZSBOb3RlRmxhcmVQbHVnaW4gZnJvbSAnLi4vLi4vbWFpbic7XG5cbmV4cG9ydCBjbGFzcyBCYWNrdXBTY2hlZHVsZXIge1xuICBwcml2YXRlIGJhY2t1cERlYm91bmNlVGltZXI6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcGx1Z2luOiBOb3RlRmxhcmVQbHVnaW4pIHt9XG5cbiAgcHVibGljIHJlZ2lzdGVyQXV0b21hdGlvbigpOiB2b2lkIHtcbiAgICBjb25zdCB7IGFwcCB9ID0gdGhpcy5wbHVnaW47XG4gICAgY29uc3QgcXVldWVBZnRlckNoYW5nZSA9ICgpID0+IHtcbiAgICAgIGlmICghdGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5hYmxlQmFja3VwIHx8ICF0aGlzLnBsdWdpbi5zZXR0aW5ncy5iYWNrdXAuYmFja3VwT25DaGFuZ2UpIHJldHVybjtcbiAgICAgIGlmICh0aGlzLmJhY2t1cERlYm91bmNlVGltZXIgIT09IG51bGwpIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5iYWNrdXBEZWJvdW5jZVRpbWVyKTtcbiAgICAgIHRoaXMuYmFja3VwRGVib3VuY2VUaW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5iYWNrdXBEZWJvdW5jZVRpbWVyID0gbnVsbDtcbiAgICAgICAgdm9pZCB0aGlzLnBsdWdpbi5kb0JhY2t1cCh0cnVlKTtcbiAgICAgIH0sIDMwMDAwKTtcbiAgICB9O1xuXG4gICAgdGhpcy5wbHVnaW4ucmVnaXN0ZXJFdmVudChhcHAudmF1bHQub24oJ2NyZWF0ZScsIHF1ZXVlQWZ0ZXJDaGFuZ2UpKTtcbiAgICB0aGlzLnBsdWdpbi5yZWdpc3RlckV2ZW50KGFwcC52YXVsdC5vbignbW9kaWZ5JywgcXVldWVBZnRlckNoYW5nZSkpO1xuICAgIHRoaXMucGx1Z2luLnJlZ2lzdGVyRXZlbnQoYXBwLnZhdWx0Lm9uKCdkZWxldGUnLCBxdWV1ZUFmdGVyQ2hhbmdlKSk7XG4gICAgdGhpcy5wbHVnaW4ucmVnaXN0ZXJFdmVudChhcHAudmF1bHQub24oJ3JlbmFtZScsIHF1ZXVlQWZ0ZXJDaGFuZ2UpKTtcbiAgICBcbiAgICB0aGlzLnBsdWdpbi5yZWdpc3RlcigoKSA9PiB7XG4gICAgICBpZiAodGhpcy5iYWNrdXBEZWJvdW5jZVRpbWVyICE9PSBudWxsKSB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMuYmFja3VwRGVib3VuY2VUaW1lcik7XG4gICAgfSk7XG5cbiAgICB0aGlzLnBsdWdpbi5yZWdpc3RlckludGVydmFsKHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICB2b2lkIHRoaXMucnVuU2NoZWR1bGVkQmFja3VwSWZEdWUoKTtcbiAgICB9LCA2MDAwMCkpO1xuICAgIFxuICAgIGFwcC53b3Jrc3BhY2Uub25MYXlvdXRSZWFkeSgoKSA9PiB2b2lkIHRoaXMucnVuU2NoZWR1bGVkQmFja3VwSWZEdWUoKSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHJ1blNjaGVkdWxlZEJhY2t1cElmRHVlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHsgc2V0dGluZ3MgfSA9IHRoaXMucGx1Z2luO1xuICAgIGNvbnN0IHsgYmFja3VwIH0gPSBzZXR0aW5ncztcbiAgICBpZiAoIXNldHRpbmdzLnNldHVwQ29tcGxldGUgfHwgIXNldHRpbmdzLmVuYWJsZUJhY2t1cCB8fCBiYWNrdXAuaW50ZXJ2YWxNaW51dGVzIDw9IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBsYXN0QXR0ZW1wdCA9IGJhY2t1cC5sYXN0QmFja3VwQXR0ZW1wdEF0XG4gICAgICA/IG5ldyBEYXRlKGJhY2t1cC5sYXN0QmFja3VwQXR0ZW1wdEF0KS5nZXRUaW1lKClcbiAgICAgIDogMDtcbiAgICBjb25zdCBpbnRlcnZhbE1zID0gYmFja3VwLmludGVydmFsTWludXRlcyAqIDYwICogMTAwMDtcbiAgICBpZiAoIWxhc3RBdHRlbXB0IHx8IERhdGUubm93KCkgLSBsYXN0QXR0ZW1wdCA+PSBpbnRlcnZhbE1zKSB7XG4gICAgICBhd2FpdCB0aGlzLnBsdWdpbi5kb0JhY2t1cCh0cnVlKTtcbiAgICB9XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBRUEsWUFBUSxZQUFZLFNBQU87QUFDekIsVUFBSSxPQUFPLFFBQVEsVUFBVTtBQUMzQixlQUFPLE9BQU8sVUFBVSxHQUFHO0FBQUEsTUFDN0I7QUFDQSxVQUFJLE9BQU8sUUFBUSxZQUFZLElBQUksS0FBSyxNQUFNLElBQUk7QUFDaEQsZUFBTyxPQUFPLFVBQVUsT0FBTyxHQUFHLENBQUM7QUFBQSxNQUNyQztBQUNBLGFBQU87QUFBQSxJQUNUO0FBTUEsWUFBUSxPQUFPLENBQUMsTUFBTSxTQUFTLEtBQUssTUFBTSxLQUFLLENBQUFBLFVBQVFBLE1BQUssU0FBUyxJQUFJO0FBTXpFLFlBQVEsZUFBZSxDQUFDLEtBQUssS0FBSyxPQUFPLEdBQUcsVUFBVTtBQUNwRCxVQUFJLFVBQVU7QUFBTyxlQUFPO0FBQzVCLFVBQUksQ0FBQyxRQUFRLFVBQVUsR0FBRyxLQUFLLENBQUMsUUFBUSxVQUFVLEdBQUc7QUFBRyxlQUFPO0FBQy9ELGNBQVMsT0FBTyxHQUFHLElBQUksT0FBTyxHQUFHLEtBQUssT0FBTyxJQUFJLEtBQU07QUFBQSxJQUN6RDtBQU1BLFlBQVEsYUFBYSxDQUFDLE9BQU8sSUFBSSxHQUFHLFNBQVM7QUFDM0MsWUFBTSxPQUFPLE1BQU0sTUFBTSxDQUFDO0FBQzFCLFVBQUksQ0FBQztBQUFNO0FBRVgsVUFBSyxRQUFRLEtBQUssU0FBUyxRQUFTLEtBQUssU0FBUyxVQUFVLEtBQUssU0FBUyxTQUFTO0FBQ2pGLFlBQUksS0FBSyxZQUFZLE1B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QyxjQUFjO0FBQy9CLHlCQUFlLENBQUMsVUFBVTtBQUFBLFFBQzVCO0FBQUEsTUFDRjtBQUdBLFVBQUksa0JBQWtCLEVBQUU7QUFDeEIsVUFBSSxDQUFDLGlCQUFpQjtBQUNwQixjQUFNLGVBQWUsRUFBRTtBQUN2QiwwQkFBa0IsaUJBQWlCLGVBQWUsZUFBZTtBQUFBLE1BQ25FO0FBRUEsWUFBTSxFQUFFLGNBQWMsS0FBSyxHQUFHLEtBQUssSUFBSTtBQUd2QyxhQUFPLGtCQUFrQjtBQUFBLFFBQ3ZCLEdBQUk7QUFBQSxRQUNKLGNBQWUsZ0JBQXlDO0FBQUEsUUFDeEQsY0FBYyxnQkFBZ0IsQ0FBQztBQUFBLFFBQy9CO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSCxDQUFDO0FBQUEsRUFDSDtBQUdBLE1BQUksQ0FBQyxTQUFTLE1BQU0sS0FBSyxDQUFDLE1BQU0sRUFBRSxPQUFPLFNBQVMsWUFBWSxHQUFHO0FBQy9ELGFBQVMsZ0JBQWUsb0JBQVMsTUFBTSxDQUFDLE1BQWhCLG1CQUFtQixPQUFuQixZQUF5QjtBQUFBLEVBQ25EO0FBRUEsU0FBTyxFQUFFLFNBQVM7QUFDcEI7IiwKICAibmFtZXMiOiBbIm5vZGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibWF4IiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAiaW5kZXgiLCAibW9kdWxlIiwgInJlcXVpcmVfY29uc3RhbnRzIiwgIm1vZHVsZSIsICJyZXF1aXJlX3V0aWxzIiwgIm1vZHVsZSIsICJyZXF1aXJlX3BhcnNlIiwgIm1vZHVsZSIsICJicmFuY2giLCAib3B0cyIsICJ2YWx1ZSIsICJyZXN0IiwgInNvdXJjZSIsICJtb2R1bGUiLCAiaXNNYXRjaCIsICJzdGF0ZSIsICJyZXF1aXJlX3BpY29tYXRjaCIsICJtb2R1bGUiLCAibW9kdWxlIiwgImlzTWF0Y2giLCAiaW1wb3J0X29ic2lkaWFuIiwgIl9hIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfb2JzaWRpYW4iLCAiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiIsICJMRUFESU5HX0JMT0NLX1JFIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfb2JzaWRpYW4iLCAiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfb2JzaWRpYW4iLCAiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfb2JzaWRpYW4iLCAiQ0xPVURGTEFSRV9BUFBfVVJMIiwgIkNMT1VERkxBUkVfVE9LRU5fVVJMIiwgImltcG9ydF9vYnNpZGlhbiIsICJfYSIsICJpbXBvcnRfb2JzaWRpYW4iLCAiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfb2JzaWRpYW4iLCAiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfb2JzaWRpYW4iLCAiaW1wb3J0X29ic2lkaWFuIiwgIkNMT1VERkxBUkVfQVBQX1VSTCIsICJfYSJdCn0K
