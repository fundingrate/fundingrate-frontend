import React, { useState, useEffect } from "react";

import AceEditor from "react-ace";
// import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/mode-json";
// import "ace-builds/src-noconflict/theme-vibrant_ink";

const Editor = ({
  lang = "markdown",
  theme = "vibrant_ink",
  onChange = x => x,
  data,
  ...p
}) => {
  if (["json", "javascript"].includes(lang)) {
    data = JSON.stringify(data, null, 2);
  }

  const [state, setState] = useState(data);

  const change = c => {
    onChange(c);
    setState(c);
  };

  return (
    <AceEditor
      width={"100%"}
      height={"290px"}
      {...p}
      fontSize={14}
      name="editor"
      mode={lang}
      // theme={theme}
      defaultValue={data}
      value={state}
      onChange={change}
      editorProps={{
        $blockScrolling: true,
        showGutter: false
      }}
      tabSize={2}
    />
  );
};

export default Editor;
