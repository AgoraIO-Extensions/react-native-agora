import React from 'react';
import { PipState } from 'react-native-agora';

export interface PipStateContextType {
  pipState: PipState;
  updatePipState: (newState: PipState) => void;
}
export const PipStateContext = React.createContext<PipStateContextType>({
  pipState: PipState.PipStateStopped,
  updatePipState: () => {},
});

export const PipStateConsumer = PipStateContext.Consumer;

export class PipStateProvider extends React.Component<{}, PipStateContextType> {
  constructor(props: {}) {
    super(props);
    this.state = {
      pipState: PipState.PipStateStopped,
      updatePipState: this.updatePipState,
    };
  }

  updatePipState = (newState: PipState) => {
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
