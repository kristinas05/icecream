import React from "react";
import classes from "classnames";

import styles from './index.module.scss';

const Card = ({url, name, position}) => {
    return (
        <div className={styles.block}>
            <div className={classes("gradient-background", styles.photo)}>
                <img
                    src={url}
                    alt={name}
                    loading={"lazy"}
                />
            </div>
            <h6 className={styles.name}>{name}</h6>
            <p className={styles.position}>{position}</p>
        </div>
    );
}

export default Card;
