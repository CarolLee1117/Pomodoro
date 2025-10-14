import TextButton from "./components/buttons/TextButton/TextButton";
import UserAvatar from "./components/avatars/UserAvatar";
import styles from "./App.module.css";
import FunctionalIcon from "./components/icons/FunctionalIcon";
import GroupIcon from "./components/icons/icons/GroupIcon";
import Text from "./components/texts/Text";
import MenuDropDown from "./components/drop_downs/MenuDropDown";


function App() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <MenuDropDown/>
            </div>
            <div className={styles.body}>
                <UserAvatar url="https://i.pinimg.com/1200x/df/99/2d/df992d4f3d0c75af24a3dd64b2306107.jpg" />
                <Text text="Welcome, AwunaLulu (●'◡'●)" fontSize={"40px"}/>
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
        </div>
    );
}

export default App