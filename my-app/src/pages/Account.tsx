// Account.tsx
import UserAvatar from "../components/avatars/UserAvatar";
import ProfileCard from "../components/cards/ProfileCard";
import MenuDropDown from "../components/drop_downs/MenuDropDown";
import FunctionalIcon from "../components/icons/FunctionalIcon";
import HomeIcon from "../components/icons/icons/HomeIcon";
import TextButton from "../components/buttons/TextButton/TextButton";
import styles from "./Account.module.css";
import CoveredFadeIn from "../components/animate/CoveredFadeIn/CoveredFadeIn";
import { useEffect, useState } from "react";

function Account() {
	const [loaded, setLoaded] = useState(false);
	const [reload, setReload] = useState(0);
	const [editable, setEditable] = useState(false);
	const [profile, setProfile] = useState({
		name: "AwunaLulu",
		pwd: "12345678",
		email: "clee704202@gmail.com",
		birthday: "2002/11/17"
	});

	useEffect(() => {
		setLoaded(true);
	}, [reload]);

	const handleChange = (key: string, value: string) => {
		setProfile((prev) => ({ ...prev, [key]: value }));
	};

	const handleEditToggle = () => {
		setEditable((prev) => !prev);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<MenuDropDown 
					onNavigate={() => {
						setLoaded(false);
					}}
					afterNavigate={() => {
						setReload((prev) => prev + 1);
					}}
				/>
				<FunctionalIcon icon={HomeIcon} to="/" />
			</div>
			<div className={styles.content}>
				<div className={styles.row}>
					<UserAvatar url="https://i.pinimg.com/1200x/df/99/2d/df992d4f3d0c75af24a3dd64b2306107.jpg" />
					<ProfileCard
						name={profile.name}
						pwd={profile.pwd}
						email={profile.email}
						birthday={profile.birthday}
						editable={editable}
						onChange={handleChange}
					/>
				</div>
				<div className={styles.row}>
					<TextButton
						text={editable ? "Save" : "Edit"}
						buttonClass={styles.mainBtn}
						textClass={styles.mainBtnText}
						onClick={handleEditToggle}
					/>
				</div>
			</div>
			<CoveredFadeIn isLoaded={loaded} />
		</div>
	);
}
export default Account;
