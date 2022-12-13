import { NextPage } from "next";
import HomeLayout from "../../../web/src/layouts/mainLayout";

type PageWithMainLayoutType = NextPage & { layout: typeof HomeLayout };

type PageWithLayoutType = PageWithMainLayoutType; // | otherPageWithLayoutTypes

export default PageWithLayoutType;
