import { _ as _defineProperty } from './chunk-6ea13200.js';
import './helpers.js';
import './chunk-17222463.js';
import { I as Icon } from './chunk-bed9f769.js';
import { _ as __vue_normalize__, r as registerComponent, u as use } from './chunk-cca88db8.js';
import { S as SlotComponent } from './chunk-0e3f4fb5.js';

var _components;
var script = {
  name: 'BTabs',
  components: (_components = {}, _defineProperty(_components, Icon.name, Icon), _defineProperty(_components, SlotComponent.name, SlotComponent), _components),
  props: {
    value: Number,
    expanded: Boolean,
    type: String,
    size: String,
    position: String,
    animated: {
      type: Boolean,
      default: true
    },
    destroyOnHide: {
      type: Boolean,
      default: false
    },
    vertical: Boolean,
    multiline: Boolean
  },
  data: function data() {
    return {
      activeTab: this.value || 0,
      defaultSlots: [],
      contentHeight: 0,
      isTransitioning: false,
      _isTabs: true // Used internally by TabItem

    };
  },
  computed: {
    mainClasses: function mainClasses() {
      return _defineProperty({
        'is-fullwidth': this.expanded,
        'is-vertical': this.vertical,
        'is-multiline': this.multiline
      }, this.position, this.position && this.vertical);
    },
    navClasses: function navClasses() {
      var _ref2;

      return [this.type, this.size, (_ref2 = {}, _defineProperty(_ref2, this.position, this.position && !this.vertical), _defineProperty(_ref2, 'is-fullwidth', this.expanded), _defineProperty(_ref2, 'is-toggle-rounded is-toggle', this.type === 'is-toggle-rounded'), _ref2)];
    },
    tabItems: function tabItems() {
      return this.defaultSlots.filter(function (vnode) {
        return vnode.componentInstance && vnode.componentInstance.$data && vnode.componentInstance.$data._isTabItem;
      }).map(function (vnode) {
        return vnode.componentInstance;
      });
    }
  },
  watch: {
    /**
    * When v-model is changed set the new active tab.
    */
    value: function value(_value) {
      this.changeTab(_value);
    },

    /**
    * When tab-items are updated, set active one.
    */
    tabItems: function tabItems() {
      if (this.activeTab < this.tabItems.length) {
        this.tabItems[this.activeTab].isActive = true;
      }
    }
  },
  methods: {
    refreshSlots: function refreshSlots() {
      this.defaultSlots = this.$slots.default || [];
    },

    /**
    * Change the active tab and emit change event.
    */
    changeTab: function changeTab(newIndex) {
      if (this.activeTab === newIndex || this.tabItems[newIndex] === undefined) return;

      if (this.activeTab < this.tabItems.length) {
        this.tabItems[this.activeTab].deactivate(this.activeTab, newIndex);
      }

      this.tabItems[newIndex].activate(this.activeTab, newIndex);
      this.activeTab = newIndex;
      this.$emit('change', newIndex);
    },

    /**
    * Tab click listener, emit input event and change active tab.
    */
    tabClick: function tabClick(value) {
      if (this.activeTab === value) return;
      this.$emit('input', value);
      this.changeTab(value);
    }
  },
  mounted: function mounted() {
    if (this.activeTab < this.tabItems.length) {
      this.tabItems[this.activeTab].isActive = true;
    }

    this.refreshSlots();
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"b-tabs",class:_vm.mainClasses},[_c('nav',{staticClass:"tabs",class:_vm.navClasses},[_c('ul',_vm._l((_vm.tabItems),function(tabItem,index){return _c('li',{directives:[{name:"show",rawName:"v-show",value:(tabItem.visible),expression:"tabItem.visible"}],key:index,class:{ 'is-active': _vm.activeTab === index, 'is-disabled': tabItem.disabled }},[(tabItem.$slots.header)?_c('b-slot-component',{attrs:{"component":tabItem,"name":"header","tag":"a"},nativeOn:{"click":function($event){_vm.tabClick(index);}}}):_c('a',{on:{"click":function($event){_vm.tabClick(index);}}},[(tabItem.icon)?_c('b-icon',{attrs:{"icon":tabItem.icon,"pack":tabItem.iconPack,"size":_vm.size}}):_vm._e(),_vm._v(" "),_c('span',[_vm._v(_vm._s(tabItem.label))])],1)],1)}))]),_vm._v(" "),_c('section',{staticClass:"tab-content",class:{'is-transitioning': _vm.isTransitioning}},[_vm._t("default")],2)])};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

var script$1 = {
  name: 'BTabItem',
  props: {
    label: String,
    icon: String,
    iconPack: String,
    disabled: Boolean,
    visible: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      isActive: false,
      transitionName: null,
      _isTabItem: true // Used internally by Tab

    };
  },
  methods: {
    /**
    * Activate tab, alter animation name based on the index.
    */
    activate: function activate(oldIndex, index) {
      this.transitionName = index < oldIndex ? 'slide-next' : 'slide-prev';
      this.isActive = true;
    },

    /**
    * Deactivate tab, alter animation name based on the index.
    */
    deactivate: function deactivate(oldIndex, index) {
      this.transitionName = index < oldIndex ? 'slide-next' : 'slide-prev';
      this.isActive = false;
    }
  },
  created: function created() {
    if (!this.$parent.$data._isTabs) {
      this.$destroy();
      throw new Error('You should wrap bTabItem on a bTabs');
    }

    this.$parent.refreshSlots();
  },
  beforeDestroy: function beforeDestroy() {
    this.$parent.refreshSlots();
  },
  render: function render(createElement) {
    var _this = this;

    // if destroy apply v-if
    if (this.$parent.destroyOnHide) {
      if (!this.isActive || !this.visible) {
        return;
      }
    }

    var vnode = createElement('div', {
      directives: [{
        name: 'show',
        value: this.isActive && this.visible
      }],
      class: 'tab-item'
    }, this.$slots.default); // check animated prop

    if (this.$parent.animated) {
      return createElement('transition', {
        props: {
          'name': this.transitionName
        },
        on: {
          'before-enter': function beforeEnter() {
            _this.$parent.isTransitioning = true;
          },
          'after-enter': function afterEnter() {
            _this.$parent.isTransitioning = false;
          }
        }
      }, [vnode]);
    }

    return vnode;
  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = __vue_normalize__(
    {},
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, __vue_component__);
    registerComponent(Vue, __vue_component__$1);
  }
};
use(Plugin);

export default Plugin;
export { __vue_component__$1 as BTabItem, __vue_component__ as BTabs };
