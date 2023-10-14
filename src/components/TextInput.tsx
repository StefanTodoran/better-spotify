import { useEffect, useRef, useState } from "react";
import "../styles/TextInput.css";

interface Props {
  value: string,
  updateValue?: (newValue: string) => void,
  label: string,

  formatter?: (input: string, error: () => void) => string,
  regex?: string,
  maxLength?: number,
  inputType?: string,
  inputMode?: "search" | "text" | "email" | "tel" | "url" | "none" | "numeric" | "decimal",
  blockInvalid?: boolean,
  customClass?: string,
  giveRef?: React.RefObject<HTMLInputElement>,
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
 * OPTIONAL:
 * @param {function} formatter
 * Function which text input is passed into before updating
 * state. Should take a string which is either raw or formatted input,
 * and return formatted input. The second parameter is an error
 * callback.
 * 
 * @param {string} regex 
 * A regular expression which should only match valid inputs.
 * 
 * @param {string} inputType 
 * Used to provide an alternative type value to the input.
 * By default, "text" is used.
 * 
 * @param {string} inputMode
 * Not te be confused with inputType, which sets the html attribute "type",
 * this prop sets the html attribute "inputmode". By default no value is provided.
 * 
 * @param {number} maxLength 
 * The maximum input length. Defaults to 32.
 * 
 * @param {boolean} blockInvalid 
 * Whether invalid inputs should be blocked. Defaults
 * to false, which is useful if an input which is not fully formed
 * or in the process of being typed would not match the regex.
 * 
 * @param {string} customClass
 * Adds additional class names to the input element.
 */
export default function TextInput({
  label,
  value,
  updateValue,
  formatter,
  regex,
  maxLength,
  inputType,
  inputMode,
  blockInvalid,
  customClass,
  giveRef,
}: Props) {
  const [valid, setValidity] = useState(true);
  let localRef = useRef<HTMLInputElement>(null);
  localRef = giveRef || localRef;

  function doErrorFlash(
    validAfterDelay?: boolean,
    // scrollIntoView?: boolean,
  ) {
    setValidity(false);
    if (validAfterDelay) setTimeout(() => setValidity(true), 1500);
    // if (scrollIntoView) scrollRef?.current?.scrollIntoView();
  }

  // @ts-expect-error If the regex prop doesn't exist, we don't care since we won't use filter.
  const filter = new RegExp(regex);
  function isValid(checkValue: string) {
    return (!maxLength || checkValue.length <= maxLength) && (!regex || filter.test(checkValue));
  }

  function updateText(event: React.ChangeEvent<HTMLInputElement>) {
    const handleError = () => { doErrorFlash(blockInvalid); };
    let newValue = event.target.value;

    const inputEvent = event.nativeEvent as InputEvent;
    if (event.target.value === "" && inputEvent.data) {
      // Basically if an <input/> is given type="number" is has this extremely stupid
      // "error handling" behavior where it doesn't actually block non-numeric inputs,
      // but the input's value will be an empty string if the user inputs, say, a letter. 
      // We need this check to counteract that ridiculous "functionality" and just allow
      // our own error handling to work. We especially don't want the text inside of the 
      // <input/> and the value state prop to ever be different.
      newValue = event.target.value + inputEvent.data;
    }

    if (!isValid(newValue)) {
      handleError();
      if (blockInvalid) return;
    } else {
      setValidity(true);
    }

    if (formatter) newValue = formatter(newValue, handleError);
    updateValue && updateValue(newValue);
  }

  useEffect(() => {
    setValidity(isValid(value));
  }, []);

  let containerClass = "form-item";
  if (value) containerClass += " has-content";
  if (!valid) containerClass += " invalid";
  if (!blockInvalid) containerClass += " static";
  if (!updateValue) containerClass += " read-only";
  if (customClass) containerClass += " " + customClass;

  return (
    <div className={containerClass}>
      <div className="form-item-label">
        <p>{label}</p>
      </div>

      <input
        type={inputType || "text"}
        inputMode={inputMode}
        className={"form-field"}
        maxLength={maxLength}
        value={value}
        onChange={updateText}
        disabled={!updateValue}
        ref={giveRef}
      />
    </div>
  );
}
