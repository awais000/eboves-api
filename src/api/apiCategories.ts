import express from "express";
import {
  getAllCategories,
  create,
  update,
  getSubCategories,
  getNestedCategories,
  getCategory,
  toggleActiveStatus,
  bulkDelete,
} from "../controllers/controllerCategories";
const app = express();

app.post("/", create);

app.get("/", getAllCategories);
app.get("/nested", getNestedCategories);
app.get("/:id", getCategory);

app.put("/toggle-active/:id", toggleActiveStatus);
app.put("/:id", update);

app.get("/childs/:categoryId", getSubCategories);
app.delete("/", bulkDelete);
export default app;
