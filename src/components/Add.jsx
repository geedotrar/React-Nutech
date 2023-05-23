import React, { useState } from "react";

export default function Add(props) {
  const FileType = ["jpg", "png"];
  const [selectedImg, setSelectedImg] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const idUpdate = props.data.length > 0 ? props.data[props.data.length - 1].id + 1 : 1;

  const [barang, setBarang] = useState({
    id: idUpdate,
    Nama: "",
    Beli: 0,
    Jual: 0,
    Stock: 0,
  });

  const changeHandler = (event) => {
    if (!FileType.includes(event.target.files[0].name.split(".").at(-1))) {
      setErrorMessage(`File does not support. Files type must be ${FileType.join(", ")}`);
    } else {
      setSelectedImg(event.target.files[0]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.data.some((item) => item.Nama.toLowerCase() === barang.Nama.toLowerCase())) {
      setErrorMessage("Barang Sudah Ada!!");
    } else if (selectedImg && selectedImg.size > 100000) {
      setErrorMessage("Maksimal Ukuran 100KB!!");
    } else {
      const formData = new FormData();

      formData.append("image", selectedImg);

      fetch("https://api.imgbb.com/1/upload?expiration=600&key=79d4234f006ec78bf10d4057bde0b495", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {
          let data = [
            ...props.data,
            {
              id: idUpdate,
              Nama: barang.Nama,
              Beli: barang.Beli,
              Jual: barang.Jual,
              Stock: barang.Stock,
              image: result.data.display_url,
            },
          ];
          props.setData(data);
          setSelectedImg();
          props.setDisplay(false);
        })
        .catch((error) => {
          setErrorMessage("File Error");
        });
    }
  };

  const handleChange = (name) => (event) => {
    setBarang({ ...barang, [name]: event.target.value });
  };

  const removeSelectedImage = () => {
    setSelectedImg();
  };

  return (
    <>
      <div class="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div class="relative w-auto my-6 mx-auto max-w-3xl w-full">
          {/*content*/}
          <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div class="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 class="text-3xl font-semibold">Add Data Barang</h3>
            </div>
            {/*body*/}
            <div>
              <div>
                <div class="flex items-center justify-center p-12">
                  <div>
                    <div>
                      <span className={errorMessage.length === 0 ? "" : "px-1 py-3 text-white bg-red-600 rounded-md"}>{errorMessage.length === 0 ? null : errorMessage}</span>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div class="mb-5">
                        <label for="name" class="mb-3 block text-base font-medium text-[#07074D]">
                          Nama Barang
                        </label>
                        <input
                          onChange={handleChange("Nama")}
                          type="text"
                          placeholder="Masukkan Nama Barang"
                          required
                          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                      </div>
                      <div class="mb-5">
                        <label for="name" class="mb-3 block text-base font-medium text-[#07074D]">
                          Harga Beli
                        </label>
                        <input
                          onChange={handleChange("Beli")}
                          type="number"
                          name="name"
                          placeholder="0"
                          required
                          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                      </div>
                      <div class="mb-5">
                        <label for="name" class="mb-3 block text-base font-medium text-[#07074D]">
                          Harga Jual
                        </label>
                        <input
                          onChange={handleChange("Jual")}
                          type="number"
                          name="name"
                          placeholder="0"
                          required
                          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                      </div>
                      <div class="mb-5">
                        <label for="name" class="mb-3 block text-base font-medium text-[#07074D]">
                          Stock
                        </label>
                        <input
                          onChange={handleChange("Stock")}
                          type="number"
                          name="0"
                          placeholder="0"
                          required
                          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                      </div>
                      <div class="mb-5">
                        <label for="name" class="mb-3 block text-base font-medium text-[#07074D]">
                          Image
                        </label>
                        <input type="file" name="file" onChange={changeHandler} accept=".png, .jpg," required />
                      </div>
                      {selectedImg && (
                        <div>
                          <div>
                            <img src={URL.createObjectURL(selectedImg)} alt="Thumb" width={200} />
                          </div>

                          <button class="px-1 py-1 text-white bg-yellow-600 rounded-sm" onClick={removeSelectedImage}>
                            Remove This Image
                          </button>
                        </div>
                      )}
                      <div>
                        <button class="px-1 py-3 text-white bg-green-600 rounded-md mr-2">Submit</button>
                        <button onClick={() => props.setDisplay(false)} class="mt-4 px-1 py-3 text-white bg-red-600 rounded-md">
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
