import { TopBar } from "@shopify/polaris";
import { useToggle } from "../../hooks/index";

export default function AppUserMenu() {
  const [userMenuActive, toggleUserMenuActive] = useToggle(false);

  const userMenuActions = [
    {
      items: [{ content: 'Community forums' }],
    },
  ];

  return (
    <TopBar.UserMenu
      actions={userMenuActions}
      name="John Smith"
      detail="Some Detail text"
      initials="J"
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );

}