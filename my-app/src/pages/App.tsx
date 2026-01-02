import TextButton from "../components/buttons/TextButton/TextButton";
import UserAvatar from "../components/avatars/UserAvatar";
import styles from "./App.module.css";
import Text from "../components/texts/Text";
import MenuDropDown from "../components/drop_downs/MenuDropDown";
import { useTransition } from "../providers/TransitionProvider";
import shika from "../images/shika.jpg";

function App() {
    const { go } = useTransition();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <MenuDropDown/>
            </div>
            <div className={styles.body}>
                <UserAvatar url={shika}/>
                <Text text="Welcome, Luna (●'◡'●)" textClass={styles.text}/>
                <TextButton 
                    text="Start" 
                    buttonClass={styles.mainBtn}
                    onClick={() => go("/timer")}
                />
            </div>
        </div>
    );
}

export default App