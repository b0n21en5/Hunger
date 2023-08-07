import { useEffect, useState } from "react";
import { inspirations } from "../../../data/food";

const Inspiration = ({ onApplyCheckedFilter, dispatch }) => {
  const [clickedInspiration, setClickedInspiration] = useState("");

  useEffect(() => {
    if (clickedInspiration) {
      dispatch({ type: "ADD_CHECKED_FILTER", payload: clickedInspiration });
      onApplyCheckedFilter();
    }
  }, [clickedInspiration]);

  return (
    <div
      className="flex"
      style={{ backgroundColor: "#f8f8f8", padding: "40px 82px" }}
    >
      <h3>Inspiration for your first order</h3>
      <div className="d-flex flex-col gap-4 mt-4">
        {inspirations.map((ins) => (
          <div
            key={ins.id}
            className="d-flex gap-2 justify-content-center"
            onClick={() => {
              setClickedInspiration(ins.title);
            }}
            style={{ cursor: "pointer" }}
          >
            <div className="d-flex flex-column">
              <img
                width="150"
                height="150"
                style={{ borderRadius: "50%" }}
                src={ins.img}
                alt={ins.title}
                className="mb-1"
              />
              <div
                className="text-center"
                style={{
                  fontSize: "20px",
                  lineHeight: "32px",
                  fontWeight: "500",
                }}
              >
                {ins.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inspiration;
