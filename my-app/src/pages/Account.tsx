import UserAvatar from "../components/avatars/UserAvatar";
import ProfileCard from "../components/cards/ProfileCard";
import MenuDropDown from "../components/drop_downs/MenuDropDown";
import FunctionalIcon from "../components/icons/FunctionalIcon";
import HomeIcon from "../components/icons/icons/HomeIcon";
import TextButton from "../components/buttons/TextButton/TextButton";
import styles from "./Account.module.css";
import CoveredFadeIn from "../components/animate/CoveredFadeIn/CoveredFadeIn";
import { useState, useCallback } from "react";
import { useFadeIn } from "../hooks/useFadeIn";

type ProfileKey = "name" | "pwd" | "email" | "birthday";

function Account() {
	const { loaded, fadeOut, fadeIn } = useFadeIn();

	const [editable, setEditable] = useState(false);
	const [profile, setProfile] = useState({
		name: "una",
		pwd: "123456",
		email: "clee704202@gmail.com",
		birthday: "2002/11/17",
	});

	const handleChange = useCallback((key: ProfileKey, value: string) => {
		setProfile((prev) => ({ ...prev, [key]: value }));
	}, []);

	const handleEditToggle = useCallback(() => {
		setEditable((prev) => !prev);
	}, []);

	return (
		<div className={styles.container}>
		<div className={styles.header}>
			<MenuDropDown onNavigate={fadeOut} afterNavigate={fadeIn} />
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
