import { useSelector, useDispatch } from "react-redux";
import { setModal } from "../../redux/ducks/app";
import { Modal } from "@shopify/polaris";

export function AppModal() {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.app.modal);

  const handleClose = () => {
    if (typeof modal.onClose === "function") {
      modal.onClose();
    }
    dispatch(setModal({ open: false }));
  };

  return (
    <Modal
      open={modal.open}
      activator={modal.activator}
      footer={modal.footer}
      large={modal.large}
      small={modal.small}
      loading={modal.loading}
      onClose={handleClose}
      title={modal.title}
      primaryAction={modal.primaryAction}
      secondaryActions={modal.secondaryActions}
      children={modal.children}
    />
  );
}
