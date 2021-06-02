function solution() {
    document.querySelector('.container').addEventListener('click', (ev) => {
        let listOfGifts = document.querySelectorAll('.card ul')[0];
        const sentGifts = document.querySelectorAll('.card ul')[1];
        const discardedGifts = document.querySelectorAll('.card ul')[2];

        const addGiftBtn = document.querySelector('.card button');
        const discardButtons = document.querySelectorAll('#discardButton');
        const sendButtons = document.querySelectorAll('#sendButton');

        if (ev.target === addGiftBtn) {
            let li = document.createElement('li');
            li.classList.add('gift');
            let inputBox = document.querySelector('.card div input');
            li.textContent = inputBox.value;
            inputBox.value = '';

            let sendButton = document.createElement('button');
            sendButton.textContent = 'Send'
            sendButton.id = 'sendButton';

            let discardButton = document.createElement('button');
            discardButton.textContent = 'Discard'
            discardButton.id = 'discardButton';

            li.appendChild(sendButton);
            li.appendChild(discardButton);
            listOfGifts.appendChild(li);
            Array.from(listOfGifts.children).sort((a, b) => a.textContent.localeCompare(b.textContent))
                .forEach(sortedChild => listOfGifts.appendChild(sortedChild));
        }
        if (Array.from(sendButtons).includes(ev.target)) {
            let sendButton = ev.target;
            let giftName = sendButton.parentNode.textContent.split('SendDiscard')[0];
            sendButton.parentNode.parentNode.removeChild(sendButton.parentNode);

            let li = document.createElement('li');
           // li.classList.add('gift');
            li.textContent = giftName;
            sentGifts.appendChild(li);
            //Array.from(sentGifts.children).sort((a, b) =>
             //   a.textContent.localeCompare(b.textContent)).forEach(sortedChild => sentGifts.appendChild(sortedChild))
        }
        if (Array.from(discardButtons).includes(ev.target)) {
            let discardButton = ev.target;
            let giftName = discardButton.parentNode.textContent.split('SendDiscard')[0];;
            discardButton.parentNode.parentNode.removeChild(discardButton.parentNode);

            let li = document.createElement('li');
            //li.classList.add('gift');
            li.textContent = giftName;
            discardedGifts.appendChild(li);
            //Array.from(discardedGifts.children).sort((a, b) =>
             //   a.textContent.localeCompare(b.textContent)).forEach(sortedChild => discardedGifts.appendChild(sortedChild))
        }
    })
}