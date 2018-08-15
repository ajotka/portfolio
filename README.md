# Portfolio

## TODO:
- Poprawić gulpfile - builduje w złym miejscu
- Poprawić optymalizację zdjęć i fontów - nazwy wyjściowe plików
- Refaktoryzacja css
- RWD na tablety
- Skrypt do śledzenia sekcji w menu
- Płynne przewijanie po kliknięciu 'about'
- Text Lorem Ipsum
- Podlinkować portfolio

### Uruchamianie projektu (wersja developerska)
```yarn start```
Jeśli używasz konfiguracji paczki bez wirtualizacji, pamiętaj o uprzednim przełączeniu node'a do odpowiedniej wersji, np:
```nvm install 9.7.1```

### Build projektu na produkcji
```yarn build```

### Stylelint (linter CSS)
```yarn run lint:css```

### ESLint (linter JS)
```yarn run lint:js```

# Netkata Front end style guide

Poniższe zasady stosujemy wszędzie gdzie to możliwe, kierując się zdrowym rozsądkiem i ogólnymi zasadami pisania dobrego kodu.

##### Najważniejsze zasady:
- Przejrzysty kod (taki, który jest zrozumiały dla innego programisty lub dla Ciebie jeśli wracasz do niego po jakimś czasie).
- DRY (Don't repeat yourself)
- Zgodny ze standardami (Odpowiednie znaczniki HTML)

___
## Ogólne
### Formatowanie
- Zagnieżdżenia - 4 spacje (nie tab wielkości 4 spacji)
- Każde zagnieżdżenie zawiera wcięcie
- Używamy maksymalnie jednego białego wiersza
- Jeden atrybut html, tag CSS w linii
- Usuwamy białe spacje jeśli dodaje je autowrapper

### Inne
- Scalamy pliki, ograniczamy ilość requestów do serwera (minifikacja CSS, JS, sprites, font icons).
- Nie piszemy w kodzie po polsku, komentarze staramy się pisać po angielsku.

### Narzędzia
- Korzystamy z [Netkata starter front (https://git.netkata.com/netkata/starter-front)](https://git.netkata.com/netkata/starter-front)
- Przed każdnym nowym projektem pobieramy aktualną wersję.
- Paczka zawiera najczęściej wykorzystywane w pracy narzędzia (Webpack, Babel...)

___
## HTML
#### Formatowanie bloków
Bloki będącej tej samej głębokości rozdzielamy pustą linią (wyjątkiem są listy, tabele, meta, elementy inline - strong itp)

```
<!--źle-->
<main><span></span>
<section></section>
</main>
<footer></footer>

<!--dobrze-->
<main>
    <span></span>
    <section></section>

    <section></section>
</main>

<footer></footer>
```

#### Atrybuty
- Atrybuty ID muszą być unikalne
- Customowe atrybuty zaczynają się od data.

```
<!--źle-->
<a some-target="main"></a>

<!--dobrze-->
<a data-target="main"></a>
```

#### Linki do zewnętrznych plików
Odniesienia do zewnętrznych plików deklarujemy bez protokołów.

```
<img src="//example.com/image.jpg">
```

#### Semantyka
Kod powinien być poprawny semantycznie, przechodzić przez test ([https://validator.w3.org/). <div> powinien być wykorzystany tylko dla elementów bez znaczenia semantycznego.

____

## CSS

### Ogólne
- Rozdzielamy warswtę semantyczną od prezentacji.
- Do stylowania używamy klas (czasem wyjątkiem może być li, a). Stylowanie po selektorach wykorzystujemy w przypadku edycji styli dla edytora wysywig.
- Korzystamy z metodologii BEM, ITCSS.
- Piszemy w Sass (.scss).
- Nie ukrywamy i nie dodajemy ujemnych marginesów na główny nagłówek H1

##### Formatowanie
- Używamy skróconych notacji

```
//źle
margin: 2px 0px 0px 3px

//dobrze
margin: 2px 0 0 3px
```

- Korzystamy z notacji z myślnikami do odzielenia wyrazów.
- Pomiędzy selektorem a nawiasem stawiamy spację.

```
//źle
.mainsection{}

//dobrze
.main-section {}
```

- Staramy się być precyzyjni

```
//źle
.main .sidebar .list {}
* {}
div {}

//dobrze
.main-sidebar__list {}
```

##### Klasy layoutu
Nie stylujemy po klasach layoutu
```
//zle
.header .xs-4 {
    padding: 0;
}

//dobrze
.header__col {
    padding: 0;
}
```

##### Mobile first
Stosujemy mobile first. Wyjątkiem jest zasada DRY - jeśli podejście mobile first będzie wymagało zbyt dużej ilości kodu lub sprawi, że będzie on nieczytelny. Najczęściej w BEMowym modyfikatorze.

```
(do breakpointu wykorzystany mixin)
//źle
.tab__title {
    border: 1px solid #000;
    margin-top: 0;
    color: #000;
    &--brand {
        border: 0;
        @indlude rwd(small) {
            border: 1px solid #000;
        }
    }
}

//dobrze
.tab__title {
    border: 1px solid #000;
    margin-top: 0;
    color: #000;
}

.tab__title--brand {
    @indlude rwdmax(small) {
            border: 0;
    }
}
```

### BEM
Projekt dzielimy na niezależne komponenty korzystając z BEM. [http://getbem.com/naming/], [https://en.bem.info/methodology/], [https://medium.com/@jackappleby/does-bem-work-945c523116c]

```
.block {}
.block__element {}
.block__element--modifier {}
```

- Podział zaczynamy od najmniejszych elementów (np nagłówki, buttony).
- Blok może przeplatać się z innym oraz mogą być w nim zagnieżdżone inne bloki.
- 1 blok = 1 plik.scss (wyjątkiem są elementy layoutu OOCSS - .container, .row).

##### Zagnieżdżenia
Tworzymy maksymalnie jedno zagnieżdżenie elementu w bloku, spłaszczamy strukturę.

```
//zle
.sidebar__list__element {}
.sidebar__list__element__link {}

//dobrze
.sidebar__list-element {}
.sidebar__list-link {}
```

### Sass & BEM
Nie korzystamy z & do zagnieżdżania elementów (wyjątkiem są pseudo klasy - :hover, helpery - .is-active).

```
//źle
.dashboard {
    &__header {
    }
}

//dobrze
.dashboard__header {}
.dashboard__footer {
    &.is-active {}
    &:hover {}
}
.dashboard__footer--big {
}
```

___
## JS

### Ogólne
- Korzystamy ze składni ES6.
- Korzystamy z modułów (import, export).
- Wszystkie potrzebne narzędzia oraz podstawowa struktura znajdują się w starterze front endowym.
- Stosujemy zasady znajdujące się w Style Guide Airbnb [https://github.com/airbnb/javascript]

### Struktura projektu

```
js/
    components/
    vendor/
    temp/ - tymczasowe pliki
    main.js - główny plik aplikacji
```

#### Moduły
- Plik main.js to główny plik aplikacji w nim importujemy i inicjalizujemy komponenty
- Kod w plikach w katalogu /components nie może wykonywać się sam. Dla przykładu: jeśli nie będzie pliku main.js kod JS w ogóle się nie uruchomi.

### Pluginy (Nie dotyczy jQuery)
Istnieją trzy podejścia do dodawania zewnętrznych pluginów do projektu. Jeśli to możliwe stosujemy podejście nr 1, jesli nie jest możliwe nr 2 itd.
1. Instalujemy plugin przez npm, do komponentu dodajemy ```import 'plugin';``` (Najczęściej na stronie pluginu jest informacja czy plugin można dodawać w ten sposób).
2. Instalujemy plugin przez npm, do gulpfile.js w tasku 'js-vendors' dodajemy ścieżkę do pluginu w node_modules.
3. Dodajemy plik pluginu bezpośrednio do katalogu 'js/vendor'

#### jQuery
- jQuery Dodajemy w przestrzeni globalnej, nie importujemy jej w modułach.
- Dla projektów wordpressowych jQuery dodajemy za pomocą wp_enqueue_script
- Dla pozostałych projektów instalujemy ją za pomocą npm a następnie dodajemy do taska 'js-vendors'. (w paczce front endowej domyślnie jest zakomentowana).
