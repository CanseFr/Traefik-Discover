import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [invoice, setInvoice] = useState(null);
  const [devis, setDevis] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get('http://localhost/billing', {
          headers: { Authorization: "fake-token" } // Envoi du token d'authentification
        });
        setInvoice(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération de la facture:', error);
      }
    };

    fetchInvoice();
  }, []);


  const handleGetDevis = () => {
    const fetchDevis = async () => {
      try {
        const response = await axios.get('http://localhost/billing/devis', {
          headers: { Authorization: "fake-token" } // Envoi du token d'authentification
        });
        setDevis(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération de la facture:', error);
      }
    };

    fetchDevis();
  }

  return (
      <div>

      <div>
        <h1>Facture</h1>
        {invoice ? (
            <div>
              <p>Client: {invoice.client}</p>
              <p>Montant: {invoice.montant} €</p>
            </div>
        ) : (
            <p>Chargement...</p>
        )}
      </div>

      <div>
        <p>les devis</p>
        <button onClick={handleGetDevis}>Get devis</button>
        {devis && (devis.map((item)=>item))}
      </div>
      </div>
  );
}

export default App;
