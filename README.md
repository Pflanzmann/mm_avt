# Web-Anwendung für Video- und Audiofilter

## Projektaufgabe für "Audio- & Videotechnik" 
_htw WiSe21/22_

_Dozent*innen: Elisabeth Thielen, Julien Letellier_

---

## Inhaltsverzeichnis
* [Projektbeschreibung](#projektbeschreibung)
* [Anleitung](#anleitung)
* [Technische Details](#technische-details)
* [Fazit](#fazit)
* [Contributors](#contributors)
* [Links & Quellen](#links-und-quellen)
* [Lizenz](#lizenz)

---

## Projektbeschreibung
* [Overview](#projektbeschreibung-overview)
* [Features](#projektbeschreibung-features)
* [UI/UX](#projektbeschreibung-ui-ux)


## Projektbeschreibung _Overview_
Herzlich willkommen in unserem Projekt für Audio- und Videotechnik im WiSe 21/22.
Ziel unseres Projektes war es, eine Webanwendung zu entwickeln, in der User*innen Videos hochladen, diese mit verschiedenen Video- und Audiofiltern verändern und wieder herunterladen können.
Dabei können beliebig viele Filter kombiniert werden, ihre Dauer und Häufigkeit kann angepasst werden.

## Projektbeschreibung _Features_

Es kann zwischen folgenden Filtern ausgewählt werden:
### _Video:_
- black&white
- blurry
- noise
- RGB-shift
- warm
- negation

### _Audio:_
- audiofilter1
- audiofilter2
- audiofilter3

## Projektbeschreibung _UI UX_
Prototyp - video

---

## Anleitung 
* [Installation & Run](#anleitung-installation-und-run)
* [Benutzung](#anleitung-benutzung)

## Anleitung _Installation und Run_ 
Dieses Projekt benötigt [Node.js](https://nodejs.org/), sowie [Codex ffmpeg](https://www.gyan.dev/ffmpeg/builds/) (_ffmpeg-git-essentials.7z_)  um zu laufen.

* Nach clonen des Repos die dependencies installieren:
```sh
cd <projektverzeichnis>
npm install
```

* Im package "server" einen neuen Ordner anlegen: "upload"

* Nach download des Codex: 
    * Datei an einen beliebigen Ort entpacken (es empfiehlt sich das Projektverzeichnis) 
    * nach belieben umbennen
    * Dateipfad zur entpackten Datei kopieren
    * server.js öffnen (zu finden im package "server")
        * in Zeile 11 & 12 den Ordnerpfad einfügen
    * einen _integrated Terminal_ für server.js öffnen
 ```sh
nodemon server.js
```
bzw.
  ```sh
npx nodemon server.js
```

* Zu guter letzt noch den Server in einem separaten Terminal starten:
```sh
npm start
```

## Anleitung _Benutzung_
* Video hochladen

* Video runterladen

* Filter hinzufügen

* Filter editieren

* Filter löschen

---

## Technische Details
verwendete Bibliotheken, frameworks & warum

---

## Fazit
- was haben wir gelernt?

---

## Contributors

|  Name  | MatrikelNr. | GithubRepo|
| ------ | ------ | ------ |
| Ekaterina Krysenkova | MatrNr |[link]()
| Paula Katharina Pätzold | MatrNr | [link]()
| Philip Blankenburg | MatrNr |[link]()
| Ronny Brzeski | MatrNr |[link]()

---

## Links und Quellen

* ### Links

* ### Quellen

---

## Lizenz

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
