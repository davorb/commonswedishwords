import React, { useState, useCallback } from "react";
import "./Toggler.css";

const Toggler = ({ onClick = () => {} }) => {
  const [checked, setChecked] = useState(true);
  const toggleChecked = useCallback(() => {
    setChecked((state) => !state);
    onClick();
  }, [onClick]);

  return (
    <div className="toggle-container">
      <div
        className={
          "toggle-label " +
          (checked ? "toggle-label-easy" : "toggle-label-hard")
        }
      >
        {checked ? "Easy" : "Hard"}
      </div>
      <div className="toggle-border">
        <input
          id="one"
          type="checkbox"
          checked={checked}
          onChange={toggleChecked}
        />
        <label htmlFor="one">
          <div className="handle"></div>
        </label>
      </div>
    </div>
  );
};

export default Toggler;
