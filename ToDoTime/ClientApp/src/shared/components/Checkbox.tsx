import styles from "./styles/Checkbox.module.scss";

type CheckboxProps = {
  id: string;
  label: string;
  checked: boolean;
  onToggle: () => void;
};

export const Checkbox: React.FC<CheckboxProps> = ({ id, label, checked, onToggle }) => {
  return (
    <div className={styles.checkbox}>
      <input type="checkbox" id={id} name="check" checked={checked} onClick={onToggle} />
      <label htmlFor={id}>
        <span></span>
        <span className={styles.name}>{label}</span>
      </label>
    </div>
  );
};
