import {
  ButtonGroup,
  Button,
  Layout,
  Card,
  Modal,
  TextContainer,
  Page,
} from "@shopify/polaris";
import { setModal, setToast } from "../../../redux/ducks/app";
import { useSelector, useDispatch } from "react-redux";

export function ModalTest() {
  const dispatch = useDispatch();

  const modalMarkup = (
    <Modal.Section>
      <TextContainer>
        <p>
          Use Instagram posts to share your products with millions of people.
          Let shoppers buy from your store without leaving Instagram.
        </p>
      </TextContainer>
    </Modal.Section>
  );

  const handleRegularModal = () => {
    dispatch(
      setModal({
        open: true,
        children: modalMarkup,
        primaryAction: {
          content: "Neat!",
          onAction: () => alert("modal action"),
        },
      })
    );
  };

  const handleLoadingModal = () => {
    dispatch(
      setModal({
        open: true,
        loading: true,
        primaryAction: null,
        secondaryActions: null,
      })
    );
  };

  const handleDestructiveModal = () => {
    dispatch(
      setModal({
        open: true,
        children: modalMarkup,
        primaryAction: {
          content: "You super sure?",
          destructive: true,
          onAction: () => alert("modal action"),
        },
        footer: "",
      })
    );
  };

  const handleAsyncModal = () => {
    dispatch(
      setModal({
        open: true,
        loading: true,
        primaryAction: null,
        secondaryActions: null,
      })
    );

    const handleAyncConfirm = () => {
      dispatch(
        setModal({
          open: true,
          children: modalMarkup,
          primaryAction: {
            content: "Neat!",
            onAction: () => {},
            loading: true,
          },
        })
      );

      setTimeout(() => {
        dispatch(setModal({ open: false }));
        dispatch(setToast({ active: true, content: "Action Completed" }));
      }, 2000);
    };

    setTimeout(() => {
      dispatch(
        setModal({
          open: true,
          children: modalMarkup,
          primaryAction: {
            content: "Neat!",
            onAction: () => handleAyncConfirm(),
          },
        })
      );
    }, 2000);
  };

  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Card title="Modal Test">
            <Card.Section>
              <ButtonGroup>
                <Button onClick={handleRegularModal}>Regular Modal</Button>
                <Button onClick={handleLoadingModal}>Loading Modal</Button>
                <Button onClick={handleDestructiveModal}>
                  Destructive Modal
                </Button>
                <Button onClick={handleAsyncModal}>Async Modal</Button>
              </ButtonGroup>
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
