import SiteButton from "./SiteButton";
import {Stack} from "@mui/joy";
import React from "react";

export default function ProfileButtons() {
    return <Stack direction={"row"} spacing={2}>
        <SiteButton
            size={30}
            icon={"https://github.githubassets.com/favicons/favicon.png"}
            url={"https://github.com/SanderCC"} />
        <SiteButton
            size={31}
            icon={"https://static.licdn.com/aero-v1/sc/h/akt4ae504epesldzj74dzred8"}
            url={"https://www.linkedin.com/in/sanderconstantin/"} />
        <SiteButton
            size={30}
            icon={"https://www.paypalobjects.com/webstatic/icon/pp32.png"}
            url={"https://paypal.me/SanderC"} />
    </Stack>
}
