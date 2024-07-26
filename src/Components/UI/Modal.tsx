import { useSelector } from "react-redux";
import { RootState, store } from "../../store/store";
import { Modal } from "antd";
import React from "react";
import { GlobalSliceReducers } from "../../store/slices/global.slice";

export default function CustomModal() {
  const global = useSelector((state: RootState) => state.global.value);
  if (!(global.modal.visible && React.isValidElement(global.modal.component))) {
    return null;
  }
  return (
    <Modal
      title=""
      open={true}
      onOk={() => {}}
      onCancel={() => store.dispatch(GlobalSliceReducers.closeModal())}
      footer={null}
    >
      {global.modal.component && global.modal.component}
    </Modal>
  );
}
