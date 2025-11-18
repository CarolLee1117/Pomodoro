import Wheel from '@uiw/react-color-wheel';
import styles from './WheelSet.module.css';
import type { HsvaColor } from '@uiw/color-convert';
import { useState, Fragment, useEffect, useRef } from 'react';
import { hexToHsva, hsvaToHex } from '@uiw/color-convert';

interface wheelSetProps {
    value: string,
    wheelClass?: string,
    sliderClass?: string,
    onChange: (hex: string) => void
}

export default function WheelSet({
    value,
    wheelClass="",
    sliderClass="",
    onChange
}: wheelSetProps) {
    const [hsva, setHsva] = useState<HsvaColor>(() => hexToHsva(value));
    const syncingFromProp = useRef(false);   // 防止回圈閃跳
    const [isSliding, setIsSliding] = useState(false); // 正在拉 slider

    useEffect(() => {
        syncingFromProp.current = true;
        setHsva((prev) => isSliding ? prev : hexToHsva(value));
    }, [value]);

    useEffect(() => {
        if (syncingFromProp.current) {
            syncingFromProp.current = false;
            return; // 跳過這次（是外部同步）
        }
        onChange?.(hsvaToHex(hsva).toUpperCase());
    }, [hsva, onChange]);

    const sliderValue = 100 - hsva.v;
    const gradientLeft  = hsvaToHex({ ...hsva, v: 100 });
    const gradientRight = hsvaToHex({ ...hsva, v: 0 });

    return (
        <Fragment>
            <Wheel
                className={wheelClass}
                color={hsva}
                onChange={(c) => setHsva(c.hsva)}
                width={270}
                height={270}
            />
            <input 
                type="range" 
                className={`${styles.colorSlider} ${sliderClass}`} 
                min={0}
                max={100}
                value={sliderValue} 
                style={{
                    background: `linear-gradient(to right, ${gradientLeft}, ${gradientRight})`
                }}
                onMouseDown={(e) => { e.stopPropagation(); setIsSliding(true); }}
                onMouseUp={() => setIsSliding(false)}
                onChange={(e) => {
                    const v = 100 - Number(e.target.value);
                    setHsva((prev) => ({ ...prev, v }));
                }}
            />
        </Fragment>
    );
}
