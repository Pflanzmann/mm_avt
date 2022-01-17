# Web-Anwendung für Video- und Audiofilter

## Projektaufgabe für "Audio- & Videotechnik" 
_Hochschule für Technik und Wirtschaft Berlin, WiSe21/22_

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
* [Overview](#overview)
* [Features](#features)
* [UI/UX](#ui-ux)


## _Overview_
Herzlich willkommen in unserem Projekt für Audio- und Videotechnik im WiSe 21/22.
Ziel unseres Projektes war es, eine Webanwendung zu entwickeln, in der User*innen Videos hochladen, diese mit verschiedenen Video- und Audiofiltern verändern und wieder herunterladen können.
Dabei können beliebig viele Filter kombiniert werden, ihre Dauer und Häufigkeit kann angepasst werden.

## _Features_

Es kann zwischen folgenden Filtern ausgewählt werden:
### _Video:_
      
* **black&white** 

    <img src="http://drive.google.com/uc?export=view&id=10370LLHmGOBqHDJ8hv9OJ-TTBlNloonh" alt="Beispielbild für die Anwendung des schwarz-weiß Filters. Zu sehen ist ein Quadrat aus kleineren Quadraten in verschiedenen Farben, rechts daneben ein schwarzer Pfeil mit blauem Rand und rechts neben dem Pfeil ein Quadrat aus kleineren, schwarzweißen Quadraten." height="50">

* **blurry**

    <img src="http://drive.google.com/uc?export=view&id=1miqXC8d0Uh3yK_8auMPEsMm2ahEO2Ybf" alt="Beispielbild für die Anwendung des blurry Filters. Zu sehen ist ein Quadrat aus kleineren Quadraten in verschiedenen Farben, rechts daneben ein schwarzer Pfeil mit blauem Rand und rechts neben dem Pfeil ein Quadrat aus kleineren, verschwommenen, bunten Quadraten." height="50">

* **noise**

    <img src="http://drive.google.com/uc?export=view&id=1CxSubZcVErVkusd2IZry_dFtBLJ9Nn1_" alt="Beispielbild für die Anwendung des noise Filters. Zu sehen ist ein Quadrat aus kleineren Quadraten in verschiedenen Farben, rechts daneben ein schwarzer Pfeil mit blauem Rand und rechts neben dem Pfeil ein Quadrat aus kleineren bunten Quadraten mit kleinen verschieden bunten Punkten." height="50">

* **RGB-shift**

    <img src="http://drive.google.com/uc?export=view&id=13XCEtVo0XnU26ooVQWt5Yh0Pu-fqvKbb" alt="Beispielbild für die Anwendung des rgb-Shift Filters. Zu sehen ist ein Quadrat aus kleineren Quadraten in verschiedenen Farben, rechts daneben ein schwarzer Pfeil mit blauem Rand und rechts neben dem Pfeil ein Quadrat aus kleineren, bunten Quadraten, deren Farbwerte verschoben sind." height="50">
    

* **warm**

    <img src="http://drive.google.com/uc?export=view&id=1LNsrmVdc333Q5Dt3HHptOES6tpGCdLyl" alt="Beispielbild für die Anwendung des warm Filters. Zu sehen ist ein Quadrat aus kleineren Quadraten in verschiedenen Farben, rechts daneben ein schwarzer Pfeil mit blauem Rand und rechts neben dem Pfeil ein Quadrat aus kleineren, bunten Quadraten in geld-orange Tönen." height="50">

* **negation**

    <img src="http://drive.google.com/uc?export=view&id=1V2eZ0_6rHGys28bxwa7znCXDG3FhTJ5M" alt="Beispielbild für die Anwendung des negation Filters. Zu sehen ist ein Quadrat aus kleineren Quadraten in verschiedenen Farben, rechts daneben ein schwarzer Pfeil mit blauem Rand und rechts neben dem Pfeil ein Quadrat aus kleineren, bunten Quadraten, mit den entgegengesetzten Farben des ersten Quadrats." height="50">

### _Audio:_
* **audiofilter1**
* **audiofilter2**
* **audiofilter3**

## _UI UX_
Die Anwendung ist per Maus interagierbar, Filter können per Drag and Drop zur Filter-Timeline hinzugefügt und per Click and Drag in ihrer Dauer und Position verändert werden.

(Bild)_Erster Prototyp_

Da unser Schwerpunkt auf visuellen Video-Filtern lag, haben wir uns auch für ein visuelles Feedback-System entschieden:
An welcher Stelle des Videos die Filter angewendet werden, ist durch farbige Balken in der Filter-Timeline sichtbar, so ist auch zu erkennen, ob sich Filter beispielsweise überlagern. 

---

## Anleitung 
* [Installation & Run](#installation-und-run)
* [Benutzung](#benutzung)

## _Installation und Run_ 
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

## _Benutzung_
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
| Ekaterina Krysenkova | 0573734 |[link]()
| Paula Katharina Pätzold | 0573372 | [link](https://github.com/PaulasGitHub)
| Philip Blankenburg | 0571740 |[link]()
| Ronny Brzeski | 0569420 |[link]()

---

## Links und Quellen

* ### Links

* ### Quellen

---

## Lizenz

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
