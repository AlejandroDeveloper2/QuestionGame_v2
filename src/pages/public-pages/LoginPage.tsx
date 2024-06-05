import { useLoaderBar } from "@core/hooks";

import { LoaderBar, LoadingWindow, Logo } from "@core/components";
import { LoginForm } from "@auth/components";
import { IconIllustration1, IconIllustration2 } from "@assets/svg";

import { PageContainer } from "@core/styles/GlobalStyles.style";

const LoginPage = (): JSX.Element => {
  const { isScreenLoading, load } = useLoaderBar();
  return (
    <>
      <LoadingWindow
        opacity={!isScreenLoading ? 0 : 1}
        isLoading={isScreenLoading}
      >
        <LoaderBar load={load} />
      </LoadingWindow>
      <PageContainer>
        <IconIllustration1 />
        <IconIllustration2 />
        <Logo
          width={{ sm: 200, md: 300, lg: 350 }}
          height={{ sm: 200, md: 300, lg: 350 }}
        />
        <LoginForm />
      </PageContainer>
    </>
  );
};

export default LoginPage;
