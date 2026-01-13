import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
export default function DeleteButton({ handleClearItems ,items}) {
  const showConfirm = () => {
    MySwal.fire({
      title: "Are you sure, you want delete all items?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      customClass: {
        confirmButton: "btn-confirm",
        cancelButton: "btn-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleClearItems();
        MySwal.fire("Deleted!", "Items have been removed.", "success");
      }
    });
  };

  return <button style={{cursor:items.length<=0?'not-allowed':'pointer'}} onClick={showConfirm}>Clear List</button>;
}
