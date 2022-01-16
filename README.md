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

    <img src="http://drive.google.com/uc?export=view&id=10370LLHmGOBqHDJ8hv9OJ-TTBlNloonh" alt="" height="50">

- blurry

    <img src="http://drive.google.com/uc?export=view&id=1miqXC8d0Uh3yK_8auMPEsMm2ahEO2Ybf" alt="" height="50">

- noise

    <img src="http://drive.google.com/uc?export=view&id=1CxSubZcVErVkusd2IZry_dFtBLJ9Nn1_" alt="" height="50">

- RGB-shift

    <img src="http://drive.google.com/uc?export=view&id=13XCEtVo0XnU26ooVQWt5Yh0Pu-fqvKbb" alt="" height="50">
    

- warm

    <img src="http://drive.google.com/uc?export=view&id=1LNsrmVdc333Q5Dt3HHptOES6tpGCdLyl" alt="" height="50">

- negation

    <img src="http://drive.google.com/uc?export=view&id=1V2eZ0_6rHGys28bxwa7znCXDG3FhTJ5M" alt="" height="50">

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
Dieses Projekt benötigt [Node.js](https://nodejs.org/), sowie [Codex ffmpeg](https://www.gyan.dev/ffmpeg/builds/) (_older builds_ffmpeg-2022-01-06-git-essentials_build.7z_)  um zu laufen.

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

Nun kann die Anwendung im Lieblingsbrowser (wir empfehlen Google Chrome) unter ```localhost:8080 ``` aufgerufen werden.

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
