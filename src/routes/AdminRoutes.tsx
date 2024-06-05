import { Route, Routes } from "react-router-dom";

import {
  HomePage,
  CategoriesPage,
  QuizAdminControlsPage,
  QuizAdminPage,
} from "@pages/index";
import { AdminLayout } from "@layout/index";

const AdminRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/admin/categories" element={<CategoriesPage />} />
        <Route path="/admin/quiz" element={<QuizAdminPage />} />
        <Route path="/admin/quiz/:quizId" element={<QuizAdminControlsPage />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
