import React, { useState, useRef } from "react";
import SignaturePad from "react-signature-canvas";

const Signature = (props) => {
  const [trimmedDataURL, setTrimmedDataURL] = useState(null);
  const sigPad = useRef({});

  const clear = () => {
    // sigPad.clear();
    console.log(sigPad);
  };
  const trim = () => {
    setTrimmedDataURL(sigPad.getTrimmedCanvas().toDataURL());
  };

  return (
    <div>
      <SignaturePad
        penColor="green"
        canvasProps={{ width: 200, height: 200 }}
        ref={sigPad}
      />
      <button type="button" onClick={clear}>
        Clear
      </button>
      <button onClick={trim}>Trim</button>
    </div>
  );
};

export default Signature;
