const handleTest = (req, res) => {
  try {
    console.log("hit");
    return res.json({ success: true });
  } catch (err) {
    console.log({ err });
  }
};

module.exports = handleTest;
