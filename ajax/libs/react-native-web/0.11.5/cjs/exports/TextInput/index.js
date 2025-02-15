"use strict";

exports.__esModule = true;
exports.default = void 0;

var _applyLayout = _interopRequireDefault(require("../../modules/applyLayout"));

var _applyNativeMethods = _interopRequireDefault(require("../../modules/applyNativeMethods"));

var _ExecutionEnvironment = require("fbjs/lib/ExecutionEnvironment");

var _react = require("react");

var _ColorPropType = _interopRequireDefault(require("../ColorPropType"));

var _createElement = _interopRequireDefault(require("../createElement"));

var _css = _interopRequireDefault(require("../StyleSheet/css"));

var _findNodeHandle = _interopRequireDefault(require("../findNodeHandle"));

var _StyleSheetPropType = _interopRequireDefault(require("../../modules/StyleSheetPropType"));

var _TextInputStylePropTypes = _interopRequireDefault(require("./TextInputStylePropTypes"));

var _TextInputState = _interopRequireDefault(require("../../modules/TextInputState"));

var _ViewPropTypes = _interopRequireDefault(require("../ViewPropTypes"));

var _propTypes = require("prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var isAndroid = _ExecutionEnvironment.canUseDOM && /Android/i.test(navigator && navigator.userAgent);
var emptyObject = {};
/**
 * React Native events differ from W3C events.
 */

var normalizeEventHandler = function normalizeEventHandler(handler) {
  return function (e) {
    if (handler) {
      e.nativeEvent.text = e.target.value;
      return handler(e);
    }
  };
};
/**
 * Determines whether a 'selection' prop differs from a node's existing
 * selection state.
 */


var isSelectionStale = function isSelectionStale(node, selection) {
  if (node && selection) {
    var selectionEnd = node.selectionEnd,
        selectionStart = node.selectionStart;
    var start = selection.start,
        end = selection.end;
    return start !== selectionStart || end !== selectionEnd;
  }

  return false;
};
/**
 * Certain input types do no support 'selectSelectionRange' and will throw an
 * error.
 */


var setSelection = function setSelection(node, selection) {
  try {
    if (isSelectionStale(node, selection)) {
      var start = selection.start,
          end = selection.end; // workaround for Blink on Android: see https://github.com/text-mask/text-mask/issues/300

      if (isAndroid) {
        setTimeout(function () {
          return node.setSelectionRange(start, end || start);
        }, 10);
      } else {
        node.setSelectionRange(start, end || start);
      }
    }
  } catch (e) {}
};

var TextInput =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(TextInput, _Component);

  function TextInput() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this._handleBlur = function (e) {
      var onBlur = _this.props.onBlur;
      _TextInputState.default._currentlyFocusedNode = null;

      if (onBlur) {
        onBlur(e);
      }
    };

    _this._handleContentSizeChange = function () {
      var _this$props = _this.props,
          onContentSizeChange = _this$props.onContentSizeChange,
          multiline = _this$props.multiline;

      if (multiline && onContentSizeChange) {
        var newHeight = _this._node.scrollHeight;
        var newWidth = _this._node.scrollWidth;

        if (newHeight !== _this._nodeHeight || newWidth !== _this._nodeWidth) {
          _this._nodeHeight = newHeight;
          _this._nodeWidth = newWidth;
          onContentSizeChange({
            nativeEvent: {
              contentSize: {
                height: _this._nodeHeight,
                width: _this._nodeWidth
              }
            }
          });
        }
      }
    };

    _this._handleChange = function (e) {
      var _this$props2 = _this.props,
          onChange = _this$props2.onChange,
          onChangeText = _this$props2.onChangeText;
      var text = e.nativeEvent.text;

      _this._handleContentSizeChange();

      if (onChange) {
        onChange(e);
      }

      if (onChangeText) {
        onChangeText(text);
      }

      _this._handleSelectionChange(e);
    };

    _this._handleFocus = function (e) {
      var _this$props3 = _this.props,
          clearTextOnFocus = _this$props3.clearTextOnFocus,
          onFocus = _this$props3.onFocus,
          selectTextOnFocus = _this$props3.selectTextOnFocus;
      var node = _this._node;
      _TextInputState.default._currentlyFocusedNode = _this._node;

      if (onFocus) {
        onFocus(e);
      }

      if (clearTextOnFocus) {
        _this.clear();
      }

      if (selectTextOnFocus) {
        node && node.select();
      }
    };

    _this._handleKeyDown = function (e) {
      // Prevent key events bubbling (see #612)
      e.stopPropagation(); // Backspace, Escape, Tab, Cmd+Enter, and Arrow keys only fire 'keydown'
      // DOM events

      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'Backspace' || e.key === 'Escape' || e.key === 'Enter' && e.metaKey || e.key === 'Tab') {
        _this._handleKeyPress(e);
      }
    };

    _this._handleKeyPress = function (e) {
      var _this$props4 = _this.props,
          blurOnSubmit = _this$props4.blurOnSubmit,
          multiline = _this$props4.multiline,
          onKeyPress = _this$props4.onKeyPress,
          onSubmitEditing = _this$props4.onSubmitEditing;
      var blurOnSubmitDefault = !multiline;
      var shouldBlurOnSubmit = blurOnSubmit == null ? blurOnSubmitDefault : blurOnSubmit;

      if (onKeyPress) {
        var keyValue = e.key;

        if (keyValue) {
          e.nativeEvent = {
            altKey: e.altKey,
            ctrlKey: e.ctrlKey,
            key: keyValue,
            metaKey: e.metaKey,
            shiftKey: e.shiftKey,
            target: e.target
          };
          onKeyPress(e);
        }
      }

      if (!e.isDefaultPrevented() && e.key === 'Enter' && !e.shiftKey) {
        if ((blurOnSubmit || !multiline) && onSubmitEditing) {
          // prevent "Enter" from inserting a newline
          e.preventDefault();
          e.nativeEvent = {
            target: e.target,
            text: e.target.value
          };
          onSubmitEditing(e);
        }

        if (shouldBlurOnSubmit) {
          // $FlowFixMe
          _this.blur();
        }
      }
    };

    _this._handleSelectionChange = function (e) {
      var _this$props5 = _this.props,
          onSelectionChange = _this$props5.onSelectionChange,
          _this$props5$selectio = _this$props5.selection,
          selection = _this$props5$selectio === void 0 ? emptyObject : _this$props5$selectio;

      if (onSelectionChange) {
        try {
          var node = e.target;

          if (isSelectionStale(node, selection)) {
            var selectionStart = node.selectionStart,
                selectionEnd = node.selectionEnd;
            e.nativeEvent.selection = {
              start: selectionStart,
              end: selectionEnd
            };
            onSelectionChange(e);
          }
        } catch (e) {}
      }
    };

    _this._setNode = function (component) {
      _this._node = (0, _findNodeHandle.default)(component);

      if (_this._node) {
        _this._handleContentSizeChange();
      }
    };

    return _this;
  }

  var _proto = TextInput.prototype;

  _proto.clear = function clear() {
    this._node.value = '';
  };

  _proto.isFocused = function isFocused() {
    return _TextInputState.default.currentlyFocusedField() === this._node;
  };

  _proto.componentDidMount = function componentDidMount() {
    setSelection(this._node, this.props.selection);

    if (document.activeElement === this._node) {
      _TextInputState.default._currentlyFocusedNode = this._node;
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    setSelection(this._node, this.props.selection);
  };

  _proto.render = function render() {
    var _this$props6 = this.props,
        autoComplete = _this$props6.autoComplete,
        autoCorrect = _this$props6.autoCorrect,
        editable = _this$props6.editable,
        keyboardType = _this$props6.keyboardType,
        multiline = _this$props6.multiline,
        numberOfLines = _this$props6.numberOfLines,
        secureTextEntry = _this$props6.secureTextEntry,
        blurOnSubmit = _this$props6.blurOnSubmit,
        clearTextOnFocus = _this$props6.clearTextOnFocus,
        onChangeText = _this$props6.onChangeText,
        onLayout = _this$props6.onLayout,
        onSelectionChange = _this$props6.onSelectionChange,
        onSubmitEditing = _this$props6.onSubmitEditing,
        selection = _this$props6.selection,
        selectTextOnFocus = _this$props6.selectTextOnFocus,
        spellCheck = _this$props6.spellCheck,
        accessibilityViewIsModal = _this$props6.accessibilityViewIsModal,
        allowFontScaling = _this$props6.allowFontScaling,
        caretHidden = _this$props6.caretHidden,
        clearButtonMode = _this$props6.clearButtonMode,
        dataDetectorTypes = _this$props6.dataDetectorTypes,
        disableFullscreenUI = _this$props6.disableFullscreenUI,
        enablesReturnKeyAutomatically = _this$props6.enablesReturnKeyAutomatically,
        hitSlop = _this$props6.hitSlop,
        inlineImageLeft = _this$props6.inlineImageLeft,
        inlineImagePadding = _this$props6.inlineImagePadding,
        inputAccessoryViewID = _this$props6.inputAccessoryViewID,
        keyboardAppearance = _this$props6.keyboardAppearance,
        maxFontSizeMultiplier = _this$props6.maxFontSizeMultiplier,
        needsOffscreenAlphaCompositing = _this$props6.needsOffscreenAlphaCompositing,
        onAccessibilityTap = _this$props6.onAccessibilityTap,
        onContentSizeChange = _this$props6.onContentSizeChange,
        onEndEditing = _this$props6.onEndEditing,
        onMagicTap = _this$props6.onMagicTap,
        onScroll = _this$props6.onScroll,
        removeClippedSubviews = _this$props6.removeClippedSubviews,
        renderToHardwareTextureAndroid = _this$props6.renderToHardwareTextureAndroid,
        returnKeyLabel = _this$props6.returnKeyLabel,
        returnKeyType = _this$props6.returnKeyType,
        scrollEnabled = _this$props6.scrollEnabled,
        selectionColor = _this$props6.selectionColor,
        selectionState = _this$props6.selectionState,
        shouldRasterizeIOS = _this$props6.shouldRasterizeIOS,
        textBreakStrategy = _this$props6.textBreakStrategy,
        textContentType = _this$props6.textContentType,
        underlineColorAndroid = _this$props6.underlineColorAndroid,
        otherProps = _objectWithoutPropertiesLoose(_this$props6, ["autoComplete", "autoCorrect", "editable", "keyboardType", "multiline", "numberOfLines", "secureTextEntry", "blurOnSubmit", "clearTextOnFocus", "onChangeText", "onLayout", "onSelectionChange", "onSubmitEditing", "selection", "selectTextOnFocus", "spellCheck", "accessibilityViewIsModal", "allowFontScaling", "caretHidden", "clearButtonMode", "dataDetectorTypes", "disableFullscreenUI", "enablesReturnKeyAutomatically", "hitSlop", "inlineImageLeft", "inlineImagePadding", "inputAccessoryViewID", "keyboardAppearance", "maxFontSizeMultiplier", "needsOffscreenAlphaCompositing", "onAccessibilityTap", "onContentSizeChange", "onEndEditing", "onMagicTap", "onScroll", "removeClippedSubviews", "renderToHardwareTextureAndroid", "returnKeyLabel", "returnKeyType", "scrollEnabled", "selectionColor", "selectionState", "shouldRasterizeIOS", "textBreakStrategy", "textContentType", "underlineColorAndroid"]);

    var type;

    switch (keyboardType) {
      case 'email-address':
        type = 'email';
        break;

      case 'number-pad':
      case 'numeric':
        type = 'number';
        break;

      case 'phone-pad':
        type = 'tel';
        break;

      case 'search':
      case 'web-search':
        type = 'search';
        break;

      case 'url':
        type = 'url';
        break;

      default:
        type = 'text';
    }

    if (secureTextEntry) {
      type = 'password';
    }

    var component = multiline ? 'textarea' : 'input';
    Object.assign(otherProps, {
      // Browser's treat autocomplete "off" as "on"
      // https://bugs.chromium.org/p/chromium/issues/detail?id=468153#c164
      autoComplete: autoComplete === 'off' ? 'noop' : autoComplete,
      autoCorrect: autoCorrect ? 'on' : 'off',
      classList: [classes.textinput],
      dir: 'auto',
      onBlur: normalizeEventHandler(this._handleBlur),
      onChange: normalizeEventHandler(this._handleChange),
      onFocus: normalizeEventHandler(this._handleFocus),
      onKeyDown: this._handleKeyDown,
      onKeyPress: this._handleKeyPress,
      onSelect: normalizeEventHandler(this._handleSelectionChange),
      readOnly: !editable,
      ref: this._setNode,
      spellCheck: spellCheck != null ? spellCheck : autoCorrect
    });

    if (multiline) {
      otherProps.rows = numberOfLines;
    } else {
      otherProps.type = type;
    }

    return (0, _createElement.default)(component, otherProps);
  };

  return TextInput;
}(_react.Component);

TextInput.displayName = 'TextInput';
TextInput.defaultProps = {
  autoCapitalize: 'sentences',
  autoComplete: 'on',
  autoCorrect: true,
  editable: true,
  keyboardType: 'default',
  multiline: false,
  numberOfLines: 1,
  secureTextEntry: false
};
TextInput.State = _TextInputState.default;
TextInput.propTypes = process.env.NODE_ENV !== "production" ? _objectSpread({}, _ViewPropTypes.default, {
  autoCapitalize: (0, _propTypes.oneOf)(['characters', 'none', 'sentences', 'words']),
  autoComplete: _propTypes.string,
  autoCorrect: _propTypes.bool,
  autoFocus: _propTypes.bool,
  blurOnSubmit: _propTypes.bool,
  clearTextOnFocus: _propTypes.bool,
  defaultValue: _propTypes.string,
  editable: _propTypes.bool,
  inputAccessoryViewID: _propTypes.string,
  keyboardType: (0, _propTypes.oneOf)(['default', 'email-address', 'number-pad', 'numbers-and-punctuation', 'numeric', 'phone-pad', 'search', 'url', 'web-search']),
  maxFontSizeMultiplier: _propTypes.number,
  maxLength: _propTypes.number,
  multiline: _propTypes.bool,
  numberOfLines: _propTypes.number,
  onBlur: _propTypes.func,
  onChange: _propTypes.func,
  onChangeText: _propTypes.func,
  onFocus: _propTypes.func,
  onKeyPress: _propTypes.func,
  onSelectionChange: _propTypes.func,
  onSubmitEditing: _propTypes.func,
  placeholder: _propTypes.string,
  placeholderTextColor: _ColorPropType.default,
  secureTextEntry: _propTypes.bool,
  selectTextOnFocus: _propTypes.bool,
  selection: (0, _propTypes.shape)({
    start: _propTypes.number.isRequired,
    end: _propTypes.number
  }),
  spellCheck: _propTypes.bool,
  style: (0, _StyleSheetPropType.default)(_TextInputStylePropTypes.default),
  value: _propTypes.string,

  /* react-native compat */

  /* eslint-disable */
  caretHidden: _propTypes.bool,
  clearButtonMode: _propTypes.string,
  dataDetectorTypes: _propTypes.string,
  disableFullscreenUI: _propTypes.bool,
  enablesReturnKeyAutomatically: _propTypes.bool,
  keyboardAppearance: _propTypes.string,
  inlineImageLeft: _propTypes.string,
  inlineImagePadding: _propTypes.number,
  onContentSizeChange: _propTypes.func,
  onEndEditing: _propTypes.func,
  onScroll: _propTypes.func,
  returnKeyLabel: _propTypes.string,
  returnKeyType: _propTypes.string,
  selectionColor: _ColorPropType.default,
  selectionState: _propTypes.any,
  textBreakStrategy: _propTypes.string,
  underlineColorAndroid: _ColorPropType.default
  /* eslint-enable */

}) : {};

var classes = _css.default.create({
  textinput: {
    MozAppearance: 'textfield',
    WebkitAppearance: 'none',
    backgroundColor: 'transparent',
    border: '0 solid black',
    borderRadius: 0,
    boxSizing: 'border-box',
    font: '14px System',
    padding: 0,
    resize: 'none'
  }
});

var _default = (0, _applyLayout.default)((0, _applyNativeMethods.default)(TextInput));

exports.default = _default;
module.exports = exports.default;