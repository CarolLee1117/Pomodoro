import styles from "./CoveredFadeIn.module.css";

interface coveredFadeInProps {
    isLoaded: boolean;
}

function CoveredFadeIn({
    isLoaded=false
}: coveredFadeInProps) {
    return (
        <div 
            className={styles.container} 
            style={{
                opacity: isLoaded ? 0 : 1
            }} 
        />
    )
}

export default CoveredFadeIn;