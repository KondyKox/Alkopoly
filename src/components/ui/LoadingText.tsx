import styles from "../../styles/ui/Loading.module.css";

const LoadingText = () => {
  return (
    <div>
      {"...".split("").map((letter, i) => (
        <span
          key={i}
          className={styles.loading_text}
          style={{ animationDelay: `${i * 0.5}s` }}
        >
          {letter}
        </span>
      ))}
    </div>
  );
};

export default LoadingText;
