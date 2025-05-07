"use client";
import styles from "./SortControls.module.scss";

type SortControlsProps = {
  sortBy: string;
  setSortBy: (val: string) => void;
  sortOrder: string;
  setSortOrder: (val: string) => void;
};

export default function SortControls({
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}: SortControlsProps) {
  return (
    <div className={styles.sort}>
      <p>Sort By:</p>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="papertitle">Title</option>
        <option value="published_at">Year</option>
        <option value="journalaltimpactfactor">Impact Factor</option>
      </select>
      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}
