// Imports
import { Router } from "express";
import { searchController } from "../Controllers/search.controller.js";

export const searchRouter = Router();

searchRouter.get("/search", searchController);
