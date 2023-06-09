import type { MaybeRefOrGetter } from "vue";
import type { ComponentAs } from "~/types";

export interface VAccordionProps {
  /**
   * @default
   * ```ts
   * "div"
   * ```
   */
  as?: ComponentAs;
  /**
   * @default
   * ```ts
   * "single"
   * ```
   */
  expandMode?: VAccordionExpandMode;
}

export type VAccordionExpandMode = "single" | "multiple";

export interface VAccordionContextOptions {
  expandMode?: MaybeRefOrGetter<VAccordionExpandMode>;
}

// ----- Item ----- //

export interface VAccordionItemProps {
  /**
   * @default
   * ```ts
   * false
   * ```
   */
  open?: boolean;
}

export interface VAccordionItemContextOptions {
  open?: MaybeRefOrGetter<boolean>;
}

// ----- Header ----- //

export interface VAccordionHeaderProps {
  /**
   * @default
   * ```ts
   * "h3"
   * ```
   */
  as?: ComponentAs;
}

// ----- Trigger ----- //

export interface VAccordionTriggerProps {
  /**
   * @default
   * ```ts
   * "button"
   * ```
   */
  as?: ComponentAs;
}

// ----- Panel ----- //

export interface VAccordionPanelProps {
  /**
   * @default
   * ```ts
   * "div"
   * ```
   */
  as?: ComponentAs;
}
