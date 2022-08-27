import React, { useState } from 'react';

import fetchPendingInvoices from '../mocks/fetchPendingInvoices';
import InvoiceList from '../components/InvoiceList';

function filterInvoices(invoices, type) {
  return invoices.filter(invoice => invoice.type === type);
}

function InvoiceAssigner() {
  const [pendingInvoiceList, setPendingInvoiceList] = useState([]);
  const [loading, setLoading] = useState(true);


  const [name, setName] = useState('');
  const invoiceCallback = (name) => {
    setName(name)
  }
  
  if (loading) {
    fetchPendingInvoices()
      .then(response => setPendingInvoiceList(response))
      .then(() => setLoading(false));
  }

  return (
    <div className="InvoiceAssigner">
      {
        loading ? 
          <h1>Looking for invoices...</h1> 
            :
          <InvoiceList 
            title={name ? 'Invoice Selected' : 'Select an Invoice'}
            invoiceList={filterInvoices(pendingInvoiceList, 'received')}
            onInvoiceSelect={invoiceCallback}
          />
      }
    </div>
  );
}
export default InvoiceAssigner;