import ReactDOM from "react-dom/client";
import RouterProvider from "@/router";
import BaseLayout from "@/layout/Base";

// 初始化请求
import request from "@/request";

request.initRequest({
    timeout: 60000,
    prefix: "/api/v1",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
});

import "@/common/antdConfig";
import "./style/global.css";

ReactDOM.createRoot(document.getElementById("wrap") as HTMLElement).render(
    <BaseLayout>
        <RouterProvider></RouterProvider>
    </BaseLayout>,
);
