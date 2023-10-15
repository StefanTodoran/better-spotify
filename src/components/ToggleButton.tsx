import { CSSProperties, useLayoutEffect, useRef, useState } from "react";
import "../styles/Taglike.css";

interface Props {
  firstOption: string,
  secondOption: string,
  current: number, // 0 for firstOption, 1 for secondOption
  onClick: (setOption: string) => void,
}

export default function ToggleButton({
  firstOption,
  secondOption,
  current,
  onClick,
}: Props) {
  const firstOptionRef = useRef<HTMLSpanElement>();
  const secondOptionRef = useRef<HTMLSpanElement>();

  let className = "toggle-button tag";
  if (current === 0) className += " first-selected";
  if (current === 1) className += " second-selected";

  return (
    <span
      className={className}
      onClick={() => onClick(current ? firstOption : secondOption)}
      tabIndex={0}
    >
      <span
        className="current-option"
        style={{
          "--first-width": `${firstOptionRef.current?.offsetWidth}px`,
          "--second-width": `${secondOptionRef.current?.offsetWidth}px`,
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