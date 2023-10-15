import { useRef } from "react";
import "../styles/TextInput.css";

interface Props {
  value: string,
  updateValue?: (newValue: string) => void,
  label: string,
  options: { [key: string]: string },

  customClass?: string,
  giveRef?: React.RefObject<HTMLSelectElement>,
}

/**
 * REQUIRED:
 * @param {string} value
 * The current value of the text input. This should be a 
 * state variable, as TextInput does not control its own
 * text content state.
 * 
 * @param {function} updateValue
 * Set state dispatch function used to update value.
 * If updateValue is not provided, the TextInput is considered read-only.
 * 
 * @param {string} label
 * The label text for the text input.
 * 
 * @param {function} options
 * Dictionary of key value pairs representing the options
 * with which to populate the dropdown input.
 * 
 * OPTIONAL:
 * @param {string} customClass
 * Adds additional class names to the input element.
 */
export default function Dropdown({
  label,
  value,
  updateValue,
  options,
  customClass,
  giveRef,
}: Props) {
  let localRef = useRef<HTMLSelectElement>(null);
  localRef = giveRef || localRef;

  const displayOptions = [];
  for (const [key, value] of Object.entries(options)) {
    displayOptions.push(<option key={key} value={value}>{value}</option>);
  }

  function updateSelected(event: React.ChangeEvent<HTMLSelectElement>) {
    !!updateValue && updateValue(event.target.value);
  }

  let containerClass = "form-item";
  if (value) containerClass += " has-content";
  if (!updateValue) containerClass += " read-only";
  if (customClass) containerClass += " " + customClass;

  return (
    <div className={containerClass}>
      <div className="form-item-label">
        <p>{label}</p>
      </div>

      <select
        className="form-field"
        value={value} 
        onChange={updateSelected}
        ref={giveRef}
      >
        <option value=""></option>
        {displayOptions}
      </select>
    </div>
  );
}
