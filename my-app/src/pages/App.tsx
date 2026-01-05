import TextButton from "../components/buttons/TextButton/TextButton";
import UserAvatar from "../components/avatar/UserAvatar";
import styles from "./App.module.css";
import Text from "../components/text/Text";
import MenuDropDown from "../components/drop_down/MenuDropDown";
import { useTransition } from "../providers/TransitionProvider";
import shika from "../images/shika.jpg";

function App() {
    const { go } = useTransition();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <MenuDropDown />
            </div>

            <div className={styles.body}>
                <div className={styles.hero}>
                    <UserAvatar url={shika} />
                    <Text text="Welcome to my Pomodoro App! (●'◡'●)" textClass={styles.text} />
                    <TextButton
                        text="Start"
                        buttonClass={styles.mainBtn}
                        onClick={() => go("/timer")}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
