import { useSelector } from "react-redux";
import { RootState, store } from "../../store/store";
import { Modal } from "antd";
import React from "react";
import { GlobalSliceReducers } from "../../store/slices/global.slice";
import { MODAL_SIZES } from "../../utils/types";

export default function CustomModal() {
  const global = useSelector((state: RootState) => state.global.value);
  if (!(global.modal.visible && React.isValidElement(global.modal.component))) {
    return null;
  }

  const modalSize =
    global.modal.size === MODAL_SIZES.LARGE
      ? 1500
      : global.modal.size === MODAL_SIZES.MEDIUM
      ? 800
      : 600;

  return (
    <Modal
      title=""
      open={true}
      onOk={() => {}}
      onCancel={() => store.dispatch(GlobalSliceReducers.closeModal())}
      footer={null}
      width={modalSize}
    >
      {global.modal.component && global.modal.component}
    </Modal>
  );
}
