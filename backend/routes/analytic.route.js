import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import {
  getDailySalesData,
  getAnalyticsData,
} from "../controllers/analytic.controller.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, async (req, res) => {
  try {
    const analitycsData = await getAnalyticsData();

    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    const dailySalesData = await getDailySalesData(startDate, endDate);

    res.status(200).json({
      analitycsData,
      dailySalesData,
    });
  } catch (error) {
    console.log("Error in AnalyticsData controller", error.message);
    res
      .status(500)
      .json({ message: "Error in Analysing data ", error: error.message });
  }
});

export default router;
