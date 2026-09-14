import { Component, type ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    error: Error | null;
}

// Reconstructed from the currently-deployed bundle (this file was never
// committed to git — see idsb-prototype-deployment memory).
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { error: null };

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { error };
    }

    render(): ReactNode {
        const { error } = this.state;
        if (error) {
            return (
                <div style={{ padding: 32, fontFamily: 'monospace', whiteSpace: 'pre-wrap', color: '#dc2626' }}>
                    <strong>App crashed — copy this and send to Alice:</strong>
                    {'\n\n'}
                    {error.message}
                    {'\n\n'}
                    {error.stack}
                </div>
            );
        }
        return this.props.children;
    }
}
