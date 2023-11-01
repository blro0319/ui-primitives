/**
 * @credit Radix Vue
 * @see https://github.com/radix-vue/radix-vue/blob/f9b0bfe0005e575c7dfe9bbcc18fa3c24738fbbd/packages/radix-vue/src/Primitive/Slot.ts
 */

import {
  cloneVNode,
  defineComponent,
  Fragment,
  mergeProps,
  type VNode,
} from "vue";

export const VPrimitiveSlot = defineComponent({
  name: "VPrimitiveSlot",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => {
      if (!slots.default) return null;

      const children = renderSlotFragments(slots.default());
      const [first, ...others] = children;
      if (!first) return null;

      if (!Object.keys(attrs).length) return children;

      delete first.props?.ref;
      const props = mergeProps(attrs, first.props ?? {});
      if (attrs.class && first.props?.class) {
        delete first.props.class;
      }

      const cloned = cloneVNode(first, props);
      for (const prop in props) {
        if (prop.startsWith("on")) {
          cloned.props ||= {};
          cloned.props[prop] = props[prop];
        }
      }

      return others.length ? [cloned, ...others] : cloned;
    };
  },
});

function renderSlotFragments(children?: VNode[]): VNode[] {
  if (!children) return [];
  return children.flatMap((child) => {
    if (child.type === Fragment) {
      return renderSlotFragments(child.children as VNode[]);
    }
    return [child];
  });
}
