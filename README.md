# AGH SKOS scraper
Scraper danych pracowników AGH publicznie dostępnych w [SKOS](https://skos.agh.edu.pl/).\
Opracowane na potrzeby ostatnich laboratoriów z przedmiotu ZABD [prowadzący: mgr. inż. Piotr Hajder]

## Wyjście:
![agh-skos-scaper output](https://raw.githubusercontent.com/adamczykpiotr-AGH/agh-skos-scrapper/master/output.png)

## Źródło danych:
1. Scrapowanie po indeksie SKOSu (kod dostępny na parent repo)
2. Jako tablica linków:
```js
const employees = [
    'https://skos.agh.edu.pl/osoba/marta-gora-996.html',
    'https://skos.agh.edu.pl/osoba/adam-mrozek-7809.html',
    'https://skos.agh.edu.pl/osoba/marcin-goly-7494.html',
    'https://skos.agh.edu.pl/osoba/aneta-dudek-5387.html',
     
     ...
];
```

