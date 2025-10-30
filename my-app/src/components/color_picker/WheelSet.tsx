import { useState, Fragment, useEffect } from 'react';
import Wheel from '@uiw/react-color-wheel';
// import ShadeSlider from '@uiw/react-color-shade-slider';
import { color, hexToHsva, hsvaToHex } from '@uiw/color-convert';
import styles from './WheelSet.module.css';

interface wheelSetProps {
    value: string,
    wheelClass?: string,
    sliderClass?: string,
    onChange: (e: string) => void
}

export default function WheelSet({
    value,
    wheelClass="",
    sliderClass="",
    onChange
}: wheelSetProps) {
    const [hsva, setHsva] = useState(hexToHsva(value));
    const [colorV, setColorV] = useState("0");

    useEffect(() => {
        onChange?.(hsvaToHex(hsva));
    }, [hsva]);

    return (
        <Fragment>
            <Wheel
                className={wheelClass}
                color={hsva}
                onChange={(color) => setHsva(color.hsva)}
                width={270} 
                height={270}
            />
            {/* <ShadeSlider
                className={sliderClass}
                hsva={hsva}
                style={{ width: 210, marginTop: 10 }}
                onChange={(newShade) => setHsva({ ...hsva, ...newShade })}
            /> */}
            <input 
                type="range" 
                className={`${styles.colorSlider} ${sliderClass}`} 
                min="0" 
                max="100" 
                value={colorV} 
                style={{
                    background: `linear-gradient(to right, ${value}, #000000)`
                }}
                onChange={(e) => {
                    setColorV(e.target.value);
                    setHsva({ ...hsva, v: 100 - Number(e.target.value) });
                }}
            />
        </Fragment>
    );
}
