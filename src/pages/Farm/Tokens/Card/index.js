import React, {useMemo} from "react";
import classNames from "classnames";

import styles from './index.module.scss';

import useStatsForPool from "../../../../hooks/useStatsForPool";
import {getDisplayBalance} from "../../../../utils/formatBalance";
import useEarnings from "../../../../hooks/useEarnings";
import useShareStats from "../../../../hooks/usetShareStats";
import useTombStats from "../../../../hooks/useTombStats";
import useHarvest from "../../../../hooks/useHarvest";
import useApprove, {ApprovalState} from "../../../../hooks/useApprove";
import useStakedBalance from "../../../../hooks/useStakedBalance";
import useStakedTokenPriceInDollars from "../../../../hooks/useStakedTokenPriceInDollars";
import useTokenBalance from "../../../../hooks/useTokenBalance";
import useStake from "../../../../hooks/useStake";
import useWithdraw from "../../../../hooks/useWithdraw";
import useModal from "../../../../hooks/useModal";
import WithdrawModal from "../../../Bank/components/WithdrawModal";
import DepositModal from "../../../Bank/components/DepositModal";
import Button from "../../../../components/Button";
import {Grid} from "@mui/material";
import TokenSymbol from "../../../../components/TokenSymbol";


const Card = ({bank, src, title}) => {
    const [approveStatus, approve] = useApprove(bank.depositToken, bank.address);
    const statsOnPool = useStatsForPool(bank);

    const earnings = useEarnings(bank.contract, bank.earnTokenName, bank.poolId);
    const {onReward} = useHarvest(bank);
    const tombStats = useTombStats();
    const tShareStats = useShareStats();

    const tokenStats = bank.earnTokenName === 'CSHARE' ? tShareStats : tombStats;
    const tokenPriceInDollars = useMemo(
        () => (tokenStats ? Number(tokenStats.priceInDollars).toFixed(2) : null),
        [tokenStats],
    );
    const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);


    const stakedBalance = useStakedBalance(bank.contract, bank.poolId);
    const stakedTokenPriceInDollars = useStakedTokenPriceInDollars(bank.depositTokenName, bank.depositToken);
    const stakedInDollars = (
        Number(stakedTokenPriceInDollars) * Number(getDisplayBalance(stakedBalance, bank.depositToken.decimal))
    ).toFixed(2);
    const {onStake} = useStake(bank);
    const {onWithdraw} = useWithdraw(bank);
    const tokenBalance = useTokenBalance(bank.depositToken);

    const [onPresentDeposit, onDismissDeposit] = useModal(
        <DepositModal
            max={tokenBalance}
            decimals={bank.depositToken.decimal}
            onConfirm={(amount) => {
                if (Number(amount) <= 0 || isNaN(Number(amount))) return;
                onStake(amount);
                onDismissDeposit();
            }}
            tokenName={bank.depositTokenName}
        />,
    );
    const [onPresentWithdraw, onDismissWithdraw] = useModal(
        <WithdrawModal
            max={stakedBalance}
            decimals={bank.depositToken.decimal}
            onConfirm={(amount) => {
                if (Number(amount) <= 0 || isNaN(Number(amount))) return;
                onWithdraw(amount);
                onDismissWithdraw();
            }}
            tokenName={bank.depositTokenName}
        />,
    );


    return (
        <div className={classNames('gradient-background', styles.block)}>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <div className={styles.picture}>
                        <TokenSymbol symbol={bank.depositTokenName} />
                    </div>
                    <div>
                        <h6 className={styles.title}>{bank.depositTokenName}</h6>
                        <p className={styles.percent}>{bank.multiplier}</p>
                    </div>
                </div>


                <div className={styles.center}>
                    <div className={styles.item}>
                        <p className={styles.label}>Daily ROI</p>
                        <p className={styles.value}>{statsOnPool?.dailyAPR}%</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.label}>Earn</p>
                        <p className={styles.value}>{bank.earnTokenName}</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.label}>Pending Rewards</p>
                        <p className={styles.value}>{getDisplayBalance(earnings)}</p>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.button}>
                            <Button
                                type={'link'}
                                placeholder={'Collect'}
                                classname={'primary'}
                                action={onReward}
                            />
                        </div>
                    </div>
                    <div className={classNames(styles.item, styles.wide)}>
                        <p className={styles.label}>{`≈ $${earnedInDollars}`}</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.label}>{`${bank.depositTokenName}`}</p>
                        <p className={styles.value}>Staked</p>
                    </div>


                    <div className={styles.item}>
                        <div className={styles.button}>
                            {approveStatus !== ApprovalState.APPROVED ? (
                                // <Button
                                //     disabled={
                                //         bank.closedForStaking ||
                                //         approveStatus === ApprovalState.PENDING ||
                                //         approveStatus === ApprovalState.UNKNOWN
                                //     }
                                //     type={'link'}
                                //     onClick={approve}
                                //     classname={'primary'}
                                // >
                                //     {`Approve ${bank.depositTokenName}`}
                                // </Button>
                                <Button
                                    type={'link'}
                                    placeholder={'Approve'}
                                    classname={'primary'}
                                    action={approve}
                                />
                            ) : (
                                <>
                                    <Grid>
                                        <h2 style={{color: 'black'}}>
                                            {getDisplayBalance(stakedBalance, bank.depositToken.decimal)}
                                        </h2>
                                        <h5 style={{color: 'grey', fontWeight: 'normal', marginTop: '5px'}}>
                                            {`≈ $${stakedInDollars}`}
                                        </h5>
                                    </Grid>
                                    <Button
                                        type={'link'}
                                        placeholder={'-'}
                                        classname={'primary'}
                                        action={onPresentWithdraw}
                                    />
                                    <Button
                                        type={'link'}
                                        placeholder={'+'}
                                        classname={'primary'}
                                        action={() => (bank.closedForStaking ? null : onPresentDeposit())}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>


                <div className={styles.bottom}>
                    <p className={styles.locked}>Total Value Locked:</p>
                    <h5 className={styles.total}>${statsOnPool?.TVL}</h5>
                </div>
            </div>
        </div>
    );
}

export default Card;
