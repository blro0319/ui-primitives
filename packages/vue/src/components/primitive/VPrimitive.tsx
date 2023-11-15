/**
 * @credit Radix Vue
 * @see https://www.radix-vue.com/utilities/primitive.html
 */

import { defineComponent, h } from "vue";
import { VPrimitiveSlot } from "./VPrimitiveSlot";

export type VPrimitiveProps = {
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
};

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
