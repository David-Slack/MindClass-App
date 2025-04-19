import {Card} from "react-bootstrap";
import React from "react";
import styles from "./LoginStreak.module.css";

export function LoginStreak({streak}) {
    return(
        <Card className={`text-center ${styles.card}`}>
            <Card.Header>
                <h5 className={'text-center'}>Login Streak</h5>
            </Card.Header>
            <Card.Body>
                <Card.Title className={`${styles.cardTitle}`}>{
                    streak === 1 ?
                        <>
                            {streak}
                        </>
                        :
                        <>
                            {streak}<i className={`${styles.icon} bi bi-arrow-up-circle-fill`}></i>
                        </>
                }</Card.Title>
                <Card.Text>
                    {
                        streak === 1 &&
                        <p>This is the first time in your login streak. Login each day to see what we've been doing.</p>
                    }

                    {
                        streak > 1 && streak < 4 &&
                        <p>You have logged in {streak} times in a row, keep it up!</p>
                    }

                    {
                        streak > 3 &&
                        <p>You have logged in {streak} times in a row, you're doing well!</p>
                    }
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
