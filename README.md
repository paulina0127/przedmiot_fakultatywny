
# Przychodnia studencka “Healthy Care”
## Opis projektu:

Aplikacja “Healthy Care” to platforma usługowa, której główną funkcją będzie możliwość zarejestrowania się na wizytę lekarską w przychodni u wybranego lekarza. Pacjenci będą mogli również zobaczyć swoją listę odbytych wizyt oraz jeżeli będzie taka potrzeba anulować wizytę 24 godziny przed planowanym terminem.

## Możliwości aplikacji:
### Pacjent
* Profil pacjenta umożliwiający dodanie informacji o danych osobowych, miejscu zamieszkania, przyjmowanych lekach, alergiach i chorobach
* Zapisanie się na wizytę u wybranego lekarza specjalisty w wybranym przez siebie terminie, wpisanie objawów i aktualnie stosowanych leków
* Lista potwierdzonych i odbytych wizyt oraz wizyt kontrolnych
* Anulowanie wizyty 24 godziny przed planowanym terminem
* Wgląd do zaleceń lekarskich i/lub recept po wizycie

### Lekarz
* Ewidencja własnych pacjentów – karty pacjentów (dane osobowe, dokumentacja medyczna)
* Lista wizyt w danym dniu
* Wgląd do całego kalendarza własnych wizyt
* Dodawanie zaleceń lekarskich i/lub recept po wizycie

### Recepcjonista
* Ewidencja pacjentów – karty pacjentów (dane osobowe, dokumentacja medyczna)
* Ewidencja lekarzy – karty lekarzy (dane osobowe, lista wizyt oraz lista ich pacjentów)
* Potwierdzenie umówionych wizyt
* Lista wizyt w danym dniu
* Wgląd do całego kalendarza wizyt
* Statystyki wizyt i pacjentów 

## Wykorzystane technologie: 
* Backend: Django
* Frontend: React JS
* Baza danych: PostgreSQL

## Instalacja

1.  Wymagania wstępne
    -   Upewnij się, że masz zainstalowane Node.js oraz narzędzie npm (Node Package Manager).
    -   Sprawdź, czy Python oraz narzędzie pip (Python package installer) są zainstalowane na Twoim systemie.
    
2.  Sklonuj repozytorium
    -   Otwórz terminal lub wiersz polecenia.
    -   Przejdź do katalogu, w którym chcesz sklonować projekt.
    -   Uruchom polecenie: `git clone https://github.com/paulina0127/przedmiot_fakultatywny.git`.
    -   Przejdź do katalogu projektu: `cd przedmiot_fakultatywny`.
    
3.  Zainstaluj zależności frontendowe
    -   W katalogu projektu przejdź do folderu "frontend": `cd frontend`
    -   Uruchom polecenie: `npm install`, aby zainstalować wymagane zależności frontendowe.
   
4.  Zainstaluj zależności backendowe
    -   W katalogu projektu przejdź do folderu "backend": `cd backend`
    -   Uruchom polecenie: `pip install -r requirements.txt`, aby zainstalować wymagane zależności backendowe.
    
6.  Uruchom serwery
    -   W folderze "backend" uruchom polecenie: `python manage.py runserver`, aby uruchomić serwer deweloperski Django.
    -   W osobnym terminalu przejdź do folderu "frontend" i uruchom polecenie: `npm start`, aby uruchomić serwer deweloperski React.

7.  Dostęp do aplikacji
    -   Otwórz przeglądarkę internetową i odwiedź adres `http://localhost:3000`, aby wyświetlić frontend React.
    -   W przypadku backendu Django, można uzyskać dostęp do punktów końcowych API, odwiedzając adres `http://127.0.0.1:8000`.
    -   
## Zespół projektowy:
1. Paulina Hryciuk – kierownik projektu, programista back-end 
2. Alicja Dąbrowska – programista front-end 
3. Michał Bagiński – tester, projektant UX/UI
4. Emil Falkowski – tester, analityk
5. Dominika Jabłońska – programista front-end 
6. Kacper Adamski – programista back-end 
