import React from "react";
import {cn} from "~/lib";
import * as LabelPrimitive from "@radix-ui/react-label";

import {cva, type VariantProps} from "class-variance-authority";


const labelVariants = cva(
    "cursor-pointer text-neutral-content text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    {
        variants: {
            variant: {
                upload: "text-3xl h-screen w-screen flex flex-col items-center justify-center ",
                icon: "h-12 w-12",
            },
        },
    });

type LabelElement = React.ElementRef<typeof LabelPrimitive.Root>;

interface LabelProps extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
    leftSection?: React.ReactNode;
}

const Label = React.forwardRef<LabelElement, LabelProps>(
    ({className, variant, leftSection, children, ...props}, ref) => {
        return <LabelPrimitive.Root
            className={cn(labelVariants({variant, className}))}
            ref={ref}
            {...props}>
            {leftSection && leftSection}
            {children}
        </LabelPrimitive.Root>;
    },
);

Label.displayName = LabelPrimitive.Root.displayName;

export {Label};
