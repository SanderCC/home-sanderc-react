import React from 'react';
import '@fontsource/inter';
import {Box, Card, Stack} from "@mui/joy";
import "./css/app.css"
import SiteButton from "./components/SiteButton";

function App() {
  return (
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{m:0,p:0, height: "95vh"}}>
          <Card>
              <Stack direction={"row"} spacing={5} sx={{p:3}}>
                  <div>
                      <img src={"https://avatars.githubusercontent.com/u/58855319?v=4"}
                           height={200}
                           style={{borderRadius: 10}}
                           alt={"Sander Constantin"} />
                  </div>
                  <div>
                      <img src={"https://github-readme-stats.vercel.app/api" +
                          "?username=SanderCC" +
                          "&show_icons=true" +
                          "&theme=transparent" +
                          "&title_color=000" +
                          "&icon_color=000" +
                          "&text_color=000" +
                          "&hide_border=true"}
                            alt={"GitHub stats"}
                      />
                      <Stack direction={"row"} spacing={2}>
                          <SiteButton
                              size={30}
                              icon={"https://github.githubassets.com/favicons/favicon.png"}
                              url={"https://github.com/SanderCC"} />
                          <SiteButton
                              size={31}
                              icon={"https://static.licdn.com/aero-v1/sc/h/akt4ae504epesldzj74dzred8"}
                              url={"https://www.linkedin.com/in/sanderconstantin/"} />
                      </Stack>
                  </div>
              </Stack>
          </Card>
      </Box>
  );
}

export default App;
