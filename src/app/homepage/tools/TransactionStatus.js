
import { useEffect, useState } from "react";

export function TransactionStatus({transactionStatus}){
//const [showStatus, setshowStatus] = useState(false);

let statusString;
let showStatus=false;

if (transactionStatus.status === 'Success') {
    showStatus=true;
    statusString="Transaction for " +transactionStatus.transactionName+" completed!";
    console.log("Transaction receipt:", transactionStatus.receipt)
  }

  if (transactionStatus.status=== 'Mining') {
    showStatus=true;
    statusString="Loading..."
   
  }
  if (transactionStatus.status === 'PendingSignature') {
    showStatus=true;
    statusString="Waiting signature for " +transactionStatus.transactionName+"..."
   
  }
    // Se lo stato della transazione è "Fail", mostra un messaggio di errore
  if (transactionStatus.status === 'Exception') {
    showStatus=true;
    statusString= transactionStatus.errorMessage
  }

return(
    <div>
    {/* Div aggiunto quando showStatus è true */}
    {showStatus && <div><h3>{statusString}</h3></div>}
  </div>);

}
