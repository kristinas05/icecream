import React from "react";
import classNames from "classnames";

import styles from './index.module.scss';

import Button from "../../../../components/Button";

const Card = ({
                  url,
                  urlAlt,
                  title,
                  subtitle1,
                  subtitle2,
                  priceDesc
              }) => {
    return (
        <div className={classNames('gradient-background', styles.block)}>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <h6 className={styles.title}>{title}</h6>
                </div>
                <div className={styles.center}>
                    <div className={styles.item}>
                        <div>
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
                            <p className={styles.subtitle}>{subtitle1}</p>
                        </div>
                        <div className={styles.icon}>
                            <svg width="31" height="16" viewBox="0 0 31 16" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M30.7071 8.70711C31.0976 8.31658 31.0976 7.68342 30.7071 7.29289L24.3431 0.928932C23.9526 0.538408 23.3195 0.538408 22.9289 0.928932C22.5384 1.31946 22.5384 1.95262 22.9289 2.34315L28.5858 8L22.9289 13.6569C22.5384 14.0474 22.5384 14.6805 22.9289 15.0711C23.3195 15.4616 23.9526 15.4616 24.3431 15.0711L30.7071 8.70711ZM0 9H30V7H0V9Z"/>
                            </svg>
                        </div>
                        <div>
                            <div className={styles.picture}>
                                {
                                    url &&
                                    <img
                                        src={urlAlt}
                                        alt={title}
                                        loading={'lazy'}
                                    />
                                }
                            </div>
                            <p className={styles.subtitle}>{subtitle2}</p>
                        </div>
                    </div>
                    <p className={styles.label}>{priceDesc}</p>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.button}>
                        <Button
                            type={'link'}
                            placeholder={'Approve'}
                            classname={'primary'}
                            action={null}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
