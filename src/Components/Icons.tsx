import React from 'react'
import { RiPauseFill, RiPlayFill } from "react-icons/ri";
import { GiResize } from "react-icons/gi";
import {FiRepeat} from "react-icons/fi";

export interface IconProps  {
    name: string;
    className?: string;
}

const Icon: React.FC<IconProps> = ({ name, className }) => {
    if (name === "pause") {
        return <RiPauseFill className={`inline-flex ${className}`}/>
    }

    if (name === "play") {
        return <RiPlayFill className={`inline-flex ${className}`}/>
    }
    if (name === "repeat") {
        return <FiRepeat className={`inline-flex ${className}`}/>
    }
    if (name === "resize") {
        return <GiResize className={`inline-flex ${className}`}/>
    }
    return <></>
}





export { Icon};
