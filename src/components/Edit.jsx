// import React, { useState } from "react";

// export default function Edit(props) {
//   const allowedFileTypes = ["jpg", "png"];
//   const [showModal, setShowModal] = useState(false);
//   const [selectedFile, setSelectedFile] = useState();
//   const [errorMessage, setErrorMessage] = useState("");
//   const [barang, setBarang] = useState();

//   const changeHandler = (event) => {
//     if (!allowedFileTypes.includes(event.target.files[0].name.split(".").at(-1))) {
//       setErrorMessage(`File does not support. Files type must be ${allowedFileTypes.join(", ")}`);
//     } else {
//       setSelectedFile(event.target.files[0]);
//     }
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (barang.nama.toLowerCase() !== props.nama.toLowerCase() && props.data.some((item) => item.nama.toLowerCase() === barang.nama.toLowerCase())) {
//       setErrorMessage("Nama Telah Terpakai");
//     } else if (selectedFile && selectedFile.size > 100000) {
//       setErrorMessage("Ukuran file maskimal 100KB");
//     } else {
//       if (selectedFile) {
//         const formData = new FormData();

//         formData.append("image", selectedFile);

//         fetch("https://api.imgbb.com/1/upload?expiration=600&key=79d4234f006ec78bf10d4057bde0b495", {
//           method: "POST",
//           body: formData,
//         })
//           .then((response) => response.json())
//           .then((result) => {
//             props.setData(
//               props.data.map((item) => {
//                 if (item.nama === props.nama) {
//                   return {
//                     ...item,
//                     nama: barang.nama,
//                     hargaBeli: barang.hargaBeli,
//                     hargaJual: barang.hargaJual,
//                     stok: barang.stok,
//                     image: result.data.display_url,
//                   };
//                 }
//                 return item;
//               })
//             );
//             setShowModal(false);
//           })
//           .catch((error) => {
//             setErrorMessage("File Error");
//           });
//       } else {
//         props.setData(
//           props.data.map((item) => {
//             if (item.nama === props.nama) {
//               return {
//                 ...item,
//                 nama: barang.nama,
//                 hargaBeli: barang.hargaBeli,
//                 hargaJual: barang.hargaJual,
//                 stok: barang.stok,
//               };
//             }
//             return item;
//           })
//         );

//         setShowModal(false);
//       }
//     }
//   };

//   const handleChange = (name) => (event) => {
//     setBarang({ ...barang, [name]: event.target.value });
//   };

//   const removeSelectedImage = () => {
//     setSelectedFile();
//   };

//   const openModal = () => {
//     setBarang(props.store);
//     setShowModal(true);
//   };
//   const closeModal = () => {
//     setSelectedFile();
//     setShowModal(false);
//   };

//   return (
//     <>
//       <button class="flex px-1 py-3 text-white bg-yellow-600 rounded-md" type="button" onClick={openModal}>
//         Edit
//       </button>
//       {showModal ? (
//         <>
//           <div class="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
//             <div class="relative w-auto my-6 mx-auto max-w-3xl w-full">
//               {/*content*/}
//               <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
//                 {/*header*/}
//                 <div class="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
//                   <h3 class="text-3xl font-semibold">Edit Data Barang</h3>
//                 </div>
//                 {/*body*/}
//                 <div>
//                   <div>
//                     <div class="flex items-center justify-center p-12">
//                       <div>
//                         <div>
//                           <span className={errorMessage.length === 0 ? "" : "px-1 py-3 text-white bg-red-600 rounded-md"}>{errorMessage.length === 0 ? null : errorMessage}</span>
//                         </div>
//                         <form onSubmit={handleSubmit}>
//                           <div class="mb-5">
//                             <label for="name" class="mb-3 block text-base font-medium text-[#07074D]">
//                               Nama Barang
//                             </label>
//                             <input
//                               onChange={handleChange("Nama")}
//                               type="text"
//                               defaultValue={props.nama}
//                               class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
//                             />
//                           </div>
//                           <div class="mb-5">
//                             <label for="name" class="mb-3 block text-base font-medium text-[#07074D]">
//                               Harga Beli
//                             </label>
//                             <input
//                               onChange={handleChange("Beli")}
//                               type="number"
//                               name="name"
//                               defaultValue={props.hargaBeli}
//                               class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
//                             />
//                           </div>
//                           <div class="mb-5">
//                             <label for="name" class="mb-3 block text-base font-medium text-[#07074D]">
//                               Harga Jual
//                             </label>
//                             <input
//                               onChange={handleChange("Jual")}
//                               type="number"
//                               name="name"
//                               defaultValue={props.hargaJual}
//                               class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
//                             />
//                           </div>
//                           <div class="mb-5">
//                             <label for="name" class="mb-3 block text-base font-medium text-[#07074D]">
//                               Stock
//                             </label>
//                             <input
//                               onChange={handleChange("Stock")}
//                               type="number"
//                               name="0"
//                               defaultValue={props.stock}
//                               class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
//                             />
//                           </div>
//                           <div>
//                             <input type="file" name="file" onChange={changeHandler} accept=".png, .jpg," />
//                             {selectedFile && (
//                               <div className="preview-image">
//                                 <div>
//                                   <img src={URL.createObjectURL(selectedFile)} alt="Thumb" width={200} />
//                                 </div>

//                                 <span className="remove" onClick={removeSelectedImage}>
//                                   Remove This Image
//                                 </span>
//                               </div>
//                             )}
//                           </div>
//                           <div>
//                             <button class="px-1 py-3 text-white bg-green-600 rounded-md mr-2">Submit</button>
//                             <button onClick={closeModal} class="mt-4 px-1 py-3 text-white bg-red-600 rounded-md">
//                               Cancel
//                             </button>
//                           </div>
//                         </form>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       ) : null}
//     </>
//   );
// }
