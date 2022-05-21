import Swal from 'sweetalert2'

const FirebaseErrorMsg = message => {
    const removeFromMessage = message.substring(22, message.length-2) 
    const stringArr = removeFromMessage.split('-')
    const msg = stringArr.join(' ')

    return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: msg,
    })
};

export default FirebaseErrorMsg;