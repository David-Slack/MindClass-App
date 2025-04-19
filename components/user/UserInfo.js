import { Card, CardGroup } from "react-bootstrap";
import styles from "./UserInfo.module.css";
import { formatDate } from "@/helpers/formatDate";
import {ProfileImage} from "@/components/user/profileImage";

export function UserInfo({userData}){
    const lastLogin = formatDate(userData.customerData.lastLoginDate);
    const createdDate = formatDate(userData.customerData.createdDtm);

    return(
        <CardGroup className="mb-3 text-center">
            <Card>
                <Card.Header>
                    <h5>Account owner</h5>
                </Card.Header>
                <Card.Body>
                    <ProfileImage size={140} />
                    <Card.Title className={styles.cardTitle}>

                        <p className={styles.smallText}>{userData.email}</p><br/>
                        {userData.customerData.firstName} {userData.customerData.lastName}</Card.Title>
                    <Card.Subtitle className={`text-muted ${styles.cardSubtitle}`}>Your account type is: {userData.customerData.accountType}</Card.Subtitle>
                </Card.Body>
            </Card>
            <Card>
                <Card.Header>
                    <h5>Last login</h5>
                </Card.Header>
                <Card.Body>
                    <i className={`${styles.icon} bi bi-calendar`}></i>
                    <Card.Title className={styles.cardTitle}>{lastLogin}</Card.Title>
                    <Card.Subtitle className={`text-muted ${styles.cardSubtitle}`}>Account created on</Card.Subtitle>
                    <Card.Subtitle className={`${styles.cardSubtitle}`}>{createdDate}</Card.Subtitle>
                </Card.Body>
            </Card>
            <Card>
                <Card.Header>
                    <h5>Company Code</h5>
                </Card.Header>
                <Card.Body>
                    <i className={`${styles.icon} bi bi-building`}></i>
                    <Card.Title className={styles.cardTitle}>{userData.customerData.company}</Card.Title>
                    <p>This is the code for your company<br/>It may be needed for support</p>
                </Card.Body>
            </Card>
        </CardGroup>
    )
}
