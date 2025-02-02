import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
// import CabinTable from "./CabinTable";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  return (
    //========== with compound component pattern =================================
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>

        {/* <Modal.Open opens="table">
        <Button>Show table</Button>
        </Modal.Open>
        <Modal.Window name="table">
        <CabinTable />
        </Modal.Window> */}
      </Modal>
    </div>
  );
}

//========== without compound component pattern =================================

// function AddCabin() {
//   const [isOpenedModal, setIsOpenedModal] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setIsOpenedModal((show) => !show)}>
//         Add new cabin
//       </Button>
//       {isOpenedModal && (
//         <Modal onClosing={() => setIsOpenedModal(false)}>
//           <CreateCabinForm onClosing={() => setIsOpenedModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
