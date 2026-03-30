 /*
    How it works:
    1. Every .open-modal button has data-modal-target="#some-id"
    2. Clicking it looks up that id and calls .showModal()
    3. Every .close-modal-btn is inside a <dialog>, so we find its
       closest parent <dialog> and call .close() on that.
    4. Clicking the backdrop (outside the dialog box) also closes it.
*/
 
// ── Open ──────────────────────────────────────────────
document.querySelectorAll('.open-modal').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.modalTarget;          // e.g. "#jetling-modal"
    const modal = document.querySelector(targetId);
    if (modal) modal.showModal();
  });
});

// ── Close via × button ────────────────────────────────
document.querySelectorAll('.close-modal-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('dialog');               // walk up to the <dialog>
    if (modal) modal.close();
  });
});

// ── Close by clicking the backdrop ───────────────────
document.querySelectorAll('dialog.modal').forEach(modal => {
  modal.addEventListener('click', e => {
    // e.target is the <dialog> itself only when the backdrop is clicked
    if (e.target === modal) modal.close();
  });
});

