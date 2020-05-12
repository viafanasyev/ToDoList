import React from "react";
import classnames from "classnames/bind";
import styles from "./TextInputs.module.scss";

const cx = classnames.bind(styles);

export const TextInputComponent = ({ value, placeholder, onChange, withError, errorMessage }) => {
    return (
        <div>
            <input className={cx("text-input", {[`text-input-with-error`]: withError})} type="text" value={value} onChange={onChange} placeholder={placeholder}/>
            <div className={cx("input-error")}>{errorMessage}</div>
        </div>
    );
};

export const BigTextInputComponent = ({ value, placeholder, onChange, withError, errorMessage }) => {
    return (
        <div>
            <textarea className={cx("text-input", "text-input-big", {[`text-input-with-error`]: withError})} value={value} onChange={onChange} placeholder={placeholder}/>
            <div className={cx("input-error")}>{errorMessage}</div>
        </div>
    );
};