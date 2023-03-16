import { useState } from "react";

type UseToggleResult = [boolean, () => void, (value: boolean) => void];

const useToggle = (defaultIsOpen = false): UseToggleResult => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultIsOpen);

  const toggle = () => setIsOpen(!isOpen);

  const manualToggle = (value: boolean) => setIsOpen(value);

  return [isOpen, toggle, manualToggle];
};

export default useToggle;
