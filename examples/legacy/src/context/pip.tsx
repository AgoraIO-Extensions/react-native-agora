import React from 'react';
import { AgoraPipState } from 'react-native-agora';

export interface PipStateContextType {
  pipState: AgoraPipState;
  updatePipState: (newState: AgoraPipState) => void;
}
export const PipStateContext = React.createContext<PipStateContextType>({
  pipState: AgoraPipState.pipStateStopped,
  updatePipState: () => {},
});

export const PipStateConsumer = PipStateContext.Consumer;

export class PipStateProvider extends React.Component<
  { children: React.ReactNode },
  PipStateContextType
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = {
      pipState: AgoraPipState.pipStateStopped,
      updatePipState: this.updatePipState,
    };
  }

  updatePipState = (newState: AgoraPipState) => {
    this.setState({ pipState: newState });
  };

  render() {
    return (
      <PipStateContext.Provider value={this.state}>
        {this.props.children}
      </PipStateContext.Provider>
    );
  }
}
