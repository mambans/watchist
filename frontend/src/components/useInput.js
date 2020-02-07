import { useState } from "react";

export default (initialValue, setSuggestionsOpen) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    manualSet: {
      onClick: event => {
        setValue(event.target.textContent);
        if (setSuggestionsOpen) setSuggestionsOpen(false);
      },
    },
    bind: {
      value,
      onChange: event => {
        setValue(event.target.value);
      },
    },
  };
};
