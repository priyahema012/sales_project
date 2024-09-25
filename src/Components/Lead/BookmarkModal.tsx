import { Modal } from 'antd';

interface BookmarkModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadId: string;
  currentStatus: number;
  onConfirm: (leadId: string, newStatus: number) => void;
}

const BookmarkModal: React.FC<BookmarkModalProps> = ({ isOpen, onClose, leadId, currentStatus, onConfirm }) => {
  const handleConfirm = () => {
    const newStatus = currentStatus === 0 ? 1 : 0;
    onConfirm(leadId, newStatus);
    onClose()
  };

  return (
    <Modal visible={isOpen} onCancel={onClose} onOk={handleConfirm} title="Change Active Status">
      <p>Are you sure you want to change the active status?</p>
    </Modal>
  );
};

export default BookmarkModal;
