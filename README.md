# Mathe-Quiz

- interaktives Mathe-Quiz für Schülerinnen und Schüler ab Klasse 3
- ermöglicht das gezielte Üben verschiedener mathematischer Grundlagen direkt im Browser

## Themen

**Grundrechenarten**
- Addition und Subtraktion (keine negativen Ergebnisse)
- Multiplikation (Kleines Einmaleins)
- Division
- Potenzen und Quadratzahlen

**Größeneinheiten**
- Länge (mm, cm, dm, m, km)
- Masse (mg, g, kg, Zentner, t)
- Volumen (ml, l, m³)
- Zeit (ms, s, min, h, d)

**Bruchrechnung**
- Größter gemeinsamer Teiler (ggT)
- Kleinstes gemeinsames Vielfaches (kgV)
- Umwandlung zwischen Dezimalbrüchen und gemeinen Brüchen
- Umwandlung zwischen Brüchen (gemeine Brüche & Dezimalbrüche) und Prozentwerten

## Funktionsweise

- in jeder Runde werden 10 bzw. 15 zufällig generierte Aufgaben gestellt
- beim Klick auf den Button "Prüfen" wird sofortiges Feedback angezeigt (bei falsch beantworteten Fragen auch die korrekte Antwort)
- Zwischenstand ist jederzeit abrufbar
- am Ende der Runde wird die Anzahl korrekt beantworteter Fragen angezeigt

## Technik

- **Frontend:** HTML, CSS, JavaScript
- **Design:** Mobile First, responsives Layout
- **Keine Abhängigkeiten** — läuft direkt im Browser ohne Build-Tools oder Frameworks

## Projektstruktur

```
mathe-quiz/
├── index.html              # Startseite
├── css/
│   └── style.css
├── js/
│   ├── index.js            # Navigation Startseite
│   ├── quiz-core.js        # Allgemeine Quiz-Logik
│   ├── utils.js            # Hilfsfunktionen
│   ├── add_sub.js
│   ├── multiplications.js
│   ├── division.js
│   ├── powers.js
│   ├── units/
│   │   ├── units.js        # Navigation & Hilfsfunktionen Einheiten
│   │   ├── length.js
│   │   ├── mass.js
│   │   ├── volume.js
│   │   └── time.js
│   └── fractions/
│       ├── fractions.js    # Navigation Bruchrechnung
│       ├── divisors.js
│       ├── multiples.js
│       ├── decimal_fractions.js
│       └── percentages.js
└── pages/
    ├── add_sub.html
    ├── multiplication.html
    ├── division.html
    ├── powers.html
    ├── units/
    │   ├── units.html
    │   ├── length.html
    │   ├── mass.html
    │   ├── volume.html
    │   └── time.html
    └── fractions/
        ├── fractions.html
        ├── divisors.html
        ├── multiples.html
        ├── decimal_fractions.html
        └── percentages.html
```

## Lokale Ausführung

`index.html` im Browser öffnen

## Mögliche Erweiterungen

- Speicherung und Auswertung von Ergebnissen
- Prozentualer Lernfortschritt pro Thema
- Login und Nutzerverwaltung (PHP + MySQL)
- Rollensystem mit Lehrer- und Schüleransicht