import { Tab, Tabs } from "@mui/material";
import PaperStyled from "../PaperStyled";

export type TabOption<TabId> = {
  id: TabId;
  label: string;
};

type TabSwitcherProps<TabId> = {
  activeTab: TabId;
  options: TabOption<TabId>[];
  onChange: (id: TabId) => void;
};

function TabSwitcher<TabId extends string>({
  activeTab,
  options,
  onChange,
}: TabSwitcherProps<TabId>) {
  const handleChange = (_: any, value: string) => {
    onChange(value as TabId);
  };

  return (
    <PaperStyled elevation={0}>
      <Tabs value={activeTab} onChange={handleChange} aria-label="tabs">
        {options.map((option) => (
          <Tab
            key={option.id}
            label={option.label}
            id={option.id}
            value={option.id}
          />
        ))}
      </Tabs>
    </PaperStyled>
  );
}

export default TabSwitcher;
