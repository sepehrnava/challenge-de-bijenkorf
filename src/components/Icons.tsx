import { MouseEventHandler } from "react";
import Image from "next/image";
import { cx } from "../lib/utils";
import styles from "styles/Components.module.scss";

export type IIconNames = "search" | "close";
interface IProps {
  name: IIconNames;
  style?: React.CSSProperties;
  onClick?: MouseEventHandler<HTMLSpanElement> | undefined;
  className?: string;
  width?: number | string;
  height?: number | string;
}

const Index = ({
  style,
  onClick,
  name,
  className = "",
  width = 15,
  height = 15,
}: IProps) => {
  return (
    <div
      style={{ width, height, ...style }}
      className={cx(styles.icon, className)}
      onClick={onClick}
    >
      <Image
        loading="eager"
        src={`/icons/${name}.svg`}
        fill
        alt={name || "icon"}
      />
    </div>
  );
};

export default Index;
