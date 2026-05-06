import { processFileAndSave, getLeadsService,} from "../services/uploadService.js"; 

export const uploadLeads = async (req, res) => {
  try {
    const file = req.file;
    const { agent_name } = req.body;

    if (!file || !agent_name) {
      return res.status(400).json({
        success: false,
        message: "file and agent_name required",
      });
    }

    const count = await processFileAndSave(
      file.path,
      file.mimetype,
      agent_name  
    );

    res.status(200).json({
      success: true,
      message: "Leads uploaded successfully",
      count,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getLeads = async (req, res) => {
  try {
    const result = await getLeadsService(req.query);

    res.json({
      success: true,
      ...result,
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
};
