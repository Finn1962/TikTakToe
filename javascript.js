//Spieler erstellen
const spieler = (name, marker) => {
    return {
        name,
        marker,
        ausgabeSpieler() {
            console.log(`Name: ${name}, Marker: ${marker}`);
        }
    }
}


//Spielfeld erstellen
const erstelleSpielfeld = (function(){
    const spielfeld = [["","",""],["","",""],["","",""]];
    return {
        spielfeld,
    }
})();


//Spiel Logik
const spielLogik = ()=>{
    const spieler1 = spieler(prompt("Bitte den Namen für Spieler.1 Eingeben."),"X");
    const spieler2 = spieler(prompt("Bitte den Namen für Spieler.2 Eingeben."),"O");
    if (spieler1.name == "" || spieler1.name == undefined) spieler1.name = "Spieler.1";
    if (spieler2.name == "" || spieler2.name == undefined) spieler2.name = "Spieler.2";
    let aktiverSpieler = 1;
    let spielfeldEinfrieren = false;

    function neueRunde() {
        if (spielfeldEinfrieren || !frontendVerbindung.state.klickInSpielfeld) return;
        frontendVerbindung.state.klickInSpielfeld = false;   
        if (aktiverSpieler == 1) {
            eingabeSpielzug(spieler1);
            console.log(erstelleSpielfeld.spielfeld);
            frontendVerbindung.aenderungenUebernehmenImDom();
            if (pruefenVonGewinner("X")) {
                alert(`Spiel beendet! ${spieler1.name} hat gewonnen!`);
                spielfeldEinfrieren = true;
                return;
            };
            if (erstelleSpielfeld.spielfeld.flat().every(pruefenUnentschieden)){
                alert("Spiel beendet! Unentschieden!");
                spielfeldEinfrieren = true;
                return;
            }; 
            aktiverSpieler = 2;
        } else if (aktiverSpieler == 2){
            eingabeSpielzug(spieler2);   
            console.log(erstelleSpielfeld.spielfeld);
            frontendVerbindung.aenderungenUebernehmenImDom();
            if (pruefenVonGewinner("O")) {
                alert(`Spiel beendet! ${spieler2.name} hat gewonnen!`);
                spielfeldEinfrieren = true;
                return;
            };
            if (erstelleSpielfeld.spielfeld.flat().every(pruefenUnentschieden)){
                alert("Spiel beendet! Unentschieden!");
                spielfeldEinfrieren = true;
                return;
            };
            aktiverSpieler = 1;
        }
    };

    function eingabeSpielzug(spieler){
        if(erstelleSpielfeld.spielfeld[frontendVerbindung.state.YKoorKachel][frontendVerbindung.state.XKoorKachel] != ""){
            alert("Feld bereits belegt! Bitte wähle ein anderes Feld.");
            return;
        }
        erstelleSpielfeld.spielfeld[frontendVerbindung.state.YKoorKachel][frontendVerbindung.state.XKoorKachel] = spieler.marker;
    };

    function pruefenUnentschieden(element){
        return element != "";
    };

    function pruefenVonGewinner(markeSpieler){
        if((erstelleSpielfeld.spielfeld[0][0] == markeSpieler && erstelleSpielfeld.spielfeld[0][1] == markeSpieler && erstelleSpielfeld.spielfeld[0][2] == markeSpieler)||
        (erstelleSpielfeld.spielfeld[1][0] == markeSpieler && erstelleSpielfeld.spielfeld[1][1] == markeSpieler && erstelleSpielfeld.spielfeld[1][2] == markeSpieler)||
        (erstelleSpielfeld.spielfeld[2][0] == markeSpieler && erstelleSpielfeld.spielfeld[2][1] == markeSpieler && erstelleSpielfeld.spielfeld[2][2] == markeSpieler)||

        (erstelleSpielfeld.spielfeld[0][0] == markeSpieler && erstelleSpielfeld.spielfeld[1][0] == markeSpieler && erstelleSpielfeld.spielfeld[2][0] == markeSpieler)||
        (erstelleSpielfeld.spielfeld[0][1] == markeSpieler && erstelleSpielfeld.spielfeld[1][1] == markeSpieler && erstelleSpielfeld.spielfeld[2][1] == markeSpieler)||
        (erstelleSpielfeld.spielfeld[0][2] == markeSpieler && erstelleSpielfeld.spielfeld[1][2] == markeSpieler && erstelleSpielfeld.spielfeld[2][2] == markeSpieler)||

        (erstelleSpielfeld.spielfeld[0][0] == markeSpieler && erstelleSpielfeld.spielfeld[1][1] == markeSpieler && erstelleSpielfeld.spielfeld[2][2] == markeSpieler)||
        (erstelleSpielfeld.spielfeld[2][0] == markeSpieler && erstelleSpielfeld.spielfeld[1][1] == markeSpieler && erstelleSpielfeld.spielfeld[0][2] == markeSpieler)
        ){
            return true;
        } else {
            return false;
        }
    };

    function zurücksetzenSpiel(){
        erstelleSpielfeld.spielfeld = [["","",""],["","",""],["","",""]];
        spielfeldEinfrieren = false;
        aktiverSpieler = 1;
        console.clear();
    };
    
    return {
        neueRunde,
        pruefenVonGewinner,
        zurücksetzenSpiel,
    };
};


//Verbindung zum DOM
const verbindungInDom = () => {
    const state = {
        klickInSpielfeld: false,
        XKoorKachel: null,
        YKoorKachel: null
    };

    function variablenFürKacheln(X, Y){
        state.klickInSpielfeld = true
        state.XKoorKachel = X;
        state.YKoorKachel = Y;
        spiel.neueRunde()
    }

    document.getElementById("1.kachel").addEventListener("click", ()=> {
        variablenFürKacheln(0, 0);
    });
    document.getElementById("2.kachel").addEventListener("click", ()=> {
        variablenFürKacheln(1, 0);
    });
    document.getElementById("3.kachel").addEventListener("click", ()=> {
        variablenFürKacheln(2, 0);
    });
    document.getElementById("4.kachel").addEventListener("click", ()=> {
        variablenFürKacheln(0, 1);
    });
    document.getElementById("5.kachel").addEventListener("click", ()=> {
        variablenFürKacheln(1, 1);
    });
    document.getElementById("6.kachel").addEventListener("click", ()=> {
        variablenFürKacheln(2, 1);
    });
    document.getElementById("7.kachel").addEventListener("click", ()=> {
        variablenFürKacheln(0, 2);
    });
    document.getElementById("8.kachel").addEventListener("click", ()=> {
        variablenFürKacheln(1, 2);
    });
    document.getElementById("9.kachel").addEventListener("click", ()=> {
        variablenFürKacheln(2, 2);
    });

    document.getElementById("neuesSpielButton").addEventListener("click", ()=> {
        spiel.zurücksetzenSpiel();
        frontendVerbindung.aenderungenUebernehmenImDom();
    });

    function aenderungenUebernehmenImDom(){
        const arrayZumÜbernehmen = erstelleSpielfeld.spielfeld.flat();
        for (let i = 0; i < arrayZumÜbernehmen.length; i++){
            document.getElementById(`${i+1}.kachel`).textContent = arrayZumÜbernehmen[i];
        };
    }
    
    return {
        state,
        aenderungenUebernehmenImDom,
    };
};
    

//Globaler Code
const spiel = spielLogik();
const frontendVerbindung = verbindungInDom(); 