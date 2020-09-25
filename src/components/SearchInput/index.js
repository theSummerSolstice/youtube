import React, { useCallback } from "react";
import debounce from "lodash/debounce";
import Input from "../shared/Input";

// ✅ PropTypes는 무슨 용도일까요?
// 조사해보시고 다른 컴포넌트에도 폭넓게 적용해보세요.
import PropTypes from "prop-types";

export default function SearchInput({ onChange, placeholder, value, updateDebouncedKeyword}) {

  const debounced = useCallback(debounce((value) => updateDebouncedKeyword(value), 500), []);

  function handleChange (ev) {
    const target = ev.target.value;
    onChange(target);
    debounced(target);
  }

  return (
    <Input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
}

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
SearchInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
};
