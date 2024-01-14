import React, {memo} from "react";
import * as AccessibleIcon from "@radix-ui/react-accessible-icon";

export interface IconProps extends React.ComponentPropsWithoutRef<"svg"> {
    children: React.ReactNode;
    label: string;
    color?: string;
    strokeWidth?: number;
    fill?: string;
    className?: string;
    width?: number;
    height?: number;
}

const Icon = ({children, label, color, strokeWidth, fill, className, width, height}: IconProps) => (
    <AccessibleIcon.Root label={label}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width || 24}
            height={height || 24}
            viewBox="0 0 24 24"
            fill={fill || "#fff"}
            stroke={color || "#fff"}
            strokeWidth={strokeWidth || 2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className || "w-[100%] h-[100%]"}>
            {children}
        </svg>
    </AccessibleIcon.Root>
);

export const RecordIcon = memo(() => (
    <Icon label={"Start Record"} fill={"none"} strokeWidth={1}>
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" x2="12" y1="19" y2="22"/>
    </Icon>
));


export const StopRecordIcon = memo(() => (
    <Icon label={"Stop Record"} fill={"none"} strokeWidth={1}>
        <circle cx="12" cy="12" r="10"/>
        <rect width="6" height="6" x="9" y="9"/>
    </Icon>
));

export const PlayIcon = memo(() => (
    <Icon label={"Play"}>
        <polygon points="5 3 19 12 5 21 5 3"/>
    </Icon>
));

export const PauseIcon = memo(() => (
    <Icon label={"Pause"}>
        <rect width="4" height="16" x="6" y="4"/>
        <rect width="4" height="16" x="14" y="4"/>
    </Icon>
));

export const AddAudioIcon = memo(() => (
    <Icon label={"Add Audio"} fill={"none"}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="17 8 12 3 7 8"/>
        <line x1="12" x2="12" y1="3" y2="15"/>
    </Icon>
))
RecordIcon.displayName = "RecordIcon";
StopRecordIcon.displayName = "StopRecordIcon";
PlayIcon.displayName = "PlayIcon";
PauseIcon.displayName = "PauseIcon";
AddAudioIcon.displayName = "AddAudioIcon";