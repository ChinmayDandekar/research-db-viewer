import { BASE_API_URL } from "@/lib/constants";
import styles from "./PaperDetail.module.scss";
import Link from "next/link";
import Image from "next/image";
import { getImageLink } from "@/lib/utils";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";

const PaperDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const res = await fetch(`${BASE_API_URL}/acceptedpapers/${id}`, {
    cache: "no-store",
  });
  const paper = await res.json();

  const journalImage = getImageLink(paper.journal?.journalimage?.url);
  const publisherImage = getImageLink(paper.publisher?.logo?.url);

  const impact = paper.journal?.impactfactor || paper.journalaltimpactfactor;

  return (
    <MaxWidthWrapper>
      <div className={styles.detailPage}>
        <Link href="/" className={styles.backLink}>
          &larr; Back to list
        </Link>

        <div className={styles.headerSection}>
          <div className={styles.headerImageWrapper}>
            {paper.journal?.journalimage?.url && (
              <Image
                width={400}
                height={400}
                src={journalImage}
                alt={paper.journal.name}
                className={styles.headerImage}
              />
            )}
          </div>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>{paper.papertitle}</h1>
            <div className={styles.badges}>
              <span className={styles.badge}>{paper.assignmentno}</span>
              {paper.servicetype?.servicename && (
                <span className={styles.badge}>
                  {paper.servicetype.servicename}
                </span>
              )}
            </div>
            <p>
              <strong>Authors:</strong> {paper.coauthors}
            </p>
          </div>
        </div>

        <hr className={styles.sectionDivider} />

        <div className={styles.detailSection}>
          <h2>Journal Details</h2>
          <p>
            <strong>Journal:</strong> {paper.journal?.title}
          </p>
          <p>
            <strong>Impact Factor:</strong>{" "}
            <span
              className={
                impact >= 5
                  ? styles.impactHigh
                  : impact >= 2
                  ? styles.impactMedium
                  : styles.impactLow
              }
            >
              {impact}
            </span>
          </p>

          <p>
            <strong>Year:</strong> {paper.published_at?.split("-")[0]}
          </p>
          <p style={{ lineClamp: 1 }}>
            <strong>DOI:</strong>{" "}
            <a
              className={styles.link}
              href={paper.articlelink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {paper.articlelink}
            </a>
          </p>
          <hr className={styles.sectionDivider} />

          <h2>Subject Area</h2>
          <p>
            <strong>Subject Area:</strong> {paper.salevelone?.name} /{" "}
            {paper.saleveltwo?.name}{" "}
            {paper.salevelthree?.name ? `/ ${paper.salevelthree?.name}` : ""}
          </p>
          <hr className={styles.sectionDivider} />

          <h2>Publisher</h2>
          <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {paper.publisher?.logo?.url && (
              // <div className={styles.publisherLogoWrapper}>
              <Image
                width={100}
                height={100}
                src={publisherImage}
                alt={paper.publisher.publishername}
                className={styles.publisherLogo}
              />
              // </div>
            )}{" "}
            {paper.publisher?.publishername}
          </p>
          <hr className={styles.sectionDivider} />

          <h2>Scope & Service</h2>
          <p>
            <strong>Journal Scope:</strong> {paper.journal?.statementofscope}
          </p>
          <p>
            <strong>Service Type:</strong> {paper.servicetype?.servicename}
          </p>
          <hr className={styles.sectionDivider} />

          <h2>Client Information</h2>
          <p>
            <strong>Client:</strong> {paper.client?.firstname}{" "}
            {paper.client?.lastname}
          </p>
          <p>
            <strong>Organization:</strong> {paper.client?.organization}
          </p>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default PaperDetailPage;
