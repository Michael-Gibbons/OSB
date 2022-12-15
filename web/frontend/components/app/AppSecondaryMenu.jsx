import { TopBar, Icon } from "@shopify/polaris";
import { QuestionMarkMajor } from '@shopify/polaris-icons';
import { useToggle } from "../../hooks/index";

export default function AppSecondaryMenu() {
  const [isSecondaryMenuOpen, toggleIsSecondaryMenuOpen] = useToggle(false)

  return (
    <TopBar.Menu
      activatorContent={
        <span>
          <Icon source={QuestionMarkMajor} />
        </span>
      }
      open={isSecondaryMenuOpen}
      onOpen={toggleIsSecondaryMenuOpen}
      onClose={toggleIsSecondaryMenuOpen}
      actions={[
        {
          items: [{ content: 'Community forums' }],
        },
      ]}
    />
  )
}