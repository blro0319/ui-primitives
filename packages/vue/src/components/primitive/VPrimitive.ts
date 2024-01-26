import {
  type Component,
  Fragment,
  type VNode,
  cloneVNode,
  defineComponent, h, mergeProps,
} from "vue";

export type AsTag =
  | keyof HTMLElementTagNameMap
  | (string & NonNullable<unknown>);

export type VPrimitiveProps = {
  /**
   * @default
   * ```ts
   * "div"
   * ```
   */
  as?: AsTag | Component;
  /**
   * @default
   * ```ts
   * false
   * ```
   */
  asChild?: boolean;
};

export default defineComponent<VPrimitiveProps>((props, { attrs, slots }) => {
  if (props.asChild) {
    return () => {
      if (!slots.default) return null;

      const [child] = renderSlotFragments(slots.default());
      if (!child) return null;

      if (Object.keys(attrs).length) {
        delete child.props?.ref;
        const mergedProps = mergeProps(attrs, child.props ?? {});

        if (attrs.class && child.props?.class) {
          delete child.props.class;
        }

        const cloned = cloneVNode(child, mergedProps);
        for (const key in mergedProps) {
          if (key.startsWith("on")) {
            cloned.props ||= {};
            cloned.props[key] = mergedProps[key];
          }
        }

        return cloned;
      }

      return child;
    };
  } else {
    return () => h(props.as ?? "div", attrs, { default: slots.default });
  }
}, {
  name: "VPrimitive",
  inheritAttrs: false,
  props: {
    as: {
      type: String,
      required: false,
      default: "div",
    },
    asChild: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  slots: {
    default: {},
  },
});

function renderSlotFragments(children?: VNode[]): VNode[] {
  if (!children) return [];
  return children.flatMap((child) => {
    if (child.type === Fragment) {
      return renderSlotFragments(child.children as VNode[]);
    } else {
      return [child];
    }
  });
}
