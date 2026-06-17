import React from "react";

export default function Taostmessage({ right, closeMenu }) {
  return (
    <div>
      <div
        class="message"
        id="submitted"
        style={{
          right: `${right}`,
        }}
      >
        <p>
          Submitted <br /> Successfully!
        </p>
        <button
          onClick={() => {
            closeMenu();
          }}
        >
          Okey
        </button>
      </div>
    </div>
  );
}
