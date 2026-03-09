import { useEffect, useState } from "preact/hooks";
import { hidePopup, showPopup } from "../Popup";

export default function WantToPlay({ next }: { next: () => void }) {
  useEffect(() => {
    showPopup(
      "Let's make a bet",
      <Body
        next={function () {
          hidePopup();
          next();
        }}
      />,
    );
  }, []);

  return <div />;
}

function Body({ next }: { next: () => void }) {
  const [size, setSize] = useState(1);

  function increaseSize() {
    setSize((s) => s + 1);
  }

  return (
    <div className="flex flex-col gap-2 overflow-visible">
      Whoever wins gets to hire the other person?
      <div className="flex justify-end gap-1 items-center">
        <button
          className="bold"
          onClick={() => {
            increaseSize();
          }}
        >
          No thanks
        </button>
        <button
          style={{ fontSize: `${size}em`, paddingLeft: `${size / 4}em`, paddingRight: `${size / 4}em` }}
          className="transition-all duration-100 ease-linear"
          id="deal-button"
          onClick={next}
        >
          Deal!
        </button>
      </div>
    </div>
  );
}
