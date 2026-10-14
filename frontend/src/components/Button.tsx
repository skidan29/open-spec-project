import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
}

const Button = ({ name, children, type = "button", ...rest }: ButtonProps) => (
    <button type={type} {...rest}>{children}</button>
);

export default Button;