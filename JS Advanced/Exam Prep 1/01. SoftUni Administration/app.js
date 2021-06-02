function solve() {

    document.querySelector('button').addEventListener('click', (ev) => {
        ev.preventDefault();
        const name = document.getElementsByName('lecture-name')[0];
        const date = document.getElementsByName('lecture-date')[0];
        const selectedModule = document.getElementsByName('lecture-module')[0];

        if ([name, date, selectedModule].some(x => x.value.length === 0 || x.value === 'Select module')) {
            throw new TypeError('Invalid input!');
        }

        const modulesContainer = document.querySelector('.modules');

        let moduleDiv = document.createElement('div');
        moduleDiv.classList.add('module');
        const moduleName = document.createElement('h3');
        moduleName.textContent = `${selectedModule.value.toUpperCase()}-MODULE`
        moduleDiv.appendChild(moduleName);

        let lectureUl = document.createElement('ul');

        const lectureLi = document.createElement('li');
        lectureLi.classList.add('flex');
        const lectureData = document.createElement('h4');
        lectureData.textContent = `${name.value} - ${date.value.split('-').join('/').split('T').join(' - ')}`;
        lectureLi.appendChild(lectureData);
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Del';
        deleteBtn.classList.add('red');
        lectureLi.appendChild(deleteBtn);
        deleteBtn.addEventListener('click', (del) => {
            if (del.target.parentNode.parentNode.children.length === 1) {
                del.target.parentNode.parentNode.parentNode.remove();
            } else {
                del.target.parentNode.remove();
            }
        })

        if (modulesContainer.innerHTML.includes(`<h3>${selectedModule.value.toUpperCase()}`)) {
            moduleDiv = Array.from(document.querySelectorAll('.module')).find(m => m.children[0].innerHTML.includes(selectedModule.value.toUpperCase()));
            lectureUl = moduleDiv.children[1];
            lectureUl.appendChild(lectureLi);

            Array.from(lectureUl.children).sort((a, b) => a.firstChild.textContent.split(' - ').slice(1).join(' - ')
                .localeCompare(b.firstChild.textContent.split(' - ').slice(1).join(' - ')))
                .forEach(el => lectureUl.appendChild(el))

            moduleDiv.appendChild(lectureUl);
        } else {
            lectureUl.appendChild(lectureLi);
            moduleDiv.appendChild(lectureUl);
            modulesContainer.appendChild(moduleDiv);
        }
    })
}