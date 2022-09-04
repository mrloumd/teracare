import { toast } from 'react-toastify';

function popToast(props) {
  const { message = '', type = 'success', autoClose = 3000 } = props;
  return message && toast(message, { type, autoClose });
}

function test() {
  popToast({ message: 'test', type: 'error' });
}

export { popToast, test };
