import Lead from "./leadModel.js";


// ✅ SUMMARY (Aggregation)
export const getLeadSummary = async () => {
  const result = await Lead.aggregate([
    {
      $group: {
        _id: null,

        total_leads: { $sum: 1 },

        converted: {
          $sum: {
            $cond: [{ $eq: ["$status", "Converted"] }, 1, 0],
          },
        },

        pending: {
          $sum: {
            $cond: [{ $eq: ["$status", "Pending"] }, 1, 0],
          },
        },

        follow_up: {
          $sum: {
            $cond: [{ $eq: ["$status", "Follow-Up"] }, 1, 0],
          },
        },
      },
    },
  ]);

  return result[0] || {
    total_leads: 0,
    converted: 0,
    pending: 0,
    follow_up: 0,
  };
};


// ✅ GET ALL LEADS (for reports/export)
export const getAllLeads = async () => {
  return await Lead.find()
    .sort({ createdAt: -1 })
    .select(
      "_id customer_name contact_number status remarks follow_up_date createdAt"
    )
    .lean();
};