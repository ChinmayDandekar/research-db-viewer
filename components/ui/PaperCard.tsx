import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import styles from "./PaperCard.module.scss";
// import globals from "@/styles/"

import { Paper } from "@/types/paper";
import { getImageLink } from "@/lib/utils";

type Variant = "horizontal" | "split-meta" | "vertical";

interface PaperCardProps {
  paper: Paper;
  variant?: Variant;
  highlighted?: boolean;
}

export default function PaperCard({
  paper,
  variant = "horizontal",
  highlighted = false,
}: PaperCardProps) {
  const journalImage = getImageLink(
    paper.journal?.journalimage?.url,
    "journal"
  );

  const className = clsx(styles.card, styles[`card--${variant}`], {
    [styles["card--highlighted"]]: highlighted,
  });

  return (
    <div className={className}>
      {variant === "split-meta" ? (
        <>
          <div className={styles["card__top"]}>
            <Image
              src={journalImage}
              width={400}
              height={400}
              alt="Journal"
              className={styles.card__media}
            />
            <h2 className={styles.card__title}>{paper.papertitle}</h2>
          </div>
          <div className={styles.card__divider}></div>
          <div className={styles["card__meta"]}>
            <p>
              <strong>Authors:</strong> {paper.coauthors ?? "--"}
            </p>
            <p title={paper.journaldetails}>
              <strong>Journal:</strong> {paper.journal?.title}
            </p>
            <p>
              <strong>Publisher:</strong> {paper.journal?.publishingcompany}
            </p>
            {paper.articlelink && (
              <p>
                <strong>DOI:</strong> {paper.articlelink}
              </p>
            )}

            <p>
              <strong>Year:</strong> {new Date(paper.created_at).getFullYear()}
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "auto",
              }}
            >
              <p className={styles.card__tag}>
                IF {paper.journal?.impactfactor ?? paper.journalaltimpactfactor}
              </p>
              <Link
                className={styles.link}
                href={{ pathname: `/paper/${paper.id}` }}
                scroll={false}
              >
                View Details
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <Image
            src={journalImage}
            width={400}
            height={400}
            alt="Journal"
            className={styles.card__media}
          />
          <div className={styles["card__content"]}>
            <h2 className={styles.card__title}>{paper.papertitle}</h2>
            <div className={styles.card__divider}></div>

            <p>
              <strong>Authors:</strong> {paper.coauthors}
            </p>
            <p>
              <strong>Journal:</strong> {paper.journal?.title}
            </p>
            <p>
              <strong>Year:</strong> {new Date(paper.created_at).getFullYear()}
            </p>
            <p>
              <strong>DOI:</strong> {paper?.articlelink ?? "NA"}
            </p>

            <div
              style={{
                display: "flex",
                gap: "5px",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "auto",
              }}
            >
              <p className={styles.card__tag}>
                IF {paper.journal?.impactfactor ?? paper.journalaltimpactfactor}
              </p>
              <Link
                className={styles.link}
                href={`/paper/${paper.id}`}
                scroll={false}
              >
                View Details
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
