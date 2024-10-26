//alert('Happy developing ✨');


document.getElementById('fetchForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const url =
        'https://xn--80aubmleh.xn--p1ai/%D0%9E%D1%80%D1%83%D0%B6%D0%B5%D0%B9%D0%BD%D0%B0%D1%8F/' +
            document.getElementById('url').value;

    try {
        const response = await fetch('http://212.193.30.77:3000/fetch-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({url:url})
        });

        const data = await response.json();
        const parser = new DOMParser();
        const html_response = parser.parseFromString(data, "text/html");
        //console.log(html_response.querySelector('.level-info2__expedition span:last-child').innerText);
        //console.log(html_response.querySelector('#expand-character-list > strong:nth-child(2)').innerText);
        document.getElementById('server1').innerText =
            html_response.querySelector('#expand-character-list > strong:nth-child(2)').innerText;
        document.getElementById('server2').innerText =
            html_response.querySelector('#expand-character-list > strong:nth-child(4)').innerText;

        let server1_chars_count =
            html_response.getElementsByTagName('ul')[0].getElementsByTagName('li').length;
        let server2_chars_count =
            html_response.getElementsByTagName('ul')[1].getElementsByTagName('li').length;

        let server1_chars_items =
            html_response.getElementsByTagName('ul')[0].getElementsByTagName('li');
        let server2_chars_items =
            html_response.getElementsByTagName('ul')[1].getElementsByTagName('li');

        console.log(server1_chars_items);
        console.log(server2_chars_items);

        for(let element of server1_chars_items){
            let name = element.firstElementChild.firstElementChild.firstElementChild.alt[0];
            let node = document.createElement('p');
            let node_content = document.createTextNode(name);
            node.appendChild(node_content);
            let server_div = document.getElementById('server1_chars');
            server_div.appendChild(node);
        }

        for(let element of server2_chars_items){
            let name = element.firstElementChild.firstElementChild.innerText;
            let node = document.createElement('p');
            let node_content = document.createTextNode(name);
            node.appendChild(node_content);
            let server_div = document.getElementById('server2_chars');
            server_div.appendChild(node);
        }
    } catch (error) {
        document.getElementById('result').innerText = `Ошибка: ${error.message}`;
    }
});