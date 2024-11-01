async function fetchData(url) {
    try {
        const response = await fetch('http://212.193.30.77:3000/fetch-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url:url })
        });

        const data = await response.json(); // Парсинг JSON-ответа
        const parser = new DOMParser();
        const html_response = parser.parseFromString(data, "text/html");
        return html_response; // Возвращаем результат парсинга
    } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
        return null;
    }
}


document.getElementById('fetchForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    document.getElementById('server1_chars').innerHTML = '';
    document.getElementById('server2_chars').innerHTML = '';
    document.getElementById('loading').style.color = 'yellow';
    document.getElementById('loading').innerHTML = 'Загружается';


    const url =
        'https://xn--80aubmleh.xn--p1ai/%D0%9E%D1%80%D1%83%D0%B6%D0%B5%D0%B9%D0%BD%D0%B0%D1%8F/' +
        document.getElementById('url').value;

    const result = await fetchData(url);

    document.getElementById('server1').innerText =
        result.querySelector('#expand-character-list > strong:nth-child(2)').innerText;

    const server1_chars = new Array(result.getElementsByTagName('ul')[0].getElementsByTagName('li').length);
    for (let i = 0; i < server1_chars.length; i++) {
        server1_chars[i] = result.getElementsByTagName('ul')[0].getElementsByTagName('li')[i].children[0].children[0].children[1].innerText;
    }

    for(let element of server1_chars){
        let character = await fetchData('https://xn--80aubmleh.xn--p1ai/%D0%9E%D1%80%D1%83%D0%B6%D0%B5%D0%B9%D0%BD%D0%B0%D1%8F/' +element);
        if(character.getElementsByClassName('profile-attention').length == 1)
        {
            let node = document.createElement('p');
            let node_content = document.createTextNode(element+' нет информации');
            node.appendChild(node_content);
            let server_div = document.getElementById('server1_chars');
            server_div.appendChild(node);
        }
        else
        {
            let server_div = document.getElementById('server1_chars');
            let char_img = new Image();
            char_img.src = character.querySelector("#lostark-wrapper > div > main > div > div.profile-character-info > img").src;
            char_img.alt = character.querySelector("#lostark-wrapper > div > main > div > div.profile-character-info > img").alt;
            server_div.appendChild(char_img);
            let char_gs = character.querySelector('#lostark-wrapper > div > main > div > div.profile-ingame > div.profile-info > div.level-info2 > div.level-info2__expedition > span:nth-child(2)').innerText;
            let node = document.createElement('p');
            let node_content = document.createTextNode(element+' '+char_gs);
            node.appendChild(node_content);
            server_div.appendChild(node);
        }
    }


    document.getElementById('server2').innerText =
        result.querySelector('#expand-character-list > strong:nth-child(4)').innerText;

    const server2_chars = new Array(result.getElementsByTagName('ul')[1].getElementsByTagName('li').length);
    for (let i = 0; i < server2_chars.length; i++) {
        server2_chars[i] = result.getElementsByTagName('ul')[1].getElementsByTagName('li')[i].children[0].children[0].children[1].innerText;
    }


    for(let element of server2_chars){
        let character = await fetchData('https://xn--80aubmleh.xn--p1ai/%D0%9E%D1%80%D1%83%D0%B6%D0%B5%D0%B9%D0%BD%D0%B0%D1%8F/' +element);
        if(character.getElementsByClassName('profile-attention').length == 1)
        {
            let node = document.createElement('p');
            let node_content = document.createTextNode(element+' нет информации');
            node.appendChild(node_content);
            let server_div = document.getElementById('server2_chars');
            server_div.appendChild(node);
        }
        else
        {
            let server_div = document.getElementById('server2_chars');
            let char_img = new Image();
            char_img.src = character.querySelector("#lostark-wrapper > div > main > div > div.profile-character-info > img").src;
            char_img.alt = character.querySelector("#lostark-wrapper > div > main > div > div.profile-character-info > img").alt;
            server_div.appendChild(char_img);
            let char_gs = character.querySelector('#lostark-wrapper > div > main > div > div.profile-ingame > div.profile-info > div.level-info2 > div.level-info2__expedition > span:nth-child(2)').innerText;
            let node = document.createElement('p');
            node.innerText = element+' '+char_gs;
            server_div.appendChild(node);
            let sub_button = document.createElement('button');
            sub_button.type = 'submit';
            sub_button.innerText = 'Добавить';
            sub_button.id = 'char_checkbox_' + element;
            node.appendChild(sub_button);
        }
    }

    document.getElementById('loading').style.color = 'green';
    document.getElementById('loading').innerHTML = 'Загружено';

});

const raid_chars = {};

document.getElementById('char_body').addEventListener('click', function (event) {
    if(event.target.tagName === 'BUTTON')
    {
        addCharInRaids(event.target);
        event.target.innerText = 'Добавлено';
        event.target.disabled = true;

    }
});

function addCharInRaids(button){
    let i = button.parentNode.innerText;
    raid_chars[i.split(' ')[0]] = i.match(/[\d.,]+/g).join('').replace(',', '').slice(1);
    console.log(raid_chars);
}

