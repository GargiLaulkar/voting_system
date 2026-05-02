import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Card } from './ui/Card';

type Props = { children: ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Recovered UI error', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card className="mx-auto max-w-2xl p-8 text-center">
          <h1 className="text-2xl font-bold text-civic-primary">Something needs attention</h1>
          <p className="mt-3 text-slate-600">The secure voting interface recovered from an unexpected error. Refresh the page or return to elections.</p>
        </Card>
      );
    }
    return this.props.children;
  }
}
