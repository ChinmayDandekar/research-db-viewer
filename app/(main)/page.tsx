import PaperList from "@/components/ui/PaperList";
import styles from "./page.module.scss";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";

export default function Home() {
  return (
    <main className={styles.page}>
      <MaxWidthWrapper>
        <h1 className="">Research Papers</h1>
        <PaperList />
      </MaxWidthWrapper>
    </main>
  );
}
