"use client";
import styles from "./SearchBar.module.scss";

type Props = {
  value: string;
  onChange: (val: string) => void;
  searchField: string;
  onFieldChange: (val: string) => void;
};

export default function SearchBar({ value, onChange, searchField, onFieldChange }: Props) {
  return (
    <div className={styles.search}>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={`Search by ${searchField === "papertitle" ? "Title" : searchField === "coauthors" ? "Author" : "Journal"}...`}
      />
      <select
        className={styles.select}
        value={searchField}
        onChange={e => onFieldChange(e.target.value)}
      >
        <option value="papertitle">Title</option>
        <option value="coauthors">Author</option>
        <option value="journal.title">Journal</option>
      </select>
    </div>
  );
}
