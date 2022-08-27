import React, { useState } from 'react';

import InvoiceList from '../components/InvoiceList';
import AssignModalButton from '../components/AssignModalButton';

import fetchPendingInvoices from '../mocks/fetchPendingInvoices';

function filterInvoicesType(invoices, type) {
  return invoices.filter(invoice => invoice.type === type);
}

function filterInvoicesId(invoices, id) {
  console.log(id);
  console.log(invoices.filter(invoice => invoice.id === id));
  return invoices.filter(invoice => invoice.id === id);
}

function InvoiceAssigner() {
  const [pendingInvoiceList, setPendingInvoiceList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedInvoice, setSelectedInvoice] = useState('');
  const invoiceCallback = (selectedInvoice) => {
    setSelectedInvoice(selectedInvoice)
  }
  
  const [selectedCreditNote, setSelectedCreditNote] = useState('');
  const creditNoteCallback = (selectedCreditNote) => {
    setSelectedCreditNote(selectedCreditNote)
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
            title={selectedInvoice ? 'Invoice Selected' : 'Select an Invoice'}
            invoiceList={filterInvoicesType(pendingInvoiceList, 'received')}
            onInvoiceSelect={invoiceCallback}
          />
      }
      {
        selectedInvoice ?
          <InvoiceList 
            title={selectedCreditNote ? 'Credit note selected' : 'Select a Credit Note to assign'}
            invoiceList={filterInvoicesType(pendingInvoiceList, 'credit_note')}
            onInvoiceSelect={creditNoteCallback}
          />
          :
          <></>
      }
      {
        selectedCreditNote ?
          <AssignModalButton
            invoice={filterInvoicesId(pendingInvoiceList, selectedInvoice)[0]}
            creditNote={filterInvoicesId(pendingInvoiceList, selectedCreditNote)[0]}
          />
          :
          <></>
      }
    </div>
  );
}
export default InvoiceAssigner;