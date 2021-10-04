import { createContext } from 'react';

type ContextProps = {
  size?: string;
};

export default createContext<ContextProps>({});
