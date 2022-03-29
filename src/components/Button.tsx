import React, { FC } from 'react'
import './Button.scss';

interface ButtonProps {
    text: String
    clicked? (): void
}

const Button: FC<ButtonProps> = ({
    text,
    clicked
}) => {
    return (
        <button onClick={clicked}>{ text }</button>
    )
}

export default Button