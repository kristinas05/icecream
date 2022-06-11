import React from "react";
import classNames from "classnames";

import styles from './index.module.scss';

import Button from "../../../../components/Button";

const Card = ({
                  url,
                  title,
                  buttonPlaceholder
              }) => {
    return (
        <div className={classNames('gradient-background', styles.block)}>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <div className={styles.picture}>
                        {
                            url &&
                            <img
                                src={url}
                                alt={title}
                                loading={'lazy'}
                            />
                        }
                    </div>
                    <h6 className={styles.title}>{title}</h6>
                </div>
                <div className={styles.center}>
                    <div className={styles.item}>
                        <h5 className={styles.value}>0.0000</h5>
                        <p className={styles.label}>= $0.00</p>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.button}>
                            <Button
                                type={'link'}
                                placeholder={buttonPlaceholder}
                                classname={'primary'}
                                action={null}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
