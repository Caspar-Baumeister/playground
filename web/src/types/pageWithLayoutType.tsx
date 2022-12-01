import { NextPage } from "next";
import MainLayout from "../layouts/mainLayout";

type PageWithMainLayoutType = NextPage & { layout: typeof MainLayout };

type PageWithLayoutType = PageWithMainLayoutType; // | otherPageWithLayoutTypes

export default PageWithLayoutType;
