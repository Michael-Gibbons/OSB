import { ContextualSaveBar } from "@shopify/polaris";
import { useSelector, useDispatch } from "react-redux";
import { setContextualSaveBar } from "../../redux/ducks/app";

export function AppContextualSaveBar() {
  const dispatch = useDispatch();
  const contextualSaveBar = useSelector((state) => state.app.contextualSaveBar);
  const isDirty = contextualSaveBar.isDirty;

  const clean = () => {
    dispatch(
      setContextualSaveBar({
        isDirty: false,
      })
    );
  };

  const handleSave = async () => {
    const save = contextualSaveBar.saveAction.onAction;
    if (!typeof save === "function") {
      throw "Contextual Save Action must be type of function";
    }
    await save();
    clean();
  };

  const handleDiscard = async () => {
    const discard = contextualSaveBar.discardAction.onAction;
    if (!typeof discard === "function") {
      throw "Contextual Discard Action must be type of function";
    }
    await discard();
    clean();
  };

  return isDirty ? (
    <ContextualSaveBar
      message="Unsaved changes"
      saveAction={{
        onAction: handleSave,
      }}
      discardAction={{
        onAction: handleDiscard,
      }}
    />
  ) : null;
}
