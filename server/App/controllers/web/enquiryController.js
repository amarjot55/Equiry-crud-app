const EnquiryModel = require("../../models/enquiry.model");


let enquiryInsert = (req, res) => {
   let{ name,email,phone,message } = req.body;
      let enquiry = new EnquiryModel({
          name: name,
          email: email,
            phone: phone,
            message: message
    });
    enquiry.save().then(() => {
        res.send({
            status: 1,
            message: "Enquiry submitted successfully"
        });
    }).catch((err) => {
        res.send({  
            status: 0,
            message: "Error submitting enquiry",
            error: err.message
        });
    });
};

let enquiryList = async(req, res) => {
   let enquiry =await EnquiryModel.find();
   res.send({
       status: 1,
       enquiryList : enquiry
    });
};

let enquiryDelete = async (req, res) => {
    let enId = req.params.id;
    let enquiry = await EnquiryModel.deleteOne({_id: enId});
    res.send({
        status: 1,
        message: "Enquiry deleted successfully",enquiry
    });
};

let enquirySingleRow = async (req, res) => {
    let enId = req.params.id;
    let enquiry = await EnquiryModel.findById(enId);
    res.send({status:1,
        enquiry})}


let enquiryUpdate = async (req, res) => {
    let enId = req.params.id;
    let {name,email,phone,message} = req.body;
    let updateObj = {
        name,
        email,
        phone,
        message
        };
    let updateRes = await EnquiryModel.updateOne({_id: enId}, updateObj);
    res.send({status:1,message:"updated successfully", updateRes});
}
    

module.exports = {enquiryInsert, enquiryList, enquiryDelete,enquirySingleRow,enquiryUpdate};