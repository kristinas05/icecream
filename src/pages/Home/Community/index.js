import React from "react";
import {useDispatch, useSelector} from "react-redux";

import classes from "classnames";

import {setModalData} from "../../../state/appReducer/actions/modalActions";

import Button from "../../../components/Button";

import styles from './index.module.scss';

const Community = () => {
    const dispatch = useDispatch();

    const {modal} = useSelector(state => state.rootReducer.modalReducer)

    return (
        <section className={classes("section", styles.section)}>
            <div className={classes("container-fluid", styles.fluid)}>
                <div className={classes("container", styles.container)}>
                    <div className={classes("row", styles.row)}>
                        <div
                            className={classes("col", "col-12", "col-md-8", "col-xl-6", "col-padding-vertical", styles.col)}>
                            <h2 className={styles.title}>We’re Transparent & Community Based</h2>
                            <p className={styles.text}>IceCream Finance has successfully been KYC'd by Assure. We plan
                                to stand side by side with our investors through thick and thin. We will give the
                                community the ability to vote on many of the protocols decisions because in this world
                                there's nothing greater than the minds of several knowledgable investors making communal
                                decisions.</p>
                            <div className={styles.button}>
                                <Button
                                    action={() => {
                                        dispatch(setModalData(!modal))
                                    }}
                                    type={"button"}
                                    placeholder={'Connect Wallet'}
                                    classname={'alt'}
                                />
                            </div>
                        </div>
                        <div
                            className={classes("col", "col-12", "col-md-4", "col-xl-6", "col-padding-vertical", styles.col)}>
                            <div className={styles.picture}>
                                <img
                                    src={"/img/community.gif"}
                                    alt={"Community"}
                                    loading={"lazy"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Community;
