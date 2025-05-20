import React from 'react';
import ChangeAddressUI from './ChangeAddressUI';
import { useChangeAddressLogic } from './ChangeAddressLogic';

const ChangeAddressScreen = () => {
  const logic = useChangeAddressLogic();
  return <ChangeAddressUI {...logic} />;
};

export default ChangeAddressScreen;
