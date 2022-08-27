import React, { useState } from 'react';

// export interface InvoiceListProps{
//   onClick: (name: string|undefined) => void
// }

function InvoiceList({
  title,
  invoiceList,
  onInvoiceSelect
}) {
  const [selectedInvoice, setSelectedInvoice] = useState('');

  const handleClickInvoice = (e) => {
    if (e?.target?.value === selectedInvoice) {
      setSelectedInvoice('');
      onInvoiceSelect('');
    } else {
      setSelectedInvoice(e?.target?.value);
      onInvoiceSelect(e?.target?.value);
    }
  }

  return (
  <div className="invoice-list overflow-x-auto relative">
    <h3 className="text-3xl font-semibold">
    {title}
    </h3>
    {}
    <table className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <thead className="text-xs text-gray-100 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="p-4"></th>
          <th scope="col" className="py-3 px-6"> ID</th>
          <th scope="col" className="py-3 px-6"> Invoice Org Id </th>
          <th scope="col" className="py-3 px-6"> Invoice Amount </th>
        </tr>
      </thead>
      <tbody className="text-xs text-gray-100 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
        {invoiceList.map(invoice => {
          if (selectedInvoice === '' || selectedInvoice === invoice.id) {
          return (
            <tr key={invoice.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-4 w-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    value={invoice.id}
                    checked={null ? false : selectedInvoice.includes(invoice.id)} 
                    onChange={handleClickInvoice}
                  ></input>
                </div>
              </td>
              <td className="py-4 px-6"> {invoice.id} </td>
              <td className="py-4 px-6"> {invoice.organization_id} </td>
              <td className="py-4 px-6"> ${invoice.amount} {invoice.currency}</td>
            </tr>
          )} else { return null }
        })}
      </tbody>
    </table>
  </div>
  );
}
export default InvoiceList;