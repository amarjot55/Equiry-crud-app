import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { ToastContainer,toast } from 'react-toastify';
import axios from "axios";
import Swal from 'sweetalert2';

export function EnquiryLists({data, getAllEnquiries, Swal,setFormData}) {

  let deleteRow = (delId) => {
    Swal.fire({
      title : "do you want to delete this enquiry ?",
      showCancelButton: true,
      showdenyButton: true,
      confirmButtonText: 'Yes',
      
    }).then((result) => {
      if (result.isConfirmed) {

         axios.delete(`http://localhost:8040/api/website/enquiries/delete/${delId}`)
      .then((response) => {
        toast.success("Enquiry deleted successfully");
      getAllEnquiries(); // Refresh the list after deletion 
      })

        Swal.fire("saved !","","success")
      }else if (result.isDinied) {
        Swal.fire("changes not saved !","","info")
      }
    })

      } 
      let editRow = (editId) => {   
        axios.get(`http://localhost:8040/api/website/enquiries/single/${editId}`)    
        .then((response) => {
          let data = response.data;
          setFormData(data.enquiry)
        })}

  return (
     <div className='bg-amber-50 '>
     
             <h2 className='text-[20px] mx-5 font-bold'>Enquiry List</h2>
                <div className="overflow-x-auto p-4">
      <Table>
  <TableHead>
    <TableRow>
      <TableHeadCell>Sr no.</TableHeadCell>
      <TableHeadCell>Name</TableHeadCell>
      <TableHeadCell>E-mail</TableHeadCell>
      <TableHeadCell>Phone</TableHeadCell>
      <TableHeadCell>Message</TableHeadCell>
      <TableHeadCell>Delete</TableHeadCell>
      <TableHeadCell>Edit</TableHeadCell>
      <TableHeadCell>
        <span className="sr-only">Edit</span>
      </TableHeadCell>
    </TableRow>
  </TableHead>
  <TableBody className="divide-y">
    {
      data.length >= 1 ? data.map((item, index) => (
        <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <TableCell>{index + 1}</TableCell>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.email}</TableCell>
          <TableCell>{item.phone}</TableCell>
          <TableCell>{item.message}</TableCell>
          <TableCell>
            <button onClick={()=>deleteRow(item._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
          </TableCell>
          <TableCell>
            <button onClick={()=>editRow(item._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
          </TableCell>
        </TableRow>
      )) : (
        <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <TableCell colSpan={7} className="text-center text-gray-500">
            No data found
          </TableCell>
        </TableRow>
      )
    }
  </TableBody>
</Table>
    </div>
        </div>
  )
}

export default EnquiryLists;
