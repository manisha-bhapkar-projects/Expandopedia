import { useEffect, useRef, useState } from "react"
import styles from "./index.module.scss"

export default function Checkbox(props) {
    const { children, checked, className } = props

    const [isChecked, setIsChecked] = useState(false)
    const checkbox = useRef(null)

    useEffect(() => {
        console.log("checked", checked)
        if (checked === -1) {
            setIsChecked(false)
            checkbox.current.indeterminate = true
        }
        else {
            checkbox.current.indeterminate = false
            setIsChecked(checked)
        }

    }, [checked])

    const onChange = (event) => {
        console.log("check", event.target.checked)
        if (props.onChange) {
            props.onChange(event)
        }
        if (checked === undefined) {
            setIsChecked(event.target.checked)
        }
        else {
            if (checked === -1) {
                setIsChecked(false)
                checkbox.current.indeterminate = true
            }
            else {
                checkbox.current.indeterminate = false
                setIsChecked(checked)
            }
        }
    }

    return (
        <label onClick={event => event.stopPropagation()} className={`${styles.container} ${props.type === "secondary" ? styles.secondary : props.type === "tertiary" ? styles.thrid_cb : ""}`} data-test='label'>
            {props.children ?
                <span className={styles.label}>
                    {children}
                </span>
                : null
            }
            <input
                type="checkbox" ref={checkbox}
                checked={isChecked}
                onChange={onChange}
            />
            <span className={`${styles.checkmark} ${className}`}></span>
        </label>
    )
}