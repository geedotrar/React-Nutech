import React, { useState } from "react";
import Delete from "./Delete";
import listBarang from "../utils/DataBarang";
import Add from "./Add";
import ReactPaginate from "react-paginate";
import Edit from "./Edit";

export default function MainPage() {
  const [barang, setBarang] = useState(listBarang);
  const [search, setSearch] = useState("");
  const [display, setDisplay] = useState(false);
  const [displayEdit, setDisplayEdit] = useState(false);

  const [itemOffset, setItemOffset] = useState(0);

  const StockSearch = barang.map((item) => item.Nama.toLowerCase().indexOf(search.toLowerCase()) > -1 && item);
  const searchFilter = StockSearch.filter((item) => item);

  const endOffset = itemOffset + 3;
  const currentItems = barang.slice(itemOffset, endOffset);
  const itemsSearch = searchFilter.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(barang.length / 3);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 2) % barang.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="m-60">
      {display && <Add setData={setBarang} data={barang} setDisplay={setDisplay} />}
      <div className="mt-20">
        <form className="flex items-center justify-center gap-2">
          <h2>Search</h2>
          <label className="sr-only">Search</label>
          <div className="relative w-1/3">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Stock"
              required
            />
          </div>
        </form>
      </div>

      <button class="px-1 py-3 text-white bg-blue-600 rounded-md" onClick={() => setDisplay(true)}>
        Add Nama
      </button>
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full">
                <thead class="bg-gray-200 border-b">
                  <tr>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                      ID
                    </th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                      Nama Nama
                    </th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                      Harga Beli
                    </th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                      Harga Jual
                    </th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                      Stock
                    </th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                      Foto Barang
                    </th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(barang && itemsSearch).map((brg) => {
                    return (
                      <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{brg.id}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{brg.Nama}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{brg.Beli}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{brg.Jual}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{brg.Stock}</td>
                        <td>
                          <img src={brg.image} alt="" width={125} />
                        </td>
                        <td>
                          <Delete barang={barang} setBarang={setBarang} id={brg.id} />
                        </td>
                        {/* <td>
                          <Edit data={barang} setData={setBarang} store={brg} nama={brg.Nama} hargaBeli={brg.Beli} hargaJual={brg.Jual} stock={brg.Stock} />
                        </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div class="mt-20">
                <ReactPaginate
                  breakLabel="..."
                  nextLabel="next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={2}
                  pageCount={pageCount}
                  previousLabel="< previous"
                  containerClassName="flex gap-1 justify-center"
                  renderOnZeroPageCount={null}
                  activeLinkClassName="bg-red-500"
                  nextLinkClassName="btn text-4xl rounded-lg btn-lg bg-blue-500 border-none"
                  pageLinkClassName="btn text-4xl btn-lg bg-blue-500 border-none"
                  previousLinkClassName="btn text-4xl rounded-lg btn-sm bg-blue-500 border-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
