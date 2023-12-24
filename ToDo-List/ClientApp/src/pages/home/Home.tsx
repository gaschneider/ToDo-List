import styled from "@emotion/styled";
import styles from "./Home.module.scss";

export const Home = () => {
  return (
    <HomeContainer>
      <div className={styles["App"]}>
        <header className={styles["App-header"]}>
          <a
            className={styles["App-link"]}
            href="https://github.com/gaschneider/ToDo-List"
            target="_blank"
            rel="noopener noreferrer"
          >
            To-Do List App by Gabriel Schneider
          </a>
        </header>
      </div>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  padding: 0px 10px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
