import React from 'react';
import '@fontsource/inter';
import {Box, Card, Stack} from "@mui/joy";
import Portrait from "./components/Portrait";
import GitHubStats from "./components/GitHubStats";
import ProfileButtons from "./components/ProfileButtons";
import "./css/app.css"

function App() {
  return (
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{m:0,p:0, height: "95vh"}}>
          <Card>
              <Stack direction={"row"} spacing={5} sx={{p:3}}>
                  <div>
                      <Portrait />
                  </div>
                  <div>
                      <GitHubStats />
                      <Box display={"flex"} justifyContent={"center"}>
                          <ProfileButtons />
                      </Box>
                  </div>
              </Stack>
          </Card>
      </Box>
  );
}

export default App;
