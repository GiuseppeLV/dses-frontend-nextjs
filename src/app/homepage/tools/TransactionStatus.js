import { useToast } from '@/components/ui/use-toast';
export function TransactionStatus({ transactionStatus, values = '' }) {
  let statusString;
  let showStatus = false;

  if (transactionStatus.status === 'Success') {
    showStatus = true;

    statusString =
      'Transaction for ' + transactionStatus.transactionName + ' completed!';
    console.log('Transaction receipt:', transactionStatus.receipt);
  }

  if (transactionStatus.status === 'Mining') {
    showStatus = true;
    statusString = 'Loading...';
  }
  if (transactionStatus.status === 'PendingSignature') {
    showStatus = true;
    statusString =
      'Waiting signature for ' + transactionStatus.transactionName + '...';
  }
  if (transactionStatus.status === 'Exception') {
    showStatus = true;
    statusString = transactionStatus.errorMessage;
  }

  return (
    <div>
      {showStatus && (
        <div>
          <h3>{statusString}</h3>
        </div>
      )}
    </div>
  );
}
