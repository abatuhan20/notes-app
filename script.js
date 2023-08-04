const addBtn = document.getElementById('add');
const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
    notes.forEach(note => {
        addNewNote(note);
    })
};


addBtn.addEventListener('click', () => {
    addNewNote();
});

function addNewNote(text = '') {
    const note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML = `
    <div class="notes">
    <div class="tools">
        <button class="edit">
            <i class="fa fa-pencil-square" aria-hidden="true"></i>
        </button>
        <button class="delete">
            <i class="fa fa-trash-alt" aria-hidden="true"></i>
        </button>

    </div>
    <div class="main  ${text ? '' : 'hidden' }"></div>
    <textarea class="${text ? 'hidden' : '' }"></textarea>
    </div>`
    // Yukardaki logic boş notların sayfayı yenilediğimizde silinmesini sağlıyor.

    const editBtn = note.querySelector(".edit");
    const deleteBtn = note.querySelector(".delete");
    const main = note.querySelector(".main");
    const textArea = note.querySelector("textarea");
    // BURADAKİ TANIMLAMADA querySelector'un seçtiği yer çok önemli
    textArea.value = text;
    main.innerHTML = marked(text);
    // tekrardan main içine atmazsam textler gözükmüyor
    

    editBtn.addEventListener('click', () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
});

textArea.addEventListener('input', (e) => {
    const {value} = e.target;
    // Target hangi Dom öğesinin etkinliği tetiklediğini döndürür.
    main.innerHTML = marked(value);
    updateLS();

});

deleteBtn.addEventListener('click', () => {
    note.remove();
    updateLS();
});

    document.body.appendChild(note);
}

function updateLS() {
    const notesText = document.querySelectorAll('textarea');
    //  ÖRNEK LOCAL STORAGE KULLANIMI
    const notes = [];
    
    notesText.forEach(note => {
        notes.push(note.value);
    });

    localStorage.setItem('notes', JSON.stringify(notes));
}


{/* <div class="notes">
            <div class="tools">
                <!-- I need 2 buttons 1 for
                     edit mode 1 for review
                     1 for delete -->
                <button class="edit">
                    <i class="fa fa-pencil-square" aria-hidden="true"></i>
                </button>
                <button class="delete">
                    <i class="fa fa-trash-alt" aria-hidden="true"></i>
                </button>

            </div>
            <div class="main hidden"></div>
            <textarea></textarea>
            
        </div> */}