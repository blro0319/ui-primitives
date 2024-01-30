export function disabledFromProps(props: {
  disabled?: boolean;
  "aria-disabled"?: unknown;
}) {
  return !!props.disabled ||
    props["aria-disabled"] === true ||
    props["aria-disabled"] === "true";
}
