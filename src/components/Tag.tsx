import "../styles/Taglike.css";

export interface TaglistObject {
  name: string,
  // tracks: string[], // Mixify IDs
  uuid: string, // Mixify ID
}

interface Props {
  name: string,
  selected: boolean,
  onClick: () => void,
}

export default function Tag({
  name,
  selected,
  onClick,
}: Props) {
  return (
    <span className={selected ? "tag selected" : "tag"} onClick={onClick} tabIndex={0}>
      {name}
    </span>
  );
}