/**
 * @credit Radix Vue
 * @see https://github.com/radix-vue/radix-vue/blob/f9b0bfe0005e575c7dfe9bbcc18fa3c24738fbbd/packages/radix-vue/src/Primitive/Primitive.ts
 */

import { defineComponent, h } from "vue";
import { VPrimitiveSlot } from "./VPrimitiveSlot";

export interface VPrimitiveProps {
  /**
   * @default
   * ```ts
   * "div"
   * ```
   */
  as?: string;
  /**
   * @default
   * ```ts
   * false
   * ```
   */
  asChild?: boolean;
}

export const VPrimitive = defineComponent({
  name: "VPrimitive",
  inheritAttrs: false,
  props: {
    as: {
      type: String,
      default: "div",
    },
    asChild: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { attrs, slots }) {
    const tag = props.asChild ? "template" : props.as;
    if (tag !== "template") {
      return () => h(tag, attrs, { default: slots.default });
    }
    return () => h(VPrimitiveSlot, attrs, { default: slots.default });
  },
});
