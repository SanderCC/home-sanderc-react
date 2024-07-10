import React from 'react';
import '@fontsource/inter';
import {Stack} from "@mui/joy";

function App() {
  return (
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
      </Stack>
  );
}

export default App;
