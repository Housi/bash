import * as React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { UserProvider } from "data/UserContext.js";
import useCachedResources from "hooks/useCachedResources";
import AppContainer from "screens/AppContainer";
import "utils/firebaseFix.js";

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />

        <ApplicationProvider {...eva} theme={eva.light}>
          <UserProvider>
            <AppContainer />
          </UserProvider>
        </ApplicationProvider>
      </>
    );
  }
}
