import React, { useState,useEffect } from 'react'
import { EnquiryLists } from './Enquiry/EnquiryLists';
import Swal, { swal } from 'sweetalert2/dist/sweetalert2.js'
import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader, TextInput , Textarea } from "flowbite-react";
 import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

export default function Enquiry() {

  let[enquiryList, setEnquiryList] = useState([]);
  let[formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    _id:""
  });

  let saveEnquiry = (e) => {
  
    e.preventDefault();

//   let formData = {
//   name: e.target.elements.name.value,
//   email: e.target.elements.email.value,
//   phone: e.target.elements.phone.value,
//   message: e.target.elements.message.value
// }

//if form has id then update else insert
if(formData._id){
//update
axios.put(`http://localhost:8040/api/website/enquiries/update/${formData._id}`,formData)
.then((response) => {
  
  toast.success('Enquiry updated successfully');
  setFormData({name:"",email:"",phone:"",message:"",_id:""});
  
 
   getAllEnquiries();
    });
}else {
  //insert
   axios.post('http://localhost:8040/api/website/enquiries/insert', formData)
      .then((response) => {
        console.log(response.data);
        toast.success("Enquiry saved successfully");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: ""
        });
        getAllEnquiries(); // Refresh the list after saving
      })
}
   
     
   }
  let getAllEnquiries = () => {
    axios.get('http://localhost:8040/api/website/enquiries/view')
    .then((response) => {
      return response.data;
    })
    .then((finalData) => {
  console.log(finalData); // See what is returned
  if (finalData.status) {
    setEnquiryList(finalData.enquiryList);
  }
})
    }


  let getValue = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;

      let oldData = {...formData};//cello copy

    oldData[inputName] = inputValue;
    setFormData(oldData);
  }

  useEffect(() => {
    getAllEnquiries();
  }, []);
  return (

    <div className=' items-center  bg-amber-200'>
      <ToastContainer />
      <h1 className=' text-amber-900 text-3xl text-center p-3 font-bold '>USER ENQUIRY</h1>
      <div className='grid grid-cols-[30%_auto] gap-4'>
        <div className='bg-amber-100'>
            <h2 className='text-[20px] mx-5 font-bold'>Enquiry Form</h2>
            <form onSubmit={saveEnquiry} action='' className='mx-5'>
                <div className='py-3'>
              <Label htmlFor="name" value=" Your Name" >Your Name</Label>
              <TextInput id="name" value={formData.name} onChange={getValue} name='name' type="text"placeholder="Enter your name"required={true} className="mt-1"
              />
              </div>
               <div className='py-3'>
              <Label htmlFor="e-mail" value=" Your E-mail">E-mail</Label>
              <TextInput id="E-mail" value={formData.email} onChange={getValue} name='email' type="email"placeholder="Enter your E-mail"required={true} className="mt-1"
              />
              </div>
               <div className='py-3'>
              <Label htmlFor="Phone" value=" Your Phone NUmber"> Phone NUmber</Label>
              <TextInput id=" Phone NUmber" value={formData.phone} onChange={getValue} name='phone' type=" Phone NUmber"placeholder="Enter your  Phone NUmber"required={true} className="mt-1"
              />
              </div>
              
      <div className=" py-3">
        <Label htmlFor="message">Your message</Label>
      <Textarea id="message" value={formData.message} onChange={getValue} name='message' placeholder="Leave a comment..." required rows={4} />
    </div>
    <div className='py-3 flex items-center gap-2'>
       <Button type="submit" id='button'className=' w-[100%]'>
        {formData._id ? "update": "Save"}
       </Button>
    </div>
              
              
            </form>
          
        </div>
       <EnquiryLists data ={enquiryList} getAllEnquiries={getAllEnquiries} Swal={Swal} setFormData={setFormData}/>
      </div>
    </div>
  )
}
