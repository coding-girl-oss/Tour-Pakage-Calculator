const express = require("express");
const Agent = require("../models/agentModel");
const router = express.Router();
const verifyauth = require("../middleware/user");

// Route to add agent
router.post("/add-agent", verifyauth, async (req, res) => {
  const { name, email, phone,company, address, isActive } = req.body;

  if (!name || !email || !phone || !address ||!company) {
    return res.status(401).send("Missing required fields!");
  }

  try {
    const agentExists = await Agent.findOne({ email });
    if (agentExists) {
      return res
        .status(400)
        .json({ error: "Agent with this email already exists!" });
    }
    await Agent.create({
      name,
      email,
      phone,
      address,
      company,
      userId: req.user.id,
      isActive,
    });
    res.status(201).json('Added successfully!');
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
});

// Route to fetch all agents of a company
router.get('/fetch-agents', verifyauth, async (req, res) => {
  try {
    const id = req.user.id; 
    const agents = await Agent.find({ userId: id });

    res.status(200).json({ agents });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
});

// Route to delete agent
router.delete('/delete-agent/:id', verifyauth, async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);

    if (!agent) {
      return res.status(404).json({ message: 'Agent not found!' });
    }

    if (req.user.id !== agent.userId.toString()) {
      return res.status(403).json({ message: "Not allowed!" });
    }

    await Agent.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "Agent deleted successfully!" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
});

// Route to edit agent
router.put('/update-agent/:id', verifyauth, async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);

    if (!agent) {
      return res.status(404).json({ message: 'Agent not found!' });
    }

    if (req.user.id !== agent.userId.toString()) {
      return res.status(403).json({ message: "Not allowed!" });
    }

    const updatedAgent = await Agent.findByIdAndUpdate(req.params.id, req.body, { new: true });

    return res.status(200).json({ message: "Agent updated successfully!", updatedAgent });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
});

module.exports = router;
