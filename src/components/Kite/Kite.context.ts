import { createContext } from 'react';

type ContextProps = {
  canBeDismissed?: boolean;
  onClose?: () => void;
};

export default createContext<ContextProps>({});
