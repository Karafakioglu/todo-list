export function showModal(modalType){
    const modal = document.getElementById(modalType);
    modal.showModal()
}

export function closeModal(modalType){
    const modal = document.getElementById(modalType);
    delete modal.dataset.id
    modal.close()
}