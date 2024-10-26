import exp from 'express';
import request from 'request';

const app = exp();

app.use(exp.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
});

app.get('/currencies', (req, res) => {
    request('https://currate.ru/api/?get=currency_list&key=e956de5272f4b44483280f25da16d0b5', (error, response, body) => {
        if (error || response.statusCode !== 200) {
            return res.status(500).json({ type: 'error', message: err.message });
        }

        res.send(body);
    });
});

app.post('/currencies/calculate', exp.text(), (req, res) => {
    request(req.body, (error, response, body) => {
        if (error || response.statusCode !== 200) {
            return res.status(500).json({ type: 'error', message: err.message });
        }
        res.send(body);
    });
});

app.listen(7000, (err) => {
    if (err)
        console.log('Error:' + err);
    else
        console.log(`It' fine`);
});