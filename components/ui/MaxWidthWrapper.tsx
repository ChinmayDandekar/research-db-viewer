import styles from "./MaxWidthWrapper.module.scss";

export default function MaxWidthWrapper({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      {children}
    </div>
  );
}