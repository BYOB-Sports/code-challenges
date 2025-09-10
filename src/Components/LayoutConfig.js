import { LoadFadeLayout } from "./LoadFadeLayout";
import {  Outlet, useNavigation } from "react-router-dom";

export const LayoutConfig = () => {

  const {state} = useNavigation()
  return (
    <div className="configContainer h-100 position-relative">
      <LoadFadeLayout
        routerNavState={state}
        headLinks={[
          {
            link: "/",
            title: "Home",
          },
        ]}

      >
        <Outlet />
      </LoadFadeLayout>

    </div>
  );
};
