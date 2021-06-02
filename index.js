const puppeteer = require('puppeteer');
const cliProgress = require('cli-progress');
const progress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

async function getInfo(browser, urlList) {
    const page = await browser.newPage();
    await page.setJavaScriptEnabled(true);

    let data = [];

    for (let [index, url] of urlList.entries()) {
        progress.update(index);

        await page.goto(url, {
            timeout: 0 //fix for puppetier 30s timeout
        });
        await page.waitForSelector('.title');

        data.push( await page.evaluate(() => {
            const nameAndTitle = document.getElementsByTagName('h1')[0].innerText;
            const name = nameAndTitle.split(',')[0];
            let title = nameAndTitle.split(',')[1].substr(1); //remove whitespace

            const entity = document.getElementsByClassName('organization-name')[0].innerText;
            const organisationUnit =  document.getElementsByClassName('organization-unit');
            const faculty = organisationUnit[0].innerText;
            const department = organisationUnit.length > 1 
                ? organisationUnit[1].innerText
                : '';

            const adademicTitle = document.getElementsByClassName('title');
            const position = adademicTitle[0].innerText;
            const group = adademicTitle[1].innerText;

            const headquarters = document.querySelector('.info-osoba tr:nth-child(4) td').innerText;
            const phone = document.getElementsByClassName('tel')[0].innerText;

            return {
                name,
                title,
                entity,
                faculty,
                department, 
                position,
                group,
                headquarters,
                phone
            };
        }) );
    }

    return data;
}

(async () => {
    const browser = await puppeteer.launch();

    const employees = [
        'https://skos.agh.edu.pl/osoba/marta-gora-996.html',
        'https://skos.agh.edu.pl/osoba/adam-mrozek-7809.html',
        'https://skos.agh.edu.pl/osoba/marcin-goly-7494.html',
        'https://skos.agh.edu.pl/osoba/aneta-dudek-5387.html',
        'https://skos.agh.edu.pl/osoba/julian-janus-1163.html',
        'https://skos.agh.edu.pl/osoba/adam-legwand-8307.html',
        'https://skos.agh.edu.pl/osoba/irmina-ziolo-3914.html',
        'https://skos.agh.edu.pl/osoba/piotr-kustra-6597.html',
        'https://skos.agh.edu.pl/osoba/marcin-hojny-6102.html',
        'https://skos.agh.edu.pl/osoba/piotr-maciol-5850.html',
        'https://skos.agh.edu.pl/osoba/lukasz-rauch-5759.html',
        'https://skos.agh.edu.pl/osoba/piotr-hajder-8939.html',
        'https://skos.agh.edu.pl/osoba/lucyna-hajder-8810.html',
        'https://skos.agh.edu.pl/osoba/monika-kuznia-6440.html',
        'https://skos.agh.edu.pl/osoba/mateusz-sitko-7899.html',
        'https://skos.agh.edu.pl/osoba/danuta-szeliga-5029.html',
        'https://skos.agh.edu.pl/osoba/marcin-wronski-7971.html',
        'https://skos.agh.edu.pl/osoba/daniel-bachniak-7918.html',
        'https://skos.agh.edu.pl/osoba/aneta-magdziarz-5868.html',
        'https://skos.agh.edu.pl/osoba/kazimierz-chlon-7415.html',
        'https://skos.agh.edu.pl/osoba/miroslaw-glowacki-986.html',
        'https://skos.agh.edu.pl/osoba/krzysztof-bzowski-7674.html',
        'https://skos.agh.edu.pl/osoba/krzysztof-zielinski-3901.html',
        'https://skos.agh.edu.pl/osoba/jan-gustaw-bielanski-7835.html',
        'https://skos.agh.edu.pl/osoba/przemyslaw-marynowski-7917.html',
        'https://skos.agh.edu.pl/osoba/agnieszka-cebo-rudnicka-6579.html',
        'https://skos.agh.edu.pl/osoba/krzysztof-wierzbanowski-3610.html',
        'https://skos.agh.edu.pl/osoba/joanna-augustyn-nadzieja-6073.html',
    ];
    progress.start(employees.length, 0);

    //gather data
    const employeeData = await getInfo(browser, employees);
    console.table(employeeData);

    await browser.close();
    progress.stop();
})();