import { useState } from "react";

export default function Test() {
  const [test, setTest] = useState(false);
  const handleClick = () => {
    setTest(!test);
  };
  return (
    <div>
      <button onClick={handleClick}>Toogle</button>

      {test && <p>true</p>}

      {!test && <p> false </p>}
      <div className="spinner-border text-primary" role="status"></div>
    </div>
  );
}
