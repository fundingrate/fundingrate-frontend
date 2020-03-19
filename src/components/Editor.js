import React, { useState, useEffect } from "react";

import brace from "brace";
import "brace/mode/json";
import "brace/theme/monokai";
import AceEditor from "react-ace";

import { Text } from "../primitives";

const Editor = ({ onConfirm, data, readOnly = false }) => {
  const d = JSON.stringify(data, null, 2);
  const [state, setState] = useState(d);

  return (
    <AceEditor
      readOnly={readOnly}
      fontSize={14}
      width={"100%"}
      height={"400px"}
      name="editor"
      mode="json"
      theme="monokai"
      defaultValue={d}
      value={state}
      onChange={setState}
      editorProps={{ $blockScrolling: true, showGutter: false, readOnly }}
      tabSize={2}
    />
  );
};

export default Editor;
