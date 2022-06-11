import React from "react";

import Icon from "../Icon";

import styles from './index.module.scss';

const Info = ({text}) => {
    return (
        <div className={styles.block}>
            <span className={styles.icon}>
                <Icon name={'info'}/>
            </span>
            <p className={styles.text}>{text}</p>
        </div>
    );
}

export default Info;
