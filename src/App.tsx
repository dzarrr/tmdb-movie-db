import { Routes, Route } from "react-router";
import { Suspense, lazy } from "react";
import { Skeleton } from "antd";

import AppLayout from "./AppLayout";
import NotFoundResult from "./component/NotFoundResult";
const ListPage = lazy(() => import("./pages/List/ListPage"));
const DetailPage = lazy(() => import("./pages/Detail/DetailPage"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="*" element={<NotFoundResult />} />
        <Route
          index
          element={
            <Suspense fallback={<Skeleton active />}>
              <ListPage />
            </Suspense>
          }
        />
        <Route
          path="/detail/:id"
          element={
            <Suspense fallback={<Skeleton active />}>
              <DetailPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
