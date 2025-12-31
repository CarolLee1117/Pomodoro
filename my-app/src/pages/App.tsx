import TextButton from "../components/buttons/TextButton/TextButton";
import UserAvatar from "../components/avatars/UserAvatar";
import styles from "./App.module.css";
import FunctionalIcon from "../components/icons/FunctionalIcon";
import GroupIcon from "../components/icons/icons/GroupIcon";
import Text from "../components/texts/Text";
import MenuDropDown from "../components/drop_downs/MenuDropDown";
import CoveredFadeIn from "../components/animate/CoveredFadeIn/CoveredFadeIn";
import { useFadeIn } from "../hooks/useFadeIn";
import shika from "../images/shika.jpg";

// Hello
function App() {
    const { loaded, fadeOut } = useFadeIn();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <MenuDropDown onNavigate={fadeOut}/>
            </div>
            <div className={styles.body}>
                <UserAvatar url={shika}/>
                <Text text="Welcome, AwunaLulu (●'◡'●)" textClass={styles.text}/>
                <TextButton 
                    text="Start !" 
                    buttonClass={styles.mainBtn}
                    textClass={styles.mainBtnText}
                    onClick={() => {
                        alert("Hello");
                    }}
                />
            </div>
            <div className={styles.footer}>
                <FunctionalIcon 
                    icon={GroupIcon}
                    onClick={() => {alert("about us")}}
                />
            </div>
            <CoveredFadeIn isLoaded={loaded} />
        </div>
    );
}

export default App