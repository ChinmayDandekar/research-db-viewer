"use client";

import { useEffect, useRef, useState } from "react";
import PaperCard from "./PaperCard";
import styles from "./PaperList.module.scss";
import { Paper } from "@/types/paper";
import { BASE_API_URL } from "@/lib/constants";
import SearchBar from "./SearchBar";
import SortControls from "./SortControls";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

function SkeletonCard() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeleton__image}></div>
      <div className={styles.skeleton__content}>
        <div className={styles.skeleton__title}></div>
        <div className={styles.skeleton__text}></div>
        <div className={styles.skeleton__text}></div>
        <div className={styles.skeleton__text}></div>
      </div>
    </div>
  );
}

export default function PaperList() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter and Sorting
  const [query, setQuery] = useState("");
  const [searchField, setSearchField] = useState("papertitle");
  const [sortBy, setSortBy] = useState("papertitle");
  const [sortOrder, setSortOrder] = useState("asc");

  // Pagination
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10;

  // Caching
  const cache = useRef(new Map());

  // Debounce
  const debouncedQuery = useDebouncedValue(query, 400);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      try {
        const queryParam = debouncedQuery
          ? `&${searchField}_contains=${encodeURIComponent(debouncedQuery)}`
          : "";
        const start = (page - 1) * pageSize;
        const url = `${BASE_API_URL}/acceptedpapers?_sort=${sortBy}:${sortOrder}${queryParam}&_limit=${pageSize}&_start=${start}`;
        const cacheKey = `${debouncedQuery}_${searchField}_${sortBy}_${sortOrder}_${page}`;
        // console.log("Current CacheKey: ", cacheKey);
        if (cache.current.has(cacheKey)) {
          //   console.log("Cache Trigger: " + cacheKey);
          const cached = cache.current.get(cacheKey);
          setPapers(cached.data);
          setTotal(cached.total);
          setLoading(false);
          return;
        }

        const res = await fetch(url, { signal: controller.signal });
        const data = await res.json();
        setPapers(data);

        // Fetching total count - NOTE: I wanted to use count api provide in strapi, but was getting Forbidden response, hence using this workaround - could be easily changed if count route is allowed from strapi
        const countUrl = `${BASE_API_URL}/acceptedpapers?_sort=${sortBy}:${sortOrder}${queryParam}`;
        const countRes = await fetch(countUrl);
        const count = (await countRes.json()).length;
        setTotal(count);
        cache.current.set(cacheKey, { data, total: count });
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError")
          console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [debouncedQuery, sortBy, sortOrder, searchField, page, papers.length]);

  //   const totalPages = Math.ceil(total / pageSize);

  return (
    <div>
      <SearchBar
        value={query}
        onChange={(val) => {
          setPage(1);
          setQuery(val);
        }}
        searchField={searchField}
        onFieldChange={setSearchField}
      />
      <SortControls
        sortBy={sortBy}
        setSortBy={(val) => {
          setPage(1);
          setSortBy(val);
        }}
        sortOrder={sortOrder}
        setSortOrder={(val) => {
          setPage(1);
          setSortOrder(val);
        }}
      />
      <div className={styles.grid}>
        {loading
          ? Array.from({ length: pageSize }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          : papers.map((paper) => (
              <PaperCard key={paper.id} paper={paper} variant="split-meta" /> // other variants - "vertical" | "horizontal"
            ))}

        {papers.length == 0 && !loading && <div>No Data Found</div>}
      </div>
      <div className={styles.pagination}>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {Math.ceil(total / pageSize)}
        </span>
        <button
          onClick={() =>
            setPage((p) => Math.min(p + 1, Math.ceil(total / pageSize)))
          }
          disabled={page === Math.ceil(total / pageSize)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
