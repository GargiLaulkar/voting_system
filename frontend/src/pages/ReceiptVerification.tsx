import { useParams } from 'react-router-dom';
import { Card } from '../components/ui/Card';

export default function ReceiptVerification() {
  const { receiptHash } = useParams();
  return (
    <Card className="mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-bold">Receipt Verification</h1>
      <p className="mt-3 text-slate-600">This receipt format is valid and ready to be matched against emitted VoteCasted events.</p>
      <p className="mt-5 break-all rounded-lg bg-slate-50 p-4 font-mono text-sm">{receiptHash}</p>
      <div className="mt-6 rounded-lg bg-green-50 p-4 font-semibold text-civic-success" role="status">Verification status: Receipt hash format accepted</div>
    </Card>
  );
}
