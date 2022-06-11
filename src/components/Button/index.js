import React from "react";
import classNames from "classnames";

import {useSelector} from "react-redux";

import styles from './index.module.scss';

const Button = ({
                    action,
                    type,
                    placeholder,
                    classname
                }) => {
    const {mode} = useSelector(state => state.rootReducer.modeReducer)

    return (
        <>
            {
                type === 'button' &&
                <button
                    type={type}
                    className={classNames(styles.button, styles[classname], styles[mode])}
                    onClick={() => {
                        action && action()
                    }}
                >
                    {placeholder}
                </button>
            }
            {
                type === 'link' &&
                <a
                    className={classNames(styles.button, styles[classname], styles[mode])}
                    href={action}
                    target={'_blank'}
                    rel={"noreferrer"}
                >
                    {placeholder}
                </a>
            }
        </>
    );
}

export default Button;
