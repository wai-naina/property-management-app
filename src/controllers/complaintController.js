const Complaint = require("../models/Complaint");

// Get all complaints
const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Create a new complaint
const createComplaint = async (req, res) => {
  const { unitId, description } = req.body;
  try {
    const complaint = new Complaint({
      unitId,
      tenantId: req.user.id, // Associate the complaint with the logged-in tenant
      description,
    });
    await complaint.save();
    res.status(201).json(complaint);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update a complaint (e.g., change status)
const updateComplaint = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.status(200).json(complaint);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getComplaints, createComplaint, updateComplaint };