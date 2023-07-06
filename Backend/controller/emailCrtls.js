const asyncHandler = require("express-async-handler");
const Email= require("../models/EmailModel");

const validateMongoDbId = require("../utils/validateMongodbId");

const createEmail = asyncHandler(async (req, res) => {
  try {
    console.log(req.body)
    const newEmail = await Email.create(req.body);
    res.json(newEmail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const updateEmail = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  console.log(_id)
  console.log(req.body)
  validateMongoDbId(_id);
  try {
    const updatedEmail = await Email.findByIdAndUpdate(_id, req.body.sizeData, {
      new: true,
    });
    if (updatedEmail) {
      res.json(updatedEmail);
    } else {
      res.status(404).json({ message: "Email not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const deleteEmail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedEmail = await Email.findByIdAndDelete(id);
    if (deletedEmail) {
      res.json(deletedEmail);
    } else {
      res.status(404).json({ message: "Email not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getEmailById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

console.log(id)
  try {
    const email = await Email.findOne({_id:id});
    if (email) {
      res.json(email);
    } else {
      res.status(404).json({ message: "Email not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getAllEmails = asyncHandler(async (req, res) => {
  try {
    const Emails = await Email.find();
    res.json(Emails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


const Bulk_EMAILS=asyncHandler(async(req,res)=>{
const mail=await Email.findById(req.body.id)
  try{
for(let i=0;i<req?.body?.emails.length;i++){

  let data={
    to:req?.body?.emails[i],
    sunject:mail.subject,
    text:'Deepnap Softech ',
    html:mail.message,

}   
await sendEmail(data);
res.json(token)
}


}catch(err){

  }

})


module.exports = {
  createEmail,
  updateEmail,
  deleteEmail,
  getEmailById,
  getAllEmails,
  Bulk_EMAILS
};