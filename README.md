# Web-Anwendung für Video- und Audiofilter

## Projektaufgabe für "Audio- & Videotechnik" 
_Hochschule für Technik und Wirtschaft Berlin, WiSe21/22_

---
<br>

## Inhaltsverzeichnis
* [Projektbeschreibung](#projektbeschreibung)
* [Anleitung](#anleitung)
* [Verwendete Frameworks](#verwendete-frameworks)
* [Fazit](#fazit)
* [Contributors](#contributors)
* [Links & Quellen](#quellen)
* [Lizenz](#lizenz)

---
<br>

## Projektbeschreibung
* [Overview](#overview)
* [Filter](#filter)
* [UI/UX](#ui-ux)

<br>

## _Overview_
Herzlich willkommen in unserem Projekt für Audio- und Videotechnik im WiSe 21/22.<br>
Ziel unseres Projektes war es, eine Webanwendung zu entwickeln, in der User*innen Videos hochladen, diese mit verschiedenen Video- und Audiofiltern verändern und wieder herunterladen können.
Dabei können beliebig viele Filter kombiniert werden, ihre Dauer und Häufigkeit kann angepasst werden.

<br>

## _Filter_

Es kann zwischen folgenden Filtern ausgewählt werden:
### _Video:_
      
* **black & white** 

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

<br>

### _Audio:_
|  Filter  | Effekt |  
| ------ | ------ |
| **_lowpass_** | Alle tiefen Frequenzen werden herausgefiltert |
| **_highpass_**| Alle hohen Frequenzen werden herausgefiltert|
| **_bandpass_**| Alle tieferen und höheren Frequenzen werden herausgefiltert |
| **_lowshelf_** | Tiefere Frequenzen werden geboostet |
| **_highshelf_**|Höhere Frequenzen werden geboostet|
| **_peaking_**|Frequenzen im Bereich werden geboostet|
| **_notch_**|Das Gegenteil von bandpass|

<br>

## _UI UX_
Die Anwendung ist per Maus interagierbar. Die Videofilter können per Drag and Drop zur Filter-Timeline hinzugefügt und per Click and Drag in ihrer Dauer und Position verändert werden, für die Nutzer*innen ist diese Funktion durch eine Veränderung des Cursors verdeutlicht.<br>
Audiofilter können über klickbare Checkboxes für die gesamte Dauer des Videos aktiviert bzw., deaktiviert werden.

 <img src="http://drive.google.com/uc?export=view&id=18yuZG3I8Nm_tlxX8fL34iJ53lruWwu55" alt="" >

 (Bild: _Erstes Mockup_)

Da unser Schwerpunkt auf visuellen Video-Filtern lag, haben wir uns auch für ein visuelles Feedback-System entschieden:<br>
Die Nutzer*innen können aus einer scrollbaren Filtergalerie wählen, welchen Filter sie verwenden möchten. Die Effekte der jeweiligen Filter sind durch Beispielbilder verdeutlicht. (siehe: [_Videofilter_](#video)).<br>
An welcher Stelle des Videos die Filter angewendet werden, ist durch farbige Balken in der Filter-Timeline sichtbar, so ist auch zu erkennen, ob sich verschiedene Filter beispielsweise überlagern. <br>
Der verwendete Videoplayer verfügt über bekannte Funktionen wie Play & Pause.

---
<br>

## Anleitung 
* [Installation & Run](#installation-und-run)
* [Benutzung](#benutzung)

<br>

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

Nun kann die Anwendung im Lieblingsbrowser (wir empfehlen [Firefox](https://www.mozilla.org/en-US/firefox/new/)) unter ```localhost:3000 ``` aufgerufen werden.

<br> 

## _Benutzung_
* [Video hochladen](#video-hochladen)
* [Video runterladen](#video-runterladen)
* [Filter hinzufügen](#filter-hinzufuegen)
* [Filter editieren](#filter-editieren)
* [Filter löschen](#filter-loeschen)
* [Tutorial](#tutorial)

**Obacht!** Durch Neuladen der Seite werden alle Änderungen an den Filtern, sowie das hochgeladene Video zurückgesetzt. 

* #### **Video hochladen**

    Über den Button "Durchsuchen" oder Draggen-&-Droppen der Datei in das Videoplayer-Fenster kann ein Video hochgeladen werden. (Wir empfehlen Videodateien unter 10MB, da größere Dateien zu einer längeren Wartezeit führen können).

    Wenn bereits ein Video hochgeladen wurde, kann über den Button <img src="http://drive.google.com/uc?export=view&id=1nVBTjxanpP5Ze1GL0CsONpmkJsoaXZTS" alt="Upload New Video" height="20px"> ein neues Video hochgeladen werden.

* #### **Video runterladen** 

    Wenn alle Filter an der richtigen Stelle sind, kann das Video über den Button "Download" <img src="http://drive.google.com/uc?export=view&id=1kQo0JPfL2XGfhg-cAFG7ENmuT_PCJWYu" alt="Download" height="20px">  heruntergeladen werden. Nach erfolgreichem Download ist das veränderte Video im üblichen Download-Ordner zu finden.

* #### **Filter hinzufuegen**
    * **Video**

    Aus der scrollbaren Filtergalerie links neben dem Videoplayer kann aus einer Auswahl von sechs Videofiltern gewählt werden.<br>
    Diese können jeweils per drag-and-drop auf die Filter-Timeline gezogen werden und erscheinen dort als farbige Balken relativ zur Mausposition beim "droppen". Pro Filterart wird eine neue "Zeile" automatisch hinzugefügt. Die Art des Filters ist durch ein Icon am Anfang der Zeile zu sehen.<br>
    Wird der Videoplayer gestartet, sind die Effekte der Filter auf das Video direkt zu sehen. Werden verschiedene Filter ausgewählt, kombinieren sich deren Effekte.

       ---**//TODO: gif**---

    * **Audio**

        Durch Anklicken der verschiedenen Audiofilter-Checkboxes werden diese auf das Audio des Videos angewandt. Werden verschiedene Filter ausgewählt, kombinieren sich deren Effekte. Beim Abspielen des Videos im Browser sind die Audioeffekte direkt hörbar.

        ---**//TODO: gif**---

* #### **Filter editieren**

    Durch click-and-drag auf das rechte Ende eines Filterbalkens kann dessen Dauer verändert werden.

    ---**//TODO: gif Filterdauer verändern**---

    Die Position eines Filterbalken kann durch click-and-drag auf dem jeweiligen Filterbalken verändert werden.

    ---**//TODO: gif Position verändern**---

* Filter anwenden -- kann vielleicht weg? 

    ---**//TODO**---

Durch Doppelklicken auf einen Filterbalken wird dieser gelöscht und der Filtereffekt auch nicht mehr an der Stelle auf das Video angewendet.

    ---**//TODO: gif löschen**---

* #### **Tutorial**

Über den Fragezeichen-Button <img src="http://drive.google.com/uc?export=view&id=1ppaRo2X12LgWvsjHvBJ8kf7bOiP-dLJV" alt="Download" width="20px">  neben der Überschrift kann jederzeit das Tutorial aufgerufen werden, welches die Funktionsweise der App noch einmal erklärt. Geschlossen wird das Tutorial wieder über den Close-Button.

---
<br>


## Verwendete Frameworks


* [node fluent ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg)

    ffmpeg-Library zur Anwendung von Videofiltern und fluent ffmpeg-API zur Verwendung der Libraryabfragen nicht in CLI, sondern im node.js-Code 

* [react DnD](https://github.com/react-dnd/react-dnd/) 

    Library zur Implementierung der drag-and-drop-Funktionalität der Videofilter.

---
<br>

## Fazit
Das Fazit unserer Projektgruppe, die sich mit der Aufgabe beschäftigt hat, eine Webanwendung für dieses Modul zu entwickeln, ist abschließend folgendes:

Wir haben uns mit Spaß und Interesse an die Aufgabe gemacht und haben festgestellt, dass die Aufgabe aufwendiger als erwartet zu bewältigen war. Eine Webseite aus Nutzer*innensicht zu gestalten erwies sich als knifflig, insbesondere da unsere anfänglichen Kenntnisse von CSS rudimentärer Natur waren. Doch wir haben uns und das Projekt gemeinsam weiterentwickelt und daraus ist die vorliegende Anwendung entstanden. 

Um auch andere Technologieansätze und deren Nutzbarkeit zu überprüfen, haben wir uns bei der Implementierung der Audiofilter für die Web Audio Api entschieden. Eine Implementierung über ffmpeg wäre mit mehr Zeit auch möglich gewesen, zumal dadurch die Audiofilter nicht nur im Browser, sondern auch im heruntergeladenen Video angewendet würden.<br>
Mögliche weitere Features für eine zukünftige Weiterentwicklung der Anwendung könnten die Anpassung der Filter in der Feinheit, den Übergängen sowie der Intensität sein.

---
<br>

## Contributors


|  Name  | MatrikelNr. | GithubRepo| 
| ------ | ------ | ------ |
| Ekaterina Krysenkova | 0573734 |[link](https://github.com/Krysenkova)
| Paula Katharina Pätzold | 0573372 | [link](https://github.com/PaulasGitHub)
| Philip Blankenburg | 0571740 |[link](https://github.com/S0571740)
| Ronny Brzeski | 0569420 |[link](https://github.com/Pflanzmann)

---
<br>

## Quellen

[FFmpeg Book](http://www.astro-electronic.de/FFmpeg_Book.pdf)

[CSS](https://www.w3schools.com/css/default.asp)

[Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

---
<br>

## Lizenz

Copyright 2022 Krysenkova, Pätzold, Blankenburg, Brzeski

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
