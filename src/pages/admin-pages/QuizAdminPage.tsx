import { useScreenSize } from "@core/hooks";
import { useQuizAdminStore } from "@admin/hooks";

import { Empty, Header } from "@core/components";
import { QuizList } from "@admin/components";

import LogoTap from "/Icon.webp";

import { TitleContainer } from "@core/styles/GlobalStyles.style";

const QuizAdminPage = (): JSX.Element => {
  const size = useScreenSize();

  const { quizzes } = useQuizAdminStore();

  return (
    <>
      <Header
        style={{
          height: { sm: 140, md: 150, lg: 150 },
          direction: { sm: "column", md: "column", lg: "column" },
        }}
      >
        {size === "tablet" || size === "desktop" ? (
          <TitleContainer style={{ flexDirection: "row" }}>
            <img loading="lazy" alt="Logo" src={LogoTap} />
            <h1>Quizes</h1>
          </TitleContainer>
        ) : (
          <img loading="lazy" alt="Logo" src={LogoTap} />
        )}
      </Header>
      <QuizList>
        {quizzes.length === 0 ? (
          <Empty />
        ) : (
          quizzes.map((quiz) => <QuizList.Quiz key={quiz.id} quiz={quiz} />)
        )}
      </QuizList>
    </>
  );
};

export default QuizAdminPage;
