import Instructor from '../models/InstructorModel.js';
import Donator from '../models/PaymentModel.js';
import Event from '../models/EventModel.js';

export const getDashboardSummary = async (req, res) => {
  try {
    // Run all database count queries concurrently
    const [totalInstructors, totalDonators, totalEvents] = await Promise.all([
      Instructor.countDocuments(),
      Donator.countDocuments(),
      Event.countDocuments(),
    ]);

    return res.status(200).json({
      totalInstructors,
      totalDonators,
      totalEvents,
      totalSiteVisits: 1420 // Hardcoded or pulled from an Analytics model
    });

  } catch (error) {
    console.error("Dashboard summary error:", error);
    return res.status(500).json({ error: "Failed to load dashboard summary" });
  }
};