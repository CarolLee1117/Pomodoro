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

	useEffect(() => {
		setLoaded(true);
	}, [reload]);

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

			{/* 新增一層 content：用 Grid 排版 */}
			<div className={styles.content}>
				<div className={styles.row}>
					<UserAvatar url="https://i.pinimg.com/1200x/df/99/2d/df992d4f3d0c75af24a3dd64b2306107.jpg" />

					<ProfileCard
						name="AwunaLulu"
						pwd="1234678"
						email="clee704202@gmail.com"
						birthday="2002/11/17"
					/>
				</div>
				<div className={styles.row}>
					<TextButton
						text="Edit !"
						buttonClass={styles.mainBtn}
						textClass={styles.mainBtnText}
						onClick={() => alert("Edit")}
					/>
				</div>
			</div>
			<CoveredFadeIn isLoaded={loaded} />
		</div>
	);
}
export default Account;
