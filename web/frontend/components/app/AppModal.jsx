import { Modal } from '@shopify/polaris';

export default function AppModal({ modal }) {
  return modal.open ?
    <Modal
      open={modal.open || false}
      src={modal.src || null}
      iFrameName={modal.iFrameName || null}
      title={modal.title || null}
      titleHidden={modal.titleHidden || false}
      children={modal.children || null}
      footer={modal.footer || null}
      instant={modal.instant || false}
      sectioned={modal.sectioned || true}
      large={modal.large || false}
      small={modal.small || false}
      limitHeight={modal.limitHeight || false}
      loading={modal.loading || false}
      onClose={modal.onClose || null}
      onIFrameLoad={modal.onIFrameLoad || null}
      onTransitionEnd={modal.onTransitionEnd || null}
      onScrolledToBottom={modal.onScrolledToBottom || null}
      activator={modal.activator || null}
      noScroll={modal.noScroll || false}
      fullScreen={modal.fullScreen || true}
      primaryAction={modal.primaryAction || null}
      secondaryActions={modal.secondaryActions || null}
    />
  : null
}