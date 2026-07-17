import React from "react";
import "./RotatingEarth.css";

export default function RotatingEarth() {
    return (
        <div className="earth" aria-hidden="true">
            <span className="earth-atmosphere" />
            <span className="earth-sphere" />
            <span className="earth-shading" />
        </div>
    );
}
