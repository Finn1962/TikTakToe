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
    const spieler1 = spieler("spieler1","X");
    const spieler2 = spieler("spieler2","O");
    let aktiverSpieler = 1;

    function neueRunde() {
        if (!frontendVerbindung.state.klickInSpielfeld) return;
        frontendVerbindung.state.klickInSpielfeld = false;   
        if (aktiverSpieler == 1) {
            eingabeSpielzug(spieler1);
            console.log(erstelleSpielfeld.spielfeld);
            if (pruefenVonGewinner("X")) {
                alert(`Spiel beendet! ${spieler1.name} hat gewonnen!`);
            };
            aktiverSpieler = 2;
        } else if (aktiverSpieler == 2){
            eingabeSpielzug(spieler2);   
            console.log(erstelleSpielfeld.spielfeld);
            if (pruefenVonGewinner("O")) {
                alert(`Spiel beendet! ${spieler2.name} hat gewonnen!`);
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
    }
    
    function pruefenVonGewinner(XO){
        if((erstelleSpielfeld.spielfeld[0][0] == XO && erstelleSpielfeld.spielfeld[0][1] == XO && erstelleSpielfeld.spielfeld[0][2] == XO)||
        (erstelleSpielfeld.spielfeld[1][0] == XO && erstelleSpielfeld.spielfeld[1][1] == XO && erstelleSpielfeld.spielfeld[1][2] == XO)||
        (erstelleSpielfeld.spielfeld[2][0] == XO && erstelleSpielfeld.spielfeld[2][1] == XO && erstelleSpielfeld.spielfeld[2][2] == XO)||

        (erstelleSpielfeld.spielfeld[0][0] == XO && erstelleSpielfeld.spielfeld[1][0] == XO && erstelleSpielfeld.spielfeld[2][0] == XO)||
        (erstelleSpielfeld.spielfeld[0][1] == XO && erstelleSpielfeld.spielfeld[1][1] == XO && erstelleSpielfeld.spielfeld[2][1] == XO)||
        (erstelleSpielfeld.spielfeld[0][2] == XO && erstelleSpielfeld.spielfeld[1][2] == XO && erstelleSpielfeld.spielfeld[2][2] == XO)||

        (erstelleSpielfeld.spielfeld[0][0] == XO && erstelleSpielfeld.spielfeld[1][1] == XO && erstelleSpielfeld.spielfeld[2][2] == XO)||
        (erstelleSpielfeld.spielfeld[2][0] == XO && erstelleSpielfeld.spielfeld[1][1] == XO && erstelleSpielfeld.spielfeld[0][2] == XO)
        ){
            return true;
        } else {
            return false;
        }
    };
    
    return {
        neueRunde,
        pruefenVonGewinner,
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
    
    return {
        state,
    };
};
    

//Globaler Code
const spiel = spielLogik();
const frontendVerbindung = verbindungInDom(); 