import type { iconProps } from "./BaseIcon";

function MinusIcon({
    color = "currentColor"
}: iconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={color} className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
</svg>


    );
}

export default MinusIcon;