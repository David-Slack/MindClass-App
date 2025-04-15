import {Card, CardGroup} from "react-bootstrap";
import styles from "./UserInfo.module.css";
import {formatDate} from "@/helpers/formatDate";

export function UserInfo({userData}){
    const lastLogin = formatDate(userData.customerData.lastLoginDate);
    const createdDate = formatDate(userData.customerData.createdDtm);

    return(
        <CardGroup className="mb-3 text-center">
            <Card className="mb-4">
                <Card.Header>
                    <h4 className="my-0 font-weight-normal">Account owner</h4>
                </Card.Header>
                <Card.Body>
                    <Card.Title className={styles.cardTitle}>{userData.customerData.firstName} {userData.customerData.lastName}</Card.Title>
                    <Card.Subtitle className={`text-muted ${styles.cardSubtitle}`}>Your account type is: {userData.customerData.accountType}</Card.Subtitle>
                </Card.Body>
            </Card>
            <Card className="mb-4">
                <Card.Header>
                    <h4 className="my-0 font-weight-normal">Last login</h4>
                </Card.Header>
                <Card.Body>
                    <Card.Title className={styles.cardTitle}>{lastLogin}</Card.Title>
                    <Card.Subtitle className={`text-muted ${styles.cardSubtitle}`}>Account created</Card.Subtitle>
                    <Card.Subtitle className={`${styles.cardSubtitle}`}>{createdDate}</Card.Subtitle>
                </Card.Body>
            </Card>
            <Card className="mb-4">
                <Card.Header>
                    <h4 className="my-0 font-weight-normal">Company Code</h4>
                </Card.Header>
                <Card.Body>
                    <Card.Title className={styles.cardTitle}>{userData.customerData.company}</Card.Title>
                    <p>This is the code for your company</p>
                </Card.Body>
            </Card>
        </CardGroup>
    )
}
