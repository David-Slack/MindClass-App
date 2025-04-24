/*
import React from "react";
import HeaderBar from "../../../../Layouts/Header";
import { Row, Tabs, Typography } from "antd";
import BoxBreathing from "./breathingTool/boxBreathing/boxBreathing.tsx";
import { IonContent, IonRow } from "@ionic/react";
import styles from "./breathingTool/app.module.scss";
import { mindclassMainColours } from "../../../../Common/data/mindclassMainColours.js";

const { Text } = Typography;

const BreathingBox = () => {
  document.title = "Breathing Box" + process.env.REACT_APP_PAGE_TITLE;

  return (
    <>
      <HeaderBar Title="Box Breathing" showSmiley  />

      <Row style={{ width:"calc(100% + 100px)", marginLeft:"-50px", height:"100%", minHeight: "100vh", background: mindclassMainColours.blue }}>
        <IonRow style={{width:'100%', height:'98%', overflow:'hidden', minHeight:600  }}>
          <div className={styles.outer}>
            <div className={styles.inner}>
              <BoxBreathing />
            </div>
          </div>
        </IonRow>
      </Row>
    </>
  );
};

export default BreathingBox;
*/
