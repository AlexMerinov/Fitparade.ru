const InputFile = function (file: any) {
    // Get all the file input fields
    const fields = document.querySelectorAll(file);
    for (let i = 0; i < fields.length; i++) {
        if (!fields[i].closest('.file-input')) {
            this.createField(fields[i]);
        }
    }
};

InputFile.prototype.createField = function (field: any) {
    // Create drop area
    const className = field.getAttribute('class');
    const dropArea = document.createElement('div');
    dropArea.className = `file-input ${className}`;
    field.parentNode.insertBefore(dropArea, field);
    dropArea.appendChild(field);

    // Create button
    const btn = document.createElement('span');
    btn.className = 'file-input__btn';
    dropArea.appendChild(btn);

    const btn_text = document.createElement('span');
    btn_text.className = 'file-input__text';
    btn_text.innerText =
        field.getAttribute('data-placeholder') || 'Choose files';
    btn.appendChild(btn_text);

    const btn_description = document.createElement('span');
    if (field.getAttribute('data-description')) {
        btn_description.className = 'file-input__description';
        btn_description.innerText = ` ${field.getAttribute(
            'data-description'
        )}`;
        btn_text.appendChild(btn_description);
    }

    const btn_del = document.createElement('span');
    btn_del.className = 'file-input__del';
    btn_del.innerText = 'x';
    btn.appendChild(btn_del);

    // Highlight drag area
    addMultiEventListener(field, 'dragenter click focus', function () {
        dropArea.classList.add('is-active');
    });

    // Back to normal state
    addMultiEventListener(field, 'dragleave drop blur', function () {
        dropArea.classList.remove('is-active');
    });

    // Update inner text
    field.addEventListener('change', function () {
        const filesCount = field.files.length;
        dropArea.classList.add('file-input--change');
        if (filesCount === 1) {
            btn_text.innerText = field.value.split('\\').pop();
            const ex = field.value.substring(field.value.lastIndexOf('.') + 1);
            dropArea.setAttribute('data-ex', ex);
        } else {
            btn_text.innerText = `${filesCount} ${
                field.getAttribute('data-message') || 'files chosen'
            }`;
        }
        if (filesCount === 0) {
            btn_text.innerText =
                field.getAttribute('data-placeholder') || 'Choose files';
            btn_text.appendChild(btn_description);
            dropArea.classList.remove('file-input--change');
            dropArea.removeAttribute('data-ex');
        }
    });

    btn_del.addEventListener('click', () => {
        field.value = '';
        field.dispatchEvent(new Event('change'));
        field.classList.remove('error');
        dropArea.classList.remove('file-input--change');
        const next = field.nextElementSibling;
        if (next.classList.contains('error-message')) {
            next.remove();
        }
        if (field.getAttribute('data-value')) {
            alert('Дописать взаимодействие с бэком по удалению файла');
        }
    });

    if (field.getAttribute('data-value')) {
        const val = field.getAttribute('data-value');
        dropArea.classList.add('file-input--change');
        btn_text.innerText = val.split('\\').pop();
        const ex = val.substring(val.lastIndexOf('.') + 1);
        dropArea.setAttribute('data-ex', ex);
    }
};

// Listens to multiple events
function addMultiEventListener(el: any, e: any, fn: any) {
    const events = e.split(' ');
    for (let i = 0; i < events.length; i++) {
        el.addEventListener(events[i], fn, false);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new InputFile('.js-file');
});

export default InputFile;
