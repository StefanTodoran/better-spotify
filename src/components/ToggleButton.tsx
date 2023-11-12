import { CSSProperties, useLayoutEffect, useRef, useState } from "react";
import "../styles/Taglike.css";

interface Props {
  firstOption: string,
  secondOption: string,
  current: number, // 0 for firstOption, 1 for secondOption
  onToggle: (setOption: string) => void,
}

export default function ToggleButton({
  firstOption,
  secondOption,
  current,
  onToggle,
}: Props) {
  const firstOptionRef = useRef<HTMLSpanElement>();
  const secondOptionRef = useRef<HTMLSpanElement>();

  const [didRender, setDidRender] = useState(false);
  useLayoutEffect(() => {
    if (!didRender) setDidRender(true);
  }, []);

  let className = "toggle-button tag";
  if (current === 0) className += " first-selected";
  if (current === 1) className += " second-selected";

  return (
    <span
      className={className}
      onClick={() => onToggle(current ? firstOption : secondOption)}
      onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") onToggle(current ? firstOption : secondOption);
      }}
      tabIndex={0}
    >
      <span
        className="current-option"
        style={{
          // We want undefined if the ref.current is not truthy so
          // the CSS fallback can kick in.
          "--first-width": getWidthOrNone(firstOptionRef),
          "--second-width": getWidthOrNone(secondOptionRef),
        } as CSSProperties}
      ></span>

      <span
        // @ts-expect-error
        ref={firstOptionRef}
        className="tag first-option"
      >{firstOption}</span>
      <span
        // @ts-expect-error
        ref={secondOptionRef}
        className="tag second-option"
      >{secondOption}</span>
    </span>
  );
}

function getWidthOrNone(ref: React.MutableRefObject<HTMLSpanElement | undefined>) {
  return ref.current ? `${ref.current?.offsetWidth}px` : undefined;
}