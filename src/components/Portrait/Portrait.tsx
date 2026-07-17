import React from "react";
import "./Portrait.css";

interface PortraitProps {
    size?: number;
}

export default function Portrait({ size = 160 }: PortraitProps) {
    return (
        <img
            className="portrait"
            style={{ width: size, height: size }}
            src="https://avatars.githubusercontent.com/u/58855319?v=4"
            alt="Sander Constantin"
        />
    );
}
