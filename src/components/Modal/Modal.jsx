import Modal from "react-modal";
Modal.setAppElement("#root");
export default function ModalWrapper({isOpen,setIsOpen,children}){
    const handleClose=()=>{
        setIsOpen(false)
    }
    const customStyles={
        content:{
            height:"fit-content",
            maxHeight:"90vh",
            width:"95%",
            maxWidth:"572px",
            top:"50%",
            left:"50%",
            padding:"2rem",
            border:"0",
            borderRadius:"15px",
            transform:"translateX(-50%) translateY(-50%)",
            background:"rgba(239 239 239 0.85)",
        }
    }
    return (
        <Modal 
          isOpen={isOpen}
          onRequestClose={handleClose}
          shouldCloseOnOverlayClick={true}
          style={customStyles}
        >{children}</Modal>
    )
}